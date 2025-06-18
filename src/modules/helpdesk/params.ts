import { PAGINATION, SORT_ORDERS } from '@/constants';
import {
  createLoader,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  parseAsArrayOf,
} from 'nuqs/server';

export const TICKET_STATUS_VALUES = [
  'open',
  'in_progress',
  'resolved',
  'closed',
];

export const TICKET_PRIORITY_VALUES = ['low', 'medium', 'high', 'urgent'];

export const TICKET_CATEGORY_VALUES = [
  'maintenance',
  'complaint',
  'inquiry',
  'billing',
  'security',
  'parking',
  'noise',
  'cleaning',
  'other',
];

export const TICKET_SORT_FIELDS = {
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  PRIORITY: 'priority',
  STATUS: 'status',
} as const;

export const helpdeskFilterSearchParams = {
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
  status: parseAsArrayOf(parseAsStringEnum(TICKET_STATUS_VALUES))
    .withDefault([])
    .withOptions({ clearOnDefault: true }),
  priority: parseAsArrayOf(parseAsStringEnum(TICKET_PRIORITY_VALUES))
    .withDefault([])
    .withOptions({ clearOnDefault: true }),
  category: parseAsArrayOf(parseAsStringEnum(TICKET_CATEGORY_VALUES))
    .withDefault([])
    .withOptions({ clearOnDefault: true }),
  sortBy: parseAsStringEnum([
    TICKET_SORT_FIELDS.CREATED_AT,
    TICKET_SORT_FIELDS.UPDATED_AT,
    TICKET_SORT_FIELDS.PRIORITY,
    TICKET_SORT_FIELDS.STATUS,
  ])
    .withDefault(TICKET_SORT_FIELDS.CREATED_AT)
    .withOptions({ clearOnDefault: true }),
  sortOrder: parseAsStringEnum([SORT_ORDERS.ASC, SORT_ORDERS.DESC])
    .withDefault(SORT_ORDERS.DESC)
    .withOptions({ clearOnDefault: true }),
};

export const loadHelpdeskSearchParams = createLoader(
  helpdeskFilterSearchParams
);
