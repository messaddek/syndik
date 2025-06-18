import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Configure Neon HTTP client with enhanced reliability settings
const sql = neon(process.env.DATABASE_URL, {
  // Connection reliability settings
  fullResults: true,
  // Add timeout and retry configurations
  fetchOptions: {
    timeout: 15000, // 15 second timeout
    keepalive: true,
  },
});

export const db = drizzle(sql, {
  schema,
  // Enhanced query logging with performance tracking
  logger:
    process.env.NODE_ENV === 'development'
      ? {
          logQuery: (query, params) => {
            const timestamp = new Date().toISOString();
            const queryPreview =
              query.slice(0, 100) + (query.length > 100 ? '...' : '');

            console.log(`[DB ${timestamp}] Query:`, queryPreview);
            if (params?.length) {
              console.log(`[DB ${timestamp}] Params:`, params);
            }

            // Log potentially problematic queries
            if (
              query.toLowerCase().includes('count(*)') &&
              !query.toLowerCase().includes('limit')
            ) {
              console.warn(
                `[DB ${timestamp}] Potentially expensive COUNT query without LIMIT detected`
              );
            }
          },
        }
      : false,
});

// Helper function to wrap database operations with retry logic
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      // Log the error
      console.error(`[DB] Attempt ${attempt} failed:`, {
        error: lastError.message,
        attempt,
        maxRetries,
      });

      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break;
      }

      // Wait before retrying (exponential backoff)
      const waitTime = delay * Math.pow(2, attempt - 1);
      console.log(`[DB] Retrying in ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw new Error(
    `Database operation failed after ${maxRetries} attempts: ${lastError?.message || 'Unknown error'}`
  );
}
