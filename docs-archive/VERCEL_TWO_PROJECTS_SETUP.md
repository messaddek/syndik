# 🚀 Two Vercel Projects Setup Guide

## 📋 **Overview**

This guide sets up **two separate Vercel projects** for complete environment isolation:

- **Production Project**: `syndik-production`
- **Staging Project**: `syndik-staging`

## 🏗️ **Architecture**

### **Production Project (`syndik-production`)**

- **Branch**: `main`
- **Domains**:
  - `syndik.ma` (main)
  - `admin.syndik.ma` (admin portal)
  - `app.syndik.ma` (app portal)
- **Database**: Production database
- **Auth**: Production Clerk keys

### **Staging Project (`syndik-staging`)**

- **Branch**: `staging`
- **Domains**:
  - `staging.syndik.ma` (main)
  - `admin.staging.syndik.ma` (admin portal)
  - `app.staging.syndik.ma` (app portal)
- **Database**: Staging database
- **Auth**: Staging/Test Clerk keys

---

## 🛠️ **Step-by-Step Setup**

### **Step 1: Create Production Project**

1. **Go to [Vercel Dashboard](https://vercel.com/new)**
2. **Import your repository**
3. **Configure project:**

   ```bash
   Project Name: syndik-production
   Framework: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Set Git Configuration:**

   - **Production Branch**: `main`
   - **Enable automatic deployments**: ✅

5. **Add Production Environment Variables:**

   ```bash
   NEXT_PUBLIC_ENVIRONMENT=production
   NEXT_PUBLIC_MAIN_URL=https://syndik.ma
   NEXT_PUBLIC_APP_URL=https://app.syndik.ma
   NEXT_PUBLIC_ADMIN_URL=https://admin.syndik.ma
   NEXT_PUBLIC_API_URL=https://api.syndik.ma

   # Database (Production)
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

6. **Add Custom Domains:**
   - `syndik.ma`
   - `admin.syndik.ma`
   - `app.syndik.ma`

### **Step 2: Create Staging Project**

1. **Go to [Vercel Dashboard](https://vercel.com/new)**
2. **Import the SAME repository**
3. **Configure project:**

   ```bash
   Project Name: syndik-staging
   Framework: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Set Git Configuration:**

   - **Production Branch**: `staging`
   - **Enable automatic deployments**: ✅

5. **Add Staging Environment Variables:**

   ```bash
   NEXT_PUBLIC_ENVIRONMENT=staging
   NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
   NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
   NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma
   NEXT_PUBLIC_API_URL=https://api.staging.syndik.ma

   # Database (Staging)
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

6. **Add Custom Domains:**
   - `staging.syndik.ma`
   - `admin.staging.syndik.ma`
   - `app.staging.syndik.ma`

---

## 🌐 **DNS Configuration**

### **Required DNS Records:**

```dns
# Production A Records
syndik.ma                 A     76.76.19.61

# Production CNAME Records
admin.syndik.ma           CNAME cname.vercel-dns.com
app.syndik.ma             CNAME cname.vercel-dns.com

# Staging A Records
staging.syndik.ma         A     76.76.19.61

# Staging CNAME Records
admin.staging.syndik.ma   CNAME cname.vercel-dns.com
app.staging.syndik.ma     CNAME cname.vercel-dns.com
```

---

## 🔄 **Deployment Workflow**

### **Production Deployment:**

```bash
# Work on features in feature branches
git checkout -b feature/new-feature
# ... make changes ...
git commit -m "Add new feature"
git push origin feature/new-feature

# Create PR to main branch
# After review and approval, merge to main
git checkout main
git merge feature/new-feature
git push origin main

# ✅ Automatically deploys to syndik-production project
```

### **Staging Deployment:**

```bash
# Merge main to staging for testing
git checkout staging
git merge main
git push origin staging

# ✅ Automatically deploys to syndik-staging project
```

### **Hotfix Deployment:**

```bash
# For urgent fixes, deploy directly to main
git checkout main
# ... make hotfix ...
git commit -m "Hotfix: critical bug"
git push origin main

# Then update staging
git checkout staging
git merge main
git push origin staging
```

---

## 📋 **Project Configuration Checklist**

### **Production Project (`syndik-production`)**

- [ ] Project created and linked to repository
- [ ] Production branch set to `main`
- [ ] All environment variables configured
- [ ] Custom domains added and verified
- [ ] SSL certificates active
- [ ] Build/deploy settings correct
- [ ] Database connection tested
- [ ] Clerk authentication tested

### **Staging Project (`syndik-staging`)**

- [ ] Project created and linked to repository
- [ ] Production branch set to `staging`
- [ ] All environment variables configured
- [ ] Custom domains added and verified
- [ ] SSL certificates active
- [ ] Build/deploy settings correct
- [ ] Database connection tested
- [ ] Clerk authentication tested

---

## 🔧 **Management Scripts**

### **Deploy to Production:**

```bash
#!/bin/bash
# deploy-production.sh

echo "🚀 Deploying to Production..."

# Ensure we're on main branch
git checkout main
git pull origin main

# Optional: Run tests
npm test

# Push to trigger deployment
git push origin main

echo "✅ Production deployment triggered!"
echo "🌐 Check: https://syndik.ma"
```

### **Deploy to Staging:**

```bash
#!/bin/bash
# deploy-staging.sh

echo "🧪 Deploying to Staging..."

# Merge latest main to staging
git checkout staging
git pull origin staging
git merge main

# Push to trigger deployment
git push origin staging

echo "✅ Staging deployment triggered!"
echo "🌐 Check: https://staging.syndik.ma"
```

---

## 🎯 **Benefits of Two Projects**

### **✅ Advantages:**

- **Complete Isolation**: Production and staging are completely separate
- **Security**: Production environment variables never exposed to staging
- **Independent Scaling**: Different performance settings per environment
- **Simplified Management**: Clear separation of concerns
- **Better Testing**: Full production-like environment for staging
- **Rollback Safety**: Issues in staging don't affect production

### **⚠️ Considerations:**

- **Double Setup**: Need to configure both projects
- **Resource Usage**: Uses more Vercel project quota
- **Sync Management**: Need to keep configurations in sync

---

## 🧪 **Testing Your Setup**

### **1. Test Environment Detection**

Visit both domains and check the debug page:

- **Production**: `https://syndik.ma/debug`
- **Staging**: `https://staging.syndik.ma/debug`

### **2. Test Subdomain Routing**

- **Production Admin**: `https://admin.syndik.ma`
- **Production App**: `https://app.syndik.ma`
- **Staging Admin**: `https://admin.staging.syndik.ma`
- **Staging App**: `https://app.staging.syndik.ma`

### **3. Test Fallback Routes**

- **Vercel Preview**: `https://syndik-production-git-feature.vercel.app/admin-dev`
- **Vercel Preview**: `https://syndik-staging-git-feature.vercel.app/admin-dev`

---

## 🆘 **Troubleshooting**

### **Issue: Deployment Not Triggering**

**Fix:**

1. Check Git integration in Vercel project settings
2. Ensure correct branch is set as production branch
3. Check deployment logs in Vercel dashboard

### **Issue: Environment Variables Not Loading**

**Fix:**

1. Verify variables are set in correct Vercel project
2. Check variable names match exactly
3. Redeploy after adding variables

### **Issue: Custom Domain SSL Issues**

**Fix:**

1. Wait 24-48 hours for DNS propagation
2. Check domain ownership verification
3. Ensure DNS records point to correct Vercel project

---

## 📞 **Quick Commands**

```bash
# Check which project you're working with
vercel ls

# Switch to production project
vercel switch syndik-production

# Switch to staging project
vercel switch syndik-staging

# Deploy manually to current project
vercel --prod

# View project logs
vercel logs [deployment-url]

# Check environment variables
vercel env ls
```

This two-project setup gives you the best of both worlds: complete isolation and professional deployment management! 🚀
