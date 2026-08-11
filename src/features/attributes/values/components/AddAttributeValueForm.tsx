"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import InputField from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";

import AttributeService from "@/api/services/attribute.service";

interface Props {
  attributeUuid: string;
  onAdded: () => void;
}

export default function AddAttributeValueForm({
  attributeUuid,
  onAdded,
}: Props) {
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAdd = async () => {
    if (!value.trim()) {
      toast.error("Enter a value first.");
      return;
    }

    try {
      setSaving(true);

      await AttributeService.createValue(attributeUuid, {
        value: value.trim(),
      });

      toast.success("Value added.");

      setValue("");
      onAdded();
    } catch (error: any) {
      if (error.response?.status === 422) {
        const message =
          error.response.data.errors?.value?.[0] ??
          error.response.data.message;

        toast.error(message ?? "Failed to add value.");

        return;
      }

      toast.error(
        error.response?.data?.message ?? "Failed to add value."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mb-6 flex items-end gap-3">
      <div className="flex-1">
        <InputField
          placeholder="e.g. Red"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <Button onClick={handleAdd} disabled={saving}>
        <Plus size={16} className="mr-2" />
        Add Value
      </Button>
    </div>
  );
}
