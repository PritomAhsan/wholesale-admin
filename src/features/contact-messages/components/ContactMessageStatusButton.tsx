"use client";

import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";

import contactMessageService from "@/api/services/contact-message.service";
import { ContactMessage } from "@/types/contact-message";

interface Props {
  message: ContactMessage;
  onChanged: () => void;
}

export default function ContactMessageStatusButton({ message, onChanged }: Props) {
  const [busy, setBusy] = useState(false);

  async function toggle() {
    const nextStatus = message.status === "open" ? "resolved" : "open";
    setBusy(true);

    try {
      await contactMessageService.updateStatus(message.uuid, nextStatus);
      onChanged();
    } catch (error) {
      console.error(error);
      alert("Failed to update status.");
    } finally {
      setBusy(false);
    }
  }

  if (message.status === "open") {
    return (
      <button
        onClick={toggle}
        disabled={busy}
        className="flex items-center gap-1 rounded-lg bg-success-50 px-3 py-2 text-xs font-medium text-success-600 hover:bg-success-100 disabled:opacity-50 dark:bg-success-500/15"
      >
        <Check size={14} />
        Mark Resolved
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-50 dark:bg-white/5 dark:text-gray-300"
    >
      <RotateCcw size={14} />
      Reopen
    </button>
  );
}
