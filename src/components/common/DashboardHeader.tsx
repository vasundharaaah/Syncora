import React, { useState } from 'react';
import { useSyncoraStore } from '../../store/useSyncoraStore';
import { RoleSwitcher } from './RoleSwitcher';
import { Search, Bell, Activity, RotateCcw } from 'lucide-react';

interface DashboardHeaderProps {
  onOpenCommandPalette: () => void;
  title?: string;
  subtitle?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onOpenCommandPalette,
  title,
  subtitle
}) => {
  const { currentRole, currentEventId, events, alerts, setCurrentEventId, isSimulating, toggleSimulation, resetToDefaultData } = useSyncoraStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const unresolvedAlerts = alerts.filter((a) => !a.isResolved);

  const roleNameMap: Record<string, string> = {
    owner: 'Company Command Center',
    'event-head': 'Event Master Control',
    'team-lead': 'Department Operations',
    volunteer: 'Volunteer Execution'
  };

  const roleAvatarMap: Record<string, { name: string; tag: string }> = {
    owner: { name: 'Vikramaditya Singhania', tag: 'Managing Director' },
    'event-head': { name: 'Aditi Rao', tag: 'Principal Event Head' },
    'team-lead': { name: 'Rahul Sharma', tag: 'F&B Operations Lead' },
    volunteer: { name: 'Rahul (Volunteer 1)', tag: 'Floor Deployment Team' }
  };

  const user = roleAvatarMap[currentRole] || roleAvatarMap.owner;

  return (
    <header className="sticky top-0 z-40 w-full bg-black/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 overflow-hidden">
      {/* Left Zone: Title, Live indicator, and Optional Event Switcher */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-sm sm:text-base font-display font-bold text-white tracking-tight truncate">
              {title || roleNameMap[currentRole]}
            </h1>
            <span className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-medium bg-[#0e9aa7]/20 text-[#5fe3c0] border border-[#0e9aa7]/30">
              <span className="w-1 h-1 rounded-full bg-[#5fe3c0] animate-pulse" />
              LIVE
            </span>
          </div>
          {subtitle && (
            <p className="text-[11px] text-white/50 truncate font-sans mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {/* Event Quick Switcher dropdown (bounded max-width to prevent collisions) */}
        {(currentRole === 'event-head' || currentRole === 'owner') && (
          <div className="hidden md:flex items-center shrink-0">
            <select
              value={currentEventId}
              onChange={(e) => setCurrentEventId(e.target.value)}
              className="w-36 lg:w-48 bg-white/5 border border-white/15 rounded-lg px-2 py-1 text-xs text-white font-medium focus:outline-none focus:border-[#cdbbf0]/50 cursor-pointer truncate"
              title="Switch Active Event"
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id} className="bg-[#0d0b17] text-white truncate">
                  {ev.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right Zone: Controls, Notifications, Role Switcher, and User Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Simulation toggle button */}
        <button
          onClick={toggleSimulation}
          title={isSimulating ? 'Live background event simulator is active (every 10s)' : 'Click to simulate live background events'}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-mono border transition-all cursor-pointer ${
            isSimulating
              ? 'bg-[#0e9aa7]/20 border-[#0e9aa7]/40 text-[#5fe3c0]'
              : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <Activity className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isSimulating ? 'Sim ON' : 'Simulate'}</span>
        </button>

        {/* Reset deliverables button */}
        <button
          onClick={resetToDefaultData}
          title="Reset deliverables to active hardcoded mix (To Do, In Progress, and Done)"
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-mono border border-white/10 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
        >
          <RotateCcw className="w-3 h-3 text-[#cdbbf0]" />
          <span className="hidden lg:inline">Reset Data</span>
        </button>

        {/* Search trigger */}
        <button
          onClick={onOpenCommandPalette}
          title="Search events, vendors, tasks (Ctrl+K)"
          className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-[#cdbbf0]" />
          <span className="hidden xl:inline text-[11px] font-mono">⌘K</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            title="View live alerts"
          >
            <Bell className="w-3.5 h-3.5" />
            {unresolvedAlerts.length > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#ff6b81]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl glass-panel border border-[#cdbbf0]/30 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                <span className="text-xs font-semibold text-white">Live Alerts & Intelligence</span>
                <span className="text-[10px] font-mono text-[#ff6b81]">{unresolvedAlerts.length} Active</span>
              </div>
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                {unresolvedAlerts.length === 0 ? (
                  <p className="text-xs text-white/50 text-center py-4">No active risk flags.</p>
                ) : (
                  unresolvedAlerts.map((alt) => (
                    <div key={alt.id} className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs">
                      <div className="flex items-center justify-between text-[#ff6b81] font-semibold text-[11px] mb-1">
                        <span>{alt.title}</span>
                        <span className="text-[10px] uppercase font-mono">{alt.severity}</span>
                      </div>
                      <p className="text-white/70 text-[11px] leading-tight">{alt.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher Pill */}
        <RoleSwitcher />

        {/* User Card */}
        <div className="flex items-center gap-2 pl-1.5 sm:pl-2 border-l border-white/10">
          <div 
            className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#2f7be8] to-[#6b4fb8] flex items-center justify-center font-bold text-[10px] text-white shadow-md shrink-0"
            title={`${user.name} (${user.tag})`}
          >
            {user.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
          </div>
          <div className="hidden 2xl:flex flex-col">
            <span className="text-xs font-semibold text-white leading-tight">{user.name}</span>
            <span className="text-[9px] text-white/50 leading-tight">{user.tag}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
