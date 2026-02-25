import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#D4AF37] via-[#c9a832] to-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] mb-4">
          Gotowy na zmiany?
        </h2>
        <p className="text-[#1C1C1C]/80 text-lg max-w-xl mx-auto mb-8">
          Skontaktuj się z nami i uzyskaj bezpłatną wycenę swojego projektu.
          Odpowiemy w ciągu 24 godzin.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/kontakt"
            className="bg-[#1C1C1C] text-[#D4AF37] px-8 py-4 rounded font-semibold text-base hover:bg-[#2a2a2a] transition-colors duration-200"
          >
            Napisz do nas
          </Link>
          <a
            href="tel:+48500000000"
            className="border-2 border-[#1C1C1C] text-[#1C1C1C] px-8 py-4 rounded font-semibold text-base hover:bg-[#1C1C1C]/10 transition-colors duration-200"
          >
            Zadzwoń: +48 500 000 000
          </a>
        </div>
      </div>
    </section>
  );
}
