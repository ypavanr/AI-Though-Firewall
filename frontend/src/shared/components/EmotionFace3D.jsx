import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

export function EmotionFace3D({ isAnalyzing, detectedEmotions = [] }) {
  const [isLoading, setIsLoading] = useState(true);

  // User provided Spline URL: https://community.spline.design/file/19001c26-c4a5-4791-96da-bc29ba1a5590
  const splineScene = "https://prod.spline.design/19001c26-c4a5-4791-96da-bc29ba1a5590/scene.splinecode"; 

  // Determine the primary emotion to style the container
  const primaryEmotion = detectedEmotions.length > 0 ? detectedEmotions[0].toLowerCase() : 'neutral';
  
  // Dynamic glow based on emotion
  let glowColor = "rgba(0, 229, 255, 0.2)"; // default cyan
  let filterStyle = "hue-rotate(0deg)";
  let moodText = "NEUTRAL STATE";

  if (isAnalyzing) {
    glowColor = "rgba(176, 0, 255, 0.4)"; // purple pulse
    filterStyle = "hue-rotate(90deg) brightness(1.2)";
    moodText = "ANALYZING...";
  } else if (primaryEmotion.includes('fear') || primaryEmotion.includes('urgency') || primaryEmotion.includes('anger')) {
    glowColor = "rgba(255, 0, 60, 0.5)"; // aggressive red
    filterStyle = "hue-rotate(180deg) saturate(2) brightness(1.1)";
    moodText = "THREAT / HIGH ANXIETY";
  } else if (primaryEmotion.includes('calm') || primaryEmotion.includes('trust')) {
    glowColor = "rgba(0, 255, 162, 0.3)"; // secure green
    filterStyle = "hue-rotate(-45deg)";
    moodText = "SECURE / CALM";
  }

  return (
    <div 
      className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden bg-[#05050A] border border-white/5 transition-all duration-700 ease-in-out"
      style={{ boxShadow: `0 0 40px ${glowColor} inset, 0 0 20px ${glowColor}` }}
    >
      {/* Loading State Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#05050A] z-10">
          <div className="w-8 h-8 border-2 border-[#00e5ff] border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-xs font-mono text-[#00e5ff] tracking-widest animate-pulse">BOOTING NEURAL MESH...</span>
        </div>
      )}

      {/* The Spline 3D Scene */}
      <div 
        className="absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out"
        style={{ filter: filterStyle, opacity: isLoading ? 0 : 1 }}
      >
        <Spline 
          scene={splineScene} 
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Status Overlay UI */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none z-20">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Cognitive State</p>
          <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10">
            <span 
              className="text-xs font-mono font-bold tracking-widest transition-colors duration-500"
              style={{ color: isAnalyzing ? '#b000ff' : primaryEmotion.includes('fear') ? '#ff003c' : '#00e5ff' }}
            >
              {moodText}
            </span>
          </div>
        </div>
      </div>
      
      {/* Subtle grid/scanlines overlay for cyber effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(0,229,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] mix-blend-screen z-10"></div>
    </div>
  );
}
