from typing import List

def generate_explanations(emotion_data: dict, social_data: dict) -> List[str]:
    # Placeholder for backward compatibility if needed, though we use build_techniques
    return build_techniques(emotion_data, social_data)

def build_techniques(emotion_data: dict, social_data: dict) -> List[str]:
    """
    Generate why content is dangerous and what tactics were used.
    """
    techniques = []
    
    # 1. Emotions
    emotions = emotion_data.get("emotions_detected", {})
    manipulation_score = emotions.get("manipulation_score", 0)
    top_1 = emotions.get("top_emotion_1")
    top_2 = emotions.get("top_emotion_2")
    
    if manipulation_score > 10:
        if top_1: techniques.append(top_1.capitalize())
        if top_2: techniques.append(top_2.capitalize())
        
    # 2. Social Engineering
    soc_detected = social_data.get("social_engineering_detected", {})
    if soc_detected.get("phishing_probability", 0) > 50:
        techniques.append("Phishing Intent")
    if soc_detected.get("spam_probability", 0) > 50:
        techniques.append("Spam/Scam Tactics")
        
    if not techniques:
        techniques.append("No clear manipulation detected")
        
    return techniques
