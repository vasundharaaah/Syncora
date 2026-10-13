import React, { useState, useEffect } from 'react';
import { useSyncoraStore } from '../../store/useSyncoraStore';
import { DashboardHeader } from '../../components/common/DashboardHeader';
import { HealthRing } from '../../components/common/HealthRing';
import { StatusChip } from '../../components/common/StatusChip';
import { CommandPalette } from '../../components/common/CommandPalette';
import { ProofLightbox } from '../../components/common/ProofLightbox';
import { DepartmentName, VendorPipelineItem, DepartmentTask } from '../../types';
import confetti from 'canvas-confetti';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Layers, 
  Truck, 
  FileText, 
  Radio, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Plus, 
  Search, 
  ChevronRight, 
  Camera, 
  Sliders, 
  ArrowRight, 
  X, 
  Upload, 
  BarChart2, 
  Zap, 
  Maximize2, 
  Minimize2,
  Check
} from 'lucide-react';
import { TimelineModule } from './components/TimelineModule';
import { TeamRosterModule } from './components/TeamRosterModule';
import { RisksModule } from './components/RisksModule';
import { PostEventModule } from './components/PostEventModule';
import { DocumentsModule } from './components/DocumentsModule';

interface EventHeadAppProps {
  onBackToLanding: () => void;
}

export const EventHeadApp: React.FC<EventHeadAppProps> = ({ onBackToLanding }) => {
  const { 
    currentEventId, 
    events, 
    tasks, 
    vendors, 
    logistics, 
    activities, 
    meetings, 
    team, 
    alerts,
    completeTask,
    markLogisticsArrived, 
    updateVendorStage, 
    convertMeetingToTasks,
    parseAndApplyWhatsApp,
    createTask
  } = useSyncoraStore();

  const currentEvent = events.find((e) => e.id === currentEventId) || events[0];

  // Active sub-page
  const [activeSection, setActiveSection] = useState<
    'overview' | 'timeline' | 'vendors' | 'budget' | 'logistics' | 'departments' | 'meetings' | 'team' | 'documents' | 'risks' | 'live-mode' | 'post-event'
  >('overview');

  // Command palette
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Proof Lightbox
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    imageUrl?: string;
    title: string;
    actor?: string;
    timestamp?: string;
    taskId?: string;
  }>({ isOpen: false, title: '' });

  // Live Countdown state
  const [countdown, setCountdown] = useState({ days: 64, hours: 14, mins: 32, secs: 10 });
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        return { ...prev, secs: 59, mins: prev.mins > 0 ? prev.mins - 1 : 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // What-If Sliders for Budget & Profit
  const [negotiationDiscount, setNegotiationDiscount] = useState(6); // %
  const [staffOptimization, setStaffOptimization] = useState(4); // %
  const baselineProfit = currentEvent.projectedProfit;
  const optimizedProfit = Math.round(baselineProfit + (currentEvent.budget * (negotiationDiscount + staffOptimization)) / 100);

  // Vendor detail drawer
  const [selectedVendor, setSelectedVendor] = useState<VendorPipelineItem | null>(null);

  // Meeting AI extraction state
  const [rawNotesInput, setRawNotesInput] = useState('');
  const [isExtractingMeeting, setIsExtractingMeeting] = useState(false);
  const [extractedDecisions, setExtractedDecisions] = useState<string[]>([]);
  const [extractedActions, setExtractedActions] = useState<{ task: string; owner: string; dueDate: string }[]>([]);

  // WhatsApp Import Drawer
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);
  const [waText, setWaText] = useState('Buffet setup done 👍 stage light testing in 15 mins');

  // New Task state
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDept, setNewTaskDept] = useState<DepartmentName>('F&B');
  const [newTaskLocation, setNewTaskLocation] = useState('Main Ballroom');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Rahul (Volunteer 1)');

  // Selected Department for department view
  const [activeDeptTab, setActiveDeptTab] = useState<DepartmentName>('F&B');

  // Filter tasks for this event
  const eventTasks = tasks.filter((t) => t.eventId === currentEvent.id);
  const completedTasksCount = eventTasks.filter((t) => t.status === 'done' || t.status === 'approved').length;

  // Handle Meeting AI Extraction simulation
  const handleExtractMeeting = () => {
    setIsExtractingMeeting(true);
    setTimeout(() => {
      setExtractedDecisions([
        'Confirmed stage profile spotlights will use warm 3200K color balance.',
        'VIP entry gate will remain reserved strictly for speaker convoy until 5:45 PM.'
      ]);
      setExtractedActions([
        { task: 'Position 4 bilingual marshals at Gate 2', owner: 'Simran (Volunteer 4)', dueDate: '4:15 PM' },
        { task: 'Verify backup 65kVA generator fuel level', owner: 'Dev (Volunteer 3)', dueDate: '3:30 PM' },
        { task: 'Print 150 revised dessert buffet name cards', owner: 'Rahul (Volunteer 1)', dueDate: '4:45 PM' }
      ]);
      setIsExtractingMeeting(false);
    }, 900);
  };

  const handleApplyWhatsApp = () => {
    if (!waText) return;
    parseAndApplyWhatsApp(waText);
    setIsWaModalOpen(false);
    setWaText('');
  };

  const handleCreateTask = () => {
    if (!newTaskTitle) return;
    createTask({
      eventId: currentEvent.id,
      department: newTaskDept,
      title: newTaskTitle,
      location: newTaskLocation,
      scheduledTime: '4:30 PM',
      assigneeName: newTaskAssignee,
      priority: 'high',
      status: 'todo'
    });
    setIsNewTaskOpen(false);
    setNewTaskTitle('');
  };

  const handleAdvanceVendor = (vendor: VendorPipelineItem) => {
    const stages: VendorPipelineItem['stage'][] = [
      'Potential', 'Shortlisted', 'Site Visit', 'Negotiating', 'Finalized', 'Contract Signed', 'Advance Paid'
    ];
    const currentIndex = stages.indexOf(vendor.stage);
    if (currentIndex < stages.length - 1) {
      updateVendorStage(vendor.id, stages[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex select-none">
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
      
      <ProofLightbox
        isOpen={lightboxData.isOpen}
        onClose={() => setLightboxData({ isOpen: false, title: '' })}
        imageUrl={lightboxData.imageUrl}
        title={lightboxData.title}
        actor={lightboxData.actor}
        timestamp={lightboxData.timestamp}
      />

      {/* Left Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-[#07060d]/90 backdrop-blur-2xl flex flex-col justify-between shrink-0 hidden lg:flex z-30">
        <div>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <img src="/assets/logo.png" alt="SYNCORA" className="h-7 w-auto object-contain" />
          </div>

          <div className="p-4">
            <div className="px-3 mb-2 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-white/40">
              <span>Event Modules</span>
              <span className="text-[#0e9aa7]">Head View</span>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'overview', label: 'Mission Overview', icon: Layers },
                { id: 'timeline', label: 'Phased Timeline', icon: Calendar },
                { id: 'vendors', label: 'Venue & Vendors', icon: Users },
                { id: 'budget', label: 'Budget & What-If', icon: DollarSign },
                { id: 'logistics', label: 'Live Logistics', icon: Truck },
                { id: 'departments', label: '9 Departments', icon: CheckCircle2 },
                { id: 'meetings', label: 'Meeting Hub (AI)', icon: FileText },
                { id: 'team', label: 'Team & Roster', icon: Users },
                { id: 'risks', label: 'Predictive Risks', icon: AlertTriangle },
                { id: 'live-mode', label: 'Live Mission Mode', icon: Radio },
                { id: 'post-event', label: 'Post-Event Review', icon: BarChart2 }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as typeof activeSection)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0e9aa7]/25 to-[#2f7be8]/25 text-white border border-[#0e9aa7]/40 shadow-sm'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#0e9aa7]' : 'text-white/40'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Bottom: WhatsApp Tool button */}
        <div className="p-4 border-t border-white/10 m-2 rounded-xl bg-white/5 space-y-2">
          <button
            onClick={() => setIsWaModalOpen(true)}
            className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Parser</span>
          </button>
          <button
            onClick={onBackToLanding}
            className="w-full py-1.5 rounded-lg text-[11px] text-white/40 hover:text-white text-center block cursor-pointer"
          >
            ← Exit to Landing
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader
          onOpenCommandPalette={() => setIsCommandOpen(true)}
          title={currentEvent.name}
          subtitle={`Lead: Aditi Rao · ${currentEvent.location} · ₹${(currentEvent.budget / 100000).toFixed(1)}L Budget`}
        />

        <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
          {/* Main workspace */}
          <main className="flex-1 p-6 lg:p-8 space-y-8 overflow-y-auto max-w-6xl">
            {/* OVERVIEW HEADER HERO STRIP */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <StatusChip status={currentEvent.status} />
                    <span className="text-xs font-mono text-[#0e9aa7]">Event Countdown:</span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white tracking-tight">{currentEvent.name}</h2>
                  <p className="text-xs text-white/50 mt-1">{currentEvent.client} · Venue: {currentEvent.location}</p>
                </div>

                {/* Live Countdown Clock */}
                <div className="flex items-center gap-3 bg-black/60 p-3.5 rounded-xl border border-white/10">
                  <div className="text-center px-2">
                    <div className="text-xl font-mono font-bold text-white tabular-nums">{countdown.days}</div>
                    <div className="text-[9px] uppercase font-mono text-white/40">Days</div>
                  </div>
                  <span className="text-white/30 font-mono">:</span>
                  <div className="text-center px-2">
                    <div className="text-xl font-mono font-bold text-white tabular-nums">{countdown.hours}</div>
                    <div className="text-[9px] uppercase font-mono text-white/40">Hours</div>
                  </div>
                  <span className="text-white/30 font-mono">:</span>
                  <div className="text-center px-2">
                    <div className="text-xl font-mono font-bold text-[#5fe3c0] tabular-nums">{countdown.mins}</div>
                    <div className="text-[9px] uppercase font-mono text-white/40">Mins</div>
                  </div>
                  <span className="text-white/30 font-mono">:</span>
                  <div className="text-center px-2">
                    <div className="text-xl font-mono font-bold text-[#cdbbf0] tabular-nums">{countdown.secs}</div>
                    <div className="text-[9px] uppercase font-mono text-white/40">Secs</div>
                  </div>
                </div>
              </div>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
                <div className="flex items-center gap-3">
                  <HealthRing score={currentEvent.health} size={48} showLabel={false} />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-white/50 block">Health Score</span>
                    <span className="text-sm font-mono font-bold text-[#5fe3c0]">{currentEvent.health}% Healthy</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-white/50 block">Planning Progress</span>
                  <div className="text-sm font-mono font-bold text-white mt-0.5">{currentEvent.planningCompletion}% Ready</div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mt-1.5">
                    <div className="h-full bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8]" style={{ width: `${currentEvent.planningCompletion}%` }} />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-white/50 block">Committed Budget</span>
                  <div className="text-sm font-mono font-bold text-white mt-0.5">₹{(currentEvent.budget / 100000).toFixed(1)}L</div>
                  <span className="text-[10px] text-white/40">78% funds deployed</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-white/50 block">Projected Profit</span>
                  <div className="text-sm font-mono font-bold text-[#5fe3c0] mt-0.5">₹{(currentEvent.projectedProfit / 100000).toFixed(1)}L</div>
                  <span className="text-[10px] text-white/40">24.8% net margin</span>
                </div>
              </div>
            </div>

            {/* SECTION: OVERVIEW / DASHBOARD SUMMARY */}
            {activeSection === 'overview' && (
              <div className="space-y-6">
                {/* Action Shortcuts */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-display font-bold text-white">Execution Command Modules</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsNewTaskOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] hover:opacity-90 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Live Task</span>
                    </button>
                    <button
                      onClick={() => setActiveSection('live-mode')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 cursor-pointer"
                    >
                      <Radio className="w-3.5 h-3.5 text-[#5fe3c0]" />
                      <span>Mission Control</span>
                    </button>
                  </div>
                </div>

                {/* 2-Column Split: Active Tasks Checklist & Upcoming Logistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Department Tasks */}
                  <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-semibold text-white">Live Department Deliverables</span>
                      <span className="text-[11px] font-mono text-[#5fe3c0]">{completedTasksCount} / {eventTasks.length} Done</span>
                    </div>

                    <div className="space-y-2.5 max-h-96 overflow-y-auto">
                      {eventTasks.map((t) => (
                        <div
                          key={t.id}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3 text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#0e9aa7]/20 text-[#5fe3c0]">
                                {t.department}
                              </span>
                              <span className="font-semibold text-white">{t.title}</span>
                            </div>
                            <div className="text-[11px] text-white/50">
                              📍 {t.location} · ⏰ {t.scheduledTime} · {t.assigneeName}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {t.proofUrl && (
                              <button
                                onClick={() => setLightboxData({
                                  isOpen: true,
                                  imageUrl: t.proofUrl,
                                  title: t.title,
                                  actor: t.assigneeName,
                                  timestamp: t.completedAt
                                })}
                                className="p-1 rounded bg-white/10 hover:bg-white/20 text-[#5fe3c0] cursor-pointer"
                                title="View Proof Photo"
                              >
                                <Camera className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {t.status !== 'done' && t.status !== 'approved' ? (
                              <button
                                onClick={() => completeTask(t.id)}
                                className="px-2.5 py-1 rounded bg-[#0e9aa7]/20 text-[#5fe3c0] border border-[#0e9aa7]/40 text-[11px] font-medium hover:bg-[#0e9aa7]/40 cursor-pointer"
                              >
                                Mark Done
                              </button>
                            ) : (
                              <span className="text-[11px] font-mono text-[#5fe3c0] flex items-center gap-1">
                                <Check className="w-3 h-3" /> Done
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Live Logistics Arrivals */}
                  <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-xs font-semibold text-white">Critical Logistics Delivery Schedule</span>
                      <span className="text-[11px] font-mono text-white/50">{logistics.length} Scheduled</span>
                    </div>

                    <div className="space-y-2.5 max-h-96 overflow-y-auto">
                      {logistics.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs"
                        >
                          <div>
                            <div className="font-semibold text-white">{item.item}</div>
                            <div className="text-[11px] text-white/50">
                              Vendor: {item.vendor} · Due: {item.deliveryTime}
                            </div>
                          </div>

                          <div>
                            {item.status === 'Arrived' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#0e9aa7]/20 text-[#5fe3c0] border border-[#0e9aa7]/30">
                                ARRIVED
                              </span>
                            ) : (
                              <button
                                onClick={() => markLogisticsArrived(item.id)}
                                className="px-2.5 py-1 rounded bg-[#6b4fb8]/20 text-[#cdbbf0] border border-[#6b4fb8]/40 text-[11px] hover:bg-[#6b4fb8]/40 cursor-pointer"
                              >
                                Mark Arrived
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: VENUE & VENDORS KANBAN */}
            {activeSection === 'vendors' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-display font-bold text-white">Vendor & Procurement Pipeline</h3>
                    <p className="text-xs text-white/50">Advance vendors across contract stages. Finalized vendors trigger celebratory confetti.</p>
                  </div>
                </div>

                {/* Pipeline Stages */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 overflow-x-auto pb-4">
                  {(['Potential', 'Shortlisted', 'Site Visit', 'Negotiating', 'Finalized', 'Contract Signed', 'Advance Paid'] as const).map((stage) => {
                    const stageVendors = vendors.filter((v) => v.stage === stage);
                    return (
                      <div key={stage} className="p-3 rounded-xl bg-[#0d0b17] border border-white/10 min-w-[200px] flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-white/70 font-semibold">{stage}</span>
                            <span className="text-[10px] font-mono text-[#0e9aa7]">{stageVendors.length}</span>
                          </div>

                          <div className="space-y-2">
                            {stageVendors.map((v) => (
                              <div
                                key={v.id}
                                onClick={() => setSelectedVendor(v)}
                                className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#cdbbf0]/40 transition-colors cursor-pointer text-xs group"
                              >
                                <div className="font-semibold text-white group-hover:text-[#cdbbf0]">{v.name}</div>
                                <div className="text-[11px] text-white/50">{v.category}</div>
                                <div className="mt-2 flex items-center justify-between text-[11px]">
                                  <span className="font-mono text-white">₹{(v.quoteAmount / 100000).toFixed(1)}L</span>
                                  <span className="font-mono text-[#5fe3c0]">{v.reliabilityScore}% rel</span>
                                </div>
                                {v.isLateRisk && (
                                  <div className="mt-1 text-[9px] text-[#ff6b81] font-mono">
                                    ⚠️ Delivery Lag Flag
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {stageVendors.length > 0 && stage !== 'Advance Paid' && (
                          <button
                            onClick={() => handleAdvanceVendor(stageVendors[0])}
                            className="mt-3 w-full py-1 rounded text-[10px] font-mono text-[#cdbbf0] bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                          >
                            Advance Next →
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION: BUDGET & WHAT-IF PROFIT SLIDERS */}
            {activeSection === 'budget' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-display font-bold text-white">Dynamic Budget & What-If Profit Simulator</h3>
                  <p className="text-xs text-white/50">Adjust operational levers to simulate real-time margin realization.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: What-If Sliders */}
                  <div className="glass-panel rounded-2xl p-6 border border-[#0e9aa7]/30 space-y-6">
                    <span className="text-xs font-mono uppercase text-[#0e9aa7] tracking-wider font-semibold">
                      Predictive Margin Controls
                    </span>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-white mb-2">
                        <span>Vendor Negotiation Savings</span>
                        <span className="font-mono text-[#5fe3c0]">{negotiationDiscount}% (+₹{Math.round((currentEvent.budget * negotiationDiscount) / 100).toLocaleString()})</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="15"
                        value={negotiationDiscount}
                        onChange={(e) => setNegotiationDiscount(Number(e.target.value))}
                        className="w-full accent-[#0e9aa7] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-medium text-white mb-2">
                        <span>Internal Staffing Optimization</span>
                        <span className="font-mono text-[#5fe3c0]">{staffOptimization}% (+₹{Math.round((currentEvent.budget * staffOptimization) / 100).toLocaleString()})</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        value={staffOptimization}
                        onChange={(e) => setStaffOptimization(Number(e.target.value))}
                        className="w-full accent-[#2f7be8] cursor-pointer"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-black/60 border border-[#0e9aa7]/30 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-white/50 block">Optimized Projected Profit</span>
                        <div className="text-2xl font-mono font-bold text-[#5fe3c0] tabular-nums">
                          ₹{(optimizedProfit / 100000).toFixed(2)}L
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#5fe3c0] font-bold">
                        +₹{((optimizedProfit - baselineProfit) / 100000).toFixed(2)}L Lift
                      </span>
                    </div>
                  </div>

                  {/* Right: Category Breakdown */}
                  <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
                    <span className="text-xs font-mono uppercase text-white/50 tracking-wider">
                      Budget Category Allocations
                    </span>

                    <div className="space-y-3 text-xs">
                      {[
                        { cat: 'AV & Digital Production', planned: 550000, quoted: 520000, var: -30000 },
                        { cat: 'Catering & Hospitality', planned: 800000, quoted: 780000, var: -20000 },
                        { cat: 'Stage & Floral Decor', planned: 450000, quoted: 430000, var: -20000 },
                        { cat: 'Banquet Seating & Haulage', planned: 280000, quoted: 260000, var: -20000 },
                        { cat: 'Security Marshals & Valet', planned: 150000, quoted: 140000, var: -10000 }
                      ].map((item) => (
                        <div key={item.cat} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-white">{item.cat}</div>
                            <div className="text-[11px] text-white/50 font-mono">Planned: ₹{(item.planned / 100000).toFixed(1)}L</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-white font-bold">₹{(item.quoted / 100000).toFixed(1)}L</div>
                            <span className="text-[10px] font-mono text-[#5fe3c0]">₹{Math.abs(item.var / 1000)}k under cap</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: 9 DEPARTMENTS CHECKLIST */}
            {activeSection === 'departments' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-display font-bold text-white">9 Specialized Event Departments</h3>
                  <p className="text-xs text-white/50">Drill down into department checklists, proofs, and verified completions.</p>
                </div>

                {/* Department Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {(['F&B', 'Decor', 'Logistics', 'Production', 'Registration', 'Hospitality', 'Transport', 'Guest Management', 'Backstage'] as DepartmentName[]).map((d) => {
                    const deptTasks = tasks.filter((t) => t.department === d && t.eventId === currentEvent.id);
                    const done = deptTasks.filter((t) => t.status === 'done' || t.status === 'approved').length;
                    return (
                      <button
                        key={d}
                        onClick={() => setActiveDeptTab(d)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                          activeDeptTab === d
                            ? 'bg-[#0e9aa7] text-white font-semibold'
                            : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                        }`}
                      >
                        <span>{d} ({done}/{deptTasks.length})</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Department Tasks */}
                <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-sm font-semibold text-white">{activeDeptTab} Active Checklist</span>
                    <button
                      onClick={() => {
                        setNewTaskDept(activeDeptTab);
                        setIsNewTaskOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0e9aa7] hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Task in {activeDeptTab}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tasks.filter((t) => t.department === activeDeptTab && t.eventId === currentEvent.id).length === 0 ? (
                      <p className="text-xs text-white/50 text-center py-8">No tasks logged for this department yet.</p>
                    ) : (
                      tasks.filter((t) => t.department === activeDeptTab && t.eventId === currentEvent.id).map((t) => (
                        <div key={t.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-semibold text-white text-sm">{t.title}</div>
                            <div className="text-white/50 text-xs mt-0.5">
                              {t.description || `Scheduled at ${t.scheduledTime} · ${t.location}`}
                            </div>
                            <div className="mt-2 text-[11px] text-white/60">
                              Assigned to: <strong className="text-white">{t.assigneeName}</strong>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {t.proofUrl && (
                              <button
                                onClick={() => setLightboxData({
                                  isOpen: true,
                                  imageUrl: t.proofUrl,
                                  title: t.title,
                                  actor: t.assigneeName,
                                  timestamp: t.completedAt
                                })}
                                className="px-2.5 py-1 rounded bg-[#0e9aa7]/20 text-[#5fe3c0] border border-[#0e9aa7]/40 flex items-center gap-1.5 cursor-pointer"
                              >
                                <Camera className="w-3.5 h-3.5" />
                                <span>Proof</span>
                              </button>
                            )}
                            <StatusChip status={t.status} />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION: MEETING HUB WITH AI EXTRACTION */}
            {activeSection === 'meetings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-display font-bold text-white">Meeting Hub & AI Action Extraction</h3>
                  <p className="text-xs text-white/50">Paste client or production minutes to automatically produce decisions and live tasks.</p>
                </div>

                <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
                  <label className="text-xs font-mono uppercase text-white/50 tracking-wider block">
                    Paste Meeting Notes or Raw Transcript
                  </label>
                  <textarea
                    rows={4}
                    value={rawNotesInput}
                    onChange={(e) => setRawNotesInput(e.target.value)}
                    placeholder="e.g. Client requested 50 extra VIP chairs for dinner. Keynote duration is locked at 22 minutes. Rahul needs to check wireless mic frequencies before 4 PM..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-[#0e9aa7]"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handleExtractMeeting}
                      disabled={isExtractingMeeting}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] hover:opacity-90 flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#d7f3e6]" />
                      <span>{isExtractingMeeting ? 'Scanning with AI...' : 'Extract Decisions & Tasks'}</span>
                    </button>
                  </div>

                  {extractedDecisions.length > 0 && (
                    <div className="pt-6 border-t border-white/10 space-y-4 animate-in fade-in">
                      <div>
                        <span className="text-[10px] uppercase font-mono text-[#5fe3c0] font-semibold block mb-2">
                          Extracted Decisions:
                        </span>
                        <div className="space-y-2">
                          {extractedDecisions.map((d, i) => (
                            <div key={i} className="p-2.5 rounded-lg bg-[#0e9aa7]/10 border border-[#0e9aa7]/30 text-xs text-white flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#5fe3c0] shrink-0" />
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] uppercase font-mono text-[#cdbbf0] font-semibold">
                            Extracted Action Items:
                          </span>
                          <button
                            onClick={() => convertMeetingToTasks('m-1')}
                            className="px-3 py-1 rounded bg-[#6b4fb8] text-white text-xs font-semibold hover:opacity-90 cursor-pointer"
                          >
                            Convert to Live Tasks →
                          </button>
                        </div>

                        <div className="space-y-2">
                          {extractedActions.map((a, i) => (
                            <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs flex items-center justify-between">
                              <span className="text-white font-medium">{a.task}</span>
                              <span className="font-mono text-white/50 text-[11px]">{a.owner} · Due {a.dueDate}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SECTION: LIVE MISSION MODE */}
            {activeSection === 'live-mode' && (
              <div className="p-8 rounded-2xl bg-black border border-[#0e9aa7]/50 shadow-[0_0_50px_rgba(14,154,167,0.2)] space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#5fe3c0] animate-ping" />
                    <h3 className="text-2xl font-display font-bold text-white tracking-tight">Mission Control · Live Stage & Floor</h3>
                  </div>
                  <span className="text-xs font-mono text-[#5fe3c0]">ALL SYSTEMS OPERATIONAL</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-mono text-white/50 block">Next Milestone</span>
                    <div className="text-lg font-bold text-white mt-1">Main Ballroom Doors Open</div>
                    <span className="text-xs font-mono text-[#5fe3c0]">T-Minus 18 Minutes</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-mono text-white/50 block">Floor Crew Status</span>
                    <div className="text-lg font-bold text-white mt-1">12 Volunteers Deployed</div>
                    <span className="text-xs font-mono text-white/60">0 Unanswered Escalations</span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-mono text-white/50 block">AV Broadcast Feed</span>
                    <div className="text-lg font-bold text-white mt-1">Keynote Audio Tested</div>
                    <span className="text-xs font-mono text-[#5fe3c0]">0dB Nominal Output</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setActiveSection('overview')}
                    className="px-4 py-2 rounded-lg text-xs text-white/70 hover:text-white bg-white/10"
                  >
                    Return to Standard Overview
                  </button>
                </div>
              </div>
            )}

            {/* MODULE: PHASED TIMELINE */}
            {activeSection === 'timeline' && <TimelineModule />}

            {/* MODULE: TEAM ROSTER */}
            {activeSection === 'team' && <TeamRosterModule />}

            {/* MODULE: PREDICTIVE RISKS */}
            {activeSection === 'risks' && <RisksModule />}

            {/* MODULE: POST-EVENT AUDIT */}
            {activeSection === 'post-event' && <PostEventModule />}

            {/* MODULE: DOCUMENTS & COMPLIANCE */}
            {activeSection === 'documents' && <DocumentsModule />}
          </main>

          {/* RIGHT RAIL: PERMANENT LIVE ACTIVITY FEED */}
          <aside className="w-full xl:w-80 border-t xl:border-t-0 xl:border-l border-white/10 bg-[#07060d]/70 backdrop-blur-xl p-5 flex flex-col justify-between shrink-0">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-semibold text-white flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-[#5fe3c0]" />
                  <span>Permanent Activity Ledger</span>
                </span>
                <span className="text-[10px] font-mono text-[#0e9aa7]">{activities.length} Recorded</span>
              </div>

              <div className="space-y-3 max-h-[70vh] overflow-y-auto">
                {activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1.5 animate-in slide-in-from-top-2"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                      <span className="text-[#0e9aa7]">{act.department}</span>
                      <span>{act.timestamp}</span>
                    </div>

                    <div className="font-semibold text-white leading-snug">{act.title}</div>
                    <div className="text-[11px] text-white/60">By {act.actor}</div>

                    {act.proofUrl && (
                      <button
                        onClick={() => setLightboxData({
                          isOpen: true,
                          imageUrl: act.proofUrl,
                          title: act.title,
                          actor: act.actor,
                          timestamp: act.timestamp
                        })}
                        className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-[#5fe3c0] hover:underline cursor-pointer"
                      >
                        <Camera className="w-3 h-3" />
                        <span>View Photo Proof</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[10px] text-white/40 font-mono text-center">
              Real-time multi-role sync active
            </div>
          </aside>
        </div>
      </div>

      {/* WHATSAPP IMPORT MODAL */}
      {isWaModalOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="max-w-md w-full rounded-2xl glass-panel p-6 border border-emerald-500/40 shadow-2xl relative">
            <button
              onClick={() => setIsWaModalOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Natural Language Import Tool</span>
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-2">Convert Field Message to Task</h3>
            <p className="text-xs text-white/60 mb-4">
              Paste any ground crew text or update to automatically extract department, assign status, and update the ledger.
            </p>

            <textarea
              rows={3}
              value={waText}
              onChange={(e) => setWaText(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-400 mb-4"
              placeholder="e.g. Stage lights test completed 👍"
            />

            <button
              onClick={handleApplyWhatsApp}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 shadow-lg cursor-pointer"
            >
              Structure & Sync to Live Dashboard
            </button>
          </div>
        </div>
      )}

      {/* CREATE TASK MODAL */}
      {isNewTaskOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="max-w-md w-full rounded-2xl glass-panel p-6 border border-[#0e9aa7]/40 shadow-2xl relative">
            <button
              onClick={() => setIsNewTaskOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-bold text-white mb-4">Deploy Live Task</h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-white/60 block mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Inspect Ballroom Wireless Mics"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#0e9aa7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 block mb-1">Department</label>
                  <select
                    value={newTaskDept}
                    onChange={(e) => setNewTaskDept(e.target.value as DepartmentName)}
                    className="w-full bg-[#0d0b17] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    {['F&B', 'Decor', 'Logistics', 'Production', 'Registration', 'Hospitality', 'Transport', 'Guest Management', 'Backstage'].map((d) => (
                      <option key={d} value={d} className="bg-[#0d0b17] text-white">{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white/60 block mb-1">Assignee</label>
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="w-full bg-[#0d0b17] border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Rahul (Volunteer 1)">Rahul (Volunteer 1)</option>
                    <option value="Ananya (Volunteer 2)">Ananya (Volunteer 2)</option>
                    <option value="Dev (Volunteer 3)">Dev (Volunteer 3)</option>
                    <option value="Simran (Volunteer 4)">Simran (Volunteer 4)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-white/60 block mb-1">Venue Location</label>
                <input
                  type="text"
                  value={newTaskLocation}
                  onChange={(e) => setNewTaskLocation(e.target.value)}
                  placeholder="e.g. Foyer Zone B"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-white focus:outline-none"
                />
              </div>

              <button
                onClick={handleCreateTask}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] hover:opacity-90 shadow-md cursor-pointer mt-2"
              >
                Dispatch Task to Field
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
