'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Filter, Plus, Search } from 'lucide-react';

export const ResidentsViewSkeleton = () => {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <Skeleton className='h-8 w-48' />
          <Skeleton className='mt-1 h-4 w-64' />
        </div>
        <div className='flex items-center space-x-2'>
          <Plus className='h-4 w-4' />
          <Skeleton className='h-10 w-36' />
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className='flex items-center space-x-2'>
            <Filter className='h-5 w-5' />
            <Skeleton className='h-6 w-16' />
            <Skeleton className='h-5 w-12 rounded-full' />
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            {/* Search Filter */}
            <div className='space-y-2'>
              <Skeleton className='h-4 w-16' />
              <div className='relative'>
                <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                <Skeleton className='h-10 w-full' />
              </div>
            </div>

            {/* Unit Filter */}
            <div className='space-y-2'>
              <Skeleton className='h-4 w-12' />
              <Skeleton className='h-10 w-full' />
            </div>

            {/* Type Filter */}
            <div className='space-y-2'>
              <Skeleton className='h-4 w-12' />
              <Skeleton className='h-10 w-full' />
            </div>

            {/* Status Filter */}
            <div className='space-y-2'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardContent className='p-0'>
          {/* Table Header */}
          <div className='border-b p-4'>
            <div className='grid grid-cols-8 gap-4'>
              <Skeleton className='h-4 w-4' /> {/* Checkbox */}
              <Skeleton className='h-4 w-20' /> {/* First Name */}
              <Skeleton className='h-4 w-20' /> {/* Last Name */}
              <Skeleton className='h-4 w-16' /> {/* Email */}
              <Skeleton className='h-4 w-16' /> {/* Phone */}
              <Skeleton className='h-4 w-12' /> {/* Unit */}
              <Skeleton className='h-4 w-12' /> {/* Type */}
              <Skeleton className='h-4 w-16' /> {/* Status */}
            </div>
          </div>

          {/* Table Rows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className='border-b p-4 last:border-b-0'>
              <div className='grid grid-cols-8 items-center gap-4'>
                <Skeleton className='h-4 w-4' /> {/* Checkbox */}
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-4 w-4 rounded-full' />
                  {/* User icon */}
                  <Skeleton className='h-4 w-16' /> {/* First Name */}
                </div>
                <Skeleton className='h-4 w-20' /> {/* Last Name */}
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-4 w-4' /> {/* Mail icon */}
                  <Skeleton className='h-4 w-24' /> {/* Email */}
                </div>
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-4 w-4' /> {/* Phone icon */}
                  <Skeleton className='h-4 w-20' /> {/* Phone */}
                </div>
                <div className='flex items-center space-x-2'>
                  <Skeleton className='h-4 w-4' /> {/* Map icon */}
                  <Skeleton className='h-4 w-16' /> {/* Unit */}
                </div>
                <Skeleton className='h-5 w-16 rounded-full' />
                {/* Type badge */}
                <Skeleton className='h-5 w-12 rounded-full' />
                {/* Status badge */}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className='flex items-center justify-between'>
        <Skeleton className='h-4 w-32' /> {/* Page info */}
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-8 w-20' /> {/* Previous button */}
          <Skeleton className='h-8 w-8' /> {/* Page number */}
          <Skeleton className='h-8 w-8' /> {/* Page number */}
          <Skeleton className='h-8 w-8' /> {/* Page number */}
          <Skeleton className='h-8 w-20' /> {/* Next button */}
        </div>
      </div>
    </div>
  );
}

