import React, { useState, useEffect } from 'react';
import { useSyncoraStore } from '../../store/useSyncoraStore';
import { Search, Calendar, Users, Briefcase, CheckSquare, Sparkles, X } from 'lucide-react';
import { Role } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { events, tasks, vendors, setRole, setCurrentEventId } = useSyncoraStore();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredEvents = events.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase()) || e.client.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()) || t.department.toLowerCase().includes(query.toLowerCase())
  );

  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(query.toLowerCase()) || v.category.toLowerCase().includes(query.toLowerCase())
  );

  const selectRole = (role: Role) => {
    setRole(role);
    onClose();
  };

  const selectEvent = (eventId: string) => {
    setCurrentEventId(eventId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-2xl glass-panel border border-[#cdbbf0]/25 shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-[#cdbbf0]" />
          <input
            type="text"
            placeholder="Type a command, event, vendor or task..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-white/40 text-sm focus:outline-none font-sans"
          />
          <button onClick={onClose} className="text-white/40 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Quick Role Actions */}
          {!query && (
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-white/40 mb-2 px-2">
                Quick Role Switcher
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => selectRole('owner')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white cursor-pointer"
                >
                  <Briefcase className="w-4 h-4 text-[#2f7be8]" />
                  <span>Company Owner</span>
                </button>
                <button
                  onClick={() => selectRole('event-head')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#0e9aa7]" />
                  <span>Event Head</span>
                </button>
                <button
                  onClick={() => selectRole('team-lead')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white cursor-pointer"
                >
                  <Users className="w-4 h-4 text-[#6b4fb8]" />
                  <span>Team Lead</span>
                </button>
                <button
                  onClick={() => selectRole('volunteer')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white cursor-pointer"
                >
                  <CheckSquare className="w-4 h-4 text-[#5fe3c0]" />
                  <span>Volunteer Mode</span>
                </button>
              </div>
            </div>
          )}

          {/* Events */}
          {filteredEvents.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-white/40 mb-2 px-2">
                Events ({filteredEvents.length})
              </div>
              <div className="space-y-1">
                {filteredEvents.slice(0, 4).map((e) => (
                  <button
                    key={e.id}
                    onClick={() => selectEvent(e.id)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#2f7be8]" />
                      <div>
                        <div className="text-xs font-semibold text-white">{e.name}</div>
                        <div className="text-[11px] text-white/50">{e.client} · {e.date}</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#5fe3c0]">{e.health}% Health</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tasks */}
          {filteredTasks.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-white/40 mb-2 px-2">
                Tasks ({filteredTasks.length})
              </div>
              <div className="space-y-1">
                {filteredTasks.slice(0, 4).map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CheckSquare className="w-4 h-4 text-[#0e9aa7]" />
                      <div>
                        <div className="text-xs font-semibold text-white">{t.title}</div>
                        <div className="text-[11px] text-white/50">{t.department} · {t.assigneeName}</div>
                      </div>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 text-white/70">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vendors */}
          {filteredVendors.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-white/40 mb-2 px-2">
                Vendors ({filteredVendors.length})
              </div>
              <div className="space-y-1">
                {filteredVendors.slice(0, 3).map((v) => (
                  <div
                    key={v.id}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-left transition-colors"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white">{v.name}</div>
                      <div className="text-[11px] text-white/50">{v.category} · ₹{(v.quoteAmount / 100000).toFixed(1)}L</div>
                    </div>
                    <span className="text-xs font-mono text-[#cdbbf0]">{v.stage}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
          <span>Use <strong>ESC</strong> to close</span>
          <span>Tip: switch roles anytime using the top-right pill</span>
        </div>
      </div>
    </div>
  );
};
