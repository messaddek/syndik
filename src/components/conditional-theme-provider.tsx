'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';
import { LightModeProvider } from '@/components/light-mode-provider';

type ConditionalThemeProviderProps = {
  children: React.ReactNode;
};

// Define paths that should only use light mode
const LIGHT_MODE_PATHS = [
  '/',
  '/about',
  '/pricing',
  '/faq',
  '/help',
  '/terms',
  '/privacy',
  '/sign-in',
  '/sign-up',
];

export function ConditionalThemeProvider({
  children,
}: ConditionalThemeProviderProps) {
  const pathname = usePathname();

  // Check if current path should use light mode only
  const isLightModeOnly = LIGHT_MODE_PATHS.some(path => {
    // Exact match for root paths
    if (path === '/') return pathname === '/';
    // Check if pathname starts with the path (for nested routes like /sign-in/[[...sign-in]])
    return pathname.startsWith(path);
  });

  if (isLightModeOnly) {
    return <LightModeProvider>{children}</LightModeProvider>;
  }

  // For dashboard and portal pages, use the regular theme provider
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
