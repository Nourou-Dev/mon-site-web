import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { navLinks, site } from "@/lib/data";

const socialLinks = [
  {
    name: "WhatsApp",
    href: site.whatsapp,
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8 2.53 1.09 2.53.73 2.98.69.46-.04 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.3" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: <Facebook className="h-4 w-4" strokeWidth={2} />,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <Linkedin className="h-4 w-4" strokeWidth={2} />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: <Instagram className="h-4 w-4" strokeWidth={2} />,
  },
  {
    name: "Behance",
    href: "https://behance.net",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.148 0-5.625-3.328-5.625-5.906 0-3.344 2.109-6.094 5.75-6.094 4.703 0 5.484 3.844 5.094 6.75h-7.859c0 .734.172 3.25 3.016 3.25 1.5 0 2.422-.688 2.828-1.391l1.897.391zm-5.063-4.156c.031-1.016-.406-2.094-1.922-2.094-1.469 0-1.969 1.031-2.063 2.094h3.985zm-11.663-7.844h-7v14h7.047c3.484 0 4.953-1.688 4.953-3.797 0-1.578-.859-2.797-2.281-3.219 1.156-.453 1.844-1.484 1.844-2.922 0-2.312-1.781-4.062-4.563-4.062zm-3.953 5.438h3.328c1.016 0 1.703.453 1.703 1.469 0 1.031-.688 1.547-1.703 1.547h-3.328v-3.016zm0 4.609h3.453c1.234 0 1.938.563 1.938 1.688 0 1.188-.828 1.75-1.984 1.75h-3.407v-3.438z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="mt-6 bg-white px-4 pb-6 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] border border-[#171717]/8 bg-[#f8f9fa] pt-14 shadow-[0_15px_40px_rgba(17,17,17,0.04)]">
        <div className="grid gap-10 px-6 sm:px-10 md:grid-cols-[1.2fr_1fr_1fr] lg:px-14">
          <div>
            <Link
              href="/"
              className="inline-flex min-w-0 items-center gap-1.5 text-[1.15rem] sm:text-xl font-extrabold tracking-[-0.05em] text-[#171717] transition-opacity hover:opacity-85"
            >
              <span>Nourou Dine</span>
              <span className="text-[#0060c3]">AMANDOU</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#4b4b4b]">
              Sites et applications web sur mesure, pensés pour convertir et faciliter le suivi de votre projet, de bout en bout.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#171717]/10 text-[#171717]/70 transition-all duration-200 hover:bg-[#0060c3] hover:border-[#0060c3] hover:text-white hover:-translate-y-0.5 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-[#171717]">Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="focus-ring rounded text-sm text-[#4b4b4b] hover:text-[#171717]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-[#171717]">Contact</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="focus-ring flex items-center gap-2.5 rounded text-sm text-[#4b4b4b] hover:text-[#171717]"
                >
                  <Phone className="h-4 w-4 text-[#0060c3]" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="focus-ring flex items-center gap-2.5 rounded text-sm text-[#4b4b4b] hover:text-[#171717]"
                >
                  <Mail className="h-4 w-4 text-[#0060c3]" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-[#171717]/5 px-5 py-5 text-xs text-[#4b4b4b] sm:flex-row sm:px-10 lg:px-14">
          <p>
            © {new Date().getFullYear()} Nourou Dine AMANDOU — Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:gap-5">
            <Link href="/mentions-legales" className="focus-ring rounded hover:text-[#0060c3] transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="focus-ring rounded hover:text-[#0060c3] transition-colors">
              Confidentialité
            </Link>
            <span className="text-[#171717]/20">·</span>
            <Link href="/app" className="focus-ring rounded hover:text-[#0060c3] transition-colors">
              Espace Client
            </Link>
            <Link href="/admin" className="focus-ring rounded hover:text-[#0060c3] transition-colors font-semibold">
              Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
