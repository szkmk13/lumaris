"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

const BUCKET = "realizacje-videos";

interface Props {
  videos: string[];
  onChange: (videos: string[]) => void;
}

export default function VideoUploader({ videos, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");
    const supabase = createClient();
    const uploaded: string[] = [];

    for (let idx = 0; idx < files.length; idx++) {
      const file = files[idx];
      setProgress(`Przesyłanie ${idx + 1} / ${files.length}...`);

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

    onChange([...videos, ...uploaded]);
    setUploading(false);
    setProgress("");
  };

  const removeVideo = (url: string) => {
    onChange(videos.filter((v) => v !== url));
  };

  return (
    <div>
      {/* Upload area */}
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          uploading
            ? "border-[#D4AF37]/40 cursor-not-allowed"
            : "border-gray-200 cursor-pointer hover:border-[#D4AF37]/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/mp4,video/quicktime,video/webm,video/avi,video/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-[#D4AF37] animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <p className="text-gray-500 text-sm">{progress}</p>
          </div>
        ) : (
          <>
            <svg className="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
            <p className="text-gray-500 text-sm">Kliknij by dodać filmy</p>
            <p className="text-gray-400 text-xs mt-1">MP4, MOV, WebM</p>
          </>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

      {/* Video list */}
      {videos.length > 0 && (
        <div className="mt-4 space-y-3">
          {videos.map((url, i) => (
            <div key={i} className="relative group rounded-xl overflow-hidden bg-gray-100">
              <video
                src={url}
                controls
                className="w-full max-h-64 rounded-xl"
                preload="metadata"
              />
              <button
                type="button"
                onClick={() => removeVideo(url)}
                className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                title="Usuń film"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
