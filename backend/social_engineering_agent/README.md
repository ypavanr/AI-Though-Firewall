# Social Engineering Agent

This microservice is a standalone component of the AI Thought Firewall system. It analyzes text (single or batch) to detect phishing and spam attempts and generates a unified social engineering risk score. 

It leverages two Hugging Face models:
- **Phishing Detection**: `ealvaradob/bert-finetuned-phishing`
- **Spam Detection**: `mrm8488/bert-tiny-finetuned-sms-spam-detection`

## Project Architecture
- `main.py`: FastAPI server exposing port 8001.
- `phishing_detector.py` & `spam_detector.py`: Model wrappers with global caching and auto CUDA-detection.
- `scoring.py`: Combines the results and filters out low-confidence predictions (< 0.05).
- `test_api.py`: Automated testing script for single and batch workflows.

## Setup Instructions

### 1. Virtual Environment Setup
Ensure you are using the virtual environment from the root `backend` folder:
```bash
python -m venv venv
```
Activate it:
- Windows: `.\\venv\\Scripts\\activate`
- Mac/Linux: `source venv/bin/activate`

### 2. Dependency Installation
Install the dependencies specified in the module's `requirements.txt`:
```bash
pip install -r requirements.txt
```

### 3. Running the Service
The service is designed to run on **Port 8001** to avoid conflict with the Emotion Agent on Port 8000. Start it using `uvicorn`:
```bash
uvicorn main:app --reload --port 8001
```

### 4. API Documentation
Once running, the Swagger UI is available at:
[http://127.0.0.1:8001/docs](http://127.0.0.1:8001/docs)

## API Endpoints

### GET /health
Returns the health status and whether models are fully loaded.

### POST /analyze-social-engineering
Analyzes input text for phishing and spam.

#### Single Input Example
```json
{
  "text": "URGENT! Verify your bank account immediately!"
}
```

#### Batch Input Example
```json
{
  "texts": [
    "URGENT! Verify your bank account immediately!",
    "Hey mom, call me later."
  ]
}
```

#### Example cURL Command
```bash
curl -X POST "http://127.0.0.1:8001/analyze-social-engineering" \
-H "Content-Type: application/json" \
-d "{\"text\":\"URGENT! Verify your bank account immediately!\"}"
```

## Common Issues & Fixes
- **503 Service Unavailable**: The Hugging Face models failed to initialize. Check if `.env` requires a Hugging Face API key due to rate limits or check memory constraints.
- **CUDA Out of Memory**: The models auto-detect GPU. If you run out of memory running both Emotion Agent and Social Engineering Agent, force CPU by setting `device = -1` in `phishing_detector.py` and `spam_detector.py`.
- **Port Conflict**: If port 8001 is taken, adjust the `uvicorn` command line arguments.
