"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";
import { Brand } from "../types";

import BrandLogoUpload from "./BrandLogoUpload";

interface Props {
  mode?: "create" | "edit";
  initialData?: Brand;
}

export default function BrandForm({
  mode = "create",
  initialData,
}: Props) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

const [form, setForm] = useState({
  name: initialData?.name ?? "",
  slug: initialData?.slug ?? "",
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
      newErrors.name = "Brand name is required.";
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

      console.log(form);

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      alert(
  mode === "edit"
    ? "Brand updated successfully."
    : "Brand created successfully."
);

      router.push("/brands");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <Label>Brand Name</Label>

          <InputField
            defaultValue={form.name}
            placeholder="Enter brand name"
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
            defaultValue={form.slug}
            placeholder="brand-slug"
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

        <div>
          <Label>Description</Label>

          <TextArea
            rows={5}
            defaultValue={form.description}
            placeholder="Brand description"
          />
        </div>

        <div>
          <Label>Status</Label>

          <div className="mt-3">
            <Switch label="" defaultChecked={form.status} />
          </div>
        </div>
      </div>

      <BrandLogoUpload />

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
    ? "Update Brand"
    : "Save Brand"}
        </Button>
      </div>
    </div>
  );
}