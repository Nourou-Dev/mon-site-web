"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, MessageSquare, X } from "lucide-react";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Bouton de défilement vers le haut */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Retourner en haut de page"
        className={`focus-ring fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#171717]/20 bg-[#171717] text-white shadow-lg transition-all hover:bg-black hover:-translate-y-0.5 active:scale-95 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2} />
      </button>

      {/* Bouton Contact direct studio */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setPanelOpen((v) => !v)}
          aria-expanded={panelOpen}
          aria-label={
            panelOpen ? "Fermer le menu de contact" : "Échanger sur votre projet"
          }
          className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-[#171717] bg-[#171717] text-white shadow-xl transition-transform hover:-translate-y-0.5 hover:bg-black active:scale-95"
        >
          {panelOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageSquare className="h-5 w-5" />
          )}
        </button>

        {panelOpen && (
          <div className="absolute bottom-16 right-0 w-[min(22rem,calc(100vw-3rem))] rounded-2xl border border-[#171717]/15 bg-[#fbf9f5] p-5 shadow-2xl">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#737373]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span>Atelier · Réponse sous 24h</span>
            </div>
            
            <p className="mt-2 font-display text-lg font-medium text-[#171717]">
              Un projet à concrétiser ?
            </p>
            <p className="mt-1 text-xs text-[#595959] leading-relaxed">
              Discutons de vos enjeux, de vos délais et du cadrage technique sans intermédiaire.
            </p>
            
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="/contact"
                onClick={() => setPanelOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-[#171717] px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-white transition-all hover:bg-black"
              >
                Formulaire de cadrage →
              </Link>
              <a
                href="https://wa.me/22998765432"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setPanelOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-[#171717]/20 bg-white px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#171717] transition-all hover:bg-[#ebe7df]"
              >
                WhatsApp direct ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
