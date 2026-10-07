import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { AppRoute } from '../types';

interface GuaranteeSectionProps {
  onNavigate?: (route: AppRoute) => void;
  variant?: 'full' | 'compact';
  customHeading?: string;
  customText?: string;
}

export const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({
  onNavigate,
  variant = 'full',
  customHeading = '60-Day Money-Back Guarantee',
  customText = 'Your purchase is protected by our 60-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 60 days of your purchase date, subject to the terms of our Refund Policy.',
}) => {
  if (variant === 'compact') {
    return (
      <div
        id="guarantee-badge-compact"
        className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-emerald-600 p-2 text-white shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm">
                {customHeading}
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                100% Risk-Free
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {customText}
            </p>
            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate({ type: 'refund-policy' })}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 underline inline-flex items-center gap-1 pt-1"
              >
                <span>View Refund Policy</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      id="guarantee-section-full"
      className="my-12 rounded-2xl border-2 border-emerald-300/80 bg-gradient-to-b from-emerald-50/90 via-white to-emerald-50/30 p-8 sm:p-10 shadow-sm"
    >
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
          <ShieldCheck className="w-9 h-9" />
        </div>

        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-300">
            Consumer Protection Guarantee
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {customHeading}
          </h3>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal max-w-2xl mx-auto">
            {customText}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-left">
          <div className="bg-white/90 rounded-xl p-4 border border-emerald-100 shadow-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-800">
              Full 60 Days Trial Period
            </span>
          </div>
          <div className="bg-white/90 rounded-xl p-4 border border-emerald-100 shadow-xs flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-800">
              Zero Hassle Refund Claim
            </span>
          </div>
          <div className="bg-white/90 rounded-xl p-4 border border-emerald-100 shadow-xs flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-xs font-semibold text-slate-800">
              Digistore24 Protected Order
            </span>
          </div>
        </div>

        {onNavigate && (
          <div className="pt-2">
            <button
              type="button"
              id="btn-view-refund-policy"
              onClick={() => onNavigate({ type: 'refund-policy' })}
              className="text-sm font-bold text-emerald-700 hover:text-emerald-900 underline inline-flex items-center gap-1.5 transition-colors"
            >
              <span>View Refund Policy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
