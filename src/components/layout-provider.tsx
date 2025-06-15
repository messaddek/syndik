'use client';

import { ConditionalThemeProvider } from '@/components/conditional-theme-provider';
import { DynamicDirectionProvider } from '@/components/dynamic-direction-provider';
import { TRPCReactProvider } from '@/trpc/client';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { Toaster } from 'sonner';
import { useLocale } from 'next-intl';
import { Locale } from '@/i18n/config';
import { arSA, enUS, frFR } from '@clerk/localizations';

// Inner component that uses theme
const InnerLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const locale = useLocale() as Locale;
  const clerkLocale = locale === 'ar' ? arSA : locale === 'fr' ? frFR : enUS;

  return (
    <ClerkProvider
      localization={clerkLocale} // Set default locale for Clerk
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        layout: {
          privacyPageUrl: '/privacy',
          termsPageUrl: '/terms',
        },
        variables: {
          // Override problematic CSS variables with actual color values
          colorPrimary: resolvedTheme === 'dark' ? '#3b82f6' : '#2563eb',
          colorBackground: resolvedTheme === 'dark' ? '#0a0a0a' : '#ffffff',
          colorText: resolvedTheme === 'dark' ? '#fafafa' : '#0a0a0a',
          colorTextSecondary: resolvedTheme === 'dark' ? '#a1a1aa' : '#71717a',
          colorDanger: '#ef4444',
          colorSuccess: '#22c55e',
          colorWarning: '#f59e0b',
        },
      }}
    >
      <TRPCReactProvider>
        {children}
        <Toaster />
      </TRPCReactProvider>
    </ClerkProvider>
  );
};

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      <DynamicDirectionProvider>
        <ConditionalThemeProvider>
          <InnerLayoutProvider>{children}</InnerLayoutProvider>
        </ConditionalThemeProvider>
      </DynamicDirectionProvider>
    </NuqsAdapter>
  );
};
