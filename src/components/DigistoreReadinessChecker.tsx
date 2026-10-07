import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  Eye,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Product, CompanySettings, AppRoute } from '../types';
import { checkDigistoreReadiness } from '../services/storage';
import { getFullUrl, copyToClipboard } from '../utils/routing';

interface DigistoreReadinessCheckerProps {
  products: Product[];
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
  onEditProduct: (product: Product) => void;
}

export const DigistoreReadinessChecker: React.FC<DigistoreReadinessCheckerProps> = ({
  products,
  settings,
  onNavigate,
  onEditProduct,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    products[0]?.id || ''
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const selectedProduct =
    products.find((p) => p.id === selectedProductId) || products[0];

  const handleCopy = async (key: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  if (!selectedProduct) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        No products available to audit. Please create a product first.
      </div>
    );
  }

  const { isReady, checks, score } = checkDigistoreReadiness(
    selectedProduct,
    settings
  );

  const salesPageUrl = getFullUrl({
    type: 'product-sales',
    slug: selectedProduct.slug,
  });
  const thankYouPageUrl = getFullUrl({
    type: 'thank-you',
    slug: selectedProduct.slug,
  });

  return (
    <div id="digistore-readiness-checker" className="space-y-6">
      {/* Header with Product Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Digistore24 Readiness
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated compliance and structural verification engine for official Digistore24 vendor approval.
          </p>
        </div>

        {/* Product selector dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="select-product-audit" className="text-xs font-semibold text-slate-600">
            Inspect Product:
          </label>
          <select
            id="select-product-audit"
            value={selectedProduct.id}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="text-sm font-semibold rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} {p.isSample ? '(Demo)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Audit Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Approval Status
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3 mt-1">
              <span>{selectedProduct.name}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Category: <span className="font-semibold text-slate-700">{selectedProduct.category}</span> &bull; Slug:{' '}
              <code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-mono">{selectedProduct.slug}</code>
            </p>
          </div>

          {/* Mandated Status Badge */}
          <div>
            {isReady ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-base shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Ready for Review</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-bold text-sm shadow-xs">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Action Required ({checks.filter((c) => !c.passed).length} missing)</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick URL Actions Box (MANDATED BY SECTION 15) */}
        <div className="p-5 rounded-xl bg-slate-900 text-white space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Digistore24 Submission URLs</span>
            </span>
            <span className="text-[11px] text-emerald-400 font-medium">Publicly Accessible</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sales Page URL */}
            <div className="bg-slate-800/90 rounded-lg p-3.5 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Sales Page URL:</span>
                <button
                  onClick={() => onNavigate({ type: 'product-sales', slug: selectedProduct.slug })}
                  className="text-blue-400 hover:text-white inline-flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>Preview</span>
                </button>
              </div>
              <p className="text-xs font-mono text-slate-200 truncate bg-slate-900/60 p-2 rounded border border-slate-700/60">
                {salesPageUrl}
              </p>
              <button
                id="btn-copy-sales-url-checker"
                onClick={() => handleCopy('sales', salesPageUrl)}
                className="w-full py-1.5 px-3 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                {copiedKey === 'sales' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'sales' ? 'Copied to Clipboard' : 'Copy Sales Page URL'}</span>
              </button>
            </div>

            {/* Thank You Page URL */}
            <div className="bg-slate-800/90 rounded-lg p-3.5 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Thank You Page URL:</span>
                <button
                  onClick={() => onNavigate({ type: 'thank-you', slug: selectedProduct.slug })}
                  className="text-blue-400 hover:text-white inline-flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>Preview</span>
                </button>
              </div>
              <p className="text-xs font-mono text-slate-200 truncate bg-slate-900/60 p-2 rounded border border-slate-700/60">
                {thankYouPageUrl}
              </p>
              <button
                id="btn-copy-thankyou-url-checker"
                onClick={() => handleCopy('thankyou', thankYouPageUrl)}
                className="w-full py-1.5 px-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                {copiedKey === 'thankyou' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'thankyou' ? 'Copied to Clipboard' : 'Copy Thank You Page URL'}</span>
              </button>
            </div>
          </div>

          {/* Checkout URL */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Checkout URL:</span>
              <span className="font-mono text-slate-300 truncate max-w-xs sm:max-w-md">
                {selectedProduct.checkoutUrl || 'Not configured'}
              </span>
            </div>
            {selectedProduct.checkoutUrl && (
              <a
                id="btn-open-checkout-url-checker"
                href={selectedProduct.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold inline-flex items-center gap-1.5 transition"
              >
                <span>Checkout URL: [Open]</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* 10 Automated Checks List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Automated Digistore24 Requirements Verification
            </h4>
            <span className="text-xs font-bold text-slate-600">
              Score: {score}%
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {checks.map((check) => (
              <div
                key={check.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                  check.passed
                    ? 'bg-emerald-50/50 border-emerald-200/80 text-emerald-950'
                    : 'bg-rose-50/60 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-3">
                  {check.passed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-bold">{check.label}</p>
                    {check.tip && (
                      <p className="text-xs text-slate-600 mt-0.5">
                        {check.tip}
                      </p>
                    )}
                  </div>
                </div>

                {!check.passed && (
                  <button
                    onClick={() => onEditProduct(selectedProduct)}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition shrink-0"
                  >
                    Fix Now
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
