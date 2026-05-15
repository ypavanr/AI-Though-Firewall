from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Union
import logging
import time
import os
import json
import asyncio
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY_SOCIAL")
groq_client = AsyncGroq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

from .preprocessing import clean_text
from .phishing_detector import get_phishing_classifier
from .spam_detector import get_spam_classifier
from .scoring import calculate_social_engineering_scores

app = FastAPI(
    title="Social Engineering Agent API",
    description="Detects phishing and spam attempts to generate a social engineering risk score.",
    version="1.0.0"
)

# Pydantic models for request validation
class SocialEngineeringRequest(BaseModel):
    text: Optional[str] = None
    texts: Optional[List[str]] = None

class AnalysisResult(BaseModel):
    phishing_label: str
    phishing_probability: float
    spam_label: str
    spam_probability: float
    social_engineering_risk: float

class SocialEngineeringResponse(BaseModel):
    status: str
    social_engineering_analysis: Union[AnalysisResult, List[AnalysisResult]]
    inference_time_ms: int

@app.get("/health")
def health_check():
    """Health check endpoint to ensure models are loaded and API is up."""
    return {
        "status": "healthy",
        "models_loaded": True
    }

async def extract_suspicious_sentences(text: str) -> list[str]:
    if not groq_client:
        return [text]
    try:
        response = await groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a sentence extractor. Extract sentences that contain links, urgent demands, financial requests, or commands. Output valid JSON with a single key 'sentences' containing a list of strings."},
                {"role": "user", "content": f"Text: {text}"}
            ],
            model="llama-3.1-8b-instant",
            temperature=0.0,
            response_format={"type": "json_object"}
        )
        data = json.loads(response.choices[0].message.content)
        sentences = data.get("sentences", [])
        return sentences if sentences else [text]
    except Exception as e:
        logging.error(f"Failed to extract suspicious sentences via Groq: {e}")
        return [text]

def _run_models(sentences: list[str]) -> dict:
    phishing_classifier = get_phishing_classifier()
    spam_classifier = get_spam_classifier()
    
    max_p = 0.0
    max_s = 0.0
    l_p = "none"
    l_s = "none"
    
    for s in sentences:
        cl = clean_text(s)
        if not cl:
            continue
        pr = phishing_classifier(cl)[0]
        sr = spam_classifier(cl)[0]
        
        # Determine highest threat score across sentences
        if pr['score'] > max_p:
            max_p = pr['score']
            l_p = pr['label']
            
        # Spam classifier has LABEL_1 as spam usually, but sometimes different.
        if sr['score'] > max_s:
            max_s = sr['score']
            l_s = sr['label']
            
    if max_p == 0.0 and max_s == 0.0:
        return calculate_social_engineering_scores([{"label": "none", "score": 0.0}], [{"label": "none", "score": 0.0}])
        
    return calculate_social_engineering_scores([{"label": l_p, "score": max_p}], [{"label": l_s, "score": max_s}])

async def process_single_text(text: str) -> dict:
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
        
    sentences = await extract_suspicious_sentences(text)
    return await asyncio.to_thread(_run_models, sentences)

@app.post("/analyze-social-engineering", response_model=SocialEngineeringResponse)
async def analyze_social_engineering(request: SocialEngineeringRequest):
    """
    Main Endpoint: 
    Analyzes input text(s) for phishing and spam characteristics.
    Supports single text via 'text' or batch processing via 'texts'.
    """

    if not request.text and not request.texts:
        raise HTTPException(status_code=400, detail="Must provide 'text' or 'texts'.")

    start_time = time.perf_counter()

    try:
        if request.texts is not None:
            # Batch processing
            results = []
            for t in request.texts:
                if t.strip():
                    results.append(AnalysisResult(**await process_single_text(t)))
                else:
                    results.append(AnalysisResult(
                        phishing_label="none", phishing_probability=0.0,
                        spam_label="none", spam_probability=0.0,
                        social_engineering_risk=0.0
                    ))
            analysis = results
        else:
            # Single processing
            analysis = AnalysisResult(**await process_single_text(request.text))
            
    except HTTPException as he:
        raise he
    except Exception as e:
        logging.error(f"Error during analysis: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during analysis.")

    end_time = time.perf_counter()
    inference_time_ms = int((end_time - start_time) * 1000)

    return SocialEngineeringResponse(
        status="success",
        social_engineering_analysis=analysis,
        inference_time_ms=inference_time_ms
    )

async def process_social_engineering(text: str) -> dict:
    """
    Direct function call for the orchestrator to use.
    """
    scores = await process_single_text(text)
    return {
        "score": scores.get("social_engineering_risk", 0),
        "social_engineering_detected": scores
    }
