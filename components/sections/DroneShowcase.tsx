import Link from "next/link";

export default function DroneShowcase() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 border-t border-b border-gray-100 py-14">
          {/* Text */}
          <div>
            <p className="text-[#D4AF37] text-xs font-semibold tracking-[0.35em] uppercase mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] leading-tight">
              Nasze realizacje
            </h2>
            <p className="text-gray-500 mt-3 max-w-md leading-relaxed">
              Przekonaj się jak wyglądają nasze projekty — od oświetlenia ogrodowego
              po instalacje elektryczne i systemy Smart Home.
            </p>
          </div>

          {/* Link */}
          <Link
            href="/realizacje"
            className="group flex items-center gap-5 shrink-0"
          >
            <span className="text-lg font-semibold text-[#1C1C1C] group-hover:text-[#D4AF37] transition-colors duration-200">
              Zobacz realizacje
            </span>
            <span className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#D4AF37] text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#1C1C1C] transition-all duration-200">
              <svg className="w-5 h-5 translate-x-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
