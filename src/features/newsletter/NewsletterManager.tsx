"use client";

import ComponentCard from "@/components/common/ComponentCard";
import InputField from "@/components/form/input/InputField";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useServerTable } from "@/hooks/useServerTable";
import newsletterService from "@/api/services/newsletter.service";
import { NewsletterSubscriber } from "@/types/newsletter";

export default function NewsletterManager() {
  const table = useServerTable<NewsletterSubscriber>({
    fetcher: newsletterService.getAll,
  });

  return (
    <ComponentCard
      title="Newsletter Subscribers"
      desc="Real subscriptions submitted from the storefront newsletter form."
    >
      <div className="mb-6 max-w-sm">
        <InputField
          placeholder="Search by email..."
          value={table.query.search}
          onChange={(e) => table.search(e.target.value)}
        />
      </div>

      {table.loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          Loading subscribers...
        </div>
      ) : table.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
          {table.error}
        </div>
      ) : table.items.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03]">
          No subscribers yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Email</TableCell>
                  <TableCell isHeader>Topics</TableCell>
                  <TableCell isHeader>Frequency</TableCell>
                  <TableCell isHeader>Subscribed</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {table.items.map((sub) => (
                  <TableRow key={sub.uuid}>
                    <TableCell>{sub.email}</TableCell>
                    <TableCell className="capitalize text-sm text-gray-500">
                      {sub.topics?.length
                        ? sub.topics.map((t) => t.replace(/_/g, " ")).join(", ")
                        : "—"}
                    </TableCell>
                    <TableCell className="capitalize">
                      {sub.frequency.replace(/_/g, " ")}
                    </TableCell>
                    <TableCell>
                      {sub.subscribed_at
                        ? new Date(sub.subscribed_at).toLocaleDateString()
                        : "—"}
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
                {table.pagination.last_page} ({table.pagination.total} subscribers)
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
