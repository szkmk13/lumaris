import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Lumaris — Elektryka, Smart Home, Oświetlenie ogrodowe",
  description:
    "Lumaris — profesjonalne usługi elektryczne, instalacje smart home i oświetlenie ogrodowe. Realizujemy projekty z pasją i precyzją.",
  keywords: ["elektryka", "smart home", "oświetlenie ogrodowe", "instalacje elektryczne"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
