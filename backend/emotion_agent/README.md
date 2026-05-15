# Emotion Agent Backend Module

This module is responsible for analyzing text and detecting manipulative emotions (fear, anger, disgust, sadness) using a Hugging Face text-classification pipeline (`SamLowe/roberta-base-go_emotions`). It exposes a FastAPI endpoint to be consumed by the larger AI system.

## Setup Instructions

### 1. Virtual Environment Setup
It is recommended to use the provided `venv` in the backend root, or create your own:
```bash
python -m venv venv
```

Activate the virtual environment:
- **Windows**: `.\\venv\\Scripts\\activate`
- **Linux/Mac**: `source venv/bin/activate`

### 2. Dependency Installation
Install the required dependencies using pip:
```bash
pip install -r requirements.txt
```
*(Note: If you have already installed dependencies from the root `backend` directory, you only need to ensure `requests` is installed for the test script).*

### 3. Running the Server
To run the FastAPI server, use `uvicorn`. Ensure your terminal is in the `emotion_agent` directory or run the module from the root:

```bash
# If inside the emotion_agent directory:
uvicorn main:app --reload
```

The server will start on `http://127.0.0.1:8000`. 
*Note: The first startup may take a moment while the Hugging Face model is downloaded and loaded into memory globally.*

### 4. API Endpoint Documentation
Swagger UI is automatically generated and accessible at:
[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

#### POST /analyze-emotion
Analyzes text to detect manipulative emotions.

**Example Request Payload:**
```json
{
  "text": "URGENT! Your account will be suspended immediately!"
}
```

**Example Response:**
```json
{
  "status": "success",
  "emotion_analysis": {
    "fear_score": 82.3,
    "anger_score": 11.5,
    "disgust_score": 4.1,
    "sadness_score": 18.2,
    "manipulation_score": 29.03
  }
}
```

#### GET /health
Health check endpoint to verify server status and model initialization.

### 5. Testing the API
A test script is provided to verify the endpoint is working correctly end-to-end locally.
With the server running, open another terminal and run:

```bash
python test_api.py
```

### Common Errors and Fixes
- **503 Service Unavailable**: The Hugging Face Emotion Classifier failed to initialize. Check your internet connection or available memory and restart the server.
- **400 Bad Request**: Ensure the text provided is not empty.
- **ModuleNotFoundError**: Ensure the virtual environment is activated and all requirements are installed via `pip install -r requirements.txt`.
