import { eq } from 'drizzle-orm';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { accounts, initAccountSchema } from '@/lib/schema';

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

    console.log('Fetching account for user:', userId);

    const [account] = await db
      .select()
      .from(accounts)
      .where(eq(accounts.userId, userId))
      .limit(1);

    console.log('Fetched account:', account);

    return account || null;
  }),

  updateAccount: protectedProcedure
    .input(initAccountSchema.partial())
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
});
