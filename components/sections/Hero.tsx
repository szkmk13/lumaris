import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1C1C1C]">
      {/* Drone photo background */}
      <Image
        src="/dron.jpg"
        alt="Oświetlenie ogrodowe — realizacja Lumaris"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark cinematic overlay — two layers for better text contrast */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60 z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-40 z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="text-[#D4AF37] text-xs font-semibold tracking-[0.35em] uppercase mb-6"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
        >
          Elektryka · Smart Home · Oświetlenie ogrodowe
        </p>

        <h1
          className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
          style={{ textShadow: "0 2px 16px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.8)" }}
        >
          Elektryka.{" "}
          <span className="text-[#D4AF37]">Smart Home.</span>
          <br />
          Oświetlenie ogrodu.
        </h1>

        <p
          className="text-gray-200 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.95)" }}
        >
          Tworzymy inteligentne, estetyczne i bezpieczne instalacje elektryczne.
          Od prostych napraw po zaawansowane systemy smart home i oświetlenie ogrodowe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/kontakt"
            className="bg-[#D4AF37] text-[#1C1C1C] px-8 py-4 rounded-lg font-semibold text-base hover:bg-[#c49b2e] transition-colors duration-200 shadow-lg shadow-[#D4AF37]/20"
          >
            Bezpłatna wycena
          </Link>
          <Link
            href="/realizacje"
            className="border border-[#D4AF37]/50 text-[#D4AF37] px-8 py-4 rounded-lg font-semibold text-base hover:bg-[#D4AF37]/10 transition-colors duration-200 backdrop-blur-sm"
          >
            Zobacz realizacje
          </Link>
        </div>

      </div>
    </section>
  );
}
