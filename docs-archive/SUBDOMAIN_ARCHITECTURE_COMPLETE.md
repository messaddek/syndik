# Updated Subdomain Architecture

## 🏗️ **Architecture Overview**

The Syndik application now uses a clean subdomain-based architecture:

### **Domain Structure**

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

## 🚀 **Development Setup**

### **1. Setup Local Subdomains**

For Windows:

```bash
npm run setup:subdomains:win
```

For macOS/Linux:

```bash
npm run setup:subdomains
```

This will add the following entries to your hosts file:

```
127.0.0.1 app.localhost
127.0.0.1 admin.localhost
```

### **2. Start Development Server**

```bash
npm run dev
```

### **3. Access Different Portals**

- **Main Landing**: http://localhost:3000
- **App Portal**: http://app.localhost:3000
- **Admin Portal**: http://admin.localhost:3000

## 🔄 **How It Works**

### **Middleware Logic**

The middleware (`src/middleware.ts`) handles:

1. **Subdomain Detection**: Identifies which subdomain the request is coming from
2. **Route Rewrites**: Rewrites admin subdomain routes to `/admin/*` paths
3. **Redirect Logic**: Redirects app routes accessed from main domain to app subdomain
4. **Backward Compatibility**: Maintains compatibility with existing `/admin/*` URLs

### **Navigation Between Subdomains**

The application uses utility functions in `src/lib/subdomain-utils.ts` for cross-subdomain navigation:

```typescript
// Navigate to different subdomains
navigateToMain('/contact'); // → syndik.ma/contact
navigateToApp('/dashboard'); // → app.syndik.ma/dashboard
navigateToAdmin(); // → admin.syndik.ma
```

### **Environment-Aware URLs**

The system automatically detects development vs production:

- **Development**: Uses `localhost` subdomains
- **Production**: Uses actual subdomains

## 🎯 **Benefits**

### **1. Clear User Experience**

- Users immediately know which portal they're accessing
- Better navigation and bookmarking
- Reduced confusion between interfaces

### **2. Enhanced Security**

- Admin functions isolated on separate subdomain
- Different security policies possible per subdomain
- Better audit trails

### **3. Professional Appearance**

- Modern SaaS architecture
- Clean, memorable URLs
- Better SEO potential

### **4. Scalability**

- Independent deployment strategies
- Different scaling policies
- Easier load balancing

## 🔧 **Configuration**

### **Environment Variables**

```bash
# Main landing page (no subdomain)
NEXT_PUBLIC_MAIN_URL=https://syndik.ma

# App subdomain (dashboard/portal)
NEXT_PUBLIC_APP_URL=https://app.syndik.ma

# Admin subdomain
NEXT_PUBLIC_ADMIN_URL=https://admin.syndik.ma

# Development URLs
NEXT_PUBLIC_DEV_MAIN_URL=http://localhost:3000
NEXT_PUBLIC_DEV_APP_URL=http://app.localhost:3000
NEXT_PUBLIC_DEV_ADMIN_URL=http://admin.localhost:3000
```

### **Next.js Configuration**

The `next.config.ts` includes rewrites for admin subdomain handling:

```typescript
async rewrites() {
  return {
    beforeFiles: [
      // Admin subdomain routing
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'admin.syndik.ma' }],
        destination: '/admin/:path*',
      },
      // Development admin subdomain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'admin.localhost:3000' }],
        destination: '/admin/:path*',
      },
    ],
  };
}
```

## 🧭 **Navigation Updates**

### **Updated Components**

1. **Dashboard Sidebar** - Admin portal button now uses subdomain navigation
2. **Portal Sidebar** - Admin portal button uses subdomain navigation
3. **Admin Sidebar** - Back to dashboard button navigates to app subdomain

### **Cross-Subdomain Links**

All navigation between different portals now uses full URLs:

```typescript
// Old way (path-based)
router.push('/admin');

// New way (subdomain-based)
window.location.href = 'https://admin.syndik.ma';
```

## 🐛 **Development Tools**

### **Subdomain Indicator**

In development mode, a badge appears in the bottom-right corner showing:

- Current subdomain type (Main/App/Admin)
- Current hostname

This helps developers understand which environment they're in.

### **Browser Console Logs**

The middleware and navigation components include console logs to help debug routing issues during development.

## 🚀 **Deployment Considerations**

### **DNS Setup**

You'll need to configure your DNS provider:

```
syndik.ma        A/CNAME → Your main server
app.syndik.ma    A/CNAME → Your app server
admin.syndik.ma  A/CNAME → Your admin server
```

### **SSL Certificates**

Ensure SSL certificates cover all subdomains:

- `syndik.ma`
- `*.syndik.ma` (wildcard certificate recommended)

### **Vercel Deployment**

If using Vercel, configure custom domains:

1. Add `syndik.ma` as custom domain
2. Add `app.syndik.ma` as custom domain
3. Add `admin.syndik.ma` as custom domain

## 🔄 **Migration Path**

### **Backward Compatibility**

The system maintains backward compatibility:

- Old `/admin/*` URLs automatically redirect to `admin.syndik.ma`
- Existing bookmarks continue to work
- Gradual migration of internal links

### **Phased Rollout**

1. **Phase 1**: Set up subdomains pointing to existing routes
2. **Phase 2**: Update internal navigation to use subdomains
3. **Phase 3**: Implement subdomain-specific features
4. **Phase 4**: Full migration complete

## 🎉 **Benefits Achieved**

✅ **Clean URL Structure**: `app.syndik.ma` vs `admin.syndik.ma`  
✅ **Better User Experience**: Clear separation of concerns  
✅ **Enhanced Security**: Isolated admin functions  
✅ **Professional Appearance**: Modern SaaS architecture  
✅ **Improved Navigation**: Intuitive subdomain-based routing  
✅ **Scalability**: Foundation for independent scaling

This subdomain architecture provides a solid foundation for growth and makes the application much more professional and user-friendly!
