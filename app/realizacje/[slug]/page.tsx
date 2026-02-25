import { createClient } from "@/lib/supabase/server";
import RealizacjaDetail from "@/components/realizacje/RealizacjaDetail";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Realizacja } from "@/lib/supabase/types";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("realizacje")
    .select("title, description")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  const row = data as { title: string; description: string | null } | null;
  if (!row) return { title: "Realizacja — Lumaris" };

  return {
    title: `${row.title} — Lumaris`,
    description: row.description ?? undefined,
  };
}

export default async function RealizacjaPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("realizacje")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  const realizacja = data as Realizacja | null;

  if (!realizacja) notFound();

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/realizacje"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#D4AF37] mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Wróć do realizacji
        </Link>

        <RealizacjaDetail realizacja={realizacja} />
      </div>
    </div>
  );
}
