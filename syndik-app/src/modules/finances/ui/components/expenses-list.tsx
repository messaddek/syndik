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
import { Trash2, Edit, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export function ExpensesList() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: expenses = [] } = useQuery(
    trpc.expenses.getAll.queryOptions({})
  );

  const { data: buildings = [] } = useQuery(
    trpc.buildings.getAll.queryOptions()
  );

  const deleteExpense = useMutation(
    trpc.expenses.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.expenses.getAll.queryOptions({}));
      },
    })
  );

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this expense record?')) {
      await deleteExpense.mutateAsync({ id });
    }
  };

  const getBuildingName = (buildingId?: string | null) => {
    if (!buildingId) return 'General';
    const building = buildings.find(b => b.id === buildingId);
    return building?.name || 'Unknown Building';
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

  if (expenses.length === 0) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center p-8'>
          <h3 className='mb-2 text-lg font-medium text-gray-900'>
            No expense records found
          </h3>
          <p className='text-sm text-gray-600'>
            Start by adding your first expense record.
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
            <div className='flex items-start justify-between'>
              <div>
                <CardTitle className='text-lg'>{expense.description}</CardTitle>
                <CardDescription>
                  {getBuildingName(expense.buildingId)} •{' '}
                  {format(new Date(expense.paidDate), 'MMM dd, yyyy')}
                  {expense.vendor && ` • ${expense.vendor}`}
                </CardDescription>
              </div>
              <div className='flex items-center gap-2'>
                <Badge className={getCategoryColor(expense.category)}>
                  {expense.category.replace('_', ' ')}
                </Badge>
                <div className='text-2xl font-bold text-red-600'>
                  ${Number(expense.amount).toFixed(2)}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-muted-foreground text-sm'>
                  Period: {expense.month}/{expense.year}
                </p>
                {expense.notes && (
                  <p className='text-sm text-gray-600'>{expense.notes}</p>
                )}
                {expense.receiptUrl && (
                  <div className='flex items-center gap-1'>
                    <ExternalLink className='h-3 w-3' />
                    <a
                      href={expense.receiptUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm text-blue-600 hover:underline'
                    >
                      View Receipt
                    </a>
                  </div>
                )}
              </div>
              <div className='flex gap-2'>
                <Button variant='outline' size='sm'>
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
    </div>
  );
}
