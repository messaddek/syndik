# 🔧 STAGING DATABASE CONNECTION FIX

## Current Error Analysis

**Error:** `Failed query: SELECT 1 as test`

This indicates the DATABASE_URL is set but the connection is failing. This is typically caused by:

1. **Invalid connection string format**
2. **Database server unreachable**
3. **Authentication failure**
4. **Database doesn't exist**
5. **Wrong connection pool/SSL settings**

---

## 🚨 IMMEDIATE FIXES TO TRY

### Fix 1: Verify DATABASE_URL Format

Your DATABASE_URL should follow this exact format:

```
postgresql://username:password@hostname:port/database_name
```

**Common Issues:**

- Missing `postgresql://` prefix
- Special characters in username/password not URL encoded
- Wrong hostname (should be full host, not just server name)
- Missing port (usually 5432 for PostgreSQL)
- Database name doesn't exist

### Fix 2: Check SSL Requirements

Many cloud databases require SSL. Try adding SSL parameters:

```bash
# For Neon, Supabase, or other cloud providers
postgresql://username:password@hostname:port/database_name?sslmode=require

# For databases that need specific SSL settings
postgresql://username:password@hostname:port/database_name?sslmode=require&sslcert=cert.pem&sslkey=key.pem&sslrootcert=ca.pem
```

### Fix 3: Test Connection String Locally

**In PowerShell, test the connection:**

```powershell
# Install psql if not available (using chocolatey)
choco install postgresql

# Test connection (replace with your actual DATABASE_URL values)
psql "postgresql://username:password@hostname:port/database_name"
```

### Fix 4: Common Cloud Provider Formats

**Neon Database:**

```
postgresql://username:password@ep-cool-name-123456.region.neon.tech/database_name?sslmode=require
```

**Supabase:**

```
postgresql://postgres:password@db.projectref.supabase.co:5432/postgres
```

**Railway:**

```
postgresql://postgres:password@containers-us-west-123.railway.app:5432/railway
```

**PlanetScale (MySQL - different format):**

```
mysql://username:password@host.planetscale.dev:3306/database_name?sslmode=require
```

---

## 🔍 DEBUGGING STEPS

### Step 1: Check Current DATABASE_URL in Vercel

```powershell
# View current environment variables (sensitive data will be masked)
vercel env ls --scope syndik-staging

# Check specific variable
vercel env ls DATABASE_URL --scope syndik-staging
```

### Step 2: Test with Enhanced Debug Endpoint

Visit: `https://staging.syndik.ma/api/debug-db`

The enhanced endpoint now provides:

- URL format validation
- Connection analysis
- Database version info
- Table existence checks
- Specific troubleshooting suggestions

### Step 3: Remove and Re-add DATABASE_URL

```powershell
# Remove existing DATABASE_URL
vercel env rm DATABASE_URL production --scope syndik-staging

# Add new DATABASE_URL with correct format
vercel env add DATABASE_URL production --scope syndik-staging
# When prompted, enter: postgresql://your_full_connection_string

# Redeploy
vercel --prod --scope syndik-staging
```

---

## 🛠️ SPECIFIC FIXES BY PROVIDER

### If Using Neon Database:

1. **Go to Neon Console** → Your Project → Connection Details
2. **Copy the connection string** (should look like):
   ```
   postgresql://username:password@ep-cool-name-123456.us-east-1.neon.tech/neondb?sslmode=require
   ```
3. **Set in Vercel:**
   ```powershell
   vercel env add DATABASE_URL production --scope syndik-staging
   # Paste the full Neon connection string when prompted
   ```

### If Using Supabase:

1. **Go to Supabase** → Project Settings → Database
2. **Copy the connection string** from "Connection String" section
3. **Replace `[YOUR-PASSWORD]` with your actual password**
4. **Set in Vercel:**
   ```powershell
   vercel env add DATABASE_URL production --scope syndik-staging
   # Paste the connection string with password filled in
   ```

### If Using Railway:

1. **Go to Railway** → Your Project → Variables
2. **Copy DATABASE_URL** value
3. **Set in Vercel:**
   ```powershell
   vercel env add DATABASE_URL production --scope syndik-staging
   # Paste the Railway DATABASE_URL
   ```

---

## 🚀 AUTOMATED FIX SCRIPT

Create a PowerShell script to test database connectivity:

```powershell
# Save as test-db-connection.ps1
param([Parameter(Mandatory=$true)][string]$DatabaseUrl)

Write-Host "Testing database connection..." -ForegroundColor Yellow

try {
    # Test with psql
    $env:PGPASSWORD = ""
    psql $DatabaseUrl -c "SELECT 1 as test;" 2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Database connection successful!" -ForegroundColor Green
    } else {
        Write-Host "❌ Database connection failed!" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error testing connection: $_" -ForegroundColor Red
}

# Usage: .\test-db-connection.ps1 -DatabaseUrl "postgresql://..."
```

---

## 🔄 MIGRATION CHECK

If connection works but tables don't exist:

```powershell
# Run database migrations
npm run db:push

# Or using drizzle directly
npx drizzle-kit push

# Generate and run migrations
npx drizzle-kit generate
npx drizzle-kit migrate
```

---

## 📋 QUICK CHECKLIST

- [ ] DATABASE_URL format is exactly: `postgresql://username:password@host:port/database`
- [ ] Special characters in password are URL encoded
- [ ] SSL mode is included if required: `?sslmode=require`
- [ ] Database server is running and accessible
- [ ] Username/password are correct
- [ ] Database name exists
- [ ] User has permissions on the database
- [ ] Connection string works in local testing
- [ ] Vercel environment variable is set correctly
- [ ] Staging has been redeployed after setting DATABASE_URL

---

## 🆘 EMERGENCY WORKAROUND

If database issues persist, temporarily use a local/test database:

```powershell
# Set a temporary local database for testing
vercel env add DATABASE_URL production --scope syndik-staging
# Enter: postgresql://postgres:password@localhost:5432/testdb

# This will obviously fail in production but helps isolate the issue
```

---

## 🎯 NEXT STEPS

1. **Fix DATABASE_URL format** using provider-specific instructions above
2. **Test connection locally** with psql or database client
3. **Update Vercel environment** with correct DATABASE_URL
4. **Redeploy staging**
5. **Test debug endpoint** to verify fix
6. **Run migrations** if tables are missing

The connection string format is critical - even small mistakes will cause this exact error.
