/**
 * Get the appropriate redirect URL after sign out based on the current environment
 */
export function getSignOutRedirectUrl(): string {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // Check if we're on staging
    if (hostname.includes('staging.syndik.ma')) {
      return 'https://staging.syndik.ma';
    }

    // Check if we're on production
    if (hostname.includes('syndik.ma')) {
      return 'https://syndik.ma';
    }
  }

  // Default fallback for development or unknown environments
  return '/';
}
