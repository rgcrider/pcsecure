import React from 'react';

// Layered Organic Fluid Wave (Pointing Downwards or Upwards)
export const FluidWave: React.FC<{
  fillColor?: string;
  bgColor?: string;
  variant?: 'top' | 'bottom';
  className?: string;
  hasMultiLayer?: boolean;
}> = ({
  fillColor = '#F6F9FC',
  bgColor = 'transparent',
  variant = 'bottom',
  className = '',
  hasMultiLayer = true,
}) => {
  const isTop = variant === 'top';

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full block ${isTop ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
        style={{ height: '54px' }}
      >
        {hasMultiLayer && (
          <path
            d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,58.7C672,64,768,96,864,96C960,96,1056,64,1152,53.3C1248,43,1344,53,1392,58.7L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            fill={fillColor}
            fillOpacity="0.4"
          />
        )}
        <path
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

// Deep Curved Scoop / Concave Arc
export const CurvedScoop: React.FC<{
  fillColor?: string;
  direction?: 'down' | 'up';
  className?: string;
}> = ({ fillColor = '#FFFFFF', direction = 'down', className = '' }) => {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full block ${direction === 'up' ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
        style={{ height: '40px' }}
      >
        <path
          d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

// Slanted / Diagonal Polygon Cut
export const DiagonalCut: React.FC<{
  fillColor?: string;
  reverse?: boolean;
  className?: string;
}> = ({ fillColor = '#07172F', reverse = false, className = '' }) => {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 1440 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        preserveAspectRatio="none"
        style={{ height: '36px' }}
      >
        {reverse ? (
          <polygon points="0,50 1440,0 1440,50" fill={fillColor} />
        ) : (
          <polygon points="0,0 1440,50 0,50" fill={fillColor} />
        )}
      </svg>
    </div>
  );
};

// Rounded Arch Dome Top / Bottom Divider
export const RoundedArchDivider: React.FC<{
  fillColor?: string;
  bgColor?: string;
  variant?: 'top' | 'bottom';
  className?: string;
}> = ({
  fillColor = '#FFFFFF',
  bgColor = 'transparent',
  variant = 'bottom',
  className = '',
}) => {
  const isTop = variant === 'top';

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      <svg
        viewBox="0 0 1440 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full block ${isTop ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
        style={{ height: '50px' }}
      >
        <path
          d="M0,0 C360,85 1080,85 1440,0 L1440,90 L0,90 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

// Asymmetrical S-Curve Wave with floating bubble node
export const SCurveWave: React.FC<{
  fillColor?: string;
  accentColor?: string;
  variant?: 'top' | 'bottom';
  className?: string;
}> = ({
  fillColor = '#07172F',
  accentColor = '#0875E1',
  variant = 'bottom',
  className = '',
}) => {
  const isTop = variant === 'top';

  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full block ${isTop ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
        style={{ height: '56px' }}
      >
        {/* Soft Accent Sub-wave */}
        <path
          d="M0,45 C320,95 720,10 1100,75 C1240,95 1360,80 1440,65 L1440,100 L0,100 Z"
          fill={accentColor}
          fillOpacity="0.25"
        />
        {/* Main Solid S-Wave */}
        <path
          d="M0,30 C340,85 700,5 1080,60 C1250,85 1370,70 1440,50 L1440,100 L0,100 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

// Rounded Stadium Pill Bridge Divider
export const StadiumPillBridge: React.FC<{
  label?: string;
  pillColor?: string;
  lineColor?: string;
  className?: string;
}> = ({
  label = 'SYSTEM ARCHITECTURE',
  pillColor = '#0875E1',
  lineColor = '#E2E8F0',
  className = '',
}) => {
  return (
    <div className={`w-full flex items-center justify-center relative py-4 select-none ${className}`}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-slate-200" style={{ borderColor: lineColor }} />
      </div>
      <div className="relative flex justify-center">
        <span
          className="px-5 py-2 rounded-full text-[11px] font-mono font-bold tracking-widest uppercase text-white shadow-md flex items-center gap-2"
          style={{ backgroundColor: pillColor }}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
          <span>{label}</span>
        </span>
      </div>
    </div>
  );
};

// Ropeway Cable Line with Pulley Wheels & Tension Cables
export const RopewayCableDivider: React.FC<{
  variant?: 'light' | 'dark';
  className?: string;
}> = ({ variant = 'dark', className = '' }) => {
  const isDark = variant === 'dark';
  const cableColor = isDark ? '#00D2FF' : '#0875E1';
  const subCable = isDark ? '#334155' : '#CBD5E1';

  return (
    <div className={`w-full relative overflow-hidden py-3 pointer-events-none select-none ${className}`}>
      {/* Upper Main Cable */}
      <svg
        viewBox="0 0 1440 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        preserveAspectRatio="none"
        style={{ height: '42px' }}
      >
        {/* Support Steel Guide Wire */}
        <path
          d="M0,25 Q360,45 720,25 T1440,25"
          stroke={subCable}
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Main Tension Cable (Catenary curve) */}
        <path
          d="M0,20 Q360,48 720,22 T1440,20"
          stroke={cableColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Pylon / Cableway Pulley Points along the route */}
        {[180, 540, 900, 1260].map((x, i) => (
          <g key={i}>
            {/* Hanging Cable clamp */}
            <circle cx={x} cy={30} r="4" fill={isDark ? '#FFFFFF' : '#07172F'} />
            <circle cx={x} cy={30} r="2" fill={cableColor} />
            <line x1={x} y1="30" x2={x} y2="46" stroke={cableColor} strokeWidth="1.8" />
            {/* Small Gondola Carriage Node */}
            <rect
              x={x - 8}
              y="46"
              width="16"
              height="10"
              rx="2.5"
              fill={isDark ? '#081735' : '#FFFFFF'}
              stroke={cableColor}
              strokeWidth="1.2"
            />
            {/* Carriage Window */}
            <circle cx={x - 3} cy="51" r="1.5" fill={cableColor} />
            <circle cx={x + 3} cy="51" r="1.5" fill={cableColor} />
          </g>
        ))}
      </svg>
    </div>
  );
};

// Organic Bubble Wave Divider with Rounded Mound Undulations
export const BubbleWaveDivider: React.FC<{
  fillColor?: string;
  variant?: 'top' | 'bottom';
  className?: string;
}> = ({ fillColor = '#F6F9FC', variant = 'bottom', className = '' }) => {
  const isTop = variant === 'top';
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full block ${isTop ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
        style={{ height: '48px' }}
      >
        <path
          d="M0,40 C120,70 240,20 360,45 C480,70 600,25 720,50 C840,75 960,30 1080,55 C1200,80 1320,35 1440,50 L1440,80 L0,80 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
