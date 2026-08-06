import React from 'react';
import './StatCard.css';

export const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendType = 'positive',
  colorBg = 'bg-emerald-50 text-emerald-700',
}) => {
  return (
    <div className="stat-card flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        {trend && (
          <span
            className={`inline-block text-[11px] font-semibold mt-1.5 px-1.5 py-0.5 rounded ${
              trendType === 'positive'
                ? 'bg-emerald-100 text-emerald-800'
                : trendType === 'negative'
                ? 'bg-rose-100 text-rose-800'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <div className={`stat-icon-wrapper ${colorBg}`}>
        {icon}
      </div>
    </div>
  );
};
