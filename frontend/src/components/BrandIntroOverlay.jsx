import React, { useState, useEffect } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import brideImg from '../assets/bride-intro.jpg';

/**
 * BrandIntroOverlay
 * Modern Luxury Jewellery Campaign Intro featuring an editorial model wearing an exquisite statement necklace.
 * Features subtle camera zoom, micro-sway, sparkling jewel highlights, gold light sweep,
 * an "Explore Collection" CTA, and a smooth fade-out reveal.
 */
export default function BrandIntroOverlay({ onComplete, mediaSource }) {
  const [isExiting, setIsExiting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageSrc = mediaSource || brideImg || '/bride-intro.jpg';

  useEffect(() => {
    // 1. Accessibility: Check for reduced motion preference
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (onComplete) onComplete();
      return;
    }

    // 2. Prevent body scrolling while intro overlay is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // 3. Auto-dismiss timer: 4.5 seconds of cinematic presentation
    const timer = setTimeout(() => {
      triggerExit();
    }, 4500);

    // 4. Keyboard dismissal: ESC key skips immediately
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const triggerExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    // Smooth dissolve transition before fully unmounting from DOM
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  };

  return (
    <div
      role="dialog"
      aria-label="Welcome to Zivara Ornaments"
      aria-modal="true"
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[#150a06] overflow-hidden select-none transition-all duration-700 ${
        isExiting ? 'intro-overlay-exit' : 'intro-overlay-active'
      }`}
    >
      {/* 1. Cinematic Background Image Container with Slow Zoom */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={imageSrc}
          alt="Modern Luxury Jewellery Campaign - Royal Gold & Kundan Statement Necklace"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-[50%_35%] animate-intro-zoom ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-700`}
        />

        {/* 2. Micro-motion Model Animation Container */}
        <div className="absolute inset-0 w-full h-full pointer-events-none animate-bride-sway">
          {/* Subtle Golden Sheen Light Sweep across the statement necklace */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/20 to-transparent w-[200%] h-full animate-gold-sweep" />

          {/* Jewellery Sparkle Highlights over the necklace */}
          <div className="absolute top-[63%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-sparkle-1">
            <svg className="w-6 h-6 text-amber-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>

          <div className="absolute top-[59%] left-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-sparkle-2">
            <svg className="w-5 h-5 text-gold-light" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>

          <div className="absolute top-[59%] left-[55%] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-sparkle-3">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>
        </div>

        {/* 3. Luxury Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/95 via-transparent to-brown-dark/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      </div>

      {/* 4. Elegant Top Brand Bar & Close / Skip Button */}
      <div className="absolute top-6 inset-x-0 px-6 sm:px-10 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5 text-gold-light/90">
          <div className="w-8 h-8 rounded-full bg-maroon/70 border border-gold/50 flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
          <span className="font-royal text-xs font-semibold tracking-[0.25em] uppercase text-gold-light">
            ZIVARA ORNAMENTS
          </span>
        </div>

        <button
          onClick={triggerExit}
          type="button"
          className="group px-4 py-2 rounded-full bg-cream-50/10 hover:bg-cream-50/20 backdrop-blur-md border border-gold/40 hover:border-gold text-cream-100 text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-lg active:scale-95"
          aria-label="Close intro popup"
        >
          <span>Skip</span>
          <X className="w-3.5 h-3.5 text-gold group-hover:rotate-90 transition-transform" />
        </button>
      </div>

      {/* 5. Bottom Brand & Ornaments Focus Title Overlay */}
      <div className="absolute bottom-8 sm:bottom-12 inset-x-0 px-4 text-center z-20">
        <div className="inline-flex flex-col items-center max-w-lg mx-auto space-y-3">
          {/* Subtle Golden Emblem */}
          <div className="w-12 h-12 rounded-full bg-maroon/80 border-2 border-gold flex items-center justify-center shadow-royal-gold animate-gem-aura">
            <Sparkles className="w-6 h-6 text-gold" />
          </div>

          {/* Royal Brand Name */}
          <h1 className="font-royal text-3xl sm:text-5xl font-bold tracking-[0.2em] text-cream-50 drop-shadow-md">
            Z I V A R A
          </h1>

          {/* Golden Divider */}
          <div className="flex items-center gap-3 w-48 justify-center">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold" />
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold" />
          </div>

          {/* Subtitle */}
          <p className="font-royal text-xs sm:text-sm tracking-[0.25em] uppercase text-gold-light font-medium drop-shadow">
            Modern Statement Necklaces & Gujarat Ornaments
          </p>

          <p className="text-[11px] text-cream-200/80 tracking-widest uppercase pb-2">
            Shipped Directly from Gujarat to Your Doorstep
          </p>

          {/* Explore Collection Action Button */}
          <button
            onClick={triggerExit}
            type="button"
            className="px-6 py-2.5 bg-gold-gradient text-brown-dark rounded-full text-xs font-bold tracking-widest uppercase shadow-royal-gold hover:opacity-95 transition-all flex items-center gap-2 btn-luxury-sheen"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
