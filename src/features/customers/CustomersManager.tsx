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
import customerService from "@/api/services/customer.service";
import { Customer } from "@/types/customer";

export default function CustomersManager() {
  const table = useServerTable<Customer>({
    fetcher: customerService.getAll,
  });

  return (
    <ComponentCard
      title="Customers"
      desc="Registered buyer accounts."
    >
      <div className="mb-6 max-w-sm">
        <InputField
          placeholder="Search by name or email..."
          value={table.query.search}
          onChange={(e) => table.search(e.target.value)}
        />
      </div>

      {table.loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          Loading customers...
        </div>
      ) : table.error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center text-red-600 dark:border-red-900 dark:bg-red-950/30">
          {table.error}
        </div>
      ) : table.items.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:text-gray-400 dark:border-gray-800 dark:bg-white/[0.03]">
          No customers found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell isHeader>Name</TableCell>
                  <TableCell isHeader>Email</TableCell>
                  <TableCell isHeader>Phone</TableCell>
                  <TableCell isHeader>Orders</TableCell>
                  <TableCell isHeader>Joined</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody>
                {table.items.map((customer) => (
                  <TableRow key={customer.uuid}>
                    <TableCell className="font-medium text-gray-800 dark:text-white/90">
                      {customer.full_name}
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone ?? "—"}</TableCell>
                    <TableCell>{customer.orders_count}</TableCell>
                    <TableCell>
                      {new Date(customer.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {table.pagination.last_page > 1 && (
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Page {table.pagination.current_page} of{" "}
                {table.pagination.last_page} ({table.pagination.total} customers)
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={table.pagination.current_page === 1}
                  onClick={() => table.changePage(table.pagination.current_page - 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={table.pagination.current_page === table.pagination.last_page}
                  onClick={() => table.changePage(table.pagination.current_page + 1)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
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
