import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchBusinessSettings } from '../api';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    store_name: "Zivara",
    tagline: "Gujarat Traditional Ornaments, Supplied from Kerala",
    whatsapp_number: "+918848242986",
    phone_number: "+918848242986",
    email: "contact@zivaraornaments.com",
    address: "Kerala, India",
    city: "Kerala, India",
    business_hours: "Monday – Saturday: 9:30 AM – 7:30 PM | Available on WhatsApp & Call",
    about_summary: "Authentic Gujarat-inspired ornaments, carefully sourced and supplied from Kerala. Available for purchase across Kerala and nationwide.",
    instagram_url: "https://instagram.com",
    facebook_url: "https://facebook.com",
  });
  const [loading, setLoading] = useState(true);

  const loadSettings = async () => {
    try {
      const data = await fetchBusinessSettings();
      if (data) {
        setSettings(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.warn("Could not load backend settings, using defaults.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  // Clean phone number for WhatsApp wa.me links (strip non-digits)
  const getCleanPhone = (phoneStr) => {
    if (!phoneStr) return "918848242986";
    const cleaned = phoneStr.replace(/\D/g, '');
    return cleaned || "918848242986";
  };

  /**
   * Builds the WhatsApp purchase / enquiry URL
   * Exact requirement:
   * "Hello, I am interested in [ORNAMENT NAME]. I would like to purchase this ornament. Please provide the price, availability and delivery details."
   */
  const getWhatsAppUrl = (ornamentName = null) => {
    const cleanNum = getCleanPhone(settings.whatsapp_number);
    let message = "Hello, I am interested in exploring ornaments from Zivara. Please provide details on how to purchase and delivery options.";
    if (ornamentName) {
      message = `Hello, I am interested in ${ornamentName}. I would like to purchase this ornament. Please provide the price, availability and delivery details.`;
    }
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`;
  };

  /**
   * Direct phone call link
   */
  const getCallUrl = () => {
    const cleanNum = getCleanPhone(settings.phone_number);
    return `tel:+${cleanNum}`;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        loading,
        getWhatsAppUrl,
        getCallUrl,
        refreshSettings: loadSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
