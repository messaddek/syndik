'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
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
  Building2,
  MapPin,
  Users,
  Home,
  ArrowLeft,
  Edit,
  Trash2,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { BuildingForm } from './building-form';
import { useConfirm } from '@/hooks/use-confirm';
import { useTranslations } from 'next-intl';
import { useDirection } from '@/hooks/use-direction';

interface BuildingViewProps {
  id: string;
  _searchParams?: Record<string, string | string[] | undefined>;
}

export function BuildingView({ id, _searchParams }: BuildingViewProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  // Translation hooks
  const t = useTranslations('buildings');
  const tCommon = useTranslations('common');
  const isRtl = useDirection();

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    t('deleteBuilding'),
    t('confirmDelete'),
    true
  );

  // Fetch building data
  const { data: building } = useSuspenseQuery(
    trpc.buildings.getById.queryOptions({ id })
  );

  // Fetch units for this building
  const { data: units = [] } = useSuspenseQuery(
    trpc.units.getByBuilding.queryOptions({ buildingId: id })
  );
  // Fetch residents for units in this building
  const {
    data: allResidents = {
      data: [],
      pagination: { page: 1, pageSize: 10, total: 0, totalPages: 0 },
    },
  } = useSuspenseQuery(trpc.residents.getAll.queryOptions({}));
  // Filter residents for this building
  const buildingResidents =
    (allResidents.data || []).filter((resident: { unitId: string | null }) =>
      units.some(unit => unit.id === resident.unitId)
    ) || [];

  // Delete mutation
  const deleteMutation = useMutation(
    trpc.buildings.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.buildings.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
        router.push('/buildings');
      },
    })
  );

  const handleDeleteBuilding = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      deleteMutation.mutate({ id });
    }
  };
  if (!building) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-muted-foreground'>{t('buildingNotFound')}</p>
      </div>
    );
  }

  const occupiedUnits = units.filter(unit => unit.isOccupied).length;
  const occupancyRate =
    units.length > 0 ? (occupiedUnits / units.length) * 100 : 0;

  return (
    <>
      <div className='space-y-6'>
        {/* Header */}
        <div className='flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0'>
          <div className='flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:gap-x-2'>
            <Button
              variant='ghost'
              size='sm'
              asChild
              className='self-start sm:self-auto'
            >
              <Link href='/buildings' className='gap-x-2'>
                <ArrowLeft className='h-4 w-4 rtl:rotate-180' />
                {t('backToBuildings')}
              </Link>
            </Button>
            <div>
              <div className={`flex items-center gap-x-2`}>
                <Building2 className='h-5 w-5 text-blue-600 sm:h-6 sm:w-6' />
                <h1 className='text-xl font-bold sm:text-3xl'>
                  {building.name}
                </h1>
              </div>
              <div
                className={`text-muted-foreground mt-1 flex items-center space-x-1 text-sm`}
              >
                <MapPin className='h-3 w-3 sm:h-4 sm:w-4' />
                <span className='truncate'>
                  {building.address}, {building.city}, {building.country}
                </span>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2`}
          >
            <Button
              variant='outline'
              onClick={() => setIsEditDialogOpen(true)}
              className='w-full sm:w-auto'
            >
              <div className='flex items-center gap-x-2'>
                <Edit className='h-4 w-4' />
                <span className='sm:inline'>{tCommon('edit')}</span>
              </div>
            </Button>
            <Button
              variant='destructive'
              onClick={handleDeleteBuilding}
              className='w-full sm:w-auto'
            >
              <div className='flex items-center gap-x-2'>
                <Trash2 className='h-4 w-4' />
                <span className='sm:inline'>{tCommon('delete')}</span>
              </div>
            </Button>
          </div>
        </div>
        {/* Overview Cards */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t('totalUnits')}
              </CardTitle>
              <Home className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{building.totalUnits}</div>
              <p className='text-muted-foreground text-xs'>
                {t('unitsConfigured', { count: units.length })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t('occupiedUnits')}
              </CardTitle>
              <Users className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{occupiedUnits}</div>
              <p className='text-muted-foreground text-xs'>
                {t('occupancyRate', { rate: occupancyRate.toFixed(1) })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t('totalResidents')}
              </CardTitle>
              <Users className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {buildingResidents.length}
              </div>
              <p className='text-muted-foreground text-xs'>
                {t('activeResidents')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                {t('postalCode')}
              </CardTitle>
              <MapPin className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{building.postalCode}</div>
              <p className='text-muted-foreground text-xs'>
                {t('locationCode')}
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Building Details */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>{t('buildingInformation')}</CardTitle>
              <CardDescription>{t('buildingInfoDescription')}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    {t('address')}
                  </p>
                  <p className='text-sm'>{building.address}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    {t('city')}
                  </p>
                  <p className='text-sm'>{building.city}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    {t('country')}
                  </p>
                  <p className='text-sm'>{building.country}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    {t('postalCode')}
                  </p>
                  <p className='text-sm'>{building.postalCode}</p>
                </div>
              </div>
              {building.description && (
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Description
                  </p>
                  <p className='text-sm'>{building.description}</p>
                </div>
              )}
              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  Created
                </p>
                <p className='text-sm'>
                  {new Date(building.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('quickActions')}</CardTitle>
              <CardDescription>{t('quickActionsDescription')}</CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button className='w-full justify-start' asChild>
                <Link
                  href={`/units?buildingId=${id}`}
                  className={`flex items-center ${isRtl ? 'gap-x-reverse gap-x-2' : 'gap-x-2'}`}
                >
                  <Home className='h-4 w-4' />
                  {t('viewAllUnits')}
                </Link>
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start'
                asChild
              >
                <Link
                  href={`/residents?buildingId=${id}`}
                  className={`flex items-center ${isRtl ? 'gap-x-reverse gap-x-2' : 'gap-x-2'}`}
                >
                  <Users className='h-4 w-4' />
                  {t('viewResidents')}
                </Link>
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start'
                asChild
              >
                <Link
                  href={`/finances?buildingId=${id}`}
                  className={`flex items-center ${isRtl ? 'gap-x-reverse gap-x-2' : 'gap-x-2'}`}
                >
                  <Building2 className='h-4 w-4' />
                  {t('viewFinances')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        {/* Units Overview */}
        {units.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>{t('unitsOverview')}</CardTitle>
              <CardDescription>
                {t('unitsOverviewDescription', { count: units.length })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {units.slice(0, 6).map(unit => (
                  <Link key={unit.id} href={`/units/${unit.id}`}>
                    <Card className='transition-shadow hover:shadow-md'>
                      <CardHeader className='pb-3'>
                        <div className='flex items-center justify-between'>
                          <CardTitle className='text-lg'>
                            {t('unitNumber', { number: unit.unitNumber })}
                          </CardTitle>
                          <Badge
                            variant={unit.isOccupied ? 'default' : 'secondary'}
                          >
                            {unit.isOccupied ? t('occupied') : t('vacant')}
                          </Badge>
                        </div>
                        <CardDescription>
                          {t('floor', { floor: unit.floor })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-2 text-sm'>
                          <div className='flex justify-between'>
                            <span>{t('bedrooms')}</span>
                            <span>{unit.bedrooms}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>{t('monthlyFee')}</span>
                            <span>${unit.monthlyFee}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              {units.length > 6 && (
                <div className='mt-4 text-center'>
                  <Button variant='outline' asChild>
                    <Link href={`/units?buildingId=${id}`}>
                      {t('viewAllUnitsCount', { count: units.length })}
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      {/* Edit Dialog */}
      <ResponsiveDialog
        title={t('editBuilding')}
        description={t('buildingInfoDescription')}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <BuildingForm
          building={building}
          onSuccess={() => setIsEditDialogOpen(false)}
          onCancel={() => setIsEditDialogOpen(false)}
        />
      </ResponsiveDialog>
      <ConfirmDialog />
    </>
  );
}
