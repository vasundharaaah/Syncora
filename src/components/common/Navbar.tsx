import React from 'react';
import { ArrowRight } from 'lucide-react';

interface NavbarProps {
  onEnterApp: () => void;
  onOpenRoleChooser?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onEnterApp, onOpenRoleChooser }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b px-6 lg:px-12 py-3.5 bg-black/60 border-white/10 text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <a href="#hero" className="flex items-center gap-3 shrink-0 group">
          <img
            src="/assets/logo.png"
            alt="SYNCORA"
            className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
          />
        </a>

        {/* Zone 2: Concise Navigation Links with custom high-craft typography */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-[11px] uppercase tracking-[0.16em] font-medium">
          <a 
            href="#problem" 
            className="transition-colors whitespace-nowrap shrink-0 text-white/70 hover:text-[#cdbbf0]"
          >
            The Problem
          </a>
          <a 
            href="#lifecycle" 
            className="transition-colors whitespace-nowrap shrink-0 text-white/70 hover:text-[#cdbbf0]"
          >
            5-Phase Lifecycle
          </a>
          <a 
            href="#perspectives" 
            className="transition-colors whitespace-nowrap shrink-0 text-white/70 hover:text-[#cdbbf0]"
          >
            Four Perspectives
          </a>
          <a 
            href="#whatsapp-demo" 
            className="transition-colors whitespace-nowrap shrink-0 text-white/70 hover:text-[#cdbbf0]"
          >
            WhatsApp to Structured
          </a>
          <a 
            href="#ai-intelligence" 
            className="transition-colors whitespace-nowrap shrink-0 text-white/70 hover:text-[#cdbbf0]"
          >
            AI Risk & Profit
          </a>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={onOpenRoleChooser || onEnterApp}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-[#0e9aa7] via-[#2f7be8] to-[#6b4fb8] hover:opacity-95 shadow-[0_0_20px_rgba(47,123,232,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
          >
            <span>Enter Syncora</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
