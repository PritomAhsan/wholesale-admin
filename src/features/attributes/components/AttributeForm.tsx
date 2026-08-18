"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";

import AttributeService from "@/api/services/attribute.service";
import CategoryService from "@/api/services/category.service";

import { Attribute } from "@/types/attribute";

interface Props {
  mode?: "create" | "edit";
  initialData?: Attribute;
}

const TYPE_OPTIONS = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "select", label: "Select (single value)" },
  { value: "multiselect", label: "Multi-select" },
  { value: "boolean", label: "Yes / No" },
];

export default function AttributeForm({
  mode = "create",
  initialData,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    CategoryService.lookup()
      .then((categories: any[]) => {
        setCategoryOptions(
          categories.map((c) => ({
            value: String(c.id),
            label: c.name,
          }))
        );
      })
      .catch(() => {
        // Non-critical — category is optional, form still works
        // without the list loading.
      });
  }, []);

  const [form, setForm] = useState({
    category_id: initialData?.category?.id
      ? String(initialData.category.id)
      : "",
    name: initialData?.name ?? "",
    type: initialData?.type ?? "text",
    is_filterable: initialData?.is_filterable ?? false,
    is_required: initialData?.is_required ?? false,
    sort_order: initialData?.sort_order ?? 0,
    status: initialData?.status ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      validationErrors.name = "Attribute name is required.";
    }

    if (!form.type) {
      validationErrors.type = "Attribute type is required.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        category_id: form.category_id ? Number(form.category_id) : null,
        name: form.name,
        type: form.type,
        is_filterable: form.is_filterable,
        is_required: form.is_required,
        sort_order: form.sort_order,
        status: form.status,
      };

      if (mode === "create") {
        await AttributeService.create(payload);
        toast.success("Attribute created successfully.");
      } else {
        await AttributeService.update(initialData!.uuid, payload);
        toast.success("Attribute updated successfully.");
      }

      router.push("/attributes");
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

  const isSelectType =
    form.type === "select" || form.type === "multiselect";

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <Label>Attribute Name *</Label>

          <InputField
            placeholder="e.g. Color"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-error-500">{errors.name}</p>
          )}
        </div>

        <div>
          <Label>Type *</Label>

          <Select
            value={form.type}
            options={TYPE_OPTIONS}
            onChange={(value) => setForm({ ...form, type: value as any })}
          />

          {isSelectType && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Add the selectable values after saving, from the "Manage
              values" screen.
            </p>
          )}

          {errors.type && (
            <p className="mt-1 text-sm text-error-500">{errors.type}</p>
          )}
        </div>

        <div>
          <Label>Category</Label>

          <Select
            value={form.category_id}
            placeholder="Applies to all categories"
            options={[
              { value: "", label: "All categories" },
              ...categoryOptions,
            ]}
            onChange={(value) => setForm({ ...form, category_id: value })}
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

        <div className="flex items-center gap-3">
          <Switch
            label="Filterable (shown in storefront filters)"
            checked={form.is_filterable}
            onChange={(checked) =>
              setForm({ ...form, is_filterable: checked })
            }
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch
            label="Required on products"
            checked={form.is_required}
            onChange={(checked) =>
              setForm({ ...form, is_required: checked })
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
        <Button variant="outline" onClick={() => router.push("/attributes")}>
          Cancel
        </Button>

        <Button onClick={handleSave} disabled={loading}>
          {loading
            ? "Saving..."
            : mode === "create"
            ? "Create Attribute"
            : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
