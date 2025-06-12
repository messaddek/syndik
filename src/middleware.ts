import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/about',
  '/pricing',
  '/faq',
  '/help',
  '/terms',
  '/privacy',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks/clerk',
]);

// const isPortalRoute = createRouteMatcher(['/portal(.*)']);
// const isAdminRoute = createRouteMatcher([
//   '/dashboard(.*)',
//   '/buildings(.*)',
//   '/units(.*)',
//   '/residents(.*)',
//   '/meetings(.*)',
//   '/finances(.*)',
//   '/settings(.*)',
// ]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  // Role-based routing will be handled in layout components
  // since we need to access the database to check user roles
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
