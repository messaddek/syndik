'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DashboardSkeleton } from '@/modules/dashboard/ui/components/dashboard-skeleton';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: ('manager' | 'admin' | 'member')[];
  redirectTo?: string;
}

export function RoleGuard({
  children,
  allowedRoles,
  redirectTo,
}: RoleGuardProps) {
  const trpc = useTRPC();
  const router = useRouter();

  const { data: account, isLoading } = useQuery(
    trpc.accounts.getCurrentAccount.queryOptions()
  );
  useEffect(() => {
    if (!isLoading && account) {
      // eslint-disable-next-line no-console
      console.log('🔒 RoleGuard - Account data:', account);
      // eslint-disable-next-line no-console
      console.log('🔒 RoleGuard - Allowed roles:', allowedRoles);
      // eslint-disable-next-line no-console
      console.log('🔒 RoleGuard - Account role:', account.role);
      // eslint-disable-next-line no-console
      console.log(
        '🔒 RoleGuard - Role check result:',
        allowedRoles.includes(account.role as 'manager' | 'admin' | 'member')
      );

      // Check if user's role is allowed
      if (
        !allowedRoles.includes(account.role as 'manager' | 'admin' | 'member')
      ) {
        // eslint-disable-next-line no-console
        console.log('🚫 RoleGuard - Role not allowed, redirecting...');
        // eslint-disable-next-line no-console
        console.log('🚫 RoleGuard - RedirectTo prop:', redirectTo);

        if (redirectTo) {
          // eslint-disable-next-line no-console
          console.log('🚫 RoleGuard - Redirecting to:', redirectTo);
          router.push(redirectTo);
        } else {
          // Default redirects based on role
          if (account.role === 'member') {
            // eslint-disable-next-line no-console
            console.log(
              '🚫 RoleGuard - Member role detected, redirecting to /portal'
            );
            router.push('/portal');
          } else if (account.role === 'manager' || account.role === 'admin') {
            // eslint-disable-next-line no-console
            console.log(
              '🚫 RoleGuard - Manager/Admin role detected, redirecting to /dashboard'
            );
            router.push('/dashboard');
          } else {
            // eslint-disable-next-line no-console
            console.log('🚫 RoleGuard - Unknown role, redirecting to /');
            router.push('/');
          }
        }
      } else {
        // eslint-disable-next-line no-console
        console.log('✅ RoleGuard - Role allowed, continuing...');
      }
    } else if (!isLoading && !account) {
      // eslint-disable-next-line no-console
      console.log('⚠️ RoleGuard - No account found');
    } else if (isLoading) {
      // eslint-disable-next-line no-console
      console.log('⏳ RoleGuard - Still loading account...');
    }
  }, [account, isLoading, allowedRoles, redirectTo, router]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (!account) {
    return null; // This should be handled by OrganizationGuard
  }

  // Check if user role is allowed
  if (!allowedRoles.includes(account.role as 'manager' | 'admin' | 'member')) {
    return null; // Redirect will happen in useEffect
  }

  return <>{children}</>;
}
