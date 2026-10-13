import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/common/Navbar';
import { IridescentRing3D } from '../components/common/IridescentRing3D';
import { AuroraBackground } from '../components/common/AuroraBackground';
import { Role } from '../types';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare, 
  TrendingUp, 
  ShieldCheck, 
  UserCheck, 
  Users, 
  Smartphone, 
  Repeat, 
  FileSpreadsheet, 
  Send,
  Zap,
  Network
} from 'lucide-react';

interface LandingPageProps {
  onSelectRole: (role: Role) => void;
  onOpenRoleChooser: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole, onOpenRoleChooser }) => {
  // WhatsApp interactive converter state
  const [waConverted, setWaConverted] = useState(false);
  const [waInput, setWaInput] = useState('Buffet setup done 👍');
  const [activeLifecycleTab, setActiveLifecycleTab] = useState(0);

  // Profit Optimizer count-up
  const [profitCounter, setProfitCounter] = useState(0);
  useEffect(() => {
    let current = 0;
    const target = 180000;
    const interval = setInterval(() => {
      current += 6000;
      if (current >= target) {
        setProfitCounter(target);
        clearInterval(interval);
      } else {
        setProfitCounter(current);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const lifecycleStages = [
    {
      stage: 'PLAN',
      title: 'Precision Architecture',
      subtitle: 'From RFP to signed baseline in minutes',
      items: ['Venue selection & 3D layout', 'Vendor quotation bidding & scoring', 'Dynamic budget with margin lock', 'Meeting hub with AI action item extraction', 'Automated 120-to-7 day timeline phases']
    },
    {
      stage: 'PREPARE',
      title: 'Resource Orchestration',
      subtitle: 'Zero overlapping shifts, zero lost inventory',
      items: ['Department lead & volunteer roster', 'Live delivery tracking schedule', 'Overbooked personnel conflict alerts', 'Digital contracts & permit repository', 'Pre-event readiness audit rings']
    },
    {
      stage: 'EXECUTE',
      title: 'Live Mission Control',
      subtitle: 'Replace chaotic WhatsApp chats with truth',
      items: ['Full-screen live stage & floor timeline', 'One-tap mobile task completion with proof', 'Real-time arrival verification of equipment', 'Live risk pulses & escalation channels', 'Broadcast alerts with instant read receipts']
    },
    {
      stage: 'CLOSE',
      title: 'Financial Settlement',
      subtitle: 'Clean sign-off with verified vendor ledgers',
      items: ['Vendor invoice vs quote reconciliation', 'Instant profit margin audit', 'Returnable inventory audit & damage claims', 'Client feedback & NPS collection', 'Automated tax & TDS compliance packet']
    },
    {
      stage: 'LEARN',
      title: 'Institutional Intelligence',
      subtitle: 'Every event makes the next event 10x smoother',
      items: ['Vendor reliability scorecards (on-time %)', 'Historical price benchmarking algorithms', 'Staff efficiency & task velocity analytics', 'Margin leak detection across departments', 'Predictive staffing recommendations']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Background Aurora Art Layer */}
      <AuroraBackground />

      {/* Top Navbar */}
      <Navbar onEnterApp={onOpenRoleChooser} onOpenRoleChooser={onOpenRoleChooser} />

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[92vh] flex flex-col justify-center px-6 lg:px-16 pt-8 pb-16 z-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headings & Value Prop */}
          <div className="lg:col-span-7 flex flex-col items-start pt-2">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-normal text-white tracking-[-0.02em] leading-[1.05] mb-6 text-balance">
              One source of truth for every <span className="italic text-[#cdbbf0] font-normal">event</span>.
            </h1>

            <p className="text-base sm:text-lg text-white/70 font-sans max-w-xl mb-9 leading-relaxed">
              Replaces scattered WhatsApp groups, tangled Excel sheets, and lost invoices with a synchronized, real-time command platform for event companies.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenRoleChooser}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#0e9aa7] via-[#2f7be8] to-[#6b4fb8] hover:opacity-95 shadow-[0_0_30px_rgba(47,123,232,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Enter Syncora</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#problem"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-white/80 hover:text-white glass-panel-interactive border border-white/15 cursor-pointer"
              >
                <span>Watch the Flow</span>
              </a>
            </div>

            {/* Micro stats strip */}
            <div className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/10 w-full max-w-lg">
              <div>
                <div className="text-2xl font-mono font-bold text-white tabular-nums">100%</div>
                <div className="text-[11px] text-white/50 uppercase tracking-wider font-sans mt-0.5">Live Audit Trail</div>
              </div>
              <div>
                <div className="text-2xl font-mono font-bold text-[#5fe3c0] tabular-nums">+22%</div>
                <div className="text-[11px] text-white/50 uppercase tracking-wider font-sans mt-0.5">Profit Retention</div>
              </div>
              <div>
                <div className="text-2xl font-mono font-bold text-[#cdbbf0] tabular-nums">0</div>
                <div className="text-[11px] text-white/50 uppercase tracking-wider font-sans mt-0.5">WhatsApp Clutter</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Iridescent Floating Ring */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="relative">
              <IridescentRing3D size={440} />
              
              {/* Floating live highlight pill */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full glass-panel border border-[#cdbbf0]/30 shadow-2xl flex items-center gap-2.5 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#5fe3c0] animate-ping" />
                <span className="text-xs font-mono text-white/90">
                  Aditi Rao: <strong>Buffet Setup Verified</strong> (Taj Lands End)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[10px] uppercase font-mono tracking-widest text-white/50">Scroll to Explore</span>
          <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#cdbbf0] animate-bounce" />
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section id="problem" className="relative py-28 px-6 lg:px-16 z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-[#ff6b81] mb-3 block">
            The Industry Reality
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-5">
            Event days are chaos without a single source of truth.
          </h2>
          <p className="text-base text-white/65 max-w-2xl mx-auto">
            18 different WhatsApp groups. 12 versions of the logistics spreadsheet. Unanswered phone calls while guests are walking into the ballroom.
          </p>
        </div>

        {/* Scattered Chaos vs Syncora Convergence */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Chaos Side */}
          <div className="p-8 rounded-2xl border border-[#8c2b3d]/40 bg-[#0d0b17]/80 backdrop-blur-xl relative overflow-hidden group">
            <div className="text-xs uppercase font-mono tracking-wider text-[#ff6b81] mb-4 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Before Syncora (Dispersed Chaos)</span>
            </div>

            <div className="space-y-3 relative">
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white/80 flex items-start gap-3 transform -rotate-1 shadow-lg">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-emerald-400 font-bold block">WhatsApp "Decor Ops Group 4":</span>
                  "Stage backdrop floral arch still not loaded in truck! Caterer asking for 3 extra tables. Who has the vendor number?!"
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white/80 flex items-start gap-3 transform rotate-1 shadow-lg">
                <FileSpreadsheet className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/60 font-mono block">Logistics_Final_V4_APPROVED_ACTUAL.xlsx</span>
                  "Overwritten 3 hours ago by intern. 500 Chiavari chairs missing from gate receipt."
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-white/80 flex items-start gap-3 transform -rotate-0.5 shadow-lg">
                <AlertTriangle className="w-4 h-4 text-[#ff6b81] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#ff6b81] font-bold block">Vendor Payment Dispute:</span>
                  "AV vendor refusing to turn on main LED screen until ₹2.5L bank transfer screenshot is sent."
                </div>
              </div>
            </div>
          </div>

          {/* Syncora Resolved Side */}
          <div className="p-8 rounded-2xl border border-[#0e9aa7]/50 bg-gradient-to-br from-[#0d0b17] to-[#07060d] backdrop-blur-xl relative shadow-[0_0_40px_rgba(14,154,167,0.18)]">
            <div className="text-xs uppercase font-mono tracking-wider text-[#5fe3c0] mb-4 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>With Syncora (Unified Truth)</span>
            </div>

            <div className="p-4 rounded-xl bg-black/70 border border-[#0e9aa7]/30 text-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-semibold text-white">Tata Corporate Conclave — Live Status</span>
                <span className="px-2 py-0.5 rounded-full bg-[#0e9aa7]/20 text-[#5fe3c0] font-mono text-[10px]">
                  HEALTH 84%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="text-white/50 block">Chairs Delivered</span>
                  <span className="font-mono text-[#5fe3c0] font-bold">500 / 500 Verified</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/10">
                  <span className="text-white/50 block">LED AV Rigging</span>
                  <span className="font-mono text-[#5fe3c0] font-bold">Passed Frequency Test</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#0e9aa7]/10 border border-[#0e9aa7]/30 text-[11px] text-[#d7f3e6]">
                Single shared live state across Company Owner, Event Head, Department Leads, and Field Volunteers.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 5-PHASE LIFECYCLE */}
      <section id="lifecycle" className="relative py-28 px-6 lg:px-16 z-10 border-t border-white/10 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-[#cdbbf0] mb-3 block">
              End-To-End Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
              The 5 Phases of Event Mastery
            </h2>
            <p className="text-base text-white/65 max-w-xl mx-auto">
              Click through the lifecycle phases to see how Syncora automates every milestone from planning to post-event profit settlement.
            </p>
          </div>

          {/* Interactive Phase Tabs */}
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
            {lifecycleStages.map((stg, idx) => (
              <button
                key={stg.stage}
                onClick={() => setActiveLifecycleTab(idx)}
                className={`px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeLifecycleTab === idx
                    ? 'bg-gradient-to-r from-[#2f7be8] to-[#6b4fb8] text-white shadow-[0_0_20px_rgba(47,123,232,0.5)] border border-white/20'
                    : 'bg-white/5 text-white/60 hover:text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                <span>{`0${idx + 1}. ${stg.stage}`}</span>
              </button>
            ))}
          </div>

          {/* Active Phase Card */}
          <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-8 sm:p-10 border border-[#cdbbf0]/25 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-[#0e9aa7] tracking-wider font-semibold">
                  Phase {activeLifecycleTab + 1} of 5
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  {lifecycleStages[activeLifecycleTab].title}
                </h3>
              </div>
              <span className="text-xs text-white/50 italic font-serif">
                {lifecycleStages[activeLifecycleTab].subtitle}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lifecycleStages[activeLifecycleTab].items.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#cdbbf0]/30 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#5fe3c0] shrink-0 mt-0.5" />
                  <span className="text-xs text-white/80 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FOUR PERSPECTIVES */}
      <section id="perspectives" className="relative py-28 px-6 lg:px-16 z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-[#0e9aa7] mb-3 block">
            Role-Based Control
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
            Four Perspectives. One Live State.
          </h2>
          <p className="text-base text-white/65 max-w-xl mx-auto">
            Choose any perspective below to enter its specialized workspace. Actions taken by any role immediately reflect in the others.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Owner */}
          <div
            onClick={() => onSelectRole('owner')}
            className="glass-panel-interactive rounded-2xl p-6 border border-white/10 hover:border-[#2f7be8]/50 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2f7be8]/15 border border-[#2f7be8]/30 flex items-center justify-center text-[#2f7be8] mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">Company Owner</h3>
              <p className="text-xs text-white/50 italic mb-4 font-serif">"How is my entire company doing across all 12 events?"</p>
              <ul className="text-xs text-white/70 space-y-2 mb-6">
                <li>· Cross-event portfolio health</li>
                <li>· Profit margins & cash flow</li>
                <li>· Overdue vendor payment flags</li>
                <li>· Staff load & double-booking</li>
              </ul>
            </div>
            <button className="w-full py-2.5 rounded-lg text-xs font-semibold text-white bg-white/10 group-hover:bg-[#2f7be8] transition-colors flex items-center justify-center gap-2">
              <span>Open Owner Deck</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Event Head */}
          <div
            onClick={() => onSelectRole('event-head')}
            className="glass-panel-interactive rounded-2xl p-6 border border-white/10 hover:border-[#0e9aa7]/50 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0e9aa7]/15 border border-[#0e9aa7]/30 flex items-center justify-center text-[#0e9aa7] mb-5 group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">Event Head</h3>
              <p className="text-xs text-white/50 italic mb-4 font-serif">"Is this specific event on schedule and within budget?"</p>
              <ul className="text-xs text-white/70 space-y-2 mb-6">
                <li>· Drag-and-drop vendor Kanban</li>
                <li>· Real-time delivery countdown</li>
                <li>· Meeting notes to AI task flow</li>
                <li>· Full-screen live mission control</li>
              </ul>
            </div>
            <button className="w-full py-2.5 rounded-lg text-xs font-semibold text-white bg-white/10 group-hover:bg-[#0e9aa7] transition-colors flex items-center justify-center gap-2">
              <span>Open Event Head</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Team Lead */}
          <div
            onClick={() => onSelectRole('team-lead')}
            className="glass-panel-interactive rounded-2xl p-6 border border-white/10 hover:border-[#6b4fb8]/50 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#6b4fb8]/15 border border-[#6b4fb8]/30 flex items-center justify-center text-[#cdbbf0] mb-5 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">Team Lead</h3>
              <p className="text-xs text-white/50 italic mb-4 font-serif">"Where are my volunteers and what tasks need review?"</p>
              <ul className="text-xs text-white/70 space-y-2 mb-6">
                <li>· Department progress rings</li>
                <li>· Volunteer assignment board</li>
                <li>· Proof photo review queue</li>
                <li>· Instant issue escalation</li>
              </ul>
            </div>
            <button className="w-full py-2.5 rounded-lg text-xs font-semibold text-white bg-white/10 group-hover:bg-[#6b4fb8] transition-colors flex items-center justify-center gap-2">
              <span>Open Team Lead</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Volunteer */}
          <div
            onClick={() => onSelectRole('volunteer')}
            className="glass-panel-interactive rounded-2xl p-6 border border-white/10 hover:border-[#5fe3c0]/50 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0e9aa7]/15 border border-[#5fe3c0]/30 flex items-center justify-center text-[#5fe3c0] mb-5 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white mb-2">Volunteer</h3>
              <p className="text-xs text-white/50 italic mb-4 font-serif">"What is my next assigned task and where do I go?"</p>
              <ul className="text-xs text-white/70 space-y-2 mb-6">
                <li>· Mobile-first simplified cards</li>
                <li>· Big tap to start & mark done</li>
                <li>· Photo proof camera upload</li>
                <li>· Geo-check-in & lead emergency call</li>
              </ul>
            </div>
            <button className="w-full py-2.5 rounded-lg text-xs font-semibold text-white bg-white/10 group-hover:bg-[#0e9aa7] transition-colors flex items-center justify-center gap-2">
              <span>Open Volunteer App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHATSAPP TO STRUCTURED INTERACTIVE DEMO */}
      <section id="whatsapp-demo" className="relative py-28 px-6 lg:px-16 z-10 border-t border-white/10 bg-black/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-[#cdbbf0] mb-3 block">
              Core Differentiator
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
              Turn WhatsApp Noise into Structured Truth
            </h2>
            <p className="text-base text-white/65 max-w-xl mx-auto">
              Watch an informal team message transform into an auditable, timestamped ledger entry in one click.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-8 border border-[#cdbbf0]/30 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* WhatsApp Input Side */}
              <div className="p-5 rounded-xl bg-black/80 border border-white/15">
                <div className="text-xs font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Incoming Field WhatsApp Message</span>
                </div>
                <div className="p-3.5 rounded-lg bg-[#0e3b2e]/30 border border-emerald-500/30 text-xs text-white mb-4">
                  <span className="text-emerald-300 font-bold block mb-1">Rahul Sharma (4:52 PM):</span>
                  "{waInput}"
                  <div className="mt-2 text-[10px] text-white/50 italic flex items-center gap-1">
                    <span>📷 photo_buffet_taj_452pm.jpg attached</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={waInput}
                    onChange={(e) => setWaInput(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#cdbbf0]"
                    placeholder="Type a test message..."
                  />
                  <button
                    onClick={() => setWaConverted(true)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Transform</span>
                    <Zap className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Structured Card Side */}
              <div className="p-5 rounded-xl bg-black/80 border border-white/15">
                <div className="text-xs font-semibold text-[#5fe3c0] mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Syncora Structured Task Record</span>
                  </span>
                  {waConverted && (
                    <button
                      onClick={() => setWaConverted(false)}
                      className="text-[10px] text-white/50 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <Repeat className="w-3 h-3" />
                      <span>Replay</span>
                    </button>
                  )}
                </div>

                {waConverted ? (
                  <div className="p-4 rounded-xl bg-[#0d0b17] border border-[#0e9aa7]/50 text-xs space-y-2.5 animate-in zoom-in-95 duration-300 shadow-[0_0_30px_rgba(14,154,167,0.25)]">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#0e9aa7] pb-1 border-b border-white/10">
                      <span>DEPARTMENT: F&B OPERATIONS</span>
                      <span className="text-[#5fe3c0] font-bold">STATUS: COMPLETED</span>
                    </div>
                    <div className="font-semibold text-white text-sm">Buffet Setup & Food Line Verified</div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-white/60">
                      <div>Assignee: <strong className="text-white">Rahul (Volunteer 1)</strong></div>
                      <div>Timestamp: <strong className="text-white">4:52 PM</strong></div>
                      <div>Venue Zone: <strong className="text-white">Grand Ballroom Foyer</strong></div>
                      <div>Proof: <strong className="text-[#5fe3c0]">Signed Image Validated</strong></div>
                    </div>
                    <div className="pt-2 text-[10px] text-white/40 border-t border-white/10">
                      Auto-synced to Event Head Aditi Rao & Company Owner Health Score.
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-xl border border-dashed border-white/20 text-center text-xs text-white/40">
                    Click "Transform" to see instant natural-language structuring into department workflow.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: AI RISK & PROFIT OPTIMIZER */}
      <section id="ai-intelligence" className="relative py-28 px-6 lg:px-16 z-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-[#5fe3c0] mb-3 block">
              Predictive AI Intelligence
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4">
              Catch Risks Before Guests Notice.
            </h2>
            <p className="text-base text-white/65 max-w-xl mx-auto">
              Syncora analyzes historical vendor performance, contract trends, and delivery track records to forecast issues days in advance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Risk Card 1 */}
            <div className="glass-panel rounded-2xl p-6 border border-[#8c2b3d]/40">
              <div className="flex items-center justify-between text-[#ff6b81] text-xs font-mono mb-3">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>VENDOR BENCHMARK FLAG</span>
                </span>
                <span>SEVERITY: HIGH</span>
              </div>
              <h4 className="text-base font-semibold text-white mb-2">
                "Your AV quotation is 18% higher than usual."
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Benchmark analysis across your last 6 corporate events shows standard 4K LED and audio trussing was closed at ₹4.4L vs current ₹5.2L quote.
              </p>
            </div>

            {/* Risk Card 2 */}
            <div className="glass-panel rounded-2xl p-6 border border-[#8c2b3d]/40">
              <div className="flex items-center justify-between text-[#ff6b81] text-xs font-mono mb-3">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>ON-TIME RELIABILITY ALERT</span>
                </span>
                <span>SEVERITY: CRITICAL</span>
              </div>
              <h4 className="text-base font-semibold text-white mb-2">
                "Vendor was late in 3 of your last 5 events."
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Artisan Flora has an average delivery lag of 45 minutes on event mornings. AI suggests pulling delivery cutoff forward to 3:00 PM.
              </p>
            </div>

            {/* Risk Card 3 */}
            <div className="glass-panel rounded-2xl p-6 border border-[#cdbbf0]/40">
              <div className="flex items-center justify-between text-[#cdbbf0] text-xs font-mono mb-3">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>PROFIT CONTRACTION FLAG</span>
                </span>
                <span>SEVERITY: AT RISK</span>
              </div>
              <h4 className="text-base font-semibold text-white mb-2">
                "Projected profit fell from 30% to 23%."
              </h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Sharma Wedding logistics surcharges have eroded ₹1.2L in margin. AI recommends renegotiating room blocking commission to recover 4%.
              </p>
            </div>
          </div>

          {/* Profit Optimizer Highlight Card */}
          <div className="glass-panel rounded-2xl p-8 border border-[#0e9aa7]/40 bg-gradient-to-r from-[#0d0b17] via-[#050b2e] to-[#07060d] flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase text-[#0e9aa7] tracking-wider font-semibold">
                Syncora Autonomous Profit Optimizer
              </span>
              <h3 className="text-2xl font-display font-bold text-white mt-1">
                Unlock Unclaimed Event Margin
              </h3>
              <p className="text-xs text-white/65 mt-2 max-w-xl">
                By renegotiating floral allocations, adjusting AV bundle specs, and eliminating duplicate logistics staffing, this event can realize:
              </p>
            </div>

            <div className="text-right shrink-0 p-4 rounded-xl bg-black/60 border border-[#0e9aa7]/30">
              <div className="text-3xl font-mono font-bold text-[#5fe3c0] tabular-nums">
                +₹{(profitCounter / 100000).toFixed(1)}L
              </div>
              <div className="text-[11px] text-white/50 uppercase tracking-wider font-sans mt-1">
                Potential Net Profit Increase
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LONG TERM CONNECTED NETWORK GRAPH */}
      <section className="relative py-24 px-6 lg:px-16 z-10 border-t border-white/10 bg-black/50">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-[#2f7be8] mb-3 block">
            The Industry Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            The Connected Event Network
          </h2>
          <p className="text-sm text-white/60 max-w-xl mx-auto mb-10">
            A unified graph connecting Event Companies, Clients, Vendors, Venues, Artists, and Freelancers into one transparent registry.
          </p>

          <div className="relative py-12 flex items-center justify-center">
            {/* Connected Nodes Visual */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl w-full">
              {[
                { label: 'Event Companies', desc: 'Aurora Events Pvt. Ltd.', color: '#2f7be8' },
                { label: 'Corporate Clients', desc: 'Tata Sons, Reliance, Google', color: '#0e9aa7' },
                { label: 'Reliable Vendors', desc: 'Catering, Sound, Rigging', color: '#cdbbf0' },
                { label: 'Iconic Venues', desc: 'Taj Lands End, Umaid Bhawan', color: '#c9a77a' },
                { label: 'Headline Artists', desc: 'Singers, Keynotes, Anchors', color: '#6b4fb8' },
                { label: 'Verified Freelancers', desc: 'Marshals, Baristas, Crew', color: '#5fe3c0' }
              ].map((node, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl glass-panel-interactive border border-white/15 text-left relative overflow-hidden"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full mb-3"
                    style={{ backgroundColor: node.color, boxShadow: `0 0 10px ${node.color}` }}
                  />
                  <div className="text-xs font-semibold text-white">{node.label}</div>
                  <div className="text-[11px] text-white/50 mt-1">{node.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA & FOOTER */}
      <footer className="relative py-20 px-6 lg:px-16 z-10 border-t border-white/10 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <img
            src="/assets/logo.png"
            alt="SYNCORA"
            className="h-12 w-auto object-contain mb-6 filter drop-shadow-[0_0_20px_rgba(205,187,240,0.3)]"
          />

          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
            Step into the command center.
          </h3>
          <p className="text-sm text-white/60 max-w-md mb-8">
            Experience how Syncora aligns Owner, Event Head, Department Leads, and Volunteers in real-time.
          </p>

          <button
            onClick={onOpenRoleChooser}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#0e9aa7] via-[#2f7be8] to-[#6b4fb8] hover:opacity-95 shadow-[0_0_30px_rgba(47,123,232,0.45)] transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Launch Syncora Live Prototype</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-16 pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-white/40">
            <span>© 2026 SYNCORA Platform. All event data encrypted and live-synchronized.</span>
            <div className="flex items-center gap-4 mt-3 sm:mt-0">
              <a href="#hero" className="hover:text-white transition-colors">Back to top</a>
              <span className="text-white/20">·</span>
              <span>Aurora Events Pvt. Ltd.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
