import React, { useState } from 'react';
import {
  Timer,
  AlertTriangle,
  Zap,
  Check,
  X,
  FileCheck,
  ShieldCheck,
  Send,
  Loader2,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { submitChallenge } from '../utils/api';

export default function ChallengePage({ navigate }) {
  const [formData, setFormData] = useState({
    yourName: '',
    emailAddress: '',
    mobileNumber: '',
    companyName: '',
    revenueRange: '₹50L - ₹2Cr',
    bottleneckDescription: '',
    preparedToExecute: true
  });
  const [customRevenue, setCustomRevenue] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const submissionData = {
        ...formData,
        revenueRange:
          formData.revenueRange === 'Custom'
            ? customRevenue
              ? `Custom: ${customRevenue}`
              : 'Custom Revenue'
            : formData.revenueRange
      };
      const res = await submitChallenge(submissionData);
      if (res.success) {
        setSubmitResult({
          type: 'success',
          message: res.message || 'Application submitted successfully. Diagnostic evaluation underway.',
          id: res.applicationId
        });
        setFormData({
          yourName: '',
          emailAddress: '',
          mobileNumber: '',
          companyName: '',
          revenueRange: '₹50L - ₹2Cr',
          bottleneckDescription: '',
          preparedToExecute: true
        });
        setCustomRevenue('');
      } else {
        setSubmitResult({
          type: 'error',
          message: res.error || 'Submission could not be completed.'
        });
      }
    } catch {
      setSubmitResult({
        type: 'error',
        message: 'Network error communicating with RSP challenge node.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToApply = () => {
    const el = document.getElementById('apply');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative pt-24 pb-24 bg-[#050505] text-[#F5F5F0]">
      {/* Background ambient glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#FF6B00]/15 rounded-full blur-[160px] pointer-events-none" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 relative z-10 text-center">
        <div className="text-xs font-mono tracking-[0.35em] text-[#A3A3A3] mb-6 uppercase">
          BUILT FOR COMPANIES THAT CANNOT AFFORD SLOW EXECUTION
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#F5F5F0] tracking-tight leading-[1.1] max-w-5xl mx-auto">
          Your Business Problem Isn’t Complex.<br />
          <span className="text-gradient-orange">It’s Just Not Solved Yet.</span>
        </h1>

        <p className="mt-8 text-lg sm:text-2xl text-[#A3A3A3] max-w-3xl mx-auto leading-relaxed font-light">
          Give us 48 hours. We’ll identify the real bottleneck, engineer a solution, and hand you a production-ready model.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToApply}
            className="btn-orange-glow px-8 py-4 rounded-xl text-[#050505] font-mono text-sm uppercase tracking-wider font-bold shadow-lg transition-all duration-300"
          >
            Request Access to Challenge
          </button>
        </div>

        <div className="mt-4 text-xs font-mono text-[#A3A3A3]">
          *Strict application filtering. High-velocity intervention protocol.
        </div>
      </section>

      {/* Access Gate Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="glass-card p-8 sm:p-12 text-center border border-[#FF6B00]/30 relative overflow-hidden bg-[#111111]">
          <div className="text-xs font-mono tracking-[0.35em] text-[#FF9D42] uppercase mb-3">
            ACCESS_GATE // CYCLE_01
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#F5F5F0] mb-6">
            Access Gate Status
          </h2>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/40 text-[#FFD166] font-mono text-lg font-bold mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping" />
            <span>APPLICATIONS OPEN — STRICT SELECTION ACTIVE</span>
          </div>
          <p className="text-[#A3A3A3] text-sm max-w-xl mx-auto leading-relaxed font-light">
            We are not onboarding standard agency clients. We are selecting high-impact operational challenges. Only a small number of businesses will be accepted in this cycle.
          </p>
        </div>
      </section>

      {/* The Real Cost of Your Bottleneck */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="glass-card p-8 sm:p-12 border border-white/10">
          <div className="text-xs font-mono tracking-[0.35em] text-[#FF9D42] uppercase mb-3">
            THE REAL COST
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#F5F5F0] mb-8">
            The Real Cost of Your Unsolved Bottleneck
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card p-5 border border-white/5 bg-white/[0.02]">
              <div className="text-[#FF6B00] font-mono text-sm">•</div>
              <div className="text-[#F5F5F0] font-semibold text-base mt-1">Revenue Leakage</div>
              <div className="text-[#A3A3A3] text-xs mt-1 font-light">Leads dropping off due to slow manual response or broken checkout.</div>
            </div>
            <div className="glass-card p-5 border border-white/5 bg-white/[0.02]">
              <div className="text-[#FF6B00] font-mono text-sm">•</div>
              <div className="text-[#F5F5F0] font-semibold text-base mt-1">Slow Decision Systems</div>
              <div className="text-[#A3A3A3] text-xs mt-1 font-light">Waiting days for manual Excel compilations to evaluate performance.</div>
            </div>
            <div className="glass-card p-5 border border-white/5 bg-white/[0.02]">
              <div className="text-[#FF6B00] font-mono text-sm">•</div>
              <div className="text-[#F5F5F0] font-semibold text-base mt-1">Inefficient Workflows</div>
              <div className="text-[#A3A3A3] text-xs mt-1 font-light">High-paid staff copying data between WhatsApp, sheets, and software.</div>
            </div>
            <div className="glass-card p-5 border border-white/5 bg-white/[0.02]">
              <div className="text-[#FF6B00] font-mono text-sm">•</div>
              <div className="text-[#F5F5F0] font-semibold text-base mt-1">Hidden Operational Friction</div>
              <div className="text-[#A3A3A3] text-xs mt-1 font-light">Compounding technical debt and missed enterprise opportunities.</div>
            </div>
          </div>

          <div className="mt-8 text-xl font-heading font-bold text-[#FFD166]">
            The longer it exists, the more it compounds.
          </div>
        </div>
      </section>

      {/* We Don't Consult. We Intervene. */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="cyber-badge inline-block mb-3">ACTION FIRST</div>
          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#F5F5F0]">
            We Don’t Consult. We Intervene.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 hover:-translate-y-1 transition-all border border-[#FF6B00]/20">
            <div className="text-xs font-mono tracking-[0.3em] text-[#FF6B00] mb-4">STEP_01</div>
            <h3 className="font-heading text-2xl font-bold text-[#F5F5F0] mb-3">Deconstruct</h3>
            <p className="text-[#A3A3A3] text-sm leading-relaxed font-light">
              We map your entire workflow, strip away the noise, and expose the actual failure point holding back scale.
            </p>
          </div>

          <div className="glass-card p-8 hover:-translate-y-1 transition-all border border-[#FF9D42]/20">
            <div className="text-xs font-mono tracking-[0.3em] text-[#FF9D42] mb-4">STEP_02</div>
            <h3 className="font-heading text-2xl font-bold text-[#F5F5F0] mb-3">Rebuild</h3>
            <p className="text-[#A3A3A3] text-sm leading-relaxed font-light">
              We engineer a custom software or automation solution designed exclusively for speed, reliability, and scale.
            </p>
          </div>

          <div className="glass-card p-8 hover:-translate-y-1 transition-all border border-[#FFD166]/20">
            <div className="text-xs font-mono tracking-[0.3em] text-[#FFD166] mb-4">STEP_03</div>
            <h3 className="font-heading text-2xl font-bold text-[#F5F5F0] mb-3">Deploy</h3>
            <p className="text-[#A3A3A3] text-sm leading-relaxed font-light">
              You receive something immediately usable in 48 hours — a live working system, not an abstract 50-page PDF.
            </p>
          </div>
        </div>
      </section>

      {/* Differentiation Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="glass-card p-8 sm:p-10 border border-white/10 overflow-hidden">
          <div className="text-xs font-mono tracking-[0.35em] text-[#A3A3A3] uppercase mb-3">
            DIFFERENTIATION MATRIX
          </div>
          <h2 className="font-heading text-3xl font-bold text-[#F5F5F0] mb-8">
            Why This Is Not Consulting
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[#A3A3A3]">
                  <th className="py-3 px-4 uppercase">Traditional Consulting</th>
                  <th className="py-3 px-4 uppercase text-[#FF9D42]">RSP 48-Hour Challenge</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-4 px-4 text-[#A3A3A3]">Weeks of theoretical analysis</td>
                  <td className="py-4 px-4 text-[#FFD166] font-semibold">48-Hour Rapid Execution</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-[#A3A3A3]">PowerPoint slide decks</td>
                  <td className="py-4 px-4 text-[#FFD166] font-semibold">Production-Ready Working Model</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-[#A3A3A3]">Theory-heavy recommendations</td>
                  <td className="py-4 px-4 text-[#FFD166] font-semibold">Implementation-First Engineering</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-[#A3A3A3]">Delayed, uncertain ROI</td>
                  <td className="py-4 px-4 text-[#FFD166] font-semibold">Immediate Operational Impact</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Elite Filter & Hard Rejection */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="glass-card p-8 border-l-4 border-l-[#FF6B00]">
            <div className="text-xs font-mono tracking-widest text-[#FF9D42] uppercase mb-3">
              ELITE FILTER
            </div>
            <h3 className="font-heading text-2xl font-bold text-[#F5F5F0] mb-6">
              Who Gets Accepted
            </h3>
            <ul className="space-y-4 text-sm text-[#A3A3A3]">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#FF6B00] shrink-0" />
                <span>Companies measurably losing revenue to operational friction</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#FF6B00] shrink-0" />
                <span>Founders and executives empowered to make decisions immediately</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#FF6B00] shrink-0" />
                <span>Teams ready to deploy and test within 48 hours</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-8 border-l-4 border-l-[#FFD166]">
            <div className="text-xs font-mono tracking-widest text-[#FFD166] uppercase mb-3">
              STANDARDS
            </div>
            <h3 className="font-heading text-xl font-bold text-[#F5F5F0] mb-4">
              High velocity demands mutual commitment and decisiveness.
            </h3>
            <p className="text-[#A3A3A3] text-xs leading-relaxed font-light">
              This is how we keep the 48-hour timeline real and protect our standard of execution. If your team is ready to solve the bottleneck, we begin immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section id="apply" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="glass-card p-8 sm:p-12 border border-[#FF6B00]/40 relative overflow-hidden">
          <div className="mb-8">
            <div className="cyber-badge inline-block mb-3">APPLICATION FORM</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#F5F5F0]">
              Request Access to the 48-Hour Challenge
            </h2>
            <p className="text-[#A3A3A3] text-sm mt-2 font-light">
              Answer concisely with focus on execution.
            </p>
          </div>

          {submitResult && (
            <div
              className={`p-4 rounded-xl mb-6 font-mono text-xs flex items-start gap-3 ${
                submitResult.type === 'success'
                  ? 'bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FFD166]'
                  : 'bg-red-500/10 border border-red-500/30 text-red-300'
              }`}
            >
              {submitResult.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold">{submitResult.message}</div>
                {submitResult.id && (
                  <div className="text-[11px] text-[#A3A3A3] mt-1">
                    Application Reference: {submitResult.id}
                  </div>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Abishek S J"
                  value={formData.yourName}
                  onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] mb-2">
                  Business Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] mb-2">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 93637 05613"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00]"
                />
                <div className="text-[10px] text-stone-500 mt-1 font-mono">
                  Used only for priority evaluation communication.
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A3A3A3] mb-2">
                  Company / Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Company Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-mono text-[#A3A3A3]">
                  Annual Revenue Range *
                </label>
                {formData.revenueRange === 'Custom' && (
                  <span className="text-[10px] font-mono text-[#FF9D42] uppercase tracking-wider">
                    Custom Revenue Mode
                  </span>
                )}
              </div>
              <select
                value={formData.revenueRange}
                onChange={(e) => setFormData({ ...formData, revenueRange: e.target.value })}
                className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00] font-mono"
              >
                <option value="₹10L - ₹50L">₹10 Lakhs - ₹50 Lakhs</option>
                <option value="₹50L - ₹2Cr">₹50 Lakhs - ₹2 Crores</option>
                <option value="₹2Cr - ₹10Cr">₹2 Crores - ₹10 Crores</option>
                <option value="₹10Cr+">₹10 Crores + / Enterprise</option>
                <option value="Confidential">Confidential / Global Scale</option>
                <option value="Custom">Custom Revenue Range...</option>
              </select>

              {formData.revenueRange === 'Custom' && (
                <div className="mt-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Enter custom annual revenue (e.g. ₹75 Lakhs, $1.5M, ₹50 Crore)"
                    value={customRevenue}
                    onChange={(e) => setCustomRevenue(e.target.value)}
                    className="w-full bg-[#050505] border border-[#FF6B00]/50 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00] font-mono text-xs placeholder:text-slate-600"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-[#A3A3A3] mb-2">
                Describe the exact bottleneck to eliminate in 48 hours *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Detail the failure point, manual process, software breakdown, or execution challenge..."
                value={formData.bottleneckDescription}
                onChange={(e) => setFormData({ ...formData, bottleneckDescription: e.target.value })}
                className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00]"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="commit"
                checked={formData.preparedToExecute}
                onChange={(e) => setFormData({ ...formData, preparedToExecute: e.target.checked })}
                className="mt-1 rounded bg-[#050505] border-white/10 text-[#FF6B00] focus:ring-[#FF6B00]"
              />
              <label htmlFor="commit" className="text-xs text-[#A3A3A3] leading-relaxed cursor-pointer font-light">
                I understand this is a high-intensity intervention. Our team is prepared to review the diagnosis and execute within 48 hours of contract signing under NDA.
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-orange-glow w-full py-4 rounded-xl text-[#050505] font-mono text-xs uppercase tracking-wider font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#050505]" />
                  <span>Submitting to Diagnostic Node...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#050505]" />
                  <span>Submit Application for 48-Hour Challenge</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
