import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="accueil" className="relative w-full bg-[#F6F4EF] pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-44 lg:pb-28 border-b border-[#C9C4B8] overflow-hidden">
      {/* Grille exposée en transparence */}
      <div className="absolute inset-0 exposed-grid pointer-events-none opacity-50" />

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          
          {/* Colonne gauche : Alignement strict à gauche, grand titre Fraunces */}
          <div className="flex flex-col items-start">
            <div className="mb-6 flex items-center gap-3 text-xs font-mono text-[#4B4D54]">
              <span className="h-2 w-2 rounded-full bg-[#FF6B3D]" />
              <span>Systèmes visuels &amp; ingénierie web sur mesure</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-light leading-[1.06] tracking-[-0.03em] text-[#1B1D22]">
              Des interfaces conçues avec rigueur, pour inspirer une{" "}
              <span className="italic font-normal">
                confiance immédiate
              </span>.
            </h1>

            <p className="mt-6 sm:mt-8 max-w-lg text-base sm:text-lg leading-relaxed text-[#4B4D54] font-light">
              Atelier de design et de code indépendant. Je conçois des sites vitrines et des applications web rapides, pensés pour valoriser votre travail et convertir vos visiteurs.
            </p>

            {/* Actions sobres sans flèches */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#1B1D22] px-7 py-3 text-xs font-medium text-[#F6F4EF] transition-all hover:bg-[#3D5AFE] active:scale-95"
              >
                <span>Discuter du projet</span>
              </Link>

              <Link
                href="/realisations"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#C9C4B8] bg-white px-7 py-3 text-xs font-medium text-[#1B1D22] transition-all hover:bg-[#F6F4EF]"
              >
                <span>Explorer les réalisations</span>
              </Link>
            </div>
          </div>

          {/* Colonne droite : Vignette asymétrique de projet (La preuve avant l'argument) */}
          <div className="relative w-full">
            <Link
              href="/realisations/asteria"
              className="group block overflow-hidden rounded-2xl border border-[#C9C4B8] bg-white p-4 sm:p-5 shadow-xs transition-all hover:border-[#1B1D22]/40"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#C9C4B8]/50 text-xs text-[#4B4D54]">
                <div className="flex items-center gap-2 font-mono">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  <span>Étude de cas récente</span>
                </div>
                <span className="font-mono text-[11px] text-[#4B4D54]">asteria-properties.ch</span>
              </div>

              <div className="relative mt-3 aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#EBE7DF]">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
                  alt="Aperçu du projet Asteria Properties"
                  fill
                  priority
                  sizes="(min-width: 1024px) 550px, (min-width: 640px) 500px, 320px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
              </div>

              <div className="mt-4 flex flex-col gap-1">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-lg font-medium text-[#1B1D22] group-hover:text-[#3D5AFE] transition-colors">
                    Asteria Properties
                  </h2>
                  <span className="text-xs font-mono text-[#3D5AFE]">
                    Consulter l&apos;étude
                  </span>
                </div>
                <p className="text-xs text-[#4B4D54] leading-relaxed">
                  Plateforme immobilière haut de gamme · Temps de chargement 0.7s · Demandes qualifiées +140%
                </p>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
