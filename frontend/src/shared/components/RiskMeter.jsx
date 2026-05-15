import { useEffect, useState } from 'react';

export function RiskMeter({ score, className }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  // Determine color based on score
  let strokeColor = "stroke-[var(--color-cyber-success)]";
  if (score > 40) strokeColor = "stroke-yellow-400";
  if (score > 70) strokeColor = "stroke-[var(--color-cyber-danger)]";

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className={`relative w-32 h-32 flex items-center justify-center ${className}`}>
      {/* Background circle */}
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-slate-800"
        />
        {/* Progress circle */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${strokeColor} transition-all duration-1000 ease-out`}
          style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black font-mono tracking-tighter" style={{ color: strokeColor.replace('stroke-', '') }}>
          {Math.round(displayScore)}
        </span>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Risk</span>
      </div>
    </div>
  );
}
