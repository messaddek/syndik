import { PAGINATION, SORT_ORDERS, RESIDENT_SORT_FIELDS } from '@/constants';
import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsBoolean,
} from 'nuqs/server';

export const residentsFilterSearchParams = {
  page: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE)
    .withOptions({ clearOnDefault: true }),
  pageSize: parseAsInteger
    .withDefault(PAGINATION.DEFAULT_PAGE_SIZE)
    .withOptions({ clearOnDefault: true }),
  search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  unitId: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
  isOwner: parseAsBoolean.withOptions({ clearOnDefault: true }),
  isActive: parseAsBoolean
    .withDefault(true)
    .withOptions({ clearOnDefault: true }),
  sortBy: parseAsString
    .withDefault(RESIDENT_SORT_FIELDS.LAST_NAME)
    .withOptions({ clearOnDefault: true }),
  sortOrder: parseAsString
    .withDefault(SORT_ORDERS.ASC)
    .withOptions({ clearOnDefault: true }),
};

export const loadResidentsSearchParams = createLoader(
  residentsFilterSearchParams
);

// Transform the loaded params to match the component's expected types
export const transformResidentsParams = async (
  searchParams: Record<string, string | string[] | undefined>
) => {
  const params = await loadResidentsSearchParams(searchParams);
  return {
    ...params,
    isOwner: params.isOwner === null ? undefined : params.isOwner,
  };
};
