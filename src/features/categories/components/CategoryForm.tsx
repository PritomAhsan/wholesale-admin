"use client";

import { useState } from "react";

import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";

import CategoryImageUpload from "./CategoryImageUpload";
import { Category } from "../types";

interface Props {
  mode?: "create" | "edit";
  initialData?: Category;
}

export default function CategoryForm({
  mode = "create",
  initialData,
}: Props) {

    const router = useRouter();

const [loading, setLoading] = useState(false);

const [form, setForm] = useState({
  name: initialData?.name ?? "",
  slug: initialData?.slug ?? "",
  parent: initialData?.parentId?.toString() ?? "",
  description: "",
  status: initialData?.status === "active",
});

  const [errors, setErrors] = useState({
  name: "",
  slug: "",
});

const validateForm = () => {
  const newErrors = {
    name: "",
    slug: "",
  };

  let valid = true;

  if (!form.name.trim()) {
    newErrors.name = "Category name is required.";
    valid = false;
  }

  if (!form.slug.trim()) {
    newErrors.slug = "Slug is required.";
    valid = false;
  }

  setErrors(newErrors);

  return valid;
};

const handleSave = async () => {
  if (!validateForm()) return;

  try {
    setLoading(true);

    // TODO:
    // Replace with Laravel API during Phase 9

    console.log("Category Saved", form);

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    alert(
  mode === "edit"
    ? "Category updated successfully."
    : "Category created successfully."
);

    router.push("/categories");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <Label>Category Name</Label>

          <InputField
  placeholder="Enter category name"
  defaultValue={form.name}
  onChange={(e) =>
    setForm({
      ...form,
      name: e.target.value,
    })
  }
/>

{errors.name && (
  <p className="mt-1 text-sm text-error-500">
    {errors.name}
  </p>
)}
        </div>

        <div>
          <Label>Slug</Label>

          <InputField
  placeholder="category-slug"
  defaultValue={form.slug}
  onChange={(e) =>
    setForm({
      ...form,
      slug: e.target.value,
    })
  }
/>

{errors.slug && (
  <p className="mt-1 text-sm text-error-500">
    {errors.slug}
  </p>
)}
        </div>

        <div className="lg:col-span-2">
          <Label>Parent Category</Label>

          <Select
            placeholder="Select parent category"
            options={[
              {
                value: "",
                label: "None",
              },
              {
                value: "1",
                label: "Electronics",
              },
              {
                value: "4",
                label: "Fashion",
              },
              {
                value: "7",
                label: "Home & Kitchen",
              },
            ]}
            onChange={() => {}}
          />
        </div>

        <div className="lg:col-span-2">
          <Label>Description</Label>

          <TextArea
            rows={5}
            placeholder="Enter category description"
            defaultValue={form.description}
          />
        </div>

        <div className="lg:col-span-2">
          <Label>Status</Label>

          <div className="mt-3">
            <Switch label="" defaultChecked={form.status} />
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="pt-2">
  <CategoryImageUpload />
</div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
        <Button
  variant="outline"
  onClick={() => router.back()}
>
  Cancel
</Button>

        <Button
  onClick={handleSave}
  disabled={loading}
>
  {loading
  ? mode === "edit"
    ? "Updating..."
    : "Saving..."
  : mode === "edit"
  ? "Update Category"
  : "Save Category"}
</Button>
      </div>
    </div>
  );
}