import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  BookOpen,
  Download,
  Calendar,
  ShieldCheck,
  Heart,
  FileText,
  PhoneCall,
  CreditCard,
  Clock,
  CheckCircle2
} from 'lucide-react';

const HANDBOOK_PDF_URL = '/assets/aistudio/parents_handbook_09c2220b.pdf';
const HANDBOOK_DOWNLOAD_NAME = 'Camrose_Little_Angels_Parent_Handbook.pdf';

interface ParentHandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTour: () => void;
  onOpenSubsidy: () => void;
}

const HANDBOOK_HIGHLIGHTS = [
  {
    title: 'Care Philosophy',
    icon: Heart,
    accent: 'text-red-600 bg-red-50 border-red-100',
    summary:
      'Play-based, child-centered learning guided by Flight — Alberta’s Early Learning and Care Framework.'
  },
  {
    title: 'Child Pick-Up Security',
    icon: ShieldCheck,
    accent: 'text-blue-700 bg-blue-50 border-blue-100',
    summary:
      'Daily staff sign-in/out, photo ID verification for authorized adults (18+), and custody documentation rules.'
  },
  {
    title: 'Written Medication Approval',
    icon: FileText,
    accent: 'text-indigo-700 bg-indigo-50 border-indigo-100',
    summary:
      'Medication is given only with signed parent consent, original labeled containers, and First Aid–certified staff.'
  },
  {
    title: 'Emergency Contacts',
    icon: PhoneCall,
    accent: 'text-amber-700 bg-amber-50 border-amber-100',
    summary:
      'Current parent and alternate emergency contacts on file at all times, with immediate phone notice and 911 response.'
  },
  {
    title: 'Subsidy & Fee Updates',
    icon: CreditCard,
    accent: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    summary:
      'Monthly fees due on the 1st, prompt subsidy status updates, and four weeks’ advance notice prior to withdrawal.'
  },
  {
    title: 'Daily Program Policies',
    icon: Clock,
    accent: 'text-purple-700 bg-purple-50 border-purple-100',
    summary:
      'Open Mon–Fri 6:00 AM – 6:30 PM, quiet nap window (11:00 AM – 1:30 PM), nut-free meals, wellness guidelines, and parent checklist.'
  }
];

export const ParentHandbookModal: React.FC<ParentHandbookModalProps> = ({
  isOpen,
  onClose,
  onOpenTour
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleDownloadPdf = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);
    try {
      const response = await fetch(HANDBOOK_PDF_URL);
      if (!response.ok) throw new Error('Failed to fetch PDF');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = HANDBOOK_DOWNLOAD_NAME;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
      setDownloadComplete(true);
      setTimeout(() => setDownloadComplete(false), 3500);
    } catch {
      const fallbackLink = document.createElement('a');
      fallbackLink.href = HANDBOOK_PDF_URL;
      fallbackLink.download = HANDBOOK_DOWNLOAD_NAME;
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="parent-handbook-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full flex flex-col shadow-2xl border-2 sm:border-4 border-yellow-300 overflow-hidden my-auto"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 px-5 py-4 sm:px-6 sm:py-5 text-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-yellow-400 text-blue-950 flex items-center justify-center font-black shadow-md shrink-0">
                <BookOpen className="w-5 h-5 text-blue-900" />
              </div>
              <div className="min-w-0">
                <span className="text-yellow-300 text-[10px] sm:text-xs font-black tracking-widest uppercase block">
                  Camrose Little Angels Daycare Society
                </span>
                <h3
                  id="parent-handbook-modal-title"
                  className="text-lg sm:text-xl font-black tracking-tight truncate"
                >
                  Official Parent Handbook
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close Handbook"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Brief Handbook Overview */}
          <div className="p-5 sm:p-6 space-y-5 max-h-[70vh] overflow-y-auto">
            <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-bold text-slate-900">
                  Complete Family Policies & Program Guide (16-Page PDF)
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Review key highlights below or download the complete Parent Handbook PDF for full policies, health checklists, and enrollment forms.
                </p>
              </div>

              <a
                href={HANDBOOK_PDF_URL}
                download={HANDBOOK_DOWNLOAD_NAME}
                onClick={handleDownloadPdf}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition-colors shadow-sm shrink-0"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>{isDownloading ? 'Downloading...' : 'Open / Download PDF'}</span>
              </a>
            </div>

            {/* Key Handbook Topics Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HANDBOOK_HIGHLIGHTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-start gap-3"
                  >
                    <div
                      className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${item.accent}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-black text-slate-900">{item.title}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-snug font-medium">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-slate-50 px-5 py-3.5 sm:px-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <a
                href={HANDBOOK_PDF_URL}
                download={HANDBOOK_DOWNLOAD_NAME}
                onClick={handleDownloadPdf}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-yellow-400" />
                <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
              </a>
              {downloadComplete && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Saved!</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenTour();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-sm transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book a Tour</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
