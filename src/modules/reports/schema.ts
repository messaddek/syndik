import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { buildings } from '../buildings/schema';
import { accounts } from '../accounts/schema';

export const reportTypeEnum = pgEnum('report_type', [
  'monthly-summary',
  'payment-status',
  'expense-breakdown',
  'property-performance',
  'yearly-comparison',
  'tax-report',
]);

export const reportStatusEnum = pgEnum('report_status', [
  'generating',
  'completed',
  'failed',
]);

export const reportFormatEnum = pgEnum('report_format', [
  'pdf',
  'excel',
  'csv',
]);

export const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  orgId: text('org_id').notNull(),
  buildingId: uuid('building_id').references(() => buildings.id, {
    onDelete: 'set null',
  }),

  // Report details
  type: reportTypeEnum('type').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  status: reportStatusEnum('status').notNull().default('generating'),
  format: reportFormatEnum('format').notNull().default('pdf'),

  // Report parameters
  parameters: jsonb('parameters').$type<{
    startDate?: string;
    endDate?: string;
    period?: string;
    buildingIds?: string[];
    includeCharts?: boolean;
    currency?: string;
  }>(),

  // Report data (actual content)
  reportData: jsonb('report_data'),

  // File details
  fileName: varchar('file_name', { length: 255 }),
  fileSize: integer('file_size'), // in bytes
  downloadUrl: varchar('download_url', { length: 500 }),

  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  expiresAt: timestamp('expires_at'), // Auto-delete after expiry

  // Metadata
  generatedBy: text('generated_by'), // User ID who generated the report
  downloadCount: integer('download_count').default(0),
});

export const reportTemplates = pgTable('report_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  orgId: text('org_id').notNull(),

  name: varchar('name', { length: 255 }).notNull(),
  type: reportTypeEnum('type').notNull(),
  description: text('description'),

  // Template configuration
  config: jsonb('config').$type<{
    fields: string[];
    groupBy?: string[];
    filters?: Record<string, unknown>;
    chartTypes?: string[];
    styling?: Record<string, unknown>;
  }>(),

  isDefault: integer('is_default').default(0), // 1 for default template
  isActive: integer('is_active').default(1),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const reportsRelations = relations(reports, ({ one }) => ({
  building: one(buildings, {
    fields: [reports.buildingId],
    references: [buildings.id],
  }),
  account: one(accounts, {
    fields: [reports.orgId],
    references: [accounts.orgId],
  }),
}));

export const reportTemplatesRelations = relations(
  reportTemplates,
  ({ one }) => ({
    account: one(accounts, {
      fields: [reportTemplates.orgId],
      references: [accounts.orgId],
    }),
  })
);
