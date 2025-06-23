# Resident Portal: Linking Strategy

## Overview

This document outlines the strategy for linking Clerk users to resident records in the Syndik application, enabling seamless access to the resident portal.

## Current Architecture

- **Accounts Table**: Links Clerk users to organizations with roles (manager, admin, member)
- **Users Table**: Has `residentId` field ready for linking
- **Residents Table**: Contains all resident information
- **Webhook System**: Handles Clerk organization events

## Recommended Approach: Enhanced Invitation System

### 1. Admin-Initiated Invitation Flow

**For Property Managers/Admins:**

```typescript
// New procedure in residents router
inviteResident: orgProtectedProcedure
  .input(
    z.object({
      residentId: z.string().uuid(),
      email: z.string().email(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const { db, orgId, userId } = ctx;

    // Verify resident exists and belongs to org
    const resident = await db
      .select()
      .from(residents)
      .where(
        and(eq(residents.id, input.residentId), eq(residents.orgId, orgId))
      )
      .limit(1);

    if (!resident.length) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Resident not found' });
    }

    // Create Clerk organization invitation
    // Store invitation metadata linking residentId
    const invitation = await clerkClient.organizations.createInvitation({
      organizationId: orgId,
      emailAddress: input.email,
      role: 'org:member',
      // Store residentId in public metadata for webhook processing
      publicMetadata: {
        residentId: input.residentId,
        invitationType: 'resident_portal',
      },
    });

    return { invitationId: invitation.id };
  });
```

### 2. Enhanced Webhook Handler

Update the webhook to handle invitation acceptance with resident linking:

```typescript
// Enhanced webhook handler
case 'organizationMembership.created':
  await handleMembershipCreated(evt);
  break;

async function handleMembershipCreated(evt: ClerkWebhookEvent) {
  const { organization, public_user_data, role, invitation } = evt.data;

  // Standard account creation
  const userData = {
    orgId: organization.id,
    userId: public_user_data.user_id,
    name: `${public_user_data.first_name} ${public_user_data.last_name}`,
    email: public_user_data.email_addresses[0].email_address,
    role: role === 'org:admin' ? 'admin' : 'member',
    organizationName: organization.name,
    organizationSlug: organization.slug,
  };

  // Create account
  const [account] = await db.insert(accounts).values(userData).returning();

  // Check if this was a resident invitation
  if (invitation?.publicMetadata?.residentId) {
    const residentId = invitation.publicMetadata.residentId;

    // Create user record with resident link
    await db.insert(users).values({
      userId: public_user_data.user_id,
      orgId: organization.id,
      name: userData.name,
      email: userData.email,
      residentId: residentId,
      isActive: true
    });

    // Optional: Update resident record with user link
    await db.update(residents)
      .set({
        email: userData.email, // Sync email if different
        updatedAt: new Date()
      })
      .where(eq(residents.id, residentId));
  }
}
```

### 3. Portal Access Validation

Add procedures to validate portal access:

```typescript
// New portal procedures
export const portalRouter = createTRPCRouter({
  getResidentProfile: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, userId, orgId } = ctx;

    // Get user with resident link
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
      .limit(1);

    if (!user?.residentId) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Not linked to a resident record',
      });
    }

    // Get full resident profile with unit/building info
    return await db
      .select()
      .from(residents)
      .leftJoin(units, eq(residents.unitId, units.id))
      .leftJoin(buildings, eq(units.buildingId, buildings.id))
      .where(eq(residents.id, user.residentId));
  }),

  updateProfile: orgProtectedProcedure
    .input(
      z.object({
        phone: z.string().optional(),
        emergencyContact: z.string().optional(),
        emergencyPhone: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Update resident record via user link
      // Implementation details...
    }),
});
```

### 4. UI Components for Admin

Create admin interface for sending invitations:

```typescript
// ResidentInviteButton component
export function ResidentInviteButton({ resident }: { resident: Resident }) {
  const inviteMutation = useMutation(
    trpc.residents.inviteResident.mutationOptions({
      onSuccess: () => {
        toast.success('Invitation sent successfully');
      }
    })
  );

  const handleInvite = () => {
    inviteMutation.mutate({
      residentId: resident.id,
      email: resident.email
    });
  };

  return (
    <Button onClick={handleInvite} disabled={inviteMutation.isPending}>
      {inviteMutation.isPending ? 'Sending...' : 'Invite to Portal'}
    </Button>
  );
}
```

## Alternative Approaches

### Option 2: Email-Based Auto-Linking

Automatically link users when they join if their email matches a resident:

```typescript
// In webhook handler
const matchingResident = await db
  .select()
  .from(residents)
  .where(
    and(
      eq(residents.email, userData.email),
      eq(residents.orgId, organization.id)
    )
  )
  .limit(1);

if (matchingResident.length > 0) {
  // Auto-link to resident
  await db.insert(users).values({
    ...userData,
    residentId: matchingResident[0].id,
  });
}
```

### Option 3: Manual Linking Interface

Provide admin interface to manually link existing users to residents:

```typescript
linkUserToResident: orgProtectedProcedure
  .input(
    z.object({
      userId: z.string(),
      residentId: z.string().uuid(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    // Validate and create link
    // Implementation details...
  });
```

## Implementation Steps

1. **Phase 1**: Enhance webhook handler for invitation metadata
2. **Phase 2**: Add invitation procedures to residents router
3. **Phase 3**: Create portal-specific procedures for resident data access
4. **Phase 4**: Build admin UI for sending invitations
5. **Phase 5**: Enhance portal guards to check resident linking
6. **Phase 6**: Add resident profile management in portal

## Benefits of Recommended Approach

- **Secure**: Uses Clerk's invitation system with proper validation
- **Scalable**: Handles bulk invitations and organization management
- **User-Friendly**: Clear invitation flow for residents
- **Flexible**: Supports multiple residents per unit and various scenarios
- **Traceable**: Full audit trail of invitations and linking

## Database Schema Updates

No schema changes needed - the `users.residentId` field is already in place.

## Security Considerations

- Validate invitation metadata to prevent unauthorized linking
- Ensure resident belongs to correct organization before linking
- Implement proper role checks for invitation creation
- Handle edge cases (duplicate emails, moved residents, etc.)
