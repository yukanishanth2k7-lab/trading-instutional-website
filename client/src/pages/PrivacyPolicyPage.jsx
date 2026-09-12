import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage({ navigate }) {
  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative pt-24 pb-24 bg-[#050505] text-[#F5F5F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10">
        <button
          onClick={() => handleNav('/')}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#FF9D42] hover:text-[#FFD166] mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        <div className="glass-card p-8 sm:p-12 border border-[#FF6B00]/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#FF9D42] uppercase tracking-widest">
                DATA PRIVACY // GDPR & DPDP ACT
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-black text-[#F5F5F0]">
                Privacy Policy
              </h1>
            </div>
          </div>

          <div className="space-y-6 text-sm text-[#A3A3A3] leading-relaxed font-sans border-t border-white/10 pt-6 font-light">
            <p>
              Reverie Synaptic Pulse (&quot;RSP&quot;, &quot;we&quot;, &quot;us&quot;) is committed to safeguarding user data across our website and algorithmic software deployments.
            </p>

            <h3 className="font-heading font-bold text-[#F5F5F0] text-lg">
              1. Information Collection
            </h3>
            <p>
              We collect information you explicitly provide when submitting inquiries, booking discovery calls, or applying for the 48-Hour Business Challenge (such as your full name, business email, phone number, and project descriptions). We do not collect or store brokerage trading account credentials or sensitive banking passwords.
            </p>

            <h3 className="font-heading font-bold text-[#F5F5F0] text-lg">
              2. Data Protection & Confidentiality
            </h3>
            <p>
              All customer transmissions sent through our contact protocol or challenge access gate are transmitted using TLS 1.3 encryption. We strictly enforce Non-Disclosure Agreements (NDAs) for private quantitative formulas and business workflows.
            </p>

            <h3 className="font-heading font-bold text-[#F5F5F0] text-lg">
              3. Contact Us
            </h3>
            <p>
              For privacy-related inquiries, reach our Data Governance Officer at <a href="mailto:admin@reveriesynapticpulse.com" className="text-[#FF9D42] underline hover:text-[#FFD166]">admin@reveriesynapticpulse.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
