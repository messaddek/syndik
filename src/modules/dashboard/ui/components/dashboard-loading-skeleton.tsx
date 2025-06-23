import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const DashboardOverviewSkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* Overview Cards */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {[1, 2, 3, 4].map(i => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-2 h-8 w-16' />
              <Skeleton className='h-3 w-32' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Financial Summary and Recent Activity */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Financial Summary Card */}
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-48' />
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {[1, 2, 3].map(i => (
                <div key={i} className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-20' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-32' />
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className='flex items-center space-x-3'>
                  <Skeleton className='h-4 w-4 rounded-full' />
                  <div className='min-w-0 flex-1 space-y-1'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-3 w-24' />
                  </div>
                  <Skeleton className='h-3 w-16' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-4 w-64' />
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className='flex h-20 w-full flex-col items-center justify-center rounded-md border border-dashed border-gray-300'
              >
                <Skeleton className='mb-2 h-6 w-6' />
                <Skeleton className='h-4 w-16' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const DashboardCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-4 w-4' />
      </CardHeader>
      <CardContent>
        <Skeleton className='mb-2 h-8 w-16' />
        <Skeleton className='h-3 w-32' />
      </CardContent>
    </Card>
  );
}

export const ActivityListSkeleton = () => {
  return (
    <div className='space-y-3'>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className='flex items-center space-x-3'>
          <Skeleton className='h-4 w-4 rounded-full' />
          <div className='min-w-0 flex-1 space-y-1'>
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-3 w-24' />
          </div>
          <Skeleton className='h-3 w-16' />
        </div>
      ))}
    </div>
  );
}
