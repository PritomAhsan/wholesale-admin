"use client";

import { useCallback, useState } from "react";

import ComponentCard from "@/components/common/ComponentCard";
import InputField from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useServerTable } from "@/hooks/useServerTable";
import { ServerTableQuery } from "@/types/server-table";
import contactMessageService from "@/api/services/contact-message.service";
import { ContactMessage } from "@/types/contact-message";

import ContactMessageStatusButton from "./components/ContactMessageStatusButton";

export default function ContactMessagesManager() {
  const [statusFilter, setStatusFilter] = useState("");

  const fetcher = useCallback(
    (params: ServerTableQuery) =>
      contactMessageService.getAll({
        page: params.page,
        per_page: params.per_page,
        search: params.search,
        status: statusFilter,
      }),
    [statusFilter]
  );

  const table = useServerTable<ContactMessage>({ fetcher });

  return (
    <ComponentCard
      title="Contact Messages"
      desc="Support requests submitted from the storefront contact form."
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="w-full max-w-sm">
          <InputField
            placeholder="Search by name, email or message..."
            value={table.query.search}
            onChange={(e) => table.search(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-48">
          <Select
            placeholder="All Status"
            value={statusFilter}
            options={[
              { value: "", label: "All Status" },
              { value: "open", label: "Open" },
              { value: "resolved", label: "Resolved" },
            ]}
            onChange={(value) => setStatusFilter(String(value))}
          />
        </div>
      </div>

      {table.loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          Loading messages...
        </div>
      ) : table.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
          {table.error}
        </div>
      ) : table.items.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03]">
          No messages found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>From</TableCell>
                  <TableCell isHeader>Topic</TableCell>
                  <TableCell isHeader>Message</TableCell>
                  <TableCell isHeader>Status</TableCell>
                  <TableCell isHeader>Received</TableCell>
                  <TableCell isHeader className="text-right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {table.items.map((msg) => (
                  <TableRow key={msg.uuid}>
                    <TableCell>
                      <p className="font-medium text-gray-800 dark:text-white/90">
                        {msg.name}
                      </p>
                      <p className="text-sm text-gray-500">{msg.business_email}</p>
                    </TableCell>

                    <TableCell className="capitalize">
                      {msg.topic.replace(/_/g, " ")}
                    </TableCell>

                    <TableCell className="max-w-xs">
                      <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                        {msg.message}
                      </p>
                    </TableCell>

                    <TableCell>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          msg.status === "open"
                            ? "bg-warning-50 text-warning-600 dark:bg-warning-500/15"
                            : "bg-success-50 text-success-600 dark:bg-success-500/15"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </TableCell>

                    <TableCell>
                      {new Date(msg.created_at).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right">
                      <ContactMessageStatusButton message={msg} onChanged={table.refresh} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {table.pagination.last_page > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
              <div className="text-sm text-gray-500">
                Page {table.pagination.current_page} of{" "}
                {table.pagination.last_page} ({table.pagination.total} messages)
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={table.pagination.current_page === 1}
                  onClick={() => table.changePage(table.pagination.current_page - 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={table.pagination.current_page === table.pagination.last_page}
                  onClick={() => table.changePage(table.pagination.current_page + 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </ComponentCard>
  );
}
