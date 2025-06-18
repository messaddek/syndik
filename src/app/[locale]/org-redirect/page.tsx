'use client';

import { useEffect } from 'react';
import { useUser, useOrganization } from '@clerk/nextjs';
import { useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { LoadingScreen } from '@/components/ui/loading-screen';
import type { Locale } from '@/i18n/config';

export default function OrgRedirectPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const router = useRouter();
  const searchParams = useSearchParams();
  const target = searchParams.get('target');
  const t = useTranslations('orgSwitcher');
  const locale = useLocale() as Locale;

  useEffect(() => {
    if (!userLoaded || !orgLoaded) return;

    if (!user || !organization) {
      // If no user or organization, redirect to org-switcher
      router.push(`/org-switcher`);
      return;
    }

    // Get user's role in the current organization
    const membership = user.organizationMemberships?.find(
      mem => mem.organization.id === organization.id
    );

    if (!membership) {
      // User is not a member of this organization
      router.push(`/org-switcher`);
      return;
    }

    const role = membership.role;

    // Handle target-specific routing
    if (target === 'portal') {
      // Always go to portal if specifically requested
      router.push(`/portal`);
      return;
    }

    // Default role-based routing
    if (role === 'org:admin' || role === 'org:member') {
      // Admins and managers go to dashboard
      if (role === 'org:admin') {
        router.push(`/dashboard`);
      } else {
        // Members (residents) go to portal
        router.push(`/portal`);
      }
    } else {
      // Unknown role, default to portal
      router.push(`/portal`);
    }
  }, [userLoaded, orgLoaded, user, organization, router, target, locale]); // Show loading state while determining where to redirect
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <LoadingScreen message={t('redirect.loading')} />
    </div>
  );
}
