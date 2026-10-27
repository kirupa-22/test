import React from 'react';
import { ProgramTrack } from '../../types/booking';

interface PathwaySectionProps {
  onSelectProgram: (programName: string) => void;
}

const TRACKS: ProgramTrack[] = [
  {
    id: 'track-1',
    title: 'Core Foundation',
    subtitle: 'Python & Computational Logic',
    monthlyFee: 2000,
    description:
      'Laying the architectural bedrock of coding. Students master pure algorithmic thinking, loops, variables, and procedural logic through active problem-solving.',
    features: [
      'Pure algorithmic logic & variables',
      'Data structures (Lists, Dicts, Tuples)',
      'Algorithmic puzzles & computational thinking',
      'Interactive games & terminal tools'
    ]
  },
  {
    id: 'track-2',
    title: 'Systems & Applied Engineering',
    subtitle: 'C/C++ & Microcontrollers',
    monthlyFee: 3000,
    description:
      'Understanding hardware-software bridges. Students dive into memory management, pointers, and embedded logic using microcontrollers and hardware sensors.',
    features: [
      'Low-level memory & pointers mastery',
      'Microcontroller programming (Arduino/ESP32)',
      'Sensor integration & real-time controls',
      'Direct physical hardware projects'
    ]
  },
  {
    id: 'track-3',
    title: 'Modern Web & Full-Stack',
    subtitle: 'Interactive Web Apps & APIs',
    monthlyFee: 5000,
    description:
      'Bringing software to users worldwide. Students construct responsive modern user interfaces, backend APIs, and real-time database workflows.',
    features: [
      'Modern HTML5, CSS3 & TypeScript',
      'React frontend component architecture',
      'Backend REST APIs & secure endpoints',
      'Full database integration & live deployment'
    ]
  },
  {
    id: 'track-4',
    title: 'The AI Frontier',
    subtitle: 'Emerging Technologies',
    monthlyFee: 8000,
    description:
      'Continuous, hands-on exposure to Large Language Models (LLMs) and RAG, engineering intelligent AI assistants to stay ahead of the rapid tech curve.',
    features: [
      'LLMs, Prompt Engineering & RAG systems',
      'Autonomous agents & intelligent workflows',
      'AI assistant system design',
      'Next-gen machine intelligence integration'
    ]
  }
];

export const PathwaySection: React.FC<PathwaySectionProps> = ({ onSelectProgram }) => {
  return (
    <section id="pathway" className="py-20 lg:py-28 relative border-t border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Continuous Learning Pathway
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            The Innovator&rsquo;s Journey: <br />
            <span className="text-gradient-cyan">A Continuous Learning Pathway</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
            Unlike traditional short-term programs, NeoByte Builders operates as an ongoing technology mentorship.
            Students progress through these core disciplines at their own pace, continuously leveling up their skills.
          </p>
        </div>

        {/* 4 Continuous Tracks Grid with Clear Monthly Fees */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRACKS.map((track, idx) => (
            <div
              key={track.id}
              className="rounded-3xl glass-card p-6 border border-slate-700/80 hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-800">
                    Track {idx + 1}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {track.title} <br />
                  <span className="text-sm text-cyan-300 font-medium font-sans">({track.subtitle})</span>
                </h3>

                {/* Clean Fee Display */}
                <div className="my-3 px-3.5 py-2.5 rounded-xl bg-[#091535] border border-cyan-500/25 flex items-center justify-center">
                  <span className="text-xl font-black font-display text-cyan-300 flex items-center">
                    <span className="mr-1">₹</span>
                    {track.monthlyFee.toLocaleString('en-IN')}{' '}
                    <span className="text-xs text-slate-300 font-medium ml-1.5">/ month</span>
                  </span>
                </div>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">{track.description}</p>
              </div>

              <div>
                <div className="pt-4 border-t border-slate-700/60 text-xs text-slate-300 space-y-2 font-medium mb-4">
                  {track.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-cyan-400 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#book-demo"
                  onClick={() =>
                    onSelectProgram(
                      `Track ${idx + 1}: ${track.title} (${track.subtitle}) - Rs. ${track.monthlyFee.toLocaleString('en-IN')}/mo`
                    )
                  }
                  className="block w-full py-2.5 rounded-xl text-center text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
                >
                  Book Free Demo Session
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
