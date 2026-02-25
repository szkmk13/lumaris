const stats = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    value: "10+",
    label: "Lat doświadczenia",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    value: "200+",
    label: "Zrealizowanych projektów",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
      </svg>
    ),
    value: "100%",
    label: "Zadowolonych klientów",
  },
];

export default function About() {
  return (
    <section id="o-nas" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <p className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase mb-4">
              Kim jesteśmy
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1C1C] leading-tight mb-6">
              Pasja do elektryki<br />
              <span className="text-[#D4AF37]">i nowoczesnych technologii</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Lumaris to firma specjalizująca się w kompleksowych usługach elektrycznych.
              Od ponad dekady realizujemy projekty, które łączą bezpieczeństwo, estetykę
              i nowoczesne technologie smart home.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Każda realizacja traktujemy indywidualnie — słuchamy potrzeb klienta i
              projektujemy rozwiązania idealnie dopasowane do jego wymagań. Używamy
              wyłącznie sprawdzonych materiałów od renomowanych producentów.
            </p>
            <div className="w-12 h-0.5 bg-[#D4AF37]" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-5 p-6 rounded-lg bg-gray-50 border border-gray-100 hover:border-[#D4AF37]/30 transition-colors"
              >
                <div className="text-[#D4AF37] shrink-0">{stat.icon}</div>
                <div>
                  <div className="text-3xl font-bold text-[#1C1C1C]">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
