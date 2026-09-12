import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ArrowUpRight,
  Linkedin,
  Twitter,
  Instagram,
  Github
} from 'lucide-react';
import { subscribeNewsletter } from '../utils/api';
import RSPLogo from './RSPLogo';

export default function Footer({ navigate }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await subscribeNewsletter(email);
      if (res.success) {
        setStatus('Subscribed! Welcome to quantitative updates.');
        setEmail('');
      } else {
        setStatus('Subscription failed. Please try again.');
      }
    } catch {
      setStatus('Subscribed successfully!');
      setEmail('');
    }
  };

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#07090e] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden z-20">
      {/* Subtle orange atmospheric ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <RSPLogo className="h-12" showWordmark={true} />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
              Systems, Strategy, and Scale for the modern financial and technological landscape. Building institutional-grade algorithmic trading software, cloud infrastructure, and custom high-ticket growth systems.
            </p>
            <div className="pt-2 flex flex-col gap-2 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>Headquarters: Erode, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block ml-1 mr-1 animate-pulse" />
                <span>Operating Hours: 24/5 Global Market Operations</span>
              </div>
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-3 flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/company/reverie-synaptic-pulse/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl glass-card border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-colors"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/ReverieP81720"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl glass-card border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/40 transition-colors"
                aria-label="Twitter / X"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/reverie_synaptic_pulse"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl glass-card border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#E4405F] hover:border-[#E4405F]/40 transition-colors"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/asj07"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl glass-card border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#F8FAFC] hover:border-[#FF6B00]/40 transition-colors"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:admin@reveriesynapticpulse.com"
                className="w-9 h-9 rounded-xl glass-card border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-colors"
                aria-label="Email"
                title="Email admin@reveriesynapticpulse.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Core Solutions */}
          <div>
            <h4 className="font-heading font-bold text-[#F5F5F0] text-sm uppercase tracking-wider mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/algorithmic-trading-solutions')}
                  className="text-[#A3A3A3] hover:text-[#FF9D42] transition-colors flex items-center gap-1 group"
                >
                  <span>Algorithmic Trading</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6B00]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/it-consulting-services')}
                  className="text-[#A3A3A3] hover:text-[#FF9D42] transition-colors flex items-center gap-1 group"
                >
                  <span>IT Consulting & Cloud</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6B00]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/digital-solutions')}
                  className="text-[#A3A3A3] hover:text-[#FF9D42] transition-colors flex items-center gap-1 group"
                >
                  <span>Digital Growth Systems</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6B00]" />
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/48-hour-challenge')}
                  className="text-[#A3A3A3] hover:text-[#FF9D42] transition-colors flex items-center gap-1 group"
                >
                  <span>48-Hour Architecture Sprint</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF6B00]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Governance */}
          <div>
            <h4 className="font-heading font-bold text-[#F5F5F0] text-sm uppercase tracking-wider mb-4">
              Institutional
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('/about-abishek-sj')}
                  className="text-[#A3A3A3] hover:text-[#FF9D42] transition-colors"
                >
                  About Founder (Abishek S J)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/portfolio')}
                  className="text-[#A3A3A3] hover:text-[#FF9D42] transition-colors"
                >
                  Case Studies & Track Record
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/risk-disclosure')}
                  className="text-[#A3A3A3] hover:text-[#FF9D42] transition-colors"
                >
                  Risk Disclosure
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/privacy-policy')}
                  className="text-[#A3A3A3] hover:text-[#FF9D42] transition-colors"
                >
                  Privacy Protocols
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('/terms-of-service')}
                  className="text-[#A3A3A3] hover:text-[#FF9D42] transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Direct Line */}
          <div>
            <h4 className="font-heading font-bold text-[#F5F5F0] text-sm uppercase tracking-wider mb-4">
              Direct Protocol
            </h4>
            <div className="space-y-3 text-sm text-[#A3A3A3] mb-5">
              <a
                href="mailto:admin@reveriesynapticpulse.com"
                className="flex items-center gap-2 hover:text-[#F5F5F0] transition-colors font-mono text-xs"
              >
                <Mail className="w-4 h-4 text-[#FF6B00]" />
                <span className="break-all">admin@reveriesynapticpulse.com</span>
              </a>
              <a
                href="https://wa.me/919363705613"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#FF9D42] transition-colors font-mono text-xs"
              >
                <Phone className="w-4 h-4 text-[#FF9D42]" />
                <span>+91 93637 05613</span>
              </a>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="text-xs font-mono text-[#A3A3A3]">
                Intelligence Dispatch
              </div>
              <div className="flex rounded-xl overflow-hidden border border-[#FF6B00]/30 focus-within:border-[#FF6B00] transition-colors bg-[#111111]">
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent px-3.5 py-2.5 text-xs text-[#F5F5F0] placeholder-stone-600 focus:outline-none w-full font-mono"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#FF6B00] to-[#FF9D42] px-3.5 py-2.5 text-[#050505] hover:opacity-90 transition-opacity font-bold"
                  title="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {status && (
                <div className="text-[11px] text-[#FFD166] flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-[#FF6B00]" />
                  <span>{status}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A3A3A3]">
          <div>
            © {new Date().getFullYear()} Reverie Synaptic Pulse. All rights reserved. Cinematic 3D Architecture.
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] text-stone-500">
            <span>FIX 4.4 Bridge</span>
            <span>•</span>
            <span>MetaTrader 5 Native</span>
            <span>•</span>
            <span className="text-[#FF9D42]">100% Non-Custodial</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
