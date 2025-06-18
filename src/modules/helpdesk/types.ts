export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory =
  | 'maintenance'
  | 'complaint'
  | 'inquiry'
  | 'billing'
  | 'security'
  | 'parking'
  | 'noise'
  | 'cleaning'
  | 'other';

export type B2BTicketCategory =
  | 'technical_issue'
  | 'feature_request'
  | 'billing_inquiry'
  | 'account_management'
  | 'performance_issue'
  | 'security_concern'
  | 'integration_support'
  | 'training_request'
  | 'other';

export type AllTicketCategory = TicketCategory | B2BTicketCategory;

export interface HelpdeskTicket {
  id: string;
  orgId: string;
  buildingId: string | null;
  unitId: string | null;
  residentId: string | null;
  authorId: string;
  title: string;
  description: string;
  category: AllTicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: string | null;
  tags: string[];
  attachments: TicketAttachment[];
  estimatedResolution: string | null;
  resolvedAt: string | null;
  closedAt: string | null;
  lastResponseAt: string | null;
  responseTime: number | null; // in minutes
  resolutionTime: number | null; // in minutes
  customerSatisfaction: number | null; // 1-5 rating
  internalNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TicketAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface HelpdeskComment {
  id: string;
  ticketId: string;
  authorId: string;
  content: string;
  isInternal: boolean;
  attachments: TicketAttachment[];
  createdAt: string;
  updatedAt: string;
}

export interface HelpdeskCategory {
  id: string;
  orgId: string;
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  isActive: boolean;
  defaultPriority: TicketPriority;
  defaultAssignee: string | null;
  autoResponseTemplate: string | null;
  estimatedResponseTime: number | null; // in minutes
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface HelpdeskKnowledgeBase {
  id: string;
  orgId: string;
  title: string;
  content: string;
  categoryId: string | null;
  tags: string[];
  isPublished: boolean;
  views: number;
  votes: number;
  authorId: string;
  lastEditedBy: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface HelpdeskTemplate {
  id: string;
  orgId: string;
  name: string;
  subject: string;
  content: string;
  type: 'auto_response' | 'resolution' | 'escalation' | 'follow_up';
  categoryId: string | null;
  isActive: boolean;
  variables: string[]; // placeholders like {{customer_name}}, {{ticket_id}}
  createdAt: string;
  updatedAt: string;
}

export interface TicketFilters {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  category?: AllTicketCategory[];
  assignedTo?: string[];
  buildingId?: string;
  unitId?: string;
  dateRange?: {
    from: string;
    to: string;
  };
}

export interface TicketStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  avgResponseTime: number; // in minutes
  avgResolutionTime: number; // in minutes
  satisfactionScore: number; // average 1-5 rating
}

export interface GetTicketsResponse {
  tickets: HelpdeskTicket[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface GetStatsResponse {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
  avgResponseTime: number; // in minutes
  avgResolutionTime: number; // in minutes
  satisfactionScore: number; // average 1-5 rating
}

export interface Pagination {
  page: number;
  limit: number;
}
