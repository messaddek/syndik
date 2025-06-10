import { PAGINATION, SORT_ORDERS, BUILDING_SORT_FIELDS } from '@/constants';
import { BUILDING_VIEWS } from './hooks/use-buildings-filters';
import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

export const buildingsFilterSearchParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
  search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  city: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  sortBy: parseAsString
    .withDefault(BUILDING_SORT_FIELDS.NAME)
    .withOptions({ clearOnDefault: true }),
  sortOrder: parseAsString
    .withDefault(SORT_ORDERS.ASC)
    .withOptions({ clearOnDefault: true }),
  view: parseAsString
    .withDefault(BUILDING_VIEWS.GRID)
    .withOptions({ clearOnDefault: true }),
};

export const loadBuildingsSearchParams = createLoader(
  buildingsFilterSearchParams
);

// Transform the loaded params to match the component's expected types
export const transformBuildingsParams = async (
  searchParams: Record<string, string | string[] | undefined>
) => {
  const params = await loadBuildingsSearchParams(searchParams);
  return params;
};
