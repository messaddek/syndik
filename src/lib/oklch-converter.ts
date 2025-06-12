'use client';

/**
 * A more accurate OKLCH to sRGB converter
 * Note: This is a simplified version and may not be 100% accurate for all OKLCH values
 */

export function oklchToHex(oklchStr: string): string {
  try {
    // Parse the OKLCH string
    const match = oklchStr.match(
      /oklch$$([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?$$/
    );

    if (!match) {
      return '#000000';
    }

    const l = Number.parseFloat(match[1]); // Lightness (0-1)
    const c = Number.parseFloat(match[2]); // Chroma
    const h = Number.parseFloat(match[3]); // Hue (degrees)
    const _alpha = match[4] ? Number.parseFloat(match[4]) : 1; // Alpha (0-1)

    // For a simple approximation, we'll map OKLCH to HSL
    // This is not accurate but provides a reasonable fallback

    // Map lightness directly (OKLCH L → HSL L)
    const hslL = l * 100;

    // Map chroma to saturation (simplified)
    // OKLCH chroma doesn't directly map to HSL saturation
    // This is a rough approximation
    const hslS = Math.min(c * 100, 100);

    // Hue can be used directly
    const hslH = h;

    // Convert HSL to RGB
    const hslColor = `hsl(${hslH}, ${hslS}%, ${hslL}%)`;

    // Use a temporary element to convert HSL to RGB
    const tempEl = document.createElement('div');
    tempEl.style.color = hslColor;
    document.body.appendChild(tempEl);
    const rgbColor = window.getComputedStyle(tempEl).color;
    document.body.removeChild(tempEl);

    // If we got a valid RGB color, return it
    if (rgbColor.startsWith('rgb')) {
      // Extract RGB values
      const rgbMatch = rgbColor.match(/rgb$$(\d+),\s*(\d+),\s*(\d+)$$/);
      if (rgbMatch) {
        const r = Number.parseInt(rgbMatch[1]);
        const g = Number.parseInt(rgbMatch[2]);
        const b = Number.parseInt(rgbMatch[3]);

        // Convert to hex
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      }
    }

    // Fallback for grayscale based on lightness
    const value = Math.round(l * 255);
    const hex = value.toString(16).padStart(2, '0');
    return `#${hex}${hex}${hex}`;
  } catch (error) {
    console.error('Error converting OKLCH to hex:', error);
    return '#000000'; // Fallback to black
  }
}

/**
 * A simpler approach that maps OKLCH to grayscale based on lightness
 */
export function oklchToGrayscale(oklchStr: string): string {
  try {
    // Extract lightness from OKLCH
    const match = oklchStr.match(/oklch\(([\d.]+)/);
    if (!match) return '#000000';

    const lightness = Number.parseFloat(match[1]);
    const value = Math.round(lightness * 255);
    const hex = value.toString(16).padStart(2, '0');

    return `#${hex}${hex}${hex}`;
  } catch (error) {
    console.error('Error converting OKLCH to grayscale:', error);
    return '#000000';
  }
}

/**
 * Gets a Clerk-compatible color from CSS variables
 * Falls back to hardcoded values for OKLCH colors with better visibility
 */
export function getClerkSafeColor(variable: string): string {
  // Enhanced hardcoded fallbacks with better contrast
  const hardcodedColors: Record<string, string> = {
    '--primary': '#1e293b', // slate-800
    '--primary-foreground': '#f8fafc', // slate-50
    '--foreground': '#1e293b', // slate-800
    '--background': '#ffffff', // white
    '--muted-foreground': '#64748b', // slate-500
    '--destructive': '#ef4444', // red-500
    '--sidebar-foreground': '#1e293b', // slate-800
    '--sidebar-background': '#f8fafc', // slate-50
    '--border': '#e2e8f0', // slate-200
    '--input': '#e2e8f0', // slate-200
    '--accent': '#f1f5f9', // slate-100
    '--accent-foreground': '#1e293b', // slate-800
  };

  // For dark mode, use different hardcoded values with better contrast
  const isDarkMode =
    typeof window !== 'undefined' &&
    document.documentElement.classList.contains('dark');

  if (isDarkMode) {
    hardcodedColors['--primary'] = '#f8fafc'; // slate-50
    hardcodedColors['--primary-foreground'] = '#1e293b'; // slate-800
    hardcodedColors['--foreground'] = '#f8fafc'; // slate-50
    hardcodedColors['--background'] = '#0f172a'; // slate-900
    hardcodedColors['--muted-foreground'] = '#94a3b8'; // slate-400
    hardcodedColors['--destructive'] = '#f87171'; // red-400
    hardcodedColors['--sidebar-foreground'] = '#f8fafc'; // slate-50
    hardcodedColors['--sidebar-background'] = '#1e293b'; // slate-800
    hardcodedColors['--border'] = '#475569'; // slate-600
    hardcodedColors['--input'] = '#475569'; // slate-600
    hardcodedColors['--accent'] = '#334155'; // slate-700
    hardcodedColors['--accent-foreground'] = '#f8fafc'; // slate-50
  }

  // Return the hardcoded color with enhanced visibility
  return hardcodedColors[variable] || (isDarkMode ? '#f8fafc' : '#1e293b');
}
