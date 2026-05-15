def calculate_emotion_score(emotions: dict) -> float:
    # Stub: max score * 100
    if not emotions:
        return 0.0
    return max(emotions.values()) * 100
