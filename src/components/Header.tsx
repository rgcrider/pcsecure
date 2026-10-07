import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, Lock } from 'lucide-react';
import { AppRoute, CompanySettings } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
  settings: CompanySettings;
  onOpenProjectModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  settings,
  onOpenProjectModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', route: { type: 'home' } as AppRoute },
    { label: 'About', route: { type: 'about' } as AppRoute },
    { label: 'Services', route: { type: 'services' } as AppRoute },
    { label: 'Pricing', route: { type: 'pricing' } as AppRoute },
    { label: 'Portfolio', route: { type: 'portfolio' } as AppRoute },
    { label: 'Process', route: { type: 'process' } as AppRoute },
    { label: 'Blog', route: { type: 'blog' } as AppRoute },
    { label: 'Contact', route: { type: 'contact' } as AppRoute },
  ];

  const isActive = (itemRoute: AppRoute) => {
    return currentRoute.type === itemRoute.type;
  };

  const handleNavClick = (route: AppRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 bg-white ${
        scrolled ? 'shadow-xs border-b border-slate-200/80' : 'border-b border-slate-100'
      }`}
    >
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo */}
          <div id="brand-logo" className="shrink-0">
            <BrandLogo
              size="md"
              theme="light"
              showSubtitle={false}
              onClick={() => onNavigate({ type: 'home' })}
            />
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const active = isActive(item.route);
              return (
                <button
                  key={item.label}
                  id={`nav-${item.label.toLowerCase()}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`text-[15px] font-medium transition-colors relative py-1 cursor-pointer ${
                    active
                      ? 'text-[#0875E1] font-semibold'
                      : 'text-[#0B1F3A] hover:text-[#0875E1]'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0875E1] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Phone & CTA Button */}
          <div className="hidden sm:flex items-center gap-5 shrink-0">
            {/* Phone contact */}
            <a
              href="tel:8103310605"
              className="flex items-center gap-2 text-[14px] font-semibold text-[#0B1F3A] hover:text-[#0875E1] transition-colors"
              title="Call PCSecure Support"
            >
              <Phone className="w-4 h-4 text-[#0875E1]" />
              <span>(810) 331 0605</span>
            </a>

            {/* Primary Blue CTA Button */}
            <button
              id="header-start-project-btn"
              onClick={onOpenProjectModal}
              className="px-5 py-2.5 rounded-lg bg-[#0875E1] hover:bg-[#0766c5] active:bg-[#0658a8] text-white font-semibold text-sm transition-all shadow-xs hover:shadow flex items-center gap-1.5 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="tel:8103310605"
              className="p-2 text-[#0875E1] rounded-lg hover:bg-slate-50"
              aria-label="Call (810) 331 0605"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0B1F3A] rounded-lg hover:bg-slate-50 transition"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.route)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${
                isActive(item.route)
                  ? 'bg-[#EAF4FF] text-[#0875E1] font-semibold'
                  : 'text-[#0B1F3A] hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              className="w-full py-3 px-4 text-center font-bold rounded-lg bg-[#0875E1] hover:bg-[#0766c5] text-white text-sm shadow-xs flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:8103310605"
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-[#0B1F3A] flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#0875E1]" />
              <span>(810) 331 0605</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
