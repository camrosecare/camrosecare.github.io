import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface AnimatedLittleAngelsLogoProps {
  className?: string;
  showSoundButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedLittleAngelsLogo: React.FC<AnimatedLittleAngelsLogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '100px' });
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = isInView && !shouldReduceMotion;

  // Prominently scaled sizes (increased slightly further per request):
  // sm: h-20 sm:h-24 md:h-28
  // md: h-28 sm:h-32 md:h-36 lg:h-40 (stands out prominently in the header)
  // lg: h-36 sm:h-44 md:h-48 lg:h-52
  const sizeClass =
    size === 'sm'
      ? 'h-16 sm:h-24 md:h-28 w-auto'
      : size === 'lg'
      ? 'h-28 sm:h-44 md:h-48 lg:h-52 w-auto'
      : 'h-16 sm:h-32 md:h-36 lg:h-40 w-auto';

  // 3D Extrusion Depth Layers (spaced along the Z-axis to create genuine physical thickness)
  const extrusionSlices = [-6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6];

  return (
    <div ref={containerRef} className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* 3D Perspective Stage: Standalone 3D object with zero background box, zero border, and zero box shadows */}
      <a
        href="#top"
        className="relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg group"
        style={{
          perspective: 1200,
          perspectiveOrigin: 'center center'
        }}
        aria-label="Camrose Little Angels Daycare Society"
        title="Camrose Little Angels Daycare Society"
      >
        {/* Continuous 3D Rotating Node: Completes 1 full turn every 5 seconds, followed by a 4-second pause before repeating */}
        <motion.div
          animate={
            !shouldAnimate
              ? { rotateY: 0, rotateX: 0 }
              : {
                  rotateY: [0, 360],
                  rotateX: [6, 10, 6, 2, 6] // subtle dynamic 3D tilt exposing the extruded top edge
                }
          }
          transition={{
            duration: 5,
            repeat: shouldAnimate ? Infinity : 0,
            repeatDelay: 4,
            ease: 'easeInOut'
          }}
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center'
          }}
          className="relative flex items-center justify-center cursor-pointer"
        >
          {/* Extruded Core Layers: Creates real 3D physical rim/bevel thickness between front and back */}
          {!shouldReduceMotion &&
            extrusionSlices.map((zOffset, index) => (
              <div
                key={`extrusion-${index}`}
                style={{
                  transform: `translateZ(${zOffset}px)`,
                  backfaceVisibility: 'visible',
                  WebkitBackfaceVisibility: 'visible',
                  filter: 'brightness(0.55) saturate(0.8) contrast(1.15)',
                  opacity: 0.95
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <img
                  src="/assets/aistudio/logo_transparent.webp"
                  alt=""
                  className={`${sizeClass} object-contain block select-none`}
                  loading={size === 'sm' ? 'lazy' : 'eager'}
                  decoding="async"
                />
              </div>
            ))}

          {/* Front Face (+7px Z): Pristine original artwork, colors, and design with subtle specular highlight */}
          <div
            style={{
              transform: 'translateZ(7px)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
            className="relative flex items-center justify-center"
          >
            <img
              src="/assets/aistudio/logo_transparent.webp"
              alt="Camrose Little Angels Daycare"
              className={`${sizeClass} object-contain block select-none pointer-events-none`}
              loading={size === 'sm' ? 'lazy' : 'eager'}
              decoding="async"
            />
            {/* Dynamic specular lighting reflection across the surface as it rotates */}
            <motion.div
              animate={
                shouldAnimate
                  ? {
                      opacity: [0.08, 0.35, 0.08, 0, 0.08]
                    }
                  : { opacity: 0.08 }
              }
              transition={{
                duration: 5,
                repeat: shouldAnimate ? Infinity : 0,
                repeatDelay: 4,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 pointer-events-none rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent"
              style={{ mixBlendMode: 'overlay' }}
            />
          </div>

          {/* Back Face (-7px Z): Identical original graphic art flipped 180° so it reads correctly from the rear */}
          <div
            style={{
              transform: 'rotateY(180deg) translateZ(7px)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src="/assets/aistudio/logo_transparent.webp"
              alt="Camrose Little Angels Daycare"
              className={`${sizeClass} object-contain block select-none pointer-events-none`}
              loading={size === 'sm' ? 'lazy' : 'eager'}
              decoding="async"
            />
            {/* Specular lighting for back face */}
            <motion.div
              animate={
                shouldAnimate
                  ? {
                      opacity: [0, 0.08, 0.35, 0.08, 0]
                    }
                  : { opacity: 0.08 }
              }
              transition={{
                duration: 5,
                repeat: shouldAnimate ? Infinity : 0,
                repeatDelay: 4,
                ease: 'easeInOut'
              }}
              className="absolute inset-0 pointer-events-none rounded-full bg-gradient-to-tr from-transparent via-white/40 to-transparent"
              style={{ mixBlendMode: 'overlay' }}
            />
          </div>
        </motion.div>
      </a>

      {/* Dynamic 3D Ground Contact Shadow: Expands and contracts with the 3D rotation */}
      <motion.div
        animate={
          !shouldAnimate
            ? { scaleX: 1, opacity: 0.25 }
            : {
                scaleX: [1, 0.22, 1, 0.22, 1],
                opacity: [0.35, 0.12, 0.35, 0.12, 0.35]
              }
        }
        transition={{
          duration: 5,
          repeat: shouldAnimate ? Infinity : 0,
          repeatDelay: 4,
          ease: 'easeInOut'
        }}
        className="w-3/4 h-2.5 mx-auto mt-1 rounded-full bg-slate-900/25 blur-[5px] pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};
