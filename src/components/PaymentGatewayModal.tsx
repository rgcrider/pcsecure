import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  CreditCard,
  Building,
  User,
  Mail,
  ArrowRight,
  Download,
  Printer,
  Sparkles,
  HelpCircle,
  Clock,
  Info,
} from 'lucide-react';
import { CompanySettings, Product, AppRoute } from '../types';

export interface PaymentItem {
  id?: string;
  name: string;
  amount: number;
  currency?: string;
  category?: string;
  description?: string;
  downloadUrl?: string;
}

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CompanySettings;
  item: PaymentItem;
  initialMethod?: 'paypal' | 'amazon_pay' | 'card';
  onPaymentSuccess?: (order: CompletedOrder) => void;
  onNavigate?: (route: AppRoute) => void;
}

export interface CompletedOrder {
  orderId: string;
  transactionId: string;
  method: 'paypal' | 'amazon_pay' | 'card';
  itemName: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  date: string;
  receiptNumber: string;
  downloadUrl?: string;
  status: 'COMPLETED';
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  settings,
  item,
  initialMethod = 'paypal',
  onPaymentSuccess,
  onNavigate,
}) => {
  const [activeMethod, setActiveMethod] = useState<'paypal' | 'amazon_pay' | 'card'>(initialMethod);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<CompletedOrder | null>(null);

  const activePaypalEmail = settings.paypalEmail || 'john@pcsecure.tech';

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Amazon Pay simulated address selection
  const [amazonAddress, setAmazonAddress] = useState('Default 1-Click Amazon Shipping & Billing Address');
  const [amazonCardMask, setAmazonCardMask] = useState('Amazon Prime Visa ending in 4092');

  if (!isOpen) return null;

  const currencySymbol = item.currency || '$';
  const totalAmount = item.amount.toFixed(2);

  const handleProcessPayment = (method: 'paypal' | 'amazon_pay' | 'card') => {
    setErrorMsg('');

    if (!customerEmail || !customerEmail.includes('@')) {
      setErrorMsg('Please enter a valid customer email address to receive your order receipt.');
      return;
    }

    if (method === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 15) {
        setErrorMsg('Please enter a valid 16-digit card number.');
        return;
      }
      if (!cardExpiry || !cardExpiry.includes('/')) {
        setErrorMsg('Please enter expiration date (MM/YY).');
        return;
      }
      if (!cardCvc || cardCvc.length < 3) {
        setErrorMsg('Please enter security code (CVC).');
        return;
      }
    }

    setIsProcessing(true);

    // Simulate real gateway authorization latency
    setTimeout(() => {
      setIsProcessing(false);
      const randomTx =
        method === 'paypal'
          ? `PAYID-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
          : method === 'amazon_pay'
          ? `P01-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(1000000 + Math.random() * 9000000)}`
          : `ch_${Math.random().toString(36).substring(2, 14)}`;

      const completed: CompletedOrder = {
        orderId: `ORD-${Date.now().toString().slice(-6)}`,
        transactionId: randomTx,
        method,
        itemName: item.name,
        amount: item.amount,
        currency: currencySymbol,
        customerName: customerName || 'Valued Client',
        customerEmail,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        receiptNumber: `REC-${Math.floor(100000 + Math.random() * 900000)}`,
        downloadUrl: item.downloadUrl,
        status: 'COMPLETED',
      };

      setOrderCompleted(completed);
      if (onPaymentSuccess) {
        onPaymentSuccess(completed);
      }
    }, 1200);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#07172F] to-[#0B254D] px-6 sm:px-8 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
              <Lock className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">Secure Checkout</h3>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-2 py-0.5 rounded-full">
                  256-Bit SSL
                </span>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                {settings.companyName} &bull; PCI-DSS Compliant Gateway
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderCompleted ? (
          /* SUCCESS / RECEIPT SCREEN */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Payment Authorized &amp; Confirmed!</h2>
              <p className="text-sm text-slate-600">
                Thank you! Your transaction has been securely processed via{' '}
                <span className="font-semibold text-slate-900 capitalize">
                  {orderCompleted.method === 'amazon_pay' ? 'Amazon Pay' : orderCompleted.method === 'paypal' ? 'PayPal' : 'Credit Card'}
                </span>
                .
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Receipt #</span>
                <span className="font-mono font-bold text-slate-800">{orderCompleted.receiptNumber}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Transaction ID</span>
                <span className="font-mono text-slate-800 select-all">{orderCompleted.transactionId}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Product / Service</span>
                <span className="font-semibold text-slate-900 text-right">{orderCompleted.itemName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Billed To</span>
                <span className="text-slate-800 font-medium text-right">
                  {orderCompleted.customerName} ({orderCompleted.customerEmail})
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Date &amp; Time</span>
                <span className="text-slate-700">{orderCompleted.date}</span>
              </div>
              <div className="flex justify-between items-center pt-1 text-base font-bold">
                <span className="text-slate-900">Total Paid</span>
                <span className="text-emerald-700 text-xl">
                  {orderCompleted.currency}
                  {orderCompleted.amount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Next Steps / Immediate Delivery */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#0875E1] shrink-0 mt-0.5" />
              <div className="text-xs text-blue-900 space-y-1">
                <div className="font-bold">Next Steps &amp; Delivery:</div>
                <p>
                  A confirmation receipt and project onboarding instructions have been dispatched to{' '}
                  <span className="font-semibold">{orderCompleted.customerEmail}</span>. Our engineering team at{' '}
                  <span className="font-semibold">{settings.supportEmail}</span> is reviewing your order.
                </p>
                {orderCompleted.downloadUrl && (
                  <div className="pt-2">
                    <a
                      href={orderCompleted.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0875E1] hover:bg-[#0766c5] text-white font-bold text-xs shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Digital Package</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrintReceipt}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* PAYMENT FORM & METHOD SELECTION */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Item Order Summary Strip */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  ORDER SUMMARY
                </span>
                <span className="font-bold text-slate-900 text-base">{item.name}</span>
                {item.category && (
                  <span className="text-xs text-slate-500 block">{item.category}</span>
                )}
              </div>
              <div className="text-right">
                <span className="text-[11px] font-semibold text-slate-500 block">Total Due</span>
                <span className="text-2xl font-black text-[#0875E1]">
                  {currencySymbol}{totalAmount}
                </span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {/* 1. PayPal Button Tab */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMethod('paypal');
                    setErrorMsg('');
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center relative ${
                    activeMethod === 'paypal'
                      ? 'border-[#0070BA] bg-[#0070BA]/5 text-[#003087] shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                  }`}
                >
                  {/* PayPal Logo Mock */}
                  <div className="flex items-center gap-1 font-black text-sm tracking-tight">
                    <span className="text-[#003087]">Pay</span>
                    <span className="text-[#0079C1]">Pal</span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-500">
                    {settings.paypalMode === 'sandbox' ? 'Sandbox Active' : 'Instant Checkout'}
                  </span>
                  {activeMethod === 'paypal' && (
                    <span className="w-2 h-2 rounded-full bg-[#0079C1] absolute top-2 right-2" />
                  )}
                </button>

                {/* 2. Amazon Pay Button Tab */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMethod('amazon_pay');
                    setErrorMsg('');
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center relative ${
                    activeMethod === 'amazon_pay'
                      ? 'border-[#FF9900] bg-[#FF9900]/5 text-slate-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                  }`}
                >
                  {/* Amazon Pay Logo Mock */}
                  <div className="flex items-center gap-1 font-bold text-sm tracking-tight">
                    <span className="text-[#232F3E]">amazon</span>
                    <span className="text-[#FF9900]">pay</span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-500">
                    {settings.amazonPayMode === 'sandbox' ? 'Sandbox Active' : '1-Click Pay'}
                  </span>
                  {activeMethod === 'amazon_pay' && (
                    <span className="w-2 h-2 rounded-full bg-[#FF9900] absolute top-2 right-2" />
                  )}
                </button>

                {/* 3. Credit / Debit Card Tab */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMethod('card');
                    setErrorMsg('');
                  }}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center relative ${
                    activeMethod === 'card'
                      ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-slate-700" />
                  <span className="text-xs font-bold text-slate-900">Card</span>
                  <span className="text-[10px] font-medium text-slate-500">Visa, MC, AMEX</span>
                  {activeMethod === 'card' && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 absolute top-2 right-2" />
                  )}
                </button>
              </div>
            </div>

            {/* Customer Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-[#0875E1] focus:ring-1 focus:ring-[#0875E1] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Receipt &amp; Access Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="alex@yourcompany.com"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:border-[#0875E1] focus:ring-1 focus:ring-[#0875E1] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* METHOD-SPECIFIC SECTIONS */}

            {/* 1. PAYPAL METHOD VIEW */}
            {activeMethod === 'paypal' && (
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#0070BA]/5 to-white border border-[#0070BA]/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0070BA]/15 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#003087] text-base">PayPal</span>
                    <span className="text-xs text-slate-500">Express Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0070BA]/10 text-[#003087] font-semibold">
                      {activePaypalEmail}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        settings.paypalMode === 'live'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {settings.paypalMode === 'live' ? 'Live' : 'Sandbox'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Log in to your PayPal account to authorize this payment securely to{' '}
                  <span className="font-semibold text-slate-900">{activePaypalEmail}</span>. You can use your PayPal balance, linked bank account, credit card, or choose{' '}
                  <span className="font-bold text-slate-800">PayPal Pay Later</span>.
                </p>

                {/* PayPal Official Gold Action Button */}
                <button
                  type="button"
                  onClick={() => handleProcessPayment('paypal')}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 rounded-full bg-[#FFC439] hover:bg-[#F2BA36] active:bg-[#E5AF30] text-[#003087] font-extrabold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#E5AF30] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#003087] border-t-transparent rounded-full animate-spin" />
                      <span>Connecting to PayPal...</span>
                    </div>
                  ) : (
                    <>
                      <span className="font-black italic">Pay</span>
                      <span className="font-black italic text-[#0079C1]">Pal</span>
                      <span className="text-sm font-semibold text-slate-800 ml-1">
                        &bull; Pay {currencySymbol}{totalAmount}
                      </span>
                    </>
                  )}
                </button>

                {/* Direct PayPal Official Gateway Redirection Option */}
                <a
                  href={`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(
                    activePaypalEmail
                  )}&item_name=${encodeURIComponent(item.name)}&amount=${item.amount.toFixed(
                    2
                  )}&currency_code=${encodeURIComponent(
                    settings.paypalCurrency || 'USD'
                  )}&no_shipping=1&return=${encodeURIComponent(
                    typeof window !== 'undefined' ? window.location.origin + '/order-completed' : ''
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-full border border-[#0070BA]/50 text-[#003087] hover:bg-[#0070BA]/5 font-semibold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open in Official PayPal Gateway</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* PayPal Pay Later Button */}
                <button
                  type="button"
                  onClick={() => handleProcessPayment('paypal')}
                  disabled={isProcessing}
                  className="w-full py-2.5 px-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                >
                  <span>Pay in 4 with PayPal &bull; 4 payments of {currencySymbol}{(item.amount / 4).toFixed(2)}</span>
                </button>

                <div className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-2 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Buyer Protection eligible &bull; PayPal Fraud Defense</span>
                </div>
              </div>
            )}

            {/* 2. AMAZON PAY METHOD VIEW */}
            {activeMethod === 'amazon_pay' && (
              <div className="p-5 rounded-2xl bg-gradient-to-b from-[#FF9900]/5 to-white border border-[#FF9900]/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#FF9900]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-base">amazon</span>
                    <span className="font-extrabold text-[#FF9900] text-base">pay</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FF9900]/10 text-amber-900 font-semibold">
                      Seller: {settings.amazonPayMerchantId?.slice(0, 10) || 'A2SAMPLEPAYID'}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        settings.amazonPayMode === 'live'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {settings.amazonPayMode === 'live' ? 'Live' : 'Sandbox'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Use the payment and shipping information already stored in your Amazon account to complete your purchase without re-entering billing details.
                </p>

                {/* Simulated Amazon 1-Click Saved Details */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between items-center text-slate-700 font-medium">
                    <span>Payment Method:</span>
                    <span className="font-bold text-slate-900">{amazonCardMask}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span>Billing Address:</span>
                    <span className="truncate max-w-[240px] text-right">{amazonAddress}</span>
                  </div>
                </div>

                {/* Amazon Pay Official Amber Button */}
                <button
                  type="button"
                  onClick={() => handleProcessPayment('amazon_pay')}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] text-[#0F1111] font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#FCD200] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing Amazon Pay...</span>
                    </div>
                  ) : (
                    <>
                      <span className="font-extrabold">Pay with</span>
                      <span className="font-black">amazon</span>
                      <span className="font-black text-amber-700">pay</span>
                      <span className="text-sm font-semibold ml-1">
                        &bull; {currencySymbol}{totalAmount}
                      </span>
                    </>
                  )}
                </button>

                <div className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-2 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Protected by Amazon A-to-z Guarantee</span>
                </div>
              </div>
            )}

            {/* 3. CREDIT / DEBIT CARD METHOD VIEW */}
            {activeMethod === 'card' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          setCardNumber(val);
                        }}
                        placeholder="4242 4242 4242 4242"
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:border-[#0875E1] focus:ring-1 focus:ring-[#0875E1] outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        Expires (MM/YY)
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length >= 2) {
                            val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                          }
                          setCardExpiry(val);
                        }}
                        placeholder="12/28"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:border-[#0875E1] focus:ring-1 focus:ring-[#0875E1] outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">
                        CVC / CVV
                      </label>
                      <div className="relative">
                        <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                          placeholder="891"
                          className="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:border-[#0875E1] focus:ring-1 focus:ring-[#0875E1] outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleProcessPayment('card')}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#0875E1] hover:bg-[#0766c5] active:bg-[#0658a8] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Charging Card...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay {currencySymbol}{totalAmount} Now</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Gateway Security & Guarantee Strip */}
            <div className="border-t border-slate-200 pt-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>60-Day Money Back SLA Guarantee</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">PayPal</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Amazon Pay</span>
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">Visa / MC</span>
              </div>
            </div>

            {onNavigate && (
              <div className="pt-1 text-center">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate({ type: 'admin', subview: 'payments' });
                  }}
                  className="text-[11px] text-[#0875E1] hover:underline inline-flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span>Store Administrator: Link or Update Live PayPal &amp; Amazon Pay Keys</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
