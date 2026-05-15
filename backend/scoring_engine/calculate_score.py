from typing import Tuple, List, Dict, Any

def calculate_final_risk(emotion_data: dict, social_data: dict, ai_data: dict, misinformation_data: dict) -> Tuple[float, str, List[int], List[Dict[str, Any]]]:
    """
    Combines emotion scores, social engineering scores, AI detection, and misinformation into one unified manipulation risk.
    """
    flags = []
    
    # 1. Emotion Risk
    emo_detected = emotion_data.get("emotions_detected", {})
    manipulation_score = emo_detected.get("manipulation_score", 0)
    if manipulation_score > 20:
        flags.append({
            "type": "Emotional Manipulation",
            "amount": manipulation_score,
            "details": f"Top emotions: {emo_detected.get('top_emotion_1')} and {emo_detected.get('top_emotion_2')}"
        })
        
    # 2. Social Engineering Risk
    soc_detected = social_data.get("social_engineering_detected", {})
    phishing_prob = soc_detected.get("phishing_probability", 0)
    spam_prob = soc_detected.get("spam_probability", 0)
    
    if phishing_prob > 50:
        flags.append({
            "type": "Phishing Link Detected",
            "amount": phishing_prob,
            "details": "High probability of malicious phishing link."
        })
    if spam_prob > 50:
        flags.append({
            "type": "Spam/Scam Detected",
            "amount": spam_prob,
            "details": "High probability of scam or unsolicited spam."
        })
        
    # 3. Misinformation Risk
    claims = misinformation_data.get("claims", [])
    if claims:
        flags.append({
            "type": "Misinformation Claims",
            "amount": min(len(claims) * 25.0, 100.0),
            "details": f"Found {len(claims)} fact-checked claims."
        })
        
    # 4. AI Detection
    ai_prob = ai_data.get("probability", 0) * 100
    if ai_prob > 70:
        flags.append({
            "type": "AI Generated Content",
            "amount": ai_prob,
            "details": "High probability that text is AI-generated."
        })
        
    # Calculate unified score
    total_risk = (manipulation_score * 0.3) + (phishing_prob * 0.4) + (spam_prob * 0.2) + (len(claims) * 10)
    final_score = min(total_risk, 100.0)
    
    if final_score > 75:
        severity = "critical"
    elif final_score > 50:
        severity = "high"
    elif final_score > 25:
        severity = "medium"
    else:
        severity = "low"
        
    # Radar Data: [Fear, Manipulation, Spam, Rage, Misinfo, Phishing]
    radar_data = [
        int(emo_detected.get("fear_score", 0)),
        int(manipulation_score),
        int(spam_prob),
        int(emo_detected.get("anger_score", 0)),
        int(min(len(claims) * 25, 100)),
        int(phishing_prob)
    ]
    
    return final_score, severity, radar_data, flags
