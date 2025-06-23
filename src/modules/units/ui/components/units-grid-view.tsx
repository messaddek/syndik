'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from 'next-intl';
import type { UnitWithBuilding } from '../../types';
import type { Resident } from '@/modules/residents/types';
import type { Income } from '@/modules/incomes/types';
import { Link } from '@/i18n/routing';

interface UnitsGridViewProps {
  units: UnitWithBuilding[];
  allResidents: Resident[];
  allIncomes: Income[];
  onEdit: (unit: UnitWithBuilding) => void;
  onDelete: (id: string) => void;
  onToggleOccupancy: (id: string, isOccupied: boolean) => void;
  onCreateNew: () => void;
  isToggling?: boolean;
}

export const UnitsGridView = ({
  units,
  allResidents,
  allIncomes,
  onEdit,
  onDelete,
  onToggleOccupancy,
  onCreateNew,
  isToggling = false,
}: UnitsGridViewProps) => {
  const t = useTranslations('units');
  const tCommon = useTranslations('common');

  // Extract current locale from pathname - pathname from usePathname() doesn't include locale
  // We need to get it from window.location or use a different approach
  const getCurrentLocale = () => {
    if (typeof window !== 'undefined') {
      const fullPath = window.location.pathname;
      const segments = fullPath.split('/').filter(Boolean);
      // Check if first segment is a locale
      if (segments.length > 0 && ['en', 'fr', 'ar'].includes(segments[0])) {
        return segments[0];
      }
    }
    return 'en'; // fallback
  };

  const currentLocale = getCurrentLocale();

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

  if (units.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center p-8'>
          <h3 className='mb-2 text-lg font-medium text-gray-900'>
            {t('noUnitsFound')}
          </h3>
          <p className='mb-4 text-sm text-gray-600'>
            {t('noUnitsDescription')}
          </p>
          <Button onClick={onCreateNew} className='flex items-center space-x-2'>
            <Plus className='h-4 w-4' />
            {t('addFirstUnit')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {units.map(unit => (
        <Link key={unit.id} href={`/units/${unit.id}`}>
          <Card className='cursor-pointer transition-shadow hover:shadow-lg'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-lg'>{unit.unitNumber}</CardTitle>
                <div className='flex items-center gap-2'>
                  <Badge variant={unit.isOccupied ? 'default' : 'secondary'}>
                    {unit.isOccupied ? t('occupied') : t('vacant')}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='ghost'
                        className='h-8 w-8 p-0'
                        onClick={e => e.preventDefault()}
                      >
                        <span className='sr-only'>{t('openMenu')}</span>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>
                        {tCommon('actions')}
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          onEdit(unit);
                        }}
                      >
                        {t('editUnit')}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Use current locale to construct localized URL

                          const url = `/${currentLocale}/residents?unitId=${unit.id}`;
                          window.open(url, '_blank');
                        }}
                      >
                        {t('viewResidents')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Use current locale to construct localized URL
                          const url = `/${currentLocale}/finances?unitId=${unit.id}`;
                          window.open(url, '_blank');
                        }}
                      >
                        {t('viewIncome')}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(unit.id)}
                        className='text-red-600'
                      >
                        {t('deleteUnit')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <CardDescription>
                {unit.building?.name ?? t('unknownBuilding')} - {t('floor')}
                {unit.floor}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <div className='flex justify-between text-sm'>
                  <span>{t('bedrooms')}:</span>
                  <span>{unit.bedrooms}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span>{t('bathrooms')}:</span>
                  <span>{unit.bathrooms}</span>
                </div>
                {unit.area && (
                  <div className='flex justify-between text-sm'>
                    <span>{t('area')}:</span>
                    <span>{unit.area} m²</span>
                  </div>
                )}
                <div className='flex justify-between text-sm font-medium'>
                  <span>{t('monthlyFee')}:</span>
                  <span>${unit.monthlyFee}</span>
                </div>

                {/* Relationship Information */}
                <div className='mt-2 border-t pt-2'>
                  <div className='flex justify-between text-sm'>
                    <span>{t('activeResidents')}:</span>
                    <span className='font-medium'>
                      {getUnitResidentCount(unit.id)}
                    </span>
                  </div>
                  <div className='flex justify-between text-sm'>
                    <span>{t('thisMonthIncome')}:</span>
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
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleOccupancy(unit.id, unit.isOccupied);
                  }}
                  disabled={isToggling}
                  className='flex-1'
                >
                  {unit.isOccupied ? t('markVacant') : t('markOccupied')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
