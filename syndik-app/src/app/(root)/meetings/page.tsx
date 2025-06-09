'use client';

import { Suspense } from 'react';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { DashboardSkeleton } from '@/components/loading-skeletons';
import { MeetingsContent } from '@/modules/meetings/ui/components/meetings-content';

export default function MeetingsPage() {
  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Meetings</h1>
          <p className='text-muted-foreground'>
            Schedule and manage syndicate meetings
          </p>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <MeetingsContent />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
}
