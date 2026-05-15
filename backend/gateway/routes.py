from fastapi import APIRouter
from .schemas import AnalyzeRequest, AnalyzeResponse
from .orchestrator import run_orchestration

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_endpoint(request: AnalyzeRequest):
    """
    Main entry point for text analysis.
    Calls the orchestrator to coordinate all agents.
    """
    result = await run_orchestration(request.text)
    return result
