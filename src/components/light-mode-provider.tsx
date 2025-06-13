'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type LightModeProviderProps = {
  children: React.ReactNode;
};

export function LightModeProvider({ children }: LightModeProviderProps) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='light'
      forcedTheme='light'
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
