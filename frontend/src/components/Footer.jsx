import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Clock, Sparkles, Truck, PackageCheck } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Footer() {
  const { settings, getWhatsAppUrl, getCallUrl } = useSettings();

  return (
    <footer className="bg-brown text-cream-100 pt-16 pb-8 border-t-2 border-gold relative overflow-hidden">
      {/* Decorative Gold Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-cream-100/10">
          {/* Brand & Positioning */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-maroon flex items-center justify-center border border-gold">
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              <span className="font-royal text-2xl font-bold tracking-widest text-gold-light">
                ZIVARA
              </span>
            </div>
            <p className="text-xs text-cream-200/90 leading-relaxed font-medium">
              Gujarat Traditional Ornaments, Supplied from Kerala.
            </p>
            <p className="text-xs text-cream-300/70 leading-relaxed">
              Carefully sourced Gujarat-inspired jewellery and traditional ornament styles, curated and supplied by our Kerala-based business.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-gold-light/90 bg-cream-100/5 px-2.5 py-1 rounded border border-gold/30">
                <Truck className="w-3.5 h-3.5 text-gold" />
                <span>Delivery Across Kerala & India</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-royal text-sm font-semibold tracking-widest uppercase text-gold">
              Explore Showcase
            </h3>
            <ul className="space-y-2.5 text-xs text-cream-200/80">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-gold transition-colors">Complete Collection</Link>
              </li>
              <li>
                <Link to="/collection?category=necklace" className="hover:text-gold transition-colors">Gujarat-Style Necklaces</Link>
              </li>
              <li>
                <Link to="/collection?category=bridal-jewellery" className="hover:text-gold transition-colors">Bridal Damini & Sets</Link>
              </li>
              <li>
                <Link to="/collection?category=gujarat-special" className="hover:text-gold transition-colors">Gujarat Special Pachchikam</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors">Contact / Enquire</Link>
              </li>
            </ul>
          </div>

          {/* Clear Business Location: Kerala, India */}
          <div className="space-y-4">
            <h3 className="font-royal text-sm font-semibold tracking-widest uppercase text-gold">
              Business Location & Contact
            </h3>
            <ul className="space-y-3 text-xs text-cream-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cream-100 block">Business Location:</strong>
                  <span>Kerala, India</span>
                  <span className="block text-[11px] text-cream-300/60 mt-0.5">
                    (Ornaments sourced from Gujarat, supplied from Kerala)
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <div>
                  <strong className="text-cream-100 block">Phone / WhatsApp:</strong>
                  <a href={getCallUrl()} className="hover:text-gold transition-colors font-medium">
                    +91 8848242986
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-gold transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{settings.business_hours}</span>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct Enquiry / Purchase */}
          <div className="space-y-4 bg-cream-100/5 p-5 rounded-xl border border-gold/20">
            <h3 className="font-royal text-sm font-semibold tracking-widest uppercase text-gold">
              Purchase & Enquiry
            </h3>
            <p className="text-xs text-cream-300/80 leading-relaxed">
              Ready to purchase an ornament? Send us a WhatsApp message to confirm price, availability, and delivery to your address.
            </p>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-center text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: +91 8848242986</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-cream-300/60 gap-4">
          <p>© {new Date().getFullYear()} Zivara. Gujarat Traditional Ornaments, Supplied from Kerala, India.</p>
          <div className="flex items-center space-x-4">
            <Link to="/contact" className="hover:text-gold transition-colors">Contact Showroom</Link>
            <span>•</span>
            <a
              href="http://127.0.0.1:8001/admin/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors flex items-center gap-1"
            >
              <span>Admin Portal</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
