"use client";
import { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ImageGrid from "../components/ImageGrid";
import Spinner from "../components/Spinner";
import { fetchImages, fetchTags, ImageItem, deleteImage } from "../lib/api";
import ImageModal from "../components/ImageModal";
import EditForm from "../components/EditForm";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

export default function Home() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<ImageItem | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchImages({
        search: searchValue,
        tag: selectedTag,
      });
      setImages(data);
    } catch (e) {
      setImages([]);
    }
    try {
      const tagsData = await fetchTags();
      setTags(tagsData);
    } catch (e) {
      setTags([]);
    }
    setLoading(false);
  }, [searchValue, selectedTag]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleImageClick = (img: ImageItem) => {
    setActiveImage(img);
  };
  const handleEdit = (img: ImageItem) => {
    setActiveImage(img);
    setShowEdit(true);
  };
  const handleDelete = (img: ImageItem) => {
    setActiveImage(img);
    setShowDelete(true);
  };

  const handleEditSuccess = () => {
    setShowEdit(false);
    setActiveImage(null);
    loadData();
  };

  const handleDeleteSuccess = async () => {
    if (activeImage) {
      await deleteImage(activeImage.id);
    }
    setShowDelete(false);
    setActiveImage(null);
    loadData();
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <div className="flex flex-1 w-full mx-auto max-w-[1400px]">
        <Sidebar
          onSearch={setSearchValue}
          onFilter={setSelectedTag}
          tags={tags}
          selectedTag={selectedTag}
        />
        <main className="flex-1 px-3 sm:px-8 py-8">
          {loading ? (
            <Spinner />
          ) : (
            <ImageGrid
              images={images}
              onImageClick={handleImageClick}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </main>
      </div>

      {/* Image Modal */}
      {activeImage && !showEdit && (
        <ImageModal
          image={activeImage}
          onClose={() => setActiveImage(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Edit Image Form */}
      {showEdit && activeImage && (
        <div className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center">
          <EditForm
            image={activeImage}
            onSuccess={handleEditSuccess}
            onCancel={() => setShowEdit(false)}
          />
        </div>
      )}

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDeleteSuccess}
      />
    </div>
  );
}
