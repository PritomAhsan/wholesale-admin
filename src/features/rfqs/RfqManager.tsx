"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Eye, RefreshCw, Search } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";
import InputField from "@/components/form/input/InputField";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import RfqService from "@/api/services/rfq.service";
import { Rfq } from "@/types/rfq";
import { ServerPagination } from "@/types/server-table";

import RfqStatusBadge from "./components/RfqStatusBadge";

export default function RfqManager() {
  const [rfqs, setRfqs] = useState<Rfq[]>([]);
  const [pagination, setPagination] = useState<ServerPagination>({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);

      const response = await RfqService.getAll({
        page,
        search: search || undefined,
        status: status || undefined,
      });

      setRfqs(response.items);
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Unable to load RFQs.");
    } finally {
      setLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ComponentCard
      title="RFQs"
      desc="Buyer requests for quotation."
    >
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
          {pagination.total} RFQs
        </h4>

        <Button variant="outline" onClick={load}>
          <RefreshCw size={16} className="mr-2" />
          Refresh
        </Button>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <InputField
            placeholder="Search product, buyer or email..."
            className="pl-11"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            placeholder="Status"
            value={status}
            options={[
              { value: "", label: "All Status" },
              { value: "pending", label: "Pending" },
              { value: "quoted", label: "Quoted" },
              { value: "accepted", label: "Accepted" },
              { value: "rejected", label: "Rejected" },
              { value: "closed", label: "Closed" },
            ]}
            onChange={(value) => {
              setPage(1);
              setStatus(value);
            }}
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell isHeader>Product</TableCell>
                <TableCell isHeader>Buyer</TableCell>
                <TableCell isHeader>Quantity</TableCell>
                <TableCell isHeader>Destination</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Submitted</TableCell>
                <TableCell isHeader className="text-right">Actions</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-gray-400">
                    Loading RFQs...
                  </TableCell>
                </TableRow>
              )}

              {!loading && error && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-error-500">
                    {error}
                  </TableCell>
                </TableRow>
              )}

              {!loading && !error && rfqs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-gray-400">
                    No RFQs found.
                  </TableCell>
                </TableRow>
              )}

              {!loading && !error && rfqs.map((rfq) => (
                <TableRow key={rfq.uuid}>
                  <TableCell>
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      {rfq.product_name}
                    </p>
                  </TableCell>

                  <TableCell>
                    <div>
                      <p>{rfq.contact_name}</p>
                      <p className="text-sm text-gray-500">{rfq.contact_email}</p>
                    </div>
                  </TableCell>

                  <TableCell>
                    {rfq.quantity} {rfq.unit}
                  </TableCell>

                  <TableCell>{rfq.destination_country}</TableCell>

                  <TableCell>
                    <RfqStatusBadge status={rfq.status} />
                  </TableCell>

                  <TableCell className="text-gray-500">
                    {new Date(rfq.created_at).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <Link
                      href={`/rfqs/${rfq.uuid}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </ComponentCard>
  );
}
