"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUp, MessageSquare, X } from "lucide-react";
import { site } from "@/lib/data";

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
        className={`fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center border border-[#C9C4B8] bg-[#1B1D22] text-white transition-all hover:bg-[#3D5AFE] ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
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
          className="flex h-12 w-12 items-center justify-center border border-[#C9C4B8] bg-[#1B1D22] text-white shadow-lg transition-colors hover:bg-[#3D5AFE]"
        >
          {panelOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageSquare className="h-5 w-5" />
          )}
        </button>

        {panelOpen && (
          <div className="absolute bottom-16 right-0 w-[min(22rem,calc(100vw-3rem))] border border-[#C9C4B8] bg-[#F6F4EF] p-6 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#1B1D22]/60">
              <span className="h-2 w-2 rounded-full bg-[#3D5AFE]"></span>
              <span>Atelier · Réponse sous 24h</span>
            </div>
            
            <p className="mt-3 font-serif text-xl font-normal text-[#1B1D22]">
              Un projet à concrétiser ?
            </p>
            <p className="mt-2 text-xs text-[#1B1D22]/70 leading-relaxed font-sans">
              Discutons de vos enjeux, de vos délais et du cadrage technique sans intermédiaire.
            </p>
            
            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                href="/contact"
                onClick={() => setPanelOpen(false)}
                className="inline-flex items-center justify-center bg-[#1B1D22] px-4 py-2.5 text-xs font-mono text-white transition-colors hover:bg-[#3D5AFE]"
              >
                Formulaire de cadrage
              </Link>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setPanelOpen(false)}
                className="inline-flex items-center justify-center border border-[#C9C4B8] bg-white px-4 py-2 text-xs font-mono text-[#1B1D22] transition-colors hover:bg-[#1B1D22] hover:text-white"
              >
                WhatsApp direct
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
