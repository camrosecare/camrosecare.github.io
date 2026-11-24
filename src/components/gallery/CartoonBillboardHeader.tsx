import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { Plus, Sparkles, Palette, MessageCircle } from 'lucide-react';
import { InteractivePhilosophyExperience } from '../philosophy/InteractivePhilosophyExperience';

interface CartoonBillboardHeaderProps {
  onUploadClick: () => void;
  includePhilosophy?: boolean;
  onOpenTour?: (programId?: string) => void;
  onOpenSubsidy?: () => void;
}

export const CartoonBillboardHeader: React.FC<CartoonBillboardHeaderProps> = ({
  onUploadClick,
  includePhilosophy = false,
  onOpenTour,
  onOpenSubsidy
}) => {
  const [duckBubble, setDuckBubble] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '120px' });
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = isInView && !shouldReduceMotion;

  const handleDuckClick = (duckName: 'left' | 'right') => {
    if (duckName === 'left') {
      const phrases = [
        'Quack! Look at what our little artists painted!',
        'Little hands, giant imaginations!',
        'Every child is a master artist at Camrose Care!'
      ];
      setDuckBubble(phrases[Math.floor(Math.random() * phrases.length)]);
    } else {
      const phrases = [
        'Welcome to our 3D Art Carousel!',
        'Spin the rack below to explore each painting!',
        'Blue is my favorite color! Quack!'
      ];
      setDuckBubble(phrases[Math.floor(Math.random() * phrases.length)]);
    }

    setTimeout(() => {
      setDuckBubble(null);
    }, 3500);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-[490px] select-none px-1 sm:px-0"
    >
      {/* Speech bubble for interactive ducks */}
      <AnimatePresence>
        {duckBubble && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 z-40 px-3 py-1.5 bg-yellow-400 text-slate-950 font-black text-[11px] sm:text-xs rounded-2xl shadow-lg border-2 border-white flex items-center gap-1.5 max-w-[calc(100%-0.5rem)] text-center sm:max-w-none sm:whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 text-slate-900 shrink-0" />
            <span>{duckBubble}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-yellow-400 rotate-45 border-r-2 border-b-2 border-white"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Decorative Child-Friendly Sparkles around Illustration */}
      {shouldAnimate && (
        <>
          <motion.div
            animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-4 left-0 sm:-left-3 text-yellow-400 pointer-events-none z-20"
          >
            <Sparkles className="w-5 h-5 fill-yellow-400/40" />
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute -top-3 right-0 sm:-right-3 text-blue-400 pointer-events-none z-20"
          >
            <Sparkles className="w-4 h-4 fill-blue-400/40" />
          </motion.div>
        </>
      )}

      {/* Freestanding Floating Cartoon Illustration Container - NO BOX / NO CARDS / NO FRAMES */}
      <motion.div
        animate={
          !shouldAnimate
            ? { y: 0 }
            : {
                y: [0, -6, 0]
              }
        }
        transition={{
          duration: 4.5,
          repeat: shouldAnimate ? Infinity : 0,
          ease: 'easeInOut'
        }}
        className="relative aspect-[900/888] w-full"
      >
        {includePhilosophy ? (
          <>
            {/* Interactive "Our Philosophy" 3D Animation Expanded Edge-to-Edge Inside Billboard Frame */}
            <div
              className="absolute z-10 overflow-hidden"
              style={{
                top: '2.9%',
                bottom: '2.8%',
                left: '20.7%',
                right: '16.8%'
              }}
            >
              <InteractivePhilosophyExperience
                variant="card"
                onOpenTour={onOpenTour}
                onOpenSubsidy={onOpenSubsidy}
              />
            </div>

            {/* Cutout Ducks, Ladders & Black Billboard Frame Overlaid Cleanly at z-20 */}
            <img
              src="/billboard_cartoon_window.webp"
              alt="Camrose Care cartoon ducks on ladders with Our Philosophy 3D billboard"
              loading="lazy"
              decoding="async"
              className="relative z-20 w-full h-full object-contain pointer-events-none"
            />
          </>
        ) : (
          <img
            src="/billboard_cartoon_transparent.webp"
            alt="Camrose Care cartoon ducks on ladders with art exhibition billboard"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain pointer-events-none"
          />
        )}

        {/* Subtle Independent Character Animation Overlays */}
        {/* Left Ducklings (Green & Red shirts) Interactive Hotspot */}
        <motion.button
          type="button"
          onClick={() => handleDuckClick('left')}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          animate={
            !shouldAnimate
              ? { rotate: 0 }
              : {
                  rotate: [0, -1.2, 0, 1.2, 0]
                }
          }
          transition={{
            duration: 5,
            repeat: shouldAnimate ? Infinity : 0,
            ease: 'easeInOut'
          }}
          title="Click the ducklings on the ladder!"
          className="absolute top-[3%] left-[1%] w-[20%] h-[68%] cursor-pointer rounded-3xl z-30 outline-none focus:ring-2 focus:ring-yellow-400/40"
          aria-label="Interactive ducklings on ladder"
        >
          {/* Subtle playful pulse hint on hover */}
          <span className="sr-only">Talk with ducklings</span>
        </motion.button>

        {/* Right Duckling (Blue suit) Interactive Hotspot */}
        <motion.button
          type="button"
          onClick={() => handleDuckClick('right')}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          animate={
            !shouldAnimate
              ? { rotate: 0 }
              : {
                  rotate: [0, 1.5, 0, -1.5, 0]
                }
          }
          transition={{
            duration: 4.2,
            repeat: shouldAnimate ? Infinity : 0,
            ease: 'easeInOut',
            delay: 0.6
          }}
          title="Click the blue duckling on the ladder!"
          className="absolute top-[18%] right-[1%] w-[17%] h-[62%] cursor-pointer rounded-3xl z-30 outline-none focus:ring-2 focus:ring-blue-400/40"
          aria-label="Interactive blue duckling on ladder"
        >
          <span className="sr-only">Talk with blue duckling</span>
        </motion.button>

        {/* Preserved White Billboard Typography for Concepts B/C/D when includePhilosophy is false */}
        {!includePhilosophy && (
          <div
            className="absolute flex flex-col items-center justify-between text-center z-10 overflow-hidden"
            style={{
              top: '5.5%',
              bottom: '5.5%',
              left: '22.8%',
              right: '20.8%',
              padding: '2.5% 3.5%'
            }}
          >
            {/* Top Badge: Camrose Little Angels Exhibition */}
            <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-blue-900 font-outfit">
                Camrose Little Angels Studio
              </span>
            </div>

            {/* Main Headline Painted Directly on the Board */}
            <div className="my-auto py-0.5 sm:py-1">
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-slate-950 tracking-tight leading-[1.12] font-outfit">
                Little{' '}
                <span className="text-blue-600 underline decoration-yellow-400 decoration-wavy decoration-2 sm:decoration-3">
                  Creations.
                </span>
                <br />
                Big{' '}
                <span className="text-red-600">
                  Imagination
                </span>
                <span className="text-amber-500 font-extrabold">!</span>
              </h2>

              {/* Sunshine Yellow Divider with Cheerful Color Dots */}
              <div className="flex items-center justify-center gap-1 my-1 sm:my-1.5">
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
                <div className="w-10 sm:w-16 h-1 bg-yellow-400 rounded-full"></div>
                <span className="w-1 h-1 rounded-full bg-blue-600"></span>
              </div>

              {/* Supporting Description */}
              <p className="text-[9px] sm:text-[11px] md:text-xs text-slate-800 leading-snug font-semibold max-w-[240px] sm:max-w-[270px] mx-auto">
                Every picture tells a little story. Explore a colorful collection of creativity, imagination, and happy childhood moments.
              </p>
            </div>

            {/* Bottom Message & Direct Pin Button */}
            <div className="w-full flex flex-col items-center gap-1">
              <div className="px-2 py-0.5 bg-amber-50 border border-amber-200/90 rounded-lg shadow-2xs flex items-center justify-center gap-1 text-[8px] sm:text-[10px] font-black text-blue-950">
                <Sparkles className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                <span>Explore, Create &amp; Smile</span>
                <Palette className="w-2.5 h-2.5 text-red-500 shrink-0" />
              </div>

              {/* Direct Pin Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onUploadClick}
                className="px-2.5 sm:px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-full font-black text-[8px] sm:text-[10px] uppercase tracking-wider transition-all shadow-xs flex items-center gap-1 border border-yellow-300 cursor-pointer"
              >
                <Plus className="w-2.5 h-2.5 stroke-[3]" />
                <span>Pin Art to Rack</span>
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
