import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark'; // 'light' means on light background, 'dark' on dark background
  variant?: 'light' | 'dark'; // backwards compatibility
  showTagline?: boolean;
  showSubtitle?: boolean;
  layout?: 'horizontal' | 'stacked';
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  theme,
  variant,
  showTagline = false,
  showSubtitle = false,
  layout = 'horizontal',
  className = '',
  onClick,
}) => {
  const isDarkBg = theme === 'dark' || variant === 'dark';

  const iconSizes = {
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-[26px]',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  };

  const taglineSizes = {
    sm: 'text-[7px]',
    md: 'text-[9px]',
    lg: 'text-[11px]',
    xl: 'text-xs',
  };

  // Official PCSecure Emblem: Shield with Computer Monitor (PC) & Overlapping Padlock
  const Emblem = (
    <div
      className={`${iconSizes[size]} shrink-0 relative transition-transform duration-200 group-hover:scale-105`}
    >
      <svg
        viewBox="0 0 160 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs"
        aria-hidden="true"
      >
        <defs>
          {/* Dual-tone shield gradients */}
          <linearGradient id="shieldRightGrad" x1="50%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A3FF" />
            <stop offset="60%" stopColor="#0073E6" />
            <stop offset="100%" stopColor="#0050B3" />
          </linearGradient>
          <linearGradient id="padlockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0088FF" />
            <stop offset="100%" stopColor="#005ECC" />
          </linearGradient>
          <linearGradient id="cLetterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A3FF" />
            <stop offset="100%" stopColor="#0073E6" />
          </linearGradient>
        </defs>

        {/* 1. Shield Outer Crest Border */}
        {/* Left Half (Dark Navy) */}
        <path
          d="M80 6L38 24V74C38 108 55 138 80 152V6Z"
          fill="#081735"
        />
        {/* Right Half (Bright Royal Blue) */}
        <path
          d="M80 6L122 24V74C122 108 105 138 80 152V6Z"
          fill="url(#shieldRightGrad)"
        />

        {/* Shield Inner Cutout (Light background for screen clarity) */}
        <path
          d="M80 16L46 31V74C46 102 60 128 80 140C100 128 114 102 114 74V31L80 16Z"
          fill={isDarkBg ? '#07172F' : '#FFFFFF'}
        />

        {/* 2. Stylized "P" (Navy Left) */}
        <path
          d="M52 38H76C81.5 38 86 42.5 86 48C86 53.5 81.5 58 76 58H60V76H52V38Z"
          fill="#081735"
        />
        {/* P Inner Counter Hole */}
        <path
          d="M60 45H75C76.7 45 78 46.3 78 48C78 49.7 76.7 51 75 51H60V45Z"
          fill={isDarkBg ? '#07172F' : '#FFFFFF'}
        />

        {/* 3. Stylized "C" (Royal Blue Right) */}
        <path
          d="M108 45H90C87.8 45 86 46.8 86 49V65C86 67.2 87.8 69 90 69H108V61H94V53H108V45Z"
          fill="url(#cLetterGrad)"
        />

        {/* 4. Desktop Computer Monitor Frame & Stand */}
        {/* Monitor Bottom Bezel Bar */}
        <path
          d="M48 78H112C113.1 78 114 78.9 114 80C114 83 111 86 106 86H54C49 86 46 83 46 80C46 78.9 46.9 78 48 78Z"
          fill="#081735"
        />
        {/* Monitor Neck */}
        <rect x="74" y="86" width="12" height="9" fill="#081735" />
        {/* Monitor Base Plate */}
        <path
          d="M66 95H94L98 99H62L66 95Z"
          fill="#081735"
        />

        {/* 5. Blue Padlock with White Keyhole (Bottom Right Overlap) */}
        {/* Padlock Shackle */}
        <path
          d="M107 72V63C107 57.5 111.5 53 117 53C122.5 53 127 57.5 127 63V72H122V63C122 60.2 119.8 58 117 58C114.2 58 112 60.2 112 63V72H107Z"
          fill="#081735"
        />
        {/* Padlock Body */}
        <rect
          x="102"
          y="72"
          width="30"
          height="28"
          rx="5"
          fill="url(#padlockGrad)"
          stroke="#005ECC"
          strokeWidth="1.5"
        />
        {/* White Keyhole */}
        <circle cx="117" cy="83" r="3.2" fill="#FFFFFF" />
        <path
          d="M115.5 84.5L114.8 91H119.2L118.5 84.5C118 84.8 117.5 85 117 85C116.5 85 116 84.8 115.5 84.5Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );

  return (
    <div
      onClick={onClick}
      className={`inline-flex ${
        layout === 'stacked' ? 'flex-col items-center text-center' : 'items-center'
      } gap-2.5 sm:gap-3.5 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      aria-label="PCSecure Home"
    >
      {/* Official Shield + PC Monitor + Padlock Emblem */}
      {Emblem}

      {/* Wordmark and Tagline */}
      <div className={`flex flex-col ${layout === 'stacked' ? 'items-center' : ''} leading-none`}>
        {/* "PC" (Navy) + "Secure" (Royal Blue) */}
        <div className="flex items-baseline tracking-tight font-extrabold">
          <span
            className={`${textSizes[size]} ${
              isDarkBg ? 'text-white' : 'text-[#081735]'
            } font-black tracking-tighter`}
          >
            PC
          </span>
          <span
            className={`${textSizes[size]} text-[#0073E6] font-extrabold tracking-tight ml-0.5`}
          >
            Secure
          </span>
        </div>

        {/* Subtitle / Tagline: "— PROTECTING WHAT MATTERS —" or "Web Design & Development" */}
        {(showTagline || showSubtitle) && (
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`h-[1px] w-3.5 ${
                isDarkBg ? 'bg-cyan-400/60' : 'bg-[#0073E6]'
              }`}
            />
            <span
              className={`${taglineSizes[size]} font-bold tracking-[0.18em] uppercase ${
                isDarkBg ? 'text-slate-300' : 'text-[#081735]'
              }`}
            >
              {showTagline ? 'PROTECTING WHAT MATTERS' : 'Web Design & Development'}
            </span>
            <span
              className={`h-[1px] w-3.5 ${
                isDarkBg ? 'bg-cyan-400/60' : 'bg-[#0073E6]'
              }`}
            />
          </div>
        )}
      </div>
    </div>
  );
};
