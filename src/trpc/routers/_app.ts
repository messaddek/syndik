import { accountsRouter } from '../../modules/accounts/server/procedures';
import { buildingsRouter } from '../../modules/buildings/server/procedures';
import { unitsRouter } from '../../modules/units/server/procedures';
import { residentsRouter } from '../../modules/residents/server/procedures';
import { incomesRouter } from '../../modules/incomes/server/procedures';
import { expensesRouter } from '../../modules/expenses/server/procedures';
import { meetingsRouter } from '../../modules/meetings/server/procedures';
import { dashboardRouter } from '../../modules/dashboard/server/procedures';
import { searchRouter } from '../../modules/search/server/procedures';
import { organizationsRouter } from '../../modules/organizations/server/procedures';
import { announcementsRouter } from '../../modules/announcements/server/procedures';
import { notificationsRouter } from '../../modules/notifications/server/procedures';
import { portalRouter } from '../../modules/portal/server/procedures';
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
  search: searchRouter,
  announcements: announcementsRouter,
  notifications: notificationsRouter,
  organizations: organizationsRouter,
  portal: portalRouter,
});

export type AppRouter = typeof appRouter;
