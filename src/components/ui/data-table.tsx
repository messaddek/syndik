'use client';

/**
 * Generic DataTable component with optional checkbox functionality.
 *
 * Features:
 * - Optional checkbox columns with showCheckboxes prop
 * - Bulk actions support when checkboxes are enabled
 * - RTL support for checkbox alignment
 * - Parent-controlled actions for maximum flexibility
 *
 * @param showCheckboxes - Enable checkbox column for row selection
 * @param bulkActions - Array of actions to show when rows are selected
 */

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './data-table-pagination';
import { useLocale, useTranslations } from 'next-intl';
import { isRtlLocale, Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface BulkAction<TData = unknown> {
  label: string;
  icon?: React.ReactNode;
  onClick: (selectedRows: TData[]) => void;
  variant?: 'default' | 'destructive';
  disabled?: (selectedRows: TData[]) => boolean;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  onRowClick?: (row: TData) => void;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showPagination?: boolean;
  showCheckboxes?: boolean;
  bulkActions?: BulkAction<TData>[];
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  showSearch = false,
  onRowClick,
  pagination,
  onPageChange,
  onPageSizeChange,
  showPagination = true,
  showCheckboxes = false,
  bulkActions = [],
}: DataTableProps<TData, TValue>) => {
  const t = useTranslations('table');
  const locale = useLocale() as Locale;
  const isRtl = isRtlLocale(locale);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  // Use translated placeholder if none provided
  const placeholder = searchPlaceholder || t('search');

  // Combine columns: checkbox column + provided columns
  const finalColumns = React.useMemo(() => {
    if (showCheckboxes) {
      const checkboxColumn: ColumnDef<TData, TValue> = {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label='Select all'
            className={cn(isRtl && 'rtl:mr-2')}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label='Select row'
            className={cn(isRtl && 'rtl:mr-2')}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      };
      return [checkboxColumn, ...columns];
    }
    return columns;
  }, [showCheckboxes, columns, isRtl]);

  const table = useReactTable({
    data,
    columns: finalColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // Only use client-side pagination if no server pagination is provided
    ...(pagination
      ? {
          manualPagination: true,
          pageCount: pagination.totalPages,
        }
      : {
          getPaginationRowModel: getPaginationRowModel(),
        }),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...(pagination && {
        pagination: {
          pageIndex: pagination.page - 1,
          pageSize: pagination.pageSize,
        },
      }),
    },
  });

  // Get selected rows data for bulk actions
  const selectedRows = table
    .getFilteredSelectedRowModel()
    .rows.map(row => row.original);
  const hasSelection = selectedRows.length > 0;
  return (
    <div className='w-full space-y-4'>
      <div className='flex items-center gap-x-2 py-4'>
        {/* Columns Dropdown - moved to start */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              {t('columns')} <ChevronDown className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isRtl ? 'end' : 'start'}>
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {typeof column.columnDef.header === 'string'
                      ? column.columnDef.header
                      : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {showSearch && searchKey && (
          <Input
            placeholder={placeholder}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ''
            }
            onChange={event =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        )}

        {/* Bulk Actions Dropdown */}
        {showCheckboxes && bulkActions.length > 0 && hasSelection && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='ml-auto'>
                <MoreHorizontal className='h-4 w-4' />
                {t('selectedActions', { count: selectedRows.length })}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRtl ? 'start' : 'end'}>
              {bulkActions.map((action, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => action.onClick(selectedRows)}
                  disabled={action.disabled?.(selectedRows)}
                  className={cn(
                    action.variant === 'destructive' &&
                      'text-destructive focus:text-destructive'
                  )}
                >
                  {action.icon && <span className='mr-2'>{action.icon}</span>}
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(isRtl && 'text-right')}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={
                    onRowClick ? 'hover:bg-muted/50 cursor-pointer' : ''
                  }
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={finalColumns.length}
                  className='h-24 text-center'
                >
                  {t('noData')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showPagination && (
        <DataTablePagination
          table={table}
          pagination={pagination}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          showCheckboxes={showCheckboxes}
        />
      )}
    </div>
  );
};
