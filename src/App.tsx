import React, { useState, useEffect } from 'react';
import { AnnouncementTicker } from './components/layout/AnnouncementTicker';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { PathwaySection } from './components/sections/PathwaySection';
import { ScheduleSection } from './components/sections/ScheduleSection';
import { BookingSection } from './components/sections/BookingSection';
import { FaqSection } from './components/sections/FaqSection';
import { SuccessModal } from './components/ui/SuccessModal';
import { BookingSubmissionPayload } from './types/booking';
import { getStoredBookings, exportBookingsToCSV } from './utils/referralUtils';

export default function App() {
  const [selectedProgram, setSelectedProgram] = useState<string>(
    'Weekend Demo Session (Common for All Tracks)'
  );
  const [submittedBooking, setSubmittedBooking] = useState<BookingSubmissionPayload | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Expose inspection and export helpers on window for browser console access
  useEffect(() => {
    (window as any).getNeoByteBookings = () => {
      const list = getStoredBookings();
      console.table(list);
      return list;
    };
    (window as any).downloadNeoByteBookingsCSV = () => {
      exportBookingsToCSV();
    };
  }, []);

  const handleSelectProgram = (programName: string) => {
    setSelectedProgram(programName);
    const formElement = document.getElementById('book-demo');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSuccess = (payload: BookingSubmissionPayload) => {
    setSubmittedBooking(payload);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen text-slate-100 antialiased selection:bg-cyan-500 selection:text-white bg-[#060d1f]">
      {/* 1. URGENT NOTICE / GROUP & REFERRAL TICKER */}
      <AnnouncementTicker />

      {/* 2. NAVIGATION BAR (Brand Logo + Book Free Demo Only) */}
      <Header />

      <main>
        {/* 3. HERO & CORE PHILOSOPHY */}
        <HeroSection />

        {/* 4. LEARNING PATHWAY (4 CONTINUOUS TRACKS) */}
        <PathwaySection onSelectProgram={handleSelectProgram} />

        {/* 5. MENTORSHIP SCHEDULE, CLARITY GUARANTEE & TECH INNOVATOR ADD-ON */}
        <ScheduleSection onSelectProgram={handleSelectProgram} />

        {/* 6. BOOKING FORM (WEEKEND ONLY, ATTENDANCE WELCOME, REFERRAL DISPATCH) */}
        <BookingSection
          selectedProgram={selectedProgram}
          onProgramChange={setSelectedProgram}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        <FaqSection />
      </main>

      {/* 8. FOOTER */}
      <Footer />

      {/* 9. SUCCESS BOOKING MODAL WITH REFERRAL CODE */}
      <SuccessModal
        isOpen={isModalOpen}
        submission={submittedBooking}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
