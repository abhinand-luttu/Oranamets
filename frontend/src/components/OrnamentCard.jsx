import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, ArrowUpRight, Sparkles } from 'lucide-react';
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
    <div className="group bg-white rounded-2xl border border-gold/30 hover:border-gold shadow-sm hover:shadow-royal transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Container with Luxury Badges */}
      <Link
        to={`/ornaments/${ornament.slug}`}
        className="relative aspect-square w-full overflow-hidden bg-cream-100 block"
      >
        <img
          src={imageSrc}
          alt={ornament.name}
          loading="lazy"
          onError={() => setImageSrc('/placeholder-jewel.svg')}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brown/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Availability Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isAvailable && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-emerald-800 text-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              In Stock
            </span>
          )}
          {isMadeToOrder && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-amber-700 text-cream-50 shadow-sm">
              Made to Order
            </span>
          )}
          {ornament.availability === 'out_of_stock' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-neutral-600 text-white shadow-sm">
              Sold Out
            </span>
          )}

          {ornament.is_featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-maroon text-gold-light border border-gold/40 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-gold" />
              Featured Style
            </span>
          )}
        </div>

        {/* View Details Quick Hover Pill */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
          <span className="px-3 py-1.5 bg-white/95 text-brown text-xs font-semibold rounded-full shadow flex items-center gap-1 border border-gold/30">
            View Details <ArrowUpRight className="w-3.5 h-3.5 text-maroon" />
          </span>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Style Origin */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-gold-dark">
              {ornament.category_name || 'Gujarat Style'}
            </span>
            {ornament.purity && (
              <span className="text-[11px] text-brown/60 truncate max-w-[140px]" title={ornament.purity}>
                {ornament.purity}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-royal text-lg font-bold text-brown group-hover:text-maroon transition-colors line-clamp-1 mb-2">
            <Link to={`/ornaments/${ornament.slug}`}>
              {ornament.name}
            </Link>
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-brown/70 line-clamp-2 leading-relaxed mb-4">
            {ornament.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-3 border-t border-cream-200">
          <div className="flex items-baseline justify-between mb-3.5">
            <span className="text-xs text-brown/60 font-medium">Estimated Price</span>
            <span className={`font-royal font-bold ${
              ornament.is_price_on_request ? 'text-sm text-gold-dark italic' : 'text-lg text-maroon'
            }`}>
              {formatPrice()}
            </span>
          </div>

          {/* Action Buttons: WhatsApp Enquire / Purchase & Details */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={getWhatsAppUrl(ornament.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              title="Enquire / Purchase on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
              <span>Enquire</span>
            </a>

            <Link
              to={`/ornaments/${ornament.slug}`}
              className="py-2.5 px-3 border border-gold hover:border-maroon bg-cream-50 hover:bg-cream-100 text-maroon rounded-xl text-xs font-semibold tracking-wider text-center flex items-center justify-center gap-1 transition-colors"
            >
              <span>View Specs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
