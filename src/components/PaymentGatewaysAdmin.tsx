import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Lock,
  Zap,
  HelpCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Globe,
  DollarSign,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { CompanySettings } from '../types';
import { PaymentGatewayModal, PaymentItem } from './PaymentGatewayModal';

interface PaymentGatewaysAdminProps {
  settings: CompanySettings;
  onUpdateSettings: (newSettings: CompanySettings) => void;
}

export const PaymentGatewaysAdmin: React.FC<PaymentGatewaysAdminProps> = ({
  settings,
  onUpdateSettings,
}) => {
  const [form, setForm] = useState<CompanySettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showPaypalSecret, setShowPaypalSecret] = useState(false);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [testMethod, setTestMethod] = useState<'paypal' | 'amazon_pay' | 'card'>('paypal');
  const [activeGuide, setActiveGuide] = useState<'paypal' | 'amazon_pay'>('paypal');

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const launchTestCheckout = (method: 'paypal' | 'amazon_pay' | 'card') => {
    setTestMethod(method);
    setTestModalOpen(true);
  };

  const testItem: PaymentItem = {
    name: 'Custom Web Design & Engineering Package (Live Test)',
    amount: 149.0,
    currency: '$',
    category: 'Gateway Verification Order',
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#07172F] via-[#0B254D] to-[#0875E1] p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>PAYMENT GATEWAY MANAGER</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Connect Amazon Pay &amp; PayPal Checkout
          </h2>
          <p className="text-sm text-slate-200 leading-relaxed">
            Accept online payments directly from clients and customers across the world using their official Amazon account or PayPal account, alongside standard credit/debit cards.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold text-sm">
              Payment gateway configurations saved successfully!
            </span>
          </div>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-8">
        {/* GATEWAY 1: PAYPAL INTEGRATION */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0070BA]/10 border border-[#0070BA]/20 flex items-center justify-center font-black text-xl italic tracking-tighter">
                <span className="text-[#003087]">P</span>
                <span className="text-[#0079C1]">P</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>PayPal Commerce Gateway</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      form.enablePaypal
                        ? form.paypalMode === 'live'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {form.enablePaypal ? (form.paypalMode === 'live' ? 'Live Mode' : 'Sandbox Test') : 'Disabled'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Accept PayPal balance, bank accounts, debit cards, and PayPal Pay Later (Pay in 4).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.enablePaypal ?? true}
                  onChange={(e) => setForm({ ...form, enablePaypal: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0070BA]"></div>
              </label>
              <span className="text-xs font-semibold text-slate-700">
                {form.enablePaypal ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Mode Switcher */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                Environment / Mode
              </label>
              <select
                value={form.paypalMode || 'sandbox'}
                onChange={(e) => setForm({ ...form, paypalMode: e.target.value as 'sandbox' | 'live' })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white font-medium focus:border-[#0875E1] outline-none"
              >
                <option value="sandbox">Sandbox (Testing with simulated funds)</option>
                <option value="live">Live (Real money payments from clients)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Keep on Sandbox while testing, switch to Live when ready to charge actual client cards.
              </p>
            </div>

            {/* Business PayPal Email */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  PayPal Business Email
                </label>
                {form.paypalEmail !== 'john@pcsecure.tech' && (
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, paypalEmail: 'john@pcsecure.tech' })}
                    className="text-[11px] font-semibold text-[#0875E1] hover:underline cursor-pointer"
                  >
                    Set to john@pcsecure.tech
                  </button>
                )}
              </div>
              <input
                type="email"
                value={form.paypalEmail || ''}
                onChange={(e) => setForm({ ...form, paypalEmail: e.target.value })}
                placeholder="john@pcsecure.tech"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white font-mono focus:border-[#0875E1] outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                The verified PayPal email address where client payments are deposited.
              </p>
            </div>

            {/* PayPal Client ID */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                PayPal REST API Client ID
              </label>
              <div className="relative">
                <input
                  type={showPaypalSecret ? 'text' : 'password'}
                  value={form.paypalClientId || ''}
                  onChange={(e) => setForm({ ...form, paypalClientId: e.target.value })}
                  placeholder="e.g. sb-client-id-xyz... or live Client ID from developer.paypal.com"
                  className="w-full pl-3.5 pr-20 py-2.5 text-sm rounded-xl border border-slate-200 bg-white font-mono focus:border-[#0875E1] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPaypalSecret(!showPaypalSecret)}
                  className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-0.5 rounded cursor-pointer"
                >
                  {showPaypalSecret ? 'Hide' : 'Reveal'}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Found in PayPal Developer Dashboard under{' '}
                <span className="font-semibold text-slate-700">Apps &amp; Credentials</span>.
              </p>
            </div>
          </div>

          {/* Test PayPal Button */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>PayPal Smart Buttons &bull; Supports Pay in 4 Installments</span>
            </div>

            <button
              type="button"
              onClick={() => launchTestCheckout('paypal')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFC439] hover:bg-[#F2BA36] text-[#003087] font-bold text-xs shadow-xs cursor-pointer"
            >
              <span>Test PayPal Checkout Modal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* GATEWAY 2: AMAZON PAY INTEGRATION */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FF9900]/10 border border-[#FF9900]/20 flex items-center justify-center font-bold text-base tracking-tight text-slate-900">
                <span className="text-[#232F3E]">amzn</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>Amazon Pay v2 Gateway</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      form.enableAmazonPay
                        ? form.amazonPayMode === 'live'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {form.enableAmazonPay ? (form.amazonPayMode === 'live' ? 'Live Mode' : 'Sandbox Test') : 'Disabled'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Allow millions of Amazon customers to check out seamlessly with 1-click using stored billing profiles.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.enableAmazonPay ?? true}
                  onChange={(e) => setForm({ ...form, enableAmazonPay: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF9900]"></div>
              </label>
              <span className="text-xs font-semibold text-slate-700">
                {form.enableAmazonPay ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Amazon Mode */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                Environment / Mode
              </label>
              <select
                value={form.amazonPayMode || 'sandbox'}
                onChange={(e) => setForm({ ...form, amazonPayMode: e.target.value as 'sandbox' | 'live' })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white font-medium focus:border-[#0875E1] outline-none"
              >
                <option value="sandbox">Sandbox (Test merchant simulation)</option>
                <option value="live">Live (Real Amazon account charges)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Amazon Pay Sandbox allows testing with test buyer accounts from Seller Central.
              </p>
            </div>

            {/* Region */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                Amazon Pay Region
              </label>
              <select
                value={form.amazonPayRegion || 'us'}
                onChange={(e) => setForm({ ...form, amazonPayRegion: e.target.value as any })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white font-medium focus:border-[#0875E1] outline-none"
              >
                <option value="us">United States (USD - sellercentral.amazon.com)</option>
                <option value="eu">European Union (EUR - sellercentral-europe.amazon.com)</option>
                <option value="uk">United Kingdom (GBP - sellercentral.amazon.co.uk)</option>
                <option value="jp">Japan (JPY - sellercentral.amazon.co.jp)</option>
              </select>
            </div>

            {/* Merchant / Seller ID */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                Amazon Merchant / Seller ID
              </label>
              <input
                type="text"
                value={form.amazonPayMerchantId || ''}
                onChange={(e) => setForm({ ...form, amazonPayMerchantId: e.target.value })}
                placeholder="e.g. A2XXXXXXXXXXXX"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white font-mono focus:border-[#0875E1] outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Your 13-14 character Merchant ID located in Amazon Seller Central.
              </p>
            </div>

            {/* Client ID / Store ID */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                Store ID / Client ID
              </label>
              <input
                type="text"
                value={form.amazonPayStoreId || ''}
                onChange={(e) => setForm({ ...form, amazonPayStoreId: e.target.value })}
                placeholder="e.g. amzn1.application-oa2-client.xxxx..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white font-mono focus:border-[#0875E1] outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Located under Integration Central &gt; Client ID / Store ID.
              </p>
            </div>

            {/* Public Key ID */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                Public Key ID (API v2 Key)
              </label>
              <input
                type="text"
                value={form.amazonPayPublicKeyId || ''}
                onChange={(e) => setForm({ ...form, amazonPayPublicKeyId: e.target.value })}
                placeholder="e.g. LIVE-PUB-KEY-XXXXX or SANDBOX-PUB-KEY-XXXXX"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white font-mono focus:border-[#0875E1] outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Generated in Seller Central Integration Central under "API Keys".
              </p>
            </div>
          </div>

          {/* Test Amazon Pay Button */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>A-to-z Guarantee protection for buyers &amp; chargeback protection for merchant</span>
            </div>

            <button
              type="button"
              onClick={() => launchTestCheckout('amazon_pay')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFD814] hover:bg-[#F7CA00] text-slate-900 font-bold text-xs shadow-xs cursor-pointer border border-[#FCD200]"
            >
              <span>Test Amazon Pay Modal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Save Changes Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-[#0875E1] hover:bg-[#0766c5] active:bg-[#0658a8] text-white font-bold text-sm shadow-md hover:shadow-lg transition cursor-pointer flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save Payment Gateway Configurations</span>
          </button>
        </div>
      </form>

      {/* STEP-BY-STEP CONNECTION INSTRUCTION GUIDES */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#0875E1]" />
            <h3 className="text-lg font-bold text-slate-900">
              How to Connect Your Accounts (Step-by-Step Guide)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveGuide('paypal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                activeGuide === 'paypal'
                  ? 'bg-[#0070BA] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              PayPal Setup Guide
            </button>
            <button
              type="button"
              onClick={() => setActiveGuide('amazon_pay')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                activeGuide === 'amazon_pay'
                  ? 'bg-[#FF9900] text-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Amazon Pay Setup Guide
            </button>
          </div>
        </div>

        {/* PAYPAL GUIDE */}
        {activeGuide === 'paypal' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed animate-in fade-in duration-150">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
              <h4 className="font-bold text-[#003087] text-base flex items-center gap-2">
                <span>1. Getting Your PayPal Client ID</span>
                <a
                  href="https://developer.paypal.com/dashboard/applications"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-normal"
                >
                  <span>Open developer.paypal.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-600">
                <li>
                  Go to <strong className="text-slate-800">developer.paypal.com</strong> and log in with your PayPal business account.
                </li>
                <li>
                  Click on <strong className="text-slate-800">Apps &amp; Credentials</strong> in the left dashboard navigation.
                </li>
                <li>
                  Ensure you choose either <strong className="text-slate-800">Sandbox</strong> (for testing) or <strong className="text-slate-800">Live</strong> (for accepting actual payments).
                </li>
                <li>
                  Click <strong className="text-slate-800">Create App</strong>, name it <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">PCSecure Web Store</code>, and select Merchant account.
                </li>
                <li>
                  Copy the generated <strong className="text-slate-800">Client ID</strong> and paste it into the field above.
                </li>
                <li>
                  Enter your PayPal email address and click <strong>Save Payment Gateway Configurations</strong>.
                </li>
              </ol>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#0875E1]" />
                <span>How PayPal Payouts Work:</span>
              </div>
              <p>
                When a client pays through the PayPal button on your website, the funds are instantly credited to your PayPal balance and can be transferred automatically to your linked business checking account via standard ACH (free) or Instant Transfer.
              </p>
            </div>
          </div>
        )}

        {/* AMAZON PAY GUIDE */}
        {activeGuide === 'amazon_pay' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed animate-in fade-in duration-150">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span>1. Registering &amp; Getting Amazon Pay Credentials</span>
                <a
                  href="https://sellercentral.amazon.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-700 hover:underline inline-flex items-center gap-1 font-normal"
                >
                  <span>Open sellercentral.amazon.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-slate-600">
                <li>
                  Register or sign in to your merchant account on <strong className="text-slate-800">Amazon Seller Central</strong>.
                </li>
                <li>
                  In the top navigation menu, select <strong className="text-slate-800">Integration &gt; Integration Central</strong>.
                </li>
                <li>
                  Copy your <strong className="text-slate-800">Merchant ID (Seller ID)</strong> displayed at the top right of the dashboard.
                </li>
                <li>
                  Under <strong className="text-slate-800">API Keys</strong>, click <strong className="text-slate-800">Create API Key</strong> to generate a key pair. Copy your <strong className="text-slate-800">Public Key ID</strong>.
                </li>
                <li>
                  Under <strong className="text-slate-800">Applications / Store ID</strong>, create or copy your <strong className="text-slate-800">Store ID (Client ID)</strong>.
                </li>
                <li>
                  Paste all three credentials into the fields above, toggle to <strong>Live</strong> or <strong>Sandbox</strong>, and click Save.
                </li>
              </ol>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-700" />
                <span>How Amazon Pay Payouts Work:</span>
              </div>
              <p>
                Amazon Pay deposits settled funds into your designated bank account on a daily disbursement cycle according to your Amazon Seller Central bank account settings.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Test Payment Modal */}
      <PaymentGatewayModal
        isOpen={testModalOpen}
        onClose={() => setTestModalOpen(false)}
        settings={form}
        item={testItem}
        initialMethod={testMethod}
      />
    </div>
  );
};
