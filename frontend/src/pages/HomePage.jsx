import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Phone, MessageCircle, Gem, Award, CheckCircle2, MapPin, Truck, HelpCircle } from 'lucide-react';
import { fetchCategories, fetchOrnaments } from '../api';
import { useSettings } from '../context/SettingsContext';
import OrnamentCard from '../components/OrnamentCard';
import CategoryCard from '../components/CategoryCard';

export default function HomePage() {
  const { settings, getWhatsAppUrl, getCallUrl } = useSettings();
  const [categories, setCategories] = useState([]);
  const [featuredOrnaments, setFeaturedOrnaments] = useState([]);
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

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION - Zivara: Gujarat Ornaments, Shipped Directly from Gujarat */}
      <section className="relative overflow-hidden bg-maroon-gradient text-cream-50 pt-16 pb-24 lg:pt-24 lg:pb-32 border-b-4 border-gold">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge: Origin vs Location */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-50/10 border border-gold/40 text-gold-light text-xs font-semibold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>Gujarat Traditional Ornaments • Direct Doorstep Delivery</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-royal text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-cream-50 leading-[1.15]">
                Traditional Gujarat Ornaments, <span className="text-gold-gradient">Delivered to Your Doorstep</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-cream-200/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Authentic Gujarat traditional ornaments. Customers place orders on the website,
                orders are processed by Zivara, and products are shipped directly from Gujarat to your provided address.
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

              {/* Action Buttons: "Explore Collection" & "Contact Us" */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/collection"
                  className="w-full sm:w-auto px-8 py-4 bg-gold-gradient text-brown-dark font-bold text-xs tracking-widest uppercase rounded-full shadow-royal-gold hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-4 border-2 border-gold text-cream-100 hover:bg-cream-100/10 font-semibold text-xs tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2"
                >
                  <span>Contact Business</span>
                </Link>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>WhatsApp Enquire</span>
                </a>
              </div>
            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl p-3 bg-gradient-to-tr from-gold/40 via-gold/10 to-transparent border-2 border-gold shadow-2xl">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-brown-dark relative">
                  {/* Hero Showcase Graphic */}
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-maroon/90 to-brown/95">
                    <div className="w-24 h-24 rounded-full bg-cream-50/10 border-2 border-gold flex items-center justify-center mb-6 shadow-inner animate-pulse">
                      <Gem className="w-12 h-12 text-gold" />
                    </div>
                    <span className="font-royal text-2xl font-bold tracking-widest text-gold-light mb-2">
                      ZIVARA ORNAMENTS
                    </span>
                    <p className="text-xs text-cream-200/80 mb-6 max-w-xs leading-relaxed">
                      Authentic Gujarat traditional ornaments, ordered online and shipped directly from Gujarat to your address.
                    </p>
                    <Link
                      to="/collection"
                      className="px-5 py-2 rounded-full bg-gold/20 hover:bg-gold/30 border border-gold text-gold-light text-xs font-semibold tracking-wider uppercase transition-colors"
                    >
                      Browse Catalogue ↗
                    </Link>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-5 -left-5 bg-white text-brown p-3.5 rounded-2xl border border-gold shadow-royal flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-maroon/10 border border-gold/40 flex items-center justify-center text-maroon">
                    <Truck className="w-5 h-5 text-gold-dark" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brown font-royal">Shipped from Gujarat</p>
                    <p className="text-[10px] text-brown/60">Delivered Directly to Your Address</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW ORDER & DELIVERY WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs tracking-[0.25em] uppercase font-semibold text-gold-dark">
            Direct & Transparent Process
          </span>
          <h2 className="font-royal text-3xl sm:text-4xl font-bold text-brown">
            How It Works: Order to Delivery
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-brown/70 leading-relaxed">
            Select your ornament on the website, we process your order, and ship it directly from Gujarat to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gold/30 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-cream-100 text-maroon font-royal font-bold text-lg flex items-center justify-center mx-auto border border-gold">
              1
            </div>
            <h3 className="font-royal text-base font-bold text-brown">Select an Ornament</h3>
            <p className="text-xs text-brown/70 leading-relaxed">
              Explore authentic Gujarat traditional necklaces, jhumkas, bridal Damini, bangles, and rings in our catalogue.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gold/30 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-cream-100 text-maroon font-royal font-bold text-lg flex items-center justify-center mx-auto border border-gold">
              2
            </div>
            <h3 className="font-royal text-base font-bold text-brown">Place Your Order</h3>
            <p className="text-xs text-brown/70 leading-relaxed">
              Click “Enquire / Purchase” to open WhatsApp with the ornament name pre-filled, or send an enquiry form.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gold/30 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-cream-100 text-maroon font-royal font-bold text-lg flex items-center justify-center mx-auto border border-gold">
              3
            </div>
            <h3 className="font-royal text-base font-bold text-brown">Order Processed by Zivara</h3>
            <p className="text-xs text-brown/70 leading-relaxed">
              Our team confirms product specifications, price, availability, and securely prepares your dispatch.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gold/30 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-cream-100 text-maroon font-royal font-bold text-lg flex items-center justify-center mx-auto border border-gold">
              4
            </div>
            <h3 className="font-royal text-base font-bold text-brown">Shipped from Gujarat</h3>
            <p className="text-xs text-brown/70 leading-relaxed">
              The product is shipped directly from Gujarat with tracking and delivered straight to your provided address.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs tracking-[0.25em] uppercase font-semibold text-gold-dark">
            Curated Categories
          </span>
          <h2 className="font-royal text-3xl sm:text-4xl font-bold text-brown">
            Explore by Ornament Type
          </h2>
          <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
          <p className="text-xs sm:text-sm text-brown/70 leading-relaxed">
            Browse authentic Gujarat traditional ornaments organized by classification, dispatched directly from Gujarat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id || cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* 4. FEATURED ORNAMENTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-xs tracking-[0.25em] uppercase font-semibold text-gold-dark">
              Curated Showcase
            </span>
            <h2 className="font-royal text-3xl sm:text-4xl font-bold text-brown">
              Featured Gujarat Ornaments
            </h2>
            <div className="w-16 h-1 bg-gold rounded-full" />
          </div>

          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-maroon hover:text-gold-dark transition-colors"
          >
            <span>View All Ornaments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-cream-200/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredOrnaments.slice(0, 8).map((orn) => (
              <OrnamentCard key={orn.id} ornament={orn} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/collection"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-maroon hover:bg-maroon-dark text-white text-xs font-semibold tracking-widest uppercase rounded-full shadow-md transition-all"
          >
            <span>Explore Complete Collection</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>
      </section>

      {/* 5. TRANSPARENT BUSINESS POSITIONING */}
      <section className="bg-cream-100/70 border-y border-gold/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gold/30 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold flex items-center justify-center text-maroon">
                <CheckCircle2 className="w-6 h-6 text-gold-dark" />
              </div>
              <h3 className="font-royal text-xl font-bold text-brown">
                Direct Orders via Website
              </h3>
              <p className="text-xs text-brown/70 leading-relaxed">
                Browse our online catalogue and place your order or inquiry via WhatsApp. Zivara processes your request and provides clear order tracking.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gold/30 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold flex items-center justify-center text-maroon">
                <Sparkles className="w-6 h-6 text-gold-dark" />
              </div>
              <h3 className="font-royal text-xl font-bold text-brown">
                Shipped Directly from Gujarat
              </h3>
              <p className="text-xs text-brown/70 leading-relaxed">
                Every ornament represents authentic Gujarati craftsmanship — from Vadodara-style Jadau and Kutch Pachchikam to Kathiyawadi bridal jewellery, dispatched directly from Gujarat.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gold/30 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold flex items-center justify-center text-maroon">
                <Truck className="w-6 h-6 text-gold-dark" />
              </div>
              <h3 className="font-royal text-xl font-bold text-brown">
                Delivered to Your Address
              </h3>
              <p className="text-xs text-brown/70 leading-relaxed">
                Orders are safely packaged with insured courier partners and delivered directly to the address you provide, anywhere in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHATSAPP ENQUIRY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-maroon rounded-3xl p-8 sm:p-12 text-cream-50 relative overflow-hidden border-2 border-gold shadow-royal">
          <div className="absolute right-0 top-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-6">
            <span className="text-xs tracking-[0.25em] uppercase font-semibold text-gold-light">
              Direct Contact & Purchase
            </span>
            <h2 className="font-royal text-3xl sm:text-4xl font-bold text-white leading-tight">
              Looking for a Specific Gujarat Ornament or Bridal Set?
            </h2>
            <p className="text-xs sm:text-sm text-cream-200/90 leading-relaxed">
              Contact our team directly on WhatsApp or phone at +91 8848242986. We'll share product images, exact pricing, availability, and arrange direct delivery to your address.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-lg flex items-center justify-center gap-2.5 transition-all"
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
