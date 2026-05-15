import os
import httpx
import logging
import asyncio
import json
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

GOOGLE_FACT_CHECK_API_KEY = os.getenv("GOOGLE_FACT_CHECK_API_KEY")
GOOGLE_FACT_CHECK_API_URL = "https://factchecktools.googleapis.com/v1alpha1/claims:search"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

groq_client = AsyncGroq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

async def extract_claims(text: str) -> list[str]:
    if not groq_client:
        logger.error("Groq API Key not configured. Cannot extract claims.")
        return []
    
    try:
        response = await groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a factual claim extractor. You must output valid JSON with a single key 'claims' containing a list of string claims."},
                {"role": "user", "content": f"Extract distinct, specific factual claims from the following text that can be fact-checked. Exclude opinions, emotions, or generic sentences.\n\nText: {text}"}
            ],
            model="llama-3.1-8b-instant",
            temperature=0.0,
            response_format={"type": "json_object"}
        )
        content = response.choices[0].message.content
        data = json.loads(content)
        return data.get("claims", [])
    except Exception as e:
        logger.error(f"Failed to extract claims via Groq: {e}")
        return []

async def fetch_fact_check(client: httpx.AsyncClient, claim: str) -> dict:
    try:
        response = await client.get(
            GOOGLE_FACT_CHECK_API_URL,
            params={
                "query": claim,
                "key": GOOGLE_FACT_CHECK_API_KEY
            }
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        logger.error(f"Error querying Google Fact Check API for '{claim}': {e}")
        return {}

async def process_misinformation(text: str) -> dict:
    """
    Extracts claims via LLM and queries the Google Fact Check API concurrently.
    """
    if not GOOGLE_FACT_CHECK_API_KEY:
        logger.error("Google Fact Check API Key not configured")
        return {"claims": []}
        
    claims_to_check = await extract_claims(text)
    
    if not claims_to_check:
        return {"claims": []}
        
    logger.info(f"Checking {len(claims_to_check)} claims: {claims_to_check}")
        
    async with httpx.AsyncClient() as client:
        tasks = [fetch_fact_check(client, claim) for claim in claims_to_check]
        results = await asyncio.gather(*tasks)
        
    # Aggregate results
    aggregated_claims = []
    for res in results:
        if "claims" in res and res["claims"]:
            aggregated_claims.extend(res["claims"])
            
    return {"claims": aggregated_claims}
