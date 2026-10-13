import React from 'react';
import { useSyncoraStore } from '../../store/useSyncoraStore';
import { Role } from '../../types';
import { ShieldCheck, UserCheck, Users, Smartphone } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { currentRole, setRole } = useSyncoraStore();

  const roles: { id: Role; label: string; shortLabel: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'owner', label: 'Owner', shortLabel: 'Owner', icon: ShieldCheck },
    { id: 'event-head', label: 'Event Head', shortLabel: 'Head', icon: UserCheck },
    { id: 'team-lead', label: 'Team Lead', shortLabel: 'Lead', icon: Users },
    { id: 'volunteer', label: 'Volunteer', shortLabel: 'Vol', icon: Smartphone }
  ];

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
      <div className="inline-flex items-center p-0.5 sm:p-1 rounded-full border border-[#cdbbf0]/20 bg-black/70 backdrop-blur-xl shrink-0 text-white">
        <span className="text-[10px] uppercase font-mono tracking-wider px-2 hidden 2xl:inline-block text-white/40">
          Role:
        </span>
        <div className="flex items-center gap-0.5 sm:gap-1">
          {roles.map((r) => {
            const Icon = r.icon;
            const isActive = currentRole === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                title={`Switch to ${r.label} view`}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#2f7be8] to-[#6b4fb8] shadow-[0_0_12px_rgba(47,123,232,0.45)] font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className={isActive ? 'inline' : 'hidden lg:inline'}>
                  {r.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
