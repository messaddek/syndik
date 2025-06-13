'use client';

import { ConditionalThemeProvider } from '@/components/conditional-theme-provider';
import { TRPCReactProvider } from '@/trpc/client';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { Toaster } from 'sonner';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Inner component that uses theme
const InnerLayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  return (
    <ClerkProvider
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
      <html lang='en' suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <TRPCReactProvider>
            {children}
            <Toaster />
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      <ConditionalThemeProvider>
        <InnerLayoutProvider>{children}</InnerLayoutProvider>
      </ConditionalThemeProvider>
    </NuqsAdapter>
  );
};
