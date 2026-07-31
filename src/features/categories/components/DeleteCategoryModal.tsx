"use client";

import { useState } from "react";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";

import Button from "@/components/ui/button/Button";

interface Props {
  open: boolean;
  onClose: () => void;
  categoryName: string;
}

export default function DeleteCategoryModal({
  open,
  onClose,
  categoryName,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    // TODO:
    // Laravel API Integration

    await new Promise((resolve) =>
      setTimeout(resolve, 800)
    );

    alert("Category deleted successfully.");

    setLoading(false);

    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalHeader>
        Delete Category
      </ModalHeader>

      <ModalBody>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {categoryName}
          </span>
          ?
        </p>

        <p className="mt-2 text-sm text-red-500">
          This action cannot be undone.
        </p>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          className="bg-red-600 hover:bg-red-700"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading
            ? "Deleting..."
            : "Delete"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}