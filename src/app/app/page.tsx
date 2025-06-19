import { redirect } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

export default function AppRootPage() {
  // Redirect to default locale
  redirect({ href: '/', locale: routing.defaultLocale });
}
