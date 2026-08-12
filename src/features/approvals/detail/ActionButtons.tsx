"use client";

import { useState } from "react";
import { toast } from "sonner";

import Button from "@/components/ui/button/Button";

import ApprovalService from "@/api/services/approval.service";

import { ProductStatusValue } from "@/types/approval";

import DecisionModal from "../components/DecisionModal";

interface Props {
  productUuid: string;
  productName: string;
  status: ProductStatusValue | string;
  onChanged: () => void;
}

type ActionType =
  | "submit"
  | "approve"
  | "reject"
  | "publish"
  | "unpublish"
  | "archive"
  | "restore";

const ACTION_CONFIG: Record<
  ActionType,
  {
    label: string;
    title: (name: string) => string;
    description: string;
    remarksRequired: boolean;
    destructive: boolean;
  }
> = {
  submit: {
    label: "Submit for Review",
    title: (n) => `Submit "${n}" for review?`,
    description: "This moves the product into the pending approval queue.",
    remarksRequired: false,
    destructive: false,
  },
  approve: {
    label: "Approve",
    title: (n) => `Approve "${n}"?`,
    description: "The supplier will be notified this product passed review.",
    remarksRequired: false,
    destructive: false,
  },
  reject: {
    label: "Reject",
    title: (n) => `Reject "${n}"?`,
    description:
      "The supplier will see these remarks and can resubmit after fixing the issue.",
    remarksRequired: true,
    destructive: true,
  },
  publish: {
    label: "Publish",
    title: (n) => `Publish "${n}"?`,
    description: "The product becomes visible in the storefront.",
    remarksRequired: false,
    destructive: false,
  },
  unpublish: {
    label: "Unpublish",
    title: (n) => `Unpublish "${n}"?`,
    description: "The product is hidden from the storefront but not archived.",
    remarksRequired: true,
    destructive: true,
  },
  archive: {
    label: "Archive",
    title: (n) => `Archive "${n}"?`,
    description:
      "Archived products are hidden everywhere. You can restore them later.",
    remarksRequired: true,
    destructive: true,
  },
  restore: {
    label: "Restore",
    title: (n) => `Restore "${n}"?`,
    description: "This brings the product back from the archive as a draft.",
    remarksRequired: false,
    destructive: false,
  },
};

const ACTIONS_FOR_STATUS: Record<string, ActionType[]> = {
  draft: ["submit"],
  pending: ["approve", "reject"],
  approved: ["publish"],
  rejected: ["submit"],
  published: ["unpublish", "archive"],
  unpublished: ["publish", "archive"],
  archived: ["restore"],
};

export default function ActionButtons({
  productUuid,
  productName,
  status,
  onChanged,
}: Props) {
  const [active, setActive] = useState<ActionType | null>(null);

  const actions = ACTIONS_FOR_STATUS[status] ?? [];

  if (actions.length === 0) {
    return null;
  }

  const handleConfirm = async (remarks: string) => {
    if (!active) return;

    const cleanRemarks = remarks || undefined;

    switch (active) {
      case "submit":
        await ApprovalService.submit(productUuid, cleanRemarks);
        break;
      case "approve":
        await ApprovalService.approve(productUuid, cleanRemarks);
        break;
      case "reject":
        await ApprovalService.reject(productUuid, remarks);
        break;
      case "publish":
        await ApprovalService.publish(productUuid, cleanRemarks);
        break;
      case "unpublish":
        await ApprovalService.unpublish(productUuid, remarks);
        break;
      case "archive":
        await ApprovalService.archive(productUuid, remarks);
        break;
      case "restore":
        await ApprovalService.restoreStatus(productUuid, cleanRemarks);
        break;
    }

    toast.success(`${ACTION_CONFIG[active].label} successful.`);
    onChanged();
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {actions.map((action) => (
          <Button
            key={action}
            variant={
              action === "reject" ||
              action === "archive" ||
              action === "unpublish"
                ? "outline"
                : "primary"
            }
            onClick={() => setActive(action)}
          >
            {ACTION_CONFIG[action].label}
          </Button>
        ))}
      </div>

      {active && (
        <DecisionModal
          isOpen={!!active}
          onClose={() => setActive(null)}
          onConfirm={handleConfirm}
          title={ACTION_CONFIG[active].title(productName)}
          description={ACTION_CONFIG[active].description}
          confirmLabel={ACTION_CONFIG[active].label}
          remarksRequired={ACTION_CONFIG[active].remarksRequired}
          destructive={ACTION_CONFIG[active].destructive}
        />
      )}
    </>
  );
}
