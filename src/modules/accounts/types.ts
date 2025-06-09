import { z } from 'zod';
import { accounts, initAccountSchema } from './schema';

// Use Drizzle's table inference for database types
export type Account = typeof accounts.$inferSelect;
export type InsertAccount = typeof accounts.$inferInsert;

// Use Zod inference for form/validation types
export type InitAccount = z.infer<typeof initAccountSchema>;
