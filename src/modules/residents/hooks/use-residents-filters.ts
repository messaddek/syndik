import { PAGINATION, SORT_ORDERS, RESIDENT_SORT_FIELDS } from '@/constants';
import {
  parseAsInteger,
  parseAsString,
  parseAsBoolean,
  useQueryStates,
} from 'nuqs';

type InitialFilters = {
  page?: number;
  pageSize?: number;
  search?: string;
  unitId?: string;
  isOwner?: boolean;
  isActive?: boolean;
  sortBy?: string;
  sortOrder?: string;
};

export const useResidentsFilters = (initialValues?: InitialFilters) => {
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
    unitId: parseAsString
      .withDefault(initialValues?.unitId ?? '')
      .withOptions({ clearOnDefault: true }),
    isOwner: parseAsBoolean.withOptions({ clearOnDefault: true }),
    isActive: parseAsBoolean
      .withDefault(initialValues?.isActive ?? true)
      .withOptions({ clearOnDefault: true }),
    sortBy: parseAsString
      .withDefault(initialValues?.sortBy ?? RESIDENT_SORT_FIELDS.LAST_NAME)
      .withOptions({ clearOnDefault: true }),
    sortOrder: parseAsString
      .withDefault(initialValues?.sortOrder ?? SORT_ORDERS.ASC)
      .withOptions({ clearOnDefault: true }),
  });
};
