def calculate_emotion_scores(results):
    """
    Converts raw emotion predictions into a manipulation/risk analysis score.
    Extracts fear, anger, disgust, and sadness, and calculates a combined manipulation score.
    """
    if not results or not isinstance(results, list) or len(results) == 0:
        return {
            "fear_score": 0.0,
            "anger_score": 0.0,
            "disgust_score": 0.0,
            "sadness_score": 0.0,
            "manipulation_score": 0.0
        }

    emotions = {}
    
    # results[0] contains a list of dictionaries with 'label' and 'score'
    for item in results[0]:
        emotions[item["label"]] = item["score"]

    fear_score = emotions.get("fear", 0)
    anger_score = emotions.get("anger", 0)
    disgust_score = emotions.get("disgust", 0)
    sadness_score = emotions.get("sadness", 0)

    manipulation_score = (
        fear_score +
        anger_score +
        disgust_score +
        sadness_score
    ) / 4

    return {
        "fear_score": round(fear_score * 100, 2),
        "anger_score": round(anger_score * 100, 2),
        "disgust_score": round(disgust_score * 100, 2),
        "sadness_score": round(sadness_score * 100, 2),
        "manipulation_score": round(manipulation_score * 100, 2)
    }
