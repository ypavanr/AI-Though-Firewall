def check_spam(text: str) -> float:
    # Stub logic
    if "buy now" in text.lower() or "free" in text.lower():
        return 0.7
    return 0.05
