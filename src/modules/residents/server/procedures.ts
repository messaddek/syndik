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
        unitId: z.string().uuid().optional(),
        isOwner: z.boolean().optional(),
        isActive: z.boolean().optional().default(true),
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
      } // Build sort order
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

      return {
        data,
        pagination: {
          page,
          pageSize,
          total: Number(total),
          totalPages: Math.ceil(Number(total) / pageSize),
        },
      };
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

      // Get residents who don't have a corresponding user record (not invited to portal)
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
        try {
          // Verify resident exists and belongs to org
          const [resident] = await db
            .select()
            .from(residents)
            .where(
              and(eq(residents.id, residentId), eq(residents.orgId, orgId))
            )
            .limit(1);

          if (!resident) {
            errors.push({ residentId, error: 'Resident not found' });
            continue;
          }

          // Create Clerk organization invitation with resident metadata
          const clerk = await clerkClient();
          const invitation =
            await clerk.organizations.createOrganizationInvitation({
              organizationId: orgId,
              emailAddress: resident.email,
              role: 'org:member',
              publicMetadata: {
                residentId: residentId,
                invitationType: 'resident_portal',
              },
            });

          results.push({
            residentId,
            invitationId: invitation.id,
            emailAddress: resident.email,
            residentName: `${resident.firstName} ${resident.lastName}`,
          });
        } catch (error) {
          errors.push({
            residentId,
            error: error instanceof Error ? error.message : 'Unknown error',
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
        clerkUserId: z.string().min(1, 'Clerk User ID is required'),
        residentId: z.string().uuid('Invalid resident ID'),
        userName: z.string().min(1, 'User name is required'),
        userEmail: z.string().email('Valid email is required'),
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

      // Check if user already exists
      const [existingUser] = await db
        .select()
        .from(users)
        .where(and(eq(users.userId, input.clerkUserId), eq(users.orgId, orgId)))
        .limit(1);

      if (existingUser) {
        // Update existing user record to link to resident
        const [updatedUser] = await db
          .update(users)
          .set({
            residentId: input.residentId,
            name: input.userName,
            email: input.userEmail,
            updatedAt: new Date(),
          })
          .where(
            and(eq(users.userId, input.clerkUserId), eq(users.orgId, orgId))
          )
          .returning();

        return {
          linked: true,
          user: updatedUser,
          resident,
          message: 'User successfully linked to resident record',
        };
      } else {
        // Create new user record linked to resident
        const [newUser] = await db
          .insert(users)
          .values({
            userId: input.clerkUserId,
            orgId: orgId,
            name: input.userName,
            email: input.userEmail,
            residentId: input.residentId,
            isActive: true,
          })
          .returning();

        return {
          linked: true,
          user: newUser,
          resident,
          message: 'User record created and linked to resident',
        };
      }
    }),
});
