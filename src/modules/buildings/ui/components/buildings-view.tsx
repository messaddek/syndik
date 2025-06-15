'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Building } from '../../types';
import { useTRPC } from '@/trpc/client';
import {
  useBuildingsFilters,
  BUILDING_VIEWS,
} from '../../hooks/use-buildings-filters';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Filter, Search, X, Grid3X3, Table } from 'lucide-react';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { BuildingForm } from './building-form';
import { BuildingsGridView } from './buildings-grid-view';
import { BuildingsTableView } from './buildings-table-view';
import { createBuildingSchema } from '../../schema';
import { z } from 'zod';
import { useDirection } from '@/hooks/use-direction';
import { BUILDING_SORT_FIELDS, SORT_ORDERS } from '@/constants';
import { useConfirm } from '@/hooks/use-confirm';
import { useTranslations } from 'next-intl';

type BuildingFormData = z.infer<typeof createBuildingSchema>;

type BuildingQueryResult = {
  data: Building[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

// Simple pagination component
const SimplePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const t = useTranslations('pagination');

  return (
    <div className='flex items-center justify-between border-t pt-4'>
      <div className='text-muted-foreground text-sm'>
        {t('showingPage', { page: currentPage, total: totalPages })}
      </div>
      <div className='flex items-center space-x-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          {t('previous')}
        </Button>
        <span className='text-sm font-medium'>
          {currentPage} / {totalPages}
        </span>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          {t('next')}
        </Button>
      </div>
    </div>
  );
};

type BuildingsViewProps = {
  initialFilters?: {
    page?: number;
    pageSize?: number;
    search?: string;
    city?: string;
    sortBy?: string;
    sortOrder?: string;
    view?: string;
  };
};

export function BuildingsView({ initialFilters }: BuildingsViewProps = {}) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null);
  // Translation hooks
  const t = useTranslations('buildings');
  const tCommon = useTranslations('common');
  const isRtl = useDirection();

  // URL state management with nuqs
  const [filters, setFilters] = useBuildingsFilters(initialFilters);

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    t('deleteBuilding'),
    t('confirmDelete')
  );

  // Initialize tRPC client
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  // Queries
  const { data: buildingsData } = useQuery(
    trpc.buildings.getAll.queryOptions({
      page: filters.page,
      pageSize: filters.pageSize,
      search: filters.search || undefined,
      city: filters.city || undefined,
      sortBy:
        BUILDING_SORT_FIELDS[
          filters.sortBy as keyof typeof BUILDING_SORT_FIELDS
        ] || BUILDING_SORT_FIELDS.NAME,
      sortOrder:
        SORT_ORDERS[filters.sortOrder as keyof typeof SORT_ORDERS] ||
        SORT_ORDERS.ASC,
    })
  );
  // Mutations
  const createMutation = useMutation(
    trpc.buildings.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.buildings.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
        setIsCreateDialogOpen(false);
      },
    })
  );
  const updateMutation = useMutation(
    trpc.buildings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.buildings.getAll.queryOptions({})
        );
        await queryClient.invalidateQueries({
          queryKey: [['search', 'global']],
        });
        setEditingBuilding(null);
      },
    })
  );
  const deleteMutation = useMutation(
    trpc.buildings.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.buildings.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
      },
    })
  );
  // Get unique cities for filter
  const { data: uniqueCities = [] } = useQuery(
    trpc.buildings.getCities.queryOptions()
  );

  // Handlers
  const handleCreateBuilding = (data: BuildingFormData) => {
    createMutation.mutate(data);
  };

  const handleUpdateBuilding = (data: BuildingFormData) => {
    if (editingBuilding) {
      updateMutation.mutate({
        id: editingBuilding.id,
        data,
      });
    }
  };
  const handleDeleteBuilding = async (building: Building) => {
    const confirmed = await confirm();
    if (confirmed) {
      deleteMutation.mutate({ id: building.id });
    }
  };
  const handleCloseDialog = () => {
    setEditingBuilding(null);
    setIsCreateDialogOpen(false);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      search: '',
      city: '',
      page: 1,
    });
  };
  const hasActiveFilters = Boolean(filters.search || filters.city);

  // Get the buildings data
  const buildingsWithData =
    (buildingsData as unknown as BuildingQueryResult)?.data || [];

  return (
    <div className='space-y-6'>
      {' '}
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>{t('title')}</h2>
          <p className='text-gray-600'>{t('buildingDetails')}</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          {t('addBuilding')}
        </Button>
      </div>{' '}
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center space-x-2'>
            <Filter className='h-5 w-5' />
            <span>{t('filter')}</span>
            {hasActiveFilters && (
              <Badge variant='secondary' className='ml-2'>
                {[filters.search, filters.city].filter(Boolean).length} active
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
            {/* Search */}
            <div className='space-y-2'>
              <Label htmlFor='search'>{tCommon('search')}</Label>{' '}
              <div className='relative'>
                <Search
                  className={`text-muted-foreground absolute top-2.5 h-4 w-4 ${isRtl ? 'right-2' : 'left-2'}`}
                />
                <Input
                  id='search'
                  placeholder={t('search')}
                  className={isRtl ? 'pr-8' : 'pl-8'}
                  value={filters.search}
                  onChange={e =>
                    setFilters({ search: e.target.value, page: 1 })
                  }
                />
              </div>
            </div>

            {/* City Filter */}
            <div className='space-y-2'>
              <Label htmlFor='city'>{t('city')}</Label>
              <Select
                value={filters.city}
                onValueChange={value =>
                  setFilters({ city: value === 'all' ? '' : value, page: 1 })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('allCities')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>{t('allCities')}</SelectItem>
                  {uniqueCities.map(city => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className='flex items-center justify-between border-t pt-2'>
              <p className='text-muted-foreground text-sm'>
                {(buildingsData as unknown as BuildingQueryResult)?.pagination
                  ?.total || 0}{' '}
                {t('building')}(s) found
              </p>
              <Button variant='outline' size='sm' onClick={clearFilters}>
                <X className='mr-2 h-4 w-4' />
                {t('clearFilters')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>{' '}
      {/* View Tabs */}
      <Tabs
        value={filters.view}
        onValueChange={value => setFilters({ view: value })}
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger
            value={BUILDING_VIEWS.GRID}
            className='flex items-center gap-2'
          >
            <Grid3X3 className='h-4 w-4' />
            {t('gridView')}
          </TabsTrigger>
          <TabsTrigger
            value={BUILDING_VIEWS.TABLE}
            className='flex items-center gap-2'
          >
            <Table className='h-4 w-4' />
            {t('tableView')}
          </TabsTrigger>
        </TabsList>
        <div className='space-y-4'>
          <TabsContent value={BUILDING_VIEWS.GRID} className='mt-4 space-y-4'>
            <BuildingsGridView
              buildings={buildingsWithData}
              onEdit={setEditingBuilding}
              onDelete={handleDeleteBuilding}
            />{' '}
            {/* Pagination for Grid View */}
            <SimplePagination
              currentPage={filters.page || 1}
              totalPages={
                (buildingsData as BuildingQueryResult)?.pagination
                  ?.totalPages || 1
              }
              onPageChange={page => setFilters({ page })}
            />
          </TabsContent>
          <TabsContent value={BUILDING_VIEWS.TABLE} className='mt-4 space-y-4'>
            <BuildingsTableView
              buildings={buildingsWithData}
              onEdit={setEditingBuilding}
              onDelete={handleDeleteBuilding}
            />{' '}
            {/* Pagination for Table View */}
            <SimplePagination
              currentPage={filters.page || 1}
              totalPages={
                (buildingsData as BuildingQueryResult)?.pagination
                  ?.totalPages || 1
              }
              onPageChange={page => setFilters({ page })}
            />
          </TabsContent>
        </div>
      </Tabs>{' '}
      {/* Create/Edit Dialog */}
      <ResponsiveDialog
        title={editingBuilding ? t('editBuilding') : t('addBuilding')}
        description={
          editingBuilding ? t('basicInformation') : t('buildingDetails')
        }
        open={isCreateDialogOpen || !!editingBuilding}
        onOpenChange={open => {
          if (!open) handleCloseDialog();
          else if (!editingBuilding) setIsCreateDialogOpen(true);
        }}
      >
        <BuildingForm
          building={editingBuilding}
          onSubmit={
            editingBuilding ? handleUpdateBuilding : handleCreateBuilding
          }
          isLoading={
            editingBuilding
              ? updateMutation.isPending
              : createMutation.isPending
          }
          onCancel={handleCloseDialog}
        />
      </ResponsiveDialog>
      <ConfirmDialog />
    </div>
  );
}
