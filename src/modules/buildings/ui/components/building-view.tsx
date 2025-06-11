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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { BuildingForm } from './building-form';
import { createBuildingSchema } from '../../schema';
import { z } from 'zod';
import { useConfirm } from '@/hooks/use-confirm';

type BuildingFormData = z.infer<typeof createBuildingSchema>;

interface BuildingViewProps {
  id: string;
  _searchParams?: Record<string, string | string[] | undefined>;
}

export function BuildingView({ id, _searchParams }: BuildingViewProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete Building',
    'Are you sure you want to delete this building? This action cannot be undone and will also delete all associated units and residents.'
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

  // Update mutation
  const updateMutation = useMutation(
    trpc.buildings.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(
          trpc.buildings.getById.queryOptions({ id })
        );
        queryClient.invalidateQueries(trpc.buildings.getAll.queryOptions({}));
        queryClient.invalidateQueries({ queryKey: [['search', 'global']] });
        setIsEditDialogOpen(false);
      },
    })
  );

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

  const handleUpdateBuilding = (data: BuildingFormData) => {
    updateMutation.mutate({
      id,
      data,
    });
  };

  const handleDeleteBuilding = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      deleteMutation.mutate({ id });
    }
  };

  if (!building) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <p className='text-muted-foreground'>Building not found</p>
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
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/buildings'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to Buildings
              </Link>
            </Button>
            <div>
              <div className='flex items-center space-x-2'>
                <Building2 className='h-6 w-6 text-blue-600' />
                <h1 className='text-3xl font-bold'>{building.name}</h1>
              </div>
              <div className='text-muted-foreground mt-1 flex items-center space-x-1'>
                <MapPin className='h-4 w-4' />
                <span>
                  {building.address}, {building.city}, {building.country}
                </span>
              </div>
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Button variant='outline' onClick={() => setIsEditDialogOpen(true)}>
              <Edit className='mr-2 h-4 w-4' />
              Edit
            </Button>
            <Button variant='destructive' onClick={handleDeleteBuilding}>
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Total Units</CardTitle>
              <Home className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{building.totalUnits}</div>
              <p className='text-muted-foreground text-xs'>
                {units.length} units configured
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Occupied Units
              </CardTitle>
              <Users className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{occupiedUnits}</div>
              <p className='text-muted-foreground text-xs'>
                {occupancyRate.toFixed(1)}% occupancy rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Total Residents
              </CardTitle>
              <Users className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {buildingResidents.length}
              </div>
              <p className='text-muted-foreground text-xs'>Active residents</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Postal Code</CardTitle>
              <MapPin className='text-muted-foreground h-4 w-4' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{building.postalCode}</div>
              <p className='text-muted-foreground text-xs'>Location code</p>
            </CardContent>
          </Card>
        </div>

        {/* Building Details */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Building Information</CardTitle>
              <CardDescription>
                Detailed information about this building
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
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
                  <p className='text-sm'>{building.city}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Country
                  </p>
                  <p className='text-sm'>{building.country}</p>
                </div>
                <div>
                  <p className='text-muted-foreground text-sm font-medium'>
                    Postal Code
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
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage this building and its units
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-3'>
              <Button className='w-full justify-start' asChild>
                <Link href={`/units?buildingId=${id}`}>
                  <Home className='mr-2 h-4 w-4' />
                  View All Units
                </Link>
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start'
                asChild
              >
                <Link href={`/residents?buildingId=${id}`}>
                  <Users className='mr-2 h-4 w-4' />
                  View Residents
                </Link>
              </Button>
              <Button
                variant='outline'
                className='w-full justify-start'
                asChild
              >
                <Link href={`/finances?buildingId=${id}`}>
                  <Building2 className='mr-2 h-4 w-4' />
                  View Finances
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Units Overview */}
        {units.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Units Overview</CardTitle>
              <CardDescription>
                Recent units in this building ({units.length} total)
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
                            Unit {unit.unitNumber}
                          </CardTitle>
                          <Badge
                            variant={unit.isOccupied ? 'default' : 'secondary'}
                          >
                            {unit.isOccupied ? 'Occupied' : 'Vacant'}
                          </Badge>
                        </div>
                        <CardDescription>Floor {unit.floor}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='space-y-2 text-sm'>
                          <div className='flex justify-between'>
                            <span>Bedrooms:</span>
                            <span>{unit.bedrooms}</span>
                          </div>
                          <div className='flex justify-between'>
                            <span>Monthly Fee:</span>
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
                      View All {units.length} Units
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
        title='Edit Building'
        description='Update the building information'
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      >
        <BuildingForm
          building={building}
          onSubmit={handleUpdateBuilding}
          isLoading={updateMutation.isPending}
          onCancel={() => setIsEditDialogOpen(false)}
        />
      </ResponsiveDialog>

      <ConfirmDialog />
    </>
  );
}
