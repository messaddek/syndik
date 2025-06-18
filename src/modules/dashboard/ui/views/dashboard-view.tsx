'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Building2,
  Users,
  Home,
  TrendingUp,
  TrendingDown,
  Calendar,
  Mail,
} from 'lucide-react';
import { BulkInviteDialog } from '@/modules/residents';
import { CreateBuildingDialog } from '@/modules/buildings';
import { CreateResidentDialog } from '@/modules/residents/ui/components/create-resident-dialog';
import { CreateMeetingDialog } from '@/modules/meetings/ui/components/create-meeting-dialog';
import {
  FinancialTrendChart,
  OccupancyTrendChart,
  MissingPaymentsCard,
} from '../components';
import { DashboardSkeleton } from '../components/dashboard-skeleton';
import { PageHeader } from '@/components/page-header';

interface Activity {
  id: string;
  name: string;
  type: string;
  date: string;
}

interface DashboardOverview {
  buildings: number;
  units: number;
  occupiedUnits: number;
  activeResidents: number;
  occupancyRate: string;
  monthlyIncome: number;
  monthlyExpenses: number;
  netIncome: number;
}

const DashboardView = () => {
  const trpc = useTRPC();
  const t = useTranslations('dashboard');

  // Dialog states
  const [createBuildingOpen, setCreateBuildingOpen] = useState(false);
  const [createResidentOpen, setCreateResidentOpen] = useState(false);
  const [createMeetingOpen, setCreateMeetingOpen] = useState(false);

  const { data: overview, isLoading: overviewLoading } = useQuery(
    trpc.dashboard.getOverview.queryOptions()
  );
  const { data: recentActivity, isLoading: activityLoading } = useQuery(
    trpc.dashboard.getRecentActivity.queryOptions({ limit: 5 })
  );
  const { data: portalStats, isLoading: statsLoading } = useQuery(
    trpc.dashboard.getPortalStats.queryOptions()
  );

  const typedOverview = overview as DashboardOverview | undefined;
  const typedActivity = recentActivity as Activity[] | undefined;

  // Show skeleton while any data is loading
  const isLoading = overviewLoading || activityLoading || statsLoading;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className='space-y-6'>
      <PageHeader title={t('title')} description={t('description')} />

      {/* Overview Cards */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('buildings')}
            </CardTitle>
            <Building2 className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {typedOverview?.buildings || 0}
            </div>
            <p className='text-muted-foreground text-xs'>
              {t('totalManagedProperties')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{t('units')}</CardTitle>
            <Home className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {typedOverview?.units || 0}
            </div>
            <p className='text-muted-foreground text-xs'>
              {typedOverview?.occupancyRate}% {t('occupancyRateText')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('residents')}
            </CardTitle>
            <Users className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {typedOverview?.activeResidents || 0}
            </div>
            <p className='text-muted-foreground text-xs'>
              {t('activeResidents')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('netIncome')}
            </CardTitle>
            {(typedOverview?.netIncome || 0) >= 0 ? (
              <TrendingUp className='h-4 w-4 text-green-600' />
            ) : (
              <TrendingDown className='h-4 w-4 text-red-600' />
            )}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${(typedOverview?.netIncome || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {typedOverview?.netIncome
                ? `$${typedOverview.netIncome.toFixed(2)}`
                : '$0.00'}
            </div>
            <p className='text-muted-foreground text-xs'>{t('thisMonth')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>{t('monthlyFinancialSummary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>{t('income')}</span>
                <span className='text-sm font-bold text-green-600'>
                  ${typedOverview?.monthlyIncome?.toFixed(2) || '0.00'}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>{t('expenses')}</span>
                <span className='text-sm font-bold text-red-600'>
                  ${typedOverview?.monthlyExpenses?.toFixed(2) || '0.00'}
                </span>
              </div>
              <hr />
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>{t('netIncome')}</span>
                <span
                  className={`text-sm font-bold ${(typedOverview?.netIncome || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  ${typedOverview?.netIncome?.toFixed(2) || '0.00'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Missing Payments Card */}
        <MissingPaymentsCard />

        <Card>
          <CardHeader>
            <CardTitle>{t('portalStatistics')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>
                  {t('totalResidents')}
                </span>
                <span className='text-sm font-bold'>
                  {portalStats?.totalResidents || 0}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>{t('portalAccess')}</span>
                <span className='text-primary text-sm font-bold'>
                  {portalStats?.invitedCount || 0}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>{t('notInvited')}</span>
                <span className='text-sm font-bold text-amber-600'>
                  {portalStats?.uninvitedCount || 0}
                </span>
              </div>
              <hr />
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium'>
                  {t('invitationRate')}
                </span>
                <span className='text-sm font-bold text-purple-600'>
                  {portalStats?.invitationRate || 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('recentActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            {typedActivity && typedActivity.length > 0 ? (
              <div className='space-y-3'>
                {typedActivity.map((activity: Activity) => (
                  <div
                    key={activity.id}
                    className='flex items-center space-x-3'
                  >
                    <div className='flex-shrink-0'>
                      {activity.type === 'resident' ? (
                        <Users className='text-primary h-4 w-4' />
                      ) : (
                        <Calendar className='h-4 w-4 text-purple-600' />
                      )}
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-sm font-medium text-gray-900'>
                        {activity.name}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {activity.type === 'resident'
                          ? t('newResident')
                          : t('meetingScheduled')}
                      </p>
                    </div>
                    <div className='text-xs text-gray-400'>
                      {new Date(activity.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-sm text-gray-500'>{t('noRecentActivity')}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>{t('trends')}</CardTitle>
            <CardDescription>{t('trendsDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <FinancialTrendChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('occupancy')}</CardTitle>
            <CardDescription>{t('occupancyDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <OccupancyTrendChart />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('quickActions')}</CardTitle>
          <CardDescription>{t('quickActionsDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            <Button
              variant='outline'
              className='flex h-20 w-full flex-col'
              onClick={() => setCreateBuildingOpen(true)}
            >
              <Building2 className='mb-2 h-6 w-6' />
              <span className='text-sm'>{t('addBuilding')}</span>
            </Button>
            <Button
              variant='outline'
              className='flex h-20 w-full flex-col'
              onClick={() => setCreateResidentOpen(true)}
            >
              <Users className='mb-2 h-6 w-6' />
              <span className='text-sm'>{t('addResident')}</span>
            </Button>
            <BulkInviteDialog>
              <Button variant='outline' className='flex h-20 w-full flex-col'>
                <Mail className='mb-2 h-6 w-6' />
                <span className='text-sm'>{t('inviteResidents')}</span>
              </Button>
            </BulkInviteDialog>
            <Button
              variant='outline'
              className='flex h-20 w-full flex-col'
              onClick={() => setCreateMeetingOpen(true)}
            >
              <Calendar className='mb-2 h-6 w-6' />
              <span className='text-sm'>{t('scheduleMeeting')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <CreateBuildingDialog
        open={createBuildingOpen}
        onOpenChange={setCreateBuildingOpen}
      />
      <CreateResidentDialog
        open={createResidentOpen}
        onOpenChange={setCreateResidentOpen}
      />
      <CreateMeetingDialog
        open={createMeetingOpen}
        onOpenChange={setCreateMeetingOpen}
      />
    </div>
  );
};

export { DashboardView };
