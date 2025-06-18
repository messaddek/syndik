import { eq, and, count, sql } from 'drizzle-orm';
import { z } from 'zod';
import { createTRPCRouter, orgProtectedProcedure } from '@/trpc/init';
import { buildings } from '../../buildings/schema';
import { units } from '../../units/schema';
import { residents } from '../../residents/schema';
import { incomes } from '../../incomes/schema';
import { expenses } from '../../expenses/schema';
import { meetings } from '../../meetings/schema';
import { users } from '../../accounts/schema';

export const dashboardRouter = createTRPCRouter({
  getOverview: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, orgId } = ctx;

    const [buildingsCount] = await db
      .select({ count: count() })
      .from(buildings)
      .where(eq(buildings.orgId, orgId));

    const [unitsCount] = await db
      .select({ count: count() })
      .from(units)
      .where(eq(units.orgId, orgId));

    const [occupiedUnitsCount] = await db
      .select({ count: count() })
      .from(units)
      .where(and(eq(units.orgId, orgId), eq(units.isOccupied, true)));

    const [activeResidentsCount] = await db
      .select({ count: count() })
      .from(residents)
      .where(and(eq(residents.orgId, orgId), eq(residents.isActive, true)));

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const monthlyIncomes = await db
      .select()
      .from(incomes)
      .where(
        and(
          eq(incomes.orgId, orgId),
          eq(incomes.month, currentMonth),
          eq(incomes.year, currentYear)
        )
      );

    const monthlyExpenses = await db
      .select()
      .from(expenses)
      .where(
        and(
          eq(expenses.orgId, orgId),
          eq(expenses.month, currentMonth),
          eq(expenses.year, currentYear)
        )
      );

    const totalMonthlyIncome = monthlyIncomes.reduce(
      (sum, income) => sum + income.amount,
      0
    );

    const totalMonthlyExpenses = monthlyExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    return {
      buildings: buildingsCount?.count || 0,
      units: unitsCount?.count || 0,
      occupiedUnits: occupiedUnitsCount?.count || 0,
      activeResidents: activeResidentsCount?.count || 0,
      occupancyRate: unitsCount?.count
        ? (((occupiedUnitsCount?.count || 0) / unitsCount.count) * 100).toFixed(
            1
          )
        : '0',
      monthlyIncome: totalMonthlyIncome,
      monthlyExpenses: totalMonthlyExpenses,
      netIncome: totalMonthlyIncome - totalMonthlyExpenses,
    };
  }),

  getRecentActivity: orgProtectedProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      // Get recent residents
      const recentResidents = await db
        .select({
          id: residents.id,
          name: sql<string>`${residents.firstName} || ' ' || ${residents.lastName}`,
          type: sql<string>`'resident'`,
          date: residents.createdAt,
        })
        .from(residents)
        .where(eq(residents.orgId, orgId))
        .orderBy(sql`${residents.createdAt} DESC`)
        .limit(input.limit);

      // Get recent meetings
      const recentMeetings = await db
        .select({
          id: meetings.id,
          name: meetings.title,
          type: sql<string>`'meeting'`,
          date: meetings.createdAt,
        })
        .from(meetings)
        .where(eq(meetings.orgId, orgId))
        .orderBy(sql`${meetings.createdAt} DESC`)
        .limit(input.limit);

      // Combine and sort by date
      const activities = [...recentResidents, ...recentMeetings]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, input.limit);

      return activities;
    }),

  getFinancialSummary: orgProtectedProcedure
    .input(
      z.object({
        year: z.number().default(new Date().getFullYear()),
        buildingId: z
          .string()
          .uuid()
          .optional()
          .or(z.literal(''))
          .transform(val => (val === '' ? undefined : val)),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const conditions = [
        eq(incomes.orgId, orgId),
        eq(incomes.year, input.year),
      ];

      const expenseConditions = [
        eq(expenses.orgId, orgId),
        eq(expenses.year, input.year),
      ];

      if (input.buildingId) {
        conditions.push(eq(incomes.buildingId, input.buildingId));
        expenseConditions.push(eq(expenses.buildingId, input.buildingId));
      }

      const yearlyIncomes = await db
        .select()
        .from(incomes)
        .where(and(...conditions));

      const yearlyExpenses = await db
        .select()
        .from(expenses)
        .where(and(...expenseConditions));

      // Group by month
      const monthlyData = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const monthIncomes = yearlyIncomes.filter(
          income => income.month === month
        );
        const monthExpenses = yearlyExpenses.filter(
          expense => expense.month === month
        );

        const totalIncome = monthIncomes.reduce(
          (sum, income) => sum + income.amount,
          0
        );
        const totalExpenses = monthExpenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );

        return {
          month,
          income: totalIncome,
          expenses: totalExpenses,
          net: totalIncome - totalExpenses,
        };
      });

      return monthlyData;
    }),

  getPortalStats: orgProtectedProcedure.query(async ({ ctx }) => {
    const { db, orgId } = ctx;

    // Get total active residents
    const [totalActiveResidents] = await db
      .select({ count: count() })
      .from(residents)
      .where(and(eq(residents.orgId, orgId), eq(residents.isActive, true)));

    // Get residents with portal access (have user records)
    const [invitedResidents] = await db
      .select({ count: count() })
      .from(residents)
      .innerJoin(users, eq(users.residentId, residents.id))
      .where(
        and(
          eq(residents.orgId, orgId),
          eq(residents.isActive, true),
          eq(users.orgId, orgId)
        )
      );

    const totalResidents = totalActiveResidents?.count || 0;
    const invitedCount = invitedResidents?.count || 0;
    const uninvitedCount = totalResidents - invitedCount;
    const invitationRate =
      totalResidents > 0 ? (invitedCount / totalResidents) * 100 : 0;

    return {
      totalResidents,
      invitedCount,
      uninvitedCount,
      invitationRate: Number(invitationRate.toFixed(1)),
    };
  }),

  getFinancialTrends: orgProtectedProcedure
    .input(z.object({ months: z.number().default(6) }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const currentDate = new Date();
      const monthsData = [];

      for (let i = input.months - 1; i >= 0; i--) {
        const date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - i,
          1
        );
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const monthIncomes = await db
          .select()
          .from(incomes)
          .where(
            and(
              eq(incomes.orgId, orgId),
              eq(incomes.month, month),
              eq(incomes.year, year)
            )
          );

        const monthExpenses = await db
          .select()
          .from(expenses)
          .where(
            and(
              eq(expenses.orgId, orgId),
              eq(expenses.month, month),
              eq(expenses.year, year)
            )
          );

        const totalIncome = monthIncomes.reduce(
          (sum, income) => sum + income.amount,
          0
        );

        const totalExpenses = monthExpenses.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );

        monthsData.push({
          month: date.toLocaleString('default', {
            month: 'long',
          }),
          income: totalIncome,
          expenses: totalExpenses,
          net: totalIncome - totalExpenses,
        });
      }

      return monthsData;
    }),

  getOccupancyTrends: orgProtectedProcedure
    .input(z.object({ months: z.number().default(12) }))
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      const currentDate = new Date();
      const monthsData = [];

      for (let i = input.months - 1; i >= 0; i--) {
        const date = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - i,
          1
        );
        const month = date.toLocaleString('default', {
          month: 'short',
          year: 'numeric',
        });

        // For demo purposes, we'll calculate current occupancy for each month
        // In a real app, you might want to store historical occupancy data
        const [totalUnits] = await db
          .select({ count: count() })
          .from(units)
          .where(eq(units.orgId, orgId));

        const [occupiedUnits] = await db
          .select({ count: count() })
          .from(units)
          .where(and(eq(units.orgId, orgId), eq(units.isOccupied, true)));

        const occupancyRate = totalUnits?.count
          ? Math.round(((occupiedUnits?.count || 0) / totalUnits.count) * 100)
          : 0;

        // Add some variation for demo purposes
        const variation = Math.floor(Math.random() * 10) - 5;
        const adjustedRate = Math.max(
          0,
          Math.min(100, occupancyRate + variation)
        );

        monthsData.push({
          month,
          occupancy: adjustedRate,
          total: totalUnits?.count || 0,
          occupied: occupiedUnits?.count || 0,
        });
      }

      return monthsData;
    }),

  getMissingPayments: orgProtectedProcedure
    .input(
      z.object({
        month: z.number().default(new Date().getMonth() + 1),
        year: z.number().default(new Date().getFullYear()),
      })
    )
    .query(async ({ ctx, input }) => {
      const { db, orgId } = ctx;

      // Get all occupied units with their expected monthly fees
      const occupiedUnits = await db
        .select({
          unitId: units.id,
          unitNumber: units.unitNumber,
          buildingId: units.buildingId,
          monthlyFee: units.monthlyFee,
          residentName: sql<string>`${residents.firstName} || ' ' || ${residents.lastName}`,
          residentId: residents.id,
        })
        .from(units)
        .innerJoin(
          residents,
          and(eq(residents.unitId, units.id), eq(residents.isActive, true))
        )
        .where(and(eq(units.orgId, orgId), eq(units.isOccupied, true)));

      // Get all payments made for the specified month/year
      const paidUnits = await db
        .select({
          unitId: incomes.unitId,
        })
        .from(incomes)
        .where(
          and(
            eq(incomes.orgId, orgId),
            eq(incomes.month, input.month),
            eq(incomes.year, input.year),
            sql`${incomes.unitId} IS NOT NULL`
          )
        );

      const paidUnitIds = new Set(paidUnits.map(p => p.unitId));

      // Filter units that haven't paid
      const missingPayments = occupiedUnits.filter(
        unit => !paidUnitIds.has(unit.unitId)
      );

      // Get building names for missing payments
      const missingPaymentsWithBuildings = await Promise.all(
        missingPayments.map(async unit => {
          const [building] = await db
            .select({ name: buildings.name })
            .from(buildings)
            .where(eq(buildings.id, unit.buildingId!));

          return {
            ...unit,
            buildingName: building?.name || 'Unknown Building',
          };
        })
      );

      return {
        missingPayments: missingPaymentsWithBuildings,
        totalMissing: missingPaymentsWithBuildings.length,
        totalExpectedAmount: missingPaymentsWithBuildings.reduce(
          (sum, unit) => sum + parseFloat(unit.monthlyFee?.toString() || '0'),
          0
        ),
      };
    }),
});
