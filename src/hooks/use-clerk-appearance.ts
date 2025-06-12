'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useClerkAppearance = (
  appearance: 'navbar' | 'sidebar' | 'compact' = 'navbar'
) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only applying theme after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';
  const getBaseStyles = () => {
    // Common styles for all appearances with enhanced visibility
    const baseStyles = {
      organizationSwitcherTrigger: `
        flex items-center gap-2 px-3 py-2 rounded-md border min-w-[200px] transition-colors
        ${
          isDark
            ? 'bg-slate-800 text-slate-100 border-slate-600 hover:bg-slate-700'
            : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'
        }
      `.trim(),

      organizationSwitcherTriggerIcon: isDark
        ? 'w-4 h-4 text-slate-400'
        : 'w-4 h-4 text-slate-500',
      organizationPreview: 'flex items-center gap-2 flex-1 min-w-0 w-full',
      organizationPreviewTextContainer:
        'flex flex-col min-w-0 flex-1 overflow-hidden',
      organizationPreviewAvatarBox: 'h-6 w-6 shrink-0',
      organizationPreviewMainIdentifier:
        `font-medium text-sm leading-none truncate !block !important ${isDark ? '!text-slate-100' : '!text-slate-900'}`.trim(),

      organizationPreviewSecondaryIdentifier: `
        text-xs leading-tight truncate !important
        ${isDark ? '!text-slate-400' : '!text-slate-500'}
      `.trim(),

      // Additional specific elements for organization name visibility
      organizationSwitcherPreviewMainIdentifier: `
        font-medium text-sm leading-none truncate !important
        ${isDark ? '!text-slate-100' : '!text-slate-900'}
      `.trim(),

      organizationSwitcherPreviewSecondaryIdentifier: `
        text-xs leading-tight truncate !important
        ${isDark ? '!text-slate-400' : '!text-slate-500'}
      `.trim(),

      organizationSwitcherPopoverCard: `
        w-64 max-w-sm rounded-lg shadow-lg border overflow-hidden
        ${isDark ? 'bg-slate-800 text-slate-100 border-slate-600' : 'bg-white text-slate-900 border-slate-200'}
      `.trim(),

      organizationSwitcherPopoverActions: isDark
        ? 'border-t border-slate-600 pt-2'
        : 'border-t border-slate-200 pt-2',
      organizationSwitcherPopoverActionButton: `
        flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors w-full
        ${isDark ? 'text-slate-100 hover:bg-slate-700 hover:text-white' : 'text-slate-900 hover:bg-slate-100'}
      `.trim(),

      // Add styles for the list items with better visibility
      organizationSwitcherPopoverActionButtonIcon: isDark
        ? 'text-slate-400'
        : 'text-slate-500',
      organizationSwitcherPopoverFooter: isDark
        ? 'border-t border-slate-600'
        : 'border-t border-slate-200',

      // Organization list items with enhanced visibility
      organizationSwitcherPopoverListItem: `
        px-3 py-2 hover:cursor-pointer
        ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}
      `.trim(),

      // Force text visibility with CSS overrides
      organizationSwitcherTriggerText: `
        ${isDark ? '!text-slate-100' : '!text-slate-900'} !important
      `.trim(),

      // Override any inherited dark text colors
      'cl-organizationPreview__mainIdentifier': `
        ${isDark ? '!text-slate-100' : '!text-slate-900'} !important
      `.trim(),

      'cl-organizationPreview__secondaryIdentifier': `
        ${isDark ? '!text-slate-400' : '!text-slate-500'} !important
      `.trim(),
    };
    if (appearance === 'sidebar') {
      return {
        ...baseStyles,
        organizationSwitcherTrigger: `
          flex items-center gap-2 w-full px-3 py-2 rounded-md transition-colors text-left
          ${
            isDark
              ? 'bg-transparent text-slate-100 hover:bg-slate-700 border-transparent'
              : 'bg-transparent text-slate-900 hover:bg-slate-100 border-transparent'
          }
        `.trim(),
      };
    }

    if (appearance === 'compact') {
      return {
        ...baseStyles,
        organizationSwitcherTrigger: `
          flex items-center gap-2 px-2 py-1.5 text-sm rounded-md border min-w-0 transition-colors
          ${
            isDark
              ? 'bg-slate-800 text-slate-100 border-slate-600 hover:bg-slate-700'
              : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'
          }
        `.trim(),
      };
    }

    // Default navbar appearance
    return {
      ...baseStyles,
      organizationSwitcherTrigger: `
        flex items-center gap-2 px-3 py-2 rounded-md border min-w-[200px] transition-colors
        ${
          isDark
            ? 'bg-slate-800 text-slate-100 border-slate-600 hover:bg-slate-700'
            : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'
        }
      `.trim(),
    };
  };

  // Only return styles after mounting to prevent hydration mismatch
  return {
    elements: mounted ? getBaseStyles() : {},
  };
};
