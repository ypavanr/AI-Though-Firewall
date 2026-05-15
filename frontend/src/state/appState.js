import { signal } from '@preact/signals-react';

// Global application state
export const globalRiskScore = signal(34);
export const activeThreatsCount = signal(12);
export const scannedItemsCount = signal(14239);
export const agentsActive = signal(7);

// Live analysis state
export const currentAnalysisState = signal('idle'); // idle, scanning, complete
export const currentAnalysisProgress = signal(0);
export const analysisLogs = signal([]);
export const analysisResults = signal(null);
export const factCheckResults = signal(null);

export const addLog = (message, type = '') => {
  analysisLogs.value = [...analysisLogs.value, { time: new Date().toLocaleTimeString(), message, type }];
};
