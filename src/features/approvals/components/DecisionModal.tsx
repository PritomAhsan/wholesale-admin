"use client";

import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import Label from "@/components/form/Label";
import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (remarks: string) => Promise<void>;
  title: string;
  description: string;
  confirmLabel: string;
  remarksRequired?: boolean;
  destructive?: boolean;
}

export default function DecisionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel,
  remarksRequired = false,
  destructive = false,
}: Props) {
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (remarksRequired && !remarks.trim()) {
      setError("Remarks are required for this action.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      await onConfirm(remarks.trim());

      setRemarks("");
      onClose();
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-md m-4"
    >
      <div className="p-6">
        <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
          {title}
        </h4>

        <p className="mb-5 text-sm text-gray-500">{description}</p>

        <Label>
          Remarks{" "}
          {remarksRequired ? (
            <span className="text-error-500">*</span>
          ) : (
            <span className="text-gray-400">(optional)</span>
          )}
        </Label>

        <TextArea
          value={remarks}
          onChange={setRemarks}
          placeholder="Add a note for the record..."
          rows={4}
        />

        {error && (
          <p className="mt-2 text-sm text-error-500">{error}</p>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>

          <Button
            onClick={handleConfirm}
            disabled={submitting}
            className={
              destructive
                ? "!bg-error-500 hover:!bg-error-600"
                : undefined
            }
          >
            {submitting ? "Submitting..." : confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
