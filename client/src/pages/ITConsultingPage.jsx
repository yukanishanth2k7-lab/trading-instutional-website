import React from 'react';
import {
  Code,
  Terminal,
  Cpu,
  Database,
  ArrowRight,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Server,
  Workflow,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function ITConsultingPage({ navigate }) {
  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stack = [
    { name: 'React / Next.js', role: 'High-performance web frontends & portals' },
    { name: 'Python 3.10+', role: 'Automated data pipelines & algorithmic engines' },
    { name: 'Node.js / Express', role: 'Real-time REST APIs & microservices' },
    { name: 'PostgreSQL / Supabase', role: 'ACID-compliant relational data architecture' },
    { name: 'Flutter', role: 'Cross-platform mobile apps for iOS & Android' },
    { name: 'Docker / Linux', role: 'Containerized deployment & high-uptime hosting' }
  ];

  const servicePillars = [
    {
      title: 'End-to-End Web Applications',
      desc: 'SaaS platforms, client portals, and internal enterprise dashboards tailored to your exact operational workflows.',
      icon: Layers
    },
    {
      title: 'Backend APIs & Integrations',
      desc: 'Seamless connections across WhatsApp Business APIs, payment bridges, CRM databases, and accounting software.',
      icon: Server
    },
    {
      title: 'Performance & Security Hardening',
      desc: 'Eliminating recurring production bugs, slow page loads, database bottlenecks, and implementing strict RBAC security.',
      icon: ShieldCheck
    },
    {
      title: 'Data Pipelines & Live Dashboards',
      desc: 'Automating manual spreadsheet calculations into live, decision-ready analytics for executive leadership.',
      icon: Database
    }
  ];

  return (
    <div className="relative pt-24 pb-24 bg-[#07090e] text-[#F8FAFC]">
      {/* Subtle depth glow */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[300px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="cyber-badge-blue inline-block mb-6">
            IT CONSULTING & PRODUCTION SOFTWARE
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-black text-[#F8FAFC] tracking-tight leading-[1.1]">
            Custom Software Development &{' '}
            <span className="text-gradient-orange">IT Services</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light">
            From concept to deployment, we architect scalable systems that drive efficiency, automation, and growth. Clean code, robust infrastructure, lasting results.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleNav('/contact')}
              className="btn-orange-glow px-8 py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-3 transition-all cursor-pointer"
            >
              <span>Initiate Discovery Call</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => handleNav('/portfolio')}
              className="px-8 py-4 rounded-xl glass-card border border-white/10 text-[#F8FAFC] hover:text-[#FF6B00] font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Case Study: 80% Faster Onboarding</span>
              <ChevronRight className="w-4 h-4 text-[#FF6B00]" />
            </button>
          </div>
        </div>

        {/* Problem / Solution Split */}
        <div className="mt-20 glass-card p-8 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="max-w-3xl mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-4">
              Stop losing time to unreliable software and manual work
            </h2>
            <p className="text-slate-400 text-base leading-relaxed font-light">
              RSP builds production-grade software and automation for teams that need faster shipping, fewer failures, and a system that scales with growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                WHO WE PARTNER WITH
              </div>
              <ul className="space-y-3 text-sm text-[#A3A3A3]">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-1" />
                  <span>SMBs replacing spreadsheets and manual workflows with institutional software systems.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-1" />
                  <span>Startups scaling past MVP and needing solid architectural foundations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-1" />
                  <span>Growing teams experiencing recurring bugs, slow release cycles, or fragile integrations.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono text-[#FFD166] uppercase tracking-wider">
                PRODUCTION DELIVERABLES
              </div>
              <ul className="space-y-3 text-sm text-[#A3A3A3]">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FFD166] mt-2 shrink-0" />
                  <span>Custom web apps and internal tools (dashboards, portals, admin panels)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FFD166] mt-2 shrink-0" />
                  <span>Workflow automation and integrations (CRM, payments, WhatsApp, email)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FFD166] mt-2 shrink-0" />
                  <span>Security hardening, role-based permissions, and audit logging</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#FFD166] mt-2 shrink-0" />
                  <span>Complete codebase handover, documentation, and operational training</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="cyber-badge inline-block mb-3">CORE IT OFFERINGS</div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#F5F5F0]">
            Engineering Tailored to Business Outcomes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicePillars.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div key={idx} className="glass-card p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-heading font-bold text-[#F5F5F0] text-lg mb-2">
                    {srv.title}
                  </h4>
                  <p className="text-[#A3A3A3] text-xs leading-relaxed font-light">
                    {srv.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technology Stack Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 border-t border-[#FF6B00]/15">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="cyber-badge-gold inline-block mb-3">TECH STACK ARCHITECTURE</div>
          <h2 className="font-heading text-3xl font-bold text-[#F5F5F0]">
            Modern, Maintainable Technologies
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stack.map((item, idx) => (
            <div key={idx} className="glass-card p-4 text-center">
              <div className="font-mono font-bold text-[#F5F5F0] text-sm">{item.name}</div>
              <div className="text-[10px] text-[#A3A3A3] mt-1">{item.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step Process Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="glass-card p-8 sm:p-12 text-center max-w-4xl mx-auto border border-[#FF6B00]/30">
          <div className="text-xs font-mono text-[#FF9D42] tracking-widest uppercase mb-3">
            CLEAR MILESTONES • NO SURPRISES
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F5F0] mb-4">
            Ready to engineer reliable systems?
          </h3>
          <p className="text-[#A3A3A3] text-sm max-w-2xl mx-auto mb-8 font-light">
            Tell us about your project bottlenecks. We reply within 4 business hours with an architectural roadmap.
          </p>
          <button
            onClick={() => handleNav('/contact')}
            className="btn-orange-glow px-8 py-3.5 rounded-xl text-[#050505] font-mono text-xs uppercase tracking-wider font-bold"
          >
            Start Your Software Build
          </button>
        </div>
      </section>
    </div>
  );
}
