'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useHelpdeskPermissions } from '../../hooks/use-helpdesk-permissions';

const createTicketSchema = (t: (key: string) => string, isAdmin: boolean) => {
  const base = z.object({
    title: z
      .string()
      .min(1, t('validation.title_required'))
      .max(200, t('validation.title_max_length')),
    description: z.string().min(1, t('validation.description_required')),
    category: z.enum([
      'maintenance',
      'complaint',
      'inquiry',
      'billing',
      'security',
      'parking',
      'noise',
      'cleaning',
      'other',
    ]),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
    buildingId: z.string().uuid().optional(),
    unitId: z.string().uuid().optional(),
    tags: z.array(z.string()).default([]),
  });

  const residentField = isAdmin
    ? {
        residentId: z
          .string()
          .nonempty(t('validation.resident_required'))
          .uuid(),
      }
    : { residentId: z.string().uuid().optional() };

  return base.extend(residentField);
};

type CreateTicketForm = z.infer<ReturnType<typeof createTicketSchema>>;

interface CreateTicketDialogProps {
  onClose: () => void;
  buildingId?: string;
}

export const CreateTicketDialog = ({
  onClose,
  buildingId,
  open = true,
}: CreateTicketDialogProps & { open?: boolean }) => {
  const t = useTranslations('helpDesk');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { isSyndicateAdmin } = useHelpdeskPermissions();

  // Dynamic schema based on user role
  const dynamicSchema = useMemo(
    () => createTicketSchema(t, isSyndicateAdmin),
    [isSyndicateAdmin, t]
  );

  const form = useForm({
    resolver: zodResolver(dynamicSchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'maintenance' as const,
      priority: 'medium' as const,
      buildingId: buildingId || undefined,
      unitId: undefined,
      residentId: undefined,
      tags: [],
    },
  }); // Only load buildings if buildingId is not provided
  const { data: buildings, isLoading: _buildingsLoading } = useQuery({
    ...trpc.buildings.getAll.queryOptions({
      page: 1,
      pageSize: 50, // Reduced from 100
    }),
    enabled: !buildingId, // Only load if buildingId is not provided
  });

  // Watch the selected building ID for units filtering
  const selectedBuildingId = form.watch('buildingId');
  // Only load units when a building is selected
  const { data: units, isLoading: _unitsLoading } = useQuery({
    ...trpc.units.getAll.queryOptions({
      page: 1,
      pageSize: 50, // Reduced from 100
    }),
    enabled: Boolean(selectedBuildingId || buildingId), // Only load when building is selected
  });

  // Load residents for managers to create tickets on behalf of residents
  const { data: residents, isLoading: _residentsLoading } = useQuery({
    ...trpc.residents.getAll.queryOptions({}),
    enabled: isSyndicateAdmin, // Only load for managers/admins
  });

  const createTicketMutation = useMutation(
    trpc.helpdesk.createTicket.mutationOptions({
      onSuccess: () => {
        toast.success(
          t('ticket_created', { default: 'Ticket created successfully' })
        );
        // Reset form and local state
        form.reset();
        setTags([]);
        setTagInput('');
        queryClient.invalidateQueries(
          trpc.helpdesk.getTickets.queryOptions({})
        );
        queryClient.invalidateQueries(trpc.helpdesk.getStats.queryOptions({}));
        onClose();
      },
      onError: error => {
        // Try to translate the error message if it's a known key, otherwise use the original message
        const errorMessage = error.message;
        let translatedMessage: string;

        try {
          translatedMessage = t(errorMessage, { default: errorMessage });
        } catch {
          translatedMessage = errorMessage;
        }

        toast.error(
          translatedMessage ||
            t('error_creating_ticket', { default: 'Error creating ticket' })
        );
      },
    })
  );

  const filteredUnits =
    units?.data?.filter(unit => unit.buildingId === selectedBuildingId) || [];

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      form.setValue('tags', newTags);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    form.setValue('tags', newTags);
  };

  const onSubmit = (data: CreateTicketForm) => {
    createTicketMutation.mutate({
      ...data,
      tags,
    });
  };
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={() => onClose()}
      title={t('create_new_ticket', { default: 'Create New Ticket' })}
      description={
        isSyndicateAdmin
          ? t('create_ticket_description_manager', {
              default:
                'As a property manager, you can create tickets on behalf of residents. Please select which resident this ticket is for.',
            })
          : t('create_ticket_description', {
              default:
                'Fill out the form below to create a new support ticket.',
            })
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('formTitleLabel', { default: 'Title' })}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('title_placeholder', {
                      default: 'Brief description of the issue',
                    })}
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
                <FormLabel>
                  {t('formDescriptionLabel', { default: 'Description' })}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t('description_placeholder', {
                      default:
                        'Please provide detailed information about your request or issue...',
                    })}
                    className='min-h-[100px]'
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
                  <FormLabel>
                    {t('category', { default: 'Category' })}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t('select_category', {
                            default: 'Select category',
                          })}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('priority', { default: 'Priority' })}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t('select_priority', {
                            default: 'Select priority',
                          })}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!buildingId && (
            <FormField
              control={form.control}
              name='buildingId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('building', { default: 'Building' })}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t('select_building', {
                            default: 'Select building (optional)',
                          })}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {buildings?.data?.map(building => (
                        <SelectItem key={building.id} value={building.id}>
                          {building.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {selectedBuildingId && filteredUnits.length > 0 && (
            <FormField
              control={form.control}
              name='unitId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('unit', { default: 'Unit' })}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t('select_unit', {
                            default: 'Select unit (optional)',
                          })}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredUnits.map(unit => (
                        <SelectItem key={unit.id} value={unit.id}>
                          {unit.unitNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {/* Resident selector - only for managers/admins */}
          {isSyndicateAdmin && (
            <>
              <FormField
                control={form.control}
                name='residentId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('resident', { default: 'Resident' })} *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t('select_resident', {
                              default: 'Select resident (required)',
                            })}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        
                        {residents?.data?.map(resident => (
                          <SelectItem key={resident.id} value={resident.id}>
                            {resident.firstName} {resident.lastName}
                            {resident.email && ` (${resident.email})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Information message for managers */}
              <div className='rounded-md border border-blue-200 bg-blue-50 p-3'>
                <p className='text-sm text-blue-800'>
                  {t('manager_ticket_info', {
                    default:
                      'Note: This ticket will be created on behalf of the selected resident. They will be able to view and respond to it from their account.',
                  })}
                </p>
              </div>
            </>
          )}
          {/* Tags */}
          <div>
            <Label htmlFor='tags'>{t('tags', { default: 'Tags' })}</Label>
            <div className='mt-1 flex items-center space-x-2'>
              <Input
                id='tags'
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                placeholder={t('add_tag', { default: 'Add tag...' })}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addTag}
              >
                {t('add', { default: 'Add' })}
              </Button>
            </div>
            {tags.length > 0 && (
              <div className='mt-2 flex flex-wrap gap-2'>
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant='secondary'
                    className='flex items-center space-x-1'
                  >
                    <span>{tag}</span>
                    <X
                      className='h-3 w-3 cursor-pointer'
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type='button' variant='outline' onClick={onClose}>
              {t('cancel', { default: 'Cancel' })}
            </Button>
            <Button type='submit' disabled={createTicketMutation.isPending}>
              {createTicketMutation.isPending
                ? t('creating', { default: 'Creating...' })
                : t('create_ticket', { default: 'Create Ticket' })}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ResponsiveDialog>
  );
}

