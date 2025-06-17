'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Bell, Users, Send, Eye } from 'lucide-react';

export function NotificationsViewSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='h-8 w-40' />
          <Skeleton className='mt-1 h-4 w-56' />
        </div>
        <Skeleton className='h-10 w-36' />
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
        {[
          { icon: Bell, label: 'Total Sent' },
          { icon: Users, label: 'Recipients' },
          { icon: Eye, label: 'Read Rate' },
          { icon: Send, label: 'This Month' },
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

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-6 w-40' />
            <div className='flex space-x-2'>
              <Skeleton className='h-8 w-20' />
              <Skeleton className='h-8 w-24' />
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='flex items-start space-x-4 rounded-lg border p-4'
            >
              <Skeleton className='h-10 w-10 rounded-full' />
              <div className='flex-1 space-y-2'>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-5 w-48' />
                  <div className='flex items-center space-x-2'>
                    <Skeleton className='h-4 w-16 rounded-full' />
                    <Skeleton className='h-4 w-20' />
                  </div>
                </div>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
                <div className='flex items-center space-x-4 pt-2'>
                  <div className='flex items-center space-x-1'>
                    <Users className='h-4 w-4' />
                    <Skeleton className='h-4 w-16' />
                  </div>
                  <div className='flex items-center space-x-1'>
                    <Eye className='h-4 w-4' />
                    <Skeleton className='h-4 w-12' />
                  </div>
                  <Skeleton className='h-4 w-20' />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
