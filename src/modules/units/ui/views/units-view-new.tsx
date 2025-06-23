'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreHorizontal, Filter, Search, X } from 'lucide-react';
import { CreateUnitDialog } from '../components/create-unit-dialog';
import { EditUnitDialog } from '../components/edit-unit-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTRPC } from '@/trpc/client';
import { useConfirm } from '@/hooks/use-confirm';
import { useUnitsFilters } from '../../hooks/use-units-filters';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import type { UnitWithBuilding } from '../../types';
import type { Resident } from '@/modules/residents/types';
import type { Income } from '@/modules/incomes/types';
import { Link } from '@/i18n/routing';
import { PageHeader } from '@/components/page-header';
import { PAGINATION } from '@/constants';

const UnitsView = () => {
  const t = useTranslations('units');
  const tCommon = useTranslations('common');
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingUnit, setEditingUnit] = useState<
    UnitWithBuilding | undefined
  >();

  // Filters
  const [filters, setFilters] = useUnitsFilters();
  const debouncedSearch = useDebouncedValue(filters.search, 300);

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    t('deleteUnit'),
    t('confirmDelete'),
    true
  );
  const { data: unitsData } = useQuery(
    trpc.units.getAll.queryOptions({
      page: filters.page,
      pageSize: filters.pageSize,
      search: debouncedSearch || undefined,
      buildingId: filters.buildingId || undefined,
      floor: filters.floor ?? undefined,
      minBedrooms: filters.minBedrooms ?? undefined,
      maxBedrooms: filters.maxBedrooms ?? undefined,
      minBathrooms: filters.minBathrooms ?? undefined,
      maxBathrooms: filters.maxBathrooms ?? undefined,
      isOccupied: filters.isOccupied ?? undefined,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    })
  );

  const units = unitsData?.data || [];
  const pagination = unitsData?.pagination;
  // Get buildings for filter dropdown
  const { data: buildingsData } = useQuery(
    trpc.buildings.getAll.queryOptions({
      page: 1,
      pageSize: 100,
    })
  );
  const buildings = buildingsData?.data || [];

  // Get residents data for all units
  const { data: allResidentsData } = useQuery(
    trpc.residents.getAll.queryOptions({
      page: PAGINATION.DEFAULT_PAGE,
      pageSize: PAGINATION.MAX_PAGE_SIZE, // Get a large number to include all residents
    })
  );
  const allResidents = (allResidentsData as { data: Resident[] })?.data || [];

  // Get current month income data for all units
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const { data: allIncomes = [] } = useQuery(
    trpc.incomes.getAll.queryOptions({
      month: currentMonth,
      year: currentYear,
    })
  );
  const toggleOccupancy = useMutation(
    trpc.units.toggleOccupancy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [['units', 'getAll']] });
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
      },
    })
  );

  const deleteUnit = useMutation(
    trpc.units.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [['units', 'getAll']] });
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
      },
    })
  );

  const handleToggleOccupancy = async (id: string, isOccupied: boolean) => {
    await toggleOccupancy.mutateAsync({ id, isOccupied: !isOccupied });
  };

  const handleEdit = (unit: UnitWithBuilding) => {
    setEditingUnit(unit);
    setShowEditDialog(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      await deleteUnit.mutateAsync({ id });
    }
  };
  const handleEditSuccess = () => {
    setShowEditDialog(false);
    setEditingUnit(undefined);
    queryClient.invalidateQueries({ queryKey: [['units', 'getAll']] });
  };

  const handleCreateSuccess = () => {
    setShowCreateDialog(false);
    queryClient.invalidateQueries({ queryKey: [['units', 'getAll']] });
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      page: 1,
      search: '',
      buildingId: '',
      floor: undefined,
      minBedrooms: undefined,
      maxBedrooms: undefined,
      minBathrooms: undefined,
      maxBathrooms: undefined,
      isOccupied: undefined,
    });
  };

  const hasActiveFilters = !!(
    filters.search ||
    filters.buildingId ||
    filters.floor !== undefined ||
    filters.minBedrooms !== undefined ||
    filters.maxBedrooms !== undefined ||
    filters.minBathrooms !== undefined ||
    filters.maxBathrooms !== undefined ||
    filters.isOccupied !== undefined
  );

  const getUnitResidentCount = (unitId: string) => {
    return allResidents.filter(
      (resident: Resident) => resident.unitId === unitId && resident.isActive
    ).length;
  };

  const getUnitMonthlyIncome = (unitId: string) => {
    const unitIncomes = (allIncomes as Income[]).filter(
      (income: Income) => income.unitId === unitId
    );
    return unitIncomes.reduce(
      (sum: number, income: Income) => sum + Number(income.amount),
      0
    );
  };

  // Get unique floors for filter
  const uniqueFloors = Array.from(
    new Set(units.map(unit => unit.floor).filter(floor => floor !== undefined))
  ).sort((a, b) => a - b);

  return (
    <>
      <PageHeader
        title={t('title')}
        description={t('description')}
        ctaButtonContent={
          <div className='flex items-center gap-x-2'>
            <Plus className='h-4 w-4' />
            {t('addUnit')}
          </div>
        }
        ctaButtonCallback={() => setShowCreateDialog(true)}
      />

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center space-x-2'>
            <Filter className='h-5 w-5' />
            <span>{t('filter')}</span>
            {hasActiveFilters && (
              <Badge variant='secondary' className='ml-2'>
                {
                  [
                    filters.search,
                    filters.buildingId,
                    filters.floor !== undefined,
                    filters.minBedrooms !== undefined,
                    filters.maxBedrooms !== undefined,
                    filters.minBathrooms !== undefined,
                    filters.maxBathrooms !== undefined,
                    filters.isOccupied !== undefined,
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
                  placeholder={t('searchPlaceholder')}
                  className='pl-8'
                  value={filters.search}
                  onChange={e =>
                    setFilters({ search: e.target.value, page: 1 })
                  }
                />
              </div>
            </div>

            {/* Building Filter */}
            <div className='space-y-2'>
              <Label htmlFor='building'>{t('building')}</Label>
              <Select
                value={filters.buildingId}
                onValueChange={value =>
                  setFilters({
                    buildingId: value === 'all' ? '' : value,
                    page: 1,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('allBuildings')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>{t('allBuildings')}</SelectItem>
                  {Array.isArray(buildings) &&
                    buildings.map(building => (
                      <SelectItem key={building.id} value={building.id}>
                        {building.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Floor Filter */}
            <div className='space-y-2'>
              <Label htmlFor='floor'>{t('floor')}</Label>
              <Select
                value={filters.floor?.toString() || ''}
                onValueChange={value =>
                  setFilters({
                    floor: value === 'all' ? undefined : parseInt(value),
                    page: 1,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('allFloors')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>{t('allFloors')}</SelectItem>
                  {uniqueFloors.map(floor => (
                    <SelectItem key={floor} value={floor.toString()}>
                      {t('floor')} {floor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Occupancy Status Filter */}
            <div className='space-y-2'>
              <Label htmlFor='status'>{t('occupancyStatus')}</Label>
              <Select
                value={
                  filters.isOccupied === undefined
                    ? 'all'
                    : filters.isOccupied
                      ? 'occupied'
                      : 'vacant'
                }
                onValueChange={value =>
                  setFilters({
                    isOccupied:
                      value === 'all' ? undefined : value === 'occupied',
                    page: 1,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('allStatuses')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>{t('allStatuses')}</SelectItem>
                  <SelectItem value='occupied'>{t('occupied')}</SelectItem>
                  <SelectItem value='vacant'>{t('vacant')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bedroom and Bathroom Range Filters */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            {/* Min Bedrooms */}
            <div className='space-y-2'>
              <Label htmlFor='minBedrooms'>{t('minBedrooms')}</Label>
              <Select
                value={filters.minBedrooms?.toString() || ''}
                onValueChange={value =>
                  setFilters({
                    minBedrooms: value === 'all' ? undefined : parseInt(value),
                    page: 1,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={tCommon('any')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>{tCommon('any')}</SelectItem>
                  {[1, 2, 3, 4, 5].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}+
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Max Bedrooms */}
            <div className='space-y-2'>
              <Label htmlFor='maxBedrooms'>{t('maxBedrooms')}</Label>
              <Select
                value={filters.maxBedrooms?.toString() || ''}
                onValueChange={value =>
                  setFilters({
                    maxBedrooms: value === 'all' ? undefined : parseInt(value),
                    page: 1,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={tCommon('any')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>{tCommon('any')}</SelectItem>
                  {[1, 2, 3, 4, 5].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Bathrooms */}
            <div className='space-y-2'>
              <Label htmlFor='minBathrooms'>{t('minBathrooms')}</Label>
              <Select
                value={filters.minBathrooms?.toString() || ''}
                onValueChange={value =>
                  setFilters({
                    minBathrooms: value === 'all' ? undefined : parseInt(value),
                    page: 1,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={tCommon('any')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>{tCommon('any')}</SelectItem>
                  {[1, 2, 3, 4, 5].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}+
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Max Bathrooms */}
            <div className='space-y-2'>
              <Label htmlFor='maxBathrooms'>{t('maxBathrooms')}</Label>
              <Select
                value={filters.maxBathrooms?.toString() || ''}
                onValueChange={value =>
                  setFilters({
                    maxBathrooms: value === 'all' ? undefined : parseInt(value),
                    page: 1,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={tCommon('any')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>{tCommon('any')}</SelectItem>
                  {[1, 2, 3, 4, 5].map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className='flex items-center justify-between border-t pt-2'>
              <p className='text-muted-foreground text-sm'>
                {pagination?.total || 0} {t('title').toLowerCase()} found
              </p>
              <Button variant='outline' size='sm' onClick={clearFilters}>
                <div className='flex items-center gap-x-2'>
                  <X className='h-4 w-4' />
                  {t('clearFilters')}
                </div>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Units Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {units.map(unit => (
          <Link key={unit.id} href={`/units/${unit.id}`}>
            <Card className='cursor-pointer transition-shadow hover:shadow-lg'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-lg'>{unit.unitNumber}</CardTitle>
                  <div className='flex items-center gap-2'>
                    <Badge variant={unit.isOccupied ? 'default' : 'secondary'}>
                      {unit.isOccupied ? t('occupied') : t('vacant')}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          className='h-8 w-8 p-0'
                          onClick={e => e.preventDefault()}
                        >
                          <span className='sr-only'>{t('openMenu')}</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>
                          {tCommon('actions')}
                        </DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(unit)}>
                          {t('editUnit')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(
                              `/residents?unitId=${unit.id}`,
                              '_blank'
                            )
                          }
                        >
                          {t('viewResidents')}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(`/finances?unitId=${unit.id}`, '_blank')
                          }
                        >
                          {t('viewIncome')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(unit.id)}
                          className='text-red-600'
                        >
                          {t('deleteUnit')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardDescription>
                  {unit.building?.name ?? t('unknownBuilding')} - {t('floor')}
                  {unit.floor}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{t('bedrooms')}:</span>
                    <span>{unit.bedrooms}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>{t('bathrooms')}:</span>
                    <span>{unit.bathrooms}</span>
                  </div>
                  {unit.area && (
                    <div className='flex justify-between text-sm'>
                      <span>{t('area')}:</span>
                      <span>{unit.area} m²</span>
                    </div>
                  )}
                  <div className='flex justify-between text-sm font-medium'>
                    <span>{t('monthlyFee')}:</span>
                    <span>${unit.monthlyFee}</span>
                  </div>

                  {/* Relationship Information */}
                  <div className='mt-2 border-t pt-2'>
                    <div className='flex justify-between text-sm'>
                      <span>{t('activeResidents')}:</span>
                      <span className='font-medium'>
                        {getUnitResidentCount(unit.id)}
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span>{t('thisMonthIncome')}:</span>
                      <span className='font-medium text-green-600'>
                        ${getUnitMonthlyIncome(unit.id).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {unit.description && (
                    <p className='text-muted-foreground mt-2 text-sm'>
                      {unit.description}
                    </p>
                  )}
                </div>

                <div className='mt-4 flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleToggleOccupancy(unit.id, unit.isOccupied);
                    }}
                    disabled={toggleOccupancy.isPending}
                    className='flex-1'
                  >
                    {unit.isOccupied ? t('markVacant') : t('markOccupied')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setFilters({ page: filters.page - 1 })}
              disabled={filters.page <= 1}
            >
              Previous
            </Button>
            <span className='text-muted-foreground text-sm'>
              Page {filters.page} of {pagination.totalPages}
            </span>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setFilters({ page: filters.page + 1 })}
              disabled={filters.page >= pagination.totalPages}
            >
              Next
            </Button>
          </div>
          <p className='text-muted-foreground text-sm'>
            {pagination.total} total units
          </p>
        </div>
      )}

      {units.length === 0 && (
        <Card>
          <CardContent className='flex flex-col items-center justify-center p-8'>
            <h3 className='mb-2 text-lg font-medium text-gray-900'>
              {t('noUnitsFound')}
            </h3>
            <p className='mb-4 text-sm text-gray-600'>
              {t('noUnitsDescription')}
            </p>
            <Button
              onClick={() => setShowCreateDialog(true)}
              className='flex items-center space-x-2'
            >
              <Plus className='h-4 w-4' />
              {t('addFirstUnit')}
            </Button>
          </CardContent>
        </Card>
      )}

      <CreateUnitDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={handleCreateSuccess}
      />
      <EditUnitDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSuccess={handleEditSuccess}
        unit={editingUnit}
      />
      <ConfirmDialog />
    </>
  );
};

export { UnitsView };
