import React from 'react';
import { useSyncoraStore } from '../../../store/useSyncoraStore';
import { 
  FileText, 
  FileCheck, 
  ShieldCheck, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Lock
} from 'lucide-react';

interface EventDocument {
  id: string;
  name: string;
  category: 'Government Permit' | 'Venue Contract' | 'Technical Rider' | 'Insurance & Tax';
  fileNumber: string;
  issuedBy: string;
  validUntil: string;
  status: 'Verified & Active' | 'Filed';
  fileSize: string;
}

const EVENT_DOCUMENTS: EventDocument[] = [
  {
    id: 'doc-1',
    name: 'BMC Entertainment & Public Gathering License',
    category: 'Government Permit',
    fileNumber: 'BMC-ENT-MUM-2026-9812',
    issuedBy: 'Brihanmumbai Municipal Corporation',
    validUntil: '16 Dec 2026',
    status: 'Verified & Active',
    fileSize: '2.4 MB'
  },
  {
    id: 'doc-2',
    name: 'Mumbai Police Public Order NOC & Sound Permit',
    category: 'Government Permit',
    fileNumber: 'MUM-POL-NOC-4412-B',
    issuedBy: 'Bandra Police Commissionerate',
    validUntil: '15 Dec 2026',
    status: 'Verified & Active',
    fileSize: '1.8 MB'
  },
  {
    id: 'doc-3',
    name: 'Chief Fire Officer Safety Clearance NOC',
    category: 'Government Permit',
    fileNumber: 'CFO-FIRE-MUM-0819',
    issuedBy: 'Maharashtra Fire Services',
    validUntil: '31 Dec 2026',
    status: 'Verified & Active',
    fileSize: '3.1 MB'
  },
  {
    id: 'doc-4',
    name: 'Taj Lands End Master Banquet Agreement & Floor Plan',
    category: 'Venue Contract',
    fileNumber: 'TLE-AGR-8812-MUM',
    issuedBy: 'Taj Lands End Commercial Directorate',
    validUntil: '16 Dec 2026',
    status: 'Verified & Active',
    fileSize: '5.8 MB'
  },
  {
    id: 'doc-5',
    name: 'Commercial General Liability Policy (₹10 Cr Coverage)',
    category: 'Insurance & Tax',
    fileNumber: 'ICICI-LOMB-CGL-99012',
    issuedBy: 'ICICI Lombard General Insurance',
    validUntil: '31 Mar 2027',
    status: 'Verified & Active',
    fileSize: '4.2 MB'
  },
  {
    id: 'doc-6',
    name: 'PPL & IPRS Public Performance Sound License',
    category: 'Technical Rider',
    fileNumber: 'PPL-IPRS-W-2026-119',
    issuedBy: 'Phonographic Performance Ltd. India',
    validUntil: '15 Dec 2026',
    status: 'Verified & Active',
    fileSize: '1.2 MB'
  }
];

export const DocumentsModule: React.FC = () => {
  const { addToast } = useSyncoraStore();

  const handleDownload = (docName: string) => {
    addToast({
      title: 'Downloading Document',
      message: `Exporting official certified PDF copy of ${docName}`,
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
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#0e9aa7]/20 text-[#5fe3c0] border border-[#0e9aa7]/30">
                Compliance Vault
              </span>
              <span className="text-xs font-mono text-white/50">All Permits & Agreements Secured</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight">Contract & Regulatory Compliance</h2>
            <p className="text-xs text-white/60 mt-1 max-w-xl">
              Certified legal depository holding municipal entertainment licenses, police NOCs, fire audit certificates, and hotel banquet agreements.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Legally Compliant</span>
            </span>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EVENT_DOCUMENTS.map((doc) => (
          <div
            key={doc.id}
            className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#5fe3c0]">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#0e9aa7] font-semibold block">
                      {doc.category}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{doc.name}</h4>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                  {doc.status}
                </span>
              </div>

              {/* Meta details */}
              <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-white/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono">Permit Ref:</span>
                  <span className="text-[11px] font-mono text-white font-medium">{doc.fileNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono">Authority:</span>
                  <span className="text-[11px] text-white">{doc.issuedBy}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono">Valid Until:</span>
                  <span className="text-[11px] text-[#5fe3c0] font-mono">{doc.validUntil}</span>
                </div>
              </div>
            </div>

            {/* Action footer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-white/40">{doc.fileSize} PDF</span>
              <button
                onClick={() => handleDownload(doc.name)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
