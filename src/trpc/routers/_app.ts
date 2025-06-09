import { accountsRouter } from '../../modules/accounts/server/procedures';
import { buildingsRouter } from '../../modules/buildings/server/procedures';
import { unitsRouter } from '../../modules/units/server/procedures';
import { residentsRouter } from '../../modules/residents/server/procedures';
import { incomesRouter } from '../../modules/incomes/server/procedures';
import { expensesRouter } from '../../modules/expenses/server/procedures';
import { meetingsRouter } from '../../modules/meetings/server/procedures';
import { dashboardRouter } from '../../modules/dashboard/server/procedures';
import { createTRPCRouter } from '@/trpc/init';

export const appRouter = createTRPCRouter({
  accounts: accountsRouter,
  buildings: buildingsRouter,
  units: unitsRouter,
  residents: residentsRouter,
  incomes: incomesRouter,
  expenses: expensesRouter,
  meetings: meetingsRouter,
  dashboard: dashboardRouter,
});

export type AppRouter = typeof appRouter;
