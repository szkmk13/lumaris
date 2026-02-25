"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { Realizacja } from "@/lib/supabase/types";

export default function RealizacjaDetail({ realizacja }: { realizacja: Realizacja }) {
  const images = realizacja.images ?? [];
  const videos = realizacja.videos ?? [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [lightboxLoading, setLightboxLoading] = useState(false);
  const isFirstRender = useRef(true);

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setSelectedIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  // Ustaw loading przy każdej zmianie zdjęcia (pomijamy pierwsze renderowanie)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setImageLoading(true);
    setLightboxLoading(true);
  }, [selectedIndex]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, prev, next]);

  return (
    <article className="max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] mb-4">
        {realizacja.title}
      </h1>

      {realizacja.description && (
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          {realizacja.description}
        </p>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <div className="mb-8 space-y-4">
          {videos.map((url, i) => (
            <video
              key={i}
              src={url}
              controls
              playsInline
              className="w-full rounded-xl bg-black"
              preload="metadata"
            />
          ))}
        </div>
      )}

      {/* Gallery */}
      {images.length > 0 && (
        <div className="mb-8">
          {/* Main image */}
          <div
            className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 mb-3 cursor-zoom-in group"
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${realizacja.title} — zdjęcie ${selectedIndex + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
              onLoad={() => setImageLoading(false)}
            />

            {/* Loader overlay */}
            <div
              className={`absolute inset-0 bg-gray-100 flex items-center justify-center transition-opacity duration-200 ${
                imageLoading ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <svg className="w-8 h-8 text-[#D4AF37] animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>

            {/* Overlay hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                Powiększ
              </div>
            </div>

            {/* Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    i === selectedIndex
                      ? "border-[#D4AF37]"
                      : "border-transparent hover:border-[#D4AF37]/40"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      {realizacja.content && (
        <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
          {realizacja.content}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 transition-colors"
            onClick={() => setLightboxOpen(false)}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              className="absolute left-3 sm:left-6 text-white/70 hover:text-white p-2 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image + lightbox loader */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${realizacja.title} — zdjęcie ${selectedIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              onLoad={() => setLightboxLoading(false)}
            />

            {/* Lightbox loader */}
            {lightboxLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-10 h-10 text-[#D4AF37] animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              </div>
            )}
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              className="absolute right-3 sm:right-6 text-white/70 hover:text-white p-2 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                  className={`relative shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${
                    i === selectedIndex ? "border-[#D4AF37]" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
