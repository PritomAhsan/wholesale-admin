"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import UnitStatusBadge from "./UnitStatusBadge";
import UnitActions from "./UnitActions";

import { Unit } from "@/types/unit";
import { ServerPagination } from "@/types/server-table";

interface Props {
  units: Unit[];
  pagination: ServerPagination;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onPageChange: (page: number) => void;
}

export default function UnitTable({
  units,
  pagination,
  loading,
  error,
  onRefresh,
  onPageChange,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
        Loading units...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
        {error}
      </div>
    );
  }

  if (units.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:text-gray-400 dark:border-gray-800 dark:bg-white/[0.03]">
        No units found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Name</TableCell>
              <TableCell isHeader>Code</TableCell>
              <TableCell isHeader>Symbol</TableCell>
              <TableCell isHeader>Sort Order</TableCell>
              <TableCell isHeader>Status</TableCell>
              <TableCell isHeader>Created</TableCell>
              <TableCell isHeader className="text-right">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit.uuid}>
                <TableCell>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {unit.name}
                  </p>
                  {unit.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {unit.description}
                    </p>
                  )}
                </TableCell>

                <TableCell>{unit.code}</TableCell>

                <TableCell>{unit.symbol || "-"}</TableCell>

                <TableCell>{unit.sort_order}</TableCell>

                <TableCell>
                  <UnitStatusBadge status={unit.status} />
                </TableCell>

                <TableCell>
                  {new Date(unit.created_at).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <UnitActions
                    id={unit.uuid}
                    name={unit.name}
                    onDeleted={onRefresh}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination.last_page > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing page{" "}
            <span className="font-medium">{pagination.current_page}</span> of{" "}
            <span className="font-medium">{pagination.last_page}</span> (
            {pagination.total} units)
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={pagination.current_page === 1}
              onClick={() => onPageChange(pagination.current_page - 1)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={pagination.current_page === pagination.last_page}
              onClick={() => onPageChange(pagination.current_page + 1)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
