"use client";

import { useEffect, useState } from "react";
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
      <div className="fixed bottom-5 left-4 z-50 sm:bottom-6 sm:left-6">
        <button
          type="button"
          onClick={() => setChatOpen((v) => !v)}
          aria-expanded={chatOpen}
          aria-label={
            chatOpen ? "Fermer l'assistant" : "Ouvrir l'assistant"
          }
          className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-ember-500 text-white shadow-xl shadow-ember-500/30 transition-transform hover:-translate-y-0.5"
        >
          {chatOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Bot className="h-6 w-6" />
          )}
        </button>

        {chatOpen && (
          <div className="absolute bottom-[4.25rem] left-0 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-black/5 bg-white p-4 shadow-2xl">
            <p className="text-sm font-semibold text-ink">
              Une question rapide ?
            </p>
            <p className="mt-1.5 text-sm text-ink/60">
              Décrivez votre projet en quelques mots, la réponse arrive par
              e-mail sous 24 h.
            </p>
            <a
              href="#contact"
              onClick={() => setChatOpen(false)}
              className="focus-ring mt-3 inline-flex items-center justify-center rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white"
            >
              Écrire un message
            </a>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retourner en haut de page"
        className={`focus-ring fixed bottom-5 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-xl transition-all sm:bottom-6 sm:right-6 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
}
