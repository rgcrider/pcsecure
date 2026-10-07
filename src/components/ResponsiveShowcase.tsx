import React, { useState } from 'react';
import {
  Monitor,
  Laptop,
  Tablet,
  Smartphone,
  RotateCw,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Maximize2,
  Sliders,
} from 'lucide-react';

export const ResponsiveShowcase: React.FC = () => {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'laptop' | 'tablet' | 'mobile'>('laptop');
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');
  const [viewMode, setViewMode] = useState<'interactive' | 'stack'>('interactive');

  const devices = {
    desktop: {
      name: 'Studio Display',
      category: 'Desktop Monitor',
      resolution: '1920 × 1080 px',
      viewport: 'max-w-4xl aspect-[16/10]',
      icon: Monitor,
      image: '/src/assets/images/hero_web_design_1790447403727.jpg',
      features: ['Ultra-wide layout grid', 'Sub-pixel typography scaling', 'Fixed sidebar navigation'],
    },
    laptop: {
      name: 'MacBook Pro',
      category: 'Laptop Screen',
      resolution: '1440 × 900 px',
      viewport: 'max-w-3xl aspect-[16/10]',
      icon: Laptop,
      image: '/src/assets/images/portfolio_saas_platform_1790446895410.jpg',
      features: ['Retina @2x crisp assets', 'Optimal line reading length', 'Micro-interactions enabled'],
    },
    tablet: {
      name: 'iPad Pro / Air',
      category: 'Tablet Surface',
      resolution: orientation === 'landscape' ? '1024 × 768 px' : '768 × 1024 px',
      viewport: orientation === 'landscape' ? 'max-w-xl aspect-[4/3]' : 'max-w-md aspect-[3/4]',
      icon: Tablet,
      image: '/src/assets/images/portfolio_ecommerce_luxury_1790446904601.jpg',
      features: ['Touch gesture navigation', 'Fluid 2-column reflow', 'Adaptive drawer menus'],
    },
    mobile: {
      name: 'iPhone 16 Pro',
      category: 'Mobile Smartphone',
      resolution: '393 × 852 px',
      viewport: 'max-w-xs aspect-[9/19]',
      icon: Smartphone,
      image: '/src/assets/images/portfolio_fintech_portal_1790446913918.jpg',
      features: ['1-Thumb thumb-zone CTAs', 'Zero layout shifts', 'Instant edge-cached loading'],
    },
  };

  const current = devices[activeDevice];

  return (
    <section id="responsive-showcase" className="py-20 sm:py-28 bg-white border-b border-slate-100 overflow-hidden w-full">
      <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF4FF] text-[#0875E1] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RESPONSIVE ENGINEERING LAB</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Designed for Every Screen.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Every PCSecure website is strictly tested across modern devices and resolutions to provide a seamless, high-converting experience anywhere.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start lg:self-auto">
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'interactive'
                  ? 'bg-white text-[#0875E1] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Tester
            </button>
            <button
              onClick={() => setViewMode('stack')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'stack'
                  ? 'bg-white text-[#0875E1] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Editorial Stack View
            </button>
          </div>
        </div>

        {/* View Mode 1: Interactive Device Tester */}
        {viewMode === 'interactive' && (
          <div className="space-y-6">
            {/* Device Switcher Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#F6F9FC] p-3 rounded-2xl border border-slate-200/80">
              {/* Device Selector Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {(Object.keys(devices) as Array<keyof typeof devices>).map((key) => {
                  const d = devices[key];
                  const Icon = d.icon;
                  const isSelected = activeDevice === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveDevice(key)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#0875E1] text-white shadow-md shadow-blue-500/20'
                          : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{d.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Viewport Meta & Orientation */}
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-mono font-semibold text-[#0B1F3A] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{current.resolution}</span>
                </div>

                {activeDevice === 'tablet' && (
                  <button
                    onClick={() =>
                      setOrientation(orientation === 'landscape' ? 'portrait' : 'landscape')
                    }
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#0875E1] hover:border-[#0875E1] transition cursor-pointer"
                    title="Rotate Device Orientation"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Live Morphing Viewport Canvas */}
            <div className="relative rounded-3xl bg-[#07172F] p-6 sm:p-12 overflow-hidden shadow-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[520px]">
              {/* Subtle background ruler ticks */}
              <div className="absolute top-3 left-6 right-6 flex justify-between text-[9px] font-mono text-slate-500 border-b border-slate-800 pb-1">
                <span>0 px</span>
                <span>375 px (Mobile)</span>
                <span>768 px (Tablet)</span>
                <span>1024 px (Laptop)</span>
                <span>1440 px (Desktop)</span>
              </div>

              {/* Morphing Device Frame */}
              <div
                className={`relative w-full ${current.viewport} rounded-2xl overflow-hidden shadow-2xl border-4 sm:border-8 border-slate-800 bg-slate-950 transition-all duration-500 ease-in-out`}
              >
                {/* Device Header Bar */}
                <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    pcsecure.tech · viewport: {current.resolution}
                  </div>
                  <div className="w-3 h-3 rounded-full bg-cyan-400/40" />
                </div>

                {/* Device Screen Image */}
                <div className="relative w-full h-full bg-slate-950 overflow-hidden">
                  <img
                    src={current.image}
                    alt={`${current.name} Responsive Preview`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle responsive label overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-2">
                      <current.icon className="w-4 h-4 text-cyan-400" />
                      <span className="font-bold">{current.category}</span>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-mono">100% Fluid Fluidity</span>
                  </div>
                </div>
              </div>

              {/* Device Capabilities Pill List */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {current.features.map((feat) => (
                  <div
                    key={feat}
                    className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* View Mode 2: Editorial Perspective Stack View */}
        {viewMode === 'stack' && (
          <div className="rounded-3xl bg-[#07172F] p-8 sm:p-14 overflow-hidden border border-slate-800 relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              {/* Desktop */}
              <div className="space-y-3 group">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-700 shadow-xl group-hover:border-[#0875E1] transition-colors">
                  <img
                    src="/src/assets/images/hero_web_design_1790447403727.jpg"
                    alt="Desktop"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center text-white">
                  <h4 className="text-sm font-bold">Desktop</h4>
                  <p className="text-xs text-slate-400 font-mono">1920 × 1080</p>
                </div>
              </div>

              {/* Laptop */}
              <div className="space-y-3 group">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-700 shadow-xl group-hover:border-[#0875E1] transition-colors">
                  <img
                    src="/src/assets/images/portfolio_saas_platform_1790446895410.jpg"
                    alt="Laptop"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center text-white">
                  <h4 className="text-sm font-bold">Laptop</h4>
                  <p className="text-xs text-slate-400 font-mono">1440 × 900</p>
                </div>
              </div>

              {/* Tablet */}
              <div className="space-y-3 group">
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-700 shadow-xl group-hover:border-[#0875E1] transition-colors">
                  <img
                    src="/src/assets/images/portfolio_ecommerce_luxury_1790446904601.jpg"
                    alt="Tablet"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center text-white">
                  <h4 className="text-sm font-bold">Tablet</h4>
                  <p className="text-xs text-slate-400 font-mono">768 × 1024</p>
                </div>
              </div>

              {/* Smartphone */}
              <div className="space-y-3 group max-w-[200px] mx-auto md:max-w-none">
                <div className="aspect-[9/19] rounded-xl overflow-hidden bg-slate-900 border-2 border-slate-700 shadow-xl group-hover:border-[#0875E1] transition-colors">
                  <img
                    src="/src/assets/images/portfolio_fintech_portal_1790446913918.jpg"
                    alt="Mobile"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center text-white">
                  <h4 className="text-sm font-bold">Smartphone</h4>
                  <p className="text-xs text-slate-400 font-mono">393 × 852</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
