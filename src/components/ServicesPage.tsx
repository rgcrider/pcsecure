import React, { useState } from 'react';
import {
  Palette,
  Code2,
  ShoppingCart,
  Layers,
  Search,
  Zap,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { AppRoute, CompanySettings, Product } from '../types';

interface ServicesPageProps {
  products: Product[];
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
  onOpenProjectModal: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  products,
  settings,
  onNavigate,
  onOpenProjectModal,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const agencyServices = [
    {
      id: 'website-design',
      title: 'Custom Website Design & UI/UX Systems',
      slug: 'custom-website-design-package',
      icon: Palette,
      tagline: 'High-converting, brand-aligned interfaces crafted in Figma with atomic design tokens.',
      overview:
        'We design websites that convert visitors into paying clients. Rather than relying on generic prefabricated templates, every layout is custom-designed around your unique value proposition, target customer psychology, and clear conversion paths.',
      deliverables: [
        'Custom Figma source files with atomic components & auto-layout',
        'Responsive mobile, tablet, and desktop viewport specifications',
        'Design token system (typography scale, color palettes, spacing math)',
        'Click-through interactive prototypes for user testing',
        'Full asset exports with SVG vector icons and graphics',
      ],
      outcomes: 'Avg. 2.4x conversion lift · 100% brand originality · WCAG AA accessible',
      salesPageSlug: 'custom-website-design-package',
    },
    {
      id: 'web-development',
      title: 'Full-Stack Web Development',
      slug: 'full-stack-web-development',
      icon: Code2,
      tagline: 'Production-ready Next.js, React & TypeScript engineering built for speed and longevity.',
      overview:
        'Clean, modular code built on battle-tested frameworks. We build websites and web applications with strict TypeScript typing, sub-second page loads, server-side rendering, and responsive fluidity across every device size.',
      deliverables: [
        'Complete React & Next.js production codebase with TypeScript',
        '95+ Google PageSpeed & Core Web Vitals optimization score',
        'Semantic HTML5 structure for maximum organic SEO crawlability',
        'Git repository handoff with CI/CD deployment automation',
        'Third-party API, CRM, and analytics integration',
      ],
      outcomes: '< 500ms Largest Contentful Paint · 99.9% uptime architecture · Zero layout shifts',
      salesPageSlug: 'full-stack-web-development',
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce & Digital Storefronts',
      slug: 'growth-digital-marketing-campaign',
      icon: ShoppingCart,
      tagline: 'High-converting direct-to-consumer and B2B storefronts engineered to maximize GMV.',
      overview:
        'From high-speed headless Shopify implementations to custom checkout experiences and product configurators, we engineer e-commerce platforms that minimize cart abandonment and streamline order fulfillment.',
      deliverables: [
        'Bespoke product catalog, collection, and PDP layout design',
        'Frictionless checkout optimization with 1-click mobile payments',
        'Inventory, fulfillment, and ERP integrations',
        'Abandoned cart recovery workflows and transactional email flows',
        'Multi-currency and localized international payment routing',
      ],
      outcomes: '+38% checkout completion · 1-click Apple Pay/Google Pay · Instant edge caching',
      salesPageSlug: 'growth-digital-marketing-campaign',
    },
    {
      id: 'web-apps',
      title: 'Custom Web Applications & Portals',
      slug: 'custom-app-development-sprint',
      icon: Layers,
      tagline: 'Scalable SaaS dashboards, client portals, and bespoke internal workflow software.',
      overview:
        'When off-the-shelf software cannot meet your operational requirements, we architect custom cloud applications. We build secure multi-role permission systems, real-time data visualizers, and automated business workflows.',
      deliverables: [
        'Role-Based Access Control (RBAC) & secure authentication flows',
        'Real-time data visualization charts and dashboard widgets',
        'RESTful and GraphQL API backend architecture',
        'Automated billing, subscription tiers, and invoicing webhooks',
        'Comprehensive documentation and developer API specifications',
      ],
      outcomes: 'SOC2-ready UI patterns · Scalable database queries · 100% intellectual property ownership',
      salesPageSlug: 'custom-app-development-sprint',
    },
    {
      id: 'seo-performance',
      title: 'Technical SEO & Performance Optimization',
      slug: 'enterprise-seo-growth-sprint',
      icon: Search,
      tagline: 'Algorithmic technical audits and speed engineering that boost organic rankings.',
      overview:
        'Search engines favor fast, semantically structured websites. We conduct comprehensive technical audits, eliminate render-blocking assets, optimize image encoding, and fix indexation issues that hold your domain back.',
      deliverables: [
        '120-point technical SEO and crawlability inspection report',
        'Core Web Vitals remediation (LCP, CLS, INP)',
        'Schema.org JSON-LD structured data and OpenGraph configuration',
        'Canonicalization, robots.txt, and XML sitemap optimization',
        'Google Search Console recovery and mobile usability fixes',
      ],
      outcomes: 'Top 10% Core Web Vitals bracket · Higher Google rank velocity · Zero crawl errors',
      salesPageSlug: 'enterprise-seo-growth-sprint',
    },
    {
      id: 'maintenance-support',
      title: 'Continuous Maintenance & Growth Engineering',
      slug: 'custom-website-design-package',
      icon: Zap,
      tagline: 'Ongoing code maintenance, speed monitoring, and conversion rate optimization.',
      overview:
        'A website is a living digital asset. We provide continuous support plans that keep your site secure, updated, blazing fast, and continually optimized for higher customer conversions.',
      deliverables: [
        'Proactive dependency patching and security vulnerability monitoring',
        'Monthly conversion rate optimization (CRO) split tests',
        '24/7 uptime and domain health monitoring',
        'Priority on-demand engineering and content updates',
        'Monthly analytics and search performance reporting',
      ],
      outcomes: 'Zero unexpected downtime · Continuous conversion gains · 24-hr emergency response',
      salesPageSlug: 'custom-website-design-package',
    },
  ];

  const serviceFaqs = [
    {
      q: 'How long does a typical web design and development project take?',
      a: 'A standard custom website project (5 to 8 unique pages) typically takes 3 to 4 weeks from initial kickoff to final launch. Full-stack web applications and custom SaaS portals generally run 6 to 8 weeks depending on database complexity and API requirements.',
    },
    {
      q: 'Who owns the intellectual property and code upon completion?',
      a: 'You own 100% of the intellectual property, design source files, source code, and assets. Upon project completion and final milestone sign-off, full repository access and domain credentials are handed over directly to you with zero recurring proprietary lock-in.',
    },
    {
      q: 'Can I purchase turnkey packages directly with instant access?',
      a: 'Yes! In addition to custom enterprise engagements, we offer fixed-price turnkey packages for Custom Website Design, Web Development, SEO Sprints, and Digital Marketing campaigns available through our verified Digistore24 checkout.',
    },
    {
      q: 'How does your 60-day money-back guarantee work for service packages?',
      a: 'All our digital packages and online services are covered by PCSecure’s 60-day satisfaction guarantee. If our deliverables do not meet the agreed specifications and design standards, you are eligible for a 100% refund in accordance with our Refund Policy.',
    },
    {
      q: 'Do you provide post-launch technical support and bug fixes?',
      a: 'Every project includes a comprehensive 60-day post-launch engineering warranty covering bug remediation, responsive alignment, and performance monitoring at zero additional cost.',
    },
  ];

  return (
    <div id="services-page" className="min-h-screen bg-slate-50/60 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Digital Engineering & Design
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Capabilities & Professional Services
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From bespoke Figma UI/UX architecture to modern full-stack web engineering, {settings.companyName} partners with ambitious companies to build high-performance digital experiences.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate({ type: 'pricing' })}
              className="px-6 py-2.5 rounded-lg bg-[#0875E1] hover:bg-[#0766c5] active:bg-[#0658a8] text-white font-semibold text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Packages & Pricing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onOpenProjectModal()}
              className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition cursor-pointer"
            >
              Custom Scope Inquiry
            </button>
          </div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agencyServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 flex flex-col justify-between space-y-6 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs font-medium text-blue-600 mt-1">
                      {service.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.overview}
                  </p>

                  {/* Scope bullets */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Deliverables
                    </div>
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Outcomes unboxed */}
                  <div className="text-[11px] font-medium text-slate-500 pt-1">
                    <span className="font-semibold text-slate-800">Target Benchmark:</span>{' '}
                    {service.outcomes}
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() =>
                      onNavigate({ type: 'product-sales', slug: service.salesPageSlug })
                    }
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                  >
                    <span>View Turnkey Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenProjectModal(service.title)}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition"
                  >
                    Scope Project
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 60-Day Guarantee Banner */}
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">
                Backed by Our 60-Day Satisfaction Warranty
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                We believe in total transparency. Every custom engineering package and digital product is covered by PCSecure’s 60-day refund policy and post-launch bug remediation warranty.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate({ type: 'refund-policy' })}
            className="px-5 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-semibold text-xs hover:bg-emerald-50 transition shrink-0"
          >
            Review Guarantee Policy
          </button>
        </div>

        {/* Service FAQs */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600">
              Clear answers regarding our development process, billing, and deliverables.
            </p>
          </div>

          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
            {serviceFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="p-5 sm:p-6">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Final CTA */}
        <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white max-w-2xl mx-auto">
            Ready to build a digital platform that accelerates your business?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Schedule a scoping consultation with our engineering team or choose a turnkey package today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenProjectModal()}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition shadow-sm"
            >
              Start a Project
            </button>
            <button
              onClick={() => onNavigate({ type: 'products' })}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition"
            >
              Explore All Fixed-Price Packages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
