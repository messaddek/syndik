import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';

export const organizations = pgTable('organizations', {
  id: text('id').primaryKey(), // This will be the Clerk organization ID
  name: text('name').notNull(),
  slug: text('slug'),
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  membersCount: integer('members_count').default(0),
  createdBy: text('created_by'), // Clerk user ID
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const organizationMemberships = pgTable('organization_memberships', {
  id: text('id').primaryKey(), // Clerk membership ID
  organizationId: text('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(), // Clerk user ID
  role: text('role').notNull(), // org:admin, org:member
  isActive: boolean('is_active').default(true).notNull(),
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type OrganizationMembership =
  typeof organizationMemberships.$inferSelect;
export type NewOrganizationMembership =
  typeof organizationMemberships.$inferInsert;
