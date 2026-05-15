def normalize_text(text: str) -> str:
    # Stub: remove extra spaces
    import re
    return re.sub(r'\s+', ' ', text).strip()
