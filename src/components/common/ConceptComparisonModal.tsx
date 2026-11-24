import React from 'react';
import { X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { CONCEPTS_DATA } from '../../data/daycareData';
import { ConceptId } from '../../types/concept';

interface ConceptComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeConcept: ConceptId;
  onSelectConcept: (id: ConceptId) => void;
  onOpenApproval: () => void;
}

export const ConceptComparisonModal: React.FC<ConceptComparisonModalProps> = ({
  isOpen,
  onClose,
  activeConcept,
  onSelectConcept,
  onOpenApproval
}) => {
  if (!isOpen) return null;

  const comparisonAttributes = [
    {
      title: 'Aesthetic Direction',
      'concept-a': 'Joyful primary red, blue, yellow & crisp white with welcoming baby mascot.',
      'concept-b': 'High-energy playful childcare with bouncy motion, daily schedule & warm greetings.',
      'concept-c': 'Modern Bauhaus/Montessori primary geometry with ordered child autonomy.',
      'concept-d': 'Digital cobalt blue & yellow interactive portal with live calculators & motion.'
    },
    {
      title: 'Typography Pairing',
      'concept-a': 'Outfit Bold Headings + Plus Jakarta Sans friendly body',
      'concept-b': 'Outfit Sans Display + Plus Jakarta Sans cheerful weights',
      'concept-c': 'DM Sans Grotesque + Precision tabular metadata',
      'concept-d': 'Outfit Bold + Plus Jakarta Sans high contrast'
    },
    {
      title: 'Color Palette (Red, Blue, White, Yellow)',
      'concept-a': 'Royal Blue (#1D4ED8), Warm Cherry Red (#DC2626), Yellow (#F59E0B), White',
      'concept-b': 'Vibrant Red (#DC2626), Sky/Royal Blue, Sunburst Yellow, Pure White',
      'concept-c': 'Pure Crisp White (#FFFFFF), Cobalt (#2563EB), Poppy Red (#EF4444), Sunflower',
      'concept-d': 'Navy Cobalt (#0A192F), Radiant Yellow (#FBBF24), Crimson Red (#DC2626), White'
    },
    {
      title: 'Motion & Animations',
      'concept-a': 'Animated Welcoming Baby Leo, bouncing hand wave, floating primary spheres & card spring reveals',
      'concept-b': 'Bouncy playful hover expansions, interactive category filters, active timeline cards',
      'concept-c': 'Clean slide-up reveals, tab switcher transitions, subtle elevation feedback',
      'concept-d': 'High-impact glow animations, interactive subsidy slider, animated metric badges'
    },
    {
      title: 'Welcoming Baby Greeting',
      'concept-a': 'Prominent hero baby banner + floating audio-enabled mascot greeting saying hello',
      'concept-b': 'Baby Leo speech bubble header + voice greeting + interactive wave back',
      'concept-c': 'Baby mascot available in corner floating guide for prospective parents',
      'concept-d': 'Interactive digital assistant widget with real-time tour booking integration'
    },
    {
      title: 'Best Suited For',
      'concept-a': 'Parents seeking elevated, boutique quality, peace of mind and calm nurturing',
      'concept-b': 'Families who value social bonding, joyful creativity, playfulness and community',
      'concept-c': 'Parents seeking Montessori independence, developmental focus and natural learning',
      'concept-d': 'Modern working parents wanting transparent digital tools and rapid enrollment'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl my-8 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Phase 1 Design Review</span>
            </div>
            <h3 className="text-xl font-bold font-jakarta mt-0.5">Four Homepage Concept Comparison Matrix</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matrix Table */}
        <div className="p-6 overflow-x-auto">
          <div className="min-w-[800px] border border-slate-200 rounded-xl overflow-hidden">
            {/* Table Header: 4 Concepts */}
            <div className="grid grid-cols-5 bg-slate-100 text-slate-900 border-b border-slate-200 text-xs font-semibold">
              <div className="p-4 bg-slate-200/80 text-slate-700 uppercase tracking-wider font-bold">
                Design Dimension
              </div>
              {CONCEPTS_DATA.map((c) => {
                const isSelected = activeConcept === c.id;
                return (
                  <div
                    key={c.id}
                    className={`p-4 flex flex-col justify-between transition-colors ${
                      isSelected ? 'bg-amber-50/80 border-t-4 border-amber-600' : 'bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">{c.badge}</span>
                      <h4 className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">{c.name.replace('Concept ', '')}</h4>
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => {
                          onSelectConcept(c.id);
                          onClose();
                        }}
                        className={`w-full py-1.5 px-2 text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Currently Active</span>
                          </>
                        ) : (
                          <span>Preview Demo</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table Rows */}
            {comparisonAttributes.map((row, idx) => (
              <div
                key={row.title}
                className={`grid grid-cols-5 text-xs ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                } border-b border-slate-200/80 last:border-b-0`}
              >
                <div className="p-3.5 font-bold text-slate-700 border-r border-slate-200/80 bg-slate-50/50">
                  {row.title}
                </div>
                {CONCEPTS_DATA.map((c) => (
                  <div
                    key={c.id}
                    className={`p-3.5 border-r border-slate-200/80 last:border-r-0 text-slate-600 leading-relaxed ${
                      activeConcept === c.id ? 'bg-amber-50/30 font-medium text-slate-900' : ''
                    }`}
                  >
                    {row[c.id]}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Footer Call-to-action */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-slate-900">Found your favorite direction?</p>
              <p className="text-xs text-slate-500">
                You can approve any concept or provide custom hybrid notes to proceed with Phase 2 complete development.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenApproval();
              }}
              className="py-2.5 px-5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2 shrink-0 shadow-sm"
            >
              <span>Approve / Provide Feedback</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
