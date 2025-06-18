// Application-wide constants
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  MIN_PAGE_SIZE: 1,
  MAX_PAGE_SIZE: 100,
} as const;

export const SORT_ORDERS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const RESIDENT_SORT_FIELDS = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  EMAIL: 'email',
  MOVE_IN_DATE: 'moveInDate',
} as const;

export const BUILDING_SORT_FIELDS = {
  NAME: 'name',
  CITY: 'city',
  TOTAL_UNITS: 'totalUnits',
  CREATED_AT: 'createdAt',
} as const;

export const UNIT_SORT_FIELDS = {
  UNIT_NUMBER: 'unitNumber',
  FLOOR: 'floor',
  AREA: 'area',
  BEDROOMS: 'bedrooms',
  BATHROOMS: 'bathrooms',
  MONTHLY_FEE: 'monthlyFee',
  CREATED_AT: 'createdAt',
} as const;
