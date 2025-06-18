import { Suspense } from 'react';

import { HelpdeskView, loadHelpdeskSearchParams } from '@/modules/helpdesk';
import { getQueryClient, trpc } from '@/trpc/server';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { HelpdeskSkeleton } from '@/modules/helpdesk/ui/components/helpdesk-skeleton';
import type {
  TicketStatus,
  TicketPriority,
  TicketCategory,
} from '@/modules/helpdesk/types';

type HelpdeskPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PortalHelpdeskPage({
  searchParams,
}: HelpdeskPageProps) {
  const filters = await loadHelpdeskSearchParams(await searchParams);
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchQuery(
      trpc.helpdesk.getTickets.queryOptions({
        filters: {
          buildingId: filters.buildingId || undefined,
          status:
            filters.status.length > 0
              ? (filters.status as TicketStatus[])
              : undefined,
          priority:
            filters.priority.length > 0
              ? (filters.priority as TicketPriority[])
              : undefined,
          category:
            filters.category.length > 0
              ? (filters.category as TicketCategory[])
              : undefined,
        },
        pagination: { page: 1, limit: 20 },
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })
    ),
    queryClient.prefetchQuery(
      trpc.helpdesk.getStats.queryOptions({
        buildingId: filters.buildingId || undefined,
      })
    ),
  ]);

  return (
    <TRPCErrorBoundary>
      <Suspense fallback={<HelpdeskSkeleton />}>
        {/* Resident Helpdesk View */}
        <HelpdeskView initialFilters={filters} />
      </Suspense>
    </TRPCErrorBoundary>
  );
}
