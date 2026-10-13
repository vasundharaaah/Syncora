import React, { useState } from 'react';
import { useSyncoraStore } from '../../../store/useSyncoraStore';
import { 
  Search, 
  Users, 
  Radio, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Smartphone,
  ShieldCheck,
  Send
} from 'lucide-react';

interface VolunteerDeployment {
  id: string;
  name: string;
  department: string;
  station: string;
  shiftTime: string;
  status: 'Checked In' | 'Active On Task' | 'Break';
  activeTask: string;
  walkieChannel: string;
  phone: string;
}

const EVENT_FIELD_STAFF: VolunteerDeployment[] = [
  {
    id: 'vol-1',
    name: 'Rahul Sharma',
    department: 'F&B',
    station: 'Ballroom Foyer Zone B',
    shiftTime: '13:00 - 23:00 IST',
    status: 'Active On Task',
    activeTask: 'Pre-Dinner Passed Canapé & Mocktail Flutes Assembly',
    walkieChannel: 'Ch 3 - Hospitality & F&B',
    phone: '+91 97111 88990'
  },
  {
    id: 'vol-2',
    name: 'Ananya Sen',
    department: 'F&B',
    station: 'Main Ballroom Floor',
    shiftTime: '14:00 - 23:30 IST',
    status: 'Active On Task',
    activeTask: 'Executive High-Tea & Mineral Water Placement (85 tables)',
    walkieChannel: 'Ch 3 - Hospitality & F&B',
    phone: '+91 98444 55667'
  },
  {
    id: 'vol-5',
    name: 'Dev Saxena',
    department: 'Production',
    station: 'Center Stage FOH',
    shiftTime: '10:00 - 22:00 IST',
    status: 'Active On Task',
    activeTask: 'Dual 55-inch Downstage Confidence Monitors Sync',
    walkieChannel: 'Ch 2 - AV & Lighting',
    phone: '+91 98222 33445'
  },
  {
    id: 'vol-6',
    name: 'Kabir Roy',
    department: 'Production',
    station: 'Audio Control Console',
    shiftTime: '11:00 - 22:30 IST',
    status: 'Active On Task',
    activeTask: 'Wireless Mic Shure Axient Frequency Pairing & RF Scan',
    walkieChannel: 'Ch 2 - AV & Lighting',
    phone: '+91 98199 44321'
  },
  {
    id: 'vol-9',
    name: 'Simran Kaur',
    department: 'Registration',
    station: 'Gate 2 Registration Desks 1-4',
    shiftTime: '14:30 - 21:00 IST',
    status: 'Active On Task',
    activeTask: 'Fast-Track QR Code Queue Marshalling & Stanchion Setup',
    walkieChannel: 'Ch 1 - Executive Command',
    phone: '+91 98666 77889'
  },
  {
    id: 'vol-10',
    name: 'Tara Deshmukh',
    department: 'Registration',
    station: 'Gate 1 VIP Welcome Portal',
    shiftTime: '14:30 - 21:00 IST',
    status: 'Active On Task',
    activeTask: 'VIP Executive Lanyard Distribution & Host Escort Pairing',
    walkieChannel: 'Ch 1 - Executive Command',
    phone: '+91 98205 11982'
  },
  {
    id: 'vol-13',
    name: 'Meera Kapoor',
    department: 'Decor',
    station: 'Center Stage Wing',
    shiftTime: '12:00 - 20:00 IST',
    status: 'Active On Task',
    activeTask: 'Stage Floral Arc & Backdrop Warm White Illumination',
    walkieChannel: 'Ch 4 - Decor & Staging',
    phone: '+91 98331 44552'
  },
  {
    id: 'vol-17',
    name: 'Aman Verma',
    department: 'Logistics',
    station: 'Stage Left Riser',
    shiftTime: '10:00 - 22:00 IST',
    status: 'Active On Task',
    activeTask: 'Stage Riser Steps & Disability Access Ramp Safety Inspection',
    walkieChannel: 'Ch 5 - Haulage & Freight',
    phone: '+91 98112 33441'
  },
  {
    id: 'vol-21',
    name: 'Sneha Kulkarni',
    department: 'Hospitality',
    station: 'VIP Porch Area',
    shiftTime: '14:00 - 23:00 IST',
    status: 'Active On Task',
    activeTask: 'VIP Escort Roster Briefing & Chairman Convoy Alignment',
    walkieChannel: 'Ch 3 - Hospitality & F&B',
    phone: '+91 98220 66778'
  },
  {
    id: 'vol-22',
    name: 'Aryan Malhotra',
    department: 'Hospitality',
    station: 'VIP Pre-Function Lounge',
    shiftTime: '14:00 - 23:00 IST',
    status: 'Active On Task',
    activeTask: 'Bilingual Diplomatic Escorts Assigned to Zone A Dignitaries',
    walkieChannel: 'Ch 3 - Hospitality & F&B',
    phone: '+91 98201 99881'
  },
  {
    id: 'vol-25',
    name: 'Suresh Patil',
    department: 'Transport',
    station: 'Parking Zone B Hub',
    shiftTime: '12:00 - 23:30 IST',
    status: 'Active On Task',
    activeTask: 'Guest Overflow Parking Shuttles Route 2 Readiness',
    walkieChannel: 'Ch 5 - Haulage & Fleet',
    phone: '+91 98230 44550'
  },
  {
    id: 'vol-29',
    name: 'Priya Nambiar',
    department: 'Guest Management',
    station: 'Terrace Lounge Entrance',
    shiftTime: '15:00 - 23:00 IST',
    status: 'Active On Task',
    activeTask: 'VIP Lounge Access Wristband Verification Desk',
    walkieChannel: 'Ch 1 - Executive Command',
    phone: '+91 98450 11229'
  },
  {
    id: 'vol-33',
    name: 'Zaheer Merchant',
    department: 'Backstage',
    station: 'AV Master Console',
    shiftTime: '12:00 - 23:30 IST',
    status: 'Checked In',
    activeTask: 'Stage Manager Run-of-Show Minute-by-Minute Cue Sheet Distribution',
    walkieChannel: 'Ch 1 - Executive Command',
    phone: '+91 98119 77884'
  },
  {
    id: 'vol-34',
    name: 'Alisha Mehta',
    department: 'Backstage',
    station: 'Downstage Wing Left',
    shiftTime: '13:00 - 23:00 IST',
    status: 'Active On Task',
    activeTask: 'Presidential Teleprompter Glass & Speech Scroll Calibration',
    walkieChannel: 'Ch 2 - AV & Lighting',
    phone: '+91 98202 55443'
  }
];

export const TeamRosterModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const { addToast } = useSyncoraStore();

  const filteredStaff = EVENT_FIELD_STAFF.filter((staff) => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.activeTask.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.station.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'All' || staff.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const handleBroadcast = () => {
    addToast({
      title: 'Roll Call Broadcast Sent',
      message: 'Push notification & walkie ping sent to all 24 deployed volunteers.',
      type: 'info'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#0d0b17] via-[#050b2e] to-[#07060d]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#2f7be8]/20 text-[#5fe3c0] border border-[#2f7be8]/30">
                Field Deployment
              </span>
              <span className="text-xs font-mono text-white/50">Tata Corporate Leadership Conclave</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">Team & Volunteer Roster</h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl">
              24 field volunteers deployed across Taj Lands End. Real-time geo-attendance, walkie frequency assignments, and active task tracking.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBroadcast}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] text-xs font-semibold text-white flex items-center gap-2 shadow-md hover:opacity-90 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Roll Call</span>
            </button>
          </div>
        </div>

        {/* 4 Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Deployed Volunteers</span>
            <div className="text-xl font-mono font-bold text-white mt-1">24 Active</div>
            <span className="text-[10px] text-[#5fe3c0] mt-0.5 block">100% on-duty check-in</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Departments</span>
            <div className="text-xl font-mono font-bold text-white mt-1">9 Dedicated Wings</div>
            <span className="text-[10px] text-white/40 mt-0.5 block">Zero single-point bottlenecks</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Walkie Net Channels</span>
            <div className="text-xl font-mono font-bold text-[#cdbbf0] mt-1">5 Clear Net Freqs</div>
            <span className="text-[10px] text-white/40 mt-0.5 block">Zero RF cross-talk</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Supervision Lead</span>
            <div className="text-xl font-mono font-bold text-[#5fe3c0] mt-1">Aditi Rao</div>
            <span className="text-[10px] text-white/40 mt-0.5 block">Executive Producer</span>
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
            placeholder="Search volunteer name, active task, or station..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#cdbbf0]"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 overflow-x-auto self-start sm:self-auto">
          {['All', 'Hospitality', 'F&B', 'Production', 'Registration', 'Decor', 'Logistics', 'Backstage'].map((dept) => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                deptFilter === dept
                  ? 'bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] text-white font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStaff.map((staff) => (
          <div
            key={staff.id}
            className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-3.5"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-white">{staff.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0e9aa7]/20 text-[#5fe3c0] border border-[#0e9aa7]/30">
                      {staff.department}
                    </span>
                  </div>
                  <div className="text-xs text-white/50 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3 text-white/40" />
                    <span>Station: {staff.station}</span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {staff.status}
                </span>
              </div>

              {/* Active Deliverable */}
              <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-white/40 block">In-Flight Deliverable</span>
                <p className="text-white font-medium">{staff.activeTask}</p>
              </div>
            </div>

            {/* Comm & Meta Footer */}
            <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/60">
              <span className="flex items-center gap-1 text-[#5fe3c0]">
                <Radio className="w-3 h-3 text-[#5fe3c0]" />
                <span>{staff.walkieChannel}</span>
              </span>

              <span>{staff.shiftTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
