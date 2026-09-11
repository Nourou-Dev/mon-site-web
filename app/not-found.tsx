import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable (404) — Nourou Dine AMANDOU",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <main id="contenu" className="min-h-screen flex items-center justify-center bg-[#fbf9f6] px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center bg-white rounded-3xl border border-[#171717]/10 p-8 sm:p-10 shadow-xl shadow-black/[0.04]">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0060c3]/10 text-[#0060c3]">
          <Compass className="h-8 w-8 animate-pulse" />
        </div>
        
        <span className="inline-block rounded-full bg-[#0060c3]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#0060c3]">
          Erreur 404
        </span>

        <h1 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-[#171717]">
          Page introuvable
        </h1>

        <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4b4b4b]">
          La page que vous tentez d&apos;afficher n&apos;existe pas, a été renommée ou est temporairement inaccessible.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0060c3] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[#0060c3]/20 transition-all hover:bg-[#0050a5] hover:-translate-y-0.5 active:scale-95"
          >
            <Home className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#171717]/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#171717] transition-colors hover:bg-[#f4f6f8]"
          >
            <ArrowLeft className="h-4 w-4" />
            Me contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
