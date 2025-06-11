import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { db } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import { accounts } from '@/lib/schema';

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
      email_addresses?: Array<{ email_address: string }>;
    };
    role?: string;
  };
}

export async function POST(request: NextRequest) {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await request.text();
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
  } catch (_err) {
    // Log verification error for debugging
    return new Response('Error occurred', {
      status: 400,
    });
  }
  // Handle the webhook
  try {
    switch (evt.type) {
      case 'organization.created':
        await handleOrganizationCreated(evt);
        break;
      case 'organization.updated':
        await handleOrganizationUpdated(evt);
        break;
      case 'organization.deleted':
        await handleOrganizationDeleted(evt);
        break;
      case 'organizationMembership.created':
        await handleMembershipCreated(evt);
        break;
      case 'organizationMembership.updated':
        await handleMembershipUpdated(evt);
        break;
      case 'organizationMembership.deleted':
        await handleMembershipDeleted(evt);
        break;
      default:
        // Log unhandled event types for debugging
        break;
    }

    return NextResponse.json({ message: 'Webhook processed successfully' });
  } catch (_error) {
    // Log processing error for debugging
    return new Response('Error processing webhook', { status: 500 });
  }
}

async function handleOrganizationCreated(evt: ClerkWebhookEvent) {
  const { id, name, slug } = evt.data;

  if (!id || !name) {
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
  } catch (error) {
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
  const { organization, public_user_data, role } = evt.data;

  if (!organization?.id || !public_user_data?.user_id || !role) {
    return;
  }

  try {
    // Create or update account for this user in this organization
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

    const userData = {
      orgId: organization.id,
      userId: public_user_data.user_id,
      name:
        public_user_data.first_name && public_user_data.last_name
          ? `${public_user_data.first_name} ${public_user_data.last_name}`
          : 'Unknown User',
      email:
        public_user_data.email_addresses?.[0]?.email_address ||
        'unknown@example.com',
      role: role === 'org:admin' ? ('admin' as const) : ('manager' as const),
      organizationName: organization.name || null,
      organizationSlug: organization.slug || null,
    };

    if (existingAccount.length === 0) {
      // Create new account
      await db.insert(accounts).values(userData);
    } else {
      // Update existing account
      await db
        .update(accounts)
        .set({
          ...userData,
          updatedAt: new Date(),
        })
        .where(eq(accounts.id, existingAccount[0].id));
    }
  } catch (error) {
    throw error;
  }
}

async function handleMembershipUpdated(evt: ClerkWebhookEvent) {
  const { organization, public_user_data, role } = evt.data;

  if (!organization?.id || !public_user_data?.user_id || !role) {
    return;
  }

  try {
    // Update user's role in the account
    await db
      .update(accounts)
      .set({
        role: role === 'org:admin' ? 'admin' : 'manager',
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(accounts.orgId, organization.id),
          eq(accounts.userId, public_user_data.user_id)
        )
      );
  } catch (error) {
    throw error;
  }
}

async function handleMembershipDeleted(evt: ClerkWebhookEvent) {
  const { organization, public_user_data } = evt.data;

  if (!organization?.id || !public_user_data?.user_id) {
    return;
  }

  try {
    // Delete user's account from this organization
    await db
      .delete(accounts)
      .where(
        and(
          eq(accounts.orgId, organization.id),
          eq(accounts.userId, public_user_data.user_id)
        )
      );
  } catch (error) {
    throw error;
  }
}
