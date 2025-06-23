'use client';

import { useOrganization, useUser } from '@clerk/nextjs';
import { Building2 } from 'lucide-react';
import { OrganizationSwitcherCustom } from './organization-switcher';
import { AccountInitForm } from '@/modules/accounts/ui/components/account-init-form';
import { useTRPC } from '@/trpc/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { usePathname } from '@/i18n/routing';
import { getLoadingSkeleton } from '../utils/get-loading-skeleton';

interface OrganizationGuardProps {
  children: React.ReactNode;
}

export const OrganizationGuard = ({ children }: OrganizationGuardProps) => {
  const { organization, isLoaded: orgLoaded } = useOrganization();
  const { user, isLoaded: userLoaded } = useUser();
  const pathname = usePathname();
  const trpc = useTRPC();
  const queryClient = useQueryClient(); // Determine default role based on current route
  const isPortalRoute = pathname.startsWith('/portal');
  const defaultRole = isPortalRoute
    ? ('member' as const)
    : ('manager' as const);
  const allowedRoles: ('manager' | 'admin' | 'member')[] = isPortalRoute
    ? ['member']
    : ['manager', 'admin'];

  console.log('🛡️ OrganizationGuard - Pathname:', pathname);
  console.log('🛡️ OrganizationGuard - Is portal route:', isPortalRoute);
  console.log('🛡️ OrganizationGuard - Default role:', defaultRole);
  console.log('🛡️ OrganizationGuard - Allowed roles:', allowedRoles);

  // Check if user has an account
  const { data: account, isLoading: accountLoading } = useQuery(
    trpc.accounts.getCurrentAccount.queryOptions(undefined, {
      enabled: !!organization?.id, // Only check account if user has organization
    })
  );
  const initializeAccount = useMutation(
    trpc.accounts.initAccount.mutationOptions({
      onSuccess: async () => {
        // Invalidate and refetch relevant queries
        queryClient.invalidateQueries(
          trpc.accounts.getCurrentAccount.queryOptions()
        );
        queryClient.invalidateQueries(
          trpc.dashboard.getOverview.queryOptions()
        );
        // Also invalidate portal resident access queries for proper guard refresh
        queryClient.invalidateQueries(
          trpc.portal.hasResidentAccess.queryOptions()
        );
        console.log(
          '✅ OrganizationGuard - Account initialized, invalidated all relevant queries'
        );
      },
      onError: () => {
        // Error handling is managed by the form component
      },
    })
  ); // Show loading while Clerk is loading
  if (!userLoaded || !orgLoaded || accountLoading) {
    return getLoadingSkeleton(pathname);
  }

  // If user is not signed in, redirect (this shouldn't happen due to middleware)
  if (!user) {
    return null;
  }

  // If user has no organization, show organization creation prompt
  if (!organization) {
    return <OrganizationSwitcherCustom />;
  }
  // If user has organization but no account, show account initialization
  if (!account) {
    const handleInitializeAccount = (data: {
      name: string;
      email: string;
      role: 'manager' | 'admin' | 'member';
    }) => {
      initializeAccount.mutate(data);
    };

    const defaultName =
      user?.fullName ||
      `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
    const defaultEmail = user?.emailAddresses?.[0]?.emailAddress || '';
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'>
        <div className='animate-in fade-in-50 slide-in-from-bottom-4 w-full max-w-md duration-700'>
          <div className='mb-8 text-center'>
            <div className='animate-in zoom-in-75 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg delay-200 duration-500'>
              <Building2 className='h-10 w-10 text-white' />
            </div>
            <h1 className='animate-in fade-in mb-3 text-3xl font-bold text-gray-900 delay-300 duration-500 dark:text-white'>
              Welcome to Syndik
            </h1>
            <p className='animate-in fade-in text-lg leading-relaxed text-gray-600 delay-400 duration-500 dark:text-gray-300'>
              Complete your account setup to start managing your residential
              syndicate efficiently
            </p>
          </div>
          <div className='animate-in fade-in slide-in-from-bottom-4 delay-500 duration-500'>
            <AccountInitForm
              onSubmit={handleInitializeAccount}
              isLoading={initializeAccount.isPending}
              defaultName={defaultName}
              defaultEmail={defaultEmail}
              defaultRole={defaultRole}
              isPortalAccess={isPortalRoute}
              allowedRoles={allowedRoles}
            />
          </div>
        </div>
      </div>
    );
  }

  // User has both organization and account, show the app
  return <>{children}</>;
};
