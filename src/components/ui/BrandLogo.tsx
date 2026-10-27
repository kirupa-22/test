import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md' }) => {
  const [hasError, setHasError] = useState(false);

  const imgHeightClass = {
    sm: 'h-9 sm:h-10',
    md: 'h-10 sm:h-12 lg:h-14',
    lg: 'h-12 sm:h-14 lg:h-16'
  }[size];

  if (hasError) {
    return (
      <div className="flex items-center gap-3 select-none">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-orange-500 p-0.5 shadow-lg">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-display font-black text-cyan-300 text-sm sm:text-base">
            NB
          </div>
        </div>
        <div>
          <div className="font-display font-black text-base sm:text-lg tracking-tight text-white leading-tight">
            NEOBYTE <span className="text-cyan-400">BUILDERS</span>
          </div>
          <p className="text-[9px] text-slate-300 font-semibold tracking-wider uppercase">
            The Next-Gen Learning Hub
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center">
      <img
        src="/assets/aistudio/image__4__699d1faf.png"
        alt="NeoByte Builders - The Next-Gen Learning Hub"
        className={`${imgHeightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-102 drop-shadow-[0_0_20px_rgba(34,211,238,0.22)]`}
        onError={() => setHasError(true)}
      />
    </div>
  );
};
