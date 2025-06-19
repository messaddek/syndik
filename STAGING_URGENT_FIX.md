# 🚨 STAGING ENVIRONMENT - IMMEDIATE FIX REQUIRED

## Current Error Analysis

### Root Cause

The staging environment is experiencing **500 Internal Server Error** on tRPC calls because:

1. **DATABASE_URL missing or incorrect** - The most likely cause
2. **Clerk redirect URL not configured** - Secondary issue
3. **Environment variables not properly set in Vercel**

### Error Details

```
Failed to fetch organization usage: Database operation failed after 3 attempts:
Failed query: select "org_id", "organization_name", "role", "created_at" from "accounts"
where "accounts"."user_id" = $1
params: user_2mKhZAzlSrC8VblUGa5Ibjh9uOJ
```

---

## 🔧 IMMEDIATE FIX STEPS

### Step 1: Check Database Connection (URGENT)

**Test the database connection immediately:**

```bash
# Visit this URL to check database status
https://staging.syndik.ma/api/debug-db
```

**Expected Result:** Should return JSON with `"success": true`

**If it fails:** The `DATABASE_URL` is missing or incorrect in Vercel.

### Step 2: Set Database URL in Vercel (CRITICAL)

**Run these commands in PowerShell:**

```powershell
# Check current environment variables
vercel env ls --scope syndik-staging

# Add DATABASE_URL (replace with your actual connection string)
vercel env add DATABASE_URL production --scope syndik-staging
# When prompted, enter your PostgreSQL connection string:
# postgresql://username:password@host:port/database

# Redeploy staging
vercel --prod --scope syndik-staging
```

### Step 3: Verify All Required Environment Variables

**Required variables for staging:**

```bash
# Essential Environment Variables
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma

# Database (CRITICAL)
DATABASE_URL=postgresql://your_staging_db_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_staging_key
CLERK_SECRET_KEY=sk_test_your_staging_secret
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/org-switcher
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/org-switcher
```

### Step 4: Fix Clerk Redirect Issue

**Add these URLs to your Clerk dashboard:**

- `https://staging.syndik.ma`
- `https://admin.staging.syndik.ma`
- `https://app.staging.syndik.ma`

**Location:** Clerk Dashboard → Your App → Settings → Domains → Allowed redirect origins

---

## 🚀 AUTOMATED FIX SCRIPTS

### Option 1: Use Troubleshooting Script

```powershell
# Run the troubleshooting script to diagnose all issues
.\scripts\troubleshoot-staging.ps1 -ProjectName "syndik-staging"
```

### Option 2: Use Environment Setup Script

```powershell
# Set up all environment variables at once
.\scripts\setup-staging-env.ps1 -StagingProjectName "syndik-staging" -DatabaseUrl "postgresql://..." -ClerkPublishableKey "pk_test_..." -ClerkSecretKey "sk_test_..."
```

---

## 🔍 VERIFICATION CHECKLIST

After applying fixes, verify these endpoints:

- [ ] **Database Test:** `https://staging.syndik.ma/api/debug-db` returns success
- [ ] **Main Site:** `https://staging.syndik.ma` loads correctly
- [ ] **Admin Panel:** `https://admin.staging.syndik.ma` loads correctly
- [ ] **App Interface:** `https://app.staging.syndik.ma` loads correctly
- [ ] **Sign In:** `https://staging.syndik.ma/sign-in` works without Clerk errors
- [ ] **tRPC Calls:** No more 500 errors in browser console

---

## 📋 QUICK COMMAND REFERENCE

```powershell
# Check environment variables
vercel env ls --scope syndik-staging

# Add DATABASE_URL
vercel env add DATABASE_URL production --scope syndik-staging

# Add Clerk keys
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production --scope syndik-staging
vercel env add CLERK_SECRET_KEY production --scope syndik-staging

# Redeploy
vercel --prod --scope syndik-staging

# Test database
curl https://staging.syndik.ma/api/debug-db

# Check logs
vercel logs --scope syndik-staging
```

---

## 🆘 EMERGENCY FALLBACK

If subdomain issues persist, temporarily disable subdomain redirects:

```powershell
# Add this environment variable to bypass subdomain logic
vercel env add NEXT_PUBLIC_DISABLE_SUBDOMAIN_REDIRECTS true production --scope syndik-staging

# Then access staging using route-based URLs:
# https://staging.syndik.ma/admin-dev (instead of admin.staging.syndik.ma)
# https://staging.syndik.ma/dashboard (instead of app.staging.syndik.ma)
```

---

## 🎯 PRIORITY ORDER

1. **CRITICAL:** Set `DATABASE_URL` in Vercel staging environment
2. **CRITICAL:** Redeploy staging after setting DATABASE_URL
3. **HIGH:** Test `/api/debug-db` endpoint
4. **HIGH:** Update Clerk dashboard with staging domains
5. **MEDIUM:** Verify all other environment variables
6. **LOW:** Test complete user flows

**The database connection issue must be fixed first** - all other errors will persist until the DATABASE_URL is properly configured.
