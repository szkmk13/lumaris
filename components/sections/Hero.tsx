import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1C1C1C]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1C] via-[#2a2a2a] to-[#1C1C1C]" />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-[#D4AF37]/10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full border border-[#D4AF37]/5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase mb-6">
          Profesjonalne instalacje
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Elektryka.{" "}
          <span className="text-[#D4AF37]">Smart Home.</span>
          <br />
          Oświetlenie ogrodu.
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Tworzymy inteligentne, estetyczne i bezpieczne instalacje elektryczne.
          Od prostych napraw po zaawansowane systemy smart home i oświetlenie ogrodowe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/kontakt"
            className="bg-[#D4AF37] text-[#1C1C1C] px-8 py-4 rounded font-semibold text-base hover:bg-[#c49b2e] transition-colors duration-200 shadow-lg shadow-[#D4AF37]/20"
          >
            Bezpłatna wycena
          </Link>
          <Link
            href="/realizacje"
            className="border border-[#D4AF37]/50 text-[#D4AF37] px-8 py-4 rounded font-semibold text-base hover:bg-[#D4AF37]/10 transition-colors duration-200"
          >
            Zobacz realizacje
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#D4AF37]/50">
          <span className="text-xs tracking-widest uppercase">Przewiń</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
