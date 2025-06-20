'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// Dialog imports removed as we're using ResponsiveDialog
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Ticket,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Filter,
  Search,
} from 'lucide-react';
import { TicketsList } from '../components/tickets-list';
import { CreateTicketDialog } from '../components/create-ticket-dialog';
import { CreateB2BTicketDialog } from '../components/create-b2b-ticket-dialog';
import { TicketDetails } from '../components/ticket-details';
import { HelpdeskStats } from '../components/helpdesk-stats';
import type {
  TicketStatus,
  TicketPriority,
  TicketAttachment,
  AllTicketCategory,
} from '../../types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useHelpdeskFilters } from '../../hooks/use-helpdesk-filters';
import { useHelpdeskPermissions } from '../../hooks/use-helpdesk-permissions';

interface HelpdeskViewProps {
  initialFilters?: {
    page?: number;
    pageSize?: number;
    search?: string;
    buildingId?: string;
    status?: readonly string[];
    priority?: readonly string[];
    category?: readonly string[];
    sortBy?: string;
    sortOrder?: string;
  };
}

export function HelpdeskView({ initialFilters }: HelpdeskViewProps) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[HELPDESK-CLIENT] HelpdeskView - Starting render', {
      initialFilters,
      timestamp: new Date().toISOString(),
    });
  }

  const t = useTranslations('helpDesk');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [b2bDialogOpen, setB2BDialogOpen] = useState(false);
  const [filters, setFilters] = useHelpdeskFilters(initialFilters);
  const [activeTab, setActiveTab] = useState<TicketStatus | 'all'>('all');
  const [ticketTypeTab, setTicketTypeTab] = useState<
    'internal' | 'b2b' | 'all'
  >('internal');
  const { canCreateB2BTickets, canViewB2BTickets } = useHelpdeskPermissions();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  if (process.env.NODE_ENV === 'development') {
    console.log('[HELPDESK-CLIENT] HelpdeskView - Current filters', {
      filters,
    });
  }
  const statsQueryStart = Date.now();
  const { data: stats, isLoading: statsLoading } = useQuery(
    trpc.helpdesk.getStats.queryOptions({
      buildingId: filters.buildingId || undefined,
    })
  );
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '[HELPDESK-CLIENT] Stats query completed in',
      Date.now() - statsQueryStart,
      'ms'
    );
  }
  const ticketsQueryStart = Date.now();
  const { data: tickets, isLoading: _ticketsLoading } = useQuery(
    trpc.helpdesk.getAllTickets.queryOptions({
      filters: {
        buildingId: filters.buildingId || undefined,
        status:
          filters.status.length > 0
            ? (filters.status as (
                | 'open'
                | 'in_progress'
                | 'resolved'
                | 'closed'
              )[])
            : undefined,
        priority:
          filters.priority.length > 0
            ? (filters.priority as ('low' | 'medium' | 'high' | 'urgent')[])
            : undefined,
        category:
          filters.category.length > 0
            ? (filters.category as (
                | 'maintenance'
                | 'complaint'
                | 'inquiry'
                | 'billing'
                | 'security'
                | 'parking'
                | 'noise'
                | 'cleaning'
                | 'other'
              )[])
            : undefined,
        ticketType: ticketTypeTab,
      },
      pagination: {
        page: filters.page,
        limit: filters.pageSize,
      },
      sortBy: filters.sortBy as
        | 'createdAt'
        | 'updatedAt'
        | 'priority'
        | 'status',
      sortOrder: filters.sortOrder as 'asc' | 'desc',
    })
  );

  if (process.env.NODE_ENV === 'development') {
    console.log(
      '[HELPDESK-CLIENT] Tickets query completed in',
      Date.now() - ticketsQueryStart,
      'ms',
      {
        ticketsCount: tickets?.tickets?.length || 0,
        totalCount: tickets?.pagination?.total || 0,
      }
    );
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value as TicketStatus | 'all');
    if (value === 'all') {
      setFilters.setStatus([]);
    } else {
      setFilters.setStatus([value]);
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>
            {t('title', { default: 'Helpdesk' })}
          </h1>
          <p className='text-muted-foreground'>
            {t('description', {
              default: 'Manage support tickets and requests',
            })}
          </p>
        </div>
        <div className='flex gap-2'>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className='mr-2 h-4 w-4' />
            {t('create_ticket', { default: 'Create Ticket' })}
          </Button>
          {createDialogOpen && (
            <CreateTicketDialog
              open={createDialogOpen}
              onClose={() => setCreateDialogOpen(false)}
              buildingId={filters.buildingId || undefined}
            />
          )}
          {canCreateB2BTickets && (
            <>
              <Button
                variant='outline'
                className='border-orange-300 bg-orange-100 text-orange-800 hover:bg-orange-200 hover:text-orange-900'
                onClick={() => setB2BDialogOpen(true)}
              >
                <Plus className='mr-2 h-4 w-4' />
                {t('create_b2b_ticket', { default: 'B2B Support' })}
              </Button>
              <CreateB2BTicketDialog
                open={b2bDialogOpen}
                onOpenChange={setB2BDialogOpen}
                onSuccess={() => {
                  // Refresh tickets after creating a B2B ticket
                  queryClient.invalidateQueries(
                    trpc.helpdesk.getTickets.queryOptions({})
                  );
                  queryClient.invalidateQueries(
                    trpc.helpdesk.getStats.queryOptions({})
                  );
                  // Close the dialog
                  setB2BDialogOpen(false);
                }}
              />
            </>
          )}
        </div>
      </div>
      {/* Stats */}
      <HelpdeskStats stats={stats} isLoading={statsLoading} />
      {/* Filters and Search - Static data, not dependent on loading */}
      <FiltersSection filters={filters} setFilters={setFilters} t={t} />
      {/* Tickets */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        {/* Tickets List */}
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>{t('tickets', { default: 'Tickets' })}</CardTitle>
              <CardDescription>
                {t('tickets_description', {
                  default: 'View and manage support tickets',
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Ticket Type Tabs (Internal/B2B) */}
              {canViewB2BTickets && (
                <div className='mb-4'>
                  <Tabs
                    value={ticketTypeTab}
                    onValueChange={value =>
                      setTicketTypeTab(value as 'internal' | 'b2b' | 'all')
                    }
                    className='w-full'
                  >
                    <TabsList className='grid w-full grid-cols-3'>
                      <TabsTrigger
                        value='internal'
                        className='flex items-center space-x-2'
                      >
                        <span>
                          {t('internal_tickets', {
                            default: 'Internal Tickets',
                          })}
                        </span>
                      </TabsTrigger>
                      <TabsTrigger
                        value='b2b'
                        className='flex items-center space-x-2 bg-orange-50 data-[state=active]:bg-orange-100'
                      >
                        <span>
                          {t('b2b_tickets', { default: 'B2B Support' })}
                        </span>
                      </TabsTrigger>
                      <TabsTrigger
                        value='all'
                        className='flex items-center space-x-2'
                      >
                        <span>
                          {t('all_tickets', { default: 'All Tickets' })}
                        </span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}
              {/* Status Tabs */}
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className='w-full'
              >
                <TabsList className='grid w-full grid-cols-5'>
                  <TabsTrigger
                    value='all'
                    className='flex items-center space-x-2'
                  >
                    <span>{t('all', { default: 'All' })}</span>
                    {stats && (
                      <Badge variant='secondary' className='ml-1'>
                        {stats.total}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value='open'
                    className='flex items-center space-x-2'
                  >
                    <Ticket className='h-4 w-4' />
                    <span>{t('open', { default: 'Open' })}</span>
                    {stats && (
                      <Badge variant='secondary' className='ml-1'>
                        {stats.open}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value='in_progress'
                    className='flex items-center space-x-2'
                  >
                    <Clock className='h-4 w-4' />
                    <span>{t('in_progress', { default: 'In Progress' })}</span>
                    {stats && (
                      <Badge variant='secondary' className='ml-1'>
                        {stats.inProgress}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value='resolved'
                    className='flex items-center space-x-2'
                  >
                    <CheckCircle className='h-4 w-4' />
                    <span>{t('resolved', { default: 'Resolved' })}</span>
                    {stats && (
                      <Badge variant='secondary' className='ml-1'>
                        {stats.resolved}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value='closed'
                    className='flex items-center space-x-2'
                  >
                    <XCircle className='h-4 w-4' />
                    <span>{t('closed', { default: 'Closed' })}</span>
                    {stats && (
                      <Badge variant='secondary' className='ml-1'>
                        {stats.closed}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>
                <div className='mt-4'>
                  <TicketsList
                    tickets={(tickets?.tickets || []).map(t => ({
                      ...t,
                      // ...other fields...
                      tags: Array.isArray(t.tags) ? (t.tags as string[]) : [],
                      attachments: Array.isArray(t.attachments)
                        ? (t.attachments as TicketAttachment[])
                        : [],
                    }))}
                    onSelectTicket={setSelectedTicketId}
                    selectedTicketId={selectedTicketId}
                  />
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Ticket Details */}
        <div className='lg:col-span-1'>
          {selectedTicketId ? (
            <TicketDetails
              ticketId={selectedTicketId}
              onClose={() => setSelectedTicketId(null)}
            />
          ) : (
            <Card>
              <CardContent className='flex h-64 items-center justify-center'>
                <div className='text-center'>
                  <MessageSquare className='text-muted-foreground mx-auto h-12 w-12' />
                  <h3 className='text-muted-foreground mt-2 text-sm font-medium'>
                    {t('no_ticket_selected', { default: 'No ticket selected' })}
                  </h3>
                  <p className='text-muted-foreground mt-1 text-sm'>
                    {t('select_ticket_to_view', {
                      default: 'Select a ticket to view details',
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// Static Filters Component - Not affected by loading states
interface FiltersSectionProps {
  filters: {
    search: string;
    priority: string[];
    category: string[];
  };
  setFilters: {
    setSearch: (value: string) => void;
    setPriority: (value: string[]) => void;
    setCategory: (value: string[]) => void;
  };
  t: (key: string, options?: { default?: string }) => string;
}

function FiltersSection({ filters, setFilters, t }: FiltersSectionProps) {
  return (
    <Card>
      <CardHeader className='pb-4'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg'>
            {t('filters', { default: 'Filters' })}
          </CardTitle>
          <Button variant='outline' size='sm'>
            <Filter className='mr-2 h-4 w-4' />
            {t('advanced_filters', { default: 'Advanced Filters' })}
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-4'>
          <div className='flex-1'>
            <Label htmlFor='search'>{t('search', { default: 'Search' })}</Label>
            <div className='relative'>
              <Search className='text-muted-foreground absolute top-3 left-3 h-4 w-4' />
              <Input
                id='search'
                placeholder={t('search_placeholder', {
                  default: 'Search tickets...',
                })}
                value={filters.search}
                onChange={e => setFilters.setSearch(e.target.value)}
                className='pl-10'
              />
            </div>
          </div>
          <div className='w-48'>
            <Label htmlFor='priority'>
              {t('priority', { default: 'Priority' })}
            </Label>
            <Select
              value={filters.priority?.[0] || 'all'}
              onValueChange={value =>
                setFilters.setPriority(
                  value === 'all' ? [] : [value as TicketPriority]
                )
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={t('all_priorities', {
                    default: 'All Priorities',
                  })}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>
                  {t('all_priorities', { default: 'All Priorities' })}
                </SelectItem>
                <SelectItem value='low'>
                  {t('priority_low', { default: 'Low' })}
                </SelectItem>
                <SelectItem value='medium'>
                  {t('priority_medium', { default: 'Medium' })}
                </SelectItem>
                <SelectItem value='high'>
                  {t('priority_high', { default: 'High' })}
                </SelectItem>
                <SelectItem value='urgent'>
                  {t('priority_urgent', { default: 'Urgent' })}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='w-48'>
            <Label htmlFor='category'>
              {t('category', { default: 'Category' })}
            </Label>
            <Select
              value={filters.category?.[0] || 'all'}
              onValueChange={value =>
                setFilters.setCategory(
                  value === 'all' ? [] : [value as AllTicketCategory]
                )
              }
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={t('all_categories', {
                    default: 'All Categories',
                  })}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>
                  {t('all_categories', { default: 'All Categories' })}
                </SelectItem>
                <SelectItem value='maintenance'>
                  {t('category_maintenance', { default: 'Maintenance' })}
                </SelectItem>
                <SelectItem value='complaint'>
                  {t('category_complaint', { default: 'Complaint' })}
                </SelectItem>
                <SelectItem value='inquiry'>
                  {t('category_inquiry', { default: 'Inquiry' })}
                </SelectItem>
                <SelectItem value='billing'>
                  {t('category_billing', { default: 'Billing' })}
                </SelectItem>
                <SelectItem value='security'>
                  {t('category_security', { default: 'Security' })}
                </SelectItem>
                <SelectItem value='parking'>
                  {t('category_parking', { default: 'Parking' })}
                </SelectItem>
                <SelectItem value='noise'>
                  {t('category_noise', { default: 'Noise' })}
                </SelectItem>
                <SelectItem value='cleaning'>
                  {t('category_cleaning', { default: 'Cleaning' })}
                </SelectItem>
                <SelectItem value='other'>
                  {t('category_other', { default: 'Other' })}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
