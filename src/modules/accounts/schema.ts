import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(), // Clerk user ID
  orgId: text('org_id').notNull(), // Clerk org ID
  name: text('name').notNull(),
  email: text('email').notNull(),
  role: text('role').notNull().default('manager'), // manager, admin
  isActive: boolean('is_active').notNull().default(true),
  // Organization information stored directly in account
  organizationName: text('organization_name'), // Synced from Clerk organization
  organizationSlug: text('organization_slug'), // Synced from Clerk organization
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// Users table for residents (future resident portal)
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull().unique(), // Clerk user ID
  orgId: text('org_id').notNull(), // Clerk org ID (links to accounts.orgId)
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  isActive: boolean('is_active').notNull().default(true),
  // Future: link to residents table
  residentId: uuid('resident_id'), // Will reference residents.id
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// Zod schemas for validation
export const selectAccountSchema = createSelectSchema(accounts);
export const selectUserSchema = createSelectSchema(users);
export const insertAccountSchema = createInsertSchema(accounts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const initAccountSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  role: z.enum(['manager', 'admin']).default('manager'),
  organizationName: z.string().optional(),
  organizationSlug: z.string().optional(),
});

export const updateAccountSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Valid email is required').optional(),
  organizationName: z.string().optional(),
  organizationSlug: z.string().optional(),
});

export const userPreferencesSchema = z.object({
  notifications: z
    .object({
      emailNotifications: z.boolean().default(true),
      smsNotifications: z.boolean().default(false),
      pushNotifications: z.boolean().default(true),
      weeklyReports: z.boolean().default(true),
      maintenanceAlerts: z.boolean().default(true),
      financialUpdates: z.boolean().default(false),
    })
    .optional(),
  privacy: z
    .object({
      profileVisible: z.boolean().default(true),
      dataSharing: z.boolean().default(false),
      analytics: z.boolean().default(true),
      marketing: z.boolean().default(false),
    })
    .optional(),
});

export const userPreferences = pgTable('user_preferences', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(), // Clerk user ID
  orgId: text('org_id').notNull(), // Clerk org ID
  notifications: text('notifications'), // JSON string of notification preferences
  privacy: text('privacy'), // JSON string of privacy preferences
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});
