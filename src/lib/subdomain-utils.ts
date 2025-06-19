/**
 * Utility functions for handling subdomain-based routing
 * Supports production, staging, Vercel, and development environments
 */

export const SUBDOMAINS = {
  MAIN: 'main', // Main landing page (no subdomain)
  APP: 'app', // Application portal
  ADMIN: 'admin', // Admin portal
  API: 'api', // API endpoints (future)
} as const;

export type SubdomainType = (typeof SUBDOMAINS)[keyof typeof SUBDOMAINS];

/**
 * Enhanced environment detection
 */
export function getEnvironment(): string {
  // Explicit environment variable (highest priority)
  if (process.env.NEXT_PUBLIC_ENVIRONMENT) {
    return process.env.NEXT_PUBLIC_ENVIRONMENT;
  }

  // Vercel environment detection
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV; // 'production', 'preview', 'development'
  }

  // Hostname-based detection (client-side)
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    if (hostname.includes('staging.syndik.ma')) return 'staging';
    if (hostname.includes('syndik.ma')) return 'production';
    if (hostname.includes('.vercel.app')) return 'vercel';
    if (hostname.includes('localhost')) return 'development';
  }

  // Fallback
  return process.env.NODE_ENV || 'development';
}

/**
 * Debug environment information
 */
export function debugEnvironment() {
  const env = {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
    NEXT_PUBLIC_MAIN_URL: process.env.NEXT_PUBLIC_MAIN_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL,
    hostname:
      typeof window !== 'undefined' ? window.location.hostname : 'server',
    detected: getEnvironment(),
  };

  console.log('🔍 Environment Debug:', env);
  return env;
}

/**
 * Get the current subdomain from hostname
 * Enhanced to handle all environments properly
 */
export function getCurrentSubdomain(hostname: string): SubdomainType | null {
  console.log('🔍 getCurrentSubdomain - hostname:', hostname);

  // Debug environment for troubleshooting
  if (process.env.NODE_ENV === 'development') {
    debugEnvironment();
  }

  // Handle localhost development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    console.log('🏠 Development environment detected');

    // Check for port-based admin detection (fallback when no subdomain access)
    if (hostname.includes(':3001')) {
      console.log('✅ Admin port detected (3001)');
      return SUBDOMAINS.ADMIN;
    }

    if (hostname.startsWith('admin.')) {
      console.log('✅ Admin subdomain detected');
      return SUBDOMAINS.ADMIN;
    }
    if (hostname.startsWith('app.')) {
      console.log('✅ App subdomain detected');
      return SUBDOMAINS.APP;
    }
    // Plain localhost = main landing page
    if (hostname === 'localhost:3000' || hostname === 'localhost') {
      console.log('✅ Main domain detected');
      return SUBDOMAINS.MAIN;
    }
    console.log('🔄 Default to app subdomain');
    return SUBDOMAINS.APP; // Default for localhost with app prefix
  }

  // Handle Vercel domains (*.vercel.app)
  // NOTE: Vercel only provides ONE domain per deployment (no real subdomains)
  if (hostname.includes('.vercel.app')) {
    console.log('🚀 Vercel deployment detected - using route-based routing');

    // For Vercel, we return MAIN since there are no real subdomains
    // The app will use route-based routing (/admin-dev, /dashboard, etc.)
    console.log('✅ Vercel main domain - route-based routing enabled');
    return SUBDOMAINS.MAIN;
  }

  // Handle production domains
  const parts = hostname.split('.');

  // Handle custom domains (syndik.ma and staging.syndik.ma)
  if (parts.length === 2 && parts[0] === 'syndik' && parts[1] === 'ma') {
    console.log('✅ Main production domain detected');
    return SUBDOMAINS.MAIN;
  }

  // Handle staging.syndik.ma (no subdomain on staging)
  if (
    parts.length === 3 &&
    parts[0] === 'staging' &&
    parts[1] === 'syndik' &&
    parts[2] === 'ma'
  ) {
    console.log('✅ Main staging domain detected');
    return SUBDOMAINS.MAIN;
  }

  // If it has a subdomain on custom domain
  if (parts.length >= 3) {
    const subdomain = parts[0];
    console.log('🔍 Checking subdomain:', subdomain);

    // Handle staging subdomains (admin.staging.syndik.ma)
    if (
      parts.length === 4 &&
      parts[1] === 'staging' &&
      parts[2] === 'syndik' &&
      parts[3] === 'ma'
    ) {
      if (Object.values(SUBDOMAINS).includes(subdomain as SubdomainType)) {
        console.log('✅ Valid staging subdomain detected:', subdomain);
        return subdomain as SubdomainType;
      }
    }

    // Handle production subdomains (admin.syndik.ma)
    if (parts.length === 3 && parts[1] === 'syndik' && parts[2] === 'ma') {
      if (Object.values(SUBDOMAINS).includes(subdomain as SubdomainType)) {
        console.log('✅ Valid production subdomain detected:', subdomain);
        return subdomain as SubdomainType;
      }
    }
  }

  console.log('❌ No valid subdomain detected');
  return null;
}

/**
 * Build URL for specific subdomain
 */
export function buildSubdomainUrl(
  subdomain: SubdomainType,
  path: string = '',
  searchParams?: URLSearchParams
): string {
  const isDevelopment = process.env.NODE_ENV === 'development';

  let baseUrl: string = ''; // Initialize to avoid TypeScript error
  if (isDevelopment) {
    // Development URLs
    switch (subdomain) {
      case SUBDOMAINS.MAIN:
        baseUrl = 'http://localhost:3000';
        break;
      case SUBDOMAINS.ADMIN:
        baseUrl =
          process.env.NEXT_PUBLIC_DEV_ADMIN_URL ||
          'http://admin.localhost:3000';
        break;
      case SUBDOMAINS.APP:
        baseUrl =
          process.env.NEXT_PUBLIC_DEV_APP_URL || 'http://app.localhost:3000';
        break;
      default:
        baseUrl = 'http://localhost:3000';
    }
  } else {
    // Production URLs - handle staging, production, and Vercel
    const isCustomDomain =
      typeof window !== 'undefined'
        ? window.location.hostname.includes('syndik.ma')
        : process.env.NEXT_PUBLIC_MAIN_URL?.includes('syndik.ma');

    const isStaging =
      typeof window !== 'undefined'
        ? window.location.hostname.includes('staging.syndik.ma')
        : process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging' ||
          process.env.NEXT_PUBLIC_MAIN_URL?.includes('staging.syndik.ma');

    const isVercel =
      typeof window !== 'undefined'
        ? window.location.hostname.includes('.vercel.app')
        : process.env.VERCEL_URL?.includes('.vercel.app');
    if (isCustomDomain || !isVercel) {
      // Custom domain with real subdomains (production or staging)
      const baseDomain = isStaging ? 'staging.syndik.ma' : 'syndik.ma';
      const fallbackDomain = isStaging
        ? 'https://staging.syndik.ma'
        : 'https://syndik.ma';

      switch (subdomain) {
        case SUBDOMAINS.MAIN:
          baseUrl = process.env.NEXT_PUBLIC_MAIN_URL || fallbackDomain;
          break;
        case SUBDOMAINS.ADMIN:
          baseUrl =
            process.env.NEXT_PUBLIC_ADMIN_URL || `https://admin.${baseDomain}`;
          break;
        case SUBDOMAINS.APP:
          baseUrl =
            process.env.NEXT_PUBLIC_APP_URL || `https://app.${baseDomain}`;
          break;
        case SUBDOMAINS.API:
          baseUrl =
            process.env.NEXT_PUBLIC_API_URL || `https://api.${baseDomain}`;
          break;
        default:
          baseUrl = process.env.NEXT_PUBLIC_MAIN_URL || fallbackDomain;
      }
      console.log(
        `🌐 ${isStaging ? 'Staging' : 'Production'} Domain URL: ${baseUrl}`
      );
    } else if (isVercel) {
      // Vercel provides only ONE domain - all subdomains use the same base URL
      // Route-based routing handles admin/app separation
      const vercelBaseUrl = 'syndik.vercel.app';
      baseUrl = `https://${vercelBaseUrl}`; // Note: All subdomains return the same URL since Vercel doesn't provide real subdomains
      console.log(`🚀 Vercel URL: ${baseUrl} (route-based routing)`);
    }
  }

  // Fallback if baseUrl is still not set
  if (!baseUrl) {
    baseUrl = 'https://syndik.ma';
    console.log('⚠️ Using fallback URL:', baseUrl);
  }

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Build full URL
  const url = new URL(normalizedPath, baseUrl);

  // Add search parameters if provided
  if (searchParams) {
    for (const [key, value] of searchParams.entries()) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}

/**
 * Navigate to main landing page
 */
export function navigateToMain(path: string = '') {
  const url = buildSubdomainUrl(SUBDOMAINS.MAIN, path);
  window.location.href = url;
}

/**
 * Navigate to admin portal
 */
export function navigateToAdmin(path: string = '') {
  const url = buildSubdomainUrl(SUBDOMAINS.ADMIN, path);
  window.location.href = url;
}

/**
 * Navigate to app portal
 */
export function navigateToApp(path: string = '') {
  const url = buildSubdomainUrl(SUBDOMAINS.APP, path);
  window.location.href = url;
}

/**
 * Check if current environment supports subdomains
 */
export function supportsSubdomains(): boolean {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname;
  return !hostname.includes('localhost') && !hostname.includes('127.0.0.1');
}

/**
 * Get the appropriate URL based on current environment
 */
export function getEnvironmentUrl(
  subdomain: SubdomainType,
  path: string = ''
): string {
  if (supportsSubdomains()) {
    return buildSubdomainUrl(subdomain, path);
  }

  // Fallback to path-based routing for development
  switch (subdomain) {
    case SUBDOMAINS.ADMIN:
      return `/admin${path}`;
    case SUBDOMAINS.APP:
      return path || '/';
    default:
      return path || '/';
  }
}

/**
 * Role-based navigation helper
 */
export function navigateBasedOnRole(
  role: string,
  target?: 'portal' | 'dashboard' | 'admin'
) {
  switch (target) {
    case 'admin':
      navigateToAdmin();
      break;
    case 'portal':
      navigateToApp('/portal');
      break;
    case 'dashboard':
      navigateToApp('/dashboard');
      break;
    default:
      // Default role-based routing
      switch (role) {
        case 'admin':
          navigateToAdmin();
          break;
        case 'manager':
          navigateToApp('/dashboard');
          break;
        case 'member':
          navigateToApp('/portal');
          break;
        default:
          navigateToApp('/dashboard');
      }
  }
}

/**
 * Cross-subdomain navigation helper for React Router
 */
export function useCrossSubdomainNavigation() {
  return {
    navigateToMain,
    navigateToAdmin,
    navigateToApp,
    navigateBasedOnRole,
    getCurrentSubdomain: () => getCurrentSubdomain(window.location.hostname),
    supportsSubdomains,
  };
}
