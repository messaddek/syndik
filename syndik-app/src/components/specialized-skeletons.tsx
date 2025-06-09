import { Card, CardContent, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';

export function FormSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-10 w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-10 w-full' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-16' />
        <Skeleton className='h-20 w-full' />
      </div>
      <div className='flex justify-end space-x-2'>
        <Skeleton className='h-10 w-20' />
        <Skeleton className='h-10 w-20' />
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <Skeleton className='h-8 w-32' />
        <Skeleton className='h-10 w-24' />
      </div>
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-20' />
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className='h-12 w-full' />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
