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

// Create the tRPC instance with error handling
const t = initTRPC.context<typeof createTRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: SuperJSON, // Uncomment if you use superjson
  /**
   * Error handler for better monitoring
   */
  errorFormatter({ shape, error }) {
    // Log database-related errors for monitoring
    if (
      error.message.includes('Failed query') ||
      error.message.includes('Database') ||
      error.message.includes('Connection')
    ) {
      console.error('[tRPC] Database error detected:', {
        code: error.code,
        message: error.message,
        path: shape.data?.path,
        timestamp: new Date().toISOString(),
      });
    }

    return {
      ...shape,
      data: {
        ...shape.data,
        // Add timestamp for error tracking
        timestamp: new Date().toISOString(),
      },
    };
  },
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

// Add monitoring middleware for database operations
const monitoringMiddleware = t.middleware(async ({ path, type, next }) => {
  const start = Date.now();
  const result = await next();
  const durationMs = Date.now() - start;

  // Log slow queries (over 2 seconds)
  if (durationMs > 2000) {
    console.warn('[tRPC] Slow operation detected:', {
      path,
      type,
      durationMs,
      timestamp: new Date().toISOString(),
    });
  }

  return result;
});

export const baseProcedure = t.procedure.use(monitoringMiddleware);

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
