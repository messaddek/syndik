'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Ticket, Clock, CheckCircle, Timer, Star } from 'lucide-react';
import type { TicketStats } from '../../types';

interface HelpdeskStatsProps {
  stats?: TicketStats;
  isLoading: boolean;
}

export const HelpdeskStats = ({ stats, isLoading }: HelpdeskStatsProps) => {
  const t = useTranslations('helpDesk');

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6'>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-20' />
              <Skeleton className='h-4 w-4' />
            </CardHeader>
            <CardContent>
              <Skeleton className='mb-1 h-7 w-16' />
              <Skeleton className='h-3 w-24' />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${Math.round(minutes)}m`;
    } else if (minutes < 1440) {
      return `${Math.round(minutes / 60)}h`;
    } else {
      return `${Math.round(minutes / 1440)}d`;
    }
  };

  const statCards = [
    {
      title: t('total_tickets', { default: 'Total Tickets' }),
      value: stats.total,
      icon: Ticket,
      color: 'text-blue-600',
    },
    {
      title: t('open_tickets', { default: 'Open' }),
      value: stats.open,
      icon: Ticket,
      color: 'text-blue-600',
    },
    {
      title: t('in_progress_tickets', { default: 'In Progress' }),
      value: stats.inProgress,
      icon: Clock,
      color: 'text-orange-600',
    },
    {
      title: t('resolved_tickets', { default: 'Resolved' }),
      value: stats.resolved,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      title: t('avg_response_time', { default: 'Avg Response' }),
      value:
        stats.avgResponseTime > 0 ? formatTime(stats.avgResponseTime) : '-',
      icon: Timer,
      color: 'text-purple-600',
    },
    {
      title: t('satisfaction_score', { default: 'Satisfaction' }),
      value:
        stats.satisfactionScore > 0
          ? `${stats.satisfactionScore.toFixed(1)}/5`
          : '-',
      icon: Star,
      color: 'text-yellow-600',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6'>
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-muted-foreground text-sm font-medium'>
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
