'use client';

import { OrganizationSwitcher } from '@clerk/nextjs';
import { useOrganization } from '@clerk/nextjs';
import { Building2, ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useClerkAppearance } from '@/hooks/use-clerk-appearance';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useParams } from 'next/navigation';

interface OrgSwitcherProps {
  appearance?: 'navbar' | 'sidebar' | 'compact';
  hidePersonal?: boolean;
  showCreateOrganization?: boolean;
}

export function OrgSwitcher({
  appearance = 'navbar',
  hidePersonal = true,
  showCreateOrganization = true,
}: OrgSwitcherProps) {
  const { isLoaded, organization } = useOrganization();
  const { elements } = useClerkAppearance(appearance);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const params = useParams();
  const locale = params.locale as string;

  // Enhanced color system with better visibility
  const getThemeColors = () => {
    const isDark = mounted && resolvedTheme === 'dark';

    return {
      colorPrimary: isDark ? '#f8fafc' : '#1e293b',
      colorBackground: isDark ? '#1e293b' : '#ffffff',
      colorText: isDark ? '#f8fafc' : '#1e293b',
      colorTextSecondary: isDark ? '#94a3b8' : '#64748b',
      colorInputBackground: isDark ? '#334155' : '#f8fafc',
      colorInputText: isDark ? '#f8fafc' : '#1e293b',
      colorDanger: isDark ? '#f87171' : '#ef4444',
      colorSuccess: isDark ? '#4ade80' : '#22c55e',
      borderRadius: '0.5rem',
    };
  };

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  // Get appropriate classes based on appearance
  const getFallbackClasses = () => {
    const isDark = mounted && resolvedTheme === 'dark';
    const baseClasses = `flex items-center gap-2 rounded-md border transition-colors cursor-pointer ${
      isDark
        ? 'border-slate-600 bg-slate-800 hover:bg-slate-700 text-slate-100'
        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-900'
    }`;

    switch (appearance) {
      case 'sidebar':
        return `${baseClasses} w-full px-3 py-2 justify-start`;
      case 'compact':
        return `${baseClasses} px-2 py-1.5 text-sm`;
      default:
        return `${baseClasses} px-3 py-2`;
    }
  };

  // Show loading state with better visibility
  if (!mounted || !isLoaded) {
    const isDark = mounted && resolvedTheme === 'dark';
    return (
      <div
        className={`flex items-center gap-2 rounded-md border px-3 py-2 ${
          isDark
            ? 'border-slate-600 bg-slate-800'
            : 'border-slate-200 bg-slate-50'
        }`}
      >
        {appearance === 'sidebar' && (
          <Building2
            className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          />
        )}
        <div className='flex min-w-0 flex-1 items-center gap-2'>
          <div
            className={`h-6 w-6 rounded ${isDark ? 'bg-slate-600' : 'bg-slate-200'}`}
          ></div>
          <div className='flex min-w-0 flex-1 flex-col'>
            <div
              className={`h-3 w-20 rounded ${isDark ? 'bg-slate-600' : 'bg-slate-200'}`}
            ></div>
            <div
              className={`mt-1 h-2 w-16 rounded ${isDark ? 'bg-slate-600' : 'bg-slate-200'}`}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // Show fallback when no organization is selected with better visibility
  if (!organization) {
    const isDark = mounted && resolvedTheme === 'dark';
    return (
      <Link href='/org-switcher' className={getFallbackClasses()}>
        <Building2
          className={`h-4 w-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
        />
        <span
          className={`text-sm font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
        >
          Select Organization
        </span>
        <ChevronDown
          className={`ml-auto h-3 w-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
        />
      </Link>
    );
  }

  const themeColors = getThemeColors();
  return (
    <div className='flex items-center gap-2'>
      {appearance === 'sidebar' && (
        <Building2
          className={`h-4 w-4 flex-shrink-0 ${
            mounted && resolvedTheme === 'dark'
              ? 'text-slate-400'
              : 'text-slate-500'
          }`}
        />
      )}
      <div
        className={`org-switcher-wrapper ${mounted && resolvedTheme === 'dark' ? 'dark-theme' : 'light-theme'}`}
      >
        {' '}
        <OrganizationSwitcher
          hidePersonal={hidePersonal}
          afterSelectOrganizationUrl={`/${locale}/org-redirect`}
          afterCreateOrganizationUrl={`/${locale}/org-redirect`}
          appearance={{
            elements: {
              ...elements,
              // Override organization text elements safely
              ...(mounted && {
                organizationPreviewMainIdentifier: `${
                  (elements as Record<string, string>)
                    .organizationPreviewMainIdentifier || ''
                } ${
                  resolvedTheme === 'dark' ? 'text-slate-100' : 'text-slate-900'
                }`,
                organizationPreviewSecondaryIdentifier: `${
                  (elements as Record<string, string>)
                    .organizationPreviewSecondaryIdentifier || ''
                } ${
                  resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`,
              }),
            },
            variables: themeColors,
          }}
          organizationProfileUrl='/organization-profile'
          createOrganizationUrl={
            showCreateOrganization ? '/create-organization' : undefined
          }
          skipInvitationScreen={false}
        />
      </div>
    </div>
  );
}
