'use client';

import React, { useState } from "react";

type UploadFormProps = {
  onSuccess: () => void;
};

export default function UploadForm({ onSuccess }: UploadFormProps) {
  // PUBLIC_INTERFACE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErr(null);

    if (!file) {
      setErr("Please select an image file.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("file", file);

      const response = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      onSuccess();
      setTitle("");
      setDescription("");
      setTags("");
      setFile(null);
    } catch {
      setErr("Upload failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-5 bg-white p-8 rounded shadow max-w-lg w-full mx-auto mt-8"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold text-primary mb-2">Upload Image</h2>
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
          rows={3}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="block w-full px-4 py-2 border rounded mb-2"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="block w-full px-2 py-1 mb-2"
          onChange={e => {
            if (e.target.files) setFile(e.target.files[0]);
          }}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-primary w-full py-2 rounded text-white font-semibold hover:bg-primary/90"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
