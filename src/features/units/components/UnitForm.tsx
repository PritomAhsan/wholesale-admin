"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";

import UnitService from "@/api/services/unit.service";

import { Unit } from "@/types/unit";

interface Props {
  mode?: "create" | "edit";
  initialData?: Unit;
}

export default function UnitForm({ mode = "create", initialData }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: initialData?.name ?? "",
    code: initialData?.code ?? "",
    symbol: initialData?.symbol ?? "",
    description: initialData?.description ?? "",
    sort_order: initialData?.sort_order ?? 0,
    status: initialData?.status ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      validationErrors.name = "Unit name is required.";
    }

    if (!form.code.trim()) {
      validationErrors.code = "Unit code is required.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        code: form.code,
        symbol: form.symbol || null,
        description: form.description || null,
        sort_order: form.sort_order,
        status: form.status,
      };

      if (mode === "create") {
        await UnitService.create(payload);
        toast.success("Unit created successfully.");
      } else {
        await UnitService.update(initialData!.uuid, payload);
        toast.success("Unit updated successfully.");
      }

      router.push("/units");
    } catch (error: any) {
      if (error.response?.status === 422) {
        const validationErrors = error.response.data.errors ?? {};

        const formattedErrors: Record<string, string> = {};

        Object.keys(validationErrors).forEach((key) => {
          formattedErrors[key] = validationErrors[key][0];
        });

        setErrors(formattedErrors);

        return;
      }

      toast.error(
        error.response?.data?.message ?? "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <Label>Unit Name *</Label>

          <InputField
            placeholder="e.g. Kilogram"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-error-500">{errors.name}</p>
          )}
        </div>

        <div>
          <Label>Code *</Label>

          <InputField
            placeholder="e.g. kg"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />

          {errors.code && (
            <p className="mt-1 text-sm text-error-500">{errors.code}</p>
          )}
        </div>

        <div>
          <Label>Symbol</Label>

          <InputField
            placeholder="e.g. kg"
            value={form.symbol}
            onChange={(e) => setForm({ ...form, symbol: e.target.value })}
          />
        </div>

        <div>
          <Label>Sort Order</Label>

          <InputField
            type="number"
            placeholder="0"
            value={String(form.sort_order)}
            onChange={(e) =>
              setForm({
                ...form,
                sort_order: Number(e.target.value) || 0,
              })
            }
          />
        </div>

        <div className="lg:col-span-2">
          <Label>Description</Label>

          <TextArea
            placeholder="Optional description"
            value={form.description}
            onChange={(value) =>
              setForm({ ...form, description: value })
            }
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch
            label="Active"
            checked={form.status}
            onChange={(checked) => setForm({ ...form, status: checked })}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
        <Button
          variant="outline"
          onClick={() => router.push("/units")}
        >
          Cancel
        </Button>

        <Button onClick={handleSave} disabled={loading}>
          {loading
            ? "Saving..."
            : mode === "create"
            ? "Create Unit"
            : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
