import React from 'react';
import { RuralSyncLogo } from '../Logo/RuralSyncLogo';
import './Footer.css';

export const Footer = ({ onNavigate }) => {
  return (
    <footer className="site-footer bg-[#0f172a] text-slate-400 py-6 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <RuralSyncLogo size="md" showText={false} />
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight">Rural<span className="text-blue-400">Sync</span></span>
            <p className="text-xs text-slate-300 font-medium mt-0.5">
              Developed by Sanjeev Bhawra • Sardar Beant Singh State University, Gurdaspur
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span>© 2025 RuralSync e-Governance Portal</span>
          <span>•</span>
          <button
            onClick={() => onNavigate('admin')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Admin Portal
          </button>
        </div>
      </div>
    </footer>
  );
};
