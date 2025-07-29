'use client';

import React, { useState } from "react";

type EditFormProps = {
  image: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  };
  onSuccess: () => void;
  onCancel: () => void;
};

export default function EditForm({ image, onSuccess, onCancel }: EditFormProps) {
  // PUBLIC_INTERFACE
  const [title, setTitle] = useState(image.title);
  const [description, setDescription] = useState(image.description);
  const [tags, setTags] = useState(image.tags.join(", "));
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const response = await fetch(`/api/images/${image.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });
      if (!response.ok) throw new Error("Error editing image");
      onSuccess();
    } catch {
      setErr("Edit failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-5 bg-white p-6 rounded shadow max-w-md w-full mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-bold text-primary mb-2">Edit Image</h2>
      {err && <div className="text-accent">{err}</div>}
      <div>
        <input
          type="text"
          placeholder="Image Title"
          className="block w-full px-4 py-2 border rounded mb-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="block w-full px-4 py-2 border rounded mb-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={2}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="block w-full px-4 py-2 border rounded mb-2"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          className="bg-gray-100 px-3 py-1 rounded"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-1 rounded hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
