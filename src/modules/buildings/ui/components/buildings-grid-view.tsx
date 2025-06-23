'use client';

import { Building } from '../../types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, MapPin, Users, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@/i18n/routing';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface BuildingsGridViewProps {
  buildings: Building[];
  onEdit: (building: Building) => void;
  onDelete: (building: Building) => void;
}

export const BuildingsGridView = ({
  buildings,
  onEdit,
  onDelete,
}: BuildingsGridViewProps) => {
  const t = useTranslations('buildings');
  const tCommon = useTranslations('common');
  const router = useRouter();

  if (buildings.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center py-12'>
          <Building2 className='mb-4 h-12 w-12 text-gray-400' />
          <h3 className='mb-2 text-lg font-semibold'>{t('noBuildings')}</h3>
          <p className='text-center text-gray-600'>{t('noResults')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {buildings.map((building: Building) => (
          <Link key={building.id} href={`/buildings/${building.id}`}>
            <Card className='cursor-pointer transition-shadow hover:shadow-lg'>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='flex items-center gap-x-2'>
                    <Building2 className='h-5 w-5' />
                    {building.name}
                  </CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='ghost'
                        className='h-8 w-8 p-0'
                        onClick={e => e.preventDefault()}
                      >
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>
                        {tCommon('actions')}
                      </DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEdit(building)}>
                        {t('editBuilding')}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(building)}
                        className='text-red-600'
                      >
                        {t('deleteBuilding')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className='flex items-center gap-x-1'>
                  <MapPin className='h-4 w-4' />
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
                    {building.description || t('description')}
                  </p>
                  <div className='flex space-x-2 pt-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex-1'
                      onClick={e => {
                        e.preventDefault();
                        router.push(`/buildings/${building.id}`);
                      }}
                    >
                      {t('buildingDetails')}
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      className='flex-1'
                      onClick={e => {
                        e.preventDefault();
                        router.push(`/units?buildingId=${building.id}`);
                      }}
                    >
                      {t('units')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

