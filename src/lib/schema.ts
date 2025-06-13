// Main schema file that exports all table schemas from modules
export * from '../modules/accounts/schema';
export * from '../modules/buildings/schema';
export * from '../modules/units/schema';
export * from '../modules/residents/schema';
export * from '../modules/incomes/schema';
export * from '../modules/expenses/schema';
export * from '../modules/meetings/schema';
export * from '../modules/announcements/schema';
export * from '../modules/notifications/schema';
export * from '../modules/portal/schema';
export * from '../modules/articles/schema';

// Define all relations here to avoid circular imports
import { relations } from 'drizzle-orm';
import { units } from '../modules/units/schema';
import { residents } from '../modules/residents/schema';
import { incomes } from '../modules/incomes/schema';

// Additional relations that involve cross-module dependencies
export const unitsAdditionalRelations = relations(units, ({ many }) => ({
  residents: many(residents),
  incomes: many(incomes),
}));

export const incomesRelations = relations(incomes, ({ one }) => ({
  unit: one(units, {
    fields: [incomes.unitId],
    references: [units.id],
  }),
}));
