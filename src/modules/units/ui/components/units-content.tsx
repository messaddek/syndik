'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { CreateUnitDialog } from './create-unit-dialog';
import { useTRPC } from '@/trpc/client';
import { useConfirm } from '@/hooks/use-confirm';

export function UnitsContent() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete Unit',
    'Are you sure you want to delete this unit? This action cannot be undone.'
  );

  const { data: units = [] } = useQuery(trpc.units.getAll.queryOptions({}));

  const { data: buildingsData = { data: [] } } = useQuery(
    trpc.buildings.getAll.queryOptions({})
  );
  const buildings = buildingsData.data || [];

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

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      await deleteUnit.mutateAsync({ id });
    }
  };

  const getBuildingName = (buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    return building?.name || 'Unknown Building';
  };

  return (
    <>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>Units Management</h2>
          <p className='text-muted-foreground'>{units.length} total units</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className='mr-2 h-4 w-4' />
          Add Unit
        </Button>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {units.map(unit => (
          <Card key={unit.id}>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg'>
                  Unit {unit.unitNumber}
                </CardTitle>
                <Badge variant={unit.isOccupied ? 'default' : 'secondary'}>
                  {unit.isOccupied ? 'Occupied' : 'Vacant'}
                </Badge>
              </div>
              <CardDescription>
                {getBuildingName(unit.buildingId)} - Floor {unit.floor}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>Bedrooms:</span>
                  <span>{unit.bedrooms}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>Bathrooms:</span>
                  <span>{unit.bathrooms}</span>
                </div>
                {unit.area && (
                  <div className='flex justify-between text-sm'>
                    <span>Area:</span>
                    <span>{unit.area} m²</span>
                  </div>
                )}
                <div className='flex justify-between text-sm font-medium'>
                  <span>Monthly Fee:</span>
                  <span>${unit.monthlyFee}</span>
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
                >
                  {unit.isOccupied ? 'Mark Vacant' : 'Mark Occupied'}
                </Button>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={() => handleDelete(unit.id)}
                  disabled={deleteUnit.isPending}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
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
      <ConfirmDialog />
    </>
  );
}
