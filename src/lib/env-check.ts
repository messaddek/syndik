/**
 * Environment Configuration Checker
 * Validates that all required environment variables are properly set
 */

interface EnvironmentCheck {
  variable: string;
  present: boolean;
  configured: boolean;
  secure?: boolean;
}

export function checkEnvironmentConfiguration(): {
  allConfigured: boolean;
  checks: EnvironmentCheck[];
  issues: string[];
} {
  const checks: EnvironmentCheck[] = [];
  const issues: string[] = [];

  // Check DATABASE_URL
  const databaseUrl = process.env.DATABASE_URL;
  const databaseCheck: EnvironmentCheck = {
    variable: 'DATABASE_URL',
    present: !!databaseUrl,
    configured: !!databaseUrl && databaseUrl.length > 0,
    secure:
      databaseUrl?.startsWith('postgresql://') ||
      databaseUrl?.startsWith('postgres://'),
  };
  checks.push(databaseCheck);

  if (!databaseCheck.present) {
    issues.push('DATABASE_URL environment variable is missing');
  } else if (!databaseCheck.configured) {
    issues.push('DATABASE_URL is empty');
  } else if (!databaseCheck.secure) {
    issues.push(
      'DATABASE_URL does not appear to be a valid PostgreSQL connection string'
    );
  }

  // Check other critical environment variables
  const criticalVars = [
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'NEXT_PUBLIC_CLERK_SIGN_IN_URL',
    'NEXT_PUBLIC_CLERK_SIGN_UP_URL',
  ];

  criticalVars.forEach(varName => {
    const value = process.env[varName];
    const check: EnvironmentCheck = {
      variable: varName,
      present: !!value,
      configured: !!value && value.length > 0,
    };
    checks.push(check);

    if (!check.present) {
      issues.push(`${varName} environment variable is missing`);
    } else if (!check.configured) {
      issues.push(`${varName} is empty`);
    }
  });

  const allConfigured = issues.length === 0;

  return {
    allConfigured,
    checks,
    issues,
  };
}

// Log environment status on import (development only)
if (process.env.NODE_ENV === 'development') {
  const envStatus = checkEnvironmentConfiguration();

  if (!envStatus.allConfigured) {
    console.warn('[ENV] Configuration issues detected:', {
      issues: envStatus.issues,
      timestamp: new Date().toISOString(),
    });
  } else {
    console.log('[ENV] Environment configuration is valid');
  }
}
