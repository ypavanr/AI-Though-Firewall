import React from 'react';
import { motion } from 'framer-motion';

const emotionToEmoji = (emotion) => {
  const str = emotion.toLowerCase();
  if (str.includes('fear') || str.includes('anxiety') || str.includes('panic')) return '😨';
  if (str.includes('anger') || str.includes('rage') || str.includes('outrage')) return '😡';
  if (str.includes('disgust')) return '🤢';
  if (str.includes('sadness') || str.includes('depress')) return '😢';
  if (str.includes('joy') || str.includes('happy') || str.includes('excit')) return '😄';
  if (str.includes('urgency') || str.includes('immediate')) return '🚨';
  if (str.includes('phishing') || str.includes('scam') || str.includes('fake')) return '🤥';
  if (str.includes('calm') || str.includes('trust') || str.includes('secure')) return '😌';
  return '😐'; // fallback
};

export function EmotionFace3D({ isAnalyzing, detectedEmotions = [] }) {
  const primaryEmotion = detectedEmotions.length > 0 ? detectedEmotions[0].toLowerCase() : 'neutral';
  const isThreat = primaryEmotion.includes('fear') || primaryEmotion.includes('urgency') || primaryEmotion.includes('anger');

  let glowColor = "rgba(0, 229, 255, 0.2)"; // default cyan
  let moodText = "NEUTRAL STATE";

  if (isAnalyzing) {
    glowColor = "rgba(176, 0, 255, 0.4)"; // purple pulse
    moodText = "ANALYZING...";
  } else if (isThreat) {
    glowColor = "rgba(255, 0, 60, 0.5)"; // aggressive red
    moodText = "THREAT / HIGH ANXIETY";
  } else if (primaryEmotion.includes('calm') || primaryEmotion.includes('trust')) {
    glowColor = "rgba(0, 255, 162, 0.3)"; // secure green
    moodText = "SECURE / CALM";
  } else if (detectedEmotions.length === 0) {
    glowColor = "rgba(0, 255, 162, 0.3)"; // secure green
    moodText = "POSITIVE / SECURE";
  }

  // Determine which emojis to show
  let displayEmojis = [];
  if (isAnalyzing) {
    displayEmojis = ['⏳'];
  } else if (detectedEmotions.length === 0 || (detectedEmotions.length === 1 && detectedEmotions[0] === "No clear manipulation detected")) {
    displayEmojis = ['😊'];
    moodText = "POSITIVE / SECURE";
    glowColor = "rgba(0, 255, 162, 0.3)";
  } else {
    // Get top 2 distinct emojis
    const rawEmojis = detectedEmotions.slice(0, 2).map(e => emotionToEmoji(e));
    displayEmojis = [...new Set(rawEmojis)]; // remove duplicates if both map to same emoji
  }

  return (
    <div 
      className="relative w-full h-[300px] rounded-xl overflow-hidden bg-[#05050A] border border-white/5 transition-all duration-700 ease-in-out flex items-center justify-center"
      style={{ boxShadow: `0 0 40px ${glowColor} inset, 0 0 20px ${glowColor}` }}
    >
      <div className="flex gap-8 z-20">
        {displayEmojis.map((emoji, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ 
              scale: isAnalyzing ? [1, 1.2, 1] : 1, 
              rotate: isAnalyzing ? [0, 360] : [0, -5, 5, 0],
              y: isAnalyzing ? 0 : [0, -10, 0]
            }}
            transition={{ 
              duration: isAnalyzing ? 2 : 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: index * 0.2
            }}
            className="text-8xl select-none"
            style={{ 
              filter: `drop-shadow(0 20px 20px rgba(0,0,0,0.8)) drop-shadow(0 0 40px ${glowColor.replace('0.2', '0.8').replace('0.5', '0.8').replace('0.4', '0.8')})`,
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none z-20">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Cognitive State</p>
          <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10">
            <span 
              className="text-xs font-mono font-bold tracking-widest transition-colors duration-500"
              style={{ color: isAnalyzing ? '#b000ff' : isThreat ? '#ff003c' : '#00e5ff' }}
            >
              {moodText}
            </span>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(0,229,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] mix-blend-screen z-10"></div>
    </div>
  );
}
