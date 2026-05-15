from pydantic import BaseModel
from typing import List, Optional, Any

class AnalyzeRequest(BaseModel):
    text: str

class Highlight(BaseModel):
    text: str
    explanation: str
    type: str

class AnalyzeResponse(BaseModel):
    overallScore: float
    severity: str
    radarData: List[int]
    detectedTechniques: List[str]
    highlights: List[Highlight]
    aiDetection: dict
    misinformation: dict
    flags: Optional[List[Any]] = None
    aiSummary: Optional[str] = None
