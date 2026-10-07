import React, { useState, useRef, useCallback } from 'react';
import {
  ArrowRight,
  Play,
  Code2,
  TrendingUp,
  Palette,
  Laptop,
  Smartphone,
  Gauge,
  Search,
  CheckCircle2,
  Wrench,
  BarChart3,
  Layers,
  Sparkles,
  Terminal,
  Cpu,
  Monitor,
  Check,
} from 'lucide-react';
import { AppRoute } from '../types';
import { FluidWave } from './WaveDividers';
import { APP_IMAGES } from '../data/imageAssets';

interface HeroSectionProps {
  onOpenProjectModal: (serviceName?: string) => void;
  onNavigate: (route: AppRoute) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenProjectModal,
  onNavigate,
}) => {
  // Screen preview mode inside the desktop monitor
  const [screenMode, setScreenMode] = useState<'preview' | 'code' | 'tokens'>('preview');

  // Active workflow pill
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(1);

  // 3D Mouse Parallax Tilt Effect
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gentle maximum 6 degree tilt for a realistic, subtle, luxury feel
    const rotateY = ((mouseX - centerX) / centerX) * 5;
    const rotateX = -((mouseY - centerY) / centerY) * 5;

    setTilt({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const workflowSteps = [
    { label: 'Design', color: 'bg-cyan-400', desc: 'Figma Tokens & UX' },
    { label: 'Develop', color: 'bg-blue-500', desc: 'Next.js & TypeScript' },
    { label: 'Test', color: 'bg-indigo-400', desc: 'Lighthouse & QA' },
    { label: 'Launch', color: 'bg-emerald-400', desc: 'Edge Global CDN' },
  ];

  return (
    <div id="hero-section" className="w-full">
      {/* 1. FULL-SCREEN HERO SHOWCASE */}
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full bg-[#07172F] text-white overflow-hidden min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-center"
      >
        {/* Subtle dynamic background glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0875E1_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Mouse follow light flare */}
        {isHovered && (
          <div
            className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-2xl pointer-events-none transition-all duration-300"
            style={{
              transform: `translate(${tilt.y * 30}px, ${-tilt.x * 30}px)`,
            }}
          />
        )}

        <div className="relative z-10 w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-6">
              {/* Category Kicker with subtle pulse */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase text-cyan-300">
                  WEB DESIGN &amp; DEVELOPMENT COMPANY
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight text-white leading-[1.14]">
                We Design &amp; Build Websites That Move{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] via-[#0875E1] to-[#00D2FF] animate-pulse">
                  Businesses Forward.
                </span>
              </h1>

              {/* Supporting Body Text */}
              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                PCSecure creates modern, high-performance websites and digital experiences designed to strengthen your brand, engage your audience, and turn visitors into customers.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  id="hero-start-project-btn"
                  onClick={() => onOpenProjectModal('Custom Website Design Package')}
                  className="group px-6 sm:px-7 py-3.5 rounded-lg bg-[#0875E1] hover:bg-[#0766c5] active:bg-[#0658a8] text-white font-semibold text-sm transition-all shadow-md hover:shadow-xl hover:shadow-blue-500/20 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-explore-work-btn"
                  onClick={() => onNavigate({ type: 'portfolio' })}
                  className="px-5 sm:px-6 py-3.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition flex items-center gap-2 cursor-pointer hover:border-slate-500"
                >
                  <span>Explore Our Work</span>
                  <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
                    <Play className="w-2.5 h-2.5 text-cyan-400 fill-cyan-400 ml-0.5" />
                  </div>
                </button>
              </div>

              {/* Sub-kicker trust line */}
              <div className="pt-2 text-xs font-medium text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  Custom Design
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Check className="w-3.5 h-3.5 text-[#0875E1]" />
                  Responsive Development
                </span>
                <span className="text-slate-600">•</span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Performance Focused
                </span>
              </div>
            </div>

            {/* Right Column: Multi-Device Realistic Visual Composition with 3D Parallax Tilt */}
            <div className="lg:col-span-6 relative perspective-[1200px]">
              <div
                className="relative mx-auto max-w-lg lg:max-w-none transition-transform duration-300 ease-out"
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 1. Main Desktop Monitor Showcase */}
                <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-2xl transition-all duration-300">
                  {/* Browser top chrome with interactive tabs */}
                  <div className="bg-slate-800/95 px-3 py-2 border-b border-slate-700 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>

                    {/* Interactive Screen Mode Switcher */}
                    <div className="flex items-center bg-slate-900/90 rounded-md p-0.5 border border-slate-700/60 text-[10px]">
                      <button
                        onClick={() => setScreenMode('preview')}
                        className={`px-2.5 py-1 rounded transition flex items-center gap-1 cursor-pointer ${
                          screenMode === 'preview'
                            ? 'bg-[#0875E1] text-white font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Monitor className="w-3 h-3" />
                        <span>Live Site</span>
                      </button>

                      <button
                        onClick={() => setScreenMode('code')}
                        className={`px-2.5 py-1 rounded transition flex items-center gap-1 cursor-pointer ${
                          screenMode === 'code'
                            ? 'bg-[#0875E1] text-white font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Code2 className="w-3 h-3" />
                        <span>Clean Code</span>
                      </button>

                      <button
                        onClick={() => setScreenMode('tokens')}
                        className={`px-2.5 py-1 rounded transition flex items-center gap-1 cursor-pointer ${
                          screenMode === 'tokens'
                            ? 'bg-[#0875E1] text-white font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Palette className="w-3 h-3" />
                        <span>UI Tokens</span>
                      </button>
                    </div>

                    <div className="text-[10px] font-semibold text-cyan-400 flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>99.8% Speed</span>
                    </div>
                  </div>

                  {/* Browser Live Preview Canvas (Reactive to screenMode) */}
                  <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                    {screenMode === 'preview' && (
                      <>
                        <img
                          src={APP_IMAGES.heroWebDesign}
                          alt="Innovative Digital Solutions For Your Business"
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        {/* Gradient Overlay & High-Craft Internal UI elements */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                          <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
                            Next-Gen Digital Experiences
                          </span>
                          <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                            Innovative Digital Solutions For Your Business
                          </h3>
                          <div className="mt-2 flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded bg-[#0875E1] text-[10px] font-bold text-white">
                              Live Interactive Build
                            </span>
                            <span className="text-[10px] text-slate-300 font-mono">
                              React + Next.js Engine
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    {screenMode === 'code' && (
                      <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-xs text-slate-300 space-y-1.5 overflow-hidden bg-slate-950 h-full flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-2">
                          <span>src/components/ClientExperience.tsx</span>
                          <span className="text-emerald-400">TypeScript strict: true</span>
                        </div>
                        <div className="space-y-1 text-slate-400">
                          <p>
                            <span className="text-cyan-400">import</span> React, {'{'} useState, useEffect {'}'}{' '}
                            <span className="text-cyan-400">from</span>{' '}
                            <span className="text-emerald-300">'react'</span>;
                          </p>
                          <p>
                            <span className="text-cyan-400">export const</span>{' '}
                            <span className="text-yellow-300">ModernExperience</span> = () =&gt; {'{'}
                          </p>
                          <p className="pl-4">
                            <span className="text-cyan-400">const</span> speedScore ={' '}
                            <span className="text-blue-400">99</span>;
                          </p>
                          <p className="pl-4">
                            <span className="text-cyan-400">return</span> (
                          </p>
                          <p className="pl-8 text-blue-300">
                            &lt;<span className="text-yellow-300">DigitalPerformance</span>{' '}
                            <span className="text-cyan-300">responsive</span>={'{}'}{' '}
                            <span className="text-cyan-300">lcp</span>=
                            <span className="text-emerald-300">"340ms"</span> /&gt;
                          </p>
                          <p className="pl-4">);</p>
                          <p>{'}'};</p>
                        </div>
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-cyan-400">
                          <span>✓ Zero Layout Shift (CLS: 0.001)</span>
                          <span className="text-emerald-400 font-bold">100% Production Ready</span>
                        </div>
                      </div>
                    )}

                    {screenMode === 'tokens' && (
                      <div className="p-4 sm:p-5 text-xs text-slate-300 space-y-3 bg-slate-950 h-full flex flex-col justify-between">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                          <span className="font-bold text-white">PCSecure Design System Tokens</span>
                          <span className="text-cyan-400">Figma → Production CSS</span>
                        </div>

                        {/* Color Token Swatches */}
                        <div className="grid grid-cols-4 gap-2">
                          <div className="p-2 rounded bg-[#081735] border border-slate-700 text-center">
                            <div className="text-[10px] font-bold text-white">Primary Navy</div>
                            <div className="text-[8px] text-slate-400 font-mono">#081735</div>
                          </div>
                          <div className="p-2 rounded bg-[#0875E1] text-center">
                            <div className="text-[10px] font-bold text-white">Royal Blue</div>
                            <div className="text-[8px] text-blue-100 font-mono">#0875E1</div>
                          </div>
                          <div className="p-2 rounded bg-[#00D2FF] text-center text-slate-950">
                            <div className="text-[10px] font-bold">Bright Cyan</div>
                            <div className="text-[8px] font-mono">#00D2FF</div>
                          </div>
                          <div className="p-2 rounded bg-[#EAF4FF] text-center text-slate-950">
                            <div className="text-[10px] font-bold">Soft Blue</div>
                            <div className="text-[8px] font-mono">#EAF4FF</div>
                          </div>
                        </div>

                        {/* Typography & Spatial Math */}
                        <div className="text-[10px] space-y-1 text-slate-400 pt-1 border-t border-slate-800">
                          <div className="flex justify-between">
                            <span>Font Family:</span>
                            <span className="text-white font-mono">Plus Jakarta Sans / Inter</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Spatial Grid:</span>
                            <span className="text-white font-mono">8pt Strict Optical Math</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Breakpoints:</span>
                            <span className="text-cyan-300 font-mono">640px · 768px · 1024px · 1280px</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Floating Tablet Preview (Gentle floating motion) */}
                <div className="hidden sm:block absolute -bottom-5 -left-6 w-44 rounded-lg bg-slate-900 border border-slate-700 shadow-xl overflow-hidden z-20 animate-float-gentle">
                  <div className="bg-slate-800 px-2 py-1 flex items-center justify-between border-b border-slate-700">
                    <span className="text-[8px] font-mono text-slate-300">Tablet View</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="aspect-[4/3] bg-slate-950 relative">
                    <img
                      src={APP_IMAGES.portfolioSaas}
                      alt="Tablet Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* 3. Floating Smartphone Mockup (Gentle reverse floating motion) */}
                <div className="absolute -bottom-6 -right-3 sm:-right-4 w-28 sm:w-32 rounded-xl bg-slate-900 border-2 border-slate-700 shadow-2xl overflow-hidden z-20 animate-float-reverse">
                  <div className="bg-slate-800 py-1 text-center border-b border-slate-700">
                    <div className="w-8 h-1 rounded-full bg-slate-600 mx-auto" />
                  </div>
                  <div className="aspect-[9/16] bg-slate-950 relative">
                    <img
                      src={APP_IMAGES.portfolioEcommerce}
                      alt="Mobile Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* 4. Floating 98% PageSpeed Performance Circle Badge */}
                <div className="absolute -top-4 -left-3 sm:-left-6 bg-white text-slate-900 rounded-xl p-3 shadow-2xl border border-slate-100 flex items-center gap-2.5 z-30 animate-pulse-ring cursor-default">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-500 bg-emerald-50 flex items-center justify-center font-extrabold text-xs text-emerald-700 shadow-xs">
                    98%
                  </div>
                  <div className="leading-tight">
                    <div className="text-[11px] font-bold text-slate-900">Fast, optimized</div>
                    <div className="text-[9px] font-medium text-slate-500">Core Web Vitals</div>
                  </div>
                </div>

                {/* 5. Interactive Floating Workflow Pill Switcher */}
                <div className="hidden sm:block absolute top-8 -right-4 bg-slate-900/95 backdrop-blur-md text-white rounded-xl p-3 shadow-2xl border border-slate-700/80 z-20 space-y-1.5 text-[11px]">
                  {workflowSteps.map((step, idx) => (
                    <div
                      key={step.label}
                      onClick={() => setActiveWorkflowIndex(idx)}
                      className={`flex items-center gap-2 px-2 py-1 rounded transition cursor-pointer ${
                        activeWorkflowIndex === idx
                          ? 'bg-blue-600/30 text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${step.color}`} />
                      <span>{step.label}</span>
                      {activeWorkflowIndex === idx && (
                        <span className="text-[9px] text-cyan-300 font-mono ml-auto">Active</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Fluid Wave Divider flowing from Hero into Trust Strip */}
      <FluidWave fillColor="#F8FAFC" bgColor="#07172F" variant="bottom" />

      {/* 2. TRUST / CREDIBILITY STRIP: FULL-WIDTH EDGE-TO-EDGE BAND */}
      <div className="w-full bg-[#F8FAFC] py-8 border-b border-slate-200/80">
        <div className="w-full max-w-[1536px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* 1. Custom Built */}
            <div className="group flex items-start gap-3.5 transition-transform hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#EAF4FF] to-blue-100 flex items-center justify-center text-[#0875E1] shrink-0 mt-0.5 group-hover:bg-[#0875E1] group-hover:text-white transition-all shadow-xs group-hover:shadow-md group-hover:shadow-blue-500/20">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1F3A] tracking-tight flex items-center gap-1.5">
                  <span>Custom Built</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Every project designed around your business.
                </p>
              </div>
            </div>

            {/* 2. Responsive */}
            <div className="group flex items-start gap-3.5 transition-transform hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#EAF4FF] to-blue-100 flex items-center justify-center text-[#0875E1] shrink-0 mt-0.5 group-hover:bg-[#0875E1] group-hover:text-white transition-all shadow-xs group-hover:shadow-md group-hover:shadow-blue-500/20">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1F3A] tracking-tight flex items-center gap-1.5">
                  <span>Responsive</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0875E1] group-hover:scale-125 transition-transform" />
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Fluidly optimized across all devices.
                </p>
              </div>
            </div>

            {/* 3. Performance Focused */}
            <div className="group flex items-start gap-3.5 transition-transform hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#EAF4FF] to-blue-100 flex items-center justify-center text-[#0875E1] shrink-0 mt-0.5 group-hover:bg-[#0875E1] group-hover:text-white transition-all shadow-xs group-hover:shadow-md group-hover:shadow-blue-500/20">
                <Gauge className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1F3A] tracking-tight flex items-center gap-1.5">
                  <span>Performance</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Fast, efficient, and 98% Core Web Vitals.
                </p>
              </div>
            </div>

            {/* 4. SEO Ready */}
            <div className="group flex items-start gap-3.5 transition-transform hover:-translate-y-1">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#EAF4FF] to-blue-100 flex items-center justify-center text-[#0875E1] shrink-0 mt-0.5 group-hover:bg-[#0875E1] group-hover:text-white transition-all shadow-xs group-hover:shadow-md group-hover:shadow-blue-500/20">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1F3A] tracking-tight flex items-center gap-1.5">
                  <span>SEO Ready</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-snug">
                  Search-friendly semantic architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
