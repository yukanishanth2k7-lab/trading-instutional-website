import React, { useState } from 'react';
import {
  Cpu,
  Shield,
  BarChart3,
  Lock,
  ArrowRight,
  CheckCircle,
  Zap,
  TrendingUp,
  Activity,
  Award,
  Terminal,
  Layers,
  ChevronRight,
  Sliders,
  DollarSign
} from 'lucide-react';

export default function AlgoTradingPage({ navigate }) {
  const [capital, setCapital] = useState(10000);
  const [riskTier, setRiskTier] = useState('moderate'); // conservative, moderate, prime
  const [selectedStrategy, setSelectedStrategy] = useState('PulseMomentum');

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Performance simulation calculations
  const calculateSim = () => {
    let monthlyReturn = 6.8;
    let winRate = '84.2%';
    let maxDD = '3.5%';
    let profitFactor = '2.31';

    if (riskTier === 'conservative') {
      monthlyReturn = 3.9;
      winRate = '88.5%';
      maxDD = '1.8%';
      profitFactor = '2.95';
    } else if (riskTier === 'prime') {
      monthlyReturn = 12.4;
      winRate = '89.4%';
      maxDD = '4.6%';
      profitFactor = '2.84';
    }

    const estimatedMonthlyProfit = Math.round(capital * (monthlyReturn / 100));
    const estimatedAnnual = Math.round(capital * Math.pow(1 + monthlyReturn / 100, 12));

    return {
      monthlyReturn,
      winRate,
      maxDD,
      profitFactor,
      estimatedMonthlyProfit,
      estimatedAnnual
    };
  };

  const sim = calculateSim();

  const strategies = [
    {
      name: 'PulseStart',
      badge: 'Conservative / Entry Level',
      desc: 'Entry-level algorithmic trading package designed for beginners with conservative risk profiles.',
      target: 'Beginner & Capital Preservation',
      riskProfile: 'Low Risk (0.25% - 0.5% per trade)',
      features: [
        'Low-risk quantitative strategies',
        'Weekly performance & equity reports',
        '24/7 server & system monitoring',
        'Dedicated technical onboarding support',
        'Hard daily drawdown guardrails (2% cap)',
        'Major Forex pairs (EURUSD, GBPUSD)'
      ],
      color: 'from-cyan-500/10 to-transparent',
      border: 'border-cyan-500/30',
      tagColor: 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/20'
    },
    {
      name: 'PulseMomentum',
      badge: 'Most Popular / Growth & Balance',
      desc: 'Intermediate trading systems balancing aggressive growth potential with disciplined institutional risk management.',
      target: 'Funded Challenge & Growing Accounts',
      riskProfile: 'Balanced (0.75% - 1.0% per trade)',
      features: [
        'Multi-asset diversification (FX + Indices)',
        'Dynamic volatility-based position sizing',
        'Real-time web analytics & trade logging',
        'Priority Slack & WhatsApp support channel',
        'Smart Money Concepts (SMC) order-flow engine',
        'Automated breakeven & trailing stop algorithms'
      ],
      color: 'from-[#FF6B00]/15 to-transparent',
      border: 'border-[#FF6B00]/45 shadow-lg shadow-[#FF6B00]/10',
      tagColor: 'text-[#FF9D42] bg-[#FF6B00]/15 border border-[#FF6B00]/30'
    },
    {
      name: 'PulsePrime',
      badge: 'Institutional / Maximum Alpha',
      desc: 'Premium institutional-grade strategies for sophisticated investors and proprietary capital seeking maximum returns.',
      target: 'High Net-Worth & Prop Desks',
      riskProfile: 'Dynamic Alpha (1.0% - 2.0% per trade)',
      features: [
        'Advanced SMC / ICT liquidity algorithms',
        'Custom EA development & bespoke tuning',
        'Dedicated fund infrastructure & MQL5 API',
        'VIP direct access to founder & lead engineer',
        'XAUUSD Gold Engine (Aurivex v3.2)',
        'Multi-broker latency arbitrage mitigation'
      ],
      color: 'from-amber-500/10 to-transparent',
      border: 'border-amber-500/30',
      tagColor: 'text-amber-300 bg-amber-500/10 border border-amber-500/20'
    }
  ];

  return (
    <div className="relative pt-24 pb-24 bg-[#07090e] text-[#F8FAFC]">
      {/* Subtle atmospheric depth instead of blinding orange flares */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[300px] bg-[#FF6B00]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-96 right-10 w-[400px] h-[300px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FF9D42] font-mono text-xs mb-6">
            <Cpu className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>MQL5 EA DEVELOPMENT • QUANTITATIVE STRATEGY AUTOMATION</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-black text-[#F5F5F0] tracking-tight leading-[1.1]">
            MT5 Expert Advisors &{' '}
            <span className="text-gradient-orange">Algo Trading Systems</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[#A3A3A3] leading-relaxed max-w-3xl mx-auto font-light">
            RSP builds system-driven trading automation and reporting for serious traders who need consistency under pressure. Execute with discipline, reduce risk exposure, and review performance with clarity.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleNav('/contact')}
              className="btn-orange-glow px-8 py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-3 transition-all"
            >
              <span>Book Discovery Protocol</span>
              <ArrowRight className="w-4 h-4 text-[#050505]" />
            </button>
            <button
              onClick={() => handleNav('/portfolio')}
              className="px-8 py-4 rounded-xl glass-card border border-white/10 text-[#F5F5F0] hover:text-[#FF9D42] font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <span>Verified Case: 89.4% Win Rate System</span>
              <ChevronRight className="w-4 h-4 text-[#FF6B00]" />
            </button>
          </div>
        </div>

        {/* Who this is for & What We Build 2-Col Grid */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Box 1: Who This Is For */}
          <div className="glass-card p-8 sm:p-10 border-l-4 border-l-[#FF6B00]">
            <div className="text-xs font-mono tracking-widest text-[#FF9D42] uppercase mb-3">
              TARGET AUDIENCE
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#F5F5F0] mb-6">
              Who This Is For
            </h3>
            <ul className="space-y-4 text-sm text-[#A3A3A3]">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F5F5F0]">Disciplined Execution:</strong> Traders who want algorithmic execution without emotional subjectivity or revenge trading.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F5F5F0]">Funded Challenge Accounts:</strong> Prop desk teams needing strict drawdown protection and zero rule-break automation.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#F5F5F0]">Risk Control & Reporting:</strong> Capital allocators needing institutional-grade stop-loss governance and automated daily reporting.
                </span>
              </li>
            </ul>
          </div>

          {/* Box 2: What RSP Delivers */}
          <div className="glass-card p-8 sm:p-10 border-l-4 border-l-[#FFD166]">
            <div className="text-xs font-mono tracking-widest text-[#FFD166] uppercase mb-3">
              SYSTEM ARCHITECTURE
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#F5F5F0] mb-6">
              What We Deliver
            </h3>
            <ul className="space-y-3 text-sm text-[#A3A3A3]">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
                <span>Automated execution logic (entries, exits, sessions, liquidity filters)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
                <span>Risk management controls (drawdown caps, sizing rules, correlation checks)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
                <span>Strategy reporting & telemetry dashboards (real-time visibility)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
                <span>Backtesting + forward-testing process with transparent assumptions</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
                <span>Deployment & monitoring setup (Telegram/Discord alerts, stability checks)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FFD166]" />
                <span>Safe operating playbook, MQL5 source code, and handover documentation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Live Performance Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="glass-card p-8 sm:p-12 border border-[#FF6B00]/30 relative overflow-hidden bg-[#111111]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-white/10">
            <div>
              <div className="cyber-badge-gold inline-block mb-3">INTERACTIVE ENGINE</div>
              <h2 className="font-heading text-3xl font-bold text-[#F5F5F0]">
                Algo Strategy Performance Simulator
              </h2>
              <p className="text-[#A3A3A3] text-sm mt-1">
                Simulate potential equity curves based on audited historical backtests and live execution metrics.
              </p>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-[#A3A3A3]">Strategy Profile:</span>
              {['conservative', 'moderate', 'prime'].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setRiskTier(tier)}
                  className={`px-3 py-1.5 rounded-lg uppercase tracking-wider font-semibold transition-all ${
                    riskTier === tier
                      ? 'bg-[#FF6B00] text-[#050505] shadow-lg shadow-[#FF6B00]/30'
                      : 'bg-white/5 text-[#A3A3A3] hover:text-[#F5F5F0]'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex flex-wrap justify-between items-center gap-2 mb-2 font-mono">
                  <span className="text-xs text-[#A3A3A3] uppercase tracking-wider">Allocated Trading Capital:</span>
                  {/* Custom integer input box */}
                  <div className="flex items-center gap-1.5 bg-[#090c13] border border-white/10 hover:border-[#FF6B00]/50 rounded-lg px-2.5 py-1 focus-within:border-[#FF6B00] transition-colors">
                    <span className="text-xs font-mono text-[#FF9D42] font-bold">$</span>
                    <input
                      type="number"
                      min="1000"
                      step="1000"
                      value={capital || ''}
                      onChange={(e) => {
                        const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                        setCapital(isNaN(val) ? 0 : Math.max(0, val));
                      }}
                      placeholder="Custom amount"
                      className="w-28 bg-transparent text-right font-mono font-bold text-sm text-[#FFD166] focus:outline-none"
                    />
                    <span className="text-[10px] font-mono text-slate-500">USD</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="1000"
                  value={Math.min(100000, Math.max(2000, capital || 2000))}
                  onChange={(e) => setCapital(Number(e.target.value))}
                  className="w-full h-2 bg-stone-900 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
                />
                <div className="flex justify-between text-[11px] text-stone-500 font-mono mt-1">
                  <span>$2,000 (Min)</span>
                  <span>$50,000 (Challenge)</span>
                  <span>$100,000 (Prop)</span>
                </div>

                {/* Preset & Custom choices */}
                <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider mr-1">Presets:</span>
                  {[5000, 10000, 25000, 50000, 100000, 200000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCapital(preset)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                        capital === preset
                          ? 'bg-[#FF6B00]/20 text-[#FF9D42] border border-[#FF6B00]/40 font-bold'
                          : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      ${preset >= 1000 ? `${preset / 1000}k` : preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-4 space-y-2 border border-white/5">
                <div className="text-xs text-[#FF9D42] font-mono uppercase">Audit Verified Assumptions</div>
                <div className="text-xs text-[#A3A3A3] leading-relaxed font-light">
                  Backtested across 2022–2026 market cycles including high-impact CPI, NFP, and rate hike announcements. Maximum slippage tolerance: 1.5 pips.
                </div>
              </div>
            </div>

            {/* Simulated Metrics Card: Contextual Colors */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono">
              <div className="glass-card p-4 border border-emerald-500/20 hover:border-emerald-500/40">
                <div className="text-[11px] text-slate-400">WIN RATE</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">{sim.winRate}</div>
                <div className="text-[10px] text-emerald-300 mt-1">SMC Confirmation</div>
              </div>

              <div className="glass-card p-4 border border-amber-500/20 hover:border-amber-500/40">
                <div className="text-[11px] text-slate-400">PROFIT FACTOR</div>
                <div className="text-2xl font-bold text-amber-400 mt-1">{sim.profitFactor}</div>
                <div className="text-[10px] text-amber-300 mt-1">Gross Win / Gross Loss</div>
              </div>

              <div className="glass-card p-4 border border-rose-500/20 hover:border-rose-500/40">
                <div className="text-[11px] text-slate-400">MAX DRAWDOWN</div>
                <div className="text-2xl font-bold text-rose-400 mt-1">{sim.maxDD}</div>
                <div className="text-[10px] text-rose-300 mt-1">Hard Capped</div>
              </div>

              <div className="glass-card p-4 border border-emerald-500/20 hover:border-emerald-500/40 col-span-2 sm:col-span-1">
                <div className="text-[11px] text-slate-400">EST. MONTHLY GAIN</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">+${sim.estimatedMonthlyProfit.toLocaleString()}</div>
                <div className="text-[10px] text-emerald-300 mt-1">~{sim.monthlyReturn}% per month</div>
              </div>

              <div className="glass-card p-4 border border-white/10 hover:border-[#FF6B00]/40 col-span-2">
                <div className="text-[11px] text-[#FF9D42]">EST. 1-YEAR COMPOUNDED VALUE</div>
                <div className="text-2xl font-bold text-[#F8FAFC] mt-1">${sim.estimatedAnnual.toLocaleString()}</div>
                <div className="text-[10px] text-slate-400 mt-1">*Past performance does not guarantee future results. See Risk Disclosure.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Strategy Tiers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="cyber-badge inline-block mb-3">PORTFOLIO TIERS</div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#F5F5F0] tracking-tight">
            Choose Your Strategy Architecture
          </h2>
          <p className="mt-4 text-[#A3A3A3] text-base font-light">
            Tailored trading solutions for every investor profile — from conservative beginners to aggressive prop traders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {strategies.map((pkg) => (
            <div
              key={pkg.name}
              className={`glass-card p-8 flex flex-col justify-between relative group ${pkg.border}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-mono px-3 py-1 rounded-full font-semibold ${pkg.tagColor}`}>
                    {pkg.badge}
                  </span>
                </div>

                <h3 className="font-heading text-3xl font-extrabold text-[#F5F5F0] mb-2">
                  {pkg.name}
                </h3>
                <p className="text-[#A3A3A3] text-xs leading-relaxed mb-6 font-light">
                  {pkg.desc}
                </p>

                <div className="py-3 px-4 rounded-lg bg-white/5 border border-white/5 mb-6 font-mono text-xs">
                  <div className="text-[#A3A3A3]">Risk Profile:</div>
                  <div className="text-[#FFD166] font-semibold mt-0.5">{pkg.riskProfile}</div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-mono text-[#A3A3A3] uppercase tracking-wider">Features Included:</div>
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#A3A3A3]">
                      <CheckCircle className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleNav('/contact')}
                className="w-full py-3.5 rounded-xl glass-card hover:bg-[#FF6B00] hover:text-[#050505] border border-[#FF6B00]/40 text-[#FF9D42] font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Deploy {pkg.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4 Pillars of Institutional Trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 border-t border-[#FF6B00]/15">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="cyber-badge inline-block mb-3">INSTITUTIONAL FOUNDATION</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#F5F5F0]">
            Bridging Retail Trading & Institutional Governance
          </h2>
          <p className="mt-4 text-[#A3A3A3] text-sm font-light">
            Our systems leverage the exact mathematical methodologies and execution safeguards used by quantitative hedge funds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] mb-5">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-[#F5F5F0] text-lg mb-2">
              Fully Automated Execution
            </h4>
            <p className="text-[#A3A3A3] text-xs leading-relaxed font-light">
              Our Expert Advisors execute trades 24/5 with millisecond latency, eliminating emotional hesitation and human fatigue.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-xl bg-[#FF9D42]/10 border border-[#FF9D42]/30 flex items-center justify-center text-[#FF9D42] mb-5">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-[#F5F5F0] text-lg mb-2">
              Institutional Risk Controls
            </h4>
            <p className="text-[#A3A3A3] text-xs leading-relaxed font-light">
              Multi-layered risk management: hard daily drawdown stops, volatility-adjusted position sizing, and correlation guards.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-xl bg-[#FFD166]/10 border border-[#FFD166]/30 flex items-center justify-center text-[#FFD166] mb-5">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-[#F5F5F0] text-lg mb-2">
              Transparent Reporting
            </h4>
            <p className="text-[#A3A3A3] text-xs leading-relaxed font-light">
              Real-time dashboards, instant fills notifications, and audited monthly equity reports with clear trade attribution.
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-[#F5F5F0] text-lg mb-2">
              Secure Fund Management
            </h4>
            <p className="text-[#A3A3A3] text-xs leading-relaxed font-light">
              Non-custodial architecture. Your capital remains safely in your own regulated brokerage account. We only manage; we never hold client funds.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Step Process Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="glass-card p-8 sm:p-12 text-center max-w-4xl mx-auto border border-[#FF6B00]/30">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F5F0] mb-4">
            Ready to deploy institutional algorithmic automation?
          </h3>
          <p className="text-[#A3A3A3] text-sm max-w-2xl mx-auto mb-8 font-light">
            Join RSP’s exclusive network of serious traders leveraging institutional-grade systems for consistent, disciplined returns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleNav('/contact')}
              className="btn-orange-glow px-8 py-3.5 rounded-xl text-[#050505] font-bold text-xs font-mono uppercase tracking-wider"
            >
              Get Started Today
            </button>
            <button
              onClick={() => handleNav('/risk-disclosure')}
              className="px-8 py-3.5 rounded-xl glass-card hover:bg-white/10 border border-white/10 text-[#A3A3A3] font-mono text-xs uppercase tracking-wider"
            >
              Review Risk Disclosure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
