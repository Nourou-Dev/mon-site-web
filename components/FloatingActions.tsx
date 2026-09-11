"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, Bot, X } from "lucide-react";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Bouton de défilement vers le haut (à gauche, en bleu) */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retourner en haut de page"
        className={`focus-ring fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#0060c3] text-white shadow-xl shadow-[#0060c3]/30 transition-all hover:bg-[#0050a5] hover:-translate-y-0.5 active:scale-95 sm:bottom-6 sm:left-6 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.4} />
      </button>

      {/* Bouton Assistant / Contact rapide (à droite) */}
      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50 sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          aria-expanded={chatOpen}
          aria-label={
            chatOpen ? "Fermer l'assistant" : "Ouvrir l'assistant"
          }
          className="focus-ring flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#171717] text-white shadow-xl transition-transform hover:-translate-y-0.5 hover:bg-black active:scale-95"
        >
          {chatOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </button>

        {chatOpen && (
          <div className="absolute bottom-[3.75rem] sm:bottom-[4.25rem] right-0 w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl border border-black/10 bg-white p-4 shadow-2xl">
            <p className="text-sm font-bold text-[#171717]">
              Une question rapide ?
            </p>
            <p className="mt-1.5 text-xs sm:text-sm text-[#4b4b4b]">
              Décrivez votre projet en quelques mots, la réponse arrive par
              e-mail sous 24 h.
            </p>
            <Link
              href="/contact"
              onClick={() => setChatOpen(false)}
              className="focus-ring mt-3 inline-flex items-center justify-center rounded-full bg-[#0060c3] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white transition-transform active:scale-95 hover:bg-[#0050a5]"
            >
              Écrire un message
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
