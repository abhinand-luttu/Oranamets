import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Phone, MessageCircle, Gem, CheckCircle2, Truck } from 'lucide-react';
import { fetchOrnaments } from '../api';
import { useSettings } from '../context/SettingsContext';
import OrnamentCard from '../components/OrnamentCard';
import useScrollReveal from '../hooks/useScrollReveal';
import modernHeroImg from '../assets/modern-necklace-hero.jpg';

export default function HomePage() {
  const { settings, getWhatsAppUrl, getCallUrl } = useSettings();
  const [featuredOrnaments, setFeaturedOrnaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        setLoading(true);
        const orns = await fetchOrnaments({ featured: true });
        if (orns && orns.length > 0) {
          setFeaturedOrnaments(orns);
        } else {
          // If no featured necklaces found, fallback to loading all available necklaces
          const allOrns = await fetchOrnaments();
          setFeaturedOrnaments(allOrns || []);
        }
      } catch (err) {
        console.error("Error loading home page data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  useScrollReveal([featuredOrnaments, loading]);

  return (
    <div className="space-y-16 md:space-y-24 pb-20 overflow-x-hidden">
      {/* ===================================================================
          1. HERO SECTION - Bridal Necklaces Focus
          =================================================================== */}
      <section className="relative overflow-hidden bg-maroon-gradient text-cream-50 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b-4 border-gold">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge: Focus on Designer Bridal Necklaces */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-50/10 border border-gold/40 text-gold-light text-xs font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Designer Bridal Necklaces • Direct Doorstep Delivery</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-royal text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50 leading-[1.15]">
                Bridal Necklaces, <span className="text-gold-gradient">Made to Be Remembered</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-cream-200/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Discover our signature collection of handcrafted bridal necklaces, royal Jadau sets, and statement wedding pieces. Select your dream necklace online, processed by Zivara, and delivered safely from Gujarat to your doorstep.
              </p>

              {/* Key Highlights */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-cream-200/80">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-gold" />
                  <span>Shipped Directly from Gujarat</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold" />
                  <span>Delivered to Your Provided Address</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp Enquiries: +91 8848242986</span>
                </span>
              </div>

              {/* Action Buttons: "Explore Bridal Collection" & "Contact Us" & "WhatsApp" */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/collection"
                  className="w-full sm:w-auto min-h-[46px] px-8 py-3.5 bg-gold-gradient text-brown-dark font-bold text-xs tracking-widest uppercase rounded-full shadow-royal-gold hover:opacity-95 transition-all flex items-center justify-center gap-2 group btn-luxury-sheen"
                >
                  <span>Explore Bridal Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto min-h-[46px] px-8 py-3.5 border-2 border-gold text-cream-100 hover:bg-cream-100/10 font-semibold text-xs tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2"
                >
                  <span>Contact Business</span>
                </Link>

                <a
                  href={getWhatsAppUrl("Hello Zivara! I would like to enquire about your bridal necklace collection.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[46px] px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2 shadow-md btn-luxury-sheen"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>WhatsApp Enquire</span>
                </a>
              </div>
            </div>

            {/* Right Hero Visual - Modern Model Wearing Royal Gold & Kundan Statement Necklace */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square rounded-3xl p-2.5 bg-gradient-to-tr from-gold/50 via-gold/20 to-transparent border-2 border-gold shadow-2xl overflow-hidden group">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-brown-dark relative">
                  <img
                    src={modernHeroImg}
                    alt="Modern fashion model wearing an exquisite royal yellow gold and kundan statement bridal necklace"
                    className="w-full h-full object-cover object-[50%_35%] select-none group-hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />

                  {/* Soft ambient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/70 via-transparent to-brown-dark/20 pointer-events-none" />

                  {/* Golden Sheen Sweep across the Masterpiece Necklace */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
                    <div className="w-[180%] h-full -left-[40%] absolute bg-gradient-to-r from-transparent via-gold-light/25 to-transparent skew-x-[-25deg] animate-necklace-sweep" />
                  </div>

                  {/* Sparkle highlights on necklace */}
                  <div className="absolute top-[65%] left-[50%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center justify-center animate-jewel-sparkle-1">
                    <Sparkles className="w-6 h-6 text-amber-200 drop-shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
                  </div>
                </div>

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 text-brown p-3 rounded-2xl border border-gold shadow-royal flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-maroon flex items-center justify-center text-gold shadow-sm">
                      <Gem className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brown font-royal">Royal Gold & Kundan Bridal Necklace</p>
                      <p className="text-[10px] text-brown/65">Shipped Directly from Gujarat</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gold-dark tracking-wider hidden sm:inline">
                    Signature
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. HOW ORDER & DELIVERY WORKS (BRIDAL NECKLACE FOCUS)
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 reveal-on-scroll">
          <span className="text-xs tracking-[0.25em] uppercase font-semibold text-gold-dark">
            Direct & Transparent Process
          </span>
          <h2 className="font-royal text-3xl sm:text-4xl font-bold text-brown">
            How It Works: Order to Delivery
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-brown/70 leading-relaxed">
            Select your bridal necklace on the website, we process your order, and ship it directly from Gujarat to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gold/30 shadow-sm text-center space-y-3 step-card-hover reveal-on-scroll stagger-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-cream-100 text-maroon font-royal font-bold text-lg flex items-center justify-center mx-auto border border-gold step-badge">
              1
            </div>
            <h3 className="font-royal text-base font-bold text-brown">Choose Your Bridal Necklace</h3>
            <p className="text-xs text-brown/70 leading-relaxed">
              Explore exquisite designer bridal necklaces, traditional kundan sets, and statement chokers in our collection.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gold/30 shadow-sm text-center space-y-3 step-card-hover reveal-on-scroll stagger-2 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-cream-100 text-maroon font-royal font-bold text-lg flex items-center justify-center mx-auto border border-gold step-badge">
              2
            </div>
            <h3 className="font-royal text-base font-bold text-brown">Place Your Order</h3>
            <p className="text-xs text-brown/70 leading-relaxed">
              Click “Enquire / Purchase” to open WhatsApp with your chosen bridal necklace details pre-filled.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gold/30 shadow-sm text-center space-y-3 step-card-hover reveal-on-scroll stagger-3 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-cream-100 text-maroon font-royal font-bold text-lg flex items-center justify-center mx-auto border border-gold step-badge">
              3
            </div>
            <h3 className="font-royal text-base font-bold text-brown">Order Processed by Zivara</h3>
            <p className="text-xs text-brown/70 leading-relaxed">
              Our team confirms necklace specifications, price, availability, and securely prepares your dispatch.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gold/30 shadow-sm text-center space-y-3 step-card-hover reveal-on-scroll stagger-4 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-cream-100 text-maroon font-royal font-bold text-lg flex items-center justify-center mx-auto border border-gold step-badge">
              4
            </div>
            <h3 className="font-royal text-base font-bold text-brown">Shipped from Gujarat</h3>
            <p className="text-xs text-brown/70 leading-relaxed">
              Your bridal necklace is safely packaged and shipped directly from Gujarat with tracking straight to your address.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          3. BRIDAL NECKLACE COLLECTION
          =================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 reveal-on-scroll">
          <div className="space-y-3">
            <span className="text-xs tracking-[0.25em] uppercase font-semibold text-gold-dark">
              Curated Wedding Showcase
            </span>
            <h2 className="font-royal text-3xl sm:text-4xl font-bold text-brown">
              Bridal Necklace Collection
            </h2>
            <div className="w-16 h-1 bg-gold rounded-full" />
            <p className="text-xs sm:text-sm text-brown/70 leading-relaxed">
              Explore our collection of premium bridal necklaces, crafted to complete your special look.
            </p>
          </div>

          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-maroon hover:text-gold-dark transition-colors"
          >
            <span>View All Bridal Necklaces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-cream-200/50 animate-pulse border border-gold/20" />
            ))}
          </div>
        ) : featuredOrnaments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredOrnaments.slice(0, 8).map((orn, idx) => (
              <div key={orn.id} className={`reveal-on-scroll stagger-${(idx % 8) + 1}`}>
                <OrnamentCard ornament={orn} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/80 p-8 rounded-2xl border border-gold/40 text-center max-w-lg mx-auto space-y-3">
            <Gem className="w-8 h-8 text-gold mx-auto" />
            <p className="font-royal text-base font-bold text-brown">Exclusive Bridal Necklace Catalogue</p>
            <p className="text-xs text-brown/70 leading-relaxed">
              New handcrafted bridal necklaces are being prepared. Browse the collection or contact us directly on WhatsApp for custom designs.
            </p>
          </div>
        )}

        <div className="mt-12 text-center reveal-on-scroll">
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-maroon hover:bg-maroon-dark text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-md transition-all btn-luxury-sheen"
          >
            <span>Explore Complete Bridal Collection</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>
      </section>

      {/* ===================================================================
          4. TRANSPARENT BUSINESS POSITIONING
          =================================================================== */}
      <section className="w-full bg-cream-100/70 border-y border-gold/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gold/30 shadow-sm space-y-4 card-luxury-hover reveal-on-scroll stagger-1">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold flex items-center justify-center text-maroon">
                <CheckCircle2 className="w-6 h-6 text-gold-dark" />
              </div>
              <h3 className="font-royal text-xl font-bold text-brown">
                Direct Orders via Website
              </h3>
              <p className="text-xs text-brown/70 leading-relaxed">
                Browse our curated bridal necklace collection and place your order or inquiry via WhatsApp. Zivara processes each request with dedicated order tracking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gold/30 shadow-sm space-y-4 card-luxury-hover reveal-on-scroll stagger-2">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold flex items-center justify-center text-maroon">
                <Sparkles className="w-6 h-6 text-gold-dark" />
              </div>
              <h3 className="font-royal text-xl font-bold text-brown">
                Shipped Directly from Gujarat
              </h3>
              <p className="text-xs text-brown/70 leading-relaxed">
                Every bridal necklace represents authentic Gujarat artistry — from Vadodara-style royal Jadau Kundan to heritage wedding pieces, dispatched directly from Gujarat.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gold/30 shadow-sm space-y-4 card-luxury-hover reveal-on-scroll stagger-3">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold flex items-center justify-center text-maroon">
                <Truck className="w-6 h-6 text-gold-dark" />
              </div>
              <h3 className="font-royal text-xl font-bold text-brown">
                Delivered to Your Address
              </h3>
              <p className="text-xs text-brown/70 leading-relaxed">
                Each bridal necklace is safely packed in luxury protective packaging with insured courier partners and delivered directly to the address you provide, anywhere in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          5. WHATSAPP ENQUIRY BANNER (BRIDAL NECKLACE CONSULTATION)
          =================================================================== */}
      <section className="w-full bg-maroon py-14 lg:py-20 border-y-4 border-gold relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs tracking-[0.25em] uppercase font-semibold text-gold-light">
              Custom Bridal Consultation
            </span>

            <h2 className="font-royal text-3xl sm:text-4xl font-bold text-white leading-tight">
              Find the Bridal Necklace That Completes Your Look
            </h2>

            <p className="text-xs sm:text-sm text-cream-200/90 leading-relaxed font-light">
              Looking for a custom bridal necklace, matching wedding jewellery, or bespoke Gujarat kundan set? Contact our team directly on WhatsApp or phone at +91 8848242986. We'll share product images, exact pricing, and arrange direct delivery to your address.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href={getWhatsAppUrl("Hello Zivara! I would like to enquire about your bridal necklaces and wedding collection.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-lg flex items-center justify-center gap-2.5 transition-all btn-luxury-sheen"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire on WhatsApp (+91 8848242986)</span>
              </a>

              <a
                href={getCallUrl()}
                className="w-full sm:w-auto px-6 py-3.5 border border-gold text-cream-100 hover:bg-cream-100/10 rounded-full text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call +91 8848242986</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
