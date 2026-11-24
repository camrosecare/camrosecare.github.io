import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  Utensils,
  Lock,
  Handshake,
  ChevronLeft,
  ChevronRight,
  Compass,
  Dumbbell
} from 'lucide-react';
import { CORE_FEATURES } from '../../data/daycareData';
import { ReggioEmiliaSubsection } from '../philosophy/ReggioEmiliaSubsection';

const WHY_CHOOSE_FEATURES = [
  ...CORE_FEATURES,
  {
    tag: 'Active Indoor Play',
    title: 'Indoor Gym for Kids',
    description:
      'A spacious, soft-cushioned indoor gymnasium built for year-round gross motor play, climbing, balance, and active movement, keeping children energized and healthy through every Alberta season.'
  }
];

const featureSlideVariants = {
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

const FEATURE_VISUALS: Array<{
  icon: React.ComponentType<{ className?: string }>;
  accent: 'blue' | 'red' | 'yellow';
}> = [
  { icon: ShieldCheck, accent: 'blue' },
  { icon: Clock, accent: 'red' },
  { icon: Award, accent: 'yellow' },
  { icon: Utensils, accent: 'blue' },
  { icon: Lock, accent: 'red' },
  { icon: Handshake, accent: 'yellow' },
  { icon: Dumbbell, accent: 'blue' }
];

const ACCENT_STYLES: Record<
  'blue' | 'red' | 'yellow',
  {
    cardBorder: string;
    iconBg: string;
    tagBadge: string;
    activeDot: string;
  }
> = {
  blue: {
    cardBorder: 'border-blue-300',
    iconBg: 'bg-blue-700 text-white shadow-blue-200',
    tagBadge: 'bg-blue-50 text-blue-800 border-blue-200',
    activeDot: 'bg-blue-700 w-7'
  },
  red: {
    cardBorder: 'border-red-300',
    iconBg: 'bg-red-600 text-white shadow-red-200',
    tagBadge: 'bg-red-50 text-red-700 border-red-200',
    activeDot: 'bg-red-600 w-7'
  },
  yellow: {
    cardBorder: 'border-amber-400',
    iconBg: 'bg-amber-500 text-slate-950 shadow-amber-200',
    tagBadge: 'bg-amber-50 text-amber-900 border-amber-300',
    activeDot: 'bg-amber-500 w-7'
  }
};

export const WhyChooseLittleAngelsCarousel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'why' | 'reggio'>('why');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const totalSlides = WHY_CHOOSE_FEATURES.length;
  const activeFeature = WHY_CHOOSE_FEATURES[currentIndex];
  const visual = FEATURE_VISUALS[currentIndex % FEATURE_VISUALS.length];
  const style = ACCENT_STYLES[visual.accent];
  const Icon = visual.icon;

  const goToSlide = (nextIndex: number) => {
    const wrapped = (nextIndex + totalSlides) % totalSlides;
    if (wrapped === currentIndex) return;
    setDirection(
      nextIndex > currentIndex || (currentIndex === totalSlides - 1 && nextIndex === 0) ? 1 : -1
    );
    setCurrentIndex(wrapped);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -45 || info.velocity.x < -320) {
      handleNext();
    } else if (info.offset.x > 45 || info.velocity.x > 320) {
      handlePrev();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    }
  };

  return (
    <section id="features" className="py-16 lg:py-20 bg-blue-50/50 border-y-2 border-blue-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-600 tracking-tight">
            Why Camrose Families <span className="text-blue-600">Choose Little Angels</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            We provide a safe and nurturing sanctuary that supports children’s growth, self-confidence, and a lifelong love for learning.
          </p>

          {/* 2-Tab Switcher */}
          <div className="flex flex-wrap justify-center gap-2.5 pt-4" role="tablist" aria-label="Choose section view">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'why'}
              onClick={() => setActiveTab('why')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeTab === 'why'
                  ? 'bg-blue-700 text-white shadow-md border-2 border-blue-800'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 ${activeTab === 'why' ? 'text-yellow-300' : 'text-blue-700'}`} />
              <span>Why Families Choose Us</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'reggio'}
              onClick={() => setActiveTab('reggio')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeTab === 'reggio'
                  ? 'bg-red-600 text-white shadow-md border-2 border-yellow-300'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border-2 border-slate-200'
              }`}
            >
              <Compass className={`w-4 h-4 ${activeTab === 'reggio' ? 'text-yellow-300' : 'text-red-600'}`} />
              <span>Our Reggio Emilia Approach (Ages 3–6)</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Why Families Choose Us (7-Slide Swipeable Carousel) */}
        {activeTab === 'why' && (
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Why Camrose Families Choose Little Angels"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="max-w-4xl mx-auto outline-none focus-visible:ring-3 focus-visible:ring-blue-500 rounded-3xl"
          >
            <div
              className={`bg-white rounded-3xl border-2 ${style.cardBorder} shadow-xl overflow-hidden transition-colors duration-300`}
            >
              <div className="px-4 sm:px-6 py-3 bg-slate-50/90 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shrink-0 ${style.tagBadge}`}
                  >
                    {activeFeature.tag}
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
                    {currentIndex + 1} / {totalSlides}
                  </span>

                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous reason"
                    title="Previous reason"
                    className="w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next reason"
                    title="Next reason"
                    className="w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-blue-700 hover:bg-blue-600 border border-blue-800 text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction} initial={false}>
                  <motion.div
                    key={activeFeature.title}
                    custom={direction}
                    variants={featureSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.22}
                    dragMomentum={false}
                    onDragEnd={handleDragEnd}
                    className="p-5 sm:p-8 cursor-grab active:cursor-grabbing touch-pan-y"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${style.iconBg}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0 space-y-3">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug">
                          {activeFeature.title}
                        </h3>

                        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                          {activeFeature.description}
                        </p>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            <span>Verified Standard</span>
                          </div>
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            {activeFeature.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-50/85 border-t border-slate-200/80 flex items-center justify-between gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="text-xs font-bold text-slate-600 hover:text-blue-700 inline-flex items-center gap-1 py-2 px-1 -my-1.5 sm:py-0 sm:px-0 sm:my-0 min-h-[40px] sm:min-h-0 transition-colors cursor-pointer shrink-0"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                <div
                  className="flex items-center gap-0.5 sm:gap-1.5"
                  role="tablist"
                  aria-label="Choose verified standard slide"
                >
                  {WHY_CHOOSE_FEATURES.map((feat, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={feat.title}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Slide ${idx + 1}: ${feat.title}`}
                        title={feat.title}
                        onClick={() => goToSlide(idx)}
                        className="min-w-[24px] min-h-[38px] sm:min-w-0 sm:min-h-0 flex items-center justify-center cursor-pointer"
                      >
                        <span
                          className={`block h-2.5 rounded-full transition-all duration-200 ${
                            isActive ? style.activeDot : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="text-xs font-bold text-slate-600 hover:text-blue-700 inline-flex items-center gap-1 py-2 px-1 -my-1.5 sm:py-0 sm:px-0 sm:my-0 min-h-[40px] sm:min-h-0 transition-colors cursor-pointer shrink-0"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Our Reggio Emilia Approach (7-Slide Swipeable Billboard) */}
        {activeTab === 'reggio' && <ReggioEmiliaSubsection />}
      </div>
    </section>
  );
};
