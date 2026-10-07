import React from 'react';
import { ShieldCheck, FileText, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import { CompanySettings, AppRoute } from '../types';

interface LegalPageProps {
  type: 'refund-policy' | 'privacy-policy' | 'terms' | 'disclaimer';
  settings: CompanySettings;
  onNavigate: (route: AppRoute) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, settings, onNavigate }) => {
  const getPageConfig = () => {
    switch (type) {
      case 'refund-policy':
        return {
          title: 'Refund Policy',
          subtitle: 'Comprehensive 60-Day Money-Back Guarantee & Return Procedures',
          lastUpdated: 'February 2025',
        };
      case 'privacy-policy':
        return {
          title: 'Privacy Policy',
          subtitle: 'How PCSecure LLC protects, collects, and manages your personal & mobile data',
          lastUpdated: 'Updated October 2026',
        };
      case 'terms':
        return {
          title: 'Terms & Conditions',
          subtitle: 'Terms of service, digital licensing, customer agreements & SMS program terms',
          lastUpdated: 'Updated October 2026',
        };
      case 'disclaimer':
        return {
          title: 'Legal & Technology Disclaimer',
          subtitle: 'Important disclosures regarding security tools and consulting services',
          lastUpdated: 'Updated October 2026',
        };
    }
  };

  const { title, subtitle, lastUpdated } = getPageConfig();

  return (
    <div className="min-h-screen bg-slate-50/60 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <button
          onClick={() => onNavigate({ type: 'home' })}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>

        {/* Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <FileText className="w-4 h-4" />
            <span>Official Legal Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h1>
          <p className="text-base text-slate-600 font-medium">
            {subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400 border-t border-slate-100">
            <span>Entity: <strong className="text-slate-700">{settings.companyName}</strong></span>
            <span>&bull;</span>
            <span>Effective Date: {lastUpdated}</span>
            <span>&bull;</span>
            <span>Support: <strong className="text-slate-700">{settings.supportEmail}</strong></span>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-8">
          {/* REFUND POLICY CONTENT (MANDATED TO PROMINENTLY EXPLAIN 60-DAY GUARANTEE) */}
          {type === 'refund-policy' && (
            <div className="space-y-6 text-sm sm:text-base">
              <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-950 text-base">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Our 60-Day Money-Back Guarantee</span>
                </div>
                <p className="text-emerald-900 font-medium leading-relaxed">
                  At <strong>{settings.companyName}</strong>, we stand behind the quality and engineering of our digital products, software tools, suites, and guides. Your purchase is protected by our full <strong>60-day money-back guarantee</strong>. If you are not satisfied with your purchase for any reason, you may request a 100% refund within 60 days of your original purchase date.
                </p>
              </div>

              <h3 className="text-xl font-bold text-slate-900">1. Eligibility for 60-Day Refunds</h3>
              <p>
                This Refund Policy applies to all digital products, software kits, downloadable policy suites, and online service bookings purchased through our official website and processed via our merchant of record, <strong>Digistore24</strong>.
              </p>
              <ul>
                <li>The refund request must be submitted within sixty (60) calendar days from the timestamp of the transaction.</li>
                <li>No physical return of merchandise is necessary for digital software or downloadable files.</li>
                <li>Refunds are credited in full to the original payment method used during checkout (Credit Card, Debit Card, or PayPal).</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900">2. How to Request a Refund</h3>
              <p>
                Requesting a refund is straightforward and transparent. You may submit your request via either of the following official channels:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">Channel A: Direct Support</h4>
                  <p className="text-xs text-slate-600">
                    Email our support team at <a href={`mailto:${settings.supportEmail}`} className="text-blue-600 font-semibold underline">{settings.supportEmail}</a> with your product name and Digistore24 Order ID.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">Channel B: Digistore24 Order Portal</h4>
                  <p className="text-xs text-slate-600">
                    Access your purchase receipt link provided by Digistore24 and click "Support" or contact Digistore24 buyer support directly.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900">3. Processing Time</h3>
              <p>
                Once approved, refunds are initiated immediately by Digistore24. Depending on your financial institution or card issuer, the credited funds typically reflect in your account within 3 to 7 business days.
              </p>

              <h3 className="text-xl font-bold text-slate-900">4. Inquiries & Assistance</h3>
              <p>
                If you have questions regarding your order, billing statement debit, or this guarantee, please contact our team at <a href={`mailto:${settings.supportEmail}`} className="text-blue-600 font-bold">{settings.supportEmail}</a>.
              </p>
            </div>
          )}

          {/* PRIVACY POLICY CONTENT */}
          {type === 'privacy-policy' && (
            <div className="space-y-6 text-sm sm:text-base">
              <h3 className="text-xl font-bold text-slate-900">1. Information Collection</h3>
              <p>
                <strong>{settings.companyName}</strong> collects basic personal information required to deliver software updates, license credentials, requested proposals, and technical customer support. This includes your name, email address, company name, and optional mobile telephone number when you submit an inquiry form, schedule a consultation, or request project deliverables.
              </p>
              <p>
                When you place an order, payment information is securely processed directly by our authorized merchant partners (including <strong>Digistore24</strong>, <strong>PayPal</strong>, and <strong>Amazon Pay</strong>) using 256-bit SSL encryption. We never store, process, or retain raw credit card numbers or sensitive payment credentials on our servers.
              </p>

              <h3 className="text-xl font-bold text-slate-900">2. Use of Information</h3>
              <p>
                Information provided during order fulfillment, consultation scheduling, or contact inquiries is used exclusively to:
              </p>
              <ul>
                <li>Deliver your purchased digital products, service deliverables, and license keys;</li>
                <li>Provide direct customer service, warranty fulfillment, and ongoing technical support;</li>
                <li>Send transactional updates, project milestone notifications, and service alerts;</li>
                <li>Notify you of critical security patches and product updates;</li>
                <li>Maintain compliance with legal, accounting, and anti-fraud regulations.</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-900">3. Information Sharing & Third Parties</h3>
              <p>
                We do not sell, rent, or lease your personal data to third parties. We share data only with verified fulfillment partners necessary to deliver your purchase and requested services, specifically Digistore24, PayPal, and Amazon Pay for payment processing, and trusted email gateways for transaction receipts.
              </p>

              {/* MANDATORY SMS / MOBILE DATA-SHARING DISCLOSURE */}
              <div className="p-6 rounded-2xl bg-blue-50/80 border-2 border-blue-200 space-y-3 not-prose my-6">
                <div className="flex items-center gap-2 font-bold text-blue-950 text-base">
                  <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>SMS &amp; Mobile Information Data-Sharing Disclosures</span>
                </div>
                <p className="text-blue-950 font-bold text-sm sm:text-base leading-relaxed">
                  No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
                </p>
                <p className="text-blue-900 text-xs sm:text-sm leading-relaxed">
                  All other categories of data collection exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties or affiliates under any circumstances.
                </p>
                <p className="text-blue-900 text-xs sm:text-sm leading-relaxed">
                  Mobile phone numbers and SMS consent collected directly through our contact forms, quote requests, or customer support channels are utilized strictly to transmit transactional project notifications, service alerts, consultation reminders, and direct customer support in response to your explicit requests. We will never sell, transfer, barter, or share your mobile number or SMS opt-in consent with any third-party marketing agencies, lead aggregators, or external advertisers.
                </p>
              </div>

              <h3 className="text-xl font-bold text-slate-900">4. Data Security &amp; Retention</h3>
              <p>
                We implement industry-standard physical, electronic, and managerial safeguards to protect your personal information against unauthorized access, alteration, loss, or misuse. We retain your information only for as long as necessary to provide you with services and comply with legal obligations.
              </p>

              <h3 className="text-xl font-bold text-slate-900">5. Your Privacy Rights &amp; Opt-Out Requests</h3>
              <p>
                You have the right to access, update, or request the deletion of your personal data stored with us at any time. If you have opted in to receive SMS or email updates from us, you may opt out at any time using the instructions provided in our communications or by contacting our data protection team directly.
              </p>

              <h3 className="text-xl font-bold text-slate-900">6. Contact Information</h3>
              <p>
                For any privacy inquiries, data removal requests, or questions regarding our data practices, please contact our team at <a href={`mailto:${settings.supportEmail}`} className="text-blue-600 font-bold">{settings.supportEmail}</a> or call us at <strong className="text-slate-800">{settings.phoneNumber}</strong>.
              </p>
            </div>
          )}

          {/* TERMS & CONDITIONS CONTENT */}
          {type === 'terms' && (
            <div className="space-y-6 text-sm sm:text-base">
              <h3 className="text-xl font-bold text-slate-900">1. Agreement to Terms</h3>
              <p>
                By accessing this website, submitting an inquiry, or purchasing digital software, policy suites, web design, WordPress development, digital marketing, SEO, or consulting services from <strong>{settings.companyName}</strong>, you agree to be bound by these Terms &amp; Conditions and our Privacy Policy. If you do not agree, please discontinue use of this site immediately.
              </p>

              <h3 className="text-xl font-bold text-slate-900">2. Digital Product &amp; Service Scope</h3>
              <p>
                Upon completed purchase, <strong>{settings.companyName}</strong> grants you a non-exclusive, perpetual commercial license to use, adapt, and run the software tools, scripts, and policy documentation within your own organization or designated internal clients, subject to single-license terms. You may not resell, sub-license, or redistribute our software scripts or document templates as standalone commercial products.
              </p>
              <p>
                Fixed-scope web development, WordPress builds, and monthly retainer services are delivered in accordance with the specifications outlined in your selected tier or mutually agreed proposal.
              </p>

              <h3 className="text-xl font-bold text-slate-900">3. Payment &amp; Merchant Processing</h3>
              <p>
                All checkout transactions are processed by our authorized payment providers, including Digistore24 (as authorized merchant of record for downloadable digital goods), PayPal, and Amazon Pay. The debit on your billing statement will reflect the descriptor specified during checkout and on your order receipt.
              </p>

              <h3 className="text-xl font-bold text-slate-900">4. Satisfaction Guarantee &amp; Refund Policy</h3>
              <p>
                Digital products and software toolkits are backed by our advertised 60-Day Money-Back Guarantee in accordance with our official Refund Policy. Service engagements and retainers include defined post-launch warranty windows and milestone approvals.
              </p>

              {/* MANDATORY SMS PROGRAM TERMS & CONDITIONS */}
              <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-300 space-y-4 not-prose my-6">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  <span>5. SMS / Mobile Messaging Program Terms</span>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <p>
                    <strong>Program Name &amp; Overview:</strong> {settings.companyName} operates an SMS communication program (the &quot;Messaging Service&quot;) designed to keep clients informed about their service inquiries, project milestones, onboarding steps, technical updates, and customer support matters.
                  </p>
                  <p>
                    <strong>Types of Messages Sent:</strong> When you provide your mobile phone number and opt in to receive text messages from {settings.companyName}, you may receive messages relating to:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
                    <li>Project status updates, delivery alerts, and deployment milestone notices</li>
                    <li>Consultation confirmations and appointment reminders</li>
                    <li>Direct customer support replies to your technical inquiries</li>
                    <li>Security, maintenance, and critical service advisories</li>
                    <li>Order fulfillment confirmations and invoice receipt alerts</li>
                  </ul>
                  <p>
                    <strong>Message Frequency:</strong> Message frequency varies depending on your ongoing project activity, service tier, and direct inquiries. Typically, you will receive up to four (4) messages per month, or as triggered by your active requests and project milestones.
                  </p>
                  <p>
                    <strong>Message and Data Rates:</strong> Message and data rates may apply to any messages sent to you from us and to us from you. Check with your mobile carrier for details regarding text messaging charges according to your wireless plan.
                  </p>
                  <p>
                    <strong>How to Opt-Out (STOP Instructions):</strong> You may cancel and opt out of the SMS service at any time. Simply reply <strong>STOP</strong> to any text message received from {settings.companyName}. After you send <strong>STOP</strong>, we will send you a single SMS message to confirm that you have been unsubscribed. Once confirmed, you will no longer receive SMS messages from us. If you wish to rejoin the SMS service in the future, you may sign up again via our inquiry form or contact our customer support team.
                  </p>
                  <p>
                    <strong>How to Get Support (HELP Instructions):</strong> If you are experiencing any issues with the messaging program, reply with the keyword <strong>HELP</strong> to any message, or contact our customer support team directly at <a href={`mailto:${settings.supportEmail}`} className="text-blue-600 font-semibold underline">{settings.supportEmail}</a> or by telephone at <strong className="text-slate-800 font-semibold">{settings.phoneNumber}</strong>.
                  </p>
                  <p>
                    <strong>Carrier Liability Disclaimer:</strong> Mobile wireless carriers (including, but not limited to, AT&amp;T, T-Mobile, Verizon, and Sprint) are not liable for delayed or undelivered messages.
                  </p>
                  <p>
                    <strong>Privacy Policy Reference:</strong> Data collected through our SMS program is handled in strict accordance with our Privacy Policy. Mobile information and SMS consent will not be shared with third parties or affiliates for marketing or promotional purposes.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900">6. Limitation of Liability</h3>
              <p>
                In no event shall {settings.companyName}, its officers, directors, employees, or developers be liable for indirect, punitive, incidental, or consequential damages arising from the implementation or execution of software scripts, security benchmarks, or third-party platform updates.
              </p>

              <h3 className="text-xl font-bold text-slate-900">7. Contact Information</h3>
              <p>
                If you have questions regarding these Terms &amp; Conditions or wish to discuss custom enterprise agreements, please reach out to our team at <a href={`mailto:${settings.supportEmail}`} className="text-blue-600 font-bold">{settings.supportEmail}</a>.
              </p>
            </div>
          )}

          {/* DISCLAIMER CONTENT */}
          {type === 'disclaimer' && (
            <div className="space-y-6 text-sm sm:text-base">
              <h3 className="text-xl font-bold text-slate-900">1. Technology & Security Disclaimer</h3>
              <p>
                The digital products, diagnostic scripts, hardening configurations, and policy suites provided by <strong>{settings.companyName}</strong> are designed to assist administrators in strengthening baseline system security. While our benchmarks align with recognized industry standards (such as CIS, NIST, and OWASP), no security solution can guarantee absolute immunity against novel zero-day threats or sophisticated adversarial attacks.
              </p>

              <h3 className="text-xl font-bold text-slate-900">2. Professional Advice</h3>
              <p>
                The information, documents, and checklists provided in our suites do not constitute formal legal advice. Regulatory compliance requirements vary by jurisdiction and industry sector; organizations should evaluate policies with qualified counsel.
              </p>

              <h3 className="text-xl font-bold text-slate-900">3. Test Environment Recommendation</h3>
              <p>
                Prior to applying hardening scripts or automated configurations to production server environments, we recommend testing scripts in a staging or non-critical environment to ensure compatibility with your proprietary applications.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
