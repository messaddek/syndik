'use client';

import { Progress } from '@/components/ui/progress';
import { Building2, Plus, ArrowUp } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface OrganizationQuotaProps {
  showTitle?: boolean;
  className?: string;
}

export function OrganizationQuota({
  showTitle = true,
  className = '',
}: OrganizationQuotaProps) {
  const router = useRouter();
  const trpc = useTRPC();
  const {
    data: usage,
    isLoading,
    error,
  } = useQuery(trpc.accounts.getOrganizationUsage.queryOptions());

  if (error) {
    console.error('Failed to load organization usage:', error);
    return null;
  }

  if (isLoading) {
    return (
      <div className={`space-y-3 ${className}`}>
        {showTitle && <Skeleton className='h-4 w-32' />}
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <Skeleton className='h-3 w-20' />
            <Skeleton className='h-3 w-16' />
          </div>
          <Skeleton className='h-2 w-full' />
          <Skeleton className='h-3 w-24' />
        </div>
      </div>
    );
  }

  if (!usage) {
    return null;
  }

  const progressValue = Math.min(100, usage.usagePercentage);
  const isNearLimit = progressValue >= 80;
  const isAtLimit = !usage.canCreateMore;
  const handleCreateOrganization = () => {
    // Navigate to organization creation flow
    router.push('/org-switcher');
  };

  const handleUpgrade = () => {
    // Navigate to billing settings
    router.push('/settings?tab=billing');
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {showTitle && (
        <div className='flex items-center gap-2'>
          <Building2 className='text-muted-foreground h-4 w-4' />
          <span className='text-muted-foreground text-sm font-medium'>
            Residences
          </span>
        </div>
      )}

      <div className='space-y-2'>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Used</span>
          <span className='font-medium'>
            {usage.currentCount} / {usage.maxAllowed}
          </span>
        </div>
        <Progress
          value={progressValue}
          className={`h-2 ${
            isAtLimit
              ? '[&>div]:bg-red-500'
              : isNearLimit
                ? '[&>div]:bg-yellow-500'
                : '[&>div]:bg-blue-500'
          }`}
        />{' '}
        <div className='flex items-center justify-between'>
          <span
            className={`text-xs ${
              isAtLimit
                ? 'text-red-600'
                : isNearLimit
                  ? 'text-yellow-600'
                  : 'text-muted-foreground'
            }`}
          >
            {usage.planName}
          </span>

          <div className='flex items-center gap-1'>
            {usage.canCreateMore && (
              <Button
                variant='ghost'
                size='sm'
                onClick={handleCreateOrganization}
                className='h-6 px-2 text-xs text-blue-600 hover:bg-blue-50 hover:text-blue-700'
              >
                <Plus className='mr-1 h-3 w-3' />
                Add
              </Button>
            )}
            {(isNearLimit || isAtLimit) && (
              <Button
                variant='ghost'
                size='sm'
                onClick={handleUpgrade}
                className={`h-6 px-2 text-xs ${
                  isAtLimit
                    ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                    : 'text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700'
                }`}
              >
                <ArrowUp className='mr-1 h-3 w-3' />
                Upgrade
              </Button>
            )}
          </div>
        </div>{' '}
        {usage.remaining > 0 ? (
          <p className='text-muted-foreground text-xs'>
            {usage.remaining} more available
          </p>
        ) : (
          <p className='text-xs text-red-600'>Plan limit reached</p>
        )}
      </div>
    </div>
  );
}
