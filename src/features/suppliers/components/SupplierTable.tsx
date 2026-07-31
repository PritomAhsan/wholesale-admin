"use client";

import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { suppliers } from "../data/suppliers";
import SupplierActions from "./SupplierActions";
import SupplierStatusBadge from "./SupplierStatusBadge";
import SupplierVerificationBadge from "./SupplierVerificationBadge";

export default function SupplierTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Company</TableCell>

              <TableCell isHeader>Contact</TableCell>

              <TableCell isHeader>Email</TableCell>

              <TableCell isHeader>Country</TableCell>

              <TableCell isHeader>Products</TableCell>

              <TableCell isHeader>Verification</TableCell>

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
            {suppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                {/* Company */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={supplier.logo}
                      alt={supplier.companyName}
                      width={44}
                      height={44}
                      className="rounded-lg border border-gray-200 object-cover"
                    />

                    <div>
                      <p className="font-medium text-gray-800 dark:text-white/90">
                        {supplier.companyName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {supplier.slug}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Contact */}
                <TableCell>
                  {supplier.contactPerson}
                </TableCell>

                {/* Email */}
                <TableCell>
                  {supplier.email}
                </TableCell>

                {/* Country */}
                <TableCell>
                  {supplier.country}
                </TableCell>

                {/* Products */}
                <TableCell>
                  {supplier.productCount}
                </TableCell>

                {/* Verification */}
                <TableCell>
                  <SupplierVerificationBadge
                    status={supplier.verificationStatus}
                  />
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
                    id={supplier.id}
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