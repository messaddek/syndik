# Clerk Webhook Setup Guide

This guide will help you set up Clerk webhooks to enable real-time synchronization between Clerk organizations and your database.

## Environment Variables

Add this environment variable to your `.env.local` file:

```env
CLERK_WEBHOOK_SECRET=your_webhook_secret_here
```

## Clerk Dashboard Configuration

1. **Access Clerk Dashboard**

   - Go to https://dashboard.clerk.com
   - Select your application

2. **Navigate to Webhooks**

   - In the left sidebar, click on "Webhooks"
   - Click "Add Endpoint"

3. **Configure Webhook Endpoint**

   - **Endpoint URL**: `https://terminally-tidy-loon.ngrok-free.app/api/webhooks/clerk`
   - **Events to Listen For**:
     - `organization.created`
     - `organization.updated`
     - `organization.deleted`
     - `organizationMembership.created`
     - `organizationMembership.updated`
     - `organizationMembership.deleted`

4. **Get Your Webhook Secret**
   - After creating the webhook, copy the signing secret
   - Add it to your `.env.local` as `CLERK_WEBHOOK_SECRET`

## Development Setup

To test webhooks during development, use the provided ngrok tunnel:

```bash
# Run both the app and ngrok tunnel simultaneously
npm run dev:all
```

This will start:

- Next.js development server on `http://localhost:3000`
- ngrok tunnel exposing `https://terminally-tidy-loon.ngrok-free.app`

Your webhook endpoint will be available at:
`https://terminally-tidy-loon.ngrok-free.app/api/webhooks/clerk`

## How It Works

### Account Synchronization

The webhook system uses your existing `accounts` table to track organization memberships:

- **Organization Creation**: No database action needed (tracked via accounts)
- **Organization Updates**: No database action needed (tracked via accounts)
- **Organization Deletion**: Removes all accounts for that organization
- **Membership Created**: Creates/updates account for user in organization
- **Membership Updated**: Updates user's role in the account
- **Membership Deleted**: Removes user's account from organization

### Benefits

- ✅ **Real-time Sync**: Organization changes are immediately reflected in your database
- ✅ **Simplified Schema**: Uses existing accounts table instead of separate organization tables
- ✅ **Automatic Cleanup**: Handles organization deletion and membership changes
- ✅ **Role Mapping**: Maps Clerk roles (`org:admin`, `org:member`) to your app roles (`admin`, `manager`)

## Testing the Setup

1. **Create a new organization** in your app
2. **Check your database** - a new account should be created
3. **Invite a user** to the organization
4. **Check your database** - another account should be created
5. **Change user role** in Clerk dashboard
6. **Check your database** - the account role should be updated

## Troubleshooting

- **Webhook not triggering**: Check the endpoint URL and ensure it's publicly accessible
- **Authentication errors**: Verify the `CLERK_WEBHOOK_SECRET` matches what's in Clerk dashboard
- **Database errors**: Check your database connection and schema

## Database Schema

The webhook system works with your existing `accounts` table:

```sql
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,      -- Clerk user ID
  org_id TEXT NOT NULL,       -- Clerk organization ID
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'manager', -- 'manager' or 'admin'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

This approach eliminates the need for separate `organizations` and `organization_memberships` tables while providing the same functionality.
