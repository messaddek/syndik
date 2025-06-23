/**
 * Utility functions for date handling to avoid timezone issues
 */

/**
 * Formats a Date object to YYYY-MM-DD string format without timezone conversion
 * @param date - The date to format
 * @returns String in YYYY-MM-DD format
 */
export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Gets today's date as a YYYY-MM-DD string
 * @returns Today's date in YYYY-MM-DD format
 */
export function getTodayString(): string {
  return formatDateToString(new Date());
}

/**
 * Parses a date string or Date object to a safe Date object
 * @param dateInput - Date string or Date object
 * @returns Date object
 */
export function parseDateSafely(dateInput: string | Date): Date {
  if (dateInput instanceof Date) {
    return dateInput;
  }
  return new Date(dateInput);
}
