import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Sparkles, Upload, CheckCircle2, AlertCircle, ArrowRight, Eye, LogOut, Package, Image as ImageIcon } from 'lucide-react';
import { fetchCategories, apiLogin, verifyAuthToken, createOrnament } from '../api';
import OrnamentCard from '../components/OrnamentCard';

export default function AddOrnamentsPage() {
  const navigate = useNavigate();

  // Auth State
  const [token, setToken] = useState(() => sessionStorage.getItem('zivara_auth_token') || '');
  const [currentUser, setCurrentUser] = useState(() => sessionStorage.getItem('zivara_auth_user') || '');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Categories
  const [categories, setCategories] = useState([]);

  // Form State
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [isPriceOnRequest, setIsPriceOnRequest] = useState(false);
  const [availability, setAvailability] = useState('in_stock');
  const [isFeatured, setIsFeatured] = useState(false);
  const [purity, setPurity] = useState('22K Gold');
  const [weightApprox, setWeightApprox] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Submission State
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [createdOrnament, setCreatedOrnament] = useState(null);

  // Load categories and verify token on mount
  useEffect(() => {
    async function init() {
      const cats = await fetchCategories();
      setCategories(cats || []);
      if (cats && cats.length > 0 && !categoryId) {
        setCategoryId(String(cats[0].id));
      }

      if (token) {
        const verified = await verifyAuthToken(token);
        if (!verified) {
          handleLogout();
        }
      }
    }
    init();
  }, [token]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const data = await apiLogin(loginUsername, loginPassword);
      sessionStorage.setItem('zivara_auth_token', data.token);
      sessionStorage.setItem('zivara_auth_user', data.username);
      setToken(data.token);
      setCurrentUser(data.username);
      setLoginPassword('');
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('zivara_auth_token');
    sessionStorage.removeItem('zivara_auth_user');
    setToken('');
    setCurrentUser('');
    setCreatedOrnament(null);
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Handle Ornament Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setCreatedOrnament(null);

    if (!name.trim()) {
      setSubmitError('Please enter an ornament name.');
      return;
    }
    if (!categoryId) {
      setSubmitError('Please select a category.');
      return;
    }
    if (!isPriceOnRequest && !price) {
      setSubmitError('Please enter a price or check "Price on Request".');
      return;
    }
    if (!description.trim()) {
      setSubmitError('Please enter a description.');
      return;
    }
    if (!imageFile) {
      setSubmitError('Please select an ornament image to upload.');
      return;
    }

    setSubmitLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('category_id', categoryId);
      formData.append('description', description.trim());
      if (price) formData.append('price', price);
      formData.append('is_price_on_request', String(isPriceOnRequest));
      formData.append('availability', availability);
      formData.append('is_featured', String(isFeatured));
      formData.append('purity', purity.trim());
      if (weightApprox.trim()) formData.append('weight_approx', weightApprox.trim());
      formData.append('image', imageFile);

      const result = await createOrnament(formData, token);
      setCreatedOrnament(result);

      // Reset form
      setName('');
      setPrice('');
      setIsPriceOnRequest(false);
      setDescription('');
      setPurity('22K Gold');
      setWeightApprox('');
      setIsFeatured(false);
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setSubmitError(err.message || 'Failed to publish ornament. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-brown/60 mb-8">
        <Link to="/" className="hover:text-gold transition-colors">Home</Link>
        <span>/</span>
        <span className="text-maroon font-semibold flex items-center gap-1">
          <Lock className="w-3.5 h-3.5 text-gold-dark" />
          <span>Add Ornaments Portal</span>
        </span>
      </div>

      {/* VIEW A: LOGIN FORM (If not authenticated) */}
      {!token ? (
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-gold/40 shadow-royal relative overflow-hidden">
            {/* Top Decorative Header */}
            <div className="text-center space-y-3 mb-8">
              <div className="w-14 h-14 rounded-full bg-maroon/10 border-2 border-gold flex items-center justify-center mx-auto text-maroon shadow-inner">
                <Lock className="w-7 h-7 text-gold-dark" />
              </div>
              <h1 className="font-royal text-2xl sm:text-3xl font-bold text-brown">
                Add Ornaments Portal
              </h1>
              <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
              <p className="text-xs text-brown/70 leading-relaxed">
                Sign in with your dedicated creator credentials to add and publish ornaments directly to the live website.
              </p>
            </div>

            {/* Error Message Display */}
            {loginError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-brown uppercase tracking-wider mb-2">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Enter creator username"
                  className="w-full px-4 py-3 rounded-xl border border-gold/40 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm transition-all bg-cream-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brown uppercase tracking-wider mb-2">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter creator password"
                  className="w-full px-4 py-3 rounded-xl border border-gold/40 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm transition-all bg-cream-50/50"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3.5 bg-maroon hover:bg-maroon-dark text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 btn-luxury-sheen"
              >
                {loginLoading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-gold" />
                    <span>Sign In to Add Ornaments</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gold/20 text-center">
              <Link to="/collection" className="text-xs text-gold-dark hover:underline">
                ← Back to Public Collection
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW B: ADD ORNAMENT FORM (When authenticated) */
        <div className="space-y-8">
          {/* Authenticated Staff Bar */}
          <div className="bg-cream-100/80 rounded-2xl p-4 sm:p-5 border border-gold/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-maroon text-gold flex items-center justify-center font-royal font-bold text-sm border border-gold">
                {currentUser[0]?.toUpperCase() || 'A'}
              </div>
              <div>
                <p className="text-xs text-brown/60">Authorized Creator Session</p>
                <p className="text-sm font-bold text-brown font-royal">Signed in as {currentUser}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/collection"
                target="_blank"
                className="px-4 py-2 rounded-lg border border-gold text-maroon hover:bg-gold/10 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-gold-dark" />
                <span>View Public Collection ↗</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-100/70 hover:bg-red-200/80 text-red-700 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Success Banner if ornament was created */}
          {createdOrnament && (
            <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-royal text-lg font-bold text-emerald-900">
                      Ornament Published Successfully!
                    </h3>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      "{createdOrnament.name}" has been saved directly to the database and is now live on the public website.
                    </p>
                  </div>
                </div>

                <Link
                  to={`/ornaments/${createdOrnament.slug}`}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Preview Card */}
              <div className="max-w-xs pt-2">
                <p className="text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wider">Live Card Preview:</p>
                <OrnamentCard ornament={createdOrnament} />
              </div>
            </div>
          )}

          {/* Main Form Container */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-gold/40 shadow-royal">
            <div className="space-y-2 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon/10 border border-gold/40 text-maroon text-[11px] font-semibold tracking-widest uppercase">
                <Sparkles className="w-3 h-3 text-gold-dark" />
                <span>Live Database Publishing</span>
              </div>
              <h2 className="font-royal text-2xl sm:text-3xl font-bold text-brown">
                Add New Gujarat Bridal Ornament
              </h2>
              <div className="w-16 h-1 bg-gold rounded-full" />
              <p className="text-xs text-brown/70 leading-relaxed">
                Fill in the details below. Once submitted, the ornament and uploaded photograph will appear immediately across the website for all visitors.
              </p>
            </div>

            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Row 1: Name & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-brown uppercase tracking-wider mb-2">
                    Ornament Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Royal Antique Bridal Choker"
                    className="w-full px-4 py-3 rounded-xl border border-gold/40 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm transition-all bg-cream-50/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brown uppercase tracking-wider mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gold/40 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm transition-all bg-cream-50/40"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Price & Availability */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div>
                  <label className="block text-xs font-bold text-brown uppercase tracking-wider mb-2">
                    Price (₹ INR) {!isPriceOnRequest && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    disabled={isPriceOnRequest}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={isPriceOnRequest ? "Price on Request enabled" : "e.g. 14999"}
                    className="w-full px-4 py-3 rounded-xl border border-gold/40 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm transition-all bg-cream-50/40 disabled:opacity-50"
                  />
                  <div className="mt-2.5 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="priceOnRequest"
                      checked={isPriceOnRequest}
                      onChange={(e) => setIsPriceOnRequest(e.target.checked)}
                      className="rounded border-gold text-maroon focus:ring-gold"
                    />
                    <label htmlFor="priceOnRequest" className="text-xs text-brown/70 select-none cursor-pointer">
                      Price on Request
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brown uppercase tracking-wider mb-2">
                    Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gold/40 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm transition-all bg-cream-50/40"
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="made_to_order">Made to Order</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brown uppercase tracking-wider mb-2">
                    Homepage Visibility
                  </label>
                  <div className="p-3.5 rounded-xl border border-gold/40 bg-cream-50/40 flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="rounded border-gold text-maroon focus:ring-gold"
                    />
                    <label htmlFor="isFeatured" className="text-xs font-medium text-brown select-none cursor-pointer">
                      Feature on Homepage
                    </label>
                  </div>
                  <p className="text-[11px] text-brown/60 mt-1.5">
                    Checked items appear in the homepage "Featured Gujarat Ornaments" section.
                  </p>
                </div>
              </div>

              {/* Row 3: Purity & Weight */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-brown uppercase tracking-wider mb-2">
                    Purity & Finish
                  </label>
                  <input
                    type="text"
                    value={purity}
                    onChange={(e) => setPurity(e.target.value)}
                    placeholder="e.g. 22K Gold, Antique Finish, Royal Bridal"
                    className="w-full px-4 py-3 rounded-xl border border-gold/40 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm transition-all bg-cream-50/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brown uppercase tracking-wider mb-2">
                    Approximate Weight (Optional)
                  </label>
                  <input
                    type="text"
                    value={weightApprox}
                    onChange={(e) => setWeightApprox(e.target.value)}
                    placeholder="e.g. 35g, 60g"
                    className="w-full px-4 py-3 rounded-xl border border-gold/40 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm transition-all bg-cream-50/40"
                  />
                </div>
              </div>

              {/* Row 4: Description */}
              <div>
                <label className="block text-xs font-bold text-brown uppercase tracking-wider mb-2">
                  Description & Craftsmanship Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the ornament styling, motif carvings, gemstone embellishments, and bridal elegance..."
                  className="w-full px-4 py-3 rounded-xl border border-gold/40 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm transition-all bg-cream-50/40"
                />
              </div>

              {/* Row 5: Image Upload */}
              <div>
                <label className="block text-xs font-bold text-brown uppercase tracking-wider mb-2">
                  Ornament Photograph <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-8">
                    <label className="border-2 border-dashed border-gold/60 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-cream-50/60 transition-colors bg-cream-50/20 group">
                      <div className="w-12 h-12 rounded-full bg-gold/10 text-gold-dark flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-semibold text-brown font-royal">
                        {imageFile ? imageFile.name : 'Click to Upload Ornament Photo'}
                      </span>
                      <span className="text-xs text-brown/60 mt-1">
                        JPEG, PNG, WEBP supported (stored directly in Django media storage)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        required={!imageFile}
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="md:col-span-4">
                    {imagePreview ? (
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-brown uppercase tracking-wider block">Image Preview:</span>
                        <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-gold/50 shadow-md bg-brown-dark relative">
                          <img
                            src={imagePreview}
                            alt="Ornament Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full aspect-square rounded-2xl border border-gold/30 bg-cream-100/50 flex flex-col items-center justify-center text-brown/40 p-4 text-center">
                        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs">No image selected yet</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full sm:w-auto px-10 py-4 bg-maroon hover:bg-maroon-dark text-white rounded-full text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center justify-center gap-2.5 disabled:opacity-50 btn-luxury-sheen"
                >
                  {submitLoading ? (
                    <span>Publishing to Database...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span>Publish Ornament to Live Collection</span>
                    </>
                  )}
                </button>

                <Link
                  to="/collection"
                  className="w-full sm:w-auto px-6 py-4 border border-gold text-brown hover:bg-cream-100 text-xs font-semibold tracking-widest uppercase rounded-full transition-colors text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
