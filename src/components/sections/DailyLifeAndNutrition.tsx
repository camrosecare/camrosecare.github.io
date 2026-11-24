import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import {
  Clock,
  Utensils,
  Bus,
  Apple,
  Sparkles,
  Sun,
  Moon,
  Heart,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const routineSlideVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? 48 : -48,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? -48 : 48,
    opacity: 0
  })
};

export const DailyLifeAndNutrition: React.FC<{ onOpenTour: () => void }> = ({ onOpenTour }) => {
  const [activeTab, setActiveTab] = useState<'routine' | 'meals' | 'bus'>('routine');
  const [selectedDay, setSelectedDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('Mon');
  const [routineIndex, setRoutineIndex] = useState(0);
  const [routineDirection, setRoutineDirection] = useState(1);

  const routines = [
    {
      time: '6:00 AM – 8:30 AM',
      shortTime: '6:00 AM',
      accent: 'yellow' as const,
      title: 'Early Shift Arrival & Gentle Welcome',
      icon: Sun,
      color: 'bg-amber-100 text-amber-800 border-amber-300',
      desc: 'Early morning drop-off designed for hospital, emergency, and shift workers. Soft music, warm hugs, cozy reading nooks, and morning breakfast snack.'
    },
    {
      time: '8:30 AM – 9:15 AM',
      shortTime: '8:30 AM',
      accent: 'blue' as const,
      title: 'Morning Gathering & Circle Time',
      icon: Sparkles,
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      desc: 'Songs, calendar and weather check, shared storybooks, and social-emotional check-in to build classroom connection.'
    },
    {
      time: '9:15 AM – 11:30 AM',
      shortTime: '9:15 AM',
      accent: 'blue' as const,
      title: 'Play-Based Discovery & Outdoor Recess',
      icon: Heart,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      desc: 'Hands-on sensory exploration, creative easel art, block engineering, and active play in our fenced outdoor cedar playground with fresh Alberta air.'
    },
    {
      time: '11:30 AM – 12:30 PM',
      shortTime: '11:30 AM',
      accent: 'red' as const,
      title: 'Hot Fresh Lunch & Family-Style Dining',
      icon: Utensils,
      color: 'bg-red-100 text-red-800 border-red-300',
      desc: 'Nutritious hot meal prepared on-site following Canada’s Food Guide. Children practice table manners, pouring water, and joyful conversational skills.'
    },
    {
      time: '12:30 PM – 2:30 PM',
      shortTime: '12:30 PM',
      accent: 'blue' as const,
      title: 'Rest, Naptime & Calm Rejuvenation',
      icon: Moon,
      color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      desc: 'Individual assigned cots with soft blankets, gentle white noise, or quiet table activities (puzzles & books) for non-napping older children.'
    },
    {
      time: '2:30 PM – 3:30 PM',
      shortTime: '2:30 PM',
      accent: 'yellow' as const,
      title: 'Afternoon Wholesome Snack & Story Studio',
      icon: Apple,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      desc: 'Fresh fruit platters, whole-grain snacks, milk/water, and teacher-led interactive literacy storytelling.'
    },
    {
      time: '3:30 PM – 6:30 PM',
      shortTime: '3:30 PM',
      accent: 'red' as const,
      title: 'Afternoon STEM Exploration & Extended Pick-Up',
      icon: Clock,
      color: 'bg-purple-100 text-purple-800 border-purple-300',
      desc: 'Indoor maker stations, sensory sand & water tables, music games, and peaceful flexible departures until 6:30 PM.'
    }
  ];

  const routineAccentStyles = {
    blue: {
      cardBorder: 'border-blue-300',
      iconBg: 'bg-blue-700 text-white shadow-blue-200',
      activePill: 'bg-blue-700 text-white border-blue-800 shadow-xs',
      activeDot: 'bg-white'
    },
    red: {
      cardBorder: 'border-red-300',
      iconBg: 'bg-red-600 text-white shadow-red-200',
      activePill: 'bg-red-600 text-white border-red-700 shadow-xs',
      activeDot: 'bg-white'
    },
    yellow: {
      cardBorder: 'border-amber-400',
      iconBg: 'bg-amber-500 text-slate-950 shadow-amber-200',
      activePill: 'bg-amber-400 text-slate-950 border-amber-500 shadow-xs',
      activeDot: 'bg-slate-950'
    }
  };

  const totalRoutines = routines.length;
  const activeRoutine = routines[routineIndex];
  const ActiveRoutineIcon = activeRoutine.icon;
  const activeRoutineStyle = routineAccentStyles[activeRoutine.accent];

  const goToRoutine = (nextIndex: number) => {
    const wrapped = (nextIndex + totalRoutines) % totalRoutines;
    if (wrapped === routineIndex) return;
    setRoutineDirection(
      nextIndex > routineIndex || (routineIndex === totalRoutines - 1 && nextIndex === 0) ? 1 : -1
    );
    setRoutineIndex(wrapped);
  };

  const handleRoutineNext = () => {
    setRoutineDirection(1);
    setRoutineIndex((prev) => (prev + 1) % totalRoutines);
  };

  const handleRoutinePrev = () => {
    setRoutineDirection(-1);
    setRoutineIndex((prev) => (prev - 1 + totalRoutines) % totalRoutines);
  };

  const handleRoutineDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -45 || info.velocity.x < -320) {
      handleRoutineNext();
    } else if (info.offset.x > 45 || info.velocity.x > 320) {
      handleRoutinePrev();
    }
  };

  const handleRoutineKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleRoutineNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleRoutinePrev();
    }
  };

  const menuSchedule: Record<string, { breakfast: string; lunch: string; snack: string; fruit: string }> = {
    Mon: {
      breakfast: 'Whole-grain oatmeal with cinnamon and milk',
      lunch: 'Homemade turkey shepherd’s pie with sweet corn & peas',
      snack: 'Whole wheat crackers with mild cheddar cheese cubes',
      fruit: 'Crisp apple wedges & banana slices'
    },
    Tue: {
      breakfast: 'Warm whole wheat berry pancakes with fruit puree',
      lunch: 'Baked rainbow rotini pasta with lean beef & garden marinara',
      snack: 'Vanilla Greek yogurt with crushed oats',
      fruit: 'Fresh strawberries & orange wheels'
    },
    Wed: {
      breakfast: 'Toasted whole grain bagels with natural cream cheese',
      lunch: 'Tender chicken and vegetable fried rice with steamed broccoli',
      snack: 'Homemade carrot zucchini mini-muffins',
      fruit: 'Fresh sliced cantaloupe & blueberries'
    },
    Thu: {
      breakfast: 'Multi-grain cheerios with calcium-fortified milk',
      lunch: 'Creamy sweet potato & lentil soup with warm soft pita',
      snack: 'Hummus dip with cucumber coins & sweet bell peppers',
      fruit: 'Juicy pear slices & honeydew melon'
    },
    Fri: {
      breakfast: 'Scrambled eggs with whole grain toast strips',
      lunch: 'Mild cheese quesadillas with homemade avocado dip & black beans',
      snack: 'Crispy rice crackers with sunflower butter',
      fruit: 'Watermelon triangles & seedless grapes'
    }
  };

  return (
    <section id="daily-life" className="py-20 lg:py-24 bg-gradient-to-b from-white via-blue-50/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-600 tracking-tight">
            Predictable Routines. <span className="text-red-600">Scratch-Cooked Meals</span>. Safe Transport.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            From early 6:00 AM drop-offs to nutritious family-style lunches and safe school bus transportation, our days are structured to support healthy child development and give parents peace of mind.
          </p>

          {/* Interactive Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 pt-4">
            <button
              onClick={() => setActiveTab('routine')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black transition-all ${
                activeTab === 'routine'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Daily Routine (6:00 AM – 6:30 PM)</span>
            </button>
            <button
              onClick={() => setActiveTab('meals')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black transition-all ${
                activeTab === 'meals'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Fresh Nutrition & Menu</span>
            </button>
            <button
              onClick={() => setActiveTab('bus')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black transition-all ${
                activeTab === 'bus'
                  ? 'bg-yellow-400 text-slate-950 shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Bus className="w-4 h-4" />
              <span>School Bus & Transit</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Swipeable Daily Routine Card Deck */}
        {activeTab === 'routine' && (
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Daily Routine Schedule (6:00 AM to 6:30 PM)"
            tabIndex={0}
            onKeyDown={handleRoutineKeyDown}
            className="max-w-4xl mx-auto outline-none focus-visible:ring-3 focus-visible:ring-blue-500 rounded-3xl"
          >
            <div
              className={`bg-white rounded-3xl border-2 ${activeRoutineStyle.cardBorder} shadow-xl overflow-hidden transition-colors duration-300`}
            >
              {/* Top Control Bar */}
              <div className="px-4 sm:px-6 py-3 bg-slate-50/90 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`text-[11px] font-black uppercase px-3 py-1 rounded-full border shrink-0 ${activeRoutine.color}`}
                  >
                    {activeRoutine.time}
                  </span>
                  <span className="hidden sm:inline text-[11px] font-semibold text-slate-400 truncate">
                    Swipe, drag, or use arrows
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-auto">
                  <span
                    aria-live="polite"
                    className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-black text-slate-700 tabular-nums shadow-2xs"
                  >
                    {routineIndex + 1} / {totalRoutines}
                  </span>

                  <button
                    type="button"
                    onClick={handleRoutinePrev}
                    aria-label="Previous daily routine time block"
                    title="Previous time block"
                    className="w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleRoutineNext}
                    aria-label="Next daily routine time block"
                    title="Next time block"
                    className="w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-blue-700 hover:bg-blue-600 border border-blue-800 text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Swipeable Schedule Stage */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" custom={routineDirection} initial={false}>
                  <motion.div
                    key={activeRoutine.time}
                    custom={routineDirection}
                    variants={routineSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.22}
                    dragMomentum={false}
                    onDragEnd={handleRoutineDragEnd}
                    className="p-5 sm:p-8 cursor-grab active:cursor-grabbing touch-pan-y"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${activeRoutineStyle.iconBg}`}
                      >
                        <ActiveRoutineIcon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-3">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug">
                          {activeRoutine.title}
                        </h3>

                        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                          {activeRoutine.desc}
                        </p>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Certified ECE Supervised</span>
                          </div>
                          <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                            Mon–Fri Daily Rhythm
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Clickable Time-Pill & Dot Navigation */}
              <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-50/85 border-t border-slate-200/80 flex items-center justify-between gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleRoutinePrev}
                  className="text-xs font-bold text-slate-600 hover:text-blue-700 inline-flex items-center gap-1 py-2 px-1 -my-1.5 sm:py-0 sm:px-0 sm:my-0 min-h-[40px] sm:min-h-0 transition-colors cursor-pointer shrink-0"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <div
                  className="flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap"
                  role="tablist"
                  aria-label="Jump to daily routine time block"
                >
                  {routines.map((r, idx) => {
                    const isActive = idx === routineIndex;
                    return (
                      <button
                        key={r.time}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`${r.time}: ${r.title}`}
                        title={`${r.time} — ${r.title}`}
                        onClick={() => goToRoutine(idx)}
                        className={`inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-2.5 py-2 sm:py-1 min-h-[34px] sm:min-h-0 rounded-full border text-[10px] sm:text-[11px] font-black transition-all cursor-pointer ${
                          isActive
                            ? activeRoutineStyle.activePill
                            : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isActive ? activeRoutineStyle.activeDot : 'bg-slate-400'
                          }`}
                        />
                        <span className="hidden md:inline whitespace-nowrap">{r.shortTime}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleRoutineNext}
                  className="text-xs font-bold text-slate-600 hover:text-blue-700 inline-flex items-center gap-1 py-2 px-1 -my-1.5 sm:py-0 sm:px-0 sm:my-0 min-h-[40px] sm:min-h-0 transition-colors cursor-pointer shrink-0"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Fresh Nutrition & Menu */}
        {activeTab === 'meals' && (
          <div className="bg-white rounded-3xl border-3 border-red-100 shadow-xl overflow-hidden p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="text-xs font-black uppercase text-red-600 tracking-wider">
                  Canada’s Food Guide Aligned
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                  Cooked Fresh In-House Daily.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  We prepare balanced, dietitian-approved meals made from scratch in our inspected commercial kitchen. Meals feature whole grains, colorful fresh fruits and vegetables, and rich plant and animal proteins.
                </p>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Nut-Aware & Allergy-Safe Facility</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Gluten, Dairy, and Vegetarian Options Available</span>
                  </div>
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Filtered Drinking Water & Milk with Every Meal</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenTour}
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-md transition-all border-2 border-yellow-300 cursor-pointer"
                  >
                    Book a Tour
                  </button>
                </div>
              </div>

              {/* Day-by-Day Interactive Menu Selector */}
              <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border-2 border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
                  <h4 className="font-black text-sm text-slate-900">Sample Weekly Menu Plan:</h4>
                  <div className="flex gap-1.5">
                    {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const).map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                          selectedDay === day
                            ? 'bg-red-600 text-white shadow-sm'
                            : 'bg-white text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedDay}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Sun className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-amber-800 uppercase">Morning Snack (8:30 AM)</span>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">{menuSchedule[selectedDay].breakfast}</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-red-200 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                        <Utensils className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-red-700 uppercase">Hot Cooked Lunch (11:30 AM)</span>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">{menuSchedule[selectedDay].lunch}</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                        <Apple className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-blue-700 uppercase">Afternoon Snack & Fruit (3:00 PM)</span>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">
                          {menuSchedule[selectedDay].snack} · {menuSchedule[selectedDay].fruit}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Daycare School Bus & Transportation Add-On */}
        {activeTab === 'bus' && (
          <div className="bg-white rounded-3xl border-3 border-yellow-300 shadow-xl p-6 sm:p-10 space-y-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-black uppercase text-amber-600 tracking-wider">
                Optional $50/Month Transportation Add-On
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                Our Own School Bus Serving All Camrose Schools
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Camrose Little Angels Daycare has its own dedicated school bus and offers transportation as an optional add-on for $50/month between all schools inside Camrose and the daycare.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'Own Daycare School Bus', grades: 'Camrose Care Fleet', type: 'Operated directly by our daycare' },
                { name: '$50 / Month Add-On', grades: 'Optional Service', type: 'Between school & daycare' },
                { name: 'All Schools Inside Camrose', grades: 'City-Wide Coverage', type: 'Elementary & Kindergarten routes' },
                { name: 'Safe Supervised Trips', grades: 'Morning & After School', type: 'Trusted drop-off & pick-up' }
              ].map((sch, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="w-7 h-7 rounded-lg bg-yellow-400 text-slate-950 flex items-center justify-center mb-2">
                    <Bus className="w-4 h-4" />
                  </div>
                  <h4 className="font-black text-xs text-slate-900">{sch.name}</h4>
                  <p className="text-[11px] text-blue-700 font-bold">{sch.grades}</p>
                  <p className="text-[10px] text-slate-500">{sch.type}</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between gap-4 flex-wrap">
              <div className="space-y-0.5">
                <h5 className="font-black text-xs text-blue-950">Need school bus transportation this term?</h5>
                <p className="text-xs text-blue-800">Add our daycare school bus for $50/month between any school in Camrose and our centre.</p>
              </div>
              <button
                onClick={onOpenTour}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                Book a Tour
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
