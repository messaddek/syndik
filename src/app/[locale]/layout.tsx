import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { isRtlLocale, type Locale } from '@/i18n/config';
import { Almarai, Geist, Geist_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';

import '../globals.css';
import { LayoutProvider } from '@/components/layout-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
          locale !== 'ar' && `${geistSans.variable} ${geistMono.variable}`,
          locale === 'ar' && almarai.className,
          'antialiased'
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LayoutProvider>{children}</LayoutProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
