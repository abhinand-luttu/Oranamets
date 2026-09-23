import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Sparkles, X, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { fetchCategories, fetchOrnaments } from '../api';
import OrnamentCard from '../components/OrnamentCard';

export default function CollectionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSearch = searchParams.get('search') || '';

  const [categories, setCategories] = useState([]);
  const [ornaments, setOrnaments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [availability, setAvailability] = useState('');
  const [ordering, setOrdering] = useState('featured');

  // Load Categories on mount
  useEffect(() => {
    async function loadCats() {
      const cats = await fetchCategories();
      setCategories(cats || []);
    }
    loadCats();
  }, []);

  // Update selected category if URL search param changes
  useEffect(() => {
    const cat = searchParams.get('category') || '';
    setSelectedCategory(cat);
  }, [searchParams]);

  // Fetch ornaments on filter change
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const params = {};
        if (selectedCategory) params.category = selectedCategory;
        if (searchQuery.trim()) params.search = searchQuery.trim();
        if (availability) params.availability = availability;
        if (ordering === 'price_asc') params.ordering = 'price_asc';
        if (ordering === 'price_desc') params.ordering = 'price_desc';
        if (ordering === 'name_asc') params.ordering = 'name_asc';
        if (ordering === 'latest') params.ordering = 'latest';

        const data = await fetchOrnaments(params);
        if (isMounted) {
          setOrnaments(data || []);
        }
      } catch (err) {
        console.error("Failed to load ornaments:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timeoutId = setTimeout(() => {
      loadData();
    }, 250); // Small debounce for search input

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [selectedCategory, searchQuery, availability, ordering]);

  const handleCategorySelect = (slug) => {
    setSelectedCategory(slug);
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setAvailability('');
    setOrdering('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Breadcrumb */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs tracking-[0.25em] uppercase font-semibold text-gold-dark">
          Heritage Catalogue
        </span>
        <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-brown">
          Royal Ornaments Showcase
        </h1>
        <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
        <p className="text-xs sm:text-sm text-brown/70">
          Browse through our master collection of Gujarati Jadau, Kundan, Polki, and bridal jewellery.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white rounded-2xl border border-gold/30 p-4 sm:p-6 shadow-sm space-y-5">
        {/* Top Row: Search input + Availability + Sorting */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-gold-dark absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ornament name, purity, Kundan, Polki..."
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-cream-200 bg-cream-50/50 text-xs sm:text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brown/40 hover:text-brown"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Availability Filter */}
          <div className="md:col-span-3">
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full py-3 px-4 rounded-xl border border-cream-200 bg-cream-50/50 text-xs sm:text-sm text-brown focus:outline-none focus:border-gold transition-all"
            >
              <option value="">All Availabilities</option>
              <option value="in_stock">In Stock Ready</option>
              <option value="made_to_order">Made to Order</option>
              <option value="out_of_stock">Sold Out</option>
            </select>
          </div>

          {/* Ordering / Sorting */}
          <div className="md:col-span-3">
            <select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              className="w-full py-3 px-4 rounded-xl border border-cream-200 bg-cream-50/50 text-xs sm:text-sm text-brown focus:outline-none focus:border-gold transition-all"
            >
              <option value="featured">Featured First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="latest">Latest Additions</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Category Filter Chips */}
        <div className="pt-3 border-t border-cream-200 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategorySelect('')}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all ${
              selectedCategory === ''
                ? 'bg-maroon text-white shadow-sm'
                : 'bg-cream-100 text-brown hover:bg-cream-200/80 hover:text-maroon'
            }`}
          >
            All Categories ({ornaments.length})
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id || cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-maroon text-white shadow-sm'
                    : 'bg-cream-100 text-brown hover:bg-cream-200/80 hover:text-maroon'
                }`}
              >
                {cat.name}
              </button>
            );
          })}

          {(selectedCategory || searchQuery || availability) && (
            <button
              onClick={handleResetFilters}
              className="ml-auto text-xs text-maroon hover:text-gold-dark font-medium underline flex items-center gap-1 shrink-0 px-2"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Ornaments Grid Display */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="h-96 rounded-2xl bg-cream-200/50 animate-pulse border border-gold/20" />
          ))}
        </div>
      ) : ornaments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ornaments.map((ornament) => (
            <OrnamentCard key={ornament.id} ornament={ornament} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-gold/30 p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-cream-100 border border-gold flex items-center justify-center mx-auto text-gold-dark">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="font-royal text-xl font-bold text-brown">
            No Ornaments Found
          </h3>
          <p className="text-xs text-brown/70 leading-relaxed">
            We could not find any ornaments matching your selected criteria. Try adjusting the search keywords or resetting filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-maroon text-white rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-maroon-dark transition-colors"
          >
            Show All Ornaments
          </button>
        </div>
      )}
    </div>
  );
}
