// filepath: c:\Users\MohammedESSADDEK\source\repos\syndik\src\app\api\webhooks\clerk\route.ts
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { db } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import { accounts, users, residents } from '@/lib/schema';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

if (!webhookSecret) {
  throw new Error('Please add CLERK_WEBHOOK_SECRET to your .env.local file');
}

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    name?: string;
    slug?: string;
    created_by?: string;
    members_count?: number;
    organization?: {
      id: string;
      name: string;
      slug?: string;
    };
    public_user_data?: {
      user_id: string;
      first_name?: string;
      last_name?: string;
      identifier?: string; // This is the email address
      image_url?: string;
      profile_image_url?: string;
    };
    role?: string;
    invitation?: {
      id: string;
      public_metadata?: {
        residentId?: string;
        invitationType?: string;
      };
    };
  };
}

export async function POST(request: NextRequest) {
  console.log('🪝 [WEBHOOK] Received webhook request');

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  console.log('🪝 [WEBHOOK] Headers:', {
    svix_id: svix_id ? 'present' : 'missing',
    svix_timestamp: svix_timestamp ? 'present' : 'missing',
    svix_signature: svix_signature ? 'present' : 'missing',
  });

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('🪝 [WEBHOOK] Missing svix headers');
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await request.text();
  console.log('🪝 [WEBHOOK] Payload length:', payload.length);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(webhookSecret!);

  let evt: ClerkWebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkWebhookEvent;
    console.log('🪝 [WEBHOOK] Verification successful, event type:', evt.type);
    console.log('🪝 [WEBHOOK] Event data:', JSON.stringify(evt.data, null, 2));
  } catch (err) {
    console.error('🪝 [WEBHOOK] Verification failed:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  } // Handle the webhook
  console.log('🪝 [WEBHOOK] Processing event type:', evt.type);
  try {
    switch (evt.type) {
      case 'organization.created':
        console.log('🪝 [WEBHOOK] Handling organization.created');
        await handleOrganizationCreated(evt);
        break;
      case 'organization.updated':
        console.log('🪝 [WEBHOOK] Handling organization.updated');
        await handleOrganizationUpdated(evt);
        break;
      case 'organization.deleted':
        console.log('🪝 [WEBHOOK] Handling organization.deleted');
        await handleOrganizationDeleted(evt);
        break;
      case 'organizationMembership.created':
        console.log('🪝 [WEBHOOK] Handling organizationMembership.created');
        await handleMembershipCreated(evt);
        break;
      case 'organizationMembership.updated':
        console.log('🪝 [WEBHOOK] Handling organizationMembership.updated');
        await handleMembershipUpdated(evt);
        break;
      case 'organizationMembership.deleted':
        console.log('🪝 [WEBHOOK] Handling organizationMembership.deleted');
        await handleMembershipDeleted(evt);
        break;
      default:
        console.log('🪝 [WEBHOOK] Unhandled event type:', evt.type);
        break;
    }

    console.log('🪝 [WEBHOOK] Successfully processed event:', evt.type);
    return NextResponse.json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('🪝 [WEBHOOK] Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}

async function handleOrganizationCreated(evt: ClerkWebhookEvent) {
  const { id, name, slug } = evt.data;

  console.log('🏢 [ORG_CREATED] Processing organization creation:', {
    id,
    name,
    slug,
  });

  if (!id || !name) {
    console.error('🏢 [ORG_CREATED] Missing required data:', { id, name });
    return;
  }

  try {
    // Update all accounts for this organization with the organization info
    await db
      .update(accounts)
      .set({
        organizationName: name,
        organizationSlug: slug || null,
        updatedAt: new Date(),
      })
      .where(eq(accounts.orgId, id));

    console.log(
      '🏢 [ORG_CREATED] Successfully updated accounts for organization:',
      id
    );
  } catch (error) {
    console.error('🏢 [ORG_CREATED] Error updating accounts:', error);
    throw error;
  }
}

async function handleOrganizationUpdated(evt: ClerkWebhookEvent) {
  const { id, name, slug } = evt.data;

  if (!id) {
    return;
  }

  try {
    // Update all accounts for this organization with the updated organization info
    await db
      .update(accounts)
      .set({
        organizationName: name || undefined,
        organizationSlug: slug || undefined,
        updatedAt: new Date(),
      })
      .where(eq(accounts.orgId, id));
  } catch (error) {
    throw error;
  }
}

async function handleOrganizationDeleted(evt: ClerkWebhookEvent) {
  const { id } = evt.data;

  try {
    // Delete all accounts for this organization
    await db.delete(accounts).where(eq(accounts.orgId, id));
  } catch (error) {
    throw error;
  }
}

async function handleMembershipCreated(evt: ClerkWebhookEvent) {
  const { organization, public_user_data, role, invitation } = evt.data;

  console.log('👥 [MEMBERSHIP_CREATED] Processing membership creation:', {
    organizationId: organization?.id,
    userId: public_user_data?.user_id,
    role,
    hasInvitation: !!invitation,
    invitationId: invitation?.id,
    invitationMetadata: invitation?.public_metadata,
  });

  if (!organization?.id || !public_user_data?.user_id || !role) {
    console.error('👥 [MEMBERSHIP_CREATED] Missing required data:', {
      organizationId: organization?.id,
      userId: public_user_data?.user_id,
      role,
    });
    return;
  }

  try {
    // Log the full public_user_data to debug email issue
    console.log(
      '👥 [MEMBERSHIP_CREATED] Full public_user_data:',
      JSON.stringify(public_user_data, null, 2)
    );
    console.log(
      '👥 [MEMBERSHIP_CREATED] User identifier (email):',
      public_user_data.identifier
    );
    console.log(
      '👥 [MEMBERSHIP_CREATED] User name:',
      `${public_user_data.first_name} ${public_user_data.last_name}`
    );

    // Initialize user data variables
    let userEmail = 'unknown@example.com';
    let userName = 'Unknown User';
    let residentId: string | null = null;

    // STEP 1: Check if this is a resident invitation first to get resident data
    if (
      invitation?.public_metadata?.residentId &&
      invitation.public_metadata.invitationType === 'resident_portal'
    ) {
      console.log('👥 [MEMBERSHIP_CREATED] Processing resident invitation:', {
        residentId: invitation.public_metadata.residentId,
        invitationType: invitation.public_metadata.invitationType,
      });

      residentId = invitation.public_metadata.residentId;

      // Verify resident exists and belongs to this organization
      const [resident] = await db
        .select()
        .from(residents)
        .where(
          and(
            eq(residents.id, residentId),
            eq(residents.orgId, organization.id)
          )
        )
        .limit(1);

      console.log('👥 [MEMBERSHIP_CREATED] Resident lookup result:', {
        found: !!resident,
        residentId,
        residentName: resident
          ? `${resident.firstName} ${resident.lastName}`
          : 'Not found',
        residentEmail: resident?.email || 'No email',
      });

      if (resident) {
        // PRIORITY 1: Use resident data as primary source
        userEmail = resident.email || userEmail;
        userName = `${resident.firstName} ${resident.lastName}`;
        console.log('👥 [MEMBERSHIP_CREATED] Using resident data:', {
          email: userEmail,
          name: userName,
        });
      } else {
        console.error(
          '👥 [MEMBERSHIP_CREATED] Resident not found or does not belong to organization'
        );
        residentId = null; // Don't link to non-existent resident
      }
    } // STEP 2: Try to get email and name from Clerk data (fallback if resident doesn't have email)
    const clerkEmail = public_user_data.identifier; // Email is in identifier field
    const clerkName =
      public_user_data.first_name && public_user_data.last_name
        ? `${public_user_data.first_name} ${public_user_data.last_name}`
        : null;

    // Use Clerk data as fallback if resident data is missing
    if (userEmail === 'unknown@example.com' && clerkEmail) {
      console.log(
        '👥 [MEMBERSHIP_CREATED] Using Clerk email as fallback:',
        clerkEmail
      );
      userEmail = clerkEmail;
    }

    if (userName === 'Unknown User' && clerkName) {
      console.log(
        '👥 [MEMBERSHIP_CREATED] Using Clerk name as fallback:',
        clerkName
      );
      userName = clerkName;
    }

    // STEP 3: Final validation - ensure we have valid email
    if (userEmail === 'unknown@example.com') {
      console.error(
        '👥 [MEMBERSHIP_CREATED] ⚠️ WARNING: No valid email found in Clerk or resident data'
      );
      if (residentId) {
        console.error(
          '👥 [MEMBERSHIP_CREATED] ❌ CRITICAL: Resident invitation without valid email - this will cause portal access issues'
        );
      }
    }

    console.log('👥 [MEMBERSHIP_CREATED] Final user data:', {
      email: userEmail,
      name: userName,
      hasResidentLink: !!residentId,
    }); // STEP 4: UPSERT Account Record with robust error handling
    const accountData = {
      orgId: organization.id,
      userId: public_user_data.user_id,
      name: userName,
      email: userEmail,
      role: role === 'org:admin' ? ('admin' as const) : ('member' as const),
      organizationName: organization.name || null,
      organizationSlug: organization.slug || null,
      isActive: true,
    };

    console.log('👥 [MEMBERSHIP_CREATED] Account data prepared:', accountData);

    // Validate critical account data
    if (!accountData.email || accountData.email === 'unknown@example.com') {
      console.error(
        '👥 [MEMBERSHIP_CREATED] ⚠️ WARNING: Account will be created with invalid email'
      );
    }

    try {
      const existingAccount = await db
        .select()
        .from(accounts)
        .where(
          and(
            eq(accounts.orgId, organization.id),
            eq(accounts.userId, public_user_data.user_id)
          )
        )
        .limit(1);

      let accountResult;
      if (existingAccount.length === 0) {
        console.log('👥 [MEMBERSHIP_CREATED] Creating new account');
        [accountResult] = await db
          .insert(accounts)
          .values(accountData)
          .returning();
        console.log(
          '👥 [MEMBERSHIP_CREATED] ✅ Account created successfully:',
          {
            id: accountResult.id,
            email: accountResult.email,
            role: accountResult.role,
          }
        );
      } else {
        console.log('👥 [MEMBERSHIP_CREATED] Updating existing account');
        [accountResult] = await db
          .update(accounts)
          .set({
            ...accountData,
            updatedAt: new Date(),
          })
          .where(eq(accounts.id, existingAccount[0].id))
          .returning();
        console.log(
          '👥 [MEMBERSHIP_CREATED] ✅ Account updated successfully:',
          {
            id: accountResult.id,
            email: accountResult.email,
            role: accountResult.role,
          }
        );
      }
    } catch (accountError) {
      console.error(
        '👥 [MEMBERSHIP_CREATED] ❌ CRITICAL ERROR: Account creation/update failed:',
        accountError
      );
      throw new Error(
        `Account operation failed: ${accountError instanceof Error ? accountError.message : 'Unknown error'}`
      );
    } // STEP 5: UPSERT User Record (CRITICAL for portal access)
    if (residentId) {
      console.log(
        '👥 [MEMBERSHIP_CREATED] 🏠 RESIDENT INVITATION: Creating user record for portal access'
      );

      // Validate that we have proper data for resident linking
      if (userEmail === 'unknown@example.com') {
        console.error(
          '👥 [MEMBERSHIP_CREATED] ❌ CRITICAL ERROR: Attempting to create user record with invalid email for resident portal access'
        );
        console.error(
          '👥 [MEMBERSHIP_CREATED] This will cause portal access issues! ResidentId:',
          residentId
        );
      }

      const userData = {
        userId: public_user_data.user_id,
        orgId: organization.id,
        name: userName,
        email: userEmail,
        residentId: residentId,
        isActive: true,
      };

      console.log(
        '👥 [MEMBERSHIP_CREATED] User data prepared for resident linking:',
        userData
      );

      try {
        const existingUser = await db
          .select()
          .from(users)
          .where(
            and(
              eq(users.userId, public_user_data.user_id),
              eq(users.orgId, organization.id)
            )
          )
          .limit(1);

        let userResult;
        if (existingUser.length === 0) {
          console.log(
            '👥 [MEMBERSHIP_CREATED] Creating new user record with resident link'
          );
          [userResult] = await db.insert(users).values(userData).returning();
          console.log(
            '👥 [MEMBERSHIP_CREATED] ✅ User record created successfully:',
            {
              id: userResult.id,
              userId: userResult.userId,
              residentId: userResult.residentId,
              email: userResult.email,
            }
          );
        } else {
          console.log(
            '👥 [MEMBERSHIP_CREATED] Updating existing user record with resident link'
          );
          [userResult] = await db
            .update(users)
            .set({
              ...userData,
              updatedAt: new Date(),
            })
            .where(eq(users.id, existingUser[0].id))
            .returning();
          console.log(
            '👥 [MEMBERSHIP_CREATED] ✅ User record updated successfully:',
            {
              id: userResult.id,
              userId: userResult.userId,
              residentId: userResult.residentId,
              email: userResult.email,
            }
          );
        }

        // Verify the user record was created/updated properly
        if (!userResult.residentId) {
          console.error(
            '👥 [MEMBERSHIP_CREATED] ❌ CRITICAL ERROR: User record created but residentId is missing!'
          );
          throw new Error(
            'User record missing residentId after creation/update'
          );
        }

        console.log(
          '👥 [MEMBERSHIP_CREATED] 🎉 Successfully linked user to resident - portal access enabled'
        );
      } catch (userError) {
        console.error(
          '👥 [MEMBERSHIP_CREATED] ❌ CRITICAL ERROR: User record creation/update failed:',
          userError
        );
        console.error(
          '👥 [MEMBERSHIP_CREATED] This will prevent portal access for resident:',
          residentId
        );
        throw new Error(
          `User record operation failed: ${userError instanceof Error ? userError.message : 'Unknown error'}`
        );
      }
    } else {
      console.log(
        '👥 [MEMBERSHIP_CREATED] Not a resident invitation - no user record linking required'
      );
    }
    console.log(
      '👥 [MEMBERSHIP_CREATED] 🎉 Successfully processed membership creation:'
    );
    console.log('👥 [MEMBERSHIP_CREATED] Summary:', {
      userId: public_user_data.user_id,
      orgId: organization.id,
      email: userEmail,
      name: userName,
      role: role,
      isResidentInvitation: !!residentId,
      residentId: residentId,
      portalAccessEnabled: !!residentId,
    });
  } catch (error) {
    console.error(
      '👥 [MEMBERSHIP_CREATED] Error processing membership:',
      error
    );
    throw error;
  }
}

async function handleMembershipUpdated(evt: ClerkWebhookEvent) {
  const { organization, public_user_data, role } = evt.data;

  console.log('👥 [MEMBERSHIP_UPDATED] Processing membership update:', {
    organizationId: organization?.id,
    userId: public_user_data?.user_id,
    newRole: role,
  });

  if (!organization?.id || !public_user_data?.user_id || !role) {
    console.error('👥 [MEMBERSHIP_UPDATED] Missing required data:', {
      organizationId: organization?.id,
      userId: public_user_data?.user_id,
      role,
    });
    return;
  }

  try {
    // Map Clerk roles to our internal roles
    const mappedRole = role === 'org:admin' ? 'admin' : 'member';

    console.log('👥 [MEMBERSHIP_UPDATED] Role mapping:', {
      clerkRole: role,
      internalRole: mappedRole,
    });

    // Update user's role in the account with enhanced error handling
    const result = await db
      .update(accounts)
      .set({
        role: mappedRole,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(accounts.orgId, organization.id),
          eq(accounts.userId, public_user_data.user_id)
        )
      )
      .returning();

    if (result.length === 0) {
      console.error(
        '👥 [MEMBERSHIP_UPDATED] ⚠️ WARNING: No account found to update for user:',
        public_user_data.user_id
      );
      console.error(
        '👥 [MEMBERSHIP_UPDATED] This might indicate a missing account record'
      );
    } else {
      console.log(
        '👥 [MEMBERSHIP_UPDATED] ✅ Successfully updated account role:',
        {
          accountId: result[0].id,
          userId: result[0].userId,
          newRole: result[0].role,
          email: result[0].email,
        }
      );
    }

    console.log(
      '👥 [MEMBERSHIP_UPDATED] 🎉 Successfully processed membership update'
    );
  } catch (error) {
    console.error(
      '👥 [MEMBERSHIP_UPDATED] ❌ ERROR: Failed to update membership:',
      error
    );
    throw error;
  }
}

async function handleMembershipDeleted(evt: ClerkWebhookEvent) {
  const { organization, public_user_data } = evt.data;

  console.log('👥 [MEMBERSHIP_DELETED] Processing membership deletion:', {
    organizationId: organization?.id,
    userId: public_user_data?.user_id,
  });

  if (!organization?.id || !public_user_data?.user_id) {
    console.error('👥 [MEMBERSHIP_DELETED] Missing required data:', {
      organizationId: organization?.id,
      userId: public_user_data?.user_id,
    });
    return;
  }

  try {
    // Delete user's account from this organization
    const deletedAccounts = await db
      .delete(accounts)
      .where(
        and(
          eq(accounts.orgId, organization.id),
          eq(accounts.userId, public_user_data.user_id)
        )
      )
      .returning();

    console.log(
      '👥 [MEMBERSHIP_DELETED] Deleted accounts:',
      deletedAccounts.length
    );

    // Also delete any user records (for residents)
    const deletedUsers = await db
      .delete(users)
      .where(
        and(
          eq(users.orgId, organization.id),
          eq(users.userId, public_user_data.user_id)
        )
      )
      .returning();

    console.log(
      '👥 [MEMBERSHIP_DELETED] Deleted user records:',
      deletedUsers.length
    );

    if (deletedAccounts.length === 0 && deletedUsers.length === 0) {
      console.log(
        '👥 [MEMBERSHIP_DELETED] ⚠️ No records found to delete for user:',
        public_user_data.user_id
      );
    } else {
      console.log(
        '👥 [MEMBERSHIP_DELETED] ✅ Successfully cleaned up user data:',
        {
          accountsDeleted: deletedAccounts.length,
          usersDeleted: deletedUsers.length,
          userId: public_user_data.user_id,
          orgId: organization.id,
        }
      );
    }

    console.log(
      '👥 [MEMBERSHIP_DELETED] 🎉 Successfully processed membership deletion'
    );
  } catch (error) {
    console.error(
      '👥 [MEMBERSHIP_DELETED] ❌ ERROR: Failed to delete membership:',
      error
    );
    throw error;
  }
}
