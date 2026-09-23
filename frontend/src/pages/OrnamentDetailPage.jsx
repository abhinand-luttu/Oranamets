import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  Phone,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Check,
  Share2,
  Gem,
  Award,
  Clock,
  ChevronRight,
  MapPin,
  Truck
} from 'lucide-react';
import { fetchOrnamentDetail, fetchOrnaments } from '../api';
import { useSettings } from '../context/SettingsContext';
import OrnamentCard from '../components/OrnamentCard';

export default function OrnamentDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { settings, getWhatsAppUrl, getCallUrl } = useSettings();

  const [ornament, setOrnament] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [relatedOrnaments, setRelatedOrnaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const data = await fetchOrnamentDetail(slug);
        setOrnament(data);
        setSelectedImageIndex(0);

        // Fetch related ornaments in same category
        if (data && data.category) {
          const categorySlug = data.category.slug || data.category;
          const related = await fetchOrnaments({ category: categorySlug });
          setRelatedOrnaments((related || []).filter((item) => item.slug !== slug).slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to load ornament details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${ornament.name} | Zivara`,
          text: `Check out ${ornament.name} (Gujarat Traditional Ornaments, Supplied from Kerala):`,
          url: window.location.href,
        });
      } catch (e) {
        // Cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="h-6 w-40 bg-cream-200 animate-pulse rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 aspect-square bg-cream-200 animate-pulse rounded-3xl" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-10 w-3/4 bg-cream-200 animate-pulse rounded" />
            <div className="h-6 w-1/2 bg-cream-200 animate-pulse rounded" />
            <div className="h-32 bg-cream-200 animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!ornament) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-royal text-2xl font-bold text-brown">Ornament Not Found</h2>
        <p className="text-xs text-brown/70">The requested ornament may have been archived or removed.</p>
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-maroon text-white rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Collection</span>
        </Link>
      </div>
    );
  }

  const images = ornament.images || [];
  const activeImage = images[selectedImageIndex]?.image_url || '/placeholder-jewel.jpg';
  const isAvailable = ornament.availability === 'in_stock';
  const isMadeToOrder = ornament.availability === 'made_to_order';

  const formatPrice = () => {
    if (ornament.is_price_on_request || !ornament.price) {
      return "Price on Request";
    }
    return `₹${Number(ornament.price).toLocaleString('en-IN')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-brown/60">
        <Link to="/" className="hover:text-gold transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-gold" />
        <Link to="/collection" className="hover:text-gold transition-colors">Collection</Link>
        {ornament.category && (
          <>
            <ChevronRight className="w-3 h-3 text-gold" />
            <Link
              to={`/collection?category=${ornament.category.slug}`}
              className="hover:text-gold transition-colors"
            >
              {ornament.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3 text-gold" />
        <span className="text-brown font-medium truncate max-w-[200px]">{ornament.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image Display */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-cream-100 border-2 border-gold/40 shadow-royal">
            <img
              src={activeImage}
              alt={ornament.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {isAvailable && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800 text-white shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  In Stock Ready
                </span>
              )}
              {isMadeToOrder && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-700 text-cream-50 shadow-md">
                  Made to Order
                </span>
              )}
              {ornament.availability === 'out_of_stock' && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neutral-600 text-white shadow-md">
                  Currently Out of Stock
                </span>
              )}
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-brown border border-gold/30 shadow-md transition-all z-10"
              title="Share this ornament"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Image Thumbnails Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-cream-100 ${
                    selectedImageIndex === idx
                      ? 'border-maroon shadow-md scale-105'
                      : 'border-gold/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.image_url}
                    alt={img.alt_text || `${ornament.name} angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Ornament Details & Purchase Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            {/* Category badge */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold tracking-widest uppercase text-gold-dark">
                {ornament.category?.name || 'Gujarat Traditional Style'}
              </span>
              {ornament.is_featured && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-maroon bg-maroon/5 px-2.5 py-0.5 rounded-full border border-gold/40">
                  <Sparkles className="w-3 h-3 text-gold" />
                  Featured Collection
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-royal text-3xl sm:text-4xl font-bold text-brown leading-tight">
              {ornament.name}
            </h1>
          </div>

          {/* Pricing Box */}
          <div className="bg-cream-100/70 p-5 rounded-2xl border border-gold/30 flex items-center justify-between">
            <div>
              <span className="text-xs text-brown/60 block mb-0.5">Catalogue Price</span>
              <span className={`font-royal font-bold ${
                ornament.is_price_on_request ? 'text-lg text-gold-dark italic' : 'text-3xl text-maroon'
              }`}>
                {formatPrice()}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-brown/60 block">Supply & Dispatch</span>
              <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1 justify-end">
                <Truck className="w-3.5 h-3.5" /> From Kerala, India
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-brown font-royal">
              Craftsmanship & Style Details
            </h3>
            <p className="text-xs sm:text-sm text-brown/80 leading-relaxed whitespace-pre-line">
              {ornament.description}
            </p>
          </div>

          {/* Specifications Table */}
          <div className="border-t border-b border-cream-200 py-4 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-brown/50 block mb-0.5">Style Origin</span>
              <span className="font-semibold text-brown">Gujarat Traditional</span>
            </div>
            <div>
              <span className="text-brown/50 block mb-0.5">Purity & Finish</span>
              <span className="font-semibold text-brown">{ornament.purity || '22K Finish'}</span>
            </div>
            <div>
              <span className="text-brown/50 block mb-0.5">Supplied & Shipped From</span>
              <span className="font-semibold text-brown">Kerala, India</span>
            </div>
            <div>
              <span className="text-brown/50 block mb-0.5">Order Status</span>
              <span className="font-semibold text-brown capitalize">{ornament.availability.replace('_', ' ')}</span>
            </div>
          </div>

          {/* PRIMARY ENQUIRY / PURCHASE ACTIONS */}
          <div className="space-y-3 pt-2">
            {/* 1. WhatsApp Button: EXACT message requested */}
            <a
              href={getWhatsAppUrl(ornament.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 group"
            >
              <MessageCircle className="w-5 h-5 text-emerald-200 group-hover:scale-110 transition-transform" />
              <span>Enquire / Purchase on WhatsApp</span>
            </a>

            {/* 2. Call Now Button */}
            <a
              href={getCallUrl()}
              className="w-full py-3.5 px-6 border-2 border-gold hover:border-maroon bg-white hover:bg-cream-100 text-maroon rounded-2xl text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>Call Business (+91 8848242986)</span>
            </a>

            {/* Purchase Explanation */}
            <div className="bg-cream-100/60 p-3 rounded-xl border border-cream-200 text-center">
              <p className="text-[11px] text-brown/80">
                Clicking <strong>“Enquire / Purchase”</strong> automatically opens WhatsApp with:
              </p>
              <p className="text-[11px] text-maroon font-medium italic mt-1">
                “Hello, I am interested in {ornament.name}. I would like to purchase this ornament. Please provide the price, availability and delivery details.”
              </p>
            </div>
          </div>

          {/* Business & Delivery Note */}
          <div className="bg-white p-4 rounded-xl border border-gold/20 flex items-start gap-3 text-xs text-brown/70">
            <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <span>
              <strong>Zivara (Kerala, India)</strong> supplies Gujarat-inspired ornaments with insured shipping across Kerala and throughout India. We verify availability and delivery timeframes directly via WhatsApp.
            </span>
          </div>
        </div>
      </div>

      {/* Related Ornaments Section */}
      {relatedOrnaments.length > 0 && (
        <div className="pt-12 border-t border-cream-200 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs tracking-[0.2em] uppercase font-semibold text-gold-dark">
                More from {ornament.category?.name}
              </span>
              <h2 className="font-royal text-2xl sm:text-3xl font-bold text-brown">
                Related Gujarat Ornaments
              </h2>
            </div>
            <Link
              to={`/collection?category=${ornament.category?.slug}`}
              className="text-xs font-semibold uppercase tracking-wider text-maroon hover:text-gold-dark transition-colors"
            >
              View Category ↗
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedOrnaments.map((rel) => (
              <OrnamentCard key={rel.id} ornament={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
