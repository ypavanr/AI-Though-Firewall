from typing import Tuple, List

def calculate_final_risk(emotion_data: dict, social_data: dict) -> Tuple[float, str, List[int]]:
    """
    Combines emotion scores and social engineering scores into one unified manipulation risk.
    """
    fear_score = emotion_data.get("emotions_detected", {}).get("fear", 0) * 100
    phishing_score = social_data.get("phishing_risk", 0) * 100
    
    # Simple weighted formula
    final_score = (fear_score * 0.4) + (phishing_score * 0.6)
    
    # Determine severity
    if final_score > 75:
        severity = "critical"
    elif final_score > 50:
        severity = "high"
    elif final_score > 25:
        severity = "medium"
    else:
        severity = "low"
        
    # Radar Data: [Phishing, Fear, Spam, Urgency, Authority, Anger]
    # Mocking remaining data for now
    radar_data = [
        int(phishing_score),
        int(fear_score),
        int(social_data.get("spam_risk", 0) * 100),
        int(emotion_data.get("emotions_detected", {}).get("urgency", 0) * 100),
        30, # Authority (mock)
        int(emotion_data.get("emotions_detected", {}).get("anger", 0) * 100) # Anger
    ]
    
    return final_score, severity, radar_data
