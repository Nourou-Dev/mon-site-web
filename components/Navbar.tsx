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
    <header className="fixed inset-x-0 top-3 z-50 px-4 sm:px-6">
      <div
        className={`mx-auto flex max-w-[1140px] items-center justify-between rounded-full border border-[#171717]/10 bg-white/95 px-5 py-2.5 backdrop-blur-md transition-all duration-300 sm:px-6 sm:py-3 ${
          scrolled ? "shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-[#171717]/15" : "shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        }`}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-1.5 text-base font-black tracking-tight text-[#171717] sm:text-lg"
        >
          <span>Nourou Dine</span>
          <span className="rounded-md bg-[#0060c3] px-1.5 py-0.5 text-xs font-bold text-white">DEV</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                  isActive ? "text-[#0060c3]" : "text-[#171717] hover:text-[#0060c3]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#0060c3] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/app"
            className="text-xs font-bold uppercase tracking-[0.14em] text-[#0060c3] hover:underline"
          >
            Espace client
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-full bg-[#0060c3] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#0050a5] hover:shadow-md hover:-translate-y-0.5 active:scale-95 sm:inline-flex"
          >
            Me contacter
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>

          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#171717]/10 bg-[#f8f9fa] text-[#171717] transition-all hover:bg-[#f4f6f8] active:scale-95 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Backdrop sombre fermant le menu mobile au clic extérieur */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-[68px] z-40 bg-black/40 backdrop-blur-sm transition-opacity md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Tiroir menu mobile animé */}
      <div
        className={`mx-auto mt-2 max-w-[1140px] overflow-hidden rounded-3xl border border-[#171717]/10 bg-white shadow-2xl transition-all duration-300 ease-in-out md:hidden ${
          open
            ? "max-h-[calc(100dvh-5.5rem)] opacity-100 overflow-y-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-1.5 p-5" aria-label="Menu mobile">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center rounded-xl px-4 py-3 text-xs uppercase tracking-[0.14em] transition-all ${
                  isActive
                    ? "bg-[#f4f6f8] font-black text-[#0060c3]"
                    : "font-bold text-[#171717] hover:bg-[#f4f6f8]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/app"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-xl bg-[#0060c3]/5 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#0060c3]"
          >
            <span>Espace Client</span>
            <span className="rounded-full bg-[#0060c3] px-2 py-0.5 text-[10px] text-white">Connexion</span>
          </Link>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#0060c3] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-transform active:scale-95"
          >
            Me contacter
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
