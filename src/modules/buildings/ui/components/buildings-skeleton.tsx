import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function BuildingsListSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header skeleton */}
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-24' />
          <Skeleton className='h-4 w-48' />
        </div>
        <Skeleton className='h-10 w-32' />
      </div>

      {/* Buildings grid skeleton */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Card key={i} className='transition-shadow hover:shadow-lg'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5' />
                <Skeleton className='h-6 w-32' />
              </div>
              <div className='flex items-center gap-1'>
                <Skeleton className='h-4 w-4' />
                <Skeleton className='h-4 w-24' />
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-20' />
                  <div className='flex items-center gap-1'>
                    <Skeleton className='h-3 w-3' />
                    <Skeleton className='h-4 w-8' />
                  </div>
                </div>
                <div className='space-y-1'>
                  <Skeleton className='h-3 w-full' />
                  <Skeleton className='h-3 w-3/4' />
                </div>
                <div className='flex space-x-2 pt-2'>
                  <Skeleton className='h-8 flex-1' />
                  <Skeleton className='h-8 flex-1' />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function BuildingCardSkeleton() {
  return (
    <Card className='transition-shadow hover:shadow-lg'>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5' />
          <Skeleton className='h-6 w-32' />
        </div>
        <div className='flex items-center gap-1'>
          <Skeleton className='h-4 w-4' />
          <Skeleton className='h-4 w-24' />
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-4 w-20' />
            <div className='flex items-center gap-1'>
              <Skeleton className='h-3 w-3' />
              <Skeleton className='h-4 w-8' />
            </div>
          </div>
          <div className='space-y-1'>
            <Skeleton className='h-3 w-full' />
            <Skeleton className='h-3 w-3/4' />
          </div>
          <div className='flex space-x-2 pt-2'>
            <Skeleton className='h-8 flex-1' />
            <Skeleton className='h-8 flex-1' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
