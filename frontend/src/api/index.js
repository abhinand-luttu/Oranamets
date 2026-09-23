const DEFAULT_BACKEND_URL = 'https://zivara-backend-4cl3.onrender.com';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || DEFAULT_BACKEND_URL).replace(/\/+$/, '');

/**
 * Resolves any relative or absolute image path to a valid production backend URL.
 * Ensures images uploaded via Django Admin are always fetched from the Django backend
 * or persistent cloud storage (Cloudinary / S3).
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

/**
 * LIVE API ONLY: Categories are fetched exclusively from the Django database.
 * No hardcoded fallback categories exist.
 */
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
    console.error('Error loading live categories from database:', err);
    return [];
  }
}

/**
 * LIVE API ONLY: Ornaments are fetched exclusively from the Django database.
 * No hardcoded fallback ornaments exist.
 */
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
    console.error('Error loading live ornaments from database:', err);
    return [];
  }
}

/**
 * LIVE API ONLY: Fetches single ornament detail strictly from Django backend database.
 */
export async function fetchOrnamentDetail(slug) {
  const res = await fetch(`${API_BASE_URL}/api/ornaments/${slug}/`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`Ornament detail API returned status ${res.status}`);
  }
  const data = await res.json();
  return normalizeOrnament(data);
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
      tagline: "Authentic Gujarat Traditional Ornaments • Shipped Directly from Gujarat",
      whatsapp_number: "+918848242986",
      phone_number: "+918848242986",
      email: "contact@zivaraornaments.com",
      address: "Direct Dispatch from Gujarat",
      city: "All India Delivery",
      business_hours: "Monday – Saturday: 9:30 AM – 7:30 PM | Available on WhatsApp & Call",
      about_summary: "Zivara showcases authentic Gujarat traditional ornaments. Customers place orders on the website, orders are processed by our team, and products are shipped directly from Gujarat to your address.",
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
    console.warn("Backend inquiry submission error:", err);
  }
  return { status: "received", message: "Inquiry received" };
}

export { API_BASE_URL };
