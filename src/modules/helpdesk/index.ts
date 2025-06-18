export { HelpdeskView } from './ui/views/helpdesk-view';
export { TicketsList } from './ui/components/tickets-list';
export { CreateTicketDialog } from './ui/components/create-ticket-dialog';
export { TicketDetails } from './ui/components/ticket-details';
export { HelpdeskStats } from './ui/components/helpdesk-stats';
export { loadHelpdeskSearchParams } from './params';
// export { useHelpdeskCache } from './hooks/use-helpdesk-cache';

export type {
  HelpdeskTicket,
  HelpdeskComment,
  HelpdeskCategory,
  HelpdeskKnowledgeBase,
  HelpdeskTemplate,
  TicketFilters,
  TicketStats,
  TicketStatus,
  TicketPriority,
  TicketCategory,
  B2BTicketCategory,
  AllTicketCategory,
  TicketAttachment,
  GetTicketsResponse,
  GetStatsResponse,
  Pagination,
} from './types';
