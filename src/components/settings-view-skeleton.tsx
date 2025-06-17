'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Settings, User, Building, Shield, Bell } from 'lucide-react';

export function SettingsViewSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <Skeleton className='h-8 w-32' />
        <Skeleton className='mt-1 h-4 w-56' />
      </div>

      {/* Settings Navigation */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
        {/* Sidebar */}
        <div className='space-y-2'>
          {[
            { icon: User, label: 'Profile' },
            { icon: Building, label: 'Organization' },
            { icon: Shield, label: 'Security' },
            { icon: Bell, label: 'Notifications' },
            { icon: Settings, label: 'Preferences' },
          ].map((item, i) => (
            <div
              key={i}
              className='flex items-center space-x-3 rounded-lg border p-3'
            >
              <item.icon className='h-5 w-5' />
              <Skeleton className='h-4 w-20' />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className='space-y-6 lg:col-span-3'>
          {/* Section 1 */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-32' />
              <Skeleton className='h-4 w-48' />
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-10 w-full' />
                </div>
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-10 w-full' />
                </div>
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-10 w-full' />
              </div>
              <div className='flex justify-end space-x-2 pt-4'>
                <Skeleton className='h-10 w-20' />
                <Skeleton className='h-10 w-20' />
              </div>
            </CardContent>
          </Card>

          {/* Section 2 */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-40' />
              <Skeleton className='h-4 w-64' />
            </CardHeader>
            <CardContent className='space-y-4'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className='flex items-center justify-between rounded-lg border p-4'
                >
                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-32' />
                    <Skeleton className='h-3 w-48' />
                  </div>
                  <Skeleton className='h-6 w-12' />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Section 3 */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-28' />
              <Skeleton className='h-4 w-40' />
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className='flex items-center space-x-3'>
                    <Skeleton className='h-4 w-4' />
                    <div className='flex-1'>
                      <Skeleton className='h-4 w-40' />
                      <Skeleton className='mt-1 h-3 w-56' />
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex justify-end pt-4'>
                <Skeleton className='h-10 w-24' />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
