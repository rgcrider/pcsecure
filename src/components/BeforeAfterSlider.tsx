import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, ArrowRight, Gauge, CheckCircle2, AlertTriangle } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleInteractionStart = () => setIsDragging(true);
  const handleInteractionEnd = () => setIsDragging(false);

  return (
    <div className="space-y-4">
      {/* Quick Comparison Presets Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-semibold">Preset Views:</span>
          <button
            onClick={() => setSliderPosition(15)}
            className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
              sliderPosition < 30
                ? 'bg-[#0875E1] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Show Modern Redesign
          </button>
          <button
            onClick={() => setSliderPosition(50)}
            className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
              sliderPosition >= 30 && sliderPosition <= 70
                ? 'bg-[#0875E1] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Split 50 / 50
          </button>
          <button
            onClick={() => setSliderPosition(85)}
            className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
              sliderPosition > 70
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Show Legacy Site
          </button>
        </div>

        <div className="text-[11px] text-slate-500 font-mono hidden sm:block">
          Split Position: <span className="font-bold text-[#0875E1]">{Math.round(sliderPosition)}%</span>
        </div>
      </div>

      {/* Main Draggable Comparison Stage */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900 select-none">
        <div
          ref={containerRef}
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden cursor-ew-resize"
          onMouseDown={handleInteractionStart}
          onMouseUp={handleInteractionEnd}
          onMouseLeave={handleInteractionEnd}
          onMouseMove={handleMouseMove}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onTouchMove={handleTouchMove}
          onClick={(e) => handleMove(e.clientX)}
        >
          {/* RIGHT LAYER: MODERN AFTER (PCSecure Redesign) */}
          <div className="absolute inset-0 w-full h-full bg-[#07172F]">
            <img
              src="/src/assets/images/hero_web_design_1790447403727.jpg"
              alt="Modern PCSecure Website Redesign"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Overlay elements showing modern design */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />
            <div className="absolute top-4 right-4 bg-[#0875E1] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-lg shadow-md tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AFTER (PCSECURE)</span>
            </div>

            <div className="absolute bottom-6 right-6 text-right text-white max-w-sm space-y-2">
              <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest block">
                Modern PCSecure Architecture
              </span>
              <h4 className="text-base sm:text-xl font-extrabold leading-tight">
                Innovative Solutions for a Brighter Future
              </h4>
              <div className="flex items-center justify-end gap-2 pt-1">
                <span className="text-[11px] bg-emerald-500/30 text-emerald-300 border border-emerald-400/50 px-2.5 py-1 rounded-lg font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Lighthouse 99
                </span>
                <span className="text-[11px] bg-blue-500/30 text-blue-300 border border-blue-400/50 px-2.5 py-1 rounded-lg font-mono font-bold">
                  Next.js React Engine
                </span>
              </div>
            </div>
          </div>

          {/* LEFT LAYER: OUTDATED BEFORE (Clipped by slider position) */}
          <div
            className="absolute inset-0 h-full overflow-hidden bg-slate-200 border-r-2 border-white/80"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* Outdated clunky legacy website representation */}
            <div className="w-[1000px] h-full bg-[#E2E8F0] text-slate-700 p-6 flex flex-col justify-between font-serif">
              {/* Clunky vintage header */}
              <div className="border-b-2 border-slate-400 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-slate-800 tracking-tight font-sans">
                    Your Company, Inc.
                  </span>
                  <p className="text-[11px] text-slate-500 font-sans italic">
                    Serving clients since 2004 · Outdated table layout
                  </p>
                </div>
                <div className="flex gap-2 text-xs font-sans text-blue-800 underline">
                  <span>Home</span>
                  <span>About Us</span>
                  <span>Services</span>
                  <span>Contact</span>
                </div>
              </div>

              {/* Vintage content body */}
              <div className="my-auto max-w-md space-y-3 font-sans">
                <div className="inline-flex items-center gap-1 bg-rose-200 text-rose-800 text-[10px] font-mono px-2 py-0.5 rounded border border-rose-300">
                  <AlertTriangle className="w-3 h-3" />
                  Legacy v1.2 — 4.8s Page Load
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 font-serif leading-tight">
                  Welcome to Our Official Website
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Click here to view our PDF catalog. We are updating our servers and website functionality shortly. Please submit forms during regular hours.
                </p>
                <div className="flex gap-2 pt-1">
                  <button className="bg-slate-400 text-slate-900 border border-slate-600 px-3 py-1.5 text-xs font-bold shadow-xs">
                    Submit Form
                  </button>
                  <button className="bg-slate-300 text-slate-700 border border-slate-500 px-3 py-1.5 text-xs">
                    Download PDF
                  </button>
                </div>
              </div>

              {/* Vintage footer */}
              <div className="border-t border-slate-300 pt-2 text-[10px] text-slate-500 font-sans flex justify-between">
                <span>Best viewed in 1024x768 resolution</span>
                <span className="text-rose-700 font-bold">PageSpeed 34/100 · Mobile unresponsive</span>
              </div>
            </div>

            <div className="absolute top-4 left-4 bg-slate-800/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>BEFORE (OUTDATED)</span>
            </div>
          </div>

          {/* DRAGGABLE DIVIDER LINE & HANDLE */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-2xl z-30"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Circular handle */}
            <div className="w-10 h-10 rounded-full bg-white text-[#0875E1] shadow-2xl flex items-center justify-center border-2 border-[#0875E1] transition-transform hover:scale-115 active:scale-95">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M8.5 7L3.5 12L8.5 17V7M15.5 7L20.5 12L15.5 17V7Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Instructional helper below slider */}
        <div className="bg-slate-950 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 border-t border-slate-800">
          <span className="flex items-center gap-1.5 text-slate-300">
            <span>← Drag slider or click preset buttons to compare</span>
          </span>
          <span className="font-semibold text-cyan-400">
            Average +184% Conversion Lift with PCSecure Redesigns
          </span>
        </div>
      </div>
    </div>
  );
};
