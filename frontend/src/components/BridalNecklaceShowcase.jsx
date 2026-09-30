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
                  alt="Modern fashion model wearing a luxury gold statement necklace in an editorial jewellery campaign"
                  className="w-full h-full object-cover object-[50%_35%] animate-necklace-breathe transition-transform duration-700 select-none"
                  loading="lazy"
                />

                {/* Soft Vignette Overlay for Luxury Boutique Ambience */}
                <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/50 via-transparent to-brown-dark/20 pointer-events-none" />

                {/* Subtle Ambient Warmth Glow behind model */}
                <div 
                  className="absolute top-[20%] left-[30%] w-[40%] h-[60%] rounded-full bg-gold/15 blur-xl pointer-events-none animate-mirror-glow" 
                  aria-hidden="true"
                />

                {/* Diagonal Golden Sheen Sweep across the Statement Necklace */}
                <div 
                  className="absolute inset-0 pointer-events-none overflow-hidden z-10"
                  aria-hidden="true"
                >
                  <div className="w-[180%] h-full -left-[40%] absolute bg-gradient-to-r from-transparent via-gold-light/25 to-transparent skew-x-[-25deg] animate-necklace-sweep" />
                </div>

                {/* Jewel Sparkle Stars positioned at the statement gold and emerald necklace */}
                {/* 1. Sparkle on Center Tiered Emerald Drop */}
                <div 
                  className="absolute top-[75%] left-[58%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-1"
                  aria-hidden="true"
                >
                  <Sparkles className="w-5 h-5 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                </div>

                {/* 2. Sparkle on Left Emerald Drop */}
                <div 
                  className="absolute top-[70%] left-[51%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-2"
                  aria-hidden="true"
                >
                  <Sparkles className="w-4 h-4 text-cream-50 drop-shadow-[0_0_8px_rgba(255,245,210,0.95)]" />
                </div>

                {/* 3. Sparkle on Elegant Hand Gesture */}
                <div 
                  className="absolute top-[54%] left-[40%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-3"
                  aria-hidden="true"
                >
                  <Sparkles className="w-4 h-4 text-gold drop-shadow-[0_0_6px_rgba(197,160,89,0.85)]" />
                </div>

                {/* 4. Sparkle on Right Emerald Drop */}
                <div 
                  className="absolute top-[70%] left-[67%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-2"
                  aria-hidden="true"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </div>
              </div>

              {/* Floating Bottom Ribbon on Image */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-20 flex items-center justify-between px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-brown-dark/85 backdrop-blur-md border border-gold/40 text-cream-50">
                <div className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-[11px] sm:text-xs font-royal font-bold tracking-wider text-gold-light">
                    Exquisite Emerald Necklace Set
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Storytelling, Craftsmanship Details & CTAs */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon/10 border border-gold/50 text-maroon text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>Royal Emerald Heritage • Gujarat Crafted</span>
            </div>

            {/* Main Section Heading */}
            <div className="space-y-2">
              <h2 className="font-royal text-2xl sm:text-3xl lg:text-4xl font-bold text-brown leading-tight">
                The Timeless Allure of <span className="text-maroon">Exquisite Necklace Sets</span>
              </h2>
              <div className="w-16 h-1 bg-gold rounded-full mx-auto lg:mx-0" />
            </div>

            {/* Narrative Description */}
            <p className="text-xs sm:text-sm text-brown/75 leading-relaxed">
              Timeless beauty, crafted for you. Our exquisite statement necklace sets combine the royal artistry of deep emerald green gemstones, luminous uncut polki diamonds, and delicate hanging emerald bead drops—crafted in authentic Gujarat ateliers and delivered directly to your doorstep.
            </p>

            {/* Key Craftsmanship Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="p-3 rounded-xl bg-white/80 border border-gold/30 shadow-sm flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-dark mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-brown font-royal">Royal Emerald & Polki</h4>
                  <p className="text-[11px] text-brown/65">Luminous uncut polki diamonds set with deep emerald green stones.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 border border-gold/30 shadow-sm flex items-start gap-2.5">
                <Award className="w-4 h-4 text-gold-dark mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-brown font-royal">Handcrafted Bead Drops</h4>
                  <p className="text-[11px] text-brown/65">Fine emerald-hued drop beads with delicate pearl accents.</p>
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
