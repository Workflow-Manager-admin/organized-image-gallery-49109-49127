'use client';

import React from "react";

type DeleteConfirmDialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteConfirmDialog({
  open,
  onCancel,
  onConfirm,
}: DeleteConfirmDialogProps) {
  // PUBLIC_INTERFACE
  if (!open) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black/30 flex items-center justify-center px-2">
      <div className="bg-white border rounded p-6 max-w-xs shadow-lg text-center">
        <div className="text-lg font-semibold text-accent mb-3">
          Delete this image?
        </div>
        <div className="text-gray-800 mb-4">
          Are you sure? This action cannot be undone.
        </div>
        <div className="flex justify-center gap-3">
          <button
            className="px-4 py-1 rounded bg-gray-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-1 rounded bg-accent text-white"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
