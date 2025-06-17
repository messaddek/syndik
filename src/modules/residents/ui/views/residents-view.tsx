'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { ColumnDef } from '@tanstack/react-table';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
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
  Plus,
  Search,
  Filter,
  X,
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
import { CreateResidentDialog } from '../components/create-resident-dialog';
import { EditResidentDialog } from '../components/edit-resident-dialog';
import { ResidentInviteButton } from '../components/resident-invite-button';
import { useResidentsFilters } from '@/modules/residents';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useConfirm } from '@/hooks/use-confirm';
import { PageHeader } from '@/components/page-header';
import { Link } from '@/i18n/routing';

type PaginationData = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

type ResidentQueryResult = {
  data: ResidentWithUnit[];
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

export const ResidentsView = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingResident, setEditingResident] =
    useState<ResidentWithUnit | null>(null);

  const t = useTranslations('residents');

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    t('confirmDelete.title'),
    t('confirmDelete.description'),
    true
  ); // URL state management with nuqs
  const [filters, setFilters] = useResidentsFilters();

  // Debounce search input to prevent excessive API calls
  const debouncedSearch = useDebouncedValue(filters.search, 300); // Initialize tRPC client
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Get units for filter dropdown
  const { data: units = [] } = useQuery(trpc.units.getAll.queryOptions({}));

  // Fetch residents data
  const queryOptions = trpc.residents.getAll.queryOptions({
    ...filters,
    search: debouncedSearch || undefined,
    isOwner: filters.isOwner ?? undefined,
    isActive: filters.isActive ?? undefined,
  });
  const {
    data: residentsData,
    isLoading: _residentsLoading,
    error: _error,
  } = useSuspenseQuery(queryOptions);

  // Delete mutation
  const deleteResident = useMutation(
    trpc.residents.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.residents.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
      },
    })
  );

  // Event handlers
  const handleEdit = useCallback((resident: ResidentWithUnit) => {
    setEditingResident(resident);
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = await confirm();
      if (confirmed) {
        await deleteResident.mutateAsync({ id });
      }
    },
    [confirm, deleteResident]
  );
  // Transform data to include unit information
  const residentsWithUnits = useMemo(() => {
    const typedResidentsData = residentsData as ResidentQueryResult | undefined;
    if (!typedResidentsData?.data || !Array.isArray(units)) return [];

    return typedResidentsData.data.map((resident: ResidentWithUnit) => ({
      ...resident,
      unit: units.find(({ units: unit }) => unit.id === resident.unitId),
    })) as ResidentWithUnit[];
  }, [residentsData, units]);

  // Column definitions
  const columns = useMemo(
    (): ColumnDef<ResidentWithUnit>[] => [
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
            className='mr-0 ml-2 rtl:mr-2 rtl:ml-0'
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'firstName',
        header: ({ column }) => (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.firstName')}
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        ),
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
        header: ({ column }) => (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.lastName')}
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        ),
      },
      {
        accessorKey: 'email',
        header: ({ column }) => (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.email')}
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        ),
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
        header: ({ column }) => (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            {t('columns.moveInDate')}
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        ),
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
                  <DropdownMenuItem onClick={() => handleEdit(resident)}>
                    <Edit className='mr-2 h-4 w-4' />
                    {t('columns.editResident')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(resident.id)}
                    className='text-destructive'
                  >
                    <Trash2 className='mr-2 h-4 w-4' />
                    {t('columns.deleteResident')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [t, handleEdit, handleDelete]
  );

  const handleSuccess = () => {
    setIsCreateDialogOpen(false);
    setEditingResident(null);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      unitId: '',
      isOwner: null,
      isActive: true,
    });
  };

  const hasActiveFilters = !!(
    filters.search ||
    filters.unitId ||
    filters.isOwner !== null
  );
  return (
    <div className='space-y-6'>
      {/* Header */}
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        ctaButtonContent={
          <>
            <Plus className='h-4 w-4' />
            {t('addNew')}
          </>
        }
        ctaButtonCallback={() => setIsCreateDialogOpen(true)}
      />

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center space-x-2'>
            <Filter className='h-5 w-5' />
            <span>{t('filters')}</span>
            {hasActiveFilters && (
              <Badge variant='secondary' className='ml-2'>
                {
                  [
                    filters.search,
                    filters.unitId,
                    filters.isOwner !== undefined,
                  ].filter(Boolean).length
                }
                {t('active')}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            {/* Search */}
            <div className='space-y-2'>
              <Label htmlFor='search'>{t('search')}</Label>
              <div className='relative'>
                <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                <Input
                  id='search'
                  placeholder={t('search')}
                  className='pl-8'
                  value={filters.search}
                  onChange={e =>
                    setFilters({ search: e.target.value, page: 1 })
                  }
                />
              </div>
            </div>
            {/* Unit Filter */}
            <div className='space-y-2'>
              <Label htmlFor='unit'>{t('columns.unit')}</Label>
              <Select
                value={filters.unitId}
                onValueChange={value =>
                  setFilters({ unitId: value === 'all' ? '' : value, page: 1 })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('allUnits')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>{t('allUnits')}</SelectItem>
                  {Array.isArray(units) &&
                    units.map(({ units: unit, buildings: building }) => {
                      return (
                        <SelectItem key={unit.id} value={unit.id}>
                          Unit {unit.unitNumber} - Building{' '}
                          {building?.name || 'N/A'}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>
            {/* Owner/Tenant Filter */}
            <div className='space-y-2'>
              <Label htmlFor='type'>{t('columns.type')}</Label>
              <Select
                value={
                  filters.isOwner === null
                    ? 'all'
                    : filters.isOwner
                      ? 'owner'
                      : 'tenant'
                }
                onValueChange={value =>
                  setFilters({
                    isOwner: value === 'all' ? null : value === 'owner',
                    page: 1,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('allTypes')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>{t('allTypes')}</SelectItem>
                  <SelectItem value='owner'>{t('owners')}</SelectItem>
                  <SelectItem value='tenant'>{t('tenants')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Status Filter */}
            <div className='space-y-2'>
              <Label htmlFor='status'>{t('columns.status')}</Label>
              <Select
                value={filters.isActive ? 'active' : 'inactive'}
                onValueChange={value =>
                  setFilters({
                    isActive: value === 'active',
                    page: 1,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='active'>{t('status.active')}</SelectItem>
                  <SelectItem value='inactive'>
                    {t('status.inactive')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className='flex items-center justify-between border-t pt-2'>
              <p className='text-muted-foreground text-sm'>
                {t('filtersApplied')}
              </p>
              <Button variant='outline' size='sm' onClick={clearFilters}>
                <X className='mr-2 h-4 w-4' />
                {t('clearFilters')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Data Table */}
      <DataTable
        columns={columns}
        data={residentsWithUnits}
        searchKey='firstName'
        searchPlaceholder={t('search')}
        showSearch={false}
        showPagination={true}
        pagination={
          (residentsData as ResidentQueryResult | undefined)?.pagination
        }
        onPageChange={page => setFilters({ page })}
        onPageSizeChange={pageSize => setFilters({ pageSize, page: 1 })}
      />
      {/* Dialogs */}
      <CreateResidentDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={handleSuccess}
      />
      <EditResidentDialog
        open={!!editingResident}
        onOpenChange={open => {
          if (!open) {
            setEditingResident(null);
          }
        }}
        onSuccess={handleSuccess}
        resident={editingResident || undefined}
      />
      <ConfirmDialog />
    </div>
  );
};
