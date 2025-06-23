'use client';

import { useState } from 'react';
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
import { Trash2, Edit, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { useConfirm } from '@/hooks/use-confirm';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { EditExpenseDialog } from './edit-expense-dialog';
import type { Expense } from '@/modules/expenses/types';

export const ExpensesList = () => {
  const trpc = useTRPC();
  const t = useTranslations('finance');
  const queryClient = useQueryClient();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Confirmation dialog
  const [ConfirmDialog, confirm] = useConfirm(
    t('confirmDialog.deleteExpense.title'),
    t('confirmDialog.deleteExpense.description'),
    true
  );

  const { data: expenses = [] } = useQuery(
    trpc.expenses.getAll.queryOptions({})
  );

  const { data: buildingsData = { data: [] } } = useQuery(
    trpc.buildings.getAll.queryOptions({})
  );
  const buildings = buildingsData.data || [];

  const deleteExpense = useMutation(
    trpc.expenses.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.expenses.getAll.queryOptions({}));
      },
    })
  );

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      await deleteExpense.mutateAsync({ id });
    }
  };

  const getBuildingName = (buildingId?: string | null) => {
    if (!buildingId) return t('expensesList.general');
    const building = buildings.find(b => b.id === buildingId);
    return building?.name || t('expensesList.unknownBuilding');
  };
  const getCategoryColor = (category: string) => {
    const colors = {
      maintenance: 'bg-orange-100 text-orange-800',
      utilities: 'bg-blue-100 text-blue-800',
      cleaning: 'bg-green-100 text-green-800',
      security: 'bg-red-100 text-red-800',
      supplies: 'bg-purple-100 text-purple-800',
      professional_services: 'bg-indigo-100 text-indigo-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  const getCategoryLabel = (category: string) => {
    // Map database category keys to translation keys
    const categoryMap = {
      maintenance: 'maintenance',
      utilities: 'utilities',
      cleaning: 'cleaning',
      security: 'security',
      supplies: 'supplies',
      professional_services: 'professionalServices',
      other: 'other',
    };

    const translationKey =
      categoryMap[category as keyof typeof categoryMap] || 'other';
    return t(`createExpenseDialog.categories.${translationKey}`);
  };

  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center p-8'>
          <h3 className='mb-2 text-lg font-medium text-gray-900'>
            {t('expensesList.noRecords')}
          </h3>
          <p className='text-sm text-gray-600'>
            {t('expensesList.noRecordsDescription')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-4'>
      {expenses.map(expense => (
        <Card key={expense.id}>
          <CardHeader>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
              <div className='min-w-0 flex-1'>
                <CardTitle className='truncate text-lg'>
                  {expense.description}
                </CardTitle>
                <CardDescription className='break-words'>
                  {expense.buildingId ? (
                    <Link
                      href={`/buildings/${expense.buildingId}`}
                      className='text-primary hover:underline'
                    >
                      {getBuildingName(expense.buildingId)}
                    </Link>
                  ) : (
                    getBuildingName(expense.buildingId)
                  )}
                  • {format(new Date(expense.paidDate), 'MMM dd, yyyy')}
                  {expense.vendor && ` • ${expense.vendor}`}
                </CardDescription>
              </div>
              <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2'>
                <Badge
                  className={`${getCategoryColor(expense.category)} whitespace-nowrap`}
                >
                  {getCategoryLabel(expense.category)}
                </Badge>
                <div className='text-xl font-bold text-red-600 sm:text-2xl'>
                  ${Number(expense.amount).toFixed(2)}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <div className='min-w-0 flex-1 space-y-1'>
                <p className='text-muted-foreground text-sm'>
                  {t('expensesList.period')}: {expense.month}/{expense.year}
                </p>
                {expense.notes && (
                  <p className='text-sm break-words text-gray-600'>
                    {expense.notes}
                  </p>
                )}
                {expense.receiptUrl && (
                  <div className='flex items-center gap-1'>
                    <ExternalLink className='h-3 w-3' />
                    <a
                      href={expense.receiptUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-primary truncate text-sm hover:underline'
                    >
                      {t('buttons.viewReceipt')}
                    </a>
                  </div>
                )}
              </div>
              <div className='flex shrink-0 gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => setEditingExpense(expense)}
                >
                  <Edit className='h-4 w-4' />
                </Button>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={() => handleDelete(expense.id)}
                  disabled={deleteExpense.isPending}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <ConfirmDialog />
      {editingExpense && (
        <EditExpenseDialog
          expense={editingExpense}
          open={!!editingExpense}
          onOpenChange={open => {
            if (!open) setEditingExpense(null);
          }}
          onSuccess={() => {
            queryClient.invalidateQueries(
              trpc.expenses.getAll.queryOptions({})
            );
          }}
        />
      )}
    </div>
  );
}

