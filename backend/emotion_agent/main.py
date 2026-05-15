from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging

# Import modules from the current package
from preprocessing import clean_text
from classifier import emotion_classifier
from scoring import calculate_emotion_scores

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
    return {"status": "ok", "model_loaded": emotion_classifier is not None}

@app.post("/analyze-emotion", response_model=EmotionResponse)
def analyze_emotion(request: EmotionRequest):
    """
    Analyzes the input text and returns an emotion-based manipulation score.
    """
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")

    if emotion_classifier is None:
        raise HTTPException(status_code=503, detail="Emotion classifier is not initialized.")

    try:
        # Step 1: Preprocess text
        cleaned_text = clean_text(request.text)

        # Step 2: Run classifier
        results = emotion_classifier(cleaned_text)

        # Step 3: Calculate scores
        scores = calculate_emotion_scores(results)

        return EmotionResponse(
            status="success",
            emotion_analysis=EmotionScores(**scores)
        )
    except Exception as e:
        logging.error(f"Error analyzing emotion: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during analysis.")
