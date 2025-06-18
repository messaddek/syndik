import {
  pgTable,
  text,
  timestamp,
  uuid,
  decimal,
  integer,
} from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const expenses = pgTable('expenses', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: text('org_id').notNull(), // Clerk org ID
  buildingId: uuid('building_id'), // Optional - can be building-specific or general
  amount: decimal('amount', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(), // 'maintenance', 'utilities', 'cleaning', 'security', 'other'
  vendor: text('vendor'), // who was paid
  month: integer('month').notNull(), // 1-12
  year: integer('year').notNull(),
  paidDate: timestamp('paid_date', {
    mode: 'date',
  }).notNull(),
  receiptUrl: text('receipt_url'), // for file uploads
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Zod schemas for validation
export const selectExpenseSchema = createSelectSchema(expenses);
export const insertExpenseSchema = createInsertSchema(expenses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createExpenseSchema = z.object({
  buildingId: z.string().uuid().optional(),
  amount: z.number().positive('Amount must be positive'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum([
    'maintenance',
    'utilities',
    'cleaning',
    'security',
    'supplies',
    'professional_services',
    'other',
  ]),
  vendor: z.string().optional(),
  month: z.number().min(1).max(12),
  year: z.number().min(2020).max(2050),
  paidDate: z.string().refine(date => !isNaN(Date.parse(date)), 'Invalid date'),
  receiptUrl: z.string().url().optional(),
  notes: z.string().optional(),
});

export const updateExpenseSchema = createExpenseSchema.extend({
  id: z.string().uuid(),
});
