# Organization Quota Progress Bar Implementation

## Overview

Successfully implemented a progress bar in the dashboard sidebar that shows users how many organizations/residences they can still create based on their current plan.

## Implementation Details

### Backend Changes

#### 1. Added Organization Usage Procedures (`src/modules/accounts/server/procedures.ts`)

- **`getOrganizationUsage`**: Returns comprehensive organization usage data including:

  - Current organization count
  - Plan limits (Free: 1, Basic: 3, Pro: 10, Enterprise: 50)
  - Usage percentage
  - Remaining quota
  - Plan name
  - List of user organizations

- **`canCreateOrganization`**: Checks if user can create new organizations
  - Returns boolean flag
  - Provides reason if creation is blocked
  - Includes current usage stats

#### 2. Plan Logic

- Plans are dynamically determined based on current organization count
- In production, this would integrate with a subscription/billing service
- Current logic:
  - Free: 0-1 organizations
  - Basic: 2-4 organizations
  - Pro: 5-9 organizations
  - Enterprise: 10+ organizations

### Frontend Changes

#### 1. Organization Quota Component (`src/components/organization-quota.tsx`)

- **Features:**

  - Visual progress bar using shadcn/ui Progress component
  - Color-coded based on usage (blue: normal, yellow: near limit, red: at limit)
  - Real-time usage display (X / Y format)
  - Plan name display
  - "Add" button when quota available
  - Responsive loading states with skeletons
  - Error handling

- **Visual Elements:**
  - Building icon for context
  - Progress bar with dynamic colors
  - Usage statistics
  - Call-to-action button for creating new organizations

#### 2. Dashboard Sidebar Integration (`src/modules/dashboard/ui/components/dashboard-sidebar.tsx`)

- Added OrganizationQuota component to sidebar footer
- Positioned above the "Resident Portal" button
- Styled with appropriate spacing and borders

### Technical Implementation

#### TRPC Integration

- Uses `useQuery` with `trpc.accounts.getOrganizationUsage.queryOptions()`
- Proper error handling and loading states
- Real-time data fetching when sidebar loads

#### UI/UX Features

- **Progress Bar Colors:**

  - Blue: Normal usage (< 80%)
  - Yellow: Near limit (≥ 80%)
  - Red: At limit (100%)

- **Interactive Elements:**
  - "Add" button navigates to organization creation
  - Disabled state when at quota limit
  - Clear messaging about upgrade requirements

#### Responsive Design

- Works across desktop and mobile
- Skeleton loading states prevent layout shift
- Appropriate text sizing and spacing

## Usage

The progress bar automatically appears in the dashboard sidebar for all authenticated users. It shows:

1. **Current Usage**: "X / Y organizations"
2. **Visual Progress**: Color-coded progress bar
3. **Plan Information**: Current plan name
4. **Remaining Quota**: "X more available" or upgrade message
5. **Action Button**: "Add" button when quota available

## Future Enhancements

1. **Subscription Integration**: Connect to real billing/subscription service
2. **Plan Upgrade Flow**: Direct integration with pricing/upgrade pages
3. **Usage Analytics**: Track organization creation patterns
4. **Quota Warnings**: Proactive notifications when approaching limits
5. **Team Management**: Role-based organization creation permissions

## Benefits

- **Clear Visibility**: Users understand their current usage and limits
- **Proactive Guidance**: Prevents failed organization creation attempts
- **Upgrade Motivation**: Clear path to plan upgrades when needed
- **Professional UX**: Clean, informative progress visualization
- **Real-time Updates**: Always current usage information

The implementation successfully provides users with clear visibility into their organization quota while maintaining a clean, professional interface that encourages appropriate plan upgrades when needed.

#### 2. Upgrade Integration

- **Upgrade Button**: Appears when users are at 80% or higher usage
- **Color-coded**: Yellow for near limit (≥80%), red for at limit (100%)
- **Multiple Locations**:
  - In the action bar next to plan name
  - As a link in the bottom message when at limit
- **Navigation**: Directs users to `/settings?tab=billing`
- **Visual Enhancement**: ArrowUp icon for clear upgrade intention
