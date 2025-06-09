import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { initTRPC, TRPCError } from '@trpc/server';
import SuperJSON from 'superjson';

export const createTRPCContext = async () => {
  const { userId, orgId } = await auth(); // `auth()` is already synchronous in Clerk@4+
  return {
    db,
    userId,
    orgId,
  };
};

// Create the tRPC instance
const t = initTRPC.context<typeof createTRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: SuperJSON, // Uncomment if you use superjson
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

// Protected procedure that requires user authentication
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});

// Organization-protected procedure that requires org context
export const orgProtectedProcedure = protectedProcedure.use(
  async ({ ctx, next }) => {
    if (!ctx.orgId) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Organization access required',
      });
    }

    return next({
      ctx: {
        ...ctx,
        orgId: ctx.orgId,
      },
    });
  }
);
