'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const UnitViewSkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Button variant='ghost' size='sm' disabled>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Units
          </Button>
          <div>
            <div className='flex items-center space-x-2'>
              <Home className='h-6 w-6 text-green-600' />
              <Skeleton className='h-8 w-32' />
              <Skeleton className='h-6 w-16' />
            </div>
            <div className='mt-1 flex items-center space-x-1'>
              <Skeleton className='h-4 w-4 rounded-full' />
              <Skeleton className='h-4 w-48' />
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-9 w-28' />
          <Skeleton className='h-9 w-16' />
          <Skeleton className='h-9 w-20' />
        </div>
      </div>

      {/* Overview Cards */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-1 h-8 w-16' />
              <Skeleton className='h-3 w-20' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Unit Details */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Unit Information Card */}
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-48' />
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <Skeleton className='mb-1 h-4 w-20' />
                  <Skeleton className='h-4 w-16' />
                </div>
              ))}
            </div>

            {/* Description section */}
            <div>
              <Skeleton className='mb-1 h-4 w-20' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='mt-1 h-4 w-3/4' />
            </div>

            {/* Status section */}
            <div>
              <Skeleton className='mb-1 h-4 w-12' />
              <Skeleton className='h-6 w-16' />
            </div>

            {/* Created section */}
            <div>
              <Skeleton className='mb-1 h-4 w-16' />
              <Skeleton className='h-4 w-24' />
            </div>
          </CardContent>
        </Card>

        {/* Building Information Card */}
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-36' />
            <Skeleton className='h-4 w-40' />
          </CardHeader>
          <CardContent className='space-y-4'>
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <Skeleton className='mb-1 h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
            ))}
            <div className='flex space-x-2 pt-4'>
              <Skeleton className='h-8 w-36' />
              <Skeleton className='h-8 w-28' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Residents Section */}
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-4 w-48' />
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {[...Array(2)].map((_, i) => (
              <Card key={i} className='transition-shadow hover:shadow-md'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center justify-between'>
                    <Skeleton className='h-6 w-32' />
                    <div className='flex space-x-1'>
                      <Skeleton className='h-5 w-12' />
                      <Skeleton className='h-5 w-14' />
                    </div>
                  </div>
                  <Skeleton className='h-4 w-40' />
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <Skeleton className='h-4 w-20' />
                      <Skeleton className='h-4 w-20' />
                    </div>
                    <div className='flex justify-between'>
                      <Skeleton className='h-4 w-12' />
                      <Skeleton className='h-4 w-24' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Overview */}
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-36' />
          <Skeleton className='h-4 w-64' />
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='text-center'>
                <Skeleton className='mx-auto mb-1 h-8 w-20' />
                <Skeleton className='mx-auto h-4 w-32' />
              </div>
            ))}
          </div>
          <div className='mt-4 text-center'>
            <Skeleton className='mx-auto h-9 w-48' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
