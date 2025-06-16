'use client';

import { useTranslations } from 'next-intl';
import { Area, AreaChart, XAxis, CartesianGrid } from 'recharts';
import { TrendingUp, TrendingDown, Database, Zap } from 'lucide-react';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';

interface OccupancyData {
  month: string;
  occupancyRate: number;
  totalUnits: number;
  occupiedUnits: number;
}

const chartConfig = {
  occupancyRate: {
    label: 'Occupancy Rate',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function OccupancyTrendChart() {
  const t = useTranslations('dashboard');
  // Mock data for demonstration - replace with actual data when API is ready
  const mockData: OccupancyData[] = [
    {
      month: 'January',
      occupancyRate: 85,
      totalUnits: 100,
      occupiedUnits: 85,
    },
    {
      month: 'February',
      occupancyRate: 88,
      totalUnits: 100,
      occupiedUnits: 88,
    },
    {
      month: 'March',
      occupancyRate: 92,
      totalUnits: 100,
      occupiedUnits: 92,
    },
    {
      month: 'April',
      occupancyRate: 90,
      totalUnits: 100,
      occupiedUnits: 90,
    },
    {
      month: 'May',
      occupancyRate: 87,
      totalUnits: 100,
      occupiedUnits: 87,
    },
    {
      month: 'June',
      occupancyRate: 95,
      totalUnits: 100,
      occupiedUnits: 95,
    },
  ];

  const data: OccupancyData[] = mockData;
  const isUsingMockData = true; // Always mock data for now until API is implemented

  // Calculate trend direction
  const currentMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];
  const rateTrend =
    currentMonth && previousMonth
      ? currentMonth.occupancyRate - previousMonth.occupancyRate
      : 0;

  // Calculate average occupancy rate
  const avgOccupancy =
    data.reduce((sum, item) => sum + item.occupancyRate, 0) / data.length;
  return (
    <div className='w-full space-y-4 overflow-hidden'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center gap-3'>
          <h3 className='text-base font-semibold sm:text-lg'>
            {t('occupancyTrends')}
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
          {rateTrend >= 0 ? (
            <TrendingUp className='h-4 w-4 text-green-600' />
          ) : (
            <TrendingDown className='h-4 w-4 text-red-600' />
          )}
          <span
            className={`text-xs font-medium sm:text-sm ${rateTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            {rateTrend >= 0 ? '+' : ''}
            {rateTrend.toFixed(1)}% {t('thisMonth')}
          </span>
        </div>
      </div>
      <div className='mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='text-center'>
          <div className='text-primary text-xl font-bold sm:text-2xl'>
            {currentMonth?.occupancyRate.toFixed(1)}%
          </div>
          <div className='text-muted-foreground text-xs sm:text-sm'>
            {t('currentRate')}
          </div>
        </div>
        <div className='text-center'>
          <div className='text-xl font-bold text-purple-600 sm:text-2xl'>
            {avgOccupancy.toFixed(1)}%
          </div>
          <div className='text-muted-foreground text-xs sm:text-sm'>
            {t('averageRate')}
          </div>{' '}
        </div>
      </div>
      <ChartContainer
        config={chartConfig}
        className='h-[250px] w-full sm:h-[300px] md:h-[350px]'
      >
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            left: 8,
            right: 8,
            top: 8,
            bottom: 8,
          }}
        >
          <CartesianGrid vertical={false} />{' '}
          <XAxis
            dataKey='month'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={value => value.slice(0, 3)}
            fontSize={12}
            className='text-xs sm:text-sm'
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator='line' />}
          />
          <Area
            dataKey='occupancyRate'
            type='natural'
            fill='var(--color-occupancyRate)'
            fillOpacity={0.4}
            stroke='var(--color-occupancyRate)'
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
