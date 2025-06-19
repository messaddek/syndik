import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isRtlLocale, type Locale } from '@/i18n/config';
import { Almarai, Gabarito } from 'next/font/google';
import { cn } from '@/lib/utils';
import { LocaleDebug } from '@/components/locale-debug';
import { LocalePersistence } from '@/components/locale-persistence';

import '../globals.css';
import { LayoutProvider } from '@/components/layout-provider';

const gabarito = Gabarito({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const almarai = Almarai({
  weight: ['300', '400'],
  subsets: ['arabic'],
});

export const metadata: Metadata = {
  title: 'Syndik - Residential Syndicate Management',
  description: 'Modern SaaS platform for managing residential syndicates',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();
  const isRtl = isRtlLocale(locale as Locale);
  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body
        className={cn(
          locale !== 'ar' && `${gabarito.className}`,
          locale === 'ar' && almarai.className,
          'antialiased'
        )}
      >
        {' '}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocalePersistence />
          <LayoutProvider>
            {children}
            <LocaleDebug />
          </LayoutProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
