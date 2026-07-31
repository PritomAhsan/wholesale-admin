"use client";

import Image from "next/image";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { brands } from "../data/brands";
import BrandActions from "./BrandActions";
import BrandStatusBadge from "./BrandStatusBadge";

export default function BrandTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>
                Brand
              </TableCell>
              <TableCell isHeader>
                Slug
              </TableCell>
              <TableCell isHeader>
                Products
              </TableCell>
              <TableCell isHeader>
                Status
              </TableCell>
              <TableCell isHeader>
                Created
              </TableCell>
              <TableCell
                isHeader
                className="text-right"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={44}
                      height={44}
                      className="rounded-lg border"
                    />

                    <span className="font-medium">
                      {brand.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  {brand.slug}
                </TableCell>

                <TableCell>
                  {brand.productCount}
                </TableCell>

                <TableCell>
                  <BrandStatusBadge
                    status={brand.status}
                  />
                </TableCell>

                <TableCell>
                  {brand.createdAt}
                </TableCell>

                <TableCell className="text-right">
                  <BrandActions
                    id={brand.id}
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