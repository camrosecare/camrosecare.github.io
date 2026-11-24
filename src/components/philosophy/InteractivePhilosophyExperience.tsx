import React, { Suspense, lazy, useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen
} from 'lucide-react';
const ParentHandbookModal = lazy(() =>
  import('./ParentHandbookModal').then((m) => ({
    default: m.ParentHandbookModal
  }))
);

interface InteractivePhilosophyProps {
  onOpenTour?: (programId?: string) => void;
  onOpenSubsidy?: () => void;
  embedded?: boolean;
  variant?: 'full' | 'card';
}

interface StorySentence {
  id: number;
  text: string;
  spokenText: string;
  durationMs: number;
  chimeFreq: number;
  styledHtml: React.ReactNode;
}

// Exact 6-Scene Narration Sequence with alternating royal blue and cherry red typography
const STORY_SENTENCES: StorySentence[] = [
  {
    id: 0,
    text: 'Every child has a world of possibilities waiting to unfold.',
    spokenText: 'Every child has a world of possibilities, waiting to unfold.',
    durationMs: 4600,
    chimeFreq: 523.25, // C5
    styledHtml: (
      <span>
        <span className="text-blue-900 font-extrabold">Every child has a </span>
        <span className="text-red-600 font-black">world of possibilities</span>
        <span className="text-blue-900 font-extrabold"> waiting to </span>
        <span className="text-red-600 font-black">unfold.</span>
      </span>
    )
  },
  {
    id: 1,
    text: 'At Camrose Little Angels, we believe every child is unique, capable and full of potential.',
    spokenText: 'At Camrose Little Angels, we believe every child is unique, capable, and full of potential.',
    durationMs: 5400,
    chimeFreq: 587.33, // D5
    styledHtml: (
      <span>
        <span className="text-blue-900 font-extrabold">At Camrose Little Angels, we believe every child is </span>
        <span className="text-red-600 font-black">unique</span>
        <span className="text-blue-900 font-extrabold">, </span>
        <span className="text-blue-800 font-black">capable</span>
        <span className="text-blue-900 font-extrabold"> and full of </span>
        <span className="text-red-600 font-black">potential.</span>
      </span>
    )
  },
  {
    id: 2,
    text: 'Through play, creativity and exploration, little minds discover, learn and grow.',
    spokenText: 'Through play, creativity, and exploration, little minds discover, learn, and grow.',
    durationMs: 5200,
    chimeFreq: 659.25, // E5
    styledHtml: (
      <span>
        <span className="text-blue-900 font-extrabold">Through </span>
        <span className="text-red-600 font-black">play</span>
        <span className="text-blue-900 font-extrabold">, </span>
        <span className="text-blue-800 font-black">creativity</span>
        <span className="text-blue-900 font-extrabold"> and </span>
        <span className="text-red-600 font-black">exploration</span>
        <span className="text-blue-900 font-extrabold">, little minds </span>
        <span className="text-red-600 font-black">discover, learn and grow.</span>
      </span>
    )
  },
  {
    id: 3,
    text: 'With love, care and encouragement, we build confidence, nurture friendships and inspire independence.',
    spokenText: 'With love, care, and encouragement, we build confidence, nurture friendships, and inspire independence.',
    durationMs: 6000,
    chimeFreq: 783.99, // G5
    styledHtml: (
      <span>
        <span className="text-blue-900 font-extrabold">With </span>
        <span className="text-red-600 font-black">love</span>
        <span className="text-blue-900 font-extrabold">, </span>
        <span className="text-blue-800 font-black">care</span>
        <span className="text-blue-900 font-extrabold"> and </span>
        <span className="text-red-600 font-black">encouragement</span>
        <span className="text-blue-900 font-extrabold">, we build </span>
        <span className="text-blue-800 font-black">confidence</span>
        <span className="text-blue-900 font-extrabold">, </span>
        <span className="text-red-600 font-black">nurture friendships</span>
        <span className="text-blue-900 font-extrabold"> and inspire </span>
        <span className="text-red-600 font-black">independence.</span>
      </span>
    )
  },
  {
    id: 4,
    text: 'Our purpose is to provide a safe, happy place where every child feels valued, supported and free to shine.',
    spokenText: 'Our purpose is to provide a safe, happy place, where every child feels valued, supported, and free to shine.',
    durationMs: 6000,
    chimeFreq: 880.0, // A5
    styledHtml: (
      <span>
        <span className="text-blue-900 font-extrabold">Our purpose is to provide a </span>
        <span className="text-red-600 font-black">safe, happy place</span>
        <span className="text-blue-900 font-extrabold"> where every child feels </span>
        <span className="text-blue-800 font-black">valued</span>
        <span className="text-blue-900 font-extrabold">, </span>
        <span className="text-red-600 font-black">supported</span>
        <span className="text-blue-900 font-extrabold"> and </span>
        <span className="text-blue-800 font-black">free to shine.</span>
      </span>
    )
  },
  {
    id: 5,
    text: 'Because little beginnings create beautiful futures!',
    spokenText: 'Because little beginnings, create beautiful futures!',
    durationMs: 4400,
    chimeFreq: 1046.5, // C6
    styledHtml: (
      <span>
        <span className="text-blue-900 font-extrabold">Because </span>
        <span className="text-red-600 font-black">little beginnings</span>
        <span className="text-blue-900 font-extrabold"> create </span>
        <span className="text-red-600 font-black">beautiful futures!</span>
      </span>
    )
  }
];

// Helper to select the warmest, most natural human-sounding female storyteller voice
const selectBestFemaleNarrator = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  if (!voices || voices.length === 0) return null;

  let bestVoice: SpeechSynthesisVoice | null = null;
  let highestScore = -999;

  voices.forEach((v) => {
    if (!v.lang.startsWith('en')) return;
    let score = 0;
    const name = v.name.toLowerCase();
    const uri = (v.voiceURI || '').toLowerCase();

    // Prioritize natural, neural, and online human voices
    if (name.includes('natural') || uri.includes('natural')) score += 80;
    if (name.includes('online') || uri.includes('online')) score += 50;
    if (name.includes('enhanced') || uri.includes('enhanced')) score += 70;
    if (name.includes('premium') || uri.includes('premium')) score += 60;

    // Highest rated natural female storytelling voices
    if (name.includes('jenny')) score += 95; // Microsoft Jenny Natural (warm, gentle, human-like)
    if (name.includes('aria')) score += 85; // Microsoft Aria Natural
    if (name.includes('ava')) score += 75; // Apple Ava Enhanced
    if (name.includes('samantha')) score += 70; // Apple Samantha Enhanced
    if (name.includes('clara')) score += 75; // Canadian English Natural Female
    if (name.includes('victoria')) score += 60;
    if (name.includes('sonia')) score += 65;
    if (name.includes('karen')) score += 50;
    if (name.includes('google uk english female')) score += 65;
    if (name.includes('google us english')) score += 55;
    if (name.includes('female')) score += 40;

    // Penalize robotic, low quality, and male voices
    if (name.includes('espeak') || uri.includes('espeak')) score -= 150;
    if (name.includes('david')) score -= 100;
    if (name.includes('mark')) score -= 100;
    if (name.includes('george')) score -= 100;
    if (name.includes('guy')) score -= 100;
    if (name.includes('male') && !name.includes('female')) score -= 80;

    // Regional English preference
    if (v.lang === 'en-CA') score += 20;
    if (v.lang === 'en-US') score += 15;
    if (v.lang === 'en-GB') score += 10;

    if (score > highestScore) {
      highestScore = score;
      bestVoice = v;
    }
  });

  return bestVoice;
};

export const InteractivePhilosophyExperience: React.FC<InteractivePhilosophyProps> = ({
  onOpenTour = () => {},
  onOpenSubsidy = () => {},
  embedded = false,
  variant = 'full'
}) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(rootRef, { margin: '120px' });
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = isInView && !shouldReduceMotion;

  const timerRef = useRef<any>(null);
  const bubbleTimeoutRef = useRef<any>(null);
  const isPlayingRef = useRef(isPlaying);
  const isMutedRef = useRef(isMuted);

  isPlayingRef.current = isPlaying;
  isMutedRef.current = isMuted;

  // Pre-warm and select best female narrator voice asynchronously
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const best = selectBestFemaleNarrator(voices);
        if (best) setSelectedVoice(best);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Gentle pentatonic audio chime for story transitions
  const playChime = useCallback((freq = 523.25) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.33, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // AudioContext unavailable or restricted
    }
  }, []);

  // Natural female voice narrator engine
  const speakSentence = useCallback((index: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setCurrentSentenceIndex(index);

    if (!('speechSynthesis' in window)) {
      timerRef.current = setTimeout(() => {
        if (!isPlayingRef.current) return;
        if (index < STORY_SENTENCES.length - 1) {
          speakSentence(index + 1);
        } else {
          setIsPlaying(false);
          setIsCompleted(true);
        }
      }, STORY_SENTENCES[index].durationMs);
      return;
    }

    window.speechSynthesis.cancel();

    if (isMutedRef.current) {
      timerRef.current = setTimeout(() => {
        if (!isPlayingRef.current) return;
        if (index < STORY_SENTENCES.length - 1) {
          speakSentence(index + 1);
        } else {
          setIsPlaying(false);
          setIsCompleted(true);
        }
      }, STORY_SENTENCES[index].durationMs);
      return;
    }

    playChime(STORY_SENTENCES[index].chimeFreq);

    const sentence = STORY_SENTENCES[index];
    const utterance = new SpeechSynthesisUtterance(sentence.spokenText);

    // Natural, warm, conversational female storyteller delivery
    utterance.rate = 0.88; // Calm, gentle, caring storytelling tempo
    utterance.pitch = 1.0; // Natural resonant human vocal pitch (no robotic distortion)
    utterance.volume = 1.0;

    // Use pre-warmed best female voice or resolve immediately
    const bestVoice = selectedVoice || selectBestFemaleNarrator(window.speechSynthesis.getVoices());
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onend = () => {
      if (!isPlayingRef.current) return;
      if (index < STORY_SENTENCES.length - 1) {
        timerRef.current = setTimeout(() => {
          if (!isPlayingRef.current) return;
          speakSentence(index + 1);
        }, 650);
      } else {
        setIsPlaying(false);
        setIsCompleted(true);
      }
    };

    utterance.onerror = () => {
      if (!isPlayingRef.current) return;
      timerRef.current = setTimeout(() => {
        if (!isPlayingRef.current) return;
        if (index < STORY_SENTENCES.length - 1) {
          speakSentence(index + 1);
        } else {
          setIsPlaying(false);
          setIsCompleted(true);
        }
      }, STORY_SENTENCES[index].durationMs);
    };

    window.speechSynthesis.speak(utterance);
  }, [playChime, selectedVoice]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      setIsCompleted(false);
      const nextIndex = currentSentenceIndex !== null && currentSentenceIndex < STORY_SENTENCES.length
        ? currentSentenceIndex
        : 0;
      speakSentence(nextIndex);
    }
  };

  // Replay
  const handleReplay = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsCompleted(false);
    setIsPlaying(true);
    speakSentence(0);
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else if (isPlaying && currentSentenceIndex !== null) {
      speakSentence(currentSentenceIndex);
    }
  };

  // Character speech bubble
  const handleTriggerSpeech = (text: string) => {
    playChime(784);
    setSpeechBubble(text);
    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => {
      setSpeechBubble(null);
    }, 4000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (bubbleTimeoutRef.current) {
        clearTimeout(bubbleTimeoutRef.current);
      }
    };
  }, []);

  const currentSentence = currentSentenceIndex !== null ? STORY_SENTENCES[currentSentenceIndex] : null;

  const WrapperTag = embedded ? 'div' : 'section';

  // Full-billboard card mode: Fills 100% width and height of the inner billboard window
  // edge-to-edge within its black border, keeping all 3D visuals and controls crisp.
  if (variant === 'card') {
    return (
      <div
        ref={rootRef}
        aria-label="Our Philosophy - 3D Animated Playground Experience"
        className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-[#3B91DA] via-[#58A8E6] to-[#4E7E24]"
      >
        {/* Top Sky Extension above Rainbow (matches upper sky of 3D artwork) */}
        <div className="relative w-full h-[21%] shrink-0 bg-gradient-to-b from-[#3B91DA] via-[#4C9FE1] to-[#4594D9] overflow-hidden">
          {/* Subtle sunlit cloud shimmer on upper right sky */}
          <div className="absolute -top-4 -right-6 w-28 h-16 rounded-full bg-white/25 blur-lg pointer-events-none" />
          <div className="absolute top-2 left-4 w-20 h-10 rounded-full bg-white/15 blur-md pointer-events-none" />

          {/* Sound On / Muted Toggle (Top Right inside sky) */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="absolute top-2 right-2.5 z-30 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 hover:bg-white text-slate-700 text-[8px] sm:text-[9px] font-black shadow-xs border border-sky-200 cursor-pointer"
            title={isMuted ? 'Unmute Story Narration' : 'Mute Story Narration'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-500" />
                <span>Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-600" />
                <span>Sound On</span>
              </>
            )}
          </button>
        </div>

        {/* Center Interactive 3D Playground Scene (Full Width, Seamless Top/Bottom Feather) */}
        <div className="relative w-full h-[58%] shrink-0">
          <img
            src="/assets/images/philosophy_3d_clean.webp"
            alt="Camrose Little Angels - Our Philosophy 3D Animated Playground"
            className="w-full h-full object-fill block select-none pointer-events-none"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 7%, black 93%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 7%, black 93%, transparent 100%)'
            }}
            loading="lazy"
            decoding="async"
          />

          {/* Smiling 3D Sunshine Glow & Handbook Hotspot */}
          <motion.div
            animate={shouldAnimate ? { y: [0, -4, 0], scale: [1, 1.03, 1] } : { y: 0, scale: 1 }}
            transition={{ duration: 4, repeat: shouldAnimate ? Infinity : 0, ease: 'easeInOut' }}
            className="absolute top-[20%] right-[6%] w-[20%] aspect-square rounded-full pointer-events-none z-15"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-300/25 via-yellow-200/30 to-transparent blur-md" />
          </motion.div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playChime(698.46);
              setIsHandbookOpen(true);
            }}
            className="absolute top-[14%] right-[3%] min-w-[44px] min-h-[44px] w-[26%] sm:w-[22%] h-[38%] z-25 cursor-pointer group flex items-start justify-end focus:outline-none"
            aria-label="Open Parent Handbook"
            title="Click to Open the Official Parent Handbook"
          >
            <span className="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-black text-[8.5px] sm:text-[9px] px-2 py-1 rounded-full shadow-md border border-white flex items-center gap-0.5 group-hover:scale-105 transition-transform">
              <BookOpen className="w-2.5 h-2.5 shrink-0" />
              <span>Handbook</span>
            </span>
          </motion.button>

          {/* Rainbow Shimmer Sparkles */}
          <motion.div
            animate={shouldAnimate ? { opacity: [0.35, 0.9, 0.35] } : { opacity: 0.6 }}
            transition={{ duration: 3.5, repeat: shouldAnimate ? Infinity : 0, ease: 'easeInOut' }}
            className="absolute top-[8%] left-[20%] w-[60%] h-[25%] pointer-events-none z-10"
          >
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#fff] absolute top-[30%] left-[25%]" />
            <div className="w-2 h-2 rounded-full bg-yellow-200 shadow-[0_0_10px_#fde047] absolute top-[50%] left-[65%]" />
          </motion.div>

          {/* Interactive Playground Children Hotspots */}
          <button
            type="button"
            onClick={() => handleTriggerSpeech('Hop hop! Welcome to our happy daycare!')}
            className="absolute bottom-[4%] left-[10%] w-[13%] h-[22%] sm:left-[12%] sm:w-[8%] sm:h-[16%] z-20 cursor-pointer rounded-full focus:outline-none"
            aria-label="Little bunny on meadow"
            title="Meet Barnaby Bunny!"
          />
          <button
            type="button"
            onClick={() => handleTriggerSpeech('We love active playtime in the sunshine!')}
            className="absolute bottom-[8%] left-[20%] w-[14%] h-[34%] z-20 cursor-pointer rounded-full focus:outline-none"
            aria-label="Girl in yellow dress"
            title="Ella"
          />
          <button
            type="button"
            onClick={() => handleTriggerSpeech('Play is how we learn and grow!')}
            className="absolute bottom-[6%] left-[38%] w-[12%] h-[32%] z-20 cursor-pointer rounded-full focus:outline-none"
            aria-label="Boy in blue shirt"
            title="Leo"
          />
          <button
            type="button"
            onClick={() => handleTriggerSpeech('Full of painting, stories and friendship!')}
            className="absolute bottom-[6%] left-[49%] w-[12%] h-[32%] z-20 cursor-pointer rounded-full focus:outline-none"
            aria-label="Girl in green skirt"
            title="Mia"
          />
          <button
            type="button"
            onClick={() => {
              playChime(659.25);
              onOpenTour();
            }}
            className="absolute bottom-[5%] right-[16%] w-[26%] h-[34%] z-20 cursor-pointer rounded-xl focus:outline-none"
            aria-label="Children sharing flowers and playing"
            title="Click to Book a Tour"
          />

          {/* Compact Speech Bubble */}
          <AnimatePresence>
            {speechBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 6 }}
                className="absolute bottom-[38%] left-1/2 -translate-x-1/2 z-40 bg-white border-2 border-amber-400 text-slate-900 px-2.5 py-1 rounded-xl shadow-lg font-black text-[9px] sm:text-[10px] flex items-center gap-1 max-w-[94%] text-center"
              >
                <span className="leading-tight">{speechBubble}</span>
                <button
                  type="button"
                  onClick={() => setSpeechBubble(null)}
                  className="text-slate-400 hover:text-slate-700 font-bold shrink-0 px-1"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Central Orange Play / Pause / Replay Button */}
          <div className="absolute top-[30%] sm:top-[33%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
            {isCompleted ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleReplay}
                className="w-11 h-11 rounded-full shadow-lg flex items-center justify-center cursor-pointer border-2 border-white bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white"
                aria-label="Replay Philosophy Story"
                title="Replay Story"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleTogglePlay}
                className={`w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all cursor-pointer border-2 border-white ${
                  isPlaying
                    ? 'bg-amber-500 text-white ring-2 ring-amber-300 animate-pulse'
                    : 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white hover:from-amber-600 hover:to-orange-600'
                }`}
                aria-label={isPlaying ? 'Pause Story' : 'Play Philosophy Story'}
                title={isPlaying ? 'Pause Story' : 'Listen to Our Philosophy Story'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white ml-0.5" />
                )}
              </motion.button>
            )}

            <div className="mt-1 px-2 py-0.5 rounded-full bg-white/95 shadow-xs border border-orange-200 whitespace-nowrap">
              <span className="text-[8.5px] sm:text-[9px] font-black text-slate-800 flex items-center gap-0.5">
                {isPlaying ? (
                  <span className="text-orange-600 flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5 animate-spin" /> Playing...
                  </span>
                ) : isCompleted ? (
                  <span>↺ Replay Story</span>
                ) : (
                  <span>▶ Play Philosophy</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Meadow Extension (houses crisp narration subtitles below children) */}
        <div className="relative w-full h-[21%] shrink-0 bg-gradient-to-b from-[#618D2C] via-[#538025] to-[#3B661C] flex items-center justify-center px-2 sm:px-4 text-center">
          <AnimatePresence mode="wait">
            {currentSentence ? (
              <motion.div
                key={currentSentence.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <p
                  className="text-[9.5px] sm:text-[10.5px] leading-tight sm:leading-snug font-extrabold"
                  style={{
                    filter:
                      'drop-shadow(0 1px 2px rgba(255, 255, 255, 1)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.98))'
                  }}
                >
                  "{currentSentence.styledHtml}"
                </p>
              </motion.div>
            ) : (
              <p
                className="text-[9px] sm:text-[10px] font-extrabold text-blue-950 inline-flex items-center justify-center gap-1 leading-tight"
                style={{
                  filter:
                    'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))'
                }}
              >
                <span>Press Play to hear Our Philosophy Story</span>
                <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
              </p>
            )}
          </AnimatePresence>
        </div>

        {isHandbookOpen && (
          <Suspense fallback={null}>
            <ParentHandbookModal
              isOpen={isHandbookOpen}
              onClose={() => setIsHandbookOpen(false)}
              onOpenTour={onOpenTour}
              onOpenSubsidy={onOpenSubsidy}
            />
          </Suspense>
        )}
      </div>
    );
  }

  return (
    <WrapperTag
      ref={rootRef as React.RefObject<HTMLDivElement>}
      id="about"
      aria-label="Our Philosophy - 3D Animated Playground Experience"
      className={
        embedded
          ? 'relative w-full overflow-visible transition-colors select-none pt-2 pb-4 sm:pb-6 scroll-mt-24'
          : 'relative w-full overflow-hidden bg-gradient-to-b from-white via-[#CBEBFF]/40 to-white transition-colors select-none py-4 sm:py-8'
      }
    >
      {/* =========================================================
          SEAMLESS GRADIENTS (NO OUTER RECTANGULAR CARD OR BORDER)
          Soft sky transition on top & soft grass transition on bottom
         ========================================================= */}
      {!embedded && (
        <>
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20" />
        </>
      )}

      {/* Discreet Mute Button (Floating Upper Corner) */}
      <div className="max-w-6xl mx-auto px-4 flex justify-end relative z-30 mb-2">
        <button
          type="button"
          onClick={handleToggleMute}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 text-xs font-bold shadow-xs border border-sky-100 backdrop-blur-xs transition-colors cursor-pointer"
          title={isMuted ? 'Unmute Story Narration' : 'Mute Story Narration'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
              <span>Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sound On</span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================
          THE BEAUTIFUL 3D CARTOON PLAYGROUND ENVIRONMENT
          Features Pixar-style 3D rendered world, clean fluffy cloud,
          smiling sunshine, children playing, and single central play button.
         ========================================================= */}
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="relative w-full overflow-visible">
          {/* Master 3D Pixar Illustration: Clean, No Cloud Button, Pure Volumetric 3D */}
          <img
            src="/assets/images/philosophy_3d_clean.webp"
            alt="Camrose Little Angels - Our Philosophy 3D Animated Playground with Rainbow, Sunshine, and Playing Children"
            className="w-full h-auto block select-none pointer-events-none"
            style={
              embedded
                ? {
                    maskImage:
                      'linear-gradient(to bottom, transparent 0%, black 7%, black 91%, transparent 100%)',
                    WebkitMaskImage:
                      'linear-gradient(to bottom, transparent 0%, black 7%, black 91%, transparent 100%)'
                  }
                : undefined
            }
            loading="lazy"
            decoding="async"
          />

          {/* =========================================================
              LIVING ENVIRONMENTAL ANIMATIONS
             ========================================================= */}
          {/* 1. Smiling 3D Sunshine Bobbing & Glowing (Top Right) */}
          <motion.div
            animate={
              shouldAnimate
                ? {
                    y: [0, -7, 0],
                    scale: [1, 1.03, 1]
                  }
                : { y: 0, scale: 1 }
            }
            transition={{ duration: 4, repeat: shouldAnimate ? Infinity : 0, ease: 'easeInOut' }}
            className="absolute top-[20%] right-[6%] w-[20%] aspect-square rounded-full pointer-events-none z-15"
          >
            {/* Subtle warm sunbeam halo */}
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-300/25 via-yellow-200/30 to-transparent blur-xl" />
          </motion.div>

          {/* Clickable Sunshine & Parent Handbook Hotspot */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playChime(698.46);
              setIsHandbookOpen(true);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsHandbookOpen(true);
              }
            }}
            className="absolute top-[22%] right-[7%] w-[18%] h-[32%] z-30 cursor-pointer group flex items-center justify-center select-none"
            aria-label="Open Parent Handbook"
            title="Click to Open the Official Parent Handbook"
          >
            <div className="absolute -top-3 sm:-top-5 right-2 sm:right-6 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-black text-[9px] sm:text-xs md:text-sm px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5 group-hover:scale-105 transition-transform">
              <BookOpen className="w-3.5 h-3.5 text-blue-950 shrink-0" />
              <span>Read Handbook</span>
            </div>
            <div className="w-full h-full rounded-full group-hover:bg-yellow-400/20 transition-colors pointer-events-none" />
          </motion.div>

          {/* 2. Natural Flying Butterflies along Curved Paths */}
          {/* Orange Butterfly (Left) */}
          <motion.div
            animate={
              shouldAnimate
                ? {
                    x: [0, 20, -14, 0],
                    y: [0, -22, 10, 0]
                  }
                : { x: 0, y: 0 }
            }
            transition={{ duration: 5.5, repeat: shouldAnimate ? Infinity : 0, ease: 'easeInOut' }}
            className="absolute top-[50%] left-[21%] w-[4%] aspect-square pointer-events-none z-25"
          >
            <motion.div
              animate={shouldAnimate ? { scaleX: [1, 0.2, 1] } : { scaleX: 1 }}
              transition={{ duration: 0.28, repeat: shouldAnimate ? Infinity : 0, ease: 'easeInOut' }}
              className="w-full h-full"
            />
          </motion.div>

          {/* Purple Butterfly (Center-Right) */}
          <motion.div
            animate={
              shouldAnimate
                ? {
                    x: [0, -16, 12, 0],
                    y: [0, -18, 12, 0]
                  }
                : { x: 0, y: 0 }
            }
            transition={{ duration: 6, repeat: shouldAnimate ? Infinity : 0, ease: 'easeInOut', delay: 0.6 }}
            className="absolute top-[52%] right-[24%] w-[4%] aspect-square pointer-events-none z-25"
          >
            <motion.div
              animate={shouldAnimate ? { scaleX: [1, 0.22, 1] } : { scaleX: 1 }}
              transition={{ duration: 0.3, repeat: shouldAnimate ? Infinity : 0, ease: 'easeInOut' }}
              className="w-full h-full"
            />
          </motion.div>

          {/* 3. Floating Balloons Gentle Swaying */}
          <motion.div
            animate={
              shouldAnimate
                ? {
                    y: [0, -12, 0],
                    rotate: [-2, 2, -2]
                  }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 5, repeat: shouldAnimate ? Infinity : 0, ease: 'easeInOut' }}
            className="absolute top-[32%] left-[2%] w-[12%] h-[32%] pointer-events-none z-15"
          />

          {/* 4. Rainbow Shimmer Sparkles */}
          <motion.div
            animate={shouldAnimate ? { opacity: [0.35, 0.9, 0.35] } : { opacity: 0.6 }}
            transition={{ duration: 3.5, repeat: shouldAnimate ? Infinity : 0, ease: 'easeInOut' }}
            className="absolute top-[8%] left-[20%] w-[60%] h-[25%] pointer-events-none z-10"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#fff] absolute top-[30%] left-[25%]" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-200 shadow-[0_0_14px_#fde047] absolute top-[50%] left-[65%]" />
          </motion.div>

          {/* =========================================================
              INTERACTIVE 3D PLAYGROUND CHILDREN
             ========================================================= */}
          {/* Bunny Hotspot */}
          <button
            type="button"
            onClick={() => handleTriggerSpeech('Hop hop! Welcome to our happy daycare family!')}
            className="absolute bottom-[4%] left-[12%] w-[8%] h-[15%] z-20 cursor-pointer rounded-full focus:outline-none"
            aria-label="Little bunny on meadow"
            title="Meet Barnaby Bunny!"
          />

          {/* Girl in Yellow Dress with Ball */}
          <button
            type="button"
            onClick={() => handleTriggerSpeech('Catch! We love active playtime in the sunshine!')}
            className="absolute bottom-[8%] left-[20%] w-[14%] h-[34%] z-20 cursor-pointer rounded-full focus:outline-none"
            aria-label="Girl in yellow dress"
            title="Ella"
          />

          {/* Boy in Blue Shirt Running */}
          <button
            type="button"
            onClick={() => handleTriggerSpeech('Race you to the swings! Play is how we learn and grow!')}
            className="absolute bottom-[6%] left-[38%] w-[12%] h-[32%] z-20 cursor-pointer rounded-full focus:outline-none"
            aria-label="Boy in blue shirt"
            title="Leo"
          />

          {/* Girl in Pink Top & Green Skirt */}
          <button
            type="button"
            onClick={() => handleTriggerSpeech('Every day is full of painting, stories and friendship!')}
            className="absolute bottom-[6%] left-[49%] w-[12%] h-[32%] z-20 cursor-pointer rounded-full focus:outline-none"
            aria-label="Girl in green skirt"
            title="Mia"
          />

          {/* Boy with Flower & Girl Sharing */}
          <button
            type="button"
            onClick={() => {
              playChime(659.25);
              onOpenTour();
            }}
            className="absolute bottom-[5%] right-[16%] w-[26%] h-[34%] z-20 cursor-pointer rounded-2xl focus:outline-none group"
            aria-label="Children sharing flowers and playing"
            title="Click to Book a Tour or Register"
          >
            <div className="absolute -top-3 right-8 bg-blue-600 hover:bg-blue-700 text-white font-black text-[9px] sm:text-xs px-2.5 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1 group-hover:scale-105 transition-transform">
              <span>Tour & Enroll</span>
            </div>
          </button>

          {/* Interactive Speech Bubble */}
          <AnimatePresence>
            {speechBubble && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 15 }}
                className="absolute bottom-[44%] left-1/2 -translate-x-1/2 z-40 bg-white border-3 border-amber-400 text-slate-900 px-4 py-2.5 rounded-2xl shadow-2xl font-black text-xs sm:text-sm flex items-center gap-2 max-w-[85%]"
              >
                <span>{speechBubble}</span>
                <button
                  type="button"
                  onClick={() => setSpeechBubble(null)}
                  className="text-slate-400 hover:text-slate-700 ml-1 text-xs font-bold"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =========================================================
              THE ONLY ONE CENTRALLY POSITIONED ORANGE PLAY BUTTON
              Positioned directly in the center of the scene.
              Size, colour, appearance and functionality preserved.
             ========================================================= */}
          <div className="absolute top-[35%] sm:top-[36%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
            {isCompleted ? (
              // Replay Button after story completes
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleReplay}
                className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border-3 sm:border-4 border-white bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white transition-transform"
                aria-label="Replay Philosophy Story"
                title="Replay Story"
              >
                <RotateCcw className="w-7 h-7 sm:w-9 sm:h-9 stroke-[2.5]" />
              </motion.button>
            ) : (
              // Main Central Orange Play / Pause Button
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleTogglePlay}
                className={`w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer border-3 sm:border-4 border-white ${
                  isPlaying
                    ? 'bg-amber-500 text-white ring-4 ring-amber-300 animate-pulse'
                    : 'bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white hover:from-amber-600 hover:to-orange-600 shadow-orange-300'
                }`}
                aria-label={isPlaying ? 'Pause Story' : 'Play Philosophy Story'}
                title={isPlaying ? 'Pause Story' : 'Listen to Our Philosophy Story'}
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 sm:w-9 sm:h-9 fill-white" />
                ) : (
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white ml-1 sm:ml-1.5" />
                )}
              </motion.button>
            )}

            {/* Friendly Label below button */}
            <motion.div
              animate={shouldAnimate ? { y: [0, -2, 0] } : { y: 0 }}
              transition={{ duration: 2.5, repeat: shouldAnimate ? Infinity : 0, ease: 'easeInOut' }}
              className="mt-1.5 sm:mt-2 px-3 py-0.5 rounded-full bg-white/95 shadow-sm border border-orange-200"
            >
              <span className="text-[10px] sm:text-xs font-black text-slate-800 flex items-center gap-1">
                {isPlaying ? (
                  <span className="text-orange-600 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" /> Narration in progress...
                  </span>
                ) : isCompleted ? (
                  <span>↺ Click to Replay Story</span>
                ) : (
                  <span>▶ Play Philosophy Story</span>
                )}
              </span>
            </motion.div>
          </div>

          {/* =========================================================
              SUBTITLES DIRECTLY OVER THE 3D ILLUSTRATED LANDSCAPE
              STRICT COMPLIANCE: NO background strip, NO navy bar,
              NO caption box, NO opaque panel.
              Typography: Royal Blue & Cherry Red with multi-layer glow.
             ========================================================= */}
          <div className="absolute bottom-[2%] sm:bottom-[3%] left-0 right-0 z-30 pointer-events-none px-4 sm:px-8 text-center">
            <AnimatePresence mode="wait">
              {currentSentence && (
                <motion.div
                  key={currentSentence.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-4xl mx-auto"
                >
                  <p
                    className="text-base sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-tight"
                    style={{
                      filter:
                        'drop-shadow(0 2px 4px rgba(255, 255, 255, 1)) drop-shadow(0 0 16px rgba(255, 255, 255, 0.95)) drop-shadow(0 0 28px rgba(255, 255, 255, 0.9))'
                    }}
                  >
                    "{currentSentence.styledHtml}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Parent Handbook Modal Component */}
      {isHandbookOpen && (
        <Suspense fallback={null}>
          <ParentHandbookModal
            isOpen={isHandbookOpen}
            onClose={() => setIsHandbookOpen(false)}
            onOpenTour={onOpenTour}
            onOpenSubsidy={onOpenSubsidy}
          />
        </Suspense>
      )}
    </WrapperTag>
  );
};
