import { createTRPCContext } from '@/trpc/init';
import { appRouter } from '@/trpc/routers/_app';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }: { path: string | undefined; error: Error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
