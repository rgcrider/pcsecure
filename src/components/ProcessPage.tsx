import React from 'react';
import {
  Compass,
  Layout,
  Code2,
  CheckCircle2,
  Rocket,
  ShieldCheck,
  ArrowRight,
  Clock,
  Layers,
} from 'lucide-react';
import { AppRoute, CompanySettings } from '../types';

interface ProcessPageProps {
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
  onOpenProjectModal: (serviceName?: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({
  settings,
  onNavigate,
  onOpenProjectModal,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Strategy, Architecture & Discovery',
      duration: 'Week 1',
      icon: Compass,
      tagline: 'Laying the technical and commercial foundation before writing a line of code.',
      description:
        'We begin by analyzing your business goals, target customer personas, conversion funnels, and technical constraints. Together, we define a crystal-clear site architecture, URL taxonomy, and technology roadmap.',
      deliverables: [
        'Information architecture (IA) & site sitemap map',
        'Technical stack selection & third-party service audit',
        'Competitive teardown & conversion opportunity brief',
        'Project milestones and delivery schedule',
      ],
    },
    {
      num: '02',
      title: 'UI/UX Design Systems & Figma Prototypes',
      duration: 'Week 2',
      icon: Layout,
      tagline: 'Translating strategic objectives into intuitive, high-converting visual interfaces.',
      description:
        'We build a comprehensive Figma design system incorporating typography scales, color tokens, and atomic components. You review interactive, click-through desktop and mobile prototypes to experience the flow firsthand.',
      deliverables: [
        'Figma interactive prototypes with click-through states',
        'Atomic design system & typography / color tokens',
        'Mobile, tablet, and ultra-wide desktop layouts',
        '3 collaborative revision rounds included',
      ],
    },
    {
      num: '03',
      title: 'Modern Full-Stack Engineering',
      duration: 'Weeks 2 - 3',
      icon: Code2,
      tagline: 'Production-grade React, Next.js, and TypeScript engineering with zero shortcuts.',
      description:
        'Our engineers translate approved designs into pristine, semantic code. We implement clean state management, modular components, API integrations, and database schemas with strict TypeScript type-safety.',
      deliverables: [
        'Modular, maintainable TypeScript & React/Next.js codebase',
        'Integration with CMS, payment processors (Stripe/Digistore24), and APIs',
        'Accessible, keyboard-navigable ARIA semantic markup',
        'Continuous staging environment for transparent progress checks',
      ],
    },
    {
      num: '04',
      title: 'Quality Assurance & Speed Optimization',
      duration: 'Week 4',
      icon: CheckCircle2,
      tagline: 'Rigorous stress-testing, cross-browser audits, and sub-second performance tuning.',
      description:
        'Before any release, we run rigorous quality assurance: cross-browser compatibility across Safari, Chrome, Edge, and mobile WebKit, WCAG AA accessibility audits, and Core Web Vitals optimization.',
      deliverables: [
        '95+ Google PageSpeed Core Web Vitals benchmark score',
        'Cross-browser & multi-device functional validation matrix',
        'Automated 404 and redirect link verification',
        'Security hardening and SSL/HTTPS certificate validation',
      ],
    },
    {
      num: '05',
      title: 'Production Launch & 60-Day Warranty',
      duration: 'Launch & Beyond',
      icon: Rocket,
      tagline: 'Flawless DNS cutover, analytics telemetry, and dedicated post-launch engineering support.',
      description:
        'We handle zero-downtime DNS deployment, configure Google Search Console and sitemaps, verify analytics tags, and hand over complete repository access. Every engagement is backed by our 60-day post-launch warranty.',
      deliverables: [
        'Zero-downtime DNS configuration & live domain deployment',
        'Google Analytics 4 & Search Console verification',
        '100% intellectual property & Git repository transfer',
        '60-Day post-delivery bug-fix warranty & guarantee protection',
      ],
    },
  ];

  return (
    <div id="process-page" className="min-h-screen bg-slate-50/60 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            How We Deliver
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our 5-Stage Engineering & Design Methodology
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Predictable, transparent execution from kickoff to deployment. No black boxes, no unexpected delays, and zero technical debt.
          </p>
        </div>

        {/* Studio Process Visual */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xl max-w-5xl mx-auto aspect-[16/9] sm:aspect-[21/9]">
          <img
            src="/src/assets/images/agency_design_process_1790446924152.jpg"
            alt="PCSecure Engineering and Design Team Studio"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6 sm:p-10">
            <div className="text-white space-y-1 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Crafted In Michigan & Worldwide
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                Human-Centered Creative Architecture
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Every project is guided by senior engineers and designers focused on measurable commercial outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 hover:border-slate-300 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Step Index Badge */}
                  <div className="flex items-center gap-4 md:flex-col md:items-center shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold text-lg">
                      {step.num}
                    </div>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {step.duration}
                    </span>
                  </div>

                  {/* Step Details */}
                  <div className="space-y-4 flex-grow">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {step.title}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-blue-600 mt-1">
                        {step.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Milestone Deliverables
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {step.deliverables.map((item, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-slate-950 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Risk Commitment</span>
            </div>
            <h3 className="text-2xl font-bold">
              60-Day Satisfaction & Bug-Fix Warranty
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              If deliverables do not meet agreed technical specifications and design milestones, you are covered by our 60-day money-back guarantee.
            </p>
          </div>
          <button
            onClick={() => onOpenProjectModal()}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition shrink-0"
          >
            Start a Project With Us
          </button>
        </div>
      </div>
    </div>
  );
};
