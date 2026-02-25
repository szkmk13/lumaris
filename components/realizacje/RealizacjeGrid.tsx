import type { Realizacja } from "@/lib/supabase/types";
import RealizacjaCard from "./RealizacjaCard";

export default function RealizacjeGrid({ realizacje }: { realizacje: Realizacja[] }) {
  if (realizacje.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <p className="text-lg font-medium text-gray-400">Realizacje wkrótce</p>
        <p className="text-sm text-gray-300 mt-1">Pracujemy nad dodaniem pierwszych projektów.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {realizacje.map((r) => (
        <RealizacjaCard key={r.id} realizacja={r} />
      ))}
    </div>
  );
}
