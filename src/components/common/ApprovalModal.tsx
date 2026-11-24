import React, { useState } from 'react';
import { X, Check, CheckCircle2, Sparkles } from 'lucide-react';
import { ConceptId } from '../../types/concept';
import { CONCEPTS_DATA } from '../../data/daycareData';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeConcept: ConceptId;
  onApproveSuccess: (selectedId: ConceptId, notes: string, requestedPages: string[]) => void;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  onClose,
  activeConcept,
  onApproveSuccess
}) => {
  const [selectedConcept, setSelectedConcept] = useState<ConceptId>(activeConcept);
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [selectedPages, setSelectedPages] = useState<string[]>([
    'Home',
    'About Us',
    'Childcare Programs',
    'Our Learning Approach',
    'Why Choose Us',
    'Parent Testimonials',
    'FAQs',
    'Enrollment & Inquiry'
  ]);
  const [hasApproved, setHasApproved] = useState(false);

  if (!isOpen) return null;

  const currentConceptMeta = CONCEPTS_DATA.find((c) => c.id === selectedConcept)!;

  const togglePage = (pageName: string) => {
    setSelectedPages((prev) =>
      prev.includes(pageName) ? prev.filter((p) => p !== pageName) : [...prev, pageName]
    );
  };

  const handleConfirmApproval = (e: React.FormEvent) => {
    e.preventDefault();
    setHasApproved(true);
    onApproveSuccess(selectedConcept, feedbackNotes, selectedPages);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-900 to-teal-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="text-lg font-bold font-jakarta">Phase 1 Approval & Feedback</h3>
              <p className="text-xs text-emerald-200">Select your preferred concept for Phase 2 development</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {hasApproved ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">Concept Approved!</h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              You selected <span className="font-bold text-emerald-900">{currentConceptMeta.name}</span>.
              Your preferences and feedback have been recorded.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-700 text-left space-y-2 border border-slate-200">
              <p className="font-semibold text-slate-900">Next Step: Phase 2 Full Build</p>
              <p>
                In your next prompt, you can confirm this choice and instruct the assistant to execute Phase 2 (creating all full subpages: About Us, Programs, Montessori approach, FAQ, Enrollment flows).
              </p>
              {feedbackNotes && (
                <div className="mt-2 pt-2 border-t border-slate-200">
                  <span className="font-medium text-slate-500">Your custom notes:</span>
                  <p className="italic text-slate-800">"{feedbackNotes}"</p>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors"
            >
              Continue Exploring Demos
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmApproval} className="p-6 space-y-5">
            {/* Concept Choice */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Choose Winning Concept
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CONCEPTS_DATA.map((c) => {
                  const isChosen = selectedConcept === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedConcept(c.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                        isChosen
                          ? 'border-emerald-700 bg-emerald-50/70 ring-2 ring-emerald-600/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 mt-0.5 rounded-full border flex items-center justify-center shrink-0 ${
                          isChosen ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChosen && <Check className="w-2.5 h-2.5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{c.name}</p>
                        <p className="text-[11px] text-slate-500">{c.badge}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scope of Pages for Phase 2 */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Select Pages for Phase 2 Architecture
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Home',
                  'About Us',
                  'Childcare Programs',
                  'Our Learning Approach',
                  'Why Choose Us',
                  'Parent Testimonials',
                  'FAQs',
                  'Enrollment & Inquiry'
                ].map((pg) => {
                  const active = selectedPages.includes(pg);
                  return (
                    <button
                      key={pg}
                      type="button"
                      onClick={() => togglePage(pg)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border flex items-center justify-between transition-colors ${
                        active
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      <span>{pg}</span>
                      {active && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom feedback or adjustments */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Custom Styling Feedback or Adjustments (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="e.g. 'I love Concept A's warm cream colors, but want to make sure the subsidy calculator from Concept D is prominently featured...'"
                value={feedbackNotes}
                onChange={(e) => setFeedbackNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Confirm & Approve Concept</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-4 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
