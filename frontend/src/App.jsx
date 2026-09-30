import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import OrnamentDetailPage from './pages/OrnamentDetailPage';
import ContactPage from './pages/ContactPage';
import AddOrnamentsPage from './pages/AddOrnamentsPage';
import BrandIntroOverlay from './components/BrandIntroOverlay';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('zivara_intro_dismissed');
    } catch (e) {
      return true;
    }
  });

  const handleDismissIntro = () => {
    try {
      sessionStorage.setItem('zivara_intro_dismissed', 'true');
    } catch (e) {}
    setShowIntro(false);
  };

  return (
    <SettingsProvider>
      {showIntro && (
        <BrandIntroOverlay onComplete={handleDismissIntro} />
      )}
      <BrowserRouter>
        <ScrollToTop />
        <div
          className={`min-h-screen flex flex-col bg-cream-50 text-brown ${
            hasEntered ? '' : 'page-entrance'
          }`}
          onAnimationEnd={() => setHasEntered(true)}
        >
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route path="/ornaments/:slug" element={<OrnamentDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/add-ornaments" element={<AddOrnamentsPage />} />
              {/* Fallback route */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SettingsProvider>
  );
}
