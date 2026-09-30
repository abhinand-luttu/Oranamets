import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, Sparkles, Lock, Truck } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings, getWhatsAppUrl, getCallUrl } = useSettings();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/collection' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gold/20 transition-all duration-300">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#161412] text-cream-100 text-[11px] py-2 px-4 border-b border-gold/15">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="tracking-[0.2em] uppercase font-medium text-cream-200/90 text-[10px] sm:text-[11px]">
              Modern Statement Necklaces & Fine Jewellery • Direct Atelier Delivery
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-[11px] font-medium tracking-wider">
            <span className="flex items-center gap-1.5 text-cream-200/80">
              <Truck className="w-3 h-3 text-gold" />
              <span>Insured Doorstep Shipping</span>
            </span>

            <a
              href={getCallUrl()}
              className="text-cream-200/80 hover:text-gold transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-gold" />
              <span>+91 8848242986</span>
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Concierge</span>
            </a>

            <div className="h-3 w-px bg-cream-100/20" />

            <Link
              to="/add-ornaments"
              className="text-gold-light hover:text-white transition-colors flex items-center gap-1 font-medium"
              title="Add Ornaments Portal"
            >
              <Lock className="w-3 h-3 text-gold" />
              <span>Add Ornaments</span>
            </Link>

            <a
              href="https://zivara-backend-4cl3.onrender.com/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-300/60 hover:text-gold transition-colors flex items-center gap-1"
              title="Store Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-[#181512] flex items-center justify-center border border-gold/40 shadow-sm group-hover:border-gold transition-all duration-300">
              <Sparkles className="w-4 h-4 text-gold" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-normal tracking-[0.25em] text-[#181512] group-hover:text-gold-dark transition-colors">
                Z I V A R A
              </span>
              <span className="text-[9px] tracking-[0.35em] uppercase text-gold font-medium -mt-1">
                HAUTE JOAILLERIE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs uppercase tracking-[0.22em] font-medium transition-all relative py-1.5 ${
                  isActive(link.path)
                    ? 'text-[#181512] font-semibold'
                    : 'text-[#6E6760] hover:text-[#181512]'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={getCallUrl()}
              className="px-4 py-2 border border-[#181512]/20 text-[#181512] hover:border-gold hover:text-gold-dark rounded-full text-xs font-medium tracking-[0.18em] uppercase transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>Concierge</span>
            </a>

            <a
              href={getWhatsAppUrl("Hello Zivara! I would like to enquire about your modern luxury statement necklaces and jewellery collection.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#181512] hover:bg-black text-cream-50 rounded-full text-xs font-semibold tracking-[0.18em] uppercase shadow-sm hover:shadow-md transition-all flex items-center gap-2 border border-gold/40"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Enquire</span>
            </a>
          </div>

          {/* Mobile Menu & WhatsApp Icons */}
          <div className="md:hidden flex items-center space-x-2">
            <a
              href={getWhatsAppUrl("Hello Zivara! I would like to enquire about your modern statement necklaces.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#181512] text-emerald-400 border border-gold/30 hover:bg-black transition-colors"
              aria-label="WhatsApp Contact"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#181512] hover:bg-cream-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gold/20 px-6 pt-4 pb-6 space-y-4 shadow-xl animate-fadeIn">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-xs uppercase tracking-[0.22em] font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#181512] text-cream-50 font-semibold'
                    : 'text-[#2C1810] hover:bg-cream-100'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/add-ornaments"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-xl text-xs uppercase tracking-[0.22em] font-semibold text-[#181512] hover:bg-cream-100 flex items-center gap-2 border border-gold/30 bg-gold/5 mt-2"
            >
              <Lock className="w-3.5 h-3.5 text-gold" />
              <span>🔒 Add Ornaments</span>
            </Link>

            <a
              href="https://zivara-backend-4cl3.onrender.com/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl text-xs uppercase tracking-[0.22em] font-medium text-[#6E6760] hover:bg-cream-100 flex items-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal Login</span>
            </a>
          </div>

          <div className="pt-3 border-t border-gold/20 flex flex-col gap-2.5">
            <a
              href={getWhatsAppUrl("Hello Zivara! I would like to enquire about your modern luxury statement necklaces.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[44px] py-3 bg-[#181512] text-cream-50 rounded-full text-center text-xs font-semibold tracking-[0.18em] uppercase flex items-center justify-center gap-2 shadow-sm border border-gold/30"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Enquire</span>
            </a>

            <a
              href={getCallUrl()}
              className="w-full min-h-[44px] py-3 border border-[#181512]/20 text-[#181512] rounded-full text-center text-xs font-semibold tracking-[0.18em] uppercase flex items-center justify-center gap-2 bg-cream-50"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>Call Concierge: +91 8848242986</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
