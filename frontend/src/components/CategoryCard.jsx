import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getAbsoluteImageUrl } from '../api';

export default function CategoryCard({ category }) {
  const categoryImage = category.image_url ? getAbsoluteImageUrl(category.image_url) : null;

  return (
    <Link
      to={`/collection?category=${category.slug}`}
      className="group relative bg-[#FAF8F5] rounded-2xl p-5 border border-gold/20 hover:border-gold/50 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col justify-between overflow-hidden"
    >
      <div className="relative z-10 space-y-4">
        {/* Category Thumbnail or Icon */}
        <div className="w-14 h-14 rounded-2xl bg-white border border-gold/30 shadow-sm flex items-center justify-center overflow-hidden p-1 group-hover:scale-105 transition-transform duration-500">
          {categoryImage ? (
            <img
              src={categoryImage}
              alt={category.name}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-gold" />
            </div>
          )}
        </div>

        <div>
          <h3 className="font-serif text-lg font-medium text-[#181512] group-hover:text-gold-dark transition-colors mb-1">
            {category.name}
          </h3>
          <p className="text-[11px] text-[#6E6760] font-light line-clamp-2 leading-relaxed">
            {category.description || 'Iconic handcrafted designs for everyday refinement and grand occasions.'}
          </p>
        </div>
      </div>

      <div className="relative z-10 pt-4 mt-3 border-t border-cream-200/60 flex items-center justify-between text-[11px]">
        <span className="text-[#8C7A6B] tracking-wider uppercase font-medium">
          {category.ornaments_count ? `${category.ornaments_count} Creations` : 'Curated Edit'}
        </span>
        <span className="text-[#181512] group-hover:text-gold-dark font-medium flex items-center gap-1 transition-colors">
          <span>Discover</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
