'use client';

import { useQueryState } from 'nuqs';
import { useMemo } from 'react';
import { helpdeskFilterSearchParams } from '../params';

export function useHelpdeskFilters(
  initialFilters?: Partial<{
    page: number;
    pageSize: number;
    search: string;
    buildingId: string;
    status: readonly string[];
    priority: readonly string[];
    category: readonly string[];
    sortBy: string;
    sortOrder: string;
  }>
) {
  const [page, setPage] = useQueryState(
    'page',
    helpdeskFilterSearchParams.page.withDefault(
      initialFilters?.page ?? helpdeskFilterSearchParams.page.defaultValue
    )
  );

  const [pageSize, setPageSize] = useQueryState(
    'pageSize',
    helpdeskFilterSearchParams.pageSize.withDefault(
      initialFilters?.pageSize ??
        helpdeskFilterSearchParams.pageSize.defaultValue
    )
  );

  const [search, setSearch] = useQueryState(
    'search',
    helpdeskFilterSearchParams.search.withDefault(
      initialFilters?.search ?? helpdeskFilterSearchParams.search.defaultValue
    )
  );

  const [buildingId, setBuildingId] = useQueryState(
    'buildingId',
    helpdeskFilterSearchParams.buildingId.withDefault(
      initialFilters?.buildingId ??
        helpdeskFilterSearchParams.buildingId.defaultValue
    )
  );
  const [status, setStatus] = useQueryState(
    'status',
    helpdeskFilterSearchParams.status
      .withDefault(
        (initialFilters?.status as string[]) ??
          helpdeskFilterSearchParams.status.defaultValue
      )
      .withOptions({ clearOnDefault: true })
  );

  const [priority, setPriority] = useQueryState(
    'priority',
    helpdeskFilterSearchParams.priority.withDefault(
      (initialFilters?.priority as string[]) ??
        helpdeskFilterSearchParams.priority.defaultValue
    )
  );

  const [category, setCategory] = useQueryState(
    'category',
    helpdeskFilterSearchParams.category.withDefault(
      (initialFilters?.category as string[]) ??
        helpdeskFilterSearchParams.category.defaultValue
    )
  );
  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    helpdeskFilterSearchParams.sortBy.withDefault(
      (initialFilters?.sortBy as
        | 'createdAt'
        | 'updatedAt'
        | 'priority'
        | 'status') ?? helpdeskFilterSearchParams.sortBy.defaultValue
    )
  );

  const [sortOrder, setSortOrder] = useQueryState(
    'sortOrder',
    helpdeskFilterSearchParams.sortOrder.withDefault(
      (initialFilters?.sortOrder as 'asc' | 'desc') ??
        helpdeskFilterSearchParams.sortOrder.defaultValue
    )
  );

  const filters = useMemo(
    () => ({
      page,
      pageSize,
      search,
      buildingId,
      status,
      priority,
      category,
      sortBy,
      sortOrder,
    }),
    [
      page,
      pageSize,
      search,
      buildingId,
      status,
      priority,
      category,
      sortBy,
      sortOrder,
    ]
  );

  const setFilters = useMemo(
    () => ({
      setPage,
      setPageSize,
      setSearch,
      setBuildingId,
      setStatus,
      setPriority,
      setCategory,
      setSortBy,
      setSortOrder,
    }),
    [
      setPage,
      setPageSize,
      setSearch,
      setBuildingId,
      setStatus,
      setPriority,
      setCategory,
      setSortBy,
      setSortOrder,
    ]
  );

  return [filters, setFilters] as const;
}
