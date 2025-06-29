'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
} from 'lucide-react';
import { IncomesList } from './incomes-list';
import { ExpensesList } from './expenses-list';
import { CreateIncomeDialog } from './create-income-dialog';
import { CreateExpenseDialog } from './create-expense-dialog';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

interface Income {
  id: string;
  amount: number;
  description: string;
  month: number;
  year: number;
}

interface Expense {
  id: string;
  amount: number;
  description: string;
  month: number;
  year: number;
}

interface MissingPaymentsData {
  missingPayments: Array<{
    unitId: string;
    unitNumber: string;
    buildingName: string;
    monthlyFee: string;
    residentName: string;
  }>;
  totalMissing: number;
  totalExpectedAmount: number;
}

export const FinancesView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const t = useTranslations('finance');
  const [showIncomeDialog, setShowIncomeDialog] = useState(false);
  const [showExpenseDialog, setShowExpenseDialog] = useState(false);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const { data: incomes = [] } = useQuery(
    trpc.incomes.getAll.queryOptions({
      year: currentYear,
      month: currentMonth,
    })
  );
  const { data: expenses = [] } = useQuery(
    trpc.expenses.getAll.queryOptions({
      year: currentYear,
      month: currentMonth,
    })
  );

  const { data: missingPaymentsData } = useQuery(
    trpc.dashboard.getMissingPayments.queryOptions({
      month: currentMonth,
      year: currentYear,
    })
  );
  const typedIncomes = incomes as Income[];
  const typedExpenses = expenses as Expense[];
  const typedMissingPayments = missingPaymentsData as
    | MissingPaymentsData
    | undefined;

  const totalIncome = typedIncomes.reduce(
    (sum: number, income: Income) => sum + Number(income.amount),
    0
  );
  const totalExpenses = typedExpenses.reduce(
    (sum: number, expense: Expense) => sum + Number(expense.amount),
    0
  );
  const netIncome = totalIncome - totalExpenses;
  const totalMissing = typedMissingPayments?.totalMissing || 0;

  return (
    <div className='space-y-6'>
      {/* Financial Overview */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-5'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('overview.totalIncome')}
            </CardTitle>
            <TrendingUp className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>
              ${totalIncome.toFixed(2)}
            </div>
            <p className='text-muted-foreground text-xs'>
              {t('overview.thisMonth')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('overview.totalExpenses')}
            </CardTitle>
            <TrendingDown className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>
              ${totalExpenses.toFixed(2)}
            </div>
            <p className='text-muted-foreground text-xs'>
              {t('overview.thisMonth')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('overview.netIncome')}
            </CardTitle>
            <DollarSign className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              ${netIncome.toFixed(2)}
            </div>
            <p className='text-muted-foreground text-xs'>
              {t('overview.thisMonth')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('overview.transactions')}
            </CardTitle>
            <Badge variant='outline'>
              {typedIncomes.length + typedExpenses.length}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {typedIncomes.length + typedExpenses.length}
            </div>
            <p className='text-muted-foreground text-xs'>
              {t('overview.thisMonth')}
            </p>
          </CardContent>
        </Card>
        <Card
          className='cursor-pointer transition-colors hover:bg-gray-50'
          onClick={() => router.push('/finances/missing-payments')}
        >
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('overview.missingPayments')}
            </CardTitle>
            <AlertTriangle
              className={`h-4 w-4 ${totalMissing > 0 ? 'text-red-500' : 'text-green-500'}`}
            />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${totalMissing > 0 ? 'text-red-600' : 'text-green-600'}`}
            >
              {totalMissing}
            </div>
            <p className='text-muted-foreground text-xs'>
              {totalMissing > 0
                ? t('overview.unitsOverdue')
                : t('overview.allPaid')}
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Income and Expenses Tabs */}
      <Tabs defaultValue='incomes' className='w-full'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <TabsList className='w-full sm:w-auto'>
            <TabsTrigger value='incomes' className='flex-1 sm:flex-none'>
              {t('tabs.incomes')}
            </TabsTrigger>
            <TabsTrigger value='expenses' className='flex-1 sm:flex-none'>
              {t('tabs.expenses')}
            </TabsTrigger>
          </TabsList>

          <div className='flex flex-col gap-2 sm:flex-row'>
            <Button
              onClick={() => setShowIncomeDialog(true)}
              className='flex w-full items-center justify-center gap-2 sm:w-auto'
            >
              <Plus className='h-4 w-4' />
              <span className='sm:inline'>{t('buttons.addIncome')}</span>
            </Button>
            <Button
              variant='outline'
              onClick={() => setShowExpenseDialog(true)}
              className='flex w-full items-center justify-center gap-2 sm:w-auto'
            >
              <Plus className='h-4 w-4' />
              <span className='sm:inline'>{t('buttons.addExpense')}</span>
            </Button>
          </div>
        </div>

        <TabsContent value='incomes' className='space-y-4'>
          <IncomesList />
        </TabsContent>

        <TabsContent value='expenses' className='space-y-4'>
          <ExpensesList />
        </TabsContent>
      </Tabs>
      {/* Dialogs */}
      <CreateIncomeDialog
        open={showIncomeDialog}
        onOpenChange={setShowIncomeDialog}
      />
      <CreateExpenseDialog
        open={showExpenseDialog}
        onOpenChange={setShowExpenseDialog}
      />
    </div>
  );
};
