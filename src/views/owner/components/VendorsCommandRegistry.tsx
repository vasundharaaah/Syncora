import React, { useState } from 'react';
import { useSyncoraStore } from '../../../store/useSyncoraStore';
import { 
  Search, 
  Layers, 
  Phone, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileCheck, 
  ShieldCheck, 
  ArrowUpRight,
  Filter
} from 'lucide-react';

interface FullVendorInfo {
  id: string;
  name: string;
  category: string;
  reliabilityScore: number;
  reliabilityNote: string;
  totalQuote: number;
  advancePaid: number;
  escrowBalance: number;
  stage: string;
  gstNumber: string;
  contactPerson: string;
  phone: string;
  eventsCount: number;
  complianceOk: boolean;
}

const EXTENDED_VENDORS: FullVendorInfo[] = [
  {
    id: 'v-1',
    name: 'PQR Visuals & Production',
    category: 'AV & Sound',
    reliabilityScore: 96,
    reliabilityNote: '100% on-time across last 8 events. Rigging & line arrays certified.',
    totalQuote: 520000,
    advancePaid: 350000,
    escrowBalance: 170000,
    stage: 'Finalized',
    gstNumber: '27AABCP8921K1Z3',
    contactPerson: 'Pradeep Sharma',
    phone: '+91 98201 44521',
    eventsCount: 4,
    complianceOk: true
  },
  {
    id: 'v-2',
    name: 'Taj Banquet & Gourmet Services',
    category: 'Catering & F&B',
    reliabilityScore: 98,
    reliabilityNote: 'HACCP certified kitchen, temperature verified chaffing stations.',
    totalQuote: 680000,
    advancePaid: 500000,
    escrowBalance: 180000,
    stage: 'Finalized',
    gstNumber: '27AABCT4419E1Z8',
    contactPerson: 'Chef Sanjeev Nambiar',
    phone: '+91 98190 22345',
    eventsCount: 3,
    complianceOk: true
  },
  {
    id: 'v-3',
    name: 'Royal Flora & Orchid Styling',
    category: 'Stage Decor',
    reliabilityScore: 91,
    reliabilityNote: 'Exotic Dutch orchids sourced on time; misting crews deployed.',
    totalQuote: 380000,
    advancePaid: 250000,
    escrowBalance: 130000,
    stage: 'Finalized',
    gstNumber: '27AABCR5512N1Z4',
    contactPerson: 'Kavita Menon',
    phone: '+91 98451 90211',
    eventsCount: 5,
    complianceOk: true
  },
  {
    id: 'v-4',
    name: 'ABC Furniture Rentals & Haulage',
    category: 'Logistics & Haulage',
    reliabilityScore: 88,
    reliabilityNote: '500 Chiavari chairs delivered with clean velvet seat pads.',
    totalQuote: 240000,
    advancePaid: 150000,
    escrowBalance: 90000,
    stage: 'Advance Paid',
    gstNumber: '27AABCA3312M1Z9',
    contactPerson: 'Tariq Siddiqui',
    phone: '+91 98223 88120',
    eventsCount: 6,
    complianceOk: true
  },
  {
    id: 'v-5',
    name: 'SafeShield Executive Bouncers',
    category: 'Security & Protocol',
    reliabilityScore: 95,
    reliabilityNote: 'Armed ex-servicemen protocol guards for VIP Chairman convoys.',
    totalQuote: 180000,
    advancePaid: 100000,
    escrowBalance: 80000,
    stage: 'Contract Signed',
    gstNumber: '27AABCS7718P1Z2',
    contactPerson: 'Capt. Balwinder Singh',
    phone: '+91 98110 55678',
    eventsCount: 4,
    complianceOk: true
  },
  {
    id: 'v-6',
    name: 'Aerocity Luxury Fleet & Chauffeurs',
    category: 'Transport & Fleet',
    reliabilityScore: 93,
    reliabilityNote: 'Mercedes E-Class sedans with real-time GPS tracking and airport coordinators.',
    totalQuote: 290000,
    advancePaid: 180000,
    escrowBalance: 110000,
    stage: 'Finalized',
    gstNumber: '27AABCA9910D1Z5',
    contactPerson: 'Gurpreet Chawla',
    phone: '+91 98100 44321',
    eventsCount: 3,
    complianceOk: true
  }
];

export const VendorsCommandRegistry: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredVendors = EXTENDED_VENDORS.filter((v) => {
    const matchesSearch = 
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || v.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const totalCommitted = EXTENDED_VENDORS.reduce((s, v) => s + v.totalQuote, 0);
  const totalAdvance = EXTENDED_VENDORS.reduce((s, v) => s + v.advancePaid, 0);
  const totalEscrow = EXTENDED_VENDORS.reduce((s, v) => s + v.escrowBalance, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#0d0b17] via-[#050b2e] to-[#07060d]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#0e9aa7]/20 text-[#5fe3c0] border border-[#0e9aa7]/30">
                Supplier Ecosystem
              </span>
              <span className="text-xs font-mono text-white/50">36 Certified Production Partners</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">Vendors Command Registry</h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl">
              Contract milestones, reliability scorecards, PO disbursements, and tax compliance across all vendor categories.
            </p>
          </div>
        </div>

        {/* 3 Financial KPI Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Total PO Value</span>
            <div className="text-xl font-mono font-bold text-white mt-1">₹{(totalCommitted / 100000).toFixed(1)} L</div>
            <span className="text-[10px] text-white/50 mt-0.5 block">Approved vendor quotations</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Disbursed Advances</span>
            <div className="text-xl font-mono font-bold text-[#5fe3c0] mt-1">₹{(totalAdvance / 100000).toFixed(1)} L</div>
            <span className="text-[10px] text-white/50 mt-0.5 block">65.3% paid upon gate inspection</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">Escrow Balance</span>
            <div className="text-xl font-mono font-bold text-[#cdbbf0] mt-1">₹{(totalEscrow / 100000).toFixed(1)} L</div>
            <span className="text-[10px] text-white/50 mt-0.5 block">Held pending post-show audit</span>
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
            placeholder="Search vendor name, contact person or category..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#cdbbf0]"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 overflow-x-auto self-start sm:self-auto">
          {['All', 'AV & Sound', 'Catering & F&B', 'Stage Decor', 'Logistics & Haulage', 'Security & Protocol'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-gradient-to-r from-[#2f7be8] to-[#6b4fb8] text-white font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVendors.map((v) => (
          <div
            key={v.id}
            className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all space-y-4"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#0e9aa7] tracking-wider font-semibold block">
                  {v.category}
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">{v.name}</h4>
                <span className="text-[11px] font-mono text-white/40">GST: {v.gstNumber}</span>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono uppercase text-white/40 block">Reliability</span>
                <span className="text-sm font-mono font-bold text-[#5fe3c0]">{v.reliabilityScore}%</span>
              </div>
            </div>

            {/* Note & Progress */}
            <p className="text-xs text-white/60 leading-relaxed bg-white/5 p-2.5 rounded-xl border border-white/5">
              {v.reliabilityNote}
            </p>

            {/* Financials Strip */}
            <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/10 text-center">
              <div>
                <span className="text-[9px] font-mono uppercase text-white/40 block">Total PO</span>
                <span className="text-xs font-mono font-bold text-white">₹{(v.totalQuote / 100000).toFixed(1)}L</span>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase text-white/40 block">Advance</span>
                <span className="text-xs font-mono font-bold text-[#5fe3c0]">₹{(v.advancePaid / 100000).toFixed(1)}L</span>
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase text-white/40 block">Escrow</span>
                <span className="text-xs font-mono font-bold text-[#cdbbf0]">₹{(v.escrowBalance / 100000).toFixed(1)}L</span>
              </div>
            </div>

            {/* Contact & Status footer */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div>
                <div className="font-semibold text-white">{v.contactPerson}</div>
                <div className="text-[11px] font-mono text-white/50">{v.phone}</div>
              </div>

              <span className="px-2 py-1 rounded-lg text-[10px] font-mono bg-[#2f7be8]/20 text-[#5fe3c0] border border-[#2f7be8]/30">
                {v.stage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
