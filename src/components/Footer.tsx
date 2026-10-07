import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { AppRoute, CompanySettings } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
  settings: CompanySettings;
  onOpenProjectModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, settings }) => {
  return (
    <footer className="bg-[#07172F] text-slate-300 border-t border-slate-800 w-full">
      {/* Main Footer Grid */}
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Bio & Socials (Span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo
              size="md"
              theme="dark"
              showSubtitle={false}
              onClick={() => onNavigate({ type: 'home' })}
            />

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Professional web design and development solutions built for modern businesses.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#0875E1] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#0875E1] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#0875E1] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#0875E1] text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-tight">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate({ type: 'home' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'about' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'services' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'pricing' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pricing & Plans
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'portfolio' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'blog' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'contact' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-tight">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate({ type: 'services' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Website Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'services' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'services' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  E-Commerce
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'services' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  UI/UX Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'services' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Website Redesign
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'services' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Web Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate({ type: 'services' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Maintenance
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-tight">
              Contact Information
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <a
                href="tel:8103310605"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#0875E1] shrink-0" />
                <span>(810) 331 0605</span>
              </a>

              <a
                href={`mailto:${settings.supportEmail || 'support@pcsecure.tech'}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#0875E1] shrink-0" />
                <span>{settings.supportEmail || 'support@pcsecure.tech'}</span>
              </a>

              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-[#0875E1] shrink-0 mt-1" />
                <span className="leading-snug">
                  9585 Pottawatamie Dr<br />
                  Manitou Beach, MI 49253<br />
                  United States
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-[#051124] text-xs text-slate-400 w-full">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p>© {new Date().getFullYear()} {settings.companyName}. All rights reserved.</p>
            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">PayPal Verified</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">Amazon Pay Enabled</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">256-Bit SSL</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate({ type: 'privacy-policy' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate({ type: 'terms' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onNavigate({ type: 'refund-policy' })}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <button
              onClick={() => onNavigate({ type: 'admin', subview: 'payments' })}
              className="text-slate-400 hover:text-[#0875E1] transition-colors cursor-pointer"
              title="Configure Amazon Pay & PayPal gateway keys"
            >
              Payment Gateways
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
