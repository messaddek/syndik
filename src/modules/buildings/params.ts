import { PAGINATION, SORT_ORDERS, BUILDING_SORT_FIELDS } from '@/constants';
import { BUILDING_VIEWS } from './hooks/use-buildings-filters';
import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from 'nuqs/server';

export const buildingsFilterSearchParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
  search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  city: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  sortBy: parseAsStringEnum([
    BUILDING_SORT_FIELDS.NAME,
    BUILDING_SORT_FIELDS.CITY,
    BUILDING_SORT_FIELDS.TOTAL_UNITS,
    BUILDING_SORT_FIELDS.CREATED_AT,
  ])
    .withDefault(BUILDING_SORT_FIELDS.NAME)
    .withOptions({ clearOnDefault: true }),
  sortOrder: parseAsStringEnum([SORT_ORDERS.ASC, SORT_ORDERS.DESC])
    .withDefault(SORT_ORDERS.ASC)
    .withOptions({ clearOnDefault: true }),
  view: parseAsStringEnum([BUILDING_VIEWS.GRID, BUILDING_VIEWS.TABLE])
    .withDefault(BUILDING_VIEWS.GRID)
    .withOptions({ clearOnDefault: true }),
};

export const loadBuildingsSearchParams = createLoader(
  buildingsFilterSearchParams
);
