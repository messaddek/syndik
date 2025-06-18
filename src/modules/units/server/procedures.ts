import { eq, and, ilike, gte, lte, asc, desc, sql } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { units, createUnitSchema, updateUnitSchema } from '../schema';
import { buildings } from '@/lib/schema';

export const unitsRouter = createTRPCRouter({
  create: orgProtectedProcedure
    .input(createUnitSchema)
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const [newUnit] = await db
        .insert(units)
        .values({
          orgId,
          buildingId: input.buildingId,
          unitNumber: input.unitNumber,
          floor: input.floor,
          area: input.area || null,
          bedrooms: input.bedrooms,
          bathrooms: input.bathrooms,
          monthlyFee: input.monthlyFee,
          description: input.description,
        })
        .returning();

      return newUnit;
    }),
  getByBuilding: orgProtectedProcedure
    .input(z.object({ buildingId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      return await db
        .select()
        .from(units)
        .where(
          and(eq(units.buildingId, input.buildingId), eq(units.orgId, orgId))
        )
        .orderBy(units.floor, units.unitNumber);
    }),
  getAll: orgProtectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(10),
        search: z.string().optional(),
        buildingId: z.string().uuid().optional(),
        floor: z.number().optional(),
        minBedrooms: z.number().optional(),
        maxBedrooms: z.number().optional(),
        minBathrooms: z.number().optional(),
        maxBathrooms: z.number().optional(),
        isOccupied: z.boolean().optional(),
        sortBy: z.string().default('unitNumber'),
        sortOrder: z.enum(['asc', 'desc']).default('asc'),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;
      const {
        page,
        pageSize,
        search,
        buildingId,
        floor,
        minBedrooms,
        maxBedrooms,
        minBathrooms,
        maxBathrooms,
        isOccupied,
        sortBy,
        sortOrder,
      } = input;

      console.log('Fetching units with filters:', {
        page,
        pageSize,
        search,
        buildingId,
        floor,
        minBedrooms,
        maxBedrooms,
        minBathrooms,
        maxBathrooms,
        isOccupied,
        sortBy,
        sortOrder,
      });

      const conditions = [eq(units.orgId, orgId)];

      // Apply filters
      if (search) {
        conditions.push(ilike(units.unitNumber, `%${search}%`));
      }

      if (buildingId) {
        conditions.push(eq(units.buildingId, buildingId));
      }

      if (floor !== undefined) {
        conditions.push(eq(units.floor, floor));
      }

      if (minBedrooms !== undefined) {
        conditions.push(gte(units.bedrooms, minBedrooms));
      }

      if (maxBedrooms !== undefined) {
        conditions.push(lte(units.bedrooms, maxBedrooms));
      }

      if (minBathrooms !== undefined) {
        conditions.push(gte(units.bathrooms, minBathrooms));
      }

      if (maxBathrooms !== undefined) {
        conditions.push(lte(units.bathrooms, maxBathrooms));
      }

      if (isOccupied !== undefined) {
        conditions.push(eq(units.isOccupied, isOccupied));
      } // Build order by clause
      let orderDirection;
      switch (sortBy) {
        case 'unitNumber':
          orderDirection =
            sortOrder === 'desc'
              ? desc(units.unitNumber)
              : asc(units.unitNumber);
          break;
        case 'floor':
          orderDirection =
            sortOrder === 'desc' ? desc(units.floor) : asc(units.floor);
          break;
        case 'area':
          orderDirection =
            sortOrder === 'desc' ? desc(units.area) : asc(units.area);
          break;
        case 'bedrooms':
          orderDirection =
            sortOrder === 'desc' ? desc(units.bedrooms) : asc(units.bedrooms);
          break;
        case 'bathrooms':
          orderDirection =
            sortOrder === 'desc' ? desc(units.bathrooms) : asc(units.bathrooms);
          break;
        case 'monthlyFee':
          orderDirection =
            sortOrder === 'desc'
              ? desc(units.monthlyFee)
              : asc(units.monthlyFee);
          break;
        case 'createdAt':
          orderDirection =
            sortOrder === 'desc' ? desc(units.createdAt) : asc(units.createdAt);
          break;
        default:
          orderDirection =
            sortOrder === 'desc'
              ? desc(units.unitNumber)
              : asc(units.unitNumber);
      }

      // Get total count for pagination
      const [{ count }] = await db
        .select({ count: sql<number>`count(*)`.mapWith(Number) })
        .from(units)
        .where(and(...conditions));

      // Get paginated results with building info
      const result = await db
        .select({
          id: units.id,
          buildingId: units.buildingId,
          orgId: units.orgId,
          unitNumber: units.unitNumber,
          floor: units.floor,
          area: units.area,
          bedrooms: units.bedrooms,
          bathrooms: units.bathrooms,
          monthlyFee: units.monthlyFee,
          isOccupied: units.isOccupied,
          description: units.description,
          createdAt: units.createdAt,
          updatedAt: units.updatedAt,
          building: {
            id: buildings.id,
            name: buildings.name,
            address: buildings.address,
            city: buildings.city,
          },
        })
        .from(units)
        .leftJoin(buildings, eq(units.buildingId, buildings.id))
        .where(and(...conditions))
        .orderBy(orderDirection)
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      return {
        data: result,
        pagination: {
          page,
          pageSize,
          total: count,
          totalPages: Math.ceil(count / pageSize),
        },
      };
    }),

  getById: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [unit] = await db
        .select()
        .from(units)
        .where(and(eq(units.id, input.id), eq(units.orgId, orgId)))
        .limit(1);

      return unit || null;
    }),
  update: orgProtectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        data: updateUnitSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [updatedUnit] = await db
        .update(units)
        .set({
          ...input.data,
          updatedAt: new Date(),
        })
        .where(and(eq(units.id, input.id), eq(units.orgId, orgId)))
        .returning();

      return updatedUnit;
    }),

  delete: orgProtectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [deletedUnit] = await db
        .delete(units)
        .where(and(eq(units.id, input.id), eq(units.orgId, orgId)))
        .returning();

      return deletedUnit;
    }),

  toggleOccupancy: orgProtectedProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        isOccupied: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const [updatedUnit] = await db
        .update(units)
        .set({
          isOccupied: input.isOccupied,
          updatedAt: new Date(),
        })
        .where(and(eq(units.id, input.id), eq(units.orgId, orgId)))
        .returning();

      return updatedUnit;
    }),
});
