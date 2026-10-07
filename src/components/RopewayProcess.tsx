import React, { useState } from 'react';
import {
  Search,
  FileText,
  Palette,
  Code2,
  CheckCircle2,
  Zap,
  LifeBuoy,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Compass,
  ArrowRight,
} from 'lucide-react';

export const RopewayProcess: React.FC = () => {
  const [activeStation, setActiveStation] = useState(2); // Default to Station 03: Design

  const stations = [
    {
      num: '01',
      title: 'Discover',
      tagline: 'Basecamp Kickoff',
      altitude: 'Elevation 300m',
      desc: 'Understand business goals, target audience, and system requirements.',
      icon: Search,
      timeframe: '2 - 4 Days',
      deliverables: [
        'Client Vision & Objective Alignment',
        'Competitive Landscape & Audience Audit',
        'Technical Requirements & Tech Stack Spec',
      ],
      checkpoint: 'Discovery Blueprint Document Sign-Off',
      cablePercent: 6, // 6% from left
    },
    {
      num: '02',
      title: 'Strategy',
      tagline: 'Path Blueprinting',
      altitude: 'Elevation 750m',
      desc: 'Plan information architecture, user journeys, and wireframe flows.',
      icon: FileText,
      timeframe: '3 - 5 Days',
      deliverables: [
        'Full Sitemap & Information Architecture',
        'Conversion Funnel & Navigation Blueprints',
        'API & CMS Integration Strategy',
      ],
      checkpoint: 'Information Architecture Approval',
      cablePercent: 21,
    },
    {
      num: '03',
      title: 'Design',
      tagline: 'Visual Studio',
      altitude: 'Elevation 1,250m',
      desc: 'Create wireframes, production Figma tokens, and luxury visual UI.',
      icon: Palette,
      timeframe: '5 - 8 Days',
      deliverables: [
        'Figma Design System with 8pt Spatial Tokens',
        'High-Fidelity Interactive Prototypes',
        'Mobile, Tablet & Desktop Responsive Screens',
      ],
      checkpoint: 'Pixel-Perfect Visual Design Sign-Off',
      cablePercent: 36,
    },
    {
      num: '04',
      title: 'Develop',
      tagline: 'Engineering Tower',
      altitude: 'Elevation 1,800m',
      desc: 'Build clean Next.js, React, and strict TypeScript code with high performance.',
      icon: Code2,
      timeframe: '7 - 14 Days',
      deliverables: [
        'Clean Next.js & TypeScript Codebase',
        'Sub-second Server-Side Hydration',
        'Stripe Checkout & Custom CMS Connections',
      ],
      checkpoint: 'Private Staging Server Walkthrough',
      cablePercent: 51,
    },
    {
      num: '05',
      title: 'Test',
      tagline: 'QA & Rigor Pylon',
      altitude: 'Elevation 2,300m',
      desc: 'Stress test cross-device fluidity, accessibility, and 95+ Core Web Vitals.',
      icon: CheckCircle2,
      timeframe: '3 - 5 Days',
      deliverables: [
        '120-Point Accessibility & WCAG 2.1 Audit',
        'Omni-Device Matrix Verification',
        'Google PageSpeed 95+ Score Guarantee',
      ],
      checkpoint: 'Pre-Flight Production Verification',
      cablePercent: 66,
    },
    {
      num: '06',
      title: 'Launch',
      tagline: 'Peak Deployment',
      altitude: 'Elevation 2,900m',
      desc: 'Deploy to global edge CDN with zero downtime and final validation.',
      icon: Zap,
      timeframe: '1 - 2 Days',
      deliverables: [
        'Global Edge DNS & SSL Propagation',
        'Automated Backup & Failover Routing',
        'Google Search Console & Analytics Live Hookup',
      ],
      checkpoint: '100% Live Production Handover',
      cablePercent: 81,
    },
    {
      num: '07',
      title: 'Support',
      tagline: 'Stratosphere Care',
      altitude: 'Continuous Orbit',
      desc: 'Continuous uptime monitoring, security patching, and growth updates.',
      icon: LifeBuoy,
      timeframe: 'Ongoing SLA',
      deliverables: [
        '24/7 Core Web Vitals & Uptime Guard',
        'Security Patches & CMS Content Maintenance',
        'Quarterly Conversion Rate Optimization (CRO)',
      ],
      checkpoint: 'Guaranteed 60-Day SLA Protection',
      cablePercent: 95,
    },
  ];

  const current = stations[activeStation];

  return (
    <section
      id="ropeway-process"
      className="relative bg-[#07172F] text-white pt-16 pb-24 overflow-hidden border-y border-slate-800"
    >
      {/* Background Mountain Silhouettes & Atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg
          viewBox="0 0 1440 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-auto"
          preserveAspectRatio="none"
        >
          {/* Distant Mountain Peak Layer */}
          <path
            d="M0,280 L200,160 L420,320 L680,110 L940,290 L1200,140 L1440,260 L1440,400 L0,400 Z"
            fill="#0B2347"
          />
          {/* Closer Ridge Layer */}
          <path
            d="M0,320 L280,210 L560,350 L840,190 L1120,330 L1440,220 L1440,400 L0,400 Z"
            fill="#0F2D5C"
            fillOpacity="0.7"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest shadow-md">
            <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
            <span>THE PCSECURE ROPEWAY METHODOLOGY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            From Basecamp Idea to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#0875E1]">
              Peak Production.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Our projects travel along a continuous suspended cableway: every milestone is an engineered station with certified quality gates. Click any station or track the gondola below.
          </p>
        </div>

        {/* 1. INTERACTIVE SUSPENDED ROPEWAY TRACK WITH MOVING GONDOLA */}
        <div className="relative pt-12 pb-6">
          {/* Main Continuous Hanging Steel Cable Line (Wavy Catenary Path) */}
          <div className="relative w-full h-24 hidden md:block">
            <svg
              viewBox="0 0 1000 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="cableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D2FF" />
                  <stop offset="50%" stopColor="#0875E1" />
                  <stop offset="100%" stopColor="#00E5FF" />
                </linearGradient>
                <filter id="cableGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00D2FF" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Auxiliary Guide Cable (Top) */}
              <path
                d="M 50,30 Q 200,45 350,28 T 650,32 T 950,25"
                stroke="#334155"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Main Carrying Cable Line */}
              <path
                d="M 50,35 Q 200,55 350,33 T 650,38 T 950,28"
                stroke="url(#cableGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                filter="url(#cableGlow)"
              />

              {/* Ropeway Support Towers / Pylons with Wheel Pulleys at key intervals */}
              {[60, 210, 360, 510, 660, 810, 950].map((cx, idx) => (
                <g key={idx} className="cursor-pointer" onClick={() => setActiveStation(idx)}>
                  {/* Tower Pole down to base */}
                  <line x1={cx} y1={36} x2={cx} y2={78} stroke="#1E293B" strokeWidth="3" />
                  <line x1={cx - 5} y1={78} x2={cx + 5} y2={78} stroke="#00D2FF" strokeWidth="2" />
                  {/* Pulley Wheel */}
                  <circle cx={cx} cy={35} r="6" fill="#07172F" stroke="#00D2FF" strokeWidth="2" />
                  <circle cx={cx} cy={35} r="2" fill="#FFFFFF" />
                </g>
              ))}
            </svg>

            {/* INTERACTIVE MOVING GONDOLA / CABLE CAR (Follows active station) */}
            <div
              className="absolute top-2 transition-all duration-700 ease-out -translate-x-1/2 pointer-events-none z-30"
              style={{ left: `${current.cablePercent}%` }}
            >
              <div className="flex flex-col items-center">
                {/* Cable Hanger arm with pulley clasp */}
                <div className="w-1.5 h-6 bg-cyan-400 rounded-t-sm shadow-md" />
                {/* Gondola Cabin */}
                <div className="relative w-14 h-11 rounded-lg bg-gradient-to-b from-[#0875E1] to-[#052b57] border-2 border-cyan-400 shadow-xl shadow-cyan-500/30 flex flex-col items-center justify-between p-1">
                  <div className="w-full flex items-center justify-between px-1">
                    <span className="w-1 h-1 rounded-full bg-cyan-300 animate-ping" />
                    <span className="text-[7px] font-mono font-black text-white">PCS-CABIN</span>
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  </div>
                  {/* Cabin Windows */}
                  <div className="w-full grid grid-cols-2 gap-1 px-1">
                    <div className="h-3 rounded-xs bg-cyan-200/80 border border-cyan-300" />
                    <div className="h-3 rounded-xs bg-cyan-200/80 border border-cyan-300" />
                  </div>
                  <div className="text-[7px] font-extrabold text-cyan-200 tracking-tighter">
                    PASSENGER: {current.num}
                  </div>
                </div>
                {/* Station Pointer Tag */}
                <div className="mt-1 px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[9px] font-mono font-bold tracking-wider uppercase shadow-md">
                  Active Station {current.num}
                </div>
              </div>
            </div>
          </div>

          {/* 2. STATIONS HORIZONTAL SEQUENCE CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 pt-4">
            {stations.map((st, idx) => {
              const Icon = st.icon;
              const isSelected = activeStation === idx;
              return (
                <div
                  key={st.num}
                  onClick={() => setActiveStation(idx)}
                  className={`relative rounded-2xl p-3 sm:p-4 text-center cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-2 border ${
                    isSelected
                      ? 'bg-gradient-to-b from-slate-900 to-[#0B254D] border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-400/40 scale-105 z-20'
                      : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  {/* Station Number & Altitude Chip */}
                  <div className="flex items-center justify-between text-[9px] font-mono">
                    <span
                      className={`font-black px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {st.num}
                    </span>
                    <span className="text-slate-400 hidden sm:inline">{st.timeframe}</span>
                  </div>

                  {/* Icon Node */}
                  <div className="mx-auto my-1">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/30'
                          : 'bg-slate-800 text-slate-300 group-hover:text-cyan-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                      {st.title}
                    </h3>
                    <p className="text-[10px] text-cyan-400 font-mono mt-0.5">
                      {st.tagline}
                    </p>
                  </div>

                  {/* Station Cable Indicator Dot */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-1 text-[9px] text-slate-400 font-mono">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'
                      }`}
                    />
                    <span>{st.altitude}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. EXPANDED ROPEWAY STATION INSPECTOR DOSSIER */}
        <div className="rounded-3xl bg-slate-900/95 border-2 border-slate-800/90 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Subtle decorative glow corner */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Header info for active station */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0875E1] to-cyan-400 text-slate-950 flex items-center justify-center font-extrabold text-xl shadow-lg shadow-cyan-500/20 shrink-0">
                  {current.num}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-cyan-300 font-bold tracking-widest uppercase">
                      STATION CHECKPOINT
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      {current.altitude}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Phase {current.num}: {current.title} — {current.tagline}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                  Duration: <span className="text-cyan-300 font-bold">{current.timeframe}</span>
                </div>
                <button
                  onClick={() => setActiveStation((prev) => (prev + 1) % stations.length)}
                  className="px-4 py-2 rounded-xl bg-[#0875E1] hover:bg-[#0766c5] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <span>Next Station</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Description & Tangible Deliverables Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Description & Milestone Sign-Off (Span 5) */}
              <div className="lg:col-span-5 space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {current.desc}
                </p>

                {/* Milestone Sign-off Card */}
                <div className="rounded-2xl bg-slate-950 p-5 border border-slate-800 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Client Approval Checkpoint</span>
                  </div>
                  <div className="text-sm font-bold text-cyan-300">
                    {current.checkpoint}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The cable car never departs to the next altitude until you review, approve, and sign off on this milestone.
                  </p>
                </div>
              </div>

              {/* Right Column: Tangible Deliverables List (Span 7) */}
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  Station Tangible Deliverables &amp; Artifacts
                </span>

                <div className="space-y-2.5">
                  {current.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-3.5 text-xs sm:text-sm text-slate-200"
                    >
                      <div className="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                        {i + 1}
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
