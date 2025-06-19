'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';

export function LocaleDebug() {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations('navigation');

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className='fixed right-4 bottom-4 z-50 rounded-md bg-black p-2 text-xs text-white opacity-70'>
      <div>Locale: {locale}</div>
      <div>Pathname: {pathname}</div>
      <div>Params: {JSON.stringify(params)}</div>
      <div>Translation test: {t('back_to_landing')}</div>
    </div>
  );
}
