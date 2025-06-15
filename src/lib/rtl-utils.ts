import { type Locale, isRtlLocale } from '@/i18n/config';
import { cn } from './utils';

/**
 * Utility function to apply RTL-aware class names
 */
export function rtlClass(
  locale: Locale,
  ltrClasses: string,
  rtlClasses: string
): string {
  return isRtlLocale(locale) ? rtlClasses : ltrClasses;
}

/**
 * Utility function to combine regular classes with RTL-aware classes
 */
export function rtlCn(
  locale: Locale,
  baseClasses: string,
  ltrClasses: string,
  rtlClasses: string
): string {
  return cn(baseClasses, rtlClass(locale, ltrClasses, rtlClasses));
}

/**
 * Common RTL-aware class mappings
 */
export const rtlClassMap = {
  textLeft: (locale: Locale) => rtlClass(locale, 'text-left', 'text-right'),
  textRight: (locale: Locale) => rtlClass(locale, 'text-right', 'text-left'),
  ml: (locale: Locale, size: string) =>
    rtlClass(locale, `ml-${size}`, `mr-${size}`),
  mr: (locale: Locale, size: string) =>
    rtlClass(locale, `mr-${size}`, `ml-${size}`),
  pl: (locale: Locale, size: string) =>
    rtlClass(locale, `pl-${size}`, `pr-${size}`),
  pr: (locale: Locale, size: string) =>
    rtlClass(locale, `pr-${size}`, `pl-${size}`),
  left: (locale: Locale, size: string) =>
    rtlClass(locale, `left-${size}`, `right-${size}`),
  right: (locale: Locale, size: string) =>
    rtlClass(locale, `right-${size}`, `left-${size}`),
  borderL: (locale: Locale) => rtlClass(locale, 'border-l', 'border-r'),
  borderR: (locale: Locale) => rtlClass(locale, 'border-r', 'border-l'),
  roundedL: (locale: Locale, size?: string) =>
    rtlClass(
      locale,
      `rounded-l${size ? `-${size}` : ''}`,
      `rounded-r${size ? `-${size}` : ''}`
    ),
  roundedR: (locale: Locale, size?: string) =>
    rtlClass(
      locale,
      `rounded-r${size ? `-${size}` : ''}`,
      `rounded-l${size ? `-${size}` : ''}`
    ),
};

/**
 * Direction-aware transform for icons that should flip in RTL
 */
export function rtlTransform(
  locale: Locale,
  shouldFlip: boolean = true
): string {
  if (!shouldFlip || !isRtlLocale(locale)) return '';
  return '';
}

/**
 * Get text direction for the locale
 */
export function getTextDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRtlLocale(locale) ? 'rtl' : 'ltr';
}
