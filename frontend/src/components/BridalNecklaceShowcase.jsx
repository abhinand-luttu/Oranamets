import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, MessageCircle, Gem, Award, CheckCircle2, Heart } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import bridalNecklaceImg from '../assets/bridal-necklace-showcase.jpg';

export default function BridalNecklaceShowcase() {
  const { getWhatsAppUrl } = useSettings();

  const bridalWhatsAppUrl = getWhatsAppUrl(
    "Hello Zivara! I am interested in your Traditional Bridal Necklaces (layered antique choker & kasu mala sets). Please share catalogue and pricing details."
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Outer Luxury Showcase Frame */}
      <div className="relative rounded-3xl bg-gradient-to-br from-cream-100 via-white to-cream-100 border-2 border-gold/40 shadow-royal overflow-hidden reveal-on-scroll">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 lg:p-12 relative z-10">
          {/* Left Column: The Animated Bride & Mirror Showcase */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/60 bg-brown-dark group">
              {/* Inner Decorative Golden Inset Border */}
              <div className="absolute inset-2.5 rounded-xl border border-gold/30 pointer-events-none z-20 transition-all duration-700 group-hover:border-gold/60" />

              {/* Main Image with Subtle Lifelike Breathing & Pose Movement */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                <img
                  src={bridalNecklaceImg}
                  alt="Kerala Indian bride wearing traditional layered gold necklaces smiling in the mirror"
                  className="w-full h-full object-cover object-[52%_32%] animate-necklace-breathe transition-transform duration-700 select-none"
                  loading="lazy"
                />

                {/* Soft Vignette Overlay for Luxury Boutique Ambience */}
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/50 via-transparent to-brown-dark/20 pointer-events-none" />

                {/* Mirror Ambient Warmth Pulse (Over Mirror Reflection Area) */}
                <div 
                  className="absolute top-[18%] left-[16%] w-[30%] h-[64%] rounded-full bg-gold/15 blur-xl pointer-events-none animate-mirror-glow" 
                  aria-hidden="true"
                />

                {/* Diagonal Golden Sheen Sweep across the Gold Necklaces */}
                <div 
                  className="absolute inset-0 pointer-events-none overflow-hidden z-10"
                  aria-hidden="true"
                >
                  <div className="w-[180%] h-full -left-[40%] absolute bg-gradient-to-r from-transparent via-gold-light/25 to-transparent skew-x-[-25deg] animate-necklace-sweep" />
                </div>

                {/* Jewel Sparkle Stars positioned at the traditional gold necklace layers */}
                {/* 1. Sparkle on Choker Centerpiece */}
                <div 
                  className="absolute top-[44%] left-[64%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-1"
                  aria-hidden="true"
                >
                  <Sparkles className="w-5 h-5 text-gold-light drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]" />
                </div>

                {/* 2. Sparkle on Kasu Mala / Center Pendant */}
                <div 
                  className="absolute top-[63%] left-[59%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-2"
                  aria-hidden="true"
                >
                  <Sparkles className="w-4 h-4 text-cream-50 drop-shadow-[0_0_8px_rgba(255,245,210,0.95)]" />
                </div>

                {/* 3. Sparkle on Hand Touch / Bangles near Necklace */}
                <div 
                  className="absolute top-[52%] left-[51%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-3"
                  aria-hidden="true"
                >
                  <Sparkles className="w-4 h-4 text-gold drop-shadow-[0_0_6px_rgba(197,160,89,0.85)]" />
                </div>

                {/* 4. Subtle Sparkle in Mirror Reflection */}
                <div 
                  className="absolute top-[50%] left-[32%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-2"
                  aria-hidden="true"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-light shadow-[0_0_6px_#C5A059]" />
                </div>
              </div>

              {/* Floating Bottom Ribbon on Image */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-brown-dark/85 backdrop-blur-md border border-gold/40 text-cream-50">
                <div className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs font-royal font-bold tracking-wider text-gold-light">
                    Traditional Layered Bridal Necklaces
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-cream-200/80 font-medium">
                  22K Antique Finish
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Storytelling, Craftsmanship Details & CTAs */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon/10 border border-gold/50 text-maroon text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>Kerala Bridal Heritage • Gujarat Crafted</span>
            </div>

            {/* Main Section Heading */}
            <div className="space-y-2">
              <h2 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-brown leading-tight">
                The Timeless Allure of <span className="text-maroon">Traditional Bridal Necklaces</span>
              </h2>
              <div className="w-16 h-1 bg-gold rounded-full mx-auto lg:mx-0" />
            </div>

            {/* Narrative Description */}
            <p className="text-xs sm:text-sm text-brown/75 leading-relaxed">
              Every bride deserves ornaments that tell a story of grace and grandeur. 
              Our traditional bridal necklaces combine the sacred artistry of multi-layered 
              antique temple chokers, elegant kasu malas, and delicate gemstone centerpieces—crafted 
              in authentic Gujarat ateliers and delivered directly to your doorstep.
            </p>

            {/* Key Craftsmanship Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="p-3 rounded-xl bg-white/80 border border-gold/30 shadow-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-dark mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-brown font-royal">Multi-Layer Harmony</h4>
                  <p className="text-[11px] text-brown/65">Antique choker paired with long traditional kasu mala.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-gold/30 shadow-sm flex items-start gap-2.5">
                <Award className="w-4 h-4 text-gold-dark mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-brown font-royal">Temple Motif Gold</h4>
                  <p className="text-[11px] text-brown/65">Intricate floral carvings and auspicious bridal crests.</p>
                </div>
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href={bridalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-md flex items-center justify-center gap-2 transition-all btn-luxury-sheen"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire Necklaces on WhatsApp</span>
              </a>

              <Link
                to="/collection"
                className="w-full sm:w-auto px-6 py-3.5 border-2 border-gold text-maroon hover:bg-gold/10 font-bold text-xs tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Full Collection</span>
                <ArrowRight className="w-4 h-4 text-gold-dark" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
