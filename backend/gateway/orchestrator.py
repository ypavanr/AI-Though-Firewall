import asyncio
from emotion_agent.main import process_emotion
from social_engineering_agent.main import process_social_engineering
from misinformation_agent.main import process_misinformation
from AI_detection_agent.model import predict_single_text as process_ai_detection
from scoring_engine.calculate_score import calculate_final_risk
from explanation_engine.generate_explanation import build_techniques
from highlighting_engine.highlight import find_highlights
from gateway.summarizer import generate_groq_summary

async def run_orchestration(text: str) -> dict:
    """
    Orchestrates the calls to different agents and combines their outputs.
    """
    # 1. Call Agents concurrently
    emotion_task = process_emotion(text)
    social_task = process_social_engineering(text)
    ai_task = asyncio.to_thread(process_ai_detection, text)
    misinfo_task = process_misinformation(text)
    
    emotion_data, social_data, ai_data, misinformation_data = await asyncio.gather(
        emotion_task, social_task, ai_task, misinfo_task
    )
    
    # 2. Score
    score, severity, radar, flags = calculate_final_risk(emotion_data, social_data, ai_data, misinformation_data)
    
    # 3. Explain, Highlight & Summarize
    techniques = build_techniques(emotion_data, social_data)
    highlights = find_highlights(text, emotion_data, social_data)
    summary = await generate_groq_summary(flags)
    
    return {
        "overallScore": score,
        "severity": severity,
        "radarData": radar,
        "detectedTechniques": techniques,
        "highlights": highlights,
        "aiDetection": ai_data,
        "misinformation": misinformation_data,
        "flags": flags,
        "aiSummary": summary
    }
