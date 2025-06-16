'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Building2,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Bell,
  Plus,
  AlertCircle,
} from 'lucide-react';

/**
 * Example Dashboard Component showing how to integrate with backend procedures
 *
 * This component demonstrates:
 * - Multiple tRPC queries for different data
 * - Loading states and error handling
 * - Mutations with optimistic updates
 * - Real-time data refresh
 */
export function SyndicateDashboard() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [selectedBuilding, setSelectedBuilding] = useState<
    string | undefined
  >();

  // Fetch dashboard overview data
  const {
    data: overview,
    isLoading: overviewLoading,
    error: overviewError,
  } = useQuery(trpc.dashboard.getOverview.queryOptions());

  // Fetch financial summary
  const { data: financialSummary, isLoading: financialLoading } = useQuery(
    trpc.finances.getFinancialSummary.queryOptions({
      buildingId: selectedBuilding,
    })
  );

  // Fetch recent activity
  const { data: recentActivity } = useQuery(
    trpc.dashboard.getRecentActivity.queryOptions({
      limit: 5,
    })
  );

  // Fetch buildings for selection
  const { data: buildingsData } = useQuery(
    trpc.buildings.getAll.queryOptions({
      page: 1,
      pageSize: 50,
    })
  ); // Fetch announcements
  const { data: announcements } = useQuery(
    trpc.announcements.getAll.queryOptions({
      limit: 5,
    })
  );

  // Example mutation for creating announcement
  const createAnnouncement = useMutation(
    trpc.announcements.create.mutationOptions({
      onSuccess: () => {
        console.log('Success: Announcement created successfully');
        // Refresh announcements list
        queryClient.invalidateQueries(
          trpc.announcements.getAll.queryOptions({
            limit: 5,
          })
        );
      },
      onError: error => {
        console.error('Error:', error.message);
      },
    })
  );

  // Handle loading states
  if (overviewLoading) {
    return (
      <div className='space-y-6'>
        {/* Loading skeletons */}
        <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className='p-6'>
                <div className='animate-pulse'>
                  <div className='mb-2 h-4 w-3/4 rounded bg-gray-200'></div>
                  <div className='h-8 w-1/2 rounded bg-gray-200'></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Handle errors
  if (overviewError) {
    return (
      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center space-x-2 text-red-600'>
            <AlertCircle className='h-5 w-5' />
            <span>Error loading dashboard: {overviewError.message}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <div className='flex space-x-2'>
          <select
            value={selectedBuilding || ''}
            onChange={e => setSelectedBuilding(e.target.value || undefined)}
            className='rounded-md border px-3 py-2'
          >
            <option value=''>All Buildings</option>
            {buildingsData?.data.map(building => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
          <Button
            onClick={() =>
              createAnnouncement.mutate({
                title: 'Test Announcement',
                content: 'This is a test announcement',
                priority: 'normal',
              })
            }
            disabled={createAnnouncement.isPending}
            className='flex items-center gap-2'
          >
            <Plus className='h-4 w-4' />
            {createAnnouncement.isPending ? 'Creating...' : 'New Announcement'}
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-4'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>Buildings</p>
                <p className='text-2xl font-bold'>{overview?.buildings || 0}</p>
              </div>
              <Building2 className='text-primary h-8 w-8' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Active Residents
                </p>
                <p className='text-2xl font-bold'>
                  {overview?.activeResidents || 0}
                </p>
              </div>
              <Users className='h-8 w-8 text-green-600' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Monthly Income
                </p>
                <p className='text-2xl font-bold'>
                  ${overview?.monthlyIncome?.toLocaleString() || '0'}
                </p>
              </div>
              <DollarSign className='h-8 w-8 text-green-600' />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  Occupancy Rate
                </p>
                <p className='text-2xl font-bold'>
                  {overview?.occupancyRate || '0'}%
                </p>
              </div>
              <TrendingUp className='text-primary h-8 w-8' />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue='financial' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='financial'>Financial Overview</TabsTrigger>
          <TabsTrigger value='activity'>Recent Activity</TabsTrigger>
          <TabsTrigger value='announcements'>Announcements</TabsTrigger>
        </TabsList>

        {/* Financial Tab */}
        <TabsContent value='financial' className='space-y-4'>
          {financialLoading ? (
            <Card>
              <CardContent className='p-6'>
                <div className='animate-pulse space-y-4'>
                  <div className='h-4 w-1/4 rounded bg-gray-200'></div>
                  <div className='h-32 rounded bg-gray-200'></div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <Card>
                <CardHeader>
                  <CardTitle>Financial Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex justify-between'>
                      <span>Total Income:</span>
                      <span className='font-bold text-green-600'>
                        $
                        {financialSummary?.summary.totalIncome.toLocaleString()}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span>Total Expenses:</span>
                      <span className='font-bold text-red-600'>
                        $
                        {financialSummary?.summary.totalExpenses.toLocaleString()}
                      </span>
                    </div>
                    <div className='flex justify-between border-t pt-2'>
                      <span>Net Income:</span>
                      <span
                        className={`font-bold ${
                          (financialSummary?.summary.netIncome || 0) >= 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        ${financialSummary?.summary.netIncome.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Income by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    {financialSummary?.incomeByCategory.map(category => (
                      <div
                        key={category.category}
                        className='flex justify-between'
                      >
                        <span className='capitalize'>{category.category}:</span>
                        <span className='font-medium'>
                          ${category.total.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value='activity'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {recentActivity?.map((activity, index) => (
                  <div
                    key={index}
                    className='flex items-center space-x-3 border-b pb-3 last:border-b-0'
                  >
                    <Calendar className='h-4 w-4 text-gray-500' />
                    <div className='flex-1'>
                      <p className='text-sm font-medium'>{activity.name}</p>
                      <p className='text-xs text-gray-500'>
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant='outline' className='capitalize'>
                      {activity.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value='announcements'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center space-x-2'>
                <Bell className='h-5 w-5' />
                <span>Recent Announcements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {announcements?.map(announcement => (
                  <div
                    key={announcement.id}
                    className='border-l-4 border-blue-500 pl-4'
                  >
                    <div className='flex items-center justify-between'>
                      <h4 className='font-medium'>{announcement.title}</h4>
                      <Badge
                        variant={
                          announcement.priority === 'high'
                            ? 'destructive'
                            : 'default'
                        }
                      >
                        {announcement.priority}
                      </Badge>
                    </div>
                    <p className='mt-1 text-sm text-gray-600'>
                      {announcement.content}
                    </p>
                    <p className='mt-2 text-xs text-gray-500'>
                      {new Date(announcement.publishedAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
