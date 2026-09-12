import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Bot,
  LayoutDashboard,
  Shield,
  Layers,
  Sparkles,
  Code2,
  Landmark,
  Factory,
  Globe,
  Building2,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  X,
  Activity,
  Cpu,
  Zap,
  Settings,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function PortfolioPage({ navigate }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Case Studies from live site https://www.reveriesynapticpulse.com/portfolio
  const featuredProjects = [
    {
      id: 'proppass-ai',
      category: 'ai',
      categoryLabel: 'AI Trading Platform',
      badgeClass: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
      gradientBar: 'from-purple-500 to-pink-500',
      icon: LayoutDashboard,
      iconColor: 'text-purple-400 bg-purple-500/10',
      title: '3x faster reviews for funded traders using AI journaling',
      summary:
        '3x Review Speed | Trading / Prop Firms | Full-stack product build + AI workflows | A process-first platform that improves consistency with structured, data-backed feedback loops.',
      metrics: [
        { label: 'Review Speed', value: '3x', note: 'Faster debrief' },
        { label: 'Consistency', value: '+25%', note: 'Win-rate discipline' }
      ],
      tags: ['React', 'TypeScript', 'Supabase', 'OpenAI API'],
      client: 'Prop Trading Community',
      problem:
        'Funded prop traders struggled to identify recurring behavioral traps and tilt triggers across hundreds of daily trades, causing account breach within 30 days.',
      solution:
        'Engineered an intelligent journaling engine that ingests MT4/MT5 statement exports, detects psychological bias via custom NLP models, and calculates real-time risk-of-ruin curves.',
      results: [
        '3x faster trade debrief cycles with auto-tagged candlestick entries',
        '25% measured increase in adherence to strict daily stop-loss rules',
        'Adopted by 1,200+ active funded account participants'
      ]
    },
    {
      id: 'ai-insurance-platform',
      category: 'ai',
      categoryLabel: 'Hackathon Prototype',
      badgeClass: 'text-teal-400 border-teal-500/30 bg-teal-500/10',
      gradientBar: 'from-teal-500 to-cyan-500',
      icon: Shield,
      iconColor: 'text-teal-400 bg-teal-500/10',
      title: '60% support reduction for insurers using AI self-service',
      summary:
        '60% Support Reduction | Insurance / InsurTech | AI app prototype + UX flow design | Reduced manual support dependency with guided policy discovery and claim workflows.',
      metrics: [
        { label: 'Support Reduction', value: '60%', note: 'Tier-1 deflected' },
        { label: 'Decision Speed', value: '3x', note: 'Automated triage' }
      ],
      tags: ['TypeScript', 'JavaScript', 'CSS', 'Python NLP'],
      client: 'InsurTech Hackathon',
      problem:
        'Insurers waste thousands of operational hours answering routine coverage queries and reviewing incomplete initial claim dossiers.',
      solution:
        'Built an AI-guided self-service conversational engine with contextual document verification, instant policy gap analysis, and automated claim pre-authorization.',
      results: [
        '60% reduction in repetitive tier-1 customer support inquiries',
        '3x faster claim decision speed through automated document checklist checks',
        'Award-winning interactive user experience prototype'
      ]
    },
    {
      id: 'algo-trading-systems',
      category: 'algo',
      categoryLabel: 'Production',
      badgeClass: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
      gradientBar: 'from-blue-500 to-cyan-500',
      icon: TrendingUp,
      iconColor: 'text-cyan-400 bg-cyan-500/10',
      title: '89% win rate for Forex traders using SMC automation',
      summary:
        '89% Win Rate | Trading / FX | Algorithmic strategy engineering + risk systems | Rules-based execution with audited performance and strict drawdown controls.',
      metrics: [
        { label: 'Win Rate', value: '89%', note: 'Audited forward run' },
        { label: '5-Day Returns', value: '21%', note: 'Compound gain' }
      ],
      tags: ['MQL4', 'MQL5', 'Python', 'TradingView Pine Script'],
      client: 'Funded FX Accounts',
      problem:
        'Discretionary FX traders frequently fall victim to emotional intervention during London/NY open volatility, blowing proprietary firm drawdown caps.',
      solution:
        'Codified Smart Money Concepts (SMC) order-flow algorithms with automated Fair Value Gap (FVG) detection, liquidity sweep triggers, and hard-coded 3% max daily loss circuit breakers.',
      results: [
        'Audited 89.4% win rate across EURUSD and GBPUSD pairs',
        'Achieved 21% net returns over a 5-day audited forward test',
        'Sub-15ms deterministic execution latency via MT4/MT5 bridges'
      ]
    },
    {
      id: 'fintech-dashboard',
      category: 'fintech',
      categoryLabel: 'Active',
      badgeClass: 'text-pink-400 border-pink-500/30 bg-pink-500/10',
      gradientBar: 'from-purple-500 to-pink-500',
      icon: Layers,
      iconColor: 'text-pink-400 bg-pink-500/10',
      title: '+40% engagement for finance users using a gamified PWA',
      summary:
        '95% User Satisfaction | Fintech / Consumer | Product engineering + analytics dashboards | Improved daily usage by turning financial planning into a habit loop.',
      metrics: [
        { label: 'User Satisfaction', value: '95%', note: 'NPS verified' },
        { label: 'Engagement', value: '+40%', note: 'Daily active sessions' }
      ],
      tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      client: 'Consumer Fintech',
      problem:
        'Traditional personal finance and budget trackers suffer massive day-7 churn due to dry, spreadsheet-like interfaces.',
      solution:
        'Engineered a high-performance progressive web app (PWA) incorporating VibeCoding principles: micro-reward animations, dynamic progress streaks, and personalized financial insights.',
      results: [
        '40% surge in daily active user (DAU) retention month-over-month',
        '95% user satisfaction rating across beta tester cohorts',
        'Offline-first capabilities with sub-1 second loading speed'
      ]
    },
    {
      id: 'rsp-platform',
      category: 'fintech',
      categoryLabel: 'Wealth Tech',
      badgeClass: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
      gradientBar: 'from-blue-500 to-indigo-500',
      icon: Sparkles,
      iconColor: 'text-indigo-400 bg-indigo-500/10',
      title: '80% faster onboarding for wealth clients using portfolio automation',
      summary:
        '98% Client Retention | Wealth Management | Platform engineering + automation | Centralized dashboards and automated reporting reduced manual effort and improved transparency.',
      metrics: [
        { label: 'Client Retention', value: '98%', note: 'Annualized' },
        { label: 'Efficiency', value: '3x', note: 'Back-office operations' }
      ],
      tags: ['React', 'Node.js', 'PostgreSQL', 'Express'],
      client: 'HNW Portfolio Desk',
      problem:
        'Manual client reporting and ad-hoc trade verification created significant operational overhead and delayed investor updates.',
      solution:
        'Architected a non-custodial wealth portal integrating read-only investor credential feeds, automated daily PDF performance tear sheets, and transparent risk metric tracking.',
      results: [
        '80% reduction in client onboarding and verification cycle time',
        '98% client retention achieved through automated real-time transparency',
        'Full compliance with Indian regulatory and global data privacy standards'
      ]
    },
    {
      id: 'tradingview-indicators',
      category: 'algo',
      categoryLabel: 'Published',
      badgeClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
      gradientBar: 'from-emerald-500 to-green-500',
      icon: Code2,
      iconColor: 'text-emerald-400 bg-emerald-500/10',
      title: '500+ active users for traders using custom Pine indicators',
      summary:
        '500+ Active Users | Trading / Analytics | Indicator engineering + UX visualization | Improved setup detection speed with clearer chart overlays and alerts.',
      metrics: [
        { label: 'Active Users', value: '500+', note: 'TradingView community' },
        { label: 'Scripts Published', value: '15+', note: 'Proprietary suite' }
      ],
      tags: ['Pine Script v5', 'TradingView', 'Technical Analysis'],
      client: 'Trading Community',
      problem:
        'Discretionary technical traders faced chart clutter and delayed signal confirmation using generic lagging indicators.',
      solution:
        'Programmed a suite of 15+ institutional Pine Script v5 indicators incorporating automated Premium/Discount Fibonacci arrays, liquidity pool sweeps, and webhook alert triggers.',
      results: [
        '500+ active daily traders actively running the indicator suite',
        '4.9/5 community rating for signal precision and visual clarity',
        'Integrated webhook alerts enabling automated webhook-to-broker execution'
      ]
    },
    {
      id: 'aurivex-gold-trading',
      category: 'algo',
      categoryLabel: 'Production',
      badgeClass: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      gradientBar: 'from-amber-500 to-yellow-500',
      icon: Bot,
      iconColor: 'text-amber-400 bg-amber-500/10',
      title: '100% precision entries for XAUUSD using dual-engine automation',
      summary:
        '100% Entry Precision | Trading / Gold (XAUUSD) | Automated bot engineering + risk systems | Institutional-grade dual-engine bot with 100% precision entries and strict drawdown controls.',
      metrics: [
        { label: 'Entry Precision', value: '100%', note: 'Deterministic rules' },
        { label: 'Risk:Reward', value: '1:2', note: 'Standard scalp ratio' }
      ],
      tags: ['Python 3.10+', 'MetaTrader5 API', 'Pandas', 'NumPy'],
      client: 'Aurivex Trading Protocol',
      problem:
        'Gold (XAUUSD) exhibits extreme micro-volatility and false breakouts during London/NY overlaps that quickly wipe out retail stop losses.',
      solution:
        'Engineered Aurivex — a dual-engine algorithmic automaton combining microstructure order-flow telemetry with macro liquidity sweep confirmation, executing directly via MT5 API.',
      results: [
        'Deterministic entry execution eliminating manual emotional lag',
        'Dynamic lot sizing based on real-time ATR volatility',
        'Strict drawdown safety cap safeguarding non-custodial capital'
      ]
    }
  ];

  // Client Web & Digital Solutions (Featured in "Our Work" on live portfolio)
  const clientProjects = [
    {
      id: 'maasaathuvaan',
      title: 'Maasaathuvaan Trading Institution',
      category: 'Business Website',
      sector: 'Trading Institution',
      icon: Landmark,
      gradientBar: 'from-amber-500 to-orange-500',
      iconColor: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white',
      badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      description:
        'Full website for a respected trading institution — showcasing services, courses, and investor resources with a professional, trust-first design.',
      tech: ['React', 'Modern UI/UX', 'SEO Optimization']
    },
    {
      id: 'grindex',
      title: 'Grindex',
      category: 'Company Website',
      sector: 'Industrial Manufacturing',
      icon: Factory,
      gradientBar: 'from-blue-500 to-cyan-500',
      iconColor: 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white',
      badgeClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      description:
        'Professional web presence for Grindex — a clean, modern corporate site built to establish credibility, highlight capabilities, and drive business inquiries.',
      tech: ['Full-Stack', 'Responsive Design', 'Lead Capture']
    },
    {
      id: 'ictc',
      title: 'ICTC',
      category: 'Corporate Website',
      sector: 'Calibration & Testing Services',
      icon: Globe,
      gradientBar: 'from-emerald-500 to-teal-500',
      iconColor: 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white',
      badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      description:
        'Corporate website built for ICTC — featuring service overviews, team profiles, and a streamlined contact flow optimized for lead generation.',
      tech: ['Corporate Architecture', 'Service Portals', 'Performance Tuning']
    },
    {
      id: 'proppass-showcase',
      title: 'PropPass AI',
      category: 'AI Trading Platform',
      sector: 'Fintech & Prop Trading',
      icon: LayoutDashboard,
      gradientBar: 'from-purple-500 to-pink-500',
      iconColor: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
      badgeClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      description:
        'AI-powered trading journal and analytics platform that helps traders track performance, analyze setups, and build consistency with structured, data-driven insights.',
      tech: ['AI Analytics', 'Supabase', 'TypeScript']
    }
  ];

  // Filtering
  const filteredProjects = featuredProjects.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'algo') return p.category === 'algo';
    if (activeTab === 'fintech') return p.category === 'fintech';
    if (activeTab === 'ai') return p.category === 'ai';
    return true;
  });

  return (
    <div className="relative pt-24 pb-24 bg-[#050505] text-[#F5F5F0]">
      {/* Background Accent Glows */}
      <div className="absolute top-10 left-1/4 w-[650px] h-[450px] bg-[#FF6B00]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF6B00]/30 bg-[#FF6B00]/10 mb-5">
          <span className="h-2 w-2 rounded-full bg-[#FF6B00] animate-ping" />
          <span className="text-xs font-mono uppercase tracking-widest text-[#FF9D42] font-semibold">
            Case Studies &amp; Projects
          </span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-black text-[#F5F5F0] tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Featured <span className="text-gradient-orange">Projects &amp; Case Studies</span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
          Explore RSP&apos;s portfolio of successful projects, from automated trading systems to full-stack web applications and AI-powered solutions.
        </p>

        {/* Live Portfolio Telemetry Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mt-10">
          <div className="p-4 rounded-xl border border-white/10 bg-[#0d111a]/80 backdrop-blur-xl text-center">
            <div className="text-2xl sm:text-3xl font-black font-heading text-cyan-400">89%</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">SMC Win Rate</div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#0d111a]/80 backdrop-blur-xl text-center">
            <div className="text-2xl sm:text-3xl font-black font-heading text-[#FF9D42]">3x</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">Review Speed</div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#0d111a]/80 backdrop-blur-xl text-center">
            <div className="text-2xl sm:text-3xl font-black font-heading text-emerald-400">60%</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">Support Reduction</div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#0d111a]/80 backdrop-blur-xl text-center">
            <div className="text-2xl sm:text-3xl font-black font-heading text-amber-400">100%</div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mt-1">Gold Precision</div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {[
            { id: 'all', label: 'All Systems' },
            { id: 'algo', label: 'Algorithmic Trading' },
            { id: 'fintech', label: 'FinTech & SaaS' },
            { id: 'ai', label: 'AI Automation' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'btn-orange-glow text-[#050505]'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Projects Grid (Matches Live Site) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="group relative glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Accent Gradient Bar */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.gradientBar}`} />

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header: Icon & Category */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-3 rounded-xl ${project.iconColor} border border-white/10`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-[11px] font-mono px-3 py-1 rounded-full border font-semibold tracking-wider ${project.badgeClass}`}>
                        {project.categoryLabel}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 group-hover:text-[#FF9D42] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    {/* Subtitle / Summary */}
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                      {project.summary}
                    </p>

                    {/* Highlight Metric Cards */}
                    <div className="grid grid-cols-2 gap-3 mb-6 bg-black/40 border border-white/5 rounded-xl p-4">
                      {project.metrics.map((metric, idx) => (
                        <div key={idx}>
                          <div className="text-xl sm:text-2xl font-black font-heading text-white">
                            {metric.value}
                          </div>
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/5 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-semibold text-[#FF9D42] hover:text-white transition-colors cursor-pointer"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleNav('/contact')}
                        className="text-xs font-mono px-3.5 py-1.5 rounded-lg border border-white/10 hover:border-[#FF6B00]/40 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        Inquire Build
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sector Overview: Who We Serve (From Live Site) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-white/5">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 font-mono text-xs uppercase tracking-wider mb-3">
            Client Sectors
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Who We Serve
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            RSP partners with small and medium businesses, service-industry operators, and manufacturing companies who need reliable software and business automation — not enterprise bloat. We&apos;ve delivered custom solutions for clients across calibration services, industrial manufacturing, trading education, and more.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card p-6 text-center border border-white/10 hover:border-[#FF6B00]/40 transition-all">
            <Landmark className="w-8 h-8 text-[#FF6B00] mx-auto mb-3" />
            <div className="font-heading font-bold text-white text-base">ICTC</div>
            <div className="text-xs font-mono text-slate-400 mt-1">Calibration &amp; Testing Services</div>
          </div>
          <div className="glass-card p-6 text-center border border-white/10 hover:border-[#FF6B00]/40 transition-all">
            <Factory className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <div className="font-heading font-bold text-white text-base">Grindex</div>
            <div className="text-xs font-mono text-slate-400 mt-1">Industrial Manufacturing</div>
          </div>
          <div className="glass-card p-6 text-center border border-white/10 hover:border-[#FF6B00]/40 transition-all">
            <Building2 className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <div className="font-heading font-bold text-white text-base">Maasaathuvaan</div>
            <div className="text-xs font-mono text-slate-400 mt-1">Trading Institution</div>
          </div>
          <div className="glass-card p-6 text-center border border-white/10 hover:border-[#FF6B00]/40 transition-all">
            <Globe className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <div className="font-heading font-bold text-white text-base">Athira</div>
            <div className="text-xs font-mono text-slate-400 mt-1">Service Industry</div>
          </div>
        </div>
      </section>

      {/* "Our Work" Web & Digital Deliveries (From Live Site) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-white/5">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#FF9D42] font-mono text-xs uppercase tracking-wider mb-3">
            Digital Platforms
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            Production Web Deployments
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            High-converting digital presence and custom portals engineered for SMB credibility and customer growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientProjects.map((client) => {
            const Icon = client.icon;
            return (
              <div
                key={client.id}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-300 flex flex-col justify-between p-6 relative group"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${client.gradientBar}`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${client.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${client.badgeClass}`}>
                      {client.category}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-[#FF9D42] transition-colors">
                    {client.title}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {client.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {client.tech.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Approach (3-Step Execution) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-white/5">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300 font-mono text-xs uppercase tracking-wider mb-3">
            Methodology
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Approach
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            A structured, transparent methodology that takes your project from idea to live product — with no surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-[#FF6B00]/40 transition-all">
            <div className="absolute top-4 right-4 text-5xl font-heading font-black text-white/5 group-hover:text-[#FF6B00]/10 transition-colors">
              01
            </div>
            <CheckCircle2 className="w-7 h-7 text-[#FF6B00] mb-4" />
            <h3 className="font-heading text-lg font-bold text-white mb-2">Understand</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We start by mapping your current workflows and bottlenecks to identify where automation and custom software will deliver the highest impact.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-[#FF6B00]/40 transition-all">
            <div className="absolute top-4 right-4 text-5xl font-heading font-black text-white/5 group-hover:text-cyan-500/10 transition-colors">
              02
            </div>
            <Cpu className="w-7 h-7 text-cyan-400 mb-4" />
            <h3 className="font-heading text-lg font-bold text-white mb-2">Build</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Our team designs, develops, and tests your solution using modern frameworks — delivering clean, production-grade code with continuous feedback loops.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-[#FF6B00]/40 transition-all">
            <div className="absolute top-4 right-4 text-5xl font-heading font-black text-white/5 group-hover:text-emerald-500/10 transition-colors">
              03
            </div>
            <Zap className="w-7 h-7 text-emerald-400 mb-4" />
            <h3 className="font-heading text-lg font-bold text-white mb-2">Deploy &amp; Iterate</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We launch, monitor, and refine. Every project includes post-launch support to ensure your software and automation systems perform reliably at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Core Strengths */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-white/5">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-3">
            Core Strengths
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            The pillars that define our approach and drive exceptional outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-[#FF6B00]/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF9D42] mb-4">
              <Settings className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-white text-base mb-2">System-First Execution</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Process-driven frameworks that eliminate guesswork and ensure consistent, repeatable results.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-white text-base mb-2">Risk &amp; Structure</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Built on institutional-grade risk management principles that protect and preserve capital.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-amber-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
              <ArrowUpRight className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-white text-base mb-2">Scalable Architecture</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Systems designed to grow with your ambitions, from startup to enterprise scale.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-white text-base mb-2">Unified Ecosystem</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Finance, technology, and marketing working in harmony under one strategic vision.
            </p>
          </div>
        </div>
      </section>

      {/* Built in Tamil Nadu, Delivered Across India (From Live Site) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 text-center">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-[#FF6B00]/30 bg-[#0d111a]/90 backdrop-blur-2xl">
          <MapPin className="w-10 h-10 text-[#FF6B00] mx-auto mb-4 animate-bounce" />
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
            Built in Tamil Nadu, Delivered Across India
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-light">
            Reverie Synaptic Pulse is headquartered in Dharmapuri, Tamil Nadu, with delivery capabilities spanning Coimbatore, Chennai, Bangalore, and clients nationwide. As a Tamil Nadu–based software company, RSP combines local market understanding with global engineering standards. We work with SMBs who value direct communication, fast turnaround, and software that solves real operational problems — not inflated consulting engagements. Whether you need AI automation for a manufacturing workflow or a custom web application for your service business, RSP delivers from India, for India.
          </p>
        </div>
      </section>

      {/* Master Closing CTA (From Live Site) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 text-center">
        <div className="p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-[#0d111a] to-[#07090e] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF6B00]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Built for <span className="text-gradient-orange">long-term partnerships</span>,<br />
            not short-term hype.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Reverie Synaptic Pulse (RSP) is capable of building, managing, and scaling trading systems, technology platforms, and digital brands through disciplined, data-backed execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleNav('/contact')}
              className="w-full sm:w-auto btn-orange-glow px-8 py-4 rounded-xl text-xs font-mono uppercase tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Initiate Architecture Discussion</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => handleNav('/48-hour-challenge')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl glass-card text-white hover:text-[#FF6B00] font-mono text-xs uppercase tracking-wider border border-white/10 hover:border-[#FF6B00]/40 transition-all cursor-pointer"
            >
              Apply for 48-Hour Sprint
            </button>
          </div>
        </div>
      </section>

      {/* Deep Dive Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="glass-card bg-[#0d111a] border border-[#FF6B00]/40 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl shadow-[#FF6B00]/20">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-mono px-3 py-1 rounded-full border font-semibold tracking-wider ${selectedProject.badgeClass}`}>
                {selectedProject.categoryLabel}
              </span>
              <span className="text-xs font-mono text-slate-400">
                // {selectedProject.client}
              </span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-white mb-4 leading-snug">
              {selectedProject.title}
            </h3>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-6 bg-black/50 border border-white/10 rounded-xl p-4">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx}>
                  <div className="text-2xl font-black font-heading text-[#FF9D42]">
                    {m.value}
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
                    {m.label}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {m.note}
                  </div>
                </div>
              ))}
            </div>

            {/* Problem & Solution */}
            <div className="space-y-4 mb-6 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#FF9D42] font-semibold mb-1">
                  The Problem
                </h4>
                <p className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                  {selectedProject.problem}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-1">
                  Engineering Solution
                </h4>
                <p className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                  {selectedProject.solution}
                </p>
              </div>
            </div>

            {/* Key Deliverables */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                Measurable Impact &amp; Deliverables
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {selectedProject.results.map((res, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                Tech Stack &amp; Protocols
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t, idx) => (
                  <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setSelectedProject(null);
                  handleNav('/contact');
                }}
                className="w-full sm:w-auto flex-1 btn-orange-glow py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Similar Architecture</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs uppercase tracking-wider cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
