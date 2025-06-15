'use client';

import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useRouter } from '@/i18n/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function PortalAuthGuard({ children }: { children: React.ReactNode }) {
  const { userId, orgId } = useAuth();
  const router = useRouter();
  const trpc = useTRPC();

  const {
    data: account,
    isLoading,
    error,
  } = useQuery(
    trpc.accounts.getCurrentAccount.queryOptions(undefined, {
      enabled: !!(userId && orgId),
      retry: false,
    })
  );

  useEffect(() => {
    if (!userId || !orgId) {
      router.push('/sign-in');
      return;
    }

    if (!isLoading && error) {
      // If no account exists, redirect to setup
      router.push('/portal/setup');
      return;
    }

    if (account) {
      // Redirect managers/admins to main dashboard
      if (account.role === 'manager' || account.role === 'admin') {
        router.push('/dashboard');
        return;
      }

      // If not a member (resident), redirect to setup
      if (account.role !== 'member') {
        router.push('/portal/setup');
        return;
      }
    }
  }, [userId, orgId, account, isLoading, error, router]);

  if (!userId || !orgId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className='bg-background min-h-screen p-6'>
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-8 w-64' />
            <Skeleton className='h-6 w-16' />
          </div>
          <div className='grid gap-4 md:grid-cols-4'>
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className='h-24 w-full' />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !account || account.role !== 'member') {
    return null;
  }

  return <>{children}</>;
}
