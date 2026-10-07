import React, { useState } from 'react';
import {
  Save,
  ArrowLeft,
  Trash2,
  Plus,
  X,
  ExternalLink,
  Copy,
  Check,
  Eye,
  ShieldCheck,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import {
  Product,
  DeliveryMethod,
  CompanySettings,
  AppRoute,
  ProductBenefit,
  FAQItem,
  Testimonial,
} from '../types';
import { getFullUrl, copyToClipboard } from '../utils/routing';

interface ProductEditorProps {
  product: Product | null;
  settings: CompanySettings;
  onSave: (product: Product) => void;
  onDelete?: (id: string) => void;
  onCancel: () => void;
  onNavigate: (route: AppRoute) => void;
}

export const ProductEditor: React.FC<ProductEditorProps> = ({
  product,
  settings,
  onSave,
  onDelete,
  onCancel,
  onNavigate,
}) => {
  const isNew = !product;

  const [formData, setFormData] = useState<Product>(
    product || {
      id: `prod-${Date.now()}`,
      slug: '',
      name: '',
      category: 'Software',
      isSample: false,
      published: true,
      badge: '',
      shortDescription: '',
      description: '',
      regularPrice: 97,
      salePrice: 67,
      currency: '$',
      imageUrl:
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      checkoutUrl: '',
      statementDescriptor: settings.defaultStatementDescriptor || 'DIGISTORE24',
      deliveryMethod: 'download',
      deliveryInstructions:
        'Immediately upon order confirmation, you will receive direct access to download the product package and your digital license credentials. A confirmation receipt has also been dispatched to your email.',
      deliveryResourceUrl: '',
      deliveryFileName: '',
      features: [
        'Enterprise Security Baseline Diagnostic',
        'Automated Remediation Workflows',
        '24/7 Digital Delivery & Verification',
      ],
      benefits: [
        {
          title: 'Immediate Threat Hardening',
          description: 'Deploy battle-tested security profiles in under 30 minutes.',
        },
      ],
      whatYouGet: [
        'Complete Software Script & Blueprint Package',
        'Perpetual Single Organization License',
        '12 Months of Maintenance Revisions',
      ],
      whoIsItFor: [
        'System Administrators',
        'IT Directors & MSP Engineers',
        'Security-conscious Web Developers',
      ],
      howItWorks: [
        {
          step: 1,
          title: 'Order via Digistore24',
          description: 'Secure one-click checkout.',
        },
        {
          step: 2,
          title: 'Instant Fulfillment',
          description: 'Access files and license key immediately on thank-you page.',
        },
        {
          step: 3,
          title: 'Deploy & Protect',
          description: 'Follow our quick runbook.',
        },
      ],
      whatIsIncluded: ['Diagnostic Scripts', 'PDF Manual', 'License Token'],
      screenshots: [],
      testimonials: [],
      faqs: [
        {
          question: 'What is the refund policy?',
          answer:
            'Your purchase is protected by our 60-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 60 days of your purchase date, subject to the terms of our Refund Policy.',
        },
      ],
      guaranteeHeading: '60-Day Money-Back Guarantee',
      guaranteeText:
        'Your purchase is protected by our 60-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 60 days of your purchase date, subject to the terms of our Refund Policy.',
      supportEmail: settings.supportEmail || 'support@pcsecure.tech',
      supportHours: settings.businessHours || 'Monday - Friday: 9am - 6pm EST',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'general' | 'digistore' | 'delivery' | 'sales_page' | 'guarantee'
  >('general');

  // Auto-generate slug when name changes if isNew or slug is empty
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: isNew || !prev.slug ? generatedSlug : prev.slug,
    }));
  };

  const handleCopy = async (key: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const salesPageUrl = formData.slug
    ? getFullUrl({ type: 'product-sales', slug: formData.slug })
    : '';
  const thankYouPageUrl = formData.slug
    ? getFullUrl({ type: 'thank-you', slug: formData.slug })
    : '';

  // Feature handling
  const [newFeature, setNewFeature] = useState('');
  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // What you get handling
  const [newWhatYouGet, setNewWhatYouGet] = useState('');
  const addWhatYouGet = () => {
    if (newWhatYouGet.trim()) {
      setFormData((prev) => ({
        ...prev,
        whatYouGet: [...prev.whatYouGet, newWhatYouGet.trim()],
      }));
      setNewWhatYouGet('');
    }
  };

  const removeWhatYouGet = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      whatYouGet: prev.whatYouGet.filter((_, i) => i !== index),
    }));
  };

  // Benefit handling
  const [newBenefitTitle, setNewBenefitTitle] = useState('');
  const [newBenefitDesc, setNewBenefitDesc] = useState('');
  const addBenefit = () => {
    if (newBenefitTitle.trim() && newBenefitDesc.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [
          ...prev.benefits,
          { title: newBenefitTitle.trim(), description: newBenefitDesc.trim() },
        ],
      }));
      setNewBenefitTitle('');
      setNewBenefitDesc('');
    }
  };

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  // FAQ handling
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');
  const addFaq = () => {
    if (newFaqQ.trim() && newFaqA.trim()) {
      setFormData((prev) => ({
        ...prev,
        faqs: [
          ...prev.faqs,
          { question: newFaqQ.trim(), answer: newFaqA.trim() },
        ],
      }));
      setNewFaqQ('');
      setNewFaqA('');
    }
  };

  const removeFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Product name is required');
      return;
    }
    if (!formData.slug.trim()) {
      alert('Product slug is required');
      return;
    }
    onSave({
      ...formData,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isNew ? 'Create New Product' : `Edit Product: ${formData.name}`}
            </h2>
            <p className="text-xs text-slate-500">
              Configures public sales page, thank-you page, and Digistore24 checkout integration.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && onDelete && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete "${formData.name}"?`)) {
                  onDelete(formData.id);
                }
              }}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 text-sm font-bold rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-sm flex items-center gap-2 transition"
          >
            <Save className="w-4 h-4" />
            <span>Save Product</span>
          </button>
        </div>
      </div>

      {/* DIGISTORE24 APPROVED URL GENERATOR BOX (MANDATED BY SECTION 3 & 20) */}
      {formData.slug && (
        <div className="bg-slate-900 rounded-2xl p-5 sm:p-6 text-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Automated Digistore24 Approval URLs
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Copy these public URLs directly into your Digistore24 Product Approval form.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-medium text-emerald-300">Publicly Accessible</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sales Page Box */}
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">SALES PAGE:</span>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'product-sales', slug: formData.slug })}
                  className="text-blue-400 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Sales Page</span>
                </button>
              </div>
              <p className="font-mono text-xs text-slate-300 truncate bg-slate-950/60 p-2 rounded border border-slate-800">
                {salesPageUrl}
              </p>
              <button
                type="button"
                id="btn-copy-sales-url-editor"
                onClick={() => handleCopy('sales', salesPageUrl)}
                className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                {copiedKey === 'sales' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === 'sales' ? 'Copied to Clipboard!' : 'Copy Sales Page URL'}</span>
              </button>
            </div>

            {/* Thank-You Page Box */}
            <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">THANK-YOU PAGE:</span>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'thank-you', slug: formData.slug })}
                  className="text-blue-400 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Thank You Page</span>
                </button>
              </div>
              <p className="font-mono text-xs text-slate-300 truncate bg-slate-950/60 p-2 rounded border border-slate-800">
                {thankYouPageUrl}
              </p>
              <button
                type="button"
                id="btn-copy-thankyou-url-editor"
                onClick={() => handleCopy('thankyou', thankYouPageUrl)}
                className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                {copiedKey === 'thankyou' ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey === 'thankyou' ? 'Copied to Clipboard!' : 'Copy Thank You Page URL'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 pt-2 gap-2 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`px-4 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition ${
            activeTab === 'general'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          General & Pricing
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('digistore')}
          className={`px-4 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition ${
            activeTab === 'digistore'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Digistore24 & Billing
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('delivery')}
          className={`px-4 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition ${
            activeTab === 'delivery'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Delivery Instructions
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('sales_page')}
          className={`px-4 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition ${
            activeTab === 'sales_page'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Features & Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('guarantee')}
          className={`px-4 py-3 text-sm font-bold border-b-2 whitespace-nowrap transition ${
            activeTab === 'guarantee'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          60-Day Guarantee & FAQs
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl border border-slate-200 border-t-0 p-6 sm:p-8 space-y-6">
        {/* TAB 1: General & Pricing */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  required
                  placeholder="e.g. PCSecure Cybersecurity Audit Toolkit"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  URL Slug (/products/your-slug) *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })
                  }
                  required
                  placeholder="e.g. pcsecure-audit-toolkit"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-[11px] text-slate-500">
                  Used for both Sales Page (/products/slug) and Thank-You Page (/thank-you/slug)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value as any })
                  }
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <optgroup label="Services & Solutions">
                    <option value="Website Design">Website Design</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="SEO">SEO</option>
                    <option value="App Development">App Development</option>
                    <option value="Service">Consulting & Service</option>
                  </optgroup>
                  <optgroup label="Software & Digital Products">
                    <option value="Software">Software Toolkit</option>
                    <option value="Security Suite">Security Suite</option>
                    <option value="Digital Guide">Digital Guide & Policies</option>
                    <option value="Subscription">Subscription</option>
                  </optgroup>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Regular Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.regularPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, regularPrice: parseFloat(e.target.value) || 0 })
                  }
                  required
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Sale Price ($) (Optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.salePrice ?? ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salePrice: e.target.value ? parseFloat(e.target.value) : undefined,
                    })
                  }
                  placeholder="e.g. 67.00"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Badge / Tag (Optional)
              </label>
              <input
                type="text"
                value={formData.badge || ''}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="e.g. Best Seller, Enterprise Grade, Instant Download"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Product Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="mt-2 flex items-center gap-3">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-20 h-14 rounded-lg object-cover border border-slate-200"
                />
                <span className="text-xs text-slate-500">
                  Image preview displayed on catalog and sales hero.
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Short Value Proposition (1-2 sentences)
              </label>
              <textarea
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Brief value proposition shown on product cards and sales page hero."
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Detailed Product Description *
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                placeholder="Comprehensive description of the product, problem solved, and architecture."
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-6 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>Publish on Website Catalog</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-600">
                <input
                  type="checkbox"
                  checked={Boolean(formData.isSample)}
                  onChange={(e) => setFormData({ ...formData, isSample: e.target.checked })}
                  className="w-4 h-4 text-amber-500 rounded"
                />
                <span>Mark as Sample / Demo Content</span>
              </label>
            </div>
          </div>
        )}

        {/* TAB 2: Digistore24 & Billing */}
        {activeTab === 'digistore' && (
          <div className="space-y-6">
            <div className="bg-blue-50/70 rounded-2xl p-5 border border-blue-100 space-y-2">
              <h4 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Digistore24 Checkout & Billing Compliance</span>
              </h4>
              <p className="text-xs text-blue-800 leading-relaxed">
                Digistore24 requires a valid checkout link where customers are redirected upon clicking "Buy Now", plus a specific Debit / Statement Descriptor shown on the thank-you page.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Digistore24 Checkout URL *
              </label>
              <input
                type="url"
                value={formData.checkoutUrl}
                onChange={(e) => setFormData({ ...formData, checkoutUrl: e.target.value })}
                placeholder="https://www.digistore24.com/redir/XXXXXX/XXXXX/"
                required
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-500 mt-1 block">
                The CTA buttons ("Buy Now", "Get Instant Access") on your sales page will send customers to this URL.
              </span>
            </div>

            {/* MANDATED SECTION 9: DEBIT / STATEMENT DESCRIPTOR */}
            <div className="bg-amber-50/80 rounded-2xl p-5 border border-amber-200 space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                  Debit / Statement Descriptor *
                </label>
                <input
                  type="text"
                  value={formData.statementDescriptor}
                  onChange={(e) => setFormData({ ...formData, statementDescriptor: e.target.value })}
                  placeholder="e.g. DIGISTORE24"
                  required
                  className="w-full rounded-xl border border-amber-300 bg-white px-3.5 py-2.5 text-sm font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                The thank-you page dynamically displays: <strong className="font-extrabold">"The debit is made by {formData.statementDescriptor || 'DIGISTORE24'}."</strong>
                <br />
                Enter the exact wording required by Digistore24 for this product or your account.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Customer Support Email for this Product *
              </label>
              <input
                type="email"
                value={formData.supportEmail}
                onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
                placeholder="support@pcsecure.tech"
                required
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* TAB 3: Delivery Instructions */}
        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Delivery Method *
              </label>
              <select
                value={formData.deliveryMethod}
                onChange={(e) =>
                  setFormData({ ...formData, deliveryMethod: e.target.value as DeliveryMethod })
                }
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="download">Download (File or Archive)</option>
                <option value="external_url">External access URL</option>
                <option value="login_credentials">Account / login instructions</option>
                <option value="email_delivery">Email delivery</option>
                <option value="manual_delivery">Manual delivery</option>
                <option value="online_service">Online service</option>
                <option value="consultation_instructions">Consultation / service instructions</option>
              </select>
              <span className="text-xs text-slate-500 mt-1 block">
                Controls the interactive elements and guidance rendered on the public thank-you page.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Product Delivery Instructions (Displayed on Thank-You Page) *
              </label>
              <textarea
                rows={4}
                value={formData.deliveryInstructions}
                onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                required
                placeholder="Clear, step-by-step instructions telling the buyer exactly how to access their software, files, or service."
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Public Resource / Download URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.deliveryResourceUrl || ''}
                  onChange={(e) => setFormData({ ...formData, deliveryResourceUrl: e.target.value })}
                  placeholder="https://downloads.pcsecurellc.com/builds/package.zip"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  File Name Label (Optional)
                </label>
                <input
                  type="text"
                  value={formData.deliveryFileName || ''}
                  onChange={(e) => setFormData({ ...formData, deliveryFileName: e.target.value })}
                  placeholder="e.g. pcsecure-toolkit-v3.zip"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Features & Details */}
        {activeTab === 'sales_page' && (
          <div className="space-y-6">
            {/* Features list */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Key Features List
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a key feature..."
                  className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1.5">
                {formData.features.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs font-medium text-slate-800 border border-slate-200"
                  >
                    <span>{f}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(i)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* What You Get */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                What You Get Items
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newWhatYouGet}
                  onChange={(e) => setNewWhatYouGet(e.target.value)}
                  placeholder="Add an item included in package..."
                  className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addWhatYouGet}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  Add
                </button>
              </div>
              <div className="space-y-1.5">
                {formData.whatYouGet.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg text-xs font-medium text-slate-800 border border-slate-200"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeWhatYouGet(i)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Benefits (Title + Description)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                <input
                  type="text"
                  value={newBenefitTitle}
                  onChange={(e) => setNewBenefitTitle(e.target.value)}
                  placeholder="Benefit Title"
                  className="rounded-xl border border-slate-300 px-3.5 py-2 text-sm"
                />
                <input
                  type="text"
                  value={newBenefitDesc}
                  onChange={(e) => setNewBenefitDesc(e.target.value)}
                  placeholder="Benefit Description"
                  className="rounded-xl border border-slate-300 px-3.5 py-2 text-sm"
                />
              </div>
              <button
                type="button"
                onClick={addBenefit}
                className="mb-3 px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Add Benefit
              </button>
              <div className="space-y-2">
                {formData.benefits.map((b, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{b.title}: </span>
                      <span className="text-slate-600">{b.description}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBenefit(i)}
                      className="text-rose-500 hover:text-rose-700 shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: 60-Day Guarantee & FAQs */}
        {activeTab === 'guarantee' && (
          <div className="space-y-6">
            {/* MANDATED SECTION 6: 60-DAY MONEY-BACK GUARANTEE CONFIGURATION */}
            <div className="bg-emerald-50/70 rounded-2xl p-6 border-2 border-emerald-200 space-y-4">
              <div className="flex items-center gap-2 text-emerald-950 font-bold">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>60-Day Money-Back Guarantee Configuration (Mandated)</span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Guarantee Heading *
                </label>
                <input
                  type="text"
                  value={formData.guaranteeHeading}
                  onChange={(e) => setFormData({ ...formData, guaranteeHeading: e.target.value })}
                  required
                  placeholder="60-Day Money-Back Guarantee"
                  className="w-full rounded-xl border border-emerald-300 bg-white px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Guarantee Copy *
                </label>
                <textarea
                  rows={3}
                  value={formData.guaranteeText}
                  onChange={(e) => setFormData({ ...formData, guaranteeText: e.target.value })}
                  required
                  className="w-full rounded-xl border border-emerald-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-600 mt-1 block">
                  Must state the 60-day protection clearly and link to the website's Refund Policy.
                </span>
              </div>
            </div>

            {/* FAQs */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Frequently Asked Questions (FAQs)
              </label>
              <div className="space-y-2 mb-3">
                <input
                  type="text"
                  value={newFaqQ}
                  onChange={(e) => setNewFaqQ(e.target.value)}
                  placeholder="FAQ Question"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm"
                />
                <textarea
                  rows={2}
                  value={newFaqA}
                  onChange={(e) => setNewFaqA(e.target.value)}
                  placeholder="FAQ Answer"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={addFaq}
                  className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  Add FAQ Item
                </button>
              </div>

              <div className="space-y-2">
                {formData.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1 relative"
                  >
                    <button
                      type="button"
                      onClick={() => removeFaq(i)}
                      className="absolute top-3 right-3 text-rose-500 hover:text-rose-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="font-bold text-slate-900 pr-6">{faq.question}</p>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Form Bottom Actions */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            id="btn-save-product-bottom"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition"
          >
            Save & Update Product Pages
          </button>
        </div>
      </form>
    </div>
  );
};
