def calculate_social_engineering_scores(phishing_result, spam_result):
    """
    Combines phishing and spam outputs into a unified social engineering risk score.
    Filters out low confidence predictions (< 0.05).
    """
    try:
        phishing_score = phishing_result[0]["score"]
        phishing_label = phishing_result[0]["label"]

        spam_score = spam_result[0]["score"]
        spam_label = spam_result[0]["label"]

        # Ignore predictions below 0.05 confidence
        if phishing_score < 0.05:
            phishing_score = 0.0
            phishing_label = "none"
            
        if spam_score < 0.05:
            spam_score = 0.0
            spam_label = "none"

        if phishing_label != "phishing":
            phishing_risk_contribution = 0.0
        else:
            phishing_risk_contribution = phishing_score * 0.6
            
        if spam_label != "LABEL_1":  # LABEL_1 is spam, LABEL_0 is ham
            spam_risk_contribution = 0.0
        else:
            spam_risk_contribution = spam_score * 0.4
            
        final_risk_score = phishing_risk_contribution + spam_risk_contribution

        return {
            "phishing_label": phishing_label,
            "phishing_probability": round(phishing_score * 100, 2),
            "spam_label": spam_label,
            "spam_probability": round(spam_score * 100, 2),
            "social_engineering_risk": round(final_risk_score * 100, 2)
        }
    except Exception as e:
        # Handle malformed model output safely
        return {
            "phishing_label": "error",
            "phishing_probability": 0.0,
            "spam_label": "error",
            "spam_probability": 0.0,
            "social_engineering_risk": 0.0
        }
