'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

export function MeetingsViewSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='h-8 w-32' />
          <Skeleton className='mt-1 h-4 w-48' />
        </div>
        <Skeleton className='h-10 w-32' />
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {[
          { icon: Calendar, label: 'Total Meetings' },
          { icon: Clock, label: 'Upcoming' },
          { icon: Users, label: 'Attendees' },
        ].map((item, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-20' />
              <item.icon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-2 h-8 w-16' />
              <Skeleton className='h-3 w-24' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Section */}
      <Card>
        <CardHeader>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-8 w-20' />
            <Skeleton className='h-8 w-16' />
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* Meeting Cards */}
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className='border border-gray-200'>
              <CardHeader>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <div className='flex items-center space-x-2'>
                      <Skeleton className='h-6 w-48' />
                      <Skeleton className='h-5 w-16 rounded-full' />
                    </div>
                    <div className='flex items-center space-x-4 text-sm'>
                      <div className='flex items-center space-x-1'>
                        <Calendar className='h-4 w-4' />
                        <Skeleton className='h-4 w-24' />
                      </div>
                      <div className='flex items-center space-x-1'>
                        <Clock className='h-4 w-4' />
                        <Skeleton className='h-4 w-16' />
                      </div>
                      <div className='flex items-center space-x-1'>
                        <MapPin className='h-4 w-4' />
                        <Skeleton className='h-4 w-20' />
                      </div>
                    </div>
                  </div>
                  <Skeleton className='h-8 w-16' />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='mt-1 h-4 w-3/4' />
                <div className='mt-4 flex items-center space-x-2'>
                  <Users className='h-4 w-4' />
                  <Skeleton className='h-4 w-32' />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
