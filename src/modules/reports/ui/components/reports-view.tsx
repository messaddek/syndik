'use client';

import { Suspense, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Loader2,
  Trash2,
} from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useConfirm } from '@/hooks/use-confirm';
import { toast } from 'sonner';

interface ReportStats {
  reportsGenerated: number;
  lastGeneratedDays: number;
  mostPopularReport: string;
  mostPopularPercentage: number;
}

interface RecentReport {
  id: string;
  name: string;
  type: 'PDF' | 'EXCEL' | 'CSV';
  generatedAt: Date;
  size: string;
  downloadUrl: string | null;
  status: 'generating' | 'completed' | 'failed';
}

const QuickStatsContent = () => {
  const t = useTranslations('financeReports');
  const trpc = useTRPC();

  const { data: reportStats } = useQuery(trpc.reports.getStats.queryOptions());
  const typedReportStats = reportStats as ReportStats | undefined;

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            {t('quickStats.reportsGenerated')}
          </CardTitle>
          <FileText className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {typedReportStats?.reportsGenerated || 0}
          </div>
          <p className='text-muted-foreground text-xs'>
            {t('quickStats.thisMonth')}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            {t('quickStats.lastGenerated')}
          </CardTitle>
          <Calendar className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {typedReportStats?.lastGeneratedDays || 0} {t('quickStats.days')}
          </div>
          <p className='text-muted-foreground text-xs'>{t('quickStats.ago')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            {t('quickStats.mostPopular')}
          </CardTitle>
          <TrendingUp className='text-muted-foreground h-4 w-4' />
        </CardHeader>
        <CardContent>
          <div className='text-sm font-bold'>
            {typedReportStats?.mostPopularReport ||
              t('reports.monthlySummary.title')}
          </div>
          <p className='text-muted-foreground flex items-center space-x-2 text-xs'>
            <span>{typedReportStats?.mostPopularPercentage || 0}%</span>
            <span>{t('quickStats.ofReports')}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const QuickStatsSkeleton = () => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-4' />
          </CardHeader>
          <CardContent>
            <Skeleton className='mb-2 h-8 w-16' />
            <Skeleton className='h-3 w-20' />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const RecentReportsContent = () => {
  const t = useTranslations('financeReports');
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: recentReports = [] } = useQuery(
    trpc.reports.getRecent.queryOptions({ limit: 5 })
  );
  const typedRecentReports = recentReports as RecentReport[];

  // Delete all reports mutation with invalidation
  const deleteAllReportsMutation = useMutation(
    trpc.reports.deleteAll.mutationOptions({
      onSuccess: data => {
        toast.success(`Deleted ${data.deletedCount} reports successfully`);
        // Invalidate both stats and recent reports queries
        queryClient.invalidateQueries({ queryKey: [['reports', 'getStats']] });
        queryClient.invalidateQueries({ queryKey: [['reports', 'getRecent']] });
      },
      onError: error => {
        console.error('Failed to delete reports:', error);
        toast.error('Failed to delete reports');
      },
    })
  );

  const [ConfirmDialog, confirm] = useConfirm(
    'Delete All Reports',
    'Are you sure you want to delete all reports? This action cannot be undone.',
    true
  );

  const handleClearAll = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      deleteAllReportsMutation.mutate();
    }
  };
  const getReportStatusMessage = (report: RecentReport) => {
    if (report.status === 'failed') {
      return 'Report generation failed';
    }
    if (report.status === 'generating') {
      return 'Report is being generated...';
    }

    // Check for empty reports (0 B or very small files that likely only contain headers)
    const sizeInBytes = parseFileSize(report.size);
    if (sizeInBytes === 0) {
      return 'Report contains no data for the selected period';
    }

    // Small files (less than 20KB) likely only contain headers/titles but no actual data
    if (sizeInBytes < 20480) {
      // 20KB threshold (increased to catch header-only reports)
      return 'Report appears to be empty - only contains title/header without financial data';
    }

    // Check if report name indicates future dates (2025 and beyond)
    if (report.name.includes('2025') || report.name.includes('2026')) {
      return 'Future date range - may not contain historical data';
    }

    return null;
  };

  // Helper function to parse file size string to bytes
  const parseFileSize = (sizeStr: string): number => {
    if (!sizeStr) return 0;

    const match = sizeStr.match(/^([\d.]+)\s*([KMGT]?B)$/i);
    if (!match) return 0;

    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();

    switch (unit) {
      case 'TB':
        return value * 1024 * 1024 * 1024 * 1024;
      case 'GB':
        return value * 1024 * 1024 * 1024;
      case 'MB':
        return value * 1024 * 1024;
      case 'KB':
        return value * 1024;
      case 'B':
        return value;
      default:
        return 0;
    }
  };
  const handleDownloadReport = (report: RecentReport) => {
    console.log('=== Download Report Debug ===');
    console.log('Report:', report);
    console.log('Report size:', report.size);
    console.log('Report status:', report.status);
    console.log('Download URL:', report.downloadUrl);

    // Check if report is in failed state
    if (report.status === 'failed') {
      toast.error('This report failed to generate and cannot be downloaded');
      return;
    }

    // Check if report is still generating
    if (report.status === 'generating') {
      toast.warning('This report is still being generated. Please wait...');
      return;
    }

    // Check if download URL exists
    if (!report.downloadUrl) {
      toast.error('Download link is not available for this report');
      return;
    }

    // Check if report appears to be empty based on size
    if (report.size === '0 B' || report.size === '0 KB') {
      toast.warning(
        'This report appears to be empty. It may not contain any data for the selected period. Check the browser console for debugging information.'
      );

      // Add helpful debug information
      console.warn('Empty report detected:', {
        name: report.name,
        size: report.size,
        generatedAt: report.generatedAt,
        period: report.name.includes('Jan 2025 to Dec 2025')
          ? 'Full year 2025'
          : 'Unknown period',
      });
    }

    // Proceed with download
    window.open(report.downloadUrl, '_blank');
    toast.success(t('success.downloadStarted'));
  };
  const handleCheckReport = async (reportId: string) => {
    // For now, let's do a client-side check based on the report information we already have
    const report = typedRecentReports.find(r => r.id === reportId);
    if (!report) {
      toast.error('Report not found');
      return;
    }

    console.log('=== Report Check Results ===');
    console.log('Report ID:', report.id);
    console.log('Report Name:', report.name);
    console.log('File Size:', report.size);
    console.log('Status:', report.status);

    const sizeInBytes = parseFileSize(report.size);
    const statusMessage = getReportStatusMessage(report);

    if (statusMessage) {
      toast.warning(`Issue detected: ${statusMessage}`);
      console.log('Issue:', statusMessage);
    } else {
      toast.success('This report appears to be complete with data.');
      console.log('Report seems to have valid data');
    }

    // Additional diagnostics
    console.log('File size in bytes:', sizeInBytes);
    console.log('Is likely empty:', sizeInBytes < 20480);
    console.log('Status message:', statusMessage || 'None');

    toast.info('Check console for detailed report analysis');
  };
  const handleDebugDataAvailability = async () => {
    try {
      // For now, let's provide a simplified debug based on what we can observe
      const totalReports = typedRecentReports.length;
      const emptyReports = typedRecentReports.filter(report => {
        const sizeInBytes = parseFileSize(report.size);
        return sizeInBytes < 20480; // Less than 20KB likely means empty
      }).length;
      const failedReports = typedRecentReports.filter(
        report => report.status === 'failed'
      ).length;

      console.log('=== Data Availability Debug ===');
      console.log('Total reports:', totalReports);
      console.log('Likely empty reports:', emptyReports);
      console.log('Failed reports:', failedReports);
      console.log(
        'Reports with potential data:',
        totalReports - emptyReports - failedReports
      );

      // Check for patterns in report names that might indicate issues
      const futureReports = typedRecentReports.filter(
        report => report.name.includes('2025') || report.name.includes('2026')
      ).length;

      console.log('Reports with future dates:', futureReports);

      if (emptyReports > 0) {
        toast.warning(
          `Found ${emptyReports} out of ${totalReports} reports that appear to be empty. This suggests missing financial data for the selected periods.`
        );
      } else {
        toast.success(
          `All ${totalReports} reports appear to contain data. Check console for detailed analysis.`
        );
      }

      toast.info('Check console for detailed debug information');
    } catch (error) {
      console.error('Debug failed:', error);
      toast.error('Debug check failed - see console for details');
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <div>
              <CardTitle>{t('recentReports.title')}</CardTitle>
              <CardDescription>
                {t('recentReports.description')}
              </CardDescription>
            </div>
            {typedRecentReports.length > 0 && (
              <Button
                variant='outline'
                size='sm'
                onClick={handleClearAll}
                disabled={deleteAllReportsMutation.isPending}
                className='flex items-center gap-2'
              >
                {deleteAllReportsMutation.isPending ? (
                  <Loader2 className='h-4 w-4 animate-spin' />
                ) : (
                  <Trash2 className='h-4 w-4' />
                )}
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {typedRecentReports.length === 0 ? (
            <div className='py-8 text-center'>
              <FileText className='mx-auto mb-4 h-12 w-12 text-gray-400' />
              <p className='mb-2 text-gray-500'>
                {t('recentReports.noReports')}
              </p>
              <p className='text-sm text-gray-400'>
                Generate your first report using the filters above
              </p>
            </div>
          ) : (
            <>
              {/* Check if all recent reports are empty */}
              {typedRecentReports.every(
                report =>
                  report.size === '0 B' ||
                  report.size === '0 KB' ||
                  report.status === 'failed'
              ) && (
                <div className='mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
                  <div className='flex items-start'>
                    <div className='flex-shrink-0'>
                      <svg
                        className='h-5 w-5 text-yellow-400'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </div>
                    <div className='ml-3'>
                      <h3 className='text-sm font-medium text-yellow-800'>
                        All reports appear to be empty
                      </h3>
                      <div className='mt-2 text-sm text-yellow-700'>
                        <p>This usually means:</p>
                        <ul className='mt-1 list-inside list-disc space-y-1'>
                          <li>
                            No financial data exists for the selected time
                            periods
                          </li>
                          <li>
                            The date range might be in the future (e.g., Jan-Dec
                            2025)
                          </li>
                          <li>
                            No income or expense records have been added yet
                          </li>
                          <li>
                            The selected building has no financial activity
                          </li>
                        </ul>
                        <p className='mt-2'>
                          Try selecting a different time period or ensure
                          financial data has been entered.
                        </p>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={handleDebugDataAvailability}
                          className='mt-3'
                        >
                          Debug Data Availability
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className='space-y-3'>
                {typedRecentReports.map(report => (
                  <div
                    key={report.id}
                    className='flex items-center justify-between rounded-lg border p-4'
                  >
                    <div className='flex items-center space-x-4'>
                      <FileText
                        className={`h-5 w-5 ${
                          report.status === 'failed'
                            ? 'text-red-500'
                            : report.status === 'generating'
                              ? 'text-yellow-500'
                              : report.size === '0 B' || report.size === '0 KB'
                                ? 'text-orange-500'
                                : 'text-gray-500'
                        }`}
                      />
                      <div className='flex-1 items-center space-x-2'>
                        <div className='flex items-center gap-2'>
                          <p className='font-medium'>{report.name}</p>
                          {report.status === 'failed' && (
                            <span className='inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800'>
                              Failed
                            </span>
                          )}
                          {report.status === 'generating' && (
                            <span className='inline-flex items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800'>
                              Generating
                            </span>
                          )}
                          {(report.size === '0 B' || report.size === '0 KB') &&
                            report.status === 'completed' && (
                              <span className='inline-flex items-center rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800'>
                                Empty
                              </span>
                            )}
                        </div>
                        <div className='flex items-center space-x-2 text-sm text-gray-500'>
                          <span>{report.type}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                          <span>•</span>
                          <span>
                            {new Date(report.generatedAt).toLocaleDateString()}
                          </span>
                          {getReportStatusMessage(report) && (
                            <>
                              <span>•</span>
                              <span className='text-xs italic'>
                                {getReportStatusMessage(report)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                      {/* Check Report Button - only show for potentially empty reports */}
                      {(parseFileSize(report.size) < 50000 ||
                        getReportStatusMessage(report)) && (
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => handleCheckReport(report.id)}
                          className='text-xs'
                        >
                          Check
                        </Button>
                      )}
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleDownloadReport(report)}
                        disabled={report.status !== 'completed'}
                        className={
                          report.status === 'failed'
                            ? 'text-red-500 hover:text-red-600'
                            : report.status === 'generating'
                              ? 'text-yellow-500'
                              : ''
                        }
                      >
                        {report.status === 'generating' ? (
                          <Loader2 className='h-4 w-4 animate-spin' />
                        ) : (
                          <Download className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <ConfirmDialog />
    </>
  );
};

const RecentReportsSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <Skeleton className='mb-2 h-6 w-32' />
            <Skeleton className='h-4 w-48' />
          </div>
          <Skeleton className='h-8 w-20' />
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-3'>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className='flex items-center justify-between rounded-lg border p-4'
            >
              <div className='flex items-center space-x-4'>
                <Skeleton className='h-5 w-5' />
                <div>
                  <Skeleton className='mb-2 h-4 w-48' />
                  <Skeleton className='h-3 w-32' />
                </div>
              </div>
              <Skeleton className='h-8 w-8' />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const ReportsView = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Prefetch data on component mount
  useEffect(() => {
    // Prefetch stats data
    queryClient.prefetchQuery(trpc.reports.getStats.queryOptions());

    // Prefetch recent reports data
    queryClient.prefetchQuery(
      trpc.reports.getRecent.queryOptions({ limit: 5 })
    );
  }, [trpc, queryClient]);

  return (
    <div className='space-y-6'>
      {/* Quick Stats */}
      <Suspense fallback={<QuickStatsSkeleton />}>
        <QuickStatsContent />
      </Suspense>

      {/* Recent Reports History */}
      <Suspense fallback={<RecentReportsSkeleton />}>
        <RecentReportsContent />
      </Suspense>
    </div>
  );
};
