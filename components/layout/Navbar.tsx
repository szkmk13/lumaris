"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/#uslugi", label: "Usługi" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1C1C1C]/95 backdrop-blur-sm border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#D4AF37] tracking-wider">
              LUMARIS
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#D4AF37] transition-colors duration-200 text-sm font-medium tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              className="bg-[#D4AF37] text-[#1C1C1C] px-5 py-2 rounded text-sm font-semibold hover:bg-[#c49b2e] transition-colors duration-200"
            >
              Wycena
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-300 hover:text-[#D4AF37] p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#D4AF37]/20">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-[#D4AF37] transition-colors py-2 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="bg-[#D4AF37] text-[#1C1C1C] px-5 py-2 rounded text-sm font-semibold text-center hover:bg-[#c49b2e] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Wycena
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
