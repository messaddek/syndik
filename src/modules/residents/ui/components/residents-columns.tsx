'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Link } from '@/i18n/routing';
import { ResidentInviteButton } from './resident-invite-button';

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
  t: (key: string) => string;
}

const ColumnActions = ({
  resident,
  onEdit,
  onDelete,
  t,
}: ColumnActionsProps) => {
  return (
    <div className='flex items-center space-x-1'>
      <ResidentInviteButton resident={resident} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>{t('columns.actions')}</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(resident.email)}
          >
            {t('columns.copyEmail')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onEdit(resident)}>
            <div className='flex items-center gap-x-2'>
              <Edit className='h-4 w-4' />
              {t('columns.editResident')}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(resident.id)}
            className='text-destructive'
          >
            <div className='flex items-center gap-x-2'>
              <Trash2 className='h-4 w-4' />
              {t('columns.deleteResident')}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export function createResidentsColumns(
  onEdit: (resident: ResidentWithUnit) => void,
  onDelete: (id: string) => void,
  t: (key: string) => string
): ColumnDef<ResidentWithUnit>[] {
  return [
    {
      accessorKey: 'firstName',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='flex items-center gap-x-2'
          >
            {t('columns.firstName')}
            <ArrowUpDown className='h-4 w-4' />
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
            className='flex items-center gap-x-2'
          >
            {t('columns.lastName')}
            <ArrowUpDown className='h-4 w-4' />
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
            className='flex items-center gap-x-2'
          >
            {t('columns.email')}
            <ArrowUpDown className='h-4 w-4' />
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
      header: t('columns.phone'),
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
      header: t('columns.unit'),
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
      header: t('columns.type'),
      cell: ({ row }) => {
        const isOwner = row.getValue('isOwner') as boolean;
        return (
          <Badge variant={isOwner ? 'default' : 'secondary'}>
            {isOwner ? (
              <>
                <UserCheck className='mr-1 h-3 w-3' />
                {t('ownerStatus')}
              </>
            ) : (
              <>
                <User className='mr-1 h-3 w-3' />
                {t('tenantStatus')}
              </>
            )}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'isActive',
      header: t('columns.status'),
      cell: ({ row }) => {
        const isActive = row.getValue('isActive') as boolean;
        return (
          <Badge variant={isActive ? 'default' : 'destructive'}>
            {isActive ? t('status.active') : t('status.inactive')}
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
            className='flex items-center gap-x-2'
          >
            {t('columns.moveInDate')}
            <ArrowUpDown className='h-4 w-4' />
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
            t={t}
          />
        );
      },
    },
  ];
}
