from typing import List

def generate_explanations(emotion_data: dict, social_data: dict) -> List[str]:
    # Placeholder for backward compatibility if needed, though we use build_techniques
    return build_techniques(emotion_data, social_data)

def build_techniques(emotion_data: dict, social_data: dict) -> List[str]:
    """
    Generate why content is dangerous and what tactics were used.
    """
    techniques = []
    emotions = emotion_data.get("emotions_detected", {})
    if emotions.get("fear", 0) > 0.5:
        techniques.append("Fear Amplification")
    if emotions.get("urgency", 0) > 0.5:
        techniques.append("False Urgency")
        
    if social_data.get("phishing_risk", 0) > 0.5:
        techniques.append("Credential Harvesting")
        
    if not techniques:
        techniques.append("No clear manipulation detected")
        
    return techniques
