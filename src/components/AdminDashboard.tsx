import React, { useState } from 'react';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Unlock,
  Settings,
  ShieldCheck,
  ExternalLink,
  RefreshCw,
  Sliders,
  LogOut,
  Sparkles,
  CreditCard,
} from 'lucide-react';
import { Product, CompanySettings, AppRoute } from '../types';
import { ProductEditor } from './ProductEditor';
import { DigistoreReadinessChecker } from './DigistoreReadinessChecker';
import { PaymentGatewaysAdmin } from './PaymentGatewaysAdmin';
import { getFullUrl, copyToClipboard } from '../utils/routing';
import {
  checkDigistoreReadiness,
  verifyAdminPin,
  setAdminAuthenticated,
  isAdminAuthenticated,
  resetToDefaults,
} from '../services/storage';

interface AdminDashboardProps {
  products: Product[];
  settings: CompanySettings;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateSettings: (settings: CompanySettings) => void;
  onNavigate: (route: AppRoute) => void;
  initialProductId?: string;
  initialSubview?: 'products' | 'edit' | 'readiness' | 'payments' | 'settings';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  settings,
  onUpdateProducts,
  onUpdateSettings,
  onNavigate,
  initialProductId,
  initialSubview = 'products',
}) => {
  // Authentication gate state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    isAdminAuthenticated()
  );
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'products' | 'readiness' | 'payments' | 'settings' | 'edit'>(
    initialSubview === 'edit' || initialProductId ? 'edit' : initialSubview
  );
  const [editingProductId, setEditingProductId] = useState<string | null>(
    initialProductId || null
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Company settings form state
  const [settingsForm, setSettingsForm] = useState<CompanySettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput, settings)) {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Default passcode is "admin123".');
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
  };

  const handleCopy = async (key: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleTogglePublish = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, published: !p.published } : p
    );
    onUpdateProducts(updated);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    onUpdateProducts(updated);
    setActiveTab('products');
    setEditingProductId(null);
  };

  const handleSaveProduct = (savedProduct: Product) => {
    const exists = products.some((p) => p.id === savedProduct.id);
    let updated: Product[];
    if (exists) {
      updated = products.map((p) => (p.id === savedProduct.id ? savedProduct : p));
    } else {
      updated = [savedProduct, ...products];
    }
    onUpdateProducts(updated);
    setActiveTab('products');
    setEditingProductId(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        'Reset all products and company settings back to sample defaults? This will restore the 3 verified sample products.'
      )
    ) {
      resetToDefaults();
      window.location.reload();
    }
  };

  // 1. If not authenticated, render the secure authentication gate
  if (!isAuthenticated) {
    return (
      <div id="admin-auth-gate" className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-8 h-8 text-blue-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              PCSecure Admin Portal
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Protected administrator access for product configuration and Digistore24 URL generation.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label htmlFor="admin-pin-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Admin Passcode
              </label>
              <input
                id="admin-pin-input"
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter passcode"
                autoFocus
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono tracking-widest"
              />
              <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                <span>Default Passcode: <code className="text-slate-700 font-semibold bg-slate-100 px-1 py-0.5 rounded">admin123</code></span>
                <span className="text-blue-600">Changeable in Settings</span>
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium flex items-center gap-2">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              id="btn-admin-login"
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Administrator Portal</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate({ type: 'home' })}
              className="text-xs text-slate-500 hover:text-slate-800 underline"
            >
              &larr; Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. If editing or creating a product
  if (activeTab === 'edit') {
    const productToEdit = editingProductId
      ? products.find((p) => p.id === editingProductId) || null
      : null;

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProductEditor
          product={productToEdit}
          settings={settings}
          onSave={handleSaveProduct}
          onDelete={handleDeleteProduct}
          onCancel={() => {
            setActiveTab('products');
            setEditingProductId(null);
          }}
          onNavigate={onNavigate}
        />
      </div>
    );
  }

  // 3. Main Authenticated Admin View
  return (
    <div id="admin-dashboard-root" className="min-h-screen bg-slate-50/70 pb-24">
      {/* Admin Top Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <h1 className="text-2xl font-extrabold tracking-tight">
                  PCSecure LLC &bull; Management Dashboard
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Configure products, manage Digistore24 sales/thank-you URLs, and audit approval readiness.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate({ type: 'home' })}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                View Public Site
              </button>
              <button
                onClick={handleLogout}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 transition flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-6 border-b border-slate-800 overflow-x-auto">
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-3 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition ${
                activeTab === 'products'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('readiness')}
              className={`pb-3 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === 'readiness'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Digistore24 Readiness</span>
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`pb-3 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === 'payments'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Payment Gateways (PayPal &amp; Amazon Pay)</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-3 px-4 text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Company & Legal Placeholders</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Product Catalog & Submission URLs
                </h2>
                <p className="text-xs text-slate-500">
                  Each product automatically generates a dedicated public sales page and public thank-you page.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  id="btn-preview-universal-thankyou"
                  onClick={() => onNavigate({ type: 'thank-you' })}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>View Public Thank-You Page</span>
                </button>

                <button
                  id="btn-add-product"
                  onClick={() => {
                    setEditingProductId(null);
                    setActiveTab('edit');
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Products Table / Cards */}
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => {
                const readiness = checkDigistoreReadiness(product, settings);
                const salesUrl = getFullUrl({ type: 'product-sales', slug: product.slug });
                const thankYouUrl = getFullUrl({ type: 'thank-you', slug: product.slug });

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-colors space-y-4"
                  >
                    {/* Top Row: Product Info + Status */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-blue-600 uppercase">
                              {product.category}
                            </span>
                            {product.isSample && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                                Demo Sample
                              </span>
                            )}
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                product.published
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {product.published ? 'Published' : 'Draft / Unpublished'}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                            {product.name}
                          </h3>

                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                            <span>Regular: <strong className="text-slate-800">${product.regularPrice}</strong></span>
                            {product.salePrice && (
                              <span>Sale: <strong className="text-blue-600">${product.salePrice}</strong></span>
                            )}
                            <span>&bull;</span>
                            <span>Descriptor: <strong className="text-slate-800">{product.statementDescriptor || settings.defaultStatementDescriptor}</strong></span>
                            <span>&bull;</span>
                            <span>Delivery: <strong className="text-slate-800 capitalize">{product.deliveryMethod.replace('_', ' ')}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action Buttons */}
                      <div className="flex items-center gap-2 self-start md:self-auto">
                        <button
                          onClick={() => handleTogglePublish(product.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                            product.published
                              ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {product.published ? 'Unpublish' : 'Publish'}
                        </button>
                        <button
                          onClick={() => {
                            setEditingProductId(product.id);
                            setActiveTab('edit');
                          }}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition flex items-center gap-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                      </div>
                    </div>

                    {/* DIGISTORE24 APPROVED BUTTONS & COPY URLS (MANDATED BY SECTION 3 & 20) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
                      {/* Sales Page Row */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">DEDICATED SALES PAGE:</span>
                          <button
                            id={`btn-view-sales-${product.slug}`}
                            onClick={() => onNavigate({ type: 'product-sales', slug: product.slug })}
                            className="text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1"
                          >
                            <span>View Sales Page</span>
                            <Eye className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-mono text-[11px] text-slate-600 truncate bg-white p-2 rounded border border-slate-200">
                          {salesUrl}
                        </p>
                        <button
                          id={`btn-copy-sales-${product.slug}`}
                          onClick={() => handleCopy(`sales-${product.id}`, salesUrl)}
                          className="w-full py-1.5 px-2.5 rounded bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold flex items-center justify-center gap-1 transition"
                        >
                          {copiedKey === `sales-${product.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                          <span>{copiedKey === `sales-${product.id}` ? 'Copied to Clipboard!' : 'Copy Sales Page URL'}</span>
                        </button>
                      </div>

                      {/* Thank You Page Row */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">DEDICATED THANK-YOU PAGE:</span>
                          <button
                            id={`btn-view-thankyou-${product.slug}`}
                            onClick={() => onNavigate({ type: 'thank-you', slug: product.slug })}
                            className="text-emerald-700 hover:text-emerald-900 font-bold inline-flex items-center gap-1"
                          >
                            <span>View Thank You Page</span>
                            <Eye className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="font-mono text-[11px] text-slate-600 truncate bg-white p-2 rounded border border-slate-200">
                          {thankYouUrl}
                        </p>
                        <button
                          id={`btn-copy-thankyou-${product.slug}`}
                          onClick={() => handleCopy(`thankyou-${product.id}`, thankYouUrl)}
                          className="w-full py-1.5 px-2.5 rounded bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold flex items-center justify-center gap-1 transition"
                        >
                          {copiedKey === `thankyou-${product.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-500" />}
                          <span>{copiedKey === `thankyou-${product.id}` ? 'Copied to Clipboard!' : 'Copy Thank You Page URL'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Bottom Status Ribbon */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        {readiness.isReady ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Ready for Digistore24 Review</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Readiness Action Required</span>
                          </span>
                        )}
                        <span className="text-slate-400">Checkout Link:</span>
                        <span className="font-mono text-slate-600 truncate max-w-xs">{product.checkoutUrl || 'None configured'}</span>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('readiness');
                        }}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Inspect Readiness Checklist &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reset Defaults button */}
            <div className="pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Need to restore the 3 verified sample demo products?</span>
              <button
                type="button"
                onClick={handleResetDefaults}
                className="text-slate-600 hover:text-slate-900 underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset to Sample Products</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Digistore24 Readiness Checker */}
        {activeTab === 'readiness' && (
          <DigistoreReadinessChecker
            products={products}
            settings={settings}
            onNavigate={onNavigate}
            onEditProduct={(p) => {
              setEditingProductId(p.id);
              setActiveTab('edit');
            }}
          />
        )}

        {/* TAB: Payment Gateways (PayPal & Amazon Pay) */}
        {activeTab === 'payments' && (
          <PaymentGatewaysAdmin
            settings={settings}
            onUpdateSettings={onUpdateSettings}
          />
        )}

        {/* TAB 3: Company Settings & Legal Placeholders */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Company Information & Legal Placeholders
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Configure your verified business details. As required by Section 12, the website displays only what you enter here without inventing credentials.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Company information successfully saved!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Company Legal Name *
                  </label>
                  <input
                    type="text"
                    value={settingsForm.companyName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Brand Name / Trade Name *
                  </label>
                  <input
                    type="text"
                    value={settingsForm.brandName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Business Type & Scope *
                </label>
                <input
                  type="text"
                  value={settingsForm.businessType}
                  onChange={(e) => setSettingsForm({ ...settingsForm, businessType: e.target.value })}
                  required
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Customer Support Email *
                  </label>
                  <input
                    type="email"
                    value={settingsForm.supportEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Business / General Inquiry Email *
                  </label>
                  <input
                    type="email"
                    value={settingsForm.businessEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, businessEmail: e.target.value })}
                    required
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Business Phone Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phoneNumber || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phoneNumber: e.target.value })}
                    placeholder="+1 (800) 555-0199"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Business Hours
                  </label>
                  <input
                    type="text"
                    value={settingsForm.businessHours || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, businessHours: e.target.value })}
                    placeholder="Monday - Friday: 9:00 AM - 6:00 PM EST"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Business Physical / Mailing Address
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.businessAddress || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, businessAddress: e.target.value })}
                  placeholder="100 Tech Enterprise Blvd, Suite 400, Wilmington, DE 19801"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                />
              </div>

              {/* MANDATED SECTION 9: DEFAULT DEBIT STATEMENT DESCRIPTOR */}
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                  Default Debit / Statement Descriptor *
                </label>
                <input
                  type="text"
                  value={settingsForm.defaultStatementDescriptor}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, defaultStatementDescriptor: e.target.value })
                  }
                  required
                  placeholder="DIGISTORE24"
                  className="w-full sm:w-80 rounded-xl border border-amber-300 bg-white px-3.5 py-2 text-sm font-bold text-slate-900"
                />
                <p className="text-xs text-amber-800">
                  Displayed on thank-you pages: <strong>"The debit is made by {settingsForm.defaultStatementDescriptor || 'DIGISTORE24'}."</strong>
                </p>
              </div>

              {/* Admin Passcode */}
              <div className="pt-4 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Admin Passcode (PIN)
                </label>
                <input
                  type="text"
                  value={settingsForm.adminPin}
                  onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                  className="w-full sm:w-64 rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-mono"
                />
                <span className="text-xs text-slate-400 mt-1 block">
                  Used to unlock this administration dashboard.
                </span>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  id="btn-save-settings"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
