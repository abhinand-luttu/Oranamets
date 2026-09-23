const DEFAULT_BACKEND_URL = 'https://zivara-backend-4cl3.onrender.com';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_BACKEND_URL).replace(/\/+$/, '');

/**
 * Resolves any relative or absolute image path to a valid production backend URL.
 * Ensures images uploaded via Django Admin are always fetched from the Django backend.
 */
export function getAbsoluteImageUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    // Force HTTPS for Render domain to avoid mixed-content blocks
    if (url.startsWith('http://zivara-backend-4cl3.onrender.com')) {
      return url.replace('http://', 'https://');
    }
    return url;
  }
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${API_BASE_URL}${cleanPath}`;
}

export function normalizeCategory(cat) {
  if (!cat) return cat;
  const rawImage = cat.image_url || cat.image;
  return {
    ...cat,
    image_url: rawImage ? getAbsoluteImageUrl(rawImage) : null,
  };
}

export function normalizeOrnament(item) {
  if (!item) return item;

  const rawImages = item.images || [];
  const normalizedImages = rawImages.map(img => {
    const rawUrl = typeof img === 'string' ? img : (img.image_url || img.image || '');
    return {
      ...(typeof img === 'object' ? img : {}),
      image_url: rawUrl ? getAbsoluteImageUrl(rawUrl) : '',
      alt_text: (typeof img === 'object' && img.alt_text) ? img.alt_text : `${item.name} Image`
    };
  });

  const rawPrimary = item.primary_image_url || (normalizedImages[0]?.image_url) || null;
  const rawAllUrls = item.all_image_urls || [];

  return {
    ...item,
    primary_image_url: rawPrimary ? getAbsoluteImageUrl(rawPrimary) : (normalizedImages[0]?.image_url || null),
    all_image_urls: rawAllUrls.length > 0
      ? rawAllUrls.map(u => getAbsoluteImageUrl(u))
      : normalizedImages.map(img => img.image_url).filter(Boolean),
    images: normalizedImages,
    category: typeof item.category === 'object' ? normalizeCategory(item.category) : item.category,
  };
}

const FALLBACK_CATEGORIES = [
  { id: 1, name: "Necklace", slug: "necklace", description: "Royal Haar, Chokers & Kundan Neckpieces", ornaments_count: 2 },
  { id: 2, name: "Earrings", slug: "earrings", description: "Kathiyawadi Jhumkas & Kan-Chain Drops", ornaments_count: 2 },
  { id: 3, name: "Bangles", slug: "bangles", description: "Traditional Patla, Kangan & Gokhru Bangles", ornaments_count: 2 },
  { id: 4, name: "Rings", slug: "rings", description: "Statement Cocktail & Navratna Rings", ornaments_count: 1 },
  { id: 5, name: "Bridal Jewellery", slug: "bridal-jewellery", description: "Complete Gujarati & Rajasthani Ensembles", ornaments_count: 3 },
  { id: 6, name: "Traditional Jewellery", slug: "traditional-jewellery", description: "Centuries-old Heritage Designs & Antique Heirlooms", ornaments_count: 2 },
  { id: 7, name: "Gujarat Special", slug: "gujarat-special", description: "Authentic Pachchikam, Kathiyawadi & Court Art", ornaments_count: 2 },
  { id: 8, name: "Other", slug: "other", description: "Maang Tikka, Nath, Bajuband & Hathphool", ornaments_count: 1 },
];

const FALLBACK_ORNAMENTS = [
  {
    id: 1,
    name: "Rajwadi Jadau Kundan Haar",
    slug: "rajwadi-jadau-kundan-haar",
    category: { id: 1, name: "Necklace", slug: "necklace" },
    category_name: "Necklace",
    category_slug: "necklace",
    description: "Handcrafted royal necklace inspired by the royal court of Vadodara. Features exquisite uncut polki diamonds set in 22K gold foil with natural Basra pearl drops and deep maroon Meenakari backing.",
    price: "385000.00",
    is_price_on_request: false,
    availability: "in_stock",
    is_featured: true,
    purity: "22K Gold with Uncut Polki & Basra Pearls",
    weight_approx: "92g approx.",
    primary_image_url: "/media/ornaments/rajwadi-jadau-kundan-haar-angle-1.jpg",
    images: [
      { id: 1, image_url: "/media/ornaments/rajwadi-jadau-kundan-haar-angle-1.jpg", alt_text: "Front Showcase" },
      { id: 2, image_url: "/media/ornaments/rajwadi-jadau-kundan-haar-angle-2.jpg", alt_text: "Kundan Setting" },
      { id: 3, image_url: "/media/ornaments/rajwadi-jadau-kundan-haar-angle-3.jpg", alt_text: "Meenakari Detail" },
    ],
  },
  {
    id: 2,
    name: "Kathiyawadi Jhumka with Kan Chain",
    slug: "kathiyawadi-jhumka-with-kan-chain",
    category: { id: 2, name: "Earrings", slug: "earrings" },
    category_name: "Earrings",
    category_slug: "earrings",
    description: "Traditional Gujarati Kathiyawadi bell-shaped jhumkas accompanied by delicate hair-support kan chains. Features intricate filigree wirework, natural ruby drops, and fine pearl fringe.",
    price: "125000.00",
    is_price_on_request: false,
    availability: "in_stock",
    is_featured: true,
    purity: "22K Antique Yellow Gold",
    weight_approx: "34g approx.",
    primary_image_url: "/media/ornaments/kathiyawadi-jhumka-with-kan-chain-angle-1.jpg",
    images: [
      { id: 4, image_url: "/media/ornaments/kathiyawadi-jhumka-with-kan-chain-angle-1.jpg", alt_text: "Pair Showcase" },
      { id: 5, image_url: "/media/ornaments/kathiyawadi-jhumka-with-kan-chain-angle-2.jpg", alt_text: "Bell Detail" },
    ],
  },
  {
    id: 3,
    name: "Royal Pachchikam Navratna Choker",
    slug: "royal-pachchikam-navratna-choker",
    category: { id: 7, name: "Gujarat Special", slug: "gujarat-special" },
    category_name: "Gujarat Special",
    category_slug: "gujarat-special",
    description: "Ancient Kutch Pachchikam craftsmanship embedding nine sacred astrological gemstones (Navratna) in delicate claw settings over a silver-gold matrix. Sourced from Bhuj artisans.",
    price: "275000.00",
    is_price_on_request: false,
    availability: "in_stock",
    is_featured: true,
    purity: "22K Gold & Silver Alloy (Pachchikam Art)",
    weight_approx: "68g approx.",
    primary_image_url: "/media/ornaments/royal-pachchikam-navratna-choker-angle-1.jpg",
    images: [
      { id: 6, image_url: "/media/ornaments/royal-pachchikam-navratna-choker-angle-1.jpg", alt_text: "Choker View" },
      { id: 7, image_url: "/media/ornaments/royal-pachchikam-navratna-choker-angle-2.jpg", alt_text: "Navratna Detail" },
    ],
  },
  {
    id: 4,
    name: "Traditional Patla & Kangan Set",
    slug: "traditional-patla-kangan-set",
    category: { id: 3, name: "Bangles", slug: "bangles" },
    category_name: "Bangles",
    category_slug: "bangles",
    description: "Classic Gujarati broad bridal Patla bangles adorned with embossed elephant and floral motifs, highlighted with fine Jaipur maroon and emerald green Meenakari enamel.",
    price: "210000.00",
    is_price_on_request: false,
    availability: "in_stock",
    is_featured: true,
    purity: "22K Gold with Red & Green Enamel",
    weight_approx: "58g pair",
    primary_image_url: "/media/ornaments/traditional-patla-kangan-set-angle-1.jpg",
    images: [
      { id: 8, image_url: "/media/ornaments/traditional-patla-kangan-set-angle-1.jpg", alt_text: "Pair View" },
      { id: 9, image_url: "/media/ornaments/traditional-patla-kangan-set-angle-2.jpg", alt_text: "Embossing" },
    ],
  },
  {
    id: 5,
    name: "Meenakari Mayur Peacock Ring",
    slug: "meenakari-mayur-peacock-ring",
    category: { id: 4, name: "Rings", slug: "rings" },
    category_name: "Rings",
    category_slug: "rings",
    description: "Grand royal statement ring sculpted in the silhouette of a dancing peacock with vibrant turquoise and ruby glass enamel, surrounded by micro-seed pearls.",
    price: "68000.00",
    is_price_on_request: false,
    availability: "in_stock",
    is_featured: false,
    purity: "22K Yellow Gold with Hand Enamel",
    weight_approx: "16g",
    primary_image_url: "/media/ornaments/meenakari-mayur-peacock-ring-angle-1.jpg",
    images: [
      { id: 10, image_url: "/media/ornaments/meenakari-mayur-peacock-ring-angle-1.jpg", alt_text: "Cocktail View" },
    ],
  },
  {
    id: 6,
    name: "Gujarati Damini & Mathapatti",
    slug: "gujarati-damini-mathapatti",
    category: { id: 5, name: "Bridal Jewellery", slug: "bridal-jewellery" },
    category_name: "Bridal Jewellery",
    category_slug: "bridal-jewellery",
    description: "Opulent forehead ornament featuring multi-strand pearl and gold chains with an ornate floral centerpiece borla, traditionally worn by Gujarati brides on wedding celebrations.",
    price: "195000.00",
    is_price_on_request: false,
    availability: "in_stock",
    is_featured: true,
    purity: "22K Gold & Uncut Kundan",
    weight_approx: "48g",
    primary_image_url: "/media/ornaments/gujarati-damini-mathapatti-angle-1.jpg",
    images: [
      { id: 11, image_url: "/media/ornaments/gujarati-damini-mathapatti-angle-1.jpg", alt_text: "Bridal Spread" },
      { id: 12, image_url: "/media/ornaments/gujarati-damini-mathapatti-angle-2.jpg", alt_text: "Borla Close-up" },
    ],
  },
  {
    id: 7,
    name: "Heritage Hasli Choker",
    slug: "heritage-hasli-choker",
    category: { id: 6, name: "Traditional Jewellery", slug: "traditional-jewellery" },
    category_name: "Traditional Jewellery",
    category_slug: "traditional-jewellery",
    description: "Rigid collar neckpiece traditionally favored by Saurashtra noble households. Constructed with hand-beaten solid gold torque, spiral terminal knobs, and cabochon rubies.",
    price: "290000.00",
    is_price_on_request: false,
    availability: "in_stock",
    is_featured: false,
    purity: "22K Solid Gold with Antique Patina",
    weight_approx: "74g",
    primary_image_url: "/media/ornaments/heritage-hasli-choker-angle-1.jpg",
    images: [
      { id: 13, image_url: "/media/ornaments/heritage-hasli-choker-angle-1.jpg", alt_text: "Collar Overview" },
    ],
  },
  {
    id: 8,
    name: "Rajputana Borla Maang Tikka",
    slug: "rajputana-borla-maang-tikka",
    category: { id: 5, name: "Bridal Jewellery", slug: "bridal-jewellery" },
    category_name: "Bridal Jewellery",
    category_slug: "bridal-jewellery",
    description: "Spherical bell-shaped Borla with radiant round polki centerpiece and ruby rim, adorned with delicate seed pearl stringing. Perfect accompaniment to royal bridal lehengas.",
    price: "52000.00",
    is_price_on_request: false,
    availability: "in_stock",
    is_featured: false,
    purity: "22K Gold with Kundan Polki",
    weight_approx: "14g",
    primary_image_url: "/media/ornaments/rajputana-borla-maang-tikka-angle-1.jpg",
    images: [
      { id: 14, image_url: "/media/ornaments/rajputana-borla-maang-tikka-angle-1.jpg", alt_text: "Borla Front" },
    ],
  },
  {
    id: 9,
    name: "Handcrafted Meenakari Bajuband (Armlet)",
    slug: "handcrafted-meenakari-bajuband-armlet",
    category: { id: 7, name: "Gujarat Special", slug: "gujarat-special" },
    category_name: "Gujarat Special",
    category_slug: "gujarat-special",
    description: "Traditional Gujarati upper arm ornament featuring reversible royal miniature paintings in glass enamel on the reverse and dazzling uncut Kundan on the obverse.",
    price: "145000.00",
    is_price_on_request: false,
    availability: "in_stock",
    is_featured: true,
    purity: "22K Gold with Crimson Zari Silk Cord",
    weight_approx: "38g",
    primary_image_url: "/media/ornaments/handcrafted-meenakari-bajuband-armlet-angle-1.jpg",
    images: [
      { id: 15, image_url: "/media/ornaments/handcrafted-meenakari-bajuband-armlet-angle-1.jpg", alt_text: "Front Kundan" },
    ],
  },
  {
    id: 10,
    name: "Chandbali Pearl Drop Earrings",
    slug: "chandbali-pearl-drop-earrings",
    category: { id: 2, name: "Earrings", slug: "earrings" },
    category_name: "Earrings",
    category_slug: "earrings",
    description: "Crescent moon shaped royal earrings with concentric gold filigree rings, micro-pearl tassels, and natural emerald drop highlights.",
    price: "98000.00",
    is_price_on_request: false,
    availability: "in_stock",
    is_featured: false,
    purity: "22K Yellow Gold & Freshwater Pearls",
    weight_approx: "26g",
    primary_image_url: "/media/ornaments/chandbali-pearl-drop-earrings-angle-1.jpg",
    images: [
      { id: 16, image_url: "/media/ornaments/chandbali-pearl-drop-earrings-angle-1.jpg", alt_text: "Pair View" },
    ],
  },
  {
    id: 11,
    name: "Imperial Bridal Hathphool (Hand Harness)",
    slug: "imperial-bridal-hathphool-hand-harness",
    category: { id: 5, name: "Bridal Jewellery", slug: "bridal-jewellery" },
    category_name: "Bridal Jewellery",
    category_slug: "bridal-jewellery",
    description: "Exquisite bridal hand ornament connecting five ornate floral rings to a royal kundan wristlet through cascading pearl strands. Crafted exclusively for regal wedding moments.",
    price: null,
    is_price_on_request: true,
    availability: "made_to_order",
    is_featured: true,
    purity: "22K Hallmarked Gold & Natural Pearls",
    weight_approx: "52g",
    primary_image_url: "/media/ornaments/imperial-bridal-hathphool-hand-harness-angle-1.jpg",
    images: [
      { id: 17, image_url: "/media/ornaments/imperial-bridal-hathphool-hand-harness-angle-1.jpg", alt_text: "Full Hand Spread" },
    ],
  },
  {
    id: 12,
    name: "Vintage Gokhru Spike Bangles",
    slug: "vintage-gokhru-spike-bangles",
    category: { id: 6, name: "Traditional Jewellery", slug: "traditional-jewellery" },
    category_name: "Traditional Jewellery",
    category_slug: "traditional-jewellery",
    description: "Pair of iconic Gujarati Gokhru bangles with distinctive triangular faceted studs and embossed rim, symbolizing prosperity and royal lineage.",
    price: "185000.00",
    is_price_on_request: false,
    availability: "in_stock",
    is_featured: false,
    purity: "22K Gold Antique Finish",
    weight_approx: "50g pair",
    primary_image_url: "/media/ornaments/vintage-gokhru-spike-bangles-angle-1.jpg",
    images: [
      { id: 18, image_url: "/media/ornaments/vintage-gokhru-spike-bangles-angle-1.jpg", alt_text: "Bangle Pair" },
    ],
  },
];

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/categories/`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!res.ok) throw new Error(`Categories API returned status ${res.status}`);
    const data = await res.json();
    const list = data.results || (Array.isArray(data) ? data : []);
    return list.map(normalizeCategory);
  } catch (err) {
    console.warn('Backend categories unavailable, falling back:', err);
    return FALLBACK_CATEGORIES.map(normalizeCategory);
  }
}

export async function fetchOrnaments(params = {}) {
  try {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.search) query.append('search', params.search);
    if (params.availability) query.append('availability', params.availability);
    if (params.featured) query.append('featured', 'true');
    if (params.ordering) query.append('ordering', params.ordering);

    const qs = query.toString();
    const endpoint = `${API_BASE_URL}/api/ornaments/${qs ? `?${qs}` : ''}`;
    const res = await fetch(endpoint, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!res.ok) throw new Error(`Ornaments API returned status ${res.status}`);
    const data = await res.json();
    const list = data.results || (Array.isArray(data) ? data : []);
    return list.map(normalizeOrnament);
  } catch (err) {
    console.warn('Backend ornaments unavailable, falling back:', err);
    let filtered = FALLBACK_ORNAMENTS.map(normalizeOrnament);
    if (params.category) {
      filtered = filtered.filter(item => item.category_slug === params.category || item.category?.slug === params.category);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.purity && item.purity.toLowerCase().includes(q))
      );
    }
    if (params.availability) {
      filtered = filtered.filter(item => item.availability === params.availability);
    }
    if (params.featured) {
      filtered = filtered.filter(item => item.is_featured);
    }
    return filtered;
  }
}

export async function fetchOrnamentDetail(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/ornaments/${slug}/`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!res.ok) throw new Error(`Ornament detail API returned status ${res.status}`);
    const data = await res.json();
    return normalizeOrnament(data);
  } catch (err) {
    console.warn('Backend detail unavailable, finding in fallback data:', err);
    const item = FALLBACK_ORNAMENTS.find(o => o.slug === slug || String(o.id) === String(slug));
    if (item) return normalizeOrnament(item);
    throw err;
  }
}

export async function fetchBusinessSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/business-settings/`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!res.ok) throw new Error(`Business settings API returned status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Using default business settings:', err);
    return {
      store_name: "Zivara",
      tagline: "Gujarat Traditional Ornaments, Supplied from Kerala",
      whatsapp_number: "+918848242986",
      phone_number: "+918848242986",
      email: "contact@zivaraornaments.com",
      address: "Kerala, India",
      city: "Kerala, India",
      business_hours: "Monday - Saturday: 9:30 AM - 7:30 PM | Available on WhatsApp & Call",
      about_summary: "Zivara showcases traditional Gujarat-inspired and Gujarati royal ornaments, carefully sourced and supplied from Kerala, India.",
    };
  }
}

export async function submitContactInquiry(payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/inquiries/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend offline, acknowledging inquiry locally:", err);
  }
  return { status: "received", message: "Inquiry received" };
}

export { API_BASE_URL };
