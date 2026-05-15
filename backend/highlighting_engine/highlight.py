from typing import List, Dict

def extract_highlights(text: str, emotion_data: dict, social_data: dict) -> List[Dict[str, str]]:
    return find_highlights(text, emotion_data, social_data)

def find_highlights(text: str, emotion_data: dict, social_data: dict) -> List[Dict[str, str]]:
    """
    Find fear words, urgency phrases, and scam terms.
    """
    highlights = []
    text_lower = text.lower()
    
    danger_words = {
        "urgency": ["urgent", "immediately", "act now"],
        "fear": ["suspended", "deleted", "banned"],
        "scam": ["verify password", "click here", "claim prize"]
    }
    
    for category, words in danger_words.items():
        for word in words:
            if word in text_lower:
                # Find the actual case-preserved word/phrase roughly
                import re
                match = re.search(re.escape(word), text, re.IGNORECASE)
                if match:
                    matched_text = match.group(0)
                    explanation = f"Uses {category} tactics."
                    if category == "urgency":
                        explanation = "Creates false urgency to bypass logical evaluation."
                    elif category == "fear":
                        explanation = "Fear amplification designed to trigger panic response."
                    
                    highlights.append({
                        "text": matched_text,
                        "explanation": explanation,
                        "type": category
                    })
                    
    return highlights
