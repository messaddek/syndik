# 🎯 Two Vercel Projects - Quick Reference

## 📋 **Project Overview**

| Project             | Branch    | Domains                                                                 | Purpose              |
| ------------------- | --------- | ----------------------------------------------------------------------- | -------------------- |
| `syndik-production` | `main`    | `syndik.ma`, `admin.syndik.ma`, `app.syndik.ma`                         | Live production site |
| `syndik-staging`    | `staging` | `staging.syndik.ma`, `admin.staging.syndik.ma`, `app.staging.syndik.ma` | Testing environment  |

## 🚀 **Quick Commands**

### **Setup Projects**

```powershell
# Run the setup script
.\scripts\setup-two-vercel-projects.ps1
```

### **Deploy to Production**

```powershell
# Deploy to production
.\scripts\deploy-production.ps1

# Or manually:
git checkout main
git pull origin main
git push origin main
```

### **Deploy to Staging**

```powershell
# Deploy to staging
.\scripts\deploy-staging.ps1

# Or manually:
git checkout staging
git merge main
git push origin staging
```

### **Switch Between Projects (Vercel CLI)**

```bash
# List projects
vercel ls

# Switch to production project
vercel switch syndik-production

# Switch to staging project
vercel switch syndik-staging

# Check current project
vercel ls --scope="your-team"
```

## 🔧 **Environment Variables**

### **Production Project Variables**

```bash
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_MAIN_URL=https://syndik.ma
NEXT_PUBLIC_APP_URL=https://app.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.syndik.ma
NEXT_PUBLIC_API_URL=https://api.syndik.ma
DATABASE_URL=postgresql://prod_user:password@prod-db.neon.tech/syndik_prod
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
```

### **Staging Project Variables**

```bash
NEXT_PUBLIC_ENVIRONMENT=staging
NEXT_PUBLIC_MAIN_URL=https://staging.syndik.ma
NEXT_PUBLIC_APP_URL=https://app.staging.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.staging.syndik.ma
NEXT_PUBLIC_API_URL=https://api.staging.syndik.ma
DATABASE_URL=postgresql://staging_user:password@staging-db.neon.tech/syndik_staging
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

## 🌐 **DNS Records**

### **Production**

```dns
syndik.ma                 A     76.76.19.61
admin.syndik.ma           CNAME cname.vercel-dns.com
app.syndik.ma             CNAME cname.vercel-dns.com
```

### **Staging**

```dns
staging.syndik.ma         A     76.76.19.61
admin.staging.syndik.ma   CNAME cname.vercel-dns.com
app.staging.syndik.ma     CNAME cname.vercel-dns.com
```

## 🔄 **Development Workflow**

### **Feature Development**

```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/new-feature

# 2. Develop and commit
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# 3. Create PR to main branch
# 4. After approval, merge to main
# 5. Deploy to staging for testing
.\scripts\deploy-staging.ps1

# 6. After testing, production auto-deploys from main
```

### **Hotfix Workflow**

```bash
# 1. Create hotfix from main
git checkout main
git checkout -b hotfix/critical-fix

# 2. Make fix and test
git add .
git commit -m "Fix critical issue"

# 3. Merge to main (skip staging for urgency)
git checkout main
git merge hotfix/critical-fix
git push origin main

# 4. Update staging
git checkout staging
git merge main
git push origin staging
```

## 🧪 **Testing URLs**

### **Production**

- **Main**: https://syndik.ma
- **Admin**: https://admin.syndik.ma
- **App**: https://app.syndik.ma
- **Debug**: https://syndik.ma/debug

### **Staging**

- **Main**: https://staging.syndik.ma
- **Admin**: https://admin.staging.syndik.ma
- **App**: https://app.staging.syndik.ma
- **Debug**: https://staging.syndik.ma/debug

### **Vercel Preview (Feature Branches)**

- **Production Preview**: https://syndik-production-git-[branch].vercel.app
- **Staging Preview**: https://syndik-staging-git-[branch].vercel.app

## 🆘 **Troubleshooting**

### **Deployment Not Triggering**

1. Check Git integration in Vercel project settings
2. Verify correct branch is set as production branch
3. Check if there are any build errors

### **Wrong Environment Variables**

1. Ensure you're in the correct Vercel project
2. Use `vercel switch` to change projects
3. Check environment variables with `vercel env ls`

### **Domain Issues**

1. Verify DNS records are pointing to correct project
2. Check domain configuration in Vercel dashboard
3. Wait 24-48 hours for DNS propagation

## 📞 **Support Commands**

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Check environment variables
vercel env ls

# Force redeploy
vercel --prod

# Inspect deployment
vercel inspect [deployment-url]
```

## 📚 **Additional Resources**

- **Full Setup Guide**: `VERCEL_TWO_PROJECTS_SETUP.md`
- **Troubleshooting**: `VERCEL_TROUBLESHOOTING_GUIDE.md`
- **Environment Setup**: `VERCEL_ENVIRONMENT_SETUP.md`
- **Vercel Dashboard**: https://vercel.com/dashboard
