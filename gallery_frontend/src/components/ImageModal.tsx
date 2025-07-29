'use client';

import React from "react";

type Image = {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  tags: string[];
};

type ImageModalProps = {
  image: Image | null;
  onClose: () => void;
  onEdit: (img: Image) => void;
  onDelete: (img: Image) => void;
};

export default function ImageModal({
  image,
  onClose,
  onEdit,
  onDelete,
}: ImageModalProps) {
  if (!image) return null;

  // PUBLIC_INTERFACE
  return (
    <div className="fixed z-40 inset-0 bg-black/40 flex items-center justify-center px-2">
      <div className="relative bg-white rounded-lg p-6 max-w-lg w-full shadow-xl">
        <button
          className="absolute right-2 top-2 rounded text-xl p-1 text-gray-400 hover:text-accent"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <img
          src={image.imageUrl}
          alt={image.title}
          className="w-full h-64 object-contain rounded border mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">{image.title}</h2>
        <p className="mb-3 text-gray-700">{image.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {image.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button className="bg-secondary text-white rounded px-3 py-1" onClick={() => onEdit(image)}>
            Edit
          </button>
          <button className="bg-accent text-white rounded px-3 py-1" onClick={() => onDelete(image)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
