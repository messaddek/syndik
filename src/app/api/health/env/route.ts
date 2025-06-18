import { NextResponse } from 'next/server';
import { checkEnvironmentConfiguration } from '@/lib/env-check';

export async function GET() {
  try {
    const envStatus = checkEnvironmentConfiguration();

    const response = {
      status: envStatus.allConfigured ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      environment: {
        nodeEnv: process.env.NODE_ENV,
        allConfigured: envStatus.allConfigured,
        checks: envStatus.checks.map(check => ({
          variable: check.variable,
          present: check.present,
          configured: check.configured,
          secure: check.secure,
        })),
        issues: envStatus.issues,
      },
    };

    const statusCode = envStatus.allConfigured ? 200 : 500;
    return NextResponse.json(response, { status: statusCode });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: errorMessage,
        environment: {
          nodeEnv: process.env.NODE_ENV,
          message: 'Failed to check environment configuration',
        },
      },
      { status: 500 }
    );
  }
}
