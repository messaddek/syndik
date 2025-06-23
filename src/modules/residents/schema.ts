import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  date,
} from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';
import { z } from 'zod';
import { units } from '../units/schema';

export const residents = pgTable('residents', {
  id: uuid('id').defaultRandom().primaryKey(),
  unitId: uuid('unit_id').references(() => units.id, { onDelete: 'cascade' }), // Optional relationship
  orgId: text('org_id').notNull(), // Clerk org ID
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  isOwner: boolean('is_owner').notNull().default(false), // owner vs tenant
  moveInDate: date('move_in_date').notNull(),
  moveOutDate: date('move_out_date'),
  isActive: boolean('is_active').notNull().default(true),
  emergencyContact: text('emergency_contact'),
  emergencyPhone: text('emergency_phone'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// Relations
export const residentsRelations = relations(residents, ({ one }) => ({
  unit: one(units, {
    fields: [residents.unitId],
    references: [units.id],
  }),
}));

// Zod schemas for validation
export const selectResidentSchema = createSelectSchema(residents);
export const insertResidentSchema = createInsertSchema(residents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createResidentSchema = z.object({
  unitId: z.string().uuid('Invalid unit ID').optional(), // Made optional
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  isOwner: z.boolean(),
  isActive: z.boolean(),
  moveInDate: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), 'Invalid move-in date'),
  moveOutDate: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  notes: z.string().optional(),
});
