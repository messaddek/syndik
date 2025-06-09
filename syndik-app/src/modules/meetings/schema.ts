import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const meetings = pgTable('meetings', {
  id: uuid('id').defaultRandom().primaryKey(),
  orgId: text('org_id').notNull(), // Clerk org ID
  buildingId: uuid('building_id'), // Optional - can be building-specific or general
  title: text('title').notNull(),
  description: text('description'),
  scheduledDate: timestamp('scheduled_date', { mode: 'date' }).notNull(),
  location: text('location'),
  agenda: text('agenda'), // JSON string or plain text
  minutes: text('minutes'), // meeting notes/minutes
  isCompleted: boolean('is_completed').notNull().default(false),
  maxParticipants: text('max_participants'), // optional limit
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
});

export const meetingParticipants = pgTable('meeting_participants', {
  id: uuid('id').defaultRandom().primaryKey(),
  meetingId: uuid('meeting_id')
    .notNull()
    .references(() => meetings.id, { onDelete: 'cascade' }),
  residentId: uuid('resident_id'), // Optional - can be external participants
  name: text('name').notNull(), // for external participants  email: text("email"),
  attended: boolean('attended').notNull().default(false),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Zod schemas for validation
export const selectMeetingSchema = createSelectSchema(meetings);
export const insertMeetingSchema = createInsertSchema(meetings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const createMeetingSchema = z.object({
  buildingId: z.string().uuid().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  scheduledDate: z
    .string()
    .refine(date => !isNaN(Date.parse(date)), 'Invalid date'),
  location: z.string().optional(),
  agenda: z.string().optional(),
  maxParticipants: z.string().optional(),
});

export const selectParticipantSchema = createSelectSchema(meetingParticipants);
export const createParticipantSchema = z.object({
  meetingId: z.string().uuid(),
  residentId: z.string().uuid().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().optional(),
});
