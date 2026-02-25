import ContactForm from "@/components/contact/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt — Lumaris",
  description: "Skontaktuj się z Lumaris. Bezpłatna wycena projektu elektrycznego, smart home lub oświetlenia ogrodowego.",
};

export default function KontaktPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-[#1C1C1C] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#D4AF37] text-sm font-medium tracking-[0.3em] uppercase mb-3">
            Napisz do nas
          </p>
          <h1 className="text-4xl font-bold text-white">Kontakt</h1>
          <p className="mt-3 text-gray-400 max-w-xl">
            Masz pytania lub chcesz uzyskać wycenę? Wypełnij formularz, a odpiszemy w ciągu 24 godzin.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-lg font-bold text-[#1C1C1C] mb-4">Dane kontaktowe</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Email</p>
                    <a href="mailto:biuro.lumaris@gmail.com" className="text-[#1C1C1C] font-medium hover:text-[#D4AF37] transition-colors">
                      biuro.lumaris@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Telefon</p>
                    <a href="tel:+48500000000" className="text-[#1C1C1C] font-medium hover:text-[#D4AF37] transition-colors">
                      +48 500 000 000
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Godziny pracy</p>
                    <p className="text-[#1C1C1C] font-medium">Pn–Pt: 8:00–18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-[#1C1C1C] mb-6">Wyślij wiadomość</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
