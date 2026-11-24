import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Sparkles,
  Heart,
  ZoomIn,
  X,
  Palette,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CREATIVE_GALLERY_POSTERS, GalleryPoster } from '../../data/daycareData';
import { CartoonBillboardHeader } from './CartoonBillboardHeader';

const MAX_ARTWORK_UPLOAD_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif'
]);

interface RollingPosterGalleryProps {
  includePhilosophy?: boolean;
  onOpenTour?: (programId?: string) => void;
  onOpenSubsidy?: () => void;
}

export const RollingPosterGallery: React.FC<RollingPosterGalleryProps> = ({
  includePhilosophy = false,
  onOpenTour,
  onOpenSubsidy
}) => {
  const [posters, setPosters] = useState<GalleryPoster[]>(CREATIVE_GALLERY_POSTERS);
  const [activePoster, setActivePoster] = useState<GalleryPoster | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const autoRotate = true;
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [likesMap, setLikesMap] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    CREATIVE_GALLERY_POSTERS.forEach((p) => {
      initial[p.id] = p.likes;
    });
    return initial;
  });
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});

  // Dynamic physics refs
  const velocityRef = useRef<number>(0);
  const angleRef = useRef<number>(0);
  const isInteractingRef = useRef<boolean>(false);
  const lastMouseXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New artwork upload form state
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newAge, setNewAge] = useState('Age 4');
  const [newMedium, setNewMedium] = useState('Finger Paint & Crayon');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [newClipColor, setNewClipColor] = useState<'blue' | 'red' | 'yellow'>('yellow');
  const [isMobileViewport, setIsMobileViewport] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const updateViewport = () => {
      setIsMobileViewport(window.innerWidth < 640);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Pause 3D spin & ambient loops when section is off-screen
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0]?.isIntersecting ?? false);
      },
      { rootMargin: '120px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Keep ref in sync
  useEffect(() => {
    angleRef.current = rotationAngle;
  }, [rotationAngle]);

  // Main 60fps Animation Loop with natural momentum & idle rotation (only active when visible)
  useEffect(() => {
    if (!isInView || activePoster || showUploadModal || shouldReduceMotion) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    let prevTimestamp = performance.now();

    const loop = (timestamp: number) => {
      const dt = Math.min((timestamp - prevTimestamp) / 1000, 0.1);
      prevTimestamp = timestamp;

      if (!isInteractingRef.current) {
        // Apply velocity momentum decay
        if (Math.abs(velocityRef.current) > 0.002) {
          angleRef.current += velocityRef.current;
          velocityRef.current *= 0.94; // natural damping friction
          setRotationAngle(angleRef.current);
        } else {
          velocityRef.current = 0;
          // Idle continuous slow rotation
          if (autoRotate) {
            angleRef.current += 12 * dt; // ~12 degrees per second
            setRotationAngle(angleRef.current);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [autoRotate, isInView, activePoster, showUploadModal, shouldReduceMotion]);

  // Pointer drag to spin the 3D circular rack
  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    isInteractingRef.current = true;
    velocityRef.current = 0;
    lastMouseXRef.current = clientX;
    lastTimeRef.current = performance.now();
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = Math.max((now - lastTimeRef.current) / 1000, 0.001);
    const dx = clientX - lastMouseXRef.current;

    // Convert pixels to rotation angle (sensitivity factor)
    const deltaAngle = dx * 0.45;
    angleRef.current += deltaAngle;
    setRotationAngle(angleRef.current);

    // Calculate velocity for momentum release
    velocityRef.current = (deltaAngle / dt) * 0.016;

    lastMouseXRef.current = clientX;
    lastTimeRef.current = now;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    isInteractingRef.current = false;
    // Cap velocity
    velocityRef.current = Math.max(-12, Math.min(12, velocityRef.current));
  };

  // Quick rotation step buttons
  const spinStep = (direction: 1 | -1) => {
    isInteractingRef.current = false;
    velocityRef.current = direction * 4.5;
  };

  // Rotate specifically to bring a clicked poster directly to the front
  const rotateToPoster = (index: number) => {
    const total = posters.length;
    const stepAngle = 360 / total;
    const targetPosterAngle = -index * stepAngle;

    // Find closest congruent angle
    const current = angleRef.current;
    const normalizedCurrent = ((current % 360) + 360) % 360;
    const normalizedTarget = ((targetPosterAngle % 360) + 360) % 360;
    let diff = normalizedTarget - normalizedCurrent;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    velocityRef.current = 0;

    const start = current;
    const startTime = performance.now();
    const duration = 600;

    isInteractingRef.current = true;
    const animateTo = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      angleRef.current = start + diff * ease;
      setRotationAngle(angleRef.current);

      if (progress < 1) {
        requestAnimationFrame(animateTo);
      } else {
        isInteractingRef.current = false;
      }
    };
    requestAnimationFrame(animateTo);
  };

  // Like artwork handler
  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikesMap((prev) => ({
      ...prev,
      [id]: prev[id] + (userLiked[id] ? -1 : 1)
    }));
    setUserLiked((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Image Upload handler with MIME & 10 MB size limit
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type.toLowerCase())) {
      setUploadError('Please upload a JPG, PNG, WebP, or GIF image.');
      return;
    }
    if (file.size > MAX_ARTWORK_UPLOAD_BYTES) {
      setUploadError('Image exceeds the 10 MB upload limit. Please choose a smaller photo.');
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      if (!result.startsWith('data:image/') || result.startsWith('data:image/svg')) {
        setUploadError('Unsupported image format.');
        return;
      }
      setPreviewImage(result);
      if (!newTitle) setNewTitle(file.name.replace(/\.[^/.]+$/, '').slice(0, 24));
      setShowUploadModal(true);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewImage) return;

    const newPoster: GalleryPoster = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim().slice(0, 60) || 'My Colorful Daydream',
      artist: newArtist.trim().slice(0, 40) || 'Little Artist',
      age: newAge.trim().slice(0, 24) || 'Age 4',
      medium: newMedium.trim().slice(0, 40) || 'Finger Paint & Crayon',
      image: previewImage,
      date: 'Just Added!',
      clipColor: newClipColor,
      description: 'A brand-new original masterpiece proudly pinned to our Camrose Care creative carousel!',
      likes: 1
    };

    setPosters((prev) => [newPoster, ...prev]);
    setLikesMap((prev) => ({ ...prev, [newPoster.id]: 1 }));
    setUserLiked((prev) => ({ ...prev, [newPoster.id]: true }));
    setShowUploadModal(false);
    setPreviewImage(null);
    setNewTitle('');
    setNewArtist('');

    setTimeout(() => {
      rotateToPoster(0);
    }, 100);
  };

  // Cylinder 3D layout math (scaled down on narrow mobile viewports so side posters stay unclipped)
  const totalPosters = posters.length;
  const cylinderRadius = isMobileViewport
    ? Math.max(132, Math.min(162, totalPosters * 24))
    : Math.max(250, Math.min(295, totalPosters * 36));
  const angleStep = 360 / totalPosters;

  // Dynamic sway tilt calculated from current rotational speed
  const swayAngle = Math.max(-10, Math.min(10, -velocityRef.current * 1.8));

  const galleryGridContent = (
    <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ========================================================
            COMBINED HORIZONTAL ROW (DESKTOP) / STACKED (MOBILE)
            - LEFT: Cartoon Billboard Illustration with Ducks & Typography
            - RIGHT: Interactive 3D Circular Rotating Poster Carousel
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ========================================================
              LEFT: THE CARTOON BILLBOARD INTEGRATION
             ======================================================== */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center w-full">
            <CartoonBillboardHeader
              onUploadClick={() => fileInputRef.current?.click()}
              includePhilosophy={includePhilosophy}
              onOpenTour={onOpenTour}
              onOpenSubsidy={onOpenSubsidy}
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />
            {uploadError && (
              <div className="mt-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <span>{uploadError}</span>
                <button
                  type="button"
                  onClick={() => setUploadError(null)}
                  className="font-black text-rose-800 hover:text-rose-950 cursor-pointer"
                  aria-label="Dismiss upload error"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {/* ========================================================
              RIGHT: THE 3D ROTATING POSTER CAROUSEL (RACK STAND)
             ======================================================== */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center w-full">
            {/* The 3D Carousel Stage */}
            <div className="relative flex flex-col justify-center items-center select-none pt-2 pb-4 w-full">
              <div
                ref={containerRef}
                onMouseDown={(e) => handlePointerDown(e.clientX)}
                onMouseMove={(e) => handlePointerMove(e.clientX)}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
                onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
                onTouchEnd={handlePointerUp}
                className="relative w-full max-w-[560px] h-[390px] sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
                style={{
                  perspective: isMobileViewport ? '900px' : '1200px',
                  perspectiveOrigin: '50% 48%'
                }}
              >
                {/* Top Star Finial (Fixed atop the stand) */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
                  <motion.div
                    animate={isInView && !shouldReduceMotion ? { rotate: [0, 360] } : { rotate: 0 }}
                    transition={{ duration: 25, repeat: isInView && !shouldReduceMotion ? Infinity : 0, ease: 'linear' }}
                    className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-200 text-amber-900 shadow-lg border-2 border-white flex items-center justify-center drop-shadow-md"
                  >
                    <Star className="w-5 h-5 text-amber-900 fill-amber-800" />
                  </motion.div>
                  <div className="w-5 h-2.5 bg-red-600 rounded-b-md shadow-xs -mt-1 border border-red-700"></div>
                </div>

                {/* Top Rotating Carousel Hub */}
                <div
                  className="absolute top-11 left-1/2 -translate-x-1/2 w-44 h-11 pointer-events-none z-20"
                  style={{
                    transform: `translateX(-50%) rotateY(${rotationAngle}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="absolute left-1/2 top-1 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-yellow-400 bg-blue-600 shadow-md"></div>
                </div>

                {/* Central Blue & Yellow Sturdy Mast/Pole */}
                <div className="absolute top-12 bottom-8 left-1/2 -translate-x-1/2 w-4.5 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800 rounded-full shadow-inner pointer-events-none z-0">
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-full bg-red-500 border border-white shadow-xs"></div>
                  <div className="absolute top-2/4 left-1/2 -translate-x-1/2 w-7 h-2 rounded-full bg-yellow-400 border border-yellow-500 shadow-xs"></div>
                  <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-full bg-red-500 border border-white shadow-xs"></div>
                </div>

                {/* Bottom Heavy Circular Weighted Base on Floor */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
                  <div className="w-9 h-2.5 bg-red-600 rounded-t-lg shadow-xs"></div>
                  <div className="w-40 h-7 rounded-full bg-gradient-to-b from-yellow-300 via-yellow-400 to-amber-500 border-2 border-white shadow-xl flex items-center justify-center">
                    <div className="w-28 h-3.5 rounded-full bg-blue-600/30"></div>
                  </div>
                  <div className="w-56 h-6 rounded-full bg-slate-950/15 blur-md -mt-2.5 -z-10"></div>
                </div>

                {/* 3D Rotating Posters in Circle */}
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${rotationAngle}deg)`
                  }}
                >
                  {posters.map((poster, index) => {
                    const posterAngle = index * angleStep;
                    const facingAngle = ((posterAngle + rotationAngle) % 360 + 360) % 360;
                    const isNearFront = facingAngle < 70 || facingAngle > 290;
                    const isDirectFront = facingAngle < 35 || facingAngle > 325;

                    const clipColors = {
                      red: 'bg-red-500 border-red-600 text-white',
                      blue: 'bg-blue-600 border-blue-700 text-white',
                      yellow: 'bg-yellow-400 border-yellow-500 text-slate-900'
                    };

                    return (
                      <div
                        key={poster.id}
                        onClick={() => {
                          if (!isDragging) {
                            if (isDirectFront) {
                              setActivePoster(poster);
                            } else {
                              rotateToPoster(index);
                            }
                          }
                        }}
                        className="absolute w-[136px] sm:w-[195px] aspect-[3/4.2] cursor-pointer transition-shadow"
                        style={{
                          transform: `rotateY(${posterAngle}deg) translateZ(${cylinderRadius}px) rotateZ(${swayAngle}deg)`,
                          transformStyle: 'preserve-3d',
                          filter: isNearFront
                            ? 'drop-shadow(0 20px 25px rgba(0, 0, 0, 0.22))'
                            : 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.12)) brightness(0.92)'
                        }}
                      >
                        {/* Peg / Clothespin */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
                          <div
                            className={`w-5 h-5 rounded-md shadow-md border-2 flex items-center justify-center text-[9px] font-black ${
                              clipColors[poster.clipColor] || clipColors.yellow
                            }`}
                          >
                            ●
                          </div>
                          <div className="w-0.5 h-2.5 bg-slate-400 -mt-0.5"></div>
                        </div>

                        {/* Poster Card */}
                        <div className="w-full h-full bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 shadow-lg flex flex-col justify-between overflow-hidden group hover:ring-4 hover:ring-yellow-400/80 transition-all">
                          <div className="w-full h-[74%] rounded-xl overflow-hidden bg-slate-100 relative">
                            <img
                              src={poster.image}
                              alt={poster.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Quick Zoom Indicator */}
                            <div className="absolute inset-0 bg-blue-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="p-1.5 rounded-full bg-white/90 text-blue-900 shadow-md">
                                <ZoomIn className="w-3.5 h-3.5" />
                              </span>
                            </div>

                            {/* Like Button */}
                            <button
                              type="button"
                              onClick={(e) => handleLike(poster.id, e)}
                              className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs shadow-xs text-[10px] font-bold text-slate-700 flex items-center gap-1 hover:bg-white hover:text-red-600 transition-all cursor-pointer"
                            >
                              <Heart
                                className={`w-3 h-3 ${
                                  userLiked[poster.id] ? 'fill-red-500 text-red-500' : 'text-slate-400'
                                }`}
                              />
                              <span>{likesMap[poster.id] || 0}</span>
                            </button>
                          </div>

                          {/* Poster Info */}
                          <div className="pt-1.5 px-0.5 text-left flex items-end justify-between gap-1">
                            <div className="overflow-hidden">
                              <p className="text-[11px] sm:text-xs font-black text-slate-950 truncate font-outfit">
                                {poster.title}
                              </p>
                              <p className="text-[9px] sm:text-[10px] text-blue-700 font-bold truncate flex items-center gap-1">
                                <Palette className="w-2.5 h-2.5 text-blue-600 shrink-0" />
                                <span className="truncate">{poster.artist} · {poster.age}</span>
                              </p>
                            </div>
                            <span className="text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded bg-yellow-100 text-amber-900 shrink-0">
                              {poster.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Previous / Next buttons */}
              <div className="mt-3 flex items-center gap-3 z-30">
                <button
                  type="button"
                  onClick={() => spinStep(-1)}
                  className="w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-white shadow-md hover:shadow-lg border-2 border-slate-200 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  title="Previous Poster"
                  aria-label="Previous Poster"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 bg-white/90 px-3.5 py-1 rounded-full shadow-xs border border-slate-200">
                  Spin 3D Carousel
                </span>
                <button
                  type="button"
                  onClick={() => spinStep(1)}
                  className="w-11 h-11 sm:w-9 sm:h-9 rounded-full bg-white shadow-md hover:shadow-lg border-2 border-slate-200 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  title="Next Poster"
                  aria-label="Next Poster"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className={
        includePhilosophy
          ? 'relative py-20 lg:py-28 bg-gradient-to-b from-white via-[#CBEBFF]/40 to-white text-slate-900 overflow-hidden select-none'
          : 'relative py-20 lg:py-28 bg-gradient-to-b from-white via-amber-50/25 to-white text-slate-900 overflow-hidden select-none'
      }
    >
      {includePhilosophy && <div id="about" className="scroll-mt-24" />}
      {/* Decorative Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={isInView && !shouldReduceMotion ? { y: [0, -15, 0], rotate: [0, 10, 0] } : { y: 0, rotate: 0 }}
          transition={{ duration: 7, repeat: isInView && !shouldReduceMotion ? Infinity : 0, ease: 'easeInOut' }}
          className="absolute top-12 left-8 text-yellow-300/60"
        >
          <Star className="w-10 h-10 fill-current" />
        </motion.div>
        <motion.div
          animate={isInView && !shouldReduceMotion ? { y: [0, 20, 0], rotate: [0, -15, 0] } : { y: 0, rotate: 0 }}
          transition={{ duration: 8, repeat: isInView && !shouldReduceMotion ? Infinity : 0, ease: 'easeInOut' }}
          className="absolute bottom-20 left-12 text-blue-300/40"
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>
        <motion.div
          animate={isInView && !shouldReduceMotion ? { scale: [1, 1.15, 1], rotate: [0, 20, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 9, repeat: isInView && !shouldReduceMotion ? Infinity : 0, ease: 'easeInOut' }}
          className="absolute top-28 right-12 text-rose-300/50"
        >
          <Palette className="w-10 h-10" />
        </motion.div>
      </div>

      {galleryGridContent}

      {/* ========================================================
          FULLSCREEN POSTER INSPECTOR MODAL
         ======================================================== */}
      <AnimatePresence>
        {activePoster && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-300"
            >
              <button
                type="button"
                onClick={() => setActivePoster(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition-colors cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-7 bg-slate-100 p-4 flex items-center justify-center min-h-[320px]">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white max-h-[460px]">
                    <img
                      src={activePoster.image}
                      alt={activePoster.title}
                      decoding="async"
                      className="w-full h-full object-contain max-h-[440px]"
                    />
                  </div>
                </div>

                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-black uppercase">
                        {activePoster.date}
                      </span>
                      <span className="text-xs font-bold text-slate-400">·</span>
                      <span className="text-xs font-bold text-red-600">{activePoster.medium}</span>
                    </div>

                    <h3 className="text-2xl font-black text-slate-950 tracking-tight leading-tight">
                      {activePoster.title}
                    </h3>

                    <p className="text-sm font-bold text-blue-700 mt-1">
                      Artist: {activePoster.artist} ({activePoster.age})
                    </p>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 font-medium">
                      {activePoster.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleLike(activePoster.id)}
                      className="px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-black text-xs flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          userLiked[activePoster.id] ? 'fill-red-500' : ''
                        }`}
                      />
                      <span>{likesMap[activePoster.id] || 0} Smiles</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActivePoster(null)}
                      className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-full transition-colors cursor-pointer"
                    >
                      Back to Rack
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================
          UPLOAD / PIN NEW ARTWORK MODAL
         ======================================================== */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border-4 border-yellow-300 relative space-y-5"
            >
              <button
                type="button"
                onClick={() => {
                  setShowUploadModal(false);
                  setPreviewImage(null);
                }}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-1">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-slate-950">Pin Your Artwork to the Rack</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Add your child's drawing directly to our Camrose Care rotating exhibition!
                </p>
              </div>

              {previewImage && (
                <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-blue-300 relative flex items-center justify-center">
                  <img
                    src={previewImage}
                    alt="Preview"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <form onSubmit={handleUploadSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Masterpiece Title</label>
                  <input
                    type="text"
                    required
                    maxLength={60}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Sunny Day with Mommy"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Artist Name</label>
                    <input
                      type="text"
                      required
                      maxLength={40}
                      value={newArtist}
                      onChange={(e) => setNewArtist(e.target.value)}
                      placeholder="e.g. Leo M."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Age / Room</label>
                    <input
                      type="text"
                      maxLength={24}
                      value={newAge}
                      onChange={(e) => setNewAge(e.target.value)}
                      placeholder="e.g. Age 4"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Medium</label>
                  <input
                    type="text"
                    maxLength={40}
                    value={newMedium}
                    onChange={(e) => setNewMedium(e.target.value)}
                    placeholder="e.g. Finger Paint, Crayon, Clay"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Clothespin Clip Color</label>
                  <div className="flex gap-2">
                    {(['yellow', 'red', 'blue'] as const).map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNewClipColor(color)}
                        className={`flex-1 py-1.5 rounded-lg font-black uppercase text-[10px] border-2 transition-all cursor-pointer ${
                          newClipColor === color
                            ? 'ring-2 ring-slate-900 border-white shadow-xs'
                            : 'opacity-70 hover:opacity-100'
                        } ${
                          color === 'yellow'
                            ? 'bg-yellow-400 text-slate-900 border-yellow-500'
                            : color === 'red'
                            ? 'bg-red-500 text-white border-red-600'
                            : 'bg-blue-600 text-white border-blue-700'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadModal(false);
                      setPreviewImage(null);
                    }}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl shadow-md border-2 border-yellow-300 transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Pin to Rack</span>
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
