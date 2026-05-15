from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from gateway.routes import router as gateway_router
from misinformation_agent.routes import router as misinformation_router
from AI_detection_agent.routes import router as ai_detection_router

app = FastAPI(title="AI Firewall Backend")

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the Gateway routes
app.include_router(gateway_router, prefix="/api")

# Include the Misinformation Agent routes
app.include_router(misinformation_router, prefix="/api/misinformation", tags=["misinformation"])

# Include the AI Detection Agent routes
app.include_router(ai_detection_router, prefix="/api/ai-detection", tags=["ai_detection"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
