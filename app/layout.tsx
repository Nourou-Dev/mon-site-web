import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nourou Dine AMANDOU — Développeur Web Freelance & Créateur Digital",
  description:
    "Nourou Dine AMANDOU conçoit des sites vitrines, boutiques e-commerce et applications web modernes, performantes et sur mesure.",
  openGraph: {
    title: "Nourou Dine AMANDOU — Développeur Web Freelance & Créateur Digital",
    description:
      "Conception de sites vitrines, e-commerce et applications web sur mesure avec une expérience utilisateur soignée.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF9F6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${manrope.variable} ${fraunces.variable}`}>
      <body className="font-body antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
        >
          Aller au contenu
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
