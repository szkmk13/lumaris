"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "realizacje-images";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
}

export default function ImageUploader({ images, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    const supabase = createClient();
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filename, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError(`Błąd upload: ${uploadError.message}`);
        continue;
      }

      const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
      uploaded.push(data.publicUrl);
    }

    onChange([...images, ...uploaded]);
    setUploading(false);
  };

  const removeImage = (url: string) => {
    onChange(images.filter((img) => img !== url));
  };

  return (
    <div>
      {/* Upload area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-[#D4AF37]/50 transition-colors"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        {uploading ? (
          <p className="text-gray-400">Przesyłanie...</p>
        ) : (
          <>
            <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="text-gray-500 text-sm">Kliknij by dodać zdjęcia</p>
            <p className="text-gray-400 text-xs mt-1">PNG, JPG, WebP</p>
          </>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      {/* Previews */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
              <Image src={url} alt={`Zdjęcie ${i + 1}`} fill className="object-cover" sizes="150px" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
