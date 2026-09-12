import React, { useState } from 'react';
import {
  Terminal,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  Loader2,
  ArrowRight,
  Linkedin,
  Twitter,
  Instagram,
  Github
} from 'lucide-react';
import { submitContact } from '../utils/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'Algorithmic Trading EA & Systems',
    budget: '₹50k - ₹2L',
    message: ''
  });
  const [customBudget, setCustomBudget] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponse(null);

    try {
      const submissionData = {
        ...formData,
        budget: formData.budget === 'Custom' ? (customBudget ? `Custom: ${customBudget}` : 'Custom Budget') : formData.budget
      };
      const res = await submitContact(submissionData);
      if (res.success) {
        setResponse({
          type: 'success',
          message: res.message,
          id: res.inquiryId
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: 'Algorithmic Trading EA & Systems',
          budget: '₹50k - ₹2L',
          message: ''
        });
        setCustomBudget('');
      } else {
        setResponse({
          type: 'error',
          message: res.error || 'Transmission could not be established.'
        });
      }
    } catch (err) {
      setResponse({
        type: 'error',
        message: 'Could not connect to RSP infrastructure node. Try direct WhatsApp or Email.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative pt-24 pb-24 bg-[#050505] text-[#F5F5F0]">
      {/* Orange Glow */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[400px] bg-[#FF6B00]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="cyber-badge inline-block mb-4">
            HANDSHAKE PROTOCOL // 4-HOUR RESPONSE SLA
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-black text-[#F5F5F0] tracking-tight leading-[1.1]">
            Get in <span className="text-gradient-orange">Touch</span>
          </h1>
          <p className="mt-6 text-lg text-[#A3A3A3] leading-relaxed font-light">
            Tell us what you’re building (or fixing). Reverie Synaptic Pulse responds within 4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Handshake Terminal & Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Terminal Card */}
            <div className="glass-card p-6 border border-[#FF6B00]/30 font-mono text-xs text-[#F5F5F0]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10 text-stone-500">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF9D42] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFD166] inline-block" />
                <span className="text-[11px] text-[#A3A3A3] ml-2">rsp-terminal@gateway</span>
              </div>
              <div className="space-y-1.5 text-[#FF9D42]">
                <div>// INITIATE HANDSHAKE PROTOCOL</div>
                <div>// AWAITING INCOMING TRANSMISSION</div>
                <div className="text-[#FFD166]">// ENCRYPTION: TLS 1.3 AES-256 ENABLED</div>
                <div className="text-[#A3A3A3] pt-2">// STATUS: READY_FOR_DISCOVERY</div>
              </div>
            </div>

            {/* Direct Connect Details */}
            <div className="glass-card p-8 border border-white/10 space-y-6">
              <h3 className="font-heading text-xl font-bold text-[#F5F5F0]">
                Ready to Scale?
              </h3>
              <p className="text-[#A3A3A3] text-xs leading-relaxed font-light">
                Whether you need algorithmic trading systems, robust tech infrastructure, or a dominant digital presence, Reverie Synaptic Pulse (RSP) is your strategic partner.
              </p>

              <div className="space-y-4 text-xs font-mono text-[#F5F5F0] pt-2">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#A3A3A3] text-[10px] uppercase">Official Email</div>
                    <a
                      href="mailto:admin@reveriesynapticpulse.com"
                      className="text-[#F5F5F0] hover:text-[#FF9D42] transition-colors"
                    >
                      admin@reveriesynapticpulse.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#FF9D42] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#A3A3A3] text-[10px] uppercase">Direct WhatsApp</div>
                    <a
                      href="https://wa.me/919363705613"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#F5F5F0] hover:text-[#FFD166] transition-colors"
                    >
                      +91 93637 05613
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#FFD166] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#A3A3A3] text-[10px] uppercase">Headquarters</div>
                    <div className="text-[#A3A3A3]">Dharmapuri, Tamil Nadu 636701, India</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-400 text-[10px] uppercase">Turnaround Guarantee</div>
                    <div className="text-slate-300">Response within 4 business hours</div>
                  </div>
                </div>
              </div>

              {/* Official Social Network Transmission Nodes */}
              <div className="pt-4 border-t border-white/10">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3">
                  Official Channels & Protocols
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <a
                    href="https://www.linkedin.com/company/reverie-synaptic-pulse/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl glass-card border border-white/10 hover:border-[#0A66C2]/40 text-slate-300 hover:text-white flex items-center gap-2 transition-all group"
                  >
                    <Linkedin className="w-4 h-4 text-[#0A66C2] shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://x.com/ReverieP81720"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl glass-card border border-white/10 hover:border-white/40 text-slate-300 hover:text-white flex items-center gap-2 transition-all group"
                  >
                    <Twitter className="w-4 h-4 text-white shrink-0" />
                    <span>X (Twitter)</span>
                  </a>
                  <a
                    href="https://www.instagram.com/reverie_synaptic_pulse"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl glass-card border border-white/10 hover:border-[#E4405F]/40 text-slate-300 hover:text-white flex items-center gap-2 transition-all group"
                  >
                    <Instagram className="w-4 h-4 text-[#E4405F] shrink-0" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://github.com/asj07"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl glass-card border border-white/10 hover:border-[#FF6B00]/40 text-slate-300 hover:text-white flex items-center gap-2 transition-all group"
                  >
                    <Github className="w-4 h-4 text-[#FF6B00] shrink-0" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Handshake Protocol Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 border border-[#FF6B00]/30">
              <div className="text-xs font-mono tracking-widest text-[#FF9D42] uppercase mb-2">
                TRANSMISSION FORM
              </div>
              <h3 className="font-heading text-2xl font-bold text-[#F5F5F0] mb-6">
                Tell Us What You Want to Build
              </h3>

              {response && (
                <div
                  className={`p-4 rounded-xl mb-6 font-mono text-xs flex items-start gap-3 ${
                    response.type === 'success'
                      ? 'bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-[#FFD166]'
                      : 'bg-red-500/10 border border-red-500/30 text-red-300'
                  }`}
                >
                  {response.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold">{response.message}</div>
                    {response.id && (
                      <div className="text-[11px] text-[#A3A3A3] mt-1">
                        Inquiry Reference Code: {response.id}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-[#A3A3A3] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Johnathan Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#A3A3A3] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-[#A3A3A3] mb-1.5">
                      Mobile / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 93637 05613"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#A3A3A3] mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Your Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-[#A3A3A3] mb-1.5">
                      Service Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00] font-mono text-xs"
                    >
                      <option value="Algorithmic Trading EA & Systems">Algorithmic Trading (MT5 EA)</option>
                      <option value="IT Consulting & Custom Software">Custom Software / Web Platform</option>
                      <option value="48-Hour Business Challenge">48-Hour Business Intervention</option>
                      <option value="Digital Marketing & Lead Generation">Digital Solutions & Funnels</option>
                      <option value="General Strategic Consultation">General Strategic Consultation</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-mono text-[#A3A3A3]">
                        Estimated Project Budget
                      </label>
                      {formData.budget === 'Custom' && (
                        <span className="text-[10px] font-mono text-[#FF9D42] uppercase tracking-wider">
                          Custom Value Mode
                        </span>
                      )}
                    </div>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00] font-mono text-xs"
                    >
                      <option value="₹50k - ₹2L">₹50,000 - ₹2 Lakhs ($600 - $2,500)</option>
                      <option value="₹2L - ₹6L">₹2 Lakhs - ₹6 Lakhs ($2,500 - $7,500)</option>
                      <option value="₹6L - ₹20L">₹6 Lakhs - ₹20 Lakhs ($7,500 - $25,000)</option>
                      <option value="₹20L+">₹20 Lakhs+ / Enterprise ($25k+)</option>
                      <option value="Custom">Custom Budget Amount...</option>
                    </select>

                    {formData.budget === 'Custom' && (
                      <div className="mt-2.5">
                        <input
                          type="text"
                          required
                          placeholder="Enter custom budget (e.g. ₹15 Lakhs or $12,500)"
                          value={customBudget}
                          onChange={(e) => setCustomBudget(e.target.value)}
                          className="w-full bg-[#050505] border border-[#FF6B00]/50 rounded-lg px-4 py-2.5 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00] font-mono text-xs placeholder:text-slate-600"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A3A3A3] mb-1.5">
                    Project Scope / Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the systems you need automated, your current trading strategy, or existing technical bottlenecks..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-orange-glow w-full py-4 rounded-xl text-[#050505] font-mono text-xs uppercase tracking-wider font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#050505]" />
                      <span>Transmitting via Handshake Protocol...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#050505]" />
                      <span>Transmit Project Transmission</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
