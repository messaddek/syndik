'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { X, Plus, AlertTriangle, Building, Users } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
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

export function CreateB2BTicketDialog({
  children,
  onSuccess,
  trigger,
  open: isOpen,
  onOpenChange,
}: CreateB2BTicketDialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  // Use external state if provided, otherwise use internal state
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };
  const [currentTag, setCurrentTag] = React.useState('');
  const trpc = useTRPC();

  const form = useForm<B2BTicketForm>({
    resolver: zodResolver(b2bTicketSchema),
    defaultValues: {
      priority: 'medium',
      urgencyLevel: 'medium',
      tags: [],
      syndicateInfo: {
        organizationSize: 'medium',
      },
    },
  });

  const createB2BTicket = useMutation(
    trpc.helpdesk.createB2BTicket.mutationOptions({
      onSuccess: () => {
        toast.success('B2B support ticket created successfully');
        form.reset();
        setOpen(false);
        onSuccess?.();
      },
      onError: (error: unknown) => {
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to create B2B ticket';
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
  return children || trigger ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children || trigger}</DialogTrigger>
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        title={
          <div className='flex items-center gap-2'>
            <AlertTriangle className='h-5 w-5 text-orange-500' />
            Create B2B Support Ticket
          </div>
        }
        description='Submit a ticket for support with the Syndik platform'
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Basic Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>Ticket Information</h3>

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
              />

              <div className='grid grid-cols-2 gap-4'>
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
            </div>
            {/* Business Impact */}
            <div className='space-y-4'>
              <h3 className='flex items-center gap-2 text-lg font-semibold'>
                <Building className='h-5 w-5' />
                Business Impact
              </h3>

              <div className='grid grid-cols-2 gap-4'>
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
                          min='1'
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
            </div>
            {/* Syndicate Information */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold'>
                Organization Information
              </h3>

              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='syndicateInfo.organizationName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Name *</FormLabel>
                      <FormControl>
                        <Input placeholder='Your syndicate name' {...field} />
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
                            Small (1-50 units)
                          </SelectItem>
                          <SelectItem value='medium'>
                            Medium (51-200 units)
                          </SelectItem>
                          <SelectItem value='large'>
                            Large (201-500 units)
                          </SelectItem>
                          <SelectItem value='enterprise'>
                            Enterprise (500+ units)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
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
                          placeholder='contact@syndicate.com'
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
                        <Input placeholder='Optional phone number' {...field} />
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
                        <Input placeholder='e.g., Pro, Enterprise' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Tags */}
            <div className='space-y-4'>
              <FormLabel>Tags (Optional)</FormLabel>
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
                <Button type='button' size='sm' onClick={addTag}>
                  <Plus className='h-4 w-4' />
                </Button>
              </div>

              {form.watch('tags').length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {form.watch('tags').map(tag => (
                    <Badge
                      key={tag}
                      variant='secondary'
                      className='flex items-center gap-1'
                    >
                      {tag}
                      <button
                        type='button'
                        onClick={() => removeTag(tag)}
                        className='ml-1 hover:text-red-500'
                      >
                        <X className='h-3 w-3' />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            {/* Submit */}
            <div className='flex justify-end gap-2 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={createB2BTicket.isPending}
                className='bg-orange-600 hover:bg-orange-700'
              >
                {createB2BTicket.isPending
                  ? 'Creating...'
                  : 'Create B2B Ticket'}
              </Button>
            </div>{' '}
          </form>
        </Form>{' '}
      </ResponsiveDialog>
    </Dialog>
  ) : (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title={
        <div className='flex items-center gap-2'>
          <AlertTriangle className='h-5 w-5 text-orange-500' />
          Create B2B Support Ticket
        </div>
      }
      description='Submit a ticket for support with the Syndik platform'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {/* Form content */}
          {/* Duplicate content to avoid space issues when trying to replace entire form content */}
          <div className='space-y-4'>
            {/* Submit */}
            <div className='flex justify-end gap-2 pt-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={createB2BTicket.isPending}
                className='bg-orange-600 hover:bg-orange-700'
              >
                {createB2BTicket.isPending
                  ? 'Creating...'
                  : 'Create B2B Ticket'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </ResponsiveDialog>
  );
}
