# Vercel Subdomain Deployment Guide

## Overview

This guide explains how to deploy the Syndik app with subdomain support on Vercel.

## Deployment Options

### Option 1: Vercel Subdomains (Recommended for Testing)

Vercel automatically creates subdomain-style URLs for your deployments:

- **Main**: `your-project.vercel.app`
- **Admin**: `admin-your-project.vercel.app`
- **App**: `app-your-project.vercel.app`
- **API**: `api-your-project.vercel.app`

### Option 2: Custom Domain with Real Subdomains

For production, use your own domain with proper DNS configuration:

- **Main**: `syndik.ma`
- **Admin**: `admin.syndik.ma`
- **App**: `app.syndik.ma`
- **API**: `api.syndik.ma`

## Vercel Configuration Steps

### 1. Environment Variables

Set these in your Vercel dashboard:

```bash
# Custom Domain URLs (if using custom domain)
NEXT_PUBLIC_MAIN_URL=https://syndik.ma
NEXT_PUBLIC_APP_URL=https://app.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.syndik.ma
NEXT_PUBLIC_API_URL=https://api.syndik.ma

# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Database
DATABASE_URL=postgresql://...
```

### 2. DNS Configuration (Custom Domain Only)

Add these DNS records to your domain provider:

```
Type: A     Name: @      Value: 76.76.19.61
Type: A     Name: admin  Value: 76.76.19.61
Type: A     Name: app    Value: 76.76.19.61
Type: A     Name: api    Value: 76.76.19.61
```

### 3. Vercel Domain Configuration

In Vercel dashboard:

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domains:
   - `syndik.ma`
   - `admin.syndik.ma`
   - `app.syndik.ma`
   - `api.syndik.ma`

### 4. Testing Deployment

#### Vercel Subdomains

After deployment, test these URLs:

- `https://your-project.vercel.app` (main landing)
- `https://admin-your-project.vercel.app` (admin portal)
- `https://app-your-project.vercel.app` (app portal)

#### Custom Domain

After DNS propagation:

- `https://syndik.ma` (main landing)
- `https://admin.syndik.ma` (admin portal)
- `https://app.syndik.ma` (app portal)

## Verification Checklist

- [ ] Main landing page loads correctly
- [ ] Admin portal redirects to authentication
- [ ] App portal shows dashboard/portal based on user role
- [ ] Navigation between subdomains works
- [ ] Authentication persists across subdomains
- [ ] All locales (en/fr/ar) work correctly

## Troubleshooting

### Common Issues:

1. **404 Errors**: Check middleware logs in Vercel functions
2. **Authentication Issues**: Verify Clerk domain configuration
3. **Subdomain Detection**: Check browser network tab for correct routing
4. **DNS Propagation**: Use `dig` command to verify DNS records

### Debug Commands:

```bash
# Check DNS
dig syndik.ma
dig admin.syndik.ma

# Test subdomain detection
curl -H "Host: admin.syndik.ma" https://syndik.ma
```

## Production Considerations

1. **SSL Certificates**: Vercel handles automatically
2. **CDN**: Built-in with Vercel Edge Network
3. **Monitoring**: Use Vercel Analytics + custom logging
4. **Performance**: Enable ISR for static content
5. **Security**: Configure CORS and CSP headers

## Fallback Routes

Even in production, these fallback routes work without subdomains:

- `https://syndik.ma/admin-dev` → Admin portal
- `https://syndik.ma/en/admin-dev` → Localized admin portal

This ensures admin access even if subdomain DNS fails.
