import { z } from 'zod';
import { announcements, createAnnouncementSchema } from './schema';

// Use Drizzle's table inference for database types
export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = typeof announcements.$inferInsert;

// Use Zod inference for form/validation types
export type CreateAnnouncement = z.infer<typeof createAnnouncementSchema>;
