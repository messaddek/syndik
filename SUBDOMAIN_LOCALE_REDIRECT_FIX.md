# 🔄 SUBDOMAIN REDIRECT FIX - LOCALE-PREFIXED ROUTES

## Issue Fixed

**Problem:** `https://staging.syndik.ma/en/dashboard` was not redirecting to `https://app.staging.syndik.ma/en/dashboard`

**Root Cause:** The middleware was only checking for routes starting with `/dashboard`, but not handling locale-prefixed routes like `/en/dashboard`.

---

## ✅ Changes Made

### 1. Enhanced Route Detection in Middleware

**Before:**

```typescript
if (
  pathname.startsWith('/dashboard') ||
  pathname.startsWith('/portal') ||
  pathname.startsWith('/org-')
) {
  // redirect logic
}
```

**After:**

```typescript
const isDashboardRoute =
  pathname.startsWith('/dashboard') || pathname.match(/^\/[a-z]{2}\/dashboard/);
const isPortalRoute =
  pathname.startsWith('/portal') || pathname.match(/^\/[a-z]{2}\/portal/);
const isOrgRoute =
  pathname.startsWith('/org-') || pathname.match(/^\/[a-z]{2}\/org-/);

if (isDashboardRoute || isPortalRoute || isOrgRoute) {
  // redirect logic
}
```

### 2. Enhanced Admin Route Detection

**Before:**

```typescript
if (pathname.startsWith('/admin')) {
  // admin redirect logic
}
```

**After:**

```typescript
const isAdminRoute =
  pathname.startsWith('/admin') || pathname.match(/^\/[a-z]{2}\/admin/);

if (isAdminRoute) {
  // admin redirect logic
}
```

### 3. Added Enhanced Debugging

Added comprehensive route detection logging to help troubleshoot subdomain redirects:

```typescript
// Debug route detection
const isDashboardRoute =
  pathname.startsWith('/dashboard') || pathname.match(/^\/[a-z]{2}\/dashboard/);
const isPortalRoute =
  pathname.startsWith('/portal') || pathname.match(/^\/[a-z]{2}\/portal/);
const isAdminRoute =
  pathname.startsWith('/admin') || pathname.match(/^\/[a-z]{2}\/admin/);

if (isDashboardRoute || isPortalRoute || isAdminRoute) {
  console.log('🔍 Route Detection:', {
    isDashboardRoute,
    isPortalRoute,
    isAdminRoute,
    currentSubdomain,
    shouldRedirect:
      !isDevelopment &&
      currentSubdomain !== SUBDOMAINS.APP &&
      currentSubdomain !== SUBDOMAINS.ADMIN,
  });
}
```

---

## 🎯 How It Works Now

### Dashboard Routes

- `https://staging.syndik.ma/dashboard` → `https://app.staging.syndik.ma/dashboard`
- `https://staging.syndik.ma/en/dashboard` → `https://app.staging.syndik.ma/en/dashboard` ✅ **FIXED**
- `https://staging.syndik.ma/fr/dashboard` → `https://app.staging.syndik.ma/fr/dashboard` ✅ **FIXED**
- `https://staging.syndik.ma/ar/dashboard` → `https://app.staging.syndik.ma/ar/dashboard` ✅ **FIXED**

### Portal Routes

- `https://staging.syndik.ma/portal` → `https://app.staging.syndik.ma/portal`
- `https://staging.syndik.ma/en/portal` → `https://app.staging.syndik.ma/en/portal` ✅ **FIXED**
- `https://staging.syndik.ma/fr/portal` → `https://app.staging.syndik.ma/fr/portal` ✅ **FIXED**

### Admin Routes

- `https://staging.syndik.ma/admin` → `https://admin.staging.syndik.ma/en/admin`
- `https://staging.syndik.ma/en/admin` → `https://admin.staging.syndik.ma/en/admin` ✅ **FIXED**
- `https://staging.syndik.ma/fr/admin` → `https://admin.staging.syndik.ma/fr/admin` ✅ **FIXED**

### Organization Routes

- `https://staging.syndik.ma/org-switcher` → `https://app.staging.syndik.ma/org-switcher`
- `https://staging.syndik.ma/en/org-switcher` → `https://app.staging.syndik.ma/en/org-switcher` ✅ **FIXED**

---

## 🧪 Testing the Fix

### 1. Test Dashboard Redirects

```bash
# Test these URLs in staging:
curl -I https://staging.syndik.ma/en/dashboard
# Should return: Location: https://app.staging.syndik.ma/en/dashboard

curl -I https://staging.syndik.ma/dashboard
# Should return: Location: https://app.staging.syndik.ma/dashboard
```

### 2. Test Admin Redirects

```bash
curl -I https://staging.syndik.ma/en/admin
# Should return: Location: https://admin.staging.syndik.ma/en/admin

curl -I https://staging.syndik.ma/admin
# Should return: Location: https://admin.staging.syndik.ma/en/admin
```

### 3. Test Portal Redirects

```bash
curl -I https://staging.syndik.ma/en/portal
# Should return: Location: https://app.staging.syndik.ma/en/portal
```

---

## 📋 Verification Checklist

- [ ] `https://staging.syndik.ma/en/dashboard` redirects to `https://app.staging.syndik.ma/en/dashboard`
- [ ] `https://staging.syndik.ma/fr/dashboard` redirects to `https://app.staging.syndik.ma/fr/dashboard`
- [ ] `https://staging.syndik.ma/ar/dashboard` redirects to `https://app.staging.syndik.ma/ar/dashboard`
- [ ] `https://staging.syndik.ma/en/admin` redirects to `https://admin.staging.syndik.ma/en/admin`
- [ ] `https://staging.syndik.ma/en/portal` redirects to `https://app.staging.syndik.ma/en/portal`
- [ ] `https://staging.syndik.ma/en/org-switcher` redirects to `https://app.staging.syndik.ma/en/org-switcher`
- [ ] Non-locale routes still work: `/dashboard` → `app.staging.syndik.ma/dashboard`
- [ ] Development environment still uses route-based fallbacks (`/admin-dev`)

---

## 🔍 Debugging

If redirects still don't work, check the Vercel deployment logs:

```bash
# Check middleware logs
vercel logs --scope syndik-staging

# Look for these log messages:
# 🔍 Route Detection: { isDashboardRoute: true, ... }
# 🚀 Redirecting to app subdomain: /en/dashboard → https://app.staging.syndik.ma/en/dashboard
```

---

## 🚀 Deploy and Test

1. **Deploy the changes:**

   ```bash
   vercel --prod --scope syndik-staging
   ```

2. **Test the specific route:**

   ```bash
   curl -I https://staging.syndik.ma/en/dashboard
   ```

3. **Expected response:**
   ```
   HTTP/2 307
   location: https://app.staging.syndik.ma/en/dashboard
   ```

The fix ensures that all locale-prefixed routes (like `/en/dashboard`, `/fr/admin`, etc.) are properly detected and redirected to their appropriate subdomains, maintaining the locale prefix in the redirect URL.
