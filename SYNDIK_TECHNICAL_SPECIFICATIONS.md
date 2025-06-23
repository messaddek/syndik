# Syndik Technical Specifications

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Subdomain Architecture](#subdomain-architecture)
3. [Middleware Implementation](#middleware-implementation)
4. [Routing & URL Management](#routing--url-management)
5. [Database Configuration](#database-configuration)
6. [Deployment & Environment Setup](#deployment--environment-setup)
7. [Authentication & Security](#authentication--security)
8. [Internationalization (i18n)](#internationalization-i18n)
9. [Performance Optimization](#performance-optimization)
10. [API Protection & tRPC](#api-protection--trpc)
11. [Troubleshooting & Debugging](#troubleshooting--debugging)
12. [Development Workflow](#development-workflow)

---

## Architecture Overview

### System Architecture

The Syndik application follows a modern Next.js SaaS architecture with:

- **Multi-tenant subdomain routing**
- **Role-based access control**
- **Internationalization support (Arabic/French/English)**
- **Real-time features with tRPC**
- **Scalable database design with Drizzle ORM**

### Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes, tRPC
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **Deployment**: Vercel
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl

---

## Subdomain Architecture

### Domain Structure

```
syndik.ma (Main Landing)
├── /                     # Landing page
├── /about               # About page
├── /pricing             # Pricing page
├── /features            # Features page
├── /contact             # Contact page
├── /sign-in, /sign-up   # Authentication
└── /help, /support      # Public help/support

app.syndik.ma (Application Portal)
├── /dashboard/*         # Property Management Dashboard (admin/manager)
├── /portal/*            # Resident Portal (member)
├── /org-switcher        # Organization selection
├── /org-redirect        # Role-based routing
└── /settings, /profile  # User settings

admin.syndik.ma (System Admin Portal)
├── /                    # Admin Dashboard
├── /organizations       # Organization Management
├── /users              # User Management
├── /b2b-tickets        # B2B Support Tickets
├── /security           # Security Settings
├── /database           # Database Management
└── /settings           # System Settings
```

### Subdomain Configuration

#### Production Environment

```bash
NEXT_PUBLIC_MAIN_URL=https://syndik.ma
NEXT_PUBLIC_APP_URL=https://app.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.syndik.ma
```

#### Staging Environment

```bash
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma
```

#### Local Development

```bash
NEXT_PUBLIC_MAIN_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://app.localhost:3000
NEXT_PUBLIC_ADMIN_URL=http://admin.localhost:3000
```

### Local Development Setup

#### Windows Setup

```powershell
# Add to C:\Windows\System32\drivers\etc\hosts
127.0.0.1 localhost
127.0.0.1 app.localhost
127.0.0.1 admin.localhost
```

#### macOS/Linux Setup

```bash
# Add to /etc/hosts
127.0.0.1 localhost
127.0.0.1 app.localhost
127.0.0.1 admin.localhost
```

---

## Middleware Implementation

### Core Middleware Logic

The middleware handles subdomain routing, authentication, and API protection with the following priority order:

1. **API Route Protection** (Highest Priority)
2. **Static File Handling**
3. **Subdomain Detection**
4. **Route-based Redirects**
5. **Authentication Protection**

### Key Implementation Details

#### API Route Protection

```typescript
// FIRST PRIORITY: Handle API routes immediately
if (pathname.startsWith('/api')) {
  console.log('🔧 API Route - Skipping subdomain logic:', pathname);
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  return; // Early return - no subdomain processing
}
```

#### Static File Protection

```typescript
// Static files protection
if (
  pathname.startsWith('/_next') ||
  pathname.startsWith('/favicon.ico') ||
  pathname.includes('.')
) {
  console.log('🔧 Static/Internal - Skipping subdomain logic:', pathname);
  return; // Early return for static files
}
```

#### Subdomain Detection

```typescript
const currentSubdomain = getCurrentSubdomain(req);

const SUBDOMAINS = {
  MAIN: null,
  APP: 'app',
  ADMIN: 'admin',
} as const;
```

#### Redirect Logic Scope

```typescript
// Redirect logic ONLY runs on main domain
if (currentSubdomain === SUBDOMAINS.MAIN || currentSubdomain === null) {
  if (isDashboardRoute || isPortalRoute || isOrgRoute) {
    // Only redirects when NOT already on correct subdomain
    const appUrl = new URL(getAppUrl());
    appUrl.pathname = pathname;
    return NextResponse.redirect(appUrl);
  }
}
```

### Middleware Fixes Applied

#### 1. Redirect Loop Prevention

- **Issue**: Routes on app subdomain were being redirected again
- **Fix**: Scoped redirect logic to only run on main domain
- **Result**: No more infinite redirects on app/admin subdomains

#### 2. API Route Protection

- **Issue**: API routes were processed by subdomain logic
- **Fix**: Added early return for all `/api/*` routes
- **Result**: tRPC and authentication APIs work correctly

#### 3. Clean URL Implementation

- **Issue**: URLs like `/en/dashboard` were visible to users
- **Fix**: Implemented rewrites to hide locale prefixes on app subdomain
- **Result**: Users see clean URLs like `/dashboard`

---

## Routing & URL Management

### Clean URLs Implementation

#### User-Facing URLs (App Subdomain)

```
app.syndik.ma/dashboard    # Clean URL (user sees this)
app.syndik.ma/settings     # Clean URL
app.syndik.ma/portal       # Clean URL
app.syndik.ma/meetings     # Clean URL
```

#### Internal Rewrites

```typescript
// Internal rewrite logic
if (currentSubdomain === SUBDOMAINS.APP) {
  if (pathname === '/' || pathname === `/${locale}`) {
    // Rewrite to dashboard
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/dashboard`;
    return NextResponse.rewrite(url);
  }
}
```

#### Locale-Prefixed Route Handling

```typescript
// Handle locale-prefixed routes that should redirect to app subdomain
const isDashboardRoute =
  pathname.startsWith('/dashboard') || pathname.match(/^\/[a-z]{2}\/dashboard/);

const isPortalRoute =
  pathname.startsWith('/portal') || pathname.match(/^\/[a-z]{2}\/portal/);
```

### Route Protection

#### Public Routes

```typescript
const publicRoutes = [
  '/',
  '/about',
  '/pricing',
  '/features',
  '/contact',
  '/help',
  '/support',
  '/sign-in',
  '/sign-up',
  '/api/webhooks/(.*)',
  '/api/debug-db',
];
```

#### Protected Routes

```typescript
const protectedRoutes = [
  '/dashboard(.*)',
  '/portal(.*)',
  '/settings(.*)',
  '/profile(.*)',
  '/org-switcher',
  '/org-redirect',
];
```

---

## Database Configuration

### Drizzle ORM Setup

#### Schema Structure

```typescript
// Core tables
-users -
  organizations -
  organization_members -
  buildings -
  units -
  residents -
  meetings -
  helpdesk_categories -
  helpdesk_tickets -
  articles;
```

#### Connection Configuration

```typescript
// drizzle.config.ts
export default {
  schema: './drizzle/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

### Database Environments

#### Production Database

```bash
DATABASE_URL=postgresql://prod_user:password@prod-db.neon.tech/syndik_prod
```

#### Staging Database

```bash
DATABASE_URL=postgresql://staging_user:password@staging-db.neon.tech/syndik_staging
```

#### Development Database

```bash
DATABASE_URL=postgresql://dev_user:password@localhost:5432/syndik_dev
```

### Migration Management

#### Running Migrations

```bash
# Generate migration
npm run db:generate

# Push to database
npm run db:push

# Studio for database management
npm run db:studio
```

#### Migration Files Structure

```
drizzle/
├── 0000_military_newton_destine.sql
├── 0001_married_meteorite.sql
├── 0002_mixed_mesmero.sql
├── 0003_cynical_gambit.sql
├── 0004_panoramic_gorilla_man.sql
├── 0005_helpdesk_indexes.sql
├── 0006_add_b2b_helpdesk_support.sql
├── schema.ts
├── relations.ts
└── meta/
    ├── _journal.json
    └── snapshots/
```

### Database Indexing Strategy

#### Performance Indexes

```sql
-- Helpdesk performance indexes
CREATE INDEX IF NOT EXISTS helpdesk_tickets_organization_id_idx
ON helpdesk_tickets (organization_id);

CREATE INDEX IF NOT EXISTS helpdesk_tickets_status_idx
ON helpdesk_tickets (status);

CREATE INDEX IF NOT EXISTS helpdesk_tickets_priority_idx
ON helpdesk_tickets (priority);

CREATE INDEX IF NOT EXISTS helpdesk_tickets_created_at_idx
ON helpdesk_tickets (created_at);
```

---

## Deployment & Environment Setup

### Vercel Project Structure

#### Two-Project Setup

**Production Project**: `syndik-production`

- **Branch**: `main`
- **Domains**: `syndik.ma`, `app.syndik.ma`, `admin.syndik.ma`
- **Database**: Production Neon database
- **Auth**: Production Clerk keys

**Staging Project**: `syndik-staging`

- **Branch**: `staging`
- **Domains**: `staging.syndik.ma`, `app.staging.syndik.ma`, `admin.staging.syndik.ma`
- **Database**: Staging Neon database
- **Auth**: Staging/Test Clerk keys

### Environment Variables

#### Production Environment

```bash
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_MAIN_URL=https://syndik.ma
NEXT_PUBLIC_APP_URL=https://app.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.syndik.ma

# Database
DATABASE_URL=postgresql://prod_user:password@prod-db.neon.tech/syndik_prod

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
CLERK_WEBHOOK_SECRET=whsec_production...

# Additional URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/org-switcher
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/org-switcher
```

#### Staging Environment

```bash
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma

# Database
DATABASE_URL=postgresql://staging_user:password@staging-db.neon.tech/syndik_staging

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_staging...
```

### Deployment Scripts

#### Build Configuration

```json
{
  "scripts": {
    "build": "next build",
    "start": "next start",
    "dev": "next dev",
    "dev:all": "concurrently \"npm run dev\" \"npm run db:studio\"",
    "setup:subdomains": "node scripts/setup-subdomains.js",
    "setup:subdomains:win": "powershell scripts/setup-subdomains.ps1"
  }
}
```

#### Vercel Configuration

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### Domain Configuration

#### Custom Domains Setup

1. **Add domains in Vercel**:

   - Production: `syndik.ma`, `app.syndik.ma`, `admin.syndik.ma`
   - Staging: `staging.syndik.ma`, `app.staging.syndik.ma`, `admin.staging.syndik.ma`

2. **DNS Configuration**:

   ```
   # A Records
   syndik.ma → 76.76.19.61

   # CNAME Records
   app.syndik.ma → cname.vercel-dns.com
   admin.syndik.ma → cname.vercel-dns.com
   staging.syndik.ma → cname.vercel-dns.com
   app.staging.syndik.ma → cname.vercel-dns.com
   admin.staging.syndik.ma → cname.vercel-dns.com
   ```

3. **SSL Certificate**: Automatic via Vercel

---

## Authentication & Security

### Clerk Integration

#### Authentication Flow

1. **User lands on main domain** (`syndik.ma`)
2. **Sign-in/Sign-up** on main domain
3. **Redirect to org-switcher** on app subdomain
4. **Role-based routing** to appropriate portal

#### Organization-based Access Control

```typescript
// Role definitions
export const UserRole = {
  ADMIN: 'admin', // Full organization access
  MANAGER: 'manager', // Building management
  MEMBER: 'member', // Resident portal
  SUPER_ADMIN: 'super_admin', // System admin
} as const;
```

#### Protected Route Implementation

```typescript
// middleware.ts
if (!isPublicRoute(req)) {
  await auth.protect({
    role: ['admin', 'manager', 'member'],
    redirectToSignIn: true,
  });
}
```

### Security Best Practices

#### API Route Protection

- **Early return for API routes** to bypass subdomain logic
- **Role-based access control** on sensitive endpoints
- **Rate limiting** on public APIs
- **CSRF protection** via Clerk

#### Environment Security

- **Separate staging/production** environments
- **Environment-specific** database credentials
- **Webhook secret validation**
- **HTTPS enforcement** in production

---

## Internationalization (i18n)

### Supported Languages

- **Arabic (ar)**: RTL support
- **French (fr)**: LTR support
- **English (en)**: Default, LTR support

### next-intl Configuration

#### Locale Routing

```typescript
// i18n.ts
export const locales = ['en', 'fr', 'ar'] as const;
export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Africa/Casablanca',
  };
});
```

#### Message Structure

```
src/messages/
├── en.json     # English translations
├── fr.json     # French translations
├── ar.json     # Arabic translations
└── README.md   # Translation guidelines
```

### RTL Support Implementation

#### Dynamic Direction Provider

```typescript
// components/dynamic-direction-provider.tsx
'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

export function DynamicDirectionProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale]);

  return <>{children}</>;
}
```

#### CSS RTL Support

```css
/* globals.css */
[dir='rtl'] .text-left {
  text-align: right;
}
[dir='rtl'] .text-right {
  text-align: left;
}
[dir='rtl'] .ml-auto {
  margin-left: unset;
  margin-right: auto;
}
[dir='rtl'] .mr-auto {
  margin-right: unset;
  margin-left: auto;
}
```

### Translation Implementation

#### Component Translation

```typescript
// Example component
import { useTranslations } from 'next-intl';

export function Dashboard() {
  const t = useTranslations('dashboard');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

#### Table Translation

```typescript
// Table column translations
const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('table.name')} />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('table.status')} />
    ),
  }
];
```

---

## Performance Optimization

### Database Optimization

#### Query Optimization

```typescript
// Optimized queries with proper indexing
const tickets = await db
  .select()
  .from(helpdeskTickets)
  .where(
    and(
      eq(helpdeskTickets.organizationId, organizationId),
      eq(helpdeskTickets.status, 'open')
    )
  )
  .orderBy(desc(helpdeskTickets.createdAt))
  .limit(pagination.pageSize)
  .offset(pagination.offset);
```

#### Index Strategy

- **Organization-based indexes** for multi-tenant queries
- **Status and priority indexes** for filtering
- **Timestamp indexes** for sorting
- **Composite indexes** for complex queries

### Frontend Optimization

#### Component Lazy Loading

```typescript
// Lazy load heavy components
const HeavyDashboard = lazy(() => import('./heavy-dashboard'));
const DataTable = lazy(() => import('./data-table'));
```

#### Image Optimization

```typescript
// Next.js Image optimization
import Image from 'next/image';

<Image
  src="/logo.svg"
  alt="Syndik Logo"
  width={120}
  height={40}
  priority={true}
/>
```

#### Bundle Analysis

```bash
# Analyze bundle size
npm run build && npm run analyze
```

### Caching Strategy

#### Page-level Caching

```typescript
// Static page generation
export const revalidate = 3600; // 1 hour

// Dynamic with caching
export const dynamic = 'force-dynamic';
export const fetchCache = 'auto';
```

#### API Response Caching

```typescript
// tRPC with caching
export const organizationRouter = createTRPCRouter({
  getUsage: protectedProcedure.query(async ({ ctx }) => {
    // Cache for 5 minutes
    return unstable_cache(
      async () => await getOrganizationUsage(ctx.org.id),
      [`org-usage-${ctx.org.id}`],
      { revalidate: 300 }
    )();
  }),
});
```

---

## API Protection & tRPC

### tRPC Router Structure

#### Router Organization

```typescript
// server/api/root.ts
export const appRouter = createTRPCRouter({
  accounts: accountsRouter,
  buildings: buildingsRouter,
  helpdesk: helpdeskRouter,
  meetings: meetingsRouter,
  residents: residentsRouter,
  organizations: organizationsRouter,
});
```

#### Protected Procedures

```typescript
// Example protected procedure
export const helpdeskRouter = createTRPCRouter({
  createTicket: protectedProcedure
    .input(createTicketSchema)
    .mutation(async ({ ctx, input }) => {
      // Verify organization access
      if (ctx.org.id !== input.organizationId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Access denied to organization',
        });
      }

      return await db.insert(helpdeskTickets).values({
        ...input,
        createdBy: ctx.userId,
      });
    }),
});
```

### API Route Protection

#### Middleware Protection

```typescript
// API routes are protected in middleware
if (pathname.startsWith('/api')) {
  console.log('🔧 API Route - Skipping subdomain logic:', pathname);
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  return; // Early return - no subdomain processing
}
```

#### Public API Routes

```typescript
const publicApiRoutes = [
  '/api/webhooks/clerk',
  '/api/webhooks/stripe',
  '/api/debug-db',
  '/api/health',
];
```

### Error Handling

#### tRPC Error Handling

```typescript
// Error handling in procedures
.mutation(async ({ ctx, input }) => {
  try {
    return await performOperation(input);
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Database operation failed',
        cause: error
      });
    }
    throw error;
  }
});
```

#### Client-side Error Handling

```typescript
// React Query error handling
const { mutate, error, isError } = api.helpdesk.createTicket.useMutation({
  onError: error => {
    toast.error(`Failed to create ticket: ${error.message}`);
  },
  onSuccess: () => {
    toast.success('Ticket created successfully');
  },
});
```

---

## Troubleshooting & Debugging

### Common Issues & Solutions

#### 1. Subdomain Redirect Loops

**Symptoms**: Infinite redirects on app/admin subdomains
**Solution**: Ensure redirect logic only runs on main domain

```typescript
if (currentSubdomain === SUBDOMAINS.MAIN || currentSubdomain === null) {
  // Redirect logic here only
}
```

#### 2. API Route Failures

**Symptoms**: tRPC calls failing, 401 errors on API routes
**Solution**: Ensure API routes have early return in middleware

```typescript
if (pathname.startsWith('/api')) {
  return; // Early return before subdomain logic
}
```

#### 3. Database Connection Issues

**Symptoms**: Connection timeouts, auth failures
**Solution**: Verify environment variables and connection strings

```bash
# Test database connection
npm run db:studio
```

#### 4. Authentication Issues

**Symptoms**: User not authenticated after sign-in
**Solution**: Check Clerk configuration and webhook setup

```bash
# Verify Clerk environment variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

### Debug Logging

#### Middleware Debug Logs

```typescript
// Enable debug logging in middleware
console.log('🔍 Main Domain Route Detection:', {
  isDashboardRoute,
  isPortalRoute,
  isOrgRoute,
  currentSubdomain,
  willRedirect: true,
});
```

#### Database Debug

```typescript
// Enable Drizzle query logging
export const db = drizzle(sql, {
  schema,
  logger: process.env.NODE_ENV === 'development',
});
```

#### API Debug Endpoint

```typescript
// pages/api/debug-db.ts
export default async function handler(req: NextRequest) {
  try {
    const result = await db.select().from(users).limit(1);
    return Response.json({
      status: 'success',
      connection: 'ok',
      sampleQuery: result,
    });
  } catch (error) {
    return Response.json(
      {
        status: 'error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
```

### Performance Monitoring

#### Vercel Analytics

```typescript
// Enable Vercel Analytics
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Error Monitoring

```typescript
// Error boundary for client-side errors
'use client';

import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function AppErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
```

---

## Development Workflow

### Git Workflow

#### Branch Strategy

```
main           # Production-ready code
├── staging    # Staging environment
├── develop    # Development integration
└── feature/*  # Feature branches
```

#### Development Process

1. **Create feature branch** from `develop`
2. **Implement feature** with tests
3. **Create pull request** to `develop`
4. **Deploy to staging** for testing
5. **Merge to main** for production

### Testing Strategy

#### Unit Testing

```bash
# Run unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

#### Integration Testing

```bash
# E2E tests with Playwright
npm run test:e2e

# Component testing
npm run test:components
```

#### Database Testing

```bash
# Test database migrations
npm run db:test-migrations

# Seed test data
npm run db:seed:test
```

### Code Quality

#### ESLint Configuration

```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

#### Prettier Configuration

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### Build & Deployment

#### Local Development

```bash
# Start development server
npm run dev

# Start with database studio
npm run dev:all

# Setup local subdomains
npm run setup:subdomains     # macOS/Linux
npm run setup:subdomains:win # Windows
```

#### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start

# Analyze bundle
npm run analyze
```

#### Environment Management

```bash
# Copy environment template
cp .env.example .env.local

# Validate environment variables
npm run validate:env
```

---

## Conclusion

This technical specification provides comprehensive coverage of the Syndik application's technical implementation, including:

- **Architecture patterns** and subdomain routing
- **Middleware implementation** with proper API protection
- **Database design** and optimization strategies
- **Deployment configurations** for staging and production
- **Authentication flows** and security measures
- **Internationalization** with RTL support
- **Performance optimization** techniques
- **Debugging and troubleshooting** procedures

The system is designed for scalability, maintainability, and multi-tenant SaaS operations with robust error handling and comprehensive monitoring capabilities.
