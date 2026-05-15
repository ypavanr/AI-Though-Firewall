def check_phishing(text: str) -> float:
    # Stub logic
    if "account" in text.lower() and "link" in text.lower():
        return 0.8
    if "verify" in text.lower() and "password" in text.lower():
        return 0.95
    return 0.1
