import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
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
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        {r.images?.[0] ? (
                          <Image
                            src={r.images[0]}
                            alt={r.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-[#1C1C1C] text-sm">{r.title}</p>
                        {r.description && (
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{r.description}</p>
                        )}
                      </div>
                    </div>
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
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/realizacje/${r.slug}`}
                        target="_blank"
                        className="text-xs text-gray-400 hover:text-[#D4AF37] transition-colors"
                      >
                        Podgląd
                      </Link>
                      <Link
                        href={`/admin/realizacje/${r.id}`}
                        className="text-xs font-medium text-[#D4AF37] hover:text-[#c49b2e] transition-colors"
                      >
                        Edytuj
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
