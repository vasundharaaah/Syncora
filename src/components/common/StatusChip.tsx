import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, PlayCircle } from 'lucide-react';

interface StatusChipProps {
  status: 'done' | 'in-progress' | 'critical' | 'todo' | 'approved' | 'Upcoming' | 'Ongoing' | 'Closed' | 'Arrived' | 'In Transit';
  label?: string;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ status, label, className = '' }) => {
  let colorClass = 'text-[#5fe3c0] border-[#0e9aa7]/30 bg-[#0e9aa7]/10';
  let Icon = CheckCircle2;
  let text = label || status;

  switch (status) {
    case 'done':
    case 'approved':
    case 'Arrived':
      colorClass = 'text-[#5fe3c0] border-[#0e9aa7]/30 bg-[#0e9aa7]/10';
      Icon = CheckCircle2;
      text = label || (status === 'done' ? 'Completed' : status === 'approved' ? 'Verified' : 'Arrived');
      break;
    case 'in-progress':
    case 'Ongoing':
    case 'In Transit':
      colorClass = 'text-[#cdbbf0] border-[#6b4fb8]/40 bg-[#6b4fb8]/15';
      Icon = Clock;
      text = label || (status === 'in-progress' ? 'In Progress' : status === 'Ongoing' ? 'Active Live' : 'In Transit');
      break;
    case 'critical':
      colorClass = 'text-[#ff6b81] border-[#8c2b3d]/50 bg-[#8c2b3d]/20 animate-pulse-subtle';
      Icon = AlertTriangle;
      text = label || 'Critical Action';
      break;
    case 'todo':
    case 'Upcoming':
      colorClass = 'text-white/70 border-white/15 bg-white/5';
      Icon = PlayCircle;
      text = label || (status === 'todo' ? 'To Do' : 'Upcoming');
      break;
    case 'Closed':
      colorClass = 'text-white/50 border-white/10 bg-black/40';
      Icon = CheckCircle2;
      text = label || 'Closed';
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border backdrop-blur-md whitespace-nowrap ${colorClass} ${className}`}>
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{text}</span>
    </span>
  );
};
