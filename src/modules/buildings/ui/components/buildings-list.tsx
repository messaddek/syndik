'use client';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Button } from '../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Building } from '../../types';
import { Plus, Building2, MapPin, Users, Edit } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { Link } from '@/i18n/routing';
import { CreateBuildingDialog } from './create-building-dialog';
import { EditBuildingDialog } from './edit-building-dialog';
import { useTranslations } from 'next-intl';

export function BuildingsList() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<Building | null>(null);
  const t = useTranslations('buildings');
  const trpc = useTRPC();

  const { data: buildings } = useSuspenseQuery(
    trpc.buildings.getAll.queryOptions({})
  );

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>{t('title')}</h2>
          <p className='text-gray-600'>{t('manageBuildingProperties')}</p>
        </div>
        <Button
          onClick={() => setIsCreateOpen(true)}
          className='flex items-center space-x-2'
        >
          <Plus className='h-4 w-4' />
          {t('addBuilding')}
        </Button>
      </div>

      <CreateBuildingDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />

      {editingBuilding && (
        <EditBuildingDialog
          building={editingBuilding}
          open={!!editingBuilding}
          onOpenChange={open => !open && setEditingBuilding(null)}
        />
      )}

      {buildings && buildings.data.length === 0 ? (
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-12'>
            <Building2 className='mb-4 h-12 w-12 text-gray-400' />
            <h3 className='mb-2 text-lg font-semibold'>{t('noBuildings')}</h3>
            <p className='mb-4 text-center text-gray-600'>
              {t('noBuildingsDescription')}
            </p>
            <Button
              onClick={() => setIsCreateOpen(true)}
              className='flex items-center space-x-2'
            >
              <Plus className='h-4 w-4' />
              {t('addFirstBuilding')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {buildings?.data?.map((building: Building) => (
            <Link key={building.id} href={`/buildings/${building.id}`}>
              <Card className='cursor-pointer transition-shadow hover:shadow-lg'>
                <CardHeader>
                  <CardTitle className='flex items-center'>
                    <Building2 className='mr-2 h-5 w-5' />
                    {building.name}
                  </CardTitle>
                  <CardDescription className='flex items-center'>
                    <MapPin className='mr-1 h-4 w-4' />
                    {building.city}, {building.country}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-gray-600'>
                        {t('totalUnits')}
                      </span>
                      <Badge variant='secondary'>
                        <Users className='mr-1 h-3 w-3' />
                        {building.totalUnits}
                      </Badge>
                    </div>
                    <p className='line-clamp-2 text-sm text-gray-600'>
                      {building.description || t('noDescription')}
                    </p>
                    <div className='flex space-x-2 pt-2'>
                      <Button variant='outline' size='sm' className='flex-1'>
                        {t('viewDetails')}
                      </Button>
                      <Button variant='outline' size='sm' className='flex-1'>
                        {t('manageUnits')}
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          setEditingBuilding(building);
                        }}
                      >
                        <Edit className='h-3 w-3' />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
