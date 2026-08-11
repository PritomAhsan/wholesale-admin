"use client";

import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AttributeStatusBadge from "./AttributeStatusBadge";
import AttributeActions from "./AttributeActions";

import { Attribute } from "@/types/attribute";
import { ServerPagination } from "@/types/server-table";

interface Props {
  attributes: Attribute[];
  pagination: ServerPagination;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onPageChange: (page: number) => void;
}

const TYPE_LABELS: Record<string, string> = {
  text: "Text",
  number: "Number",
  select: "Select",
  multiselect: "Multi-select",
  boolean: "Yes/No",
};

export default function AttributeTable({
  attributes,
  pagination,
  loading,
  error,
  onRefresh,
  onPageChange,
}: Props) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
        Loading attributes...
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

  if (attributes.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03]">
        No attributes found.
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
              <TableCell isHeader>Type</TableCell>
              <TableCell isHeader>Category</TableCell>
              <TableCell isHeader>Values</TableCell>
              <TableCell isHeader>Filterable</TableCell>
              <TableCell isHeader>Required</TableCell>
              <TableCell isHeader>Status</TableCell>
              <TableCell isHeader className="text-right">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {attributes.map((attribute) => (
              <TableRow key={attribute.uuid}>
                <TableCell>
                  <p className="font-medium text-gray-800 dark:text-white/90">
                    {attribute.name}
                  </p>
                  <p className="text-xs text-gray-500">{attribute.slug}</p>
                </TableCell>

                <TableCell>
                  {TYPE_LABELS[attribute.type] ?? attribute.type}
                </TableCell>

                <TableCell>{attribute.category?.name ?? "-"}</TableCell>

                <TableCell>
                  <Link
                    href={`/attributes/${attribute.uuid}/values`}
                    className="text-brand-600 hover:underline"
                  >
                    {attribute.values_count} values
                  </Link>
                </TableCell>

                <TableCell>
                  {attribute.is_filterable ? "Yes" : "No"}
                </TableCell>

                <TableCell>
                  {attribute.is_required ? "Yes" : "No"}
                </TableCell>

                <TableCell>
                  <AttributeStatusBadge status={attribute.status} />
                </TableCell>

                <TableCell className="text-right">
                  <AttributeActions
                    id={attribute.uuid}
                    name={attribute.name}
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
          <div className="text-sm text-gray-500">
            Showing page{" "}
            <span className="font-medium">{pagination.current_page}</span> of{" "}
            <span className="font-medium">{pagination.last_page}</span> (
            {pagination.total} attributes)
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={pagination.current_page === 1}
              onClick={() => onPageChange(pagination.current_page - 1)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={pagination.current_page === pagination.last_page}
              onClick={() => onPageChange(pagination.current_page + 1)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
