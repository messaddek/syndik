# 🚨 URGENT FIX: Staging Environment Variables

## 🔍 **Problem Identified:**

Your staging environment (`staging.syndik.ma`) is redirecting users to production URLs (`app.syndik.ma`) after login, causing cross-domain authentication errors.

## 🛠️ **Solution: Update Staging Project Environment Variables**

### **Go to Vercel Dashboard → `syndik-staging` project → Settings → Environment Variables**

### **🔑 Update/Add These Variables:**

```bash
# === CLERK AUTHENTICATION (Staging-Specific URLs) ===
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=https://app.staging.syndik.ma/org-switcher
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=https://app.staging.syndik.ma/org-switcher

# === STAGING DOMAINS (Make sure these are correct) ===
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma
NEXT_PUBLIC_API_URL=https://api.staging.syndik.ma

# === ENVIRONMENT ===
NEXT_PUBLIC_ENVIRONMENT=staging
```

### **🎯 Key Fix:**

The main issue is these two variables pointing to production instead of staging:

- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=https://app.staging.syndik.ma/org-switcher`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=https://app.staging.syndik.ma/org-switcher`

## 🚀 **Steps to Fix:**

### **1. Update Vercel Environment Variables**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `syndik-staging` project
3. Go to **Settings** → **Environment Variables**
4. Update the variables above

### **2. Alternative: Use Staging-Specific Clerk Application**

For complete isolation, create a separate Clerk application for staging:

```bash
# Create new Clerk app for staging
# Name: syndik-staging
# Then use different keys:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_[staging_specific_key]
CLERK_SECRET_KEY=sk_test_[staging_specific_key]
```

### **3. Redeploy Staging**

After updating environment variables:

```bash
git checkout staging
git push origin staging
```

## 🧪 **Test the Fix:**

1. **Visit**: `https://staging.syndik.ma`
2. **Login** with test credentials
3. **Verify redirect**: Should go to `https://app.staging.syndik.ma/org-switcher`
4. **Check console**: No more cross-domain errors

## 🔍 **Debug Environment Variables:**

Add this to your staging deployment to verify:

```typescript
// In any page component
console.log('Environment Debug:', {
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
    process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
});
```

## ✅ **Verification Checklist:**

- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` points to `app.staging.syndik.ma`
- [ ] `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` points to `app.staging.syndik.ma`
- [ ] `NEXT_PUBLIC_APP_URL` is `https://app.staging.syndik.ma`
- [ ] `NEXT_PUBLIC_ENVIRONMENT` is `staging`
- [ ] DNS records for `app.staging.syndik.ma` are configured
- [ ] SSL certificate is active for `app.staging.syndik.ma`

This should fix the 500 error immediately! The issue is that Clerk is trying to redirect to a different domain than where the authentication session was created.
