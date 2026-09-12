import React from 'react';
import {
  Code2,
  Terminal,
  Award,
  Cpu,
  TrendingUp,
  Briefcase,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Mail,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function AboutFounderPage({ navigate }) {
  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const projects = [
    {
      title: 'Aurivex: XAUUSD Dual-Engine Trading Bot',
      badge: 'Production EA',
      metric: '100% Precision Entries',
      metricSub: '1:2 Scalp Risk:Reward',
      desc: 'Institutional-grade dual-engine bot developed for Gold (XAUUSD) with strict drawdown controls, order flow detection, and millisecond execution.',
      stack: ['Python 3.10+', 'MetaTrader 5 API', 'Pandas', 'NumPy'],
      color: 'border-[#FF6B00]/40'
    },
    {
      title: 'SMC Forex Automation System',
      badge: 'Production Engine',
      metric: '89.4% Win Rate',
      metricSub: '21% 5-Day Returns',
      desc: 'Algorithmic strategy engineering codifying Smart Money Concepts (SMC) & ICT order-block theory into rules-based execution with strict drawdown guards.',
      stack: ['MQL5', 'MQL4', 'Python', 'TradingView'],
      color: 'border-[#FF9D42]/40'
    },
    {
      title: 'PropPass AI: Intelligent Trading Journal',
      badge: 'Fintech Platform',
      metric: '3x Review Speed',
      metricSub: '+25% Trader Consistency',
      desc: 'AI-powered trading journal and performance analytics platform that helps traders audit setups, track psychological tilt, and pass funded challenges.',
      stack: ['React', 'TypeScript', 'Supabase', 'OpenAI'],
      color: 'border-[#FFD166]/40'
    },
    {
      title: 'RSP Wealth Platform',
      badge: 'Wealth Tech',
      metric: '80% Faster Onboarding',
      metricSub: '98% Client Retention',
      desc: 'Centralized investor dashboards, non-custodial capital tracking, and automated daily PDF reporting reducing manual administrative burden.',
      stack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      color: 'border-[#FF6B00]/40'
    },
    {
      title: 'TradingView Pine Script Suite',
      badge: 'Public Analytics',
      metric: '500+ Active Users',
      metricSub: '15+ Custom Indicators',
      desc: 'Institutional market liquidity overlays, Fair Value Gap (FVG) detectors, and session range indicators engineered for high-precision traders.',
      stack: ['Pine Script v5', 'TradingView Webhooks'],
      color: 'border-[#FF9D42]/40'
    },
    {
      title: 'InsurTech AI Self-Service Platform',
      badge: 'Hackathon Prototype',
      metric: '60% Support Reduction',
      metricSub: '3x Decision Speed',
      desc: 'Guided policy discovery and automated claim processing system reducing manual customer support dependencies.',
      stack: ['TypeScript', 'JavaScript', 'CSS', 'NLP'],
      color: 'border-[#FFD166]/40'
    }
  ];

  const milestones = [
    {
      period: '2026 - Present',
      role: 'Bot Developer',
      entity: 'Aurivex',
      desc: 'Created the Aurivex automated Trading bot for XAUUSD.'
    },
    {
      period: '2024',
      role: 'Software Developer',
      entity: 'Fintech Projects',
      desc: 'Building innovative financial applications using modern web technologies. Specializing in VibeCoding methodologies for enhanced user engagement.'
    },
    {
      period: '2024',
      role: 'Algorithmic Trading Specialist',
      entity: 'Independent Consultant',
      desc: 'Developing advanced trading systems and providing mentorship. Created automated finance trackers and led 14-day forex mentorship programs.'
    },
    {
      period: '2023',
      role: 'Founder & CEO',
      entity: 'Reverie Synaptic Pulse (RSP)',
      desc: 'Leading a fintech startup specializing in algorithmic trading and portfolio management. Built proprietary algorithms with 89% win rate and managing 10+ client portfolios.'
    }
  ];

  return (
    <div className="relative pt-24 pb-24 bg-[#07090e] text-[#F8FAFC]">
      {/* Subtle depth glow */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[300px] bg-[#FF6B00]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Profile Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10">
        <div className="glass-card p-8 sm:p-12 border border-[#FF6B00]/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Avatar / Bio */}
            <div className="lg:col-span-8 space-y-5">
              <div className="cyber-badge inline-block">
                FOUNDER PROFILE // ABISHEK S J
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl font-black text-[#F5F5F0] tracking-tight">
                Abishek S J
              </h1>
              <div className="text-sm font-mono text-[#FF9D42]">
                Founder & Lead Systems Architect, Reverie Synaptic Pulse
              </div>

              <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-light">
                Computer Science student turned fintech entrepreneur. Combining deep algorithmic engineering with financial innovation to democratize access to institutional-grade trading systems and high-impact software for Indian SMBs.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => handleNav('/contact')}
                  className="btn-orange-glow px-6 py-3 rounded-xl text-[#050505] font-mono text-xs uppercase tracking-wider font-bold shadow-lg flex items-center gap-2"
                >
                  <span>Initiate Direct Line</span>
                  <ArrowRight className="w-4 h-4 text-[#050505]" />
                </button>
                <a
                  href="https://github.com/asj07"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl glass-card border border-white/10 text-slate-400 hover:text-white hover:border-[#FF6B00]/40 transition-colors"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/reverie-synaptic-pulse/"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl glass-card border border-white/10 text-slate-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 transition-colors"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/ReverieP81720"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl glass-card border border-white/10 text-slate-400 hover:text-white hover:border-white/40 transition-colors"
                  aria-label="Twitter / X"
                  title="Twitter / X"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/reverie_synaptic_pulse"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl glass-card border border-white/10 text-slate-400 hover:text-[#E4405F] hover:border-[#E4405F]/40 transition-colors"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="mailto:admin@reveriesynapticpulse.com"
                  className="p-3 rounded-xl glass-card border border-white/10 text-slate-400 hover:text-[#FF6B00] hover:border-[#FF6B00]/40 transition-colors"
                  aria-label="Official Email"
                  title="Email admin@reveriesynapticpulse.com"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Metrics Badge Column */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4 font-mono text-center">
              <div className="glass-card p-4 border border-[#FF6B00]/25">
                <div className="text-2xl font-bold text-[#FF6B00]">89.4%</div>
                <div className="text-[10px] text-[#A3A3A3] mt-1 uppercase">Algo Win Rate</div>
              </div>
              <div className="glass-card p-4 border border-[#FF9D42]/25">
                <div className="text-2xl font-bold text-[#FF9D42]">500+</div>
                <div className="text-[10px] text-[#A3A3A3] mt-1 uppercase">Traders Reached</div>
              </div>
              <div className="glass-card p-4 border border-[#FFD166]/25">
                <div className="text-2xl font-bold text-[#FFD166]">48h</div>
                <div className="text-[10px] text-[#A3A3A3] mt-1 uppercase">Rapid Intervene</div>
              </div>
              <div className="glass-card p-4 border border-white/10">
                <div className="text-2xl font-bold text-[#F5F5F0]">100%</div>
                <div className="text-[10px] text-[#A3A3A3] mt-1 uppercase">Non-Custodial</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entrepreneurial Vision & Technical Expertise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 sm:p-10 border-l-4 border-l-[#FF6B00]">
            <h3 className="font-heading text-2xl font-bold text-[#F5F5F0] mb-4">
              Entrepreneurial Vision
            </h3>
            <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6 font-light">
              As Founder & CEO of Reverie Synaptic Pulse, I am engineering the future of automated trading and portfolio intelligence. Our mission is to democratize access to institutional-grade algorithmic models through uncompromising technology.
            </p>
            <ul className="space-y-3 text-xs text-[#A3A3A3] font-mono">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#FF6B00]" />
                <span>Zero guesswork — purely data-driven decision frameworks</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#FF6B00]" />
                <span>Client capital safety via institutional non-custodial rules</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#FF6B00]" />
                <span>Continuous R&D in sub-millisecond market structure analysis</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 sm:p-10 border-l-4 border-l-[#FFD166]">
            <h3 className="font-heading text-2xl font-bold text-[#F5F5F0] mb-4">
              Technical Expertise
            </h3>
            <p className="text-[#A3A3A3] text-sm leading-relaxed mb-6 font-light">
              Specialized in Smart Money Concepts (SMC) and Inner Circle Trader (ICT) market mechanics, I develop high-speed algorithmic Expert Advisors in MQL5, Python, and Pine Script alongside production-ready React web platforms.
            </p>
            <ul className="space-y-3 text-xs text-[#A3A3A3] font-mono">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#FFD166]" />
                <span>MQL5 & MetaTrader 5 API custom EA engineering</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#FFD166]" />
                <span>Modern component architecture for rapid UX & frontend builds</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#FFD166]" />
                <span>Advanced quantitative backtesting & slippage modeling</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="cyber-badge inline-block mb-3">ENGINEERED BUILDS</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#F5F5F0]">
            Featured Systems & Systems Architecture
          </h2>
          <p className="mt-3 text-[#A3A3A3] text-sm font-light">
            Audited fintech platforms, automated trading bots, and internal tools with proven real-world outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <div key={idx} className={`glass-card p-6 flex flex-col justify-between border ${proj.color}`}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#A3A3A3] border border-white/5">
                    {proj.badge}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-mono font-bold text-[#FFD166]">
                      {proj.metric}
                    </span>
                  </div>
                </div>

                <h4 className="font-heading font-bold text-[#F5F5F0] text-lg mb-2">
                  {proj.title}
                </h4>
                <p className="text-[#A3A3A3] text-xs leading-relaxed mb-6 font-light">
                  {proj.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {proj.stack.map((s, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-stone-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Journey */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-white/[0.08]">
        <div className="text-center mb-12">
          <div className="cyber-badge inline-block mb-3">TRAJECTORY // CAREER PATH</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-[#F8FAFC]">
            Professional Journey
          </h2>
          <p className="mt-2 text-slate-400 text-sm font-light">
            Chronological evolution of proprietary algorithmic systems, bot engineering, and executive leadership.
          </p>
        </div>

        <div className="space-y-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start hover:border-[#FF6B00]/40 transition-all">
              <div className="shrink-0 font-mono text-xs text-[#FF9D42] bg-[#FF6B00]/10 px-3.5 py-1.5 rounded-lg border border-[#FF6B00]/30 font-bold">
                {m.period}
              </div>
              <div className="flex-1">
                <h4 className="font-heading font-bold text-[#F8FAFC] text-xl">{m.role}</h4>
                <div className="text-xs font-mono text-[#FFD166] mb-2 font-medium">{m.entity}</div>
                <p className="text-slate-300 text-sm leading-relaxed font-light">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
