import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Phone, MessageCircle, Gem, Award, CheckCircle2, Truck } from 'lucide-react';
import { fetchCategories, fetchOrnaments } from '../api';
import { useSettings } from '../context/SettingsContext';
import OrnamentCard from '../components/OrnamentCard';
import CategoryCard from '../components/CategoryCard';
import BridalNecklaceShowcase from '../components/BridalNecklaceShowcase';
import useScrollReveal from '../hooks/useScrollReveal';
import modernHeroImg from '../assets/modern-necklace-hero.jpg';

export default function HomePage() {
  const { settings, getWhatsAppUrl, getCallUrl } = useSettings();
  const [categories, setCategories] = useState([]);
  const [featuredOrnaments, setFeaturedOrnaments] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        const [cats, orns] = await Promise.all([
          fetchCategories(),
          fetchOrnaments({ featured: true }),
        ]);
        setCategories(cats || []);
        setFeaturedOrnaments(orns || []);
      } catch (err) {
        console.error("Error loading home page data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  useScrollReveal([categories, featuredOrnaments, loading]);

  // Quick filter for the Explore Collection section
  const filteredOrnaments = useMemo(() => {
    if (selectedFilter === 'all') return featuredOrnaments;
    return featuredOrnaments.filter(orn => {
      const catSlug = (orn.category_slug || orn.category_name || '').toLowerCase();
      const ornName = (orn.name || '').toLowerCase();
      if (selectedFilter === 'necklace') {
        return catSlug.includes('necklace') || ornName.includes('haar') || ornName.includes('necklace') || ornName.includes('choker');
      }
      if (selectedFilter === 'earrings') {
        return catSlug.includes('earring') || ornName.includes('jhumka') || ornName.includes('chandbali');
      }
      if (selectedFilter === 'bangles') {
        return catSlug.includes('bangle') || catSlug.includes('kangan') || ornName.includes('patla') || ornName.includes('bangle');
      }
      return true;
    });
  }, [featuredOrnaments, selectedFilter]);

  const conciergeWhatsAppUrl = getWhatsAppUrl(
    "Hello Zivara! I would like to explore your modern luxury statement necklaces and enquire about bespoke orders."
  );

  return (
    <div className="space-y-16 md:space-y-24 pb-20 overflow-x-hidden bg-[#FAF8F5]">
      {/* ===================================================================
          1. HERO SECTION: High Jewellery & Statement Necklace Focus
          =================================================================== */}
      <section className="relative overflow-hidden bg-white border-b border-gold/20 pt-8 pb-14 md:pt-14 md:pb-20">
        {/* Subtle Luxury Radial Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-black/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left order-2 lg:order-1">
              {/* Campaign Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-gold/40 text-[#181512] text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Haute Joaillerie • Statement Pieces</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#181512] leading-[1.15] tracking-tight">
                Modern Radiance, <br />
                <span className="font-serif italic text-gold-dark font-normal">Sculpted in Gold</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-xs sm:text-sm md:text-base text-[#6E6760] font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover iconic statement necklaces crafted with brilliant gemstones, uncut polki diamonds, and luminous gold. High jewellery created for modern confidence, shipped directly from our ateliers to your doorstep.
              </p>

              {/* Action Buttons: Explore Collection & Concierge */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/collection"
                  className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-[#181512] hover:bg-black text-cream-50 font-medium text-xs tracking-[0.2em] uppercase rounded-full shadow-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 group border border-gold/40"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={conciergeWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[48px] px-7 py-3.5 border border-[#181512]/25 hover:border-gold text-[#181512] hover:text-gold-dark font-medium text-xs tracking-[0.2em] uppercase rounded-full transition-all flex items-center justify-center gap-2 bg-white"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>VIP Concierge</span>
                </a>
              </div>

              {/* Three Discreet Luxury Micro-Promises */}
              <div className="pt-4 border-t border-cream-200/60 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-[11px] text-[#8C7A6B] font-light">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-gold" />
                  <span>Master Atelier Craftsmanship</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>Pure 22K Gold & Certified Gems</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-gold" />
                  <span>Insured Doorstep Shipping</span>
                </span>
              </div>
            </div>

            {/* Right Hero Visual Column (The Statement Necklace Showpiece) */}
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-gold/40 bg-[#161412] group">
                {/* Inner Decorative 1px Golden Inset Frame */}
                <div className="absolute inset-3 rounded-2xl border border-gold/25 pointer-events-none z-20 transition-all duration-700 group-hover:border-gold/50" />

                {/* Main Hero Model & Statement Necklace Photo */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] lg:aspect-[5/4] overflow-hidden">
                  <img
                    src={modernHeroImg}
                    alt="Modern high-fashion model wearing an exquisite luxury statement emerald and diamond necklace"
                    className="w-full h-full object-cover object-[50%_35%] select-none group-hover:scale-102 transition-transform duration-700"
                    loading="eager"
                  />

                  {/* Soft Vignette Overlay for Editorial Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

                  {/* Golden Sheen Sweep across the Masterpiece Necklace */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
                    <div className="w-[180%] h-full -left-[40%] absolute bg-gradient-to-r from-transparent via-gold-light/25 to-transparent skew-x-[-25deg] animate-necklace-sweep" />
                  </div>

                  {/* Jewel Sparkles highlighting the necklace */}
                  <div className="absolute top-[65%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-1" aria-hidden="true">
                    <Sparkles className="w-6 h-6 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  </div>

                  <div className="absolute top-[60%] left-[43%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-2" aria-hidden="true">
                    <Sparkles className="w-4 h-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
                  </div>

                  <div className="absolute top-[60%] left-[57%] pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-3" aria-hidden="true">
                    <Sparkles className="w-4 h-4 text-amber-200 drop-shadow-[0_0_6px_rgba(253,230,138,0.9)]" />
                  </div>
                </div>

                {/* Floating Bottom Credential Tag */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#161412]/85 backdrop-blur-md border border-gold/30 text-cream-50">
                  <div className="flex items-center gap-2">
                    <Gem className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold-light">
                      The Empress Emerald Necklace
                    </span>
                  </div>
                  <span className="text-[10px] tracking-wider text-cream-200/70 uppercase">
                    Signature Edition
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. MINIMAL BRAND PROMISE RIBBON
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-gold/25 p-4 sm:p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="space-y-1">
              <span className="block font-serif text-xs sm:text-sm font-semibold text-[#181512] tracking-wider uppercase">
                Artisan Sculpted
              </span>
              <p className="text-[11px] text-[#6E6760] font-light">Handcrafted by master jewellers</p>
            </div>

            <div className="space-y-1 border-l border-cream-200/80">
              <span className="block font-serif text-xs sm:text-sm font-semibold text-[#181512] tracking-wider uppercase">
                Direct Ateliers
              </span>
              <p className="text-[11px] text-[#6E6760] font-light">Dispatched straight from Gujarat</p>
            </div>

            <div className="space-y-1 border-l-0 md:border-l border-cream-200/80">
              <span className="block font-serif text-xs sm:text-sm font-semibold text-[#181512] tracking-wider uppercase">
                Insured Transit
              </span>
              <p className="text-[11px] text-[#6E6760] font-light">Safe doorstep delivery across India</p>
            </div>

            <div className="space-y-1 border-l border-cream-200/80">
              <span className="block font-serif text-xs sm:text-sm font-semibold text-[#181512] tracking-wider uppercase">
                VIP Concierge
              </span>
              <p className="text-[11px] text-[#6E6760] font-light">Personal styling & custom sizing</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. EXPLORE COLLECTION: Lead Naturally into Statement Ornaments
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Refined Editorial Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 reveal-on-scroll">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-gold-dark">
              Curated Creations
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#181512]">
              Explore Collection
            </h2>
            <div className="w-12 h-0.5 bg-gold rounded-full" />
            <p className="text-xs sm:text-sm text-[#6E6760] font-light max-w-lg leading-relaxed pt-1">
              A curated selection of modern statement necklaces, chokers, and iconic ornaments designed for timeless luxury.
            </p>
          </div>

          {/* Minimal Quick Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Pieces' },
              { id: 'necklace', label: 'Necklaces' },
              { id: 'earrings', label: 'Earrings' },
              { id: 'bangles', label: 'Bangles' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-medium transition-all ${
                  selectedFilter === tab.id
                    ? 'bg-[#181512] text-cream-50 shadow-sm border border-gold/40'
                    : 'bg-white text-[#6E6760] hover:text-[#181512] border border-gold/20 hover:border-gold/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-white animate-pulse border border-gold/15" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredOrnaments.slice(0, 8).map((orn, idx) => (
              <div key={orn.id} className={`reveal-on-scroll stagger-${(idx % 4) + 1}`}>
                <OrnamentCard ornament={orn} />
              </div>
            ))}
          </div>
        )}

        {/* Action Button leading to Full Collection */}
        <div className="mt-12 text-center reveal-on-scroll">
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 min-h-[46px] px-8 py-3.5 bg-white hover:bg-[#181512] text-[#181512] hover:text-cream-50 text-xs font-semibold tracking-[0.2em] uppercase rounded-full shadow-sm hover:shadow-lg transition-all border border-gold/40 group"
          >
            <span>Explore Complete Collection</span>
            <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ===================================================================
          4. RUNNING AD 2: Modern Statement Necklace Campaign Showcase
          =================================================================== */}
      <BridalNecklaceShowcase />

      {/* ===================================================================
          5. CURATED CLASSIFICATIONS (Categories)
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10 reveal-on-scroll">
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-gold-dark">
            Jewellery Classifications
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#181512]">
            Curated by Style
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-[#6E6760] font-light leading-relaxed">
            Browse our artisanal ornaments organized by jewellery form, crafted in authentic Gujarat ateliers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((cat, idx) => (
            <div key={cat.id || cat.slug} className={`reveal-on-scroll stagger-${(idx % 4) + 1}`}>
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================
          6. BESPOKE VIP CONCIERGE BANNER
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#161412] rounded-3xl p-8 sm:p-12 text-cream-50 relative overflow-hidden border border-gold/40 shadow-2xl reveal-on-scroll">
          <div className="absolute right-0 top-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-5">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-gold-light">
              Bespoke Ateliers & Private Consultation
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white leading-tight">
              Looking for a Custom Statement Necklace or Tailored Piece?
            </h2>

            <p className="text-xs sm:text-sm text-cream-200/80 font-light leading-relaxed">
              Contact our concierge desk directly on WhatsApp or telephone at +91 8848242986. We provide video consultations, custom gemstone selections, precise length adjustments, and secure insured delivery to your location.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <a
                href={conciergeWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-7 py-3 bg-[#FAF8F5] hover:bg-white text-[#181512] rounded-full text-xs font-semibold tracking-[0.18em] uppercase shadow-sm flex items-center justify-center gap-2.5 transition-all border border-gold/30"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Concierge (+91 8848242986)</span>
              </a>

              <a
                href={getCallUrl()}
                className="w-full sm:w-auto min-h-[44px] px-6 py-3 border border-white/20 text-cream-100 hover:bg-white/10 rounded-full text-xs font-medium tracking-[0.18em] uppercase flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span>Call +91 8848242986</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
