import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { count: totalCount } = await supabase
    .from("realizacje")
    .select("*", { count: "exact", head: true });

  const { count: publishedCount } = await supabase
    .from("realizacje")
    .select("*", { count: "exact", head: true })
    .eq("published", true);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1C1C1C]">Dashboard</h1>
        <p className="text-gray-500 mt-1">Zarządzaj stroną Lumaris</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Wszystkie realizacje</p>
          <p className="text-3xl font-bold text-[#1C1C1C]">{totalCount ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Opublikowane</p>
          <p className="text-3xl font-bold text-[#D4AF37]">{publishedCount ?? 0}</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/realizacje/nowa"
          className="flex items-center gap-4 bg-[#D4AF37] text-[#1C1C1C] rounded-xl p-6 hover:bg-[#c49b2e] transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-[#1C1C1C]/10 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Dodaj realizację</p>
            <p className="text-sm opacity-70">Nowy projekt do portfolio</p>
          </div>
        </Link>

        <Link
          href="/admin/realizacje"
          className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-6 hover:border-[#D4AF37]/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-[#1C1C1C]">Zarządzaj realizacjami</p>
            <p className="text-sm text-gray-500">Edytuj i publikuj projekty</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
