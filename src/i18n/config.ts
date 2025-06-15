export const locales = ['en', 'fr', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  ar: 'العربية',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  fr: '🇫🇷',
  ar: '🇲🇦',
};

export const rtlLocales: Record<Locale, boolean> = {
  en: false,
  fr: false,
  ar: true,
};

export const isRtlLocale = (locale: Locale): boolean => {
  return rtlLocales[locale] || false;
};
