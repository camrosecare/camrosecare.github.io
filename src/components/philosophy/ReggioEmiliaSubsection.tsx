import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import {
  Sparkles,
  Palette,
  Users,
  Sprout,
  Handshake,
  Layers,
  Puzzle,
  Quote,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ReggioSlide {
  id: string;
  badgeLabel: string;
  title: string;
  ageTag?: string;
  description: string;
  quote?: {
    text: string;
    attribution: string;
  };
  classroomPractice: string;
  zones?: string[];
  accent: 'blue' | 'red' | 'yellow';
  icon: React.ComponentType<{ className?: string }>;
}

const REGGIO_SLIDES: ReggioSlide[] = [
  {
    id: 'foundation',
    badgeLabel: 'Core Foundation · Slide 1',
    title: 'Child-Centered Learning',
    ageTag: 'Ages 3–6',
    description:
      'Respecting the child, honoring their voice, learning through discovery.',
    quote: {
      text: '“There are three teachers of children: adults, other children, and their physical environment.”',
      attribution: '— Loris Malaguzzi, Founder of the Reggio Emilia Approach'
    },
    classroomPractice:
      'Every morning starts by listening to children’s ideas and curiosities—turning questions into hands-on studio invitations where every voice belongs.',
    accent: 'blue',
    icon: Heart
  },
  {
    id: 'environment',
    badgeLabel: 'Pillar 01',
    title: 'Environment as Third Teacher',
    description:
      'Spaces designed to inspire creativity & discovery (art studio, natural materials, sensory, building, science & dramatic play).',
    classroomPractice:
      'Warm light, open-ended natural loose parts, and curated invitation-to-play provocations invite independent inquiry every morning.',
    zones: ['Art Studio', 'Natural Materials', 'Sensory & Building', 'Science & Dramatic Play'],
    accent: 'blue',
    icon: Palette
  },
  {
    id: 'collaborative',
    badgeLabel: 'Pillar 02',
    title: 'Collaborative Learning',
    ageTag: 'Ages 3–6',
    description:
      'Ages 3–6 · Children learn together, share ideas, and build community through cooperation and teamwork.',
    classroomPractice:
      'Small-group morning dialogue, shared block engineering, and peer problem-solving foster empathy and respectful listening.',
    accent: 'red',
    icon: Users
  },
  {
    id: 'emergent',
    badgeLabel: 'Pillar 03',
    title: 'Emergent Curriculum',
    description:
      "Curriculum develops organically with children's interests; teachers observe & adapt plans to follow curiosities.",
    classroomPractice:
      'Whether sparks start from backyard caterpillars or Alberta snowstorms, educators document questions and weave them into weekly discovery.',
    accent: 'yellow',
    icon: Sprout
  },
  {
    id: 'facilitator',
    badgeLabel: 'Pillar 04',
    title: 'Teacher as Co-learner / Collaborator / Facilitator',
    description:
      'Teachers guide, listen, and learn alongside children, supporting exploration as collaborative partners.',
    classroomPractice:
      'Our certified Early Childhood Educators ask open-ended "What do you notice?" questions and explore answers side-by-side with each child.',
    accent: 'blue',
    icon: Handshake
  },
  {
    id: 'project-based',
    badgeLabel: 'Pillar 05',
    title: 'Project-Based Learning',
    description:
      'Deep exploration through projects that builds critical thinking, problem-solving & collaboration skills.',
    classroomPractice:
      'Multi-day studio investigations blend storytelling, measurement, clay, and observation—helping ideas grow from sketch to showcase.',
    accent: 'red',
    icon: Layers
  },
  {
    id: 'play-essential',
    badgeLabel: 'Pillar 06',
    title: 'Play as Essential Learning',
    description:
      'Play is how children explore, create, and make sense of the world through hands-on, joyful, meaningful learning.',
    classroomPractice:
      'Purposeful indoor maker stations and outdoor cedar yard play build pre-literacy, early numeracy, confidence, and joyful resilience.',
    accent: 'yellow',
    icon: Puzzle
  }
];

const ACCENT_STYLES: Record<
  ReggioSlide['accent'],
  {
    cardBorder: string;
    topBar: string;
    iconBg: string;
    badge: string;
    detailBg: string;
    dot: string;
    activeProgressDot: string;
  }
> = {
  blue: {
    cardBorder: 'border-blue-300',
    topBar: 'from-blue-700 via-blue-600 to-blue-800',
    iconBg: 'bg-blue-700 text-white shadow-blue-200',
    badge: 'bg-blue-50 text-blue-800 border-blue-200',
    detailBg: 'bg-blue-50/75 border-blue-200 text-blue-950',
    dot: 'bg-blue-700',
    activeProgressDot: 'bg-blue-700 w-7'
  },
  red: {
    cardBorder: 'border-red-300',
    topBar: 'from-red-600 via-rose-600 to-red-700',
    iconBg: 'bg-red-600 text-white shadow-red-200',
    badge: 'bg-red-50 text-red-700 border-red-200',
    detailBg: 'bg-red-50/75 border-red-200 text-red-950',
    dot: 'bg-red-600',
    activeProgressDot: 'bg-red-600 w-7'
  },
  yellow: {
    cardBorder: 'border-amber-400',
    topBar: 'from-amber-400 via-yellow-400 to-amber-500',
    iconBg: 'bg-amber-500 text-slate-950 shadow-amber-200',
    badge: 'bg-amber-50 text-amber-900 border-amber-300',
    detailBg: 'bg-amber-50/85 border-amber-300 text-slate-900',
    dot: 'bg-amber-500',
    activeProgressDot: 'bg-amber-500 w-7'
  }
};

const slideVariants = {
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

export const ReggioEmiliaSubsection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [expandedPracticeById, setExpandedPracticeById] = useState<Record<string, boolean>>({});

  const totalSlides = REGGIO_SLIDES.length;
  const activeSlide = REGGIO_SLIDES[currentIndex];
  const style = ACCENT_STYLES[activeSlide.accent];
  const Icon = activeSlide.icon;
  const isPracticeExpanded = Boolean(expandedPracticeById[activeSlide.id]);

  const goToSlide = (nextIndex: number) => {
    const wrapped = (nextIndex + totalSlides) % totalSlides;
    if (wrapped === currentIndex) return;
    setDirection(nextIndex > currentIndex || (currentIndex === totalSlides - 1 && nextIndex === 0) ? 1 : -1);
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
    <div
      id="philosophy"
      className="w-full relative z-10 select-text scroll-mt-24"
    >
      {/* Compact Tab Subheading */}
      <div className="text-center max-w-3xl mx-auto space-y-2 mb-6">
        <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight leading-tight">
          Our Reggio Emilia Approach{' '}
          <span className="text-blue-700">· Nurturing Curiosity,</span>{' '}
          <span className="text-red-600">Creativity &amp; Collaboration</span>{' '}
          <span className="text-slate-800">(Ages 3–6)</span>
        </h3>
      </div>

      {/* Single Compact Swipeable Billboard Card */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Our Reggio Emilia Approach Slides"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="max-w-4xl mx-auto outline-none focus-visible:ring-3 focus-visible:ring-blue-500 rounded-3xl"
      >
        <div
          className={`bg-white rounded-3xl border-2 ${style.cardBorder} shadow-xl overflow-hidden transition-colors duration-300`}
        >
          {/* Compact Top Billboard Control Bar */}
          <div className="px-4 sm:px-6 py-3 bg-slate-50/90 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 min-w-0">
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider border shrink-0 ${style.badge}`}
              >
                {activeSlide.badgeLabel}
              </span>
              {activeSlide.ageTag && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 shrink-0">
                  {activeSlide.ageTag}
                </span>
              )}
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
                aria-label="Previous Reggio Emilia slide"
                title="Previous slide"
                className="w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Reggio Emilia slide"
                title="Next slide"
                className="w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-blue-700 hover:bg-blue-600 border border-blue-800 text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Swipeable / Draggable Slide Stage */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={activeSlide.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.22}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                className="p-5 sm:p-7 cursor-grab active:cursor-grabbing touch-pan-y"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${style.iconBg} ${
                      activeSlide.id === 'foundation' ? 'border-2 border-yellow-400' : ''
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${activeSlide.id === 'foundation' ? 'text-yellow-300 fill-current' : ''}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0 space-y-2.5">
                    {activeSlide.id === 'foundation' && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-red-600">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Core Foundation</span>
                      </span>
                    )}

                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 leading-snug">
                      {activeSlide.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                      {activeSlide.description}
                    </p>

                    {activeSlide.quote && (
                      <div className="bg-amber-50/90 border-l-4 border-amber-500 rounded-2xl p-3.5 sm:p-4 border border-amber-200/80 shadow-2xs">
                        <div className="flex items-start gap-2.5">
                          <Quote className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm font-bold text-slate-900 italic leading-relaxed">
                              {activeSlide.quote.text}
                            </p>
                            <p className="text-[11px] font-black uppercase tracking-wider text-blue-800">
                              {activeSlide.quote.attribution}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSlide.zones && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {activeSlide.zones.map((zone) => (
                          <span
                            key={zone}
                            className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-bold"
                          >
                            {zone}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Expandable Classroom Practice Note */}
                    <div className="pt-2.5 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedPracticeById((prev) => ({
                            ...prev,
                            [activeSlide.id]: !prev[activeSlide.id]
                          }))
                        }
                        aria-expanded={isPracticeExpanded}
                        className="inline-flex items-center gap-2 text-xs font-black text-blue-800 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                        <span>{isPracticeExpanded ? 'Hide Classroom Practice' : 'See How We Practice This'}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isPracticeExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isPracticeExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div
                              className={`mt-2.5 p-3 rounded-2xl border text-xs font-semibold leading-relaxed ${style.detailBg}`}
                            >
                              {activeSlide.classroomPractice}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Clickable Progress Dots Footer */}
          <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-50/80 border-t border-slate-200/80 flex items-center justify-between gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="text-xs font-bold text-slate-600 hover:text-blue-700 inline-flex items-center gap-1 py-2 px-1 -my-1.5 sm:py-0 sm:px-0 sm:my-0 min-h-[40px] sm:min-h-0 transition-colors cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-0.5 sm:gap-1.5" role="tablist" aria-label="Choose Reggio Emilia slide">
              {REGGIO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Slide ${idx + 1}: ${slide.title}`}
                    title={slide.title}
                    onClick={() => goToSlide(idx)}
                    className="min-w-[22px] min-h-[38px] sm:min-w-0 sm:min-h-0 flex items-center justify-center cursor-pointer"
                  >
                    <span
                      className={`block h-2.5 rounded-full transition-all duration-200 ${
                        isActive ? style.activeProgressDot : 'w-2.5 bg-slate-300 hover:bg-slate-400'
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

      {/* Subtle Bottom Pill Badges */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-xs font-black shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-blue-700" />
          Safe · Warm · Inclusive Community
        </span>
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-black shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-red-600" />
          Inquiry-Driven &amp; Creative
        </span>
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-black shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          Holistic Development &amp; Joyful Learning
        </span>
      </div>
    </div>
  );
};
