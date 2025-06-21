'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, Plus, AlertTriangle, Building, Users, Loader2 } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

// B2B Ticket Creation Schema with proper defaults
const b2bTicketSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  category: z.enum([
    'technical_issue',
    'feature_request',
    'billing_inquiry',
    'account_management',
    'performance_issue',
    'security_concern',
    'integration_support',
    'training_request',
    'other',
  ]),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  urgencyLevel: z.enum(['low', 'medium', 'high', 'critical']),
  businessImpact: z.string().min(1, 'Business impact description is required'),
  affectedUsers: z.coerce
    .number()
    .min(1, 'Number of affected users is required'),
  syndicateInfo: z.object({
    organizationName: z.string().min(1, 'Organization name is required'),
    contactName: z.string().min(1, 'Contact name is required'),
    contactEmail: z.string().email('Valid email is required'),
    contactPhone: z.string().optional(),
    organizationSize: z.enum(['small', 'medium', 'large', 'enterprise']),
    subscriptionTier: z.string().optional(),
  }),
  tags: z.array(z.string()),
});

type B2BTicketForm = z.infer<typeof b2bTicketSchema>;

interface CreateB2BTicketDialogProps {
  children?: React.ReactNode;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const categoryLabels = {
  technical_issue: 'Technical Issue',
  feature_request: 'Feature Request',
  billing_inquiry: 'Billing Inquiry',
  account_management: 'Account Management',
  performance_issue: 'Performance Issue',
  security_concern: 'Security Concern',
  integration_support: 'Integration Support',
  training_request: 'Training Request',
  other: 'Other',
};

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

const urgencyColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800',
};

export const CreateB2BTicketDialog = ({
  children,
  onSuccess,
  trigger,
  open: isOpen,
  onOpenChange,
}: CreateB2BTicketDialogProps) => {
  const t = useTranslations('helpDesk');
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [currentTag, setCurrentTag] = React.useState('');
  const trpc = useTRPC();
  const { user } = useUser();
  const queryClient = useQueryClient();

  // Fetch organization and account data to prefill form
  const { data: account, isLoading: accountLoading } = useQuery(
    trpc.accounts.getCurrentAccount.queryOptions()
  );

  const { data: organization, isLoading: organizationLoading } = useQuery(
    trpc.organizations.getCurrentOrganization.queryOptions()
  );

  const { data: statistics, isLoading: statisticsLoading } = useQuery(
    trpc.organizations.getStatistics.queryOptions()
  );

  // Use external state if provided, otherwise use internal state
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };

  const form = useForm<B2BTicketForm>({
    resolver: zodResolver(b2bTicketSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'technical_issue',
      priority: 'medium',
      urgencyLevel: 'medium',
      affectedUsers: 1,
      businessImpact: '',
      tags: [],
      syndicateInfo: {
        organizationName: '',
        organizationSize: 'medium',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        subscriptionTier: 'professional',
      },
    },
  });

  // Update form when data loads from tRPC
  React.useEffect(() => {
    if (!accountLoading && !organizationLoading && !statisticsLoading) {
      // Calculate organization size based on units
      const units = statistics?.totalUnits || 0;
      let orgSize: 'small' | 'medium' | 'large' | 'enterprise' = 'medium';
      if (units <= 10) orgSize = 'small';
      else if (units <= 50) orgSize = 'medium';
      else if (units <= 200) orgSize = 'large';
      else orgSize = 'enterprise';

      // Get user's full name
      const fullName =
        user?.fullName ||
        `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

      // Update form with real data
      form.reset({
        title: 'Payment Processing Issues in Resident Portal',
        description:
          'Several residents are reporting difficulties when trying to make online payments through the resident portal. The payment form appears to freeze after entering credit card information, and transactions are not being processed successfully.',
        category: 'technical_issue',
        priority: 'medium',
        urgencyLevel: 'medium',
        affectedUsers: statistics?.totalResidents || 15,
        businessImpact:
          'This issue is preventing residents from making their monthly payments online, forcing them to use alternative payment methods and causing delays in rent collection.',
        tags: ['payment', 'portal', 'urgent'],
        syndicateInfo: {
          organizationName:
            organization?.name ||
            account?.organizationName ||
            'My Organization',
          organizationSize: orgSize,
          contactName: fullName || 'Contact Name',
          contactEmail:
            user?.emailAddresses?.[0]?.emailAddress ||
            account?.email ||
            'contact@organization.com',
          contactPhone:
            user?.phoneNumbers?.[0]?.phoneNumber || '+33 1 23 45 67 89',
          subscriptionTier: 'professional',
        },
      });
    }
  }, [
    user,
    account,
    organization,
    statistics,
    accountLoading,
    organizationLoading,
    statisticsLoading,
    form,
  ]);
  const createB2BTicket = useMutation(
    trpc.helpdesk.createB2BTicket.mutationOptions({
      onSuccess: () => {
        toast.success(t('ticket_created'));
        form.reset();
        setOpen(false);

        // Invalidate queries to refresh the tickets list
        queryClient.invalidateQueries(
          trpc.helpdesk.getAllTickets.queryOptions({})
        );

        onSuccess?.();
      },
      onError: (error: unknown) => {
        const message =
          error instanceof Error ? error.message : t('error_creating_ticket');
        toast.error(message);
      },
    })
  );

  const onSubmit = (data: B2BTicketForm) => {
    createB2BTicket.mutate(data);
  };

  const addTag = () => {
    if (currentTag.trim()) {
      const currentTags = form.getValues('tags');
      if (!currentTags.includes(currentTag.trim())) {
        form.setValue('tags', [...currentTags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags');
    form.setValue(
      'tags',
      currentTags.filter(tag => tag !== tagToRemove)
    );
  };
  const FormContent = () => {
    // Show loading state while fetching data
    if (accountLoading || organizationLoading || statisticsLoading) {
      return (
        <div className='flex min-h-[400px] items-center justify-center'>
          <div className='space-y-4 text-center'>
            <Loader2 className='text-primary mx-auto h-8 w-8 animate-spin' />
            <p className='text-muted-foreground text-sm'>
              Loading organization information...
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className='max-h-[70vh] overflow-y-auto px-1'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            {/* Basic Information */}
            <div className='space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-6'>
              <h3 className='border-b border-gray-200 pb-2 text-lg font-semibold text-gray-900'>
                {t('ticket_information')}
              </h3>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Brief description of the issue'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Detailed description of the issue, steps to reproduce, expected behavior, etc.'
                        className='min-h-[120px]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{' '}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select category' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(categoryLabels).map(
                            ([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='priority'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select priority' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(priorityColors).map(([value]) => (
                            <SelectItem key={value} value={value}>
                              <Badge
                                className={
                                  priorityColors[
                                    value as keyof typeof priorityColors
                                  ]
                                }
                              >
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                              </Badge>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>{' '}
            {/* Business Impact */}
            <div className='space-y-4 rounded-lg border border-orange-200 bg-orange-50 p-6'>
              <h3 className='flex items-center gap-2 border-b border-orange-200 pb-2 text-lg font-semibold text-orange-900'>
                <Building className='h-5 w-5 text-orange-600' />
                Business Impact
              </h3>{' '}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='urgencyLevel'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency Level *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select urgency' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(urgencyColors).map(([value]) => (
                            <SelectItem key={value} value={value}>
                              <Badge
                                className={
                                  urgencyColors[
                                    value as keyof typeof urgencyColors
                                  ]
                                }
                              >
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                              </Badge>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='affectedUsers'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='flex items-center gap-2'>
                        <Users className='h-4 w-4' />
                        Affected Users *
                      </FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='Number of affected users'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='businessImpact'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Impact Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Describe how this issue impacts your business operations, revenue, or user experience'
                        className='min-h-[80px]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>{' '}
            {/* Syndicate Information */}
            <div className='space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-6'>
              <h3 className='border-b border-blue-200 pb-2 text-lg font-semibold text-blue-900'>
                Organization Information
              </h3>{' '}
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='syndicateInfo.organizationName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Your organization name'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='syndicateInfo.organizationSize'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Size *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select size' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='small'>
                            Small (1-10 units)
                          </SelectItem>
                          <SelectItem value='medium'>
                            Medium (11-50 units)
                          </SelectItem>
                          <SelectItem value='large'>
                            Large (51-200 units)
                          </SelectItem>
                          <SelectItem value='enterprise'>
                            Enterprise (200+ units)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <FormField
                  control={form.control}
                  name='syndicateInfo.contactName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Primary contact person'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='syndicateInfo.contactEmail'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email *</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='contact@example.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='syndicateInfo.contactPhone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input
                          type='tel'
                          placeholder='+1 (555) 123-4567'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='syndicateInfo.subscriptionTier'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Tier</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='e.g., Basic, Premium, Enterprise'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>{' '}
            {/* Tags */}
            <div className='space-y-4 rounded-lg border border-green-200 bg-green-50 p-6'>
              <FormLabel className='block border-b border-green-200 pb-2 text-lg font-semibold text-green-900'>
                Tags (Optional)
              </FormLabel>
              <div className='flex gap-2'>
                <Input
                  placeholder='Add a tag'
                  value={currentTag}
                  onChange={e => setCurrentTag(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                />
                <Button type='button' variant='outline' onClick={addTag}>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>

              {form.watch('tags').length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {form.watch('tags').map((tag, index) => (
                    <Badge
                      key={index}
                      variant='secondary'
                      className='flex items-center gap-1'
                    >
                      {tag}
                      <X
                        className='h-3 w-3 cursor-pointer'
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>{' '}
            {/* Submit */}
            <div className='mt-6 flex justify-end gap-2 border-t border-gray-200 pt-6'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
              >
                {t('cancel')}
              </Button>
              <Button
                type='submit'
                disabled={createB2BTicket.isPending}
                className='bg-orange-600 hover:bg-orange-700'
              >
                {createB2BTicket.isPending
                  ? t('creating')
                  : t('create_b2b_ticket_button')}
              </Button>{' '}
            </div>
          </form>
        </Form>
      </div>
    );
  };

  return children || trigger ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children || trigger}</DialogTrigger>
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        title={
          <div className='flex items-center gap-2'>
            <AlertTriangle className='h-5 w-5 text-orange-500' />
            {t('b2b_ticket_title')}
          </div>
        }
        description={t('b2b_ticket_description')}
        className='sm:max-w-4xl'
      >
        <FormContent />
      </ResponsiveDialog>
    </Dialog>
  ) : (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title={
        <div className='flex items-center gap-2'>
          <AlertTriangle className='h-5 w-5 text-orange-500' />
          {t('b2b_ticket_title')}
        </div>
      }
      description={t('b2b_ticket_description')}
      className='sm:max-w-4xl'
    >
      <FormContent />
    </ResponsiveDialog>
  );
};
