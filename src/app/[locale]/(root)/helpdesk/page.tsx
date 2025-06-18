import { Suspense } from 'react';

import { HelpdeskView, loadHelpdeskSearchParams } from '@/modules/helpdesk';
import { getQueryClient, trpc } from '@/trpc/server';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { HelpdeskSkeleton } from '@/modules/helpdesk/ui/components/helpdesk-skeleton';

type HelpdeskPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HelpdeskPage({
  searchParams,
}: HelpdeskPageProps) {
  const startTime = Date.now();

  if (process.env.NODE_ENV === 'development') {
    console.log('[HELPDESK-PAGE] Starting page render', {
      timestamp: new Date().toISOString(),
    });
  }

  const filters = await loadHelpdeskSearchParams(await searchParams);

  if (process.env.NODE_ENV === 'development') {
    console.log('[HELPDESK-PAGE] Loaded search params', {
      filters,
      timeMs: Date.now() - startTime,
    });
  }
  const queryClient = getQueryClient();

  if (process.env.NODE_ENV === 'development') {
    console.log('[HELPDESK-PAGE] Starting prefetch queries');
  }
  // Use Promise.all to wait for both prefetch operations
  await Promise.all([
    queryClient.prefetchQuery(
      trpc.helpdesk.getTickets.queryOptions({
        filters: {
          buildingId: filters.buildingId || undefined,
          status:
            filters.status.length > 0
              ? (filters.status as (
                  | 'open'
                  | 'in_progress'
                  | 'resolved'
                  | 'closed'
                )[])
              : undefined,
          priority:
            filters.priority.length > 0
              ? (filters.priority as ('low' | 'medium' | 'high' | 'urgent')[])
              : undefined,
          category:
            filters.category.length > 0
              ? (filters.category as (
                  | 'maintenance'
                  | 'complaint'
                  | 'inquiry'
                  | 'billing'
                  | 'security'
                  | 'parking'
                  | 'noise'
                  | 'cleaning'
                  | 'other'
                )[])
              : undefined,
        },
        pagination: {
          page: filters.page,
          limit: filters.pageSize,
        },
        sortBy: filters.sortBy as
          | 'createdAt'
          | 'updatedAt'
          | 'priority'
          | 'status',
        sortOrder: filters.sortOrder as 'asc' | 'desc',
      })
    ),
    queryClient.prefetchQuery(
      trpc.helpdesk.getStats.queryOptions({
        buildingId: filters.buildingId || undefined,
      })
    ),
  ]);

  if (process.env.NODE_ENV === 'development') {
    console.log('[HELPDESK-PAGE] Prefetch queries completed', {
      totalTimeMs: Date.now() - startTime,
    });
  }

  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <Suspense fallback={<HelpdeskSkeleton />}>
          <HelpdeskView initialFilters={filters} />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
}
