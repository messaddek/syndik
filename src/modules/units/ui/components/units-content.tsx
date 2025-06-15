'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreHorizontal } from 'lucide-react';
import { CreateUnitDialog } from './create-unit-dialog';
import { EditUnitDialog } from './edit-unit-dialog';
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
import type { Unit } from '../../types';
import type { Resident } from '@/modules/residents/types';
import type { Income } from '@/modules/incomes/types';
import { Link } from '@/i18n/routing';

export function UnitsContent() {
  const t = useTranslations();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | undefined>();

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    t('units.deleteUnit'),
    t('units.confirmDelete')
  );

  const { data: units = [] } = useQuery(trpc.units.getAll.queryOptions({}));

  const { data: buildingsData = { data: [] } } = useQuery(
    trpc.buildings.getAll.queryOptions({})
  );
  const buildings = buildingsData.data || [];

  // Get residents data for all units
  const { data: allResidentsData } = useQuery(
    trpc.residents.getAll.queryOptions({})
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
        queryClient.invalidateQueries(trpc.units.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
      },
    })
  );

  const deleteUnit = useMutation(
    trpc.units.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.units.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
      },
    })
  );
  const handleToggleOccupancy = async (id: string, isOccupied: boolean) => {
    await toggleOccupancy.mutateAsync({ id, isOccupied: !isOccupied });
  };

  const handleEdit = (unit: Unit) => {
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
    queryClient.invalidateQueries(trpc.units.getAll.queryOptions({}));
    setShowEditDialog(false);
    setEditingUnit(undefined);
  };

  const getBuildingName = (buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    return building?.name || t('units.unknownBuilding');
  };

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

  return (
    <>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>{t('units.title')}</h2>
          <p className='text-muted-foreground'>
            {units.length} {t('units.totalUnits')}
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className='mr-2 h-4 w-4' />
          {t('units.addUnit')}
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {units.map(unit => (
          <Link key={unit.id} href={`/units/${unit.id}`}>
            <Card className='cursor-pointer transition-shadow hover:shadow-lg'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-lg'>{unit.unitNumber}</CardTitle>
                  <div className='flex items-center gap-2'>
                    <Badge variant={unit.isOccupied ? 'default' : 'secondary'}>
                      {unit.isOccupied
                        ? t('units.occupied')
                        : t('units.vacant')}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          className='h-8 w-8 p-0'
                          onClick={e => e.preventDefault()}
                        >
                          <span className='sr-only'>{t('units.openMenu')}</span>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>
                          {t('common.actions')}
                        </DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(unit)}>
                          {t('units.editUnit')}
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
                          {t('units.viewResidents')}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            window.open(`/finances?unitId=${unit.id}`, '_blank')
                          }
                        >
                          {t('units.viewIncome')}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDelete(unit.id)}
                          className='text-red-600'
                        >
                          {t('units.deleteUnit')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardDescription>
                  {getBuildingName(unit.buildingId)} - {t('units.floor')}{' '}
                  {unit.floor}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{t('units.bedrooms')}:</span>
                    <span>{unit.bedrooms}</span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>{t('units.bathrooms')}:</span>
                    <span>{unit.bathrooms}</span>
                  </div>
                  {unit.area && (
                    <div className='flex justify-between text-sm'>
                      <span>{t('units.area')}:</span>
                      <span>{unit.area} m²</span>
                    </div>
                  )}
                  <div className='flex justify-between text-sm font-medium'>
                    <span>{t('units.monthlyFee')}:</span>
                    <span>${unit.monthlyFee}</span>
                  </div>

                  {/* Relationship Information */}
                  <div className='mt-2 border-t pt-2'>
                    <div className='flex justify-between text-sm'>
                      <span>{t('units.activeResidents')}:</span>
                      <span className='font-medium'>
                        {getUnitResidentCount(unit.id)}
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span>{t('units.thisMonthIncome')}:</span>
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
                    onClick={() =>
                      handleToggleOccupancy(unit.id, unit.isOccupied)
                    }
                    disabled={toggleOccupancy.isPending}
                    className='flex-1'
                  >
                    {unit.isOccupied ? 'Mark Vacant' : 'Mark Occupied'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {units.length === 0 && (
        <Card>
          <CardContent className='flex flex-col items-center justify-center p-8'>
            <h3 className='mb-2 text-lg font-medium text-gray-900'>
              No units found
            </h3>
            <p className='mb-4 text-sm text-gray-600'>
              Start by adding your first unit to manage properties.
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className='mr-2 h-4 w-4' />
              Add First Unit
            </Button>
          </CardContent>
        </Card>
      )}{' '}
      <CreateUnitDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSuccess={() => {
          queryClient.invalidateQueries(trpc.units.getAll.queryOptions({}));
        }}
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
}
