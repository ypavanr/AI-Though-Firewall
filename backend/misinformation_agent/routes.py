import os
import httpx
from fastapi import APIRouter, HTTPException, Query
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

GOOGLE_FACT_CHECK_API_KEY = os.getenv("GOOGLE_FACT_CHECK_API_KEY")
GOOGLE_FACT_CHECK_API_URL = "https://factchecktools.googleapis.com/v1alpha1/claims:search"

@router.get("/factcheck")
async def factcheck_query(query: str = Query(..., description="The query to fact check")):
    if not GOOGLE_FACT_CHECK_API_KEY:
        raise HTTPException(status_code=500, detail="Google Fact Check API Key not configured")
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                GOOGLE_FACT_CHECK_API_URL,
                params={
                    "query": query,
                    "key": GOOGLE_FACT_CHECK_API_KEY
                }
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error querying Google Fact Check API: {str(e)}")
