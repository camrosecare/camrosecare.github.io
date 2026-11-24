import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import {
  BookOpen,
  Calculator,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ParentResourcesHubProps {
  onOpenHandbook: () => void;
  onOpenSubsidy: () => void;
  onOpenTour: () => void;
}

interface ResourceGuideSlide {
  id: string;
  tag: string;
  title: string;
  description: string;
  buttonLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  buttonIcon: React.ComponentType<{ className?: string }>;
  accent: 'blue' | 'emerald' | 'red' | 'yellow';
  onAction: () => void;
}

const guideSlideVariants = {
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

const ACCENT_STYLES: Record<
  ResourceGuideSlide['accent'],
  {
    cardBorder: string;
    iconBg: string;
    tagBadge: string;
    button: string;
    activeDot: string;
  }
> = {
  blue: {
    cardBorder: 'border-blue-300',
    iconBg: 'bg-blue-700 text-white shadow-blue-200',
    tagBadge: 'bg-blue-50 text-blue-800 border-blue-200',
    button: 'bg-blue-700 hover:bg-blue-600 text-white',
    activeDot: 'bg-blue-700 w-7'
  },
  emerald: {
    cardBorder: 'border-emerald-300',
    iconBg: 'bg-emerald-600 text-white shadow-emerald-200',
    tagBadge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    button: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    activeDot: 'bg-emerald-600 w-7'
  },
  red: {
    cardBorder: 'border-red-300',
    iconBg: 'bg-red-600 text-white shadow-red-200',
    tagBadge: 'bg-red-50 text-red-700 border-red-200',
    button: 'bg-red-600 hover:bg-red-500 text-white',
    activeDot: 'bg-red-600 w-7'
  },
  yellow: {
    cardBorder: 'border-amber-400',
    iconBg: 'bg-amber-500 text-slate-950 shadow-amber-200',
    tagBadge: 'bg-amber-50 text-amber-900 border-amber-300',
    button: 'bg-amber-400 hover:bg-amber-300 text-slate-950',
    activeDot: 'bg-amber-500 w-7'
  }
};

export const ParentResourcesHub: React.FC<ParentResourcesHubProps> = ({
  onOpenHandbook,
  onOpenSubsidy,
  onOpenTour
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    clothes: false,
    shoes: false,
    comfort: false,
    weather: false,
    bottle: false,
    immunization: false
  });

  const resourceGuides: ResourceGuideSlide[] = [
    {
      id: 'handbook',
      tag: 'Care Guide & Policies',
      title: 'Parent Handbook & Care Policies',
      description:
        'Complete overview of our care philosophy, child pick-up security, and daily program policies.',
      buttonLabel: 'Read Parent Handbook',
      icon: BookOpen,
      buttonIcon: FileText,
      accent: 'blue',
      onAction: onOpenHandbook
    },
    {
      id: 'wellness',
      tag: 'Health & Protection',
      title: 'Child Wellness & Health Rules',
      description:
        'Health standards, fever/vomiting 24h symptom-free policy, and sanitization protocols keeping everyone protected.',
      buttonLabel: 'Review Health Policy',
      icon: ShieldAlert,
      buttonIcon: ShieldAlert,
      accent: 'red',
      onAction: onOpenHandbook
    },
    {
      id: 'orientation',
      tag: 'Visits & Orientation',
      title: 'In-Person Family Orientation',
      description:
        'Tour our classrooms, meet our certified educators, and explore the spacious outdoor cedar playgrounds.',
      buttonLabel: 'Book a Tour',
      icon: Calendar,
      buttonIcon: Calendar,
      accent: 'yellow',
      onAction: onOpenTour
    }
  ];

  const totalSlides = resourceGuides.length;
  const activeGuide = resourceGuides[currentIndex];
  const style = ACCENT_STYLES[activeGuide.accent];
  const Icon = activeGuide.icon;
  const ButtonIcon = activeGuide.buttonIcon;

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

  const toggleCheck = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checklistItems = [
    { id: 'clothes', label: '2 Complete season-appropriate changes of clothes (labelled)' },
    { id: 'shoes', label: 'Clean indoor running shoes (velcro or slip-on for safety)' },
    { id: 'comfort', label: 'Comfort blanket or small cuddly toy for restful naptime' },
    { id: 'weather', label: 'Outdoor gear (sun hat & boots in summer, snowsuit & mittens in winter)' },
    { id: 'bottle', label: 'Refillable spill-proof water bottle clearly marked with child’s name' },
    { id: 'immunization', label: 'Updated immunization records & emergency contact sheet on file' }
  ];

  const completedCount = Object.values(checklist).filter(Boolean).length;

  return (
    <section id="resources" className="py-20 bg-slate-50 border-y-2 border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            Parent Resources &amp; <span className="text-blue-600">Helpful Guides</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium">
            Everything you need for a smooth, confident daycare experience in Camrose.
          </p>
        </div>

        {/* Compact Swipeable Parent Resources Card Deck */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Parent Resources and Helpful Guides"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="max-w-4xl mx-auto mb-10 outline-none focus-visible:ring-3 focus-visible:ring-blue-500 rounded-3xl"
        >
          <div
            className={`bg-white rounded-3xl border-2 ${style.cardBorder} shadow-xl overflow-hidden transition-colors duration-300`}
          >
            {/* Top Control Bar */}
            <div className="px-4 sm:px-6 py-3 bg-slate-50/90 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border shrink-0 ${style.tagBadge}`}
                >
                  {activeGuide.tag}
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
                  aria-label="Previous resource guide"
                  title="Previous guide"
                  className="w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next resource guide"
                  title="Next guide"
                  className="w-11 h-11 sm:w-8 sm:h-8 rounded-full bg-blue-700 hover:bg-blue-600 border border-blue-800 text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Swipeable Guide Stage */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                  key={activeGuide.id}
                  custom={direction}
                  variants={guideSlideVariants}
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
                        {activeGuide.title}
                      </h3>

                      <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                        {activeGuide.description}
                      </p>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                        <button
                          type="button"
                          onClick={activeGuide.onAction}
                          className={`py-2.5 px-5 rounded-xl text-xs font-black transition-all inline-flex items-center justify-center gap-2 shadow-sm active:scale-95 cursor-pointer ${style.button}`}
                        >
                          <ButtonIcon className="w-4 h-4 shrink-0" />
                          <span>{activeGuide.buttonLabel}</span>
                        </button>

                        <span className="text-[11px] font-bold text-slate-400">
                          Resource {currentIndex + 1} of {totalSlides}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Progress Dots & Prev/Next Controls */}
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
                aria-label="Choose parent resource guide"
              >
                {resourceGuides.map((guide, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={guide.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Slide ${idx + 1}: ${guide.title}`}
                      title={guide.title}
                      onClick={() => goToSlide(idx)}
                      className="min-w-[26px] min-h-[38px] sm:min-w-0 sm:min-h-0 flex items-center justify-center cursor-pointer"
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

        {/* Interactive First Day Readiness Checklist */}
        <div className="bg-white rounded-3xl border-3 border-blue-100 shadow-lg p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[11px] font-black uppercase text-blue-700 tracking-wider">
                First Day Readiness
              </span>
              <h4 className="text-xl font-black text-slate-950">
                What to Pack for Your Child’s First Day
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500">
                Packed: <strong className="text-blue-600 font-black">{completedCount}</strong> of {checklistItems.length}
              </span>
              <div className="w-24 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                  style={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-5">
            {checklistItems.map((item) => {
              const isChecked = checklist[item.id];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                      isChecked
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className={`text-xs font-bold leading-snug ${isChecked ? 'line-through opacity-80' : ''}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
