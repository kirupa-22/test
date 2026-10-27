/**
 * Mentorship and pricing logic for NeoByte Builders
 */

export interface PricingBreakdown {
  studentCount: number;
  basePricePerStudent: number;
  finalPricePerStudent: number;
  totalMonthly: number;
  isGroupDiscountApplied: boolean;
  savingsTotal: number;
}

/**
 * Checks if a date string (YYYY-MM-DD) falls on a weekend (Saturday or Sunday)
 */
export function isWeekend(dateStr: string): boolean {
  if (!dateStr) return false;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return false;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const date = new Date(year, month, day, 12, 0, 0);
  if (isNaN(date.getTime())) return false;
  const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday
  return dayOfWeek === 0 || dayOfWeek === 6;
}

/**
 * Gets the next upcoming Saturday or Sunday as a YYYY-MM-DD string
 */
export function getNextWeekend(fromDate: Date = new Date()): string {
  const nextDate = new Date(fromDate);
  nextDate.setHours(12, 0, 0, 0);
  
  while (nextDate.getDay() !== 0 && nextDate.getDay() !== 6) {
    nextDate.setDate(nextDate.getDate() + 1);
  }
  
  const yyyy = nextDate.getFullYear();
  const mm = String(nextDate.getMonth() + 1).padStart(2, '0');
  const dd = String(nextDate.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Track pricing breakdown:
 * Track 1: Core Foundation (Python & Computational Logic) - ₹2,000 / month
 * Track 2: Web Development (HTML, CSS, JavaScript & React) - ₹2,500 / month (Prerequisite: Track 1)
 * Track 3: Applied Engineering (Software Development) - ₹4,000 / month (Prerequisite: Track 1 & 2)
 * Track 4: The AI Frontier (Emerging Technologies) - ₹8,000 / month (Prerequisite: Track 1, 2 & 3)
 * 
 * Calculates Tech Innovator Add-on pricing based on student count.
 * Standard price: ₹1,500 / month per student.
 * Limited Time Group & Referral Offer (ends Nov 15): Groups of 5 or more / referrals get ₹1,000 / month per student.
 */
export function calculateAddonPrice(studentCount: number): PricingBreakdown {
  const count = Math.max(1, studentCount);
  const basePricePerStudent = 1500;
  const isGroupDiscountApplied = count >= 5;
  const finalPricePerStudent = isGroupDiscountApplied ? 1000 : basePricePerStudent;
  const totalMonthly = count * finalPricePerStudent;
  const regularTotal = count * basePricePerStudent;
  const savingsTotal = regularTotal - totalMonthly;

  return {
    studentCount: count,
    basePricePerStudent,
    finalPricePerStudent,
    totalMonthly,
    isGroupDiscountApplied,
    savingsTotal,
  };
}

/**
 * Normalizes booking form data into a clean JSON structure
 */
export function formatBookingPayload(raw: Record<string, any>) {
  return {
    parentName: (raw.parentName || '').trim(),
    email: (raw.email || '').trim().toLowerCase(),
    whatsapp: (raw.whatsapp || '').trim(),
    studentName: (raw.studentName || '').trim(),
    studentGrade: raw.studentGrade || '',
    program: raw.program || 'The Core Builder Mentorship',
    demoDate: raw.demoDate || '',
    timeSlot: raw.timeSlot || '',
    studentCount: Number(raw.studentCount) || 1,
    hasHardwareReady: Boolean(raw.hasHardwareReady),
    submittedAt: new Date().toISOString(),
    source: 'neobyte_landing_page',
  };
}
