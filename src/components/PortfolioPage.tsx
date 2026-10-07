import React, { useState } from 'react';
import {
  ExternalLink,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Layers,
  Sparkles,
  X,
  Code2,
  ShieldCheck,
} from 'lucide-react';
import { CaseStudy, AppRoute, CompanySettings } from '../types';
import { INITIAL_CASE_STUDIES } from '../data/initialData';

interface PortfolioPageProps {
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
  onOpenProjectModal: (serviceName?: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  settings,
  onNavigate,
  onOpenProjectModal,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Web Application' | 'E-Commerce' | 'Corporate & UI/UX'>('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  const filteredProjects = INITIAL_CASE_STUDIES.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  return (
    <div id="portfolio-page" className="min-h-screen bg-slate-50/60 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Proven Client Outcomes
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Selected Work & Case Studies
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore how {settings.companyName} designs, builds, and deploys high-performing custom websites, e-commerce stores, and software platforms for growth-focused organizations.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1 bg-slate-200/80 rounded-xl gap-1">
            {(['All', 'Web Application', 'E-Commerce', 'Corporate & UI/UX'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedCaseStudy(project)}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 flex flex-col justify-between"
            >
              {/* Media Thumbnail with fallback */}
              <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                      <span>{project.client}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.industry}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Quantitative Results */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    {project.results.map((res, i) => (
                      <div key={i} className="text-center sm:text-left">
                        <div className="text-lg sm:text-xl font-extrabold text-blue-600 tabular-nums">
                          {res.metric}
                        </div>
                        <div className="text-[11px] font-medium text-slate-500 mt-0.5 leading-tight">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Unboxed */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 pt-1">
                    <span className="font-semibold text-slate-700">Technologies:</span>
                    {project.techStack.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span>{tech}</span>
                        {idx < project.techStack.length - 1 && (
                          <span aria-hidden="true" className="text-slate-300">
                            /
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
                  <span className="text-blue-600 group-hover:underline">Read Full Case Study</span>
                  <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Have a similar digital project in mind?
            </h2>
            <p className="text-sm text-slate-300 max-w-xl">
              We engineer custom digital solutions backed by our 60-day satisfaction warranty. Request a scoped proposal tailored to your objectives.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenProjectModal()}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition shadow-sm"
            >
              Start a Project
            </button>
            <button
              onClick={() => onNavigate({ type: 'contact' })}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition"
            >
              Contact Studio
            </button>
          </div>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedCaseStudy(null)}
          />

          <div className="relative w-full max-w-4xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div>
                <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
                  <span>{selectedCaseStudy.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedCaseStudy.industry}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  {selectedCaseStudy.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 space-y-8 overflow-y-auto">
              {/* Media Preview */}
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={selectedCaseStudy.imageUrl}
                  alt={selectedCaseStudy.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Quantified Metrics Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200">
                {selectedCaseStudy.results.map((res, i) => (
                  <div key={i} className="text-center sm:text-left space-y-0.5">
                    <div className="text-2xl font-extrabold text-blue-600 tabular-nums">
                      {res.metric}
                    </div>
                    <div className="text-xs font-semibold text-slate-700">
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    The Business Challenge
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedCaseStudy.challenge}
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-blue-600">
                    PCSecure Architecture & Solution
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {selectedCaseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Deliverables & Scope */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">
                  Key Scope & Deliverables
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCaseStudy.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Quote */}
              {selectedCaseStudy.testimonial && (
                <div className="p-6 rounded-xl bg-blue-50/60 border border-blue-100 space-y-3">
                  <blockquote className="text-sm sm:text-base italic text-slate-800 leading-relaxed">
                    "{selectedCaseStudy.testimonial.quote}"
                  </blockquote>
                  <div className="text-xs text-slate-600 font-medium">
                    <span className="font-bold text-slate-900">
                      {selectedCaseStudy.testimonial.author}
                    </span>{' '}
                    — {selectedCaseStudy.testimonial.role}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Protected by PCSecure 60-Day Guarantee</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedCaseStudy(null)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const client = selectedCaseStudy.client;
                    setSelectedCaseStudy(null);
                    onOpenProjectModal(client);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition"
                >
                  Scope Similar Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
