import logging
from dotenv import load_dotenv
from transformers import pipeline

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

_emotion_classifier = None

def get_emotion_classifier():
    global _emotion_classifier
    if _emotion_classifier is None:
        logger.info("Initializing Hugging Face Emotion Classifier lazily...")
        try:
            _emotion_classifier = pipeline(
                "text-classification",
                model="SamLowe/roberta-base-go_emotions",
                top_k=None
            )
            logger.info("Hugging Face Emotion Classifier initialized successfully.")
        except Exception as e:
            logger.error(f"Failed to initialize Hugging Face Emotion Classifier: {e}")
            raise e
    return _emotion_classifier
