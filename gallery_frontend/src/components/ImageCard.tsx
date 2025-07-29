'use client';

import React from "react";

type ImageCardProps = {
  image: {
    id: string;
    title: string;
    thumbnailUrl: string;
    tags: string[];
  };
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function ImageCard({ image, onClick, onEdit, onDelete }: ImageCardProps) {
  // PUBLIC_INTERFACE
  return (
    <div className="relative rounded-lg shadow-md bg-white overflow-hidden flex flex-col justify-between h-full">
      <button
        className="flex flex-col items-start text-left outline-none focus:ring-2 focus:ring-accent"
        onClick={onClick}
        aria-label={`View details for ${image.title}`}
      >
        <img
          src={image.thumbnailUrl}
          alt={image.title}
          className="object-cover w-full aspect-[4/3] transition hover:opacity-90"
          loading="lazy"
        />
        <div className="p-2">
          <span className="font-semibold text-base">{image.title}</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {image.tags.map((tag) => (
              <span key={tag} className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">{tag}</span>
            ))}
          </div>
        </div>
      </button>
      <div className="flex justify-end items-center gap-2 p-2 bg-gray-50">
        <button title="Edit" onClick={onEdit} className="rounded px-2 py-1 text-xs bg-secondary text-white hover:bg-secondary/80">Edit</button>
        <button title="Delete" onClick={onDelete} className="rounded px-2 py-1 text-xs bg-accent text-white hover:bg-accent/80">Delete</button>
      </div>
    </div>
  );
}
