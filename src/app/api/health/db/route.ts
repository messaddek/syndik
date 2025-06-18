import { NextResponse } from 'next/server';
import { db, withRetry } from '@/lib/db';
import { sql } from 'drizzle-orm';

export async function GET() {
  const startTime = Date.now();

  try {
    // Test basic connectivity
    const connectivityTest = await withRetry(async () => {
      const result = await db.execute(sql`SELECT 1 as test`);
      return result;
    });

    // Test helpdesk_tickets table access
    const helpdeskTest = await withRetry(async () => {
      const result = await db.execute(
        sql`SELECT COUNT(*) as count FROM helpdesk_tickets LIMIT 1`
      );
      return result;
    });

    // Test accounts table access
    const accountsTest = await withRetry(async () => {
      const result = await db.execute(
        sql`SELECT COUNT(*) as count FROM accounts LIMIT 1`
      );
      return result;
    });

    const totalTime = Date.now() - startTime;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: {
        connectivity: 'ok',
        connectivityTime: totalTime,
        tables: {
          helpdesk_tickets: 'accessible',
          accounts: 'accessible',
        },
      },
      tests: {
        basic_connectivity: connectivityTest ? 'passed' : 'failed',
        helpdesk_table: helpdeskTest ? 'passed' : 'failed',
        accounts_table: accountsTest ? 'passed' : 'failed',
      },
    });
  } catch (error) {
    const totalTime = Date.now() - startTime;
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    console.error('[HEALTH] Database health check failed:', {
      error: errorMessage,
      executionTime: totalTime,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: errorMessage,
        executionTime: totalTime,
        database: {
          connectivity: 'failed',
          error: errorMessage,
        },
      },
      { status: 500 }
    );
  }
}
