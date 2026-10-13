import React from 'react';
import { useSyncoraStore } from '../../../store/useSyncoraStore';
import { 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  Download, 
  Award, 
  ShieldCheck, 
  FileCheck,
  Star,
  Users
} from 'lucide-react';

export const PostEventModule: React.FC = () => {
  const { addToast } = useSyncoraStore();

  const handleDownload = () => {
    addToast({
      title: 'Generating Audit PDF',
      message: 'Compiling photographic proof, financial reconciliation, and client survey metrics.',
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
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Audited Sign-Off
              </span>
              <span className="text-xs font-mono text-white/50">Post-Mortem & Reconciliation</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">Post-Event Review & Audit</h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl">
              Certified post-event financial variance, vendor performance scorecards, client satisfaction surveys, and photographic proof verification.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0e9aa7] via-[#2f7be8] to-[#6b4fb8] text-xs font-semibold text-white flex items-center gap-2 shadow-lg hover:opacity-90 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Certified Audit PDF</span>
            </button>
          </div>
        </div>

        {/* 4 Financial & Satisfaction Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Sanctioned Budget</span>
            <div className="text-xl font-mono font-bold text-white mt-1">₹25.00 L</div>
            <span className="text-[10px] text-white/50 mt-0.5 block">Approved client fee</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Actual Expenditure</span>
            <div className="text-xl font-mono font-bold text-[#5fe3c0] mt-1">₹23.85 L</div>
            <span className="text-[10px] text-[#5fe3c0] mt-0.5 block">+₹1.15 L (4.6% saved)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Client Net Margin</span>
            <div className="text-xl font-mono font-bold text-[#cdbbf0] mt-1">₹7.35 L</div>
            <span className="text-[10px] text-white/40 mt-0.5 block">29.4% net retained profit</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Client Satisfaction</span>
            <div className="text-xl font-mono font-bold text-amber-300 mt-1">4.92 / 5.0</div>
            <span className="text-[10px] text-white/40 mt-0.5 block">Based on 642 exit surveys</span>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Department Scorecard & Debrief Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Scorecard */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-sm font-bold text-white">Department Delivery Scorecard</span>
            <span className="text-[10px] font-mono text-[#5fe3c0]">97.8% Overall Quality</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { dept: 'Production & AV', score: 98, note: 'Zero audio dropout; 4K stream latency under 1.2s' },
              { dept: 'VIP Hospitality & Protocol', score: 99, note: 'Chairman convoy arrived without delay; diplomatic escorts verified' },
              { dept: 'Registration & Delegate Flow', score: 98, note: 'RFID badge scan average queue time 14 seconds' },
              { dept: 'F&B Operations', score: 96, note: 'Banquet plated service drop completed in 18 minutes flat' },
              { dept: 'Stage Decor & Styling', score: 97, note: 'Fresh orchids misted; zero lighting glare on prompter glass' },
              { dept: 'Logistics & Haulage', score: 98, note: 'All 500 chairs cleared within 90 minutes post-strike' }
            ].map((d, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{d.dept}</span>
                  <span className="font-mono text-[#5fe3c0] font-bold">{d.score}%</span>
                </div>
                <p className="text-[11px] text-white/60">{d.note}</p>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0e9aa7] to-[#5fe3c0] rounded-full"
                    style={{ width: `${d.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Debrief Key Takeaways */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-sm font-bold text-white">Key Takeaways & Protocol Optimizations</span>
            <span className="text-[10px] font-mono text-[#cdbbf0]">Audited by Aditi Rao</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <span className="font-semibold text-emerald-200 block">Generator Redundancy Benchmark</span>
              <p className="text-white/70 text-[11px]">
                Pre-event 65kVA generator cutover test prevented any momentary brownout during high-draw lighting cues. Standardize for all future corporate summits.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#2f7be8]/10 border border-[#2f7be8]/20 space-y-1">
              <span className="font-semibold text-blue-200 block">WhatsApp Parsing Acceleration</span>
              <p className="text-white/70 text-[11px]">
                Direct ingestion of unstructured WhatsApp floor updates reduced team lead manual logging overhead by 68%. 14 impromptu tasks auto-assigned.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
              <span className="font-semibold text-purple-200 block">Surplus F&B Food Charity Donation</span>
              <p className="text-white/70 text-[11px]">
                Surplus untouched gourmet dinners (72 portions) packed in biodegradable cartons and collected by Robin Hood Army Mumbai at 23:45 IST. Zero food waste recorded.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
