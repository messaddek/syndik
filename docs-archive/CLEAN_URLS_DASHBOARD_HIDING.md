# 🎭 CLEAN URLS - HIDING /dashboard FROM APP SUBDOMAIN

## Overview

This feature hides `/dashboard` from URLs on the app subdomain, creating cleaner, more user-friendly URLs.

---

## 🔄 URL Transformations

### Before (With /dashboard visible)

```
https://app.staging.syndik.ma/dashboard           → Dashboard home
https://app.staging.syndik.ma/en/dashboard        → English dashboard
https://app.staging.syndik.ma/fr/dashboard        → French dashboard
https://app.staging.syndik.ma/en/dashboard/users  → Dashboard users page
```

### After (Clean URLs)

```
https://app.staging.syndik.ma/                    → Dashboard home
https://app.staging.syndik.ma/en                  → English dashboard
https://app.staging.syndik.ma/fr                  → French dashboard
https://app.staging.syndik.ma/en/users            → Dashboard users page
```

---

## 🛠️ How It Works

### 1. Redirect Logic (Main Domain → App Subdomain)

When users visit dashboard routes on the main domain, they're redirected to clean URLs:

```typescript
// staging.syndik.ma/dashboard → app.staging.syndik.ma/
// staging.syndik.ma/en/dashboard → app.staging.syndik.ma/en
// staging.syndik.ma/en/dashboard/users → app.staging.syndik.ma/en/users

if (isDashboardRoute) {
  let cleanUrl;
  const localeMatch = pathname.match(/^\/([a-z]{2})\/dashboard(.*)$/);
  if (localeMatch) {
    const [, locale, subPath] = localeMatch;
    cleanUrl = `https://${appDomain}/${locale}${subPath || ''}`;
  } else {
    const dashboardPath = pathname.replace('/dashboard', '') || '/';
    cleanUrl = `https://${appDomain}${dashboardPath}`;
  }
  return NextResponse.redirect(new URL(cleanUrl));
}
```

### 2. Rewrite Logic (App Subdomain)

On the app subdomain, clean URLs are internally rewritten to dashboard routes:

```typescript
// app.staging.syndik.ma/ → internally serves /en/dashboard
// app.staging.syndik.ma/en → internally serves /en/dashboard
// app.staging.syndik.ma/fr → internally serves /fr/dashboard

if (pathname === '/') {
  return NextResponse.rewrite(new URL('/en/dashboard', req.url));
}

const localeOnlyMatch = pathname.match(/^\/([a-z]{2})$/);
if (localeOnlyMatch) {
  const [, locale] = localeOnlyMatch;
  const dashboardPath = `/${locale}/dashboard`;
  return NextResponse.rewrite(new URL(dashboardPath, req.url));
}
```

---

## 🎯 User Experience

### Navigation Flow

1. **User visits:** `https://staging.syndik.ma/en/dashboard`
2. **Redirected to:** `https://app.staging.syndik.ma/en`
3. **Internally serves:** Dashboard content from `/en/dashboard` route
4. **User sees:** Clean URL `https://app.staging.syndik.ma/en` in browser

### Subpage Navigation

1. **User visits:** `https://staging.syndik.ma/en/dashboard/users`
2. **Redirected to:** `https://app.staging.syndik.ma/en/users`
3. **Internally serves:** Dashboard users page
4. **User sees:** Clean URL `https://app.staging.syndik.ma/en/users` in browser

---

## 📋 Complete URL Mapping

| Original URL                              | Clean URL                           | Internal Route           |
| ----------------------------------------- | ----------------------------------- | ------------------------ |
| `staging.syndik.ma/dashboard`             | `app.staging.syndik.ma/`            | `/en/dashboard`          |
| `staging.syndik.ma/en/dashboard`          | `app.staging.syndik.ma/en`          | `/en/dashboard`          |
| `staging.syndik.ma/fr/dashboard`          | `app.staging.syndik.ma/fr`          | `/fr/dashboard`          |
| `staging.syndik.ma/ar/dashboard`          | `app.staging.syndik.ma/ar`          | `/ar/dashboard`          |
| `staging.syndik.ma/en/dashboard/users`    | `app.staging.syndik.ma/en/users`    | `/en/dashboard/users`    |
| `staging.syndik.ma/en/dashboard/settings` | `app.staging.syndik.ma/en/settings` | `/en/dashboard/settings` |

---

## 🔄 Next.js Route Structure

Your Next.js file structure should support both patterns:

```
src/app/[locale]/
├── dashboard/
│   ├── page.tsx              # Handles /en/dashboard
│   ├── users/
│   │   └── page.tsx          # Handles /en/dashboard/users
│   └── settings/
│       └── page.tsx          # Handles /en/dashboard/settings
└── users/
    └── page.tsx              # Optional: Direct route for /en/users
```

**Recommended approach:** Keep all dashboard logic under `/dashboard/` and let middleware handle the URL rewrites.

---

## 🧪 Testing the Clean URLs

### 1. Test Redirects (Main Domain → App Subdomain)

```bash
# Test dashboard redirect
curl -I https://staging.syndik.ma/en/dashboard
# Expected: Location: https://app.staging.syndik.ma/en

# Test dashboard subpage redirect
curl -I https://staging.syndik.ma/en/dashboard/users
# Expected: Location: https://app.staging.syndik.ma/en/users

# Test non-locale dashboard redirect
curl -I https://staging.syndik.ma/dashboard
# Expected: Location: https://app.staging.syndik.ma/
```

### 2. Test Rewrites (App Subdomain)

```bash
# Test root rewrite
curl -I https://app.staging.syndik.ma/
# Should serve dashboard content (status 200)

# Test locale root rewrite
curl -I https://app.staging.syndik.ma/en
# Should serve dashboard content (status 200)

# Test French locale
curl -I https://app.staging.syndik.ma/fr
# Should serve French dashboard content (status 200)
```

---

## 🔍 Debugging Clean URLs

### Check Middleware Logs

Look for these log messages in Vercel deployment logs:

```
🚀 Redirecting dashboard to clean URL: /en/dashboard → https://app.staging.syndik.ma/en
🚀 App Root - Rewriting / to /en/dashboard
🚀 App Locale Root - Rewriting /en to /en/dashboard
```

### Browser Network Tab

1. Visit `https://staging.syndik.ma/en/dashboard`
2. Check Network tab for:
   - **Status 307** (Temporary Redirect)
   - **Location header:** `https://app.staging.syndik.ma/en`

---

## 💡 Benefits

### 1. **Cleaner URLs**

- `app.staging.syndik.ma/en` vs `app.staging.syndik.ma/en/dashboard`
- More professional and user-friendly

### 2. **Better SEO**

- Shorter, cleaner URLs are preferred by search engines
- Easier to share and remember

### 3. **Consistent Branding**

- App subdomain clearly indicates the application interface
- Clean URLs match modern web app expectations

### 4. **Flexible Navigation**

- Users can type `app.staging.syndik.ma` and immediately access their dashboard
- Locale-aware: `app.staging.syndik.ma/fr` for French interface

---

## ⚠️ Important Notes

### 1. **Internal Routes Still Work**

- Dashboard components can still use `/dashboard` routes internally
- Only the user-facing URLs are cleaned

### 2. **API Routes Unaffected**

- All API routes (`/api/*`) continue to work normally
- Only affects frontend routing

### 3. **Development Environment**

- Clean URLs work in development with `admin.localhost:3000`
- Fallback routes (`/admin-dev`) still available when needed

### 4. **Portal Routes Unchanged**

- Portal routes keep their URLs: `app.staging.syndik.ma/portal`
- Only dashboard routes are cleaned

---

## 🚀 Deployment

The clean URL feature is now active in the middleware. Deploy to see the changes:

```bash
# Deploy to staging
vercel --prod --scope syndik-staging

# Test the clean URLs
curl -I https://staging.syndik.ma/en/dashboard
# Should redirect to: https://app.staging.syndik.ma/en
```

This creates a much more professional and user-friendly URL structure for your dashboard application!
