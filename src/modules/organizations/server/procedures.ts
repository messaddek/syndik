import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { db } from '@/lib/db';
import { accounts } from '@/lib/schema';
import { units } from '../../units/schema';
import { residents } from '../../residents/schema';
import { eq, and, count } from 'drizzle-orm';
import { z } from 'zod';

export const organizationsRouter = createTRPCRouter({
  // Check if user has an organization
  hasOrganization: protectedProcedure.query(async ({ ctx }) => {
    const { orgId } = ctx;

    // If Clerk provides orgId, user has an organization
    if (orgId) {
      return true;
    }

    return false;
  }), // Get current organization info from account data
  getCurrentOrganization: protectedProcedure.query(async ({ ctx }) => {
    const { orgId } = ctx;

    if (!orgId) {
      return null;
    }

    // Get accounts for this organization
    const accountsInOrg = await db
      .select()
      .from(accounts)
      .where(eq(accounts.orgId, orgId));

    if (accountsInOrg.length === 0) {
      return null;
    }

    // Get organization info from the first account (they should all have the same org info)
    const firstAccount = accountsInOrg[0];

    return {
      id: orgId,
      name: firstAccount.organizationName || 'My Organization',
      slug: firstAccount.organizationSlug || null,
      membersCount: accountsInOrg.length,
      hasAccounts: true,
      createdAt: firstAccount.createdAt,
      updatedAt: firstAccount.updatedAt,
    };
  }),

  // Get user's account in current organization
  getMembership: protectedProcedure.query(async ({ ctx }) => {
    const { orgId, userId } = ctx;
    if (!orgId || !userId) {
      return null;
    }

    const userAccount = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.orgId, orgId), eq(accounts.userId, userId)))
      .limit(1);

    return userAccount.length > 0 ? userAccount[0] : null;
  }),
  // Sync account when user joins/updates organization
  syncAccount: protectedProcedure
    .input(
      z.object({
        orgId: z.string(),
        userId: z.string(),
        name: z.string(),
        email: z.string(),
        role: z.enum(['manager', 'admin']).default('manager'),
        organizationName: z.string().optional(),
        organizationSlug: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // Upsert account for this user in this organization
      const existingAccount = await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.orgId, input.orgId),
            eq(accounts.userId, input.userId)
          )
        )
        .limit(1);

      if (existingAccount.length > 0) {
        // Update existing account
        const result = await db
          .update(accounts)
          .set({
            name: input.name,
            email: input.email,
            role: input.role,
            organizationName: input.organizationName || undefined,
            organizationSlug: input.organizationSlug || undefined,
            updatedAt: new Date(),
          })
          .where(eq(accounts.id, existingAccount[0].id))
          .returning();

        return result[0];
      } else {
        // Create new account
        const result = await db
          .insert(accounts)
          .values({
            orgId: input.orgId,
            userId: input.userId,
            name: input.name,
            email: input.email,
            role: input.role,
            organizationName: input.organizationName || null,
            organizationSlug: input.organizationSlug || null,
          })
          .returning();

        return result[0];
      }
    }),
  // Get syndicate statistics
  getStatistics: protectedProcedure.query(async ({ ctx }) => {
    const { orgId } = ctx;

    if (!orgId) {
      return {
        totalUnits: 0,
        occupiedUnits: 0,
        occupancyRate: 0,
        totalResidents: 0,
      };
    }

    // Get total units count
    const [totalUnitsResult] = await db
      .select({ count: count() })
      .from(units)
      .where(eq(units.orgId, orgId));

    // Get occupied units count
    const [occupiedUnitsResult] = await db
      .select({ count: count() })
      .from(units)
      .where(and(eq(units.orgId, orgId), eq(units.isOccupied, true)));

    // Get total active residents count
    const [totalResidentsResult] = await db
      .select({ count: count() })
      .from(residents)
      .where(and(eq(residents.orgId, orgId), eq(residents.isActive, true)));

    const totalUnits = totalUnitsResult?.count || 0;
    const occupiedUnits = occupiedUnitsResult?.count || 0;
    const totalResidents = totalResidentsResult?.count || 0;
    const occupancyRate =
      totalUnits > 0 ? (occupiedUnits / totalUnits) * 100 : 0;

    return {
      totalUnits,
      occupiedUnits,
      occupancyRate: Math.round(occupancyRate),
      totalResidents,
    };
  }),
});
