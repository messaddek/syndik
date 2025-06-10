'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Resident } from '@/modules/residents/types';
import { Unit } from '@/modules/units/types';
import { DataTable } from '@/components/ui/data-table';
import { createResidentsColumns } from './residents-columns';
import { RESIDENT_SORT_FIELDS } from '@/constants';
import { DataTableOnlySkeleton } from '@/components/ui/data-table-only-skeleton';

// Infer types from the actual data returned by tRPC
type PaginationData = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

type ResidentQueryResult = {
  data: Resident[];
  pagination: PaginationData;
};

type ResidentWithUnit = {
  id: string;
  unitId: string | null;
  orgId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  isOwner: boolean;
  moveInDate: string;
  moveOutDate: string | null;
  isActive: boolean;
  emergencyContact: string | null;
  emergencyPhone: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  unit?: {
    id: string;
    unitNumber: string;
    buildingId: string;
    building?: {
      name: string;
    };
  };
};

type ResidentsDataTableProps = {
  filters: {
    page: number;
    pageSize: number;
    search: string;
    unitId: string;
    isOwner?: boolean;
    isActive: boolean;
    sortBy: string;
    sortOrder: string;
  };
  onEdit: (resident: ResidentWithUnit) => void;
  onDelete: (id: string) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
};

export function ResidentsDataTable({
  filters,
  onEdit,
  onDelete,
  onPageChange,
  onPageSizeChange,
}: ResidentsDataTableProps) {
  // Initialize tRPC client
  const trpc = useTRPC();

  // Queries
  const { data: residentsData, isLoading: residentsLoading } = useQuery(
    trpc.residents.getAll.queryOptions({
      page: filters.page,
      pageSize: filters.pageSize,
      search: filters.search || undefined,
      unitId: filters.unitId || undefined,
      isOwner: filters.isOwner || undefined,
      isActive: filters.isActive,
      sortBy: RESIDENT_SORT_FIELDS[
        filters.sortBy as keyof typeof RESIDENT_SORT_FIELDS
      ] as 'firstName' | 'lastName' | 'email' | 'moveInDate',
      sortOrder: filters.sortOrder as 'asc' | 'desc',
    })
  );

  const { data: units = [] } = useQuery(trpc.units.getAll.queryOptions({}));

  // Transform data to include unit information
  const residentsWithUnits = useMemo(() => {
    const typedResidentsData = residentsData as unknown as ResidentQueryResult;
    if (!typedResidentsData?.data || !Array.isArray(units)) return [];

    return typedResidentsData.data.map((resident: Resident) => ({
      ...resident,
      unit: (units as unknown as Unit[]).find(
        (unit: Unit) => unit.id === resident.unitId
      ),
    })) as ResidentWithUnit[];
  }, [residentsData, units]);

  const columns = createResidentsColumns(onEdit, onDelete);

  if (residentsLoading) {
    return <DataTableOnlySkeleton />;
  }

  return (
    <DataTable
      columns={columns}
      data={residentsWithUnits}
      showSearch={false}
      pagination={(residentsData as unknown as ResidentQueryResult)?.pagination}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    />
  );
}
