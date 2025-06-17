'use client';

import { useSuspenseQuery, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useTRPC } from '@/trpc/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Home,
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  Users,
  DollarSign,
  Bed,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { UnitForm } from '../components/unit-form';
import { useConfirm } from '@/hooks/use-confirm';
import type { Resident } from '@/modules/residents/types';

interface UnitViewProps {
  id: string;
  _searchParams?: Record<string, string | string[] | undefined>;
}

export function UnitView({ id, _searchParams }: UnitViewProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const t = useTranslations('units');
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    t('deleteUnit'),
    t('confirmDeleteExtended'),
    true
  );

  // Fetch unit data
  const { data: unit } = useSuspenseQuery(
    trpc.units.getById.queryOptions({ id })
  );
  // Fetch building data
  const { data: building } = useQuery({
    ...trpc.buildings.getById.queryOptions({ id: unit?.buildingId || '' }),
    enabled: !!unit?.buildingId,
  });

  // Fetch residents for this unit
  const { data: residents = [] } = useQuery({
    ...trpc.residents.getByUnit.queryOptions({ unitId: id }),
    enabled: !!unit,
  });

  // Fetch incomes for this unit (current month)
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const { data: incomes = [] } = useSuspenseQuery(
    trpc.incomes.getAll.queryOptions({
      unitId: id,
      month: currentMonth,
      year: currentYear,
    })
  );
  // Delete mutation
  const deleteMutation = useMutation(
    trpc.units.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.units.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
        router.push('/units');
      },
    })
  );

  // Toggle occupancy mutation
  const toggleOccupancyMutation = useMutation(
    trpc.units.toggleOccupancy.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.units.getById.queryOptions({ id }));
        queryClient.invalidateQueries(trpc.units.getAll.queryOptions({}));
      },
    })
  );
  const handleUpdateUnit = () => {
    setIsEditDialogOpen(false);
    queryClient.invalidateQueries(trpc.units.getById.queryOptions({ id }));
    queryClient.invalidateQueries(trpc.units.getAll.queryOptions({}));
    queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
  };

  const handleDeleteUnit = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      deleteMutation.mutate({ id });
    }
  };

  const handleToggleOccupancy = () => {
    if (unit) {
      toggleOccupancyMutation.mutate({
        id,
        isOccupied: !unit.isOccupied,
      });
    }
  };

  if (!unit) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-muted-foreground'>{t('unitNotFound')}</p>
      </div>
    );
  }

  const monthlyIncome = incomes.reduce(
    (sum, income) => sum + Number(income.amount),
    0
  );
  const activeResidents = residents.filter(
    (resident: Resident) => resident.isActive
  ).length;

  return (
    <>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            {' '}
            <Button variant='ghost' size='sm' asChild>
              <Link href='/units'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                {t('backToUnits')}
              </Link>
            </Button>
            <div>
              <div className='flex items-center space-x-2'>
                <Home className='h-6 w-6 text-green-600' />
                <h1 className='text-3xl font-bold'>
                  {t('view.unitTitle', { number: unit.unitNumber })}
                </h1>
                <Badge variant={unit.isOccupied ? 'default' : 'secondary'}>
                  {unit.isOccupied ? t('occupied') : t('vacant')}
                </Badge>
              </div>
              {building && (
                <div className='text-muted-foreground mt-1 flex items-center space-x-1'>
                  <MapPin className='h-4 w-4' />
                  <span>
                    {building.name} -{' '}
                    {t('view.floorLabel', { floor: unit.floor })}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Button
              variant='outline'
              onClick={handleToggleOccupancy}
              disabled={toggleOccupancyMutation.isPending}
            >
              {unit.isOccupied ? t('markVacant') : t('markOccupied')}
            </Button>
            <Button variant='outline' onClick={() => setIsEditDialogOpen(true)}>
              <Edit className='mr-2 h-4 w-4' />
              {t('view.edit')}
            </Button>
            <Button variant='destructive' onClick={handleDeleteUnit}>
              <Trash2 className='mr-2 h-4 w-4' />
              {t('view.delete')}
            </Button>
          </div>
        </div>{' '}
        {/* Overview Cards */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t('monthlyFee')}
              </CardTitle>
              <DollarSign className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>${unit.monthlyFee}</div>
              <p className='text-muted-foreground text-xs'>
                {t('view.collected', { amount: monthlyIncome })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t('bedrooms')}
              </CardTitle>
              <Bed className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{unit.bedrooms}</div>
              <p className='text-muted-foreground text-xs'>
                {unit.bathrooms}{' '}
                {unit.bathrooms !== 1
                  ? t('view.bathrooms')
                  : t('view.bathroom')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t('view.currentResidents')}
              </CardTitle>
              <Users className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{activeResidents}</div>
              <p className='text-muted-foreground text-xs'>
                {t('view.totalResidents', { count: residents.length })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t('floor')}
              </CardTitle>
              <Home className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{unit.floor}</div>
              <p className='text-muted-foreground text-xs'>
                {unit.area ? `${unit.area} m²` : t('view.areaNotSpecified')}
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Unit Details */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <Card>
            {' '}
            <CardHeader>
              <CardTitle>{t('view.unitInformation')}</CardTitle>
              <CardDescription>
                {t('view.unitInformationDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                {' '}
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    {t('form.unitNumber')}
                  </p>
                  <p className='text-sm'>{unit.unitNumber}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    {t('floor')}
                  </p>
                  <p className='text-sm'>{unit.floor}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    {t('bedrooms')}
                  </p>
                  <p className='text-sm'>{unit.bedrooms}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    {t('bathrooms')}
                  </p>
                  <p className='text-sm'>{unit.bathrooms}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    {t('monthlyFee')}
                  </p>
                  <p className='text-sm'>${unit.monthlyFee}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    {t('area')}
                  </p>
                  <p className='text-sm'>
                    {unit.area ? `${unit.area} m²` : t('view.areaNotSpecified')}
                  </p>
                </div>
              </div>{' '}
              {unit.description && (
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    {t('portal.details.description')}
                  </p>
                  <p className='text-sm'>{unit.description}</p>
                </div>
              )}
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  {t('view.status')}
                </p>
                <Badge
                  variant={unit.isOccupied ? 'default' : 'secondary'}
                  className='mt-1'
                >
                  {unit.isOccupied ? t('occupied') : t('vacant')}
                </Badge>
              </div>
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  {t('view.createdAt')}
                </p>
                <p className='text-sm'>
                  {new Date(unit.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            {' '}
            <CardHeader>
              <CardTitle>{t('portal.details.buildingTitle')}</CardTitle>
              <CardDescription>
                {t('portal.details.buildingDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {building ? (
                <>
                  <div>
                    <p className='text-muted-foreground text-sm font-medium'>
                      {t('portal.details.buildingName')}
                    </p>
                    <Link
                      href={`/buildings/${building.id}`}
                      className='text-primary text-sm hover:underline'
                    >
                      {building.name}
                    </Link>
                  </div>
                  <div>
                    <p className='text-muted-foreground text-sm font-medium'>
                      {t('portal.details.buildingAddress')}
                    </p>
                    <p className='text-sm'>{building.address}</p>
                  </div>
                  <div>
                    <p className='text-muted-foreground text-sm font-medium'>
                      {t('view.city')}
                    </p>
                    <p className='text-sm'>
                      {building.city}, {building.country}
                    </p>
                  </div>
                  <div>
                    <p className='text-muted-foreground text-sm font-medium'>
                      {t('view.totalUnits')}
                    </p>
                    <p className='text-sm'>{building.totalUnits}</p>
                  </div>
                  <div className='flex space-x-2 pt-4'>
                    <Button variant='outline' size='sm' asChild>
                      <Link href={`/buildings/${building.id}`}>
                        {t('view.viewBuildingDetails')}
                      </Link>
                    </Button>
                    <Button variant='outline' size='sm' asChild>
                      <Link href={`/units?buildingId=${building.id}`}>
                        {t('view.viewAllUnits')}
                      </Link>
                    </Button>{' '}
                  </div>
                </>
              ) : (
                <p className='text-muted-foreground text-sm'>
                  {t('portal.buildingInfo')}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Residents */}
        {residents.length > 0 && (
          <Card>
            {' '}
            <CardHeader>
              <CardTitle>{t('view.currentResidents')}</CardTitle>
              <CardDescription>
                {t('view.currentResidentsDescription', {
                  count: activeResidents,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {residents.map((resident: Resident) => (
                  <Link key={resident.id} href={`/residents/${resident.id}`}>
                    <Card className='transition-shadow hover:shadow-md'>
                      <CardHeader className='pb-3'>
                        <div className='flex items-center justify-between'>
                          <CardTitle className='text-lg'>
                            {resident.firstName} {resident.lastName}
                          </CardTitle>
                          <div className='flex space-x-1'>
                            {' '}
                            <Badge
                              variant={
                                resident.isOwner ? 'default' : 'secondary'
                              }
                            >
                              {resident.isOwner
                                ? t('view.owner')
                                : t('view.tenant')}
                            </Badge>
                            <Badge
                              variant={
                                resident.isActive ? 'default' : 'destructive'
                              }
                            >
                              {resident.isActive
                                ? t('view.active')
                                : t('view.inactive')}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription>{resident.email}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {' '}
                        <div className='space-y-2 text-sm'>
                          <div className='flex justify-between'>
                            <span>{t('view.moveInDate')}:</span>
                            <span>
                              {new Date(
                                resident.moveInDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          {resident.phone && (
                            <div className='flex justify-between'>
                              <span>{t('view.phoneNumber')}:</span>
                              <span>{resident.phone}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}{' '}
        {/* Financial Overview */}
        <Card>
          <CardHeader>
            <CardTitle>{t('view.financialOverview')}</CardTitle>
            <CardDescription>
              {t('view.financialOverviewDescription', {
                month: new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                }),
              })}
            </CardDescription>
          </CardHeader>{' '}
          <CardContent>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <div className='text-center'>
                <p className='text-2xl font-bold text-green-600'>
                  ${monthlyIncome}
                </p>
                <p className='text-muted-foreground text-sm'>
                  {t('view.collectedThisMonth')}
                </p>
              </div>
              <div className='text-center'>
                <p className='text-2xl font-bold'>${unit.monthlyFee}</p>
                <p className='text-muted-foreground text-sm'>
                  {t('view.expectedMonthlyFee')}
                </p>
              </div>
              <div className='text-center'>
                <p
                  className={`text-2xl font-bold ${monthlyIncome >= unit.monthlyFee ? 'text-green-600' : 'text-red-600'}`}
                >
                  ${monthlyIncome - unit.monthlyFee}
                </p>
                <p className='text-muted-foreground text-sm'>
                  {monthlyIncome >= unit.monthlyFee
                    ? t('view.surplus')
                    : t('view.outstanding')}
                </p>
              </div>
            </div>
            <div className='mt-4 text-center'>
              <Button variant='outline' asChild>
                <Link href={`/finances?unitId=${id}`}>
                  {t('view.viewFullFinancialHistory')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>{' '}
      {/* Edit Dialog */}
      <ResponsiveDialog
        title={t('view.editTitle')}
        description={t('view.editDescription')}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        {' '}
        <UnitForm
          unit={unit}
          onSuccess={handleUpdateUnit}
          onCancel={() => setIsEditDialogOpen(false)}
        />
      </ResponsiveDialog>
      <ConfirmDialog />
    </>
  );
}
