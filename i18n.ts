import { getRequestConfig } from 'next-intl/server';
import { routing } from './src/i18n/routing';
import type { Locale } from './src/i18n/config';

export default getRequestConfig(async ({ requestLocale }) => {
  // This can either be defined statically at the top-level if no user
  // is involved, or can be read from the user's profile, a database,
  // request headers, etc.
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./src/messages/${locale}.json`)).default,
  };
});
