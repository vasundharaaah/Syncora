import React from 'react';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface HealthRingProps {
  score: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export const HealthRing: React.FC<HealthRingProps> = ({
  score,
  size = 52,
  strokeWidth = 4,
  showLabel = true
}) => {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let strokeColor = '#0e9aa7'; // Healthy mint-teal
  let labelText = 'Healthy';
  let Icon = CheckCircle2;

  if (score < 50) {
    strokeColor = '#8c2b3d'; // Critical crimson
    labelText = 'Critical';
    Icon = AlertTriangle;
  } else if (score < 75) {
    strokeColor = '#cdbbf0'; // At-risk lilac
    labelText = 'At Risk';
    Icon = Clock;
  }

  return (
    <div className="inline-flex items-center gap-2.5">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(205, 187, 240, 0.12)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-xs font-mono font-medium text-white tabular-nums">
          {score}%
        </span>
      </div>

      {showLabel && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: strokeColor }}>
            <Icon className="w-3.5 h-3.5" />
            <span>{labelText}</span>
          </div>
          <span className="text-[10px] text-white/50 tracking-wider uppercase font-sans">Health Score</span>
        </div>
      )}
    </div>
  );
};
