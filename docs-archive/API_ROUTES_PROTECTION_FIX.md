# 🚨 CRITICAL FIX: API ROUTES PROTECTION FROM SUBDOMAIN REDIRECTS

## Issue Identified

**CRITICAL PROBLEM:** API routes (`/api/*`) were potentially being processed by subdomain redirect logic, which could cause:

1. **tRPC calls to fail** - `/api/trpc/*` routes being redirected
2. **Authentication API issues** - Clerk API routes being affected
3. **Custom API endpoints failing** - Any `/api/*` route being redirected
4. **Database connection issues** - API routes not reaching their handlers

## Root Cause

The middleware was structured like this:

```typescript
export default clerkMiddleware(async (auth, req) => {
  // Subdomain detection and redirect logic
  if (isDashboardRoute || isPortalRoute || isOrgRoute) {
    // REDIRECT LOGIC - This could affect API routes!
    return NextResponse.redirect(new URL(appUrl));
  }

  // API route handling came AFTER subdomain logic
  if (pathname.startsWith('/api')) {
    return; // Too late!
  }
});
```

**Problem:** API routes were processed by subdomain logic before the API route check.

---

## ✅ Fix Applied

### 1. **Early API Route Return**

```typescript
export default clerkMiddleware(async (auth, req) => {
  // FIRST PRIORITY: Handle API routes immediately
  if (pathname.startsWith('/api')) {
    console.log('🔧 API Route - Skipping subdomain logic:', pathname);
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
    return; // Early return - no subdomain processing
  }

  // Static files protection
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    console.log('🔧 Static/Internal - Skipping subdomain logic:', pathname);
    return; // Early return for static files
  }

  // THEN: Subdomain logic for page routes only
  // ... subdomain detection and redirects
});
```

### 2. **Protected Route Types**

Now these routes bypass ALL subdomain logic:

- ✅ `/api/trpc/*` - tRPC endpoints
- ✅ `/api/auth/*` - Clerk authentication
- ✅ `/api/debug-db` - Database debug endpoint
- ✅ `/api/webhooks/*` - Webhook handlers
- ✅ `/_next/*` - Next.js internals
- ✅ `/favicon.ico` - Static assets
- ✅ `/*.js`, `/*.css`, etc. - Static files

### 3. **Removed Duplicate API Handling**

Cleaned up the middleware by removing duplicate API route logic at the end.

---

## 🎯 Impact on Current Issues

### Before Fix:

```
❌ GET 401 app.staging.syndik.ma /api/trpc/accounts.getOrganizationUsage
```

**Possible cause:** API route being processed by subdomain redirect logic

### After Fix:

```
✅ API routes bypass all subdomain logic entirely
✅ tRPC calls go directly to their handlers
✅ No risk of API routes being redirected
```

---

## 🧪 Testing API Route Protection

### 1. **Test tRPC Endpoints**

```bash
# These should work without any redirects
curl -I https://app.staging.syndik.ma/api/trpc/accounts.getCurrentAccount
curl -I https://staging.syndik.ma/api/trpc/accounts.getCurrentAccount

# Should return 200/401/500 but NOT 307 redirects
```

### 2. **Test Debug Endpoint**

```bash
# Should work from any domain
curl https://app.staging.syndik.ma/api/debug-db
curl https://staging.syndik.ma/api/debug-db
curl https://admin.staging.syndik.ma/api/debug-db

# All should return JSON, not redirects
```

### 3. **Check Logs for API Routes**

Look for these log messages:

```
🔧 API Route - Skipping subdomain logic: /api/trpc/accounts.getCurrentAccount
🔧 API Route - Skipping subdomain logic: /api/debug-db
🔧 Static/Internal - Skipping subdomain logic: /_next/static/chunks/...
```

---

## 🔍 Middleware Processing Order

### New Order (Fixed):

1. **API Routes** → Early return (skip all subdomain logic)
2. **Static Files** → Early return (skip all subdomain logic)
3. **Development Routes** → Admin-dev fallbacks
4. **Subdomain Logic** → Admin/App subdomain handling
5. **Main Domain Redirects** → Dashboard/Portal redirects
6. **Locale Handling** → Org route localization
7. **Internationalization** → Next-intl middleware

### Key Benefits:

- ✅ **API routes are never redirected**
- ✅ **Static files load correctly**
- ✅ **Performance improved** (early returns)
- ✅ **No subdomain interference** with API calls

---

## 🚨 Critical for These Scenarios

### 1. **Database Connectivity**

```typescript
// This API call should never be redirected
fetch('/api/debug-db')
  .then(res => res.json())
  .then(data => console.log(data.success));
```

### 2. **tRPC Authentication**

```typescript
// These calls must reach their handlers directly
trpc.accounts.getCurrentAccount.useQuery();
trpc.accounts.getOrganizationUsage.useQuery();
```

### 3. **Clerk Authentication**

```typescript
// Clerk API routes must work from any subdomain
// /api/auth/*, webhook endpoints, etc.
```

---

## 🔄 Before vs After

### Before (Problematic):

```
User visits: app.staging.syndik.ma
JavaScript makes: fetch('/api/trpc/accounts.getCurrentAccount')
Middleware processes: Subdomain logic → Maybe redirect? → API handler
Result: Possible 307 redirect or processing delays
```

### After (Fixed):

```
User visits: app.staging.syndik.ma
JavaScript makes: fetch('/api/trpc/accounts.getCurrentAccount')
Middleware processes: API route detected → Early return → API handler
Result: Direct API processing, no redirects
```

---

## 🚀 Deploy and Verify

1. **Deploy the fix:**

   ```bash
   vercel --prod --scope syndik-staging
   ```

2. **Test API routes immediately:**

   ```bash
   # Should return JSON, not redirects
   curl https://app.staging.syndik.ma/api/debug-db
   ```

3. **Test tRPC calls:**

   - Open browser dev tools
   - Visit `https://app.staging.syndik.ma/en`
   - Check Network tab for `/api/trpc/*` calls
   - Should see 200/401/500 status, NOT 307 redirects

4. **Monitor logs:**
   ```bash
   vercel logs --scope syndik-staging --follow
   # Look for: "🔧 API Route - Skipping subdomain logic"
   ```

This fix ensures that API routes are completely protected from subdomain redirect logic, which should resolve the authentication and database connectivity issues you're experiencing.
