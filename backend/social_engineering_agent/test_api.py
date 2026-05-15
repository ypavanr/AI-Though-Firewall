import requests
import json
import time

BASE_URL = "http://127.0.0.1:8001"

def test_health():
    url = f"{BASE_URL}/health"
    print(f"Testing GET {url}...")
    try:
        response = requests.get(url)
        print(f"Status Code: {response.status_code}")
        print(json.dumps(response.json(), indent=2))
        print("-" * 40)
    except Exception as e:
        print(f"Health check failed: {e}")

def test_single_input():
    url = f"{BASE_URL}/analyze-social-engineering"
    payload = {
        "text": "URGENT! Verify your bank account immediately or it will be suspended!"
    }
    headers = {"Content-Type": "application/json"}
    
    print(f"Testing Single Input POST {url}...")
    try:
        response = requests.post(url, json=payload, headers=headers)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"Error: {response.text}")
        print("-" * 40)
    except Exception as e:
        print(f"Single input test failed: {e}")

def test_batch_input():
    url = f"{BASE_URL}/analyze-social-engineering"
    payload = {
        "texts": [
            "URGENT! Verify your bank account immediately or it will be suspended!",
            "Hey mom, can you call me when you get off work?",
            "You have won a $1000 Walmart gift card! Click here to claim now."
        ]
    }
    headers = {"Content-Type": "application/json"}
    
    print(f"Testing Batch Input POST {url}...")
    try:
        response = requests.post(url, json=payload, headers=headers)
        print(f"Status Code: {response.status_code}")
        if response.status_code == 200:
            print(json.dumps(response.json(), indent=2))
        else:
            print(f"Error: {response.text}")
        print("-" * 40)
    except Exception as e:
        print(f"Batch input test failed: {e}")

if __name__ == "__main__":
    print("Waiting 2 seconds before starting tests...")
    time.sleep(2)
    test_health()
    test_single_input()
    test_batch_input()
