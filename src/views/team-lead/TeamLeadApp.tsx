import React, { useState } from 'react';
import { useSyncoraStore } from '../../store/useSyncoraStore';
import { DashboardHeader } from '../../components/common/DashboardHeader';
import { HealthRing } from '../../components/common/HealthRing';
import { StatusChip } from '../../components/common/StatusChip';
import { CommandPalette } from '../../components/common/CommandPalette';
import { ProofLightbox } from '../../components/common/ProofLightbox';
import { DepartmentTask, DepartmentName } from '../../types';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Plus, 
  Camera, 
  Send, 
  MessageSquare, 
  Radio, 
  Sparkles, 
  ChevronRight, 
  X,
  FileCheck,
  Check,
  RotateCcw
} from 'lucide-react';

interface TeamLeadAppProps {
  onBackToLanding: () => void;
}

export const TeamLeadApp: React.FC<TeamLeadAppProps> = ({ onBackToLanding }) => {
  const { 
    currentEventId, 
    currentDepartment, 
    setCurrentDepartment, 
    events, 
    tasks, 
    team, 
    completeTask, 
    approveTask, 
    rejectTask, 
    createTask,
    parseAndApplyWhatsApp,
    addToast
  } = useSyncoraStore();

  const currentEvent = events.find((e) => e.id === currentEventId) || events[0];

  const [activeTab, setActiveTab] = useState<'board' | 'review' | 'roster' | 'broadcast'>('board');
  const [boardView, setBoardView] = useState<'list' | 'kanban'>('list');
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // New task sheet
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('Ballroom Foyer');
  const [newTime, setNewTime] = useState('5:00 PM');
  const [newAssignee, setNewAssignee] = useState('Rahul (Volunteer 1)');

  // Lightbox
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    imageUrl?: string;
    title: string;
    actor?: string;
    timestamp?: string;
    taskId?: string;
  }>({ isOpen: false, title: '' });

  // Broadcast
  const [broadcastText, setBroadcastText] = useState('');
  const [sentBroadcasts, setSentBroadcasts] = useState<string[]>([
    'All station leads: Ballroom doors open at 6:00 PM sharp. High tea tasting must conclude by 5:30 PM.'
  ]);

  // Raise issue to Event Head
  const [isRaiseIssueOpen, setIsRaiseIssueOpen] = useState(false);
  const [issueTitle, setIssueTitle] = useState('');

  // Department tasks
  const deptTasks = tasks.filter((t) => t.department === currentDepartment && t.eventId === currentEvent.id);
  const doneTasks = deptTasks.filter((t) => t.status === 'done' || t.status === 'approved');
  const inProgressTasks = deptTasks.filter((t) => t.status === 'in-progress');
  const todoTasks = deptTasks.filter((t) => t.status === 'todo');
  const reviewQueue = deptTasks.filter((t) => t.status === 'done'); // awaiting review

  const progressPercent = Math.round((doneTasks.length / (deptTasks.length || 1)) * 100);

  const handleCreate = () => {
    if (!newTitle) return;
    createTask({
      eventId: currentEvent.id,
      department: currentDepartment,
      title: newTitle,
      location: newLocation,
      scheduledTime: newTime,
      assigneeName: newAssignee,
      priority: 'high',
      status: 'todo'
    });
    setIsAddTaskOpen(false);
    setNewTitle('');
  };

  const handleSendBroadcast = () => {
    if (!broadcastText) return;
    setSentBroadcasts([broadcastText, ...sentBroadcasts]);
    setBroadcastText('');
    addToast({
      title: 'Department Broadcast Dispatched',
      message: `Sent to all ${currentDepartment} volunteers with instant read receipts.`,
      type: 'info'
    });
  };

  const handleApplyTemplate = () => {
    createTask({
      eventId: currentEvent.id,
      department: currentDepartment,
      title: 'Barista Espresso & Beverage Restock',
      location: 'South Hall Barista Counter',
      scheduledTime: '5:45 PM',
      assigneeName: 'Ananya (Volunteer 2)',
      priority: 'medium',
      status: 'todo'
    });
    addToast({
      title: 'Template Applied',
      message: `Standard ${currentDepartment} setup checklist deployed.`,
      type: 'success'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col select-none">
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />

      <ProofLightbox
        isOpen={lightboxData.isOpen}
        onClose={() => setLightboxData({ isOpen: false, title: '' })}
        imageUrl={lightboxData.imageUrl}
        title={lightboxData.title}
        actor={lightboxData.actor}
        timestamp={lightboxData.timestamp}
        onApprove={lightboxData.taskId ? () => approveTask(lightboxData.taskId!) : undefined}
      />

      {/* Top Header */}
      <DashboardHeader
        onOpenCommandPalette={() => setIsCommandOpen(true)}
        title={`${currentDepartment} Operations Deck`}
        subtitle={`${currentEvent.name} · Department Lead: Rahul Sharma`}
      />

      <div className="max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
        {/* Department Switcher & Progress Strip */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <HealthRing score={progressPercent} size={58} showLabel={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-display font-bold text-white">{currentDepartment} Department</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#6b4fb8]/30 text-[#cdbbf0]">
                  {progressPercent}% Complete
                </span>
              </div>
              <p className="text-xs text-white/50 mt-0.5">
                {doneTasks.length} Done · {inProgressTasks.length} In Progress · {todoTasks.length} To Do
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={currentDepartment}
              onChange={(e) => setCurrentDepartment(e.target.value as DepartmentName)}
              className="bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#cdbbf0] cursor-pointer"
            >
              {(['F&B', 'Decor', 'Logistics', 'Production', 'Registration', 'Hospitality', 'Transport', 'Guest Management', 'Backstage'] as DepartmentName[]).map((d) => (
                <option key={d} value={d} className="bg-[#0d0b17] text-white">
                  {d} Department
                </option>
              ))}
            </select>

            <button
              onClick={() => setIsAddTaskOpen(true)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#6b4fb8] to-[#cdbbf0] hover:opacity-90 flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Assign Task</span>
            </button>

            <button
              onClick={handleApplyTemplate}
              className="px-3 py-2 rounded-xl text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
            >
              Apply Template
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex gap-2">
            {[
              { id: 'board', label: 'Task Board' },
              { id: 'review', label: `Review Queue (${reviewQueue.length})` },
              { id: 'roster', label: 'Volunteer Roster' },
              { id: 'broadcast', label: 'Broadcast Channel' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white/15 text-white font-semibold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsRaiseIssueOpen(true)}
            className="flex items-center gap-1.5 text-xs text-[#ff6b81] hover:underline cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Escalate Issue to Event Head</span>
          </button>
        </div>

        {/* TAB 1: TASK BOARD */}
        {activeTab === 'board' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Column 1: To Do */}
              <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-mono uppercase text-white/60 font-semibold">To Do ({todoTasks.length})</span>
                </div>
                <div className="space-y-2.5">
                  {todoTasks.map((t) => (
                    <div key={t.id} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-2">
                      <div className="font-semibold text-white">{t.title}</div>
                      <div className="text-[11px] text-white/50">📍 {t.location} · ⏰ {t.scheduledTime}</div>
                      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
                        <span className="text-white/60">{t.assigneeName}</span>
                        <span className="text-[#cdbbf0] uppercase font-mono text-[10px]">{t.priority}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: In Progress */}
              <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-mono uppercase text-[#cdbbf0] font-semibold">In Progress ({inProgressTasks.length})</span>
                </div>
                <div className="space-y-2.5">
                  {inProgressTasks.map((t) => (
                    <div key={t.id} className="p-3.5 rounded-xl bg-white/5 border border-[#6b4fb8]/40 text-xs space-y-2">
                      <div className="font-semibold text-white">{t.title}</div>
                      <div className="text-[11px] text-white/50">📍 {t.location} · ⏰ {t.scheduledTime}</div>
                      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px]">
                        <span className="text-white/80">{t.assigneeName}</span>
                        <button
                          onClick={() => completeTask(t.id)}
                          className="px-2 py-0.5 rounded bg-[#0e9aa7]/20 text-[#5fe3c0] text-[10px] font-mono cursor-pointer"
                        >
                          Mark Complete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Done & Verified */}
              <div className="glass-panel rounded-2xl p-4 border border-white/10 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-mono uppercase text-[#5fe3c0] font-semibold">Completed ({doneTasks.length})</span>
                </div>
                <div className="space-y-2.5">
                  {doneTasks.map((t) => (
                    <div key={t.id} className="p-3.5 rounded-xl bg-white/5 border border-[#0e9aa7]/40 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{t.title}</span>
                        <CheckCircle2 className="w-4 h-4 text-[#5fe3c0]" />
                      </div>
                      <div className="text-[11px] text-white/50">Verified at {t.completedAt || '4:52 PM'}</div>
                      {t.proofUrl && (
                        <button
                          onClick={() => setLightboxData({
                            isOpen: true,
                            imageUrl: t.proofUrl,
                            title: t.title,
                            actor: t.assigneeName,
                            timestamp: t.completedAt,
                            taskId: t.id
                          })}
                          className="flex items-center gap-1.5 text-[11px] font-mono text-[#5fe3c0] hover:underline cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>View Proof Photo</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REVIEW QUEUE */}
        {activeTab === 'review' && (
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-semibold text-white">Proof Photos Awaiting Lead Verification</h3>
            {reviewQueue.length === 0 ? (
              <p className="text-xs text-white/50 py-8 text-center">All submitted department tasks have been approved.</p>
            ) : (
              <div className="space-y-4">
                {reviewQueue.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-white text-sm">{t.title}</div>
                      <div className="text-xs text-white/60 mt-0.5">Submitted by {t.assigneeName} at {t.completedAt || '4:52 PM'}</div>
                      {t.reviewComment && <div className="text-[11px] text-[#cdbbf0] mt-1 font-mono italic">Note: "{t.reviewComment}"</div>}
                    </div>

                    <div className="flex items-center gap-3">
                      {t.proofUrl && (
                        <button
                          onClick={() => setLightboxData({
                            isOpen: true,
                            imageUrl: t.proofUrl,
                            title: t.title,
                            actor: t.assigneeName,
                            timestamp: t.completedAt,
                            taskId: t.id
                          })}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-[#5fe3c0] flex items-center gap-1.5 cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Inspect Proof</span>
                        </button>
                      )}

                      <button
                        onClick={() => approveTask(t.id)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0e9aa7] hover:opacity-90 flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>

                      <button
                        onClick={() => rejectTask(t.id, 'Please retake with wide buffet angle')}
                        className="px-3 py-1.5 rounded-lg text-xs text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Send Back</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: VOLUNTEER ROSTER */}
        {activeTab === 'roster' && (
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-semibold text-white">Volunteer Load & Active Stationing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Rahul', role: 'Volunteer 1', tasks: 3, status: 'On Shift · Foyer B' },
                { name: 'Ananya', role: 'Volunteer 2', tasks: 2, status: 'On Shift · High Tea' },
                { name: 'Dev', role: 'Volunteer 3', tasks: 2, status: 'On Shift · Stage Truss' },
                { name: 'Simran', role: 'Volunteer 4', tasks: 2, status: 'On Shift · Gate 2' }
              ].map((v) => (
                <div key={v.name} className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <div className="font-semibold text-white text-sm">{v.name}</div>
                  <div className="text-[11px] text-[#0e9aa7] font-mono">{v.role}</div>
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-white/60">
                    <span>{v.tasks} Assigned</span>
                    <span className="text-[#5fe3c0]">{v.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: BROADCAST CHANNEL */}
        {activeTab === 'broadcast' && (
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-semibold text-white">Department Broadcast (Replaces WhatsApp Group)</h3>
            <p className="text-xs text-white/60">Broadcast instant urgent instructions to all active shift volunteers.</p>

            <div className="flex gap-2">
              <input
                type="text"
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                placeholder="Type urgent department directive..."
                className="flex-1 bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#cdbbf0]"
              />
              <button
                onClick={handleSendBroadcast}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#6b4fb8] to-[#cdbbf0] hover:opacity-90 flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast</span>
              </button>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              {sentBroadcasts.map((msg, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 flex items-center justify-between">
                  <span>{msg}</span>
                  <span className="text-[10px] font-mono text-[#5fe3c0] shrink-0">Delivered & Read (4/4)</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CREATE TASK MODAL */}
      {isAddTaskOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="max-w-md w-full rounded-2xl glass-panel p-6 border border-[#6b4fb8]/50 shadow-2xl relative">
            <button onClick={() => setIsAddTaskOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-display font-bold text-white mb-4">Assign Ground Task</h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-white/60 block mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Replenish Barista Espresso Beans"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-white focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/60 block mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1">Assignee</label>
                  <select
                    value={newAssignee}
                    onChange={(e) => setNewAssignee(e.target.value)}
                    className="w-full bg-[#0d0b17] border border-white/15 rounded-xl px-3.5 py-2 text-white focus:outline-none"
                  >
                    <option value="Rahul (Volunteer 1)">Rahul (Volunteer 1)</option>
                    <option value="Ananya (Volunteer 2)">Ananya (Volunteer 2)</option>
                    <option value="Dev (Volunteer 3)">Dev (Volunteer 3)</option>
                    <option value="Simran (Volunteer 4)">Simran (Volunteer 4)</option>
                  </select>
                </div>
              </div>
              <button
                onClick={handleCreate}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-[#6b4fb8] to-[#cdbbf0] hover:opacity-90 shadow-md cursor-pointer mt-2"
              >
                Send to Volunteer App
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ESCALATE ISSUE MODAL */}
      {isRaiseIssueOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="max-w-md w-full rounded-2xl glass-panel p-6 border border-[#8c2b3d]/50 shadow-2xl relative">
            <button onClick={() => setIsRaiseIssueOpen(false)} className="absolute top-4 right-4 text-white/40 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="text-xs font-semibold text-[#ff6b81] mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Escalate Operational Blocker</span>
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-4">Notify Event Head Immediately</h3>
            <textarea
              rows={3}
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              placeholder="e.g. Ice cube supplier truck delayed in traffic, banquet line starting in 25 mins..."
              className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none mb-4"
            />
            <button
              onClick={() => {
                if (issueTitle) {
                  addToast({
                    title: 'Issue Escalated to Event Head',
                    message: `Blocker dispatched to Aditi Rao: "${issueTitle}"`,
                    type: 'alert'
                  });
                  setIsRaiseIssueOpen(false);
                  setIssueTitle('');
                }
              }}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-[#8c2b3d] hover:opacity-90 cursor-pointer"
            >
              Push Critical Alert to Aditi Rao
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
