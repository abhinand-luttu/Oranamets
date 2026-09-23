const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (typeof window !== 'undefined' ? '' : 'http://127.0.0.1:8001');

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/categories/`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.warn('Using fallback categories:', err);
    return [
      { id: 1, name: "Necklace", slug: "necklace", description: "Royal Haar & Chokers", ornaments_count: 3 },
      { id: 2, name: "Earrings", slug: "earrings", description: "Kathiyawadi Jhumkas", ornaments_count: 2 },
      { id: 3, name: "Bangles", slug: "bangles", description: "Traditional Patla & Kangan", ornaments_count: 2 },
      { id: 4, name: "Rings", slug: "rings", description: "Statement Cocktail Rings", ornaments_count: 1 },
      { id: 5, name: "Bridal Jewellery", slug: "bridal-jewellery", description: "Complete Bridal Ensembles", ornaments_count: 3 },
      { id: 6, name: "Traditional Jewellery", slug: "traditional-jewellery", description: "Centuries-old Heritage", ornaments_count: 2 },
      { id: 7, name: "Gujarat Special", slug: "gujarat-special", description: "Pachchikam & Kathiyawadi", ornaments_count: 2 },
      { id: 8, name: "Other", slug: "other", description: "Maang Tikka, Bajuband", ornaments_count: 1 },
    ];
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

    const res = await fetch(`${API_BASE_URL}/api/ornaments/?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch ornaments');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    console.error('API Error fetching ornaments:', err);
    throw err;
  }
}

export async function fetchOrnamentDetail(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/ornaments/${slug}/`);
    if (!res.ok) throw new Error('Failed to fetch ornament details');
    return await res.json();
  } catch (err) {
    console.error('API Error fetching ornament detail:', err);
    throw err;
  }
}

export async function fetchBusinessSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/business-settings/`);
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (err) {
    console.warn('Using default business settings:', err);
    return {
      store_name: "Rajwadi Ornaments",
      tagline: "Royal Heritage Jewellery of Gujarat",
      whatsapp_number: "+919876543210",
      phone_number: "+919876543210",
      email: "contact@rajwadiornaments.com",
      address: "Showroom No. 14, Heritage Jewellery Arcade, C.G. Road, Navrangpura, Ahmedabad, Gujarat 380009",
      city: "Ahmedabad, Gujarat",
      business_hours: "Monday - Saturday: 10:30 AM - 8:30 PM | Sunday: By Royal Appointment",
      about_summary: "Rajwadi Ornaments celebrates the centuries-old royal craftsmanship of Gujarat and Rajasthan.",
    };
  }
}

export async function submitContactInquiry(payload) {
  const res = await fetch(`${API_BASE_URL}/api/inquiries/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error('Failed to submit inquiry');
  }
  return await res.json();
}

export { API_BASE_URL };
