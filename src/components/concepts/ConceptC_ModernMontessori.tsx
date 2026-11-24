import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Check
} from 'lucide-react';
import { BUSINESS_INFO, DAYCARE_PROGRAMS, IMAGES } from '../../data/daycareData';
import { RollingPosterGallery } from '../gallery/RollingPosterGallery';

interface ConceptProps {
  onOpenTour: (programId?: string) => void;
  onOpenSubsidy: () => void;
}

export const ConceptC_ModernMontessori: React.FC<ConceptProps> = ({ onOpenTour, onOpenSubsidy }) => {
  const [activePrinciple, setActivePrinciple] = useState(0);

  const montessoriPillars = [
    {
      title: 'The Prepared Environment',
      subtitle: 'Order, beauty, and child-height autonomy',
      color: 'border-blue-600',
      badge: 'bg-blue-600 text-white',
      desc: 'Our Camrose classrooms feature child-height wooden shelves, natural textiles, primary-colored learning rods, and organized trays that empower children to independently select, master, and replace their work.',
      quote: 'The environment must be rich in motives which lend interest to activity and invite the child to conduct his own experiences.'
    },
    {
      title: 'Sensory Primary Mastery',
      subtitle: 'Hands-on exploration through color, texture & weight',
      color: 'border-red-600',
      badge: 'bg-red-600 text-white',
      desc: 'Concrete math through wooden counting rods, spatial reasoning with primary red, blue, and yellow blocks, and tactile sandpaper letters that transform abstract knowledge into tangible physical understanding.',
      quote: 'Never help a child with a task at which he feels he can succeed.'
    },
    {
      title: 'Grace, Courtesy & Shared Nutrition',
      subtitle: 'Self-regulation, peaceful empathy, and family-style meals',
      color: 'border-yellow-400',
      badge: 'bg-yellow-400 text-slate-950',
      desc: 'Children learn to pour their own water, set tables for warm shared lunches, resolve minor peer disagreements with peaceful communication, and respect each other’s deep concentration.',
      quote: 'The child who has felt a strong love for his surroundings takes a profound pleasure in all that he sees.'
    },
    {
      title: 'Outdoor Nature Immersion',
      subtitle: 'Connection to seasonal cycles and gross motor health',
      color: 'border-blue-600',
      badge: 'bg-blue-600 text-white',
      desc: 'Our expansive fenced green yard allows daily digging in cedar sandboxes, planting in raised herb gardens, and running freely in fresh Alberta air under caring educator supervision.',
      quote: 'Let the children be free; encourage them; let them run outside when it is raining; let them remove their shoes.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFEFE] text-slate-900 font-dmsans selection:bg-yellow-300 selection:text-blue-950 overflow-x-hidden">
      {/* Editorial Top Bar with Primary Color Accents */}
      <div className="border-b border-slate-200 bg-white text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-black text-blue-700">Camrose Little Angels Daycare Society</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">Montessori Inspired Early Learning</span>
            <span className="text-slate-300">/</span>
            <span className="text-red-600 font-bold">Alberta Affordability Grant Partner</span>
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span>6:00 AM – 6:30 PM (Mon–Fri)</span>
            <span>/</span>
            <a href={`tel:${BUSINESS_INFO.phone}`} className="font-bold text-slate-900 hover:text-blue-600">
              {BUSINESS_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Navigation - Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a href="#hero" className="flex items-baseline gap-2 whitespace-nowrap shrink-0">
            <span className="text-2xl font-black tracking-tight text-blue-900">
              Camrose<span className="text-red-600">Care</span>
            </span>
            <span className="text-[11px] uppercase tracking-widest text-amber-600 font-bold hidden sm:inline">
              · Montessori
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-wider font-bold text-slate-600">
            <a href="#pedagogy" className="hover:text-blue-600 transition-colors whitespace-nowrap">Philosophy</a>
            <a href="#curriculum" className="hover:text-blue-600 transition-colors whitespace-nowrap">Prepared Rooms</a>
            <a href="#features" className="hover:text-blue-600 transition-colors whitespace-nowrap">The Standard</a>
            <a href="#voices" className="hover:text-blue-600 transition-colors whitespace-nowrap">Parent Reviews</a>
            <a href="#admissions" className="hover:text-blue-600 transition-colors whitespace-nowrap">Admissions</a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenTour()}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 border-b-2 border-yellow-400"
            >
              Book an Observation
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="pt-12 pb-20 border-b border-slate-200 bg-gradient-to-b from-blue-50/40 via-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                <span>Self-Directed Sensory Learning in Camrose</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-slate-950 leading-[1.12] text-balance">
                Education is a natural process <span className="font-black text-blue-700">spontaneously acquired</span> through touch, order, and play.
              </h1>

              <p className="text-base text-slate-600 max-w-xl leading-relaxed font-normal">
                Children thrive when given ordered, natural materials to touch, investigate, and master. Supporting working Camrose families with extended licensed care from 6:00 AM to 6:30 PM.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenTour()}
                  className="px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center justify-center gap-2 border-2 border-yellow-300"
                >
                  <span>Schedule Classroom Tour</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenSubsidy}
                  className="px-6 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-xs"
                >
                  <span>Alberta Subsidy Calculator</span>
                </motion.button>
              </div>

              {/* Data Strip in Primary Colors */}
              <div className="pt-8 border-t border-slate-200 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <p className="text-2xl font-black text-blue-700 tabular-nums">0 – 12</p>
                  <p className="text-xs text-slate-500 font-bold">Age continuum</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-red-600 tabular-nums">12.5 hrs</p>
                  <p className="text-xs text-slate-500 font-bold">Daily extended care</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-amber-500 tabular-nums">100%</p>
                  <p className="text-xs text-slate-500 font-bold">Certified educators</p>
                </div>
              </div>
            </motion.div>

            {/* Right Large Editorial Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="relative border-4 border-white bg-white p-3 rounded-2xl shadow-xl">
                <div className="aspect-[4/5] overflow-hidden rounded-xl relative">
                  <img
                    src={IMAGES.montessoriActivity}
                    alt="Child concentrating on wooden Montessori geometric sorting board"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black shadow-md">
                    Montessori Self-Direction
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl mt-3 flex items-center justify-between text-xs text-slate-700">
                  <span className="font-bold">Autonomous Sensory Activity</span>
                  <span className="font-black text-blue-700">Early Learning Studio</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Montessori Pillars Section */}
      <section id="pedagogy" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-blue-700 font-black">Educational Pedagogy</span>
            <h2 className="text-3xl font-bold text-slate-950 mt-1">Four Foundations of the Prepared Environment</h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              Every detail is structured to cultivate concentration, coordination, independence, and social grace.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Pillar Buttons */}
            <div className="lg:col-span-5 space-y-2">
              {montessoriPillars.map((pillar, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePrinciple(idx)}
                  className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                    activePrinciple === idx
                      ? `${pillar.color} bg-blue-50/50 shadow-sm`
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Pillar 0{idx + 1}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${pillar.badge}`}>
                      Montessori
                    </span>
                  </div>
                  <p className="text-base font-black text-slate-950 mt-1">{pillar.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{pillar.subtitle}</p>
                </button>
              ))}
            </div>

            {/* Pillar Details Card */}
            <motion.div
              key={activePrinciple}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 bg-slate-50 border-2 border-slate-200 rounded-2xl p-8 space-y-6"
            >
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-blue-700">Pillar Details</span>
                <h3 className="text-2xl font-black text-slate-950 mt-1">
                  {montessoriPillars[activePrinciple].title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                {montessoriPillars[activePrinciple].desc}
              </p>

              <div className="p-5 bg-white border-l-4 border-red-600 rounded-r-xl shadow-xs">
                <p className="text-xs italic text-slate-800 leading-relaxed font-medium">
                  "{montessoriPillars[activePrinciple].quote}"
                </p>
                <p className="text-[11px] font-bold text-slate-500 mt-2 uppercase tracking-wider">
                  — Maria Montessori
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenTour()}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-lg transition-colors"
                >
                  Observe This in Person
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Classrooms */}
      <section id="curriculum" className="py-20 border-b border-slate-200 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-red-600 font-black">Developmental Levels</span>
            <h2 className="text-3xl font-bold text-slate-950 mt-1">Prepared Learning Environments</h2>
            <p className="text-sm text-slate-600 mt-2 font-medium">
              Sensitive periods for movement, language, order, and social community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DAYCARE_PROGRAMS.map((prog) => (
              <motion.div
                key={prog.id}
                whileHover={{ y: -5 }}
                className="bg-white border-2 border-slate-200 hover:border-blue-600 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs transition-colors"
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
                    <div className="absolute top-2 left-2 bg-yellow-400 text-slate-950 px-2.5 py-0.5 text-[11px] font-black rounded-md">
                      {prog.ageRange}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-black text-base text-slate-950">{prog.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{prog.description}</p>
                    <div className="pt-3 border-t border-slate-100 space-y-1">
                      {prog.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700 font-bold">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onOpenTour(prog.id)}
                    className="w-full py-2 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold rounded-lg transition-colors"
                  >
                    View Program Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Children's Creative Exhibition: 3D Rolling Poster Gallery */}
      <RollingPosterGallery />

      {/* Admissions & CTA in Red, Blue, Yellow */}
      <section id="admissions" className="py-20 bg-blue-700 text-white text-center border-t-4 border-yellow-400">
        <div className="max-w-5xl mx-auto px-6 space-y-6">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-300">
            Admissions & Enrollment
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Schedule an observation visit to see purposeful learning in motion.
          </h2>
          <p className="text-sm text-blue-100 max-w-lg mx-auto font-medium">
            We invite prospective parents to sit quietly in our classrooms, observe children engaging with materials, and learn how provincial grants reduce your costs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenTour()}
              className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-lg transition-colors border-2 border-yellow-300 shadow-lg"
            >
              Book In-Person Observation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSubsidy}
              className="w-full sm:w-auto px-7 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg transition-colors shadow-md"
            >
              Calculate Alberta Fee Subsidy
            </motion.button>
          </div>

          <p className="text-xs text-blue-200 pt-4 font-semibold">
            Camrose Little Angels Daycare Society · {BUSINESS_INFO.address} · {BUSINESS_INFO.phone}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white font-bold">Camrose Care · Little Angels Daycare Society</p>
          <div className="flex gap-6 font-bold">
            <a href="#pedagogy" className="hover:text-white">Philosophy</a>
            <a href="#curriculum" className="hover:text-white">Classrooms</a>
            <a href="#voices" className="hover:text-white">Reviews</a>
            <button onClick={() => onOpenTour()} className="text-yellow-400 hover:text-white">Admissions</button>
          </div>
          <p>© {new Date().getFullYear()} Camrose Care. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
