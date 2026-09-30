import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Phone, MessageCircle, Gem, CheckCircle2, Truck, X, ShieldCheck } from 'lucide-react';
import { fetchOrnaments } from '../api';
import { useSettings } from '../context/SettingsContext';
import OrnamentCard from '../components/OrnamentCard';
import useScrollReveal from '../hooks/useScrollReveal';
import modernHeroImg from '../assets/modern-necklace-hero.jpg';

export default function HomePage() {
  const { settings, getWhatsAppUrl, getCallUrl } = useSettings();
  const [featuredOrnaments, setFeaturedOrnaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStepModal, setActiveStepModal] = useState(null);

  // Close modal with Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveStepModal(null);
      }
    };
    if (activeStepModal) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeStepModal]);

  const orderSteps = [
    {
      id: 1,
      stepNum: "01",
      tag: "Artisan Selection",
      title: "Choose Your Bridal Necklace",
      shortDesc: "Browse our signature collection of handcrafted bridal necklaces, royal choker sets, and statement wedding pieces crafted with authentic Gujarat artistry.",
      icon: Gem,
      modalTitle: "Choose Your Bridal Necklace",
      modalTagline: "Handcrafted Bridal Artistry • Gujarat Heritage Workshop",
      modalHighlights: [
        {
          title: "Authentic Gujarat Craftsmanship",
          desc: "Each necklace is meticulously shaped by master artisans in Gujarat, blending royal wedding heritage aesthetics with refined, lightweight comfort."
        },
        {
          title: "HD Video & Close-Up Previews",
          desc: "Need to inspect details before deciding? Connect with us on WhatsApp to receive high-definition video clips and photos of how the necklace drapes and shines."
        },
        {
          title: "Custom Sizing & Matching Sets",
          desc: "Coordinate matching bridal earrings, maang tikka, and adjust chain lengths to complement your wedding outfit flawlessly."
        }
      ],
      actionType: "link",
      actionText: "Browse Bridal Collection",
      actionLink: "/collection",
      whatsAppText: "Hello Zivara! I would like to explore your bridal necklace designs and see live video previews."
    },
    {
      id: 2,
      stepNum: "02",
      tag: "Direct WhatsApp Order",
      title: "Order & Confirm on WhatsApp",
      shortDesc: "Click 'Enquire / Purchase' on any design to instantly connect with our team at +91 8848242986. We verify live availability, specifications, and lock your order.",
      icon: MessageCircle,
      modalTitle: "Order & Confirm on WhatsApp",
      modalTagline: "1-on-1 Bridal Specialist Concierge • Zero Intermediaries",
      modalHighlights: [
        {
          title: "Personalized WhatsApp Concierge",
          desc: "Connect directly with our dedicated Zivara jewellery consultant at +91 8848242986 without going through complicated checkouts or intermediaries."
        },
        {
          title: "Live Stock & Video Confirmation",
          desc: "We verify ready-to-dispatch availability, share weight and purity specifications, and send live video proof of your selected necklace."
        },
        {
          title: "Transparent Pricing & Simple Booking",
          desc: "Clear, all-inclusive pricing with transparent transit billing and immediate order confirmation with zero hidden charges."
        }
      ],
      actionType: "whatsapp",
      actionText: "Chat on WhatsApp (+91 8848242986)",
      actionLink: null,
      whatsAppText: "Hello Zivara! I would like to confirm an order for a bridal necklace."
    },
    {
      id: 3,
      stepNum: "03",
      tag: "Safe Doorstep Delivery",
      title: "Shipped from Gujarat to Your Doorstep",
      shortDesc: "Dispatched straight from our Gujarat workshop in tamper-proof luxury packaging with insured express courier service delivered directly to your address.",
      icon: Truck,
      modalTitle: "Shipped from Gujarat to Your Doorstep",
      modalTagline: "Dispatched from Gujarat • Insured Express Transit Across India",
      modalHighlights: [
        {
          title: "Luxury Tamper-Proof Packaging",
          desc: "Each bridal necklace is nestled in custom velvet casing inside a tamper-evident, sealed security box to ensure pristine, scratch-free arrival."
        },
        {
          title: "Insured Air Express Courier Dispatch",
          desc: "Directly shipped from our Gujarat workshop via premium air express couriers with 100% transit insurance coverage."
        },
        {
          title: "Real-Time Tracking to Your Doorstep",
          desc: "Receive live courier tracking links on WhatsApp the moment your package is dispatched, right up to safe handover at your given address."
        }
      ],
      actionType: "whatsapp",
      actionText: "Track Shipping Details",
      actionLink: null,
      whatsAppText: "Hello Zivara! I would like to know more about shipping timelines and delivery to my address."
    }
  ];

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
                Discover our signature collection of handcrafted bridal necklaces and statement wedding pieces. Select your dream necklace online, processed by Zivara, and delivered safely from Gujarat to your doorstep.
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

            {/* Right Hero Visual - Modern Model Wearing Royal Gold Statement Bridal Necklace */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square rounded-3xl p-2.5 bg-gradient-to-tr from-gold/50 via-gold/20 to-transparent border-2 border-gold shadow-2xl overflow-hidden group">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-brown-dark relative">
                  <img
                    src={modernHeroImg}
                    alt="Modern fashion model wearing an exquisite royal yellow gold statement bridal necklace"
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          2. HOW ORDER & DELIVERY WORKS (FULL-WIDTH 3-STEP EXPERIENCE)
          =================================================================== */}
      <section className="w-full bg-gradient-to-b from-[#FAF7F0] via-white to-[#FAF7F0] border-y-2 border-gold/40 py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 overflow-hidden relative shadow-inner">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

        {/* Full-width Section Header */}
        <div className="w-full max-w-[1720px] mx-auto text-center space-y-4 mb-12 sm:mb-16 lg:mb-20 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cream-100/90 border border-gold/50 shadow-sm text-gold-dark text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase">
            <Sparkles className="w-4 h-4 text-gold" />
            <span>3-Step Seamless Process • Direct From Gujarat</span>
          </div>

          <h2 className="font-royal text-3xl sm:text-5xl lg:text-6xl font-bold text-brown tracking-tight leading-[1.15]">
            How It Works: <span className="text-gold-gradient">Order to Delivery</span>
          </h2>

          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="h-[2px] w-20 sm:w-40 bg-gradient-to-r from-transparent via-gold to-gold" />
            <div className="w-3.5 h-3.5 rotate-45 bg-gold border border-gold-dark shadow-sm" />
            <div className="h-[2px] w-20 sm:w-40 bg-gradient-to-l from-transparent via-gold to-gold" />
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-brown/75 max-w-4xl mx-auto leading-relaxed font-light">
            Select your dream bridal necklace online, easily confirm on WhatsApp with our jewellery specialists, and receive your handcrafted piece delivered safely from Gujarat straight to your doorstep.
          </p>
        </div>

        {/* 3-Step Full Screen Width Grid */}
        <div className="w-full max-w-[1720px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
          {orderSteps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.id}
                onClick={() => setActiveStepModal(step.id)}
                className={`group relative bg-white/95 backdrop-blur-sm rounded-3xl p-7 sm:p-9 lg:p-10 border-2 border-gold/30 hover:border-gold shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden card-luxury-hover step-card-hover reveal-on-scroll stagger-${idx + 1}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStepModal(step.id);
                  }
                }}
                aria-label={`Open details for ${step.title}`}
              >
                {/* Large Background Watermark Number */}
                <span
                  className="absolute -right-4 -top-6 text-8xl sm:text-9xl font-royal font-bold text-cream-200/40 select-none pointer-events-none group-hover:text-gold/20 group-hover:scale-105 transition-all duration-500"
                  aria-hidden="true"
                >
                  {step.stepNum}
                </span>

                {/* Top Badge & Tag Row */}
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-cream-100 group-hover:bg-maroon text-maroon group-hover:text-gold-light font-royal font-bold text-xl flex items-center justify-center border-2 border-gold shadow-md transition-all duration-500 group-hover:scale-110 step-badge">
                      {step.stepNum}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-cream-100/90 border border-gold/35 text-gold-dark group-hover:border-gold transition-colors">
                        {step.tag}
                      </span>
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-3 pt-2">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/40 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-gold transition-colors duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="font-royal text-xl sm:text-2xl font-bold text-brown group-hover:text-maroon transition-colors leading-snug">
                      {step.title}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-brown/75 leading-relaxed font-light">
                    {step.shortDesc}
                  </p>
                </div>

                {/* Bottom Interactive Trigger Action */}
                <div className="relative z-10 pt-6 mt-6 border-t border-cream-200/80">
                  <div className="w-full py-3 px-5 rounded-2xl bg-cream-100/90 group-hover:bg-gold-gradient group-hover:text-brown-dark text-maroon text-xs font-bold tracking-wider uppercase border border-gold/40 flex items-center justify-between transition-all duration-300 shadow-sm btn-luxury-sheen">
                    <span>View Step Details & Guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                  <span className="block text-[11px] text-center text-brown/50 pt-2 tracking-wide font-medium">
                    Tap to open interactive guide
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===============================================================
            INTERACTIVE MODAL POPUP FOR ORDER TO DELIVERY STEPS
            =============================================================== */}
        {activeStepModal && (() => {
          const currentStep = orderSteps.find((s) => s.id === activeStepModal);
          if (!currentStep) return null;
          const IconComp = currentStep.icon;

          return (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-modal-backdrop"
              onClick={() => setActiveStepModal(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-step-modal-title"
            >
              <div
                className="relative w-full max-w-2xl bg-[#FCFAF6] border-2 border-gold rounded-3xl p-6 sm:p-10 shadow-2xl animate-modal-content overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Decorative Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-2.5 bg-gold-gradient" />

                {/* Close Button */}
                <button
                  onClick={() => setActiveStepModal(null)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-cream-100 hover:bg-cream-200 text-brown border border-gold/50 flex items-center justify-center transition-all duration-200 shadow-sm hover:rotate-90"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5 text-brown" />
                </button>

                {/* Modal Header */}
                <div className="space-y-4 pt-2 pb-6 border-b border-gold/30">
                  <div className="flex items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-maroon text-gold-light text-xs font-bold tracking-widest uppercase">
                      Step {currentStep.stepNum} of 03
                    </span>
                    <span className="text-xs text-gold-dark font-semibold tracking-wider uppercase">
                      {currentStep.tag}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold flex items-center justify-center text-maroon flex-shrink-0">
                      <IconComp className="w-6 h-6 text-maroon" />
                    </div>
                    <div>
                      <h3
                        id="order-step-modal-title"
                        className="font-royal text-2xl sm:text-3xl font-bold text-brown leading-tight"
                      >
                        {currentStep.modalTitle}
                      </h3>
                      <p className="text-xs text-brown/65 font-medium mt-0.5">
                        {currentStep.modalTagline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="py-6 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gold-dark">
                    Key Process Details & Customer Assurance
                  </p>
                  <div className="space-y-3.5">
                    {currentStep.modalHighlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="p-4 rounded-2xl bg-white border border-gold/25 shadow-sm space-y-1.5"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <h4 className="font-royal text-base font-bold text-brown">
                            {highlight.title}
                          </h4>
                        </div>
                        <p className="text-xs text-brown/70 leading-relaxed font-light pl-6">
                          {highlight.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="pt-4 border-t border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  {currentStep.actionType === 'link' ? (
                    <Link
                      to={currentStep.actionLink}
                      onClick={() => setActiveStepModal(null)}
                      className="w-full sm:w-auto px-6 py-3 bg-gold-gradient text-brown-dark font-bold text-xs tracking-widest uppercase rounded-full shadow-md flex items-center justify-center gap-2 hover:opacity-95 transition-opacity btn-luxury-sheen"
                    >
                      <span>{currentStep.actionText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href={getWhatsAppUrl(currentStep.whatsAppText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs tracking-widest uppercase rounded-full shadow-md flex items-center justify-center gap-2 transition-colors btn-luxury-sheen"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                      <span>{currentStep.actionText}</span>
                    </a>
                  )}

                  <button
                    onClick={() => setActiveStepModal(null)}
                    className="w-full sm:w-auto px-6 py-3 border border-brown/30 hover:bg-cream-100 text-brown font-semibold text-xs tracking-widest uppercase rounded-full transition-colors"
                  >
                    Close Guide
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
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
                Every bridal necklace represents authentic Gujarat artistry — from royal artisan bridal jewellery to heritage wedding pieces, dispatched directly from Gujarat.
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
              Looking for a custom bridal necklace, matching wedding jewellery, or bespoke Gujarat bridal set? Contact our team directly on WhatsApp or phone at +91 8848242986. We'll share product images, exact pricing, and arrange direct delivery to your address.
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
