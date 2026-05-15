import os
import json
import logging
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY_GATEWAY")
groq_client = AsyncGroq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

async def generate_groq_summary(flags: list) -> str:
    """
    Uses Groq to generate a concise natural language summary of the detected flags.
    """
    if not groq_client or not flags:
        return "No significant manipulation detected, or LLM summary unavailable."
        
    prompt = (
        "You are a cybersecurity and content analysis expert. I will provide you with a JSON list of flags "
        "detected in a social media post/email (such as phishing, emotional manipulation, misinformation, AI generation). "
        "Write a highly concise (1-2 sentences max), natural language summary explaining the threat to the user. "
        "Focus on WHAT the threat is, based ONLY on the flags provided.\n\n"
        f"Flags Detected: {json.dumps(flags)}"
    )
    
    try:
        response = await groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a concise security analyst."},
                {"role": "user", "content": prompt}
            ],
            model="llama-3.1-8b-instant",
            temperature=0.3,
            max_tokens=100
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logging.error(f"Failed to generate summary via Groq: {e}")
        return "Error generating threat summary."
