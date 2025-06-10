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

export const incomes = pgTable('incomes', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: text('org_id').notNull(), // Clerk org ID
  buildingId: uuid('building_id'), // Optional - can be building-specific or general
  unitId: uuid('unit_id'), // Optional - can be unit-specific
  amount: decimal('amount', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(), // 'monthly_fees', 'parking', 'other'
  month: integer('month').notNull(), // 1-12
  year: integer('year').notNull(),
  receivedDate: timestamp('received_date', { mode: 'date' }).notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// Zod schemas for validation
export const selectIncomeSchema = createSelectSchema(incomes);
export const insertIncomeSchema = createInsertSchema(incomes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createIncomeSchema = z.object({
  buildingId: z.string().uuid().optional(),
  unitId: z.string().uuid().optional(), // Added unit relationship
  amount: z.number().positive('Amount must be positive'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum([
    'monthly_fees',
    'parking',
    'utilities',
    'maintenance',
    'other',
  ]),
  month: z.number().min(1).max(12),
  year: z.number().min(2020).max(2050),
  receivedDate: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), 'Invalid date'),
  notes: z.string().optional(),
});
