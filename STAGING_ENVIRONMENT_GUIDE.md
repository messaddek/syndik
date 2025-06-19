# 🚀 Staging Environment Setup Guide

## Overview

Setting up a staging environment with `staging.syndik.ma` provides a safe testing ground before production deployments.

## 🏗️ **Recommended Architecture**

### **Environment Hierarchy:**

```
┌─ Development ─┐    ┌─── Staging ────┐    ┌─ Production ─┐
│ localhost:3000 │ → │ staging.syndik.ma │ → │  syndik.ma   │
│ /admin-dev     │   │ admin.staging.… │   │ admin.syndik.ma │
│ Route-based    │   │ Real subdomains │   │ Real subdomains │
└────────────────┘    └─────────────────┘    └───────────────┘
```

### **URL Structure:**

| Environment     | Main                | Admin                      | App                        |
| --------------- | ------------------- | -------------------------- | -------------------------- |
| **Development** | `localhost:3000`    | `localhost:3000/admin-dev` | `localhost:3000/dashboard` |
| **Staging**     | `staging.syndik.ma` | `admin.staging.syndik.ma`  | `app.staging.syndik.ma`    |
| **Production**  | `syndik.ma`         | `admin.syndik.ma`          | `app.syndik.ma`            |

## 🔧 **Vercel Setup**

### **1. Create Staging Project**

```bash
# Option A: Separate Vercel project for staging
vercel --prod --env NEXT_PUBLIC_ENVIRONMENT=staging

# Option B: Use Git branches with same project
# staging branch → staging.syndik.ma
# main branch → syndik.ma
```

### **2. Environment Variables (Staging)**

In Vercel dashboard for staging project:

```bash
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma
NEXT_PUBLIC_API_URL=https://api.staging.syndik.ma

# Database (separate staging DB recommended)
DATABASE_URL=postgresql://staging_user:password@staging-db.neon.tech/staging_db

# Clerk (staging environment)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_staging...
CLERK_SECRET_KEY=sk_test_staging...
```

### **3. DNS Configuration**

Add these DNS records to your domain provider:

```
Type: A     Name: staging           Value: 76.76.19.61
Type: A     Name: admin.staging     Value: 76.76.19.61
Type: A     Name: app.staging       Value: 76.76.19.61
Type: A     Name: api.staging       Value: 76.76.19.61
```

### **4. Vercel Domain Configuration**

In Vercel staging project → Domains:

```
✅ staging.syndik.ma
✅ admin.staging.syndik.ma
✅ app.staging.syndik.ma
✅ api.staging.syndik.ma
```

## 🔄 **Deployment Workflow**

### **Option A: Branch-Based (Recommended)**

```bash
# Development
git checkout dev
git push origin dev
# → Auto-deploys to Vercel preview URL

# Staging
git checkout staging
git merge dev
git push origin staging
# → Auto-deploys to staging.syndik.ma

# Production
git checkout main
git merge staging
git push origin main
# → Auto-deploys to syndik.ma
```

### **Option B: Separate Projects**

```bash
# Deploy to staging project
vercel --prod --env NEXT_PUBLIC_ENVIRONMENT=staging

# Deploy to production project
vercel --prod --env NEXT_PUBLIC_ENVIRONMENT=production
```

## 🧪 **Testing Strategy**

### **Staging Checklist:**

- [ ] `https://staging.syndik.ma` - Landing page
- [ ] `https://admin.staging.syndik.ma` - Admin portal
- [ ] `https://app.staging.syndik.ma` - App portal
- [ ] Authentication flows
- [ ] Database operations (staging DB)
- [ ] API endpoints
- [ ] Internationalization (en/fr/ar)
- [ ] Cross-subdomain navigation

### **Pre-Production Validation:**

1. **Functionality Testing** - All features work
2. **Performance Testing** - Load times acceptable
3. **Security Testing** - Auth and permissions
4. **Browser Testing** - Cross-browser compatibility
5. **Mobile Testing** - Responsive design
6. **Data Migration** - Staging → Production sync

## 📊 **Environment Comparison**

| Feature        | Development    | Staging           | Production      |
| -------------- | -------------- | ----------------- | --------------- |
| **Domain**     | localhost:3000 | staging.syndik.ma | syndik.ma       |
| **Subdomains** | Route-based    | Real subdomains   | Real subdomains |
| **Database**   | Local/Dev DB   | Staging DB        | Production DB   |
| **Auth**       | Test keys      | Staging keys      | Production keys |
| **SSL**        | None           | Auto (Vercel)     | Auto (Vercel)   |
| **CDN**        | None           | Vercel Edge       | Vercel Edge     |
| **Monitoring** | Console logs   | Basic logging     | Full monitoring |

## 🚀 **Quick Setup Commands**

### **1. Update Environment for Staging:**

```bash
# In .env.local for staging deployment
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma
NEXT_PUBLIC_API_URL=https://api.staging.syndik.ma
```

### **2. Deploy to Staging:**

```bash
# Method 1: Branch-based
git checkout -b staging
git push origin staging

# Method 2: Direct deployment
vercel --prod
```

### **3. Test Staging:**

```bash
# Automated testing
curl -I https://staging.syndik.ma
curl -I https://admin.staging.syndik.ma

# Manual testing
open https://staging.syndik.ma
```

## ✅ **Benefits of Staging Environment**

### **Risk Mitigation:**

✅ **Safe Testing** - Test changes before production  
✅ **Real Environment** - Same infrastructure as production  
✅ **Data Safety** - Separate database prevents corruption  
✅ **User Impact** - Zero impact on production users

### **Development Benefits:**

✅ **Client Demos** - Show progress on staging  
✅ **QA Testing** - Dedicated environment for testing  
✅ **Integration Testing** - Test with real APIs  
✅ **Performance Testing** - Load test without affecting users

### **Deployment Benefits:**

✅ **Confidence** - Verify deployments work  
✅ **Rollback Ready** - Quick revert if issues found  
✅ **Team Collaboration** - Shared testing environment  
✅ **Continuous Deployment** - Automated staging deployments

## 🎯 **Next Steps**

1. **Choose Deployment Strategy** - Branch-based or separate projects
2. **Set Up DNS Records** - Add staging subdomains
3. **Configure Vercel** - Add domains and environment variables
4. **Create Staging Database** - Separate from production
5. **Test Deployment** - Verify all staging URLs work
6. **Document Workflow** - Team guidelines for staging use

Would you like me to help you implement any of these steps?
