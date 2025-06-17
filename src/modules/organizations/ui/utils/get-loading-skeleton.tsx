'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { BuildingViewSkeleton } from '@/modules/buildings/ui/components/building-view-skeleton';
import { UnitViewSkeleton } from '@/modules/units/ui/components/unit-view-skeleton';
import { ResidentViewSkeleton } from '@/modules/residents/ui/components/resident-view-skeleton';
import { DashboardSkeleton } from '@/modules/dashboard/ui/components/dashboard-skeleton';
import { BuildingsListSkeleton } from '@/modules/buildings/ui/components/buildings-skeleton';
import { ResidentsViewSkeleton } from '@/modules/residents/ui/components/residents-view-skeleton';
import { UnitsViewSkeleton } from '@/modules/units/ui/components/units-view-skeleton';
import { FinancesViewSkeleton } from '@/modules/finances/ui/components/finances-view-skeleton';
import { MeetingsViewSkeleton } from '@/modules/meetings/ui/components/meetings-view-skeleton';
import { NotificationsViewSkeleton } from '@/modules/notifications/ui/components/notifications-view-skeleton';
import { SettingsViewSkeleton } from '@/components/settings-view-skeleton';

/**
 * Get appropriate loading skeleton based on the current route
 * @param pathname - The current pathname from usePathname()
 * @returns React component for the appropriate skeleton
 */
export function getLoadingSkeleton(pathname: string) {
  const pathSegments = pathname.split('/').filter(Boolean);
  const basePath = `/${pathSegments.slice(0, 2).join('/')}`;

  console.log('getLoadingSkeleton called with pathname:', pathname);
  console.log('Base path:', basePath);

  // Individual detail views (with ID parameter)
  if (pathSegments.length > 3) {
    console.log(
      'Path segments:',
      pathSegments,
      'more than 3:',
      pathSegments.length
    );
    if (basePath.endsWith('/buildings')) {
      return <BuildingViewSkeleton />;
    }
    if (basePath.endsWith('/units')) {
      return <UnitViewSkeleton />;
    }
    if (basePath.endsWith('/residents')) {
      return <ResidentViewSkeleton />;
    }
  }
  // List views (exact path matching)
  if (pathSegments.length === 3) {
    console.log(
      'Path segments:',
      pathSegments,
      'exactly 3:',
      pathSegments.length
    );
    if (basePath.endsWith('/buildings')) {
      return <BuildingsListSkeleton />;
    }
    if (basePath.endsWith('/units')) {
      return <UnitsViewSkeleton />;
    }
    if (basePath.endsWith('/residents')) {
      return <ResidentsViewSkeleton />;
    }
    if (basePath.endsWith('/dashboard')) {
      return <DashboardSkeleton />;
    }
    if (basePath.endsWith('/finances')) {
      return <FinancesViewSkeleton />;
    }
    if (basePath.endsWith('/meetings')) {
      return <MeetingsViewSkeleton />;
    }
    if (basePath.endsWith('/notifications')) {
      return <NotificationsViewSkeleton />;
    }
    if (basePath.endsWith('/settings')) {
      return <SettingsViewSkeleton />;
    }
  }

  // Default skeleton for other pages
  return (
    <div className='space-y-6'>
      <Skeleton className='h-8 w-48' />
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className='h-32' />
        ))}
      </div>
      <Skeleton className='h-64' />
    </div>
  );
}
