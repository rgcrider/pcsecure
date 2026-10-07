export type DeliveryMethod =
  | 'download'
  | 'external_url'
  | 'login_credentials'
  | 'email_delivery'
  | 'manual_delivery'
  | 'online_service'
  | 'consultation_instructions';

export interface ProductBenefit {
  title: string;
  description: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface ProductScreenshot {
  url: string;
  caption: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  comment: string;
  rating: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type ProductCategory =
  | 'Website Design'
  | 'Website Development'
  | 'Digital Marketing'
  | 'SEO'
  | 'App Development'
  | 'Software'
  | 'Digital Guide'
  | 'Security Suite'
  | 'Service'
  | 'Subscription';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  isSample?: boolean;
  published: boolean;
  shortDescription: string;
  description: string;
  regularPrice: number;
  salePrice?: number;
  currency: string;
  imageUrl: string;
  badge?: string;
  checkoutUrl: string; // Digistore24 checkout link
  statementDescriptor: string; // e.g., "DIGISTORE24"
  deliveryMethod: DeliveryMethod;
  deliveryInstructions: string;
  deliveryResourceUrl?: string; // Optional download or access URL
  deliveryFileName?: string;
  features: string[];
  benefits: ProductBenefit[];
  whatYouGet: string[];
  whoIsItFor: string[];
  howItWorks: HowItWorksStep[];
  whatIsIncluded: string[];
  screenshots: ProductScreenshot[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  guaranteeHeading: string;
  guaranteeText: string;
  supportEmail: string;
  supportHours?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanySettings {
  companyName: string;
  brandName: string;
  businessType: string;
  supportEmail: string;
  businessEmail: string;
  phoneNumber?: string;
  businessAddress?: string;
  businessHours?: string;
  defaultStatementDescriptor: string;
  defaultGuaranteeDays: number;
  adminPin: string;

  // PayPal Gateway Settings
  enablePaypal?: boolean;
  paypalClientId?: string;
  paypalEmail?: string;
  paypalMode?: 'sandbox' | 'live';
  paypalCurrency?: string;

  // Amazon Pay Gateway Settings
  enableAmazonPay?: boolean;
  amazonPayMerchantId?: string;
  amazonPayClientId?: string;
  amazonPayPublicKeyId?: string;
  amazonPayStoreId?: string;
  amazonPayMode?: 'sandbox' | 'live';
  amazonPayRegion?: 'us' | 'eu' | 'uk' | 'jp';

  // Direct Card Payments
  enableCardPayments?: boolean;
}

export type AppRoute =
  | { type: 'home' }
  | { type: 'services' }
  | { type: 'pricing' }
  | { type: 'portfolio' }
  | { type: 'process' }
  | { type: 'testimonials' }
  | { type: 'blog'; slug?: string }
  | { type: 'products' }
  | { type: 'product-sales'; slug: string }
  | { type: 'thank-you'; slug?: string }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'refund-policy' }
  | { type: 'privacy-policy' }
  | { type: 'terms' }
  | { type: 'disclaimer' }
  | { type: 'admin'; subview?: 'products' | 'edit' | 'readiness' | 'payments' | 'settings'; productId?: string };

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: 'Web Application' | 'E-Commerce' | 'Corporate & UI/UX' | 'Mobile & PWA';
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; label: string }[];
  deliverables: string[];
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  readTime: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
  author: {
    name: string;
    role: string;
  };
}

