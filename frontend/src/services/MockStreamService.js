import { globalRiskScore, activeThreatsCount, scannedItemsCount, addLog, currentAnalysisState, currentAnalysisProgress, analysisResults } from '../state/appState';

// Simulates a live data stream updating global stats periodically
export function startGlobalStream() {
  setInterval(() => {
    // Fluctuate global risk score slightly
    const currentScore = globalRiskScore.value;
    const variation = (Math.random() - 0.5) * 4;
    let newScore = currentScore + variation;
    if (newScore > 90) newScore = 90;
    if (newScore < 10) newScore = 10;
    globalRiskScore.value = newScore;

    // Increment scanned items
    scannedItemsCount.value += Math.floor(Math.random() * 5);
  }, 2000);
}

// Calls the real FastAPI backend but preserves the 7-step analysis pipeline visualization
export async function simulateAnalysis(text) {
  currentAnalysisState.value = 'scanning';
  currentAnalysisProgress.value = 0;
  analysisResults.value = null;
  
  let backendData = null;
  
  // 1. Fire off the backend request immediately
  try {
    const response = await fetch('http://localhost:8000/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });
    
    if (response.ok) {
      backendData = await response.json();
    } else {
      console.error("Backend error:", response.statusText);
    }
  } catch (error) {
    console.error("Failed to connect to backend:", error);
  }

  // 2. Visual Pipeline Animation
  const steps = [
    { msg: "Normalizing content payload...", delay: 800 },
    { msg: "Agent 1 (Emotion): Analyzing sentiment and emotional triggers...", delay: 1500 },
    { msg: "Agent 2 (FactCheck): Cross-referencing claims with knowledge base...", delay: 2000 },
    { msg: "Agent 3 (Bias): Detecting framing and cognitive bias patterns...", delay: 1200 },
    { msg: "Agent 4 (SocialEng): Scanning for phishing, urgency, and compliance triggers...", delay: 1800 },
    { msg: "Agent 5 (Consensus): Aggregating agent signals and determining threat vector...", delay: 1000 },
    { msg: "Agent 6 (Explainability): Generating contextual highlights...", delay: 800 }
  ];

  let currentStep = 0;
  let totalDelay = 0;

  addLog("INITIATING NEW SCAN...", "warning");

  steps.forEach((step, index) => {
    totalDelay += step.delay;
    setTimeout(() => {
      currentAnalysisProgress.value = ((index + 1) / steps.length) * 100;
      addLog(step.msg);
    }, totalDelay);
  });

  // Finish scan and show real backend results
  setTimeout(() => {
    addLog("SCAN COMPLETE.", "success");
    currentAnalysisState.value = 'complete';
    
    if (backendData) {
      // Use real backend data
      analysisResults.value = backendData;
    } else {
      // Fallback if backend is offline
      addLog("BACKEND OFFLINE. Using fallback data.", "error");
      analysisResults.value = {
        overallScore: 78,
        severity: 'high',
        radarData: [85, 90, 60, 40, 20, 75],
        detectedTechniques: [
          "Fear Amplification",
          "False Urgency",
          "Authority Bias Exploitation"
        ],
        highlights: [
          { text: "If you don't act immediately,", explanation: "Creates false urgency to bypass logical evaluation.", type: "urgency" },
          { text: "your entire account will be permanently deleted.", explanation: "Fear amplification designed to trigger panic response.", type: "fear" }
        ]
      };
    }
  }, totalDelay + 500);
}
