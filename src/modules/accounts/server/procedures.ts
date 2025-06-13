import { eq, and, count } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import {
  accounts,
  userPreferences,
  initAccountSchema,
  updateAccountSchema,
  userPreferencesSchema,
} from '../schema';

export const accountsRouter = createTRPCRouter({
  initAccount: protectedProcedure
    .input(initAccountSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;

      if (!orgId) {
        throw new Error('Organization is required');
      }

      // Check if account already exists for this user in this organization
      const existingAccount = await db
        .select()
        .from(accounts)
        .where(and(eq(accounts.userId, userId), eq(accounts.orgId, orgId)))
        .limit(1);

      if (existingAccount.length > 0) {
        return existingAccount[0];
      }

      // Create new account
      const [newAccount] = await db
        .insert(accounts)
        .values({
          userId,
          orgId,
          name: input.name,
          email: input.email,
          role: input.role,
        })
        .returning();

      return newAccount;
    }),

  getCurrentAccount: protectedProcedure.query(async ({ ctx }) => {
    const { db, userId, orgId } = ctx;

    if (!orgId) {
      return null;
    }

    const [account] = await db
      .select()
      .from(accounts)
      .where(and(eq(accounts.userId, userId), eq(accounts.orgId, orgId)))
      .limit(1);

    return account || null;
  }),

  updateAccount: protectedProcedure
    .input(updateAccountSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;

      if (!orgId) {
        throw new Error('Organization is required');
      }

      const [updatedAccount] = await db
        .update(accounts)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(and(eq(accounts.userId, userId), eq(accounts.orgId, orgId)))
        .returning();

      return updatedAccount;
    }),

  // Get user preferences
  getUserPreferences: protectedProcedure.query(async ({ ctx }) => {
    const { db, userId, orgId } = ctx;

    const [preferences] = await db
      .select()
      .from(userPreferences)
      .where(
        and(
          eq(userPreferences.userId, userId),
          eq(userPreferences.orgId, orgId!)
        )
      )
      .limit(1);

    if (!preferences) {
      // Return default preferences
      return {
        notifications: {
          emailNotifications: true,
          smsNotifications: false,
          pushNotifications: true,
          weeklyReports: true,
          maintenanceAlerts: true,
          financialUpdates: false,
        },
        privacy: {
          profileVisible: true,
          dataSharing: false,
          analytics: true,
          marketing: false,
        },
      };
    }

    return {
      notifications: preferences.notifications
        ? JSON.parse(preferences.notifications)
        : {},
      privacy: preferences.privacy ? JSON.parse(preferences.privacy) : {},
    };
  }),

  // Update user preferences
  updateUserPreferences: protectedProcedure
    .input(userPreferencesSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, userId, orgId } = ctx;

      if (!orgId) {
        throw new Error('Organization is required');
      }

      // Check if preferences exist
      const [existingPreferences] = await db
        .select()
        .from(userPreferences)
        .where(
          and(
            eq(userPreferences.userId, userId),
            eq(userPreferences.orgId, orgId)
          )
        )
        .limit(1);

      const preferencesData = {
        notifications: input.notifications
          ? JSON.stringify(input.notifications)
          : null,
        privacy: input.privacy ? JSON.stringify(input.privacy) : null,
        updatedAt: new Date(),
      };

      if (existingPreferences) {
        // Update existing preferences
        const [updated] = await db
          .update(userPreferences)
          .set(preferencesData)
          .where(eq(userPreferences.id, existingPreferences.id))
          .returning();

        return {
          notifications: updated.notifications
            ? JSON.parse(updated.notifications)
            : {},
          privacy: updated.privacy ? JSON.parse(updated.privacy) : {},
        };
      } else {
        // Create new preferences
        const [created] = await db
          .insert(userPreferences)
          .values({
            userId,
            orgId,
            ...preferencesData,
          })
          .returning();

        return {
          notifications: created.notifications
            ? JSON.parse(created.notifications)
            : {},
          privacy: created.privacy ? JSON.parse(created.privacy) : {},
        };
      }
    }),

  // Get or create account for redirect handling
  getOrCreateAccount: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        orgId: z.string(),
        name: z.string(),
        email: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;

      // Check if account already exists
      const existingAccount = await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.userId, input.userId),
            eq(accounts.orgId, input.orgId)
          )
        )
        .limit(1);

      if (existingAccount.length > 0) {
        return existingAccount[0];
      }

      // Create new account with member role as default
      const [newAccount] = await db
        .insert(accounts)
        .values({
          userId: input.userId,
          orgId: input.orgId,
          name: input.name,
          email: input.email,
          role: 'member', // Default to member role
        })
        .returning();

      return newAccount;
    }),

  // Get organization usage and limits for progress bar
  getOrganizationUsage: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    if (!userId) {
      throw new Error('User ID is required');
    }

    // Get all organizations this user is part of
    const userOrganizations = await ctx.db
      .select({
        orgId: accounts.orgId,
        organizationName: accounts.organizationName,
        role: accounts.role,
        createdAt: accounts.createdAt,
      })
      .from(accounts)
      .where(eq(accounts.userId, userId));

    // Define plan limits (in a real app, this would come from a subscription/billing service)
    const planLimits = {
      free: { maxOrganizations: 1, name: 'Free Plan' },
      basic: { maxOrganizations: 3, name: 'Basic Plan' },
      pro: { maxOrganizations: 10, name: 'Pro Plan' },
      enterprise: { maxOrganizations: 50, name: 'Enterprise Plan' },
    };

    // For demo purposes, determine plan based on organization count
    // In a real app, this would be stored in a user subscription table
    const currentOrgCount = userOrganizations.length;
    let currentPlan: keyof typeof planLimits = 'free';

    if (currentOrgCount >= 10) {
      currentPlan = 'enterprise';
    } else if (currentOrgCount >= 5) {
      currentPlan = 'pro';
    } else if (currentOrgCount >= 2) {
      currentPlan = 'basic';
    }

    const planInfo = planLimits[currentPlan];

    return {
      currentCount: currentOrgCount,
      maxAllowed: planInfo.maxOrganizations,
      remaining: Math.max(0, planInfo.maxOrganizations - currentOrgCount),
      planName: planInfo.name,
      usagePercentage: Math.min(
        100,
        (currentOrgCount / planInfo.maxOrganizations) * 100
      ),
      organizations: userOrganizations,
      canCreateMore: currentOrgCount < planInfo.maxOrganizations,
    };
  }),

  // Check if user can create a new organization
  canCreateOrganization: protectedProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    if (!userId) {
      return { canCreate: false, reason: 'User not authenticated' };
    }

    // Get organization count for this user
    const [orgCountResult] = await ctx.db
      .select({ count: count() })
      .from(accounts)
      .where(eq(accounts.userId, userId));

    const currentOrgCount = orgCountResult?.count || 0;

    // Define plan limits
    const planLimits = {
      free: 1,
      basic: 3,
      pro: 10,
      enterprise: 50,
    };

    // For demo purposes, determine plan based on current count
    let maxAllowed = planLimits.free;

    if (currentOrgCount >= 10) {
      maxAllowed = planLimits.enterprise;
    } else if (currentOrgCount >= 5) {
      maxAllowed = planLimits.pro;
    } else if (currentOrgCount >= 2) {
      maxAllowed = planLimits.basic;
    }

    const canCreate = currentOrgCount < maxAllowed;

    return {
      canCreate,
      currentCount: currentOrgCount,
      maxAllowed,
      remaining: Math.max(0, maxAllowed - currentOrgCount),
      reason: canCreate
        ? null
        : `You have reached your plan limit of ${maxAllowed} organizations`,
    };
  }),
});
