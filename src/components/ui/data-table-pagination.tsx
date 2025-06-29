'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocale, useTranslations } from 'next-intl';
import { isRtlLocale, Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showCheckboxes?: boolean;
}

export const DataTablePagination = <TData,>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
  pagination,
  onPageChange,
  onPageSizeChange,
  showCheckboxes = false,
}: DataTablePaginationProps<TData>) => {
  const tTable = useTranslations('table');
  const tPagination = useTranslations('pagination');
  const locale = useLocale() as Locale;
  const isRtl = isRtlLocale(locale);
  const isServerSide = !!pagination;

  const currentPage = isServerSide
    ? pagination.page
    : table.getState().pagination.pageIndex + 1;
  const currentPageSize = isServerSide
    ? pagination.pageSize
    : table.getState().pagination.pageSize;
  const totalRows = isServerSide
    ? pagination.total
    : table.getFilteredRowModel().rows.length;
  const totalPages = isServerSide
    ? pagination.totalPages
    : table.getPageCount();
  const selectedRows = table.getFilteredSelectedRowModel().rows.length;

  const canPreviousPage = isServerSide
    ? currentPage > 1
    : table.getCanPreviousPage();
  const canNextPage = isServerSide
    ? currentPage < totalPages
    : table.getCanNextPage();

  const handlePageSizeChange = (newPageSize: string) => {
    const pageSize = Number(newPageSize);
    if (isServerSide && onPageSizeChange) {
      onPageSizeChange(pageSize);
    } else {
      table.setPageSize(pageSize);
    }
  };

  const handleFirstPage = () => {
    if (isServerSide && onPageChange) {
      onPageChange(1);
    } else {
      table.setPageIndex(0);
    }
  };

  const handlePreviousPage = () => {
    if (isServerSide && onPageChange) {
      onPageChange(currentPage - 1);
    } else {
      table.previousPage();
    }
  };

  const handleNextPage = () => {
    if (isServerSide && onPageChange) {
      onPageChange(currentPage + 1);
    } else {
      table.nextPage();
    }
  };
  const handleLastPage = () => {
    if (isServerSide && onPageChange) {
      onPageChange(totalPages);
    } else {
      table.setPageIndex(totalPages - 1);
    }
  };

  return (
    <div className='flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between'>
      {showCheckboxes && (
        <div className='text-muted-foreground text-sm'>
          <span className='hidden sm:inline'>
            {tTable('selected', { count: selectedRows, total: totalRows })}
          </span>
          <span className='sm:hidden'>
            {selectedRows} {tTable('of')} {totalRows} {tTable('selected')}
          </span>
        </div>
      )}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='text-sm font-medium'>
            <span className='hidden sm:inline'>
              {tPagination('rowsPerPage')}
            </span>
            <span className='sm:hidden'>{tPagination('perPage')}</span>
          </p>
          <Select
            value={`${currentPageSize}`}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={currentPageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {pageSizeOptions.map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center justify-center text-sm font-medium'>
          <span className='hidden sm:inline sm:w-[100px]'>
            {tPagination('page')} {currentPage} {tPagination('of')} {totalPages}
          </span>
          <span className='sm:hidden'>
            {currentPage}/{totalPages}
          </span>
        </div>
        <div className='flex items-center justify-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={handleFirstPage}
            disabled={!canPreviousPage}
          >
            <span className='sr-only'>{tPagination('first')}</span>
            <ChevronsLeft
              className={cn('h-4 w-4', isRtl && 'rtl:rotate-180')}
            />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={handlePreviousPage}
            disabled={!canPreviousPage}
          >
            <span className='sr-only'>{tPagination('previous')}</span>
            <ChevronLeft className={cn('h-4 w-4', isRtl && 'rtl:rotate-180')} />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={handleNextPage}
            disabled={!canNextPage}
          >
            <span className='sr-only'>{tPagination('next')}</span>
            <ChevronRight
              className={cn('h-4 w-4', isRtl && 'rtl:rotate-180')}
            />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={handleLastPage}
            disabled={!canNextPage}
          >
            <span className='sr-only'>{tPagination('last')}</span>
            <ChevronsRight
              className={cn('h-4 w-4', isRtl && 'rtl:rotate-180')}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};
