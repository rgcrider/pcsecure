import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Users,
  FileCheck,
  HelpCircle,
  Mail,
  ExternalLink,
  ChevronDown,
  Star,
  Copy,
  Check,
  Layers,
  Clock,
} from 'lucide-react';
import { Product, AppRoute, CompanySettings } from '../types';
import { GuaranteeSection } from './GuaranteeSection';
import { PaymentGatewayModal, PaymentItem } from './PaymentGatewayModal';
import { getFullUrl, copyToClipboard } from '../utils/routing';

interface ProductSalesPageProps {
  product: Product;
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
}

export const ProductSalesPage: React.FC<ProductSalesPageProps> = ({
  product,
  settings,
  onNavigate,
}) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'amazon_pay' | 'card'>('paypal');

  const openPaymentWithMethod = (method: 'paypal' | 'amazon_pay' | 'card') => {
    setPaymentMethod(method);
    setPaymentModalOpen(true);
  };

  const hasSale = product.salePrice !== undefined && product.salePrice < product.regularPrice;
  const currentPrice = hasSale ? product.salePrice : product.regularPrice;
  const discountPercent = hasSale
    ? Math.round(((product.regularPrice - product.salePrice!) / product.regularPrice) * 100)
    : 0;

  const currentUrl = getFullUrl({ type: 'product-sales', slug: product.slug });
  const thankYouUrl = getFullUrl({ type: 'thank-you', slug: product.slug });

  const handleCopySalesUrl = async () => {
    const ok = await copyToClipboard(currentUrl);
    if (ok) {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleCheckoutClick = () => {
    if (product.checkoutUrl) {
      // Direct customer or Digistore24 reviewer to the product's configured checkout URL
      window.open(product.checkoutUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div id="product-sales-page" className="min-h-screen bg-slate-50/60 pb-20">
      {/* Top Reviewer Bar for Digistore24 Auditor */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 px-4 py-2.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-white">Public Sales Page</span>
            <span className="text-slate-400 hidden sm:inline">&bull; Digistore24 Product Approval Structure</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate({ type: 'thank-you', slug: product.slug })}
              className="text-blue-400 hover:text-blue-300 font-medium underline flex items-center gap-1"
            >
              <span>View Associated Thank-You Page</span>
              <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={handleCopySalesUrl}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
            >
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedUrl ? 'Copied' : 'Copy Sales URL'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white via-white to-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {product.category}
                </span>
                {product.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 text-white shadow-xs">
                    {product.badge}
                  </span>
                )}
                {product.isSample && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    Sample / Template Product
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                {product.name}
              </h1>

              {/* Short Value Proposition */}
              <p className="text-lg sm:text-xl font-medium text-blue-900/90 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Detailed Description */}
              <p className="text-base text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Price & Primary CTA Box */}
              <div className="rounded-2xl border-2 border-blue-600/30 bg-white p-6 sm:p-7 shadow-lg shadow-blue-900/5 space-y-5">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-600 font-semibold block">
                      Single Commercial License &bull; Instant Access
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                        {product.currency}{currentPrice}
                      </span>
                      {hasSale && (
                        <>
                          <span className="text-xl font-medium text-slate-600 line-through">
                            {product.currency}{product.regularPrice}
                          </span>
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                            Save {discountPercent}% Today
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="text-right text-xs text-slate-600">
                    <span className="font-semibold text-slate-800 block">Immediate Delivery</span>
                    <span>Direct via Digistore24 checkout</span>
                  </div>
                </div>

                {/* Primary CTA Buttons with PayPal & Amazon Pay */}
                <div className="space-y-2.5">
                  <button
                    id="hero-buy-now-cta"
                    type="button"
                    onClick={() => openPaymentWithMethod('card')}
                    className="w-full py-3.5 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-base font-bold text-center shadow-md hover:shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 cursor-pointer select-none"
                  >
                    <span>Instant Checkout with Card &bull; {product.currency}{currentPrice}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {/* PayPal Button */}
                    <button
                      type="button"
                      id="hero-paypal-btn"
                      onClick={() => openPaymentWithMethod('paypal')}
                      className="py-3 px-4 rounded-xl bg-[#FFC439] hover:bg-[#F2BA36] active:bg-[#E5AF30] text-[#003087] font-extrabold text-sm shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer border border-[#E5AF30]"
                    >
                      <span className="italic font-black">Pay</span>
                      <span className="italic font-black text-[#0079C1]">Pal</span>
                      <span className="text-xs font-semibold text-slate-800 ml-1">Checkout</span>
                    </button>

                    {/* Amazon Pay Button */}
                    <button
                      type="button"
                      id="hero-amazonpay-btn"
                      onClick={() => openPaymentWithMethod('amazon_pay')}
                      className="py-3 px-4 rounded-xl bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] text-slate-900 font-bold text-sm shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer border border-[#FCD200]"
                    >
                      <span>Pay with</span>
                      <span className="font-extrabold">amazon</span>
                      <span className="font-extrabold text-[#FF9900]">pay</span>
                    </button>
                  </div>

                  {product.checkoutUrl && (
                    <div className="text-center pt-1">
                      <a
                        href={product.checkoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleCheckoutClick}
                        className="text-xs text-slate-500 hover:text-blue-600 underline"
                      >
                        Or complete order via Digistore24 Reseller Checkout &rarr;
                      </a>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>256-Bit SSL Encrypted</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>PayPal &amp; Amazon Pay Protected</span>
                    </span>
                    <span>&bull;</span>
                    <span>Instant Digital Delivery</span>
                  </div>
                </div>

                {/* GUARANTEE NEAR MAIN PURCHASE SECTION (MANDATED BY SECTION 6) */}
                <GuaranteeSection
                  onNavigate={onNavigate}
                  variant="compact"
                  customHeading={product.guaranteeHeading}
                  customText={product.guaranteeText}
                />
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-2xl shadow-slate-300/40">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover aspect-4/3"
                />
                <div className="p-6 bg-white border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1.5 text-slate-800">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Verified {settings.companyName} Asset</span>
                    </span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                      Guaranteed Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Includes full documentation, license credentials, and dedicated customer support at {product.supportEmail || settings.supportEmail}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Section 1: What You Get */}
        {product.whatYouGet && product.whatYouGet.length > 0 && (
          <section id="section-what-you-get" className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/50">
                Complete Package
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                What You Get
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Everything required to deploy, configure, and maintain robust protection from day one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.whatYouGet.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200/70"
                >
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-slate-800 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 2: Key Features & Benefits */}
        <section id="section-features" className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/50">
              Capabilities & Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Key Features & Core Benefits
            </h2>
            <p className="text-slate-600 text-base">
              Engineered by security practitioners with enterprise reliability and straightforward usability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.benefits && product.benefits.map((b, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>

          {product.features && product.features.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-600" />
                <span>Detailed Feature Specifications</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Who This Product Is For */}
        {product.whoIsItFor && product.whoIsItFor.length > 0 && (
          <section id="section-who-for" className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800">
                Audience & Fit
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
                Who This Product Is For
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                Engineered specifically for teams that require certified protection without redundant complexity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {product.whoIsItFor.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 space-y-2 hover:bg-slate-800 transition"
                >
                  <Users className="w-6 h-6 text-blue-400" />
                  <p className="text-sm font-semibold text-slate-200 leading-snug">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: How It Works */}
        {product.howItWorks && product.howItWorks.length > 0 && (
          <section id="section-how-it-works" className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/50">
                Execution Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                How It Works
              </h2>
              <p className="text-slate-600 text-base">
                Get started in 3 simple steps with automated fulfillment and transparent delivery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.howItWorks.map((step) => (
                <div
                  key={step.step}
                  className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-xs space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white font-black text-xl flex items-center justify-center shadow-md">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 5: Product Screenshots / Images */}
        {product.screenshots && product.screenshots.length > 0 && (
          <section id="section-screenshots" className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Product Screenshots & Previews
              </h2>
              <p className="text-sm text-slate-600">
                Inspect authentic previews of the dashboards, deliverables, and runbooks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.screenshots.map((s, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs"
                >
                  <img
                    src={s.url}
                    alt={s.caption}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4 bg-slate-50 border-t border-slate-200/80">
                    <p className="text-xs font-semibold text-slate-700 text-center">
                      {s.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Customer Testimonials */}
        {product.testimonials && product.testimonials.length > 0 && (
          <section id="section-testimonials" className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/50">
                Verified Feedback
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Customer Testimonials
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs space-y-4"
                >
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "{t.comment}"
                  </p>
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-600">
                      {t.role} {t.company && `• ${t.company}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 7: FULL 60-DAY MONEY-BACK GUARANTEE SECTION (MANDATED BY SECTION 6) */}
        <GuaranteeSection
          onNavigate={onNavigate}
          variant="full"
          customHeading={product.guaranteeHeading}
          customText={product.guaranteeText}
        />

        {/* Section 8: Frequently Asked Questions */}
        {product.faqs && product.faqs.length > 0 && (
          <section id="section-faqs" className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-600">
                Clear answers regarding licensing, fulfillment, and customer support.
              </p>
            </div>

            <div className="space-y-3">
              {product.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Section 9: Support Information */}
        <section id="section-support" className="rounded-2xl border border-slate-200 bg-white p-8 max-w-3xl mx-auto shadow-xs text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Dedicated Customer Support
          </h3>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Need pre-sales clarification or support following your order? Our engineering team responds promptly to all customer inquiries.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <a
                href={`mailto:${product.supportEmail || settings.supportEmail}`}
                className="font-semibold text-blue-600 hover:underline"
              >
                {product.supportEmail || settings.supportEmail}
              </a>
            </div>
            {product.supportHours && (
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{product.supportHours}</span>
              </div>
            )}
          </div>
        </section>

        {/* FINAL CTA SECTION (MANDATED BY SECTION 6: Guarantee visible near final CTA) */}
        <section id="final-cta-section" className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-8 sm:p-12 shadow-2xl space-y-8 text-center max-w-4xl mx-auto">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Instant Access via Digistore24
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Get {product.name}
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Order now to lock in promotional pricing and start hardening your systems today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
            <button
              id="final-buy-now-cta"
              type="button"
              onClick={() => openPaymentWithMethod('card')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-extrabold text-base shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Instant Card Checkout ({product.currency}{currentPrice})</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              type="button"
              onClick={() => openPaymentWithMethod('paypal')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#E5AF30]"
            >
              <span className="italic font-black">Pay</span>
              <span className="italic font-black text-[#0079C1]">Pal</span>
            </button>

            <button
              type="button"
              onClick={() => openPaymentWithMethod('amazon_pay')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#FFD814] hover:bg-[#F7CA00] text-slate-900 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#FCD200]"
            >
              <span>amazon</span>
              <span className="text-[#FF9900] font-extrabold">pay</span>
            </button>
          </div>

          {/* Guarantee visible near final CTA */}
          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 max-w-xl mx-auto space-y-2">
            <div className="flex items-center justify-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Protected by our 60-Day Money-Back Guarantee</span>
            </div>
            <p>
              Your purchase is 100% risk-free. If not satisfied, request a refund within 60 days of purchase under our{' '}
              <button
                onClick={() => onNavigate({ type: 'refund-policy' })}
                className="text-blue-400 underline hover:text-white"
              >
                Refund Policy
              </button>
              .
            </p>
          </div>
        </section>
      </div>

      {/* Interactive Payment Gateway Modal */}
      <PaymentGatewayModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        settings={settings}
        item={{
          id: product.id,
          name: product.name,
          amount: currentPrice,
          currency: product.currency,
          category: product.category,
          downloadUrl: product.deliveryResourceUrl,
        }}
        initialMethod={paymentMethod}
        onNavigate={onNavigate}
      />
    </div>
  );
};
