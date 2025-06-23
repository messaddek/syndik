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
import { Search, User, Shield, MoreHorizontal, Mail } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

export const AdminUsersView = () => {
  const t = useTranslations('admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock users data - replace with real API call
  const users = [
    {
      id: 'user_1',
      name: 'Ahmed Benali',
      email: 'ahmed.benali@gmail.com',
      avatar: null,
      role: 'admin',
      status: 'active' as const,
      organizationName: 'Résidence Al Andalous',
      organizationId: 'org_1',
      lastLogin: new Date('2024-12-18'),
      createdAt: new Date('2024-01-15'),
      isSuperAdmin: false,
    },
    {
      id: 'user_2',
      name: 'Fatima Alaoui',
      email: 'fatima.alaoui@syndik.ma',
      avatar: null,
      role: 'super_admin',
      status: 'active' as const,
      organizationName: null,
      organizationId: null,
      lastLogin: new Date('2024-12-18'),
      createdAt: new Date('2024-01-01'),
      isSuperAdmin: true,
    },
    {
      id: 'user_3',
      name: 'Mohamed El Amrani',
      email: 'mohamed.elamrani@gmail.com',
      avatar: null,
      role: 'member',
      status: 'active' as const,
      organizationName: 'Résidence Al Andalous',
      organizationId: 'org_1',
      lastLogin: new Date('2024-12-17'),
      createdAt: new Date('2024-02-10'),
      isSuperAdmin: false,
    },
    {
      id: 'user_4',
      name: 'Aisha Benali',
      email: 'aisha.benali@gmail.com',
      avatar: null,
      role: 'member',
      status: 'suspended' as const,
      organizationName: 'Complexe Atlas',
      organizationId: 'org_2',
      lastLogin: new Date('2024-12-10'),
      createdAt: new Date('2024-03-05'),
      isSuperAdmin: false,
    },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.organizationName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus =
      statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: 'active' | 'suspended' | 'inactive') => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      suspended: 'bg-red-100 text-red-800',
      inactive: 'bg-gray-100 text-gray-800',
    };
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  const getRoleBadge = (role: string, isSuperAdmin: boolean) => {
    if (isSuperAdmin) {
      return (
        <Badge className='bg-red-100 text-red-800'>{t('super_admin')}</Badge>
      );
    }
    const colors = {
      admin: 'bg-orange-100 text-orange-800',
      member: 'bg-blue-100 text-blue-800',
    };
    return (
      <Badge
        className={
          colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800'
        }
      >
        {role}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{t('users')}</h1>
        <p className='text-muted-foreground'>{t('users_description')}</p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>{t('filters')}</CardTitle>
          <CardDescription>{t('filter_users')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='text-muted-foreground absolute top-2.5 left-2 h-4 w-4' />
                <Input
                  placeholder={t('search_users')}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='pl-8'
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className='w-48'>
                <SelectValue placeholder={t('filter_by_role')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>{t('all_roles')}</SelectItem>
                <SelectItem value='super_admin'>{t('super_admin')}</SelectItem>
                <SelectItem value='admin'>{t('admin')}</SelectItem>
                <SelectItem value='member'>{t('member')}</SelectItem>
              </SelectContent>
            </Select>
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

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('users_list')}</CardTitle>
          <CardDescription>{t('users_list_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('user')}</TableHead>
                <TableHead>{t('role')}</TableHead>
                <TableHead>{t('status')}</TableHead>
                <TableHead>{t('organization')}</TableHead>
                <TableHead>{t('last_login')}</TableHead>
                <TableHead>{t('created_date')}</TableHead>
                <TableHead className='w-[50px]'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-8 w-8'>
                        <AvatarImage src={user.avatar || ''} />
                        <AvatarFallback>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className='font-medium'>{user.name}</div>
                        <div className='text-muted-foreground flex items-center gap-1 text-sm'>
                          <Mail className='h-3 w-3' />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role, user.isSuperAdmin)}
                  </TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    {user.organizationName ? (
                      <div className='text-sm'>{user.organizationName}</div>
                    ) : (
                      <span className='text-muted-foreground text-sm'>
                        {t('no_organization')}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(user.lastLogin, 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    {format(user.createdAt, 'MMM dd, yyyy')}
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
                          <User className='mr-2 h-4 w-4' />
                          {t('view_profile')}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className='mr-2 h-4 w-4' />
                          {t('manage_permissions')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className='text-muted-foreground py-8 text-center'>
              {t('no_users_found')}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
