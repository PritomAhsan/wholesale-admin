"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";

import dealService, { DealPayload } from "@/api/services/deal.service";
import { Deal } from "@/types/deal";

interface Props {
  mode: "create" | "edit";
  uuid?: string;
  initialData?: Deal;
}

const TYPE_OPTIONS = [
  { value: "flash", label: "Flash discount" },
  { value: "bulk", label: "Bulk pricing (quantity break)" },
  { value: "clearance", label: "Clearance" },
];

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

function toDateInput(value: string | null): string {
  if (!value) return "";
  return value.slice(0, 10);
}

export default function DealForm({ mode, uuid, initialData }: Props) {
  const router = useRouter();

  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    product_id: initialData?.product_id ? String(initialData.product_id) : "",
    type: (initialData?.type ?? "flash") as string,
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    discount_percent: initialData?.discount_percent ? String(initialData.discount_percent) : "",
    discount_price: initialData?.discount_price ?? "",
    min_quantity: initialData?.min_quantity ? String(initialData.min_quantity) : "",
    starts_at: toDateInput(initialData?.starts_at ?? null),
    ends_at: toDateInput(initialData?.ends_at ?? null),
    status: (initialData?.status ?? "active") as string,
  });

  useEffect(() => {
    dealService.lookupProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.product_id) {
      setError("Please select a product.");
      return;
    }

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload: DealPayload = {
        product_id: Number(form.product_id),
        type: form.type,
        title: form.title,
        description: form.description || undefined,
        discount_percent: form.discount_percent ? Number(form.discount_percent) : undefined,
        discount_price: form.discount_price ? Number(form.discount_price) : undefined,
        min_quantity: form.min_quantity ? Number(form.min_quantity) : undefined,
        starts_at: form.starts_at || undefined,
        ends_at: form.ends_at || undefined,
        status: form.status,
      };

      if (mode === "edit" && uuid) {
        await dealService.update(uuid, payload);
      } else {
        await dealService.create(payload);
      }

      router.push("/deals");
    } catch {
      setError("Unable to save deal. Please check the fields and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-600">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">Deal Basics</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label>Product</Label>
            <Select
              placeholder="Select a product"
              value={form.product_id}
              options={products.map((p) => ({ value: String(p.id), label: p.name }))}
              onChange={(value) => update("product_id", String(value))}
            />
          </div>

          <div>
            <Label>Deal Type</Label>
            <Select
              placeholder="Select type"
              value={form.type}
              options={TYPE_OPTIONS}
              onChange={(value) => update("type", String(value))}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Title</Label>
            <InputField
              placeholder="e.g. Flash discount on Wireless Earbuds"
              defaultValue={form.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Description</Label>
            <TextArea
              rows={3}
              placeholder="Shown to buyers on the deal card"
              defaultValue={form.description}
              onChange={(value) => update("description", value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">Pricing</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label>Discount Percent</Label>
            <InputField
              type="number"
              placeholder="e.g. 15"
              defaultValue={form.discount_percent}
              onChange={(e) => update("discount_percent", e.target.value)}
            />
          </div>

          <div>
            <Label>Discount Price (overrides percent)</Label>
            <InputField
              type="number"
              placeholder="Fixed price instead of a percent"
              defaultValue={form.discount_price}
              onChange={(e) => update("discount_price", e.target.value)}
            />
          </div>

          <div>
            <Label>Minimum Quantity (bulk deals only)</Label>
            <InputField
              type="number"
              placeholder="e.g. 50"
              defaultValue={form.min_quantity}
              onChange={(e) => update("min_quantity", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">Schedule &amp; Status</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <Label>Starts</Label>
            <InputField
              type="date"
              defaultValue={form.starts_at}
              onChange={(e) => update("starts_at", e.target.value)}
            />
          </div>

          <div>
            <Label>Ends</Label>
            <InputField
              type="date"
              defaultValue={form.ends_at}
              onChange={(e) => update("ends_at", e.target.value)}
            />
          </div>

          <div>
            <Label>Status</Label>
            <Select
              placeholder="Select status"
              value={form.status}
              options={STATUS_OPTIONS}
              onChange={(value) => update("status", String(value))}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>

        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : mode === "edit" ? "Update Deal" : "Create Deal"}
        </Button>
      </div>
    </div>
  );
}
