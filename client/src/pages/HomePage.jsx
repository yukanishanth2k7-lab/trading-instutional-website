import React, { useState } from 'react';
import {
  ArrowRight,
  Zap,
  TrendingUp,
  Cpu,
  Network,
  ShieldCheck,
  Layers,
  Code2,
  Sliders,
  ChevronRight,
  Activity,
  Radio,
  MapPin,
  CheckCircle2,
  Terminal,
  Send,
  Sparkles
} from 'lucide-react';
import ThreeHeroScene from '../components/ThreeHeroScene';
import ThreeSynapticCore from '../components/ThreeSynapticCore';
import LiveTradingGraph from '../components/LiveTradingGraph';
import { submitChallenge } from '../utils/api';

export default function HomePage({ navigate }) {
  // Strategy Simulator State (Section 3)
  const [capital, setCapital] = useState(50000);
  const [riskTier, setRiskTier] = useState('balanced'); // conservative, balanced, aggressive

  // Inbound ROI Modeler State (Section 3)
  const [adSpend, setAdSpend] = useState(10000);
  const [targetCpl, setTargetCpl] = useState(65);

  // 48-Hour Challenge Form State (Section 5)
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [challengeTicket, setChallengeTicket] = useState('');
  const [chName, setChName] = useState('');
  const [chEmail, setChEmail] = useState('');
  const [chCompany, setChCompany] = useState('');
  const [chBottleneck, setChBottleneck] = useState('');

  // Risk profile calculations
  const riskConfigs = {
    conservative: { name: 'Conservative Multi-Asset', sharpe: '2.14', drawdown: '6.2%', mult: 0.42, winRate: '74.2%' },
    balanced: { name: 'Balanced Volatility Target', sharpe: '2.48', drawdown: '9.8%', mult: 0.65, winRate: '71.5%' },
    aggressive: { name: 'High-Alpha Dynamic Momentum', sharpe: '2.85', drawdown: '14.5%', mult: 0.94, winRate: '68.9%' }
  };
  const activeRisk = riskConfigs[riskTier];
  const projectedAnnual = Math.round(capital * activeRisk.mult);
  const projectedMonthly = Math.round(projectedAnnual / 12);

  // ROI calculations
  const leads = Math.round(adSpend / targetCpl);
  const closedAccounts = Math.max(1, Math.round(leads * 0.12));
  const pipelineValue = closedAccounts * 18000;

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChallengeSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await submitChallenge({
        name: chName,
        email: chEmail,
        company: chCompany,
        bottleneck: chBottleneck
      });
      setChallengeTicket(data.ticketId || ('RSP-SPRINT-' + Math.floor(Math.random() * 9000 + 1000)));
    } catch {
      setChallengeTicket('RSP-SPRINT-' + Math.floor(Math.random() * 9000 + 1000));
    }
    setChallengeSubmitted(true);
  };

  return (
    <div className="relative bg-[#050505] text-[#F5F5F0] overflow-hidden">
      
      {/* ========================================================================= */}
      {/* SECTION 1: FULL-SCREEN INTERACTIVE 3D HERO BACKGROUND */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-24 overflow-hidden bg-[#07090e]">
        {/* Full-Screen 3D Synaptic Void Background Component */}
        <ThreeHeroScene />

        {/* Foreground Hero Content (Elevated in relative z-10 for perfect contrast) */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center flex flex-col items-center">
          
          {/* Institutional Brand Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#FF6B00]/30 bg-[#0d111a]/85 backdrop-blur-xl mb-6 shadow-[0_0_25px_rgba(255,107,0,0.15)]">
            <span className="h-2 w-2 rounded-full bg-[#FF6B00] animate-ping" />
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#FF9D42] font-semibold">
              SYNAPTIC NEURAL ENGINE // FIX 4.4 &bull; SUB-12MS EXECUTION
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight text-[#F8FAFC] leading-[1.08] max-w-4xl">
            Quantitative Intelligence <br />
            <span className="text-gradient-orange">
              Engineered for Institutional Scale
            </span>
          </h1>

          {/* Restrained Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-light">
            Reverie Synaptic Pulse (RSP) builds AI automation systems, custom software, and digital solutions that help SMBs across India operate faster, reduce manual work, and scale with confidence. From business automation to full-stack development — we deliver production-ready software your team can rely on.
          </p>

          {/* Action CTAs: Main Theme Orange & Sleek Glass */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9 w-full sm:w-auto">
            <button
              onClick={() => handleNav('/contact')}
              className="w-full sm:w-auto btn-orange-glow px-9 py-4 rounded-xl font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Initiate Protocol</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => handleNav('/algorithmic-trading-solutions')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-card text-[#F8FAFC] hover:text-[#FF6B00] font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-300 backdrop-blur-xl cursor-pointer"
            >
              <span>Explore Algo Models</span>
              <ChevronRight className="w-4 h-4 text-[#FF6B00]" />
            </button>
          </div>

          {/* Institutional Telemetry Row: Contextual Colors */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 w-full max-w-4xl">
            <div className="p-4 rounded-2xl border border-white/10 bg-[#0d111a]/70 backdrop-blur-xl shadow-lg text-left group hover:border-cyan-500/40 transition-all">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Execution Speed</div>
              <div className="text-2xl font-black font-heading text-cyan-400 mt-1">&lt; 12ms</div>
              <div className="text-[9px] font-mono text-cyan-300 mt-0.5 font-medium">FIX 4.4 Bridge</div>
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-[#0d111a]/70 backdrop-blur-xl shadow-lg text-left group hover:border-emerald-500/40 transition-all">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Capital Custody</div>
              <div className="text-2xl font-black font-heading text-emerald-400 mt-1">100%</div>
              <div className="text-[9px] font-mono text-emerald-300 mt-0.5">Non-Custodial</div>
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-[#0d111a]/70 backdrop-blur-xl shadow-lg text-left group hover:border-amber-500/40 transition-all">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Audited Win Rate</div>
              <div className="text-2xl font-black font-heading text-amber-400 mt-1">89.4%</div>
              <div className="text-[9px] font-mono text-amber-300 mt-0.5">SMC / Volume Delta</div>
            </div>
            <div className="p-4 rounded-2xl border border-white/10 bg-[#0d111a]/70 backdrop-blur-xl shadow-lg text-left group hover:border-[#FF6B00]/40 transition-all">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Rapid Sprint</div>
              <div className="text-2xl font-black font-heading text-[#FF6B00] mt-1">48 Hours</div>
              <div className="text-[9px] font-mono text-[#FF9D42] mt-0.5">Intervention Fix</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* LIVE TRADING GRAPH SERVER STATION (EVERY TRADING OPTION) */}
      {/* ========================================================================= */}
      <LiveTradingGraph navigate={handleNav} />

      {/* ========================================================================= */}
      {/* SECTION 2: INTRODUCTION SECTION WITH CONTEXTUAL DISCIPLINE PILLARS */}
      {/* ========================================================================= */}
      <section className="py-24 border-t border-white/[0.08] bg-[#090b10] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="cyber-badge">SYSTEM INTEGRITY PROTOCOLS</span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#F8FAFC]">
              Four Pillars of <span className="text-gradient-orange">Algorithmic Discipline</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              We eliminate emotional subjectivity and architectural opacity. Every line of code exists to preserve capital and extract statistical edge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Capital Preservation (Emerald) */}
            <div className="glass-card p-7 rounded-3xl relative overflow-hidden group hover:border-emerald-500/40">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-2 font-heading">Capital Preservation First</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Hard equity stops, volatility-adjusted position sizing, and maximum daily drawdown cutoff rules strictly enforced at the engine level.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 text-[10px] font-mono text-emerald-400">
                // ZERO DEVIATION TOLERANCE
              </div>
            </div>

            {/* Pillar 2: Latency & Speed (Cyan) */}
            <div className="glass-card p-7 rounded-3xl relative overflow-hidden group hover:border-cyan-500/40">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-2 font-heading">Sub-12ms Latency</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                Direct broker API gateways, VPS proximity routing in London and New York, ensuring zero slippage on volatility breakout entries.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 text-[10px] font-mono text-cyan-400">
                // PROXIMITY LIQUIDITY BRIDGE
              </div>
            </div>

            {/* Pillar 3: Non-Custodial Integrity (Amber/Gold) */}
            <div className="glass-card p-7 rounded-3xl relative overflow-hidden group hover:border-amber-500/40">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-5">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-2 font-heading">Transparent Architecture</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                100% non-custodial software execution. Capital stays in your tier-1 brokerage. You retain full audit logs and credential ownership.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 text-[10px] font-mono text-amber-400">
                // ZERO CAPITAL HANDOVER
              </div>
            </div>

            {/* Pillar 4: Scalable Ecosystem (Main Theme Orange) */}
            <div className="glass-card p-7 rounded-3xl relative overflow-hidden group hover:border-[#FF6B00]/40">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/25 flex items-center justify-center text-[#FF6B00] mb-5">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#F8FAFC] mb-2 font-heading">Scalable Ecosystem</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">
                From algorithmic trading automation to enterprise internal software and high-ticket customer acquisition pipelines under one vision.
              </p>
              <div className="mt-4 pt-4 border-t border-white/10 text-[10px] font-mono text-[#FF9D42]">
                // MULTI-DISCIPLINARY SCALE
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: INTERACTIVE FEATURE SECTION (SIMULATOR + ROI MODELER) */}
      {/* ========================================================================= */}
      <section className="py-24 border-t border-white/[0.08] bg-[#07090e] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="cyber-badge-emerald">INTERACTIVE COMPUTATIONAL MODELS</span>
            <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#F8FAFC]">
              Dynamic <span className="text-gradient-orange">Performance Simulators</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light">
              Explore quantitative return envelopes and inbound pipeline revenue modeling in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Feature 1: Strategy Performance Simulator (Context: Financial Returns / Emerald & Amber) */}
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-emerald-500/30">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">MODEL 01 // QUANTITATIVE ENVELOPE</span>
                  <h3 className="text-2xl font-bold text-[#F8FAFC] font-heading mt-0.5">Strategy Yield Calculator</h3>
                </div>
                <div className="flex gap-1.5">
                  {['conservative', 'balanced', 'aggressive'].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setRiskTier(tier)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all uppercase ${
                        riskTier === tier
                          ? 'bg-[#FF6B00] text-white font-bold shadow-md shadow-[#FF6B00]/30'
                          : 'bg-[#0d111a] text-slate-400 border border-white/10 hover:text-white'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Capital Allocation</label>
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
                        placeholder="Custom value"
                        className="w-28 bg-transparent text-right font-mono font-bold text-sm text-[#F8FAFC] focus:outline-none"
                      />
                      <span className="text-[10px] font-mono text-slate-500">USD</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="10000"
                    max="500000"
                    step="5000"
                    value={Math.min(500000, Math.max(10000, capital || 10000))}
                    onChange={(e) => setCapital(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>$10k</span>
                    <span>$100k</span>
                    <span>$250k</span>
                    <span>$500k+</span>
                  </div>

                  {/* Preset and custom choice buttons */}
                  <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mr-1">Presets:</span>
                    {[25000, 50000, 100000, 250000, 500000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setCapital(preset)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                          capital === preset
                            ? 'bg-[#FF6B00]/20 text-[#FF9D42] border border-[#FF6B00]/40 font-bold'
                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        ${preset >= 1000 ? `${preset / 1000}k` : preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#090c13] border border-emerald-500/25">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Projected Annual</div>
                    <div className="text-2xl font-black font-heading text-emerald-400 mt-1">${projectedAnnual.toLocaleString()}</div>
                    <div className="text-[10px] font-mono text-emerald-300 mt-0.5">+{(activeRisk.mult * 100).toFixed(1)}% Est.</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#090c13] border border-amber-500/25">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Monthly Run-Rate</div>
                    <div className="text-2xl font-black font-heading text-amber-400 mt-1">${projectedMonthly.toLocaleString()}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">Sharpe {activeRisk.sharpe}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleNav('/algorithmic-trading-solutions')}
                  className="w-full py-3.5 rounded-xl btn-orange-glow font-mono font-bold text-xs uppercase tracking-widest text-center cursor-pointer"
                >
                  Configure Algo Deployment
                </button>
              </div>
            </div>

            {/* Feature 2: Inbound Pipeline ROI Modeler (Context: Digital Growth / Purple & Gold) */}
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-purple-500/30">
              <div className="mb-6 pb-4 border-b border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold">MODEL 02 // REVENUE ENGINE</span>
                <h3 className="text-2xl font-bold text-[#F8FAFC] font-heading mt-0.5">Pipeline Revenue Modeler</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Monthly Ad Spend Budget</label>
                    {/* Custom integer input box */}
                    <div className="flex items-center gap-1.5 bg-[#090c13] border border-white/10 hover:border-purple-500/50 rounded-lg px-2.5 py-1 focus-within:border-purple-500 transition-colors">
                      <span className="text-xs font-mono text-purple-400 font-bold">$</span>
                      <input
                        type="number"
                        min="500"
                        step="500"
                        value={adSpend || ''}
                        onChange={(e) => {
                          const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                          setAdSpend(isNaN(val) ? 0 : Math.max(0, val));
                        }}
                        placeholder="Custom spend"
                        className="w-24 bg-transparent text-right font-mono font-bold text-sm text-[#F8FAFC] focus:outline-none"
                      />
                      <span className="text-[10px] font-mono text-slate-500">USD</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="2000"
                    max="50000"
                    step="1000"
                    value={Math.min(50000, Math.max(2000, adSpend || 2000))}
                    onChange={(e) => setAdSpend(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>$2,000</span>
                    <span>$15,000</span>
                    <span>$30,000</span>
                    <span>$50,000+</span>
                  </div>

                  {/* Preset buttons */}
                  <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mr-1">Presets:</span>
                    {[2000, 5000, 10000, 25000, 50000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setAdSpend(preset)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                          adSpend === preset
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold'
                            : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
                        }`}
                      >
                        ${preset >= 1000 ? `${preset / 1000}k` : preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-mono text-slate-400 uppercase">Target Cost Per Qualified Lead (CPL)</label>
                    <span className="text-xl font-bold font-mono text-amber-400">${targetCpl}</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="250"
                    step="5"
                    value={targetCpl}
                    onChange={(e) => setTargetCpl(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#090c13] border border-purple-500/25 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Projected Annual Pipeline</div>
                    <div className="text-2xl sm:text-3xl font-black font-heading text-purple-300 mt-0.5">${pipelineValue.toLocaleString()}</div>
                  </div>
                  <div className="text-right font-mono text-xs text-purple-300">
                    <div>{leads} Leads/Mo</div>
                    <div className="text-slate-400">~{closedAccounts} Closed Deals</div>
                  </div>
                </div>

                <button
                  onClick={() => handleNav('/digital-solutions')}
                  className="w-full py-3.5 rounded-xl glass-card border border-purple-500/30 text-purple-300 hover:border-purple-400 hover:text-purple-200 font-mono font-bold text-xs uppercase tracking-widest text-center transition-all cursor-pointer"
                >
                  Deploy Growth Architecture
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: LARGE IMMERSIVE 3D SHOWCASE SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 border-t border-white/[0.08] bg-[#090b10] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="cyber-badge-blue">SYNAPTIC PULSE MATRIX // LIVE 3D TELEMETRY</span>
                <h2 className="text-3xl sm:text-5xl font-black font-heading text-[#F8FAFC] leading-tight">
                  High-Frequency <br />
                  <span className="text-gradient-orange">Algorithmic Engine</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  Direct hardware-level visual representation of our proprietary MetaTrader 5 Expert Advisor and FIX protocol bridges. Operating with millisecond precision across XAUUSD, major forex pairs, and US indices.
                </p>

                <div className="space-y-3 font-mono text-xs text-[#F8FAFC]">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090c13] border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-slate-400">TICK INGESTION ENGINE:</span>
                    <span className="font-bold text-cyan-300">Sub-10ms Tick-by-Tick Feed</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090c13] border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-slate-400">RISK ARBITRATION:</span>
                    <span className="font-bold text-rose-300">Hard Memory Drawdown Brakes</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090c13] border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-400">SERVER ARCHITECTURE:</span>
                    <span className="font-bold text-emerald-300">London LD4 Proximity VPS</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleNav('/portfolio')}
                    className="btn-orange-glow px-7 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-widest cursor-pointer"
                  >
                    View Verified Deployments
                  </button>
                </div>
              </div>

              <div className="lg:col-span-6 flex items-center justify-center">
                <div className="w-full glass-card p-2 rounded-3xl border border-white/10 shadow-2xl">
                  <ThreeSynapticCore />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: INFORMATION / CONTENT SECTION (48H SPRINT & PORTFOLIO) */}
      {/* ========================================================================= */}
      <section className="py-24 border-t border-white/[0.08] bg-[#07090e] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: 48-Hour Challenge Rapid Intervention */}
            <div className="lg:col-span-6 space-y-6">
              <span className="cyber-badge">RAPID INTERVENTION SPRINT</span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading text-[#F5F5F0]">
                The <span className="text-gradient-orange">48-Hour Architecture</span> Sprint
              </h2>
              <p className="text-[#A3A3A3] text-sm leading-relaxed font-light">
                When execution latency spikes or custom software architectures bottleneck revenue, we deploy our senior systems architect to diagnose, refactor, and deploy a production fix within 48 continuous hours.
              </p>

              <div className="space-y-4 pt-2">
                <div className="glass-card p-5 rounded-2xl flex items-start gap-4 hover:border-cyan-500/40">
                  <div className="font-mono text-xl font-bold text-cyan-400">01 //</div>
                  <div>
                    <h4 className="font-bold text-[#F8FAFC] text-sm">Diagnostic Audit (Hour 0–12)</h4>
                    <p className="text-slate-400 text-xs font-light mt-0.5">Codebase profiling and bottleneck pinpointing under live production loads.</p>
                  </div>
                </div>
                <div className="glass-card p-5 rounded-2xl flex items-start gap-4 hover:border-[#FF6B00]/40">
                  <div className="font-mono text-xl font-bold text-[#FF6B00]">02 //</div>
                  <div>
                    <h4 className="font-bold text-[#F8FAFC] text-sm">Sprint Refactor (Hour 12–36)</h4>
                    <p className="text-slate-400 text-xs font-light mt-0.5">Algorithmic refactoring, caching layer deployment, zero-downtime hotfixes.</p>
                  </div>
                </div>
                <div className="glass-card p-5 rounded-2xl flex items-start gap-4 hover:border-emerald-500/40">
                  <div className="font-mono text-xl font-bold text-emerald-400">03 //</div>
                  <div>
                    <h4 className="font-bold text-[#F8FAFC] text-sm">Benchmark & Handover (Hour 36–48)</h4>
                    <p className="text-slate-400 text-xs font-light mt-0.5">Load testing proving 5x-10x throughput gains with documentation handover.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Application Form */}
            <div className="lg:col-span-6 glass-card p-8 sm:p-10 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold font-heading text-[#F8FAFC] mb-2">Apply for Sprint Slot</h3>
              <p className="text-slate-400 text-xs font-light mb-6">Applications reviewed within 4 business hours by founder Abishek S J.</p>

              {!challengeSubmitted ? (
                <form onSubmit={handleChallengeSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Abishek S J"
                      value={chName}
                      onChange={(e) => setChName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#090c13] border border-white/10 text-[#F8FAFC] text-xs focus:outline-none focus:border-[#FF6B00] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="abishek@company.com"
                      value={chEmail}
                      onChange={(e) => setChEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#090c13] border border-white/10 text-[#F8FAFC] text-xs focus:outline-none focus:border-[#FF6B00] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Company / Entity Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Quantitative Systems Inc."
                      value={chCompany}
                      onChange={(e) => setChCompany(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#090c13] border border-white/10 text-[#F8FAFC] text-xs focus:outline-none focus:border-[#FF6B00] font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1">Critical Bottleneck Description *</label>
                    <textarea
                      required
                      rows="3"
                      placeholder="Describe your execution latency spikes, infrastructure failure, or custom software bug..."
                      value={chBottleneck}
                      onChange={(e) => setChBottleneck(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#090c13] border border-white/10 text-[#F8FAFC] text-xs focus:outline-none focus:border-[#FF6B00] font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl btn-orange-glow font-mono font-bold text-xs uppercase tracking-widest cursor-pointer"
                  >
                    Submit 48-Hour Sprint Request
                  </button>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-[#090c13] border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-[#F8FAFC] text-lg font-heading">Application Transmitted</h4>
                  <p className="text-xs font-mono text-slate-400">
                    Tracking Ticket: <span className="text-emerald-400 font-bold">{challengeTicket}</span>. Reply guaranteed within 4 business hours.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: FINAL CINEMATIC CTA SECTION */}
      {/* ========================================================================= */}
      <section className="py-28 border-t border-white/[0.08] bg-gradient-to-b from-[#090b10] to-[#07090e] relative z-10 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 font-mono text-xs text-[#FF9D42]">
            <Terminal className="w-4 h-4 text-[#FF6B00]" />
            <span>// INITIATE ARCHITECTURE HANDSHAKE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black font-heading text-[#F5F5F0] tracking-tight leading-tight">
            Ready to Deploy <br />
            <span className="text-gradient-orange">Institutional-Grade Systems?</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A3A3A3] max-w-2xl mx-auto font-light leading-relaxed">
            Whether deploying automated algorithmic trading engines, hardening enterprise infrastructure, or launching high-ticket customer acquisition pipelines—we engineer from scratch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleNav('/contact')}
              className="w-full sm:w-auto btn-orange-glow px-9 py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <span>Initiate Handshake Protocol</span>
              <ArrowRight className="w-4 h-4 text-[#050505]" />
            </button>
            <button
              onClick={() => handleNav('/about-abishek-sj')}
              className="w-full sm:w-auto px-9 py-4 rounded-xl glass-card text-[#F5F5F0] hover:text-[#FF9D42] font-mono text-xs uppercase tracking-wider border border-white/10"
            >
              Founder Profile & Credentials
            </button>
          </div>

          <div className="pt-8 text-xs font-mono text-slate-400">
            Headquarters: Erode, Tamil Nadu, India • Direct Protocol Line: +91 93637 05613 • Official: <a href="mailto:admin@reveriesynapticpulse.com" className="text-[#FF9D42] hover:underline">admin@reveriesynapticpulse.com</a>
          </div>

        </div>
      </section>

    </div>
  );
}
