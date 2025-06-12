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

export function UnitView() {
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
              Error loading unit information: {error.message}
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
            <div className='text-center text-gray-500'>
              No unit information found
            </div>
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
            <Home className='h-5 w-5 text-blue-600' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              Unit {unit?.unitNumber || 'N/A'}
            </h1>
            <p className='text-sm text-gray-500'>
              {building?.name || 'Building information not available'}
            </p>
          </div>
        </div>
        <Badge variant={resident?.isOwner ? 'default' : 'secondary'}>
          {resident?.isOwner ? 'Owner' : 'Tenant'}
        </Badge>
      </div>

      {/* Unit Overview Cards */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Floor</CardTitle>
            <Building2 className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{unit?.floor ?? 'N/A'}</div>
            <p className='text-muted-foreground text-xs'>Building level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Area</CardTitle>
            <Square className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {unit?.area ? `${unit.area}m²` : 'N/A'}
            </div>
            <p className='text-muted-foreground text-xs'>Total area</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Bedrooms</CardTitle>
            <Bed className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{unit?.bedrooms ?? 'N/A'}</div>
            <p className='text-muted-foreground text-xs'>Number of rooms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Bathrooms</CardTitle>
            <Bath className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{unit?.bathrooms ?? 'N/A'}</div>
            <p className='text-muted-foreground text-xs'>Number of bathrooms</p>
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
              Unit Details
            </CardTitle>
            <CardDescription>Information about your unit</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Unit Number
                </label>
                <p className='text-sm font-semibold'>
                  {unit?.unitNumber || 'N/A'}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Floor
                </label>
                <p className='text-sm font-semibold'>{unit?.floor ?? 'N/A'}</p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Area
                </label>
                <p className='text-sm font-semibold'>
                  {unit?.area ? `${unit.area} m²` : 'N/A'}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Monthly Fee
                </label>
                <p className='text-sm font-semibold'>
                  {unit?.monthlyFee ? `${unit.monthlyFee} MAD` : 'N/A'}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Bedrooms
                </label>
                <p className='text-sm font-semibold'>
                  {unit?.bedrooms ?? 'N/A'}
                </p>
              </div>
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Bathrooms
                </label>
                <p className='text-sm font-semibold'>
                  {unit?.bathrooms ?? 'N/A'}
                </p>
              </div>
            </div>

            {unit?.description && (
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Description
                </label>
                <p className='mt-1 text-sm text-gray-700'>{unit.description}</p>
              </div>
            )}

            <div className='flex items-center gap-2 pt-2'>
              <Badge variant={unit?.isOccupied ? 'default' : 'secondary'}>
                {unit?.isOccupied ? 'Occupied' : 'Available'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Building Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Building2 className='h-5 w-5' />
              Building Information
            </CardTitle>
            <CardDescription>Information about your building</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <label className='text-sm font-medium text-gray-500'>
                Building Name
              </label>
              <p className='text-sm font-semibold'>{building?.name || 'N/A'}</p>
            </div>

            <div>
              <label className='text-sm font-medium text-gray-500'>
                Address
              </label>
              <div className='mt-1 flex items-start gap-2'>
                <MapPin className='mt-0.5 h-4 w-4 text-gray-400' />
                <div className='text-sm text-gray-700'>
                  <p>{building?.address || 'N/A'}</p>
                  <p>
                    {building?.city || 'N/A'}, {building?.postalCode || 'N/A'}
                  </p>
                  <p>{building?.country || 'Morocco'}</p>
                </div>
              </div>
            </div>

            <div>
              <label className='text-sm font-medium text-gray-500'>
                Total Units
              </label>
              <div className='mt-1 flex items-center gap-2'>
                <Users className='h-4 w-4 text-gray-400' />
                <span className='text-sm font-semibold'>
                  {building?.totalUnits || 0} units
                </span>
              </div>
            </div>

            {building?.description && (
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Description
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
            Resident Information
          </CardTitle>
          <CardDescription>Your details as a resident</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div>
              <label className='text-sm font-medium text-gray-500'>Name</label>
              <p className='text-sm font-semibold'>
                {resident?.firstName} {resident?.lastName}
              </p>
            </div>

            <div>
              <label className='text-sm font-medium text-gray-500'>Email</label>
              <div className='mt-1 flex items-center gap-2'>
                <Mail className='h-4 w-4 text-gray-400' />
                <span className='text-sm'>{resident?.email || 'N/A'}</span>
              </div>
            </div>

            {resident?.phone && (
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Phone
                </label>
                <div className='mt-1 flex items-center gap-2'>
                  <Phone className='h-4 w-4 text-gray-400' />
                  <span className='text-sm'>{resident.phone}</span>
                </div>
              </div>
            )}

            <div className='space-x-2'>
              <label className='text-sm font-medium text-gray-500'>
                Resident Type
              </label>
              <Badge
                variant={resident?.isOwner ? 'default' : 'secondary'}
                className='mt-1'
              >
                {resident?.isOwner ? 'Owner' : 'Tenant'}
              </Badge>
            </div>

            <div>
              <label className='text-sm font-medium text-gray-500'>
                Move-in Date
              </label>
              <div className='mt-1 flex items-center gap-2'>
                <Calendar className='h-4 w-4 text-gray-400' />
                <span className='text-sm'>
                  {resident?.moveInDate
                    ? new Date(resident.moveInDate).toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
            </div>

            {resident?.moveOutDate && (
              <div>
                <label className='text-sm font-medium text-gray-500'>
                  Move-out Date
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
                Emergency Contact
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
                      Contact Phone
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
              <label className='text-sm font-medium text-gray-500'>Notes</label>
              <p className='mt-1 text-sm text-gray-700'>{resident.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function UnitViewSkeleton() {
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
