# 🚨 CRITICAL: Staging Environment Database & Auth Fix

## 🔍 **Issues Identified:**

1. **Database Connection Failure** - tRPC queries returning 500 errors
2. **Clerk Redirect URL Error** - `app.staging.syndik.ma` not in allowed origins
3. **Cross-Domain Authentication Issues**

## 🛠️ **Immediate Fixes Required:**

### **1. Database Connection Fix**

The `accounts.getOrganizationUsage` and `accounts.getCurrentAccount` queries are failing. This suggests your staging environment doesn't have the correct `DATABASE_URL`.

#### **Check Staging Environment Variables:**

Go to **Vercel Dashboard** → `syndik-staging` project → **Settings** → **Environment Variables**

**Ensure this is set:**

```bash
DATABASE_URL=postgresql://syndik_owner:npg_K57ZUtkiTubs@ep-fancy-wildflower-a2pt3gje-pooler.eu-central-1.aws.neon.tech/syndik?sslmode=require
```

### **2. Clerk Configuration Fix**

The error `Redirect URL https://app.staging.syndik.ma/org-switcher is not on one of the allowedRedirectOrigins` means you need to configure Clerk for staging.

#### **Option A: Add Staging URL to Clerk (Quick Fix)**

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **Domains** → **Redirect URLs**
4. Add these URLs:
   ```
   https://staging.syndik.ma
   https://app.staging.syndik.ma
   https://admin.staging.syndik.ma
   ```

#### **Option B: Create Separate Clerk App for Staging (Recommended)**

1. Create new Clerk application: `syndik-staging`
2. Configure staging domains
3. Update staging environment variables:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_[staging_key]
   CLERK_SECRET_KEY=sk_test_[staging_key]
   ```

### **3. Update Staging Environment Variables**

**Critical variables missing/incorrect in staging:**

```bash
# Environment Detection
NEXT_PUBLIC_ENVIRONMENT=staging

# Staging URLs
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma

# Clerk Redirect URLs (CRITICAL!)
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=https://app.staging.syndik.ma/org-switcher
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=https://app.staging.syndik.ma/org-switcher

# Database
DATABASE_URL=postgresql://syndik_owner:npg_K57ZUtkiTubs@ep-fancy-wildflower-a2pt3gje-pooler.eu-central-1.aws.neon.tech/syndik?sslmode=require
```

## 🚀 **Step-by-Step Fix:**

### **Step 1: Fix Environment Variables**

1. Go to Vercel Dashboard → `syndik-staging`
2. Settings → Environment Variables
3. Add/update all variables above
4. **Set environment scope to "Production"**

### **Step 2: Fix Clerk Configuration**

Either add staging URLs to existing Clerk app OR create separate staging app

### **Step 3: Redeploy Staging**

```bash
git checkout staging
git push origin staging
```

### **Step 4: Test Database Connection**

Add this debug endpoint to test database connectivity:

```typescript
// pages/api/debug-db.ts
import { db } from '@/lib/db';
import { accounts } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export default async function handler(req: any, res: any) {
  try {
    // Test basic database connection
    const result = await db.select().from(accounts).limit(1);

    res.status(200).json({
      success: true,
      message: 'Database connection successful',
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
      hasData: result.length > 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
    });
  }
}
```

## 🔍 **Verify the Fix:**

### **1. Test Database:**

Visit: `https://staging.syndik.ma/api/debug-db`
Should return: `{"success": true}`

### **2. Test Authentication:**

1. Login at `https://staging.syndik.ma`
2. Should redirect to `https://app.staging.syndik.ma/org-switcher`
3. No Clerk errors in console

### **3. Test tRPC:**

Dashboard should load without 500 errors

## ⚠️ **Most Likely Root Cause:**

Your staging Vercel project is probably using **development/local environment variables** instead of **staging-specific variables**. This causes:

- Database connections to fail (wrong/missing DATABASE_URL)
- Clerk redirects to fail (wrong redirect URLs)
- Cross-domain authentication issues

Fix the environment variables first - that should resolve 90% of these issues! 🚀
