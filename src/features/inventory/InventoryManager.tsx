"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Boxes, DollarSign, PackageX } from "lucide-react";

import ComponentCard from "@/components/common/ComponentCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import inventoryService from "@/api/services/inventory.service";
import {
  InventoryDashboard,
  InventoryTransaction,
  InventoryVariantSummary,
} from "@/types/inventory";

type Tab = "low-stock" | "out-of-stock" | "transactions";

export default function InventoryManager() {
  const [dashboard, setDashboard] = useState<InventoryDashboard | null>(null);
  const [tab, setTab] = useState<Tab>("low-stock");

  const [lowStock, setLowStock] = useState<InventoryVariantSummary[]>([]);
  const [outOfStock, setOutOfStock] = useState<InventoryVariantSummary[]>([]);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    inventoryService.dashboard().then(setDashboard);
  }, []);

  useEffect(() => {
    setLoading(true);

    const load =
      tab === "low-stock"
        ? inventoryService.lowStock().then(setLowStock)
        : tab === "out-of-stock"
        ? inventoryService.outOfStock().then(setOutOfStock)
        : inventoryService.recentTransactions().then(setTransactions);

    load.finally(() => setLoading(false));
  }, [tab]);

  return (
    <ComponentCard
      title="Inventory"
      desc="Stock levels, valuation and recent movement across all product variants."
    >
      {dashboard && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            icon={<Boxes className="h-5 w-5 text-brand-500" />}
            label="Total Stock"
            value={Number(dashboard.total_stock).toLocaleString()}
          />
          <StatTile
            icon={<DollarSign className="h-5 w-5 text-success-500" />}
            label="Inventory Value"
            value={`$${Number(dashboard.inventory_value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          />
          <StatTile
            icon={<AlertTriangle className="h-5 w-5 text-warning-500" />}
            label="Low Stock Variants"
            value={String(dashboard.low_stock)}
          />
          <StatTile
            icon={<PackageX className="h-5 w-5 text-error-500" />}
            label="Out of Stock"
            value={String(dashboard.out_of_stock)}
          />
        </div>
      )}

      <div className="mb-6 flex gap-2 border-b border-gray-200 dark:border-gray-800">
        <TabButton active={tab === "low-stock"} onClick={() => setTab("low-stock")}>
          Low Stock
        </TabButton>
        <TabButton active={tab === "out-of-stock"} onClick={() => setTab("out-of-stock")}>
          Out of Stock
        </TabButton>
        <TabButton active={tab === "transactions"} onClick={() => setTab("transactions")}>
          Recent Transactions
        </TabButton>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-white/[0.03]">
          Loading...
        </div>
      ) : tab === "transactions" ? (
        <TransactionsTable transactions={transactions} />
      ) : (
        <VariantsTable variants={tab === "low-stock" ? lowStock : outOfStock} />
      )}
    </ComponentCard>
  );
}

function StatTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/5">
        {icon}
      </div>
      <p className="mt-3 text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{value}</p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`border-b-2 px-4 py-3 text-sm font-medium transition ${
        active
          ? "border-brand-500 text-brand-500"
          : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      }`}
    >
      {children}
    </button>
  );
}

function VariantsTable({ variants }: { variants: InventoryVariantSummary[] }) {
  if (variants.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03]">
        Nothing here.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Product</TableCell>
              <TableCell isHeader>SKU</TableCell>
              <TableCell isHeader>Stock</TableCell>
              <TableCell isHeader>Low Stock Threshold</TableCell>
              <TableCell isHeader>Inventory Value</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {variants.map((v) => (
              <TableRow key={v.variant_uuid}>
                <TableCell className="font-medium text-gray-800 dark:text-white/90">
                  {v.product ?? "—"}
                </TableCell>
                <TableCell>{v.sku}</TableCell>
                <TableCell>{v.stock_quantity}</TableCell>
                <TableCell>{v.low_stock_quantity}</TableCell>
                <TableCell>
                  ${Number(v.inventory_value).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function TransactionsTable({ transactions }: { transactions: InventoryTransaction[] }) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 dark:border-gray-800 dark:bg-white/[0.03]">
        No recent transactions.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>Type</TableCell>
              <TableCell isHeader>Movement</TableCell>
              <TableCell isHeader>Quantity</TableCell>
              <TableCell isHeader>Before → After</TableCell>
              <TableCell isHeader>By</TableCell>
              <TableCell isHeader>When</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.uuid}>
                <TableCell className="capitalize">{t.transaction_type}</TableCell>
                <TableCell className="capitalize">{t.movement_type}</TableCell>
                <TableCell>{t.quantity}</TableCell>
                <TableCell>
                  {t.stock_before} → {t.stock_after}
                </TableCell>
                <TableCell>{t.created_by ?? "—"}</TableCell>
                <TableCell>{new Date(t.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
