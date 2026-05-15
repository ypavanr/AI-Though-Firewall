from .preprocessing import clean_text
from .classifier import detect_emotions
from .scoring import calculate_emotion_score

def process_emotion(text: str) -> dict:
    """
    Main entry for emotion agent.
    """
    cleaned = clean_text(text)
    emotions = detect_emotions(cleaned)
    score = calculate_emotion_score(emotions)
    return {
        "score": score,
        "emotions_detected": emotions
    }
