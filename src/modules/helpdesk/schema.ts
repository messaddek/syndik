import {
  pgTable,
  uuid,
  text,
  integer,
  timestamp,
  boolean,
  jsonb,
  index,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { buildings } from '../buildings/schema';
import { units } from '../units/schema';
import { residents } from '../residents/schema';

export const helpdeskTickets = pgTable(
  'helpdesk_tickets',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    orgId: text('org_id').notNull(),
    buildingId: uuid('building_id'),
    unitId: uuid('unit_id'),
    residentId: uuid('resident_id'),
    authorId: text('author_id').notNull(),
    title: text().notNull(),
    description: text().notNull(),
    category: text().notNull(), // maintenance, complaint, inquiry, billing, etc.
    priority: text().default('medium').notNull(), // low, medium, high, urgent
    status: text().default('open').notNull(), // open, in_progress, resolved, closed
    assignedTo: text('assigned_to'),
    // B2B Enhancement Fields
    isB2B: boolean('is_b2b').default(false).notNull(), // Flag to distinguish B2B tickets
    ticketType: text('ticket_type').default('internal').notNull(), // 'internal' or 'b2b'
    syndicateInfo: jsonb('syndicate_info'), // Store syndicate contact info for B2B tickets
    urgencyLevel: text('urgency_level'), // For B2B: 'low', 'medium', 'high', 'critical'
    businessImpact: text('business_impact'), // For B2B: impact description
    affectedUsers: integer('affected_users'), // For B2B: number of affected users
    tags: jsonb('tags'),
    attachments: jsonb('attachments'),
    estimatedResolution: timestamp('estimated_resolution', { mode: 'string' }),
    resolvedAt: timestamp('resolved_at', { mode: 'string' }),
    closedAt: timestamp('closed_at', { mode: 'string' }),
    lastResponseAt: timestamp('last_response_at', { mode: 'string' }),
    responseTime: integer('response_time'), // in minutes
    resolutionTime: integer('resolution_time'), // in minutes
    customerSatisfaction: integer('customer_satisfaction'), // 1-5 rating
    internalNotes: text('internal_notes'),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  table => [
    index('helpdesk_tickets_status_idx').using(
      'btree',
      table.status.asc().nullsLast().op('text_ops')
    ),
    index('helpdesk_tickets_priority_idx').using(
      'btree',
      table.priority.asc().nullsLast().op('text_ops')
    ),
    index('helpdesk_tickets_category_idx').using(
      'btree',
      table.category.asc().nullsLast().op('text_ops')
    ),
    index('helpdesk_tickets_assigned_to_idx').using(
      'btree',
      table.assignedTo.asc().nullsLast().op('text_ops')
    ),
    index('helpdesk_tickets_created_at_idx').using(
      'btree',
      table.createdAt.asc().nullsLast().op('timestamp_ops')
    ),
    index('helpdesk_tickets_is_b2b_idx').using(
      'btree',
      table.isB2B.asc().nullsLast().op('bool_ops')
    ),
    index('helpdesk_tickets_ticket_type_idx').using(
      'btree',
      table.ticketType.asc().nullsLast().op('text_ops')
    ),
    foreignKey({
      columns: [table.buildingId],
      foreignColumns: [buildings.id],
      name: 'helpdesk_tickets_building_id_buildings_id_fk',
    }).onDelete('set null'),
    foreignKey({
      columns: [table.unitId],
      foreignColumns: [units.id],
      name: 'helpdesk_tickets_unit_id_units_id_fk',
    }).onDelete('set null'),
    foreignKey({
      columns: [table.residentId],
      foreignColumns: [residents.id],
      name: 'helpdesk_tickets_resident_id_residents_id_fk',
    }).onDelete('set null'),
  ]
);

export const helpdeskComments = pgTable(
  'helpdesk_comments',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    ticketId: uuid('ticket_id').notNull(),
    authorId: text('author_id').notNull(),
    content: text().notNull(),
    isInternal: boolean('is_internal').default(false).notNull(),
    attachments: jsonb('attachments'),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  table => [
    index('helpdesk_comments_ticket_id_idx').using(
      'btree',
      table.ticketId.asc().nullsLast().op('uuid_ops')
    ),
    index('helpdesk_comments_created_at_idx').using(
      'btree',
      table.createdAt.asc().nullsLast().op('timestamp_ops')
    ),
    foreignKey({
      columns: [table.ticketId],
      foreignColumns: [helpdeskTickets.id],
      name: 'helpdesk_comments_ticket_id_helpdesk_tickets_id_fk',
    }).onDelete('cascade'),
  ]
);

export const helpdeskCategories = pgTable(
  'helpdesk_categories',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    orgId: text('org_id').notNull(),
    name: text().notNull(),
    description: text(),
    color: text(),
    icon: text(),
    isActive: boolean('is_active').default(true).notNull(),
    defaultPriority: text('default_priority').default('medium').notNull(),
    defaultAssignee: text('default_assignee'),
    autoResponseTemplate: text('auto_response_template'),
    estimatedResponseTime: integer('estimated_response_time'), // in minutes
    sortOrder: integer('sort_order').default(0).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  table => [
    index('helpdesk_categories_org_id_idx').using(
      'btree',
      table.orgId.asc().nullsLast().op('text_ops')
    ),
    index('helpdesk_categories_sort_order_idx').using(
      'btree',
      table.sortOrder.asc().nullsLast().op('int4_ops')
    ),
  ]
);

export const helpdeskKnowledgeBase = pgTable(
  'helpdesk_knowledge_base',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    orgId: text('org_id').notNull(),
    title: text().notNull(),
    content: text().notNull(),
    categoryId: uuid('category_id'),
    tags: jsonb('tags'),
    isPublished: boolean('is_published').default(false).notNull(),
    views: integer().default(0).notNull(),
    votes: integer().default(0).notNull(),
    authorId: text('author_id').notNull(),
    lastEditedBy: text('last_edited_by'),
    publishedAt: timestamp('published_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  table => [
    index('helpdesk_kb_published_idx').using(
      'btree',
      table.isPublished.asc().nullsLast().op('bool_ops')
    ),
    index('helpdesk_kb_category_idx').using(
      'btree',
      table.categoryId.asc().nullsLast().op('uuid_ops')
    ),
    index('helpdesk_kb_org_id_idx').using(
      'btree',
      table.orgId.asc().nullsLast().op('text_ops')
    ),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [helpdeskCategories.id],
      name: 'helpdesk_kb_category_id_helpdesk_categories_id_fk',
    }).onDelete('set null'),
  ]
);

export const helpdeskTemplates = pgTable(
  'helpdesk_templates',
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    orgId: text('org_id').notNull(),
    name: text().notNull(),
    subject: text().notNull(),
    content: text().notNull(),
    type: text().notNull(), // auto_response, resolution, escalation, etc.
    categoryId: uuid('category_id'),
    isActive: boolean('is_active').default(true).notNull(),
    variables: jsonb('variables'), // placeholders like {{customer_name}}, {{ticket_id}}
    createdAt: timestamp('created_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  table => [
    index('helpdesk_templates_type_idx').using(
      'btree',
      table.type.asc().nullsLast().op('text_ops')
    ),
    index('helpdesk_templates_category_idx').using(
      'btree',
      table.categoryId.asc().nullsLast().op('uuid_ops')
    ),
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [helpdeskCategories.id],
      name: 'helpdesk_templates_category_id_helpdesk_categories_id_fk',
    }).onDelete('set null'),
  ]
);

// B2B Enhanced Zod Schemas
export const createB2BTicketSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
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
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  urgencyLevel: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  businessImpact: z.string().min(1, 'Business impact description is required'),
  affectedUsers: z.number().min(1, 'Number of affected users is required'),
  syndicateInfo: z.object({
    organizationName: z.string().min(1),
    contactName: z.string().min(1),
    contactEmail: z.string().email(),
    contactPhone: z.string().optional(),
    organizationSize: z.enum(['small', 'medium', 'large', 'enterprise']),
    subscriptionTier: z.string().optional(),
  }),
  tags: z.array(z.string()).default([]),
  attachments: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
        type: z.string(),
        size: z.number(),
      })
    )
    .default([]),
});

export const createInternalTicketSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
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
  residentId: z.string().uuid().optional(),
  tags: z.array(z.string()).default([]),
  attachments: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
        type: z.string(),
        size: z.number(),
      })
    )
    .default([]),
});

export const ticketFilterSchema = z.object({
  ticketType: z.enum(['internal', 'b2b', 'all']).default('all'),
  status: z
    .array(z.enum(['open', 'in_progress', 'resolved', 'closed']))
    .optional(),
  priority: z.array(z.enum(['low', 'medium', 'high', 'urgent'])).optional(),
  category: z.array(z.string()).optional(),
  assignedTo: z.array(z.string()).optional(),
  buildingId: z.string().uuid().optional(),
  unitId: z.string().uuid().optional(),
  dateRange: z
    .object({
      from: z.string(),
      to: z.string(),
    })
    .optional(),
  urgencyLevel: z
    .array(z.enum(['low', 'medium', 'high', 'critical']))
    .optional(),
  businessImpact: z.string().optional(),
});

// Export the enhanced ticket schema
export type CreateB2BTicketInput = z.infer<typeof createB2BTicketSchema>;
export type CreateInternalTicketInput = z.infer<
  typeof createInternalTicketSchema
>;
export type TicketFilterInput = z.infer<typeof ticketFilterSchema>;
