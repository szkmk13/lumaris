import { createClient } from "@/lib/supabase/server";
import RealizacjeGrid from "@/components/realizacje/RealizacjeGrid";
import type { Realizacja } from "@/lib/supabase/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Realizacje — Lumaris",
  description: "Nasze projekty elektryczne, smart home i oświetlenia ogrodowego.",
};

export default async function RealizacjePage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("realizacje")
    .select("*")
    .eq("published", true)
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  const realizacje = (data ?? []) as Realizacja[];

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-[#1C1C1C] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase mb-3">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold text-white">Nasze realizacje</h1>
          <p className="mt-3 text-gray-400 max-w-xl">
            Projekty, które zrealizowaliśmy z pasją i dbałością o każdy detal.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RealizacjeGrid realizacje={realizacje ?? []} />
      </div>
    </div>
  );
}
