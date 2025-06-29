# Deployment Guide: syndik.vercel.app → syndik.ma

## Current Setup (Vercel Route-Based)

### ✅ Your Vercel URL:

- **Main**: `https://syndik.vercel.app`
- **Admin**: `https://syndik.vercel.app/admin-dev`
- **App**: `https://syndik.vercel.app/dashboard` or `/portal`

### 🔧 Environment Variables Set:

```bash
# All point to same domain - route-based routing handles the rest
NEXT_PUBLIC_MAIN_URL=https://syndik.vercel.app
NEXT_PUBLIC_APP_URL=https://syndik.vercel.app
NEXT_PUBLIC_ADMIN_URL=https://syndik.vercel.app
NEXT_PUBLIC_API_URL=https://syndik.vercel.app
```

### 📝 Important Note:

Vercel provides **ONE domain** per deployment. No automatic subdomains exist.

## Testing Your Vercel Deployment

### 1. Test Main Landing Page

```
✅ https://syndik.vercel.app
Should show: Landing page with login/signup
```

### 2. Test Admin Portal (Route-Based)

```
✅ https://syndik.vercel.app/admin-dev
Should redirect to: Authentication, then admin dashboard
```

### 3. Test App Portal (Route-Based)

```
✅ https://syndik.vercel.app/dashboard
Should redirect to: Authentication, then role-based dashboard
```

### 4. Test Localized Routes

```
✅ https://syndik.vercel.app/en/admin-dev
✅ https://syndik.vercel.app/fr/admin-dev
✅ https://syndik.vercel.app/ar/admin-dev
```

## Migration to syndik.ma (When Ready)

### Phase 1: Prepare Custom Domain

1. **Purchase domain**: `syndik.ma`
2. **Configure DNS**: Point to Vercel
3. **SSL Certificate**: Auto-generated by Vercel

### Phase 2: Add Domain to Vercel

In Vercel Dashboard → Domains:

```
Add these domains:
✅ syndik.ma
✅ admin.syndik.ma
✅ app.syndik.ma
✅ api.syndik.ma
```

### Phase 3: Update Environment Variables

Simply uncomment the production URLs in `.env.local`:

```bash
# Comment out Vercel URLs:
# NEXT_PUBLIC_MAIN_URL=https://syndik.vercel.app
# NEXT_PUBLIC_APP_URL=https://app-syndik.vercel.app
# NEXT_PUBLIC_ADMIN_URL=https://admin-syndik.vercel.app
# NEXT_PUBLIC_API_URL=https://api-syndik.vercel.app

# Uncomment production URLs:
NEXT_PUBLIC_MAIN_URL=https://syndik.ma
NEXT_PUBLIC_APP_URL=https://app.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.syndik.ma
NEXT_PUBLIC_API_URL=https://api.syndik.ma
```

### Phase 4: Deploy & Test

Deploy the updated environment and test:

```
✅ https://syndik.ma (main)
✅ https://admin.syndik.ma (admin)
✅ https://app.syndik.ma (app)
```

## DNS Configuration for syndik.ma

When ready for custom domain, add these DNS records:

```
Type: A     Name: @      Value: 76.76.19.61     (Vercel IP)
Type: A     Name: admin  Value: 76.76.19.61     (Admin subdomain)
Type: A     Name: app    Value: 76.76.19.61     (App subdomain)
Type: A     Name: api    Value: 76.76.19.61     (API subdomain)

Type: CNAME Name: www    Value: cname.vercel-dns.com
```

## Verification Commands

### Test Vercel Subdomains (Now)

```bash
curl -I https://syndik.vercel.app
curl -I https://admin-syndik.vercel.app
curl -I https://app-syndik.vercel.app
```

### Test Custom Domain (Future)

```bash
curl -I https://syndik.ma
curl -I https://admin.syndik.ma
curl -I https://app.syndik.ma
```

## Benefits of This Setup

✅ **Zero Downtime Migration**: Switch environment variables only  
✅ **Fallback Routes**: `/admin-dev` always works as backup  
✅ **Gradual Migration**: Test subdomains first, then switch  
✅ **Rollback Ready**: Can revert to Vercel URLs instantly

Your app is fully configured for both Vercel subdomains AND future custom domain migration! 🚀
