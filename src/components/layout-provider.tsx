'use client';

import { ConditionalThemeProvider } from '@/components/conditional-theme-provider';
import { DynamicDirectionProvider } from '@/components/dynamic-direction-provider';
import { TRPCReactProvider } from '@/trpc/client';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { Toaster } from 'sonner';
import { useClerkLocalization } from '@/hooks/use-clerk-localization';
import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n/config';
import { getSignOutRedirectUrl } from '@/lib/auth-utils';

// Inner component that uses theme
const InnerLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const locale = useLocale() as Locale;
  const clerkLocalization = useClerkLocalization();
  return (
    <ClerkProvider
      afterSignOutUrl={getSignOutRedirectUrl()}
      localization={clerkLocalization} // Use custom localization with residence terminology
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        layout: {
          privacyPageUrl: `/${locale}/privacy`,
          termsPageUrl: `/${locale}/terms`,
        },
        variables: {
          // Override problematic CSS variables with actual color values
          colorPrimary: resolvedTheme === 'dark' ? '#3b82f6' : '#1e40af',

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
