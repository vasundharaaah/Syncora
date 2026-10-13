import React, { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: string;
  trendPositive?: boolean;
  icon: LucideIcon;
  sparklineData?: number[];
  accentColor?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  prefix = '',
  suffix = '',
  trend,
  trendPositive = true,
  icon: Icon,
  sparklineData = [12, 19, 15, 25, 22, 30, 28],
  accentColor = '#2f7be8'
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  // Generate sparkline path
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const width = 80;
  const height = 28;
  const points = sparklineData
    .map((d, i) => {
      const x = (i / (sparklineData.length - 1)) * width;
      const y = height - ((d - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="glass-panel-interactive rounded-xl p-4.5 relative overflow-hidden group">
      {/* Top subtle glow */}
      <div 
        className="absolute -top-12 -right-12 w-28 h-28 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"
        style={{ background: accentColor }}
      />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-white/55 font-medium">{label}</span>
        <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#cdbbf0] group-hover:scale-105 transition-transform">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-2xl font-mono font-semibold text-white tracking-tight tabular-nums">
          {prefix}{displayValue.toLocaleString('en-IN')}{suffix}
        </div>

        {/* Sparkline mini chart */}
        <div className="opacity-70 group-hover:opacity-100 transition-opacity">
          <svg width={width} height={height} className="overflow-visible">
            <polyline
              fill="none"
              stroke={accentColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>

      {trend && (
        <div className="mt-2.5 flex items-center gap-1.5 text-xs">
          <span className={`font-mono ${trendPositive ? 'text-[#5fe3c0]' : 'text-[#ff6b81]'}`}>
            {trend}
          </span>
          <span className="text-white/40">vs prior period</span>
        </div>
      )}
    </div>
  );
};
