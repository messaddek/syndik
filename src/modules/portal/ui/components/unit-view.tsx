'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Home,
  Building2,
  MapPin,
  Users,
  Calendar,
  Square,
  Bed,
  Bath,
  Phone,
  Mail,
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export const UnitView = () => {
  const t = useTranslations('units.portal');
  const trpc = useTRPC();

  const { data, isLoading, error } = useQuery(
    trpc.portal.getCurrentResident.queryOptions()
  );

  if (isLoading) {
    return <UnitViewSkeleton />;
  }

  if (error) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent className='pt-6'>
            <div className='text-center text-red-600'>
              {t('error')}: {error.message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='p-6'>
        <Card>
          <CardContent className='pt-6'>
            <div className='text-center text-gray-500'>{t('noData')}</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { resident, unit, building } = data;

  return (
    <div className='space-y-6 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100'>
            <Home className='text-primary h-5 w-5' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              {t('title')} {unit?.unitNumber || t('values.notAvailable')}
            </h1>
            <p className='text-sm text-gray-500'>
              {building?.name || t('buildingInfo')}
            </p>
          </div>
        </div>
        <Badge variant={resident?.isOwner ? 'default' : 'secondary'}>
          {resident?.isOwner ? t('status.owner') : t('status.tenant')}
        </Badge>
      </div>
      {/* Unit Overview Cards */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('overview.floor')}
            </CardTitle>
            <Building2 className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {unit?.floor ?? t('values.notAvailable')}
            </div>
            <p className='text-muted-foreground text-xs'>
              {t('overview.floorDescription')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('overview.area')}
            </CardTitle>
            <Square className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {unit?.area ? `${unit.area}m²` : t('values.notAvailable')}
            </div>
            <p className='text-muted-foreground text-xs'>
              {t('overview.areaDescription')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('overview.bedrooms')}
            </CardTitle>
            <Bed className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {unit?.bedrooms ?? t('values.notAvailable')}
            </div>
            <p className='text-muted-foreground text-xs'>
              {t('overview.bedroomsDescription')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('overview.bathrooms')}
            </CardTitle>
            <Bath className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {unit?.bathrooms ?? t('values.notAvailable')}
            </div>
            <p className='text-muted-foreground text-xs'>
              {t('overview.bathroomsDescription')}
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Unit and Building Details */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Unit Information */}
        <Card>
          
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Home className='h-5 w-5' />
              {t('details.unitTitle')}
            </CardTitle>
            <CardDescription>{t('details.unitDescription')}</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  {t('details.unitNumber')}
                </label>
                <p className='text-sm font-semibold'>
                  {unit?.unitNumber || t('values.notAvailable')}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  {t('overview.floor')}
                </label>
                <p className='text-sm font-semibold'>
                  {unit?.floor ?? t('values.notAvailable')}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  {t('overview.area')}
                </label>
                <p className='text-sm font-semibold'>
                  {unit?.area ? `${unit.area} m²` : t('values.notAvailable')}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  {t('monthlyFee')}
                </label>
                <p className='text-sm font-semibold'>
                  {unit?.monthlyFee
                    ? `${unit.monthlyFee} MAD`
                    : t('values.notAvailable')}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  {t('overview.bedrooms')}
                </label>
                <p className='text-sm font-semibold'>
                  {unit?.bedrooms ?? t('values.notAvailable')}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  {t('overview.bathrooms')}
                </label>
                <p className='text-sm font-semibold'>
                  {unit?.bathrooms ?? t('values.notAvailable')}
                </p>
              </div>
            </div>
            {unit?.description && (
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  {t('details.description')}
                </label>
                <p className='mt-1 text-sm text-gray-700'>{unit.description}</p>
              </div>
            )}
            <div className='flex items-center gap-2 pt-2'>
              <Badge variant={unit?.isOccupied ? 'default' : 'secondary'}>
                {unit?.isOccupied ? t('occupied') : t('vacant')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Building Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Building2 className='h-5 w-5' />
              {t('details.buildingTitle')}
            </CardTitle>
            <CardDescription>
              {t('details.buildingDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='text-sm font-medium text-gray-500'>
                {t('details.buildingName')}
              </label>
              <p className='text-sm font-semibold'>
                {building?.name || t('values.notAvailable')}
              </p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-500'>
                {t('details.buildingAddress')}
              </label>
              <div className='mt-1 flex items-start gap-2'>
                <MapPin className='mt-0.5 h-4 w-4 text-gray-400' />
                <div className='text-sm text-gray-700'>
                  <p>{building?.address || t('values.notAvailable')}</p>
                  <p>
                    {building?.city || t('values.notAvailable')},
                    {building?.postalCode || t('values.notAvailable')}
                  </p>
                  <p>{building?.country || 'Morocco'}</p>
                </div>
              </div>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-500'>
                {t('details.totalUnits')}
              </label>
              <div className='mt-1 flex items-center gap-2'>
                <Users className='h-4 w-4 text-gray-400' />
                <span className='text-sm font-semibold'>
                  {building?.totalUnits || 0} {t('totalUnits')}
                </span>
              </div>
            </div>
            {building?.description && (
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  {t('details.description')}
                </label>
                <p className='mt-1 text-sm text-gray-700'>
                  {building.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Resident Information */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <User className='h-5 w-5' />
            {t('resident.title')}
          </CardTitle>
          <CardDescription>{t('resident.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div>
              <label className='text-sm font-medium text-gray-500'>
                {t('resident.name')}
              </label>
              <p className='text-sm font-semibold'>
                {resident?.firstName} {resident?.lastName}
              </p>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-500'>
                {t('resident.email')}
              </label>
              <div className='mt-1 flex items-center gap-2'>
                <Mail className='h-4 w-4 text-gray-400' />
                <span className='text-sm'>
                  {resident?.email || t('values.notAvailable')}
                </span>
              </div>
            </div>
            {resident?.phone && (
              <div>
                
                <label className='text-sm font-medium text-gray-500'>
                  {t('resident.phone')}
                </label>
                <div className='mt-1 flex items-center gap-2'>
                  <Phone className='h-4 w-4 text-gray-400' />
                  <span className='text-sm'>{resident.phone}</span>
                </div>
              </div>
            )}
            <div className='space-x-2'>
              <label className='text-sm font-medium text-gray-500'>
                {t('details.unitStatus')}
              </label>
              <Badge
                variant={resident?.isOwner ? 'default' : 'secondary'}
                className='mt-1'
              >
                {resident?.isOwner ? t('status.owner') : t('status.tenant')}
              </Badge>
            </div>
            <div>
              <label className='text-sm font-medium text-gray-500'>
                {t('resident.moveInDate')}
              </label>
              <div className='mt-1 flex items-center gap-2'>
                <Calendar className='h-4 w-4 text-gray-400' />
                <span className='text-sm'>
                  {resident?.moveInDate
                    ? new Date(resident.moveInDate).toLocaleDateString()
                    : t('values.notAvailable')}
                </span>
              </div>
            </div>
            {resident?.moveOutDate && (
              <div>
                
                <label className='text-sm font-medium text-gray-500'>
                  {t('resident.leaseEndDate')}
                </label>
                <div className='mt-1 flex items-center gap-2'>
                  <Calendar className='h-4 w-4 text-gray-400' />
                  <span className='text-sm'>
                    {new Date(resident.moveOutDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>

          {resident?.emergencyContact && (
            <div className='mt-4 border-t pt-4'>
              
              <h4 className='mb-2 text-sm font-medium text-gray-900'>
                {t('resident.emergencyContact')}
              </h4>
              <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                <div>
                  <label className='text-sm font-medium text-gray-500'>
                    Contact Name
                  </label>
                  <p className='text-sm'>{resident.emergencyContact}</p>
                </div>
                {resident.emergencyPhone && (
                  <div>
                    
                    <label className='text-sm font-medium text-gray-500'>
                      {t('resident.phone')}
                    </label>
                    <div className='flex items-center gap-2'>
                      <Phone className='h-4 w-4 text-gray-400' />
                      <span className='text-sm'>{resident.emergencyPhone}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {resident?.notes && (
            <div className='mt-4 border-t pt-4'>
              <label className='text-sm font-medium text-gray-500'>
                {t('resident.notes')}
              </label>
              <p className='mt-1 text-sm text-gray-700'>{resident.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const UnitViewSkeleton = () => {
  return (
    <div className='space-y-6 p-6'>
      {/* Header Skeleton */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <Skeleton className='h-10 w-10 rounded-lg' />
          <div>
            <Skeleton className='mb-1 h-8 w-32' />
            <Skeleton className='h-4 w-48' />
          </div>
        </div>
        <Skeleton className='h-6 w-16' />
      </div>

      {/* Overview Cards Skeleton */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-1 h-8 w-16' />
              <Skeleton className='h-3 w-24' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Details Cards Skeleton */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-6 w-32' />
              <Skeleton className='h-4 w-48' />
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                {[...Array(6)].map((_, j) => (
                  <div key={j}>
                    <Skeleton className='mb-1 h-4 w-20' />
                    <Skeleton className='h-4 w-16' />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resident Info Card Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className='h-6 w-40' />
          <Skeleton className='h-4 w-32' />
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <Skeleton className='mb-1 h-4 w-20' />
                <Skeleton className='h-4 w-32' />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

