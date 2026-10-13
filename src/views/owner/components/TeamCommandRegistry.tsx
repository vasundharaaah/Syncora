import React, { useState } from 'react';
import { useSyncoraStore } from '../../../store/useSyncoraStore';
import { 
  Search, 
  Users, 
  Phone, 
  Radio, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  Briefcase
} from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  roleTitle: string;
  department: string;
  activeEvents: string[];
  status: 'On-Site Active' | 'In Transit' | 'Standby';
  phone: string;
  walkieChannel: string;
  supervisedVolunteers: number;
  tasksSupervised: number;
  initials: string;
}

const STAFF_ROSTER: StaffMember[] = [
  {
    id: 's-1',
    name: 'Aditi Rao',
    roleTitle: 'Executive Producer & Head of Corporate',
    department: 'General Management',
    activeEvents: ['Tata Corporate Leadership Conclave', 'Nexus Global AI Summit'],
    status: 'On-Site Active',
    phone: '+91 98200 11223',
    walkieChannel: 'Ch 1 - Executive Command',
    supervisedVolunteers: 24,
    tasksSupervised: 90,
    initials: 'AR'
  },
  {
    id: 's-2',
    name: 'Rohan Verma',
    roleTitle: 'Technical Production & Rigging Director',
    department: 'Production & AV',
    activeEvents: ['Sharma & Kapoor Royal Wedding', 'Contemporary Art Biennale'],
    status: 'In Transit',
    phone: '+91 98201 33445',
    walkieChannel: 'Ch 2 - AV & Lighting',
    supervisedVolunteers: 12,
    tasksSupervised: 38,
    initials: 'RV'
  },
  {
    id: 's-3',
    name: 'Pooja Iyer',
    roleTitle: 'Creative Director & Experiential Lead',
    department: 'Decor & Florals',
    activeEvents: ['Oberoi Centenary Charity Gala', 'Aether EV Supercar Reveal'],
    status: 'On-Site Active',
    phone: '+91 98450 77889',
    walkieChannel: 'Ch 4 - Decor & Staging',
    supervisedVolunteers: 8,
    tasksSupervised: 26,
    initials: 'PI'
  },
  {
    id: 's-4',
    name: 'Vikram Joshi',
    roleTitle: 'Logistics & Haulage Operations Lead',
    department: 'Logistics',
    activeEvents: ['Zenith FinTech Pioneers Forum', 'Pan-Asia Oncology Congress'],
    status: 'On-Site Active',
    phone: '+91 98112 44556',
    walkieChannel: 'Ch 5 - Haulage & Freight',
    supervisedVolunteers: 14,
    tasksSupervised: 44,
    initials: 'VJ'
  },
  {
    id: 's-5',
    name: 'Karan Mehra',
    roleTitle: 'Festivals & Large-Scale Operations Director',
    department: 'Festival Operations',
    activeEvents: ['Pulse Sunset Electronic Festival', 'Horizon Tech & Cultural Fest'],
    status: 'Standby',
    phone: '+91 98330 99001',
    walkieChannel: 'Ch 1 - Executive Command',
    supervisedVolunteers: 20,
    tasksSupervised: 62,
    initials: 'KM'
  },
  {
    id: 's-6',
    name: 'Rahul Sharma',
    roleTitle: 'F&B Operations Captain & Head Sommelier',
    department: 'F&B',
    activeEvents: ['Tata Corporate Leadership Conclave'],
    status: 'On-Site Active',
    phone: '+91 97111 88990',
    walkieChannel: 'Ch 3 - Hospitality & F&B',
    supervisedVolunteers: 4,
    tasksSupervised: 10,
    initials: 'RS'
  },
  {
    id: 's-7',
    name: 'Sneha Kulkarni',
    roleTitle: 'VIP Protocol & Diplomatic Liaison Lead',
    department: 'Hospitality',
    activeEvents: ['Tata Corporate Leadership Conclave'],
    status: 'On-Site Active',
    phone: '+91 98220 66778',
    walkieChannel: 'Ch 3 - Hospitality & F&B',
    supervisedVolunteers: 4,
    tasksSupervised: 10,
    initials: 'SK'
  }
];

export const TeamCommandRegistry: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStaff = STAFF_ROSTER.filter((s) => {
    return (
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#0d0b17] via-[#050b2e] to-[#07060d]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#2f7be8]/20 text-[#5fe3c0] border border-[#2f7be8]/30">
                Staff Allocation
              </span>
              <span className="text-xs font-mono text-white/50">42 Field Personnel & Directors</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">Team Command Registry</h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl">
              Real-time director roster, operational shift allocations, live walkie channels, and volunteer supervision ratio.
            </p>
          </div>
        </div>

        {/* 3 Macro Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Operational Directors</span>
            <div className="text-xl font-mono font-bold text-white mt-1">7 Production Heads</div>
            <span className="text-[10px] text-[#5fe3c0] mt-0.5 block">100% on-duty coverage</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Field Volunteers</span>
            <div className="text-xl font-mono font-bold text-[#5fe3c0] mt-1">35 Field Crew</div>
            <span className="text-[10px] text-white/40 mt-0.5 block">Geo-tagged checked in</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Live Tasks Assigned</span>
            <div className="text-xl font-mono font-bold text-[#cdbbf0] mt-1">90 Deliverables</div>
            <span className="text-[10px] text-white/40 mt-0.5 block">Balanced active workflow</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by director name, title or department..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#cdbbf0]"
        />
      </div>

      {/* Roster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStaff.map((staff) => (
          <div
            key={staff.id}
            className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-4"
          >
            <div>
              {/* Header with avatar */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1d4ed8] to-[#6b4fb8] flex items-center justify-center font-bold text-xs text-white shrink-0">
                    {staff.initials}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{staff.name}</h4>
                    <span className="text-xs text-white/60">{staff.roleTitle}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono shrink-0 ${
                  staff.status === 'On-Site Active'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : staff.status === 'In Transit'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-white/10 text-white/60'
                }`}>
                  {staff.status}
                </span>
              </div>

              {/* Active Events */}
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs">
                <span className="text-[10px] font-mono uppercase text-white/40 block">Active Productions</span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {staff.activeEvents.map((evName, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-white/10 text-white font-medium">
                      {evName}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comm & Meta Footer */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3 text-[11px] font-mono text-white/60">
                <span className="flex items-center gap-1">
                  <Radio className="w-3 h-3 text-[#5fe3c0]" />
                  <span>{staff.walkieChannel}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-white/40" />
                  <span>{staff.phone}</span>
                </span>
              </div>

              <div className="text-[11px] font-mono text-[#5fe3c0]">
                {staff.supervisedVolunteers} Crew · {staff.tasksSupervised} Tasks
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
