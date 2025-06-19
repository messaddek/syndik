import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { accounts } from '@/lib/schema';
import { sql } from 'drizzle-orm';

interface DebugInfo {
  timestamp: string;
  environment: string | undefined;
  nodeEnv: string | undefined;
  envVars?: Record<string, string>;
  connectionTest?: string;
  accountsTableAccess?: string;
  hasAccountsData?: boolean;
  tableStructure?: Record<string, unknown>[];
  success?: boolean;
  error?: string;
  errorStack?: string;
}

export async function GET(_request: NextRequest) {
  const debugInfo: DebugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
    nodeEnv: process.env.NODE_ENV,
  };

  try {
    console.log('🔍 Testing database connection...');
    console.log('Environment:', process.env.NEXT_PUBLIC_ENVIRONMENT);
    console.log('Database URL exists:', !!process.env.DATABASE_URL);

    // Add environment variable status
    debugInfo.envVars = {
      DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Missing',
      NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'Not Set',
      NEXT_PUBLIC_MAIN_URL: process.env.NEXT_PUBLIC_MAIN_URL || 'Not Set',
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'Not Set',
      NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL || 'Not Set',
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? 'Set' : 'Missing',
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env
        .NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
        ? 'Set'
        : 'Missing',
    };

    // Test basic database connection with simple query
    await db.execute(sql`SELECT 1 as test`);
    debugInfo.connectionTest = 'Success';

    // Test accounts table access
    const accountsResult = await db.select().from(accounts).limit(1);
    debugInfo.accountsTableAccess = 'Success';
    debugInfo.hasAccountsData = accountsResult.length > 0;

    // Test table structure
    const tableInfo = await db.execute(sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'accounts' 
      LIMIT 5
    `);
    debugInfo.tableStructure = tableInfo.rows;

    return NextResponse.json({
      success: true,
      message: 'Database connection and table access successful',
      ...debugInfo,
    });
  } catch (error) {
    console.error('❌ Database test failed:', error);

    debugInfo.success = false;
    debugInfo.error = error instanceof Error ? error.message : 'Unknown error';
    debugInfo.errorStack = error instanceof Error ? error.stack : undefined;

    return NextResponse.json(debugInfo, { status: 500 });
  }
}
