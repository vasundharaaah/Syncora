import React, { useState } from 'react';
import { useSyncoraStore } from '../../../store/useSyncoraStore';
import { 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  Radio, 
  Sparkles,
  Zap
} from 'lucide-react';

interface PredictiveRiskItem {
  id: string;
  title: string;
  category: 'Hardware & AV' | 'Logistics & VIP' | 'F&B Operations' | 'RF Spectrum' | 'Weather & Venue';
  severity: 'High' | 'Medium' | 'Low';
  probability: string;
  telemetry: string;
  contingencyProtocol: string;
  status: 'Mitigated' | 'Actively Monitored' | 'Resolved';
}

const LIVE_PREDICTIVE_RISKS: PredictiveRiskItem[] = [
  {
    id: 'risk-1',
    title: 'Secondary P4 LED Wall Processor Thermal Rise',
    category: 'Hardware & AV',
    severity: 'Medium',
    probability: '25% chance of frame flicker',
    telemetry: 'Core temperature reading 68°C (thermal shutdown threshold 75°C).',
    contingencyProtocol: 'Auxiliary cooling fan unit active; redundant Novastar processor switched to warm auto-failover.',
    status: 'Mitigated'
  },
  {
    id: 'risk-2',
    title: 'CSIA Airport VIP Convoy Flight Delay 35m',
    category: 'Logistics & VIP',
    severity: 'High',
    probability: '80% delay confirmed by flight radar',
    telemetry: 'AI-642 from New Delhi delayed on tarmac at IGI Airport.',
    contingencyProtocol: 'Porch protocol team shifted welcome ceremony to 17:45 IST; highway escort sedan alerted for Bandra flyover lane.',
    status: 'Actively Monitored'
  },
  {
    id: 'risk-3',
    title: 'High-Tea Buffet Replenishment Bottleneck at 17:30',
    category: 'F&B Operations',
    severity: 'Low',
    probability: '35% congestion probability during break',
    telemetry: 'Attendee arrival pacing indicates 650 concurrent guests inside a 20-minute window.',
    contingencyProtocol: 'Second satellite high-tea coffee station unlocked on North Terrace; 2 additional runners assigned.',
    status: 'Mitigated'
  },
  {
    id: 'risk-4',
    title: 'Wireless RF Frequency Interference in 520MHz Band',
    category: 'RF Spectrum',
    severity: 'Medium',
    probability: '40% clash with external OB news van',
    telemetry: 'Outside broadcast broadcast van detected transmitting on 522.4MHz.',
    contingencyProtocol: 'Shure Axient digital transmitters frequency hopped to clean spectrum 562.1MHz with zero audio drops.',
    status: 'Resolved'
  },
  {
    id: 'risk-5',
    title: 'Outdoor Pre-Function Sea Breeze Wind Gusts',
    category: 'Weather & Venue',
    severity: 'Low',
    probability: '15% probability of wind > 25 knots',
    telemetry: 'Local Arabian Sea marine anemometer indicates steady 12 knots.',
    contingencyProtocol: 'Tensioned marquee tie-downs and heavy brass table lantern bases deployed.',
    status: 'Mitigated'
  }
];

export const RisksModule: React.FC = () => {
  const { addToast } = useSyncoraStore();
  const [risks, setRisks] = useState<PredictiveRiskItem[]>(LIVE_PREDICTIVE_RISKS);

  const handleResolveRisk = (riskId: string) => {
    setRisks((prev) =>
      prev.map((r) =>
        r.id === riskId ? { ...r, status: 'Resolved' as const } : r
      )
    );
    addToast({
      title: 'Mitigation Action Applied',
      message: 'Automated telemetry verified risk resolved to safe baseline.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#0d0b17] via-[#050b2e] to-[#07060d]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Predictive Risk Matrix
              </span>
              <span className="text-xs font-mono text-white/50">Continuous Automated Telemetry</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">Predictive Operational Risks</h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl">
              Real-time failure prevention monitoring across electrical loads, airport convoys, RF spectrum scans, and venue weather.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Overall Risk Level: Low-Moderate</span>
            </span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Mitigated Risks</span>
            <div className="text-xl font-mono font-bold text-[#5fe3c0] mt-1">3 Protocols Active</div>
            <span className="text-[10px] text-white/40 mt-0.5 block">Zero mission disruptions</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Under Live Radar</span>
            <div className="text-xl font-mono font-bold text-amber-300 mt-1">1 In Flight (Airport Convoy)</div>
            <span className="text-[10px] text-white/40 mt-0.5 block">Escort sedan on standby</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Telemetry Frequency</span>
            <div className="text-xl font-mono font-bold text-[#cdbbf0] mt-1">Every 30 Seconds</div>
            <span className="text-[10px] text-white/40 mt-0.5 block">Automated IoT sensor telemetry</span>
          </div>
        </div>
      </div>

      {/* Risk Cards */}
      <div className="space-y-4">
        {risks.map((risk) => {
          const isHigh = risk.severity === 'High';
          const isResolved = risk.status === 'Resolved';
          return (
            <div
              key={risk.id}
              className={`glass-panel rounded-2xl p-5 border transition-all space-y-3 ${
                isResolved
                  ? 'border-white/10 opacity-70'
                  : isHigh
                  ? 'border-amber-500/40 bg-amber-500/[0.03]'
                  : 'border-white/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                    risk.severity === 'High'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-white/10 text-white/70'
                  }`}>
                    {risk.severity} Severity
                  </span>
                  <span className="text-xs font-mono text-white/50">{risk.category}</span>
                </div>

                <span className={`self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[10px] font-mono ${
                  isResolved
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-white/10 text-white/70'
                }`}>
                  {risk.status}
                </span>
              </div>

              {/* Title & Probability */}
              <div>
                <h4 className="text-base font-bold text-white">{risk.title}</h4>
                <div className="text-xs text-white/60 mt-0.5 flex items-center gap-1.5">
                  <span className="text-amber-300 font-mono">{risk.probability}</span>
                </div>
              </div>

              {/* Telemetry info */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/70 space-y-1">
                <span className="text-[10px] font-mono uppercase text-white/40 block">Live Telemetry Sensor Feed:</span>
                <p>{risk.telemetry}</p>
              </div>

              {/* Contingency Protocol */}
              <div className="p-3 rounded-xl bg-[#0e9aa7]/10 border border-[#0e9aa7]/20 text-xs text-white space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#5fe3c0] font-semibold block">
                  Active Mitigation Protocol:
                </span>
                <p className="text-white/80">{risk.contingencyProtocol}</p>
              </div>

              {/* Action */}
              {!isResolved && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleResolveRisk(risk.id)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Mitigation Resolved</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
