import React, { useState } from 'react';
import { X, Calculator, ArrowRight, Check } from 'lucide-react';

interface SubsidyCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTour: () => void;
}

export const SubsidyCalculatorModal: React.FC<SubsidyCalculatorModalProps> = ({
  isOpen,
  onClose,
  onOpenTour
}) => {
  const [ageGroup, setAgeGroup] = useState<'infant' | 'toddler' | 'preschool' | 'schoolage'>('toddler');
  const [householdIncome, setHouseholdIncome] = useState<number>(85000);

  if (!isOpen) return null;

  // Typical full base rates in Alberta before government grants
  const baseRates = {
    infant: 1100,
    toddler: 980,
    preschool: 900,
    schoolage: 550
  };

  // Alberta Affordability Grant (Paid directly to licensed daycare to reduce parent fees)
  const affordabilityGrants = {
    infant: 635,
    toddler: 510,
    preschool: 450,
    schoolage: 0 // Out of school uses provincial subsidy
  };

  // Additional Alberta Provincial Subsidy (income tested up to $180k)
  let provincialSubsidy = 0;
  if (householdIncome < 50000) {
    provincialSubsidy = ageGroup === 'schoolage' ? 366 : 266;
  } else if (householdIncome < 90000) {
    provincialSubsidy = ageGroup === 'schoolage' ? 240 : 200;
  } else if (householdIncome < 120000) {
    provincialSubsidy = ageGroup === 'schoolage' ? 140 : 125;
  } else if (householdIncome < 180000) {
    provincialSubsidy = ageGroup === 'schoolage' ? 80 : 75;
  } else {
    provincialSubsidy = 0;
  }

  const base = baseRates[ageGroup];
  const grant = affordabilityGrants[ageGroup];
  const totalDeductions = grant + provincialSubsidy;
  const estimatedParentShare = Math.max(0, base - totalDeductions);
  const estimatedDailyRate = (estimatedParentShare / 21).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-auto">
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white flex items-center justify-between gap-3 border-b-2 border-yellow-400 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 bg-yellow-400 text-slate-950 rounded-xl font-bold shrink-0">
              <Calculator className="w-5 h-5 text-slate-950" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-black font-jakarta leading-tight">Alberta Childcare Affordability Estimator</h3>
              <p className="text-xs text-yellow-200 font-medium">See your savings at Camrose Little Angels Daycare</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Estimator"
            className="p-2 text-white/80 hover:text-white rounded-full hover:bg-white/15 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Age Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              1. Select Child's Age Group
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'infant', label: 'Infant', range: '0–18 mo' },
                { id: 'toddler', label: 'Toddler', range: '19 mo–3 yr' },
                { id: 'preschool', label: 'Preschool', range: '3–4.5 yr' },
                { id: 'schoolage', label: 'School-Age', range: 'Kindergarten+' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setAgeGroup(opt.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    ageGroup === opt.id
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="font-semibold text-xs text-slate-900">{opt.label}</p>
                  <p className="text-[11px] text-slate-500">{opt.range}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Household Income Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                2. Annual Family Gross Income
              </label>
              <span className="text-sm font-black text-blue-950 tabular-nums">
                ${householdIncome.toLocaleString()} CAD
              </span>
            </div>
            <input
              type="range"
              min={30000}
              max={220000}
              step={5000}
              value={householdIncome}
              onChange={(e) => setHouseholdIncome(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>$30,000 (Max subsidy)</span>
              <span>$120,000</span>
              <span>$180,000+ (Affordability Grant only)</span>
            </div>
          </div>

          {/* Estimate Breakdown Card */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-200">
              <span>Full Regulated Base Rate (Est.):</span>
              <span className="font-semibold text-slate-800 tabular-nums">${base}/month</span>
            </div>

            {grant > 0 && (
              <div className="flex items-center justify-between text-xs text-emerald-700 pb-2 border-b border-slate-200">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Alberta Affordability Grant (Universal):
                </span>
                <span className="font-bold tabular-nums">-${grant}/month</span>
              </div>
            )}

            {provincialSubsidy > 0 && (
              <div className="flex items-center justify-between text-xs text-emerald-700 pb-2 border-b border-slate-200">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Additional Alberta Child Care Subsidy:
                </span>
                <span className="font-bold tabular-nums">-${provincialSubsidy}/month</span>
              </div>
            )}

            <div className="pt-2 flex items-baseline justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Estimated Out-of-Pocket</p>
                <p className="text-2xl font-black text-slate-900 tabular-nums">
                  ~${estimatedParentShare} <span className="text-xs font-normal text-slate-500">/ month</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Approximate Daily Cost</p>
                <p className="text-lg font-bold text-teal-800 tabular-nums">
                  ~${estimatedDailyRate} <span className="text-xs font-normal text-slate-500">/ day</span>
                </p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed">
            * Note: Official rates are regulated under Alberta government frameworks. Grants are paid directly to Camrose Little Angels to lower your monthly invoice. Exact fees depend on part-time vs full-time schedule.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenTour();
              }}
              className="flex-1 min-w-[200px] py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg border-2 border-yellow-300 active:scale-95"
            >
              <span>Confirm Your Rate on a Tour</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto py-3 px-4 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
