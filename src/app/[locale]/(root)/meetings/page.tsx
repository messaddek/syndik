'use client';

import { Suspense } from 'react';
import { TRPCErrorBoundary } from '@/components/trpc-error-boundary';
import { DashboardSkeleton } from '@/modules/dashboard/ui/components/dashboard-skeleton';
import { MeetingsContent } from '@/modules/meetings/ui/components/meetings-content';
import { PageHeader } from '@/components/page-header';
import { useTranslations } from 'next-intl';

export default function MeetingsPage() {
  const t = useTranslations('meetings');

  return (
    <TRPCErrorBoundary>
      <div className='flex flex-col space-y-4'>
        <PageHeader title={t('title')} description={t('description')} />

        <Suspense fallback={<DashboardSkeleton />}>
          <MeetingsContent />
        </Suspense>
      </div>
    </TRPCErrorBoundary>
  );
}
