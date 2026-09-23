import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, Sparkles, Lock, MapPin, Truck } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-cream-50/95 backdrop-blur-md border-b border-gold/20 shadow-sm transition-all">
      {/* Top Royal Announcement Bar */}
      <div className="bg-maroon text-cream-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            <span className="tracking-wider uppercase font-medium text-[11px]">
              Traditional Gujarat Ornaments • Shipped Directly from Gujarat
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-[11px] font-medium tracking-wider">
            <span className="flex items-center gap-1 text-gold-light/90">
              <Truck className="w-3 h-3 text-gold" />
              <span>Doorstep Delivery to Your Address</span>
            </span>
            <a
              href={getCallUrl()}
              className="hover:text-gold transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-gold" />
              <span>+91 8848242986</span>
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-1.5 text-emerald-300"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Direct</span>
            </a>
            <a
              href="https://zivara-backend-4cl3.onrender.com/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-1 text-gold/80 hover:text-gold"
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
            <div className="w-11 h-11 rounded-full bg-maroon flex items-center justify-center border-2 border-gold shadow-md group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div className="flex flex-col">
              <span className="font-royal text-2xl font-bold tracking-widest text-maroon group-hover:text-maroon-dark transition-colors">
                ZIVARA
              </span>
              <span className="text-[9.5px] tracking-[0.25em] uppercase text-gold font-semibold -mt-1">
                GUJARAT TRADITIONAL ORNAMENTS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm tracking-wider uppercase font-medium transition-all relative py-1 ${
                  isActive(link.path)
                    ? 'text-maroon font-semibold'
                    : 'text-brown hover:text-gold'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center space-x-3">
            <a
              href={getCallUrl()}
              className="px-4 py-2 border border-gold/40 text-brown hover:border-gold hover:text-maroon rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>Call Now</span>
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>Enquire / Purchase</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors"
              aria-label="WhatsApp Contact"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-brown hover:text-maroon hover:bg-cream-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-50 border-b border-gold/30 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                  isActive(link.path)
                    ? 'bg-maroon text-white font-semibold'
                    : 'text-brown hover:bg-cream-200/50 hover:text-maroon'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://zivara-backend-4cl3.onrender.com/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-gold-dark hover:bg-cream-200/50 flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Admin Portal Login</span>
            </a>
          </div>

          <div className="pt-3 border-t border-gold/20 flex flex-col gap-2.5">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-700 text-white rounded-lg text-center text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire / Purchase on WhatsApp</span>
            </a>
            <a
              href={getCallUrl()}
              className="w-full py-3 border border-gold text-maroon rounded-lg text-center text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 bg-cream-100/50"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>Call +91 8848242986</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
