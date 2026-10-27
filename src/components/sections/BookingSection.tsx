import React, { useState, useEffect } from 'react';
import { BookingFormData, BookingSubmissionPayload } from '../../types/booking';
import { isWeekendDay, getNextWeekendDay } from '../../utils/dateUtils';
import { generateReferralCode, saveBookingLocally } from '../../utils/referralUtils';

interface BookingSectionProps {
  selectedProgram: string;
  onProgramChange: (val: string) => void;
  onBookingSuccess: (submission: BookingSubmissionPayload) => void;
  googleScriptUrl?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedProgram,
  onProgramChange,
  onBookingSuccess,
  googleScriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    parentName: '',
    parentEmail: '',
    whatsapp: '',
    studentName: '',
    studentGrade: '',
    program: selectedProgram || 'Track 1: Core Foundation (Python & Computational Logic) - Rs. 2,000/mo',
    demoDate: getNextWeekendDay(),
    timeSlot: '',
    hardwareCheck: true,
    appliedReferralCode: ''
  });

  const [dateAlert, setDateAlert] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync program when changed externally from tracks
  useEffect(() => {
    if (selectedProgram) {
      setFormData((prev) => ({ ...prev, program: selectedProgram }));
    }
  }, [selectedProgram]);

  const handleDateChange = (val: string) => {
    setFormData((prev) => ({ ...prev, demoDate: val }));

    if (!isWeekendDay(val)) {
      setDateAlert('⚠️ Demo sessions are held on weekends only. Automatically selecting upcoming Saturday/Sunday...');
      setTimeout(() => {
        const nextWeekend = getNextWeekendDay(new Date(val + 'T12:00:00'));
        setFormData((prev) => ({ ...prev, demoDate: nextWeekend }));
        setDateAlert(null);
      }, 700);
    } else {
      setDateAlert(null);
    }
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (formData.parentName.trim().length < 2) {
      errs.parentName = 'Please enter parent/guardian full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail.trim())) {
      errs.parentEmail = 'Please provide a valid email for confirmation.';
    }
    if (formData.whatsapp.trim().length < 8) {
      errs.whatsapp = 'Please provide a valid WhatsApp number for session link.';
    }
    if (formData.studentName.trim().length < 2) {
      errs.studentName = 'Please enter student full name.';
    }
    if (!formData.studentGrade) {
      errs.studentGrade = 'Please select student grade/level.';
    }
    if (!formData.timeSlot) {
      errs.timeSlot = 'Please select a preferred 1-hour time slot.';
    }
    if (!formData.hardwareCheck) {
      errs.hardwareCheck = 'You must confirm that a laptop, active internet, and basic computer knowledge are available.';
    }
    if (!isWeekendDay(formData.demoDate)) {
      errs.demoDate = 'Please choose an upcoming Saturday or Sunday.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const userReferralCode = generateReferralCode(formData.studentName);

    const payload: BookingSubmissionPayload = {
      parentName: formData.parentName.trim(),
      email: formData.parentEmail.trim().toLowerCase(),
      whatsapp: formData.whatsapp.trim(),
      studentName: formData.studentName.trim(),
      studentGrade: formData.studentGrade,
      program: formData.program,
      demoDate: formData.demoDate,
      timeSlot: formData.timeSlot,
      studentCount: 1,
      hasHardwareReady: formData.hardwareCheck,
      appliedReferralCode: formData.appliedReferralCode?.trim().toUpperCase() || '',
      generatedReferralCode: userReferralCode,
      emailReferralCodeDispatched: true,
      timestamp: new Date().toISOString(),
      brand: 'NeoByte Builders'
    };

    // Save locally
    saveBookingLocally(payload);

    try {
      if (googleScriptUrl && googleScriptUrl !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        await fetch(googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        console.log('NeoByte Builders: Booking Recorded & Stored Locally (Emailed to ' + payload.email + '):', payload);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
    } catch (networkErr) {
      console.warn('Network submission notice:', networkErr);
    } finally {
      setIsSubmitting(false);
      onBookingSuccess(payload);
      // Reset form
      setFormData({
        parentName: '',
        parentEmail: '',
        whatsapp: '',
        studentName: '',
        studentGrade: '',
        program: selectedProgram || 'Track 1: Core Foundation (Python & Computational Logic) - Rs. 2,000/mo',
        demoDate: getNextWeekendDay(),
        timeSlot: '',
        hardwareCheck: true,
        appliedReferralCode: ''
      });
      setErrors({});
    }
  };

  return (
    <section id="book-demo" className="py-20 lg:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
            Reserve A Free Seat
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Book Your Free Weekend Demo
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Experience our continuous mentorship live. Weekend sessions only. Select a Saturday or Sunday that fits
            your schedule.
          </p>
        </div>

        <div className="rounded-3xl glass-card p-6 sm:p-10 border border-cyan-500/30 glow-cyan shadow-2xl relative">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-cyan-500/15 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              100% Free Demo Session
            </span>
            <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Weekends Only (Sat &amp; Sun)
            </span>
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Nov 15 Referral Special Eligible
            </span>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Row 1: Parent Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="parentName" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Parent Full Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  id="parentName"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="e.g. Priya Sharma"
                  className={`w-full px-4 py-3 rounded-xl bg-[#091535] border text-white placeholder-slate-500 text-sm transition-all outline-none ${
                    errors.parentName
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                  }`}
                />
                {errors.parentName && <span className="text-xs text-rose-400 mt-1.5 block">{errors.parentName}</span>}
              </div>

              <div>
                <label htmlFor="parentEmail" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Parent Email Address <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  id="parentEmail"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  placeholder="e.g. priya@gmail.com"
                  className={`w-full px-4 py-3 rounded-xl bg-[#091535] border text-white placeholder-slate-500 text-sm transition-all outline-none ${
                    errors.parentEmail
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                  }`}
                />
                {errors.parentEmail && <span className="text-xs text-rose-400 mt-1.5 block">{errors.parentEmail}</span>}
              </div>
            </div>

            {/* Row 2: WhatsApp & Student Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="whatsapp" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  WhatsApp Number (For Demo Link &amp; Reminders) <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={`w-full px-4 py-3 rounded-xl bg-[#091535] border text-white placeholder-slate-500 text-sm font-mono transition-all outline-none ${
                    errors.whatsapp
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                  }`}
                />
                {errors.whatsapp && <span className="text-xs text-rose-400 mt-1.5 block">{errors.whatsapp}</span>}
              </div>

              <div>
                <label htmlFor="studentName" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Student Full Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className={`w-full px-4 py-3 rounded-xl bg-[#091535] border text-white placeholder-slate-500 text-sm transition-all outline-none ${
                    errors.studentName
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                  }`}
                />
                {errors.studentName && <span className="text-xs text-rose-400 mt-1.5 block">{errors.studentName}</span>}
              </div>
            </div>

            {/* Row 3: Student Age/Grade & Track Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="studentGrade" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Student Age / Grade (No Upper Limit) <span className="text-cyan-400">*</span>
                </label>
                <select
                  id="studentGrade"
                  value={formData.studentGrade}
                  onChange={(e) => setFormData({ ...formData, studentGrade: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-[#091535] border text-white text-sm transition-all outline-none ${
                    errors.studentGrade
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                  }`}
                >
                  <option value="" disabled>Select Student Age / Grade</option>
                  <option value="4th Grade (Approx 9 yrs)">4th Grade (Approx 9 yrs)</option>
                  <option value="5th - 6th Grade (Approx 10-11 yrs)">5th - 6th Grade (Approx 10-11 yrs)</option>
                  <option value="7th - 8th Grade (Approx 12-13 yrs)">7th - 8th Grade (Approx 12-13 yrs)</option>
                  <option value="9th - 10th Grade (Approx 14-15 yrs)">9th - 10th Grade (Approx 14-15 yrs)</option>
                  <option value="11th - 12th Grade (Approx 16-17 yrs)">11th - 12th Grade (Approx 16-17 yrs)</option>
                  <option value="College Student / Adult Learner">College Student / Adult Learner</option>
                </select>
                {errors.studentGrade && <span className="text-xs text-rose-400 mt-1.5 block">{errors.studentGrade}</span>}
              </div>

              <div>
                <label htmlFor="programSelect" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Program / Track of Interest <span className="text-slate-400 font-normal lowercase">(demo is common for all tracks)</span> <span className="text-cyan-400">*</span>
                </label>
                <select
                  id="programSelect"
                  value={formData.program}
                  onChange={(e) => {
                    setFormData({ ...formData, program: e.target.value });
                    onProgramChange(e.target.value);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-[#091535] border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-white text-sm transition-all outline-none"
                >
                  <option value="Weekend Demo Session (Common for All Tracks)">Weekend Demo Session (Common for All Tracks)</option>
                  <option value="Track 1: Core Foundation (Python & Computational Logic) - Rs. 2,000/mo">Track 1: Core Foundation (Python &amp; Computational Logic) - Rs. 2,000/mo</option>
                  <option value="Track 2: Systems & Applied Engineering (C/C++ & Microcontrollers) - Rs. 3,000/mo">Track 2: Systems &amp; Applied Engineering (C/C++ &amp; Microcontrollers) - Rs. 3,000/mo</option>
                  <option value="Track 3: Modern Web & Full-Stack (Interactive Web Apps & APIs) - Rs. 5,000/mo">Track 3: Modern Web &amp; Full-Stack (Interactive Web Apps &amp; APIs) - Rs. 5,000/mo</option>
                  <option value="Track 4: The AI Frontier (Emerging Technologies) - Rs. 8,000/mo">Track 4: The AI Frontier (Emerging Technologies) - Rs. 8,000/mo</option>
                  <option value="The Tech Innovator Add-on - Rs. 1,500/mo (Rs. 1,000 with 5+ Referral)">The Tech Innovator Add-on - Rs. 1,500/mo (Rs. 1,000 with 5+ Referral)</option>
                </select>
              </div>
            </div>

            {/* Row 4: Weekend Demo Date & 1-Hour Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="demoDate" className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Demo Date (Weekends Only) <span className="text-cyan-400">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    Sat / Sun Only
                  </span>
                </div>
                <input
                  type="date"
                  id="demoDate"
                  value={formData.demoDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-[#091535] border text-white text-sm font-mono transition-all outline-none ${
                    errors.demoDate
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                  }`}
                />
                {dateAlert && <p className="text-xs text-amber-300 mt-1.5 font-medium">{dateAlert}</p>}
                {errors.demoDate && <span className="text-xs text-rose-400 mt-1.5 block">{errors.demoDate}</span>}
                <p className="text-[11px] text-slate-400 mt-1">Please choose an upcoming Saturday or Sunday.</p>
              </div>

              <div>
                <label htmlFor="timeSlot" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Preferred 1-Hour Time Slot <span className="text-cyan-400">*</span>
                </label>
                <select
                  id="timeSlot"
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-[#091535] border text-white text-sm transition-all outline-none ${
                    errors.timeSlot
                      ? 'border-rose-500 focus:border-rose-400'
                      : 'border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20'
                  }`}
                >
                  <option value="" disabled>Select Weekend Time Slot</option>
                  <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM (Morning Slot)</option>
                  <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM (Afternoon Slot)</option>
                  <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM (Evening Slot)</option>
                  <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM (Late Evening Slot)</option>
                </select>
                {errors.timeSlot && <span className="text-xs text-rose-400 mt-1.5 block">{errors.timeSlot}</span>}
              </div>
            </div>

            {/* Row 5: Attendance Policy & Optional Referral Code Input */}
            <div className="p-5 rounded-2xl bg-[#091535]/80 border border-slate-700 space-y-4">
              <div className="flex items-center gap-3.5 pb-3 border-b border-slate-700/80">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200 block">
                    Attendance: Parents &amp; Student Welcome
                  </span>
                  <span className="text-[11px] text-slate-300 leading-relaxed block mt-0.5">
                    Parents and the student are both warmly welcome to attend the live demo session together.
                  </span>
                </div>
              </div>

              {/* Referral Code Input for Referred Friends */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="appliedReferralCode" className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Friend&rsquo;s Referral Code <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <span className="text-[11px] text-amber-300 font-semibold">Preferred Tuition: ₹1,000/mo</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id="appliedReferralCode"
                    value={formData.appliedReferralCode}
                    onChange={(e) => setFormData({ ...formData, appliedReferralCode: e.target.value.toUpperCase() })}
                    placeholder="e.g. NEO-AARAV842"
                    className="w-full px-4 py-3 rounded-xl bg-[#0d1c44] border border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 text-white placeholder-slate-500 text-sm uppercase font-mono tracking-wider transition-all outline-none"
                  />
                  <div className="absolute right-3.5 top-3 flex items-center gap-1 text-xs text-slate-400 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span>Referral</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 mt-2 flex items-start gap-2 leading-relaxed">
                  <svg className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    Upon reservation, your family will receive a <strong>unique Referral Code</strong> on-screen and by
                    email. When 5 friends enroll using your code, all qualifying families receive the special tuition fee
                    of ₹1,000/month.
                  </span>
                </p>
              </div>
            </div>

            {/* Row 6: Mandatory Hardware & Internet Checkbox */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="hardwareCheck"
                  checked={formData.hardwareCheck}
                  onChange={(e) => setFormData({ ...formData, hardwareCheck: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-amber-500 text-cyan-500 focus:ring-cyan-400 bg-slate-900 accent-cyan-400"
                />
                <span className="text-xs sm:text-sm text-slate-200 leading-snug">
                  <strong className="text-amber-300 font-bold block mb-0.5">Requirement:</strong>
                  I confirm that my child has a{' '}
                  <strong className="text-white underline">laptop, active internet connectivity, and basic computer knowledge</strong>{' '}
                  (required for hands-on mentorship, interactive coding, and screen sharing).
                </span>
              </label>
              {errors.hardwareCheck && (
                <span className="text-xs text-rose-400 mt-2 block pl-7">{errors.hardwareCheck}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="submitBtn"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-xl font-display font-extrabold text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60"
              >
                <span>{isSubmitting ? 'Submitting Booking...' : 'Confirm Free Demo Booking →'}</span>
                {isSubmitting && (
                  <svg className="animate-spin h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </button>
              <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-1.5">
                <span>🔒</span> Zero payment required for demo. Our team will verify and send the meeting link via
                WhatsApp within 4 hours.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
