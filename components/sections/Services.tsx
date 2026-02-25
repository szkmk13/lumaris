const services = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Elektryka",
    description:
      "Kompleksowe instalacje elektryczne w domach i firmach. Modernizacje, przeglądy, naprawy oraz nowe instalacje zgodne z normami.",
    features: [
      "Instalacje elektryczne od podstaw",
      "Modernizacja starych instalacji",
      "Przeglądy i pomiary elektryczne",
      "Instalacje awaryjne i naprawy",
    ],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Smart Home",
    description:
      "Inteligentne systemy zarządzania domem oparte na sprawdzonej marce Grenton. Automatyzacja oświetlenia, ogrzewania, rolet i bezpieczeństwa — wszystko z jednej aplikacji.",
    badge: "Grenton",
    features: [
      "Certyfikowane systemy Grenton",
      "Zarządzanie oświetleniem i roletami",
      "Inteligentne ogrzewanie",
      "Integracja z asystentami głosowymi",
    ],
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Oświetlenie ogrodowe",
    description:
      "Profesjonalne instalacje oświetleniowe do ogrodów realizowane własnym sprzętem. Tworzymy niepowtarzalne efekty świetlne, które podkreślają piękno Twojej przestrzeni.",
    badge: "Własny sprzęt",
    features: [
      "Oświetlenie ścieżek i alejek",
      "Podświetlenie roślin i drzew",
      "Oświetlenie elewacji budynku",
      "Systemy sterowania zewnętrzne",
    ],
  },
];

export default function Services() {
  return (
    <section id="uslugi" className="py-24 lg:py-32 bg-[#1C1C1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase mb-4">
            Co oferujemy
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            Nasze usługi
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Kompleksowe rozwiązania elektryczne dopasowane do Twoich potrzeb.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-[#242424] rounded-2xl p-8 border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                {service.badge && (
                  <span className="text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/40 rounded-full px-3 py-1 tracking-wide">
                    {service.badge}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4 text-[#D4AF37] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
