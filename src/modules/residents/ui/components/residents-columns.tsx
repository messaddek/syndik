'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowUpDown,
  MoreHorizontal,
  Edit,
  Trash2,
  User,
  UserCheck,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import type { Resident } from '../../types';
import Link from 'next/link';

interface ResidentWithUnit extends Resident {
  unit?: {
    id: string;
    unitNumber: string;
    buildingId: string;
    building?: {
      name: string;
    };
  };
}

interface ColumnActionsProps {
  resident: ResidentWithUnit;
  onEdit: (resident: ResidentWithUnit) => void;
  onDelete: (id: string) => void;
}

function ColumnActions({ resident, onEdit, onDelete }: ColumnActionsProps) {
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
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(resident.email)}
        >
          Copy email
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEdit(resident)}>
          <Edit className='mr-2 h-4 w-4' />
          Edit resident
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onDelete(resident.id)}
          className='text-destructive'
        >
          <Trash2 className='mr-2 h-4 w-4' />
          Delete resident
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function createResidentsColumns(
  onEdit: (resident: ResidentWithUnit) => void,
  onDelete: (id: string) => void
): ColumnDef<ResidentWithUnit>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'firstName',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            First Name
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Link
          href={`/residents/${row.original.id}`}
          className='flex items-center space-x-2 hover:underline'
        >
          <User className='text-muted-foreground h-4 w-4' />
          <span className='font-medium'>{row.getValue('firstName')}</span>
        </Link>
      ),
    },
    {
      accessorKey: 'lastName',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Last Name
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='flex items-center space-x-2'>
          <Mail className='text-muted-foreground h-4 w-4' />
          <span className='lowercase'>{row.getValue('email')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => {
        const phone = row.getValue('phone') as string | null;
        return phone ? (
          <div className='flex items-center space-x-2'>
            <Phone className='text-muted-foreground h-4 w-4' />
            <span>{phone}</span>
          </div>
        ) : (
          <span className='text-muted-foreground'>-</span>
        );
      },
    },
    {
      id: 'unit',
      header: 'Unit',
      cell: ({ row }) => {
        const resident = row.original;
        return resident.unit ? (
          <div className='flex items-center space-x-2'>
            <MapPin className='text-muted-foreground h-4 w-4' />
            <span>
              Unit {resident.unit.unitNumber}
              {resident.unit.building?.name &&
                ` - ${resident.unit.building.name}`}
            </span>
          </div>
        ) : (
          <span className='text-muted-foreground'>-</span>
        );
      },
    },
    {
      accessorKey: 'isOwner',
      header: 'Type',
      cell: ({ row }) => {
        const isOwner = row.getValue('isOwner') as boolean;
        return (
          <Badge variant={isOwner ? 'default' : 'secondary'}>
            {isOwner ? (
              <>
                <UserCheck className='mr-1 h-3 w-3' />
                Owner
              </>
            ) : (
              <>
                <User className='mr-1 h-3 w-3' />
                Tenant
              </>
            )}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'isActive',
      header: 'Status',
      cell: ({ row }) => {
        const isActive = row.getValue('isActive') as boolean;
        return (
          <Badge variant={isActive ? 'default' : 'destructive'}>
            {isActive ? 'Active' : 'Inactive'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'moveInDate',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Move In Date
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = row.getValue('moveInDate') as string;
        return <span>{new Date(date).toLocaleDateString()}</span>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const resident = row.original;
        return (
          <ColumnActions
            resident={resident}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      },
    },
  ];
}
