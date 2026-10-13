import React, { useState } from 'react';
import { useSyncoraStore } from '../../../store/useSyncoraStore';
import { EventStatus } from '../../../types';
import { 
  Search, 
  MapPin, 
  Users, 
  TrendingUp, 
  Calendar, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  Sparkles
} from 'lucide-react';

export const EventsCommandRegistry: React.FC = () => {
  const { events, setCurrentEventId, setRole } = useSyncoraStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | EventStatus>('All');

  const filteredEvents = events.filter((ev) => {
    const matchesSearch = 
      ev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.eventHead.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ev.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalContractValue = events.reduce((sum, e) => sum + e.budget, 0);
  const totalProjectedProfit = events.reduce((sum, e) => sum + e.projectedProfit, 0);
  const avgHealth = Math.round(events.reduce((sum, e) => sum + e.health, 0) / (events.length || 1));
  const totalAttendees = events.reduce((sum, e) => sum + e.attendeesCount, 0);

  const handleOpenEvent = (eventId: string) => {
    setCurrentEventId(eventId);
    setRole('event-head');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#0d0b17] via-[#050b2e] to-[#07060d]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#2f7be8]/20 text-[#5fe3c0] border border-[#2f7be8]/30">
                Master Portfolio
              </span>
              <span className="text-xs font-mono text-white/50">12 Active Productions In Motion</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">Events Command Registry</h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl">
              Cross-production executive monitoring across commercial contracts, margin performance, and site director execution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#cdbbf0] px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#5fe3c0]" />
              <span>Real-Time Sync Active</span>
            </span>
          </div>
        </div>

        {/* 4 Macro KPI Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Total Pipeline Value</span>
            <div className="text-xl font-mono font-bold text-white mt-1">₹{(totalContractValue / 10000000).toFixed(2)} Cr</div>
            <span className="text-[10px] text-[#5fe3c0] mt-0.5 block">100% contracted funds</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Net Projected Margin</span>
            <div className="text-xl font-mono font-bold text-[#5fe3c0] mt-1">₹{(totalProjectedProfit / 100000).toFixed(1)} L</div>
            <span className="text-[10px] text-white/40 mt-0.5 block">24.8% average profit margin</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Avg Health Score</span>
            <div className="text-xl font-mono font-bold text-white mt-1">{avgHealth}% Healthy</div>
            <span className="text-[10px] text-[#2f7be8] mt-0.5 block">Zero red-flag defaults</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Total Footfall</span>
            <div className="text-xl font-mono font-bold text-white mt-1">{totalAttendees.toLocaleString()} Guests</div>
            <span className="text-[10px] text-white/40 mt-0.5 block">Across 7 premier venues</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event, client, venue or director..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#cdbbf0]"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 self-start sm:self-auto">
          {(['All', 'Upcoming', 'Ongoing', 'Closed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-gradient-to-r from-[#2f7be8] to-[#6b4fb8] text-white font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Events Table / Card Registry */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-semibold text-white">Event Contracts ({filteredEvents.length})</span>
          <span className="text-[10px] font-mono text-white/40">Click any row to open Event Head Mission View</span>
        </div>

        <div className="divide-y divide-white/10">
          {filteredEvents.map((ev) => {
            const isTata = ev.id === 'tata-corporate';
            return (
              <div
                key={ev.id}
                onClick={() => handleOpenEvent(ev.id)}
                className="p-5 hover:bg-white/[0.04] transition-all cursor-pointer group flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Event Primary Info */}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-base font-bold text-white group-hover:text-[#cdbbf0] transition-colors">
                      {ev.name}
                    </span>
                    {isTata && (
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[#0e9aa7]/30 text-[#5fe3c0] border border-[#0e9aa7]/40">
                        Current Mission
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      ev.status === 'Ongoing'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-white/10 text-white/70'
                    }`}>
                      {ev.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-white/50">
                    <span className="text-white/80 font-medium">{ev.client}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-white/40" />
                      <span>{ev.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-white/40" />
                      <span>{ev.date}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-white/40" />
                      <span>{ev.attendeesCount} pax</span>
                    </span>
                  </div>
                </div>

                {/* Director & Planning Progress */}
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono uppercase text-white/40 block">Director</span>
                    <span className="text-xs font-semibold text-white">{ev.eventHead}</span>
                  </div>

                  <div className="w-28">
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/60 mb-1">
                      <span>Ready</span>
                      <span className="font-semibold text-white">{ev.planningCompletion}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] rounded-full"
                        style={{ width: `${ev.planningCompletion}%` }}
                      />
                    </div>
                  </div>

                  {/* Financials */}
                  <div className="text-right w-24">
                    <span className="text-[10px] font-mono uppercase text-white/40 block">Budget</span>
                    <div className="text-xs font-mono font-bold text-white">₹{(ev.budget / 100000).toFixed(1)}L</div>
                    <span className="text-[10px] font-mono text-[#5fe3c0] block">+₹{(ev.projectedProfit / 100000).toFixed(1)}L net</span>
                  </div>

                  {/* Health Score */}
                  <div className="text-right w-20">
                    <span className="text-[10px] font-mono uppercase text-white/40 block">Health</span>
                    <span className={`text-xs font-mono font-bold ${
                      ev.health >= 80 ? 'text-[#5fe3c0]' : ev.health >= 60 ? 'text-[#cdbbf0]' : 'text-[#ff6b81]'
                    }`}>
                      {ev.health}%
                    </span>
                  </div>

                  {/* Arrow Action */}
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#2f7be8]/20 text-white/40 group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
