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
export * from '../modules/helpdesk/schema';

// Define all relations here to avoid circular imports
import { relations } from 'drizzle-orm';
import { units } from '../modules/units/schema';
import { residents } from '../modules/residents/schema';
import { incomes } from '../modules/incomes/schema';
import { buildings } from '../modules/buildings/schema';
import {
  helpdeskTickets,
  helpdeskComments,
  helpdeskCategories,
  helpdeskKnowledgeBase,
  helpdeskTemplates,
} from '../modules/helpdesk/schema';

// Additional relations that involve cross-module dependencies
export const unitsAdditionalRelations = relations(units, ({ many }) => ({
  residents: many(residents),
  incomes: many(incomes),
  helpdeskTickets: many(helpdeskTickets),
}));

export const residentsAdditionalRelations = relations(
  residents,
  ({ many }) => ({
    helpdeskTickets: many(helpdeskTickets),
  })
);

export const buildingsAdditionalRelations = relations(
  buildings,
  ({ many }) => ({
    helpdeskTickets: many(helpdeskTickets),
  })
);

export const incomesRelations = relations(incomes, ({ one }) => ({
  unit: one(units, {
    fields: [incomes.unitId],
    references: [units.id],
  }),
}));

export const helpdeskTicketsRelations = relations(
  helpdeskTickets,
  ({ one, many }) => ({
    building: one(buildings, {
      fields: [helpdeskTickets.buildingId],
      references: [buildings.id],
    }),
    unit: one(units, {
      fields: [helpdeskTickets.unitId],
      references: [units.id],
    }),
    resident: one(residents, {
      fields: [helpdeskTickets.residentId],
      references: [residents.id],
    }),
    comments: many(helpdeskComments),
  })
);

export const helpdeskCommentsRelations = relations(
  helpdeskComments,
  ({ one }) => ({
    ticket: one(helpdeskTickets, {
      fields: [helpdeskComments.ticketId],
      references: [helpdeskTickets.id],
    }),
  })
);

export const helpdeskCategoriesRelations = relations(
  helpdeskCategories,
  ({ many }) => ({
    knowledgeBaseArticles: many(helpdeskKnowledgeBase),
    templates: many(helpdeskTemplates),
  })
);

export const helpdeskKnowledgeBaseRelations = relations(
  helpdeskKnowledgeBase,
  ({ one }) => ({
    category: one(helpdeskCategories, {
      fields: [helpdeskKnowledgeBase.categoryId],
      references: [helpdeskCategories.id],
    }),
  })
);

export const helpdeskTemplatesRelations = relations(
  helpdeskTemplates,
  ({ one }) => ({
    category: one(helpdeskCategories, {
      fields: [helpdeskTemplates.categoryId],
      references: [helpdeskCategories.id],
    }),
  })
);
