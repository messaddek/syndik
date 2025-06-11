import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { getQueryClient, trpc } from '@/trpc/server';
import { ResidentView, ResidentViewSkeleton } from '@/modules/residents';

type ResidentPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ResidentPage({
  params,
  searchParams,
}: ResidentPageProps) {
  const { id } = await params;
  const awaitedSearchParams = await searchParams;
  const queryClient = getQueryClient();

  // Validate the ID format
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    notFound();
  }

  // Prefetch resident data
  try {
    await queryClient.prefetchQuery(
      trpc.residents.getById.queryOptions({ id })
    );
  } catch (_error) {
    // If the resident doesn't exist, redirect to 404
    notFound();
  }

  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <Suspense fallback={<ResidentViewSkeleton />}>
          <ResidentView id={id} _searchParams={awaitedSearchParams} />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
}
