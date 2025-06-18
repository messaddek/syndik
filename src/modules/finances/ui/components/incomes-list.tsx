'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
import { Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { useConfirm } from '@/hooks/use-confirm';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export function IncomesList() {
  const trpc = useTRPC();
  const t = useTranslations('finance');
  const queryClient = useQueryClient();

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    t('confirmDialog.deleteIncome.title'),
    t('confirmDialog.deleteIncome.description'),
    true
  );

  const { data: incomes = [] } = useQuery(trpc.incomes.getAll.queryOptions({}));

  const { data: buildingsData = { data: [] } } = useQuery(
    trpc.buildings.getAll.queryOptions({})
  );
  const buildings = buildingsData.data || [];

  const deleteIncome = useMutation(
    trpc.incomes.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.incomes.getAll.queryOptions({}));
      },
    })
  );

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      await deleteIncome.mutateAsync({ id });
    }
  };

  const getBuildingName = (buildingId?: string | null) => {
    if (!buildingId) return t('incomesList.general');
    const building = buildings.find(b => b.id === buildingId);
    return building?.name || t('incomesList.unknownBuilding');
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      monthly_fees: 'bg-blue-100 text-blue-800',
      parking: 'bg-green-100 text-green-800',
      utilities: 'bg-yellow-100 text-yellow-800',
      maintenance: 'bg-purple-100 text-purple-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  if (incomes.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center p-8'>
          <h3 className='mb-2 text-lg font-medium text-gray-900'>
            {t('incomesList.noRecords')}
          </h3>
          <p className='text-sm text-gray-600'>
            {t('incomesList.noRecordsDescription')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-4'>
      {incomes.map(income => (
        <Card key={income.id}>
          <CardHeader>
            <div className='flex items-start justify-between'>
              <div>
                <CardTitle className='text-lg'>{income.description}</CardTitle>
                <CardDescription>
                  {income.buildingId ? (
                    <Link
                      href={`/buildings/${income.buildingId}`}
                      className='text-primary hover:underline'
                    >
                      {getBuildingName(income.buildingId)}
                    </Link>
                  ) : (
                    getBuildingName(income.buildingId)
                  )}
                  • {format(new Date(income.receivedDate), 'MMM dd, yyyy')}
                </CardDescription>
              </div>
              <div className='flex items-center gap-2'>
                <Badge className={getCategoryColor(income.category)}>
                  {income.category.replace('_', ' ')}
                </Badge>
                <div className='text-2xl font-bold text-green-600'>
                  ${Number(income.amount).toFixed(2)}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-muted-foreground text-sm'>
                  {t('incomesList.period')}: {income.month}/{income.year}
                </p>
                {income.notes && (
                  <p className='text-sm text-gray-600'>{income.notes}</p>
                )}
              </div>
              <div className='flex gap-2'>
                <Button variant='outline' size='sm'>
                  <Edit className='h-4 w-4' />
                </Button>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={() => handleDelete(income.id)}
                  disabled={deleteIncome.isPending}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <ConfirmDialog />
    </div>
  );
}
