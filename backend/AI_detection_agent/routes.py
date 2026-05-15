from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from .model import predict_single_text

router = APIRouter()

class TextRequest(BaseModel):
    text: str

@router.post("/detect")
async def detect_ai_text(request: TextRequest = Body(...)):
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty.")
    
    try:
        result = predict_single_text(request.text)
        return {
            "status": "success",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing text: {str(e)}")
