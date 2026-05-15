def detect_emotions(text: str) -> dict:
    # Stub: simulated logic
    emotions = {"fear": 0.0, "anger": 0.0, "urgency": 0.0}
    text_lower = text.lower()
    
    if "urgent" in text_lower or "immediately" in text_lower:
        emotions["urgency"] = 0.9
        emotions["fear"] = 0.7
    if "deleted" in text_lower or "suspended" in text_lower:
        emotions["fear"] = 0.85
        
    return emotions
