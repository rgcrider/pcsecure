import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, Mail, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { CompanySettings, AppRoute } from '../types';

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
  preselectedService?: string;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({
  isOpen,
  onClose,
  settings,
  onNavigate,
  preselectedService,
}) => {
  const [projectType, setProjectType] = useState<string>(preselectedService || 'Custom Website Design');
  const [budgetRange, setBudgetRange] = useState<string>('$3,000 - $5,000');
  const [timeline, setTimeline] = useState<string>('3-4 Weeks');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [projectDetails, setProjectDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const projectTypes = [
    'Custom Website Design',
    'Full-Stack Web Development',
    'E-Commerce Storefront',
    'Custom Web Application',
    'Website Redesign',
    'SEO & Performance Sprint',
  ];

  const budgetOptions = [
    'Under $1,500',
    '$1,500 - $3,000',
    '$3,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000+',
  ];

  const timelineOptions = ['Urgent (< 2 weeks)', '3-4 Weeks', '1-2 Months', 'Flexible'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 sm:px-8 py-6 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>PCSecure Project Scoping</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Start Your Digital Project
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Tell us about your objectives. We will prepare an architectural roadmap and proposal within 24 hours.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="text-2xl font-bold text-slate-900">
                Inquiry Received Successfully!
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thank you, <span className="font-semibold text-slate-800">{clientName}</span>. Your project parameters for <strong className="text-blue-700">{projectType}</strong> have been assigned to our lead solutions architect.
              </p>
              <p className="text-xs text-slate-500">
                A formal scope breakdown and preliminary technical estimate will be dispatched to <strong>{clientEmail}</strong> within 1 business day.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2 text-slate-700">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Need urgent assistance? Call our Michigan studio:</span>
              </div>
              <p className="text-sm font-bold text-slate-900 pl-6">
                {settings.phoneNumber || '(810) 331-0605'}
              </p>
              <p className="text-slate-500 pl-6">
                Email: {settings.supportEmail || 'support@pcsecure.tech'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition"
              >
                Close Window
              </button>
              <button
                onClick={() => {
                  onClose();
                  onNavigate({ type: 'products' });
                }}
                className="px-6 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-semibold text-sm hover:bg-blue-100 transition"
              >
                Explore Fixed-Price Packages
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Service Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
                1. Select Primary Service Focus
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg text-left transition border ${
                      projectType === type
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Budget & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  2. Target Investment Budget
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  3. Desired Completion Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  {timelineOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Contact Information */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                4. Your Contact Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Work Email Address *"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Company or Organization"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your project, reference links, current challenges, or specific requirements..."
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Footer & Submit */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protected by PCSecure 60-Day Satisfaction Warranty & Non-Disclosure.</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition flex items-center justify-center gap-2"
                >
                  <span>Submit Project Scope</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
