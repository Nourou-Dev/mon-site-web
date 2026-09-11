"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, site } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`flex w-full items-center justify-between border-b border-[#171717]/10 bg-[#f4efe9] px-4 py-3.5 transition-all duration-200 sm:px-6 lg:px-8 ${
          scrolled ? "shadow-[0_12px_30px_-20px_rgba(23,23,23,0.25)]" : ""
        }`}
      >
        <a
          href="#accueil"
          className="flex items-center gap-1 text-lg font-extrabold tracking-[-0.05em] text-[#171717]"
        >
          <span>Nourou Dine</span>
          <span className="text-[#f07a42]">AMANDOU</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#171717]/70 transition-colors duration-200 hover:text-[#171717]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-[#171717] px-6 py-3.5 text-[0.95rem] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 sm:inline-flex"
          >
            Discutons de votre projet
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="border border-[#171717]/10 bg-white p-2.5 text-[#171717] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="w-full border-b border-[#171717]/10 bg-[#f4efe9] p-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#171717]/80 transition-colors hover:bg-white hover:text-[#171717]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#171717] px-6 py-3.5 text-[0.95rem] font-semibold text-white"
            >
              Discutons de votre projet
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
