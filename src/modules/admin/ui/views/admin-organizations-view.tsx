'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Building2,
  Users,
  Settings,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

export function AdminOrganizationsView() {
  const t = useTranslations('admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock organizations data - replace with real API call
  const organizations = [
    {
      id: 'org_1',
      name: 'Résidence Al Andalous',
      slug: 'residence-al-andalous',
      status: 'active' as const,
      memberCount: 125,
      adminCount: 3,
      createdAt: new Date('2024-01-15'),
      plan: 'pro',
      lastActivity: new Date('2024-12-18'),
    },
    {
      id: 'org_2',
      name: 'Complexe Atlas',
      slug: 'complexe-atlas',
      status: 'active' as const,
      memberCount: 89,
      adminCount: 2,
      createdAt: new Date('2024-02-20'),
      plan: 'basic',
      lastActivity: new Date('2024-12-17'),
    },
    {
      id: 'org_3',
      name: 'Résidence Marina',
      slug: 'residence-marina',
      status: 'suspended' as const,
      memberCount: 45,
      adminCount: 1,
      createdAt: new Date('2024-03-10'),
      plan: 'basic',
      lastActivity: new Date('2024-12-10'),
    },
  ];

  const filteredOrganizations = organizations.filter(org => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || org.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: 'active' | 'suspended' | 'inactive') => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-red-100 text-red-800',
      inactive: 'bg-gray-100 text-gray-800',
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  const getPlanBadge = (plan: string) => {
    const colors = {
      basic: 'bg-blue-100 text-blue-800',
      pro: 'bg-purple-100 text-purple-800',
      enterprise: 'bg-orange-100 text-orange-800',
    };
    return (
      <Badge
        className={
          colors[plan as keyof typeof colors] || 'bg-gray-100 text-gray-800'
        }
      >
        {plan}
      </Badge>
    );
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>
          {t('organizations')}
        </h1>
        <p className='text-muted-foreground'>
          {t('organizations_description')}
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>{t('filters')}</CardTitle>
          <CardDescription>{t('filter_organizations')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                <Input
                  placeholder={t('search_organizations')}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='pl-8'
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-48'>
                <SelectValue placeholder={t('filter_by_status')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>{t('all_statuses')}</SelectItem>
                <SelectItem value='active'>{t('active')}</SelectItem>
                <SelectItem value='suspended'>{t('suspended')}</SelectItem>
                <SelectItem value='inactive'>{t('inactive')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Organizations Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('organizations_list')}</CardTitle>
          <CardDescription>
            {t('organizations_list_description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('organization')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('plan')}</TableHead>
                <TableHead>{t('members')}</TableHead>
                <TableHead>{t('admins')}</TableHead>
                <TableHead>{t('created_date')}</TableHead>
                <TableHead>{t('last_activity')}</TableHead>
                <TableHead className='w-[50px]'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganizations.map(org => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div className='flex items-center gap-2'>
                      <Building2 className='text-muted-foreground h-4 w-4' />
                      <div>
                        <div className='font-medium'>{org.name}</div>
                        <div className='text-muted-foreground text-sm'>
                          {org.slug}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(org.status)}</TableCell>
                  <TableCell>{getPlanBadge(org.plan)}</TableCell>
                  <TableCell>
                    <div className='flex items-center gap-1'>
                      <Users className='text-muted-foreground h-4 w-4' />
                      {org.memberCount}
                    </div>
                  </TableCell>
                  <TableCell>{org.adminCount}</TableCell>
                  <TableCell>{format(org.createdAt, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    {format(org.lastActivity, 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <MoreHorizontal className='h-4 w-4' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuItem>
                          <Settings className='mr-2 h-4 w-4' />
                          {t('manage')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className='mr-2 h-4 w-4' />
                          {t('view_members')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredOrganizations.length === 0 && (
            <div className='text-muted-foreground py-8 text-center'>
              {t('no_organizations_found')}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
