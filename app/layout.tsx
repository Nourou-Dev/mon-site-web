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

const SITE_URL = "https://nouroudineamandou.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nourou Dine AMANDOU — Développeur Web Freelance & Créateur Digital",
    template: "%s | Nourou Dine AMANDOU",
  },
  description:
    "Nourou Dine AMANDOU conçoit des sites vitrines, boutiques e-commerce et applications web modernes, performantes et sur mesure avec une expérience utilisateur soignée.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Nourou Dine AMANDOU", url: SITE_URL }],
  creator: "Nourou Dine AMANDOU",
  publisher: "Nourou Dine AMANDOU",
  formatDetection: {
    email: true,
    telephone: true,
  },
  openGraph: {
    title: "Nourou Dine AMANDOU — Développeur Web Freelance & Créateur Digital",
    description:
      "Conception de sites vitrines, e-commerce et applications web sur mesure avec une expérience utilisateur soignée.",
    url: SITE_URL,
    siteName: "Nourou Dine AMANDOU Portfolio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/media/nourou-portrait-transparent-2.png",
        width: 1200,
        height: 630,
        alt: "Nourou Dine AMANDOU — Développeur Web Freelance & Créateur Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nourou Dine AMANDOU — Développeur Web Freelance",
    description:
      "Conception de sites vitrines, e-commerce et applications web sur mesure avec une expérience utilisateur soignée.",
    images: ["/media/nourou-portrait-transparent-2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF9F6",
  width: "device-width",
  initialScale: 1,
};

// Données structurées JSON-LD Schema.org pour Google et moteurs IA
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      "name": "Nourou Dine AMANDOU",
      "url": SITE_URL,
      "jobTitle": "Développeur Web Freelance & Designer UI/UX",
      "email": "contact@nouroudineamandou.com",
      "telephone": "+2290159364445",
      "image": `${SITE_URL}/media/nourou-portrait-transparent-2.png`,
      "description": "Développeur web freelance spécialisé en Next.js, TypeScript, React et architectures web modernes et performantes.",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      "name": "Nourou Dine AMANDOU — Studio Web",
      "url": SITE_URL,
      "founder": { "@id": `${SITE_URL}/#person` },
      "description": "Conception de sites vitrines, boutiques e-commerce et applications web sur mesure.",
      "priceRange": "$$",
      "currenciesAccepted": "XOF, EUR, USD",
      "areaServed": "Worldwide",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${manrope.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[#171717] focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:shadow-xl"
        >
          Aller au contenu principal
        </a>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
