'use client';

import { useTranslations } from 'next-intl';
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
  AlertTriangle,
  TrendingUp,
  Activity,
  Shield,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const AdminDashboardView = () => {
  const t = useTranslations('admin'); // Mock data - replace with real API calls
  const stats = {
    totalOrganizations: 157,
    totalUsers: 2341,
    activeB2BTickets: 23,
    monthlyGrowth: 12.5,
    systemHealth: 'healthy' as 'healthy' | 'warning' | 'critical',
    securityAlerts: 2,
  };

  const systemHealthColor: Record<'healthy' | 'warning' | 'critical', string> =
    {
      healthy: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-red-100 text-red-800',
    };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>
          {t('admin_dashboard')}
        </h1>
        <p className='text-muted-foreground'>
          {t('admin_dashboard_description')}
        </p>
      </div>

      {/* Stats Grid */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('total_organizations')}
            </CardTitle>
            <Building2 className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalOrganizations}</div>
            <p className='text-muted-foreground text-xs'>
              +{stats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('total_users')}
            </CardTitle>
            <Users className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.totalUsers}</div>
            <p className='text-muted-foreground text-xs'>
              Across all organizations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('active_b2b_tickets')}
            </CardTitle>
            <AlertTriangle className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.activeB2BTickets}</div>
            <p className='text-muted-foreground text-xs'>Requiring attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('monthly_growth')}
            </CardTitle>
            <TrendingUp className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+{stats.monthlyGrowth}%</div>
            <p className='text-muted-foreground text-xs'>New registrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('system_health')}
            </CardTitle>
            <Activity className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='flex items-center space-x-2'>
              <Badge className={systemHealthColor[stats.systemHealth]}>
                {stats.systemHealth}
              </Badge>
            </div>
            <p className='text-muted-foreground mt-1 text-xs'>
              All systems operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              {t('security_alerts')}
            </CardTitle>
            <Shield className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stats.securityAlerts}</div>
            <p className='text-muted-foreground text-xs'>Pending review</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className='grid gap-4 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>{t('recent_organizations')}</CardTitle>
            <CardDescription>
              {t('recently_registered_organizations')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {/* Mock recent organizations */}
              <div className='flex items-center space-x-3'>
                <div className='h-2 w-2 rounded-full bg-green-500'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Résidence Al Andalous</p>
                  <p className='text-muted-foreground text-xs'>2 hours ago</p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Villa Complex Marina</p>
                  <p className='text-muted-foreground text-xs'>5 hours ago</p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='h-2 w-2 rounded-full bg-purple-500'></div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>Tour Hassan Apartments</p>
                  <p className='text-muted-foreground text-xs'>1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('recent_b2b_tickets')}</CardTitle>
            <CardDescription>{t('latest_support_requests')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-3'>
              {/* Mock recent B2B tickets */}
              <div className='flex items-center space-x-3'>
                <Badge className='bg-red-100 text-red-800'>Urgent</Badge>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>
                    Payment integration issue
                  </p>
                  <p className='text-muted-foreground text-xs'>30 min ago</p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <Badge className='bg-orange-100 text-orange-800'>High</Badge>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>
                    Feature request: Bulk import
                  </p>
                  <p className='text-muted-foreground text-xs'>2 hours ago</p>
                </div>
              </div>
              <div className='flex items-center space-x-3'>
                <Badge className='bg-blue-100 text-blue-800'>Medium</Badge>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>
                    API documentation clarification
                  </p>
                  <p className='text-muted-foreground text-xs'>4 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
