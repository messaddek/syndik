'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { IncomesList } from './incomes-list';
import { ExpensesList } from './expenses-list';
import { CreateIncomeDialog } from './create-income-dialog';
import { CreateExpenseDialog } from './create-expense-dialog';

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

export function FinancesContent() {
  const trpc = useTRPC();
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

  const typedIncomes = incomes as Income[];
  const typedExpenses = expenses as Expense[];

  const totalIncome = typedIncomes.reduce(
    (sum: number, income: Income) => sum + Number(income.amount),
    0
  );
  const totalExpenses = typedExpenses.reduce(
    (sum: number, expense: Expense) => sum + Number(expense.amount),
    0
  );
  const netIncome = totalIncome - totalExpenses;

  return (
    <div className='space-y-6'>
      {/* Financial Overview */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Income</CardTitle>
            <TrendingUp className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-green-600'>
              ${totalIncome.toFixed(2)}
            </div>
            <p className='text-muted-foreground text-xs'>This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Expenses
            </CardTitle>
            <TrendingDown className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>
              ${totalExpenses.toFixed(2)}
            </div>
            <p className='text-muted-foreground text-xs'>This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Net Income</CardTitle>
            <DollarSign className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              ${netIncome.toFixed(2)}
            </div>
            <p className='text-muted-foreground text-xs'>This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Transactions</CardTitle>
            <Badge variant='outline'>
              {typedIncomes.length + typedExpenses.length}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {typedIncomes.length + typedExpenses.length}
            </div>
            <p className='text-muted-foreground text-xs'>This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Income and Expenses Tabs */}
      <Tabs defaultValue='incomes' className='w-full'>
        <div className='flex items-center justify-between'>
          <TabsList>
            <TabsTrigger value='incomes'>Incomes</TabsTrigger>
            <TabsTrigger value='expenses'>Expenses</TabsTrigger>
          </TabsList>

          <div className='flex gap-2'>
            <Button
              onClick={() => setShowIncomeDialog(true)}
              className='flex items-center gap-2'
            >
              <Plus className='h-4 w-4' />
              Add Income
            </Button>
            <Button
              variant='outline'
              onClick={() => setShowExpenseDialog(true)}
              className='flex items-center gap-2'
            >
              <Plus className='h-4 w-4' />
              Add Expense
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
}
