import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumaris — Elektryka, Smart Home, Oświetlenie ogrodowe",
  description:
    "Lumaris — profesjonalne usługi elektryczne, instalacje smart home i oświetlenie ogrodowe. Realizujemy projekty z pasją i precyzją.",
  keywords: ["elektryka", "smart home", "oświetlenie ogrodowe", "instalacje elektryczne"],
  icons: {
    icon: "/lumaris_logo.png",
    apple: "/lumaris_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
