import React from 'react';

export const UserAvatar = ({ size = 'md', className = '' }) => {
  const sizePx = {
    sm: 32,
    md: 36,
    lg: 44,
    xl: 64,
  }[size] || 36;

  return (
    <svg
      width={sizePx}
      height={sizePx}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full shadow-xs cursor-pointer hover:opacity-90 transition-opacity ${className}`}
    >
      {/* Dark Slate Gray Circular Background */}
      <circle cx="50" cy="50" r="50" fill="#94a3b8" />

      {/* Light Head Circle */}
      <circle cx="50" cy="40" r="16" fill="#f8fafc" />

      {/* Light Shoulder Body Arc */}
      <path
        d="M20 82 C20 64 34 60 50 60 C66 60 80 64 80 82 C72 92 62 96 50 96 C38 96 28 92 20 82 Z"
        fill="#f8fafc"
      />

      {/* Thin Subtle Border */}
      <circle cx="50" cy="50" r="48.5" stroke="#cbd5e1" strokeWidth="3" fill="none" />
    </svg>
  );
};
