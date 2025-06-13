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
