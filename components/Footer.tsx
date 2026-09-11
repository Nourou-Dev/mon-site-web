import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { navLinks, site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-6 px-4 pb-6 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] border border-[#171717]/5 bg-[#f7f4f2] pt-14 shadow-[0_15px_40px_rgba(17,17,17,0.04)]">
        <div className="grid gap-10 px-6 sm:px-10 md:grid-cols-[1.2fr_1fr_1fr] lg:px-14">
          <div>
            <p className="text-lg font-black tracking-tight text-[#171717]">
              {site.brand}
              <span className="text-[#d76b45]">{site.brandSuffix}</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#4b4b4b]">
              Sites et applications web sur mesure, pensés pour convertir et faciliter le suivi de votre projet, de bout en bout.
            </p>
            <div className="mt-5 flex gap-2.5">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Réseau social"
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f1ed] text-[#171717]/65 transition-colors hover:bg-[#171717] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-[#171717]">Navigation</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="focus-ring rounded text-sm text-[#4b4b4b] hover:text-[#171717]">
                    {link.label}
                  </a>
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
                  <Phone className="h-4 w-4 text-[#d76b45]" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="focus-ring flex items-center gap-2.5 rounded text-sm text-[#4b4b4b] hover:text-[#171717]"
                >
                  <Mail className="h-4 w-4 text-[#d76b45]" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 select-none overflow-hidden text-center">
          <p aria-hidden className="translate-y-6 text-[3.5rem] font-black leading-none tracking-tight text-[#f3e5df] sm:text-[7rem]">
            {site.brand}
            {site.brandSuffix}
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#171717]/5 px-6 py-6 text-xs text-[#4b4b4b] sm:flex-row sm:px-10 lg:px-14">
          <p>
            © {new Date().getFullYear()} {site.brand}
            {site.brandSuffix} — Tous droits réservés.
          </p>
          <div className="flex gap-5">
            <a href="#" className="focus-ring rounded hover:text-[#171717]">Mentions légales</a>
            <a href="#" className="focus-ring rounded hover:text-[#171717]">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
