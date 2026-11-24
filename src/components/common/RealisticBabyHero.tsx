import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, Play, ArrowRight, X, ClipboardCheck } from 'lucide-react';
import { IMAGES, BABY_AUDIO_TRACKS, BUSINESS_INFO } from '../../data/daycareData';

interface RealisticBabyHeroProps {
  onOpenTour?: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

interface ButterflyData {
  id: string;
  color: 'blue' | 'red' | 'yellow' | 'white';
  species: string;
  trackIndex: number;
  label: string;
  phrase: string;
  positionClass: string;
  floatDelay: number;
}

export const RealisticBabyHero: React.FC<RealisticBabyHeroProps> = ({
  onOpenTour
}) => {
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [hoveredButterfly, setHoveredButterfly] = useState<string | null>(null);

  // Audio preloading cache to eliminate voice delay completely (0ms instant playback)
  const audioCacheRef = useRef<Map<number, HTMLAudioElement>>(new Map());
  const activeAudioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = BABY_AUDIO_TRACKS[activeTrackIndex];

  // Preload all audio tracks into memory on mount
  useEffect(() => {
    BABY_AUDIO_TRACKS.forEach((track, idx) => {
      try {
        const audio = new Audio(track.src);
        audio.preload = 'auto';
        audio.load();
        audioCacheRef.current.set(idx, audio);
      } catch {
        // Audio preload fallback
      }
    });

    return () => {
      audioCacheRef.current.forEach((audio) => {
        try {
          audio.pause();
          audio.src = '';
        } catch {}
      });
      audioCacheRef.current.clear();
    };
  }, []);

  // Natural periodic blinking animation (every 3.5 to 6 seconds)
  useEffect(() => {
    let blinkTimeout: any;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
      const nextDelay = 3500 + Math.random() * 3000;
      blinkTimeout = setTimeout(triggerBlink, nextDelay);
    };
    blinkTimeout = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Cleanup particles
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles((prev) => prev.slice(6));
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [particles]);

  // Fallback speech synthesis if audio playback is blocked
  const speakFallback = (text: string) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.pitch = 1.65;
        utt.rate = 0.95;
        utt.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utt);
      } catch {
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  };

  // Play the authentic baby voice recording with ZERO delay
  const playBabyVoice = (index?: number) => {
    const targetIdx = index !== undefined ? index : activeTrackIndex;
    setActiveTrackIndex(targetIdx);
    setShowSpeechBubble(true);
    setIsPlaying(true);
    setIsWaving(true);

    // Spawn floating butterfly & heart particles
    const newParticles: Particle[] = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: -30 - Math.random() * 70,
      emoji: ['🦋', '❤️', '✨', '💖', '⭐', '🥰', '🦋', '🌸'][i % 8]
    }));
    setParticles((prev) => [...prev, ...newParticles]);

    // Stop waving after 2.5s
    setTimeout(() => setIsWaving(false), 2500);

    if (isMuted) {
      setTimeout(() => setIsPlaying(false), 2200);
      return;
    }

    const track = BABY_AUDIO_TRACKS[targetIdx];
    const cachedAudio = audioCacheRef.current.get(targetIdx);

    // Instant playback from preloaded in-memory cache
    if (cachedAudio) {
      try {
        if (activeAudioRef.current && activeAudioRef.current !== cachedAudio) {
          activeAudioRef.current.pause();
          activeAudioRef.current.currentTime = 0;
        }
        activeAudioRef.current = cachedAudio;
        cachedAudio.currentTime = 0;
        cachedAudio.volume = 1.0;
        cachedAudio.onended = () => {
          setIsPlaying(false);
        };
        const playPromise = cachedAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            speakFallback(track.dialogue);
          });
        }
      } catch {
        speakFallback(track.dialogue);
      }
    } else {
      // Direct instant fallback
      try {
        const audio = new Audio(track.src);
        activeAudioRef.current = audio;
        audio.currentTime = 0;
        audio.onended = () => setIsPlaying(false);
        audio.play().catch(() => speakFallback(track.dialogue));
      } catch {
        speakFallback(track.dialogue);
      }
    }
  };

  // Realistic Butterfly Data
  const butterflies: ButterflyData[] = [
    {
      id: 'bf-red',
      color: 'red',
      species: 'Scarlet Peacock',
      trackIndex: 1,
      label: 'Hello! I love you!',
      phrase: 'Hello! I love you! Come play with us!',
      positionClass: 'top-2 left-1 sm:top-4 sm:left-3',
      floatDelay: 0
    },
    {
      id: 'bf-blue',
      color: 'blue',
      species: 'Blue Morpho',
      trackIndex: 0,
      label: 'Welcome to Camrose!',
      phrase: 'Welcome to Camrose Care!',
      positionClass: 'top-2 right-1 sm:top-4 sm:right-3',
      floatDelay: 0.6
    },
    {
      id: 'bf-white',
      color: 'white',
      species: 'Pearl Crescent',
      trackIndex: 3,
      label: 'Making new friends!',
      phrase: 'We love learning, playing and making new friends!',
      positionClass: 'bottom-12 left-1 sm:bottom-16 sm:left-3',
      floatDelay: 1.2
    },
    {
      id: 'bf-yellow',
      color: 'yellow',
      species: 'Tiger Swallowtail',
      trackIndex: 2,
      label: 'Explore our world!',
      phrase: 'Come and explore our happy little world!',
      positionClass: 'bottom-12 right-1 sm:bottom-16 sm:right-3',
      floatDelay: 1.8
    }
  ];

  /**
   * Anatomically realistic vector butterfly with biological wing venation,
   * discal cell shading, scalloped margins, pearlescent dots, and 3D fluttering wings.
   */
  const renderRealisticButterfly = (color: 'blue' | 'red' | 'yellow' | 'white', butterflyId: string) => {
    const isHovered = hoveredButterfly === butterflyId;
    const isThisPlaying = activeTrackIndex === butterflies.find(b => b.id === butterflyId)?.trackIndex && isPlaying;

    // Wing theme parameters
    let primaryGrad = `grad-${color}-primary`;
    let glowGrad = `grad-${color}-glow`;
    let marginColor = '#0F172A';
    let veinColor = 'rgba(15, 23, 42, 0.75)';
    let spotColor = '#FFFFFF';
    let bodyColor = '#1E293B';
    let playBg = 'bg-white text-blue-600';

    if (color === 'blue') {
      // Blue Morpho
      marginColor = '#020617';
      veinColor = 'rgba(2, 6, 23, 0.7)';
      spotColor = '#E0F2FE';
      bodyColor = '#0F172A';
      playBg = 'bg-white text-blue-600 border-blue-400';
    } else if (color === 'red') {
      // Scarlet Peacock
      marginColor = '#1C0407';
      veinColor = 'rgba(40, 5, 10, 0.8)';
      spotColor = '#FEF08A';
      bodyColor = '#1C0407';
      playBg = 'bg-yellow-300 text-red-700 border-red-600';
    } else if (color === 'yellow') {
      // Tiger Swallowtail
      marginColor = '#1C1304';
      veinColor = 'rgba(45, 28, 5, 0.85)';
      spotColor = '#7DD3FC';
      bodyColor = '#1C1304';
      playBg = 'bg-blue-600 text-yellow-300 border-yellow-300';
    } else if (color === 'white') {
      // Pearl White
      marginColor = '#334155';
      veinColor = 'rgba(71, 85, 105, 0.65)';
      spotColor = '#93C5FD';
      bodyColor = '#1E293B';
      playBg = 'bg-red-600 text-white border-white';
    }

    return (
      <div className="relative flex items-center justify-center filter drop-shadow-md" style={{ perspective: '600px' }}>
        <svg
          viewBox="0 0 84 68"
          className="w-11 h-9 sm:w-12 sm:h-10 overflow-visible select-none"
        >
          <defs>
            {/* Blue Morpho Gradients */}
            {color === 'blue' && (
              <>
                <linearGradient id={primaryGrad} x1="20%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="35%" stopColor="#2563EB" />
                  <stop offset="75%" stopColor="#1D4ED8" />
                  <stop offset="100%" stopColor="#0B266D" />
                </linearGradient>
                <radialGradient id={glowGrad} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#7DD3FC" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#0284C7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
                </radialGradient>
              </>
            )}

            {/* Scarlet Peacock Gradients */}
            {color === 'red' && (
              <>
                <linearGradient id={primaryGrad} x1="20%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F87171" />
                  <stop offset="30%" stopColor="#EF4444" />
                  <stop offset="70%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#7F1D1D" />
                </linearGradient>
                <radialGradient id={glowGrad} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FCA5A5" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#DC2626" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#991B1B" stopOpacity="0" />
                </radialGradient>
              </>
            )}

            {/* Tiger Swallowtail Gradients */}
            {color === 'yellow' && (
              <>
                <linearGradient id={primaryGrad} x1="20%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="40%" stopColor="#FACC15" />
                  <stop offset="75%" stopColor="#EAB308" />
                  <stop offset="100%" stopColor="#92400E" />
                </linearGradient>
                <radialGradient id={glowGrad} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.95" />
                  <stop offset="65%" stopColor="#FACC15" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#CA8A04" stopOpacity="0" />
                </radialGradient>
              </>
            )}

            {/* Pearl White Gradients */}
            {color === 'white' && (
              <>
                <linearGradient id={primaryGrad} x1="10%" y1="0%" x2="90%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="45%" stopColor="#F8FAFC" />
                  <stop offset="80%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </linearGradient>
                <radialGradient id={glowGrad} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#E0F2FE" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
                </radialGradient>
              </>
            )}
          </defs>

          {/* LEFT WING COMPLEX (Flaps gently on hover or active playback) */}
          <motion.g
            style={{ transformOrigin: '42px 34px' }}
            animate={
              isThisPlaying || isHovered
                ? {
                    rotateY: [0, 44, -4, 44, 0],
                    scaleX: [1, 0.75, 1.02, 0.75, 1]
                  }
                : {
                    rotateY: 0,
                    scaleX: 1
                  }
            }
            transition={
              isThisPlaying || isHovered
                ? {
                    duration: isThisPlaying ? 0.35 : 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                : { duration: 0.25 }
            }
          >
            {/* Left Forewing Base */}
            <path
              d="M 40 28 C 34 18 16 6 8 10 C 2 13 4 24 6 34 C 8 40 18 43 28 41 C 35 39 39 34 40 30 Z"
              fill={`url(#${primaryGrad})`}
            />

            {/* Left Forewing Velvet Border */}
            <path
              d="M 8 10 C 2 13 4 24 6 34 C 8 38 14 41 18 38 C 12 34 10 24 13 16 C 16 12 24 10 28 8 C 21 7 12 8 8 10 Z"
              fill={marginColor}
            />

            {/* Left Forewing Internal Veins */}
            <path d="M 38 29 Q 25 22 13 16" stroke={veinColor} strokeWidth="1.2" fill="none" />
            <path d="M 34 26 Q 20 18 10 24" stroke={veinColor} strokeWidth="1" fill="none" />
            <path d="M 33 28 Q 18 28 11 33" stroke={veinColor} strokeWidth="1" fill="none" />
            <path d="M 34 31 Q 24 34 18 39" stroke={veinColor} strokeWidth="0.9" fill="none" />

            {/* Left Forewing Discal Cell */}
            <path
              d="M 37 28 C 32 24 25 24 24 28 C 24 31 31 33 37 30 Z"
              fill={veinColor}
              opacity="0.35"
            />

            {/* Left Forewing Marginal Crescent Dots */}
            <circle cx="6" cy="19" r="1.3" fill={spotColor} />
            <circle cx="7" cy="25" r="1.3" fill={spotColor} />
            <circle cx="9" cy="31" r="1.3" fill={spotColor} />
            <circle cx="13" cy="36" r="1.1" fill={spotColor} />

            {/* Left Hindwing Base (Scalloped) */}
            <path
              d="M 40 34 C 36 34 26 36 18 43 C 12 48 14 56 20 60 C 26 63 32 58 35 52 C 38 47 39 40 40 36 Z"
              fill={`url(#${primaryGrad})`}
            />

            {/* Left Hindwing Scalloped Border */}
            <path
              d="M 18 43 C 12 48 14 56 20 60 C 23 62 26 60 26 56 C 22 54 18 49 22 45 Z"
              fill={marginColor}
            />

            {/* Left Hindwing Veins */}
            <path d="M 38 37 Q 28 44 20 52" stroke={veinColor} strokeWidth="1" fill="none" />
            <path d="M 37 40 Q 30 50 25 58" stroke={veinColor} strokeWidth="0.9" fill="none" />

            {/* Left Hindwing Eye-Spot / Dots */}
            <circle cx="19" cy="51" r="1.5" fill={spotColor} />
            <circle cx="23" cy="56" r="1.3" fill={spotColor} />
          </motion.g>

          {/* RIGHT WING COMPLEX (Flaps gently on hover or active playback) */}
          <motion.g
            style={{ transformOrigin: '42px 34px' }}
            animate={
              isThisPlaying || isHovered
                ? {
                    rotateY: [0, -44, 4, -44, 0],
                    scaleX: [1, 0.75, 1.02, 0.75, 1]
                  }
                : {
                    rotateY: 0,
                    scaleX: 1
                  }
            }
            transition={
              isThisPlaying || isHovered
                ? {
                    duration: isThisPlaying ? 0.35 : 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                : { duration: 0.25 }
            }
          >
            {/* Right Forewing Base */}
            <path
              d="M 44 28 C 50 18 68 6 76 10 C 82 13 80 24 78 34 C 76 40 66 43 56 41 C 49 39 45 34 44 30 Z"
              fill={`url(#${primaryGrad})`}
            />

            {/* Right Forewing Velvet Border */}
            <path
              d="M 76 10 C 82 13 80 24 78 34 C 76 38 70 41 66 38 C 72 34 74 24 71 16 C 68 12 60 10 56 8 C 63 7 72 8 76 10 Z"
              fill={marginColor}
            />

            {/* Right Forewing Internal Veins */}
            <path d="M 46 29 Q 59 22 71 16" stroke={veinColor} strokeWidth="1.2" fill="none" />
            <path d="M 50 26 Q 64 18 74 24" stroke={veinColor} strokeWidth="1" fill="none" />
            <path d="M 51 28 Q 66 28 73 33" stroke={veinColor} strokeWidth="1" fill="none" />
            <path d="M 50 31 Q 60 34 66 39" stroke={veinColor} strokeWidth="0.9" fill="none" />

            {/* Right Forewing Discal Cell */}
            <path
              d="M 47 28 C 52 24 59 24 60 28 C 60 31 53 33 47 30 Z"
              fill={veinColor}
              opacity="0.35"
            />

            {/* Right Forewing Marginal Crescent Dots */}
            <circle cx="78" cy="19" r="1.3" fill={spotColor} />
            <circle cx="77" cy="25" r="1.3" fill={spotColor} />
            <circle cx="75" cy="31" r="1.3" fill={spotColor} />
            <circle cx="71" cy="36" r="1.1" fill={spotColor} />

            {/* Right Hindwing Base (Scalloped) */}
            <path
              d="M 44 34 C 48 34 58 36 66 43 C 72 48 70 56 64 60 C 58 63 52 58 49 52 C 46 47 45 40 44 36 Z"
              fill={`url(#${primaryGrad})`}
            />

            {/* Right Hindwing Scalloped Border */}
            <path
              d="M 66 43 C 72 48 70 56 64 60 C 61 62 58 60 58 56 C 62 54 66 49 62 45 Z"
              fill={marginColor}
            />

            {/* Right Hindwing Veins */}
            <path d="M 46 37 Q 56 44 64 52" stroke={veinColor} strokeWidth="1" fill="none" />
            <path d="M 47 40 Q 54 50 59 58" stroke={veinColor} strokeWidth="0.9" fill="none" />

            {/* Right Hindwing Eye-Spot / Dots */}
            <circle cx="65" cy="51" r="1.5" fill={spotColor} />
            <circle cx="61" cy="56" r="1.3" fill={spotColor} />
          </motion.g>

          {/* REALISTIC BUTTERFLY BODY & ANTENNAE */}
          {/* Left Antenna */}
          <path d="M 40 22 Q 33 8 26 9" stroke={bodyColor} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <ellipse cx="25" cy="8.5" rx="1.6" ry="2.2" transform="rotate(-30 25 8.5)" fill={bodyColor} />

          {/* Right Antenna */}
          <path d="M 44 22 Q 51 8 58 9" stroke={bodyColor} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <ellipse cx="59" cy="8.5" rx="1.6" ry="2.2" transform="rotate(30 59 8.5)" fill={bodyColor} />

          {/* Head with Compound Eye Highlights */}
          <ellipse cx="42" cy="22" rx="3.2" ry="3.5" fill={bodyColor} />
          <circle cx="40" cy="21" r="1" fill="#FFFFFF" opacity="0.4" />

          {/* Fuzzy Thorax */}
          <ellipse cx="42" cy="30" rx="3.8" ry="6" fill={bodyColor} />
          <ellipse cx="42" cy="29" rx="2" ry="3.5" fill={spotColor} opacity="0.3" />

          {/* Segmented Abdomen */}
          <path
            d="M 40.5 36 C 40.5 48 41 54 42 56 C 43 54 43.5 48 43.5 36 Z"
            fill={bodyColor}
          />
          {/* Abdominal Rings */}
          <line x1="40.5" y1="40" x2="43.5" y2="40" stroke={spotColor} strokeWidth="0.7" opacity="0.4" />
          <line x1="40.8" y1="44" x2="43.2" y2="44" stroke={spotColor} strokeWidth="0.7" opacity="0.4" />
          <line x1="41" y1="48" x2="43" y2="48" stroke={spotColor} strokeWidth="0.7" opacity="0.4" />
        </svg>

        {/* INTEGRATED LITTLE PLAY BUTTON ON THE BUTTERFLY */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full ${playBg} border flex items-center justify-center shadow-sm transition-transform group-hover:scale-110`}
        >
          <Play className="w-2 h-2 fill-current ml-0.5" />
        </div>

        {/* Dynamic active audio ring */}
        {isThisPlaying && (
          <span className="absolute -inset-1 rounded-full border-2 border-amber-400 animate-ping pointer-events-none"></span>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-2">
      {/* Floating Particle Container */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 0.6, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.8, x: p.x, y: p.y }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
            className="absolute left-1/2 top-1/3 text-2xl"
          >
            {p.emoji}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Engaging Headline, Information & CTAs */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Accreditation Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
            <span>Camrose Licensed Child Care</span>
            <span className="text-blue-300">·</span>
            <span className="text-amber-700 font-bold">Mon–Fri 6:00 AM – 6:30 PM</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
            Where little hearts{' '}
            <span className="text-red-600">feel safe</span>, and young minds{' '}
            <span className="text-blue-600 underline decoration-yellow-400 decoration-wavy">
              shine bright
            </span>
            .
          </h1>

          {/* Supporting Lead Description */}
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
            Welcome to Camrose Little Angels Daycare Society. Accredited play-based early learning, certified educators, fresh scratch-cooked meals, and shift-friendly care from infancy through school age.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenTour}
              className="px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-lg transition-all border-2 border-yellow-300 flex items-center gap-2 cursor-pointer"
            >
              <span>Book a Tour</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={BUSINESS_INFO.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-full shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>Register Now</span>
            </motion.a>
          </div>

          {/* Reassurance Metric Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 max-w-lg">
            <div className="p-2.5 sm:p-3 bg-white/90 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-base sm:text-xl font-black text-blue-700 block">6:00 AM</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase leading-tight block">Early Drop-Off</span>
            </div>
            <div className="p-2.5 sm:p-3 bg-white/90 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-base sm:text-xl font-black text-amber-600 block">0–12 Yrs</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase leading-tight block">Infant to School</span>
            </div>
            <div className="p-2.5 sm:p-3 bg-white/90 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-base sm:text-xl font-black text-emerald-600 block">100%</span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase leading-tight block">Alberta Licensed</span>
            </div>
          </div>
        </div>

        {/* Right Column: Natural Cutout Baby Surrounded by Calm Interactive Butterflies */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          {/* Subtle Static Warm Backdrop Glow */}
          <div className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full bg-gradient-to-tr from-yellow-200/30 via-amber-100/20 to-blue-200/20 blur-2xl pointer-events-none -z-10"></div>

          {/* Central Baby Stage with Butterflies */}
          <div className="relative flex items-center justify-center w-full max-w-md py-4">
            {butterflies.map((bf) => (
              <motion.button
                key={bf.id}
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoveredButterfly(bf.id)}
                onMouseLeave={() => setHoveredButterfly(null)}
                onClick={() => playBabyVoice(bf.trackIndex)}
                className={`absolute ${bf.positionClass} z-20 group cursor-pointer flex flex-col items-center justify-center min-w-[44px] min-h-[44px] transition-all focus:outline-none`}
                title={`Play voice: "${bf.phrase}"`}
                aria-label={`Childcare Voice Guide: ${bf.label}`}
              >
                {renderRealisticButterfly(bf.color, bf.id)}
                <span className="mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-slate-800 shadow-xs border border-slate-200 max-w-[125px] text-center sm:max-w-none sm:whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity pointer-events-none">
                  {bf.label}
                </span>
              </motion.button>
            ))}

            {/* SEAMLESS BABY CUTOUT (No borders, sitting naturally in center) */}
            <div
              className="relative cursor-pointer group"
              onClick={() => playBabyVoice()}
              title="Click to hear our Childcare Voice Guide"
            >
              {/* Contact Shadow under baby */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-slate-900/15 rounded-full blur-md pointer-events-none"></div>

              {/* Calm Baby Portrait (Animates gently only when speaking) */}
              <motion.div
                animate={
                  isWaving
                    ? {
                        y: [0, -8, 0, -5, 0],
                        rotate: [0, -1.5, 1.5, 0]
                      }
                    : { y: 0, rotate: 0 }
                }
                transition={{
                  duration: 1.1,
                  repeat: isWaving ? 1 : 0,
                  ease: 'easeInOut'
                }}
                className="relative w-60 sm:w-72 md:w-80 aspect-square select-none"
                style={{
                  filter: 'drop-shadow(0 18px 26px rgba(15, 23, 42, 0.14))'
                }}
              >
                <img
                  src={IMAGES.realBabyTransparent}
                  alt="Smiling child mascot representing Camrose Little Angels Childcare Voice Guide"
                  decoding="async"
                  className="w-full h-full object-contain pointer-events-none"
                />

                {/* Blinking Eyelid Overlay */}
                {isBlinking && (
                  <div className="absolute top-[23%] left-[45%] w-14 h-4 bg-[#e8b598] rounded-full blur-[0.5px] opacity-90 pointer-events-none"></div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Clean Inline Childcare Voice Guide Bar (Shown when triggered, no overlapping speech cloud) */}
          <AnimatePresence>
            {showSpeechBubble && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                className="w-full max-w-sm mb-2 bg-white/95 rounded-2xl shadow-md border border-blue-200 px-4 py-2.5 text-center"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Childcare Voice Guide
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                      aria-label={isMuted ? 'Unmute voice guide' : 'Mute voice guide'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-3.5 h-3.5 text-red-500" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSpeechBubble(false)}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                      aria-label="Close voice guide caption"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                  "{currentTrack.dialogue}"
                </p>

                {isPlaying && (
                  <p className="text-[10px] text-blue-600 font-bold mt-1">Speaking...</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Under-Baby Clean Voice Guide Trigger */}
          <button
            type="button"
            onClick={() => playBabyVoice()}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-blue-700 bg-white/90 px-4 py-1.5 rounded-full border border-slate-200 shadow-xs mt-1 transition-colors cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Tap a butterfly or baby for our Childcare Voice Guide</span>
          </button>
        </div>

      </div>
    </div>
  );
};
