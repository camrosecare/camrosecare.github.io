import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sun,
  Smile,
  Heart,
  Palette,
  BookOpen,
  Music,
  Phone,
  Check,
  Compass,
  Volume2
} from 'lucide-react';
import { BUSINESS_INFO, DAYCARE_PROGRAMS, IMAGES } from '../../data/daycareData';
import { RollingPosterGallery } from '../gallery/RollingPosterGallery';
import { AnimatedLittleAngelsLogo } from '../common/AnimatedLittleAngelsLogo';

interface ConceptProps {
  onOpenTour: (programId?: string) => void;
  onOpenSubsidy: () => void;
}

export const ConceptB_PlayfulCreative: React.FC<ConceptProps> = ({ onOpenTour, onOpenSubsidy }) => {
  const [selectedAgeBadge, setSelectedAgeBadge] = useState<string>('all');
  const [babyMessage, setBabyMessage] = useState("Hello! I love you! ❤️ Welcome to Camrose Care!");

  const dailySchedule = [
    { time: '6:00 AM – 8:30 AM', title: 'Welcoming Hugs & Breakfast Snacks', icon: Sun, color: 'bg-yellow-400 text-slate-950', desc: 'Warm morning greetings, cuddles, storybooks, and healthy breakfast snacks.' },
    { time: '8:45 AM – 10:15 AM', title: 'Circle Time & Finger Painting', icon: Palette, color: 'bg-red-600 text-white', desc: 'Watercolors, sensory loose-parts, musical rhymes, and language adventures.' },
    { time: '10:30 AM – 11:45 AM', title: 'Fenced Nature Play Yard', icon: Compass, color: 'bg-blue-600 text-white', desc: 'Cedar playhouses, sandbox castles, trikes, and fresh Alberta morning air.' },
    { time: '12:00 PM – 1:00 PM', title: 'Hot Nutritious Lunch & Tales', icon: Heart, color: 'bg-yellow-400 text-slate-950', desc: 'Balanced hot meals prepared on-site, followed by calming hand-washing.' },
    { time: '1:00 PM – 3:00 PM', title: 'Restful Sleep & Sweet Dreams', icon: BookOpen, color: 'bg-blue-600 text-white', desc: 'Soft lullabies, dim cozy lighting, and dedicated individual nap cots.' },
    { time: '3:30 PM – 6:30 PM', title: 'Afternoon Blocks & Parent Pickup', icon: Music, color: 'bg-red-600 text-white', desc: 'Afternoon fruit snacks, STEM building, puzzles, and happy reunions.' }
  ];

  const filteredPrograms = selectedAgeBadge === 'all'
    ? DAYCARE_PROGRAMS
    : DAYCARE_PROGRAMS.filter(p => p.id === selectedAgeBadge);

  const speakGreeting = () => {
    try {
      const audio = new Audio('/audio/baby_greeting.mp3');
      audio.volume = 1.0;
      audio.play().catch(() => {});
    } catch {}
    setBabyMessage("Hello! I love you! 💕 We have hot snacks and lots of blocks ready!");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-outfit selection:bg-yellow-300 selection:text-slate-950 overflow-x-hidden">
      {/* Top Cheerful Strip */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-blue-600 text-white text-xs py-2 px-4 border-b-2 border-yellow-400"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold">
            <span className="bg-yellow-400 text-slate-950 px-2.5 py-0.5 rounded-full text-[11px] font-black">Camrose, AB</span>
            <span>🌈 Primary Play-Based Care from 6:00 AM to 6:30 PM (Ages 0 to 12)</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold">
            <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-yellow-300 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-yellow-300" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Cheerful Navigation - Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-2 border-slate-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          {/* Zone 1: Animated Little Angels Logo with Motion, Glitter & Welcome Voice */}
          <div className="shrink-0">
            <AnimatedLittleAngelsLogo showSoundButton={true} />
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700">
            <a href="#our-heart" className="hover:text-blue-600 transition-colors whitespace-nowrap">Our Mission</a>
            <a href="#programs-hub" className="hover:text-blue-600 transition-colors whitespace-nowrap">Playrooms (0–12y)</a>
            <a href="#daily-flow" className="hover:text-blue-600 transition-colors whitespace-nowrap">Daily Schedule</a>
            <a href="#why-us" className="hover:text-blue-600 transition-colors whitespace-nowrap">Why Families Love Us</a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors whitespace-nowrap">Parent Reviews</a>
          </nav>

          {/* Zone 3: Primary Action in Cherry Red */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenTour()}
              className="px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-full transition-all shadow-md whitespace-nowrap shrink-0 flex items-center gap-1.5 border-2 border-yellow-300"
            >
              <span>Book a Visit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Hero Section with Welcoming Baby & Animated Shapes */}
      <section id="hero" className="relative pt-10 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-amber-50/30">
        <div className="max-w-7xl mx-auto px-6">
          {/* Baby Leo Greeting Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-white rounded-3xl border-3 border-yellow-400 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3 text-center sm:text-left">
              <motion.div
                onClick={speakGreeting}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: [0, 15, -10, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-blue-600 shrink-0 cursor-pointer shadow-md"
                title="Click me to wave and say I love you!"
              >
                <img src={IMAGES.realBabyWaving} alt="Real Baby Leo" className="w-full h-full object-cover" />
              </motion.div>
              <div>
                <p className="text-xs font-black text-blue-700 uppercase tracking-wider">Baby Leo Says Hello! 👋</p>
                <p className="text-sm font-bold text-slate-800">"{babyMessage}"</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={speakGreeting}
              className="px-3.5 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 shrink-0"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Say Hello!</span>
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Headline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-yellow-400 text-slate-950 rounded-full text-xs font-black shadow-xs">
                <Smile className="w-4 h-4 text-red-600" />
                <span>Alberta Regulated Daycare Society</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08] text-balance">
                Big smiles, safe cuddles, and joyful play in{' '}
                <span className="text-red-600 underline decoration-yellow-400 decoration-wavy">
                  red, blue & yellow!
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-medium leading-relaxed">
                Camrose Little Angels Daycare Society is a loving hub of friendship and creative discovery. We nurture infants, toddlers, preschoolers, and school kids with hot meals, certified educators, and spacious play yards.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenTour()}
                  className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 border-2 border-yellow-300"
                >
                  <span>Come Play! Book a Tour</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenSubsidy}
                  className="px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Check Alberta Grants & Fees</span>
                </motion.button>
              </div>

              {/* Quick Feature Badges in Primary Colors */}
              <div className="pt-4 flex flex-wrap gap-2.5">
                {[
                  '🥣 Fresh Hot Lunches Included',
                  '⏰ 6:00 AM Early Bird Drop-Off',
                  '🌳 Fenced Nature Play Yard',
                  '🎓 Level 1, 2 & 3 Certified ECE'
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border-2 border-blue-100 text-blue-900 shadow-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right Playful Image Stack */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-3 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-600 rounded-[2.5rem] transform -rotate-1 blur-xs"></div>

                <div className="relative bg-white p-3 rounded-[2rem] shadow-xl border-4 border-white">
                  <div className="rounded-[1.6rem] overflow-hidden aspect-[4/3] relative">
                    <img
                      src={IMAGES.outdoorPlay}
                      alt="Children playing outdoors"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-2xl mt-3 flex items-center justify-between border border-yellow-200">
                    <div>
                      <p className="font-black text-xs text-slate-900 uppercase tracking-wider">Play-Based Learning</p>
                      <p className="text-xs text-slate-600 font-semibold">Safe outdoor discovery grounds in Camrose</p>
                    </div>
                    <span className="text-2xl">🌱</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Hub with Age Filters */}
      <section id="programs-hub" className="py-20 bg-slate-50 border-y-2 border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-black tracking-widest text-red-600">Active Playrooms</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mt-1">Our Age-Specific Rooms</h2>
              <p className="text-sm text-slate-600 mt-1 font-medium">Carefully designed developmental spaces from 0 months to 12 years.</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border-2 border-slate-200 shadow-xs overflow-x-auto">
              <button
                onClick={() => setSelectedAgeBadge('all')}
                className={`px-3 py-1.5 text-xs font-black rounded-xl transition-colors whitespace-nowrap ${
                  selectedAgeBadge === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Ages
              </button>
              {DAYCARE_PROGRAMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedAgeBadge(p.id)}
                  className={`px-3 py-1.5 text-xs font-black rounded-xl transition-colors whitespace-nowrap ${
                    selectedAgeBadge === p.id ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPrograms.map((prog) => (
              <motion.div
                key={prog.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl border-2 border-slate-200 hover:border-yellow-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="h-44 relative overflow-hidden">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-yellow-400 text-slate-950 px-3 py-1 rounded-full text-[11px] font-black shadow-sm">
                      {prog.ageRange}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-black text-lg text-slate-950">{prog.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">{prog.description}</p>
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      {prog.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-bold">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onOpenTour(prog.id)}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Inquire for {prog.title.split(' ')[0]}</span>
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

      {/* Daily Flow in Primary Colors */}
      <section id="daily-flow" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs uppercase font-black tracking-widest text-blue-700">Daily Adventure</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950">A Day in the Life of a Little Angel</h2>
            <p className="text-sm text-slate-600 font-medium">
              Predictable, joyful rhythms give children security and independence while nurturing spontaneous creativity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailySchedule.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-3xl bg-slate-50 border-2 border-slate-200/80 hover:bg-white hover:border-yellow-400 hover:shadow-lg transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-900 bg-blue-100 px-3 py-1 rounded-full">
                      {item.time}
                    </span>
                    <div className={`p-2 rounded-xl ${item.color}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-black text-slate-950">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cheerful Call-to-Action in Primary Red, Blue, Yellow */}
      <section className="py-16 bg-gradient-to-r from-red-600 via-blue-600 to-yellow-500 text-white border-t-4 border-yellow-300">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white drop-shadow-sm">
            Ready to give your child their happiest days?
          </h2>
          <p className="text-base text-white/95 max-w-xl mx-auto font-bold">
            Spots fill up quickly each season. Book an in-person visit to walk the playrooms, test the toys, and meet our educators!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onOpenTour()}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition-transform"
            >
              Book an In-Person Tour Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSubsidy}
              className="w-full sm:w-auto px-7 py-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm rounded-2xl shadow-md"
            >
              See Your Alberta Subsidized Cost
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-xs border-t-2 border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-white text-sm">Camrose Little Angels Care</p>
            <p className="text-[11px] text-slate-500">{BUSINESS_INFO.legalName}</p>
          </div>
          <div className="flex items-center gap-6 font-bold">
            <a href="#our-heart" className="hover:text-white transition-colors">Mission</a>
            <a href="#programs-hub" className="hover:text-white transition-colors">Programs</a>
            <a href="#daily-flow" className="hover:text-white transition-colors">Schedule</a>
            <button onClick={() => onOpenTour()} className="text-yellow-400 hover:text-white transition-colors">Tour</button>
          </div>
          <p className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} Camrose Care. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
