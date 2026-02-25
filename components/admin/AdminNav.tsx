"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1C1C1C] border-b border-[#D4AF37]/20 h-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Image
              src="/lumaris_no_bg.png"
              alt="Lumaris"
              width={100}
              height={26}
              className="object-contain"
            />
            <span className="text-gray-400 text-xs">/ admin</span>
          </Link>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/admin" className="text-gray-400 hover:text-white text-sm transition-colors">
              Dashboard
            </Link>
            <Link href="/admin/realizacje" className="text-gray-400 hover:text-white text-sm transition-colors">
              Realizacje
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
            Wróć do strony
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 text-sm transition-colors"
          >
            Wyloguj
          </button>
        </div>
      </div>
    </nav>
  );
}
