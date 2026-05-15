from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from gateway.routes import router as gateway_router

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
