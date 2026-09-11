"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, site } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermer automatiquement le menu si l'écran repasse en mode desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Fermer le menu sur la touche Échap
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Gestion propre du scroll du body
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
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`flex w-full items-center justify-between border-b border-[#171717]/10 bg-white/95 backdrop-blur-md px-4 py-3.5 transition-all duration-200 sm:px-6 lg:px-8 ${
          scrolled ? "shadow-[0_12px_30px_-20px_rgba(23,23,23,0.25)]" : ""
        }`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-1 text-[0.95rem] font-extrabold tracking-[-0.05em] text-[#171717] sm:text-lg"
        >
          <span className="truncate">Nourou Dine</span>
          <span className="shrink-0 text-[#0060c3]">AMANDOU</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-1 text-[0.74rem] font-bold uppercase tracking-[0.14em] text-[#171717] transition-colors duration-200"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-[#0060c3] transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-full bg-[#0060c3] px-6 py-3.5 text-[0.95rem] font-semibold text-white shadow-md shadow-[#0060c3]/20 transition-all duration-200 hover:bg-[#0050a5] hover:-translate-y-0.5 active:scale-95 lg:inline-flex"
          >
            Discutons de votre projet
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#171717]/10 bg-white p-2 text-[#171717] transition-all hover:bg-[#f4f6f8] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0060c3] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Backdrop sombre fermant le menu au clic extérieur */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-[57px] z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Tiroir menu mobile animé */}
      <div
        className={`relative z-50 w-full overflow-hidden border-b border-[#171717]/10 bg-white transition-all duration-300 ease-in-out lg:hidden ${
          open
            ? "max-h-[calc(100dvh-4rem)] opacity-100 shadow-2xl overflow-y-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-1.5 p-5 pb-6" aria-label="Menu mobile">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`min-h-[44px] flex items-center rounded-xl px-4 py-3 text-[0.84rem] uppercase tracking-[0.14em] text-[#171717] transition-all focus:outline-none focus:ring-2 focus:ring-[#0060c3] ${
                  isActive
                    ? "bg-[#f4f6f8] font-extrabold shadow-sm border border-[#171717]/5"
                    : "font-semibold hover:bg-[#f4f6f8]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/app"
            onClick={() => setOpen(false)}
            className="min-h-[44px] flex items-center justify-between rounded-xl px-4 py-3 text-[0.84rem] uppercase tracking-[0.14em] text-[#0060c3] font-bold bg-[#0060c3]/5 border border-[#0060c3]/15 transition-all hover:bg-[#0060c3]/10"
          >
            <span>Espace Client</span>
            <span className="text-[10px] rounded-full bg-[#0060c3] text-white px-2 py-0.5">Accès</span>
          </Link>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#0060c3] px-6 py-3.5 text-[0.95rem] font-semibold text-white shadow-md shadow-[#0060c3]/20 transition-transform active:scale-95 hover:bg-[#0050a5] focus:outline-none focus:ring-2 focus:ring-[#0060c3]"
          >
            Discutons de votre projet
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
