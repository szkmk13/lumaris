import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import PublishToggle from "./PublishToggle";
import type { Realizacja } from "@/lib/supabase/types";

export default async function AdminRealizacjePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("realizacje")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  const realizacje = (data ?? []) as Realizacja[];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1C]">Realizacje</h1>
          <p className="text-gray-500 mt-1">{realizacje?.length ?? 0} projektów</p>
        </div>
        <Link
          href="/admin/realizacje/nowa"
          className="bg-[#D4AF37] text-[#1C1C1C] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#c49b2e] transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Dodaj nową
        </Link>
      </div>

      {!realizacje || realizacje.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-400">Brak realizacji. Dodaj pierwszą!</p>
          <Link
            href="/admin/realizacje/nowa"
            className="mt-4 inline-block bg-[#D4AF37] text-[#1C1C1C] px-6 py-2 rounded-lg font-semibold text-sm"
          >
            Dodaj realizację
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tytuł
                </th>
                <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Slug
                </th>
                <th className="text-center px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {realizacje.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#1C1C1C] text-sm">{r.title}</p>
                    {r.description && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{r.description}</p>
                    )}
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <code className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                      {r.slug}
                    </code>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <PublishToggle id={r.id} published={r.published} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/realizacje/${r.slug}`}
                        target="_blank"
                        className="text-xs text-gray-400 hover:text-[#D4AF37] transition-colors"
                      >
                        Podgląd
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
