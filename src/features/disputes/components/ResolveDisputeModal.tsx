"use client";

import { useState } from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "@/components/ui/modal";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import InputField from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";

import disputeService from "@/api/services/dispute.service";
import { Dispute, DISPUTE_REASON_LABELS } from "@/types/dispute";

interface Props {
  dispute: Dispute;
  onClose: () => void;
  onResolved: () => void;
}

const RESOLUTION_OPTIONS = [
  { value: "refund_full", label: "Full refund" },
  { value: "refund_partial", label: "Partial refund" },
  { value: "replacement", label: "Replacement" },
  { value: "no_action", label: "No action" },
];

export default function ResolveDisputeModal({ dispute, onClose, onResolved }: Props) {
  const [resolution, setResolution] = useState("refund_full");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const payableAmount = dispute.seller_order?.payable_amount ?? 0;
  const alreadyPaidOut = dispute.seller_order?.paid_out ?? false;

  async function handleSubmit() {
    if (resolution === "refund_partial" && !amount) {
      setError("Enter a refund amount.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await disputeService.resolve(dispute.uuid, {
        resolution,
        resolution_amount: resolution === "refund_partial" ? Number(amount) : undefined,
        resolution_note: note || undefined,
      });

      onResolved();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to resolve dispute.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal isOpen onClose={onClose} className="max-w-lg">
      <ModalHeader>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Resolve Dispute
        </h3>
      </ModalHeader>

      <ModalBody>
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600 dark:bg-white/[0.03] dark:text-gray-400">
            <p><b>Reason:</b> {DISPUTE_REASON_LABELS[dispute.reason] ?? dispute.reason}</p>
            <p className="mt-1"><b>Buyer says:</b> {dispute.description}</p>
            <p className="mt-1">
              <b>Order:</b> {dispute.seller_order?.seller_order_number} · Seller{" "}
              {dispute.seller_order?.seller_id} · Payable now: $
              {payableAmount.toFixed(2)}
            </p>
          </div>

          {alreadyPaidOut && (
            <div className="rounded-lg border border-warning-200 bg-warning-50 p-3 text-sm text-warning-700 dark:border-warning-500/30 dark:bg-warning-500/10 dark:text-warning-400">
              This seller order has already been paid out — a refund resolution
              here won&apos;t adjust the payable amount automatically. You&apos;ll
              need to reconcile it with the supplier manually.
            </div>
          )}

          <div>
            <Label>Resolution</Label>
            <Select
              value={resolution}
              options={RESOLUTION_OPTIONS}
              onChange={(value) => setResolution(String(value))}
            />
          </div>

          {resolution === "refund_partial" && (
            <div>
              <Label>Refund Amount ($)</Label>
              <InputField
                type="number"
                step={0.01}
                min="0.01"
                max={String(payableAmount)}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          )}

          <div>
            <Label>Note (optional)</Label>
            <TextArea
              rows={3}
              placeholder="Internal note — visible to the buyer as the resolution reason."
              defaultValue={note}
              onChange={(value) => setNote(value)}
            />
          </div>

          {error && <p className="text-sm text-error-500">{error}</p>}
        </div>
      </ModalBody>

      <ModalFooter>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Resolving..." : "Resolve Dispute"}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
