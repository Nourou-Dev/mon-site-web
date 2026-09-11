import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://exemple-yk-dev.vercel.app"),
  title: "YK.dev — Développeur web freelance",
  description:
    "Yann conçoit des sites et applications web sur mesure : sites vitrines, e-commerce et outils métier, avec un espace client pour suivre chaque projet en temps réel.",
  openGraph: {
    title: "YK.dev — Développeur web freelance",
    description:
      "Sites vitrines, e-commerce et applications web sur mesure, avec un espace client en temps réel.",
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
    <html lang="fr">
      <body className="font-body antialiased">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
