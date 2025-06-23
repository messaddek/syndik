'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Building,
  MapPin,
  Calendar,
  MessageSquare,
  Send,
  X,
  Edit,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { TicketStatus, TicketPriority } from '../../types';

interface TicketDetailsProps {
  ticketId: string;
  onClose: () => void;
}

export const TicketDetails = ({ ticketId, onClose }: TicketDetailsProps) => {
  const t = useTranslations('helpDesk');
  const [commentContent, setCommentContent] = useState('');
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // Handle escape key to cancel editing
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditingStatus(false);
        setIsEditingPriority(false);
      }
    };

    if (isEditingStatus || isEditingPriority) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isEditingStatus, isEditingPriority]);

  const {
    data: ticket,
    isLoading,
    error,
  } = useQuery(
    trpc.helpdesk.getTicket.queryOptions({
      id: ticketId,
    })
  );

  const updateTicketMutation = useMutation(
    trpc.helpdesk.updateTicket.mutationOptions({
      onSuccess: () => {
        toast.success(
          t('ticket_updated', { default: 'Ticket updated successfully' })
        );
        queryClient.invalidateQueries(
          trpc.helpdesk.getTicket.queryOptions({ id: ticketId })
        );
        queryClient.invalidateQueries(
          trpc.helpdesk.getTickets.queryOptions({})
        );
        queryClient.invalidateQueries(trpc.helpdesk.getStats.queryOptions({}));
        setIsEditingStatus(false);
        setIsEditingPriority(false);
      },
      onError: error => {
        toast.error(
          error.message ||
            t('error_updating_ticket', { default: 'Error updating ticket' })
        );
      },
    })
  );

  const addCommentMutation = useMutation(
    trpc.helpdesk.addComment.mutationOptions({
      onSuccess: () => {
        toast.success(
          t('comment_added', { default: 'Comment added successfully' })
        );
        queryClient.invalidateQueries(
          trpc.helpdesk.getTicket.queryOptions({ id: ticketId })
        );
        setCommentContent('');
      },
      onError: error => {
        toast.error(
          error.message ||
            t('error_adding_comment', { default: 'Error adding comment' })
        );
      },
    })
  );

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusUpdate = (newStatus: TicketStatus) => {
    updateTicketMutation.mutate({
      id: ticketId,
      status: newStatus,
    });
  };

  const handlePriorityUpdate = (newPriority: TicketPriority) => {
    updateTicketMutation.mutate({
      id: ticketId,
      priority: newPriority,
    });
  };

  const handleAddComment = () => {
    if (!commentContent.trim()) return;

    addCommentMutation.mutate({
      ticketId,
      content: commentContent.trim(),
      isInternal: false,
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-6 w-48' />
            <Skeleton className='h-4 w-4' />
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-20 w-full' />
        </CardContent>
      </Card>
    );
  }

  if (error || !ticket) {
    return (
      <Card>
        <CardContent className='flex h-64 items-center justify-center'>
          <div className='text-center'>
            <MessageSquare className='text-muted-foreground mx-auto h-12 w-12' />
            <h3 className='text-muted-foreground mt-2 text-sm font-medium'>
              {t('error_loading_ticket', { default: 'Error loading ticket' })}
            </h3>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between'>
          <div className='flex-1'>
            <CardTitle className='line-clamp-2 pr-4 text-lg'>
              {ticket.title}
            </CardTitle>
            <div className='mt-2 flex items-center space-x-2'>
              {isEditingStatus ? (
                <div className='flex items-center space-x-2'>
                  <Select
                    value={ticket.status}
                    onValueChange={value =>
                      handleStatusUpdate(value as TicketStatus)
                    }
                    onOpenChange={open => {
                      if (!open) {
                        // Cancel editing when select closes without selection
                        setIsEditingStatus(false);
                      }
                    }}
                  >
                    <SelectTrigger className='w-32' size='xs'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='open'>
                        {t('status_open', { default: 'Open' })}
                      </SelectItem>
                      <SelectItem value='in_progress'>
                        {t('status_in_progress', { default: 'In Progress' })}
                      </SelectItem>
                      <SelectItem value='resolved'>
                        {t('status_resolved', { default: 'Resolved' })}
                      </SelectItem>
                      <SelectItem value='closed'>
                        {t('status_closed', { default: 'Closed' })}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setIsEditingStatus(false)}
                    className='h-8 w-8 p-0'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              ) : (
                <Badge
                  className={cn(
                    'cursor-pointer',
                    getStatusColor(ticket.status as TicketStatus)
                  )}
                  onClick={() => setIsEditingStatus(true)}
                >
                  {t(`status_${ticket.status}`, {
                    default: ticket.status.replace('_', ' '),
                  })}
                  <Edit className='ml-1 h-3 w-3' />
                </Badge>
              )}
              {isEditingPriority ? (
                <div className='flex items-center space-x-2'>
                  <Select
                    value={ticket.priority}
                    onValueChange={value =>
                      handlePriorityUpdate(value as TicketPriority)
                    }
                    onOpenChange={open => {
                      if (!open) {
                        // Cancel editing when select closes without selection
                        setIsEditingPriority(false);
                      }
                    }}
                  >
                    <SelectTrigger className='w-32' size='xs'>
                      <SelectValue />
                    </SelectTrigger>
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
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setIsEditingPriority(false)}
                    className='h-8 w-8 p-0'
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              ) : (
                <Badge
                  className={cn(
                    'cursor-pointer',
                    getPriorityColor(ticket.priority as TicketPriority)
                  )}
                  onClick={() => setIsEditingPriority(true)}
                >
                  {t(`priority_${ticket.priority}`, {
                    default: ticket.priority,
                  })}
                  <Edit className='ml-1 h-3 w-3' />
                </Badge>
              )}
            </div>
          </div>
          <Button variant='ghost' size='sm' onClick={onClose}>
            <X className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* Ticket Info */}
        <div className='grid grid-cols-1 gap-3 text-sm'>
          <div className='flex items-center space-x-2'>
            <User className='text-muted-foreground h-4 w-4' />
            <span className='text-muted-foreground'>
              {t('created_by', { default: 'Created by' })}:
            </span>
            <span>
              {ticket.author?.name || ticket.author?.email || ticket.authorId}
            </span>
          </div>
          <div className='flex items-center space-x-2'>
            <Calendar className='text-muted-foreground h-4 w-4' />
            <span className='text-muted-foreground'>
              {t('created_at', { default: 'Created' })}:
            </span>
            <span>
              {format(new Date(ticket.createdAt), 'MMM dd, yyyy HH:mm')}
            </span>
          </div>
          {ticket.building && (
            <div className='flex items-center space-x-2'>
              <Building className='text-muted-foreground h-4 w-4' />
              <span className='text-muted-foreground'>
                {t('building', { default: 'Building' })}:
              </span>
              <span>{ticket.building.name}</span>
            </div>
          )}
          {ticket.unitId && (
            <div className='flex items-center space-x-2'>
              <MapPin className='text-muted-foreground h-4 w-4' />
              <span className='text-muted-foreground'>
                {t('unit', { default: 'Unit' })}:
              </span>
              <span>
                {ticket.unitNumber
                  ? `${ticket.unitNumber}${ticket.unitFloor ? ` (Floor ${ticket.unitFloor})` : ''}`
                  : ticket.unitId}
              </span>
            </div>
          )}
        </div>

        <Separator />

        {/* Description */}
        <div>
          <h4 className='mb-2 font-medium'>
            {t('description', { default: 'Description' })}
          </h4>
          <p className='text-muted-foreground text-sm whitespace-pre-wrap'>
            {ticket.description}
          </p>
        </div>

        {/* Tags */}
        {ticket.tags && ticket.tags.length > 0 && (
          <div>
            <h4 className='mb-2 font-medium'>
              {t('tags', { default: 'Tags' })}
            </h4>
            <div className='flex flex-wrap gap-2'>
              {ticket.tags.map((tag, index) => (
                <Badge key={index} variant='outline'>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Comments */}
        <div>
          <h4 className='mb-3 font-medium'>
            {t('comments', { default: 'Comments' })} (
            {ticket.comments?.length || 0})
          </h4>

          <ScrollArea className='mb-4 h-64'>
            <div className='space-y-3'>
              {ticket.comments && ticket.comments.length > 0 ? (
                ticket.comments.map(comment => (
                  <div
                    key={comment.id}
                    className='space-y-2 rounded-lg border p-3'
                  >
                    <div className='text-muted-foreground flex items-center justify-between text-xs'>
                      <div className='flex items-center space-x-2'>
                        <User className='h-3 w-3' />
                        <span>{comment.authorId}</span>
                        {comment.isInternal && (
                          <Badge variant='secondary' className='text-xs'>
                            {t('internal', { default: 'Internal' })}
                          </Badge>
                        )}
                      </div>
                      <span>
                        {format(new Date(comment.createdAt), 'MMM dd, HH:mm')}
                      </span>
                    </div>
                    <p className='text-sm whitespace-pre-wrap'>
                      {comment.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className='text-muted-foreground py-4 text-center text-sm'>
                  {t('no_comments', { default: 'No comments yet' })}
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Add Comment */}
          <div className='space-y-2'>
            <Textarea
              placeholder={t('add_comment_placeholder', {
                default: 'Add a comment...',
              })}
              value={commentContent}
              onChange={e => setCommentContent(e.target.value)}
              className='min-h-[80px]'
            />
            <div className='flex justify-end'>
              <Button
                size='sm'
                onClick={handleAddComment}
                disabled={
                  !commentContent.trim() || addCommentMutation.isPending
                }
              >
                <Send className='mr-1 h-3 w-3' />
                {addCommentMutation.isPending
                  ? t('sending', { default: 'Sending...' })
                  : t('send', { default: 'Send' })}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
