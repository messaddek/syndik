import { and, eq, ilike, or, count, asc, desc } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { buildings, createBuildingSchema } from '../schema';
import { PAGINATION, SORT_ORDERS, BUILDING_SORT_FIELDS } from '@/constants';

export const buildingsRouter = createTRPCRouter({
  create: orgProtectedProcedure
    .input(createBuildingSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [newBuilding] = await db
        .insert(buildings)
        .values({
          orgId,
          ...input,
        })
        .returning();

      return newBuilding;
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
        city: z.string().optional(),
        sortBy: z
          .enum([
            BUILDING_SORT_FIELDS.NAME,
            BUILDING_SORT_FIELDS.CITY,
            BUILDING_SORT_FIELDS.TOTAL_UNITS,
            BUILDING_SORT_FIELDS.CREATED_AT,
          ] as const)
          .default(BUILDING_SORT_FIELDS.NAME),
        sortOrder: z
          .enum([SORT_ORDERS.ASC, SORT_ORDERS.DESC] as const)
          .default(SORT_ORDERS.ASC),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const { page, pageSize, search, city, sortBy, sortOrder } = input;

      const offset = (page - 1) * pageSize;

      // Build where conditions
      const whereConditions = [eq(buildings.orgId, orgId)];

      if (city) {
        whereConditions.push(eq(buildings.city, city));
      }

      if (search) {
        whereConditions.push(
          or(
            ilike(buildings.name, `%${search}%`),
            ilike(buildings.address, `%${search}%`),
            ilike(buildings.city, `%${search}%`)
          )!
        );
      }

      // Build sort order
      const sortField = {
        [BUILDING_SORT_FIELDS.NAME]: buildings.name,
        [BUILDING_SORT_FIELDS.CITY]: buildings.city,
        [BUILDING_SORT_FIELDS.TOTAL_UNITS]: buildings.totalUnits,
        [BUILDING_SORT_FIELDS.CREATED_AT]: buildings.createdAt,
      }[sortBy];

      const orderBy =
        sortOrder === SORT_ORDERS.ASC ? asc(sortField) : desc(sortField);

      // Get total count
      const [{ total }] = await db
        .select({ total: count() })
        .from(buildings)
        .where(and(...whereConditions));

      // Get paginated data
      const data = await db
        .select()
        .from(buildings)
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

      const [building] = await db
        .select()
        .from(buildings)
        .where(and(eq(buildings.id, input.id), eq(buildings.orgId, orgId)))
        .limit(1);

      return building || null;
    }),

  update: orgProtectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: createBuildingSchema.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [updatedBuilding] = await db
        .update(buildings)
        .set({
          ...input.data,
          updatedAt: new Date(),
        })
        .where(and(eq(buildings.id, input.id), eq(buildings.orgId, orgId)))
        .returning();

      return updatedBuilding;
    }),

  delete: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [deletedBuilding] = await db
        .delete(buildings)
        .where(and(eq(buildings.id, input.id), eq(buildings.orgId, orgId)))
        .returning();

      return deletedBuilding;
    }),

  getCities: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, orgId } = ctx;

    const citiesResult = await db
      .select({ city: buildings.city })
      .from(buildings)
      .where(eq(buildings.orgId, orgId))
      .orderBy(asc(buildings.city));

    // Get unique cities
    const uniqueCities = [...new Set(citiesResult.map(row => row.city))].sort();
    return uniqueCities;
  }),
});
