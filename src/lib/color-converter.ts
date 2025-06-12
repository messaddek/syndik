'use client';

/**
 * Converts OKLCH color to RGB
 * This is a simplified conversion - for production use, consider a full color library
 */

function oklchToRgb(oklchStr: string): string {
  // Parse the OKLCH string
  // Format: oklch(lightness chroma hue / alpha)
  try {
    // Extract values from the OKLCH string
    const match = oklchStr.match(
      /oklch$$([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?$$/
    );

    if (!match) {
      // If we can't parse it, return a fallback color
      return '#000000';
    }

    // For simplicity in this example, we'll map OKLCH to grayscale based on lightness
    // In a real implementation, you'd want a proper color space conversion
    const lightness = parseFloat(match[1]);

    // Convert lightness to hex (simplified)
    // OKLCH lightness is in range 0-1
    const value = Math.round(lightness * 255);
    const hex = value.toString(16).padStart(2, '0');

    // Return a grayscale hex color
    return `#${hex}${hex}${hex}`;
  } catch (error) {
    console.error('Error converting OKLCH to RGB:', error);
    return '#000000'; // Fallback to black
  }
}

/**
 * Gets the computed color value from a CSS variable and converts it to a format Clerk supports
 * Updated with better fallbacks for improved visibility
 */
export function getClerkCompatibleColor(variable: string): string {
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
    const value = bodyStyles.getPropertyValue(variable).trim();

    if (!value) {
      // Return appropriate fallback based on theme
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
    } // If it's an OKLCH color, convert it
    if (value.startsWith('oklch')) {
      return oklchToRgb(value);
    }

    // If it's already a supported format, return as is
    if (
      value.startsWith('#') ||
      value.startsWith('rgb') ||
      value.startsWith('hsl') ||
      value.startsWith('hwb') ||
      [
        'black',
        'blue',
        'red',
        'green',
        'grey',
        'gray',
        'white',
        'yellow',
        'transparent',
      ].includes(value)
    ) {
      return value;
    }

    // For any other format, return appropriate fallback
    if (isDarkMode) {
      const darkFallbacks: Record<string, string> = {
        '--primary': '#f8fafc',
        '--foreground': '#f8fafc',
        '--muted-foreground': '#94a3b8',
        '--background': '#0f172a',
        '--destructive': '#f87171',
        '--border': '#475569',
        '--input': '#475569',
      };
      return darkFallbacks[variable] || '#f8fafc';
    }
    return fallbacks[variable] || '#1e293b';
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
