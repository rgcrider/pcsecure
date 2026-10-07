import React, { useState } from 'react';
import {
  Check,
  X as CloseIcon,
  ShieldCheck,
  Lock,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Zap,
  Clock,
  Phone,
  Layers,
  Code2,
  Palette,
  ShoppingCart,
  CheckCircle2,
  Calculator,
  RefreshCw,
  Sliders,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Building,
  Star,
  ExternalLink,
  Search,
  Megaphone,
  TrendingUp,
  BarChart3,
  Target,
  Globe,
  FileText,
  Award,
} from 'lucide-react';
import { AppRoute, CompanySettings, Product } from '../types';
import { PaymentGatewayModal, PaymentItem } from './PaymentGatewayModal';

interface PricingPageProps {
  settings: CompanySettings;
  products: Product[];
  onNavigate: (route: AppRoute) => void;
  onOpenProjectModal: (serviceName?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  settings,
  products,
  onNavigate,
  onOpenProjectModal,
}) => {
  // Tabs: 'projects' | 'wordpress' | 'marketing' | 'seo' | 'retainers' | 'products'
  const [activeCategory, setActiveCategory] = useState<
    'projects' | 'wordpress' | 'marketing' | 'seo' | 'retainers' | 'products'
  >('projects');
  // Billing cycle for retainers: 'monthly' | 'annual'
  const [retainerBilling, setRetainerBilling] = useState<'monthly' | 'annual'>('annual');
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Payment modal state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentItem, setPaymentItem] = useState<PaymentItem>({
    name: 'PCSecure Starter Web Launch',
    amount: 599,
    category: 'Website Design & Development',
    description: 'Custom 5-page responsive website design & frontend implementation.',
  });
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'amazon_pay' | 'card'>('paypal');

  // Interactive Calculator State
  const [calcPages, setCalcPages] = useState<number>(5);
  const [calcDesignTier, setCalcDesignTier] = useState<'custom' | 'bespoke'>('custom');
  const [calcEcommerce, setCalcEcommerce] = useState<boolean>(false);
  const [calcCms, setCalcCms] = useState<boolean>(true);
  const [calcSpeedOpt, setCalcSpeedOpt] = useState<boolean>(true);
  const [calcSecurityHardening, setCalcSecurityHardening] = useState<boolean>(true);
  const [calcExpressTurnaround, setCalcExpressTurnaround] = useState<boolean>(false);
  const [calcCopywriting, setCalcCopywriting] = useState<boolean>(false);

  // Calculate project estimate
  const calculateTotal = () => {
    let base = calcDesignTier === 'custom' ? 499 : 899;
    // Page cost ($95 per page beyond 3 pages)
    const extraPages = Math.max(0, calcPages - 3);
    base += extraPages * 95;
    if (calcEcommerce) base += 450;
    if (calcCms) base += 250;
    if (calcSpeedOpt) base += 180;
    if (calcSecurityHardening) base += 220;
    if (calcExpressTurnaround) base += 350;
    if (calcCopywriting) base += calcPages * 65;
    return base;
  };

  const calculatedTotal = calculateTotal();
  const estimatedWeeks = calcExpressTurnaround
    ? '1 - 2 weeks (Rush)'
    : calcPages > 10 || calcEcommerce
    ? '3 - 4 weeks'
    : '2 - 3 weeks';

  const handleOpenPayment = (
    item: PaymentItem,
    method: 'paypal' | 'amazon_pay' | 'card' = 'paypal'
  ) => {
    setPaymentItem(item);
    setPaymentMethod(method);
    setPaymentModalOpen(true);
  };

  const projectPlans = [
    {
      id: 'starter',
      name: 'Starter Web Launch',
      tagline: 'Ideal for local businesses, consultants, and early startups needing a polished, professional presence.',
      price: 599,
      badge: 'Fast Turnaround',
      isPopular: false,
      timeline: '7 - 10 business days',
      features: [
        'Up to 5 custom responsive pages',
        'Mobile-first responsive architecture',
        'Clean, accessible UI/UX with brand styling',
        'Interactive contact, booking & inquiry forms',
        'Google Maps & social media integration',
        'On-page SEO fundamentals & meta tags',
        '90+ Google PageSpeed mobile performance',
        'SSL certificate configuration & DNS setup',
        '30-day post-launch warranty & bug fixes',
      ],
      idealFor: 'Solo practitioners, trades, local services & emergent ventures',
      paymentItem: {
        id: 'starter-launch',
        name: 'PCSecure Starter Web Launch Package',
        amount: 599,
        category: 'Website Design & Development',
        description: 'Up to 5 custom responsive pages, SEO basics, and 30-day warranty.',
      },
    },
    {
      id: 'growth',
      name: 'Growth Business Platform',
      tagline: 'Engineered for scaling companies, digital agencies, and businesses demanding high conversion rates.',
      price: 1499,
      badge: 'Most Popular',
      isPopular: true,
      timeline: '2 - 3 weeks',
      features: [
        'Up to 12 custom bespoke pages & templates',
        'Production-grade Next.js, React & TypeScript build',
        'Complete Figma UI design system with atomic tokens',
        'Headless CMS or automated blog publishing engine',
        'E-Commerce or PayPal / Amazon Pay checkout integration',
        '95+ Google PageSpeed Core Web Vitals optimization',
        'Comprehensive Schema.org structured data (JSON-LD)',
        'Server-side lead routing & automated notifications',
        'Cybersecurity baseline audit & OWASP hardening',
        '60-day post-launch technical warranty & priority support',
      ],
      idealFor: 'SaaS platforms, e-commerce stores, tech firms & established brands',
      paymentItem: {
        id: 'growth-platform',
        name: 'PCSecure Growth Business Platform Package',
        amount: 1499,
        category: 'Full-Stack Web Development',
        description: 'Complete 12-page web platform, CMS, payment gateway integration, and 60-day warranty.',
      },
    },
    {
      id: 'enterprise',
      name: 'Enterprise & Custom Scale',
      tagline: 'Bespoke web applications, custom digital portals, and multi-region architectures with SLA guarantees.',
      price: 3499,
      badge: 'Enterprise Grade',
      isPopular: false,
      timeline: '4 - 6 weeks',
      features: [
        'Unlimited custom pages, portals & dynamic routes',
        'Custom backend API integration (REST, GraphQL, Webhooks)',
        'Multi-role access control (RBAC), Auth0 / Firebase Auth',
        'Full interactive Figma prototype & design sprint workshops',
        'Advanced payment workflows (Subscriptions, Escrow, Multi-currency)',
        'Enterprise CDN, DDoS mitigation & edge caching',
        'Automated CI/CD build pipelines & staging environments',
        'Dedicated senior technical architect & weekly standups',
        'Full OWASP penetration test & Attestation Letter',
        '90-day comprehensive SLA warranty & round-the-clock priority',
      ],
      idealFor: 'Funded tech companies, high-volume storefronts & custom web apps',
      paymentItem: {
        id: 'enterprise-custom',
        name: 'PCSecure Enterprise & Custom Scale (Initial Retainer)',
        amount: 3499,
        category: 'Enterprise Engineering',
        description: 'Bespoke web applications, custom APIs, SLA guarantee, and full security hardening.',
      },
    },
  ];

  // WORDPRESS & WOOCOMMERCE PACKAGES
  const wordPressPlans = [
    {
      id: 'wp-express',
      name: 'WordPress Express Launch',
      tagline: 'Fast, secure, and modern WordPress website tailored for local services, consultants, and blogs.',
      price: 449,
      badge: 'Fast Delivery',
      isPopular: false,
      timeline: '5 - 7 business days',
      features: [
        'Up to 5 custom styled WordPress pages',
        'Ultra-lightweight block-based theme architecture',
        'Mobile-first responsive layout on all devices',
        'Yoast / RankMath SEO setup & XML sitemaps',
        'Interactive contact forms with anti-spam CAPTCHA',
        'WordPress security hardening & firewall configuration',
        'Automated daily cloud backups (Google Drive / S3)',
        'Sub-1.5s page load caching (WP Super Cache / LiteSpeed)',
        '30-day post-launch technical warranty',
      ],
      idealFor: 'Small businesses, professionals, local contractors & portfolio sites',
      paymentItem: {
        id: 'wp-express-package',
        name: 'WordPress Express Launch Package',
        amount: 449,
        category: 'WordPress Development',
        description: '5-page custom responsive WordPress site with SEO & security hardening.',
      },
    },
    {
      id: 'wp-business-woo',
      name: 'WordPress Business & WooCommerce',
      tagline: 'High-converting WordPress platform with full WooCommerce storefront and custom Gutenberg block system.',
      price: 899,
      badge: 'Most Popular',
      isPopular: true,
      timeline: '10 - 14 business days',
      features: [
        'Up to 12 custom pages + full WooCommerce store',
        'Bespoke Gutenberg block patterns & Advanced Custom Fields (ACF)',
        'PayPal, Amazon Pay, and Stripe checkout configuration',
        'Product catalog setup (up to 25 products seeded)',
        'WP Rocket enterprise caching & 95+ PageSpeed optimization',
        'Schema.org product & organization rich snippets',
        'Automated transactional customer emails & invoice receipts',
        'Cross-browser QA testing & SSL security baseline',
        '1-on-1 WordPress admin video training session',
        '60-day post-launch warranty & bug fixes',
      ],
      idealFor: 'E-commerce storefronts, expanding service businesses & membership sites',
      paymentItem: {
        id: 'wp-business-woo-package',
        name: 'WordPress Business & WooCommerce Package',
        amount: 899,
        category: 'WordPress & WooCommerce',
        description: '12-page custom WordPress site with WooCommerce, Amazon Pay & PayPal, and 60-day warranty.',
      },
    },
    {
      id: 'wp-enterprise-headless',
      name: 'Headless WordPress & Custom Scale',
      tagline: 'Next.js / React decoupled frontend powered by headless WordPress CMS with enterprise multi-site architecture.',
      price: 1899,
      badge: 'Enterprise Performance',
      isPopular: false,
      timeline: '3 - 4 weeks',
      features: [
        'Decoupled Next.js / React frontend + WordPress GraphQL API',
        'Lightning-fast static page generation (SSG) & sub-second TTFB',
        'Custom WordPress plugin engineering & ERP/CRM webhooks',
        'Multi-site network or multi-lingual internationalization (WPML)',
        'Cloudflare Enterprise CDN & advanced DDoS protection',
        'Automated CI/CD staging and production deployment pipeline',
        'Full OWASP vulnerability inspection & Attestation Letter',
        'Role-based access control (RBAC) & two-factor authentication',
        '90-day comprehensive SLA warranty & dedicated lead engineer',
      ],
      idealFor: 'High-traffic media publishers, SaaS companies & complex web portals',
      paymentItem: {
        id: 'wp-enterprise-headless-package',
        name: 'Headless WordPress & Custom Scale Package',
        amount: 1899,
        category: 'Headless WordPress Engineering',
        description: 'Decoupled Next.js + WordPress GraphQL architecture, custom plugins, and 90-day SLA.',
      },
    },
  ];

  // DIGITAL MARKETING & PPC ACQUISITION PACKAGES
  const digitalMarketingPlans = [
    {
      id: 'marketing-starter',
      name: 'Starter PPC & Search Ads Launch',
      tagline: 'Laser-focused Google Search Ads campaign setup designed to capture high-intent buyers immediately.',
      price: 100,
      badge: 'Starter Choice',
      isPopular: false,
      timeline: 'Campaign live in 48 - 72 hours',
      features: [
        'Comprehensive Google Search Ads campaign build',
        'High-intent keyword research (up to 75 search terms)',
        'Rigorous negative keyword list to eliminate budget waste',
        'Landing page conversion audit & CTA recommendations',
        'Google Tag Manager (GTM) & GA4 conversion tracking',
        'Ad extensions setup (Callouts, Sitelinks, Call extensions)',
        'A/B responsive search ad copy testing (3 headlines + 2 descriptions)',
        'Bi-weekly bid management & search query optimization',
        'Transparent end-of-month ROI & conversion report',
      ],
      idealFor: 'Companies needing immediate qualified customer leads & calls',
      paymentItem: {
        id: 'marketing-starter-campaign',
        name: 'Starter PPC & Search Ads Launch Campaign',
        amount: 100,
        category: 'Digital Marketing & PPC',
        description: 'Complete Google Ads Search campaign setup, conversion tracking, and initial 30-day optimization.',
      },
    },
    {
      id: 'marketing-growth-omni',
      name: 'Omni-Channel Lead Acquisition',
      tagline: 'Multi-platform advertising across Google, Meta (Facebook & Instagram), and LinkedIn with custom creatives.',
      price: 199,
      badge: 'Most Popular',
      isPopular: true,
      timeline: 'Continuous Monthly Engine',
      features: [
        'Multi-channel campaign management (Google Ads + Meta + LinkedIn)',
        'Custom graphic ad creative design & sales copywriting',
        'Full-funnel architecture (Top-of-funnel discovery to bottom conversion)',
        'Advanced behavioral retargeting & audience lookalikes',
        'Server-Side Conversion API (Meta CAPI & Google Enhanced Conversions)',
        'Weekly ad budget allocation & ROAS optimization',
        'Landing page split testing for higher visitor conversion rates',
        'Competitor ad intelligence & copy monitoring',
        'Live 24/7 Looker Studio performance dashboard',
        'Bi-weekly strategic alignment call with Senior Media Buyer',
      ],
      idealFor: 'Scaling businesses looking to dominate both search & social channels',
      paymentItem: {
        id: 'marketing-growth-omni-campaign',
        name: 'Omni-Channel Lead Acquisition Engine',
        amount: 199,
        category: 'Performance Marketing',
        description: 'Multi-channel Google + Meta + LinkedIn management, custom ad creatives, and weekly optimization.',
      },
    },
    {
      id: 'marketing-enterprise-scale',
      name: 'Enterprise Performance Marketing & CRO',
      tagline: 'Full-service digital acquisition engine with video ad creatives, programmatic display, and dedicated strategist.',
      price: 300,
      badge: 'Full Scale Engine',
      isPopular: false,
      timeline: 'Custom Sprint Allocation',
      features: [
        'Omnichannel performance strategy (Search, Social, YouTube, Display)',
        'Dedicated Senior Growth Strategist & Media Buyer',
        'Motion graphic and video ad creative production included',
        'Full Conversion Rate Optimization (CRO) with Hotjar heatmaps',
        'Multi-touch attribution modeling & customer journey mapping',
        'Automated email lead nurturing sequences & CRM sync',
        'Custom landing page design & staging deployments',
        'Weekly executive performance sprint calls & Slack channel',
        '60-day satisfaction guarantee & transparent spend governance',
      ],
      idealFor: 'Funded tech startups, e-commerce brands, and national service companies',
      paymentItem: {
        id: 'marketing-enterprise-scale-campaign',
        name: 'Enterprise Performance Marketing & CRO Engine',
        amount: 300,
        category: 'Enterprise Growth Marketing',
        description: 'Full-funnel omnichannel acquisition, video creatives, CRO testing, and dedicated strategist.',
      },
    },
  ];

  // SEARCH ENGINE OPTIMIZATION (SEO) PACKAGES
  const seoPlans = [
    {
      id: 'seo-foundation',
      name: 'Local & Foundational SEO Sprint',
      tagline: 'Fix critical technical errors, optimize local search presence, and establish clean search engine authority.',
      price: 150,
      badge: 'Starter Choice',
      isPopular: false,
      timeline: 'Monthly Sprint',
      features: [
        'Comprehensive Google Business Profile (GBP) optimization',
        'Top 40 local business directory citations (NAP consistency)',
        'Full site technical crawl (404 fixes, redirect chains, canonicals)',
        'On-page title tags, meta descriptions & H1-H3 hierarchy (up to 10 pages)',
        'XML Sitemap & Robots.txt indexing configuration',
        'Google Search Console & Bing Webmaster Tools setup',
        'Local keyword rank tracking (up to 25 search terms)',
        'Monthly search visibility & impression progress report',
        '60-day money-back satisfaction guarantee',
      ],
      idealFor: 'Local businesses, physical storefronts, clinics & service providers',
      paymentItem: {
        id: 'seo-foundation-package',
        name: 'Local & Foundational SEO Sprint',
        amount: 150,
        category: 'Search Engine Optimization',
        description: 'Complete technical crawl fixes, local citations, Google Business Profile, and on-page metadata.',
      },
    },
    {
      id: 'seo-growth-content',
      name: 'National Organic Growth & Content',
      tagline: 'Drive consistent organic inbound traffic with technical SEO authority, Schema.org rich snippets, and content.',
      price: 299,
      badge: 'Most Popular',
      isPopular: true,
      timeline: 'Monthly Growth Program',
      features: [
        'Everything in Foundational SEO plus:',
        'Comprehensive programmatic Schema.org JSON-LD structured data',
        '4 high-authority, search-optimized articles or case studies per month',
        'Deep competitor backlink gap analysis & outreach strategy',
        'Internal link architecture optimization & topic clustering',
        'Core Web Vitals speed audit & crawl budget optimization',
        'National keyword rank tracking across 75 high-value search queries',
        'SERP feature tracking (Featured Snippets, People Also Ask)',
        'Bi-weekly technical reviews & monthly executive SEO dashboard',
      ],
      idealFor: 'E-commerce brands, B2B companies & software providers targeting national rank',
      paymentItem: {
        id: 'seo-growth-content-package',
        name: 'National Organic Growth & Content Program',
        amount: 299,
        category: 'Search Engine Optimization',
        description: 'Technical SEO, 4 monthly high-authority articles, Schema.org markup, and 75-keyword tracking.',
      },
    },
    {
      id: 'seo-enterprise-authority',
      name: 'Enterprise Authority & SERP Dominance',
      tagline: 'Aggressive organic market capture for high-competition industries with digital PR and Core Web Vitals engineering.',
      price: 450,
      badge: 'Full Dominance',
      isPopular: false,
      timeline: 'Dedicated SEO Team',
      features: [
        'Everything in National Organic Growth plus:',
        'Core Web Vitals performance engineering (guaranteed 95+ score)',
        'High-DA editorial link acquisition & digital PR placement',
        'Programmatic SEO architecture for thousands of landing pages',
        'International SEO (hreflang, multi-lingual, and multi-region)',
        'Keyword tracking across 200+ competitive terms with intent mapping',
        'Algorithmic penalty recovery & toxic link disavow management',
        'Dedicated Senior Technical SEO Director & weekly sync calls',
        'Guaranteed deliverables backed by our 60-day guarantee',
      ],
      idealFor: 'High-competition industries, enterprise SaaS & large-scale publishing networks',
      paymentItem: {
        id: 'seo-enterprise-authority-package',
        name: 'Enterprise Authority & SERP Dominance Program',
        amount: 450,
        category: 'Enterprise SEO',
        description: 'High-DA link acquisition, Core Web Vitals engineering, programmatic SEO, and 200+ keyword tracking.',
      },
    },
  ];

  const retainerPlans = [
    {
      id: 'retainer-essential',
      name: 'Essential Care & Maintenance',
      tagline: 'Reliable updates, uptime monitoring, security patching, and on-demand maintenance.',
      monthlyPrice: 149,
      annualPrice: 119,
      features: [
        '24/7 Real-time uptime & performance monitoring',
        'Weekly CMS, plugin, dependency & security updates',
        'Automated daily cloud backups with 30-day retention',
        'Continuous SSL certificate renewal & DNS supervision',
        'Up to 2 hours of monthly content or layout edits',
        'Same-day emergency response for security incidents',
        'Monthly health & search visibility performance report',
      ],
      paymentItem: {
        id: 'care-essential',
        name: 'Essential Care Plan (Monthly)',
        amount: retainerBilling === 'annual' ? 119 * 12 : 149,
        category: 'Maintenance Retainer',
        description: 'Uptime monitoring, daily backups, weekly security patching, and monthly support.',
      },
    },
    {
      id: 'retainer-growth',
      name: 'Growth & Optimization Engine',
      tagline: 'Continuous speed tuning, conversion rate optimization, and dedicated monthly development sprint.',
      monthlyPrice: 349,
      annualPrice: 279,
      badge: 'Best Value',
      isPopular: true,
      features: [
        'Everything in Essential Care plus:',
        'Up to 6 hours of monthly frontend coding & design adjustments',
        'Monthly A/B conversion testing & heat map analysis',
        'Continuous Core Web Vitals speed maintenance (>95)',
        'SEO keyword tracking & technical health audit',
        'Quarterly security vulnerability & port re-scan',
        'Priority 4-hour SLA ticket turnaround',
        'Direct Slack/Teams channel with lead developer',
      ],
      paymentItem: {
        id: 'care-growth',
        name: 'Growth & Optimization Engine (Care Plan)',
        amount: retainerBilling === 'annual' ? 279 * 12 : 349,
        category: 'Maintenance Retainer',
        description: '6 hours dev time, ongoing Core Web Vitals speed tuning, and priority SLA.',
      },
    },
    {
      id: 'retainer-enterprise',
      name: 'Dedicated Enterprise SLA',
      tagline: 'Virtual VP of Engineering for your digital infrastructure with guaranteed 1-hour critical response.',
      monthlyPrice: 799,
      annualPrice: 639,
      features: [
        'Everything in Growth & Optimization plus:',
        'Up to 15 hours of monthly software engineering & architecture',
        'Guaranteed 1-hour critical incident SLA with 24/7 on-call phone line',
        'Bi-weekly staging deployments & continuous integration audits',
        'Database query optimization & API load testing',
        'Full SOC 2 / CIS benchmark compliance adherence checks',
        'Quarterly executive architecture review & technical roadmap',
      ],
      paymentItem: {
        id: 'care-enterprise',
        name: 'Dedicated Enterprise SLA Retainer',
        amount: retainerBilling === 'annual' ? 639 * 12 : 799,
        category: 'Maintenance Retainer',
        description: '15 hours dev time, 1-hour SLA, and complete infrastructure stewardship.',
      },
    },
  ];

  const comparisonRows = [
    { category: 'Design & Visual Strategy', name: 'Custom Brand-Aligned Figma Design', starter: '5 Pages', growth: '12 Pages', enterprise: 'Unlimited' },
    { category: 'Design & Visual Strategy', name: 'Mobile / Tablet / Desktop Viewports', starter: true, growth: true, enterprise: true },
    { category: 'Design & Visual Strategy', name: 'Atomic UI Design Tokens & Component Library', starter: false, growth: true, enterprise: true },
    { category: 'Design & Visual Strategy', name: 'Interactive Click-Through Prototype', starter: false, growth: true, enterprise: true },
    { category: 'Engineering & Architecture', name: 'Modern React & TypeScript Tech Stack', starter: true, growth: true, enterprise: true },
    { category: 'Engineering & Architecture', name: 'Google PageSpeed 95+ Score Guarantee', starter: '90+', growth: '95+', enterprise: '98+' },
    { category: 'Engineering & Architecture', name: 'Headless CMS / Blog Publishing', starter: 'Optional', growth: true, enterprise: true },
    { category: 'Engineering & Architecture', name: 'Custom API Integrations & Webhooks', starter: false, growth: 'Standard', growthVal: 'Up to 3', enterprise: 'Unlimited' },
    { category: 'Payments & E-Commerce', name: 'PayPal & Amazon Pay Direct Integration', starter: 'Standard Form', growth: true, enterprise: true },
    { category: 'Payments & E-Commerce', name: 'Digistore24 / Multi-Currency Checkout Funnels', starter: false, growth: true, enterprise: true },
    { category: 'Security & Infrastructure', name: 'SSL Hardening & DNS Configuration', starter: true, growth: true, enterprise: true },
    { category: 'Security & Infrastructure', name: 'OWASP Vulnerability Assessment & Defense', starter: 'Basic', growth: true, enterprise: 'Full Pen Test' },
    { category: 'Security & Infrastructure', name: 'Automated Daily Backups & CDN', starter: false, growth: true, enterprise: true },
    { category: 'Support & Warranty', name: 'Post-Launch Technical Warranty', starter: '30 Days', growth: '60 Days', enterprise: '90 Days' },
    { category: 'Support & Warranty', name: 'Money-Back Satisfaction Guarantee', starter: '60 Days', growth: '60 Days', enterprise: '60 Days' },
    { category: 'Support & Warranty', name: 'Dedicated Lead Engineer', starter: false, growth: true, enterprise: 'Direct On-Call' },
  ];

  const pricingFaqs = [
    {
      q: 'What payment methods do you accept?',
      a: 'We accept Amazon Pay (1-Click checkout using your Amazon payment methods and stored address), PayPal (including PayPal Balance, Pay in 4, and linked bank accounts), and all major Credit/Debit Cards (Visa, Mastercard, American Express, Discover) processed securely with 256-bit SSL encryption. We also support official Digistore24 vendor checkouts.',
    },
    {
      q: 'How does the 60-day money-back guarantee work?',
      a: 'All PCSecure project packages and digital products come with a 60-day satisfaction guarantee. If our deliverables do not meet the agreed project specifications or quality standards outlined in your initial scope agreement, contact our support team within 60 days for a swift resolution or full refund under our transparent Refund Policy.',
    },
    {
      q: 'Can I split payments into milestones?',
      a: 'Yes. For our Growth and Enterprise custom projects, standard billing is divided into milestone installments (50% project kickoff deposit to secure your sprint slot, and 50% upon final staging approval prior to production DNS launch). You can pay each milestone securely via Amazon Pay, PayPal, or Card.',
    },
    {
      q: 'Do I own the copyright and source code once launched?',
      a: '100% yes. Upon final balance settlement, all intellectual property, Figma design master files, Git repositories, codebases, and media assets belong entirely to you with zero recurring proprietary vendor lock-in.',
    },
    {
      q: 'How long does a typical website take to complete?',
      a: 'Our Starter Web Launch packages are completed in 7 to 10 business days. Growth Business Platforms typically take 2 to 3 weeks. Enterprise custom builds range from 4 to 6 weeks depending on custom API and database scope. We also offer 7-day rush delivery if you have an urgent deadline.',
    },
    {
      q: 'What happens after my site goes live?',
      a: 'Every project includes a post-launch technical warranty (30 to 90 days depending on tier) covering any bug fixes, responsive adjustments, and questions. You can also transition smoothly to one of our Monthly Care & Retainer plans for ongoing speed tuning, security updates, and dedicated dev hours.',
    },
    {
      q: 'How do your WordPress packages differ from cheap marketplace themes?',
      a: 'We avoid bloated multipurpose themes and slow drag-and-drop page builders that load 50+ unnecessary scripts. Our WordPress builds use lightweight custom Gutenberg blocks and Advanced Custom Fields (ACF), resulting in clean code, 95+ Google PageSpeed scores, zero security bloat, and an intuitive editing dashboard for your staff.',
    },
    {
      q: 'What results can I expect from Digital Marketing & PPC campaigns?',
      a: 'Our campaigns are engineered for verifiable return on ad spend (ROAS). Search ads begin driving targeted qualified traffic within 48 to 72 hours of launch. With strict negative keyword curation and conversion-optimized landing pages, clients routinely see a 30% to 50% decrease in cost per acquisition (CPA) compared to previous agency management.',
    },
    {
      q: 'How quickly will I see organic ranking improvements with SEO packages?',
      a: 'Technical SEO fixes and Google Business Profile optimizations typically produce noticeable crawl improvements and indexation velocity within 2 to 4 weeks. Competitive national organic rankings and topic cluster authority build momentum consistently over 60 to 90 days, tracked weekly in your live analytics dashboard.',
    },
  ];

  return (
    <div id="pricing-page" className="w-full bg-white text-slate-900">
      {/* 1. HERO HEADER: CLEAN TYPOGRAPHIC MASTHEAD */}
      <section className="relative pt-14 pb-16 sm:pt-20 sm:pb-24 bg-gradient-to-b from-[#07172F] via-[#0B1F3A] to-[#0A1A33] text-white overflow-hidden w-full">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff 1px, #07172F 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Ambient radial blur glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0875E1]/20 blur-[130px] rounded-full pointer-events-none" />

        <div className="relative w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
          {/* Unboxed Metadata Category */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0875E1] mb-3">
            <span>Transparent Pricing</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>No Hidden Costs</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>60-Day Guarantee</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
            Predictable, Value-Driven Investment for Modern Web Excellence
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            High-converting web design, robust engineering, and ongoing maintenance.
            Pay safely using <span className="text-white font-semibold">Amazon Pay</span>,{' '}
            <span className="text-white font-semibold">PayPal</span>, or major credit cards.
          </p>

          {/* Payment Gateways Strip */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-slate-200">Amazon Pay 1-Click</span>
              <span className="text-slate-500">Fast checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="font-semibold text-slate-200">PayPal Buyer Protection</span>
              <span className="text-slate-500">Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-slate-300" />
              <span className="font-semibold text-slate-200">256-Bit SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-slate-200">60-Day Money-Back</span>
            </div>
          </div>

          {/* Interactive Category Tabs (Anti-slop clean segmented button control) */}
          <div className="mt-10 inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md gap-1">
            <button
              onClick={() => setActiveCategory('projects')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'projects'
                  ? 'bg-[#0875E1] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Custom Web Apps
            </button>
            <button
              onClick={() => setActiveCategory('wordpress')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'wordpress'
                  ? 'bg-[#0875E1] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              WordPress &amp; WooCommerce
            </button>
            <button
              onClick={() => setActiveCategory('marketing')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'marketing'
                  ? 'bg-[#0875E1] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Digital Marketing &amp; PPC
            </button>
            <button
              onClick={() => setActiveCategory('seo')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'seo'
                  ? 'bg-[#0875E1] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SEO &amp; Search Growth
            </button>
            <button
              onClick={() => setActiveCategory('retainers')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'retainers'
                  ? 'bg-[#0875E1] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Care Plans &amp; Retainers
            </button>
            <button
              onClick={() => setActiveCategory('products')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === 'products'
                  ? 'bg-[#0875E1] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Digital Toolkits
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN PRICING CONTENT SECTION */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80 w-full">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* TAB 1: FIXED-SCOPE PROJECTS */}
          {activeCategory === 'projects' && (
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1F3A]">
                  Select Your Project Package
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  All packages include custom Figma UI/UX, responsive mobile coding, Core Web Vitals speed optimization, and our 60-day guarantee.
                </p>
              </div>

              {/* 3 Tier Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {projectPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl bg-white border flex flex-col justify-between transition-all duration-200 ${
                      plan.isPopular
                        ? 'border-[#0875E1] ring-2 ring-[#0875E1]/20 shadow-xl lg:-translate-y-2'
                        : 'border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
                    }`}
                  >
                    {/* Popular Flag */}
                    {plan.isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0875E1] text-white text-xs font-bold tracking-wide uppercase rounded-full shadow-sm">
                        {plan.badge}
                      </div>
                    )}

                    <div className="p-7 sm:p-8 space-y-6">
                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-[#0B1F3A]">{plan.name}</h3>
                          {!plan.isPopular && plan.badge && (
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed min-h-[40px]">
                          {plan.tagline}
                        </p>
                      </div>

                      {/* Pricing Display */}
                      <div className="pt-2 pb-4 border-b border-slate-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                            ${plan.price.toLocaleString()}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            USD one-time
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-[#0875E1]" />
                          <span>Estimated turnaround: <strong className="text-slate-700 font-semibold">{plan.timeline}</strong></span>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          What is included:
                        </div>
                        <ul className="space-y-2.5 text-sm text-slate-700">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#0875E1] shrink-0 mt-0.5" />
                              <span className="leading-snug text-xs sm:text-sm">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Actions & Payment Options */}
                    <div className="p-7 sm:p-8 pt-0 space-y-3 bg-slate-50/50 rounded-b-2xl border-t border-slate-100">
                      <div className="text-[11px] text-slate-500 text-center">
                        Best for: <span className="font-semibold text-slate-700">{plan.idealFor}</span>
                      </div>

                      {/* Direct One-Click Checkout Triggers */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* PayPal Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenPayment(plan.paymentItem, 'paypal')}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#003087] hover:bg-[#002568] text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                          title="Pay safely with PayPal"
                        >
                          <span className="font-bold tracking-tight">PayPal</span>
                          <span className="text-[10px] opacity-80">Pay</span>
                        </button>

                        {/* Amazon Pay Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenPayment(plan.paymentItem, 'amazon_pay')}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#FF9900] hover:bg-[#e88b00] text-[#111111] font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                          title="Pay with Amazon Pay 1-Click"
                        >
                          <span>amazon</span>
                          <span className="font-light">pay</span>
                        </button>
                      </div>

                      {/* Standard Credit/Debit Card Option */}
                      <button
                        type="button"
                        onClick={() => handleOpenPayment(plan.paymentItem, 'card')}
                        className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Pay with Debit or Credit Card</span>
                      </button>

                      {/* Consultation / Proposal Request */}
                      <button
                        type="button"
                        onClick={() => onOpenProjectModal(plan.name)}
                        className="w-full py-2 text-center text-xs font-semibold text-[#0875E1] hover:text-[#0766c5] transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Need customizations? Request Proposal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: WORDPRESS & WOOCOMMERCE PACKAGES */}
          {activeCategory === 'wordpress' && (
            <div className="space-y-12 animate-in fade-in duration-200">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0875E1] bg-[#EAF4FF] px-3 py-1 rounded-full">
                  <Globe className="w-3.5 h-3.5" />
                  <span>WordPress &amp; WooCommerce Engineering</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1F3A]">
                  WordPress &amp; E-Commerce Packages
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Lightweight, blazing-fast WordPress platforms, custom Gutenberg blocks, and full WooCommerce stores engineered for zero bloated plugins and effortless client editing.
                </p>
              </div>

              {/* 3 Tier Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {wordPressPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl bg-white border flex flex-col justify-between transition-all duration-200 ${
                      plan.isPopular
                        ? 'border-[#0875E1] ring-2 ring-[#0875E1]/20 shadow-xl lg:-translate-y-2'
                        : 'border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0875E1] text-white text-xs font-bold tracking-wide uppercase rounded-full shadow-sm">
                        {plan.badge}
                      </div>
                    )}

                    <div className="p-7 sm:p-8 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-[#0B1F3A]">{plan.name}</h3>
                          {!plan.isPopular && plan.badge && (
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed min-h-[40px]">
                          {plan.tagline}
                        </p>
                      </div>

                      <div className="pt-2 pb-4 border-b border-slate-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                            ${plan.price.toLocaleString()}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            USD one-time
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-[#0875E1]" />
                          <span>Estimated delivery: <strong className="text-slate-700 font-semibold">{plan.timeline}</strong></span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          What is included:
                        </div>
                        <ul className="space-y-2.5 text-sm text-slate-700">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#0875E1] shrink-0 mt-0.5" />
                              <span className="leading-snug text-xs sm:text-sm">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-7 sm:p-8 pt-0 space-y-3 bg-slate-50/50 rounded-b-2xl border-t border-slate-100">
                      <div className="text-[11px] text-slate-500 text-center">
                        Best for: <span className="font-semibold text-slate-700">{plan.idealFor}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenPayment(plan.paymentItem, 'paypal')}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#003087] hover:bg-[#002568] text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <span className="font-bold tracking-tight">PayPal</span>
                          <span className="text-[10px] opacity-80">Pay</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenPayment(plan.paymentItem, 'amazon_pay')}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#FF9900] hover:bg-[#e88b00] text-[#111111] font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <span>amazon</span>
                          <span className="font-light">pay</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenPayment(plan.paymentItem, 'card')}
                        className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Pay with Debit or Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenProjectModal(plan.name)}
                        className="w-full py-2 text-center text-xs font-semibold text-[#0875E1] hover:text-[#0766c5] transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Request Custom WordPress Quote</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: DIGITAL MARKETING & PAID ACQUISITION PACKAGES */}
          {activeCategory === 'marketing' && (
            <div className="space-y-12 animate-in fade-in duration-200">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0875E1] bg-[#EAF4FF] px-3 py-1 rounded-full">
                  <Megaphone className="w-3.5 h-3.5" />
                  <span>Performance Marketing &amp; PPC Acquisition</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1F3A]">
                  Digital Marketing &amp; Paid Ads Packages
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Data-driven multi-platform PPC campaigns starting from $100 to $300 across Google Search, Meta Ads, and LinkedIn with server-side tracking, custom creatives, and transparent weekly reporting.
                </p>
              </div>

              {/* 3 Tier Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {digitalMarketingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl bg-white border flex flex-col justify-between transition-all duration-200 ${
                      plan.isPopular
                        ? 'border-[#0875E1] ring-2 ring-[#0875E1]/20 shadow-xl lg:-translate-y-2'
                        : 'border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0875E1] text-white text-xs font-bold tracking-wide uppercase rounded-full shadow-sm">
                        {plan.badge}
                      </div>
                    )}

                    <div className="p-7 sm:p-8 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-[#0B1F3A]">{plan.name}</h3>
                          {!plan.isPopular && plan.badge && (
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed min-h-[40px]">
                          {plan.tagline}
                        </p>
                      </div>

                      <div className="pt-2 pb-4 border-b border-slate-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                            ${plan.price.toLocaleString()}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            USD / month
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-[#0875E1]" />
                          <span>Turnaround: <strong className="text-slate-700 font-semibold">{plan.timeline}</strong></span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          What is included:
                        </div>
                        <ul className="space-y-2.5 text-sm text-slate-700">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#0875E1] shrink-0 mt-0.5" />
                              <span className="leading-snug text-xs sm:text-sm">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-7 sm:p-8 pt-0 space-y-3 bg-slate-50/50 rounded-b-2xl border-t border-slate-100">
                      <div className="text-[11px] text-slate-500 text-center">
                        Best for: <span className="font-semibold text-slate-700">{plan.idealFor}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenPayment(plan.paymentItem, 'paypal')}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#003087] hover:bg-[#002568] text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <span className="font-bold tracking-tight">PayPal</span>
                          <span className="text-[10px] opacity-80">Pay</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenPayment(plan.paymentItem, 'amazon_pay')}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#FF9900] hover:bg-[#e88b00] text-[#111111] font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <span>amazon</span>
                          <span className="font-light">pay</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenPayment(plan.paymentItem, 'card')}
                        className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Pay with Debit or Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenProjectModal(plan.name)}
                        className="w-full py-2 text-center text-xs font-semibold text-[#0875E1] hover:text-[#0766c5] transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Request Custom Campaign Strategy</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SEARCH ENGINE OPTIMIZATION (SEO) PACKAGES */}
          {activeCategory === 'seo' && (
            <div className="space-y-12 animate-in fade-in duration-200">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0875E1] bg-[#EAF4FF] px-3 py-1 rounded-full">
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Engine Optimization &amp; Technical Authority</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1F3A]">
                  SEO &amp; Organic Search Growth Packages
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Ethical, data-backed organic rankings starting from $150 to $450. We combine programmatic Schema.org markup, technical speed audits, high-intent keyword clustering, and authoritative editorial content.
                </p>
              </div>

              {/* 3 Tier Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {seoPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-2xl bg-white border flex flex-col justify-between transition-all duration-200 ${
                      plan.isPopular
                        ? 'border-[#0875E1] ring-2 ring-[#0875E1]/20 shadow-xl lg:-translate-y-2'
                        : 'border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300'
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0875E1] text-white text-xs font-bold tracking-wide uppercase rounded-full shadow-sm">
                        {plan.badge}
                      </div>
                    )}

                    <div className="p-7 sm:p-8 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-[#0B1F3A]">{plan.name}</h3>
                          {!plan.isPopular && plan.badge && (
                            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {plan.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed min-h-[40px]">
                          {plan.tagline}
                        </p>
                      </div>

                      <div className="pt-2 pb-4 border-b border-slate-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                            ${plan.price.toLocaleString()}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            USD / month
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-[#0875E1]" />
                          <span>Cadence: <strong className="text-slate-700 font-semibold">{plan.timeline}</strong></span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          What is included:
                        </div>
                        <ul className="space-y-2.5 text-sm text-slate-700">
                          {plan.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <CheckCircle2 className="w-4 h-4 text-[#0875E1] shrink-0 mt-0.5" />
                              <span className="leading-snug text-xs sm:text-sm">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="p-7 sm:p-8 pt-0 space-y-3 bg-slate-50/50 rounded-b-2xl border-t border-slate-100">
                      <div className="text-[11px] text-slate-500 text-center">
                        Best for: <span className="font-semibold text-slate-700">{plan.idealFor}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenPayment(plan.paymentItem, 'paypal')}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#003087] hover:bg-[#002568] text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <span className="font-bold tracking-tight">PayPal</span>
                          <span className="text-[10px] opacity-80">Pay</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenPayment(plan.paymentItem, 'amazon_pay')}
                          className="w-full py-2.5 px-3 rounded-lg bg-[#FF9900] hover:bg-[#e88b00] text-[#111111] font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <span>amazon</span>
                          <span className="font-light">pay</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenPayment(plan.paymentItem, 'card')}
                        className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Pay with Debit or Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenProjectModal(plan.name)}
                        className="w-full py-2 text-center text-xs font-semibold text-[#0875E1] hover:text-[#0766c5] transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Request Custom SEO Proposal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CARE PLANS & RETAINERS */}
          {activeCategory === 'retainers' && (
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1F3A]">
                  Ongoing Website Care & Maintenance Retainers
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Keep your digital assets fast, secure, backed-up, and continuously evolving without hiring full-time internal engineering staff.
                </p>

                {/* Annual vs Monthly Billing Toggle */}
                <div className="inline-flex items-center gap-3 p-1 bg-slate-200/80 rounded-xl">
                  <button
                    onClick={() => setRetainerBilling('monthly')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      retainerBilling === 'monthly'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Monthly Billing
                  </button>
                  <button
                    onClick={() => setRetainerBilling('annual')}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                      retainerBilling === 'annual'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>Annual Billing</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Retainer Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {retainerPlans.map((plan) => {
                  const effectivePrice =
                    retainerBilling === 'annual' ? plan.annualPrice : plan.monthlyPrice;

                  return (
                    <div
                      key={plan.id}
                      className={`relative rounded-2xl bg-white border flex flex-col justify-between transition duration-200 ${
                        plan.isPopular
                          ? 'border-[#0875E1] ring-2 ring-[#0875E1]/20 shadow-xl'
                          : 'border-slate-200/90 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {plan.isPopular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0875E1] text-white text-xs font-bold tracking-wide uppercase rounded-full shadow-sm">
                          {plan.badge}
                        </div>
                      )}

                      <div className="p-7 sm:p-8 space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-[#0B1F3A]">{plan.name}</h3>
                          <p className="text-xs text-slate-600 leading-relaxed min-h-[38px]">
                            {plan.tagline}
                          </p>
                        </div>

                        <div className="pt-2 pb-4 border-b border-slate-100">
                          <div className="flex items-baseline gap-1">
                            <span className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                              ${effectivePrice}
                            </span>
                            <span className="text-xs font-medium text-slate-500">
                              / month {retainerBilling === 'annual' ? '(billed yearly)' : ''}
                            </span>
                          </div>
                          {retainerBilling === 'annual' && (
                            <div className="mt-1 text-[11px] text-emerald-600 font-semibold">
                              Billed ${effectivePrice * 12} annually (2 months free included)
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Included Service Level:
                          </div>
                          <ul className="space-y-2.5 text-sm text-slate-700">
                            {plan.features.map((feat, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#0875E1] shrink-0 mt-0.5" />
                                <span className="leading-snug text-xs sm:text-sm">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="p-7 sm:p-8 pt-0 space-y-3 bg-slate-50/50 rounded-b-2xl border-t border-slate-100">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenPayment(plan.paymentItem, 'paypal')}
                            className="w-full py-2.5 px-3 rounded-lg bg-[#003087] hover:bg-[#002568] text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                          >
                            <span className="font-bold tracking-tight">PayPal</span>
                            <span className="text-[10px] opacity-80">Subscribe</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenPayment(plan.paymentItem, 'amazon_pay')}
                            className="w-full py-2.5 px-3 rounded-lg bg-[#FF9900] hover:bg-[#e88b00] text-[#111111] font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                          >
                            <span>amazon</span>
                            <span className="font-light">pay</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleOpenPayment(plan.paymentItem, 'card')}
                          className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Subscribe via Credit/Debit Card</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: DIGITAL TOOLKITS & AUDITS */}
          {activeCategory === 'products' && (
            <div className="space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1F3A]">
                  Instant Digital Toolkits, Security Guides & Audits
                </h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Pre-compiled server hardening profiles, compliance policy templates, and manual security reviews available for immediate digital delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => {
                  const itemPayment: PaymentItem = {
                    id: product.id,
                    name: product.name,
                    amount: product.salePrice || product.regularPrice,
                    category: product.category,
                    description: product.shortDescription,
                    downloadUrl: product.deliveryResourceUrl,
                  };

                  return (
                    <div
                      key={product.id}
                      className="rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div className="p-6 space-y-4">
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {product.badge && (
                            <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 bg-white/95 text-slate-900 rounded shadow-xs">
                              {product.badge}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <div className="text-xs font-semibold text-[#0875E1] uppercase tracking-wider">
                            {product.category}
                          </div>
                          <h3 className="text-lg font-bold text-[#0B1F3A] leading-snug line-clamp-2">
                            {product.name}
                          </h3>
                          <p className="text-xs text-slate-600 line-clamp-3">
                            {product.shortDescription}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold text-[#0B1F3A]">
                            ${product.salePrice || product.regularPrice}
                          </span>
                          {product.salePrice && product.regularPrice && (
                            <span className="text-xs line-through text-slate-400">
                              ${product.regularPrice}
                            </span>
                          )}
                          <span className="text-xs text-slate-500 font-medium">USD</span>
                        </div>
                      </div>

                      <div className="p-6 pt-0 space-y-2 bg-slate-50/50 rounded-b-2xl border-t border-slate-100">
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenPayment(itemPayment, 'paypal')}
                            className="w-full py-2 px-2.5 rounded-lg bg-[#003087] hover:bg-[#002568] text-white font-semibold text-xs transition flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                          >
                            <span>PayPal</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenPayment(itemPayment, 'amazon_pay')}
                            className="w-full py-2 px-2.5 rounded-lg bg-[#FF9900] hover:bg-[#e88b00] text-[#111] font-bold text-xs transition flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                          >
                            <span>Amazon Pay</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onNavigate({ type: 'product-sales', slug: product.slug })}
                          className="w-full py-2 text-center text-xs font-semibold text-[#0875E1] hover:text-[#0766c5] transition cursor-pointer"
                        >
                          View Full Product Overview & Specs →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. INTERACTIVE PROJECT SCOPE & PRICING CALCULATOR */}
      <section id="pricing-calculator" className="py-20 bg-white border-b border-slate-200/80 w-full">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0875E1]">
              <Calculator className="w-4 h-4" />
              <span>Interactive Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Build Your Custom Project Scope
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Adjust parameters, select required capabilities, and calculate your exact estimated investment with instant PayPal, Amazon Pay, or card checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Interactive Controls (Span 7) */}
            <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-8 shadow-xs">
              {/* Slider: Number of Pages */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="calc-pages" className="text-sm font-bold text-[#0B1F3A]">
                    Estimated Page Count
                  </label>
                  <span className="text-base font-extrabold text-[#0875E1] bg-[#EAF4FF] px-3 py-1 rounded-md">
                    {calcPages} {calcPages === 1 ? 'Page' : 'Pages'}
                  </span>
                </div>
                <input
                  id="calc-pages"
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={calcPages}
                  onChange={(e) => setCalcPages(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0875E1]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>1 Page (Landing)</span>
                  <span>5 Pages (Standard)</span>
                  <span>12 Pages (Multi)</span>
                  <span>25+ Pages (Large)</span>
                </div>
              </div>

              {/* Design Tier Segmented Control */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#0B1F3A]">
                  Design Architecture Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCalcDesignTier('custom')}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                      calcDesignTier === 'custom'
                        ? 'border-[#0875E1] bg-white ring-2 ring-[#0875E1]/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-sm font-bold text-[#0B1F3A]">Custom Figma UI/UX</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Atomic design system, responsive breakpoints & layout tokens.
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcDesignTier('bespoke')}
                    className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                      calcDesignTier === 'bespoke'
                        ? 'border-[#0875E1] bg-white ring-2 ring-[#0875E1]/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-sm font-bold text-[#0B1F3A]">
                      Bespoke Interactive Prototyping
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Micro-animations, full click-through prototype & brand kit.
                    </div>
                  </button>
                </div>
              </div>

              {/* Checkbox Options Grid */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#0B1F3A]">
                  Add-on Modules & Engineering Capabilities
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* E-Commerce */}
                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={calcEcommerce}
                      onChange={(e) => setCalcEcommerce(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#0875E1] focus:ring-[#0875E1] cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#0B1F3A]">
                        E-Commerce & Storefront (+$450)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Product catalog, cart, Amazon Pay & PayPal gateway.
                      </div>
                    </div>
                  </label>

                  {/* CMS */}
                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={calcCms}
                      onChange={(e) => setCalcCms(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#0875E1] focus:ring-[#0875E1] cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#0B1F3A]">
                        Headless CMS / Blog (+$250)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Effortless editor to post articles, case studies & updates.
                      </div>
                    </div>
                  </label>

                  {/* Speed Opt */}
                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={calcSpeedOpt}
                      onChange={(e) => setCalcSpeedOpt(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#0875E1] focus:ring-[#0875E1] cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#0B1F3A]">
                        95+ PageSpeed Core Web Vitals (+$180)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Image compression, code splitting & sub-second loading.
                      </div>
                    </div>
                  </label>

                  {/* Security Hardening */}
                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={calcSecurityHardening}
                      onChange={(e) => setCalcSecurityHardening(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#0875E1] focus:ring-[#0875E1] cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#0B1F3A]">
                        Cybersecurity Hardening (+$220)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        CSP headers, sanitization, anti-bot defense & SSL audit.
                      </div>
                    </div>
                  </label>

                  {/* Copywriting */}
                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={calcCopywriting}
                      onChange={(e) => setCalcCopywriting(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#0875E1] focus:ring-[#0875E1] cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#0B1F3A]">
                        Professional Copywriting (+${calcPages * 65})
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Conversion-engineered headlines & sales copy ($65/page).
                      </div>
                    </div>
                  </label>

                  {/* Rush Delivery */}
                  <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 cursor-pointer transition">
                    <input
                      type="checkbox"
                      checked={calcExpressTurnaround}
                      onChange={(e) => setCalcExpressTurnaround(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded text-[#0875E1] focus:ring-[#0875E1] cursor-pointer"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#0B1F3A]">
                        Rush 7-Day Priority Launch (+$350)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Accelerated sprint allocation with daily check-ins.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Live Calculation Summary Card (Span 5) */}
            <div className="lg:col-span-5 bg-[#07172F] text-white rounded-2xl p-7 sm:p-8 space-y-6 shadow-xl sticky top-28">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0875E1]">
                  Live Scope Estimate
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Calculated Investment
                </h3>
              </div>

              {/* Total Price Banner */}
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-400">Total Project Estimate:</span>
                  <div className="text-right">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">
                      ${calculatedTotal.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">USD</span>
                  </div>
                </div>
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Backed by 60-day money-back guarantee</span>
                </div>
              </div>

              {/* Scope Breakdown */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span>Base Architecture & {calcPages} Pages:</span>
                  <span className="font-semibold text-white">
                    ${(calcDesignTier === 'custom' ? 499 : 899) + Math.max(0, calcPages - 3) * 95}
                  </span>
                </div>
                {calcEcommerce && (
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>E-Commerce & Payment Gateway:</span>
                    <span className="font-semibold text-white">+$450</span>
                  </div>
                )}
                {calcCms && (
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Headless CMS & Blog:</span>
                    <span className="font-semibold text-white">+$250</span>
                  </div>
                )}
                {calcSpeedOpt && (
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>95+ Core Web Vitals Tuning:</span>
                    <span className="font-semibold text-white">+$180</span>
                  </div>
                )}
                {calcSecurityHardening && (
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Cybersecurity Baseline Defense:</span>
                    <span className="font-semibold text-white">+$220</span>
                  </div>
                )}
                {calcCopywriting && (
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Professional Copywriting ({calcPages} pages):</span>
                    <span className="font-semibold text-white">+${calcPages * 65}</span>
                  </div>
                )}
                {calcExpressTurnaround && (
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Priority 7-Day Express Allocation:</span>
                    <span className="font-semibold text-white">+$350</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 pt-2 text-slate-300">
                  <span className="font-semibold">Estimated Timeline:</span>
                  <span className="font-bold text-[#0875E1]">{estimatedWeeks}</span>
                </div>
              </div>

              {/* Checkout Triggers */}
              <div className="pt-2 space-y-3">
                <div className="text-xs font-semibold text-slate-400 text-center">
                  Lock in this scope now with 1-click checkout:
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenPayment(
                        {
                          name: `Custom Scope Project (${calcPages} Pages)`,
                          amount: calculatedTotal,
                          category: 'Custom Project',
                          description: `Custom configured scope with ${calcPages} pages, design, and selected add-ons.`,
                        },
                        'paypal'
                      )
                    }
                    className="w-full py-3 px-3 rounded-lg bg-[#003087] hover:bg-[#002568] text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>PayPal</span>
                    <span className="text-[10px] font-normal opacity-80">Checkout</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleOpenPayment(
                        {
                          name: `Custom Scope Project (${calcPages} Pages)`,
                          amount: calculatedTotal,
                          category: 'Custom Project',
                          description: `Custom configured scope with ${calcPages} pages, design, and selected add-ons.`,
                        },
                        'amazon_pay'
                      )
                    }
                    className="w-full py-3 px-3 rounded-lg bg-[#FF9900] hover:bg-[#e88b00] text-[#111111] font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <span>amazon</span>
                    <span className="font-light">pay</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleOpenPayment(
                      {
                        name: `Custom Scope Project (${calcPages} Pages)`,
                        amount: calculatedTotal,
                        category: 'Custom Project',
                        description: `Custom configured scope with ${calcPages} pages, design, and selected add-ons.`,
                      },
                      'card'
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
                >
                  <span>Pay with Debit or Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onOpenProjectModal(`Custom Estimated Project (${calcPages} Pages - $${calculatedTotal})`)
                  }
                  className="w-full py-2 text-center text-xs text-slate-400 hover:text-white transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Or email me this scope as an official quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPREHENSIVE SIDE-BY-SIDE FEATURE COMPARISON MATRIX */}
      <section className="py-20 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80 w-full">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0875E1]">
              Deep Dive
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1F3A]">
              Comprehensive Feature Comparison
            </h2>
            <p className="text-slate-600 text-sm">
              Evaluate features side-by-side to choose the exact level of design fidelity and engineering rigor your business needs.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="py-4 px-6 text-sm font-bold text-[#0B1F3A] w-2/5">
                    Feature & Deliverable
                  </th>
                  <th className="py-4 px-6 text-sm font-bold text-[#0B1F3A] w-1/5 text-center">
                    Starter ($599)
                  </th>
                  <th className="py-4 px-6 text-sm font-bold text-[#0875E1] w-1/5 text-center bg-[#EAF4FF]/40">
                    Growth ($1,499)
                  </th>
                  <th className="py-4 px-6 text-sm font-bold text-[#0B1F3A] w-1/5 text-center">
                    Enterprise ($3,499+)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-6">
                      <div className="font-semibold text-slate-900">{row.name}</div>
                      <div className="text-[11px] text-slate-400">{row.category}</div>
                    </td>

                    {/* Starter Column */}
                    <td className="py-3.5 px-6 text-center">
                      {typeof row.starter === 'boolean' ? (
                        row.starter ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <CloseIcon className="w-4 h-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-medium text-slate-700">{row.starter}</span>
                      )}
                    </td>

                    {/* Growth Column (Highlighted) */}
                    <td className="py-3.5 px-6 text-center bg-[#EAF4FF]/20 font-medium">
                      {typeof row.growth === 'boolean' ? (
                        row.growth ? (
                          <Check className="w-4 h-4 text-[#0875E1] mx-auto" />
                        ) : (
                          <CloseIcon className="w-4 h-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-[#0875E1]">
                          {row.growthVal || row.growth}
                        </span>
                      )}
                    </td>

                    {/* Enterprise Column */}
                    <td className="py-3.5 px-6 text-center">
                      {typeof row.enterprise === 'boolean' ? (
                        row.enterprise ? (
                          <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <CloseIcon className="w-4 h-4 text-slate-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-bold text-slate-900">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. PAYMENT METHODS & TRUST STRIP */}
      <section className="py-16 bg-white border-b border-slate-200/80 w-full">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="bg-[#07172F] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#0875E1]/20 flex items-center justify-center text-[#0875E1]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">60-Day Money-Back Guarantee</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Full client protection. If the final deliverables do not match agreed specifications, request a complete refund.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#FF9900]/20 flex items-center justify-center text-[#FF9900]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">Amazon Pay Integration</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fast, secure 1-click checkout leveraging your stored Amazon account credentials and delivery settings.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">PayPal Buyer Protection</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pay securely with PayPal balance, linked bank accounts, or debit cards with verified dispute resolution.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white">256-Bit SSL Encryption</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Bank-level cryptographic cipher suites protect customer data and payment tokens at all times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PRICING FAQ ACCORDION */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200/80 w-full">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 max-w-4xl">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0875E1]">
              Clarity & Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1F3A]">
              Frequently Asked Questions About Pricing
            </h2>
            <p className="text-slate-600 text-sm">
              Answers regarding payment gateways, warranty terms, ownership, and revision scopes.
            </p>
          </div>

          <div className="space-y-3">
            {pricingFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#0B1F3A]">
                      {faq.q}
                    </span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#0875E1]" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FINAL CONVERSION BANNER */}
      <section className="py-20 bg-white w-full text-center">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Ready to Upgrade Your Digital Presence?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Schedule a 15-minute alignment call with our principal engineer, or get started immediately by securing your package through Amazon Pay or PayPal.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenProjectModal()}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0875E1] hover:bg-[#0766c5] active:bg-[#0658a8] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Custom Project Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:8103310605"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#0875E1]" />
                <span>Call (810) 331 0605</span>
              </a>
            </div>

            <div className="text-xs text-slate-400 pt-2">
              Typical response time under 2 business hours · No obligation discovery consultation
            </div>
          </div>
        </div>
      </section>

      {/* 8. PAYMENT GATEWAY MODAL (PAYPAL, AMAZON PAY & CARD CHECKOUT) */}
      <PaymentGatewayModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        settings={settings}
        item={paymentItem}
        initialMethod={paymentMethod}
        onNavigate={onNavigate}
      />
    </div>
  );
};
