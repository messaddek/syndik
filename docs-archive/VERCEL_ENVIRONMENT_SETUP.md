# 🌍 Environment Configuration for Vercel

## 📋 **Quick Setup Checklist**

### **1. Production Environment Variables (Vercel Dashboard)**

```bash
# ✅ Add these to Production Environment in Vercel Dashboard
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_MAIN_URL=https://syndik.ma
NEXT_PUBLIC_APP_URL=https://app.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.syndik.ma
NEXT_PUBLIC_API_URL=https://api.syndik.ma

# Database
DATABASE_URL=postgresql://prod_user:password@prod-db.neon.tech/syndik_prod

# Clerk Auth (Production)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/org-switcher
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/org-switcher
CLERK_WEBHOOK_SECRET=whsec_production...
```

### **2. Preview/Staging Environment Variables (Vercel Dashboard)**

```bash
# ✅ Add these to Preview Environment in Vercel Dashboard
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma
NEXT_PUBLIC_API_URL=https://api.staging.syndik.ma

# Database
DATABASE_URL=postgresql://staging_user:password@staging-db.neon.tech/syndik_staging

# Clerk Auth (Staging)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/org-switcher
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/org-switcher
CLERK_WEBHOOK_SECRET=whsec_staging...
```

### **3. Development Environment Variables (.env.local)**

```bash
# ✅ Keep these in your .env.local file
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_MAIN_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://app.localhost:3000
NEXT_PUBLIC_ADMIN_URL=http://admin.localhost:3000
NEXT_PUBLIC_DEV_MAIN_URL=http://localhost:3000
NEXT_PUBLIC_DEV_APP_URL=http://app.localhost:3000
NEXT_PUBLIC_DEV_ADMIN_URL=http://admin.localhost:3000

# Database (Local)
DATABASE_URL=postgresql://postgres:password@localhost:5432/syndik_dev

# Clerk Auth (Development)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

---

## 🚀 **Vercel Dashboard Setup Steps**

### **Step 1: Environment Variables**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add variables for each environment:
   - **Production**: Use production values
   - **Preview**: Use staging values
   - **Development**: Use development values

### **Step 2: Custom Domains**

1. Go to **Settings** → **Domains**
2. Add production domains:
   - `syndik.ma`
   - `admin.syndik.ma`
   - `app.syndik.ma`
3. Add staging domains:
   - `staging.syndik.ma`
   - `admin.staging.syndik.ma`
   - `app.staging.syndik.ma`

### **Step 3: Git Integration**

1. Go to **Settings** → **Git**
2. Set **Production Branch**: `main`
3. Enable **Automatic deployments from Git**

---

## 🔧 **DNS Configuration**

### **Required DNS Records:**

```dns
# A Records (Point to Vercel IP)
syndik.ma                 A     76.76.19.61
staging.syndik.ma         A     76.76.19.61

# CNAME Records (Point to Vercel)
admin.syndik.ma           CNAME cname.vercel-dns.com
app.syndik.ma             CNAME cname.vercel-dns.com
admin.staging.syndik.ma   CNAME cname.vercel-dns.com
app.staging.syndik.ma     CNAME cname.vercel-dns.com
```

---

## 🐛 **Common Issues & Fixes**

### **Issue: Environment Variables Not Loading**

**Symptoms:** `process.env.NEXT_PUBLIC_MAIN_URL` is undefined on Vercel

**Fix:**

1. Check Vercel Dashboard → Settings → Environment Variables
2. Ensure variables are set for correct environment (Production/Preview)
3. Redeploy after adding variables

### **Issue: Subdomains Not Working on Vercel**

**Symptoms:** `admin.yourapp.vercel.app` returns 404

**Fix:**

- Vercel's `.vercel.app` domains don't support subdomains
- Use route-based routing instead: `yourapp.vercel.app/admin-dev`

### **Issue: Custom Domain SSL Issues**

**Symptoms:** SSL certificate errors or "Not Secure" warnings

**Fix:**

1. Wait 24-48 hours for DNS propagation
2. Check domain verification in Vercel Dashboard
3. Ensure DNS records are correct

---

## 🧪 **Testing Your Setup**

### **1. Test Environment Detection**

Add this to any page component to debug:

```typescript
'use client';
import { debugEnvironment } from '@/lib/subdomain-utils';

export default function TestPage() {
  const envInfo = debugEnvironment();

  return (
    <div>
      <h1>Environment Test</h1>
      <pre>{JSON.stringify(envInfo, null, 2)}</pre>
    </div>
  );
}
```

### **2. Test Subdomain Routing**

- **Production:** Visit `admin.syndik.ma` → Should show admin
- **Staging:** Visit `admin.staging.syndik.ma` → Should show admin
- **Vercel:** Visit `yourapp.vercel.app/admin-dev` → Should show admin

### **3. Test Environment Variables**

- Check browser console for environment debug logs
- Verify API endpoints are correct for each environment

---

## 📞 **Emergency Commands**

```bash
# Check Vercel CLI
vercel --version

# Login to Vercel
vercel login

# Check project status
vercel ls

# View environment variables
vercel env ls

# Deploy manually
vercel --prod    # Production
vercel           # Preview

# View deployment logs
vercel logs [deployment-url]

# Force redeploy
vercel --force
```

---

## ✅ **Final Verification**

- [ ] All environment variables set in Vercel Dashboard
- [ ] Custom domains added and verified
- [ ] DNS records configured correctly
- [ ] SSL certificates active
- [ ] Routes work on all environments:
  - [ ] Production: `syndik.ma`, `admin.syndik.ma`, `app.syndik.ma`
  - [ ] Staging: `staging.syndik.ma`, `admin.staging.syndik.ma`, `app.staging.syndik.ma`
  - [ ] Vercel: `yourapp.vercel.app`, `yourapp.vercel.app/admin-dev`
- [ ] Environment detection working correctly
- [ ] Authentication working on all environments
