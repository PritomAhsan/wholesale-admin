"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";

import BrandService from "@/api/services/brand.service";

import BrandLogoUpload from "./BrandLogoUpload";

import { Brand } from "@/types/brand";

interface Props {
  mode?: "create" | "edit";
  initialData?: Brand;
}

export default function BrandForm({
  mode = "create",
  initialData,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [logo, setLogo] =
  useState<File | null>(null);

const [removeLogo, setRemoveLogo] =
  useState(false);

  const [form, setForm] =
    useState({
      name:
        initialData?.name ?? "",

      slug:
        initialData?.slug ?? "",

      website:
        initialData?.website ??
        "",

      description:
        initialData?.description ??
        "",

      featured:
        initialData?.featured ??
        false,

      status:
        initialData?.status ??
        true,
    });

  const [errors, setErrors] =
    useState<
      Record<string, string>
    >({});

  const validateForm =
    () => {
      const validationErrors:
        Record<
          string,
          string
        > = {};

      if (
        !form.name.trim()
      ) {
        validationErrors.name =
          "Brand name is required.";
      }

      if (
        !form.slug.trim()
      ) {
        validationErrors.slug =
          "Slug is required.";
      }

      if (
        form.website &&
        !/^https?:\/\//.test(
          form.website
        )
      ) {
        validationErrors.website =
          "Website must start with http:// or https://";
      }

      setErrors(
        validationErrors
      );

      return (
        Object.keys(
          validationErrors
        ).length === 0
      );
    };

  const handleSave =
    async () => {
      if (
        !validateForm()
      )
        return;

      try {
        setLoading(true);

        const payload =
          new FormData();

        payload.append(
          "name",
          form.name
        );

        payload.append(
          "slug",
          form.slug
        );

        payload.append(
          "website",
          form.website
        );

        payload.append(
          "description",
          form.description
        );

        payload.append(
          "featured",
          form.featured
            ? "1"
            : "0"
        );

        payload.append(
          "status",
          form.status
            ? "1"
            : "0"
        );

        if (logo) {
  payload.append(
    "logo",
    logo
  );
}

if (
  mode === "edit" &&
  removeLogo
) {
  payload.append(
    "remove_logo",
    "1"
  );
}

        if (
          mode ===
          "create"
        ) {
          await BrandService.create(
            payload
          );

          alert(
            "Brand created successfully."
          );
        } else {
          await BrandService.update(
            initialData!.uuid,
            payload
          );

          alert(
            "Brand updated successfully."
          );
        }

        router.push(
          "/brands"
        );
      } catch (error: any) {
  console.error(error);

  if (error.response?.status === 422) {
    const validationErrors =
      error.response.data.errors ?? {};

    const formattedErrors: Record<
      string,
      string
    > = {};

    Object.keys(validationErrors).forEach(
      (key) => {
        formattedErrors[key] =
          validationErrors[key][0];
      }
    );

    setErrors(formattedErrors);

    return;
  }

  alert(
    error.response?.data?.message ??
      "Something went wrong."
  );
} finally {
  setLoading(false);
}
    };

      return (
    <div className="space-y-8">
      {/* Brand Information */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <Label>Brand Name *</Label>

          <InputField
            placeholder="Enter brand name"
            value={form.name}
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
          <Label>Slug *</Label>

          <InputField
            placeholder="brand-slug"
            value={form.slug}
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
          <Label>Website</Label>

          <InputField
            placeholder="https://example.com"
            value={form.website}
            onChange={(e) =>
              setForm({
                ...form,
                website:
                  e.target.value,
              })
            }
          />

          {errors.website && (
            <p className="mt-1 text-sm text-error-500">
              {errors.website}
            </p>
          )}
        </div>

        <div className="lg:col-span-2">
          <Label>Description</Label>

          <TextArea
            rows={5}
            placeholder="Enter brand description"
            value={
              form.description
            }
            onChange={(value) =>
              setForm({
                ...form,
                description:
                  value,
              })
            }
          />

          {errors.description && (
            <p className="mt-1 text-sm text-error-500">
              {
                errors.description
              }
            </p>
          )}
        </div>
      </div>

      {/* Brand Settings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <Label>
            Featured Brand
          </Label>

          <div className="mt-3">
            <Switch
    checked={
        form.featured
    }
    onChange={(checked) =>
        setForm({
            ...form,
            featured: checked,
        })
    }
/>
          </div>
        </div>

        <div>
          <Label>Status</Label>

          <div className="mt-3">
            <Switch
    checked={
        form.status
    }
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

      {/* Brand Logo */}
      <BrandLogoUpload
  image={initialData?.logo}
  onChange={(file) => {
    setLogo(file);

    setRemoveLogo(file === null);
  }}
/>

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
            ? "Update Brand"
            : "Save Brand"}
        </Button>
      </div>
    </div>
  );
}