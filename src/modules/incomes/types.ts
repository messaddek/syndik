import { z } from 'zod';
import { incomes, createIncomeSchema, updateIncomeSchema } from './schema';

// Use Drizzle's table inference for database types
export type Income = typeof incomes.$inferSelect;
export type InsertIncome = typeof incomes.$inferInsert;

// Use Zod inference for form/validation types
export type CreateIncome = z.infer<typeof createIncomeSchema>;
export type UpdateIncome = z.infer<typeof updateIncomeSchema>;
