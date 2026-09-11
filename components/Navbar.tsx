"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      <div
        className={`mx-auto w-full border-b transition-all duration-300 ${
          scrolled
            ? "border-[#C9C4B8] bg-[#F6F4EF]/95 shadow-xs backdrop-blur-md"
            : "border-[#C9C4B8]/60 bg-[#F6F4EF]/85 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-[1360px] items-center justify-between px-4 py-3.5 sm:px-6 lg:px-10">
          {/* Logo & Signature Studio */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex flex-col focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-serif text-lg sm:text-xl font-normal tracking-tight text-[#1B1D22] group-hover:text-[#3D5AFE] transition-colors">
                Nourou Dine AMANDOU
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 border border-[#C9C4B8] bg-white px-2 py-0.5 text-[10px] font-mono text-[#1B1D22]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B3D]" />
                Disponible
              </span>
            </div>
            <span className="text-xs font-mono text-[#1B1D22]/60 font-normal">
              Atelier d&apos;art &amp; Code sur mesure
            </span>
          </Link>

          {/* Navigation Desktop Éditoriale */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative py-1 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#1B1D22]"
                      : "text-[#4B4D54] hover:text-[#3D5AFE]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#1B1D22] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Bouton d'action direct & Menu mobile */}
          <div className="flex items-center gap-3">
            <Link
              href="/app"
              className="hidden xl:inline-flex text-xs font-medium text-[#4B4D54] hover:text-[#1B1D22] transition-colors py-2 px-3 rounded-lg hover:bg-black/5"
            >
              Espace Client
            </Link>

            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#1B1D22] px-5 py-2.5 text-xs font-medium text-[#F6F4EF] transition-all hover:bg-[#3D5AFE] active:scale-95"
            >
              <span>Discuter du projet</span>
            </Link>

            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu de navigation"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C9C4B8] bg-white p-2 text-[#1B1D22] transition-all hover:bg-[#F6F4EF] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1B1D22] lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop sombre */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-[65px] z-40 bg-black/30 backdrop-blur-sm transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Tiroir menu mobile soigné */}
      <div
        className={`relative z-50 w-full overflow-hidden border-b border-[#171717]/10 bg-[#fbf9f5] transition-all duration-300 ease-in-out lg:hidden ${
          open
            ? "max-h-[calc(100dvh-4.5rem)] opacity-100 shadow-2xl overflow-y-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1 p-6">
          <div className="mb-4 pb-3 border-b border-[#171717]/8 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              Menu Studio
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Projets ouverts pour 2026
            </span>
          </div>

          <nav className="flex flex-col gap-1" aria-label="Menu mobile">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`min-h-[48px] flex items-center justify-between rounded-xl px-4 py-3 text-sm tracking-[0.06em] transition-all ${
                    isActive
                      ? "bg-black/5 font-bold text-[#1B1D22]"
                      : "font-medium text-[#1B1D22]/70 hover:bg-black/5 hover:text-[#1B1D22]"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="mt-4 pt-4 border-t border-[#171717]/8 flex flex-col gap-2">
              <Link
                href="/app"
                onClick={() => setOpen(false)}
                className="min-h-[48px] flex items-center justify-between rounded-xl px-4 py-3 text-xs uppercase tracking-[0.14em] text-[#171717] font-semibold bg-white border border-[#171717]/10 shadow-sm"
              >
                <span>Accès Espace Client</span>
                <span className="text-[10px] rounded-full bg-[#171717] text-white px-2 py-0.5">Privé</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex min-h-[48px] items-center justify-center bg-[#1B1D22] px-6 py-3.5 text-xs font-mono text-white transition-colors hover:bg-[#3D5AFE]"
              >
                <span>Lancer un projet</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
