import { PAGINATION, SORT_ORDERS, RESIDENT_SORT_FIELDS } from '@/constants';
import {
  parseAsInteger,
  parseAsString,
  parseAsBoolean,
  useQueryStates,
  parseAsStringEnum,
} from 'nuqs';

export const useResidentsFilters = () => {
  return useQueryStates({
    page: parseAsInteger
      .withDefault(PAGINATION.DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
    pageSize: parseAsInteger
      .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
      .withOptions({ clearOnDefault: true }),
    search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    unitId: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    isOwner: parseAsBoolean.withOptions({ clearOnDefault: true }),
    isActive: parseAsBoolean.withOptions({ clearOnDefault: true }),
    sortBy: parseAsStringEnum([
      RESIDENT_SORT_FIELDS.FIRST_NAME,
      RESIDENT_SORT_FIELDS.LAST_NAME,
      RESIDENT_SORT_FIELDS.EMAIL,
      RESIDENT_SORT_FIELDS.MOVE_IN_DATE,
    ])
      .withDefault(RESIDENT_SORT_FIELDS.LAST_NAME)
      .withOptions({ clearOnDefault: true }),
    sortOrder: parseAsStringEnum([SORT_ORDERS.ASC, SORT_ORDERS.DESC])
      .withDefault(SORT_ORDERS.ASC)
      .withOptions({ clearOnDefault: true }),
  });
};
