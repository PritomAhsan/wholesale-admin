"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";

import Label from "@/components/form/Label";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";

import { Supplier } from "@/types/supplier";
import supplierService from "@/api/services/supplier.service";

interface Props {
  supplier: Supplier;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "suspended", label: "Suspended" },
];

const BUSINESS_TYPE_OPTIONS = [
  { value: "manufacturer", label: "Manufacturer" },
  { value: "wholesaler", label: "Wholesaler" },
  { value: "distributor", label: "Distributor" },
  { value: "exporter", label: "Exporter" },
  { value: "retailer", label: "Retailer" },
];

export default function SupplierForm({ supplier }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    company_name: supplier.company_name,
    business_type: supplier.business_type,
    contact_person: supplier.contact_person,
    email: supplier.email,
    phone: supplier.phone,
    website: supplier.website ?? "",
    registration_number: supplier.registration_number ?? "",
    tax_number: supplier.tax_number ?? "",
    description: supplier.description ?? "",
    fulfillment_region: supplier.fulfillment_region ?? "",
    typical_lead_time: supplier.typical_lead_time ?? "",
    commission_rate:
      supplier.commission_rate !== null ? String(supplier.commission_rate) : "",
    status: supplier.status,
  });

  const [errors, setErrors] = useState({
    company_name: "",
    email: "",
    contact_person: "",
  });

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(supplier.logo);
  const [bannerPreview, setBannerPreview] = useState<string | null>(supplier.banner);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function selectLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  function selectBanner(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  }

  function validate() {
    const newErrors = { company_name: "", email: "", contact_person: "" };
    let valid = true;

    if (!form.company_name.trim()) {
      newErrors.company_name = "Company name is required.";
      valid = false;
    }

    if (!form.contact_person.trim()) {
      newErrors.contact_person = "Contact person is required.";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Business email is required.";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  }

  async function handleSave() {
    if (!validate()) return;

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value === "" || value === undefined || value === null) return;
        formData.append(key, value as string);
      });

      if (logoFile) formData.append("logo", logoFile);
      if (bannerFile) formData.append("banner", bannerFile);

      await supplierService.update(supplier.uuid, formData);

      router.push("/suppliers");
    } catch {
      setError("Unable to save changes. Please try again.");
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

      {/* Protected identity — read-only */}
      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-4 text-lg font-semibold">Protected Identity</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label>Seller ID</Label>
            <p className="mt-1 font-mono text-sm text-gray-700 dark:text-gray-300">
              {supplier.seller_id ?? "Not yet generated"}
            </p>
          </div>

          <div>
            <Label>Slug</Label>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              {supplier.company_slug}
            </p>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">Company Information</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label>Company Name</Label>
            <InputField
              placeholder="Enter company name"
              defaultValue={form.company_name}
              onChange={(e) => update("company_name", e.target.value)}
            />
            {errors.company_name && (
              <p className="mt-1 text-sm text-error-500">{errors.company_name}</p>
            )}
          </div>

          <div>
            <Label>Business Type</Label>
            <Select
              placeholder="Select business type"
              value={form.business_type}
              options={BUSINESS_TYPE_OPTIONS}
              onChange={(value) => update("business_type", String(value))}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Company Description</Label>
            <TextArea
              rows={5}
              placeholder="What this supplier sells..."
              defaultValue={form.description}
              onChange={(value) => update("description", value)}
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">Contact Information</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label>Contact Person</Label>
            <InputField
              placeholder="Enter contact person"
              defaultValue={form.contact_person}
              onChange={(e) => update("contact_person", e.target.value)}
            />
            {errors.contact_person && (
              <p className="mt-1 text-sm text-error-500">{errors.contact_person}</p>
            )}
          </div>

          <div>
            <Label>Business Email</Label>
            <InputField
              type="email"
              placeholder="company@example.com"
              defaultValue={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
            {errors.email && <p className="mt-1 text-sm text-error-500">{errors.email}</p>}
          </div>

          <div>
            <Label>Phone Number</Label>
            <InputField
              placeholder="+8801XXXXXXXXX"
              defaultValue={form.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>

          <div>
            <Label>Website</Label>
            <InputField
              placeholder="https://example.com"
              defaultValue={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Business Registration */}
      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">Business Registration</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label>Registration Number</Label>
            <InputField
              placeholder="Business registration number"
              defaultValue={form.registration_number}
              onChange={(e) => update("registration_number", e.target.value)}
            />
          </div>

          <div>
            <Label>Tax ID</Label>
            <InputField
              placeholder="Tax identification number"
              defaultValue={form.tax_number}
              onChange={(e) => update("tax_number", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Fulfillment */}
      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">Fulfillment</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label>Fulfillment Region</Label>
            <InputField
              placeholder="e.g. Southeast Asia"
              defaultValue={form.fulfillment_region}
              onChange={(e) => update("fulfillment_region", e.target.value)}
            />
          </div>

          <div>
            <Label>Typical Lead Time</Label>
            <InputField
              placeholder="e.g. 10-14 days"
              defaultValue={form.typical_lead_time}
              onChange={(e) => update("typical_lead_time", e.target.value)}
            />
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Shown to buyers on the seller profile. Left blank until the
          supplier or an admin sets it — never inferred or guessed.
        </p>
      </div>

      {/* Commission */}
      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">Commission</h3>

        <div className="max-w-xs">
          <Label>Commission Rate (%)</Label>
          <InputField
            type="number"
            step={0.01}
            min="0"
            max="100"
            placeholder={`Default ${supplier.effective_commission_rate}%`}
            defaultValue={form.commission_rate}
            onChange={(e) => update("commission_rate", e.target.value)}
          />
        </div>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Percentage the platform keeps from each of this seller&apos;s
          delivered orders before payout. Leave blank to use the platform
          default ({supplier.effective_commission_rate}%) instead of a
          per-seller rate.
        </p>
      </div>

      {/* Status */}
      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-6 text-lg font-semibold">Application Status</h3>

        <div className="max-w-xs">
          <Label>Status</Label>
          <Select
            placeholder="Select status"
            value={form.status}
            options={STATUS_OPTIONS}
            onChange={(value) => update("status", value as Supplier["status"])}
          />
        </div>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Setting status to Approved grants the Supplier role and unlocks
          seller-side access — same effect as the Approve action on the
          suppliers list.
        </p>
      </div>

      {/* Images */}
      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-4 text-lg font-semibold">Company Logo</h3>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
            {logoPreview ? (
              <Image src={logoPreview} alt="Company Logo" width={112} height={112} className="h-full w-full object-cover" />
            ) : (
              <Upload size={34} className="text-gray-400" />
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <input ref={logoInputRef} type="file" accept="image/*" hidden onChange={selectLogo} />
            <Button onClick={() => logoInputRef.current?.click()}>Choose Logo</Button>
            {logoPreview && (
              <Button
                variant="outline"
                onClick={() => {
                  setLogoFile(null);
                  setLogoPreview(null);
                  if (logoInputRef.current) logoInputRef.current.value = "";
                }}
              >
                <X size={16} className="mr-2" />
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 p-6 dark:border-gray-800">
        <h3 className="mb-4 text-lg font-semibold">Storefront Banner</h3>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-28 w-52 items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
            {bannerPreview ? (
              <Image src={bannerPreview} alt="Storefront Banner" width={208} height={112} className="h-full w-full object-cover" />
            ) : (
              <Upload size={34} className="text-gray-400" />
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <input ref={bannerInputRef} type="file" accept="image/*" hidden onChange={selectBanner} />
            <Button onClick={() => bannerInputRef.current?.click()}>Choose Banner</Button>
            {bannerPreview && (
              <Button
                variant="outline"
                onClick={() => {
                  setBannerFile(null);
                  setBannerPreview(null);
                  if (bannerInputRef.current) bannerInputRef.current.value = "";
                }}
              >
                <X size={16} className="mr-2" />
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>

        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Updating..." : "Update Supplier"}
        </Button>
      </div>
    </div>
  );
}
