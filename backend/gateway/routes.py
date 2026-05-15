from fastapi import APIRouter, HTTPException
from .schemas import AnalyzeRequest, AnalyzeResponse
from .orchestrator import run_orchestration
import hashlib

router = APIRouter()

latest_analysis_cache = {}

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_endpoint(request: AnalyzeRequest):
    """
    Main entry point for text analysis.
    Calls the orchestrator to coordinate all agents.
    """
    result = await run_orchestration(request.text)
    
    report_id = hashlib.md5(request.text.encode('utf-8')).hexdigest()
    result["reportId"] = report_id
    latest_analysis_cache[report_id] = result
    
    return result

@router.get("/analyze/{report_id}", response_model=AnalyzeResponse)
async def get_report_endpoint(report_id: str):
    """
    Retrieves a cached analysis report.
    """
    if report_id in latest_analysis_cache:
        return latest_analysis_cache[report_id]
    raise HTTPException(status_code=404, detail="Report not found or expired from cache")
