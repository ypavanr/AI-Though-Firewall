from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging
import os
import json
import asyncio
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
groq_client = AsyncGroq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

# Import modules from the current package
from .preprocessing import clean_text
from .classifier import get_emotion_classifier
from .scoring import calculate_emotion_scores

app = FastAPI(
    title="Emotion Agent API",
    description="Analyzes text to detect manipulative emotions (fear, anger, disgust, sadness).",
    version="1.0.0"
)

class EmotionRequest(BaseModel):
    text: str

class EmotionScores(BaseModel):
    fear_score: float
    anger_score: float
    disgust_score: float
    sadness_score: float
    manipulation_score: float

class EmotionResponse(BaseModel):
    status: str
    emotion_analysis: EmotionScores

@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "ok", "model_loaded": True}

@app.post("/analyze-emotion", response_model=EmotionResponse)
async def analyze_emotion(request: EmotionRequest):
    """
    Analyzes the input text and returns an emotion-based manipulation score.
    """
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    try:
        emotion_classifier = get_emotion_classifier()
    except Exception as e:
        raise HTTPException(status_code=503, detail="Emotion classifier failed to initialize.")

    try:
        scores = await process_single_text(request.text)
        return EmotionResponse(
            status="success",
            emotion_analysis=EmotionScores(**scores)
        )
    except Exception as e:
        logging.error(f"Error analyzing emotion: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during analysis.")

async def extract_emotional_sentences(text: str) -> list[str]:
    if not groq_client:
        return [text]
    try:
        response = await groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a sentence extractor. Extract sentences that contain strong emotions, opinions, or personal feelings. Exclude dry factual statements. Output valid JSON with a single key 'sentences' containing a list of strings."},
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
        logging.error(f"Failed to extract emotional sentences via Groq: {e}")
        return [text]

def _run_emotion_models(sentences: list[str]) -> dict:
    emotion_classifier = get_emotion_classifier()
    all_results = []
    
    for s in sentences:
        cl = clean_text(s)
        if cl:
            all_results.append(emotion_classifier(cl)[0])
            
    if not all_results:
        return calculate_emotion_scores([[{'label': 'neutral', 'score': 1.0}]])
        
    # Aggregate maximum scores for each label
    aggregated_scores = {}
    for res_list in all_results:
        for emo in res_list:
            if emo['label'] not in aggregated_scores or emo['score'] > aggregated_scores[emo['label']]:
                aggregated_scores[emo['label']] = emo['score']
                
    max_results = [[{"label": k, "score": v} for k, v in aggregated_scores.items()]]
    return calculate_emotion_scores(max_results)

async def process_single_text(text: str) -> dict:
    if not text or not text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
        
    sentences = await extract_emotional_sentences(text)
    return await asyncio.to_thread(_run_emotion_models, sentences)

async def process_emotion(text: str) -> dict:
    """
    Direct function call for the orchestrator to use.
    """
    scores = await process_single_text(text)
    return {
        "score": scores.get("manipulation_score", 0),
        "emotions_detected": scores
    }
