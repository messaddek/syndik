import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  decimal,
  boolean,
} from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';
import { z } from 'zod';
import { buildings } from '../buildings/schema';

export const units = pgTable('units', {
  id: uuid('id').defaultRandom().primaryKey(),
  buildingId: uuid('building_id')
    .notNull()
    .references(() => buildings.id, { onDelete: 'cascade' }),
  orgId: text('org_id').notNull(), // Clerk org ID
  unitNumber: text('unit_number').notNull(),
  floor: integer('floor').notNull(),
  area: decimal('area', { precision: 10, scale: 2, mode: 'number' }), // in square meters
  bedrooms: integer('bedrooms').notNull().default(1),
  bathrooms: integer('bathrooms').notNull().default(1),
  monthlyFee: decimal('monthly_fee', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(), // monthly syndicate fee
  isOccupied: boolean('is_occupied').notNull().default(false),
  description: text('description'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// Relations
export const unitsRelations = relations(units, ({ one }) => ({
  building: one(buildings, {
    fields: [units.buildingId],
    references: [buildings.id],
  }),
}));

// Zod schemas for validation
export const selectUnitSchema = createSelectSchema(units);
export const insertUnitSchema = createInsertSchema(units).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createUnitSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID'),
  unitNumber: z.string().min(1, 'Unit number is required'),
  floor: z.number().min(0, 'Floor must be 0 or higher'),
  area: z.number().positive('Area must be positive').optional(),
  bedrooms: z.number().min(1, 'At least 1 bedroom required'),
  bathrooms: z.number().min(1, 'At least 1 bathroom required'),
  monthlyFee: z.number().positive('Monthly fee must be positive'),
  description: z.string().optional(),
});

export const updateUnitSchema = z.object({
  buildingId: z.string().uuid('Invalid building ID').optional(),
  unitNumber: z.string().min(1, 'Unit number is required').optional(),
  floor: z.number().min(0, 'Floor must be 0 or higher').optional(),
  area: z.number().positive('Area must be positive').optional(),
  bedrooms: z.number().min(1, 'At least 1 bedroom required').optional(),
  bathrooms: z.number().min(1, 'At least 1 bathroom required').optional(),
  monthlyFee: z.number().positive('Monthly fee must be positive').optional(),
  description: z.string().optional(),
});
