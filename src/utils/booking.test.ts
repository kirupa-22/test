import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isWeekend,
  getNextWeekend,
  calculateAddonPrice,
  formatBookingPayload,
} from './booking.ts';

test('isWeekend correctly identifies Saturdays and Sundays', () => {
  assert.equal(isWeekend('2026-10-24'), true, 'Saturday must be valid');
  assert.equal(isWeekend('2026-10-25'), true, 'Sunday must be valid');
  assert.equal(isWeekend('2026-10-21'), false, 'Wednesday should be rejected');
  assert.equal(isWeekend('2026-10-22'), false, 'Thursday should be rejected');
  assert.equal(isWeekend('2026-10-23'), false, 'Friday should be rejected');
  assert.equal(isWeekend('2026-10-26'), false, 'Monday should be rejected');
  assert.equal(isWeekend(''), false, 'Empty string should be false');
});

test('getNextWeekend returns a valid Saturday or Sunday date', () => {
  const nextWeekendStr = getNextWeekend(new Date('2026-10-22T10:00:00Z')); // Thursday
  assert.equal(isWeekend(nextWeekendStr), true);
  assert.equal(nextWeekendStr, '2026-10-24');
});

test('calculateAddonPrice applies group discount for 5 or more students', () => {
  const single = calculateAddonPrice(1);
  assert.equal(single.finalPricePerStudent, 1500);
  assert.equal(single.totalMonthly, 1500);
  assert.equal(single.isGroupDiscountApplied, false);

  const five = calculateAddonPrice(5);
  assert.equal(five.finalPricePerStudent, 1000);
  assert.equal(five.totalMonthly, 5000);
  assert.equal(five.isGroupDiscountApplied, true);
  assert.equal(five.savingsTotal, 2500);
});

test('formatBookingPayload normalizes fields including studentName', () => {
  const payload = formatBookingPayload({
    parentName: '  Priya Sharma ',
    email: ' PRIYA@EXAMPLE.COM ',
    whatsapp: '+91 9876543210',
    studentName: ' Aarav Sharma ',
    studentGrade: '6th Grade',
    program: 'The Core Builder Mentorship (Logic, Tech & Python)',
    demoDate: '2026-10-24',
    timeSlot: '11:00 AM - 12:00 PM',
    studentCount: '1',
    hasHardwareReady: true,
  });

  assert.equal(payload.parentName, 'Priya Sharma');
  assert.equal(payload.email, 'priya@example.com');
  assert.equal(payload.studentName, 'Aarav Sharma');
  assert.equal(payload.studentCount, 1);
  assert.equal(payload.hasHardwareReady, true);
  assert.equal(payload.source, 'neobyte_landing_page');
});
