import React from 'react';
import { BrandLogo } from '../ui/BrandLogo';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-cyan-500/15 transition-all duration-200 shadow-xl shadow-[#050b18]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#"
          className="inline-flex items-center group flex-shrink-0 transition-opacity hover:opacity-95"
          title="NeoByte Builders - The Next-Gen Learning Hub"
        >
          <BrandLogo size="md" />
        </a>

        {/* Right Header Action (Clean NeoByte + Book Demo Only) */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="#book-demo"
            className="relative inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
          >
            <span>Book Free Demo</span>
          </a>
        </div>
      </div>
    </header>
  );
};
