import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

const RootPage = () => {
  // Redirect to default locale
  redirect(`/${routing.defaultLocale}`);
};
export default RootPage;
