import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Radio } from 'lucide-react';
import RSPLogo from './RSPLogo';

export default function Navbar({ currentPath, navigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Algo Trading', path: '/algorithmic-trading-solutions' },
    { label: 'IT Consulting', path: '/it-consulting-services' },
    { label: 'Digital Solutions', path: '/digital-solutions' },
    { label: '48-Hour Sprint', path: '/48-hour-challenge', badge: true },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About Founder', path: '/about-abishek-sj' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3.5 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Enhanced Official RSP Monogram & Pulse */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <RSPLogo className="h-10" showWordmark={true} />
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`relative px-3.5 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'text-[#FF6B00] font-bold bg-[#111111] border border-[#FF6B00]/30'
                    : 'text-[#A3A3A3] hover:text-[#F5F5F0] hover:bg-white/[0.04]'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.label}
                  {item.badge && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B00] opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF6B00]" />
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right CTA Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNav('/contact')}
            className="btn-orange-glow px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2"
          >
            <span>Initiate Protocol</span>
            <ArrowUpRight className="w-4 h-4 text-[#050505]" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg text-[#A3A3A3] hover:text-[#F5F5F0] focus:outline-none"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0a0a0a] border-b border-[#FF6B00]/20 px-4 pt-3 pb-6 space-y-1.5 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono uppercase text-[#A3A3A3] hover:text-[#FF9D42] hover:bg-white/5 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3">
            <button
              onClick={() => handleNav('/contact')}
              className="w-full btn-orange-glow py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest text-center"
            >
              Initiate Protocol
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
