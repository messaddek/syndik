import { PAGINATION, SORT_ORDERS, BUILDING_SORT_FIELDS } from '@/constants';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

export const BUILDING_VIEWS = {
  GRID: 'grid',
  TABLE: 'table',
} as const;

type InitialFilters = {
  page?: number;
  pageSize?: number;
  search?: string;
  city?: string;
  sortBy?: string;
  sortOrder?: string;
  view?: string;
};

export const useBuildingsFilters = (initialValues?: InitialFilters) => {
  return useQueryStates({
    page: parseAsInteger
      .withDefault(initialValues?.page ?? PAGINATION.DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
    pageSize: parseAsInteger
      .withDefault(initialValues?.pageSize ?? PAGINATION.DEFAULT_PAGE_SIZE)
      .withOptions({ clearOnDefault: true }),
    search: parseAsString
      .withDefault(initialValues?.search ?? '')
      .withOptions({ clearOnDefault: true }),
    city: parseAsString
      .withDefault(initialValues?.city ?? '')
      .withOptions({ clearOnDefault: true }),
    sortBy: parseAsString
      .withDefault(initialValues?.sortBy ?? BUILDING_SORT_FIELDS.NAME)
      .withOptions({ clearOnDefault: true }),
    sortOrder: parseAsString
      .withDefault(initialValues?.sortOrder ?? SORT_ORDERS.ASC)
      .withOptions({ clearOnDefault: true }),
    view: parseAsString
      .withDefault(initialValues?.view ?? BUILDING_VIEWS.GRID)
      .withOptions({ clearOnDefault: true }),
  });
};
