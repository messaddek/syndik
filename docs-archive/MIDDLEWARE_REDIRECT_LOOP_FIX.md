# 🚨 MIDDLEWARE REDIRECT LOOP FIX

## Issues Identified from Logs

### 1. **Redirect Loops on App Subdomain**

Routes already on `app.staging.syndik.ma` were being redirected again:

- `/en/dashboard` → 307 redirect (should be 200)
- `/en/settings` → 307 redirect (should be 200)
- `/en/meetings` → 307 redirect (should be 200)

### 2. **Root Cause**

The middleware was running redirect logic **globally** instead of only on the main domain.

### 3. **Authentication Issues**

```
GET 401 app.staging.syndik.ma /api/trpc/accounts.getOrganizationUsage
```

This suggests database connectivity issues are still present.

---

## ✅ Fixes Applied

### 1. **Removed Global Route Detection**

**Before:**

```typescript
// This ran for ALL requests, including app subdomain
const isDashboardRoute =
  pathname.startsWith('/dashboard') || pathname.match(/^\/[a-z]{2}\/dashboard/);
if (isDashboardRoute || isPortalRoute || isAdminRoute) {
  console.log('🔍 Route Detection:', {
    /* debug info */
  });
}
```

**After:**

```typescript
// Debug only runs in main domain redirect section
// Removed global route detection that was causing confusion
```

### 2. **Fixed Redirect Logic Scope**

**Before:**

```typescript
// Redirect logic ran regardless of current subdomain
if (isDashboardRoute || isPortalRoute || isOrgRoute) {
  // Always redirected, even on app subdomain
}
```

**After:**

```typescript
} else if (currentSubdomain === SUBDOMAINS.MAIN || currentSubdomain === null) {
  // Redirect logic ONLY runs on main domain
  if (isDashboardRoute || isPortalRoute || isOrgRoute) {
    // Only redirects when NOT already on correct subdomain
  }
}
```

### 3. **Improved Debug Logging**

Added specific debug logging only where needed:

```typescript
console.log('🔍 Main Domain Route Detection:', {
  isDashboardRoute,
  isPortalRoute,
  isOrgRoute,
  currentSubdomain,
  willRedirect: true,
});
```

---

## 🧪 Expected Behavior After Fix

### App Subdomain (`app.staging.syndik.ma`)

- ✅ `/` → 200 (rewrites to `/en/dashboard`)
- ✅ `/en` → 200 (rewrites to `/en/dashboard`)
- ✅ `/en/dashboard` → 200 (serves directly)
- ✅ `/en/settings` → 200 (serves directly)
- ✅ `/en/meetings` → 200 (serves directly)
- ✅ `/en/portal` → 200 (serves directly)

### Main Domain (`staging.syndik.ma`)

- ✅ `/dashboard` → 307 redirect to `app.staging.syndik.ma/`
- ✅ `/en/dashboard` → 307 redirect to `app.staging.syndik.ma/en`
- ✅ `/en/dashboard/settings` → 307 redirect to `app.staging.syndik.ma/en/settings`

### Admin Subdomain (`admin.staging.syndik.ma`)

- ✅ `/` → 200 (rewrites to `/en/admin`)
- ✅ `/en/admin` → 200 (serves directly)

---

## 🔍 Testing the Fix

### 1. Test App Subdomain Routes

```bash
# These should all return 200 status
curl -I https://app.staging.syndik.ma/
curl -I https://app.staging.syndik.ma/en
curl -I https://app.staging.syndik.ma/en/dashboard
curl -I https://app.staging.syndik.ma/en/settings
curl -I https://app.staging.syndik.ma/en/meetings
```

### 2. Test Main Domain Redirects

```bash
# These should return 307 redirects
curl -I https://staging.syndik.ma/en/dashboard
curl -I https://staging.syndik.ma/en/dashboard/settings
```

### 3. Check Logs

Look for these log patterns in Vercel logs:

**Good logs (App subdomain):**

```
🌐 Middleware - Hostname: app.staging.syndik.ma
🌐 Middleware - Pathname: /en/settings
🌐 Middleware - Subdomain: app
🚀 App Locale Root - Rewriting /en to /en/dashboard  # Only for /en root
```

**Good logs (Main domain):**

```
🌐 Middleware - Hostname: staging.syndik.ma
🔍 Main Domain Route Detection: { isDashboardRoute: true, willRedirect: true }
🚀 Redirecting dashboard to clean URL: /en/dashboard → https://app.staging.syndik.ma/en
```

---

## 🚨 Remaining Issues to Address

### 1. **Database Connectivity**

```
GET 401 app.staging.syndik.ma /api/trpc/accounts.getOrganizationUsage
```

**Action needed:**

- Create the staging database as discussed earlier
- Verify DATABASE_URL is correctly set
- Test `/api/debug-db` endpoint

### 2. **Sign-in Redirects**

```
GET 307 app.staging.syndik.ma /sign-in
```

**This might be normal** - non-localized routes being redirected to localized versions.

### 3. **Route Structure Verification**

Verify that routes like `/en/settings`, `/en/meetings` actually exist in your Next.js app structure:

```
src/app/[locale]/
├── dashboard/
│   ├── page.tsx
│   ├── settings/
│   │   └── page.tsx
│   └── meetings/
│       └── page.tsx
├── settings/          # Direct routes (if they exist)
│   └── page.tsx
└── meetings/          # Direct routes (if they exist)
    └── page.tsx
```

---

## 🚀 Deploy and Test

1. **Deploy the middleware fix:**

   ```bash
   vercel --prod --scope syndik-staging
   ```

2. **Test immediately after deployment:**

   ```bash
   curl -I https://app.staging.syndik.ma/en/settings
   # Should return 200, not 307
   ```

3. **Monitor logs:**

   ```bash
   vercel logs --scope syndik-staging --follow
   ```

4. **Test database connectivity:**
   ```bash
   curl https://staging.syndik.ma/api/debug-db
   # Should show database connection status
   ```

The middleware fix should eliminate the redirect loops on the app subdomain, allowing routes to work normally when users are already on the correct subdomain.
