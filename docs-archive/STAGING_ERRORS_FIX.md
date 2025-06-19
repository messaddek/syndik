# Staging Environment Errors - Complete Fix

## Current Issues Identified

### 1. Database Connection Errors (500 Internal Server Error)

- tRPC calls are failing when trying to query the `accounts` table
- Error: `Failed to fetch` when calling tRPC procedures
- This suggests the `DATABASE_URL` environment variable is either missing or incorrect

### 2. Clerk Redirect URL Issue

- Warning: `https://app.staging.syndik.ma/org-switcher` is not in allowed redirect origins
- This means Clerk dashboard needs to be updated with staging URLs

## Step-by-Step Fixes

### Fix 1: Verify and Set Staging Environment Variables

**Action Required**: Set these environment variables in Vercel for the staging project:

```bash
# Essential Environment Variables for Staging
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma

# Database (CRITICAL - This is likely missing)
DATABASE_URL=postgresql://your_staging_db_connection_string

# Clerk Authentication for Staging
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_staging_key
CLERK_SECRET_KEY=sk_test_your_staging_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/org-switcher
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/org-switcher
```

### Fix 2: Update Clerk Dashboard Configuration

**Action Required**: Add these URLs to your Clerk dashboard:

#### Option A: Add Staging URLs to Existing Clerk App

1. Go to Clerk Dashboard → Your App → Settings → Domains
2. Add these allowed redirect origins:
   ```
   https://staging.syndik.ma
   https://admin.staging.syndik.ma
   https://app.staging.syndik.ma
   ```

#### Option B: Create Separate Staging Clerk App (Recommended)

1. Create a new Clerk application for staging
2. Use staging-specific keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_staging...`
   - `CLERK_SECRET_KEY=sk_test_staging...`
3. Configure domains for the staging app only

### Fix 3: Test Database Connection

**Test the database connection** using the debug endpoint:

1. Visit: `https://staging.syndik.ma/api/debug-db`
2. Expected response:
   ```json
   {
     "success": true,
     "message": "Database connection successful",
     "environment": "staging",
     "databaseUrl": "Set",
     "hasData": true,
     "timestamp": "2024-01-01T00:00:00.000Z"
   }
   ```

## Verification Checklist

### ✅ Environment Variables Check

```bash
# Run this in Vercel CLI to verify staging environment variables
vercel env ls --environment=production --scope=syndik-staging
```

### ✅ Database Connection Check

- [ ] Visit `https://staging.syndik.ma/api/debug-db`
- [ ] Verify response shows `"success": true`
- [ ] Verify response shows `"databaseUrl": "Set"`

### ✅ Clerk Configuration Check

- [ ] Staging URLs added to allowed redirect origins
- [ ] Test sign-in flow at `https://staging.syndik.ma/sign-in`
- [ ] Test org-switcher redirect at `https://app.staging.syndik.ma/org-switcher`

### ✅ Subdomain Routing Check

- [ ] `https://staging.syndik.ma` loads main site
- [ ] `https://admin.staging.syndik.ma` loads admin panel
- [ ] `https://app.staging.syndik.ma` loads app interface

## Common Staging Database Solutions

### Option 1: Use Production Database with Different Schema

```sql
-- Create staging schema in production database
CREATE SCHEMA staging;
-- Migrate tables to staging schema
```

### Option 2: Use Neon Database Branching

```bash
# Create a staging branch from production
neon branches create --database-id=your-db-id --name=staging
```

### Option 3: Use Separate Staging Database

```bash
# Create completely separate staging database
# Update DATABASE_URL to point to staging instance
```

## Next Steps

1. **Immediate**: Set `DATABASE_URL` in Vercel staging environment
2. **Immediate**: Update Clerk dashboard with staging domains
3. **Test**: Visit `/api/debug-db` endpoint to verify database connection
4. **Test**: Complete sign-in flow on staging environment
5. **Monitor**: Check Vercel logs for any remaining errors

## Emergency Rollback

If staging issues persist, you can temporarily:

1. **Disable subdomain redirects** in staging by setting:

   ```bash
   NEXT_PUBLIC_DISABLE_SUBDOMAIN_REDIRECTS=true
   ```

2. **Use development-style routing** by accessing:
   - `https://staging.syndik.ma/admin-dev` instead of `admin.staging.syndik.ma`
   - `https://staging.syndik.ma/dashboard` instead of `app.staging.syndik.ma`

This will bypass subdomain issues while you fix the environment configuration.
