import requests
import json

def test_analyze_emotion():
    url = "http://127.0.0.1:8000/analyze-emotion"
    payload = {
        "text": "URGENT! Your account will be suspended immediately!"
    }
    headers = {
        "Content-Type": "application/json"
    }

    try:
        print(f"Sending test request to {url}...")
        response = requests.post(url, json=payload, headers=headers)
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            print("\nResponse:")
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"Failed to get successful response: {response.text}")
    except Exception as e:
        print(f"Error connecting to server: {e}")

if __name__ == "__main__":
    test_analyze_emotion()
