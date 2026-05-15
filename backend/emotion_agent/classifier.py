import logging
from dotenv import load_dotenv
from transformers import pipeline

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("Initializing Hugging Face Emotion Classifier globally...")
try:
    # Initialize the emotion classifier globally so it doesn't reload on each request
    emotion_classifier = pipeline(
        "text-classification",
        model="SamLowe/roberta-base-go_emotions",
        top_k=None
    )
    logger.info("Hugging Face Emotion Classifier initialized successfully.")
except Exception as e:
    logger.error(f"Failed to initialize Hugging Face Emotion Classifier: {e}")
    emotion_classifier = None
