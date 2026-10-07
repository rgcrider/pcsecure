import React from 'react';
import {
  Code2,
  Palette,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Users,
  Award,
} from 'lucide-react';
import { CompanySettings, AppRoute } from '../types';
import { BrandLogo } from './BrandLogo';

interface AboutPageProps {
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
  onOpenProjectModal?: (serviceName?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  settings,
  onNavigate,
  onOpenProjectModal,
}) => {
  return (
    <div id="about-page" className="min-h-screen bg-slate-50/60 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center">
            <BrandLogo size="lg" theme="light" showSubtitle={false} />
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            About Our Studio
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engineering High-Performance Digital Experiences
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {settings.companyName} is a boutique web design and development company headquartered in Michigan, dedicated to crafting custom digital solutions that elevate ambitious brands.
          </p>
        </div>

        {/* Studio Process Visual */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9] bg-slate-900">
          <img
            src="/src/assets/images/agency_design_process_1790446924152.jpg"
            alt="PCSecure Design and Engineering Studio"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Narrative & Philosophy Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Our Mission &amp; Engineering Philosophy
          </h2>
          <p className="text-slate-700 leading-relaxed text-base">
            Modern businesses cannot afford to rely on sluggish, generic website templates or fragmented freelancers who leave behind unmaintainable code. At <strong>PCSecure</strong>, we bridge the gap between creative visual artistry and strict software engineering rigor.
          </p>
          <p className="text-slate-700 leading-relaxed text-base">
            From bespoke Figma UI/UX architecture and conversion psychology to production Next.js, React, and TypeScript builds, our solutions are engineered for sub-second page loads, effortless responsiveness across all viewport sizes, and search engine dominance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            <div className="space-y-1">
              <span className="text-3xl font-extrabold text-blue-600 tabular-nums">
                60 Days
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Satisfaction Guarantee
              </p>
              <p className="text-xs text-slate-500">
                100% money-back protection on all packages and digital products.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                100%
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Client Code Ownership
              </p>
              <p className="text-xs text-slate-500">
                Complete intellectual property transfer with zero proprietary lock-in.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl font-extrabold text-emerald-600 tabular-nums">
                &lt; 500ms
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Speed Target
              </p>
              <p className="text-xs text-slate-500">
                Strict adherence to Google Core Web Vitals and PageSpeed benchmarks.
              </p>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Conversion-Centric UI/UX</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We design structured layout systems in Figma centered around visitor psychology, clear visual hierarchy, and strategic CTA placement.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Modern Full-Stack Code</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every interface is built using typed TypeScript, clean CSS architecture, semantic HTML5, and automated build pipelines.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Engineering Reliability</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All deliveries are covered by our 60-day post-launch bug warranty, 60-day money-back guarantee, and Digistore24 authorization.
            </p>
          </div>
        </div>

        {/* Michigan Studio Contact Box */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Company Headquarters
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              PCSecure Michigan Studio
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              9585 Pottawatamie Dr, Manitou Beach, MI 49253, United States
            </p>
            <p className="text-xs text-slate-500 pt-1">
              Direct Phone: <strong>{settings.phoneNumber || '(810) 331-0605'}</strong> · Email: <strong>{settings.supportEmail || 'support@pcsecure.tech'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenProjectModal ? onOpenProjectModal() : onNavigate({ type: 'contact' })}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition"
            >
              Start a Project
            </button>
            <button
              onClick={() => onNavigate({ type: 'portfolio' })}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
