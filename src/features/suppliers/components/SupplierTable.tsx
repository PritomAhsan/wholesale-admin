"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Supplier } from "@/types/supplier";
import SupplierActions from "./SupplierActions";
import SupplierStatusBadge from "./SupplierStatusBadge";

interface Props {
  suppliers: Supplier[];
  loading: boolean;
  error: string | null;
  onChanged: () => void;
}

export default function SupplierTable({
  suppliers,
  loading,
  error,
  onChanged,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Company</TableCell>

              <TableCell isHeader>Contact</TableCell>

              <TableCell isHeader>Business Type</TableCell>

              <TableCell isHeader>Products</TableCell>

              <TableCell isHeader>Status</TableCell>

              <TableCell
                isHeader
                className="text-right"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-gray-400">
                  Loading suppliers...
                </TableCell>
              </TableRow>
            )}

            {!loading && error && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-error-500">
                  {error}
                </TableCell>
              </TableRow>
            )}

            {!loading && !error && suppliers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-gray-400">
                  No suppliers found.
                </TableCell>
              </TableRow>
            )}

            {!loading && !error && suppliers.map((supplier) => (
              <TableRow key={supplier.uuid}>
                {/* Company */}
                <TableCell>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      {supplier.company_name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {supplier.email}
                    </p>
                  </div>
                </TableCell>

                {/* Contact */}
                <TableCell>
                  <div>
                    <p>{supplier.contact_person}</p>
                    <p className="text-sm text-gray-500">{supplier.phone}</p>
                  </div>
                </TableCell>

                {/* Business Type */}
                <TableCell className="capitalize">
                  {supplier.business_type}
                </TableCell>

                {/* Products */}
                <TableCell>
                  {supplier.products_count}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <SupplierStatusBadge
                    status={supplier.status}
                  />
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <SupplierActions
                    supplier={supplier}
                    onChanged={onChanged}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
