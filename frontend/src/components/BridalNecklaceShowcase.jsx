import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, MessageCircle, Gem, Award, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import bridalNecklaceImg from '../assets/bridal-necklace-showcase.jpg';

export default function BridalNecklaceShowcase() {
  const { getWhatsAppUrl } = useSettings();

  const necklaceWhatsAppUrl = getWhatsAppUrl(
    "Hello Zivara! I am interested in your Modern Luxury Statement Necklaces (Exquisite Emerald & Diamond Masterpieces). Please share catalogue and pricing details."
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Outer Luxury Showcase Frame */}
      <div className="relative rounded-3xl bg-[#FAF8F5] border border-gold/30 shadow-lg overflow-hidden reveal-on-scroll">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/5 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center p-6 sm:p-10 lg:p-14 relative z-10">
          {/* Left Column: Model Wearing Modern Statement Necklace */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gold/40 bg-[#161412] group">
              {/* Inner Decorative Golden Border */}
              <div className="absolute inset-3 rounded-xl border border-gold/20 pointer-events-none z-20 transition-all duration-700 group-hover:border-gold/50" />

              {/* Main Image with Subtle Pose & Breathing Movement */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                <img
                  src={bridalNecklaceImg}
                  alt="Modern fashion model wearing a luxury emerald and diamond statement necklace"
                  className="w-full h-full object-cover object-[50%_35%] animate-necklace-breathe transition-transform duration-700 select-none"
                  loading="lazy"
                />

                {/* Soft Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Subtle Sheen Sweep across the Statement Necklace */}
                <div 
                  className="absolute inset-0 pointer-events-none overflow-hidden z-10"
                  aria-hidden="true"
                >
                  <div className="w-[180%] h-full -left-[40%] absolute bg-gradient-to-r from-transparent via-gold-light/20 to-transparent skew-x-[-25deg] animate-necklace-sweep" />
                </div>

                {/* Jewel Sparkle Stars positioned at the emerald necklace */}
                <div 
                  className="absolute top-[75%] left-[58%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-1"
                  aria-hidden="true"
                >
                  <Sparkles className="w-5 h-5 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                </div>

                <div 
                  className="absolute top-[70%] left-[51%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-2"
                  aria-hidden="true"
                >
                  <Sparkles className="w-4 h-4 text-cream-50 drop-shadow-[0_0_8px_rgba(255,245,210,0.95)]" />
                </div>

                <div 
                  className="absolute top-[70%] left-[67%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-2"
                  aria-hidden="true"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </div>
              </div>

              {/* Floating Bottom Ribbon on Image */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#161412]/85 backdrop-blur-md border border-gold/30 text-cream-50">
                <div className="flex items-center gap-2">
                  <Gem className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold-light">
                    The Emerald Radiance Suite
                  </span>
                </div>
                <span className="text-[10px] tracking-wider text-cream-200/70 uppercase">
                  Haute Joaillerie
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Refined CTAs */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gold/40 text-[#181512] text-[10px] font-semibold tracking-[0.25em] uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Contemporary Campaign</span>
            </div>

            {/* Main Section Heading */}
            <div className="space-y-2">
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#181512] leading-[1.2]">
                The Modern <span className="font-serif italic text-gold-dark">Statement Necklace</span>
              </h2>
              <div className="w-12 h-0.5 bg-gold rounded-full mx-auto lg:mx-0" />
            </div>

            {/* Narrative Description */}
            <p className="text-xs sm:text-sm text-[#6E6760] font-light leading-relaxed">
              Sculpted for bold confidence. Our iconic necklace suite unites emerald gemstones, brilliant cut diamonds, and lustrous polished gold into a contemporary silhouette designed to command attention from every angle.
            </p>

            {/* Key Craftsmanship Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="p-3.5 rounded-xl bg-white border border-gold/20 shadow-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#181512] tracking-wide">Emerald & Diamond Center</h4>
                  <p className="text-[11px] text-[#6E6760] font-light mt-0.5">Faceted precious emeralds accented with luminous diamonds.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-gold/20 shadow-sm flex items-start gap-2.5">
                <Award className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#181512] tracking-wide">Atelier Craftsmanship</h4>
                  <p className="text-[11px] text-[#6E6760] font-light mt-0.5">Hand-set by master jewellers for sublime fluidity and balance.</p>
                </div>
              </div>
            </div>

            {/* Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href={necklaceWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 bg-[#181512] hover:bg-black text-cream-50 rounded-full text-xs font-semibold tracking-[0.18em] uppercase shadow-sm flex items-center justify-center gap-2 transition-all border border-gold/40"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Enquire via WhatsApp</span>
              </a>

              <Link
                to="/collection"
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 border border-[#181512]/20 hover:border-gold text-[#181512] hover:text-gold-dark font-medium text-xs tracking-[0.18em] uppercase rounded-full transition-all flex items-center justify-center gap-2 bg-white"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
