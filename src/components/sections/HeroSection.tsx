import React from 'react';
import { BrandLogo } from '../ui/BrandLogo';

export const HeroSection: React.FC = () => {
  return (
    <section id="philosophy" className="relative pt-10 pb-20 lg:pt-16 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero Brand Emblem */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3.5 px-5 py-2.5 rounded-3xl glass-panel glow-cyan border border-cyan-500/30 mb-8 shadow-xl">
            <BrandLogo size="sm" />
            <div className="h-4 w-px bg-cyan-500/30 hidden sm:block"></div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-cyan-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Classes Officially Start This December!</span>
              <span className="text-slate-400 font-normal hidden md:inline">
                • 4th Grade to Adult (No Upper Limit)
              </span>
            </div>
          </div>

          {/* Main High-Conversion Headline & Subtext */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-white mb-6">
            A Continuous Technology Mentorship For The{' '}
            <span className="text-gradient-cyan">Next Generation</span> of Builders.
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
            At <strong className="text-white font-semibold">NeoByte Builders</strong> &mdash;{' '}
            <em className="text-cyan-300 not-italic">The Next-Gen Learning Hub</em> &mdash; we offer a continuous
            technology mentorship. We transform young learners from passive screen consumers into confident software
            creators.
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            We don't just teach syntax; our dedicated mentors use technology to build{' '}
            <strong className="text-white font-semibold">unshakeable logical thinking</strong>,{' '}
            <strong className="text-white font-semibold">creative problem-solving</strong>, and{' '}
            <strong className="text-cyan-300 font-semibold">deep technological mastery</strong> that will put your
            child ahead in this AI world.{' '}
            <span className="text-amber-400 font-bold">Classes officially start this December!</span>
          </p>

          {/* Hardware & Internet Prerequisite Callout */}
          <div className="inline-flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-[#132048]/90 border-2 border-amber-500/50 text-amber-200 text-sm font-semibold mb-10 max-w-2xl text-left shadow-xl shadow-amber-950/20">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-300 flex-shrink-0 text-xl shadow-inner">
              💻
            </div>
            <div>
              <span className="text-amber-400 font-bold uppercase tracking-wider text-xs block">
                Requirement:
              </span>
              <span className="text-white font-semibold text-sm sm:text-base">
                A laptop, active internet connectivity, and basic computer knowledge are required.
              </span>
            </div>
          </div>

          {/* OUR CORE PHILOSOPHY PROMINENT CALLOUT */}
          <div className="relative my-8 p-6 sm:p-10 rounded-3xl glass-card glow-cyan border-2 border-cyan-500/35 text-left max-w-3xl mx-auto overflow-hidden">
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-orange-500 flex items-center justify-center text-white flex-shrink-0 shadow-xl shadow-cyan-950/50">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-widest font-black text-cyan-400 bg-cyan-950/90 px-3 py-1 rounded-md border border-cyan-800">
                    Our Core Philosophy
                  </span>
                  <span className="text-xs text-orange-400 font-bold font-mono">Continuous Guidance</span>
                </div>
                <blockquote className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                  &ldquo;Our ultimate objective is not simply to finish a syllabus. We are here to lay a robust
                  technological foundation and build unshakeable confidence in modern software engineering. We guide
                  every student through the deepest fundamentals of computational logic with hands-on mentor coaching,
                  empowering them to think critically, create real-world digital solutions, and master tomorrow's
                  technologies with visionary creativity.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#book-demo"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-display font-bold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2"
            >
              <span>Book Free Weekend Demo Session</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <a
              href="#pathway"
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-display font-semibold text-base text-slate-200 bg-[#0d1a3b]/90 hover:bg-[#122450] border border-cyan-500/30 hover:border-cyan-400/60 transition-all text-center"
            >
              Explore The Learning Pathway &darr;
            </a>
          </div>

          {/* Value Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 pt-10 border-t border-cyan-500/15 text-left">
            <div className="p-4 rounded-2xl bg-[#091533]/60 border border-cyan-500/15">
              <div className="text-xl font-bold font-display text-white">Continuous</div>
              <div className="text-xs text-slate-300 mt-1">Ongoing mentorship, not a rushed sprint</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#091533]/60 border border-cyan-500/15">
              <div className="text-xl font-bold font-display text-cyan-400">Clarity Sessions</div>
              <div className="text-xs text-slate-300 mt-1">Free 1-hr extended sessions based on availability</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#091533]/60 border border-cyan-500/15">
              <div className="text-xl font-bold font-display text-orange-400">Deep Mastery</div>
              <div className="text-xs text-slate-300 mt-1">Hands-on guidance cultivating deep intuition</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#091533]/60 border border-cyan-500/15">
              <div className="text-xl font-bold font-display text-emerald-400">Weekend Only</div>
              <div className="text-xs text-slate-300 mt-1">Zero school weekday conflicts</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
