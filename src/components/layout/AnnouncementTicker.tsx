import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';

export const AnnouncementTicker: React.FC = () => {
  const { days, hours, minutes } = useCountdown();

  return (
    <aside className="relative z-50 bg-[#060e22]/95 backdrop-blur-md border-b border-slate-800/80 text-xs sm:text-sm font-medium py-2 px-4 text-center transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-slate-300">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-semibold border border-amber-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          Group &amp; Referral Special
        </span>

        <span className="font-normal text-slate-300 text-xs sm:text-sm">
          5+ learners receive the Tech Innovator Add-on (AI Tools) for{' '}
          <strong className="text-white font-semibold">₹1,000/mo</strong> per student!{' '}
          <span className="text-amber-300 font-semibold">Ends November 15th.</span>
        </span>

        <div className="hidden md:inline-flex items-center gap-1 font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded text-[11px] border border-cyan-500/20 shadow-sm">
          <span>⏳</span>
          <span>{days}</span>d <span>{hours}</span>h <span>{minutes}</span>m left
        </div>

        <a
          href="#group-offer"
          className="inline-flex items-center text-cyan-400 hover:text-cyan-300 underline font-semibold text-xs sm:text-sm transition-colors decoration-cyan-500/40 ml-1"
        >
          Details &rarr;
        </a>
      </div>
    </aside>
  );
};
