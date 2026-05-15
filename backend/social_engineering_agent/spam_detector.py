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

_spam_classifier = None

def get_spam_classifier():
    global _spam_classifier
    if _spam_classifier is None:
        logger.info(f"Initializing Spam Classifier on {device_name} lazily...")
        try:
            _spam_classifier = pipeline(
                "text-classification",
                model="mrm8488/bert-tiny-finetuned-sms-spam-detection",
                device=device
            )
            logger.info("Spam Classifier initialized successfully.")
        except Exception as e:
            logger.error(f"Failed to initialize Spam Classifier: {e}")
            raise e
    return _spam_classifier
