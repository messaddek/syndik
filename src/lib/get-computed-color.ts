'use client';

/**
 * Gets the computed color value from a CSS variable with enhanced visibility
 * @param variable CSS variable name (without the var())
 * @returns The computed color value or a fallback color with better contrast
 */
export function getComputedColor(variable: string): string {
  // Enhanced fallbacks with better contrast
  const fallbacks: Record<string, string> = {
    '--primary': '#1e293b', // slate-800
    '--foreground': '#1e293b', // slate-800
    '--muted-foreground': '#64748b', // slate-500
    '--background': '#ffffff', // white
    '--destructive': '#ef4444', // red-500
    '--border': '#e2e8f0', // slate-200
    '--input': '#e2e8f0', // slate-200
  };

  // Only run on the client
  if (typeof window === 'undefined') {
    return fallbacks[variable] || '#1e293b';
  }

  try {
    // Check for dark mode
    const isDarkMode = document.documentElement.classList.contains('dark');

    // Get the computed style
    const bodyStyles = window.getComputedStyle(document.body);
    const value = bodyStyles.getPropertyValue(variable);

    // Return appropriate fallback based on theme if no value exists
    if (!value) {
      if (isDarkMode) {
        const darkFallbacks: Record<string, string> = {
          '--primary': '#f8fafc', // slate-50
          '--foreground': '#f8fafc', // slate-50
          '--muted-foreground': '#94a3b8', // slate-400
          '--background': '#0f172a', // slate-900
          '--destructive': '#f87171', // red-400
          '--border': '#475569', // slate-600
          '--input': '#475569', // slate-600
        };
        return darkFallbacks[variable] || '#f8fafc';
      }
      return fallbacks[variable] || '#1e293b';
    }

    return value;
  } catch (error) {
    console.error('Error getting computed color:', error);
    // Return appropriate fallback on error
    if (
      typeof window !== 'undefined' &&
      document.documentElement.classList.contains('dark')
    ) {
      return '#f8fafc'; // Light color for dark mode
    }
    return '#1e293b'; // Dark color for light mode
  }
}
