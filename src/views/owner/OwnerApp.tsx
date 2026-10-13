import React, { useState } from 'react';
import { useSyncoraStore } from '../../store/useSyncoraStore';
import { DashboardHeader } from '../../components/common/DashboardHeader';
import { KpiCard } from '../../components/common/KpiCard';
import { HealthRing } from '../../components/common/HealthRing';
import { StatusChip } from '../../components/common/StatusChip';
import { CommandPalette } from '../../components/common/CommandPalette';
import { EventItem } from '../../types';
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  Users, 
  Briefcase, 
  Sparkles, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowRight, 
  Send, 
  Download, 
  CheckCircle2, 
  X,
  CreditCard,
  Layers,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';
import { EventsCommandRegistry } from './components/EventsCommandRegistry';
import { CalendarCommandRegistry } from './components/CalendarCommandRegistry';
import { VendorsCommandRegistry } from './components/VendorsCommandRegistry';
import { TeamCommandRegistry } from './components/TeamCommandRegistry';

interface OwnerAppProps {
  onBackToLanding: () => void;
}

export const OwnerApp: React.FC<OwnerAppProps> = ({ onBackToLanding }) => {
  const { events, alerts, vendors, team, createEvent, resolveAlert, setCurrentEventId, setRole } = useSyncoraStore();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'events' | 'calendar' | 'finance' | 'vendors' | 'team' | 'insights'>('dashboard');
  const [portfolioView, setPortfolioView] = useState<'table' | 'cards'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEventDetail, setSelectedEventDetail] = useState<EventItem | null>(null);

  // Command palette state
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Create Event Wizard state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [newEventName, setNewEventName] = useState('');
  const [newEventClient, setNewEventClient] = useState('');
  const [newEventBudget, setNewEventBudget] = useState('2000000');
  const [newEventDate, setNewEventDate] = useState('2026-12-18');
  const [newEventHead, setNewEventHead] = useState('Aditi Rao');

  // AI Assistant Chat State
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    {
      sender: 'ai',
      text: "Hello Mr. Singhania. I am monitoring all 12 events. Tata Conclave is at 84% health; Sharma Wedding has experienced a 7% profit margin contraction from transport fees."
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Calculations for KPIs
  const totalBudget = events.reduce((acc, e) => acc + e.budget, 0);
  const totalProjectedProfit = events.reduce((acc, e) => acc + e.projectedProfit, 0);
  const totalActualProfit = events.reduce((acc, e) => acc + (e.actualProfit || e.projectedProfit * 0.95), 0);
  const unresolvedAlerts = alerts.filter((a) => !a.isResolved);

  const filteredEvents = events.filter((e) => {
    const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendAiChat = (customQuery?: string) => {
    const q = customQuery || chatInput;
    if (!q) return;

    setChatMessages((prev) => [...prev, { sender: 'user', text: q }]);
    setChatInput('');

    setTimeout(() => {
      let reply = "Analyzing company databases...";
      if (/unpaid|vendor|bill/i.test(q)) {
        reply = "Overdue Vendor Alert: Artisan Flora has an outstanding advance of ₹1.4L. PQR Production final balance of ₹2.1L is due in 3 days upon delivery inspection.";
      } else if (/profit|margin/i.test(q)) {
        reply = `Company portfolio average profit margin is 24.8%. Total projected company profit is ₹${(totalProjectedProfit / 100000).toFixed(1)}L across all 12 active contracts.`;
      } else if (/vendor|confirm/i.test(q)) {
        reply = "2 vendor contracts are currently unconfirmed: SoundSphere for College Fest (42 days out) and Artisan Flora for Sharma Wedding.";
      } else {
        reply = `Report generated for "${q}": All operations in Tata Corporate and Oberoi Gala are nominal. No unresolved regulatory permits found.`;
      }
      setChatMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  const handleFinishCreateEvent = () => {
    createEvent({
      name: newEventName || 'New Gala Event',
      client: newEventClient || 'Enterprise Client',
      date: newEventDate,
      eventHead: newEventHead,
      budget: Number(newEventBudget) || 1500000,
      projectedProfit: Math.round(Number(newEventBudget) * 0.25),
      health: 85,
      planningCompletion: 15,
      status: 'Upcoming',
      location: 'Grand Hyatt Convention Hall',
      attendeesCount: 500
    });
    setIsCreateOpen(false);
    setWizardStep(1);
    setNewEventName('');
    setNewEventClient('');
  };

  return (
    <div className="min-h-screen bg-black text-white flex select-none">
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />

      {/* Left Navigation Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#07060d]/90 backdrop-blur-2xl flex flex-col justify-between shrink-0 hidden md:flex z-30">
        <div>
          {/* Top Logo */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <img src="/assets/logo.png" alt="SYNCORA" className="h-7 w-auto object-contain" />
          </div>

          <div className="p-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 px-3 block mb-2">
              Command Suite
            </span>
            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Company Dashboard', icon: Building2 },
                { id: 'events', label: 'Events Portfolio', icon: Briefcase },
                { id: 'calendar', label: 'Cross-Event Schedule', icon: Calendar },
                { id: 'finance', label: 'Finance & Ledger', icon: DollarSign },
                { id: 'vendors', label: 'Vendor Registry', icon: Layers },
                { id: 'team', label: 'Staff Allocation', icon: Users },
                { id: 'insights', label: 'AI Intelligence', icon: Sparkles }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as typeof activeTab)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2f7be8]/20 to-[#6b4fb8]/20 text-white border border-[#2f7be8]/40 shadow-sm'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#2f7be8]' : 'text-white/40'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Company Card in Sidebar Footer */}
        <div className="p-4 border-t border-white/10 m-2 rounded-xl bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1d4ed8] to-[#6b4fb8] flex items-center justify-center font-bold text-xs text-white">
              AE
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">Aurora Events Pvt. Ltd.</div>
              <div className="text-[10px] font-mono text-[#5fe3c0]">12 Active Productions</div>
            </div>
          </div>
          <button
            onClick={onBackToLanding}
            className="w-full mt-3 py-1.5 rounded-lg text-[11px] text-white/50 hover:text-white bg-black/40 hover:bg-black/80 transition-colors cursor-pointer"
          >
            ← Exit to Landing
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardHeader
          onOpenCommandPalette={() => setIsCommandOpen(true)}
          title="Company Command Center"
          subtitle="Aurora Events Pvt. Ltd. · 12 Active Productions · ₹2.45 Cr Managed Pipeline"
        />

        <main className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <>
              {/* Top KPI Strip */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                <KpiCard
                  label="Active Events"
                  value={12}
                  icon={Briefcase}
                  accentColor="#2f7be8"
                  trend="+2 new this mo"
                />
                <KpiCard
                  label="Total Budget"
                  value={Math.round(totalBudget / 100000)}
                  suffix="L"
                  prefix="₹"
                  icon={DollarSign}
                  accentColor="#0e9aa7"
                  trend="100% committed"
                />
                <KpiCard
                  label="Projected Profit"
                  value={Math.round(totalProjectedProfit / 100000)}
                  suffix="L"
                  prefix="₹"
                  icon={TrendingUp}
                  accentColor="#5fe3c0"
                  trend="24.8% net margin"
                />
                <KpiCard
                  label="Actual Realized"
                  value={Math.round(totalActualProfit / 100000)}
                  suffix="L"
                  prefix="₹"
                  icon={CreditCard}
                  accentColor="#cdbbf0"
                  trend="Healthy conversion"
                />
                <KpiCard
                  label="Overdue Payments"
                  value={3.5}
                  suffix="L"
                  prefix="₹"
                  icon={AlertTriangle}
                  accentColor="#8c2b3d"
                  trendPositive={false}
                  trend="2 vendor invoices"
                />
                <KpiCard
                  label="Open Alerts"
                  value={unresolvedAlerts.length}
                  icon={AlertTriangle}
                  accentColor="#ff6b81"
                  trendPositive={false}
                  trend="Requires action"
                />
              </div>

              {/* Action Bar + Portfolio Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Active Events Portfolio</h2>
                  <p className="text-xs text-white/50">Real-time health, planning completion, and budget allocations.</p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Filter events..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white/5 border border-white/15 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#2f7be8]"
                    />
                  </div>

                  {/* Table/Cards Toggle */}
                  <div className="p-1 rounded-lg bg-white/5 border border-white/10 flex items-center">
                    <button
                      onClick={() => setPortfolioView('table')}
                      className={`p-1.5 rounded ${portfolioView === 'table' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}
                    >
                      <TableIcon className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setPortfolioView('cards')}
                      className={`p-1.5 rounded ${portfolioView === 'cards' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'}`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Create Event Trigger */}
                  <button
                    onClick={() => setIsCreateOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#2f7be8] to-[#6b4fb8] hover:opacity-95 shadow-md cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Event</span>
                  </button>
                </div>
              </div>

              {/* Events Portfolio: Table View */}
              {portfolioView === 'table' ? (
                <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase font-mono text-[10px] tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Event & Client</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Event Head</th>
                          <th className="py-3 px-4">Health</th>
                          <th className="py-3 px-4">Budget</th>
                          <th className="py-3 px-4">Projected Profit</th>
                          <th className="py-3 px-4">Planning %</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-right">Drilldown</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-sans">
                        {filteredEvents.map((ev) => (
                          <tr
                            key={ev.id}
                            className="hover:bg-white/5 transition-colors cursor-pointer group"
                            onClick={() => setSelectedEventDetail(ev)}
                          >
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-white group-hover:text-[#cdbbf0] transition-colors">{ev.name}</div>
                              <div className="text-[11px] text-white/50">{ev.client}</div>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-white/70 whitespace-nowrap">{ev.date}</td>
                            <td className="py-3.5 px-4">
                              <span className="font-medium text-white/80">{ev.eventHead}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <HealthRing score={ev.health} size={40} showLabel={false} />
                            </td>
                            <td className="py-3.5 px-4 font-mono font-medium text-white">
                              ₹{(ev.budget / 100000).toFixed(1)}L
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[#5fe3c0] font-semibold">
                              ₹{(ev.projectedProfit / 100000).toFixed(1)}L
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="w-24">
                                <div className="flex justify-between text-[10px] font-mono text-white/60 mb-1">
                                  <span>{ev.planningCompletion}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] rounded-full"
                                    style={{ width: `${ev.planningCompletion}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <StatusChip status={ev.status} />
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentEventId(ev.id);
                                  setRole('event-head');
                                }}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-[#2f7be8] text-white/70 hover:text-white transition-colors cursor-pointer"
                                title="Open as Event Head"
                              >
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                /* Events Portfolio: Card Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedEventDetail(ev)}
                      className="glass-panel-interactive rounded-2xl p-5 border border-white/10 cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <StatusChip status={ev.status} />
                          <span className="text-xs font-mono text-white/50">{ev.date}</span>
                        </div>
                        <h3 className="text-base font-semibold text-white group-hover:text-[#cdbbf0] transition-colors mb-1">
                          {ev.name}
                        </h3>
                        <p className="text-xs text-white/50 mb-4">{ev.client}</p>

                        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs mb-4">
                          <div>
                            <span className="text-white/40 block text-[10px]">Budget</span>
                            <span className="font-mono font-bold text-white">₹{(ev.budget / 100000).toFixed(1)}L</span>
                          </div>
                          <div>
                            <span className="text-white/40 block text-[10px]">Projected Profit</span>
                            <span className="font-mono font-bold text-[#5fe3c0]">₹{(ev.projectedProfit / 100000).toFixed(1)}L</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                        <HealthRing score={ev.health} size={36} showLabel={false} />
                        <span className="text-[11px] text-white/60">Lead: <strong>{ev.eventHead}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Lower Section: Alerts & Risks + Workload Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
                {/* Critical Risks Feed */}
                <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[#ff6b81]" />
                      <h3 className="text-sm font-semibold text-white">Live Alerts & Risk Engine</h3>
                    </div>
                    <span className="text-xs font-mono text-[#ff6b81]">{unresolvedAlerts.length} Active Flags</span>
                  </div>

                  <div className="space-y-3">
                    {unresolvedAlerts.map((alt) => (
                      <div
                        key={alt.id}
                        className="p-4 rounded-xl bg-white/5 border border-[#8c2b3d]/30 hover:border-[#8c2b3d]/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 text-xs font-semibold text-white">
                            <span className="text-[#ff6b81]">[{alt.eventName}]</span>
                            <span>{alt.title}</span>
                          </div>
                          <p className="text-xs text-white/60 mt-1">{alt.description}</p>
                          <div className="mt-2 text-[11px] text-[#5fe3c0] font-mono">
                            Action: {alt.suggestedAction}
                          </div>
                        </div>

                        <button
                          onClick={() => resolveAlert(alt.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-[#8c2b3d]/40 hover:bg-[#8c2b3d] border border-[#8c2b3d]/60 transition-colors shrink-0 cursor-pointer self-start sm:self-center"
                        >
                          Resolve Risk
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Event Head Workload Distribution */}
                <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-4">Event Head Capacity & Overlap</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Aditi Rao', count: 3, capacity: 4, status: 'Optimal' },
                      { name: 'Rohan Verma', count: 3, capacity: 3, status: 'At Capacity' },
                      { name: 'Karan Mehra', count: 2, capacity: 3, status: 'Available' },
                      { name: 'Pooja Iyer', count: 2, capacity: 3, status: 'Available' },
                      { name: 'Vikram Joshi', count: 2, capacity: 3, status: 'Available' }
                    ].map((lead) => (
                      <div key={lead.name} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-semibold text-white">{lead.name}</span>
                          <span className="font-mono text-white/50">{lead.count} / {lead.capacity} Productions</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${lead.count >= lead.capacity ? 'bg-[#cdbbf0]' : 'bg-[#0e9aa7]'}`}
                            style={{ width: `${(lead.count / lead.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB: FINANCE & LEDGER */}
          {activeTab === 'finance' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Financial Ledger & Profit Realization</h2>
                  <p className="text-xs text-white/50">Cross-event vendor cash outflows, margins, and invoice reconciliation.</p>
                </div>
                <button
                  onClick={() => alert("Downloading certified audited ledger CSV...")}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Financial Report</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl glass-panel border border-[#0e9aa7]/30">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#0e9aa7] font-semibold">Total Gross Inbound</span>
                  <div className="text-2xl font-mono font-bold text-white mt-1">₹{(totalBudget / 100000).toFixed(1)}L</div>
                  <span className="text-xs text-white/50 mt-1 block">Contracted client fee total</span>
                </div>
                <div className="p-5 rounded-2xl glass-panel border border-[#5fe3c0]/30">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#5fe3c0] font-semibold">Retained Net Profit</span>
                  <div className="text-2xl font-mono font-bold text-[#5fe3c0] mt-1">₹{(totalProjectedProfit / 100000).toFixed(1)}L</div>
                  <span className="text-xs text-white/50 mt-1 block">24.8% average company margin</span>
                </div>
                <div className="p-5 rounded-2xl glass-panel border border-[#8c2b3d]/30">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#ff6b81] font-semibold">Pending Vendor Invoices</span>
                  <div className="text-2xl font-mono font-bold text-[#ff6b81] mt-1">₹3.5L</div>
                  <span className="text-xs text-white/50 mt-1 block">Due upon post-event clearance</span>
                </div>
              </div>

              <div className="glass-panel rounded-2xl border border-white/10 p-6">
                <h3 className="text-base font-semibold text-white mb-4">Vendor Payment Schedule</h3>
                <div className="divide-y divide-white/10 text-xs">
                  {vendors.map((v) => (
                    <div key={v.id} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{v.name}</div>
                        <div className="text-[11px] text-white/50">{v.category} · Contact: {v.contactPerson}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-white font-semibold">₹{(v.quoteAmount / 100000).toFixed(2)}L</div>
                        <span className="text-[10px] font-mono text-[#5fe3c0]">{v.stage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: INSIGHTS (AI) */}
          {activeTab === 'insights' && (
            <div className="space-y-6">
              <div className="p-8 rounded-2xl glass-panel border border-[#0e9aa7]/40 bg-gradient-to-r from-[#0d0b17] via-[#050b2e] to-[#07060d]">
                <span className="text-xs font-mono uppercase text-[#0e9aa7] tracking-wider font-semibold">
                  Autonomous Margin Optimization
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  You can potentially increase projected profit by ₹1.8L.
                </h3>
                <p className="text-xs text-white/70 max-w-2xl mt-2 leading-relaxed">
                  Based on company historical data across 45 past productions, Syncora identified 3 actionable vendor optimizations:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs">
                    <span className="font-semibold text-white block mb-1">AV Trussing Renegotiation</span>
                    <p className="text-white/60">PQR Production bundled rate can be reduced by 8% to match past Oberoi Gala benchmark (+₹42,000).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs">
                    <span className="font-semibold text-white block mb-1">Seating Freight Optimization</span>
                    <p className="text-white/60">Consolidating Chiavari chair haul with local supplier eliminates 2 express transport surcharges (+₹55,000).</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-xs">
                    <span className="font-semibold text-white block mb-1">Staffing Redundancy</span>
                    <p className="text-white/60">Reallocating 3 unassigned backstage runners to the F&B line reduces external agency hiring (+₹83,000).</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-2xl border border-white/10 p-6">
                <h3 className="text-base font-semibold text-white mb-4">Vendor Reliability Index</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vendors.map((v) => (
                    <div key={v.id} className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">{v.name}</span>
                        <span className="font-mono text-[#5fe3c0]">{v.reliabilityScore}%</span>
                      </div>
                      <p className="text-white/50 text-[11px] mb-3">{v.reliabilityNote}</p>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${v.reliabilityScore > 90 ? 'bg-[#0e9aa7]' : 'bg-[#cdbbf0]'}`}
                          style={{ width: `${v.reliabilityScore}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: EVENTS PORTFOLIO */}
          {activeTab === 'events' && <EventsCommandRegistry />}

          {/* TAB: CROSS-EVENT SCHEDULE */}
          {activeTab === 'calendar' && <CalendarCommandRegistry />}

          {/* TAB: VENDORS REGISTRY */}
          {activeTab === 'vendors' && <VendorsCommandRegistry />}

          {/* TAB: TEAM & DIRECTORS */}
          {activeTab === 'team' && <TeamCommandRegistry />}
        </main>
      </div>

      {/* FLOATING AI ASSISTANT CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isAiChatOpen ? (
          <button
            onClick={() => setIsAiChatOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#2f7be8] to-[#6b4fb8] text-white font-medium text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#d7f3e6]" />
            <span>Ask Syncora AI</span>
          </button>
        ) : (
          <div className="w-96 rounded-2xl glass-panel border border-[#cdbbf0]/40 shadow-2xl overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom-5">
            {/* Chat Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2f7be8]" />
                <span className="text-xs font-semibold text-white">Syncora Executive Copilot</span>
              </div>
              <button onClick={() => setIsAiChatOpen(false)} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl max-w-[85%] ${
                    msg.sender === 'user'
                      ? 'ml-auto bg-gradient-to-r from-[#2f7be8] to-[#6b4fb8] text-white'
                      : 'mr-auto bg-white/5 border border-white/10 text-white/80'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Suggested Quick Prompts */}
            <div className="px-3 py-2 border-t border-white/10 bg-black/40 flex gap-1.5 overflow-x-auto text-[10px]">
              <button
                onClick={() => handleSendAiChat("Which vendors haven't confirmed?")}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white whitespace-nowrap cursor-pointer"
              >
                Unconfirmed vendors?
              </button>
              <button
                onClick={() => handleSendAiChat("Show unpaid vendor bills")}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white whitespace-nowrap cursor-pointer"
              >
                Unpaid bills?
              </button>
              <button
                onClick={() => handleSendAiChat("What is our projected profit?")}
                className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white whitespace-nowrap cursor-pointer"
              >
                Projected profit?
              </button>
            </div>

            {/* Chat Input */}
            <div className="p-3 bg-white/5 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about margins, vendors, or timelines..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAiChat()}
                className="flex-1 bg-transparent text-xs text-white placeholder-white/40 focus:outline-none"
              />
              <button
                onClick={() => handleSendAiChat()}
                className="p-1.5 rounded-lg bg-[#2f7be8] text-white hover:opacity-90 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CREATE EVENT 3-STEP WIZARD MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="max-w-lg w-full rounded-2xl glass-panel p-6 border border-[#2f7be8]/40 shadow-2xl relative">
            <button
              onClick={() => setIsCreateOpen(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#2f7be8] font-semibold">
                Step {wizardStep} of 3 · Automated Timeline Engine
              </span>
              <h3 className="text-xl font-display font-bold text-white mt-1">
                {wizardStep === 1 ? 'Production Fundamentals' : wizardStep === 2 ? 'Appoint Leadership' : 'Verify & Launch Pipeline'}
              </h3>
            </div>

            {wizardStep === 1 && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-white/60 block mb-1 font-mono uppercase text-[10px]">Event Name</label>
                  <input
                    type="text"
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                    placeholder="e.g. Zenith Global Conclave"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#2f7be8]"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1 font-mono uppercase text-[10px]">Client Organization</label>
                  <input
                    type="text"
                    value={newEventClient}
                    onChange={(e) => setNewEventClient(e.target.value)}
                    placeholder="e.g. Tata Sons / Reliance Industries"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#2f7be8]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/60 block mb-1 font-mono uppercase text-[10px]">Production Budget (₹)</label>
                    <input
                      type="number"
                      value={newEventBudget}
                      onChange={(e) => setNewEventBudget(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#2f7be8]"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 block mb-1 font-mono uppercase text-[10px]">Target Event Date</label>
                    <input
                      type="date"
                      value={newEventDate}
                      onChange={(e) => setNewEventDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#2f7be8]"
                    />
                  </div>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-white/60 block mb-1 font-mono uppercase text-[10px]">Assign Principal Event Head</label>
                  <select
                    value={newEventHead}
                    onChange={(e) => setNewEventHead(e.target.value)}
                    className="w-full bg-[#0d0b17] border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#2f7be8]"
                  >
                    <option value="Aditi Rao">Aditi Rao (Principal Event Head · 3 Active)</option>
                    <option value="Rohan Verma">Rohan Verma (Luxury Weddings · 3 Active)</option>
                    <option value="Karan Mehra">Karan Mehra (Festivals & Arenas · 2 Active)</option>
                    <option value="Pooja Iyer">Pooja Iyer (Corporate & Galas · 2 Active)</option>
                  </select>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white/70 leading-relaxed">
                  Assigning {newEventHead} will automatically provision role permissions, link the 5-phase execution timeline, and generate initial RFP templates.
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-[#0e9aa7]/10 border border-[#0e9aa7]/30 text-white space-y-2">
                  <div className="font-semibold text-sm">{newEventName || 'New Production'}</div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-white/70">
                    <div>Client: {newEventClient || 'Enterprise Client'}</div>
                    <div>Event Head: {newEventHead}</div>
                    <div>Budget: ₹{(Number(newEventBudget) / 100000).toFixed(1)}L</div>
                    <div>Date: {newEventDate}</div>
                  </div>
                </div>
                <div className="text-[11px] text-[#5fe3c0] font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Auto-generating 120/90/60/30/7-day timeline milestones upon submission.</span>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
              {wizardStep > 1 ? (
                <button
                  onClick={() => setWizardStep(wizardStep - 1)}
                  className="px-4 py-2 rounded-lg text-xs text-white/60 hover:text-white"
                >
                  Previous
                </button>
              ) : <div />}

              {wizardStep < 3 ? (
                <button
                  onClick={() => setWizardStep(wizardStep + 1)}
                  className="px-5 py-2 rounded-lg text-xs font-semibold text-white bg-[#2f7be8] hover:opacity-90"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleFinishCreateEvent}
                  className="px-6 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] hover:opacity-95 shadow-lg cursor-pointer"
                >
                  Confirm & Launch Event
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EVENT DRILLDOWN MODAL */}
      {selectedEventDetail && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="max-w-2xl w-full rounded-2xl glass-panel p-6 border border-white/20 shadow-2xl relative">
            <button
              onClick={() => setSelectedEventDetail(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <StatusChip status={selectedEventDetail.status} />
              <span className="text-xs font-mono text-white/50">{selectedEventDetail.date}</span>
            </div>

            <h3 className="text-2xl font-display font-bold text-white">{selectedEventDetail.name}</h3>
            <p className="text-xs text-white/60 mb-6">{selectedEventDetail.client} · Location: {selectedEventDetail.location}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-xs mb-6">
              <div>
                <span className="text-white/40 block text-[10px]">Health Score</span>
                <span className="font-mono font-bold text-[#5fe3c0] text-base">{selectedEventDetail.health}%</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px]">Planning Completion</span>
                <span className="font-mono font-bold text-white text-base">{selectedEventDetail.planningCompletion}%</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px]">Budget</span>
                <span className="font-mono font-bold text-white text-base">₹{(selectedEventDetail.budget / 100000).toFixed(1)}L</span>
              </div>
              <div>
                <span className="text-white/40 block text-[10px]">Projected Profit</span>
                <span className="font-mono font-bold text-[#5fe3c0] text-base">₹{(selectedEventDetail.projectedProfit / 100000).toFixed(1)}L</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-white/50">Lead: <strong>{selectedEventDetail.eventHead}</strong></span>
              <button
                onClick={() => {
                  setCurrentEventId(selectedEventDetail.id);
                  setRole('event-head');
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] hover:opacity-90 shadow-md cursor-pointer"
              >
                <span>Jump to Event Head View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
