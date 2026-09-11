import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle, Palette } from "lucide-react";
import { heroStats, site } from "@/lib/data";

const brands = [
  {
    name: "adidas",
    logo: (
      <svg viewBox="0 0 120 40" className="h-10 w-auto" aria-label="adidas logo">
        <g fill="#171717" opacity="0.8">
          <path d="M6 28L22 6L30 6L18 28H6Z" />
          <path d="M28 28L44 6L52 6L40 28H28Z" />
          <path d="M50 28L66 6L74 6L62 28H50Z" />
        </g>
      </svg>
    ),
  },
  {
    name: "Pepsi",
    logo: (
      <svg viewBox="0 0 140 40" className="h-10 w-auto" aria-label="Pepsi logo">
        <circle cx="20" cy="20" r="18" fill="#0b4dd8" />
        <circle cx="20" cy="20" r="12" fill="#fff" opacity="0.18" />
        <path d="M11 27C18 20 19 11 31 10C25 18 25 23 18 29C15 31 12 30 11 27Z" fill="#f44336" />
        <path d="M31 10C36 11 42 12 47 17C41 17 35 17 29 22C26 18 28 13 31 10Z" fill="#f8d64e" />
      </svg>
    ),
  },
  {
    name: "Spotify",
    logo: (
      <svg viewBox="0 0 140 40" className="h-10 w-auto" aria-label="Spotify logo">
        <circle cx="20" cy="20" r="18" fill="#1ed760" />
        <path d="M13 17.5C18 16 25 15.5 32 16.5" stroke="#0f1a12" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M12 22C18 20 26 19.5 34 20.8" stroke="#0f1a12" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M13 26.5C20 24.8 28 24.2 36 25.5" stroke="#0f1a12" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Nike",
    logo: (
      <svg viewBox="0 0 140 40" className="h-10 w-auto" aria-label="Nike logo">
        <path d="M9 27C19 22 29 16 42 13C49 11 56 12 64 15C55 18 47 22 39 26C31 29 22 31 9 27Z" fill="#171717" opacity="0.8"/>
        <path d="M42 13C52 13 60 17 72 21C78 23 86 25 98 24C89 27 79 30 68 32C59 33 48 31 42 27C38 24 37 17 42 13Z" fill="#171717" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: "Coca-Cola",
    logo: (
      <svg viewBox="0 0 180 40" className="h-10 w-auto" aria-label="Coca Cola logo">
        <rect x="4" y="8" width="30" height="24" rx="12" fill="#e61d2b" />
        <path d="M16 12C20 12 23 13 25 15C22 16 20 18 18 21C16 24 15 27 13 29C11 27 10 24 10 20C10 16 13 12 16 12Z" fill="#fff" opacity="0.95"/>
        <text x="42" y="28" fill="#d41722" fontSize="20" fontWeight="700" letterSpacing="-1">Coca-Cola</text>
      </svg>
    ),
  },
  {
    name: "Uber",
    logo: (
      <svg viewBox="0 0 130 40" className="h-10 w-auto" aria-label="Uber logo">
        <text x="0" y="27" fill="#171717" fontSize="24" fontWeight="800" letterSpacing="-1">Uber</text>
      </svg>
    ),
  },
  {
    name: "Netflix",
    logo: (
      <svg viewBox="0 0 150 40" className="h-10 w-auto" aria-label="Netflix logo">
        <rect x="4" y="6" width="28" height="28" rx="6" fill="#e50914" />
        <path d="M14 13L22 13L19 27L11 27L14 13Z" fill="#fff" />
        <path d="M25 13L33 13L30 27L22 27L25 13Z" fill="#fff" />
        <text x="42" y="28" fill="#171717" fontSize="22" fontWeight="800" letterSpacing="-1">Netflix</text>
      </svg>
    ),
  },
  {
    name: "Microsoft",
    logo: (
      <svg viewBox="0 0 160 40" className="h-10 w-auto" aria-label="Microsoft logo">
        <rect x="0" y="3" width="16" height="16" fill="#f25022" />
        <rect x="20" y="3" width="16" height="16" fill="#7fba00" />
        <rect x="0" y="23" width="16" height="16" fill="#00a4ef" />
        <rect x="20" y="23" width="16" height="16" fill="#ffb900" />
        <text x="46" y="27" fill="#171717" fontSize="22" fontWeight="700">Microsoft</text>
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section id="accueil" className="w-full scroll-mt-[5.5rem] bg-white">
      <div className="relative w-full bg-white px-0 pb-10 pt-[5.5rem] sm:pb-14 lg:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,96,195,0.08),transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.02),transparent_18%)]" />

        <div className="relative mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-[1.02fr_0.98fr] md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
                <Palette className="h-3.5 w-3.5 text-[#0060c3]" />
                Graphiste &amp; Web Designer
              </span>

              <h1 className="mt-7 max-w-[14ch] font-black tracking-[-0.07em] text-[#171717]">
                Des sites qui font choisir votre marque
              </h1>

              <p className="mt-6 max-w-[34rem] text-lg leading-7 text-[#4b4b4b] lg:max-w-[28rem]">
                Des sites premium, clairs et convertisseurs pour les entrepreneurs qui veulent gagner en crédibilité.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#0060c3] px-6 py-3.5 text-[0.95rem] font-semibold text-white shadow-lg shadow-[#0060c3]/25 transition-all duration-200 hover:bg-[#0050a5] hover:-translate-y-0.5 active:scale-95 text-center"
                >
                  Discutons de votre projet
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/realisations"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#171717]/15 bg-white px-6 py-3.5 text-[0.95rem] font-semibold text-[#171717] transition-colors duration-200 hover:border-[#171717]/30 text-center"
                >
                  Voir mes réalisations
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </Link>
              </div>

            </div>

            <div className="relative mx-auto flex w-full max-w-[28rem] flex-col items-center justify-center lg:mx-0 lg:pb-20">
              <div className="relative flex flex-col items-center">
                <Image
                  src="/media/nourou-portrait-transparent-2.png"
                  alt="Portrait de Nourou"
                  width={760}
                  height={950}
                  priority
                  sizes="(min-width: 1024px) 450px, (min-width: 640px) 390px, 340px"
                  className="relative z-10 h-[min(54vw,340px)] w-auto max-w-full object-contain drop-shadow-[0_22px_40px_rgba(0,0,0,0.12)] sm:h-[390px] lg:h-[450px]"
                />
              </div>

              <div className="relative z-20 mt-4 grid w-full max-w-[24rem] grid-cols-3 gap-1.5 sm:gap-3 lg:absolute lg:left-1/2 lg:top-[74%] lg:mt-0 lg:-translate-x-1/2">
                <div className="flex min-h-[4.25rem] w-full flex-col items-center justify-center rounded-[1rem] sm:rounded-[1.1rem] border border-[#171717]/10 bg-white/90 px-1 py-1.5 sm:py-2 text-center shadow-[0_20px_40px_rgba(23,23,23,0.08)] backdrop-blur-sm sm:h-20">
                  <span className="text-lg sm:text-2xl font-black tracking-[-0.06em] text-[#171717]">4+</span>
                  <span className="mt-0.5 text-[8px] sm:text-[10px] uppercase leading-tight tracking-[0.04em] sm:tracking-[0.12em] text-[#4b4b4b]">Expérience</span>
                </div>

                <div className="flex min-h-[4.25rem] w-full flex-col items-center justify-center rounded-[1rem] sm:rounded-[1.1rem] border border-[#171717]/10 bg-white/90 px-1 py-1.5 sm:py-2 text-center shadow-[0_20px_40px_rgba(23,23,23,0.08)] backdrop-blur-sm sm:h-20">
                  <span className="text-lg sm:text-2xl font-black tracking-[-0.06em] text-[#171717]">10+</span>
                  <span className="mt-0.5 text-[8px] sm:text-[10px] uppercase leading-tight tracking-[0.04em] sm:tracking-[0.12em] text-[#4b4b4b]">Projets livrés</span>
                </div>

                <div className="flex min-h-[4.25rem] w-full flex-col items-center justify-center rounded-[1rem] sm:rounded-[1.1rem] border border-[#171717]/10 bg-[#0060c3] px-1 py-1.5 sm:py-2 text-center text-white shadow-[0_20px_40px_rgba(0,96,195,0.25)] sm:h-20">
                  <span className="text-lg sm:text-2xl font-black tracking-[-0.06em]">92%</span>
                  <span className="mt-0.5 text-[8px] sm:text-[10px] uppercase leading-tight tracking-[0.04em] sm:tracking-[0.12em] text-white/90">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 w-full border-t-0 bg-white">
          <div className="overflow-hidden">
            <div className="brand-marquee flex min-w-max items-center gap-14 py-8 sm:gap-16 sm:py-9">
              {[...brands, ...brands, ...brands, ...brands].map((brand, index) => (
                <div key={`${brand.name}-${index}`} className="flex items-center justify-center opacity-80">
                  {brand.logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
