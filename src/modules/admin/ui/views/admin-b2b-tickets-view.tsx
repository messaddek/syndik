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
import { Search, Eye, MessageSquare, Clock } from 'lucide-react';
import { format } from 'date-fns';

export const AdminB2BTicketsView = () => {
  const t = useTranslations('admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Mock B2B tickets data - replace with real API call
  const b2bTickets = [
    {
      id: 'b2b-001',
      title: 'Payment gateway integration issue',
      description: 'Unable to process payments through Stripe integration',
      syndicate: 'Résidence Al Andalous',
      priority: 'urgent',
      status: 'open',
      urgencyLevel: 'critical',
      businessImpact: 'Complete payment system down, affecting all residents',
      affectedUsers: 250,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'b2b-002',
      title: 'Feature request: Bulk resident import',
      description: 'Need ability to import residents from CSV file',
      syndicate: 'Villa Complex Marina',
      priority: 'high',
      status: 'in_progress',
      urgencyLevel: 'medium',
      businessImpact: 'Manual data entry is time-consuming for large buildings',
      affectedUsers: 1,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'b2b-003',
      title: 'API documentation clarification needed',
      description: 'Webhook endpoints documentation is unclear',
      syndicate: 'Tour Hassan Apartments',
      priority: 'medium',
      status: 'resolved',
      urgencyLevel: 'low',
      businessImpact: 'Minor delay in integration development',
      affectedUsers: 2,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTickets = b2bTickets.filter(ticket => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.syndicate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === 'all' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>
          {t('b2b_tickets')}
        </h1>
        <p className='text-muted-foreground'>
          {t('manage_b2b_support_tickets')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total B2B Tickets
            </CardTitle>
            <MessageSquare className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{b2bTickets.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Open Tickets</CardTitle>
            <Clock className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {b2bTickets.filter(t => t.status === 'open').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Critical Urgency
            </CardTitle>
            <Clock className='h-4 w-4 text-red-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold text-red-600'>
              {b2bTickets.filter(t => t.urgencyLevel === 'critical').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Affected Users
            </CardTitle>
            <MessageSquare className='text-muted-foreground h-4 w-4' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {b2bTickets.reduce((sum, t) => sum + t.affectedUsers, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>{t('filters')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <div className='relative'>
                <Search className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
                <Input
                  placeholder={t('search_tickets')}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='pl-10'
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className='w-32'>
                <SelectValue placeholder='Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Status</SelectItem>
                <SelectItem value='open'>Open</SelectItem>
                <SelectItem value='in_progress'>In Progress</SelectItem>
                <SelectItem value='resolved'>Resolved</SelectItem>
                <SelectItem value='closed'>Closed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className='w-32'>
                <SelectValue placeholder='Priority' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Priority</SelectItem>
                <SelectItem value='low'>Low</SelectItem>
                <SelectItem value='medium'>Medium</SelectItem>
                <SelectItem value='high'>High</SelectItem>
                <SelectItem value='urgent'>Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('b2b_tickets_list')}</CardTitle>
          <CardDescription>{t('b2b_tickets_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Syndicate</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Urgency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Affected Users</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map(ticket => (
                <TableRow key={ticket.id}>
                  <TableCell className='font-mono text-xs'>
                    {ticket.id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className='font-medium'>{ticket.title}</div>
                      <div className='text-muted-foreground text-sm'>
                        {ticket.description.substring(0, 50)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{ticket.syndicate}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getUrgencyColor(ticket.urgencyLevel)}>
                      {ticket.urgencyLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.affectedUsers}</TableCell>
                  <TableCell>
                    {format(new Date(ticket.createdAt), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Button variant='ghost' size='sm'>
                      <Eye className='h-4 w-4' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
