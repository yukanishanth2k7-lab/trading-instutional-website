import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MarketTicker from './components/MarketTicker';
import WhatsAppButton from './components/WhatsAppButton';

import HomePage from './pages/HomePage';
import AlgoTradingPage from './pages/AlgoTradingPage';
import ITConsultingPage from './pages/ITConsultingPage';
import DigitalSolutionsPage from './pages/DigitalSolutionsPage';
import ChallengePage from './pages/ChallengePage';
import AboutFounderPage from './pages/AboutFounderPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import RiskDisclosurePage from './pages/RiskDisclosurePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import TradingLoadingScreen from './components/TradingLoadingScreen';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current page based on pathname
  const renderPage = () => {
    const p = currentPath.toLowerCase();

    if (p === '/algorithmic-trading-solutions') {
      return <AlgoTradingPage navigate={navigate} />;
    }
    if (p === '/it-consulting-services') {
      return <ITConsultingPage navigate={navigate} />;
    }
    if (p === '/digital-solutions') {
      return <DigitalSolutionsPage navigate={navigate} />;
    }
    if (p === '/48-hour-challenge') {
      return <ChallengePage navigate={navigate} />;
    }
    if (p === '/about-abishek-sj' || p === '/founder') {
      return <AboutFounderPage navigate={navigate} />;
    }
    if (p.startsWith('/portfolio')) {
      return <PortfolioPage navigate={navigate} />;
    }
    if (p === '/contact') {
      return <ContactPage navigate={navigate} />;
    }
    if (p === '/risk-disclosure') {
      return <RiskDisclosurePage navigate={navigate} />;
    }
    if (p === '/privacy-policy') {
      return <PrivacyPolicyPage navigate={navigate} />;
    }
    if (p === '/terms-of-service') {
      return <TermsPage navigate={navigate} />;
    }

    // Default Home
    return <HomePage navigate={navigate} />;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F0] flex flex-col selection:bg-[#FF6B00] selection:text-[#050505] relative">
      {/* Trading Graph Loading Screen with Official Logo */}
      {isLoading && <TradingLoadingScreen onFinished={() => setIsLoading(false)} />}

      {/* Background Cyber Grid */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-40" />
      {/* Ambient Orange Atmospheric Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#FF6B00]/5 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Global Navigation */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Live Market Ticker */}
      <div className="pt-20">
        <MarketTicker />
      </div>

      {/* Main Page Content */}
      <main className="flex-grow relative z-10">
        {renderPage()}
      </main>

      {/* Floating WhatsApp Action */}
      <WhatsAppButton />

      {/* Global Footer */}
      <Footer navigate={navigate} />
    </div>
  );
}
