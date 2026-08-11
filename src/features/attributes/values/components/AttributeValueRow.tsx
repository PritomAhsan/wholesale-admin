"use client";

import { useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import { TableCell, TableRow } from "@/components/ui/table";
import InputField from "@/components/form/input/InputField";
import Switch from "@/components/form/switch/Switch";

import AttributeService from "@/api/services/attribute.service";

import { AttributeValue } from "@/types/attribute";

interface Props {
  value: AttributeValue;
  onChanged: () => void;
}

export default function AttributeValueRow({ value, onChanged }: Props) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    value: value.value,
    sort_order: value.sort_order,
    status: value.status,
  });

  const handleSave = async () => {
    if (!form.value.trim()) {
      toast.error("Value can't be empty.");
      return;
    }

    try {
      setSaving(true);

      await AttributeService.updateValue(value.uuid, {
        value: form.value,
        sort_order: form.sort_order,
        status: form.status,
      });

      toast.success("Value updated.");

      setEditing(false);
      onChanged();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ?? "Failed to update value."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete value "${value.value}"?`
    );

    if (!confirmed) return;

    try {
      await AttributeService.deleteValue(value.uuid);

      toast.success("Value deleted.");

      onChanged();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Failed to delete value. It may still be assigned to products."
      );
    }
  };

  const handleToggleStatus = async () => {
    try {
      await AttributeService.toggleValueStatus(value.uuid);

      onChanged();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ?? "Failed to update status."
      );
    }
  };

  if (editing) {
    return (
      <TableRow>
        <TableCell>
          <InputField
            value={form.value}
            onChange={(e) => setForm({ ...form, value: e.target.value })}
          />
        </TableCell>

        <TableCell>
          <InputField
            type="number"
            value={String(form.sort_order)}
            onChange={(e) =>
              setForm({
                ...form,
                sort_order: Number(e.target.value) || 0,
              })
            }
          />
        </TableCell>

        <TableCell>
          <Switch
            checked={form.status}
            onChange={(checked) => setForm({ ...form, status: checked })}
          />
        </TableCell>

        <TableCell className="text-right">
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-success-600 dark:hover:bg-gray-800"
            >
              <Check size={18} />
            </button>

            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setForm({
                  value: value.value,
                  sort_order: value.sort_order,
                  status: value.status,
                });
              }}
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={18} />
            </button>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>{value.value}</TableCell>

      <TableCell>{value.sort_order}</TableCell>

      <TableCell>
        <Switch checked={value.status} onChange={handleToggleStatus} />
      </TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-warning-600 dark:hover:bg-gray-800"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-error-600 dark:hover:bg-gray-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
