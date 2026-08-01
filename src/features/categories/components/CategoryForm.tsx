"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";

import CategoryImageUpload from "./CategoryImageUpload";

import CategoryService from "@/api/services/category.service";
import { useCategories } from "@/hooks/useCategories";

import { Category } from "../types";

interface Props {
  mode?: "create" | "edit";
  initialData?: Category;
}

interface FormErrors {
  name: string;
  slug: string;
}

export default function CategoryForm({
  mode = "create",
  initialData,
}: Props) {
  const router = useRouter();

  const {
    categories,
    loading: categoryLoading,
  } = useCategories();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    parent_id: "",
    description: "",
    status: true,
    image: null as File | null,
  });

  const [errors, setErrors] =
    useState<FormErrors>({
      name: "",
      slug: "",
    });

  useEffect(() => {
    if (!initialData) return;

    setForm({
      name: initialData.name ?? "",
      slug: initialData.slug ?? "",
      parent_id:
        initialData.parent_id ?? "",
      description:
        initialData.description ?? "",
      status:
        initialData.status ?? true,
      image: null,
    });
  }, [initialData]);

  const validateForm = () => {
    const newErrors: FormErrors = {
      name: "",
      slug: "",
    };

    let valid = true;

    if (!form.name.trim()) {
      newErrors.name =
        "Category name is required.";
      valid = false;
    }

    if (!form.slug.trim()) {
      newErrors.slug =
        "Slug is required.";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const buildFormData = () => {
    const formData = new FormData();

    formData.append(
      "name",
      form.name
    );

    formData.append(
      "slug",
      form.slug
    );

    formData.append(
      "parent_id",
      form.parent_id
    );

    formData.append(
      "description",
      form.description
    );

    formData.append(
      "status",
      form.status ? "1" : "0"
    );

    if (form.image) {
      formData.append(
        "image",
        form.image
      );
    }

    return formData;
  };

    const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const formData = buildFormData();

      let response;

      if (
        mode === "edit" &&
        initialData
      ) {
        response =
          await CategoryService.update(
            initialData.uuid,
            formData
          );
      } else {
        response =
          await CategoryService.create(
            formData
          );
      }

      alert(response.message);

      router.push("/categories");
    } catch (error: any) {
      console.error(error);

      if (
        error?.response?.status === 422
      ) {
        const validationErrors =
          error.response.data.errors;

        setErrors({
          name:
            validationErrors?.name?.[0] ??
            "",
          slug:
            validationErrors?.slug?.[0] ??
            "",
        });

        return;
      }

      alert(
        error?.response?.data?.message ??
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Basic Information */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div>
          <Label>
            Category Name
          </Label>

          <InputField
            value={form.name}
            placeholder="Enter category name"
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
            value={form.slug}
            placeholder="category-slug"
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
          <Label>
            Parent Category
          </Label>

          <Select
            value={form.parent_id}
            placeholder="Select parent category"
            options={[
              {
                value: "",
                label: "None",
              },

              ...categories.map(
                (category) => ({
                  value:
                    String(category.id),
                  label:
                    category.name ||
                    "(Unnamed)",
                })
              ),
            ]}
            onChange={(value) =>
              setForm({
                ...form,
                parent_id: value,
              })
            }
            disabled={
              categoryLoading
            }
          />
        </div>

        <div className="lg:col-span-2">
          <Label>
            Description
          </Label>

          <TextArea
            rows={5}
            value={
              form.description
            }
            placeholder="Enter category description"
            onChange={(
              value
            ) =>
              setForm({
                ...form,
                description:
                  value,
              })
            }
          />
        </div>

                <div className="lg:col-span-2">
          <Label>Status</Label>

          <div className="mt-3">
            <Switch
    checked={form.status}
    onChange={(checked) =>
        setForm({
            ...form,
            status: checked,
        })
    }
/>
          </div>
        </div>
      </div>

      {/* Image Upload */}

      <div className="pt-2">
        <CategoryImageUpload
          image={
            mode === "edit"
              ? initialData?.image ?? null
              : null
          }
          onChange={(file) =>
            setForm({
              ...form,
              image: file,
            })
          }
        />
      </div>

      {/* Actions */}

      <div className="flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
        <Button
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
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