"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ImageUploader from "@/components/admin/ImageUploader";
import VideoUploader from "@/components/admin/VideoUploader";
import type { Realizacja } from "@/lib/supabase/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function EditForm({ realizacja }: { realizacja: Realizacja }) {
  const router = useRouter();

  const [title, setTitle] = useState(realizacja.title);
  const [slug, setSlug] = useState(realizacja.slug);
  const [description, setDescription] = useState(realizacja.description ?? "");
  const [content, setContent] = useState(realizacja.content ?? "");
  const [images, setImages] = useState<string[]>(realizacja.images ?? []);
  const [videos, setVideos] = useState<string[]>(realizacja.videos ?? []);
  const [published, setPublished] = useState(realizacja.published);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) {
      setError("Tytuł i slug są wymagane");
      return;
    }

    setSaving(true);
    setError("");
    setSaved(false);

    const supabase = createClient();

    const { error: updateError } = await supabase
      .from("realizacje")
      .update({
        title,
        slug,
        description: description || null,
        content: content || null,
        images,
        videos,
        published,
      })
      .eq("id", realizacja.id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    setSaved(true);
    setSaving(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    setDeleting(true);
    const supabase = createClient();

    const { error: deleteError } = await supabase
      .from("realizacje")
      .delete()
      .eq("id", realizacja.id);

    if (deleteError) {
      setError(deleteError.message);
      setDeleting(false);
      setConfirmDelete(false);
      return;
    }

    router.push("/admin/realizacje");
    router.refresh();
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all text-[#1C1C1C] bg-white text-sm";

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/realizacje")}
          className="text-sm text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Wróć do listy
        </button>
        <h1 className="text-2xl font-bold text-[#1C1C1C]">Edytuj realizację</h1>
        <p className="text-sm text-gray-400 mt-1">ID: {realizacja.id}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tytuł <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
              placeholder="np. Instalacja smart home — Kraków"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Slug <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm whitespace-nowrap">/realizacje/</span>
              <input
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className={inputClass}
              />
            </div>
            <p className="text-xs text-amber-500 mt-1.5">
              Uwaga: zmiana sluga spowoduje, że stare linki do tej realizacji przestaną działać.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Krótki opis (wyświetlany na karcie)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className={`${inputClass} resize-none`}
              placeholder="Krótkie podsumowanie projektu..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Pełny opis (wyświetlany na stronie szczegółów)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className={`${inputClass} resize-none`}
              placeholder="Szczegółowy opis realizacji..."
            />
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-medium text-gray-700 mb-4">
            Zdjęcia ({images.length})
          </h2>
          <ImageUploader images={images} onChange={setImages} />
        </div>

        {/* Videos */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-sm font-medium text-gray-700 mb-1">
            Filmy ({videos.length})
          </h2>
          <p className="text-xs text-gray-400 mb-4">MP4, MOV, WebM — max kilkadziesiąt MB</p>
          <VideoUploader videos={videos} onChange={setVideos} />
        </div>

        {/* Publish + submit */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 flex items-center justify-between gap-4 flex-wrap">
          <label className="flex items-center gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                published ? "bg-[#D4AF37]" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  published ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {published ? "Opublikowana" : "Szkic"}
            </span>
          </label>

          <div className="flex items-center gap-3 flex-wrap">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {saved && <p className="text-green-600 text-sm">Zapisano!</p>}
            <button
              type="submit"
              disabled={saving}
              className="bg-[#D4AF37] text-[#1C1C1C] px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#c49b2e] disabled:opacity-50 transition-colors"
            >
              {saving ? "Zapisywanie..." : "Zapisz zmiany"}
            </button>
          </div>
        </div>

        {/* Delete zone */}
        <div className="bg-white rounded-xl border border-red-100 p-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Usuń realizację</p>
            <p className="text-xs text-gray-400 mt-0.5">Ta operacja jest nieodwracalna.</p>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 ${
              confirmDelete
                ? "bg-red-600 text-white hover:bg-red-700"
                : "border border-red-300 text-red-500 hover:bg-red-50"
            }`}
          >
            {deleting ? "Usuwanie..." : confirmDelete ? "Potwierdź usunięcie" : "Usuń"}
          </button>
        </div>
      </form>
    </div>
  );
}
