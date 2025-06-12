import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: text('org_id').notNull(), // Clerk org ID
  userId: text('user_id'), // Optional - if null, notification is for all users in org
  residentId: uuid('resident_id'), // Optional - if specified, notification is for specific resident
  type: text('type').notNull(), // 'announcement', 'payment_due', 'maintenance', 'meeting', 'system', 'welcome'
  title: text('title').notNull(),
  message: text('message').notNull(),
  priority: text('priority').notNull().default('normal'), // 'low', 'normal', 'high', 'urgent'
  category: text('category').notNull().default('general'), // 'financial', 'maintenance', 'community', 'system', 'general'
  isRead: boolean('is_read').notNull().default(false),
  isArchived: boolean('is_archived').notNull().default(false),
  metadata: jsonb('metadata'), // Additional data specific to notification type
  actionUrl: text('action_url'), // Optional URL for notification action
  expiresAt: timestamp('expires_at', { mode: 'date' }),
  readAt: timestamp('read_at', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// Notification preferences per user
export const notificationPreferences = pgTable('notification_preferences', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(), // Clerk user ID
  orgId: text('org_id').notNull(), // Clerk org ID
  emailNotifications: boolean('email_notifications').notNull().default(true),
  pushNotifications: boolean('push_notifications').notNull().default(true),
  smsNotifications: boolean('sms_notifications').notNull().default(false),
  categoryPreferences: jsonb('category_preferences'), // JSON object with category-specific preferences
  quietHours: jsonb('quiet_hours'), // JSON object with start/end times for quiet hours
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// Zod schemas for validation
export const selectNotificationSchema = createSelectSchema(notifications);
export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createNotificationSchema = z.object({
  userId: z.string().optional(),
  residentId: z.string().uuid().optional(),
  type: z.enum([
    'announcement',
    'payment_due',
    'maintenance',
    'meeting',
    'system',
    'welcome',
  ]),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  category: z
    .enum(['financial', 'maintenance', 'community', 'system', 'general'])
    .default('general'),
  metadata: z.record(z.any()).optional(),
  actionUrl: z.string().url().optional(),
  expiresAt: z.date().optional(),
});

export const markNotificationReadSchema = z.object({
  notificationId: z.string().uuid(),
});

export const markAllReadSchema = z.object({
  category: z
    .enum(['financial', 'maintenance', 'community', 'system', 'general'])
    .optional(),
});

export const notificationPreferencesSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  categoryPreferences: z.record(z.boolean()).optional(),
  quietHours: z
    .object({
      start: z.string(), // HH:MM format
      end: z.string(), // HH:MM format
      enabled: z.boolean(),
    })
    .optional(),
});

export type Notification = typeof notifications.$inferSelect;
export type CreateNotification = z.infer<typeof createNotificationSchema>;
export type NotificationPreferences = z.infer<
  typeof notificationPreferencesSchema
>;
