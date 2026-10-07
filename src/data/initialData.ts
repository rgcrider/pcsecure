import { Product, CompanySettings, CaseStudy, BlogPost } from '../types';
import { APP_IMAGES } from './imageAssets';

export const INITIAL_COMPANY_SETTINGS: CompanySettings = {
  companyName: 'PCSecure',
  brandName: 'PCSecure',
  businessType: 'Web Design, Website Development & Digital Experiences',
  supportEmail: 'support@pcsecure.tech',
  businessEmail: 'support@pcsecure.tech',
  phoneNumber: '(810) 331-0605',
  businessAddress: '9585 Pottawatamie Dr, Manitou Beach, MI 49253, United States',
  businessHours: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
  defaultStatementDescriptor: 'DIGISTORE24',
  defaultGuaranteeDays: 60,
  adminPin: 'admin123',

  // PayPal Gateway Initial Configuration
  enablePaypal: true,
  paypalClientId: 'sb-client-id-pcsecure-sandbox',
  paypalEmail: 'john@pcsecure.tech',
  paypalMode: 'sandbox',
  paypalCurrency: 'USD',

  // Amazon Pay Gateway Initial Configuration
  enableAmazonPay: true,
  amazonPayMerchantId: 'A2SAMPLEPAYID',
  amazonPayClientId: 'amzn1.application-oa2-client.sample123',
  amazonPayPublicKeyId: 'SANDBOX-PUB-KEY-PCSECURE',
  amazonPayStoreId: 'amzn1.application.pcsecure-store',
  amazonPayMode: 'sandbox',
  amazonPayRegion: 'us',

  // Direct Card Payments
  enableCardPayments: true,
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    slug: 'pcsecure-audit-hardening-toolkit',
    name: 'PCSecure Cybersecurity Audit & Hardening Toolkit',
    category: 'Software',
    isSample: true,
    published: true,
    badge: 'Best Seller',
    shortDescription:
      'Automated baseline auditing, vulnerability discovery scripts, and system hardening configurations for modern IT infrastructures.',
    description:
      'The PCSecure Cybersecurity Audit & Hardening Toolkit provides enterprise-grade diagnostic scripts, automated server hardening templates, and security configuration benchmarks designed to secure Linux, Windows Server, and cloud environments against modern intrusion vectors.',
    regularPrice: 149.0,
    salePrice: 97.0,
    currency: '$',
    imageUrl:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    checkoutUrl: 'https://www.digistore24.com/redir/555101/SAMPLE_AFFILIATE/',
    statementDescriptor: 'DIGISTORE24',
    deliveryMethod: 'download',
    deliveryInstructions:
      'Immediately upon order confirmation, you will receive direct access to download the complete PCSecure Hardening Toolkit ZIP archive (including PowerShell/Bash scripts, deployment documentation, and video walkthroughs). A backup download link and your unique license verification token are also automatically emailed to your purchase address.',
    deliveryResourceUrl: 'https://downloads.pcsecurellc.com/builds/pcsecure-toolkit-v3.4.zip',
    deliveryFileName: 'pcsecure-audit-hardening-toolkit-v3.4.zip',
    features: [
      'Automated CIS Benchmark compliance scanner for Windows & Linux',
      'One-click server security baseline hardening script library',
      'Port intrusion & anomalous service detection scanner',
      'Firewall & iptables defense rule configuration generator',
      'Cryptographic integrity and file-change monitoring scripts',
      'Comprehensive HTML & PDF executive vulnerability reporting engine',
    ],
    benefits: [
      {
        title: 'Instant Threat Reduction',
        description: 'Close over 90% of standard misconfigurations and known exploitation vectors in minutes.',
      },
      {
        title: 'Zero Recurring Vendor Lock-in',
        description: 'Run our standalone diagnostic and hardening scripts without requiring costly recurring agent subscriptions.',
      },
      {
        title: 'Audit-Ready Compliance',
        description: 'Generate comprehensive documentation aligned with CIS, NIST, and SOC 2 baseline principles.',
      },
    ],
    whatYouGet: [
      'Full source-available automated PowerShell and Bash script library',
      'Step-by-step PDF Hardening Blueprint & Administrator Runbook (140+ pages)',
      'Pre-compiled hardening profiles for Debian, Ubuntu, RHEL, and Windows Server',
      'Digital License Certificate granting perpetual commercial usage',
      '12 Months of maintenance updates and script patch revisions',
      'Direct email engineering support from PCSecure certified specialists',
    ],
    whoIsItFor: [
      'System Administrators and DevOps engineers tasked with server security',
      'Small to medium businesses seeking enterprise-level protection on a reasonable budget',
      'IT managed service providers (MSPs) auditing client infrastructure',
      'Solo web developers managing production cloud servers',
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Secure One-Click Purchase',
        description: 'Complete your checkout through the official Digistore24 verified checkout portal.',
      },
      {
        step: 2,
        title: 'Instant Toolkit Download',
        description: 'Gain immediate access to the encrypted ZIP package and cryptographic checksums on your thank-you page.',
      },
      {
        step: 3,
        title: 'Execute Audit & Harden',
        description: 'Unpack scripts, execute the read-only audit to inspect current risk scores, then apply the modular hardening profile.',
      },
    ],
    whatIsIncluded: [
      'Complete script archive (.ps1, .sh, .py)',
      'Executive Summary & Risk Rating templates (.xlsx & .docx)',
      'Quick-start deployment guide (PDF)',
      'Perpetual software license key',
    ],
    screenshots: [
      {
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        caption: 'Audit Scanner CLI Execution & Risk Assessment Matrix',
      },
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        caption: 'Automated HTML Compliance & Vulnerability Reporting Dashboard',
      },
    ],
    testimonials: [
      {
        name: 'David Vance',
        role: 'Director of IT Operations',
        company: 'Apex Logistics Group',
        comment:
          'The PCSecure Hardening Toolkit identified 18 critical configuration oversights on our public-facing cluster that our regular anti-virus never flagged. Applied the hardening profiles in under an hour without disrupting services.',
        rating: 5,
      },
      {
        name: 'Elena Rostova',
        role: 'Lead Cloud Architect',
        company: 'Vanguard FinTech',
        comment:
          'Clear, well-commented scripts and thorough documentation. Exactly what an engineering team wants instead of bloated proprietary black-box software.',
        rating: 5,
      },
    ],
    faqs: [
      {
        question: 'What operating systems are supported?',
        answer:
          'The toolkit supports Ubuntu 20.04/22.04/24.04 LTS, Debian 11/12, CentOS/RHEL/AlmaLinux 8 & 9, and Microsoft Windows Server 2016, 2019, and 2022.',
      },
      {
        question: 'Can I use this on multiple servers?',
        answer:
          'Yes! The standard license includes unlimited internal server usage within your single organization or company domain.',
      },
      {
        question: 'How do I receive product updates?',
        answer:
          'You receive 12 months of version releases and threat signature updates, accessible via our customer download repository with your license key.',
      },
      {
        question: 'How does the 60-day money-back guarantee work?',
        answer:
          'If you are not completely satisfied with the toolkit within 60 days of purchase, simply submit a refund request to our support team or via Digistore24. We will issue a 100% refund without hassle.',
      },
    ],
    guaranteeHeading: '60-Day Money-Back Guarantee',
    guaranteeText:
      'Your purchase is protected by our 60-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 60 days of your purchase date, subject to the terms of our Refund Policy.',
    supportEmail: 'support@pcsecure.tech',
    supportHours: 'Monday - Friday, 9am - 6pm EST',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T14:30:00Z',
  },
  {
    id: 'prod-002',
    slug: 'cloudshield-pro-security-suite',
    name: 'CloudShield Pro: Enterprise Security Checklist & Policy Suite',
    category: 'Digital Guide',
    isSample: true,
    published: true,
    badge: 'Popular Guide',
    shortDescription:
      'Complete ready-to-adopt information security policies, incident response runbooks, and cloud architecture compliance checklists.',
    description:
      'Avoid months of expensive legal and compliance consultancy fees. CloudShield Pro provides a complete repository of pre-drafted, attorney-vetted cybersecurity policies, business continuity plans, and vendor risk assessment templates customized for tech startups and IT departments.',
    regularPrice: 79.0,
    salePrice: 47.0,
    currency: '$',
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    checkoutUrl: 'https://www.digistore24.com/redir/555102/SAMPLE_AFFILIATE/',
    statementDescriptor: 'DIGISTORE24',
    deliveryMethod: 'download',
    deliveryInstructions:
      'Upon checkout confirmation, you will receive instantaneous access to the complete CloudShield Pro digital bundle. The package contains fully editable Microsoft Word (.docx), PDF, and Excel (.xlsx) templates organized by compliance domains. A receipt with persistent download access is dispatched to your email immediately.',
    deliveryResourceUrl: 'https://downloads.pcsecurellc.com/guides/cloudshield-pro-suite-2025.zip',
    deliveryFileName: 'cloudshield-enterprise-policy-suite-2025.zip',
    features: [
      '38 Turnkey Information Security Policies (SOC 2, ISO 27001, HIPAA aligned)',
      'Data Breach & Security Incident Response Playbook with ready escalation trees',
      'Cloud Architecture Security Baseline Checklist (AWS, Google Cloud, Azure)',
      'Third-Party Vendor Risk Assessment Scoring Matrix in Excel',
      'Employee Acceptable Use & Remote Work Security Agreements',
      'Disaster Recovery & Business Continuity Plan template',
    ],
    benefits: [
      {
        title: 'Save $10,000+ in Legal Fees',
        description: 'Pre-drafted by senior compliance officers and reviewed for standard compliance requirements.',
      },
      {
        title: 'Pass Enterprise Vendor Audits',
        description: 'Provide enterprise prospective clients with comprehensive security policies that establish instant authority.',
      },
      {
        title: '100% Editable in MS Office / Docs',
        description: 'Simply replace placeholder company tokens with your business details in under an afternoon.',
      },
    ],
    whatYouGet: [
      'Complete Policy Suite (38 .docx and .pdf files)',
      'Risk Assessment & Vendor Scoring Workbooks (.xlsx)',
      'Audit Readiness Checklist & Gap Analysis Guide',
      'Free lifetime updates for all 2025/2026 revisions',
    ],
    whoIsItFor: [
      'Tech founders, CTOs, and CISOs preparing for vendor security reviews',
      'Compliance and risk management consultants servicing clients',
      'IT directors establishing company-wide formal security standards',
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Instant Order & Receipt',
        description: 'Complete purchase via Digistore24 with your preferred payment method.',
      },
      {
        step: 2,
        title: 'Download Editable Bundle',
        description: 'Unpack the organized directory containing all customizable documents and checklists.',
      },
      {
        step: 3,
        title: 'Brand and Deploy',
        description: 'Follow our included Quick-Customization guide to insert your company name and adopt policies immediately.',
      },
    ],
    whatIsIncluded: [
      '38 Editable Word documents (.docx)',
      'Interactive Excel checklists (.xlsx)',
      'Readiness reference manuals (.pdf)',
    ],
    screenshots: [
      {
        url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        caption: 'Vendor Risk Evaluation & Scoring Matrix Template',
      },
      {
        url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
        caption: 'Customizable Incident Response & Escalation Workflow',
      },
    ],
    testimonials: [
      {
        name: 'Marcus Thorne',
        role: 'Founder & CEO',
        company: 'CloudMetrics SaaS',
        comment:
          'We were stalled on an enterprise deal waiting for formal infosec documentation. CloudShield Pro saved us. We customized the policies in 48 hours and closed a $60k contract.',
        rating: 5,
      },
    ],
    faqs: [
      {
        question: 'Are the documents fully editable?',
        answer:
          'Yes, every document is provided in clean, standard Microsoft Word (.docx) and Excel (.xlsx) formats, completely compatible with Google Docs and Microsoft 365.',
      },
      {
        question: 'Does this apply to small businesses?',
        answer:
          'Absolutely. We have included an express implementation guide specifically designed for companies with 5 to 50 employees.',
      },
      {
        question: 'What is the refund policy?',
        answer:
          'Your purchase is backed by our full 60-day money-back guarantee. If the suite does not meet your standards, contact us for an immediate refund.',
      },
    ],
    guaranteeHeading: '60-Day Money-Back Guarantee',
    guaranteeText:
      'Your purchase is protected by our 60-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 60 days of your purchase date, subject to the terms of our Refund Policy.',
    supportEmail: 'support@pcsecure.tech',
    supportHours: 'Monday - Friday, 9am - 6pm EST',
    createdAt: '2025-01-20T11:00:00Z',
    updatedAt: '2025-02-10T16:00:00Z',
  },
  {
    id: 'prod-003',
    slug: 'pcsecure-managed-web-defense',
    name: 'PCSecure Priority Managed Web Defense & Vulnerability Assessment',
    category: 'Service',
    isSample: true,
    published: true,
    badge: 'Professional Service',
    shortDescription:
      'Manual penetration testing, cloud architecture vulnerability scanning, and custom remediation roadmap performed by certified security analysts.',
    description:
      'Receive a comprehensive, human-guided security assessment of your web applications, APIs, and public infrastructure. Our certified ethical hackers evaluate your defenses, test against OWASP Top 10 vulnerabilities, and provide executive guidance alongside engineer-level remediation fixes.',
    regularPrice: 499.0,
    salePrice: 349.0,
    currency: '$',
    imageUrl:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    checkoutUrl: 'https://www.digistore24.com/redir/555103/SAMPLE_AFFILIATE/',
    statementDescriptor: 'DIGISTORE24',
    deliveryMethod: 'consultation_instructions',
    deliveryInstructions:
      'After completing your booking via Digistore24, you will be redirected to the PCSecure Priority Client Onboarding Portal. You will receive an email with your unique engagement onboarding link and a secure intake form to designate target domains, authorized IP ranges, and project contacts. Our engineering lead will contact you within 24 business hours to confirm scope and begin testing.',
    deliveryResourceUrl: 'https://client.pcsecurellc.com/onboard?service=web-defense',
    features: [
      'Comprehensive external penetration test covering up to 2 domains or web apps',
      'Full OWASP Top 10 vulnerability inspection (SQLi, XSS, CSRF, Auth flaws)',
      'SSL/TLS cipher suite and DNS configuration security evaluation',
      'API endpoint authentication and rate-limiting stress testing',
      'Executive Summary report for investors, stakeholders, and board members',
      'Technical Developer Remediation Playbook with code and config snippets',
      'Complimentary 30-day re-test to verify remediation effectiveness',
    ],
    benefits: [
      {
        title: 'Certified Security Analysts',
        description: 'Every test is planned and executed by OSCP, CISSP, and CEH certified security professionals.',
      },
      {
        title: 'Actionable Developer Guidance',
        description: 'No automated fluff reports. You receive step-by-step instructions and code snippets to resolve findings.',
      },
      {
        title: 'Verified Proof of Attestation',
        description: 'Receive an official PCSecure Letter of Attestation upon successful remediation to share with clients.',
      },
    ],
    whatYouGet: [
      'Full Vulnerability Assessment & Penetration Testing Engagement',
      'Formal 25+ Page Technical Assessment and Remediation Report',
      '1-on-1 45-minute Video Consultation & Review with Senior Security Engineer',
      'Official PCSecure Security Attestation Badge & Certificate for your website',
    ],
    whoIsItFor: [
      'SaaS platforms handling customer data or payments',
      'E-commerce stores needing third-party security verification',
      'Agencies delivering web applications to clients requiring verification',
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Order Service via Digistore24',
        description: 'Lock in your promotional assessment slot securely through Digistore24.',
      },
      {
        step: 2,
        title: 'Complete Secure Scope Intake',
        description: 'Submit your authorized domain names and primary contacts via the client onboarding portal.',
      },
      {
        step: 3,
        title: 'Assessment & Delivery',
        description: 'Testing is performed over 3 to 5 business days, followed by the delivery of your full report and consultation call.',
      },
    ],
    whatIsIncluded: [
      'Penetration Testing Service engagement',
      'Deliverable PDF reports (Executive & Technical)',
      'Attestation letter & badge',
      'Follow-up verification re-scan',
    ],
    screenshots: [
      {
        url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
        caption: 'Penetration Testing Report Sample & Risk Heatmap',
      },
      {
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        caption: 'Client Security Attestation & Executive Debrief Session',
      },
    ],
    testimonials: [
      {
        name: 'Samantha Wei',
        role: 'VP of Engineering',
        company: 'PayFlow Nexus',
        comment:
          'PCSecure found a subtle authorization flaw in our REST API that our internal code reviews missed. The remediation advice was precise and easy for our engineers to execute. Highly recommended!',
        rating: 5,
      },
    ],
    faqs: [
      {
        question: 'Will the test take down my live website?',
        answer:
          'No. Our testing methodologies are non-destructive and calibrated to avoid denial of service. We coordinate testing schedules around your preferred low-traffic hours.',
      },
      {
        question: 'How long does the assessment take?',
        answer:
          'Standard engagements are completed within 3 to 5 business days following scope authorization.',
      },
      {
        question: 'Does the 60-day guarantee apply to services?',
        answer:
          'Yes! If you are not satisfied with the depth, professionalism, or quality of our assessment report, you are covered by our 60-day money-back guarantee.',
      },
    ],
    guaranteeHeading: '60-Day Money-Back Guarantee',
    guaranteeText:
      'Your purchase is protected by our 60-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 60 days of your purchase date, subject to the terms of our Refund Policy.',
    supportEmail: 'support@pcsecure.tech',
    supportHours: 'Monday - Friday, 9am - 6pm EST',
    createdAt: '2025-01-25T09:00:00Z',
    updatedAt: '2025-02-15T12:00:00Z',
  },
  {
    id: 'prod-004',
    slug: 'custom-website-design-package',
    name: 'PCSecure Custom Website Design & UI/UX Conversion Package',
    category: 'Website Design',
    isSample: true,
    published: true,
    badge: 'Popular Service',
    shortDescription:
      'Bespoke, conversion-engineered Figma design systems, responsive layouts, interactive click-through prototypes, and brand-aligned UI tokens.',
    description:
      'Transform your digital footprint into an authoritative, high-converting customer acquisition engine. PCSecure crafts custom, pixel-perfect website designs tailored to technology companies, SaaS platforms, and digital service providers. You receive comprehensive Figma source files, responsive mobile/tablet breakpoints, accessibility-compliant components, and clear developer handoff documentation.',
    regularPrice: 899.0,
    salePrice: 599.0,
    currency: '$',
    imageUrl:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    checkoutUrl: 'https://www.digistore24.com/redir/555104/SAMPLE_AFFILIATE/',
    statementDescriptor: 'DIGISTORE24',
    deliveryMethod: 'consultation_instructions',
    deliveryInstructions:
      'Immediately after your Digistore24 order is confirmed, you will receive priority access to our Design Intake & Kickoff Portal. You will receive an email with your dedicated project board link and intake questionnaire to upload your branding assets, target audience personas, and design preferences. Our Lead UI/UX Designer will contact you within 24 business hours to conduct your kickoff alignment call.',
    deliveryResourceUrl: 'https://client.pcsecurellc.com/onboard?service=website-design',
    features: [
      'Up to 7 custom designed desktop & mobile responsive pages (Home, Services, About, Pricing, Case Studies, Contact, Legal)',
      'Interactive Figma prototypes with click-through micro-interactions and transitions',
      'Comprehensive design system with typography scale, color tokens, and UI component library',
      'Mobile-first responsive architecture and WCAG AA accessibility compliance benchmarks',
      '3 comprehensive review and revision rounds included for total client satisfaction',
      'Complete developer handoff package with auto-layout, style tokens, and exportable assets',
    ],
    benefits: [
      {
        title: 'Higher Conversion Rates',
        description: 'Interfaces engineered around visitor psychology, strategic CTA placement, and clear visual hierarchy.',
      },
      {
        title: '100% Brand Customization',
        description: 'No generic off-the-shelf templates; designs built specifically for your business value proposition.',
      },
      {
        title: 'Seamless Developer Handoff',
        description: 'Organized Figma components, typography scales, and assets ready for immediate front-end coding.',
      },
    ],
    whatYouGet: [
      'Full Figma (.fig) master design project and interactive prototype',
      'Responsive screen designs for Desktop (1440px), Tablet (768px), and Mobile (375px)',
      'Exported SVG and PNG asset bundle',
      '1-on-1 45-minute Kickoff & Strategy Call with Senior Product Designer',
      '60-Day money-back guarantee protection',
    ],
    whoIsItFor: [
      'SaaS founders, technology firms, and consulting agencies needing an authoritative brand presence',
      'Established businesses modernizing an outdated legacy website',
      'Digital entrepreneurs preparing product launches for Digistore24 and e-commerce',
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Secure Order via Digistore24',
        description: 'Confirm your design sprint slot securely through Digistore24.',
      },
      {
        step: 2,
        title: 'Intake & Strategy Kickoff',
        description: 'Submit brand materials and conduct a 1-on-1 strategy session with our design lead.',
      },
      {
        step: 3,
        title: 'Wireframes & Final Handoff',
        description: 'Review interactive prototypes, provide feedback, and receive finalized Figma assets ready for build.',
      },
    ],
    whatIsIncluded: [
      'Complete Figma design file (.fig)',
      'Style guide & design token documentation (.pdf)',
      'Asset package (.zip)',
      'Video walkthrough & presentation',
    ],
    screenshots: [
      {
        url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
        caption: 'Figma UI/UX Design System & Component Hierarchy',
      },
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        caption: 'Responsive Mobile & Tablet Viewport Mockups',
      },
    ],
    testimonials: [
      {
        name: 'David Lin',
        role: 'Founder & CEO',
        company: 'OmniMetrics',
        comment:
          'PCSecure redesigned our entire product presentation. Our demo request rate jumped 42% in the first three weeks post-launch.',
        rating: 5,
      },
      {
        name: 'Claire Tremblay',
        role: 'Marketing Director',
        company: 'Apex Data Labs',
        comment:
          'The Figma file was immaculate. Our developers were able to implement the layouts without a single ambiguity.',
        rating: 5,
      },
    ],
    faqs: [
      {
        question: 'How long does the design process take?',
        answer:
          'Standard turnaround is 7 to 10 business days from the completion of your kickoff alignment session.',
      },
      {
        question: 'What if I need revisions?',
        answer:
          'We include 3 dedicated revision cycles to ensure every page, color, and component aligns exactly with your vision.',
      },
      {
        question: 'Does this include web development/coding?',
        answer:
          'This package covers complete UI/UX design and prototyping. You can pair it with our Full-Stack Website Development service for end-to-end coding.',
      },
      {
        question: 'Is this covered by the 60-day guarantee?',
        answer:
          'Yes! Your purchase is backed by our full 60-day money-back guarantee, subject to our transparent Refund Policy.',
      },
    ],
    guaranteeHeading: '60-Day Money-Back Guarantee',
    guaranteeText:
      'Your purchase is protected by our 60-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 60 days of your purchase date, subject to the terms of our Refund Policy.',
    supportEmail: 'support@pcsecure.tech',
    supportHours: 'Monday - Friday, 9am - 6pm EST',
    createdAt: '2025-02-01T10:00:00Z',
    updatedAt: '2025-02-20T15:00:00Z',
  },
  {
    id: 'prod-005',
    slug: 'full-stack-web-development',
    name: 'PCSecure Full-Stack Website Development & Performance Optimization',
    category: 'Website Development',
    isSample: true,
    published: true,
    badge: 'Core Service',
    shortDescription:
      'Production-ready, ultra-fast web development using React, TypeScript, Next.js, or headless CMS with 95+ PageSpeed scores and enterprise security.',
    description:
      'Transform approved designs into secure, responsive, and blazing-fast web platforms. PCSecure delivers clean, maintainable code architectures, full mobile responsiveness, API integrations, automated CI/CD deployments, and bulletproof SSL security. Engineered to achieve 95+ Google PageSpeed scores and provide effortless content management.',
    regularPrice: 1499.0,
    salePrice: 999.0,
    currency: '$',
    imageUrl:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    checkoutUrl: 'https://www.digistore24.com/redir/555105/SAMPLE_AFFILIATE/',
    statementDescriptor: 'DIGISTORE24',
    deliveryMethod: 'consultation_instructions',
    deliveryInstructions:
      'Upon completing your purchase through Digistore24, you will receive immediate access to the PCSecure Engineering Client Portal. An onboarding email with your project ticket, Git repository access, and technical questionnaire will be dispatched automatically. Our Lead Technical Architect will schedule a 30-minute technical discovery and staging walkthrough within 24 business hours.',
    deliveryResourceUrl: 'https://client.pcsecurellc.com/onboard?service=web-development',
    features: [
      'Modern frontend development (React, Next.js, TypeScript, Tailwind CSS)',
      '95+ Google PageSpeed Core Web Vitals optimization and sub-second asset delivery',
      'Integration with payment systems, Digistore24 webhooks, and conversion analytics',
      'Clean semantic HTML5 structure with comprehensive Schema.org markup for rich snippets',
      'Cross-browser responsive testing across Chrome, Safari, Firefox, Edge, and iOS/Android',
      'SSL/TLS security hardening, CSRF defense, and automated backup configurations',
      '60-day post-launch technical warranty & bug-fix coverage included',
    ],
    benefits: [
      {
        title: 'Extreme Page Speed',
        description: 'Load times under 1.2 seconds keep bounce rates low and conversion rates high across mobile and desktop.',
      },
      {
        title: 'Zero Tech Debt',
        description: 'Clean, well-documented source code that your team or internal engineers can easily extend.',
      },
      {
        title: 'Turnkey Production Deployment',
        description: 'Includes production cloud hosting setup, custom domain DNS records, and SSL certificate activation.',
      },
    ],
    whatYouGet: [
      'Full source code repository (GitHub / GitLab transfer)',
      'Production deployment & custom domain DNS configuration',
      '60-Day post-deployment warranty and code support',
      '1-on-1 Admin training walkthrough on managing site content',
      '60-Day money-back guarantee protection',
    ],
    whoIsItFor: [
      'Companies needing a custom web presence built to enterprise standards',
      'E-commerce sellers and product creators integrating Digistore24 checkout funnels',
      'Organizations replacing slow WordPress or legacy monoliths with modern responsive stacks',
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Order via Digistore24',
        description: 'Confirm your development sprint securely through Digistore24.',
      },
      {
        step: 2,
        title: 'Architecture & Staging',
        description: 'Connect staging server and verify API / design specifications.',
      },
      {
        step: 3,
        title: 'Build, QA & Launch',
        description: 'Code delivery, QA cross-device testing, speed benchmarking, and DNS launch.',
      },
    ],
    whatIsIncluded: [
      'Source code repository ownership',
      'Production build deployment',
      'PageSpeed & security audit report',
      '60-day warranty certificate',
    ],
    screenshots: [
      {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        caption: 'Clean TypeScript Codebase & Automated Build Pipeline',
      },
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        caption: '98/100 Core Web Vitals Performance Verification',
      },
    ],
    testimonials: [
      {
        name: 'Brian Hoffman',
        role: 'CTO',
        company: 'Sentinel Edge',
        comment:
          'PCSecure transformed our sluggish legacy site into an instant-loading Next.js application. Our organic leads doubled within 60 days.',
        rating: 5,
      },
      {
        name: 'Sarah Jenkins',
        role: 'Operations Lead',
        company: 'Horizon Cloud',
        comment:
          'Flawless code delivery and genuine security expertise. They caught and fixed 3 API vulnerabilities before we even launched.',
        rating: 5,
      },
    ],
    faqs: [
      {
        question: 'Which tech stacks do you support?',
        answer:
          'We specialize in modern React, Next.js, TypeScript, Tailwind CSS, Node.js, Express, Headless CMS platforms, and static site generators.',
      },
      {
        question: 'Do I own the code?',
        answer:
          'Yes! You receive 100% full commercial intellectual property ownership and direct source code transfer upon completion.',
      },
      {
        question: 'What is the warranty policy?',
        answer:
          'We provide a 60-day comprehensive bug-fix and maintenance warranty, fully covered under our 60-day money-back guarantee.',
      },
    ],
    guaranteeHeading: '60-Day Money-Back Guarantee',
    guaranteeText:
      'Your purchase is protected by our 60-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 60 days of your purchase date, subject to the terms of our Refund Policy.',
    supportEmail: 'support@pcsecure.tech',
    supportHours: 'Monday - Friday, 9am - 6pm EST',
    createdAt: '2025-02-05T11:00:00Z',
    updatedAt: '2025-02-22T16:00:00Z',
  },
  {
    id: 'prod-006',
    slug: 'growth-digital-marketing-campaign',
    name: 'PCSecure Growth Digital Marketing & Customer Acquisition Campaign',
    category: 'Digital Marketing',
    isSample: true,
    published: true,
    badge: 'Growth Accelerator',
    shortDescription:
      'Data-driven multi-channel PPC campaigns (Google Ads, Meta, LinkedIn), conversion funnels, retargeting, and measurable ROI analytics.',
    description:
      'Scale customer acquisition with high-ROI performance marketing managed by certified digital strategists. PCSecure structures, launches, and optimizes targeted advertising campaigns across Google Search, Meta Ads, and LinkedIn, complemented by high-converting landing page optimization and automated lead nurturing funnels to maximize return on ad spend (ROAS).',
    regularPrice: 799.0,
    salePrice: 499.0,
    currency: '$',
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    checkoutUrl: 'https://www.digistore24.com/redir/555106/SAMPLE_AFFILIATE/',
    statementDescriptor: 'DIGISTORE24',
    deliveryMethod: 'online_service',
    deliveryInstructions:
      'Immediately after checkout on Digistore24, you will receive an invitation to the PCSecure Marketing Command Center. You will receive an onboarding briefing questionnaire to link ad account permissions (Google Ads, Meta Business Manager) or grant read access, outline target customer segments, and review current funnel metrics. Our Senior Growth Strategist will deliver your complete campaign structure within 48 business hours.',
    deliveryResourceUrl: 'https://client.pcsecurellc.com/onboard?service=digital-marketing',
    features: [
      'Comprehensive ad account audit and competitive ad copy intelligence',
      'Multi-tiered campaign architecture (Top-of-funnel discovery, Middle intent, Bottom retargeting)',
      'High-converting ad copy variations, headlines, and responsive display creatives',
      'Conversion tracking and server-side tagging (Google Tag Manager, GA4, Meta CAPI)',
      'Negative keyword defense to eliminate wasted ad spend on unqualified clicks',
      'Real-time Looker Studio dashboard tracking CAC, ROAS, and conversions 24/7',
    ],
    benefits: [
      {
        title: 'Eliminate Budget Waste',
        description: 'Rigorous negative keyword lists and bid adjustments stop ad spend bleed on unqualified searchers.',
      },
      {
        title: 'Laser-Targeted Traffic',
        description: 'Reach in-market decision-makers actively searching for your digital solutions and services.',
      },
      {
        title: 'Transparent Weekly Reporting',
        description: 'Live dashboard access with clear profit and acquisition metrics, with zero marketing vanity fluff.',
      },
    ],
    whatYouGet: [
      'Complete 30-Day Campaign Strategy & Launch Playbook',
      'Custom Ad Creatives, Copy Sets & Headline Matrices',
      'Server-side conversion tracking & GA4 attribution setup',
      'Bi-weekly strategic optimization calls & real-time reporting',
      '60-Day money-back guarantee protection',
    ],
    whoIsItFor: [
      'SaaS platforms and product founders seeking predictable customer acquisition',
      'Professional service firms wanting consistent inbound qualified leads',
      'Digistore24 product vendors scaling sales funnels and affiliate conversions',
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Secure Order on Digistore24',
        description: 'Confirm your marketing sprint slot securely through Digistore24.',
      },
      {
        step: 2,
        title: 'Account Access & Strategy',
        description: 'Connect ad channels and review target buyer personas and conversion goals.',
      },
      {
        step: 3,
        title: 'Launch & Optimize',
        description: 'Deploy campaigns, activate conversion tracking, and optimize weekly for target ROAS.',
      },
    ],
    whatIsIncluded: [
      'Campaign Architecture Document (.pdf)',
      'Ad Creative & Copy Master Spreadsheet (.xlsx)',
      'Live Looker Studio Analytics Dashboard link',
      'Strategic Consultation Calls',
    ],
    screenshots: [
      {
        url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
        caption: 'Multi-Channel ROAS & Cost-Per-Acquisition Dashboard',
      },
      {
        url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
        caption: 'Google Ads High-Intent Campaign Structure & Negative Keyword Library',
      },
    ],
    testimonials: [
      {
        name: 'Jordan Ross',
        role: 'Growth Lead',
        company: 'DevSecure Cloud',
        comment:
          'PCSecure rebuilt our Google Ads funnel from the ground up. Our cost-per-lead dropped by 38% in the first month while pipeline value doubled.',
        rating: 5,
      },
      {
        name: 'Maya Patel',
        role: 'Founder',
        company: 'CodePulse',
        comment:
          'Clear reporting, zero marketing jargon, and genuine business results. Highly recommend their performance team.',
        rating: 5,
      },
    ],
    faqs: [
      {
        question: 'Does this price include ad spend?',
        answer:
          'No, media ad spend is paid directly to Google or Meta through your own ad accounts; this service covers complete campaign strategy, copy, build, setup, and optimization.',
      },
      {
        question: 'How fast can we launch?',
        answer:
          'Campaign structures and tracking are typically configured and ready for launch within 3 to 5 business days from intake completion.',
      },
      {
        question: 'What guarantee do you offer?',
        answer:
          'Your investment is protected by our full 60-day money-back guarantee, subject to our Refund Policy terms.',
      },
    ],
    guaranteeHeading: '60-Day Money-Back Guarantee',
    guaranteeText:
      'Your purchase is protected by our 60-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 60 days of your purchase date, subject to the terms of our Refund Policy.',
    supportEmail: 'support@pcsecure.tech',
    supportHours: 'Monday - Friday, 9am - 6pm EST',
    createdAt: '2025-02-10T14:00:00Z',
    updatedAt: '2025-02-25T17:00:00Z',
  },
  {
    id: 'prod-007',
    slug: 'enterprise-seo-growth-sprint',
    name: 'PCSecure Enterprise SEO & Organic Search Domination Sprint',
    category: 'SEO',
    isSample: true,
    published: true,
    badge: 'High Impact',
    shortDescription:
      '120-point technical SEO audit, high-intent keyword mapping, on-page optimization, Google Search Console repair, and competitor backlink strategy.',
    description:
      'Capture high-intent organic search traffic from customers actively looking to purchase your services. PCSecure conducts a rigorous 120-point technical SEO crawl, fixes crawling and indexing bottlenecks, optimizes site architecture and Core Web Vitals, builds targeted keyword content clusters, and delivers an executable 90-day organic ranking blueprint.',
    regularPrice: 599.0,
    salePrice: 399.0,
    currency: '$',
    imageUrl:
      'https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?auto=format&fit=crop&w=1200&q=80',
    checkoutUrl: 'https://www.digistore24.com/redir/555107/SAMPLE_AFFILIATE/',
    statementDescriptor: 'DIGISTORE24',
    deliveryMethod: 'online_service',
    deliveryInstructions:
      'Immediately after your order is confirmed via Digistore24, you will receive access to the PCSecure SEO Intake Portal. You will receive an onboarding email containing access instructions, an intake questionnaire to specify your primary domains, top 3 competitors, and target geographic regions. Our Technical SEO Director will initiate the automated 120-point crawl and deliver your comprehensive audit and action plan within 3 business days.',
    deliveryResourceUrl: 'https://client.pcsecurellc.com/onboard?service=seo-sprint',
    features: [
      '120-Point Technical SEO audit (Robots.txt, XML sitemaps, canonicals, 404s, redirect loops)',
      'Google Search Console indexing and coverage error remediation',
      'Semantic Schema.org structured data implementation roadmap',
      'High-intent commercial keyword research and topic clustering workbook',
      'Competitor backlink gap analysis and high-authority link acquisition plan',
      'On-page title tags, meta descriptions, header tags (H1-H3), and internal linking architecture',
    ],
    benefits: [
      {
        title: 'Long-Term Organic Inflow',
        description: 'Generate evergreen organic leads without continuing to pay for every click.',
      },
      {
        title: 'Solve Invisible Indexing Bugs',
        description: 'Find out why Google is ignoring key pages and fix crawl budget waste immediately.',
      },
      {
        title: 'Outrank Established Competitors',
        description: 'Target untapped high-commercial-intent long-tail keywords with low competition and high conversion.',
      },
    ],
    whatYouGet: [
      'Complete 35+ Page Technical SEO Audit & Executive Summary Report (.pdf)',
      'Keyword Opportunity & Ranking Matrix (.xlsx)',
      'Ready-to-paste Meta tags and Schema.org JSON-LD scripts',
      '1-on-1 45-minute SEO Strategy & Debrief Session',
      '60-Day money-back guarantee protection',
    ],
    whoIsItFor: [
      'Technology companies looking to generate consistent organic inbound demos',
      'E-commerce and digital product sellers scaling organic discoverability',
      'Websites penalized or suffering sudden drops in search rankings',
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Order via Digistore24',
        description: 'Confirm your SEO sprint securely through Digistore24.',
      },
      {
        step: 2,
        title: 'Intake & Crawl Analysis',
        description: 'Submit domain credentials and competitors for deep-dive technical auditing.',
      },
      {
        step: 3,
        title: 'Blueprint & Consultation',
        description: 'Receive technical deliverables, keyword master files, and implementation walkthrough.',
      },
    ],
    whatIsIncluded: [
      'Technical SEO Audit Report (PDF)',
      'Keyword Research Workbook (Excel)',
      'Schema Markup Templates (JSON-LD)',
      'Video debrief walkthrough',
    ],
    screenshots: [
      {
        url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80',
        caption: 'Technical SEO Crawl Health Score & Indexing Diagnostics',
      },
      {
        url: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80',
        caption: 'High-Commercial Intent Keyword Cluster Mapping',
      },
    ],
    testimonials: [
      {
        name: 'Anthony Vance',
        role: 'VP of Growth',
        company: 'CloudFortress',
        comment:
          'PCSecure discovered 400+ orphaned indexing URLs and improper canonical tags dragging our domain authority down. Once repaired, our organic clicks jumped 65% in 60 days.',
        rating: 5,
      },
      {
        name: 'Rebecca Miller',
        role: 'Founder',
        company: 'CodeCraft Academy',
        comment:
          'The most actionable SEO report I\'ve ever received. Every item had step-by-step instructions our team could execute immediately.',
        rating: 5,
      },
    ],
    faqs: [
      {
        question: 'How long does SEO take to produce results?',
        answer:
          'While technical fixes often improve crawl rates and indexing in 2 to 4 weeks, significant keyword rank improvements compound over 60 to 90 days.',
      },
      {
        question: 'Do you provide ongoing SEO management?',
        answer:
          'Yes, sprint clients have the option to transition into our monthly retainer after completing the initial sprint.',
      },
      {
        question: 'Is this covered by your 60-day guarantee?',
        answer:
          'Yes! Fully backed by our 60-day money-back guarantee, subject to our Refund Policy terms.',
      },
    ],
    guaranteeHeading: '60-Day Money-Back Guarantee',
    guaranteeText:
      'Your purchase is protected by our 60-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 60 days of your purchase date, subject to the terms of our Refund Policy.',
    supportEmail: 'support@pcsecure.tech',
    supportHours: 'Monday - Friday, 9am - 6pm EST',
    createdAt: '2025-02-12T10:30:00Z',
    updatedAt: '2025-02-28T18:00:00Z',
  },
  {
    id: 'prod-008',
    slug: 'custom-app-development-sprint',
    name: 'PCSecure Custom Mobile & Web App Development Sprint',
    category: 'App Development',
    isSample: true,
    published: true,
    badge: 'Full Engineering',
    shortDescription:
      'Cross-platform mobile (iOS/Android) and web application MVP engineering, cloud architecture, secure authentication, and App Store readiness.',
    description:
      'Transform your application concept or internal operational workflow into a production-grade mobile or web app. PCSecure engineers cross-platform applications using React Native, Flutter, or Progressive Web App technologies, backed by scalable cloud microservices, role-based security, automated CI/CD builds, and full Apple App Store / Google Play publishing readiness.',
    regularPrice: 2499.0,
    salePrice: 1799.0,
    currency: '$',
    imageUrl:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
    checkoutUrl: 'https://www.digistore24.com/redir/555108/SAMPLE_AFFILIATE/',
    statementDescriptor: 'DIGISTORE24',
    deliveryMethod: 'consultation_instructions',
    deliveryInstructions:
      'Immediately after your Digistore24 purchase is confirmed, you will receive executive access to the PCSecure App Engineering Onboarding Portal. You will receive an email with your technical sprint dashboard, code repository invite, and product requirements questionnaire. Our Principal Software Architect will host your 45-minute Technical Architecture Kickoff within 24 business hours.',
    deliveryResourceUrl: 'https://client.pcsecurellc.com/onboard?service=app-development',
    features: [
      'Cross-platform native mobile application (iOS & Android) or Progressive Web App (PWA)',
      'Scalable backend API and cloud infrastructure (Firebase, Supabase, or AWS)',
      'Enterprise authentication (OAuth 2.0, multi-factor authentication, JWT tokens)',
      'Real-time database sync, offline caching, and push notification infrastructure',
      'In-app purchases, Stripe/Digistore24 billing integration, and subscription logic',
      'App Store & Google Play compliance pre-flight checks and submission packaging',
      '60-day post-delivery engineering warranty & bug fixes included',
    ],
    benefits: [
      {
        title: 'Single Codebase Efficiency',
        description: 'Build once with React Native or modern cross-platform stacks to run natively on iOS, Android, and Web.',
      },
      {
        title: 'Enterprise Security Built-In',
        description: 'Data encryption at rest and in transit, sanitized API endpoints, and secure key vaults.',
      },
      {
        title: 'Rapid Time-to-Market',
        description: 'Reach real beta users and customers in weeks, not quarters.',
      },
    ],
    whatYouGet: [
      'Full source code ownership and repository transfer',
      'Compiled iOS (.ipa / TestFlight) and Android (.aab / APK) release builds',
      'Cloud backend infrastructure deployment and architecture runbook',
      'App Store & Google Play submission guidance and asset preparation',
      '60-Day engineering warranty and 60-day money-back guarantee',
    ],
    whoIsItFor: [
      'Tech founders building an MVP to raise capital or onboard first paying customers',
      'Businesses creating proprietary internal mobile workflows or customer portals',
      'Creators building member apps or digital subscription products',
    ],
    howItWorks: [
      {
        step: 1,
        title: 'Order on Digistore24',
        description: 'Lock in your development sprint slot securely through Digistore24.',
      },
      {
        step: 2,
        title: 'Architecture & Sprint Planning',
        description: 'Establish tech stack, wireframes, and API contracts.',
      },
      {
        step: 3,
        title: 'Build, TestFlight & Launch',
        description: 'Iterative weekly build reviews, cross-device testing, and store-ready binary delivery.',
      },
    ],
    whatIsIncluded: [
      'Complete Git repository with full source code',
      'Production cloud deployment',
      'TestFlight / Internal Testing builds',
      'API documentation & technical runbook (.pdf)',
    ],
    screenshots: [
      {
        url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        caption: 'Native Mobile UI/UX & High-Performance Device Testing',
      },
      {
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        caption: 'Secure Backend Cloud Infrastructure & API Architecture',
      },
    ],
    testimonials: [
      {
        name: 'Nathan Vance',
        role: 'Founder',
        company: 'TaskShield Mobile',
        comment:
          'PCSecure built our React Native MVP in 4 weeks. It passed Apple App Store review on the first submission without a single rejection.',
        rating: 5,
      },
      {
        name: 'Lisa Zhang',
        role: 'Product Director',
        company: 'OmniFlow',
        comment:
          'Incredible attention to security and code hygiene. They built an app that our enterprise clients immediately trusted.',
        rating: 5,
      },
    ],
    faqs: [
      {
        question: 'Can the app run on both iOS and Android?',
        answer:
          'Yes! We develop using modern cross-platform frameworks so you maintain a single codebase for both iOS and Android.',
      },
      {
        question: 'Who owns the code and intellectual property?',
        answer:
          'You own 100% of the intellectual property, source code, and cloud credentials upon project delivery.',
      },
      {
        question: 'What happens if there are bugs?',
        answer:
          'All builds include our comprehensive 60-day bug-fix warranty and are covered by our 60-day money-back guarantee.',
      },
    ],
    guaranteeHeading: '60-Day Money-Back Guarantee',
    guaranteeText:
      'Your purchase is protected by our 60-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 60 days of your purchase date, subject to the terms of our Refund Policy.',
    supportEmail: 'support@pcsecure.tech',
    supportHours: 'Monday - Friday, 9am - 6pm EST',
    createdAt: '2025-02-15T09:00:00Z',
    updatedAt: '2025-03-01T12:00:00Z',
  },
];

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-001',
    slug: 'apex-cloud-analytics-platform',
    title: 'Apex Cloud Solutions: High-Performance SaaS Analytics & Billing Engine',
    client: 'Apex Cloud Inc.',
    industry: 'Enterprise SaaS & Cloud Infrastructure',
    category: 'Web Application',
    summary:
      'Engineered an enterprise-grade analytics dashboard, real-time telemetry visualizer, and Stripe billing lifecycle engine with sub-second page loads and zero layout shifts.',
    challenge:
      'Apex had an outdated legacy dashboard plagued by 4.2-second load times, confusing navigation, and a 22% drop-off rate during subscription plan upgrades.',
    solution:
      'We redesigned the complete product UI in Figma, implemented an atomic design system, and re-architected the frontend in Next.js with server-side rendering, streaming charts, and automated tier billing.',
    results: [
      { metric: '+185%', label: 'Trial-to-Paid Conversion' },
      { metric: '420ms', label: 'Core Web Vitals LCP' },
      { metric: '99.99%', label: 'Availability & Uptime' },
    ],
    deliverables: [
      'Comprehensive Figma UI/UX Design System with 120+ Components',
      'Production-Ready Next.js & TypeScript Web Application',
      'Real-Time High-Density Metric Charts & Visualizations',
      'Self-Service Customer Billing & Stripe Customer Portal',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe API'],
    imageUrl: APP_IMAGES.portfolioSaas,
    liveUrl: 'https://apexcloud.example.com',
    testimonial: {
      quote:
        'PCSecure delivered beyond our highest expectations. Our customers immediately praised the speed and clarity of the new dashboard, and our trial conversion doubled in under 60 days.',
      author: 'David Vance',
      role: 'Chief Technology Officer, Apex Cloud',
    },
  },
  {
    id: 'case-002',
    slug: 'aura-atelier-luxury-ecommerce',
    title: 'Aura Atelier: Bespoke Headless E-Commerce Flagship Storefront',
    client: 'Aura Atelier New York',
    industry: 'Luxury Fashion & Direct-to-Consumer',
    category: 'E-Commerce',
    summary:
      'Architected a luxury direct-to-consumer digital flagship with cinematic visual transitions, instant checkout micro-interactions, and 98/100 mobile performance.',
    challenge:
      'The client’s standard Shopify theme felt generic, suffered from 6-second mobile latency on cellular networks, and failed to reflect their high-end bespoke craftsmanship.',
    solution:
      'Designed an editorial typographic layout with generous spacing, implemented a headless Shopify storefront with instant edge caching, dynamic currency switching, and one-click Apple Pay/Google Pay integration.',
    results: [
      { metric: '+142%', label: 'Average Order Value' },
      { metric: '3.2%', label: 'Mobile Conversion Rate' },
      { metric: '$3.4M', label: 'First Year Online GMV' },
    ],
    deliverables: [
      'Editorial Brand UI/UX & Responsive Web Layouts',
      'Headless Storefront with Edge CDN & Instant Caching',
      'Interactive Product Variant Switcher & Micro-Animations',
      'Automated Cart Recovery & Klaviyo Email Sequencing',
    ],
    techStack: ['React', 'TypeScript', 'Shopify Storefront API', 'Tailwind CSS', 'Edge Functions'],
    imageUrl: APP_IMAGES.portfolioEcommerce,
    liveUrl: 'https://auraatelier.example.com',
    testimonial: {
      quote:
        'The aesthetic precision and sheer speed of our new storefront blew us away. We have seen our international checkout completion rate spike by over 40%.',
      author: 'Elena Rostova',
      role: 'Founder & Creative Director, Aura Atelier',
    },
  },
  {
    id: 'case-003',
    slug: 'vanguard-asset-management-portal',
    title: 'Vanguard Wealth Portal: Institutional Client Financial Management',
    client: 'Vanguard Capital Partners',
    industry: 'Fintech & Wealth Management',
    category: 'Web Application',
    summary:
      'Built a banking-grade client wealth portal featuring real-time portfolio rebalancing, multi-factor biometric authentication, and automated quarterly tax statement generation.',
    challenge:
      'High-net-worth clients demanded a streamlined digital portal to track portfolio allocations without navigating cumbersome legacy banking software.',
    solution:
      'Crafted an intuitive, high-contrast dark theme financial interface with SOC2 Type II compliance safeguards, encrypted document vaults, and responsive asset allocation charts.',
    results: [
      { metric: '68%', label: 'Support Ticket Reduction' },
      { metric: '1.2s', label: 'Real-Time Portfolio Sync' },
      { metric: '100%', label: 'SOC2 & HIPAA Benchmark Pass' },
    ],
    deliverables: [
      'Institutional Financial Dashboard UI & Design Tokens',
      'End-to-End Encrypted Client Document Vault',
      'Automated PDF Statement Engine & Tax Reporting',
      'Multi-Role Permissions (Client, Advisor, Auditor)',
    ],
    techStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'WebSockets', 'AWS KMS'],
    imageUrl: APP_IMAGES.portfolioFintech,
    liveUrl: 'https://vanguardportal.example.com',
    testimonial: {
      quote:
        'PCSecure understood our complex security, compliance, and user experience requirements right from Day 1. Their engineering rigor is unmatched.',
      author: 'Marcus Sterling',
      role: 'Managing Partner, Vanguard Capital Partners',
    },
  },
  {
    id: 'case-004',
    slug: 'beacon-health-modern-platform',
    title: 'Beacon Health Systems: Accessible Regional Healthcare & Provider Network',
    client: 'Beacon Health Alliance',
    industry: 'Healthcare & Clinical Services',
    category: 'Corporate & UI/UX',
    summary:
      'Designed and engineered a patient-first corporate web portal with online appointment booking, doctor search, and 100/100 WCAG AA accessibility compliance.',
    challenge:
      'Patients struggled with fragmented clinic websites, slow phone wait times, and confusing service navigation across 14 regional locations.',
    solution:
      'Unified the health network under a clean, calming design language with localized search filters, direct clinic booking, and frictionless mobile navigation.',
    results: [
      { metric: '+210%', label: 'Online Appointment Bookings' },
      { metric: '100/100', label: 'WCAG AA Accessibility Score' },
      { metric: '-35%', label: 'Inbound Call Center Burden' },
    ],
    deliverables: [
      'Brand Identity Refresh & Unified Component Library',
      'Location-Aware Clinic & Specialist Search Directory',
      'HIPAA-Compliant Patient Intake & Scheduling Flows',
      'Localized Search Engine Optimization (SEO) Architecture',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Algolia Search'],
    imageUrl: APP_IMAGES.agencyProcess,
    liveUrl: 'https://beaconhealth.example.com',
    testimonial: {
      quote:
        'The new platform has transformed patient access. Elderly patients frequently comment on how easy it is to read and book appointments on their phones.',
      author: 'Dr. Arthur Pendelton',
      role: 'Chief Medical Officer, Beacon Health',
    },
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'achieving-sub-second-lcp-core-web-vitals',
    title: 'Achieving Sub-Second Largest Contentful Paint (LCP) in Modern Web Applications',
    readTime: '6 min read',
    date: 'March 2026',
    category: 'Engineering & Performance',
    excerpt:
      'A deep dive into server-side rendering, priority image preloading, CSS containment, and edge caching techniques that yield 95+ Google PageSpeed scores.',
    content: [
      'In high-stakes web development, performance is not a luxury—it is the foundational metric that dictates both organic search visibility and conversion rates. According to Google research, every 100ms improvement in page speed directly correlates with an 8% lift in consumer checkout completion.',
      'To achieve sub-second Largest Contentful Paint (LCP), engineering teams must eliminate render-blocking stylesheets, prioritize hero asset decoding via native HTML fetchpriority="high", and utilize modern component streaming.',
      'At PCSecure, we structure every web project around strict performance budgets: zero layout shifts (CLS < 0.02), instantaneous input latency (INP < 150ms), and lightweight semantic markup that loads instantly even on congested 4G connections.',
    ],
    author: {
      name: 'Ryan Crider',
      role: 'Lead Architect, PCSecure',
    },
  },
  {
    id: 'blog-002',
    slug: 'design-systems-that-scale-figma-to-production',
    title: 'Design Systems That Scale: Bridging the Void from Figma Tokens to Production React',
    readTime: '8 min read',
    date: 'February 2026',
    category: 'UI/UX & Design Systems',
    excerpt:
      'How to establish unified semantic tokens, typographic math, and component interfaces that eliminate designer-developer friction and accelerate shipping cadence.',
    content: [
      'One of the most persistent bottlenecks in modern digital product teams is the disconnect between design tools and shipping production code. When color hex codes, padding increments, and corner radii are hand-coded across fragmented CSS files, visual debt accumulates rapidly.',
      'A robust design system establishes a single source of truth. By defining semantic tokens in Figma (such as surface-subtle, text-primary, and brand-electric) and syncing them directly to Tailwind CSS configuration primitives, engineering velocity multiplies.',
      'When every button, input, and card adheres to standardized spatial math (e.g., container outer padding >= inner child spacing), the resulting user experience communicates trust, craftsmanship, and reliability.',
    ],
    author: {
      name: 'Sarah Chen',
      role: 'Senior UI/UX Designer, PCSecure',
    },
  },
  {
    id: 'blog-003',
    slug: 'anatomy-of-high-converting-b2b-landing-page',
    title: 'The Anatomy of a High-Converting B2B & Technology Sales Page',
    readTime: '5 min read',
    date: 'January 2026',
    category: 'Conversion Strategy',
    excerpt:
      'Examining cognitive friction, value proposition hierarchy, and social proof proximity that consistently convert cold traffic into qualified enterprise leads.',
    content: [
      'High-converting landing pages are not created by decorating screens with generic stock photos or animated gradients. They are constructed as cohesive psychological arguments that systematically dismantle objections.',
      'First, the hero section must state what the business actually does within 3 seconds—avoiding generic marketing slogans like "supercharge your workflow" in favor of concrete deliverables.',
      'Second, proof must sit directly adjacent to the claim it supports. Rather than burying testimonials in a footer carousel, strategic quotes and quantifiable metrics belong immediately next to service descriptions.',
      'Finally, clear consumer guarantees (such as PCSecure’s 60-day money-back guarantee) give buyers absolute confidence to move forward without risk.',
    ],
    author: {
      name: 'Michael Ross',
      role: 'Conversion Strategist, PCSecure',
    },
  },
];

