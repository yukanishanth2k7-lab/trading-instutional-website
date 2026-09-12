import React, { useState } from 'react';
import {
  TrendingUp,
  Target,
  Search,
  PieChart,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Users,
  Activity,
  BarChart2
} from 'lucide-react';

export default function DigitalSolutionsPage({ navigate }) {
  const [adSpend, setAdSpend] = useState(50000); // INR per month
  const [targetCpl, setTargetCpl] = useState(450); // INR Cost per lead

  const estimatedLeads = Math.round(adSpend / targetCpl);
  const estimatedSales = Math.round(estimatedLeads * 0.12); // 12% closing rate
  const estimatedPipeline = estimatedSales * 15000; // avg contract value

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const steps = [
    {
      num: '01',
      title: 'Diagnose & Position',
      desc: 'We map your target market, isolate your highest-margin offer, and refine your core message for maximum commercial intent.'
    },
    {
      num: '02',
      title: 'Build Conversion Infrastructure',
      desc: 'High-speed landing pages with end-to-end attribution tracking, meta pixel server-side CAPI, and clean analytics.'
    },
    {
      num: '03',
      title: 'Launch, Measure & Scale',
      desc: 'Disciplined campaign testing across Google & Meta. Weekly reports showing cost-per-lead, pipeline generated, and net ROI.'
    }
  ];

  return (
    <div className="relative pt-24 pb-24 bg-[#07090e] text-[#F8FAFC]">
      {/* Subtle depth glow */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[300px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10 text-center">
        <div className="cyber-badge-purple inline-block mb-6">
          PERFORMANCE MARKETING & REVENUE ENGINES
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-black text-[#F8FAFC] tracking-tight leading-[1.1] max-w-4xl mx-auto">
          Generate qualified leads —{' '}
          <span className="text-gradient-orange">without wasted ad spend</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
          RSP runs performance-led marketing built around conversion tracking, clear messaging, and measurable outcomes.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleNav('/contact')}
            className="btn-orange-glow px-8 py-4 rounded-xl text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-3 transition-all cursor-pointer"
          >
            <span>Request Performance Audit</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </section>

      {/* Split: Who This Is For vs What We Do */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Who This Is For */}
          <div className="glass-card p-8 sm:p-10 border-l-4 border-l-[#FF6B00]">
            <div className="cyber-badge inline-block mb-4">WHO THIS IS FOR</div>
            <h3 className="font-heading text-2xl font-bold text-[#F5F5F0] mb-6">
              Designed for Revenue-Driven Teams
            </h3>
            <ul className="space-y-4 text-sm text-[#A3A3A3]">
              <li className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] mt-1.5 shrink-0" />
                <span><strong className="text-[#F5F5F0]">Local Service Businesses:</strong> Companies that need consistent, qualified inbound client leads week after week.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] mt-1.5 shrink-0" />
                <span><strong className="text-[#F5F5F0]">B2B & Industrial Teams:</strong> Companies generating website traffic but suffering from weak conversion rates and poor lead quality.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] mt-1.5 shrink-0" />
                <span><strong className="text-[#F5F5F0]">ROI-Conscious Founders:</strong> Leaders who want transparent reporting tied to revenue and signed contracts, not clicks and vanity metrics.</span>
              </li>
            </ul>
          </div>

          {/* What We Do */}
          <div className="glass-card p-8 sm:p-10 border-l-4 border-l-[#FFD166]">
            <div className="cyber-badge-gold inline-block mb-4">OUR DELIVERABLES</div>
            <h3 className="font-heading text-2xl font-bold text-[#F5F5F0] mb-6">
              What We Do
            </h3>
            <ul className="space-y-3 text-sm text-[#A3A3A3]">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#FFD166] shrink-0" />
                <span>Landing pages and conversion copy aligned to your highest-margin offer</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#FFD166] shrink-0" />
                <span>Paid campaigns (Meta & Google Ads) with server-side CAPI event tracking</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#FFD166] shrink-0" />
                <span>Commercial-intent SEO targeting buyers actively searching for your service</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#FFD166] shrink-0" />
                <span>Analytics setup: event funnels, attribution, and customer journey mapping</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#FFD166] shrink-0" />
                <span>Weekly executive reporting linking media spend directly to sales pipeline</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Lead & ROI Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="glass-card p-8 sm:p-12 border border-[#FF6B00]/30 bg-[#111111]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="cyber-badge inline-block mb-3">ROI MODELER</div>
            <h2 className="font-heading text-3xl font-bold text-[#F5F5F0]">
              Interactive Inbound Pipeline Modeler
            </h2>
            <p className="text-[#A3A3A3] text-sm mt-1 font-light">
              Estimate your qualified leads and pipeline generation based on monthly media allocation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex flex-wrap justify-between items-center gap-2 text-sm font-mono mb-2">
                  <span className="text-[#A3A3A3]">Monthly Ad Budget (INR):</span>
                  {/* Custom integer input box */}
                  <div className="flex items-center gap-1.5 bg-[#090c13] border border-white/10 hover:border-[#FF6B00]/50 rounded-lg px-2.5 py-1 focus-within:border-[#FF6B00] transition-colors">
                    <span className="text-xs font-mono text-[#FF9D42] font-bold">₹</span>
                    <input
                      type="number"
                      min="5000"
                      step="5000"
                      value={adSpend || ''}
                      onChange={(e) => {
                        const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                        setAdSpend(isNaN(val) ? 0 : Math.max(0, val));
                      }}
                      placeholder="Custom budget"
                      className="w-28 bg-transparent text-right font-mono font-bold text-sm text-[#FF6B00] focus:outline-none"
                    />
                    <span className="text-[10px] font-mono text-slate-500">INR</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="20000"
                  max="300000"
                  step="5000"
                  value={Math.min(300000, Math.max(20000, adSpend || 20000))}
                  onChange={(e) => setAdSpend(Number(e.target.value))}
                  className="w-full h-2 bg-stone-900 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
                />
                <div className="flex justify-between text-[11px] text-stone-500 font-mono mt-1">
                  <span>₹20,000</span>
                  <span>₹1,50,000</span>
                  <span>₹3,00,000+</span>
                </div>

                {/* Preset & Custom choices */}
                <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                  <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider mr-1">Presets:</span>
                  {[25000, 50000, 100000, 200000, 300000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAdSpend(preset)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                        adSpend === preset
                          ? 'bg-[#FF6B00]/20 text-[#FF9D42] border border-[#FF6B00]/40 font-bold'
                          : 'bg-white/5 text-stone-400 hover:text-white hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      ₹{preset.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-mono mb-2">
                  <span className="text-[#A3A3A3]">Estimated Cost Per Lead (CPL):</span>
                  <span className="font-bold text-[#FFD166]">₹{targetCpl}</span>
                </div>
                <input
                  type="range"
                  min="250"
                  max="1200"
                  step="50"
                  value={targetCpl}
                  onChange={(e) => setTargetCpl(Number(e.target.value))}
                  className="w-full h-2 bg-stone-900 rounded-lg appearance-none cursor-pointer accent-[#FFD166]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4 font-mono">
              <div className="glass-card p-5 border border-[#FF6B00]/20">
                <div className="text-xs text-[#A3A3A3]">ESTIMATED LEADS</div>
                <div className="text-3xl font-bold text-[#F5F5F0] mt-1">{estimatedLeads}</div>
                <div className="text-[10px] text-stone-500 mt-1">Qualified Inbound Leads / Mo</div>
              </div>

              <div className="glass-card p-5 border border-[#FFD166]/20">
                <div className="text-xs text-[#A3A3A3]">ESTIMATED DEALS</div>
                <div className="text-3xl font-bold text-[#FFD166] mt-1">{estimatedSales}</div>
                <div className="text-[10px] text-stone-500 mt-1">Based on 12% close rate</div>
              </div>

              <div className="glass-card p-5 border border-[#FF6B00]/30 col-span-2">
                <div className="text-xs text-[#FF9D42]">ESTIMATED PIPELINE VALUE</div>
                <div className="text-3xl font-bold text-[#FFD166] mt-1">₹{estimatedPipeline.toLocaleString()}</div>
                <div className="text-[10px] text-[#A3A3A3] mt-1">Assuming ₹15,000 average deal contract value</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="cyber-badge inline-block mb-3">THE PLAYBOOK</div>
          <h2 className="font-heading text-3xl font-bold text-[#F5F5F0]">
            How We Execute Campaigns
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="glass-card p-8">
              <div className="text-4xl font-mono font-bold text-[#FF6B00]/40 mb-3">{step.num}</div>
              <h4 className="font-heading font-bold text-[#F5F5F0] text-xl mb-3">{step.title}</h4>
              <p className="text-[#A3A3A3] text-xs leading-relaxed font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
