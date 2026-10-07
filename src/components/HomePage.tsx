import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Palette,
  ShoppingCart,
  Layers,
  Search,
  Zap,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  Star,
  Sparkles,
  Phone,
  Layout,
  Smartphone,
  Gauge,
  BarChart3,
  Check,
  Plus,
  Minus,
  Wrench,
  MonitorSmartphone,
  FileText,
  LifeBuoy,
  Compass,
  Monitor,
  Cpu,
  Flame,
  Award,
} from 'lucide-react';
import { Product, AppRoute, CompanySettings } from '../types';
import { HeroSection } from './HeroSection';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { GuaranteeSection } from './GuaranteeSection';
import { ResponsiveShowcase } from './ResponsiveShowcase';
import { ProjectEstimator } from './ProjectEstimator';
import { RopewayProcess } from './RopewayProcess';
import {
  FluidWave,
  CurvedScoop,
  DiagonalCut,
  RopewayCableDivider,
  RoundedArchDivider,
  SCurveWave,
  StadiumPillBridge,
  BubbleWaveDivider,
} from './WaveDividers';

interface HomePageProps {
  products: Product[];
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
  onOpenProjectModal: (serviceName?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  settings,
  onNavigate,
  onOpenProjectModal,
}) => {
  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Selected work filter tab
  const [workFilter, setWorkFilter] = useState<'all' | 'corporate' | 'ecommerce' | 'saas'>('all');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 8 Services organized for high-impact Bento Grid
  const servicesList = [
    {
      id: 'web-design',
      title: 'Custom Website Design',
      category: 'Flagship Architecture',
      desc: 'Distinctive, tailored interfaces designed around your unique brand identity, user journey, and measurable conversion goals.',
      icon: Layout,
      isFlagship: true,
      tags: ['Design Systems', 'Figma Tokens', 'Conversion UX'],
    },
    {
      id: 'web-dev',
      title: 'Web Development',
      category: 'Modern Engineering',
      desc: 'Blazing fast, responsive websites powered by Next.js, React, and strict TypeScript.',
      icon: Code2,
      isFlagship: false,
      tags: ['Next.js / React', 'TypeScript', 'Edge CDN'],
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Storefronts',
      category: 'High-Volume Sales',
      desc: 'Frictionless shopping experiences, streamlined checkouts, automated tax handling, and inventory synchronization.',
      icon: ShoppingCart,
      isFlagship: false,
      tags: ['Stripe Checkout', 'Shopify & Headless', 'Catalog CMS'],
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Interface Design',
      category: 'Human-Centered',
      desc: 'Intuitive user experiences backed by interaction psychology, usability audits, and crisp visual hierarchy.',
      icon: Palette,
      isFlagship: false,
      tags: ['Wireframing', 'User Testing', 'Micro-Interactions'],
    },
    {
      id: 'redesign',
      title: 'Website Redesign',
      category: 'Digital Evolution',
      desc: 'Transform outdated, sluggish legacy websites into modern, high-performing experiences with up to +184% conversion lift.',
      icon: MonitorSmartphone,
      isFlagship: false,
      tags: ['Legacy Migration', 'Modern UI Overhaul', 'SEO Preservation'],
    },
    {
      id: 'web-apps',
      title: 'Custom Web Applications',
      category: 'Scalable Platforms',
      desc: 'Custom browser-based client portals, SaaS dashboards, and automated internal workflows.',
      icon: Layers,
      isFlagship: false,
      tags: ['Auth & Roles', 'Real-time APIs', 'PostgreSQL / SQL'],
    },
    {
      id: 'maintenance',
      title: 'Website Maintenance & SLA',
      category: '24/7 Security Guard',
      desc: 'Continuous monitoring, core security updates, bug fixes, and guaranteed performance response times.',
      icon: Wrench,
      isFlagship: false,
      tags: ['Uptime Monitoring', 'Security Patches', 'Speed Audits'],
    },
    {
      id: 'seo-speed',
      title: 'SEO & Performance Tuning',
      category: 'Sub-500ms Speed',
      desc: 'Engineered for top search engine visibility, structured data schemas, and 98%+ Core Web Vitals.',
      icon: Zap,
      isFlagship: false,
      tags: ['Schema.org', 'Lighthouse 98+', 'Semantic HTML5'],
    },
  ];

  // 4 Featured Selected Work
  const portfolioProjects = [
    {
      name: 'Modern Business Platform',
      category: 'Corporate / Professional Services',
      type: 'corporate',
      metric: 'Lighthouse 99',
      image: '/src/assets/images/portfolio_saas_platform_1790446895410.jpg',
      tags: ['Next.js', 'Tailwind', 'Edge CDN'],
    },
    {
      name: 'Luxury E-Commerce Store',
      category: 'Retail / Online Store',
      type: 'ecommerce',
      metric: '+142% Sales Lift',
      image: '/src/assets/images/portfolio_ecommerce_luxury_1790446904601.jpg',
      tags: ['Headless Shopify', 'Stripe', 'Figma Tokens'],
    },
    {
      name: 'FinTech Cloud Dashboard',
      category: 'SaaS / Technology',
      type: 'saas',
      metric: 'Sub-300ms LCP',
      image: '/src/assets/images/portfolio_fintech_portal_1790446913918.jpg',
      tags: ['React SPA', 'TypeScript', 'Analytics'],
    },
    {
      name: 'Artisan Culinary Web Experience',
      category: 'Food & Hospitality',
      type: 'corporate',
      metric: '100% Mobile Fluid',
      image: '/src/assets/images/agency_design_process_1790446924152.jpg',
      tags: ['Interactive Menu', 'Reservation CMS', 'SEO'],
    },
  ];

  const filteredProjects =
    workFilter === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.type === workFilter);

  // 8 Why PCSecure Differentiators
  const whyCheckmarks = [
    'Custom Solutions (No Cookie-Cutter Templates)',
    'Human-Centered Interaction Design',
    'Responsive Across All Screen Sizes',
    'Clean Next.js & Strict TypeScript Standards',
    'Guaranteed 95+ Core Web Vitals Performance',
    'Transparent Communication & Weekly Sprints',
    'Scalable Cloud Architecture & Edge CDN',
    '60-Day Post-Launch SLA Warranty',
  ];

  // 3 Testimonials
  const clientTestimonials = [
    {
      quote:
        'PCSecure completely transformed our business website. The process was smooth, communication was outstanding, and our new site loads in the blink of an eye.',
      author: 'John D.',
      role: 'Business Owner',
      company: 'Apex Logistics Corp',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
    },
    {
      quote:
        'The ropeway roadmap kept us informed at every single milestone. Our e-commerce conversion rate jumped by 62% in the first 30 days after launch!',
      author: 'Sarah L.',
      role: 'Operations Director',
      company: 'Lumiere Retail Studio',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80',
    },
    {
      quote:
        'Highly recommend PCSecure for any web application project. Their code quality, design polish, and ongoing support are second to none in this industry.',
      author: 'Michael R.',
      role: 'CEO & Founder',
      company: 'Novus Cloud Technologies',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    },
  ];

  // 6 FAQ Questions
  const faqItems = [
    {
      q: 'How much does a custom website cost?',
      a: 'Website costs vary depending on the scope, features, custom functionality, content requirements, and complexity. We offer transparent turnkey packages starting at competitive fixed rates, as well as customized estimates for bespoke software and platform projects.',
    },
    {
      q: 'How long does website development take?',
      a: 'Most standard business websites and turnkey packages are delivered within 2 to 4 weeks. Larger custom web applications and extensive e-commerce stores typically require 4 to 8 weeks depending on specifications and milestone approvals.',
    },
    {
      q: 'Will my website work on mobile devices?',
      a: 'Yes, 100%. Every single website and digital experience we engineer is fully responsive and tested rigorously across smartphones, tablets, laptops, and ultra-wide desktop monitors to ensure flawless presentation and speed.',
    },
    {
      q: 'Can PCSecure redesign my existing website?',
      a: 'Absolutely. We specialize in transforming outdated, sluggish legacy websites into modern, high-performing digital platforms that elevate your brand and substantially increase conversion rates.',
    },
    {
      q: 'Can you build an online store?',
      a: 'Yes. We design and develop high-converting e-commerce storefronts on headless architectures, Shopify, and custom commerce solutions with seamless checkouts, automated tax handling, and inventory sync.',
    },
    {
      q: 'Do you provide maintenance after launch?',
      a: 'Yes, we provide ongoing website maintenance, security patching, Core Web Vitals monitoring, and on-demand engineering support to ensure your website remains fast, secure, and up to date.',
    },
  ];

  return (
    <div id="home-page" className="min-h-screen bg-white">
      {/* 1. HERO SECTION WITH 3D TILT & FLOATING TRUST STRIP (Integrated Bottom Wave) */}
      <HeroSection
        onOpenProjectModal={onOpenProjectModal}
        onNavigate={onNavigate}
      />

      {/* 2. ABOUT PCSECURE: FULL-SCREEN ARCHITECTURAL SHOWCASE */}
      <section id="about-section" className="relative py-20 sm:py-28 bg-[#F8FAFC] overflow-hidden w-full">
        {/* Subtle decorative background wave blur */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Asymmetric Floating Office Visual with Polaroid Badge */}
            <div className="lg:col-span-6 relative">
                {/* Outer decorative layered backdrop */}
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-100 to-cyan-50 rounded-3xl transform -rotate-1 pointer-events-none" />

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-900">
                  <img
                    src="/src/assets/images/agency_design_process_1790446924152.jpg"
                    alt="PCSecure Agency Studio and Collaborative Workspace"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Floating "From Idea to Launch" checklist card with blue accent pin */}
                  <div className="absolute -bottom-6 -right-3 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-slate-200 max-w-xs space-y-2.5 z-10 transition-transform hover:-translate-y-1">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-black text-[#0B1F3A] uppercase tracking-wider">
                        From Idea to Launch
                      </span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700 font-semibold">
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-100 text-[#0875E1] flex items-center justify-center text-[10px]">✓</div>
                        <span>Strategy &amp; Architecture</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-100 text-[#0875E1] flex items-center justify-center text-[10px]">✓</div>
                        <span>Figma High-Craft UI Design</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-100 text-[#0875E1] flex items-center justify-center text-[10px]">✓</div>
                        <span>Clean Next.js Codebase</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-blue-100 text-[#0875E1] flex items-center justify-center text-[10px]">✓</div>
                        <span>120-Point Rigor Testing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px]">✓</div>
                        <span>Edge Global Launch</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Floating Award Chip (Top Left) */}
                <div className="absolute -top-4 -left-4 bg-white text-slate-900 rounded-full px-4 py-2.5 shadow-xl border border-slate-200 flex items-center gap-2.5 z-20">
                  <div className="w-7 h-7 rounded-full bg-[#EAF4FF] text-[#0875E1] flex items-center justify-center">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#0B1F3A]">Michigan Studio</div>
                    <div className="text-[9px] text-slate-500 font-mono">USA Engineering</div>
                  </div>
                </div>
              </div>

              {/* Right: Editorial Narrative with 4 Feature Pills */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF4FF] text-[#0875E1] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ABOUT PCSECURE</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight">
                  Digital Experiences Built Around Your{' '}
                  <span className="text-[#0875E1]">Business.</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  At PCSecure, we combine strategy, creative design, and modern technology to build professional websites and web applications that help businesses grow. Our goal is to deliver digital solutions that are visually impressive, easy to use, and engineered for sub-second performance.
                </p>

                {/* 4 Feature Points with custom rounded capsule blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-[#0875E1] transition-all flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#0875E1] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B1F3A]">Strategy &amp; Planning</h4>
                      <p className="text-[11px] text-slate-500">Goal-aligned architecture</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-[#0875E1] transition-all flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#0875E1] flex items-center justify-center shrink-0">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B1F3A]">Modern Design</h4>
                      <p className="text-[11px] text-slate-500">Human-centered UI/UX</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-[#0875E1] transition-all flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#0875E1] flex items-center justify-center shrink-0">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B1F3A]">Clean Development</h4>
                      <p className="text-[11px] text-slate-500">Strict Next.js &amp; TypeScript</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:border-[#0875E1] transition-all flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] text-[#0875E1] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B1F3A]">Ongoing Support</h4>
                      <p className="text-[11px] text-slate-500">Continuous 24/7 care</p>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate({ type: 'about' })}
                    className="px-7 py-3.5 rounded-full bg-[#0875E1] hover:bg-[#0766c5] active:bg-[#0658a8] text-white font-semibold text-sm transition shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer group"
                  >
                    <span>Learn About PCSecure</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* ROUNDED ARCH DOME TRANSITION INTO SERVICES */}
      <RoundedArchDivider fillColor="#F8FAFC" bgColor="#F8FAFC" variant="bottom" />

      {/* 3. WHAT WE DO / SERVICES: MODERN ASYMMETRIC BENTO GRID */}
      <section id="services-section" className="py-20 sm:py-28 bg-[#F8FAFC] relative overflow-hidden w-full">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#0875E1] border border-blue-200 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Layers className="w-3.5 h-3.5" />
              <span>CORE CAPABILITIES MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight">
              Everything You Need to Build a Better Digital Presence
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Explore our comprehensive full-stack digital services, designed to take your business from vision to market leadership.
            </p>
            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={() => onNavigate({ type: 'pricing' })}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-slate-50 text-[#0875E1] border border-blue-200 font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Compare Packages & Pricing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* BENTO GRID (Asymmetric card hierarchy with sculpted rounded corners) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
            {/* Bento Card 1: Flagship Spotlight Card (Spans 8 columns on large screens) */}
            <div className="lg:col-span-8 rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#07172F] via-[#0B254D] to-[#07172F] text-white p-8 sm:p-12 shadow-2xl border border-slate-800 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-lg shadow-cyan-400/25">
                    <Layout className="w-6 h-6" />
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-blue-600/40 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold uppercase">
                    FLAGSHIP SERVICE
                  </span>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Custom Website Design
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
                    Distinctive, bespoke designs tailored to your brand identity, customer journey, and business revenue goals. No pre-made templates, no generic code.
                  </p>
                </div>

                {/* Sub-tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Figma Design Systems', 'Sub-pixel Visual Polish', 'High-Converting Funnels', 'Mobile-First Architecture'].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-medium text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-8 mt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-cyan-300 font-mono">
                  100% Unique Brand Architecture
                </span>
                <button
                  onClick={() => onOpenProjectModal('Custom Website Design Package')}
                  className="px-5 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Build This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bento Card 2: Web Development (Spans 4 columns) */}
            <div className="lg:col-span-4 rounded-[30px] sm:rounded-[36px] bg-white p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] text-[#0875E1] flex items-center justify-center group-hover:bg-[#0875E1] group-hover:text-white transition-colors">
                  <Code2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#0875E1] uppercase">Next.js &amp; TypeScript</span>
                  <h3 className="text-xl font-bold text-[#0B1F3A]">Web Development</h3>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    Fast, scalable and responsive web applications engineered with modern technologies and edge performance.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-600 font-bold">Lighthouse 98+</span>
                <button
                  onClick={() => onOpenProjectModal('Web Development')}
                  className="text-xs font-bold text-[#0875E1] hover:text-[#0766c5] flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bento Card 3: E-Commerce Storefronts (Spans 4 columns) */}
            <div className="lg:col-span-4 rounded-[30px] sm:rounded-[36px] bg-white p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] text-[#0875E1] flex items-center justify-center group-hover:bg-[#0875E1] group-hover:text-white transition-colors">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#0875E1] uppercase">Turnkey Commerce</span>
                  <h3 className="text-xl font-bold text-[#0B1F3A]">E-Commerce Stores</h3>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    High-converting shopping storefronts with friction-free browsing and automated checkout experiences.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-blue-600 font-bold">Stripe &amp; Shopify</span>
                <button
                  onClick={() => onOpenProjectModal('E-Commerce Development')}
                  className="text-xs font-bold text-[#0875E1] hover:text-[#0766c5] flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bento Card 4: Web Applications & Portals (Spans 4 columns) */}
            <div className="lg:col-span-4 rounded-[30px] sm:rounded-[36px] bg-white p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] text-[#0875E1] flex items-center justify-center group-hover:bg-[#0875E1] group-hover:text-white transition-colors">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#0875E1] uppercase">SaaS &amp; Dashboards</span>
                  <h3 className="text-xl font-bold text-[#0B1F3A]">Web Applications</h3>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    Custom browser-based platforms with authentication, database models, and operational dashboards.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-purple-600 font-bold">Full-Stack Cloud</span>
                <button
                  onClick={() => onOpenProjectModal('Web Applications')}
                  className="text-xs font-bold text-[#0875E1] hover:text-[#0766c5] flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bento Card 5: Website Redesign (Spans 4 columns) */}
            <div className="lg:col-span-4 rounded-[30px] sm:rounded-[36px] bg-white p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] text-[#0875E1] flex items-center justify-center group-hover:bg-[#0875E1] group-hover:text-white transition-colors">
                  <MonitorSmartphone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#0875E1] uppercase">Modernization</span>
                  <h3 className="text-xl font-bold text-[#0B1F3A]">Website Redesign</h3>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    Transform outdated, sluggish websites into modern, high-performing experiences that drive revenue.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-4 flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-600 font-bold">+184% Avg Lift</span>
                <button
                  onClick={() => onOpenProjectModal('Website Redesign')}
                  className="text-xs font-bold text-[#0875E1] hover:text-[#0766c5] flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORGANIC BUBBLE WAVE TRANSITION INTO WORK */}
      <BubbleWaveDivider fillColor="#FFFFFF" variant="bottom" />

      {/* 4. SELECTED WORK / PORTFOLIO: FULL-SCREEN GALLERY */}
      <section id="portfolio-section" className="py-20 sm:py-28 bg-white relative overflow-hidden w-full">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF4FF] text-[#0875E1] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SELECTED WORK</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight">
                Websites Designed to Make an Impact.
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'corporate', label: 'Corporate' },
                { id: 'ecommerce', label: 'E-Commerce' },
                { id: 'saas', label: 'SaaS Platforms' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setWorkFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                    workFilter === tab.id
                      ? 'bg-[#0875E1] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Staggered Projects Grid with Sculpted Rounded Silhouette Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.name}
                onClick={() => onNavigate({ type: 'portfolio' })}
                className="group cursor-pointer rounded-[32px] border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
              >
                <div className="aspect-[4/3] bg-slate-900 overflow-hidden relative">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />

                  {/* Top Right Floating Metric Chip */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-800 text-[10px] font-mono font-bold text-cyan-300">
                    {proj.metric}
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#0B1F3A] group-hover:text-[#0875E1] transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {proj.category}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0875E1]">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ROPEWAY / CABLEWAY MOUNTAIN PROCESS SECTION */}
      {/* Asymmetric S-Curve into Process Section */}
      <SCurveWave fillColor="#07172F" accentColor="#0875E1" variant="bottom" />
      
      {/* Decorative Upper Cable Divider into Process */}
      <RopewayCableDivider variant="dark" className="bg-[#07172F]" />
      
      {/* The Full Suspended Cableway Experience */}
      <RopewayProcess />

      {/* Decorative Lower Cable Divider leaving Process */}
      <RopewayCableDivider variant="dark" className="bg-[#07172F]" />

      {/* S-Curve Transition into Why PCSecure */}
      <SCurveWave fillColor="#F8FAFC" accentColor="#00D2FF" variant="top" />

      {/* 6. WHY PCSECURE: FULL-SCREEN ADVANTAGE SHOWCASE */}
      <section id="why-section" className="relative py-20 sm:py-28 bg-[#F8FAFC] overflow-hidden w-full">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left Column: Headline and 8 Checkmarks with Rounded Pills */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF4FF] text-[#0875E1] text-xs font-bold uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  <span>WHY PCSECURE</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight">
                  More Than a Website. A Digital Foundation for{' '}
                  <span className="text-[#0875E1]">Growth.</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg">
                  We focus on building long-term value for your business through design excellence, robust technology, and reliable support.
                </p>

                {/* 8 Checkmarks in 2 Columns with Rounded Capsules */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {whyCheckmarks.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 p-2 rounded-2xl bg-slate-50/80 border border-slate-200/60 shadow-2xs group hover:bg-white hover:border-[#0875E1]/40 transition-all">
                      <div className="w-6 h-6 rounded-full bg-[#EAF4FF] text-[#0875E1] flex items-center justify-center shrink-0 group-hover:bg-[#0875E1] group-hover:text-white transition-colors">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs font-semibold text-[#0B1F3A] leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Multi-Device Graphic with "Faster Performance 3x" card */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[16/10] bg-slate-900">
                  <img
                    src="/src/assets/images/hero_web_design_1790447403727.jpg"
                    alt="High Performance Digital Platform"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Floating "Faster Performance 3x" metric card with stadium radius */}
                  <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md text-slate-900 rounded-3xl p-5 shadow-2xl border border-slate-100 max-w-xs space-y-2 z-10 transition-transform hover:-translate-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Edge CDN Acceleration
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#0875E1]">3x</span>
                      <span className="text-xs text-slate-700 font-bold">Faster Core Web Vitals</span>
                    </div>
                    <div className="w-full h-6 flex items-end gap-1 pt-1">
                      <div className="w-2.5 h-2 bg-blue-300 rounded-xs" />
                      <div className="w-2.5 h-3 bg-blue-400 rounded-xs" />
                      <div className="w-2.5 h-4.5 bg-blue-500 rounded-xs" />
                      <div className="w-2.5 h-6 bg-[#0875E1] rounded-xs" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* CURVED SCOOP DIVIDER INTO RESPONSIVE SHOWCASE */}
      <CurvedScoop fillColor="#FFFFFF" direction="down" />

      {/* 7. RESPONSIVE SHOWCASE (Omni-Device Testing Laboratory) */}
      <ResponsiveShowcase />

      {/* 8. WEBSITE REDESIGN COMPARISON: FULL-SCREEN BENCHMARK */}
      <section className="py-20 sm:py-28 bg-[#F6F9FC] relative overflow-hidden w-full">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF4FF] text-[#0875E1] border border-blue-200 text-xs font-bold uppercase tracking-wider shadow-xs">
              <MonitorSmartphone className="w-3.5 h-3.5" />
              <span>TRANSFORMATION BENCHMARK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight">
              See the Difference A Modern Website Makes
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto">
              Drag the interactive divider below to compare outdated 90s/2000s architectures against PCSecure's modern sub-second responsive platform.
            </p>
          </div>

          {/* Interactive Before / After Slider */}
          <BeforeAfterSlider />
        </div>
      </section>

      {/* STADIUM PILL BRIDGE DIVIDER */}
      <StadiumPillBridge label="SCOPE ESTIMATION ENGINE" pillColor="#0875E1" />

      {/* 9. INTERACTIVE PROJECT ESTIMATOR CONSOLE */}
      <ProjectEstimator onOpenProjectModal={onOpenProjectModal} />

      {/* FLUID WAVE DIVIDER INTO TESTIMONIALS */}
      <FluidWave fillColor="#F0F7FF" variant="bottom" />

      {/* 10. CLIENT EXPERIENCE / TESTIMONIALS (Organic Wave Lagoon) */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#F0F7FF] via-[#F8FAFC] to-white relative overflow-hidden w-full">
        {/* Subtle decorative circles */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 space-y-14 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#0875E1] border border-blue-200 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>CLIENT EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-sm text-slate-500">
              Trusted by high-growth startups and established brands nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {clientTestimonials.map((t) => (
              <div
                key={t.author}
                className="rounded-[36px] border border-blue-100/90 bg-white p-8 shadow-sm hover:shadow-2xl transition-all duration-300 space-y-5 flex flex-col justify-between relative group transform hover:-translate-y-1.5"
              >
                {/* Speech triangle accent */}
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#0875E1]/30 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#0B1F3A]">{t.author}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {t.role} · <span className="text-[#0875E1]">{t.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORGANIC BUBBLE WAVE DIVIDER INTO FAQ */}
      <BubbleWaveDivider fillColor="#F6F9FC" variant="bottom" />

      {/* 11. FREQUENTLY ASKED QUESTIONS (Accordion with Rounded Stadium Tabs) */}
      <section className="py-20 bg-[#F6F9FC] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#0875E1] border border-blue-200 text-xs font-bold uppercase tracking-wider shadow-xs">
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight">
              Got Questions? We Have Answers.
            </h2>
            <p className="text-sm text-slate-600">
              Find quick answers to common questions about our services and delivery.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqItems.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={item.q}
                  className={`rounded-[28px] sm:rounded-[32px] border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#0875E1] shadow-md ring-2 ring-blue-500/10'
                      : 'bg-white border-slate-200/90 shadow-xs hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0B1F3A] hover:text-[#0875E1] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#EAF4FF] text-[#0875E1] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{item.q}</span>
                    </span>
                    <span className="shrink-0 text-[#0875E1] p-1.5 rounded-full bg-blue-50">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CURVED SCOOP DIVIDER INTO CONVERSION CTA */}
      <CurvedScoop fillColor="#071D3F" direction="down" />

      {/* 12. CONVERSION CTA BANNER: FULL-WIDTH EDGE-TO-EDGE MEGA-BANNER */}
      <section className="w-full bg-gradient-to-r from-[#071D3F] via-[#0875E1] to-[#052b57] text-white py-20 sm:py-28 relative overflow-hidden">
        {/* Glow orb background */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 z-10 flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 inline-block">
              READY TO ELEVATE YOUR DIGITAL ARCHITECTURE?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Have an Idea? Let's Build Something Great.
            </h2>
            <p className="text-sm sm:text-base text-blue-100">
              Tell us about your project and discover how PCSecure can turn your idea into a professional digital experience.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              onClick={() => onOpenProjectModal('Custom Website Design Package')}
              className="px-8 py-4 rounded-full bg-white text-[#0875E1] hover:bg-slate-50 active:bg-slate-100 font-extrabold text-sm transition-all shadow-xl flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:8103310605"
              className="px-7 py-4 rounded-full bg-[#07172F]/90 hover:bg-[#07172F] text-white font-bold text-sm transition-all border border-cyan-400/40 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call (810) 331 0605</span>
            </a>
          </div>
        </div>
      </section>

      {/* 13. 60-DAY GUARANTEE & DIGISTORE24 PROTECTION */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <GuaranteeSection onNavigate={onNavigate} variant="full" />
        </div>
      </section>
    </div>
  );
};
