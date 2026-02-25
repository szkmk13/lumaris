import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-gray-400 border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-bold text-[#D4AF37] tracking-wider">LUMARIS</span>
            <p className="mt-3 text-sm leading-relaxed">
              Profesjonalne usługi elektryczne, instalacje smart home i oświetlenie ogrodowe.
              Realizujemy projekty z pasją i precyzją.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Nawigacja</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Strona główna</Link></li>
              <li><Link href="/#uslugi" className="hover:text-[#D4AF37] transition-colors">Usługi</Link></li>
              <li><Link href="/realizacje" className="hover:text-[#D4AF37] transition-colors">Realizacje</Link></li>
              <li><Link href="/kontakt" className="hover:text-[#D4AF37] transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D4AF37] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:biuro.lumaris@gmail.com" className="hover:text-[#D4AF37] transition-colors">
                  biuro.lumaris@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#D4AF37] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+48500000000" className="hover:text-[#D4AF37] transition-colors">
                  +48 500 000 000
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#D4AF37]/10 text-center text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Lumaris. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
