import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'What makes NeoByte Builders different from typical short-term coding camps?',
    answer:
      'Unlike temporary bootcamps that rush through superficial code syntax, NeoByte Builders is an ongoing, continuous technology mentorship. We focus relentlessly on the deepest foundations of computational logic, software engineering principles, and creative problem-solving so students build authentic technological intuition that lasts a lifetime.'
  },
  {
    question: 'What hardware and computer background does my child need?',
    answer:
      'Every learner needs a working laptop (Windows, macOS, or Linux) with an active internet connection and basic computer knowledge (such as operating a mouse/trackpad, typing, and opening a browser). Our mentorship is interactive, hands-on, and includes real-time coding exercises.'
  },
  {
    question: 'What happens if my child struggles with a programming concept?',
    answer:
      'If your child faces difficulty or needs extra support on any logic problem or code exercise, we schedule a free 1-hour extended clarity session based on mentor availability. Our mentor provides focused guidance, answers every question patiently, and walks through live examples until the concept is 100% understood.'
  },
  {
    question: 'How does the Referral & Group Offer of ₹1,000/month work?',
    answer:
      'Form a group of 5 or more students (classmates, cousins, or friends) or refer 5 friends to NeoByte Builders. When registering before midnight on November 15th, every student in your group or referral circle secures the Tech Innovator Add-on for just ₹1,000/month per student!'
  },
  {
    question: 'Can older students, high schoolers, or adults join?',
    answer:
      'Yes! Our mentorship is tailored from 4th Grade with no upper age limit. We teach authentic computational logic, software engineering, and emerging AI tools that are equally valuable for school students, college undergraduates, and adult lifelong learners.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 relative border-t border-cyan-500/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Parent Guidance
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Everything you need to know about our continuous mentorship for youth.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-700/80 transition-colors shadow-lg"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left font-display font-bold text-base sm:text-lg text-white cursor-pointer select-none"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`text-cyan-400 transition-transform duration-200 ml-4 flex-shrink-0 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-700/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
