import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableOnlySkeletonProps {
  columnCount?: number;
  rowCount?: number;
  showColumnToggle?: boolean;
  showPagination?: boolean;
}

export const DataTableOnlySkeleton = ({
  columnCount = 5,
  rowCount = 8,
  showColumnToggle = true,
  showPagination = true,
}: DataTableOnlySkeletonProps) => {
  return (
    <div className='w-full space-y-4'>
      {/* Table controls - column toggle */}
      <div className='flex items-center py-4'>
        {showColumnToggle && (
          <div className='ml-auto'>
            <Skeleton className='h-9 w-20' />
          </div>
        )}
      </div>

      {/* Table */}
      <div className='rounded-md border'>
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
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className='flex items-center justify-between'>
          <Skeleton className='h-4 w-32' />
          <div className='flex items-center gap-2'>
            <Skeleton className='h-8 w-20' />
            <Skeleton className='h-4 w-8' />
            <Skeleton className='h-8 w-20' />
          </div>
        </div>
      )}
    </div>
  );
}
