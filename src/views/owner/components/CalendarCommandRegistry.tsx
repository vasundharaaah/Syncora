import React, { useState } from 'react';
import { useSyncoraStore } from '../../../store/useSyncoraStore';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';

interface ProductionMilestone {
  date: string;
  eventName: string;
  milestone: string;
  type: 'load-in' | 'rehearsal' | 'show' | 'strike';
  director: string;
  venue: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
}

const SCHEDULE_MILESTONES: ProductionMilestone[] = [
  {
    date: '10 Dec 2026',
    eventName: 'Pulse Sunset Electronic Festival',
    milestone: 'Beach Stage Truss & Sound Tower Rigging',
    type: 'load-in',
    director: 'Karan Mehra',
    venue: 'Vagator Beach Arena, Goa',
    status: 'Completed'
  },
  {
    date: '12 Dec 2026',
    eventName: 'InnovateX 48h National Hackathon',
    milestone: '10Gbps Dedicated Fiber Run & LAN Stress Test',
    type: 'rehearsal',
    director: 'Aditi Rao',
    venue: 'T-Hub Innovation Hub, Hyderabad',
    status: 'Completed'
  },
  {
    date: '14 Dec 2026',
    eventName: 'Tata Corporate Leadership Conclave',
    milestone: 'Load-In: 500 Chiavari Chairs, Heavy Cable Bridges & Risers',
    type: 'load-in',
    director: 'Aditi Rao',
    venue: 'Taj Lands End, Grand Ballroom, Mumbai',
    status: 'In Progress'
  },
  {
    date: '15 Dec 2026',
    eventName: 'Tata Corporate Leadership Conclave',
    milestone: 'Plenary Keynote, Presidential Prompter & Leadership Gala',
    type: 'show',
    director: 'Aditi Rao',
    venue: 'Taj Lands End, Grand Ballroom, Mumbai',
    status: 'Upcoming'
  },
  {
    date: '18 Dec 2026',
    eventName: 'Aether EV Supercar India Reveal',
    milestone: 'Automotive Rotating Turntable & Cold Spark Array Dry Run',
    type: 'rehearsal',
    director: 'Pooja Iyer',
    venue: 'Acroplis Hangar, Aerocity, Delhi',
    status: 'Upcoming'
  },
  {
    date: '22 Dec 2026',
    eventName: 'Sharma & Kapoor Royal Wedding',
    milestone: 'Palace Courtyard Floral Canopy & Ambient Lantern Rig',
    type: 'load-in',
    director: 'Rohan Verma',
    venue: 'Umaid Bhawan Palace Grounds, Jodhpur',
    status: 'Upcoming'
  },
  {
    date: '24 Dec 2026',
    eventName: 'Contemporary South Asian Art Biennale',
    milestone: 'Curatorial Lighting Setup & High-CRI Spot Tuning',
    type: 'load-in',
    director: 'Rohan Verma',
    venue: 'Aspinwall House, Fort Kochi',
    status: 'Upcoming'
  },
  {
    date: '28 Dec 2026',
    eventName: 'Horizon Tech & Cultural Fest',
    milestone: 'Open-Air Amphitheatre Line Array Fly-In (L-Acoustics K2)',
    type: 'load-in',
    director: 'Karan Mehra',
    venue: 'Open Air Amphitheatre, IIT Bombay',
    status: 'Upcoming'
  },
  {
    date: '30 Dec 2026',
    eventName: 'Singhania Heritage Palace Sangeet',
    milestone: 'Lake Pichola Floating Barge Fireworks Synchronisation',
    type: 'show',
    director: 'Rohan Verma',
    venue: 'City Palace Courtyard, Udaipur',
    status: 'Upcoming'
  }
];

export const CalendarCommandRegistry: React.FC = () => {
  const { events, setCurrentEventId, setRole } = useSyncoraStore();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredMilestones = SCHEDULE_MILESTONES.filter((m) => {
    if (filterType === 'all') return true;
    return m.type === filterType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#0d0b17] via-[#050b2e] to-[#07060d]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#0e9aa7]/20 text-[#5fe3c0] border border-[#0e9aa7]/30">
                Cross-Event Matrix
              </span>
              <span className="text-xs font-mono text-white/50">December 2026 / Q4 Peak Season</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">Calendar Command Registry</h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl">
              Multi-production master timeline synchronizing venue load-ins, rehearsal time slots, showtimes, and crew teardown.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
            <span className="text-xs font-mono text-white px-3 py-1 font-semibold">Dec 2026</span>
          </div>
        </div>

        {/* Highlight Overlap Alert */}
        <div className="mt-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-200">Production Overlap Audit Verified:</span>
            <span className="text-amber-200/80 ml-1">
              Rohan Verma directs Sharma Wedding (Jodhpur, Dec 22) and Art Biennale (Kochi, Dec 24). Flight & handover buffer confirmed at 36 hours. Second technical director on standby.
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
          {[
            { id: 'all', label: 'All Milestones (9)' },
            { id: 'load-in', label: 'Load-In & Rigging' },
            { id: 'rehearsal', label: 'Tech Rehearsals' },
            { id: 'show', label: 'Show Days' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterType === tab.id
                  ? 'bg-gradient-to-r from-[#2f7be8] to-[#6b4fb8] text-white font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-white/40">Synchronized with 12 client contracts</span>
      </div>

      {/* Timeline List Cards */}
      <div className="space-y-3">
        {filteredMilestones.map((m, idx) => {
          const isShow = m.type === 'show';
          const isLoadIn = m.type === 'load-in';
          return (
            <div
              key={idx}
              className={`glass-panel rounded-2xl p-5 border transition-all hover:bg-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isShow
                  ? 'border-[#cdbbf0]/40 bg-gradient-to-r from-[#0d0b17] to-[#120d2b]'
                  : 'border-white/10'
              }`}
            >
              {/* Date & Badge */}
              <div className="flex items-start md:items-center gap-4">
                <div className="w-24 shrink-0 text-left">
                  <div className="text-xs font-mono font-bold text-white">{m.date}</div>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider ${
                    m.type === 'show'
                      ? 'bg-gradient-to-r from-[#6b4fb8] to-[#cdbbf0] text-black font-bold'
                      : m.type === 'load-in'
                      ? 'bg-[#0e9aa7]/20 text-[#5fe3c0] border border-[#0e9aa7]/30'
                      : 'bg-white/10 text-white/70'
                  }`}>
                    {m.type}
                  </span>
                </div>

                {/* Event & Milestone Details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{m.eventName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      m.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : m.status === 'In Progress'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-white/10 text-white/60'
                    }`}>
                      {m.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/80">{m.milestone}</p>
                  <div className="flex flex-wrap items-center gap-x-4 text-[11px] text-white/50 pt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-white/40" />
                      <span>{m.venue}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-white/40" />
                      <span>Director: {m.director}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => {
                    const matched = events.find((e) => e.name.toLowerCase().includes(m.eventName.slice(0, 8).toLowerCase()));
                    if (matched) {
                      setCurrentEventId(matched.id);
                      setRole('event-head');
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-colors cursor-pointer"
                >
                  Inspect Cue Sheet
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
