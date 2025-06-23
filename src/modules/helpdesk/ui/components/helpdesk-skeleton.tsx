import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const HelpdeskSkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-48' />
          <Skeleton className='h-4 w-96' />
        </div>
        <Skeleton className='h-10 w-32' />
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-4 w-4 rounded-full' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-16' />
              <Skeleton className='mt-2 h-3 w-32' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className='pb-4'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-6 w-16' />
            <Skeleton className='h-8 w-32' />
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center space-x-4'>
            <div className='flex-1 space-y-2'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='w-48 space-y-2'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='w-48 space-y-2'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className='space-y-4'>
        <div className='flex space-x-2'>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className='h-9 w-20' />
          ))}
        </div>

        {/* Tickets List */}
        <Card>
          <CardContent className='p-0'>
            <div className='divide-y'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='space-y-3 p-4'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 space-y-2'>
                      <Skeleton className='h-5 w-3/4' />
                      <div className='flex items-center space-x-2'>
                        <Skeleton className='h-4 w-16' />
                        <Skeleton className='h-4 w-20' />
                        <Skeleton className='h-4 w-24' />
                      </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Skeleton className='h-6 w-16' />
                      <Skeleton className='h-6 w-20' />
                    </div>
                  </div>
                  <Skeleton className='h-4 w-full' />
                  <div className='flex items-center justify-between'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-4 w-24' />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
