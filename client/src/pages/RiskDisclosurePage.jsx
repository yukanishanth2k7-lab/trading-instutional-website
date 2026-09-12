import React from 'react';
import { AlertTriangle, ShieldAlert, FileText, ArrowLeft } from 'lucide-react';

export default function RiskDisclosurePage({ navigate }) {
  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative pt-24 pb-24 bg-[#050505] text-[#F5F5F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10">
        <button
          onClick={() => handleNav('/algorithmic-trading-solutions')}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#FF9D42] hover:text-[#FFD166] mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Algorithmic Trading</span>
        </button>

        <div className="glass-card p-8 sm:p-12 border border-[#FF6B00]/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-[#FF9D42] uppercase tracking-widest">
                LEGAL COMPLIANCE & REGULATORY GOVERNANCE
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-black text-[#F5F5F0]">
                Institutional Risk Disclosure
              </h1>
            </div>
          </div>

          <div className="space-y-6 text-sm text-[#A3A3A3] leading-relaxed font-sans border-t border-white/10 pt-6 font-light">
            <div className="p-4 rounded-xl bg-[#111111] border border-[#FF6B00]/30 text-xs text-[#FFD166] font-mono">
              IMPORTANT NOTICE: Trading Foreign Exchange (Forex), Contracts for Difference (CFDs), Commodities (Gold/XAUUSD), and Indices involves substantial risk of loss and is not suitable for all investors. High degree of leverage can work against you as well as for you.
            </div>

            <h3 className="font-heading font-bold text-[#F5F5F0] text-lg">
              1. Non-Custodial Operating Principle
            </h3>
            <p>
              Reverie Synaptic Pulse (RSP) operates strictly on a <strong className="text-[#F5F5F0]">non-custodial software and technology provision model</strong>. RSP does not accept, hold, custody, or deposit client investment capital. All investor and trader funds remain exclusively in client-owned accounts at their independently chosen, regulated brokerage institutions. RSP connects purely via API, MQL5 client terminal execution, and software bridges.
            </p>

            <h3 className="font-heading font-bold text-[#F5F5F0] text-lg">
              2. Backtesting and Historical Performance Representation
            </h3>
            <p>
              Hypothetical or simulated performance results have inherent limitations. Unlike actual performance records, simulated results do not represent actual trading. Because the trades have not actually been executed, results may have under- or over-compensated for the impact, if any, of certain market factors such as liquidity shortages or high-impact slippage.
            </p>

            <h3 className="font-heading font-bold text-[#F5F5F0] text-lg">
              3. Technology & Algorithmic Execution Risks
            </h3>
            <p>
              Automated trading systems (Expert Advisors) rely on telecommunication networks, internet stability, broker server availability, and VPS uptime. While RSP implements hard daily drawdown caps, auto-halts, and failover notifications, unexpected network outages, broker spreads widening during news events, or extreme market volatility can result in slippage or unintended executions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
