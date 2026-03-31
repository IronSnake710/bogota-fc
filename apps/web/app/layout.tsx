import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bogota FC - Sitio Oficial",
    template: "%s | Bogota FC",
  },
  description: "Sitio oficial de Bogota FC. Encuentra noticias, calendario de partidos, plantilla, entradas y toda la información del club.",
  keywords: ["Bogota FC", "fútbol", "Colombia", "Primera A", "fútbol colombiano"],
  authors: [{ name: "Bogota FC" }],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://bogotafc.com",
    siteName: "Bogota FC",
    title: "Bogota FC - Sitio Oficial",
    description: "Sitio oficial de Bogota FC. Encuentra noticias, calendario de partidos, plantilla, entradas y toda la información del club.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@bogotafc",
    creator: "@bogotafc",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bogotafc.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
