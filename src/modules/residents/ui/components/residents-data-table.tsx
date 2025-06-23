'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
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
import { useTRPC } from '@/trpc/client';
import { Resident } from '@/modules/residents/types';
import { Unit } from '@/modules/units/types';
import { DataTable } from '@/components/ui/data-table';
import { RESIDENT_SORT_FIELDS } from '@/constants';
import { DataTableOnlySkeleton } from '@/components/ui/data-table-only-skeleton';
import { Link } from '@/i18n/routing';
import { ResidentInviteButton } from './resident-invite-button';

// Infer types from the actual data returned by tRPC
type PaginationData = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

type ResidentQueryResult = {
  data: Resident[];
  pagination: PaginationData;
};

type ResidentWithUnit = {
  id: string;
  unitId: string | null;
  orgId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  isOwner: boolean;
  moveInDate: string;
  moveOutDate: string | null;
  isActive: boolean;
  emergencyContact: string | null;
  emergencyPhone: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  unit?: {
    id: string;
    unitNumber: string;
    buildingId: string;
    building?: {
      name: string;
    };
  };
};

type ResidentsDataTableProps = {
  filters: {
    page: number;
    pageSize: number;
    search: string;
    unitId: string;
    isOwner?: boolean;
    isActive: boolean;
    sortBy: string;
    sortOrder: string;
  };
  onEdit: (resident: ResidentWithUnit) => void;
  onDelete: (id: string) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
};

export const ResidentsDataTable = ({
  filters,
  onEdit,
  onDelete,
  onPageChange,
  onPageSizeChange,
}: ResidentsDataTableProps) => {
  // Initialize tRPC client
  const trpc = useTRPC();
  const t = useTranslations('residents');

  // Queries
  const { data: residentsData, isLoading: residentsLoading } = useQuery(
    trpc.residents.getAll.queryOptions({
      page: filters.page,
      pageSize: filters.pageSize,
      search: filters.search || undefined,
      unitId: filters.unitId || undefined,
      isOwner: filters.isOwner || undefined,
      isActive: filters.isActive,
      sortBy: RESIDENT_SORT_FIELDS[
        filters.sortBy as keyof typeof RESIDENT_SORT_FIELDS
      ] as 'firstName' | 'lastName' | 'email' | 'moveInDate',
      sortOrder: filters.sortOrder as 'asc' | 'desc',
    })
  );

  const { data: units = [] } = useQuery(trpc.units.getAll.queryOptions({}));

  // Transform data to include unit information
  const residentsWithUnits = useMemo(() => {
    const typedResidentsData = residentsData as unknown as ResidentQueryResult;
    if (!typedResidentsData?.data || !Array.isArray(units)) return [];

    return typedResidentsData.data.map((resident: Resident) => ({
      ...resident,
      unit: (units as unknown as Unit[]).find(
        (unit: Unit) => unit.id === resident.unitId
      ),
    })) as ResidentWithUnit[];
  }, [residentsData, units]);
  // Column definitions
  const columns = useMemo(
    (): ColumnDef<ResidentWithUnit>[] => [
      {
        accessorKey: 'firstName',
        header: ({ column }) => {
          return (
            <Button
              variant='ghost'
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
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
                    onClick={() =>
                      navigator.clipboard.writeText(resident.email)
                    }
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
        },
      },
    ],
    [t, onEdit, onDelete]
  );
  if (residentsLoading) {
    return <DataTableOnlySkeleton />;
  }

  // Define bulk actions
  const bulkActions = [
    {
      label: t('bulkEdit'),
      icon: <Edit className='h-4 w-4' />,
      onClick: (selectedRows: ResidentWithUnit[]) => {
        // For now, edit the first selected resident
        // In a real app, you might open a bulk edit dialog
        if (selectedRows.length > 0) {
          onEdit(selectedRows[0]);
        }
      },
    },
    {
      label: t('bulkDelete'),
      icon: <Trash2 className='h-4 w-4' />,
      variant: 'destructive' as const,
      onClick: (selectedRows: ResidentWithUnit[]) => {
        // For now, delete the first selected resident
        // In a real app, you might show a confirmation dialog for bulk delete
        if (selectedRows.length > 0) {
          onDelete(selectedRows[0].id);
        }
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={residentsWithUnits}
      showSearch={false}
      showCheckboxes={true}
      bulkActions={bulkActions}
      pagination={(residentsData as unknown as ResidentQueryResult)?.pagination}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
};
