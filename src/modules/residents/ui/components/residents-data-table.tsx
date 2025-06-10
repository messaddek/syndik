'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Resident } from '@/modules/residents/types';
import { Unit } from '@/modules/units/types';
import { DataTable } from '@/components/ui/data-table';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Filter, X } from 'lucide-react';
import { createResidentsColumns } from './residents-columns';
import { RESIDENT_SORT_FIELDS } from '@/constants';
import { ResidentForm } from './resident-form';
import { useResidentsFilters } from '@/modules/residents';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/use-confirm';

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
  unitId: string;
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
  initialFilters?: {
    page: number;
    pageSize: number;
    search: string;
    unitId: string;
    isOwner?: boolean;
    isActive: boolean;
    sortBy: string;
    sortOrder: string;
  };
};

export function ResidentsDataTable({
  initialFilters,
}: ResidentsDataTableProps = {}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingResident, setEditingResident] =
    useState<ResidentWithUnit | null>(null);

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete Resident',
    'Are you sure you want to delete this resident? This action cannot be undone.'
  );

  // URL state management with nuqs
  const [filters, setFilters] = useResidentsFilters(initialFilters);

  // Initialize tRPC client
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Queries
  const {
    data: residentsData,
    isLoading: residentsLoading,
    refetch: refetchResidents,
  } = useQuery(
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

  const { data: units = [] } = useQuery(trpc.units.getAll.queryOptions({})); // Mutations
  const deleteResident = useMutation(
    trpc.residents.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.residents.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
      },
      onError: error => {
        toast.error(
          `Failed to delete resident: ${error.message || 'Unknown error'}`
        );
      },
    })
  ); // Transform data to include unit information
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

  const handleEdit = (resident: ResidentWithUnit) => {
    setEditingResident(resident);
    setIsCreateDialogOpen(true);
  };
  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      await deleteResident.mutateAsync({ id });
    }
  };

  const handleCloseDialog = () => {
    setIsCreateDialogOpen(false);
    setEditingResident(null);
  };

  const handleSuccess = () => {
    refetchResidents();
    handleCloseDialog();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      unitId: '',
      isOwner: undefined,
    });
  };

  const hasActiveFilters = !!(
    filters.search ||
    filters.unitId ||
    filters.isOwner !== undefined
  );

  const columns = createResidentsColumns(handleEdit, handleDelete);

  if (residentsLoading) {
    return (
      <div className='space-y-4'>
        <div className='h-8 animate-pulse rounded bg-gray-200' />
        <div className='h-96 animate-pulse rounded bg-gray-200' />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Residents</h1>
          <p className='text-muted-foreground'>
            Manage residents and their unit assignments
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingResident(null)}>
              <Plus className='mr-2 h-4 w-4' />
              Add Resident
            </Button>
          </DialogTrigger>
          <DialogContent className='max-h-[90vh] overflow-y-auto sm:max-w-[600px]'>
            <DialogHeader>
              <DialogTitle>
                {editingResident ? 'Edit Resident' : 'Add New Resident'}
              </DialogTitle>
              <DialogDescription>
                {editingResident
                  ? 'Update resident information and unit assignment.'
                  : 'Add a new resident to your building management system.'}
              </DialogDescription>
            </DialogHeader>{' '}
            <ResidentForm
              resident={editingResident || undefined}
              onSuccess={handleSuccess}
              onCancel={handleCloseDialog}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center space-x-2'>
            <Filter className='h-5 w-5' />
            <span>Filters</span>
            {hasActiveFilters && (
              <Badge variant='secondary' className='ml-2'>
                {
                  [
                    filters.search,
                    filters.unitId,
                    filters.isOwner !== undefined,
                  ].filter(Boolean).length
                }{' '}
                active
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            {/* Search */}
            <div className='space-y-2'>
              <Label htmlFor='search'>Search</Label>
              <div className='relative'>
                <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                <Input
                  id='search'
                  placeholder='Search residents...'
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
              <Label htmlFor='unit'>Unit</Label>
              <Select
                value={filters.unitId}
                onValueChange={value =>
                  setFilters({ unitId: value === 'all' ? '' : value, page: 1 })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='All units' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All units</SelectItem>
                  {Array.isArray(units) &&
                    units.map(unit => {
                      return (
                        <SelectItem key={unit.id} value={unit.id}>
                          Unit {unit.unitNumber} - Building {unit.buildingId}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>

            {/* Owner/Tenant Filter */}
            <div className='space-y-2'>
              <Label htmlFor='type'>Type</Label>
              <Select
                value={
                  filters.isOwner === undefined
                    ? 'all'
                    : filters.isOwner
                      ? 'owner'
                      : 'tenant'
                }
                onValueChange={value =>
                  setFilters({
                    isOwner: value === 'all' ? undefined : value === 'owner',
                    page: 1,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='All types' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All types</SelectItem>
                  <SelectItem value='owner'>Owners</SelectItem>
                  <SelectItem value='tenant'>Tenants</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Filter */}
            <div className='space-y-2'>
              <Label htmlFor='status'>Status</Label>
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
                  <SelectItem value='active'>Active</SelectItem>
                  <SelectItem value='inactive'>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className='flex items-center justify-between border-t pt-2'>
              <p className='text-muted-foreground text-sm'>
                {(residentsData as unknown as ResidentQueryResult)?.pagination
                  ?.total || 0}{' '}
                resident(s) found
              </p>
              <Button variant='outline' size='sm' onClick={clearFilters}>
                <X className='mr-2 h-4 w-4' />
                Clear filters
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
        searchPlaceholder='Search residents...'
        pagination={
          (residentsData as unknown as ResidentQueryResult)?.pagination
        }
        onPageChange={page => setFilters({ page })}
        onPageSizeChange={pageSize => setFilters({ pageSize, page: 1 })}
      />
      <ConfirmDialog />
    </div>
  );
}
