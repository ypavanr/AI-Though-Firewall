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

    fear_raw = emotions.get("fear", 0)
    anger_raw = emotions.get("anger", 0)
    disgust_raw = emotions.get("disgust", 0)
    sadness_raw = emotions.get("sadness", 0)
    
    # Weight the negative emotions
    weighted_emotions = {
        "fear": fear_raw * 1.0,
        "anger": anger_raw * 0.9,
        "disgust": disgust_raw * 0.8,
        "sadness": sadness_raw * 0.7
    }
    
    # Sort by weighted score descending
    sorted_emotions = sorted(weighted_emotions.items(), key=lambda x: x[1], reverse=True)
    
    top_1_score = sorted_emotions[0][1]
    top_2_score = sorted_emotions[1][1]

    manipulation_score = top_1_score + (top_2_score * 0.5)

    return {
        "fear_score": round(fear_raw * 100, 2),
        "anger_score": round(anger_raw * 100, 2),
        "disgust_score": round(disgust_raw * 100, 2),
        "sadness_score": round(sadness_raw * 100, 2),
        "manipulation_score": round(manipulation_score * 100, 2),
        "top_emotion_1": sorted_emotions[0][0],
        "top_emotion_2": sorted_emotions[1][0]
    }
