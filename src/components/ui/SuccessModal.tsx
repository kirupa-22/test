import React, { useState } from 'react';
import { BookingSubmissionPayload } from '../../types/booking';
import { buildWhatsAppShareLink } from '../../utils/referralUtils';

interface SuccessModalProps {
  isOpen: boolean;
  submission: BookingSubmissionPayload | null;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  submission,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !submission) return null;

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(submission.generatedReferralCode).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = submission.generatedReferralCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappShareUrl = buildWhatsAppShareLink(
    submission.studentName,
    submission.generatedReferralCode
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl glass-card p-6 sm:p-8 border border-emerald-500/40 glow-emerald text-center shadow-2xl my-6 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Checkmark Badge */}
        <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3 shadow-lg">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase tracking-widest inline-block">
          Booking Confirmed!
        </span>

        <h3 className="font-display font-extrabold text-2xl text-white mt-3 mb-1">
          Demo Session Reserved!
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
          Thank you, <strong className="text-white">{submission.parentName}</strong>! We look forward to welcoming both
          parent and student (<strong className="text-cyan-300">{submission.studentName}</strong>) for the live demo session
          at <span className="text-cyan-400 font-semibold">NeoByte Builders</span>.
        </p>

        {/* Booking details summary card */}
        <div className="p-3.5 rounded-xl bg-[#091535]/90 border border-slate-700 text-left text-xs space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-slate-400">Student Name:</span>
            <span className="font-semibold text-white font-mono">{submission.studentName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Selected Offering:</span>
            <span className="font-semibold text-cyan-300">{submission.program}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Date &amp; Slot:</span>
            <span className="font-semibold text-white font-mono">
              <span>{submission.demoDate}</span> &bull; <span>{submission.timeSlot}</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">WhatsApp Notification:</span>
            <span className="font-semibold text-emerald-400 font-mono">{submission.whatsapp}</span>
          </div>
          <div className="flex justify-between border-t border-slate-700/80 pt-2 text-cyan-300">
            <span>Session Attendance:</span>
            <span className="font-semibold text-white">Parents &amp; Student Welcome</span>
          </div>
        </div>

        {/* EMAIL DISPATCH CONFIRMATION NOTICE */}
        <div className="p-3.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-left text-xs mb-4 flex items-start gap-2.5">
          <span className="text-cyan-400 text-lg flex-shrink-0">📧</span>
          <div>
            <p className="text-white font-semibold">Referral Code &amp; Confirmation Emailed!</p>
            <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
              We have dispatched your demo credentials and your personal referral code directly to{' '}
              <strong className="text-cyan-300 font-mono">{submission.email}</strong>.
            </p>
          </div>
        </div>

        {/* PERSONAL REFERRAL CODE CARD */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-950/80 via-[#181a3d] to-[#0a122e] border-2 border-amber-500/70 shadow-xl mb-4 text-left glow-orange">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <span>Your Personal Referral Code</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/40 font-bold uppercase tracking-wider">
              Special Tuition: ₹1,000/mo
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 px-4 py-2.5 rounded-xl bg-[#060c1d] border border-amber-500/40 text-center">
              <span className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-widest select-all">
                {submission.generatedReferralCode}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-display transition-all flex items-center gap-1.5 flex-shrink-0 shadow-md active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" strokeWidth="2" />
              </svg>
              <span>{copied ? 'Copied! ✓' : 'Copy Code'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed mb-3">
            Share this code with 5 friends or classmates. When they register, both your family and referred learners
            qualify for the <strong className="text-amber-300">Tech Innovator Add-on at ₹1,000/month</strong> (saving
            ₹500/mo each). Offer ends Nov 15th.
          </p>

          {/* WhatsApp Share Button */}
          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086.159.058 1.011.477 1.184.564.173.087.289.129.332.203.043.072.043.419-.101.824z" />
            </svg>
            <span>Share Code via WhatsApp</span>
          </a>
        </div>

        {/* Modal Dismiss */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-xl font-bold text-xs text-slate-300 bg-slate-800/90 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
        >
          Close Window
        </button>
      </div>
    </div>
  );
};
