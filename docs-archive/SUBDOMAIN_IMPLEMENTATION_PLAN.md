# Subdomain Architecture Implementation Plan

## Overview

Implementing subdomain-based routing to provide clear separation between different portals:

- `app.[domain]` → Syndikate Dashboard & Resident Portal
- `admin.[domain]` → Admin Portal

## Benefits

### 1. **Clear User Experience**

- Users instantly know which portal they're accessing
- Easier bookmarking and navigation
- Reduced confusion between interfaces

### 2. **Enhanced Security**

- Different security policies per subdomain
- Better isolation of admin functions
- Clearer audit trails

### 3. **Better SEO & Branding**

- Each portal can have its own identity
- Better search engine optimization
- Professional appearance

### 4. **Scalability**

- Independent deployment strategies
- Different scaling policies
- Easier load balancing

## Proposed Architecture

```
syndik.ma (Main Landing)
├── /                     # Landing page
├── /about               # About page
├── /pricing             # Pricing page
├── /features            # Features page
├── /contact             # Contact page
├── /sign-in, /sign-up   # Authentication
└── /help, /support      # Public help/support

app.syndik.ma (Application Portal)
├── /dashboard/*         # Property Management Dashboard (admin/manager)
├── /portal/*            # Resident Portal (member)
├── /org-switcher        # Organization selection
├── /org-redirect        # Role-based routing
└── /settings, /profile  # User settings

admin.syndik.ma (System Admin Portal)
├── /                    # Admin Dashboard
├── /organizations       # Organization Management
├── /users              # User Management
├── /b2b-tickets        # B2B Support Tickets
├── /security           # Security Settings
├── /database           # Database Management
└── /settings           # System Settings
```

## Implementation Steps

### Phase 1: DNS & Infrastructure Setup

1. **DNS Configuration**

   ```
   syndik.ma        → CNAME → main-landing.vercel.app
   app.syndik.ma    → CNAME → app-portal.vercel.app
   admin.syndik.ma  → CNAME → admin-portal.vercel.app
   ```

2. **Vercel Configuration**
   ```json
   // vercel.json
   {
     "domains": ["syndik.ma", "app.syndik.ma", "admin.syndik.ma"]
   }
   ```

### Phase 2: Next.js Configuration

1. **Update next.config.ts**

   ```typescript
   const nextConfig: NextConfig = {
     async rewrites() {
       return {
         beforeFiles: [
           // Admin subdomain routing
           {
             source: '/:path*',
             has: [
               {
                 type: 'host',
                 value: 'admin.syndik.ma',
               },
             ],
             destination: '/admin/:path*',
           },
         ],
       };
     },
   };
   ```

2. **Middleware Updates**
   ```typescript
   // src/middleware.ts
   export default clerkMiddleware(async (auth, req) => {
     const { hostname, pathname } = req.nextUrl;

     // Handle subdomain routing
     if (hostname === 'admin.syndik.ma') {
       // Admin portal logic
       if (!pathname.startsWith('/admin')) {
         return NextResponse.rewrite(new URL(`/admin${pathname}`, req.url));
       }
     }

     // Continue with existing logic...
   });
   ```

### Phase 3: Authentication Updates

1. **Clerk Configuration**

   ```typescript
   // Update allowed redirect URLs
   const allowedRedirectUrls = [
     'https://app.syndik.ma',
     'https://admin.syndik.ma',
     'http://localhost:3000', // development
   ];
   ```

2. **Role-Based Subdomain Redirects**
   ```typescript
   // After authentication, redirect based on role and intent
   switch (role) {
     case 'admin':
       // System admin → admin subdomain
       redirect('https://admin.syndik.ma');
       break;
     case 'manager':
       // Property manager → app subdomain dashboard
       redirect('https://app.syndik.ma/dashboard');
       break;
     case 'member':
       // Resident → app subdomain portal
       redirect('https://app.syndik.ma/portal');
       break;
   }
   ```

### Phase 4: Navigation Updates

1. **Cross-Subdomain Navigation**

   ```tsx
   // components/admin-access-button.tsx
   <Button
     onClick={() => (window.location.href = 'https://admin.syndik.ma')}
     className='admin-portal-btn'
   >
     Admin Portal
   </Button>
   ```

2. **Update Sidebar Links**
   ```tsx
   // Update all admin portal links to use full URLs
   const adminPortalUrl = 'https://admin.syndik.ma';
   const mainAppUrl = 'https://app.syndik.ma';
   ```

## Migration Strategy

### 1. **Gradual Rollout**

- Phase 1: Set up subdomains pointing to existing routes
- Phase 2: Update navigation to use new subdomains
- Phase 3: Implement subdomain-specific features
- Phase 4: Redirect old URLs to new subdomains

### 2. **Backward Compatibility**

```typescript
// Redirect old admin routes to new subdomain
if (pathname.startsWith('/admin') && hostname !== 'admin.syndik.ma') {
  return NextResponse.redirect(
    new URL(`https://admin.syndik.ma${pathname.replace('/admin', '')}`)
  );
}
```

### 3. **Development Environment**

```typescript
// Handle localhost development
const isLocal = hostname === 'localhost' || hostname.includes('127.0.0.1');
if (isLocal) {
  // Use path-based routing in development
  return; // Skip subdomain logic
}
```

## Security Considerations

### 1. **CORS Configuration**

```typescript
const corsOptions = {
  origin: ['https://app.syndik.ma', 'https://admin.syndik.ma'],
  credentials: true,
};
```

### 2. **Cookie Domain Settings**

```typescript
// Set cookies to work across subdomains
const cookieOptions = {
  domain: '.syndik.ma', // Note the leading dot
  secure: true,
  sameSite: 'lax',
};
```

### 3. **CSP Headers**

```typescript
const cspHeader = `
  default-src 'self' *.syndik.ma;
  script-src 'self' 'unsafe-inline' *.syndik.ma;
  style-src 'self' 'unsafe-inline' *.syndik.ma;
`;
```

## Testing Strategy

### 1. **Local Development**

```bash
# Add to /etc/hosts (macOS/Linux) or C:\Windows\System32\drivers\etc\hosts (Windows)
127.0.0.1 app.localhost
127.0.0.1 admin.localhost
```

### 2. **Testing Checklist**

- [ ] Authentication flows work across subdomains
- [ ] Role-based redirects function correctly
- [ ] Cross-subdomain navigation works
- [ ] Cookies and sessions persist
- [ ] API calls work from both subdomains

## Performance Considerations

### 1. **Shared Resources**

- Use CDN for shared assets
- Implement resource preloading
- Optimize critical path rendering

### 2. **Caching Strategy**

- Different caching policies per subdomain
- Shared component caching
- API response caching

## Monitoring & Analytics

### 1. **Separate Analytics**

```javascript
// Track admin vs main app usage separately
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    custom_dimension_1: 'subdomain',
  },
});
```

### 2. **Error Tracking**

```javascript
// Segment errors by subdomain
Sentry.configureScope(scope => {
  scope.setTag('subdomain', window.location.hostname);
});
```

## Deployment Considerations

### 1. **Vercel Deployment**

```json
{
  "name": "syndik-app",
  "alias": ["app.syndik.ma"],
  "env": {
    "SUBDOMAIN": "app"
  }
}
```

```json
{
  "name": "syndik-admin",
  "alias": ["admin.syndik.ma"],
  "env": {
    "SUBDOMAIN": "admin"
  }
}
```

### 2. **Environment Variables**

```bash
# .env.production
NEXT_PUBLIC_APP_URL=https://app.syndik.ma
NEXT_PUBLIC_ADMIN_URL=https://admin.syndik.ma
NEXT_PUBLIC_API_URL=https://api.syndik.ma
```

## Future Enhancements

### 1. **Additional Subdomains**

- `api.syndik.ma` → Dedicated API endpoint
- `docs.syndik.ma` → Documentation site
- `status.syndik.ma` → Status page

### 2. **Multi-Tenant Support**

- `[organization].app.syndik.ma` → Organization-specific portals
- `[organization].admin.syndik.ma` → Organization admin panels

## Conclusion

This subdomain architecture will provide:

- Better user experience and navigation
- Enhanced security and isolation
- Improved scalability and maintainability
- Professional appearance and branding

The implementation can be done gradually with minimal disruption to existing users.
