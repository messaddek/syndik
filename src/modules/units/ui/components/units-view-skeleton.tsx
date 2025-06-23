'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Plus, MoreHorizontal } from 'lucide-react';

export const UnitsViewSkeleton = () => {
  return (
    <>
      {/* Header */}
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <Skeleton className='h-8 w-32' />
          <Skeleton className='mt-1 h-4 w-24' />
        </div>
        <div className='flex items-center space-x-2'>
          <Plus className='h-4 w-4' />
          <Skeleton className='h-10 w-24' />
        </div>
      </div>

      {/* Units Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className='transition-shadow hover:shadow-lg'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-6 w-16' /> {/* Unit Number */}
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-5 w-16 rounded-full' />
                  {/* Status Badge */}
                  <div className='flex items-center'>
                    <MoreHorizontal className='h-4 w-4' />
                  </div>
                </div>
              </div>
              <Skeleton className='h-4 w-40' /> {/* Building and Floor */}
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                {/* Unit Details */}
                <div className='flex justify-between text-sm'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-4' />
                </div>
                <div className='flex justify-between text-sm'>
                  <Skeleton className='h-4 w-18' />
                  <Skeleton className='h-4 w-4' />
                </div>
                <div className='flex justify-between text-sm'>
                  <Skeleton className='h-4 w-12' />
                  <Skeleton className='h-4 w-12' />
                </div>
                <div className='flex justify-between text-sm font-medium'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-16' />
                </div>

                {/* Relationship Information */}
                <div className='mt-2 border-t pt-2'>
                  <div className='flex justify-between text-sm'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-4' />
                  </div>
                  <div className='flex justify-between text-sm'>
                    <Skeleton className='h-4 w-28' />
                    <Skeleton className='h-4 w-16' />
                  </div>
                </div>

                {/* Description */}
                <div className='mt-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='mt-1 h-4 w-3/4' />
                </div>
              </div>

              {/* Action Button */}
              <div className='mt-4 flex gap-2'>
                <Skeleton className='h-8 w-full' />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

