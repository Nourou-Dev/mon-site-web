import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck, Zap, Code2, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="accueil" className="relative w-full bg-[#fbf9f5] pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 border-b border-[#171717]/8">
      {/* Texture de fond subtile papier / grille architecturale */}
      <div className="absolute inset-0 bg-[radial-gradient(#171717_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.035] pointer-events-none" />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        {/* En-tête éditoriale */}
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          
          {/* Colonne gauche : Titre & Proposition d'autorité */}
          <div className="flex flex-col items-start">
            {/* Chapitre discret */}
            <div className="mb-6 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              <span className="h-px w-6 bg-[#171717]/30" />
              <span>Conception Web Sur Mesure · Sans Modèle Préconçu</span>
            </div>

            {/* Titre monumental d'auteur */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.85rem] font-black leading-[1.08] tracking-[-0.03em] text-[#171717]">
              Votre entreprise mérite un site qui inspire une{" "}
              <span className="italic font-normal underline decoration-[#171717]/20 decoration-2 underline-offset-8">
                confiance immédiate
              </span>.
            </h1>

            {/* Manifeste court */}
            <p className="mt-6 sm:mt-8 max-w-[560px] text-base sm:text-lg leading-relaxed text-[#4b5563]">
              Développeur web &amp; designer UI/UX indépendant. Je conçois des sites vitrines d&apos;exception, des boutiques e-commerce fluides et des applications métier sur mesure qui valorisent votre travail et transforment vos visiteurs en clients.
            </p>

            {/* Actions principales */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#171717] px-7 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-black/10 transition-all hover:bg-[#2b2b2b] hover:-translate-y-0.5 active:scale-95"
              >
                <span>Discuter de votre projet</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>

              <Link
                href="/realisations"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-[#171717]/15 bg-white px-7 py-3.5 text-sm font-semibold tracking-[0.02em] text-[#171717] transition-all hover:bg-black/5 hover:border-[#171717]/30"
              >
                <span>Explorer les réalisations</span>
                <ArrowRight className="h-4 w-4 text-[#6b7280]" strokeWidth={2} />
              </Link>
            </div>

            {/* 3 Engagements concrets */}
            <div className="mt-10 sm:mt-12 pt-8 border-t border-[#171717]/10 grid grid-cols-3 gap-4 w-full max-w-[540px]">
              <div>
                <span className="block font-display text-2xl sm:text-3xl font-black tracking-tight text-[#171717]">99+</span>
                <span className="mt-0.5 block text-[11px] uppercase tracking-wider text-[#6b7280] font-medium">Performance Google</span>
              </div>
              <div>
                <span className="block font-display text-2xl sm:text-3xl font-black tracking-tight text-[#171717]">100%</span>
                <span className="mt-0.5 block text-[11px] uppercase tracking-wider text-[#6b7280] font-medium">Code sur mesure</span>
              </div>
              <div>
                <span className="block font-display text-2xl sm:text-3xl font-black tracking-tight text-[#171717]">0€</span>
                <span className="mt-0.5 block text-[11px] uppercase tracking-wider text-[#6b7280] font-medium">Abonnement captif</span>
              </div>
            </div>
          </div>

          {/* Colonne droite : Portrait d'artisan & Légende soignée */}
          <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
            <div className="relative overflow-hidden rounded-3xl border border-[#171717]/12 bg-gradient-to-b from-white to-[#f4f1ea] p-4 sm:p-6 shadow-2xl shadow-black/5">
              
              {/* Image de profil */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#ebe7de]/60">
                <Image
                  src="/media/nourou-portrait-transparent-2.png"
                  alt="Portrait professionnel de Nourou Dine AMANDOU, développeur web freelance et créateur digital"
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, (min-width: 640px) 380px, 320px"
                  className="object-cover object-top scale-[1.03] transition-transform duration-700 hover:scale-[1.05]"
                />
              </div>

              {/* Fiche technique d'atelier */}
              <div className="mt-5 flex flex-col gap-2 pt-4 border-t border-[#171717]/8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#171717]">
                    Nourou Dine AMANDOU
                  </span>
                  <span className="text-[11px] font-mono text-[#6b7280]">
                    [ 2026 ]
                  </span>
                </div>
                <p className="text-xs text-[#6b7280] leading-relaxed">
                  Fondateur de studio digital, spécialisé dans l&apos;architecture d&apos;interfaces rapides, la typographie soignée et l&apos;expérience utilisateur sans compromis.
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["Next.js 14", "TypeScript", "PostgreSQL", "Figma", "Tailwind"].map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[#171717]/10 bg-white/80 px-2 py-0.5 text-[10px] font-mono text-[#374151]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Ruban architectural de principes (Remplace l'ancien bandeau fake Adidas/Nike) */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-[#171717]/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="flex items-start gap-3">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#171717] text-white text-xs font-mono font-bold">
                01
              </span>
              <div>
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Design Sur Mesure
                </h2>
                <p className="mt-1 text-xs text-[#6b7280] leading-relaxed">
                  Zéro template prêt à l&apos;emploi. Chaque écran est pensé pour votre activité.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#171717] text-white text-xs font-mono font-bold">
                02
              </span>
              <div>
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Performance 99+
                </h2>
                <p className="mt-1 text-xs text-[#6b7280] leading-relaxed">
                  Chargement éclair en moins d&apos;une seconde, sans perte de prospects.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#171717] text-white text-xs font-mono font-bold">
                03
              </span>
              <div>
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Autonomie Totale
                </h2>
                <p className="mt-1 text-xs text-[#6b7280] leading-relaxed">
                  Vous êtes propriétaire à 100% de votre code, de votre nom et de vos données.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#171717] text-white text-xs font-mono font-bold">
                04
              </span>
              <div>
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Espace Client Dédié
                </h2>
                <p className="mt-1 text-xs text-[#6b7280] leading-relaxed">
                  Suivi en temps réel de vos jalons, livrables et échanges directs.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
