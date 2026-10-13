import React, { useState } from 'react';
import { useSyncoraStore } from '../../store/useSyncoraStore';
import { RoleSwitcher } from '../../components/common/RoleSwitcher';
import { AuroraBackground } from '../../components/common/AuroraBackground';
import { DepartmentTask, DepartmentName } from '../../types';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Camera, 
  AlertTriangle, 
  Sparkles, 
  Send, 
  ArrowLeft, 
  X, 
  Check, 
  Radio, 
  FileText,
  User,
  ShieldAlert,
  Users,
  ChevronDown,
  Layers,
  Filter
} from 'lucide-react';

interface VolunteerAppProps {
  onBackToLanding: () => void;
}

interface VolunteerRosterProfile {
  name: string;
  station: string;
}

const ALL_ROSTERS: Record<DepartmentName, VolunteerRosterProfile[]> = {
  'F&B': [
    { name: 'Rahul Sharma (Volunteer 1)', station: 'Buffet Setup & Tasting Verification (Ballroom Foyer)' },
    { name: 'Ananya Sen (Volunteer 2)', station: 'Executive High-Tea & Mineral Water Placement (Main Ballroom)' },
    { name: 'Kunal Mehta (Volunteer 3)', station: 'Beverage & Barista Station (South Foyer)' },
    { name: 'Tanvi Joshi (Volunteer 4)', station: 'Special Dietary & Jain Bento Staging (Service Pantry)' }
  ],
  'Production': [
    { name: 'Dev Saxena (Volunteer 5)', station: 'P4 LED Wall & Keynote Playback Test (Center Stage)' },
    { name: 'Kabir Roy (Volunteer 6)', station: 'Wireless Mic Frequency RF Scan (Audio Control Booth)' },
    { name: 'Natasha Rao (Volunteer 7)', station: 'DMX Intelligent Moving Spotlights (Truss Rig)' },
    { name: 'Arjun Das (Volunteer 8)', station: '4K Triax Broadcast Satellite OB Truck Feed' }
  ],
  'Registration': [
    { name: 'Simran Kaur (Volunteer 9)', station: 'RFID Badge Kiosks & Scanner Sync (Gate 2)' },
    { name: 'Tara Deshmukh (Volunteer 10)', station: 'VIP Convoy Host & Lanyard Distribution (Gate 1)' },
    { name: 'Karan Singhania (Volunteer 11)', station: 'Walk-In Spot Registration & Tablet Ticketing' },
    { name: 'Maya Pillai (Volunteer 12)', station: 'Bosch IR Translation Headsets & Coat Check' }
  ],
  'Decor': [
    { name: 'Meera Kapoor (Volunteer 13)', station: 'Center Stage Orchids & Backdrop Lighting' },
    { name: 'Rohan Varma (Volunteer 14)', station: 'Banquet Table Floral Centerpieces & Candles' },
    { name: 'Pooja Dave (Volunteer 15)', station: 'Grand Entryway Red Carpet Laydown & Tape Seal' },
    { name: 'Neil D\'Souza (Volunteer 16)', station: 'Sponsor Step-and-Repeat Media Wall Rig' }
  ],
  'Logistics': [
    { name: 'Aman Verma (Volunteer 17)', station: '500 Chiavari Banquet Chairs Receiving (Gate 2)' },
    { name: 'Vikram Patel (Volunteer 18)', station: 'VIP Green Room Suite 101 Staging' },
    { name: 'Sameer Khan (Volunteer 19)', station: 'Stage Riser Steps & ADA Ramp Safety Check' },
    { name: 'Divya Nair (Volunteer 20)', station: 'Road Cases Gate Pass & Loading Bay Clearance' }
  ],
  'Hospitality': [
    { name: 'Sneha Kulkarni (Volunteer 21)', station: 'Chairman Convoy Porch Briefing & VIP Lounge' },
    { name: 'Aryan Malhotra (Volunteer 22)', station: 'Dignitary Welcome Kits & Green Room Fruit Platters' },
    { name: 'Ritu Agarwal (Volunteer 23)', station: 'Speaker Wardrobe Steamer & Grooming Lounge' },
    { name: 'Farhan Ali (Volunteer 24)', station: 'Chief Guest Memento Plaque Staging Backstage' }
  ],
  'Transport': [
    { name: 'Suresh Patil (Volunteer 25)', station: 'Airport T2 Luxury Shuttle Bus Dispatch (Gate 1)' },
    { name: 'Monica Sethi (Volunteer 26)', station: 'Speaker Mercedes E-Class Private Chauffeur Briefing' },
    { name: 'Harpreet Singh (Volunteer 27)', station: 'Porch Valet Parking Key Locker & Buggy Station' },
    { name: 'Jaspreet Kaur (Volunteer 28)', station: 'Standby Medical Ambulance Porch Lane Clearance' }
  ],
  'Guest Management': [
    { name: 'Priya Nambiar (Volunteer 29)', station: 'Auditorium Main Aisle Seating & Row Ushering' },
    { name: 'Aditya Bose (Volunteer 30)', station: 'Front Row C-Suite Director Reserved Placards' },
    { name: 'Shweta Rao (Volunteer 31)', station: 'Media & TV Press Enclosure Wristband Check' },
    { name: 'Nikhil Jain (Volunteer 32)', station: 'Concierge Cloakroom & Luggage Token Desk' }
  ],
  'Backstage': [
    { name: 'Zaheer Merchant (Volunteer 33)', station: 'Stage Manager Run-of-Show Assistant & Cue Sheets' },
    { name: 'Alisha Mehta (Volunteer 34)', station: 'Presidential Teleprompter Glass & Slide Clicker' },
    { name: 'Gaurav Dixit (Volunteer 35)', station: 'Speaker Lapel Mic Clipping & Soundcheck Escort' },
    { name: 'Sanjana Pillai (Volunteer 36)', station: 'Ceremonial Diya Lamp Lighting & Trophy Handover' }
  ]
};

export const VolunteerApp: React.FC<VolunteerAppProps> = ({ onBackToLanding }) => {
  const { 
    currentEventId, 
    events, 
    tasks, 
    currentVolunteerName,
    currentDepartment,
    setCurrentDepartment,
    setCurrentVolunteerName,
    startTask, 
    completeTask, 
    checkInVolunteer, 
    addToast 
  } = useSyncoraStore();

  const currentEvent = events.find((e) => e.id === currentEventId) || events[0];

  // Active view tab inside phone
  const [activeTab, setActiveTab] = useState<'tasks' | 'info' | 'notifications'>('tasks');
  const [scopeFilter, setScopeFilter] = useState<'my-team' | 'all'>('my-team');
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [isTeamDrawerOpen, setIsTeamDrawerOpen] = useState(false);

  // Complete task bottom sheet modal
  const [activeCompletingTask, setActiveCompletingTask] = useState<DepartmentTask | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [completionNote, setCompletionNote] = useState('');

  // Report problem modal
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [problemText, setProblemText] = useState('');

  // Tasks filtering
  const eventTasks = tasks.filter((t) => t.eventId === currentEvent.id);
  const scopedTasks = scopeFilter === 'my-team' 
    ? eventTasks.filter((t) => t.department === currentDepartment)
    : eventTasks;

  const totalScopeTasks = scopedTasks.length;
  const todoCount = scopedTasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = scopedTasks.filter((t) => t.status === 'in-progress').length;
  const completedCount = scopedTasks.filter((t) => t.status === 'done' || t.status === 'approved').length;

  // Filter by status
  const displayedTasks = scopedTasks.filter((t) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'todo') return t.status === 'todo';
    if (statusFilter === 'in-progress') return t.status === 'in-progress';
    if (statusFilter === 'completed') return t.status === 'done' || t.status === 'approved';
    return true;
  });

  const handleOpenCompleteSheet = (task: DepartmentTask) => {
    setActiveCompletingTask(task);
    setPhotoPreview(task.proofUrl || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230e9aa7"/><stop offset="100%" stop-color="%232f7be8"/></linearGradient></defs><rect width="400" height="300" fill="url(%23g)"/><text x="200" y="150" font-family="sans-serif" font-size="16" font-weight="bold" fill="white" text-anchor="middle">Field Photo Captured (Verified)</text></svg>');
  };

  const handleSubmitCompletion = () => {
    if (!activeCompletingTask) return;
    completeTask(activeCompletingTask.id, photoPreview || undefined, completionNote);
    setActiveCompletingTask(null);
    setPhotoPreview(null);
    setCompletionNote('');
  };

  const handleSwitchTeamVolunteer = (dept: DepartmentName, vol: VolunteerRosterProfile) => {
    setCurrentDepartment(dept);
    setCurrentVolunteerName(vol.name);
    setIsTeamDrawerOpen(false);
    addToast({
      title: 'Station Profile Updated',
      message: `Now operating as ${vol.name} in ${dept} team.`,
      type: 'info'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-2 sm:p-6 select-none relative overflow-x-hidden">
      {/* Background Subtle Color Blend */}
      <AuroraBackground />

      {/* Top persistent Role Switcher & Back bar */}
      <div className="w-full max-w-md flex items-center justify-between mb-3 z-20 px-2">
        <button
          onClick={onBackToLanding}
          className="text-xs text-white/50 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Landing</span>
        </button>
        <RoleSwitcher />
      </div>

      {/* 390px Realistic Smartphone Mockup Frame */}
      <div className="w-full max-w-[390px] h-[830px] bg-[#07060d] border border-white/20 sm:rounded-[44px] shadow-[0_0_60px_rgba(47,123,232,0.35)] flex flex-col relative overflow-hidden z-10">
        {/* Phone Speaker Notch */}
        <div className="w-32 h-5 bg-black rounded-b-2xl mx-auto flex items-center justify-center gap-2 shrink-0 z-30">
          <div className="w-10 h-1 bg-white/20 rounded-full" />
          <div className="w-2 h-2 bg-[#0e9aa7]/60 rounded-full" />
        </div>

        {/* Header Greeting & Team Switcher Bar */}
        <div className="px-5 pt-3 pb-3 border-b border-white/10 shrink-0 bg-[#0d0b17]/90 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#0e9aa7] font-semibold truncate">
                  {currentDepartment} Operations Team
                </span>
                <button
                  onClick={() => setIsTeamDrawerOpen(true)}
                  className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-white/70 hover:text-white hover:bg-white/20 flex items-center gap-0.5 cursor-pointer"
                  title="Switch Department / Volunteer Profile"
                >
                  <span>Switch</span>
                  <ChevronDown className="w-2.5 h-2.5" />
                </button>
              </div>
              <h2 className="text-base font-display font-bold text-white truncate">
                Hey {currentVolunteerName ? currentVolunteerName.split(' ')[0] : 'Rahul'} 👋
              </h2>
            </div>

            {/* Check-in Attendance Pill */}
            <button
              onClick={() => {
                setIsCheckedIn(!isCheckedIn);
                checkInVolunteer();
              }}
              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                isCheckedIn
                  ? 'bg-[#0e9aa7]/20 text-[#5fe3c0] border border-[#0e9aa7]/40'
                  : 'bg-white/10 text-white/60 border border-white/20'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isCheckedIn ? 'bg-[#5fe3c0] animate-pulse' : 'bg-white/40'}`} />
              <span>{isCheckedIn ? 'Checked In' : 'Tap Check-In'}</span>
            </button>
          </div>

          {/* Event Mini Banner */}
          <div className="mt-2.5 p-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <div className="min-w-0 pr-2">
              <div className="font-semibold text-white truncate text-[11px]">{currentEvent.name}</div>
              <div className="text-[9px] text-white/50 truncate">{currentEvent.location}</div>
            </div>
            <div className="text-right font-mono shrink-0">
              <span className="text-[#5fe3c0] font-bold text-xs">{completedCount}/{totalScopeTasks}</span>
              <span className="text-[9px] text-white/40 block">Done</span>
            </div>
          </div>

          {/* Queue Scope Tabs */}
          <div className="mt-2 flex items-center gap-1.5">
            <button
              onClick={() => setScopeFilter('my-team')}
              className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-mono transition-colors text-center cursor-pointer ${
                scopeFilter === 'my-team'
                  ? 'bg-[#0e9aa7]/30 text-[#5fe3c0] border border-[#0e9aa7]/50 font-semibold'
                  : 'bg-white/5 text-white/50 hover:text-white'
              }`}
            >
              {currentDepartment} Queue ({tasks.filter((t) => t.eventId === currentEvent.id && t.department === currentDepartment).length})
            </button>
            <button
              onClick={() => setScopeFilter('all')}
              className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-mono transition-colors text-center cursor-pointer ${
                scopeFilter === 'all'
                  ? 'bg-[#0e9aa7]/30 text-[#5fe3c0] border border-[#0e9aa7]/50 font-semibold'
                  : 'bg-white/5 text-white/50 hover:text-white'
              }`}
            >
              All Shifts ({eventTasks.length})
            </button>
          </div>

          {/* Status Filter Bar: All / To Do / In Progress / Completed */}
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between gap-1">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2 py-0.5 rounded-md text-[9px] font-mono transition-colors cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              All ({totalScopeTasks})
            </button>
            <button
              onClick={() => setStatusFilter('todo')}
              className={`px-2 py-0.5 rounded-md text-[9px] font-mono transition-colors cursor-pointer ${
                statusFilter === 'todo'
                  ? 'bg-[#2f7be8]/30 text-[#2f7be8] border border-[#2f7be8]/50 font-semibold'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              To Do ({todoCount})
            </button>
            <button
              onClick={() => setStatusFilter('in-progress')}
              className={`px-2 py-0.5 rounded-md text-[9px] font-mono transition-colors cursor-pointer ${
                statusFilter === 'in-progress'
                  ? 'bg-[#cdbbf0]/20 text-[#cdbbf0] border border-[#cdbbf0]/40 font-semibold'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              In Progress ({inProgressCount})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-2 py-0.5 rounded-md text-[9px] font-mono transition-colors cursor-pointer ${
                statusFilter === 'completed'
                  ? 'bg-[#5fe3c0]/20 text-[#5fe3c0] border border-[#5fe3c0]/40 font-semibold'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              Done ({completedCount})
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {activeTab === 'tasks' && (
            <>
              <div className="flex items-center justify-between text-xs text-white/60 px-1">
                <span className="font-mono text-[10px] uppercase tracking-wider">
                  {scopeFilter === 'my-team' ? `${currentDepartment} Shifts` : 'All Departments'}
                  {statusFilter !== 'all' && ` · ${statusFilter.toUpperCase()}`}
                </span>
                <span className="text-[10px] font-mono text-[#0e9aa7]">
                  Showing {displayedTasks.length} {displayedTasks.length === 1 ? 'task' : 'tasks'}
                </span>
              </div>

              {displayedTasks.length === 0 ? (
                <div className="p-8 rounded-2xl glass-panel border border-white/10 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#5fe3c0] mx-auto opacity-70" />
                  <p className="text-xs text-white/70 font-medium">No tasks found under this filter.</p>
                  <button
                    onClick={() => setStatusFilter('all')}
                    className="text-[11px] font-mono text-[#0e9aa7] hover:underline cursor-pointer"
                  >
                    Reset filter to view all
                  </button>
                </div>
              ) : (
                displayedTasks.map((t) => {
                  const isDone = t.status === 'done' || t.status === 'approved';
                  const isInProgress = t.status === 'in-progress';
                  const isAssignedToMe = t.assigneeName.toLowerCase().includes(currentVolunteerName.toLowerCase().split(' ')[0]);

                  return (
                    <div
                      key={t.id}
                      className={`p-3.5 rounded-2xl glass-panel border transition-all text-xs space-y-2.5 ${
                        isDone
                          ? 'border-[#0e9aa7]/40 bg-[#0e9aa7]/5'
                          : isInProgress
                          ? 'border-[#2f7be8]/50 bg-[#2f7be8]/10'
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      {/* Top Row: Department, Priority & Status Tag */}
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-[#cdbbf0]">
                            {t.department}
                          </span>
                          
                          {/* Priority badge */}
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                            t.priority === 'high'
                              ? 'bg-[#8c2b3d]/30 text-[#ff6b81] border border-[#8c2b3d]/50'
                              : t.priority === 'medium'
                              ? 'bg-[#2f7be8]/20 text-[#2f7be8] border border-[#2f7be8]/40'
                              : 'bg-white/10 text-white/60'
                          }`}>
                            {t.priority}
                          </span>

                          {isAssignedToMe && (
                            <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold bg-[#5fe3c0]/20 text-[#5fe3c0] border border-[#5fe3c0]/30">
                              YOU
                            </span>
                          )}
                        </div>

                        <span className={`text-[9px] font-mono font-semibold shrink-0 ${
                          isDone 
                            ? 'text-[#5fe3c0]' 
                            : isInProgress 
                            ? 'text-[#cdbbf0] animate-pulse' 
                            : 'text-white/40'
                        }`}>
                          {isDone ? '✓ COMPLETED' : isInProgress ? '● IN PROGRESS' : 'TO DO'}
                        </span>
                      </div>

                      {/* Task Title & Details */}
                      <div>
                        <h3 className="font-semibold text-white text-xs leading-snug">{t.title}</h3>
                        {t.description && (
                          <p className="mt-1 text-[11px] text-white/60 leading-relaxed">{t.description}</p>
                        )}
                        <div className="mt-2 space-y-1 text-[10px] text-white/50">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-[#0e9aa7] shrink-0" />
                            <span className="truncate">{t.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-[#2f7be8] shrink-0" />
                            <span>{t.scheduledTime} · Assigned: <strong className="text-white/80">{t.assigneeName}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Status Stepper */}
                      <div className="flex items-center justify-between pt-1.5 border-t border-white/5 text-[8px] font-mono text-white/40">
                        <span className={t.status !== 'todo' ? 'text-[#5fe3c0]' : ''}>1. Assigned</span>
                        <span>→</span>
                        <span className={isInProgress || isDone ? 'text-[#5fe3c0]' : ''}>2. Started</span>
                        <span>→</span>
                        <span className={isDone ? 'text-[#5fe3c0]' : ''}>3. Photo Verified</span>
                      </div>

                      {/* Completed Details */}
                      {isDone && (
                        <div className="p-2 rounded-xl bg-[#0e9aa7]/15 border border-[#0e9aa7]/30 text-[10px] space-y-1">
                          <div className="flex items-center justify-between text-[#5fe3c0] font-mono">
                            <span className="flex items-center gap-1">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>Verified at {t.completedAt || 'Field Verified'}</span>
                            </span>
                            <span className="text-[9px] opacity-75">GPS LOCKED</span>
                          </div>
                          {t.reviewComment && (
                            <p className="text-white/70 italic text-[10px]">"{t.reviewComment}"</p>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="pt-0.5">
                        {t.status === 'todo' && (
                          <button
                            onClick={() => startTask(t.id)}
                            className="w-full py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#2f7be8] to-[#6b4fb8] hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                          >
                            Start Task Now
                          </button>
                        )}

                        {isInProgress && (
                          <button
                            onClick={() => handleOpenCompleteSheet(t)}
                            className="w-full py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#0e9aa7] to-[#5fe3c0] hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>Attach Photo & Finish Task</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}

          {activeTab === 'info' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-2">
                <span className="text-[10px] uppercase font-mono text-[#0e9aa7] font-semibold">Today’s Run of Show</span>
                <div className="space-y-2 pt-1 text-[11px]">
                  <div className="flex justify-between text-white/80 pb-1 border-b border-white/5">
                    <span>Vendor Material Gate Inward</span>
                    <span className="font-mono text-[#5fe3c0]">12:00 PM</span>
                  </div>
                  <div className="flex justify-between text-white/80 pb-1 border-b border-white/5">
                    <span>Stage AV Rigging & Lighting Check</span>
                    <span className="font-mono text-[#5fe3c0]">3:30 PM</span>
                  </div>
                  <div className="flex justify-between text-white/80 pb-1 border-b border-white/5">
                    <span>VIP Convoy Porch Arrival</span>
                    <span className="font-mono text-[#5fe3c0]">5:20 PM</span>
                  </div>
                  <div className="flex justify-between text-white/80 pb-1 border-b border-white/5">
                    <span>Registration Doors Open</span>
                    <span className="font-mono text-[#5fe3c0]">5:30 PM</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Keynote Commences</span>
                    <span className="font-mono text-[#5fe3c0]">6:30 PM</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
                <span className="text-[10px] uppercase font-mono text-[#cdbbf0] font-semibold">Emergency Contacts</span>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <div className="font-semibold text-white">Rahul Sharma</div>
                    <div className="text-[10px] text-white/50">F&B Operations Lead</div>
                  </div>
                  <a href="tel:+919711188990" className="p-2 rounded-lg bg-[#0e9aa7]/20 text-[#5fe3c0]">
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <div className="font-semibold text-white">Hotel Taj Security Desk</div>
                    <div className="text-[10px] text-white/50">Extension 404</div>
                  </div>
                  <a href="tel:100" className="p-2 rounded-lg bg-[#8c2b3d]/30 text-[#ff6b81]">
                    <ShieldAlert className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-mono text-[#5fe3c0] block mb-1">4:52 PM · Team Lead Rahul</span>
                <p className="text-white/80 leading-snug">Buffet Setup photo approved and marked complete on Event Head board.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-mono text-[#0e9aa7] block mb-1">3:15 PM · Logistics Dispatch</span>
                <p className="text-white/80 leading-snug">500 Chiavari chairs delivered at Bay 3. Stamped receipt filed.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] font-mono text-[#2f7be8] block mb-1">2:45 PM · Decor Lead</span>
                <p className="text-white/80 leading-snug">Grand entryway red carpet laid and safety tape sealed.</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Phone Action Bar: Report Problem + Navigation Tabs */}
        <div className="p-3 bg-black/90 border-t border-white/10 shrink-0 space-y-2">
          <button
            onClick={() => setIsReportOpen(true)}
            className="w-full py-2 rounded-xl text-xs font-mono text-[#ff6b81] bg-[#8c2b3d]/20 hover:bg-[#8c2b3d]/30 border border-[#8c2b3d]/40 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Report a Ground Problem</span>
          </button>

          <div className="grid grid-cols-3 gap-1 pt-1">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'tasks' ? 'text-white bg-white/10' : 'text-white/40 hover:text-white'
              }`}
            >
              My Tasks
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'info' ? 'text-white bg-white/10' : 'text-white/40 hover:text-white'
              }`}
            >
              Event Info
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === 'notifications' ? 'text-white bg-white/10' : 'text-white/40 hover:text-white'
              }`}
            >
              Alerts
            </button>
          </div>
        </div>
      </div>

      {/* COMPLETE TASK WITH PHOTO MODAL SHEET */}
      {activeCompletingTask && (
        <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-3 bg-black/85 backdrop-blur-xl animate-in fade-in">
          <div className="max-w-sm w-full rounded-3xl glass-panel p-6 border border-[#0e9aa7]/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono uppercase text-[#0e9aa7] font-semibold">Submit Execution Proof</span>
              <button onClick={() => setActiveCompletingTask(null)} className="text-white/40 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="font-display font-bold text-base text-white">{activeCompletingTask.title}</h3>
              <p className="text-xs text-white/50">{activeCompletingTask.location}</p>
            </div>

            {/* Photo Preview Frame */}
            <div className="rounded-xl overflow-hidden border border-white/20 aspect-video relative bg-black/80 flex items-center justify-center">
              {photoPreview ? (
                <img src={photoPreview} alt="Proof" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-white/40 text-xs">
                  <Camera className="w-6 h-6 mb-1 text-white/60" />
                  <span>Tap to snap live photo</span>
                </div>
              )}
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-[#5fe3c0]">
                GPS VERIFIED
              </div>
            </div>

            <input
              type="text"
              placeholder="Add optional note for Team Lead..."
              value={completionNote}
              onChange={(e) => setCompletionNote(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            />

            <button
              onClick={handleSubmitCompletion}
              className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#0e9aa7] via-[#2f7be8] to-[#5fe3c0] hover:opacity-90 shadow-lg cursor-pointer"
            >
              Submit Proof & Finish Task
            </button>
          </div>
        </div>
      )}

      {/* REPORT GROUND PROBLEM MODAL */}
      {isReportOpen && (
        <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-3 bg-black/85 backdrop-blur-xl animate-in fade-in">
          <div className="max-w-sm w-full rounded-3xl glass-panel p-6 border border-[#8c2b3d]/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-semibold text-[#ff6b81] flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Urgent Ground Issue</span>
              </span>
              <button onClick={() => setIsReportOpen(false)} className="text-white/40 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-white/70">
              Report equipment damage, missing deliveries, or safety hazards directly to your Team Lead.
            </p>

            <textarea
              rows={3}
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder="e.g. Ice machine leaking water near ballroom entrance carpet..."
              className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none"
            />

            <button
              onClick={() => {
                if (problemText) {
                  addToast({
                    title: 'Ground Problem Dispatched',
                    message: `Sent to Team Lead ${currentDepartment}: "${problemText}"`,
                    type: 'alert'
                  });
                  setIsReportOpen(false);
                  setProblemText('');
                }
              }}
              className="w-full py-3 rounded-xl text-xs font-semibold text-white bg-[#8c2b3d] hover:opacity-90 cursor-pointer"
            >
              Send Alert to Team Lead
            </button>
          </div>
        </div>
      )}

      {/* SWITCH TEAM & VOLUNTEER DRAWER / MODAL */}
      {isTeamDrawerOpen && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-3 bg-black/85 backdrop-blur-xl animate-in fade-in">
          <div className="max-w-md w-full max-h-[85vh] flex flex-col rounded-3xl glass-panel border border-[#0e9aa7]/40 shadow-2xl overflow-hidden">
            {/* Drawer Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0d0b17]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#0e9aa7] font-semibold block">
                  Ground Operations Roster
                </span>
                <h3 className="font-display font-bold text-sm text-white">Switch Team or Volunteer Profile</h3>
              </div>
              <button onClick={() => setIsTeamDrawerOpen(false)} className="text-white/40 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Department & Volunteer Selection List */}
            <div className="p-4 overflow-y-auto space-y-4">
              {(Object.keys(ALL_ROSTERS) as DepartmentName[]).map((dept) => {
                const volunteers = ALL_ROSTERS[dept];
                const isCurrentDept = currentDepartment === dept;

                return (
                  <div key={dept} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono text-white/70 px-1">
                      <span className="font-bold flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#0e9aa7]" />
                        <span>{dept} Department</span>
                      </span>
                      {isCurrentDept && (
                        <span className="text-[10px] text-[#5fe3c0] bg-[#5fe3c0]/10 px-1.5 py-0.2 rounded border border-[#5fe3c0]/20">
                          CURRENT
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      {volunteers.map((v) => {
                        const isSelected = currentDepartment === dept && currentVolunteerName === v.name;
                        return (
                          <div
                            key={v.name}
                            onClick={() => handleSwitchTeamVolunteer(dept, v)}
                            className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#0e9aa7]/25 border-[#5fe3c0] text-white shadow-sm'
                                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="font-semibold text-white flex items-center gap-1.5 truncate">
                                <span>{v.name}</span>
                                {isSelected && (
                                  <span className="px-1 py-0.2 rounded text-[8px] font-mono bg-[#5fe3c0]/20 text-[#5fe3c0]">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-white/50 truncate mt-0.5">
                                {v.station}
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
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
