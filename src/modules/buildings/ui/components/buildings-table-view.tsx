'use client';

import { Building } from '../../types';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Users, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BuildingsTableViewProps {
  buildings: Building[];
  onEdit: (building: Building) => void;
  onDelete: (building: Building) => void;
}

export function BuildingsTableView({
  buildings,
  onEdit,
  onDelete,
}: BuildingsTableViewProps) {
  const columns: ColumnDef<Building>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className='flex items-center space-x-2'>
          <Building2 className='h-4 w-4 text-blue-600' />
          <span className='font-medium'>{row.getValue('name')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => (
        <div className='flex items-center space-x-1'>
          <MapPin className='h-3 w-3 text-gray-500' />
          <span className='text-sm'>{row.getValue('address')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'city',
      header: 'City',
    },
    {
      accessorKey: 'totalUnits',
      header: 'Total Units',
      cell: ({ row }) => (
        <Badge variant='secondary'>
          <Users className='mr-1 h-3 w-3' />
          {row.getValue('totalUnits')}
        </Badge>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => {
        const description = row.getValue('description') as string;
        return (
          <span className='text-sm text-gray-600'>
            {description || 'No description'}
          </span>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const building = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(building)}>
                Edit building
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(building)}
                className='text-red-600'
              >
                Delete building
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <DataTable
      columns={columns}
      data={buildings}
      searchKey='name'
      searchPlaceholder='Search buildings...'
      showPagination={false}
    />
  );
}
