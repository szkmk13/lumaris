import Link from "next/link";
import Image from "next/image";
import type { Realizacja } from "@/lib/supabase/types";

export default function RealizacjaCard({ realizacja }: { realizacja: Realizacja }) {
  const coverImage = realizacja.images?.[0];

  return (
    <Link
      href={`/realizacje/${realizacja.slug}`}
      className="group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-[#D4AF37]/40 hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={realizacja.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-[#1C1C1C] text-lg mb-2 group-hover:text-[#D4AF37] transition-colors">
          {realizacja.title}
        </h3>
        {realizacja.description && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {realizacja.description}
          </p>
        )}
        <div className="mt-4 flex items-center gap-1.5 text-[#D4AF37] text-sm font-medium">
          <span>Zobacz więcej</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
