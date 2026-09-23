import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getAbsoluteImageUrl } from '../api';

export default function CategoryCard({ category }) {
  const categoryImage = category.image_url ? getAbsoluteImageUrl(category.image_url) : null;

  return (
    <Link
      to={`/collection?category=${category.slug}`}
      className="group relative bg-white rounded-2xl p-6 border border-gold/30 hover:border-gold shadow-sm hover:shadow-royal transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-cream-100 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-125" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-maroon/10 border border-gold/40 flex items-center justify-center text-maroon mb-4 group-hover:bg-maroon group-hover:text-gold transition-colors duration-300 overflow-hidden">
          {categoryImage ? (
            <img
              src={categoryImage}
              alt={category.name}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <Sparkles className="w-6 h-6" />
          )}
        </div>

        <h3 className="font-royal text-xl font-bold text-brown group-hover:text-maroon transition-colors mb-1.5">
          {category.name}
        </h3>

        <p className="text-xs text-brown/70 leading-relaxed line-clamp-2 mb-4">
          {category.description || 'Authentic handcrafted heritage jewellery from Gujarat & Rajasthan.'}
        </p>
      </div>

      <div className="relative z-10 pt-4 border-t border-cream-200 flex items-center justify-between text-xs">
        <span className="text-gold-dark font-medium">
          {category.ornaments_count ? `${category.ornaments_count} Designs` : 'View Collection'}
        </span>
        <span className="text-maroon font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          Explore <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
