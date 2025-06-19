# Vercel Environment Configuration Guide

## 🚀 **Two-Environment Setup for Vercel**

### **Option 1: Separate Vercel Projects (Recommended)**

#### **Step 1: Create Production Project**

```bash
# In Vercel Dashboard:
# 1. Create new project: "syndik-production"
# 2. Connect to main branch
# 3. Add domains: syndik.ma, admin.syndik.ma, app.syndik.ma
```

**Production Environment Variables:**

```bash
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_MAIN_URL=https://syndik.ma
NEXT_PUBLIC_APP_URL=https://app.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.syndik.ma
NEXT_PUBLIC_API_URL=https://api.syndik.ma

# Database (Production)
DATABASE_URL=postgresql://prod_user:password@prod-db.neon.tech/syndik_prod

# Clerk (Production)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

#### **Step 2: Create Staging Project**

```bash
# In Vercel Dashboard:
# 1. Create new project: "syndik-staging"
# 2. Connect to staging branch
# 3. Add domains: staging.syndik.ma, admin.staging.syndik.ma, app.staging.syndik.ma
```

**Staging Environment Variables:**

```bash
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma
NEXT_PUBLIC_API_URL=https://api.staging.syndik.ma

# Database (Staging)
DATABASE_URL=postgresql://staging_user:password@staging-db.neon.tech/syndik_staging

# Clerk (Staging)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### **Option 2: Single Project with Git Branches**

#### **Vercel Project Configuration:**

```bash
# Production Deployment:
# Branch: main → syndik.ma

# Staging Deployment:
# Branch: staging → staging.syndik.ma

# Preview Deployments:
# Branch: feature/* → syndik-git-feature-name.vercel.app
```

#### **Environment Variables by Environment:**

**Production (main branch):**

```bash
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_MAIN_URL=https://syndik.ma
NEXT_PUBLIC_APP_URL=https://app.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.syndik.ma
NEXT_PUBLIC_API_URL=https://api.syndik.ma
```

**Preview (staging branch):**

```bash
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma
NEXT_PUBLIC_API_URL=https://api.staging.syndik.ma
```

## 🔧 **Configuration Steps**

### **1. DNS Configuration**

```bash
# Production DNS Records:
A    @           76.76.19.61  # syndik.ma
A    admin       76.76.19.61  # admin.syndik.ma
A    app         76.76.19.61  # app.syndik.ma

# Staging DNS Records:
A    staging           76.76.19.61  # staging.syndik.ma
A    admin.staging     76.76.19.61  # admin.staging.syndik.ma
A    app.staging       76.76.19.61  # app.staging.syndik.ma
```

### **2. Vercel Domain Configuration**

**Production Project Domains:**

- syndik.ma
- admin.syndik.ma
- app.syndik.ma
- api.syndik.ma

**Staging Project Domains:**

- staging.syndik.ma
- admin.staging.syndik.ma
- app.staging.syndik.ma
- api.staging.syndik.ma

### **3. Git Branch Strategy**

```bash
# Development workflow:
git checkout -b feature/new-feature
git push origin feature/new-feature
# → Creates preview deployment

# Staging deployment:
git checkout staging
git merge feature/new-feature
git push origin staging
# → Deploys to staging.syndik.ma

# Production deployment:
git checkout main
git merge staging
git push origin main
# → Deploys to syndik.ma
```

## 📱 **Environment Detection**

Your app will automatically detect the environment:

```typescript
// In subdomain-utils.ts - already configured
const isStaging =
  typeof window !== 'undefined'
    ? window.location.hostname.includes('staging.syndik.ma')
    : process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging';

const isProduction =
  typeof window !== 'undefined'
    ? window.location.hostname.includes('syndik.ma') &&
      !window.location.hostname.includes('staging')
    : process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';
```

## 🧪 **Testing URLs**

### **Staging Environment:**

- Main: https://staging.syndik.ma
- Admin: https://admin.staging.syndik.ma
- App: https://app.staging.syndik.ma

### **Production Environment:**

- Main: https://syndik.ma
- Admin: https://admin.syndik.ma
- App: https://app.syndik.ma

## 🔄 **Deployment Commands**

### **Option 1: Separate Projects**

```bash
# Deploy to staging project
vercel --prod --project syndik-staging

# Deploy to production project
vercel --prod --project syndik-production
```

### **Option 2: Single Project**

```bash
# Deploy staging branch
git checkout staging
git push origin staging

# Deploy production branch
git checkout main
git push origin main
```

## ✅ **Benefits**

### **Separate Projects (Recommended):**

✅ **Complete Isolation** - Separate databases, auth, etc.
✅ **Independent Deployments** - No risk of affecting production
✅ **Separate Analytics** - Clear production vs staging metrics
✅ **Team Access Control** - Different permissions per environment

### **Single Project:**

✅ **Simpler Setup** - One project to manage
✅ **Shared Configuration** - Environment variables can be shared
✅ **Automatic Previews** - Every branch gets a preview URL

## 🎯 **Recommendation**

For a production SaaS like Syndik, I recommend **Option 1: Separate Vercel Projects** because:

1. **Safety**: Staging experiments won't affect production
2. **Security**: Separate databases and auth environments
3. **Performance**: Independent monitoring and analytics
4. **Team Management**: Better access control

Would you like me to help you set up either option?
