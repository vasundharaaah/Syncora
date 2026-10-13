import React, { useState } from 'react';
import { IridescentRing3D } from '../components/common/IridescentRing3D';
import { AuroraBackground } from '../components/common/AuroraBackground';
import { Role, DepartmentName } from '../types';
import { useSyncoraStore } from '../store/useSyncoraStore';
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  Users, 
  Smartphone,
  Lock,
  Mail,
  Building,
  KeyRound,
  Check,
  Sparkles,
  MapPin
} from 'lucide-react';

interface VolunteerProfile {
  name: string;
  station: string;
  email: string;
}

interface VolunteerTeam {
  department: DepartmentName;
  teamLabel: string;
  volunteers: VolunteerProfile[];
}

const VOLUNTEER_TEAMS: VolunteerTeam[] = [
  {
    department: 'F&B',
    teamLabel: 'F&B Operations',
    volunteers: [
      { name: 'Rahul Sharma (Volunteer 1)', station: 'Buffet Setup & Tasting Verification (Ballroom Foyer)', email: 'rahul.fnb@auroraevents.com' },
      { name: 'Ananya Sen (Volunteer 2)', station: 'Executive High-Tea & Mineral Water Placement (Main Ballroom)', email: 'ananya.fnb@auroraevents.com' },
      { name: 'Kunal Mehta (Volunteer 3)', station: 'Beverage & Barista Station (South Foyer)', email: 'kunal.fnb@auroraevents.com' },
      { name: 'Tanvi Joshi (Volunteer 4)', station: 'Special Dietary & Jain Bento Staging (Service Pantry)', email: 'tanvi.fnb@auroraevents.com' }
    ]
  },
  {
    department: 'Production',
    teamLabel: 'Production & AV',
    volunteers: [
      { name: 'Dev Saxena (Volunteer 5)', station: 'P4 LED Wall & Keynote Playback Test (Center Stage)', email: 'dev.av@auroraevents.com' },
      { name: 'Kabir Roy (Volunteer 6)', station: 'Wireless Mic Frequency RF Scan (Audio Control Booth)', email: 'kabir.av@auroraevents.com' },
      { name: 'Natasha Rao (Volunteer 7)', station: 'DMX Intelligent Moving Spotlights (Truss Rig)', email: 'natasha.av@auroraevents.com' },
      { name: 'Arjun Das (Volunteer 8)', station: '4K Triax Broadcast Satellite OB Truck Feed', email: 'arjun.av@auroraevents.com' }
    ]
  },
  {
    department: 'Registration',
    teamLabel: 'Registration & Desk',
    volunteers: [
      { name: 'Simran Kaur (Volunteer 9)', station: 'RFID Badge Kiosks & Scanner Sync (Gate 2)', email: 'simran.reg@auroraevents.com' },
      { name: 'Tara Deshmukh (Volunteer 10)', station: 'VIP Convoy Host & Lanyard Distribution (Gate 1)', email: 'tara.reg@auroraevents.com' },
      { name: 'Karan Singhania (Volunteer 11)', station: 'Walk-In Spot Registration & Tablet Ticketing', email: 'karan.reg@auroraevents.com' },
      { name: 'Maya Pillai (Volunteer 12)', station: 'Bosch IR Translation Headsets & Coat Check', email: 'maya.reg@auroraevents.com' }
    ]
  },
  {
    department: 'Decor',
    teamLabel: 'Stage Decor & Florals',
    volunteers: [
      { name: 'Meera Kapoor (Volunteer 13)', station: 'Center Stage Orchids & Backdrop Lighting', email: 'meera.decor@auroraevents.com' },
      { name: 'Rohan Varma (Volunteer 14)', station: 'Banquet Table Floral Centerpieces & Candles', email: 'rohan.decor@auroraevents.com' },
      { name: 'Pooja Dave (Volunteer 15)', station: 'Grand Entryway Red Carpet Laydown & Tape Seal', email: 'pooja.decor@auroraevents.com' },
      { name: 'Neil D\'Souza (Volunteer 16)', station: 'Sponsor Step-and-Repeat Media Wall Rig', email: 'neil.decor@auroraevents.com' }
    ]
  },
  {
    department: 'Logistics',
    teamLabel: 'Logistics & Haulage',
    volunteers: [
      { name: 'Aman Verma (Volunteer 17)', station: '500 Chiavari Banquet Chairs Receiving (Gate 2)', email: 'aman.logistics@auroraevents.com' },
      { name: 'Vikram Patel (Volunteer 18)', station: 'VIP Green Room Suite 101 Staging', email: 'vikram.logistics@auroraevents.com' },
      { name: 'Sameer Khan (Volunteer 19)', station: 'Stage Riser Steps & ADA Ramp Safety Check', email: 'sameer.logistics@auroraevents.com' },
      { name: 'Divya Nair (Volunteer 20)', station: 'Road Cases Gate Pass & Loading Bay Clearance', email: 'divya.logistics@auroraevents.com' }
    ]
  },
  {
    department: 'Hospitality',
    teamLabel: 'VIP Hospitality & Protocol',
    volunteers: [
      { name: 'Sneha Kulkarni (Volunteer 21)', station: 'Chairman Convoy Porch Briefing & VIP Lounge', email: 'sneha.hosp@auroraevents.com' },
      { name: 'Aryan Malhotra (Volunteer 22)', station: 'Dignitary Welcome Kits & Green Room Fruit Platters', email: 'aryan.hosp@auroraevents.com' },
      { name: 'Ritu Agarwal (Volunteer 23)', station: 'Speaker Wardrobe Steamer & Grooming Lounge', email: 'ritu.hosp@auroraevents.com' },
      { name: 'Farhan Ali (Volunteer 24)', station: 'Chief Guest Memento Plaque Staging Backstage', email: 'farhan.hosp@auroraevents.com' }
    ]
  },
  {
    department: 'Transport',
    teamLabel: 'Transport & Fleet',
    volunteers: [
      { name: 'Suresh Patil (Volunteer 25)', station: 'Airport T2 Luxury Shuttle Bus Dispatch (Gate 1)', email: 'suresh.trans@auroraevents.com' },
      { name: 'Monica Sethi (Volunteer 26)', station: 'Speaker Mercedes E-Class Private Chauffeur Briefing', email: 'monica.trans@auroraevents.com' },
      { name: 'Harpreet Singh (Volunteer 27)', station: 'Porch Valet Parking Key Locker & Buggy Station', email: 'harpreet.trans@auroraevents.com' },
      { name: 'Jaspreet Kaur (Volunteer 28)', station: 'Standby Medical Ambulance Porch Lane Clearance', email: 'jaspreet.trans@auroraevents.com' }
    ]
  },
  {
    department: 'Guest Management',
    teamLabel: 'Guest Relations & Ushering',
    volunteers: [
      { name: 'Priya Nambiar (Volunteer 29)', station: 'Auditorium Main Aisle Seating & Row Ushering', email: 'priya.guest@auroraevents.com' },
      { name: 'Aditya Bose (Volunteer 30)', station: 'Front Row C-Suite Director Reserved Placards', email: 'aditya.guest@auroraevents.com' },
      { name: 'Shweta Rao (Volunteer 31)', station: 'Media & TV Press Enclosure Wristband Check', email: 'shweta.guest@auroraevents.com' },
      { name: 'Nikhil Jain (Volunteer 32)', station: 'Concierge Cloakroom & Luggage Token Desk', email: 'nikhil.guest@auroraevents.com' }
    ]
  },
  {
    department: 'Backstage',
    teamLabel: 'Backstage & Show Calling',
    volunteers: [
      { name: 'Zaheer Merchant (Volunteer 33)', station: 'Stage Manager Run-of-Show Assistant & Cue Sheets', email: 'zaheer.back@auroraevents.com' },
      { name: 'Alisha Mehta (Volunteer 34)', station: 'Presidential Teleprompter Glass & Slide Clicker', email: 'alisha.back@auroraevents.com' },
      { name: 'Gaurav Dixit (Volunteer 35)', station: 'Speaker Lapel Mic Clipping & Soundcheck Escort', email: 'gaurav.back@auroraevents.com' },
      { name: 'Sanjana Pillai (Volunteer 36)', station: 'Ceremonial Diya Lamp Lighting & Trophy Handover', email: 'sanjana.back@auroraevents.com' }
    ]
  }
];

interface LoginRolePageProps {
  role: Role;
  onSuccessLogin: () => void;
  onSwitchRole: () => void;
  onBackToLanding: () => void;
}

export const LoginRolePage: React.FC<LoginRolePageProps> = ({
  role,
  onSuccessLogin,
  onSwitchRole,
  onBackToLanding
}) => {
  const { setRole, setCurrentEventId, setCurrentDepartment, setCurrentVolunteerName, events } = useSyncoraStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [companyCode, setCompanyCode] = useState('AURORA-2026');
  const [selectedEventId, setSelectedEventId] = useState('tata-corporate');
  const [selectedDept, setSelectedDept] = useState<DepartmentName>('F&B');
  
  // Volunteer Team & Volunteer Profile state
  const [selectedVolunteerDept, setSelectedVolunteerDept] = useState<DepartmentName>('F&B');
  const [selectedVolunteerName, setSelectedVolunteerName] = useState<string>('Rahul Sharma (Volunteer 1)');

  const [eventOtpCode, setEventOtpCode] = useState(['5', '9', '2', '0', '1', '4']);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentVolunteerTeam = VOLUNTEER_TEAMS.find((t) => t.department === selectedVolunteerDept) || VOLUNTEER_TEAMS[0];

  const handleSelectVolunteerTeam = (dept: DepartmentName) => {
    setSelectedVolunteerDept(dept);
    const team = VOLUNTEER_TEAMS.find((t) => t.department === dept);
    if (team && team.volunteers.length > 0) {
      setSelectedVolunteerName(team.volunteers[0].name);
      setEmail(team.volunteers[0].email);
      setPassword('ground-team-2026');
    }
  };

  const handleSelectVolunteerProfile = (vol: VolunteerProfile) => {
    setSelectedVolunteerName(vol.name);
    setEmail(vol.email);
    setPassword('ground-team-2026');
  };

  const roleMeta: Record<Role, {
    title: string;
    headline: string;
    accentGradient: string;
    accentColor: string;
    quote: string;
    quoteAuthor: string;
    demoEmail: string;
    demoPass: string;
  }> = {
    owner: {
      title: 'Company Owner Portal',
      headline: 'Command your company.',
      accentGradient: 'from-[#1d4ed8] to-[#6b4fb8]',
      accentColor: '#2f7be8',
      quote: "Events used to be a financial black box until the final invoices hit. Now I see portfolio margins and vendor risks live every second.",
      quoteAuthor: "Vikramaditya Singhania · Managing Director",
      demoEmail: 'owner@auroraevents.com',
      demoPass: 'aurora-master-2026'
    },
    'event-head': {
      title: 'Event Head Portal',
      headline: 'Run your event.',
      accentGradient: 'from-[#0e9aa7] to-[#2f7be8]',
      accentColor: '#0e9aa7',
      quote: "Syncora turns 40 chaotic vendor threads into one crisp delivery Kanban. I haven't lost a single asset since we switched.",
      quoteAuthor: "Aditi Rao · Principal Event Head",
      demoEmail: 'aditi.rao@auroraevents.com',
      demoPass: 'tata-lead-2026'
    },
    'team-lead': {
      title: 'Department Operations Lead',
      headline: 'Lead your department.',
      accentGradient: 'from-[#6b4fb8] to-[#cdbbf0]',
      accentColor: '#6b4fb8',
      quote: "My volunteers tap completed, attach the photo, and my review queue updates instantly. Zero duplicate calls.",
      quoteAuthor: "Rahul Sharma · F&B Department Lead",
      demoEmail: 'rahul.lead@auroraevents.com',
      demoPass: 'fnb-ops-2026'
    },
    volunteer: {
      title: 'Volunteer Ground Deployment',
      headline: "Know what's next.",
      accentGradient: 'from-[#0e9aa7] to-[#5fe3c0]',
      accentColor: '#5fe3c0',
      quote: "Super simple on my phone. Big buttons, clear location pin, and one tap to show the banquet manager I'm done.",
      quoteAuthor: "Rahul · Ground Crew Volunteer",
      demoEmail: 'rahul.fnb@auroraevents.com',
      demoPass: 'ground-team-2026'
    }
  };

  const meta = roleMeta[role];

  const handleUseDemoAccount = () => {
    let finalEmail = meta.demoEmail;
    if (role === 'volunteer') {
      const activeVol = currentVolunteerTeam.volunteers.find((v) => v.name === selectedVolunteerName) || currentVolunteerTeam.volunteers[0];
      finalEmail = activeVol.email;
    }
    setEmail(finalEmail);
    setPassword(meta.demoPass);
    setErrorMessage('');
    handleSubmit(null, finalEmail, meta.demoPass);
  };

  const handleSubmit = (e: React.FormEvent | null, forcedEmail?: string, forcedPass?: string) => {
    if (e) e.preventDefault();
    const finalEmail = forcedEmail || email;
    const finalPass = forcedPass || password;

    if (!finalEmail || !finalPass) {
      setErrorShake(true);
      setErrorMessage('Please enter both email and password (or use demo account).');
      setTimeout(() => setErrorShake(false), 500);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      setRole(role);
      if (role === 'event-head') {
        setCurrentEventId(selectedEventId);
      } else if (role === 'team-lead') {
        setCurrentDepartment(selectedDept);
      } else if (role === 'volunteer') {
        setCurrentDepartment(selectedVolunteerDept);
        setCurrentVolunteerName(selectedVolunteerName);
      }
      setIsLoading(false);
      onSuccessLogin();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row relative overflow-hidden select-none">
      {/* Background blended color palette layer */}
      <AuroraBackground />

      {/* LEFT COLUMN: Aurora Visual & Brand Atmosphere */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 lg:p-16 z-10 border-r border-white/10">
        <div className="flex items-center justify-between">
          <img
            src="/assets/logo.png"
            alt="SYNCORA"
            className="h-10 w-auto object-contain filter drop-shadow-[0_0_16px_rgba(205,187,240,0.35)]"
          />
          <button
            onClick={onBackToLanding}
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Landing Page</span>
          </button>
        </div>

        {/* Floating Iridescent Ring */}
        <div className="my-auto flex flex-col items-center justify-center py-6">
          <IridescentRing3D size={380} />
          
          <div className="max-w-md mt-6 p-5 rounded-2xl glass-panel border border-[#cdbbf0]/25 text-left">
            <p className="text-xs text-white/80 italic font-serif leading-relaxed mb-3">
              "{meta.quote}"
            </p>
            <span className="text-[11px] font-mono text-[#cdbbf0] uppercase tracking-wider block">
              {meta.quoteAuthor}
            </span>
          </div>
        </div>

        <div className="text-[11px] text-white/40 flex items-center justify-between">
          <span>Enterprise AES-256 Event Security</span>
          <span>Aurora Events Pvt. Ltd.</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Glass Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-14 z-10 bg-black/60 backdrop-blur-xl overflow-y-auto">
        <div className="w-full max-w-lg my-auto">
          {/* Mobile Top Navigation */}
          <div className="flex lg:hidden items-center justify-between mb-6 pb-4 border-b border-white/10">
            <img src="/assets/logo.png" alt="SYNCORA" className="h-7 w-auto object-contain" />
            <button
              onClick={onBackToLanding}
              className="text-xs text-white/60 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#cdbbf0] mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta.accentColor }} />
              {meta.title}
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              {meta.headline}
            </h2>
            <p className="text-xs text-white/50 mt-1">
              Sign in with your verified operational credentials.
            </p>
          </div>

          {/* Login Card */}
          <div className={`glass-panel rounded-2xl p-6 sm:p-7 border border-white/15 shadow-2xl relative ${errorShake ? 'animate-bounce' : ''}`}>
            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-[#8c2b3d]/30 border border-[#8c2b3d]/60 text-xs text-[#ff6b81]">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Extra Role Fields */}
              {role === 'owner' && (
                <div>
                  <label className="text-[11px] uppercase font-mono tracking-wider text-white/60 block mb-1.5">
                    Company Access Code
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={companyCode}
                      onChange={(e) => setCompanyCode(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#2f7be8]"
                      placeholder="AURORA-2026"
                    />
                  </div>
                </div>
              )}

              {role === 'event-head' && (
                <div>
                  <label className="text-[11px] uppercase font-mono tracking-wider text-white/60 block mb-1.5">
                    Select Active Event to Open
                  </label>
                  <select
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full bg-[#0d0b17] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#0e9aa7]"
                  >
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.id} className="bg-[#0d0b17] text-white">
                        {ev.name} ({ev.client})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {role === 'team-lead' && (
                <div>
                  <label className="text-[11px] uppercase font-mono tracking-wider text-white/60 block mb-1.5">
                    Assigned Department
                  </label>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value as DepartmentName)}
                    className="w-full bg-[#0d0b17] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#6b4fb8]"
                  >
                    {['F&B', 'Decor', 'Logistics', 'Production', 'Registration', 'Hospitality', 'Transport', 'Guest Management', 'Backstage'].map((dept) => (
                      <option key={dept} value={dept} className="bg-[#0d0b17] text-white">
                        {dept} Department
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* VOLUNTEER ROLE: MULTI-TEAM & MULTI-VOLUNTEER SELECTOR */}
              {role === 'volunteer' && (
                <div className="space-y-3.5 pb-2 border-b border-white/10">
                  {/* Team / Department Picker */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] uppercase font-mono tracking-wider text-white/70 font-semibold flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#0e9aa7]" />
                        <span>Step 1: Choose Your Operational Team</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {VOLUNTEER_TEAMS.map((team) => {
                        const isSelected = selectedVolunteerDept === team.department;
                        return (
                          <button
                            type="button"
                            key={team.department}
                            onClick={() => handleSelectVolunteerTeam(team.department)}
                            className={`p-2 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#0e9aa7]/30 to-[#2f7be8]/30 border-[#5fe3c0] text-white font-semibold shadow-[0_0_12px_rgba(95,227,192,0.25)]'
                                : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <span className="block text-[11px] truncate">{team.teamLabel}</span>
                            <span className="text-[9px] font-mono text-white/40 block mt-0.5">
                              {team.volunteers.length} Volunteers
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Specific Volunteer Picker within the chosen team */}
                  <div>
                    <label className="text-[11px] uppercase font-mono tracking-wider text-white/70 font-semibold block mb-1.5">
                      Step 2: Select Volunteer Member in {currentVolunteerTeam.teamLabel}
                    </label>

                    <div className="space-y-1.5">
                      {currentVolunteerTeam.volunteers.map((vol) => {
                        const isSelected = selectedVolunteerName === vol.name;
                        return (
                          <div
                            key={vol.name}
                            onClick={() => handleSelectVolunteerProfile(vol)}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-3 cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#0e9aa7]/20 border-[#5fe3c0]/60 text-white shadow-sm'
                                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="font-semibold text-white flex items-center gap-1.5 truncate">
                                <span>{vol.name}</span>
                                {isSelected && (
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#5fe3c0]/20 text-[#5fe3c0] border border-[#5fe3c0]/30">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-white/50 truncate flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-[#0e9aa7] shrink-0" />
                                <span className="truncate">{vol.station}</span>
                              </div>
                            </div>

                            <div className="shrink-0">
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-[#5fe3c0] bg-[#5fe3c0] text-black' : 'border-white/30'
                              }`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 6-Digit Event Access Code (Quick Join Option) */}
                  <div className="pt-1">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-white/50 block mb-1">
                      Event Access PIN (Optional 6-Digit Code)
                    </label>
                    <div className="flex gap-1.5">
                      {eventOtpCode.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const newCode = [...eventOtpCode];
                            newCode[idx] = e.target.value;
                            setEventOtpCode(newCode);
                          }}
                          className="w-8 sm:w-9 h-8 sm:h-9 text-center font-mono font-bold text-xs bg-white/5 border border-white/15 rounded-lg text-[#5fe3c0] focus:outline-none focus:border-[#5fe3c0]"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="text-[11px] uppercase font-mono tracking-wider text-white/60 block mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#cdbbf0]"
                    placeholder="name@auroraevents.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] uppercase font-mono tracking-wider text-white/60">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); handleUseDemoAccount(); }} className="text-[11px] text-[#cdbbf0] hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white focus:outline-none focus:border-[#cdbbf0]"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-white/40 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-white/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/20 bg-white/5 text-[#2f7be8] focus:ring-0"
                  />
                  <span>Keep me signed in</span>
                </label>
              </div>

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r ${meta.accentGradient} hover:opacity-95 shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2`}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter {role === 'volunteer' ? `${selectedVolunteerName.split(' ')[0]}’s Workspace` : 'Workspace'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Account Auto-Fill */}
            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={handleUseDemoAccount}
                className="w-full py-2.5 rounded-xl text-xs font-mono font-medium text-[#5fe3c0] bg-[#0e9aa7]/10 hover:bg-[#0e9aa7]/20 border border-[#0e9aa7]/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>1-Click Sign-In as {role === 'volunteer' ? selectedVolunteerName : meta.title}</span>
              </button>
            </div>
          </div>

          {/* Switch Role link */}
          <div className="text-center mt-5">
            <button
              onClick={onSwitchRole}
              className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Not your role? <strong className="text-[#cdbbf0] underline">Switch to another role</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
