import React, { useState } from 'react';
import { useCountdown } from '../../hooks/useCountdown';

interface ScheduleSectionProps {
  onSelectProgram: (programName: string) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onSelectProgram }) => {
  const { days, hours, minutes, seconds } = useCountdown();
  const [referredCount, setReferredCount] = useState<number>(0);

  const isSpecialActive = referredCount >= 5;
  const standardFee = 1500;
  const specialFee = 1000;
  const currentFee = isSpecialActive ? specialFee : standardFee;
  const totalSavings = referredCount * 500;
  const friendsNeeded = Math.max(0, 5 - referredCount);

  return (
    <section
      id="pricing"
      className="py-20 lg:py-28 relative border-t border-cyan-500/15 bg-gradient-to-b from-[#071128]/70 via-[#0a1532]/90 to-[#071128]/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Mentorship Experience &amp; Support
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Dedicated Mentorship Support <br />
            <span className="text-gradient-cyan">&amp; The Tech Innovator Add-on</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4">
            Flexible weekend schedule designed around school life with guaranteed mentor clarity sessions.
          </p>
        </div>

        {/* DUAL CARDS: Mentorship Support & Tech Innovator Add-on */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch max-w-5xl mx-auto">
          {/* CARD 1: Weekend Mentorship Schedule & Guaranteed Clarity */}
          <div className="relative rounded-3xl glass-card p-8 sm:p-10 border border-cyan-500/40 glow-cyan flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Core Foundations
                </span>
                <span className="text-xs text-cyan-300 font-mono font-bold">2 Hours / Weekend</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
                Weekend Cohort Schedule <br />
                <span className="text-lg text-cyan-300 font-medium font-sans">&amp; Clarity Guarantee</span>
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                Every track is conducted in focused weekend sessions designed to fit naturally into school life without
                weekday pressure.
              </p>

              {/* Schedule Box */}
              <div className="p-4 rounded-2xl bg-[#08122c]/90 border border-cyan-500/25 mb-6 space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <polyline points="12 6 12 12 16 14" strokeWidth="2" />
                  </svg>
                  Weekend Cohort Timings:
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#050c1e] border border-slate-800 text-xs">
                  <span className="text-slate-300 font-medium">Saturdays:</span>
                  <span className="font-mono font-semibold text-cyan-300">6:00 PM - 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#050c1e] border border-slate-800 text-xs">
                  <span className="text-slate-300 font-medium">Sundays:</span>
                  <span className="font-mono font-semibold text-cyan-300">10:00 AM - 12:00 PM</span>
                </div>
              </div>

              {/* Clarity Guarantee Highlight */}
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/35 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">Guaranteed Understanding:</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      If your child faces difficulty, we provide a{' '}
                      <strong className="text-cyan-300 underline">free 1-hour extended clarity session</strong> based on
                      mentor availability. Our mentor works closely with your child to review concepts, resolve doubts,
                      and ensure complete confidence before the next weekend.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 font-medium mb-8">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Continuous problem-solving &amp; live coding exercises</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Regular code reviews &amp; mentor feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fortnightly parent progress updates</span>
                </div>
              </div>
            </div>

            <a
              href="#book-demo"
              className="w-full py-3.5 px-6 rounded-xl font-bold text-center text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 transition-colors shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Free Weekend Demo Session</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-950/20 text-slate-950 font-bold">Free</span>
            </a>
          </div>

          {/* CARD 2: The Tech Innovator Add-on (AI Tools) */}
          <div
            id="group-offer"
            className="relative rounded-3xl glass-card p-8 sm:p-10 border-2 border-orange-500/60 glow-orange flex flex-col justify-between shadow-2xl"
          >
            {/* Tag */}
            <div className="absolute -top-1 -right-1">
              <span className="inline-block bg-gradient-to-l from-orange-500 to-amber-500 text-slate-950 font-display font-extrabold text-[11px] uppercase tracking-wider py-1.5 px-4 rounded-bl-xl shadow-md">
                ⭐ AI Tools
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 border border-orange-500/40">
                  High-Tech Mastery
                </span>
                <span className="text-xs text-orange-300 font-mono font-bold">1 Hour / Sunday</span>
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
                The Tech Innovator Add-on <br />
                <span className="text-lg text-orange-300 font-medium font-sans">(AI Tools)</span>
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mb-4 leading-relaxed">
                An exciting Sunday immersion where students master modern AI and developer tools, build intelligent
                assistants, and explore creative software creation.
              </p>

              {/* Price Block */}
              <div className="p-5 rounded-2xl bg-[#091535]/90 border border-orange-500/30 mb-6 relative shadow-inner">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight flex items-center">
                    <span className="mr-1 text-orange-400">₹</span>
                    1,500
                  </span>
                  <span className="text-slate-300 font-semibold text-sm">/ month</span>
                  <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 ml-auto font-mono">
                    Standard Fee
                  </span>
                </div>
                <p className="text-xs text-orange-300/80 mt-1">Available standalone or alongside any foundational track.</p>
              </div>

              {/* Schedule Block */}
              <div className="mb-5 p-4 rounded-xl bg-[#08122c]/90 border border-slate-700/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <polyline points="12 6 12 12 16 14" strokeWidth="2" />
                  </svg>
                  Add-on Sunday Schedule (Pick Either Slot):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#050c1e] border border-slate-800 text-center font-mono text-cyan-300 font-semibold">
                    Sundays: 12:30 PM - 1:30 PM
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#050c1e] border border-slate-800 text-center font-mono text-cyan-300 font-semibold">
                    Sundays: 2:30 PM - 3:30 PM
                  </div>
                </div>
              </div>

              {/* WHY AI IS CRUCIAL */}
              <div className="mb-6 p-4 rounded-xl bg-[#0b1536]/90 border border-orange-500/30">
                <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-1.5">
                  <span>✨</span> Why this Add-on?
                </h5>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  &ldquo;Why this Add-on? It is the ultimate creativity booster. Traditional coding can sometimes feel
                  rigid, but AI tools allow children to instantly bring their own wild imaginations to life. By building
                  smart chatbots and interactive systems based on their own ideas, it keeps them deeply engaged, prevents
                  boredom, and turns technology into a highly exciting, self-driven adventure!&rdquo;
                </p>
              </div>

              {/* GROUP & REFERRAL PROGRAM CALLOUT (5+ Offer) */}
              <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-orange-950/70 via-[#151c3d] to-[#0a122e] border-2 border-orange-500 shadow-xl relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="animate-pulse flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                  </span>
                  <span className="text-xs font-black uppercase tracking-wider text-orange-300">
                    🤝 Referral &amp; Group Program
                  </span>
                  <span className="ml-auto text-[11px] font-mono font-bold bg-rose-950 text-rose-300 px-2.5 py-0.5 rounded border border-rose-800">
                    ENDS NOV 15TH
                  </span>
                </div>

                <p className="text-sm font-bold text-white leading-snug">
                  Refer or register as a group of 5 or more, and get this Add-on for just{' '}
                  <span className="text-amber-300 font-black text-lg underline decoration-orange-400">
                    ₹1,000/month per student!
                  </span>
                </p>
                <p className="text-xs text-orange-200/90 mt-1">
                  Both your family and referred learners qualify for this special ₹1,000/mo fee. Offer ends November 15th.
                </p>

                {/* Live Countdown Timer Component to November 15th */}
                <div className="mt-4 pt-3 border-t border-orange-500/30 flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide">Offer Ends In:</span>
                  <div className="flex items-center gap-2 font-mono text-center">
                    <div className="bg-[#050c1e] border border-orange-500/40 rounded px-2 py-1">
                      <span className="block text-base font-bold text-orange-300 leading-tight">{days}</span>
                      <span className="text-[9px] text-slate-400">DAYS</span>
                    </div>
                    <span className="text-orange-500 font-bold">:</span>
                    <div className="bg-[#050c1e] border border-orange-500/40 rounded px-2 py-1">
                      <span className="block text-base font-bold text-orange-300 leading-tight">{hours}</span>
                      <span className="text-[9px] text-slate-400">HOURS</span>
                    </div>
                    <span className="text-orange-500 font-bold">:</span>
                    <div className="bg-[#050c1e] border border-orange-500/40 rounded px-2 py-1">
                      <span className="block text-base font-bold text-orange-300 leading-tight">{minutes}</span>
                      <span className="text-[9px] text-slate-400">MINS</span>
                    </div>
                    <span className="text-orange-500 font-bold">:</span>
                    <div className="bg-[#050c1e] border border-orange-500/40 rounded px-2 py-1">
                      <span className="block text-base font-bold text-orange-300 leading-tight">{seconds}</span>
                      <span className="text-[9px] text-slate-400">SECS</span>
                    </div>
                  </div>
                </div>

                {/* Referral Savings Calculator */}
                <div className="mt-4 pt-3 border-t border-orange-500/20 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="groupSliderReact" className="text-slate-300 font-medium">
                      Friends Referred With Your Code:
                    </label>
                    <span className={`font-bold ${isSpecialActive ? 'text-amber-300' : 'text-slate-300'}`}>
                      {referredCount} Friend{referredCount === 1 ? '' : 's'}{' '}
                      {isSpecialActive ? '(₹1,000 Special Fee Active!)' : '(Standard: ₹1,500/mo)'}
                    </span>
                  </div>

                  <input
                    id="groupSliderReact"
                    type="range"
                    min="0"
                    max="10"
                    value={referredCount}
                    onChange={(e) => setReferredCount(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-400"
                  />

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>
                      Monthly Fee:{' '}
                      <span className="text-white font-bold">Rs. {currentFee.toLocaleString('en-IN')}/mo</span>
                    </span>
                    <span className={isSpecialActive ? 'text-emerald-400 font-bold' : 'text-amber-300 font-semibold'}>
                      {isSpecialActive
                        ? `Referrals save Rs. ${totalSavings.toLocaleString('en-IN')}/mo total!`
                        : `Refer ${friendsNeeded} more friend${friendsNeeded > 1 ? 's' : ''} to receive the Rs. 1,000/mo special fee!`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="#book-demo"
              onClick={() =>
                onSelectProgram(
                  'The Tech Innovator Add-on - Rs. 1,500/mo (Rs. 1,000 with 5+ Referral)'
                )
              }
              className="w-full py-3.5 px-6 rounded-xl font-bold text-center text-slate-950 bg-gradient-to-r from-orange-400 to-amber-300 hover:from-orange-300 hover:to-amber-200 transition-colors shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Tech Innovator Add-on Demo</span>
              <svg className="w-4 h-4 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
