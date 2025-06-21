import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, User, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type {
  TicketStatus,
  TicketPriority,
  TicketAttachment,
} from '../../types';

interface TicketsListProps {
  tickets: Array<{
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    category: string;
    buildingId: string | null;
    unitId?: string | null;
    residentId?: string | null;
    authorId: string;
    author: {
      id: string;
      name: string;
      email: string;
    };
    building: {
      id: string;
      name: string;
      address: string;
    } | null;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    attachments: TicketAttachment[];
  }>;
  onSelectTicket: (ticketId: string) => void;
  selectedTicketId: string | null;
}

export const TicketsList = ({
  tickets,
  onSelectTicket,
  selectedTicketId,
}: TicketsListProps) => {
  const t = useTranslations('helpDesk');

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

  if (tickets.length === 0) {
    return (
      <div className='py-8 text-center'>
        <MessageSquare className='text-muted-foreground mx-auto h-12 w-12' />
        <h3 className='text-muted-foreground mt-2 text-sm font-medium'>
          {t('no_tickets', { default: 'No tickets found' })}
        </h3>
        <p className='text-muted-foreground mt-1 text-sm'>
          {t('no_tickets_description', {
            default: 'No tickets match your current filters.',
          })}
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className='h-[600px]'>
      <div className='space-y-4'>
        {tickets.map(ticket => (
          <div
            key={ticket.id}
            className={cn(
              'hover:bg-muted/50 cursor-pointer rounded-lg border p-4 transition-colors',
              selectedTicketId === ticket.id && 'bg-muted border-primary'
            )}
            onClick={() => onSelectTicket(ticket.id)}
          >
            <div className='mb-2 flex items-start justify-between'>
              <h3 className='line-clamp-1 text-sm font-medium'>
                {ticket.title}
              </h3>
              <div className='ml-2 flex items-center space-x-2'>
                <Badge
                  variant='outline'
                  className={cn(
                    'text-xs',
                    getPriorityColor(ticket.priority as TicketPriority)
                  )}
                >
                  {t(`priority_${ticket.priority}`, {
                    default: ticket.priority,
                  })}
                </Badge>
                <Badge
                  variant='outline'
                  className={cn(
                    'text-xs',
                    getStatusColor(ticket.status as TicketStatus)
                  )}
                >
                  {t(`status_${ticket.status}`, {
                    default: ticket.status.replace('_', ' '),
                  })}
                </Badge>
              </div>
            </div>
            <p className='text-muted-foreground mb-3 line-clamp-2 text-sm'>
              {ticket.description}
            </p>
            <div className='text-muted-foreground flex items-center justify-between text-xs'>
              <div className='flex items-center space-x-3'>
                <div className='flex items-center space-x-1'>
                  <User className='h-3 w-3' />
                  <span>
                    {ticket.author.name ||
                      ticket.author.email.split('@')[0] ||
                      ticket.authorId.substring(0, 8)}
                  </span>
                </div>
                {ticket.building && (
                  <div className='flex items-center space-x-1'>
                    <MapPin className='h-3 w-3' />
                    <span>{ticket.building.name}</span>
                  </div>
                )}
                <div className='flex items-center space-x-1'>
                  <Calendar className='h-3 w-3' />
                  <span>{format(new Date(ticket.createdAt), 'MMM dd')}</span>
                </div>
              </div>
              <div className='flex items-center space-x-1'>
                <Clock className='h-3 w-3' />
                <span>{format(new Date(ticket.updatedAt), 'HH:mm')}</span>
              </div>
            </div>
            <div className='mt-2 flex items-center justify-between'>
              <Badge variant='secondary' className='text-xs'>
                {t(`category_${ticket.category}`, { default: ticket.category })}
              </Badge>
              {/* Remove tags section for now since it's not in our schema */}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
