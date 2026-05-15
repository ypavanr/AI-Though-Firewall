import logging
import torch
from transformers import pipeline
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Device auto-detection
device = 0 if torch.cuda.is_available() else -1
device_name = "CUDA (GPU)" if device == 0 else "CPU"

_phishing_classifier = None

def get_phishing_classifier():
    global _phishing_classifier
    if _phishing_classifier is None:
        logger.info(f"Initializing Phishing Classifier on {device_name} lazily...")
        try:
            _phishing_classifier = pipeline(
                "text-classification",
                model="ealvaradob/bert-finetuned-phishing",
                device=device
            )
            logger.info("Phishing Classifier initialized successfully.")
        except Exception as e:
            logger.error(f"Failed to initialize Phishing Classifier: {e}")
            raise e
    return _phishing_classifier
