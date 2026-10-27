/**
 * Utilities for weekend validation and date handling
 */

export function isWeekendDay(dateStr: string): boolean {
  if (!dateStr) return false;
  // Parse with noon time to avoid timezone offset edge cases
  const date = new Date(dateStr + 'T12:00:00');
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
}

export function getNextWeekendDay(from: Date = new Date()): string {
  const d = new Date(from);
  d.setHours(12, 0, 0, 0);
  const day = d.getDay();

  if (day === 6 || day === 0) {
    return formatDateIso(d);
  }

  // Days until upcoming Saturday
  const diff = 6 - day;
  d.setDate(d.getDate() + diff);
  return formatDateIso(d);
}

export function formatDateIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
