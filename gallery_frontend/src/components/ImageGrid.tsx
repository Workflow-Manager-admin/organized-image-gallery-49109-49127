'use client';

import ImageCard from "./ImageCard";

type Image = {
  id: string;
  title: string;
  thumbnailUrl: string;
  tags: string[];
};

type ImageGridProps = {
  images: Image[];
  onImageClick: (img: Image) => void;
  onEdit: (img: Image) => void;
  onDelete: (img: Image) => void;
};

export default function ImageGrid({ images, onImageClick, onEdit, onDelete }: ImageGridProps) {
  // PUBLIC_INTERFACE
  if (images.length === 0) {
    return <div className="mt-10 text-gray-500 text-center w-full">No images found.</div>;
  }
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {images.map((img) => (
        <ImageCard
          key={img.id}
          image={img}
          onClick={() => onImageClick(img)}
          onEdit={() => onEdit(img)}
          onDelete={() => onDelete(img)}
        />
      ))}
    </section>
  );
}
