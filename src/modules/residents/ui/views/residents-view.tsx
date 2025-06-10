'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
import { Plus, Search, Filter, X } from 'lucide-react';
import { CreateResidentDialog } from '../components/create-resident-dialog';
import { EditResidentDialog } from '../components/edit-resident-dialog';
import { ResidentsDataTable } from '../components/residents-data-table';
import { useResidentsFilters } from '@/modules/residents';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useConfirm } from '@/hooks/use-confirm';

type ResidentsViewProps = {
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

export function ResidentsView({ initialFilters }: ResidentsViewProps = {}) {
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

  // Debounce search input to prevent excessive API calls
  const debouncedSearch = useDebouncedValue(filters.search, 300);

  // Initialize tRPC client
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Get units for filter dropdown
  const { data: units = [] } = useQuery(trpc.units.getAll.queryOptions({}));

  // Delete mutation
  const deleteResident = useMutation(
    trpc.residents.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.residents.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
      },
    })
  );
  const handleEdit = (resident: ResidentWithUnit) => {
    setEditingResident(resident);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      await deleteResident.mutateAsync({ id });
    }
  };
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
      {' '}
      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Residents</h1>
          <p className='text-muted-foreground'>
            Manage residents and their unit assignments
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          Add Resident
        </Button>
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
              <p className='text-muted-foreground text-sm'>Filters applied</p>
              <Button variant='outline' size='sm' onClick={clearFilters}>
                <X className='mr-2 h-4 w-4' />
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>{' '}
      {/* Data Table */}
      <ResidentsDataTable
        filters={{
          ...filters,
          search: debouncedSearch, // Use debounced search for API calls
          isOwner: filters.isOwner || undefined, // Convert null to undefined
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
}
