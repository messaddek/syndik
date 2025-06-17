'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export function FinancesViewSkeleton() {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <Skeleton className='h-8 w-32' />
          <Skeleton className='mt-1 h-4 w-48' />
        </div>
        <div className='flex space-x-2'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-32' />
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {[
          { icon: DollarSign, label: 'Total Income' },
          { icon: TrendingDown, label: 'Total Expenses' },
          { icon: TrendingUp, label: 'Net Profit' },
        ].map((item, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-20' />
              <item.icon className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-2 h-8 w-24' />
              <Skeleton className='h-3 w-16' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs Section */}
      <Card>
        <CardHeader>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-8 w-16' />
            <Skeleton className='h-8 w-20' />
          </div>
        </CardHeader>
        <CardContent>
          {/* Table Header */}
          <div className='mb-4 grid grid-cols-5 gap-4 border-b pb-2'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-4 w-12' />
            <Skeleton className='h-4 w-12' />
            <Skeleton className='h-4 w-16' />
          </div>

          {/* Table Rows */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='grid grid-cols-5 gap-4 border-b py-3 last:border-b-0'
            >
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-12' />
              <Skeleton className='h-4 w-12' />
              <Skeleton className='h-8 w-16' />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
