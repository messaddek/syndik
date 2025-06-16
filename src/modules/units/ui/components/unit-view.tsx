'use client';

import { useSuspenseQuery, useQuery } from '@tanstack/react-query';
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
import { UnitForm } from './unit-form';
import { useConfirm } from '@/hooks/use-confirm';
import type { Resident } from '@/modules/residents/types';

interface UnitViewProps {
  id: string;
  _searchParams?: Record<string, string | string[] | undefined>;
}

export function UnitView({ id, _searchParams }: UnitViewProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete Unit',
    'Are you sure you want to delete this unit? This action cannot be undone and will also remove all associated residents.'
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
        <p className='text-muted-foreground'>Unit not found</p>
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
            <Button variant='ghost' size='sm' asChild>
              <Link href='/units'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Units
              </Link>
            </Button>
            <div>
              <div className='flex items-center space-x-2'>
                <Home className='h-6 w-6 text-green-600' />
                <h1 className='text-3xl font-bold'>Unit {unit.unitNumber}</h1>
                <Badge variant={unit.isOccupied ? 'default' : 'secondary'}>
                  {unit.isOccupied ? 'Occupied' : 'Vacant'}
                </Badge>
              </div>
              {building && (
                <div className='text-muted-foreground mt-1 flex items-center space-x-1'>
                  <MapPin className='h-4 w-4' />
                  <span>
                    {building.name} - Floor {unit.floor}
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
              {unit.isOccupied ? 'Mark Vacant' : 'Mark Occupied'}
            </Button>
            <Button variant='outline' onClick={() => setIsEditDialogOpen(true)}>
              <Edit className='mr-2 h-4 w-4' />
              Edit
            </Button>
            <Button variant='destructive' onClick={handleDeleteUnit}>
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Monthly Fee</CardTitle>
              <DollarSign className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>${unit.monthlyFee}</div>
              <p className='text-muted-foreground text-xs'>
                Collected: ${monthlyIncome}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Bedrooms</CardTitle>
              <Bed className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{unit.bedrooms}</div>
              <p className='text-muted-foreground text-xs'>
                {unit.bathrooms} bathroom{unit.bathrooms !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Current Residents
              </CardTitle>
              <Users className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{activeResidents}</div>
              <p className='text-muted-foreground text-xs'>
                {residents.length} total residents
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Floor</CardTitle>
              <Home className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{unit.floor}</div>
              <p className='text-muted-foreground text-xs'>
                {unit.area ? `${unit.area} m²` : 'Area not specified'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Unit Details */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Unit Information</CardTitle>
              <CardDescription>
                Details about this residential unit
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Unit Number
                  </p>
                  <p className='text-sm'>{unit.unitNumber}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Floor
                  </p>
                  <p className='text-sm'>{unit.floor}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Bedrooms
                  </p>
                  <p className='text-sm'>{unit.bedrooms}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Bathrooms
                  </p>
                  <p className='text-sm'>{unit.bathrooms}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Monthly Fee
                  </p>
                  <p className='text-sm'>${unit.monthlyFee}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Area
                  </p>
                  <p className='text-sm'>
                    {unit.area ? `${unit.area} m²` : 'Not specified'}
                  </p>
                </div>
              </div>

              {unit.description && (
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Description
                  </p>
                  <p className='text-sm'>{unit.description}</p>
                </div>
              )}

              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  Status
                </p>
                <Badge
                  variant={unit.isOccupied ? 'default' : 'secondary'}
                  className='mt-1'
                >
                  {unit.isOccupied ? 'Occupied' : 'Vacant'}
                </Badge>
              </div>

              <div>
                <p className='text-muted-foreground text-sm font-medium'>
                  Created
                </p>
                <p className='text-sm'>
                  {new Date(unit.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Building Information</CardTitle>
              <CardDescription>Details about the building</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              {building ? (
                <>
                  <div>
                    <p className='text-muted-foreground text-sm font-medium'>
                      Building Name
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
                      Address
                    </p>
                    <p className='text-sm'>{building.address}</p>
                  </div>
                  <div>
                    <p className='text-muted-foreground text-sm font-medium'>
                      City
                    </p>
                    <p className='text-sm'>
                      {building.city}, {building.country}
                    </p>
                  </div>
                  <div>
                    <p className='text-muted-foreground text-sm font-medium'>
                      Total Units
                    </p>
                    <p className='text-sm'>{building.totalUnits}</p>
                  </div>
                  <div className='flex space-x-2 pt-4'>
                    <Button variant='outline' size='sm' asChild>
                      <Link href={`/buildings/${building.id}`}>
                        View Building Details
                      </Link>
                    </Button>
                    <Button variant='outline' size='sm' asChild>
                      <Link href={`/units?buildingId=${building.id}`}>
                        View All Units
                      </Link>
                    </Button>
                  </div>
                </>
              ) : (
                <p className='text-muted-foreground text-sm'>
                  Building information not available
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Residents */}
        {residents.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Current Residents</CardTitle>
              <CardDescription>
                People living in this unit ({activeResidents} active)
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
                            <Badge
                              variant={
                                resident.isOwner ? 'default' : 'secondary'
                              }
                            >
                              {resident.isOwner ? 'Owner' : 'Tenant'}
                            </Badge>
                            <Badge
                              variant={
                                resident.isActive ? 'default' : 'destructive'
                              }
                            >
                              {resident.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription>{resident.email}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-2 text-sm'>
                          <div className='flex justify-between'>
                            <span>Move-in Date:</span>
                            <span>
                              {new Date(
                                resident.moveInDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          {resident.phone && (
                            <div className='flex justify-between'>
                              <span>Phone:</span>
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
        )}

        {/* Financial Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>
              Income and financial information for{' '}
              {new Date().toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
              <div className='text-center'>
                <p className='text-2xl font-bold text-green-600'>
                  ${monthlyIncome}
                </p>
                <p className='text-muted-foreground text-sm'>
                  Collected This Month
                </p>
              </div>
              <div className='text-center'>
                <p className='text-2xl font-bold'>${unit.monthlyFee}</p>
                <p className='text-muted-foreground text-sm'>
                  Expected Monthly Fee
                </p>
              </div>
              <div className='text-center'>
                <p
                  className={`text-2xl font-bold ${monthlyIncome >= unit.monthlyFee ? 'text-green-600' : 'text-red-600'}`}
                >
                  ${monthlyIncome - unit.monthlyFee}
                </p>
                <p className='text-muted-foreground text-sm'>
                  {monthlyIncome >= unit.monthlyFee ? 'Surplus' : 'Outstanding'}
                </p>
              </div>
            </div>
            <div className='mt-4 text-center'>
              <Button variant='outline' asChild>
                <Link href={`/finances?unitId=${id}`}>
                  View Full Financial History
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      <ResponsiveDialog
        title='Edit Unit'
        description='Update the unit information'
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
