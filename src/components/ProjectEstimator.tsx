import React, { useState } from 'react';
import {
  Calculator,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  Check,
  Code2,
  Clock,
  ShieldCheck,
  Cpu,
  Palette,
  ShoppingCart,
  Zap,
} from 'lucide-react';

interface ProjectEstimatorProps {
  onOpenProjectModal: (serviceName?: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onOpenProjectModal }) => {
  // Project Type
  const [projectType, setProjectType] = useState<'custom-website' | 'ecommerce' | 'web-app' | 'redesign'>('custom-website');

  // Scale / Page Scope
  const [scale, setScale] = useState<'starter' | 'growth' | 'enterprise'>('growth');

  // Interactive Capabilities Add-ons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    'figma-tokens',
    'core-web-vitals',
  ]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const projectTypes = [
    {
      id: 'custom-website',
      name: 'Custom Website Design',
      desc: 'Bespoke corporate identity & marketing presence',
      icon: Palette,
      baseTimeline: '2-3 Weeks',
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce Storefront',
      desc: 'High-converting online store & checkout',
      icon: ShoppingCart,
      baseTimeline: '3-4 Weeks',
    },
    {
      id: 'web-app',
      name: 'Custom Web Application',
      desc: 'SaaS portals, user auth & interactive logic',
      icon: Layers,
      baseTimeline: '4-6 Weeks',
    },
    {
      id: 'redesign',
      name: 'Website Redesign',
      desc: 'Modern overhaul of an outdated legacy site',
      icon: Zap,
      baseTimeline: '2-3 Weeks',
    },
  ];

  const scaleOptions = [
    {
      id: 'starter',
      label: 'Core (1 - 5 Pages)',
      desc: 'Essential high-impact foundation for emerging businesses',
      timelineModifier: '2 Weeks',
    },
    {
      id: 'growth',
      label: 'Growth (6 - 12 Pages)',
      desc: 'Full conversion funnels, case studies & service hubs',
      timelineModifier: '3-4 Weeks',
    },
    {
      id: 'enterprise',
      label: 'Platform (15+ Pages / Modules)',
      desc: 'Extensive multi-page architecture with custom CMS',
      timelineModifier: '4-6 Weeks',
    },
  ];

  const addonOptions = [
    {
      id: 'figma-tokens',
      name: 'Production Figma Design System',
      desc: 'Component library with reusable typography & color tokens',
    },
    {
      id: 'core-web-vitals',
      name: 'Sub-500ms Speed Guarantee',
      desc: 'Guaranteed 95+ Google PageSpeed score and zero layout shift',
    },
    {
      id: 'cms-integration',
      name: 'Headless CMS Integration',
      desc: 'Self-serve blog, portfolio, and marketing content management',
    },
    {
      id: 'api-database',
      name: 'Custom API & Third-Party Integrations',
      desc: 'Stripe, CRM webhooks, analytics, and SQL database connections',
    },
  ];

  // Dynamic calculations
  const currentType = projectTypes.find((p) => p.id === projectType)!;
  const currentScale = scaleOptions.find((s) => s.id === scale)!;

  const estimatedTimeline =
    scale === 'starter'
      ? '10 - 14 Days'
      : scale === 'growth'
      ? '3 - 4 Weeks'
      : '4 - 6 Weeks';

  return (
    <section id="project-estimator" className="py-20 sm:py-28 bg-[#F6F9FC] border-b border-slate-100 w-full">
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF4FF] text-[#0875E1] text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE PROJECT SCOPE BUILDER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
            Plan Your Digital Build in Real-Time.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Select your project parameters below to see an instant architectural roadmap, timeline estimate, and deliverables scope.
          </p>
        </div>

        {/* Interactive Scope Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Select Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0875E1] block">
                01. Select Project Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypes.map((type) => {
                  const isSelected = projectType === type.id;
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setProjectType(type.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-white border-[#0875E1] shadow-md ring-2 ring-[#0875E1]/20'
                          : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#0875E1] text-white'
                            : 'bg-[#EAF4FF] text-[#0875E1]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-sm font-bold text-[#0B1F3A] leading-snug">
                          {type.name}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {type.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Page Scope & Scale */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0875E1] block">
                02. Project Scale &amp; Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {scaleOptions.map((opt) => {
                  const isSelected = scale === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setScale(opt.id as any)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#0875E1] shadow-md ring-2 ring-[#0875E1]/20'
                          : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#0B1F3A]">{opt.label}</div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                        {opt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Add-on Capabilities */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0875E1] block">
                03. Architectural Add-ons &amp; Enhancements
              </label>
              <div className="space-y-2.5">
                {addonOptions.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'bg-white border-[#0875E1] shadow-xs'
                          : 'bg-white/60 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs font-bold text-[#0B1F3A]">{addon.name}</div>
                        <div className="text-[11px] text-slate-500">{addon.desc}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition ${
                          isChecked
                            ? 'bg-[#0875E1] border-[#0875E1] text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time Scope Summary Card (Span 5) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-2xl sm:rounded-3xl bg-[#07172F] text-white p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Live Scope Calculation
                  </span>
                  <h3 className="text-lg font-extrabold text-white">
                    {currentType.name}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#0875E1] flex items-center justify-center text-white">
                  <currentType.icon className="w-5 h-5" />
                </div>
              </div>

              {/* Estimated Turnaround Time */}
              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    Estimated Production Timeline
                  </span>
                  <span className="text-emerald-400 font-bold">Guaranteed SLA</span>
                </div>
                <div className="text-2xl font-extrabold text-white font-mono">
                  {estimatedTimeline}
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  From initial discovery kickoff to staging URL and production launch.
                </p>
              </div>

              {/* Included Specifications Breakdown */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="font-bold text-white text-[11px] uppercase tracking-wider">
                  Scope Specifications
                </div>
                <ul className="space-y-2 text-[11px] text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{currentScale.label}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Next.js, React &amp; Strict TypeScript Engineering</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Responsive Testing on Mobile, Tablet &amp; Desktop</span>
                  </li>
                  {selectedAddons.map((addonId) => {
                    const addon = addonOptions.find((a) => a.id === addonId);
                    return (
                      <li key={addonId} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#0875E1] shrink-0" />
                        <span>{addon?.name}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* 60-Day Guarantee Notice */}
              <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Protected by PCSecure's 60-Day Money-Back Guarantee</span>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenProjectModal(`${currentType.name} (${currentScale.label})`)}
                className="w-full py-4 px-6 rounded-xl bg-[#0875E1] hover:bg-[#0766c5] active:bg-[#0658a8] text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Lock In This Scope &amp; Proposal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
