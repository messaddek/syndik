import { eq, and } from 'drizzle-orm';
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

      // Check if account already exists
      const existingAccount = await db
        .select()
        .from(accounts)
        .where(eq(accounts.userId, userId))
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
    const { db, userId } = ctx;

    const [account] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, userId))
      .limit(1);

    return account || null;
  }),

  updateAccount: protectedProcedure
    .input(updateAccountSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, userId } = ctx;

      const [updatedAccount] = await db
        .update(accounts)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(accounts.userId, userId))
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
});
