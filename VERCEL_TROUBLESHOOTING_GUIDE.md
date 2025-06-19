# 🔧 Vercel Deployment Troubleshooting Guide

## 🚨 **Common Issues & Solutions**

### **Issue 1: Environment Variables Not Loading**

**Problem:** Environment variables from `.env.production` or `.env.staging` aren't being used on Vercel.

**Solution:** Vercel doesn't automatically read local env files. You must set them in the Vercel dashboard.

#### **Fix:**

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add ALL variables from your `.env.production` or `.env.staging` files
3. Set the correct environment scope (Production, Preview, Development)

---

### **Issue 2: Subdomain Routing Not Working on Vercel**

**Problem:** `admin.yourapp.vercel.app` returns 404 or doesn't route correctly.

**Solution:** Vercel's `.vercel.app` domains don't support real subdomains. Use route-based routing instead.

#### **Current Implementation:**

```typescript
// ✅ Works on Vercel
app.yourproject.vercel.app / admin - dev;
app.yourproject.vercel.app / dashboard;

// ❌ Doesn't work on Vercel
admin.yourproject.vercel.app;
app.yourproject.vercel.app;
```

---

### **Issue 3: Custom Domain Configuration**

**Problem:** Custom domains with subdomains not working properly.

#### **DNS Configuration Required:**

```dns
# A Records
syndik.ma → 76.76.19.61 (Vercel)
staging.syndik.ma → 76.76.19.61 (Vercel)

# CNAME Records
admin.syndik.ma → cname.vercel-dns.com
app.syndik.ma → cname.vercel-dns.com
admin.staging.syndik.ma → cname.vercel-dns.com
app.staging.syndik.ma → cname.vercel-dns.com
```

---

### **Issue 4: Environment Detection Not Working**

**Problem:** App can't distinguish between production, staging, and Vercel environments.

#### **Updated Environment Detection:**

```typescript
// Enhanced environment detection
export function getEnvironment() {
  // Explicit environment variable (highest priority)
  if (process.env.NEXT_PUBLIC_ENVIRONMENT) {
    return process.env.NEXT_PUBLIC_ENVIRONMENT;
  }

  // Vercel environment detection
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV; // 'production', 'preview', 'development'
  }

  // Hostname-based detection
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    if (hostname.includes('staging.syndik.ma')) return 'staging';
    if (hostname.includes('syndik.ma')) return 'production';
    if (hostname.includes('.vercel.app')) return 'vercel';
    if (hostname.includes('localhost')) return 'development';
  }

  // Fallback
  return process.env.NODE_ENV || 'development';
}
```

---

## 🛠️ **Step-by-Step Vercel Setup**

### **Option A: Single Project with Environment-Based Deployment**

#### **1. Vercel Project Configuration**

```bash
# Project Settings
Project Name: syndik
Framework: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

#### **2. Environment Variables Setup**

**Production Environment:**

```bash
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_MAIN_URL=https://syndik.ma
NEXT_PUBLIC_APP_URL=https://app.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.syndik.ma
VERCEL_ENV=production
```

**Preview Environment (Staging):**

```bash
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma
VERCEL_ENV=preview
```

#### **3. Domain Configuration**

**Production Domains:**

- `syndik.ma` (main)
- `admin.syndik.ma` (admin)
- `app.syndik.ma` (app portal)

**Staging Domains:**

- `staging.syndik.ma` (main)
- `admin.staging.syndik.ma` (admin)
- `app.staging.syndik.ma` (app portal)

---

### **Option B: Separate Projects (Recommended for Complex Setups)**

#### **Production Project: `syndik-production`**

- Branch: `main`
- Domains: `syndik.ma`, `admin.syndik.ma`, `app.syndik.ma`
- Environment: Production variables

#### **Staging Project: `syndik-staging`**

- Branch: `staging`
- Domains: `staging.syndik.ma`, `admin.staging.syndik.ma`, `app.staging.syndik.ma`
- Environment: Staging variables

---

## 🔍 **Debugging Commands**

### **1. Check Environment Variables**

```bash
# Add this to your app to debug
console.log('Environment Debug:', {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_ENV: process.env.VERCEL_ENV,
  NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  NEXT_PUBLIC_MAIN_URL: process.env.NEXT_PUBLIC_MAIN_URL,
  hostname: typeof window !== 'undefined' ? window.location.hostname : 'server',
});
```

### **2. Test Subdomain Detection**

```bash
# Add this to a page component
const subdomain = getCurrentSubdomain(window.location.hostname);
console.log('Detected subdomain:', subdomain);
```

### **3. Vercel CLI Debugging**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy with environment
vercel --prod  # Production
vercel         # Preview (staging)

# Check environment variables
vercel env list
```

---

## 🚀 **Deployment Workflow**

### **Production Deployment:**

```bash
git checkout main
git push origin main
# Auto-deploys to production domains
```

### **Staging Deployment:**

```bash
git checkout staging
git merge main
git push origin staging
# Auto-deploys to staging domains
```

### **Preview Deployment:**

```bash
git push origin feature-branch
# Creates preview deployment at random URL
```

---

## 📋 **Pre-Deployment Checklist**

- [ ] Environment variables set in Vercel dashboard
- [ ] Custom domains added and verified
- [ ] DNS records configured correctly
- [ ] Build command works locally
- [ ] All routes accessible via fallback paths (`/admin-dev`)
- [ ] Database connections configured for each environment
- [ ] Clerk authentication configured for each environment

---

## 🆘 **Emergency Fixes**

### **If Subdomains Don't Work:**

Use route-based fallbacks:

- `yourapp.vercel.app/admin-dev` instead of `admin.yourapp.vercel.app`
- `yourapp.vercel.app/dashboard` instead of `app.yourapp.vercel.app`

### **If Environment Variables Don't Load:**

1. Check Vercel dashboard settings
2. Redeploy the project
3. Use Vercel CLI to debug: `vercel env list`

### **If Custom Domains Don't Work:**

1. Verify DNS propagation: `nslookup syndik.ma`
2. Check SSL certificate status in Vercel
3. Wait up to 24 hours for DNS propagation

---

## 📞 **Support Commands**

```bash
# Check Vercel status
vercel --version

# Check project info
vercel inspect [deployment-url]

# View logs
vercel logs [deployment-url]

# Force redeploy
vercel --force
```
