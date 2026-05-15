from emotion_agent.main import process_emotion
from social_engineering_agent.main import process_social_engineering
from scoring_engine.calculate_score import calculate_final_risk
from explanation_engine.generate_explanation import build_techniques
from highlighting_engine.highlight import find_highlights

def run_orchestration(text: str) -> dict:
    """
    Orchestrates the calls to different agents and combines their outputs.
    """
    # 1. Call Agents
    emotion_data = process_emotion(text)
    social_data = process_social_engineering(text)
    
    # 2. Score
    score, severity, radar = calculate_final_risk(emotion_data, social_data)
    
    # 3. Explain & Highlight
    techniques = build_techniques(emotion_data, social_data)
    highlights = find_highlights(text, emotion_data, social_data)
    
    return {
        "overallScore": score,
        "severity": severity,
        "radarData": radar,
        "detectedTechniques": techniques,
        "highlights": highlights
    }
