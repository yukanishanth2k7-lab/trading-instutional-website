import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermsPage({ navigate }) {
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
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#FF9D42] uppercase tracking-widest">
                OPERATIONAL TERMS & CLIENT MANDATES
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-black text-[#F5F5F0]">
                Terms of Service
              </h1>
            </div>
          </div>

          <div className="space-y-6 text-sm text-[#A3A3A3] leading-relaxed font-sans border-t border-white/10 pt-6 font-light">
            <p>
              By accessing Reverie Synaptic Pulse (&quot;RSP&quot;) or engaging our algorithmic engineering and software consulting services, you agree to comply with and be bound by the following terms.
            </p>

            <h3 className="font-heading font-bold text-[#F5F5F0] text-lg">
              1. Software Provisioning & Intellectual Property
            </h3>
            <p>
              RSP retains proprietary rights over custom core algorithms, proprietary indicators, and execution frameworks unless explicitly designated as work-for-hire under an executed Master Services Agreement (MSA).
            </p>

            <h3 className="font-heading font-bold text-[#F5F5F0] text-lg">
              2. 48-Hour Challenge Terms
            </h3>
            <p>
              Participation in the 48-Hour Business Challenge requires mutual execution of a strict mutual Non-Disclosure Agreement (NDA). All milestones and rapid prototypes delivered are intended for operational intervention as specified in the agreed project scope.
            </p>

            <h3 className="font-heading font-bold text-[#F5F5F0] text-lg">
              3. Jurisdiction
            </h3>
            <p>
              These terms are governed by and construed in accordance with the laws of Tamil Nadu, India, with exclusive jurisdiction in the courts of Dharmapuri and Madras High Court.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
