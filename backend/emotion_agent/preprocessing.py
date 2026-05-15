import re

def clean_text(text: str) -> str:
    """
    Cleans text input by converting to lowercase and removing extra spaces.
    If the text is empty or None, returns an empty string.
    """
    if not text:
        return ""
    
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()
