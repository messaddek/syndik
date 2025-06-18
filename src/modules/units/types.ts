import { z } from 'zod';
import { units, createUnitSchema, updateUnitSchema } from './schema';

// Use Drizzle's table inference for database types
export type Unit = typeof units.$inferSelect;
export type InsertUnit = typeof units.$inferInsert;

// Unit with building information (used when joining with buildings table)
export type UnitWithBuilding = Unit & {
  building?: {
    id: string;
    name: string;
    address: string;
    city: string;
  } | null;
};

// Use Zod inference for form/validation types
export type CreateUnit = z.infer<typeof createUnitSchema>;
export type UpdateUnit = z.infer<typeof updateUnitSchema>;
