import { eq, and, ilike, or } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { buildings } from '@/modules/buildings/schema';
import { units } from '@/modules/units/schema';
import { residents } from '@/modules/residents/schema';

export const searchRouter = createTRPCRouter({
  global: orgProtectedProcedure
    .input(
      z.object({
        query: z.string().min(1),
        limit: z.number().min(1).max(20).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      console.log('Search input:', input);
      const { db, orgId } = ctx;
      const { query, limit } = input; // Search buildings
      const buildingsResults = await db
        .select({
          id: buildings.id,
          name: buildings.name,
          address: buildings.address,
          totalUnits: buildings.totalUnits,
          city: buildings.city,
          createdAt: buildings.createdAt,
        })
        .from(buildings)
        .where(
          and(
            eq(buildings.orgId, orgId),
            or(
              ilike(buildings.name, `%${query}%`),
              ilike(buildings.address, `%${query}%`),
              ilike(buildings.city, `%${query}%`)
            )
          )
        )
        .limit(limit);

      // Search units
      const unitsResults = await db
        .select({
          id: units.id,
          unitNumber: units.unitNumber,
          buildingId: units.buildingId,
          floor: units.floor,
          bedrooms: units.bedrooms,
          bathrooms: units.bathrooms,
          isOccupied: units.isOccupied,
          monthlyFee: units.monthlyFee,
          createdAt: units.createdAt,
        })
        .from(units)
        .where(
          and(eq(units.orgId, orgId), ilike(units.unitNumber, `%${query}%`))
        )
        .limit(limit);

      // Search residents
      const residentsResults = await db
        .select({
          id: residents.id,
          firstName: residents.firstName,
          lastName: residents.lastName,
          email: residents.email,
          phone: residents.phone,
          unitId: residents.unitId,
          isOwner: residents.isOwner,
          isActive: residents.isActive,
          moveInDate: residents.moveInDate,
          createdAt: residents.createdAt,
        })
        .from(residents)
        .where(
          and(
            eq(residents.orgId, orgId),
            eq(residents.isActive, true),
            or(
              ilike(residents.firstName, `%${query}%`),
              ilike(residents.lastName, `%${query}%`),
              ilike(residents.email, `%${query}%`),
              ilike(residents.phone, `%${query}%`)
            )
          )
        )
        .limit(limit);

      console.log('Search results:', {
        buildings: buildingsResults,
        units: unitsResults,
        residents: residentsResults,
      });

      return {
        buildings: buildingsResults,
        units: unitsResults,
        residents: residentsResults,
      };
    }),
});
