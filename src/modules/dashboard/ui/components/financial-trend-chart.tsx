'use client';

import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useTranslations } from 'next-intl';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { TrendingUp, TrendingDown, Database, Zap } from 'lucide-react';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';

interface FinancialData {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

const chartConfig = {
  income: {
    label: 'Income',
    color: 'var(--chart-1)',
  },
  expenses: {
    label: 'Expenses',
    color: 'var(--chart-2)',
  },
  net: {
    label: 'Net Income',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig;

export const FinancialTrendChart = () => {
  const trpc = useTRPC();
  const t = useTranslations('dashboard');

  const { data: financialTrends } = useQuery(
    trpc.dashboard.getFinancialTrends.queryOptions({ months: 6 })
  ); // Mock data for demonstration - replace with actual data
  const mockData: FinancialData[] = [
    { month: 'January', income: 12000, expenses: 8000, net: 4000 },
    { month: 'February', income: 11500, expenses: 8200, net: 3300 },
    { month: 'March', income: 13000, expenses: 7800, net: 5200 },
    { month: 'April', income: 12800, expenses: 8500, net: 4300 },
    { month: 'May', income: 14200, expenses: 9100, net: 5100 },
    { month: 'June', income: 13800, expenses: 8800, net: 5000 },
  ];
  // Check if we have meaningful data (not all zeros)
  const hasValidData =
    financialTrends &&
    financialTrends.length > 0 &&
    financialTrends.some(
      item => item.income > 0 || item.expenses > 0 || item.net !== 0
    );

  const data = hasValidData ? financialTrends : mockData;
  const isUsingMockData = !hasValidData;

  // Calculate trend direction
  const currentMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];
  const netTrend =
    currentMonth && previousMonth ? currentMonth.net - previousMonth.net : 0;

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  return (
    <div className='w-full space-y-4 overflow-hidden'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <h3 className='text-base font-semibold sm:text-lg'>
            {t('financialTrends')}
          </h3>
          <Badge
            variant={isUsingMockData ? 'secondary' : 'default'}
            className='text-xs'
          >
            {isUsingMockData ? (
              <>
                <Zap className='mr-1 h-3 w-3' />
                Mock Data
              </>
            ) : (
              <>
                <Database className='mr-1 h-3 w-3' />
                Live Data
              </>
            )}
          </Badge>
        </div>
        <div className='flex items-center space-x-2'>
          {netTrend >= 0 ? (
            <TrendingUp className='h-4 w-4 text-green-600' />
          ) : (
            <TrendingDown className='h-4 w-4 text-red-600' />
          )}
          <span
            className={`text-xs font-medium sm:text-sm ${netTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            {netTrend >= 0 ? '+' : ''}
            {formatCurrency(netTrend)} {t('thisMonth')}
          </span>
        </div>
      </div>
      <ChartContainer
        config={chartConfig}
        className='h-[250px] w-full sm:h-[300px] md:h-[350px]'
      >
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 8,
            right: 8,
            top: 8,
            bottom: 8,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={value => value.slice(0, 3)}
            fontSize={12}
            className='text-xs sm:text-sm'
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey='income'
            type='monotone'
            stroke='var(--color-income)'
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey='expenses'
            type='monotone'
            stroke='var(--color-expenses)'
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey='net'
            type='monotone'
            stroke='var(--color-net)'
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

