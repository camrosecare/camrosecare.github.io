import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle,
  Calculator,
  Award
} from 'lucide-react';
import { BUSINESS_INFO, DAYCARE_PROGRAMS, IMAGES } from '../../data/daycareData';
import { RollingPosterGallery } from '../gallery/RollingPosterGallery';

interface ConceptProps {
  onOpenTour: (programId?: string) => void;
  onOpenSubsidy: () => void;
}

export const ConceptD_CreativeDigital: React.FC<ConceptProps> = ({ onOpenTour, onOpenSubsidy }) => {
  const [selectedPill, setSelectedPill] = useState<'all' | 'infants' | 'toddlers' | 'preschool' | 'schoolage'>('all');

  const filteredPrograms = selectedPill === 'all'
    ? DAYCARE_PROGRAMS
    : DAYCARE_PROGRAMS.filter(p => p.id === selectedPill);

  return (
    <div className="min-h-screen bg-[#0A192F] text-white font-jakarta selection:bg-yellow-400 selection:text-slate-950 overflow-x-hidden">
      {/* Top Status Ribbon in Primary Blue/Yellow */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-b border-blue-800/60 bg-[#071324] text-xs py-2 px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-yellow-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
              Licensed Daycare Society
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-white font-medium">Camrose, Alberta</span>
            <span className="text-slate-600">|</span>
            <span className="text-red-400 font-bold">Federal $10/Day Childcare Framework Partner</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-slate-300">Mon–Fri: 6:00 AM – 6:30 PM</span>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="text-yellow-400 hover:text-yellow-300 font-bold">
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#0A192F]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a href="#hero" className="flex items-center gap-2 whitespace-nowrap shrink-0 group">
            <span className="text-2xl font-black tracking-tight text-white font-outfit">
              Camrose<span className="text-red-500">Care</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-wider font-bold text-slate-300">
            <a href="#hero" className="hover:text-yellow-400 transition-colors whitespace-nowrap">Home</a>
            <a href="#programs-experience" className="hover:text-yellow-400 transition-colors whitespace-nowrap">Programs</a>
            <a href="#interactive-calculator" className="hover:text-yellow-400 transition-colors whitespace-nowrap">Alberta Subsidy</a>
            <a href="#why-camrose" className="hover:text-yellow-400 transition-colors whitespace-nowrap">Why Choose Us</a>
            <a href="#reviews" className="hover:text-yellow-400 transition-colors whitespace-nowrap">Parent Reviews</a>
          </nav>

          {/* Zone 3: Primary Action in Red & Yellow */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenTour()}
              className="px-5 py-2.5 text-xs font-black uppercase tracking-wider text-slate-950 bg-yellow-400 hover:bg-yellow-300 rounded-xl transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] whitespace-nowrap shrink-0 border-2 border-red-500"
            >
              Enroll / Book Visit
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero: Asymmetrical High-Contrast Editorial with Welcoming Baby Avatar */}
      <section id="hero" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
        {/* Glow backdrop subtle effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/60 border border-blue-400/40 text-blue-200 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>Modern Early Learning in Camrose, Alberta</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08] font-outfit text-balance">
                Early childhood excellence, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-400 to-blue-300">energized for modern families.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed font-normal">
                Licensed play-based daycare, certified educators, on-site hot nutrition, and extended 6:00 AM – 6:30 PM hours. Maximized provincial grants for Camrose parents.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenTour()}
                  className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(220,38,38,0.4)] flex items-center justify-center gap-2 border-2 border-yellow-300"
                >
                  <span>Request Priority Tour</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenSubsidy}
                  className="px-6 py-4 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-white/20 flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-yellow-400" />
                  <span>Instant Subsidy Estimator</span>
                </motion.button>
              </div>

              {/* Verified Metrics Strip in Primary Colors */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <p className="text-2xl font-black text-white font-outfit tabular-nums">6:00 AM</p>
                  <p className="text-xs text-slate-400 font-bold">Extended drop-off</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-yellow-400 font-outfit tabular-nums">0–12 Yrs</p>
                  <p className="text-xs text-slate-400 font-bold">Infant to School Care</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-red-500 font-outfit tabular-nums">~$10–$15</p>
                  <p className="text-xs text-slate-400 font-bold">Target daily net fee</p>
                </div>
              </div>
            </motion.div>

            {/* Right Asymmetrical Media Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-blue-500/40 shadow-2xl bg-gradient-to-b from-blue-950/60 to-[#0A1424] p-3">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] relative">
                  <img
                    src={IMAGES.heroPrimaryColors}
                    alt="Engaged children in primary colored classroom"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] uppercase tracking-wider font-black text-yellow-400">Camrose Little Angels Society</span>
                    <p className="text-sm font-bold text-white mt-0.5">Fostering capable, curious, and resourceful learners</p>
                  </div>
                </div>

                {/* Overlapping Quick-Stats Card */}
                <div className="mt-3 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-yellow-400 shrink-0" />
                    <div>
                      <p className="font-bold text-white">Alberta Licensed Daycare</p>
                      <p className="text-[11px] text-slate-400">4907 47 Street, Camrose</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onOpenTour()}
                    className="px-3 py-1.5 bg-yellow-400 text-slate-950 rounded-lg text-[11px] font-black"
                  >
                    View Center
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Embedded Subsidy & Affordability Spotlight */}
      <section id="interactive-calculator" className="py-16 bg-[#071324] border-y border-blue-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-950 via-[#0B1E38] to-slate-900 p-8 rounded-3xl border-2 border-blue-500/30 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-yellow-400 font-bold">
                  <Calculator className="w-4 h-4" />
                  <span>Affordability Transparency</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-outfit text-white">
                  How the Alberta Child Care Agreement Lowers Your Monthly Fees
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
                  All enrolled infant, toddler, and preschool families automatically receive the provincial Affordability Grant (up to $635/mo off per child), plus income-based provincial subsidies up to an additional $266/mo.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenSubsidy}
                  className="w-full py-3.5 px-6 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 border-2 border-red-500"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Launch Live Fee Estimator</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Matrix Experience */}
      <section id="programs-experience" className="py-24 bg-[#0A192F]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-red-500 font-black">Age Programs</span>
              <h2 className="text-3xl sm:text-4xl font-black font-outfit text-white mt-1">
                Developmental Classrooms
              </h2>
              <p className="text-sm text-slate-400 mt-1 font-medium">
                Engineered for natural curiosity, gross motor play, and socio-emotional readiness.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {[
                { id: 'all', label: 'All Classrooms' },
                { id: 'infants', label: 'Infant (0-18m)' },
                { id: 'toddlers', label: 'Toddler (19m-3y)' },
                { id: 'preschool', label: 'Preschool (3-4.5y)' },
                { id: 'schoolage', label: 'School-Age (4.5-12y)' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedPill(pill.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                    selectedPill === pill.id
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPrograms.map((prog) => (
              <motion.div
                key={prog.id}
                whileHover={{ y: -6 }}
                className="bg-[#0E2442] rounded-2xl border border-blue-500/30 hover:border-yellow-400 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-yellow-400 text-slate-950 px-3 py-1 rounded-lg text-[11px] font-black">
                      {prog.ageRange}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-black text-base text-white font-outfit">{prog.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">{prog.description}</p>
                    <div className="pt-2 border-t border-white/10 space-y-1">
                      {prog.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300 font-semibold">
                          <CheckCircle className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onOpenTour(prog.id)}
                    className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Check Openings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Children's Creative Exhibition: 3D Rolling Poster Gallery */}
      <RollingPosterGallery />

      {/* Footer */}
      <footer className="bg-[#050D18] text-slate-400 py-10 text-xs border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold">Camrose Care · Little Angels Daycare Society</p>
          <div className="flex gap-6 font-bold">
            <a href="#hero" className="hover:text-white">Home</a>
            <a href="#programs-experience" className="hover:text-white">Programs</a>
            <a href="#interactive-calculator" className="hover:text-white">Subsidy</a>
            <button onClick={() => onOpenTour()} className="text-yellow-400 hover:text-white">Tour</button>
          </div>
          <p>© {new Date().getFullYear()} Camrose Care. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
