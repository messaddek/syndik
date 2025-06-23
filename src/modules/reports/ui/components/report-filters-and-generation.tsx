'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Download,
  DollarSign,
  BarChart3,
  PieChart,
  Building2,
  Loader2,
  Filter,
  FileCheck,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';

interface Building {
  id: string;
  name: string;
  orgId: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  totalUnits: number;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const ReportFiltersAndGeneration = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const t = useTranslations('financeReports');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [generatingReport, setGeneratingReport] = useState<string | null>(null);

  // Fetch real data
  const { data: buildingsResponse = { data: [] } } = useQuery(
    trpc.buildings.getAll.queryOptions({})
  );
  const buildings = buildingsResponse.data || [];
  // Generate report mutation
  const generateReportMutation = useMutation(
    trpc.reports.generate.mutationOptions({
      onSuccess: data => {
        toast.success(t('success.reportGenerated'));
        if (data.downloadUrl) {
          window.open(data.downloadUrl, '_blank');
          toast.success(t('success.downloadStarted'));
        }
        setGeneratingReport(null);

        // Invalidate stats and recent reports to update the UI
        queryClient.invalidateQueries({ queryKey: [['reports', 'getStats']] });
        queryClient.invalidateQueries({ queryKey: [['reports', 'getRecent']] });
      },
      onError: error => {
        console.error('Failed to generate report:', error);
        toast.error(t('errors.generateFailed'));
        setGeneratingReport(null);
      },
    })
  );

  const reports = [
    {
      id: 'monthly-summary',
      title: t('reports.monthlySummary.title'),
      description: t('reports.monthlySummary.description'),
      icon: BarChart3,
      badge: t('badges.popular'),
      badgeVariant: 'default' as const,
    },
    {
      id: 'payment-status',
      title: t('reports.paymentStatus.title'),
      description: t('reports.paymentStatus.description'),
      icon: DollarSign,
      badge: t('badges.new'),
      badgeVariant: 'secondary' as const,
    },
    {
      id: 'expense-breakdown',
      title: t('reports.expenseBreakdown.title'),
      description: t('reports.expenseBreakdown.description'),
      icon: PieChart,
      badge: null,
      badgeVariant: null,
    },
    {
      id: 'property-performance',
      title: t('reports.propertyPerformance.title'),
      description: t('reports.propertyPerformance.description'),
      icon: Building2,
      badge: null,
      badgeVariant: null,
    },
    {
      id: 'yearly-comparison',
      title: t('reports.yearlyComparison.title'),
      description: t('reports.yearlyComparison.description'),
      icon: TrendingUp,
      badge: t('badges.recommended'),
      badgeVariant: 'outline' as const,
    },
    {
      id: 'tax-report',
      title: t('reports.taxReport.title'),
      description: t('reports.taxReport.description'),
      icon: FileCheck,
      badge: null,
      badgeVariant: null,
    },
  ];

  const handleGenerateReport = async (reportId: string) => {
    setGeneratingReport(reportId);

    try {
      await generateReportMutation.mutateAsync({
        reportType: reportId as
          | 'monthly-summary'
          | 'payment-status'
          | 'expense-breakdown'
          | 'property-performance'
          | 'yearly-comparison'
          | 'tax-report',
        period: selectedPeriod,
        buildingId: selectedBuilding === 'all' ? undefined : selectedBuilding,
      });
    } catch (error) {
      console.error('Report generation failed:', error);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Filter className='h-5 w-5' />
            {t('filters.period')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>
                {t('filters.period')}
              </label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='current-month'>
                    {t('filters.currentMonth')}
                  </SelectItem>
                  <SelectItem value='last-month'>
                    {t('filters.lastMonth')}
                  </SelectItem>
                  <SelectItem value='current-quarter'>
                    {t('filters.currentQuarter')}
                  </SelectItem>
                  <SelectItem value='current-year'>
                    {t('filters.currentYear')}
                  </SelectItem>
                  <SelectItem value='last-year'>
                    {t('filters.lastYear')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-2'>
              <label className='text-sm font-medium'>
                {t('filters.building')}
              </label>
              <Select
                value={selectedBuilding}
                onValueChange={setSelectedBuilding}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>
                    {t('filters.allBuildings')}
                  </SelectItem>
                  {buildings.map((building: Building) => (
                    <SelectItem key={building.id} value={building.id}>
                      {building.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>{t('availableReports.title')}</CardTitle>
          <CardDescription>{t('availableReports.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {reports.map(report => {
              const Icon = report.icon;
              const isGenerating = generatingReport === report.id;

              return (
                <Card key={report.id} className='relative'>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <Icon className='h-5 w-5 text-blue-600' />
                        <CardTitle className='text-base'>
                          {report.title}
                        </CardTitle>
                      </div>
                      {report.badge && (
                        <Badge variant={report.badgeVariant}>
                          {report.badge}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => handleGenerateReport(report.id)}
                      className='w-full'
                      variant='outline'
                      disabled={
                        isGenerating || generateReportMutation.isPending
                      }
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          {t('generating.title')}
                        </>
                      ) : (
                        <>
                          <Download className='mr-2 h-4 w-4' />
                          {t('availableReports.generateButton')}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
