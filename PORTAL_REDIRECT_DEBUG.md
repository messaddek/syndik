# Portal Redirect Debugging Guide

## Overview

We've added comprehensive logging to debug why users are being redirected to `/portal`. The logs use emojis to make them easily identifiable in the browser console.

## Logging Components

### 1. Dashboard Navbar (`dashboard-navbar.tsx`)

- **Log**: `🏠 Dashboard Navbar - Resident Portal clicked, navigating to /portal`
- **When**: User clicks the "Resident Portal" button in the UserButton menu
- **Purpose**: Confirms when the manual redirect is triggered

### 2. Portal Layout (`(portal)/layout.tsx`)

- **Log**: `🏠 Portal Layout - UserId:` and `🏠 Portal Layout - OrgId:`
- **When**: Portal layout renders (server-side)
- **Purpose**: Confirms authentication state when accessing portal routes

### 3. Portal Page (`(portal)/portal/page.tsx`)

- **Log**: `🏠 Portal Page - Rendering portal page`
- **When**: Portal page component renders
- **Purpose**: Confirms the portal page is being accessed

### 4. RoleGuard (`role-guard.tsx`)

- **Logs**:
  - `🔒 RoleGuard - Account data:` - Shows the user's account information
  - `🔒 RoleGuard - Allowed roles:` - Shows which roles are permitted
  - `🔒 RoleGuard - Account role:` - Shows the user's actual role
  - `🔒 RoleGuard - Role check result:` - Shows if role is allowed
  - `🚫 RoleGuard - Role not allowed, redirecting...` - When redirect happens
  - `🚫 RoleGuard - Member role detected, redirecting to /portal` - Member auto-redirect
  - `✅ RoleGuard - Role allowed, continuing...` - When access is granted
- **When**: Every time RoleGuard component evaluates user access
- **Purpose**: **This is likely the source of unexpected redirects**

### 5. OrganizationGuard (`organization-guard.tsx`)

- **Logs**:
  - `🛡️ OrganizationGuard - Pathname:` - Current route path
  - `🛡️ OrganizationGuard - Is portal route:` - Whether it's a portal route
  - `🛡️ OrganizationGuard - Default role:` - Default role assignment based on route
- **When**: OrganizationGuard component evaluates access
- **Purpose**: Shows route-based role determination

### 6. ResidentAccessGuard (`resident-access-guard.tsx`)

- **Logs**:
  - `🏠 ResidentAccessGuard - Loading:` - Loading state
  - `🏠 ResidentAccessGuard - Error:` - Any errors
  - `🏠 ResidentAccessGuard - Access Info:` - Access check results
  - `🚫 ResidentAccessGuard - Access denied` - When resident access is denied
- **When**: Checking if user has resident access to the portal
- **Purpose**: Shows resident linking status

## How to Debug

1. **Open Browser Console** - Open Developer Tools and go to Console tab
2. **Filter by Emojis** - Search for specific emojis to filter logs:
   - `🏠` - Portal-related logs
   - `🔒` - Role guard logs
   - `🛡️` - Organization guard logs
   - `🚫` - Access denied/redirect logs
   - `✅` - Success logs

## Common Scenarios

### Scenario 1: User with Admin/Manager Role Accessing Portal

**Expected Flow**:

1. `🏠 Dashboard Navbar - Resident Portal clicked` (if manual click)
2. `🏠 Portal Layout - UserId: [id]`
3. `🛡️ OrganizationGuard - Is portal route: true`
4. `🔒 RoleGuard - Account role: admin/manager`
5. `🚫 RoleGuard - Role not allowed, redirecting...`
6. `🚫 RoleGuard - Manager/Admin role detected, redirecting to /dashboard`

### Scenario 2: User with Member Role Accessing Dashboard

**Expected Flow**:

1. User navigates to `/dashboard`
2. `🛡️ OrganizationGuard - Is portal route: false`
3. `🔒 RoleGuard - Account role: member`
4. `🚫 RoleGuard - Role not allowed, redirecting...`
5. `🚫 RoleGuard - Member role detected, redirecting to /portal`

### Scenario 3: Valid Member Accessing Portal

**Expected Flow**:

1. `🏠 Portal Layout - UserId: [id]`
2. `🔒 RoleGuard - Account role: member`
3. `✅ RoleGuard - Role allowed, continuing...`
4. `🏠 ResidentAccessGuard - Access Info: [resident data]`
5. `🏠 Portal Page - Rendering portal page`

## Key Configuration

The portal layout has this role configuration:

```tsx
<RoleGuard allowedRoles={['member']} redirectTo='/dashboard'>
```

This means:

- Only users with `member` role can access portal
- Users with `admin` or `manager` roles are redirected to `/dashboard`

## Next Steps

1. **Check the Console** - Look for the specific log patterns above
2. **Identify the Redirect Source** - Look for `🚫` logs to see what's causing redirects
3. **Verify User Role** - Check what role the user actually has in the `🔒 RoleGuard` logs
4. **Check Resident Linking** - If role is correct, check `🏠 ResidentAccessGuard` logs

## Removing Debug Logs

Once debugging is complete, search for `console.log` in these files and remove the debug statements or comment them out.
