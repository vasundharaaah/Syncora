import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

interface ProofLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  title: string;
  actor?: string;
  timestamp?: string;
  onApprove?: () => void;
}

export const ProofLightbox: React.FC<ProofLightboxProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  actor,
  timestamp,
  onApprove
}) => {
  if (!isOpen || !imageUrl) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative max-w-xl w-full rounded-2xl glass-panel p-6 border border-[#cdbbf0]/30 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <span className="text-[10px] uppercase font-mono tracking-wider text-[#0e9aa7] font-semibold">
            Verified Event Execution Proof
          </span>
          <h3 className="text-lg font-display font-bold text-white mt-1">{title}</h3>
          <div className="flex items-center gap-3 text-xs text-white/50 mt-1">
            {actor && <span>Completed by: <strong className="text-white/80">{actor}</strong></span>}
            {timestamp && <span>· Time: <strong className="text-white/80">{timestamp}</strong></span>}
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-white/15 bg-black/60 aspect-video flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-2 text-xs text-[#5fe3c0]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Cryptographically Signed & Timestamped</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xs text-white/40">Proof archived in Syncora permanent event ledger</span>
          <div className="flex items-center gap-2">
            {onApprove && (
              <button
                onClick={() => {
                  onApprove();
                  onClose();
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#0e9aa7] to-[#2f7be8] hover:opacity-90 transition-opacity cursor-pointer"
              >
                Approve & Seal Task
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-white/80 bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
