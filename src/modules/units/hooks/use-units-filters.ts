import { PAGINATION, SORT_ORDERS, UNIT_SORT_FIELDS } from '@/constants';
import {
  parseAsInteger,
  parseAsString,
  parseAsBoolean,
  useQueryStates,
  parseAsStringEnum,
} from 'nuqs';

export const useUnitsFilters = () => {
  return useQueryStates({
    page: parseAsInteger
      .withDefault(PAGINATION.DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
    pageSize: parseAsInteger
      .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
      .withOptions({ clearOnDefault: true }),
    search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    buildingId: parseAsString
      .withDefault('')
      .withOptions({ clearOnDefault: true }),
    floor: parseAsInteger.withOptions({ clearOnDefault: true }),
    minBedrooms: parseAsInteger.withOptions({ clearOnDefault: true }),
    maxBedrooms: parseAsInteger.withOptions({ clearOnDefault: true }),
    minBathrooms: parseAsInteger.withOptions({ clearOnDefault: true }),
    maxBathrooms: parseAsInteger.withOptions({ clearOnDefault: true }),
    isOccupied: parseAsBoolean.withOptions({ clearOnDefault: true }),
    sortBy: parseAsStringEnum([
      UNIT_SORT_FIELDS.UNIT_NUMBER,
      UNIT_SORT_FIELDS.FLOOR,
      UNIT_SORT_FIELDS.AREA,
      UNIT_SORT_FIELDS.BEDROOMS,
      UNIT_SORT_FIELDS.BATHROOMS,
      UNIT_SORT_FIELDS.MONTHLY_FEE,
      UNIT_SORT_FIELDS.CREATED_AT,
    ])
      .withDefault(UNIT_SORT_FIELDS.UNIT_NUMBER)
      .withOptions({ clearOnDefault: true }),
    sortOrder: parseAsStringEnum([SORT_ORDERS.ASC, SORT_ORDERS.DESC])
      .withDefault(SORT_ORDERS.ASC)
      .withOptions({ clearOnDefault: true }),
  });
};
