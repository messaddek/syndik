import { eq, and, desc, ilike, or, count, asc } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { residents, createResidentSchema } from '../schema';
import { PAGINATION, SORT_ORDERS, RESIDENT_SORT_FIELDS } from '@/constants';

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
});
