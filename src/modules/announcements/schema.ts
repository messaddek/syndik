import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const announcements = pgTable('announcements', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: text('org_id').notNull(), // Clerk org ID
  buildingId: uuid('building_id'), // Optional - can be building-specific or general
  title: text('title').notNull(),
  content: text('content').notNull(),
  priority: text('priority').notNull().default('normal'), // 'low', 'normal', 'high', 'urgent'
  isPublished: boolean('is_published').notNull().default(true),
  publishedAt: timestamp('published_at', { mode: 'date' })
    .defaultNow()
    .notNull(),
  expiresAt: timestamp('expires_at', { mode: 'date' }),
  authorId: text('author_id').notNull(), // Clerk user ID of creator
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

// Zod schemas for validation
export const selectAnnouncementSchema = createSelectSchema(announcements);
export const insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createAnnouncementSchema = z.object({
  buildingId: z.string().uuid().optional(),
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  expiresAt: z
    .string()
    .transform(str => (str ? new Date(str) : null))
    .optional(),
});
