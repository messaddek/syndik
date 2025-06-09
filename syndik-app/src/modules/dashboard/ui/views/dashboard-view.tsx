'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/nextjs';
import { useTRPC } from '@/trpc/client';
import { Button } from '../../../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import {
  Building2,
  Users,
  Home,
  TrendingUp,
  TrendingDown,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { LoadingFallback } from '../../../../components/loading-skeletons';
import { AccountInitForm } from '../../../accounts/ui/components/account-init-form';

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

export function DashboardView() {
  const { user } = useUser();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: account, isLoading: accountLoading } = useQuery(
    trpc.accounts.getCurrentAccount.queryOptions()
  );
  const { data: overview, isLoading: overviewLoading } = useQuery(
    trpc.dashboard.getOverview.queryOptions()
  );
  const { data: recentActivity } = useQuery(
    trpc.dashboard.getRecentActivity.queryOptions({ limit: 5 })
  );

  const typedOverview = overview as DashboardOverview | undefined;
  const typedActivity = recentActivity as Activity[] | undefined;

  const initializeAccount = useMutation(
    trpc.accounts.initAccount.mutationOptions({
      onSuccess: async () => {
        // Invalidate and refetch relevant queries
        queryClient.invalidateQueries(
          trpc.accounts.getCurrentAccount.queryOptions()
        );
        queryClient.invalidateQueries(
          trpc.dashboard.getOverview.queryOptions()
        );
      },
      onError: error => {
        // Handle error during account initialization
        console.error('Error initializing account:', error);
      },
    })
  );
  const handleInitializeAccount = (data: {
    name: string;
    email: string;
    role: 'manager' | 'admin';
  }) => {
    initializeAccount.mutate(data);
  };

  if (accountLoading || overviewLoading) {
    return <LoadingFallback />;
  }

  // Get default values from Clerk user data
  const defaultName =
    user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
  const defaultEmail = user?.emailAddresses?.[0]?.emailAddress || '';

  return (
    <div className='space-y-6'>
      {!account ? (
        <AccountInitForm
          onSubmit={handleInitializeAccount}
          isLoading={initializeAccount.isPending}
          defaultName={defaultName}
          defaultEmail={defaultEmail}
        />
      ) : (
        <div className='space-y-6'>
          {/* Overview Cards */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Buildings</CardTitle>
                <Building2 className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {typedOverview?.buildings || 0}
                </div>
                <p className='text-muted-foreground text-xs'>
                  Total managed properties
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Units</CardTitle>
                <Home className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {typedOverview?.units || 0}
                </div>
                <p className='text-muted-foreground text-xs'>
                  {typedOverview?.occupancyRate}% occupancy rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Residents</CardTitle>
                <Users className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {typedOverview?.activeResidents || 0}
                </div>
                <p className='text-muted-foreground text-xs'>
                  Active residents
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Net Income
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
                <p className='text-muted-foreground text-xs'>This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Financial Summary */}
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
            <Card>
              <CardHeader>
                <CardTitle>Monthly Financial Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Income</span>
                    <span className='text-sm font-bold text-green-600'>
                      ${typedOverview?.monthlyIncome?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Expenses</span>
                    <span className='text-sm font-bold text-red-600'>
                      ${typedOverview?.monthlyExpenses?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                  <hr />
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium'>Net Income</span>
                    <span
                      className={`text-sm font-bold ${(typedOverview?.netIncome || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                      ${typedOverview?.netIncome?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
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
                            <Users className='h-4 w-4 text-blue-600' />
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
                              ? 'New resident'
                              : 'Meeting scheduled'}
                          </p>
                        </div>
                        <div className='text-xs text-gray-400'>
                          {new Date(activity.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className='text-sm text-gray-500'>No recent activity</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to manage your residential syndicates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                <Link href='/buildings'>
                  <Button
                    variant='outline'
                    className='flex h-20 w-full flex-col'
                  >
                    <Building2 className='mb-2 h-6 w-6' />
                    <span className='text-sm'>Add Building</span>
                  </Button>
                </Link>
                <Button variant='outline' className='flex h-20 w-full flex-col'>
                  <Users className='mb-2 h-6 w-6' />
                  <span className='text-sm'>Add Resident</span>
                </Button>
                <Button variant='outline' className='flex h-20 w-full flex-col'>
                  <TrendingUp className='mb-2 h-6 w-6' />
                  <span className='text-sm'>Record Income</span>
                </Button>
                <Button variant='outline' className='flex h-20 w-full flex-col'>
                  <Calendar className='mb-2 h-6 w-6' />
                  <span className='text-sm'>Schedule Meeting</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
