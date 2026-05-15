from .preprocessing import normalize_text
from .phishing_detector import check_phishing
from .spam_detector import check_spam
from .scoring import calculate_social_score

def process_social_engineering(text: str) -> dict:
    """
    Main entry for social engineering agent.
    """
    normalized = normalize_text(text)
    phishing_score = check_phishing(normalized)
    spam_score = check_spam(normalized)
    
    score = calculate_social_score(phishing_score, spam_score)
    
    return {
        "score": score,
        "phishing_risk": phishing_score,
        "spam_risk": spam_score
    }
