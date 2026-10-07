import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { CompanySettings, AppRoute } from '../types';
import { BrandLogo } from './BrandLogo';

interface ContactPageProps {
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
  onOpenProjectModal?: (serviceName?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  settings,
  onNavigate,
  onOpenProjectModal,
}) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    serviceInterest: 'Custom Website Design',
    orderId: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="contact-page" className="min-h-screen bg-slate-50/60 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Let's Collaborate
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact PCSecure
          </h1>
          <p className="text-base text-slate-600">
            Whether you are scoping a custom web design project, inquiring about our turnkey packages, or requesting guarantee assistance, we are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
              <div>
                <BrandLogo size="md" theme="light" showSubtitle={true} />
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-100">
                {/* Telephone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Direct Telephone
                    </span>
                    <a
                      href="tel:8103310605"
                      className="text-sm font-bold text-slate-900 hover:text-blue-600 transition"
                    >
                      (810) 331-0605
                    </a>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Available Monday - Friday during standard studio hours.
                    </p>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Customer &amp; Project Support
                    </span>
                    <a
                      href={`mailto:${settings.supportEmail || 'support@pcsecure.tech'}`}
                      className="text-sm font-bold text-blue-600 hover:underline"
                    >
                      {settings.supportEmail || 'support@pcsecure.tech'}
                    </a>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      For new projects, scope inquiries, and guarantee requests.
                    </p>
                  </div>
                </div>

                {/* Office Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Studio Address
                    </span>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      9585 Pottawatamie Dr<br />
                      Manitou Beach, MI 49253<br />
                      United States
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      Studio Hours
                    </span>
                    <p className="text-sm text-slate-800">
                      Monday - Friday: 9:00 AM - 6:00 PM EST
                    </p>
                  </div>
                </div>
              </div>

              {/* 60-Day Guarantee Notice */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-slate-700 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>60-Day Guarantee Customer Care</span>
                </div>
                <p>
                  All refund requests or support questions submitted via this form are acknowledged and processed within 24 business hours in compliance with our 60-day refund policy.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Send Our Engineering Desk a Message
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill out the parameters below and a senior solutions consultant will get back to you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950">
                    Inquiry Dispatched Successfully
                  </h4>
                  <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto">
                    Thank you, {formState.name}! Your message has been routed to our project intake desk. A team member will reply to <strong>{formState.email}</strong> within 1 business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        phone: '',
                        serviceInterest: 'Custom Website Design',
                        orderId: '',
                        message: '',
                      });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-200/60 hover:bg-emerald-200 transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Primary Topic / Service
                      </label>
                      <select
                        value={formState.serviceInterest}
                        onChange={(e) =>
                          setFormState({ ...formState, serviceInterest: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      >
                        <option value="Custom Website Design">Custom Website Design</option>
                        <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                        <option value="E-Commerce Development">E-Commerce Development</option>
                        <option value="Custom Web Applications">Custom Web Applications</option>
                        <option value="SEO & Performance Optimization">SEO &amp; Performance</option>
                        <option value="Order & Guarantee Support">Order &amp; Guarantee Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="(810) 331-0605"
                        className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Digistore24 Order ID (If requesting order assistance)
                    </label>
                    <input
                      type="text"
                      value={formState.orderId}
                      onChange={(e) => setFormState({ ...formState, orderId: e.target.value })}
                      placeholder="e.g. #DS-992144"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Message Details *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Please describe your project, timelines, or question in detail..."
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </button>

                  <div className="pt-2 text-[11px] text-slate-500 leading-relaxed space-y-1">
                    <p>
                      By providing your phone number and submitting this form, you consent to receive transactional SMS notifications from {settings.companyName} regarding your inquiry and project milestones. Message frequency varies. Message and data rates may apply.
                    </p>
                    <p>
                      Reply <strong>STOP</strong> to cancel or <strong>HELP</strong> for assistance. Mobile information and SMS consent will not be shared with third parties or affiliates for marketing or promotional purposes. See our{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate({ type: 'legal', page: 'privacy-policy' })}
                        className="text-blue-600 underline font-medium hover:text-blue-800 cursor-pointer"
                      >
                        Privacy Policy
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={() => onNavigate({ type: 'legal', page: 'terms' })}
                        className="text-blue-600 underline font-medium hover:text-blue-800 cursor-pointer"
                      >
                        Terms &amp; Conditions
                      </button>
                      .
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
