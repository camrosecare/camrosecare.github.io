import React from 'react';
import {
  Layers,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle,
  Calculator,
  Download
} from 'lucide-react';
import { ConceptId } from '../../types/concept';
import { CONCEPTS_DATA } from '../../data/daycareData';

export type ViewportMode = 'full' | 'tablet' | 'mobile';

interface ShowcaseBarProps {
  activeConcept: ConceptId;
  onSelectConcept: (id: ConceptId) => void;
  viewport: ViewportMode;
  onChangeViewport: (mode: ViewportMode) => void;
  onOpenCompare: () => void;
  onOpenApproval: () => void;
  onOpenSubsidy: () => void;
  onOpenExport: () => void;
}

export const ShowcaseBar: React.FC<ShowcaseBarProps> = ({
  activeConcept,
  onSelectConcept,
  viewport,
  onChangeViewport,
  onOpenCompare,
  onOpenApproval,
  onOpenSubsidy,
  onOpenExport
}) => {
  const currentMeta = CONCEPTS_DATA.find((c) => c.id === activeConcept)!;

  return (
    <div className="relative lg:sticky lg:top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2.5 lg:gap-3">
          {/* Left: Project Branding & Concept Picker */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs">
                ✦
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-bold text-white tracking-tight">Camrose Care Redesign</span>
                <span className="text-[10px] text-amber-400 block font-medium">Phase 1: Design Showcase</span>
              </div>
            </div>

            {/* Concept Switcher Buttons */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
              {CONCEPTS_DATA.map((c) => {
                const isActive = activeConcept === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onSelectConcept(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{c.name.split(':')[0]}</span>
                    <span className="text-[10px] opacity-80 hidden md:inline">
                      {c.name.split(':')[1]?.trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Inspection, Viewport & Approval CTAs */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between lg:justify-end gap-1.5 sm:gap-2 w-full lg:w-auto">
            {/* Viewport Toggles */}
            <div className="hidden md:flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                onClick={() => onChangeViewport('full')}
                title="Desktop (100% full width)"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewport === 'full' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onChangeViewport('tablet')}
                title="Tablet Simulation (768px)"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewport === 'tablet' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onChangeViewport('mobile')}
                title="Mobile Simulation (390px)"
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewport === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Action Tools */}
            <button
              onClick={onOpenCompare}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Compare All 4</span>
              <span className="sm:hidden">Compare</span>
            </button>

            <button
              onClick={onOpenSubsidy}
              aria-label="Subsidy Tool"
              title="Subsidy Tool"
              className="px-2.5 sm:px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calculator className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">Subsidy Tool</span>
            </button>

            {/* Export for Audit / Download Hub */}
            <button
              onClick={onOpenExport}
              className="px-3.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-black rounded-xl transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap active:scale-95"
              title="Export HTML code, download offline package, or copy code for auditor"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export / Audit Hub</span>
            </button>

            {/* Select & Approve Winner */}
            <button
              onClick={onOpenApproval}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Select & Approve</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-strip with active concept attributes */}
      <div className="bg-slate-900/90 border-t border-slate-800/60 px-3 sm:px-4 py-1.5 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-amber-300 font-semibold">{currentMeta.badge}:</span>
            <span className="text-slate-300">{currentMeta.paletteDescription}</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="hidden sm:inline text-slate-400">Font: {currentMeta.typography}</span>
          </div>
          <div className="text-[11px] text-slate-400">
            <span>Atmosphere: {currentMeta.keyAtmosphere.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
