import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Realizacja } from "@/lib/supabase/types";
import EditForm from "./EditForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditRealizacjaPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("realizacje")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  return <EditForm realizacja={data as Realizacja} />;
}
