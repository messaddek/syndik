import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableSkeletonProps {
  columnCount?: number;
  rowCount?: number;
  showFilters?: boolean;
  showPagination?: boolean;
}

export function DataTableSkeleton({
  columnCount = 5,
  rowCount = 8,
  showFilters = true,
  showPagination = true,
}: DataTableSkeletonProps) {
  return (
    <div className='space-y-4'>
      {/* Header with title and action button */}
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-32' />
          <Skeleton className='h-4 w-48' />
        </div>
        <Skeleton className='h-10 w-32' />
      </div>

      {/* Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <Skeleton className='h-6 w-24' />
              <Skeleton className='h-8 w-20' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-9 w-full' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-9 w-full' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-9 w-full' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-9 w-full' />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Table */}
      <Card>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: columnCount }).map((_, i) => (
                  <TableHead key={i}>
                    <Skeleton className='h-4 w-20' />
                  </TableHead>
                ))}
                <TableHead className='w-[100px]'>
                  <Skeleton className='h-4 w-16' />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowCount }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: columnCount }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className='h-4 w-full' />
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Skeleton className='h-8 w-8' />
                      <Skeleton className='h-8 w-8' />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {showPagination && (
        <div className='flex items-center justify-between'>
          <Skeleton className='h-4 w-32' />
          <div className='flex items-center gap-2'>
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
          </div>
        </div>
      )}
    </div>
  );
}

export function CardListSkeleton({ itemCount = 6 }: { itemCount?: number }) {
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-32' />
          <Skeleton className='h-4 w-48' />
        </div>
        <Skeleton className='h-10 w-32' />
      </div>

      {/* Grid of cards */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: itemCount }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5' />
                <Skeleton className='h-6 w-32' />
              </div>
              <Skeleton className='h-4 w-24' />
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                <div className='space-y-1'>
                  <Skeleton className='h-3 w-full' />
                  <Skeleton className='h-3 w-3/4' />
                </div>
                <div className='flex items-center justify-between'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-6 w-20' />
                </div>
                <div className='flex gap-2 pt-2'>
                  <Skeleton className='h-8 w-20' />
                  <Skeleton className='h-8 w-20' />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
