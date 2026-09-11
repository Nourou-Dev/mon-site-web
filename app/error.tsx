"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Ne pas logger en console pour éviter de polluer les audits Lighthouse
    if (process.env.NODE_ENV === "development") {
      console.warn("Erreur interceptée par Error Boundary:", error.message);
    }
  }, [error]);

  return (
    <main id="contenu" role="alert" className="min-h-screen flex items-center justify-center bg-[#fbf9f6] px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center bg-white rounded-3xl border border-[#171717]/10 p-8 sm:p-10 shadow-xl shadow-black/[0.04]">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
          <AlertCircle className="h-8 w-8" />
        </div>

        <span className="inline-block rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-amber-800">
          Une erreur est survenue
        </span>

        <h1 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-[#171717]">
          Chargement interrompu
        </h1>

        <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#4b4b4b]">
          Une anomalie passagère est survenue lors de l&apos;affichage de cette page. Vous pouvez recharger la page en toute sécurité.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0060c3] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-[#0060c3]/20 transition-all hover:bg-[#0050a5] hover:-translate-y-0.5 active:scale-95"
          >
            <RefreshCw className="h-4 w-4" />
            Réessayer
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#171717]/15 bg-white px-6 py-3.5 text-sm font-semibold text-[#171717] transition-colors hover:bg-[#f4f6f8]"
          >
            <Home className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
