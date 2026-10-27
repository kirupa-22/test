import { BookingSubmissionPayload } from '../types/booking';

const STORAGE_KEY = 'neobyte_demo_bookings';

/**
 * Generates an uppercase unique referral code (e.g. NEO-AARA4812)
 */
export function generateReferralCode(studentName: string): string {
  const letters = (studentName || 'BUILDER')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .slice(0, 4) || 'NEO';
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `NEO-${letters}${randomNum}`;
}

/**
 * Retrieve saved booking responses from localStorage
 */
export function getStoredBookings(): BookingSubmissionPayload[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to load bookings from localStorage:', err);
    return [];
  }
}

/**
 * Persist a new booking response into localStorage
 */
export function saveBookingLocally(payload: BookingSubmissionPayload): void {
  try {
    const list = getStoredBookings();
    list.push(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('Failed to save booking to localStorage:', err);
  }
}

/**
 * Exports all recorded bookings as a CSV file download
 */
export function exportBookingsToCSV(): void {
  const list = getStoredBookings();
  if (!list.length) {
    alert('No demo bookings found in local storage yet.');
    return;
  }

  const headers = [
    'Timestamp',
    'Parent Name',
    'Email',
    'WhatsApp',
    'Student Name',
    'Grade',
    'Program',
    'Demo Date',
    'Time Slot',
    'Referral Code',
    'Applied Referral'
  ];

  const rows = list.map((b) => [
    b.timestamp,
    `"${b.parentName || ''}"`,
    `"${b.email || ''}"`,
    `"${b.whatsapp || ''}"`,
    `"${b.studentName || ''}"`,
    `"${b.studentGrade || ''}"`,
    `"${b.program || ''}"`,
    `"${b.demoDate || ''}"`,
    `"${b.timeSlot || ''}"`,
    `"${b.generatedReferralCode || ''}"`,
    `"${b.appliedReferralCode || ''}"`
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `neobyte_demo_bookings_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Builds the personalized WhatsApp share link
 */
export function buildWhatsAppShareLink(
  studentName: string,
  referralCode: string
): string {
  const bookingUrl = window.location.href.split('#')[0] + '#book-demo';
  const shareText = encodeURIComponent(
    `Hello! I have booked a complimentary demo session for ${studentName} at NeoByte Builders. Both parents and students are welcome to attend together. You can use our referral code *${referralCode}* to receive the Tech Innovator Add-on (AI Tools) for just ₹1,000/month (standard ₹1,500/month). Reserve your preferred weekend slot here: ${bookingUrl}`
  );
  return `https://api.whatsapp.com/send?text=${shareText}`;
}
