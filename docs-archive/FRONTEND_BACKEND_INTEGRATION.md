# Frontend-Backend Integration Guide

This guide explains how to connect your landing page features to the backend procedures and database.

## 🏗️ Architecture Overview

Your application follows a modular architecture:

- **Database**: PostgreSQL with Drizzle ORM
- **Backend**: tRPC procedures organized by domain
- **Frontend**: Next.js with React components
- **State Management**: tRPC client with React Query

## 📋 Feature-to-Backend Mapping

### 1. **Building Management Feature**

**Frontend Components** → **Backend Procedures**:

```typescript
// Building List Component
const buildings = api.buildings.getAll.useQuery({
  page: 1,
  pageSize: 10,
  search: 'search term',
  sortBy: 'name',
});

// Building Creation Form
const createBuilding = api.buildings.create.useMutation({
  onSuccess: () => {
    // Refresh buildings list
    utils.buildings.getAll.invalidate();
  },
});

// Building Details
const building = api.buildings.getById.useQuery({ id: buildingId });
```

**Available Procedures**:

- `buildings.getAll` - List buildings with pagination/filtering
- `buildings.create` - Create new building
- `buildings.getById` - Get building details
- `buildings.update` - Update building info
- `buildings.delete` - Delete building

### 2. **Financial Tracking Feature**

**Frontend Components** → **Backend Procedures**:

```typescript
// Financial Dashboard
const financialSummary = api.finances.getFinancialSummary.useQuery({
  buildingId: selectedBuilding,
  startDate: new Date(),
  endDate: new Date(),
});

// Financial Trends Chart
const trends = api.finances.getFinancialTrends.useQuery({
  buildingId: selectedBuilding,
  months: 12,
});

// Health Score Widget
const healthScore = api.finances.getFinancialHealth.useQuery({
  buildingId: selectedBuilding,
});

// Income Management
const incomes = api.incomes.getAll.useQuery();
const createIncome = api.incomes.create.useMutation();

// Expense Management
const expenses = api.expenses.getAll.useQuery();
const createExpense = api.expenses.create.useMutation();
```

**Available Procedures**:

- `finances.getFinancialSummary` - Comprehensive financial overview
- `finances.getFinancialTrends` - Monthly/yearly trends
- `finances.getFinancialHealth` - Financial health scoring
- `incomes.getAll/create/update/delete` - Income management
- `expenses.getAll/create/update/delete` - Expense management

### 3. **Resident Portal Feature**

**Frontend Components** → **Backend Procedures**:

```typescript
// Resident Dashboard
const dashboard = api.portal.getResidentDashboard.useQuery();

// Maintenance Requests
const submitRequest = api.portal.submitMaintenanceRequest.useMutation({
  onSuccess: () => {
    toast.success('Maintenance request submitted');
  },
});

// Notifications
const notifications = api.portal.getResidentNotifications.useQuery({
  page: 1,
  isRead: false,
});

// Profile Management
const updateProfile = api.portal.updateResidentProfile.useMutation();
```

**Available Procedures**:

- `portal.getResidentDashboard` - Dashboard data for residents
- `portal.submitMaintenanceRequest` - Submit maintenance requests
- `portal.getResidentNotifications` - Get resident notifications
- `portal.updateResidentProfile` - Update resident profile
- `portal.setupResidentAccount` - Setup new resident account

### 4. **Meeting Management Feature**

**Frontend Components** → **Backend Procedures**:

```typescript
// Meeting List
const meetings = api.meetings.getAll.useQuery({
  page: 1,
  isCompleted: false,
});

// Meeting Creation
const createMeeting = api.meetings.create.useMutation();

// Attendance Tracking
const markAttendance = api.meetings.markAttendance.useMutation();

// Meeting Details
const meeting = api.meetings.getById.useQuery({ id: meetingId });
```

**Available Procedures**:

- `meetings.getAll` - List meetings with filters
- `meetings.create` - Create new meeting
- `meetings.getById` - Get meeting details
- `meetings.update` - Update meeting info
- `meetings.markAttendance` - Track attendance

### 5. **Dashboard & Analytics Feature**

**Frontend Components** → **Backend Procedures**:

```typescript
// Overview Dashboard
const overview = api.dashboard.getOverview.useQuery();

// Recent Activity
const recentActivity = api.dashboard.getRecentActivity.useQuery({
  limit: 10,
});

// Key Metrics
const metrics = api.dashboard.getMetrics.useQuery();
```

**Available Procedures**:

- `dashboard.getOverview` - Key statistics and counts
- `dashboard.getRecentActivity` - Recent system activity
- `dashboard.getMetrics` - Performance metrics

## 🔧 Implementation Steps

### Step 1: Create React Components

```typescript
// Example: Financial Dashboard Component
import { api } from '@/lib/api';

export function FinancialDashboard() {
  const { data: summary, isLoading } = api.finances.getFinancialSummary.useQuery({
    buildingId: selectedBuilding,
  });

  const { data: trends } = api.finances.getFinancialTrends.useQuery({
    months: 12,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Financial Summary Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            ${summary?.summary.totalIncome.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      {/* Charts and other components */}
    </div>
  );
}
```

### Step 2: Add Error Handling

```typescript
export function BuildingList() {
  const {
    data: buildings,
    isLoading,
    error
  } = api.buildings.getAll.useQuery({
    page: 1,
    pageSize: 10
  });

  const createBuilding = api.buildings.create.useMutation({
    onSuccess: () => {
      utils.buildings.getAll.invalidate();
      toast.success("Building created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <LoadingSkeleton />;

  return (
    <div>
      {/* Building list content */}
    </div>
  );
}
```

### Step 3: Implement Forms with Validation

```typescript
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const buildingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  totalUnits: z.number().min(1, "Must have at least 1 unit"),
});

export function CreateBuildingForm() {
  const form = useForm({
    resolver: zodResolver(buildingSchema),
  });

  const createBuilding = api.buildings.create.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Building created");
    },
  });

  const onSubmit = (data: z.infer<typeof buildingSchema>) => {
    createBuilding.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
        <Button type="submit" disabled={createBuilding.isLoading}>
          {createBuilding.isLoading ? "Creating..." : "Create Building"}
        </Button>
      </form>
    </Form>
  );
}
```

### Step 4: Add Real-time Updates

```typescript
// For real-time notifications
export function NotificationCenter() {
  const { data: notifications } = api.notifications.getMyNotifications.useQuery({
    isRead: false
  });

  const markAsRead = api.notifications.markAsRead.useMutation({
    onSuccess: () => {
      utils.notifications.getMyNotifications.invalidate();
    }
  });

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      utils.notifications.getMyNotifications.invalidate();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {notifications?.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkRead={() => markAsRead.mutate({ id: notification.id })}
        />
      ))}
    </div>
  );
}
```

## 🚀 Advanced Features

### 1. **Optimistic Updates**

```typescript
const updateBuilding = api.buildings.update.useMutation({
  onMutate: async newData => {
    // Cancel outgoing refetches
    await utils.buildings.getById.cancel({ id: newData.id });

    // Snapshot previous value
    const previousBuilding = utils.buildings.getById.getData({
      id: newData.id,
    });

    // Optimistically update
    utils.buildings.getById.setData(
      { id: newData.id },
      {
        ...previousBuilding,
        ...newData,
      }
    );

    return { previousBuilding };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    utils.buildings.getById.setData(
      { id: newData.id },
      context?.previousBuilding
    );
  },
  onSettled: () => {
    // Refetch after mutation
    utils.buildings.getById.invalidate();
  },
});
```

### 2. **Infinite Queries for Large Lists**

```typescript
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  api.buildings.getAll.useInfiniteQuery(
    { pageSize: 20 },
    {
      getNextPageParam: lastPage => lastPage.nextCursor,
    }
  );
```

### 3. **Background Sync**

```typescript
// Keep data fresh in the background
useEffect(() => {
  const interval = setInterval(() => {
    utils.dashboard.getOverview.invalidate();
    utils.finances.getFinancialSummary.invalidate();
  }, 60000); // Every minute

  return () => clearInterval(interval);
}, []);
```

## 📝 Best Practices

1. **Use Loading States**: Always show loading indicators
2. **Handle Errors Gracefully**: Provide meaningful error messages
3. **Optimistic Updates**: For better UX on mutations
4. **Cache Management**: Invalidate related queries after mutations
5. **Type Safety**: Leverage TypeScript for better DX
6. **Pagination**: Implement for large data sets
7. **Real-time Updates**: Consider WebSockets for live data

## 🔍 Debugging Tips

1. **Enable tRPC DevTools**: Add to your development setup
2. **Check Network Tab**: Monitor API calls in browser
3. **Use React Query DevTools**: Debug cache and queries
4. **Console Logging**: Add strategic console.logs
5. **Error Boundaries**: Catch and handle React errors

## 📚 Additional Resources

- [tRPC Documentation](https://trpc.io/)
- [React Query Guide](https://tanstack.com/query/latest)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Next.js App Router](https://nextjs.org/docs/app)

This integration guide provides a complete roadmap for connecting your frontend features to the backend procedures. Each feature has been mapped to specific procedures with example implementations.
