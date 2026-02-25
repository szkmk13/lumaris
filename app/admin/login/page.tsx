"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Nieprawidłowe hasło");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-3xl font-bold text-[#D4AF37] tracking-wider">LUMARIS</span>
          <p className="text-gray-400 mt-2 text-sm">Panel administracyjny</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#242424] rounded-xl p-8 border border-[#D4AF37]/10"
        >
          <h1 className="text-white font-bold text-xl mb-6">Zaloguj się</h1>

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Hasło</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[#1C1C1C] border border-[#D4AF37]/20 text-white focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#D4AF37] text-[#1C1C1C] py-3 rounded-lg font-semibold hover:bg-[#c49b2e] disabled:opacity-50 transition-colors"
          >
            {loading ? "Logowanie..." : "Zaloguj"}
          </button>
        </form>
      </div>
    </div>
  );
}
