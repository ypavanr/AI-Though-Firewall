import re

def clean_text(text: str) -> str:
    """
    Cleans the input text for phishing/spam detection.
    Converts to lowercase and collapses multiple spaces into one.
    Handles empty string inputs safely.
    """
    if not text:
        return ""
        
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()
