import React, { useState } from 'react';
import { useSyncoraStore } from '../../../store/useSyncoraStore';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  PlayCircle, 
  AlertCircle, 
  Radio, 
  MapPin, 
  Users, 
  Filter,
  Sparkles
} from 'lucide-react';

interface RunOfShowCue {
  id: string;
  cueNumber: string;
  time: string;
  title: string;
  department: string;
  phase: string;
  lead: string;
  location: string;
  techTrigger: string;
  status: 'Completed' | 'Live Now' | 'Standby' | 'Scheduled';
}

const MASTER_CUES: RunOfShowCue[] = [
  {
    id: 'cue-1',
    cueNumber: 'CUE #01',
    time: '06:00 AM',
    title: 'Emergency Generator 65kVA Grid Cutover Test',
    department: 'Production',
    phase: 'Phase 1: Load-In',
    lead: 'Dev Saxena',
    location: 'Hotel Substation',
    techTrigger: 'Simulate 3-phase grid cut; verify 1.8s automatic transfer.',
    status: 'Completed'
  },
  {
    id: 'cue-2',
    cueNumber: 'CUE #02',
    time: '08:30 AM',
    title: 'P4 Center LED Wall Color Calibration & 4K Loop Test',
    department: 'Production',
    phase: 'Phase 1: Load-In',
    lead: 'Dev Saxena',
    location: 'Center Stage',
    techTrigger: 'Calibrate white balance to 6500K; zero dead pixels check.',
    status: 'Completed'
  },
  {
    id: 'cue-3',
    cueNumber: 'CUE #03',
    time: '12:00 PM',
    title: 'Chiavari Chairs 500 Count & Ramp Safety Inspection',
    department: 'Logistics',
    phase: 'Phase 2: Technical Rig',
    lead: 'Aman Verma',
    location: 'Main Ballroom Floor',
    techTrigger: 'Verify velvet pads, alignment to 85 circular banquet tables.',
    status: 'Completed'
  },
  {
    id: 'cue-4',
    cueNumber: 'CUE #04',
    time: '03:30 PM',
    title: 'VIP Suite 101 Fruit Platters & Beverage Staging',
    department: 'Hospitality',
    phase: 'Phase 2: Technical Rig',
    lead: 'Sneha Kulkarni',
    location: 'Green Room VIP Suite',
    techTrigger: 'Crystal tumblers set, organic juice chiller active.',
    status: 'Completed'
  },
  {
    id: 'cue-5',
    cueNumber: 'CUE #05',
    time: '04:30 PM',
    title: 'Buffet Culinary Stations Temperature Verification',
    department: 'F&B',
    phase: 'Phase 3: Hospitality Prep',
    lead: 'Rahul Sharma',
    location: 'Ballroom Foyer Zone B',
    techTrigger: 'Digital probe check (>65°C hot, <4°C cold displays).',
    status: 'Completed'
  },
  {
    id: 'cue-6',
    cueNumber: 'CUE #06',
    time: '05:15 PM',
    title: 'Chairman Convoy Porch Arrival & Diplomatic Escort',
    department: 'Hospitality',
    phase: 'Phase 3: Hospitality Prep',
    lead: 'Sneha Kulkarni & Ritu Agarwal',
    location: 'Main Hotel Porch',
    techTrigger: '4 hosts deployed with brooches and Chairman convoy liaison.',
    status: 'Live Now'
  },
  {
    id: 'cue-7',
    cueNumber: 'CUE #07',
    time: '05:45 PM',
    title: 'RFID Badge High-Speed Scanner Desks Active',
    department: 'Registration',
    phase: 'Phase 4: Arrivals',
    lead: 'Simran Kaur',
    location: 'Gate 2 Entrance Portal',
    techTrigger: '8 synced iPad terminals scanning QR/NFC passes.',
    status: 'Live Now'
  },
  {
    id: 'cue-8',
    cueNumber: 'CUE #08',
    time: '06:15 PM',
    title: 'Auditorium Doors Open & Chime 1 Broadcast',
    department: 'Guest Management',
    phase: 'Phase 4: Arrivals',
    lead: 'Priya Nambiar',
    location: 'Grand Ballroom Doors 1-4',
    techTrigger: 'FOH background score down to 20%; 12 ushers on aisles.',
    status: 'Standby'
  },
  {
    id: 'cue-9',
    cueNumber: 'CUE #09',
    time: '06:30 PM',
    title: 'Inaugural Traditional Brass Diya Lamp Lighting',
    department: 'Backstage',
    phase: 'Phase 5: Keynote Plenary',
    lead: 'Zaheer Merchant',
    location: 'Stage Right Holding Table',
    techTrigger: 'Spotlight sweep cue #L-14; ceremonial instrumental music.',
    status: 'Scheduled'
  },
  {
    id: 'cue-10',
    cueNumber: 'CUE #10',
    time: '06:45 PM',
    title: 'Chairman Keynote Address on Presidential Prompter',
    department: 'Production',
    phase: 'Phase 5: Keynote Plenary',
    lead: 'Alisha Mehta',
    location: 'Main Podium Center',
    techTrigger: 'Dual teleprompter glass synchronized; clean OB recording.',
    status: 'Scheduled'
  },
  {
    id: 'cue-11',
    cueNumber: 'CUE #11',
    time: '08:00 PM',
    title: 'Leadership Excellence Awards Trophy Handout',
    department: 'Backstage',
    phase: 'Phase 5: Keynote Plenary',
    lead: 'Sanjana Pillai',
    location: 'Stage Left Presentation Dock',
    techTrigger: '18 crystal trophies staged in sequence; stinger musical cues.',
    status: 'Scheduled'
  },
  {
    id: 'cue-12',
    cueNumber: 'CUE #12',
    time: '08:45 PM',
    title: 'Five-Course Plated Banquet Gala Service Commences',
    department: 'F&B',
    phase: 'Phase 6: Gala & Strike',
    lead: 'Rahul Sharma',
    location: 'Main Ballroom 85 Tables',
    techTrigger: 'Synchronized synchronized silver service plate drop.',
    status: 'Scheduled'
  }
];

export const TimelineModule: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState('All');

  const filteredCues = MASTER_CUES.filter((c) => {
    if (selectedPhase === 'All') return true;
    return c.phase === selectedPhase;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#0d0b17] via-[#050b2e] to-[#07060d]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#0e9aa7]/20 text-[#5fe3c0] border border-[#0e9aa7]/30">
                Master Cue Sheet
              </span>
              <span className="text-xs font-mono text-white/50">Run-Of-Show Protocol</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">Timeline & Cue Sheet Registry</h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl">
              Minute-by-minute live production cue sequence spanning load-in, AV tech checks, arrival protocols, stage keynotes, and teardown.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>CUE #06 LIVE NOW</span>
            </span>
          </div>
        </div>

        {/* 6 Lifecycle Phase Stepper Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-6 pt-6 border-t border-white/10 text-xs">
          {[
            { phase: '01. Rig & Load-In', time: '06:00 - 11:00', state: 'done' },
            { phase: '02. Tech Dry Run', time: '11:00 - 15:30', state: 'done' },
            { phase: '03. VIP Hospitality', time: '15:30 - 17:00', state: 'live' },
            { phase: '04. Arrivals & Red Carpet', time: '17:00 - 18:30', state: 'live' },
            { phase: '05. Keynotes & Awards', time: '18:30 - 21:00', state: 'pending' },
            { phase: '06. Gala & Strike', time: '21:00 - 23:30', state: 'pending' }
          ].map((step, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                step.state === 'live'
                  ? 'bg-gradient-to-b from-[#0e9aa7]/30 to-[#2f7be8]/20 border-[#0e9aa7] text-white shadow-lg'
                  : step.state === 'done'
                  ? 'bg-white/5 border-white/10 text-white/60'
                  : 'bg-white/[0.02] border-white/5 text-white/40'
              }`}
            >
              <div className="font-semibold text-[11px] truncate">{step.phase}</div>
              <div className="text-[10px] font-mono text-white/40 mt-0.5">{step.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 overflow-x-auto">
          {[
            'All',
            'Phase 1: Load-In',
            'Phase 2: Technical Rig',
            'Phase 3: Hospitality Prep',
            'Phase 4: Arrivals',
            'Phase 5: Keynote Plenary',
            'Phase 6: Gala & Strike'
          ].map((ph) => (
            <button
              key={ph}
              onClick={() => setSelectedPhase(ph)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedPhase === ph
                  ? 'bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] text-white font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {ph}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-white/40">{filteredCues.length} Master Cues</span>
      </div>

      {/* Cues List */}
      <div className="space-y-3">
        {filteredCues.map((cue) => {
          const isLive = cue.status === 'Live Now';
          const isDone = cue.status === 'Completed';
          return (
            <div
              key={cue.id}
              className={`glass-panel rounded-2xl p-5 border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isLive
                  ? 'border-[#0e9aa7] bg-[#0e9aa7]/10 shadow-[0_0_20px_rgba(14,154,167,0.15)]'
                  : isDone
                  ? 'border-white/10 hover:bg-white/[0.03]'
                  : 'border-white/10 hover:bg-white/[0.04]'
              }`}
            >
              {/* Cue ID & Timing */}
              <div className="flex items-start md:items-center gap-4">
                <div className="w-24 shrink-0">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    isLive
                      ? 'bg-[#0e9aa7] text-white'
                      : isDone
                      ? 'bg-white/10 text-[#5fe3c0]'
                      : 'bg-white/10 text-white/70'
                  }`}>
                    {cue.cueNumber}
                  </span>
                  <div className="text-xs font-mono font-bold text-white mt-1.5">{cue.time}</div>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{cue.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-[#cdbbf0]">
                      {cue.department}
                    </span>
                  </div>
                  <p className="text-xs text-white/70">{cue.techTrigger}</p>
                  <div className="flex flex-wrap items-center gap-x-4 text-[11px] text-white/50 pt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-white/40" />
                      <span>{cue.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-white/40" />
                      <span>Lead: {cue.lead}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="shrink-0 flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono ${
                  isLive
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold animate-pulse'
                    : isDone
                    ? 'bg-white/10 text-white/50'
                    : 'bg-white/10 text-white/70'
                }`}>
                  {cue.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
