'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useRouter } from '@/i18n/navigation';
import { useEffect } from 'react';
import { usePathname } from '@/i18n/routing';
import { getLoadingSkeleton } from '../utils/get-loading-skeleton';

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
  const pathname = usePathname();

  const { data: account, isLoading } = useQuery(
    trpc.accounts.getCurrentAccount.queryOptions()
  );
  useEffect(() => {
    if (!isLoading && account) {
      console.log('🔒 RoleGuard - Account data:', account);

      console.log('🔒 RoleGuard - Allowed roles:', allowedRoles);

      console.log('🔒 RoleGuard - Account role:', account.role);

      console.log(
        '🔒 RoleGuard - Role check result:',
        allowedRoles.includes(account.role as 'manager' | 'admin' | 'member')
      );

      // Check if user's role is allowed
      if (
        !allowedRoles.includes(account.role as 'manager' | 'admin' | 'member')
      ) {
        console.log('🚫 RoleGuard - Role not allowed, redirecting...');
        console.log('🚫 RoleGuard - RedirectTo prop:', redirectTo);

        if (redirectTo) {
          console.log('🚫 RoleGuard - Redirecting to:', redirectTo);
          router.push(redirectTo);
        } else {
          // Default redirects based on role
          if (account.role === 'member') {
            console.log(
              '🚫 RoleGuard - Member role detected, redirecting to /portal'
            );
            router.push('/portal');
          } else if (account.role === 'manager' || account.role === 'admin') {
            console.log(
              '🚫 RoleGuard - Manager/Admin role detected, redirecting to /dashboard'
            );
            router.push('/dashboard');
          } else {
            console.log('🚫 RoleGuard - Unknown role, redirecting to /');
            router.push('/');
          }
        }
      } else {
        console.log('✅ RoleGuard - Role allowed, continuing...');
      }
    } else if (!isLoading && !account) {
      console.log('⚠️ RoleGuard - No account found');
    } else if (isLoading) {
      console.log('⏳ RoleGuard - Still loading account...');
    }
  }, [account, isLoading, allowedRoles, redirectTo, router]);

  if (isLoading) {
    return getLoadingSkeleton(pathname);
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
