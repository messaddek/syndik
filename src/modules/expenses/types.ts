import { z } from 'zod';
import { expenses, createExpenseSchema, updateExpenseSchema } from './schema';

// Use Drizzle's table inference for database types
export type Expense = typeof expenses.$inferSelect;
export type InsertExpense = typeof expenses.$inferInsert;

// Use Zod inference for form/validation types
export type CreateExpense = z.infer<typeof createExpenseSchema>;
export type UpdateExpense = z.infer<typeof updateExpenseSchema>;
