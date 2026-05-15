from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Union
import logging
import time

from preprocessing import clean_text
from phishing_detector import phishing_classifier
from spam_detector import spam_classifier
from scoring import calculate_social_engineering_scores

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
    models_loaded = phishing_classifier is not None and spam_classifier is not None
    return {
        "status": "healthy" if models_loaded else "degraded",
        "models_loaded": models_loaded
    }

def process_single_text(text: str) -> dict:
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
        
    cleaned_text = clean_text(text)
    
    phishing_result = phishing_classifier(cleaned_text)
    spam_result = spam_classifier(cleaned_text)
    
    return calculate_social_engineering_scores(phishing_result, spam_result)

@app.post("/analyze-social-engineering", response_model=SocialEngineeringResponse)
def analyze_social_engineering(request: SocialEngineeringRequest):
    """
    Main Endpoint: 
    Analyzes input text(s) for phishing and spam characteristics.
    Supports single text via 'text' or batch processing via 'texts'.
    """
    if phishing_classifier is None or spam_classifier is None:
        raise HTTPException(status_code=503, detail="Models are not fully initialized.")

    if not request.text and not request.texts:
        raise HTTPException(status_code=400, detail="Must provide 'text' or 'texts'.")

    start_time = time.perf_counter()

    try:
        if request.texts is not None:
            # Batch processing
            results = []
            for t in request.texts:
                if t.strip():
                    results.append(AnalysisResult(**process_single_text(t)))
                else:
                    results.append(AnalysisResult(
                        phishing_label="none", phishing_probability=0.0,
                        spam_label="none", spam_probability=0.0,
                        social_engineering_risk=0.0
                    ))
            analysis = results
        else:
            # Single processing
            analysis = AnalysisResult(**process_single_text(request.text))
            
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
