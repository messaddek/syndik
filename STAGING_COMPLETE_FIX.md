# 🚨 URGENT: Complete Staging Environment Fix

## ✅ **Issues Fixed:**

1. **Middleware routing** - Now properly redirects staging to staging subdomains
2. **tRPC client** - Now uses correct API URLs for each environment

## ❌ **Action Required: Database Configuration**

Your staging project is missing the correct `DATABASE_URL`. The error shows it's trying to query a database but failing.

### **🛠️ Fix Steps:**

#### **1. Verify Staging Environment Variables in Vercel**

Go to [Vercel Dashboard](https://vercel.com/dashboard) → `syndik-staging` project → Settings → Environment Variables

**Ensure these are set:**

```bash
# Database - CRITICAL!
DATABASE_URL=postgresql://syndik_owner:npg_K57ZUtkiTubs@ep-fancy-wildflower-a2pt3gje-pooler.eu-central-1.aws.neon.tech/syndik?sslmode=require

# Environment detection
NEXT_PUBLIC_ENVIRONMENT=staging

# Staging URLs
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma

# Clerk redirects - CRITICAL!
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=https://app.staging.syndik.ma/org-switcher
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=https://app.staging.syndik.ma/org-switcher
```

#### **2. Database Options:**

**Option A: Use Same Database (Quick Fix)**

```bash
DATABASE_URL=postgresql://syndik_owner:npg_K57ZUtkiTubs@ep-fancy-wildflower-a2pt3gje-pooler.eu-central-1.aws.neon.tech/syndik?sslmode=require
```

**Option B: Create Separate Staging Database (Recommended)**

1. Create new database in Neon: `syndik_staging`
2. Run migrations: `npm run db:migrate`
3. Use new database URL in staging

#### **3. Deploy After Changes**

```bash
git checkout staging
git push origin staging
```

## 🧪 **Test the Complete Fix:**

### **1. Test Redirects:**

- Visit: `https://staging.syndik.ma/en/dashboard`
- Should redirect to: `https://app.staging.syndik.ma/en/dashboard`

### **2. Test Database:**

- Login to staging
- Check if organization data loads without tRPC errors

### **3. Test Authentication:**

- Login on `https://staging.syndik.ma`
- Should redirect to: `https://app.staging.syndik.ma/org-switcher`

## 🔍 **Debug Commands:**

Add this to any page to verify environment:

```typescript
console.log('Debug Info:', {
  hostname: window.location.hostname,
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  NEXT_PUBLIC_MAIN_URL: process.env.NEXT_PUBLIC_MAIN_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});
```

## ⚠️ **Most Likely Issues:**

1. **Missing DATABASE_URL** in staging Vercel project
2. **Wrong Clerk redirect URLs** (pointing to production instead of staging)
3. **Missing NEXT_PUBLIC_ENVIRONMENT=staging** variable

Fix these three, and both issues should be resolved! 🚀
