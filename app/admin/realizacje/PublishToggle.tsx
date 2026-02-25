"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function PublishToggle({
  id,
  published,
}: {
  id: string;
  published: boolean;
}) {
  const [isPublished, setIsPublished] = useState(published);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggle = async () => {
    const supabase = createClient();
    const next = !isPublished;
    setIsPublished(next);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from("realizacje")
      .update({ published: next })
      .eq("id", id);

    if (error) {
      setIsPublished(!next);
      return;
    }

    startTransition(() => router.refresh());
  };

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 ${
        isPublished ? "bg-[#D4AF37]" : "bg-gray-200"
      }`}
      title={isPublished ? "Opublikowane — kliknij by ukryć" : "Ukryte — kliknij by opublikować"}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          isPublished ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
