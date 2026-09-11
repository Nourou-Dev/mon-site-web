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
    <footer className="border-t border-[#171717]/10 bg-[#fbf9f5] px-4 pt-16 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Col 1: Studio Identity */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-display text-2xl font-normal tracking-[-0.03em] text-[#171717] transition-opacity hover:opacity-80"
            >
              <span>Nourou Dine</span>
              <span className="font-light italic">AMANDOU</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-[#4b4b4b] font-light leading-relaxed">
              Atelier indépendant de design d&apos;interface et d&apos;ingénierie web sur mesure. Code propriétaire, performance garantie et accompagnement transparent de bout en bout.
            </p>
            
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#737373]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span>Disponible pour de nouveaux projets</span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#171717]/15 bg-white text-[#171717] transition-all hover:bg-[#171717] hover:border-[#171717] hover:text-white hover:-translate-y-0.5 shadow-2xs"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#737373]">[ EXPLORATION ]</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-[#4b4b4b] hover:text-[#171717] font-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/app" 
                  className="text-sm text-[#171717] font-medium hover:underline transition-colors"
                >
                  Espace Client Privé →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#737373]">[ CONTACT DIRECT ]</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-[#4b4b4b] hover:text-[#171717] font-light transition-colors"
                >
                  <Phone className="h-4 w-4 text-[#171717]" />
                  <span>{site.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 text-sm text-[#4b4b4b] hover:text-[#171717] font-light transition-colors"
                >
                  <Mail className="h-4 w-4 text-[#171717]" />
                  <span>{site.email}</span>
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#171717]/15 bg-white px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#171717] hover:bg-[#171717] hover:text-white transition-all shadow-2xs"
                >
                  <span>Discussion WhatsApp</span>
                  <span>→</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#171717]/10 pt-8 text-xs font-mono text-[#737373] sm:flex-row">
          <p>
            © {new Date().getFullYear()} Nourou Dine AMANDOU — Conception éditoriale &amp; code sur mesure.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:gap-6">
            <Link href="/mentions-legales" className="hover:text-[#171717] transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-[#171717] transition-colors">
              Confidentialité
            </Link>
            <span>·</span>
            <Link href="/app" className="hover:text-[#171717] transition-colors">
              Espace Client
            </Link>
            <Link href="/admin" className="hover:text-[#171717] transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
