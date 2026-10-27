import React from 'react';
import { BrandLogo } from '../ui/BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-cyan-500/15 bg-[#050c1e] py-14 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Footer Brand Logo */}
          <a
            href="#"
            className="inline-flex items-center group transition-opacity hover:opacity-95"
            title="NeoByte Builders - The Next-Gen Learning Hub"
          >
            <BrandLogo size="sm" />
          </a>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300 font-medium">
            <a href="#philosophy" className="hover:text-cyan-400 transition-colors">
              Core Philosophy
            </a>
            <a href="#pathway" className="hover:text-cyan-400 transition-colors">
              Learning Pathway
            </a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">
              Mentorship &amp; Schedule
            </a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">
              FAQs
            </a>
            <a href="#book-demo" className="hover:text-cyan-400 transition-colors">
              Book Free Demo
            </a>
          </div>

          <p className="text-xs text-slate-400 text-center md:text-right leading-relaxed">
            &copy; {new Date().getFullYear()} NeoByte Builders. All rights reserved. <br />
            Weekend Cohorts • 4th Grade to Adult (No Upper Limit)
          </p>
        </div>
      </div>
    </footer>
  );
};
