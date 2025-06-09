import { z } from 'zod';
import { residents, createResidentSchema } from './schema';

// Use Drizzle's table inference for database types
export type Resident = typeof residents.$inferSelect;
export type InsertResident = typeof residents.$inferInsert;

// Use Zod inference for form/validation types
export type CreateResident = z.infer<typeof createResidentSchema>;
