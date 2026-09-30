import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Clock, Sparkles, Truck, Lock } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings, getWhatsAppUrl, getCallUrl } = useSettings();

  return (
    <footer className="bg-[#12100E] text-cream-100 pt-16 pb-8 border-t border-gold/30 relative overflow-hidden">
      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-24 bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-cream-100/10">
          {/* Brand & Vision - 4 cols */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#181512] flex items-center justify-center border border-gold/40">
                <Sparkles className="w-4 h-4 text-gold" />
              </div>
              <span className="font-serif text-2xl font-normal tracking-[0.25em] text-cream-50">
                Z I V A R A
              </span>
            </div>

            <p className="text-xs text-cream-200/90 leading-relaxed font-light">
              Modern statement necklaces and haute joaillerie. Each masterpiece is handcrafted in our Gujarat ateliers with pure gold, uncut polki diamonds, and precious gemstones.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-[11px] text-cream-200/80 bg-white/5 px-3 py-1.5 rounded-full border border-gold/25">
                <Truck className="w-3.5 h-3.5 text-gold" />
                <span>Insured Doorstep Shipping Across India</span>
              </span>
            </div>
          </div>

          {/* Curated Collections - 3 cols */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-xs font-semibold tracking-[0.22em] uppercase text-gold">
              Collections
            </h3>
            <ul className="space-y-2 text-xs text-cream-200/70 font-light">
              <li>
                <Link to="/collection" className="hover:text-gold transition-colors">All Ornaments</Link>
              </li>
              <li>
                <Link to="/collection?category=necklace" className="hover:text-gold transition-colors">Statement Necklaces</Link>
              </li>
              <li>
                <Link to="/collection?category=choker" className="hover:text-gold transition-colors">Haute Chokers & Sets</Link>
              </li>
              <li>
                <Link to="/collection?category=earrings" className="hover:text-gold transition-colors">Architectural Earrings</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">Bespoke Commissions</Link>
              </li>
            </ul>
          </div>

          {/* Atelier & Client Care - 5 cols */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-serif text-xs font-semibold tracking-[0.22em] uppercase text-gold">
              Atelier Concierge
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-cream-200/80 font-light">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream-100 block font-normal">Atelier Origin</strong>
                    <span className="text-[11px] text-cream-300/70">Gujarat, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream-100 block font-normal">Private Appointments</strong>
                    <span className="text-[11px] text-cream-300/70">{settings.business_hours || 'Mon – Sat: 10:00 AM – 8:00 PM'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                  <a href={getCallUrl()} className="hover:text-gold transition-colors text-[11px]">
                    +91 8848242986
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-gold transition-colors text-[11px]">
                    {settings.email}
                  </a>
                </div>

                <div className="pt-1">
                  <a
                    href={getWhatsAppUrl("Hello Zivara! I would like to enquire about your modern luxury statement necklaces.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-cream-100 text-[11px] font-medium tracking-wider uppercase rounded-full border border-gold/30 transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp VIP Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-cream-300/60 font-light gap-4">
          <p>© {new Date().getFullYear()} Zivara Haute Joaillerie. Modern Statement Necklaces & Fine Jewellery.</p>

          <div className="flex items-center space-x-5">
            <Link to="/contact" className="hover:text-gold transition-colors">Concierge</Link>
            <span>•</span>
            <Link to="/add-ornaments" className="hover:text-gold transition-colors flex items-center gap-1 text-gold-light">
              <Lock className="w-3 h-3 text-gold" />
              <span>Add Ornaments</span>
            </Link>
            <span>•</span>
            <a
              href="https://zivara-backend-4cl3.onrender.com/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-gold/70" />
              <span>Admin Portal</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
