import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { db } from '@/lib/db';
import { accounts } from '@/lib/schema';
import { eq, and } from 'drizzle-orm';
import { z } from 'zod';

export const organizationsRouter = createTRPCRouter({
  // Check if user has an organization
  hasOrganization: protectedProcedure.query(async ({ ctx }) => {
    const { orgId } = ctx;

    if (!orgId) {
      return false;
    }

    // Check if any account exists for this organization
    const accountsInOrg = await db
      .select()
      .from(accounts)
      .where(eq(accounts.orgId, orgId))
      .limit(1);

    return accountsInOrg.length > 0;
  }),

  // Get current organization info by checking accounts
  getCurrentOrganization: protectedProcedure.query(async ({ ctx }) => {
    const { orgId } = ctx;

    if (!orgId) {
      return null;
    }

    // Get organization info from Clerk context and account data
    const accountsInOrg = await db
      .select()
      .from(accounts)
      .where(eq(accounts.orgId, orgId));

    if (accountsInOrg.length === 0) {
      return null;
    }

    // Return organization summary from accounts
    return {
      id: orgId,
      membersCount: accountsInOrg.length,
      hasAccounts: true,
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
          })
          .returning();

        return result[0];
      }
    }),
});
