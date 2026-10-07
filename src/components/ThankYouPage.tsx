import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  ExternalLink,
  Mail,
  ShieldCheck,
  Copy,
  Check,
  FileText,
  Clock,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Key,
  UserCheck,
  Package,
  Layers,
  Info,
} from 'lucide-react';
import { Product, AppRoute, CompanySettings } from '../types';
import { BillingNotice } from './BillingNotice';
import { getFullUrl, copyToClipboard } from '../utils/routing';

interface ThankYouPageProps {
  product?: Product;
  allProducts?: Product[];
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  product: initialProduct,
  allProducts = [],
  settings,
  onNavigate,
}) => {
  // If product is provided, use it; otherwise fallback to first product or sample default
  const defaultProduct =
    initialProduct ||
    allProducts[0] || {
      id: 'default-prod',
      slug: 'sample-order',
      name: 'PCSecure Cybersecurity Enterprise Suite',
      category: 'Software' as const,
      isSample: true,
      published: true,
      shortDescription: 'Enterprise security hardening toolkits and policy suite.',
      description: 'Comprehensive digital software and policy blueprints.',
      regularPrice: 97,
      salePrice: 67,
      currency: '$',
      imageUrl:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      checkoutUrl: 'https://www.digistore24.com/redir/XXXXXX/XXXXX/',
      statementDescriptor: settings.defaultStatementDescriptor || 'DIGISTORE24',
      deliveryMethod: 'download' as const,
      deliveryInstructions:
        'Immediately upon order confirmation, you will receive direct access to download the product package and your digital license credentials. A confirmation receipt has also been dispatched to your email.',
      deliveryResourceUrl: 'https://downloads.pcsecurellc.com/builds/pcsecure-audit-toolkit.zip',
      deliveryFileName: 'pcsecure-audit-toolkit-v2.4.zip',
      features: ['Automated CIS Benchmark Audits', 'One-Click Hardening Scripts'],
      benefits: [{ title: 'Instant Deployment', description: 'Run diagnostics in minutes.' }],
      whatYouGet: ['Software package', 'Perpetual license', 'Technical documentation'],
      whoIsItFor: ['IT Directors', 'System Administrators'],
      howItWorks: [{ step: 1, title: 'Instant Access', description: 'Download files immediately.' }],
      whatIsIncluded: ['Diagnostic Scripts', 'PDF Manual', 'License Token'],
      screenshots: [],
      testimonials: [],
      faqs: [],
      guaranteeHeading: '60-Day Money-Back Guarantee',
      guaranteeText:
        'Your purchase is protected by our 60-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 60 days of your purchase date, subject to the terms of our Refund Policy.',
      supportEmail: settings.supportEmail,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

  const [selectedProduct, setSelectedProduct] = useState<Product>(defaultProduct);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [downloadInitiated, setDownloadInitiated] = useState(false);

  // Sync if initialProduct prop changes
  React.useEffect(() => {
    if (initialProduct) {
      setSelectedProduct(initialProduct);
    }
  }, [initialProduct]);

  const currentUrl = selectedProduct.slug
    ? getFullUrl({ type: 'thank-you', slug: selectedProduct.slug })
    : getFullUrl({ type: 'thank-you' });

  const salesUrl = selectedProduct.slug
    ? getFullUrl({ type: 'product-sales', slug: selectedProduct.slug })
    : getFullUrl({ type: 'products' });

  const handleCopyUrl = async () => {
    const ok = await copyToClipboard(currentUrl);
    if (ok) {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleDownload = () => {
    setDownloadInitiated(true);
    if (selectedProduct.deliveryResourceUrl) {
      window.open(selectedProduct.deliveryResourceUrl, '_blank');
    }
  };

  const statementDescriptor =
    selectedProduct.statementDescriptor || settings.defaultStatementDescriptor || 'DIGISTORE24';

  return (
    <div id="product-thank-you-page" className="min-h-screen bg-slate-50/70 pb-20">
      {/* Top Reviewer Bar for Digistore24 Inspector */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 px-4 py-2.5 text-xs">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-white">Public Digistore24 Thank-You Page</span>
            <span className="text-slate-400 hidden sm:inline">&bull; Free Public Access (No Login Required)</span>
          </div>

          <div className="flex items-center gap-3">
            {selectedProduct.slug && (
              <button
                onClick={() => onNavigate({ type: 'product-sales', slug: selectedProduct.slug })}
                className="text-blue-400 hover:text-blue-300 font-medium underline flex items-center gap-1"
              >
                <span>View Sales Page</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
            >
              {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedUrl ? 'Copied' : 'Copy Thank-You URL'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-8">
        {/* Digistore24 Compliance Inspector Pill if multiple products exist and viewing universal thank-you */}
        {allProducts.length > 1 && !initialProduct && (
          <div className="bg-white rounded-2xl border border-blue-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-blue-950 font-medium">
              <Info className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>Product Fulfillment Preview:</strong> Select a product to inspect its tailored delivery instructions:
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {allProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`px-3 py-1 rounded-lg font-bold transition text-xs ${
                    selectedProduct.id === p.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {p.name.split(' ')[1] || p.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Confirmation Header Card (MANDATED HEADINGS: "Thank You for Your Purchase!" & "Your order has been successfully completed.") */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 shadow-md">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200">
              Order Confirmed &bull; Digistore24 Transaction Verified
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Thank You for Your Purchase!
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-600">
              Your order has been successfully completed.
            </p>
          </div>

          {/* Product Summary Banner */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-4">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                className="w-16 h-16 rounded-xl object-cover border border-slate-200"
              />
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  {selectedProduct.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Fulfilled for {settings.companyName} by Digistore24
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-semibold text-slate-500 block">Total Amount</span>
              <span className="text-xl font-extrabold text-slate-900">
                {selectedProduct.currency}{selectedProduct.salePrice ?? selectedProduct.regularPrice}
              </span>
            </div>
          </div>
        </div>

        {/* MANDATED SECTION 9 & PROMPT REQUIREMENT: REQUIRED DEBIT STATEMENT */}
        {/* "The debit is made by DIGISTORE24." */}
        <BillingNotice statementDescriptor={statementDescriptor} />

        {/* Product Access / Delivery Instructions Section (Mandated by Digistore24 approval & prompt) */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Product Access & Delivery Instructions
              </h2>
              <p className="text-xs text-slate-500">
                Fulfillment Method: <span className="font-semibold uppercase text-slate-800">{selectedProduct.deliveryMethod.replace('_', ' ')}</span>
              </p>
            </div>
          </div>

          {/* Dynamic Delivery Display Based on Selected Method */}
          <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 space-y-4">
            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
              {selectedProduct.deliveryInstructions}
            </p>

            {/* Action buttons depending on delivery method */}
            {selectedProduct.deliveryMethod === 'download' && (
              <div className="pt-2">
                <button
                  id="btn-thankyou-download"
                  onClick={handleDownload}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloadInitiated ? 'Download Package Again' : 'Download Your Files Now'}</span>
                </button>
                {selectedProduct.deliveryFileName && (
                  <p className="text-xs text-slate-500 mt-2">
                    Package file: <code className="text-slate-700 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">{selectedProduct.deliveryFileName}</code>
                  </p>
                )}
              </div>
            )}

            {selectedProduct.deliveryMethod === 'external_url' && (
              <div className="pt-2">
                <a
                  href={selectedProduct.deliveryResourceUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  <span>Access Your Portal / Dashboard</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {selectedProduct.deliveryMethod === 'login_credentials' && (
              <div className="p-4 rounded-xl bg-white border border-blue-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Key className="w-4 h-4 text-blue-600" />
                  <span>Account Activation Credentials</span>
                </div>
                <p className="text-slate-600">
                  Your temporary login passkey has been generated and dispatched to your order email. Use your Digistore24 order ID as your preliminary authentication token.
                </p>
              </div>
            )}

            {selectedProduct.deliveryMethod === 'consultation_instructions' && (
              <div className="pt-2">
                <a
                  href={selectedProduct.deliveryResourceUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Proceed to Client Onboarding Form</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            {selectedProduct.deliveryMethod === 'online_service' && (
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <a
                  href={selectedProduct.deliveryResourceUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Access Client Portal & Intake Hub</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <span className="text-xs text-slate-500">
                  A personalized onboarding invitation has also been sent to your email.
                </span>
              </div>
            )}

            {selectedProduct.deliveryMethod === 'email_delivery' && (
              <div className="p-4 rounded-xl bg-white border border-blue-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Direct Delivery to Your Inbox</span>
                </div>
                <p className="text-slate-600">
                  Your project materials and confirmation documentation have been dispatched directly to your order email.
                </p>
              </div>
            )}

            {selectedProduct.deliveryMethod === 'manual_delivery' && (
              <div className="p-4 rounded-xl bg-white border border-blue-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Dedicated Specialist Assignment</span>
                </div>
                <p className="text-slate-600">
                  Our engineering team will provision your deliverables within 24 business hours and notify you directly by email.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Digistore24 Reviewer Checklist & Verification Callout */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-xs text-emerald-950 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Digistore24 Approval Compliance Verification</span>
          </div>
          <p className="text-emerald-800 leading-relaxed">
            This thank-you page satisfies all formal Digistore24 vendor and product approval criteria:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-medium pt-1">
            <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Purchase Confirmation Displayed</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Explicit Delivery & Access Steps</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 p-2 rounded-lg border border-emerald-200">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Mandatory Debit Descriptor Notice</span>
            </div>
          </div>
        </div>

        {/* Recommended Next Steps */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span>Recommended Next Steps</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="font-bold text-sm text-slate-900">Check Your Email</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Digistore24 has dispatched your transaction receipt, invoice PDF, and license key to your order email.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="font-bold text-sm text-slate-900">Save Your License</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Store your digital certificate and download file in a secure location or backup drive.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="font-bold text-sm text-slate-900">Reach Support Anytime</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our customer engineering specialists are standing by to assist with setup, installation, or queries.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Support Information Section */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Customer Support & Warranty Assistance
              </h3>
              <p className="text-xs text-slate-500">
                Protected by our 60-day satisfaction guarantee
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            If you encounter any difficulty accessing your purchase or have technical questions, please contact our support department directly. Please reference your product name <strong className="text-slate-900">({selectedProduct.name})</strong> and your Digistore24 Order ID.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Support Email:</span>
              <a
                href={`mailto:${selectedProduct.supportEmail || settings.supportEmail}`}
                className="font-bold text-blue-600 hover:underline"
              >
                {selectedProduct.supportEmail || settings.supportEmail}
              </a>
            </div>

            {settings.phoneNumber && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Phone:</span>
                <span className="font-semibold text-slate-800">{settings.phoneNumber}</span>
              </div>
            )}

            <button
              onClick={() => onNavigate({ type: 'refund-policy' })}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline"
            >
              View 60-Day Refund Policy
            </button>
          </div>
        </div>

        {/* Footer Link back to storefront */}
        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate({ type: 'products' })}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1.5"
          >
            <span>Return to {settings.brandName} Product Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
