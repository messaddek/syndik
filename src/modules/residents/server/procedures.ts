import { eq, and, desc, ilike, or, count, asc, notExists } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { residents, createResidentSchema } from '../schema';
import { users } from '@/modules/accounts/schema';
import { PAGINATION, SORT_ORDERS, RESIDENT_SORT_FIELDS } from '@/constants';
import { TRPCError } from '@trpc/server';
import { clerkClient } from '@clerk/nextjs/server';

export const residentsRouter = createTRPCRouter({
  create: orgProtectedProcedure
    .input(createResidentSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [newResident] = await db
        .insert(residents)
        .values({
          orgId,
          ...input,
          moveInDate: input.moveInDate,
          moveOutDate: input.moveOutDate || null,
        })
        .returning();

      return newResident;
    }),

  getByUnit: orgProtectedProcedure
    .input(z.object({ unitId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      return await db
        .select()
        .from(residents)
        .where(
          and(
            eq(residents.unitId, input.unitId),
            eq(residents.orgId, orgId),
            eq(residents.isActive, true)
          )
        )
        .orderBy(desc(residents.moveInDate));
    }),
  getAll: orgProtectedProcedure
    .input(
      z.object({
        page: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().optional(),
        unitId: z
          .string()
          .uuid()
          .optional()
          .or(z.literal(''))
          .transform(val => (val === '' ? undefined : val)),
        isOwner: z.boolean().optional(),
        isActive: z.boolean().optional(),
        sortBy: z
          .enum([
            RESIDENT_SORT_FIELDS.FIRST_NAME,
            RESIDENT_SORT_FIELDS.LAST_NAME,
            RESIDENT_SORT_FIELDS.EMAIL,
            RESIDENT_SORT_FIELDS.MOVE_IN_DATE,
          ] as const)
          .default(RESIDENT_SORT_FIELDS.LAST_NAME),
        sortOrder: z
          .enum([SORT_ORDERS.ASC, SORT_ORDERS.DESC] as const)
          .default(SORT_ORDERS.ASC),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const {
        page,
        pageSize,
        search,
        unitId,
        isOwner,
        isActive,
        sortBy,
        sortOrder,
      } = input;

      const offset = (page - 1) * pageSize;

      // Build where conditions
      const whereConditions = [eq(residents.orgId, orgId)];

      if (isActive !== undefined) {
        whereConditions.push(eq(residents.isActive, isActive));
      }

      if (unitId) {
        whereConditions.push(eq(residents.unitId, unitId));
      }

      if (isOwner !== undefined) {
        whereConditions.push(eq(residents.isOwner, isOwner));
      }
      if (search) {
        whereConditions.push(
          or(
            ilike(residents.firstName, `%${search}%`),
            ilike(residents.lastName, `%${search}%`),
            ilike(residents.email, `%${search}%`)
          )!
        );
      }

      // Build sort order
      const sortField = {
        [RESIDENT_SORT_FIELDS.FIRST_NAME]: residents.firstName,
        [RESIDENT_SORT_FIELDS.LAST_NAME]: residents.lastName,
        [RESIDENT_SORT_FIELDS.EMAIL]: residents.email,
        [RESIDENT_SORT_FIELDS.MOVE_IN_DATE]: residents.moveInDate,
      }[sortBy];

      const orderBy =
        sortOrder === SORT_ORDERS.ASC ? asc(sortField) : desc(sortField);

      // Get total count
      const [{ total }] = await db
        .select({ total: count() })
        .from(residents)
        .where(and(...whereConditions));

      // Get paginated data
      const data = await db
        .select()
        .from(residents)
        .where(and(...whereConditions))
        .orderBy(orderBy)
        .limit(pageSize)
        .offset(offset);

      const result = {
        data,
        pagination: {
          page,
          pageSize,
          total: Number(total),
          totalPages: Math.ceil(Number(total) / pageSize),
        },
      };

      return result;
    }),

  getById: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [resident] = await db
        .select()
        .from(residents)
        .where(and(eq(residents.id, input.id), eq(residents.orgId, orgId)))
        .limit(1);

      return resident || null;
    }),
  update: orgProtectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: createResidentSchema.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const updateData = {
        ...input.data,
        updatedAt: new Date(),
      };

      const [updatedResident] = await db
        .update(residents)
        .set(updateData)
        .where(and(eq(residents.id, input.id), eq(residents.orgId, orgId)))
        .returning();

      return updatedResident;
    }),

  delete: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [deletedResident] = await db
        .delete(residents)
        .where(and(eq(residents.id, input.id), eq(residents.orgId, orgId)))
        .returning();

      return deletedResident;
    }),

  moveOut: orgProtectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        moveOutDate: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const [updatedResident] = await db
        .update(residents)
        .set({
          moveOutDate: input.moveOutDate,
          isActive: false,
          updatedAt: new Date(),
        })
        .where(and(eq(residents.id, input.id), eq(residents.orgId, orgId)))
        .returning();

      return updatedResident;
    }),

  inviteToPortal: orgProtectedProcedure
    .input(
      z.object({
        residentId: z.string().uuid(),
        email: z.string().email().optional(), // Optional - will use resident's email if not provided
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      // Verify resident exists and belongs to org
      const [resident] = await db
        .select()
        .from(residents)
        .where(
          and(eq(residents.id, input.residentId), eq(residents.orgId, orgId))
        )
        .limit(1);

      if (!resident) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Resident not found',
        });
      }

      const emailToInvite = input.email || resident.email;

      try {
        // Create Clerk organization invitation with resident metadata
        const clerk = await clerkClient();
        const invitation =
          await clerk.organizations.createOrganizationInvitation({
            organizationId: orgId,
            emailAddress: emailToInvite,
            role: 'org:member',
            publicMetadata: {
              residentId: input.residentId,
              invitationType: 'resident_portal',
            },
          });

        return {
          invitationId: invitation.id,
          emailAddress: emailToInvite,
          residentName: `${resident.firstName} ${resident.lastName}`,
        };
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send invitation',
          cause: error,
        });
      }
    }),

  getUninvitedResidents: orgProtectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      // Get all active residents
      const allResidents = await db
        .select({
          id: residents.id,
          firstName: residents.firstName,
          lastName: residents.lastName,
          email: residents.email,
          phone: residents.phone,
          isOwner: residents.isOwner,
          isActive: residents.isActive,
        })
        .from(residents)
        .where(and(eq(residents.orgId, orgId), eq(residents.isActive, true)))
        .orderBy(desc(residents.createdAt))
        .limit(input.limit * 2); // Get more than needed to filter

      // Check Clerk memberships to see who's actually not invited
      const clerk = await clerkClient();
      let existingMemberships = [];
      let pendingInvitations = [];

      try {
        const [memberships, invitations] = await Promise.all([
          clerk.organizations.getOrganizationMembershipList({
            organizationId: orgId,
          }),
          clerk.organizations.getOrganizationInvitationList({
            organizationId: orgId,
          }),
        ]);

        existingMemberships = memberships.data;
        pendingInvitations = invitations.data.filter(
          inv => inv.status === 'pending'
        );
      } catch (error) {
        console.error('Error fetching Clerk data:', error);
        // Fall back to checking users table only if Clerk fails
        const uninvitedResidents = await db
          .select({
            id: residents.id,
            firstName: residents.firstName,
            lastName: residents.lastName,
            email: residents.email,
            phone: residents.phone,
            isOwner: residents.isOwner,
            isActive: residents.isActive,
          })
          .from(residents)
          .where(
            and(
              eq(residents.orgId, orgId),
              eq(residents.isActive, true),
              notExists(
                db
                  .select()
                  .from(users)
                  .where(
                    and(
                      eq(users.residentId, residents.id),
                      eq(users.orgId, orgId)
                    )
                  )
              )
            )
          )
          .orderBy(desc(residents.createdAt))
          .limit(input.limit);

        return uninvitedResidents;
      }

      // Filter out residents who are already members or have pending invitations
      const memberEmails = new Set(
        existingMemberships
          .map(m => m.publicUserData?.identifier)
          .filter(Boolean)
      );
      const invitedEmails = new Set(
        pendingInvitations.map(inv => inv.emailAddress)
      );

      console.log(`📋 Filtering residents:`, {
        totalResidents: allResidents.length,
        memberEmails: Array.from(memberEmails),
        invitedEmails: Array.from(invitedEmails),
      });

      const uninvitedResidents = allResidents
        .filter(resident => {
          const isAlreadyMember = memberEmails.has(resident.email);
          const hasInvitation = invitedEmails.has(resident.email);
          const isUninvited = !isAlreadyMember && !hasInvitation;

          console.log(
            `👤 ${resident.firstName} ${resident.lastName} (${resident.email}):`,
            {
              isAlreadyMember,
              hasInvitation,
              isUninvited,
            }
          );

          return isUninvited;
        })
        .slice(0, input.limit);

      return uninvitedResidents;
    }),

  bulkInviteToPortal: orgProtectedProcedure
    .input(
      z.object({
        residentIds: z
          .array(z.string().uuid())
          .min(1, 'At least one resident ID required'),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const results = [];
      const errors = [];

      for (const residentId of input.residentIds) {
        let resident: typeof residents.$inferSelect | null = null;
        try {
          // Verify resident exists and belongs to org
          const [residentData] = await db
            .select()
            .from(residents)
            .where(
              and(eq(residents.id, residentId), eq(residents.orgId, orgId))
            )
            .limit(1);

          resident = residentData;

          if (!resident) {
            errors.push({ residentId, error: 'Resident not found' });
            continue;
          }

          // Validate email format
          if (!resident.email || !resident.email.includes('@')) {
            errors.push({
              residentId,
              error: `Invalid email address: ${resident.email}`,
              residentName: `${resident.firstName} ${resident.lastName}`,
              email: resident.email || 'No email',
            });
            continue;
          }

          // Check if resident already has an invitation or is already a member
          const clerk = await clerkClient();

          try {
            // Check if user already exists in the organization
            const existingMemberships =
              await clerk.organizations.getOrganizationMembershipList({
                organizationId: orgId,
              });

            console.log(
              `🔍 Checking memberships for resident ${residentId} (${resident.email})`
            );
            console.log(
              `📊 Found ${existingMemberships.data.length} existing memberships`
            );

            // Log what data is actually available in memberships
            existingMemberships.data.forEach((membership, index) => {
              console.log(`👤 Membership ${index + 1}:`, {
                userId: membership.publicUserData?.userId,
                identifier: membership.publicUserData?.identifier,
                firstName: membership.publicUserData?.firstName,
                lastName: membership.publicUserData?.lastName,
                imageUrl: membership.publicUserData?.imageUrl,
                hasImage: membership.publicUserData?.hasImage,
                // Log all available keys
                availableKeys: Object.keys(membership.publicUserData || {}),
              });
            });

            const existingMember = existingMemberships.data.find(membership => {
              console.log(`🔍 Comparing:`, {
                residentEmail: resident?.email,
                memberIdentifier: membership.publicUserData?.identifier,
                memberUserId: membership.publicUserData?.userId,
              });
              // Since emailAddress might not be available in publicUserData,
              // we'll check what's available and handle invitation conflicts through Clerk errors
              return membership.publicUserData?.identifier === resident?.email;
            });

            if (existingMember) {
              errors.push({
                residentId,
                error: `User already member of organization: ${resident.email}`,
                residentName: `${resident.firstName} ${resident.lastName}`,
                email: resident.email,
              });
              continue;
            }

            // Check for pending invitations
            const pendingInvitations =
              await clerk.organizations.getOrganizationInvitationList({
                organizationId: orgId,
              });

            console.log(
              `📨 Found ${pendingInvitations.data.length} pending invitations`
            );

            // Log invitation data
            pendingInvitations.data.forEach((invitation, index) => {
              console.log(`✉️ Invitation ${index + 1}:`, {
                emailAddress: invitation.emailAddress,
                status: invitation.status,
                role: invitation.role,
                id: invitation.id,
                createdAt: invitation.createdAt,
              });
            });

            const existingInvitation = pendingInvitations.data.find(
              invitation => {
                console.log(`📧 Comparing invitation:`, {
                  residentEmail: resident?.email,
                  invitationEmail: invitation.emailAddress,
                  invitationStatus: invitation.status,
                });
                return (
                  invitation.emailAddress === resident?.email &&
                  invitation.status === 'pending'
                );
              }
            );

            if (existingInvitation) {
              errors.push({
                residentId,
                error: `Invitation already sent to: ${resident.email}`,
                residentName: `${resident.firstName} ${resident.lastName}`,
                email: resident.email,
              });
              continue;
            }
          } catch (clerkError) {
            console.error(
              'Error checking existing memberships/invitations:',
              clerkError
            );
            // Continue with invitation attempt even if this check fails
          }

          // Create Clerk organization invitation with resident metadata
          console.log(`🚀 Creating invitation for resident ${residentId}:`, {
            email: resident.email,
            orgId: orgId,
            role: 'org:member',
          });

          const invitation =
            await clerk.organizations.createOrganizationInvitation({
              organizationId: orgId,
              emailAddress: resident.email,
              role: 'org:member',
              publicMetadata: {
                residentId: residentId,
                invitationType: 'resident_portal',
                residentName: `${resident.firstName} ${resident.lastName}`,
              },
            });

          console.log(`✅ Successfully created invitation:`, {
            invitationId: invitation.id,
            email: resident.email,
            residentName: `${resident.firstName} ${resident.lastName}`,
          });

          results.push({
            residentId,
            invitationId: invitation.id,
            emailAddress: resident.email,
            residentName: `${resident.firstName} ${resident.lastName}`,
          });
        } catch (error) {
          console.error(
            `❌ Error inviting resident ${residentId} (${resident?.email || 'unknown email'}):`,
            error
          );

          // Log the full error object to understand its structure
          console.error('Full error object:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : 'No stack',
            clerkError: error,
          });

          let errorMessage = 'Unknown error';
          if (error instanceof Error) {
            errorMessage = error.message;

            // Parse Clerk-specific error messages
            if (error.message.includes('email_address_not_allowed')) {
              errorMessage = `Email address not allowed: ${resident?.email}`;
            } else if (error.message.includes('invalid_email_address')) {
              errorMessage = `Invalid email format: ${resident?.email}`;
            } else if (error.message.includes('already_exists')) {
              errorMessage = `User already exists: ${resident?.email}`;
            } else if (error.message.includes('invitation_already_exists')) {
              errorMessage = `Invitation already exists: ${resident?.email}`;
            }
          }

          errors.push({
            residentId,
            error: errorMessage,
            email: resident?.email || 'Unknown',
          });
        }
      }

      return {
        successful: results,
        failed: errors,
        total: input.residentIds.length,
        successCount: results.length,
        errorCount: errors.length,
      };
    }),

  linkUserToResident: orgProtectedProcedure
    .input(
      z.object({
        clerkUserId: z.string(),
        residentId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      // Verify the resident exists and belongs to this org
      const [resident] = await db
        .select()
        .from(residents)
        .where(
          and(eq(residents.id, input.residentId), eq(residents.orgId, orgId))
        )
        .limit(1);

      if (!resident) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Resident not found',
        });
      }

      // Check if user record already exists
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.userId, input.clerkUserId))
        .limit(1);

      if (existingUser) {
        // Update existing user with resident link
        const [updatedUser] = await db
          .update(users)
          .set({
            residentId: input.residentId,
            orgId: orgId,
            name: `${resident.firstName} ${resident.lastName}`,
            email: resident.email,
            phone: resident.phone,
            updatedAt: new Date(),
          })
          .where(eq(users.userId, input.clerkUserId))
          .returning();

        return updatedUser;
      } else {
        // Create new user record linked to resident
        const [newUser] = await db
          .insert(users)
          .values({
            userId: input.clerkUserId,
            orgId: orgId,
            name: `${resident.firstName} ${resident.lastName}`,
            email: resident.email,
            phone: resident.phone,
            residentId: input.residentId,
          })
          .returning();

        return newUser;
      }
    }),

  // Check if current user has a linked resident record
  getCurrentUserResidentLink: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, userId, orgId } = ctx;

    if (!userId) {
      return null;
    }

    const [userRecord] = await db
      .select({
        id: users.id,
        residentId: users.residentId,
        name: users.name,
        email: users.email,
        phone: users.phone,
      })
      .from(users)
      .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
      .limit(1);

    return userRecord || null;
  }),

  // Auto-link current user to resident record based on email
  autoLinkCurrentUser: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, userId, orgId } = ctx;

    if (!userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'User not authenticated',
      });
    }

    // Check if user is already linked
    const [existingUser] = await db
      .select()
      .from(users)
      .where(and(eq(users.userId, userId), eq(users.orgId, orgId)))
      .limit(1);

    if (existingUser?.residentId) {
      return {
        success: true,
        message: 'User already linked',
        userRecord: existingUser,
      };
    }

    // Get user's email from Clerk
    const clerk = await clerkClient();
    let clerkUser;

    try {
      clerkUser = await clerk.users.getUser(userId);
    } catch (_error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch user from Clerk',
      });
    }

    const userEmail = clerkUser.emailAddresses?.[0]?.emailAddress;
    if (!userEmail) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No email address found for user',
      });
    }

    // Find matching resident by email
    const [matchingResident] = await db
      .select()
      .from(residents)
      .where(
        and(
          eq(residents.email, userEmail),
          eq(residents.orgId, orgId),
          eq(residents.isActive, true)
        )
      )
      .limit(1);

    if (!matchingResident) {
      return {
        success: false,
        message: 'No matching resident record found for your email address',
        userEmail,
      };
    }

    // Create or update user record with resident link
    if (existingUser) {
      const [updatedUser] = await db
        .update(users)
        .set({
          residentId: matchingResident.id,
          name: `${matchingResident.firstName} ${matchingResident.lastName}`,
          email: matchingResident.email,
          phone: matchingResident.phone,
          updatedAt: new Date(),
        })
        .where(eq(users.userId, userId))
        .returning();

      return {
        success: true,
        message: 'Successfully linked to resident record',
        userRecord: updatedUser,
        resident: matchingResident,
      };
    } else {
      const [newUser] = await db
        .insert(users)
        .values({
          userId: userId,
          orgId: orgId,
          name: `${matchingResident.firstName} ${matchingResident.lastName}`,
          email: matchingResident.email,
          phone: matchingResident.phone,
          residentId: matchingResident.id,
        })
        .returning();

      return {
        success: true,
        message: 'Successfully created user record and linked to resident',
        userRecord: newUser,
        resident: matchingResident,
      };
    }
  }),
});
