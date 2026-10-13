import React from 'react';
import { AuroraBackground } from '../components/common/AuroraBackground';
import { Role } from '../types';
import { ShieldCheck, UserCheck, Users, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react';

interface LoginChooserProps {
  onSelectRole: (role: Role) => void;
  onBackToLanding: () => void;
}

export const LoginChooser: React.FC<LoginChooserProps> = ({ onSelectRole, onBackToLanding }) => {
  const roles: {
    id: Role;
    name: string;
    tagline: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    accentGradient: string;
    borderGlow: string;
  }[] = [
    {
      id: 'owner',
      name: 'Company Owner',
      tagline: 'COMMAND YOUR COMPANY',
      description: 'Full portfolio oversight, profit margins, multi-event cash flow, and vendor ledgers.',
      icon: ShieldCheck,
      accentGradient: 'from-[#1d4ed8] to-[#6b4fb8]',
      borderGlow: 'hover:border-[#2f7be8]/60 hover:shadow-[0_0_35px_rgba(47,123,232,0.35)]'
    },
    {
      id: 'event-head',
      name: 'Event Head',
      tagline: 'RUN YOUR EVENT',
      description: 'End-to-end timeline, vendor quotation pipelines, live logistics, and meeting intelligence.',
      icon: UserCheck,
      accentGradient: 'from-[#0e9aa7] to-[#2f7be8]',
      borderGlow: 'hover:border-[#0e9aa7]/60 hover:shadow-[0_0_35px_rgba(14,154,167,0.35)]'
    },
    {
      id: 'team-lead',
      name: 'Department Lead',
      tagline: 'LEAD YOUR DEPARTMENT',
      description: 'F&B, Decor, and Production task boards, volunteer rosters, and photo verification queue.',
      icon: Users,
      accentGradient: 'from-[#6b4fb8] to-[#cdbbf0]',
      borderGlow: 'hover:border-[#6b4fb8]/60 hover:shadow-[0_0_35px_rgba(107,79,184,0.35)]'
    },
    {
      id: 'volunteer',
      name: 'Volunteer',
      tagline: 'KNOW WHAT’S NEXT',
      description: 'Simplified mobile-first schedule, one-tap task start, camera photo proof, and shift check-in.',
      icon: Smartphone,
      accentGradient: 'from-[#0e9aa7] to-[#5fe3c0]',
      borderGlow: 'hover:border-[#5fe3c0]/60 hover:shadow-[0_0_35px_rgba(95,227,192,0.35)]'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between p-6 sm:p-12 z-10">
      <AuroraBackground />

      {/* Top Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between z-20">
        <button
          onClick={onBackToLanding}
          className="flex items-center gap-2 text-xs font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </button>

        <img
          src="/assets/logo.png"
          alt="SYNCORA"
          className="h-8 w-auto object-contain filter drop-shadow-[0_0_16px_rgba(205,187,240,0.35)]"
        />

        <div className="w-20" />
      </div>

      {/* Central 2x2 Grid */}
      <div className="max-w-4xl mx-auto w-full my-auto py-8 z-20">
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#cdbbf0] mb-2 block">
            SELECT WORKSPACE
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
            Choose your role to begin
          </h2>
          <p className="text-xs sm:text-sm text-white/50 max-w-md mx-auto mt-2">
            Each role accesses a dedicated live control deck synchronized in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                onClick={() => onSelectRole(r.id)}
                className={`glass-panel-interactive rounded-2xl p-7 border border-white/10 ${r.borderGlow} cursor-pointer group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.accentGradient} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                      {r.tagline}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    {r.name}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed mb-6 font-sans">
                    {r.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-semibold text-white/80 group-hover:text-white">
                  <span>Sign into workspace</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="max-w-6xl mx-auto w-full text-center text-[11px] text-white/40 z-20">
        Syncora Live Prototype — Demo accounts are pre-configured for instant one-click login.
      </div>
    </div>
  );
};
