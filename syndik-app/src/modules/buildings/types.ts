import { z } from 'zod';
import { buildings, createBuildingSchema } from './schema';

// Use Drizzle's table inference for database types
export type Building = typeof buildings.$inferSelect;
export type InsertBuilding = typeof buildings.$inferInsert;

// Use Zod inference for form/validation types
export type CreateBuilding = z.infer<typeof createBuildingSchema>;
