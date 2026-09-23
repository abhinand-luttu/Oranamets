import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, Sparkles, CheckCircle2, AlertCircle, Truck, Package } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { submitContactInquiry } from '../api';

export default function ContactPage() {
  const { settings, getWhatsAppUrl, getCallUrl } = useSettings();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category_interest: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide your name and phone number.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await submitContactInquiry(formData);
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        category_interest: '',
        message: '',
      });
    } catch (err) {
      console.error('Submission error:', err);
      setError('Could not submit enquiry form. Please message us directly on WhatsApp at +91 8848242986.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs tracking-[0.25em] uppercase font-semibold text-gold-dark">
          Get in Touch
        </span>
        <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-bold text-brown">
          Contact Zivara
        </h1>
        <div className="w-16 h-1 bg-gold mx-auto rounded-full" />
        <p className="text-xs sm:text-sm text-brown/70 leading-relaxed">
          Authentic Gujarat traditional ornaments. Customers place an order on our website or WhatsApp, our company processes the request, and the ornament is shipped directly from Gujarat to your provided address.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact & Location Information */}
        <div className="lg:col-span-5 space-y-6">
          {/* Order & Delivery Workflow Card */}
          <div className="bg-cream-100/90 rounded-3xl p-6 sm:p-8 border-2 border-gold/40 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-maroon/10 border border-gold flex items-center justify-center text-maroon">
                <Truck className="w-6 h-6 text-gold-dark" />
              </div>
              <div>
                <h3 className="font-royal text-xl font-bold text-brown">
                  Order & Delivery Flow
                </h3>
                <p className="text-xs text-gold-dark font-semibold">Shipped from Gujarat • All India Delivery</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-brown/80 pt-2 border-t border-cream-200">
              <p className="leading-relaxed">
                <strong>1. Select Ornament:</strong> Choose your Gujarat traditional ornament from our live catalogue.
              </p>
              <p className="leading-relaxed text-brown/70">
                <strong>2. Place Order:</strong> Enquire via WhatsApp or submit the enquiry form below.
              </p>
              <p className="leading-relaxed text-brown/70">
                <strong>3. Order Processed:</strong> Zivara verifies availability, confirms pricing and payment details.
              </p>
              <p className="leading-relaxed text-brown/70">
                <strong>4. Direct Delivery:</strong> Your ornament is shipped directly from Gujarat to your provided address.
              </p>
            </div>
          </div>

          {/* WhatsApp Direct Card */}
          <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-700 shadow-royal space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-800 flex items-center justify-center text-emerald-200">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-royal text-xl font-bold text-white">
                  WhatsApp Contact
                </h3>
                <p className="text-xs text-emerald-200 font-semibold">+91 8848242986</p>
              </div>
            </div>

            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Message us directly to check ornament availability, receive product videos, confirm pricing, and finalize your delivery address.
            </p>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 bg-emerald-500 hover:bg-emerald-400 text-brown font-bold text-xs tracking-widest uppercase rounded-full flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 8848242986)</span>
            </a>
          </div>

          {/* Voice Call Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gold/30 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-maroon/10 border border-gold/40 flex items-center justify-center text-maroon">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-royal text-xl font-bold text-brown">
                  Direct Phone Call
                </h3>
                <p className="text-xs text-gold-dark font-semibold">+91 8848242986</p>
              </div>
            </div>

            <p className="text-xs text-brown/70 leading-relaxed">
              Available Monday to Saturday: 9:30 AM – 7:30 PM for customer inquiries and order assistance.
            </p>

            <a
              href={getCallUrl()}
              className="w-full py-3.5 px-6 border-2 border-gold hover:border-maroon bg-cream-50 text-maroon font-bold text-xs tracking-widest uppercase rounded-full flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>Call +91 8848242986</span>
            </a>
          </div>
        </div>

        {/* Right Column: Simple Customer Enquiry Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gold/30 shadow-royal space-y-6">
            <div className="space-y-2">
              <span className="text-xs tracking-[0.2em] uppercase font-semibold text-gold-dark">
                Direct Purchase Enquiry
              </span>
              <h2 className="font-royal text-2xl sm:text-3xl font-bold text-brown">
                Enquire About an Ornament
              </h2>
              <p className="text-xs text-brown/70 leading-relaxed">
                Interested in any ornament from our catalogue? Fill in your details below and our team will reach out with pricing, availability, and delivery options.
              </p>
            </div>

            {success ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                <h3 className="font-royal text-xl font-bold text-emerald-900">
                  Enquiry Received
                </h3>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you! We have received your inquiry. Our team will contact you shortly via WhatsApp or phone (+91 8848242986).
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2 bg-emerald-700 text-white rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-emerald-800 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brown uppercase tracking-wider">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Anjali Nair"
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50/50 text-xs sm:text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brown uppercase tracking-wider">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50/50 text-xs sm:text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brown uppercase tracking-wider">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="youremail@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50/50 text-xs sm:text-sm focus:outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  {/* Category Interest */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-brown uppercase tracking-wider">
                      Ornament Style / Category
                    </label>
                    <select
                      name="category_interest"
                      value={formData.category_interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50/50 text-xs sm:text-sm text-brown focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="">Select an ornament category</option>
                      <option value="Necklace">Necklaces & Chokers</option>
                      <option value="Earrings">Kathiyawadi Jhumkas & Drops</option>
                      <option value="Bangles">Traditional Bangles & Patla</option>
                      <option value="Rings">Statement Rings</option>
                      <option value="Bridal Jewellery">Bridal Jewellery Sets</option>
                      <option value="Traditional Jewellery">Traditional & Antique Styles</option>
                      <option value="Gujarat Special">Gujarat Special Pachchikam</option>
                      <option value="Other">Other Specific Ornament</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-brown uppercase tracking-wider">
                    Ornament Details / Purchase Query
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mention the ornament name, quantity, delivery address, or any questions..."
                    className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50/50 text-xs sm:text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-maroon hover:bg-maroon-dark text-white rounded-xl text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-gold" />
                  <span>{submitting ? 'Submitting Enquiry...' : 'Submit Purchase Enquiry'}</span>
                </button>

                <p className="text-[11px] text-brown/60 text-center pt-1">
                  We reply directly via WhatsApp or phone. No marketing spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
