import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { getAbsoluteImageUrl } from '../api';

export default function OrnamentCard({ ornament }) {
  const { getWhatsAppUrl } = useSettings();

  const isAvailable = ornament.availability === 'in_stock';
  const isMadeToOrder = ornament.availability === 'made_to_order';

  const formatPrice = () => {
    if (ornament.is_price_on_request || !ornament.price) {
      return "Price on Request";
    }
    return `₹${Number(ornament.price).toLocaleString('en-IN')}`;
  };

  const initialImage = getAbsoluteImageUrl(ornament.primary_image_url) || '/placeholder-jewel.svg';
  const [imageSrc, setImageSrc] = useState(initialImage);

  useEffect(() => {
    setImageSrc(getAbsoluteImageUrl(ornament.primary_image_url) || '/placeholder-jewel.svg');
  }, [ornament.primary_image_url]);

  return (
    <div className="group relative bg-white rounded-2xl border border-gold/20 hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden">
      {/* Visual Canvas */}
      <Link
        to={`/ornaments/${ornament.slug}`}
        className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-[#FAF8F5] block"
      >
        <img
          src={imageSrc}
          alt={ornament.name}
          loading="lazy"
          onError={() => setImageSrc('/placeholder-jewel.svg')}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Subtle Ambient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Minimal Luxury Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {ornament.is_featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase bg-[#181512] text-cream-50 border border-gold/40 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-gold" />
              <span>Signature</span>
            </span>
          )}
          {isMadeToOrder && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wider uppercase bg-cream-100 text-[#181512] border border-gold/30">
              Made to Order
            </span>
          )}
        </div>

        {/* Floating Quick Action on Hover */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10 flex items-center justify-between gap-2">
          <span className="flex-1 py-2 px-3 bg-white/95 text-[#181512] text-[11px] font-semibold tracking-wider uppercase rounded-full shadow-md flex items-center justify-center gap-1.5 border border-gold/30">
            <span>View Piece</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
          </span>
        </div>
      </Link>

      {/* Editorial Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Purity Line */}
          <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase font-semibold text-[#8C7A6B] mb-1.5">
            <span>{ornament.category_name || 'Fine Jewellery'}</span>
            {ornament.purity && (
              <span className="text-gold font-medium">{ornament.purity}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg font-medium text-[#181512] group-hover:text-gold-dark transition-colors line-clamp-1 mb-1">
            <Link to={`/ornaments/${ornament.slug}`}>
              {ornament.name}
            </Link>
          </h3>

          {/* Clean Description */}
          <p className="text-[11px] sm:text-xs text-[#6E6760] line-clamp-1 font-light leading-relaxed mb-3">
            {ornament.description}
          </p>
        </div>

        {/* Price & Direct Concierge Action */}
        <div className="pt-3 border-t border-cream-200/60 flex items-center justify-between">
          <div>
            <span className="block text-[9px] uppercase tracking-wider text-[#8C7A6B]">Investment</span>
            <span className={`font-serif text-sm sm:text-base font-semibold ${
              ornament.is_price_on_request ? 'text-gold-dark italic text-xs' : 'text-[#181512]'
            }`}>
              {formatPrice()}
            </span>
          </div>

          <a
            href={getWhatsAppUrl(`Hello Zivara! I would like to enquire about the "${ornament.name}". Please provide details on availability, specifications, and delivery.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-[#181512] hover:bg-black text-emerald-400 border border-gold/30 flex items-center justify-center transition-all shadow-sm hover:scale-105"
            title="Enquire on WhatsApp"
            aria-label={`Enquire about ${ornament.name} on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
