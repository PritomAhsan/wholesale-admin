"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import Switch from "@/components/form/switch/Switch";
import Button from "@/components/ui/button/Button";

import CompanyLogoUpload from "./CompanyLogoUpload";
import CoverImageUpload from "./CoverImageUpload";

import { Supplier } from "../types";

interface Props {
  mode?: "create" | "edit";
  initialData?: Partial<Supplier>;
}

export default function SupplierForm({
  mode = "create",
  initialData,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
  companyName: initialData?.companyName ?? "",

  slug: initialData?.slug ?? "",

  description: initialData?.description ?? "",

  contactPerson: initialData?.contactPerson ?? "",

  email: initialData?.email ?? "",

  phone: initialData?.phone ?? "",

  website: initialData?.website ?? "",

  businessType:
    initialData?.businessType ?? "",

  establishedYear:
    initialData?.establishedYear ?? "",

  country: initialData?.country ?? "",

  city: initialData?.city ?? "",

  address: initialData?.address ?? "",

  status:
    initialData?.status === "inactive"
      ? false
      : true,

  verification:
    initialData?.verificationStatus ===
    "verified",
});

  const [errors, setErrors] = useState({
    companyName: "",
    email: "",
    contactPerson: "",
    country: "",
  });

  const validateForm = () => {
    const newErrors = {
      companyName: "",
      email: "",
      contactPerson: "",
      country: "",
    };

    let valid = true;

    if (!form.companyName.trim()) {
      newErrors.companyName =
        "Company name is required.";
      valid = false;
    }

    if (!form.contactPerson.trim()) {
      newErrors.contactPerson =
        "Contact person is required.";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Business email is required.";
      valid = false;
    }

    if (!form.country.trim()) {
      newErrors.country =
        "Country is required.";
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
          ? "Supplier updated successfully."
          : "Supplier created successfully."
      );

      router.push("/suppliers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* ======================================
          Company Information
      ====================================== */}

      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">
          Company Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Company Name */}

          <div>
            <Label>Company Name</Label>

            <InputField
              placeholder="Enter company name"
              defaultValue={form.companyName}
              onChange={(e) =>
                setForm({
                  ...form,
                  companyName: e.target.value,
                })
              }
            />

            {errors.companyName && (
              <p className="mt-1 text-sm text-error-500">
                {errors.companyName}
              </p>
            )}
          </div>

          {/* Slug */}

          <div>
            <Label>Slug</Label>

            <InputField
              placeholder="company-slug"
              defaultValue={form.slug}
              onChange={(e) =>
                setForm({
                  ...form,
                  slug: e.target.value,
                })
              }
            />
          </div>

          {/* Description */}

          <div className="md:col-span-2">
            <Label>Company Description</Label>

            <TextArea
              rows={5}
              placeholder="Write a short company description..."
              defaultValue={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                //   description: e.target.value,
                })
              }
            />
          </div>

        </div>
      </div>

            {/* ======================================
          Contact Information
      ====================================== */}

      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">
          Contact Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Contact Person */}

          <div>
            <Label>Contact Person</Label>

            <InputField
              placeholder="Enter contact person"
              defaultValue={form.contactPerson}
              onChange={(e) =>
                setForm({
                  ...form,
                  contactPerson: e.target.value,
                })
              }
            />

            {errors.contactPerson && (
              <p className="mt-1 text-sm text-error-500">
                {errors.contactPerson}
              </p>
            )}
          </div>

          {/* Business Email */}

          <div>
            <Label>Business Email</Label>

            <InputField
              type="email"
              placeholder="company@example.com"
              defaultValue={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            {errors.email && (
              <p className="mt-1 text-sm text-error-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}

          <div>
            <Label>Phone Number</Label>

            <InputField
              placeholder="+8801XXXXXXXXX"
              defaultValue={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />
          </div>

          {/* Website */}

          <div>
            <Label>Website</Label>

            <InputField
              placeholder="https://example.com"
              defaultValue={form.website}
              onChange={(e) =>
                setForm({
                  ...form,
                  website: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

            {/* ======================================
          Business Information
      ====================================== */}

      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">
          Business Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Business Type */}

          <div>
            <Label>Business Type</Label>

            <Select
              placeholder="Select business type"
              options={[
                {
                  value: "manufacturer",
                  label: "Manufacturer",
                },
                {
                  value: "wholesaler",
                  label: "Wholesaler",
                },
                {
                  value: "distributor",
                  label: "Distributor",
                },
                {
                  value: "exporter",
                  label: "Exporter",
                },
                {
                  value: "importer",
                  label: "Importer",
                },
                {
                  value: "retailer",
                  label: "Retailer",
                },
              ]}
              onChange={(value) =>
                setForm({
                  ...form,
                  businessType: String(value),
                })
              }
            />
          </div>

          {/* Established Year */}

          <div>
            <Label>Established Year</Label>

            <InputField
              type="number"
              placeholder="2020"
              defaultValue={form.establishedYear}
              onChange={(e) =>
                setForm({
                  ...form,
                  establishedYear: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

            {/* ======================================
          Address Information
      ====================================== */}

      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">
          Address Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Country */}

          <div>
            <Label>Country</Label>

            <InputField
              placeholder="Enter country"
              defaultValue={form.country}
              onChange={(e) =>
                setForm({
                  ...form,
                  country: e.target.value,
                })
              }
            />

            {errors.country && (
              <p className="mt-1 text-sm text-error-500">
                {errors.country}
              </p>
            )}
          </div>

          {/* City */}

          <div>
            <Label>City</Label>

            <InputField
              placeholder="Enter city"
              defaultValue={form.city}
              onChange={(e) =>
                setForm({
                  ...form,
                  city: e.target.value,
                })
              }
            />
          </div>

          {/* Address */}

          <div className="md:col-span-2">
            <Label>Business Address</Label>

            <TextArea
              rows={4}
              placeholder="Enter business address..."
              defaultValue={form.address}
              onChange={(e) =>
                setForm({
                  ...form,
                //   address: e.target.value,
                })
              }
            />
          </div>

        </div>
      </div>

            {/* ======================================
          Account Status
      ====================================== */}

      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">
          Account Status
        </h3>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {/* Status */}

          <div>
            <Label>Status</Label>

            <div className="mt-3">
              <Switch
              label=""
                defaultChecked={form.status}
                onChange={(checked) =>
                  setForm({
                    ...form,
                    status: checked,
                  })
                }
              />
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {form.status
                ? "Supplier is active."
                : "Supplier is inactive."}
            </p>
          </div>

          {/* Verification */}

          <div>
            <Label>Verification</Label>

            <div className="mt-3">
              <Switch
              label=""
                defaultChecked={form.verification}
                onChange={(checked) =>
                  setForm({
                    ...form,
                    verification: checked,
                  })
                }
              />
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {form.verification
                ? "Verified supplier"
                : "Pending verification"}
            </p>
          </div>

        </div>
      </div>

            {/* ======================================
          Images
      ====================================== */}

      <CompanyLogoUpload />

      <CoverImageUpload />

            {/* ======================================
          Actions
      ====================================== */}

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
    ? "Update Supplier"
    : "Save Supplier"}
        </Button>

      </div>

    </div>
  );
}