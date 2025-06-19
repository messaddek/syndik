import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { accounts } from '@/lib/schema';
import { sql } from 'drizzle-orm';

interface DebugInfo {
  timestamp: string;
  environment: string | undefined;
  nodeEnv: string | undefined;
  envVars?: Record<string, string>;
  databaseUrlAnalysis?: Record<string, string>;
  connectionTest?: string;
  accountsTableAccess?: string;
  hasAccountsData?: boolean;
  tableStructure?: Record<string, unknown>[];
  databaseInfo?: Record<string, unknown>;
  success?: boolean;
  error?: string;
  errorStack?: string;
  troubleshooting?: string[];
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

    // Analyze DATABASE_URL without exposing sensitive info
    const dbUrl = process.env.DATABASE_URL;
    const urlAnalysis: Record<string, string> = { status: 'Missing' };

    if (dbUrl) {
      try {
        const url = new URL(dbUrl);
        urlAnalysis.status = 'Valid Format';
        urlAnalysis.protocol = url.protocol;
        urlAnalysis.hostname = url.hostname || 'Not specified';
        urlAnalysis.port = url.port || 'Default';
        urlAnalysis.database = url.pathname.slice(1) || 'Not specified';
        urlAnalysis.hasAuth = !!(url.username && url.password) ? 'Yes' : 'No';
      } catch (urlError) {
        urlAnalysis.status = 'Invalid Format';
        urlAnalysis.error =
          urlError instanceof Error ? urlError.message : 'URL parsing failed';
      }
    }
    debugInfo.databaseUrlAnalysis = urlAnalysis;

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
    console.log('Testing basic connection...');
    await db.execute(sql`SELECT 1 as test`);
    debugInfo.connectionTest = 'Success';

    // Get database version and info
    console.log('Getting database info...');
    const dbInfo = await db.execute(sql`SELECT version() as version`);
    debugInfo.databaseInfo = dbInfo.rows?.[0] || { version: 'Unknown' };

    // Test accounts table existence
    console.log('Checking accounts table...');
    const tableExists = await db.execute(sql`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'accounts'
      ) as exists
    `);

    if (tableExists.rows?.[0]?.exists) {
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
    } else {
      debugInfo.accountsTableAccess = 'Table does not exist';
      debugInfo.troubleshooting = [
        'Accounts table does not exist in database',
        'Run database migrations: npm run db:push',
        'Or run: npx drizzle-kit push',
      ];
    }

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

    // Add troubleshooting suggestions based on error
    const errorMessage = debugInfo.error?.toLowerCase() || '';
    debugInfo.troubleshooting = [];

    if (errorMessage.includes('failed query')) {
      debugInfo.troubleshooting.push(
        'Database connection string may be invalid',
        'Check if DATABASE_URL format is correct: postgresql://username:password@host:port/database',
        'Verify database server is accessible',
        'Check if database exists and is running'
      );
    }

    if (errorMessage.includes('connect') || errorMessage.includes('timeout')) {
      debugInfo.troubleshooting.push(
        'Database server may be unreachable',
        'Check network connectivity',
        'Verify database host and port',
        'Check firewall settings'
      );
    }

    if (errorMessage.includes('auth') || errorMessage.includes('permission')) {
      debugInfo.troubleshooting.push(
        'Database authentication failed',
        'Verify username and password in DATABASE_URL',
        'Check database user permissions',
        'Ensure user has access to the specified database'
      );
    }

    return NextResponse.json(debugInfo, { status: 500 });
  }
}
