import React from 'react';

export const RuralSyncLogo = ({
  className = '',
  showText = true,
  size = 'md',
}) => {
  const dimensions = {
    sm: { icon: 28, text: 'text-base' },
    md: { icon: 38, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
    xl: { icon: 64, text: 'text-3xl' },
  }[size] || { icon: 38, text: 'text-xl' };

  const iconSize = dimensions.icon;

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* SVG Icon matching the user's logo design */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 drop-shadow-xs"
      >
        <defs>
          {/* Ring Gradient */}
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          {/* Leaf Gradient */}
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          {/* House Gradient */}
          <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          {/* Door Gold Gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Outer Circular Sync Network Ring */}
        <circle
          cx="50"
          cy="50"
          r="38"
          stroke="url(#ringGradient)"
          strokeWidth="5"
          fill="none"
        />

        {/* Network Node Dots on Ring */}
        {/* Top Node */}
        <circle cx="50" cy="12" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
        {/* Top Right Node */}
        <circle cx="83" cy="27" r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
        {/* Bottom Right Node */}
        <circle cx="85" cy="65" r="4.5" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
        {/* Bottom Left Node */}
        <circle cx="15" cy="65" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
        {/* Top Left Node */}
        <circle cx="17" cy="27" r="4.5" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />

        {/* 3 Green Tree Leaves Sprouting from Roof */}
        {/* Center Main Leaf */}
        <path
          d="M50 20 C42 32 44 48 50 56 C56 48 58 32 50 20 Z"
          fill="url(#leafGradient)"
        />
        <path d="M50 24 V52" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

        {/* Left Side Leaf */}
        <path
          d="M32 32 C26 42 34 52 44 54 C40 44 36 36 32 32 Z"
          fill="url(#leafGradient)"
        />
        <path d="M34 35 Q40 44 42 51" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

        {/* Right Side Leaf */}
        <path
          d="M68 32 C74 42 66 52 56 54 C60 44 64 36 68 32 Z"
          fill="url(#leafGradient)"
        />
        <path d="M66 35 Q60 44 58 51" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

        {/* Blue House Body */}
        <path
          d="M50 44 L26 62 V84 H74 V62 Z"
          fill="url(#houseGradient)"
          rx="2"
        />

        {/* Golden Doorway */}
        <path
          d="M43 84 V70 C43 66 57 66 57 70 V84 Z"
          fill="url(#goldGradient)"
        />

        {/* Base Green Lawn Foundation */}
        <path
          d="M12 85 Q50 92 88 85 V88 Q50 95 12 88 Z"
          fill="#10b981"
        />
      </svg>

      {/* RuralSync Text Typography */}
      {showText && (
        <span className={`font-extrabold tracking-tight ${dimensions.text} text-slate-900 leading-none`}>
          Rural<span className="text-blue-600">Sync</span>
        </span>
      )}
    </div>
  );
};
