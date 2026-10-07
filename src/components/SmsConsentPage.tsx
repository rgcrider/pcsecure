import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  ArrowLeft,
  FileText,
  AlertCircle,
  ExternalLink,
  Send,
  Lock,
  Check,
} from 'lucide-react';
import { CompanySettings, AppRoute } from '../types';

interface SmsConsentPageProps {
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
}

export const SmsConsentPage: React.FC<SmsConsentPageProps> = ({
  settings,
  onNavigate,
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [agreeConsent, setAgreeConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submissionData, setSubmissionData] = useState<{
    name: string;
    phone: string;
    email: string;
    timestamp: string;
  } | null>(null);

  // Set official Page SEO Title and Meta Description
  useEffect(() => {
    document.title = 'SMS Communications Consent | PCSecure';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Manage your PCSecure SMS communication consent and learn about account notifications, payment reminders, SMS frequency, opt-out instructions, and privacy protections.'
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    // Basic phone validation (digits, minimum length)
    const cleanedPhone = phoneNumber.replace(/[^0-9+]/g, '');
    if (cleanedPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile phone number.');
      return;
    }

    // Email validation
    if (!emailAddress.trim() || !emailAddress.includes('@') || !emailAddress.includes('.')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Checkbox consent validation
    if (!agreeConsent) {
      setErrorMsg('You must check the affirmative consent box to submit your SMS preferences.');
      return;
    }

    const record = {
      name: fullName.trim(),
      phone: phoneNumber.trim(),
      email: emailAddress.trim(),
      timestamp: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    // Store in localStorage for audit record
    try {
      const stored = localStorage.getItem('pcsecure_sms_consents');
      const consents = stored ? JSON.parse(stored) : [];
      consents.push(record);
      localStorage.setItem('pcsecure_sms_consents', JSON.stringify(consents));
    } catch {
      // Storage unavailable fallback
    }

    setSubmissionData(record);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFullName('');
    setPhoneNumber('');
    setEmailAddress('');
    setAgreeConsent(false);
    setSubmitted(false);
    setErrorMsg('');
    setSubmissionData(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to PCSecure Home</span>
        </button>

        {/* Hero / Introduction Card */}
        <header className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60 uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Official SMS Opt-In &amp; Compliance</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            SMS Communications Consent
          </h1>

          <p className="text-lg sm:text-xl font-semibold text-blue-700">
            Stay informed about your PCSecure account and services.
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-2">
            PCSecure uses SMS messaging to provide existing customers with important account and
            service-related notifications, including payment reminders, payment confirmations,
            billing notifications, service updates, and other communications related to their
            PCSecure account.
          </p>
        </header>

        {/* SMS Consent Form Card */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 md:p-12 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-5">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <span>SMS Consent Registration Form</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Please enter your contact information and provide your affirmative consent to enroll in PCSecure account SMS alerts.
            </p>
          </div>

          {submitted ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="p-8 sm:p-10 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2 max-w-xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950">
                  Thank you. Your SMS communication preferences have been submitted successfully.
                </h3>
                <p className="text-sm text-emerald-800 leading-relaxed">
                  Your mobile phone number has been recorded for transactional and service alerts related to your PCSecure account.
                </p>
              </div>

              {submissionData && (
                <div className="p-5 rounded-xl bg-white border border-emerald-200 text-left max-w-md mx-auto text-xs space-y-2 text-slate-700 shadow-xs">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="font-semibold text-slate-500">Full Name:</span>
                    <span className="font-bold text-slate-900">{submissionData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="font-semibold text-slate-500">Mobile Phone:</span>
                    <span className="font-bold text-slate-900">{submissionData.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span className="font-semibold text-slate-500">Email Address:</span>
                    <span className="font-bold text-slate-900">{submissionData.email}</span>
                  </div>
                  <div className="flex justify-between pt-0.5">
                    <span className="font-semibold text-slate-500">Consent Recorded:</span>
                    <span className="font-bold text-emerald-700">{submissionData.timestamp}</span>
                  </div>
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition cursor-pointer"
                >
                  Submit Another Consent
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'home' })}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Input: Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>

              {/* Input: Mobile Phone Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Mobile Phone Number <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. (818) 208-7120"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Must be a valid mobile telephone number capable of receiving SMS text messages.
                </span>
              </div>

              {/* Input: Email Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. client@example.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Used for account verification and receiving confirmation of your communication preferences.
                </span>
              </div>

              {/* AFFIRMATIVE UNCHECKED CONSENT CHECKBOX */}
              <div className="pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 border-2 border-blue-200">
                  <label className="flex items-start gap-3.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={agreeConsent}
                      onChange={(e) => setAgreeConsent(e.target.checked)}
                      className="w-5 h-5 rounded border-slate-400 text-blue-600 focus:ring-blue-500 shrink-0 mt-0.5 cursor-pointer accent-blue-600"
                    />
                    <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      I agree to receive SMS messages from PCSecure regarding my account, payments, orders, subscriptions, and services.
                    </span>
                  </label>
                </div>
              </div>

              {/* REQUIRED SMS DISCLOSURES (PROMINENT CALLOUT) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-300 space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Required SMS Disclosures</span>
                </div>
                <ul className="space-y-1.5 list-disc list-inside text-slate-800 font-medium">
                  <li>
                    <strong>Message frequency varies based on your account and services. Message and data rates may apply.</strong>
                  </li>
                  <li>
                    <strong>Reply STOP to opt out of SMS messages at any time.</strong>
                  </li>
                  <li>
                    <strong>Reply HELP for assistance.</strong>
                  </li>
                  <li>
                    <strong>SMS consent is not a condition of purchasing any PCSecure product or service.</strong>
                  </li>
                </ul>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit SMS Consent</span>
              </button>
            </form>
          )}
        </section>

        {/* PRIVACY DISCLOSURE SECTION */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Lock className="w-4 h-4" />
            <span>Data Protection &amp; Confidentiality</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Your Privacy Matters
          </h2>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
              &quot;PCSecure respects your privacy. Mobile information and SMS consent will not be shared with third parties or affiliates for their own marketing or promotional purposes.&quot;
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            All text messaging originator opt-in data and consent is maintained with strict safeguards and is never bartered, leased, rented, or transferred to third-party advertisers, lead brokers, or marketing networks.
          </p>
        </section>

        {/* WHAT SMS MESSAGES WILL CUSTOMERS RECEIVE? */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <MessageSquare className="w-4 h-4" />
            <span>Scope of Communication</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            What Messages Will I Receive?
          </h2>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            PCSecure SMS notifications are intended solely for account management and service delivery. Messages you may receive include:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {[
              'Payment reminders',
              'Payment confirmations',
              'Billing notifications',
              'Account notifications',
              'Service notifications',
              'Subscription notifications',
              'Order-related notifications',
              'Other communications directly related to your existing PCSecure account or services',
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
            <p className="text-xs sm:text-sm font-semibold text-blue-950 leading-relaxed">
              &quot;PCSecure sends these messages only to existing customers regarding their accounts, payments, orders, subscriptions, or services with PCSecure. We do not use this SMS program to send unsolicited messages to individuals who do not have an existing customer relationship with PCSecure.&quot;
            </p>
          </div>
        </section>

        {/* CUSTOMER SUPPORT SECTION */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Phone className="w-4 h-4" />
            <span>Dedicated Assistance</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Need Help?
          </h2>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            For assistance with SMS communications or your PCSecure account, please contact our customer support team.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Telephone Support
                </span>
                <a
                  href="tel:+18182087120"
                  className="text-base sm:text-lg font-bold text-blue-600 hover:text-blue-800 hover:underline block"
                >
                  1-818-208-7120
                </a>
                <span className="text-[11px] text-slate-500 block">
                  Tap to call on mobile devices
                </span>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Email Support
                </span>
                <a
                  href="mailto:support@pcsecure.tech"
                  className="text-base sm:text-lg font-bold text-blue-600 hover:text-blue-800 hover:underline block break-all"
                >
                  support@pcsecure.tech
                </a>
                <span className="text-[11px] text-slate-500 block">
                  Average response within 1 business day
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PRIVACY POLICY AND TERMS SECTION */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <FileText className="w-4 h-4" />
            <span>Legal Governance</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy &amp; Terms
          </h2>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Review our complete policies governing customer rights, digital service terms, carrier disclaimers, and data protection practices:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Privacy Policy Link Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition space-y-2 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Privacy Policy</span>
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Learn how PCSecure collects, safeguards, and protects your personal and mobile communication data.
                </p>
                <div className="text-[11px] font-mono text-slate-500 mt-2 truncate">
                  https://pcsecure.tech/privacy-policy
                </div>
              </div>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'privacy-policy' })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  <span>View Privacy Policy</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Terms & Conditions Link Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition space-y-2 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Terms &amp; Conditions</span>
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Read our full customer service agreement, SMS program guidelines, and carrier liability disclosures.
                </p>
                <div className="text-[11px] font-mono text-slate-500 mt-2 truncate">
                  https://pcsecure.tech/terms-and-conditions
                </div>
              </div>
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'terms' })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  <span>View Terms &amp; Conditions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
