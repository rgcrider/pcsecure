import React from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';

interface BillingNoticeProps {
  statementDescriptor?: string;
  className?: string;
}

export const BillingNotice: React.FC<BillingNoticeProps> = ({
  statementDescriptor = 'DIGISTORE24',
  className = '',
}) => {
  const descriptor = (statementDescriptor && statementDescriptor.trim().length > 0)
    ? statementDescriptor.trim()
    : 'DIGISTORE24';

  return (
    <div
      id="important-billing-notice"
      className={`rounded-xl border-2 border-amber-300 bg-amber-50/90 p-5 sm:p-6 shadow-sm ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-amber-500 p-2.5 text-white shrink-0 shadow-xs">
          <CreditCard className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Important Billing Information
            </h4>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
              Statement Notice
            </span>
          </div>

          <p className="text-sm sm:text-base font-semibold text-slate-800">
            The debit is made by <span className="font-extrabold text-blue-900 underline decoration-amber-400 decoration-2 underline-offset-2 tracking-wide">{descriptor}</span>.
          </p>

          <p className="text-xs text-slate-600 leading-relaxed pt-1">
            Please look for <strong className="text-slate-800 font-semibold">{descriptor}</strong> on your credit card, bank, or PayPal billing statement. If you have any questions concerning this charge or need assistance with your order, please consult our customer support department.
          </p>
        </div>
      </div>
    </div>
  );
};
