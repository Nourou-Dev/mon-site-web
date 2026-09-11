import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="accueil" className="relative w-full bg-[#F6F4EF] pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 border-b border-[#C9C4B8] overflow-hidden">
      {/* Grille exposée en transparence avec croisillons d'atelier */}
      <div className="absolute inset-0 exposed-grid pointer-events-none opacity-40" />

      {/* Repères de coupe d'atelier aux 4 coins (Swiss drafting marks) */}
      <span className="craft-mark absolute top-6 left-6 hidden lg:block">+</span>
      <span className="craft-mark absolute top-6 right-6 hidden lg:block">+</span>
      <span className="craft-mark absolute bottom-6 left-6 hidden lg:block">+</span>
      <span className="craft-mark absolute bottom-6 right-6 hidden lg:block">+</span>

      <div className="relative mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* Bandeau Colophon d'Atelier (Inspiration Papeterie & Monographie d'art) */}
        <div className="mb-10 pb-4 border-b border-[#C9C4B8] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#1B1D22]/60">
          <div className="flex items-center gap-3">
            <span className="font-medium text-[#1B1D22]">Atelier Nourou Dine</span>
            <span>·</span>
            <span>Direction artistique &amp; Code sur mesure</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block">Cotonou (GMT+1) · Travail à distance worldwide</span>
            <span className="hidden sm:inline-block">·</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#FF6B3D]" />
              <span className="text-[#1B1D22] font-medium">1 créneau disponible ce trimestre</span>
            </div>
          </div>
        </div>

        {/* Grille Principale 2 Colonnes Asymétriques */}
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          
          {/* Colonne gauche : Le Titre d'Auteur & La Vision */}
          <div className="flex flex-col items-start pt-2">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[4.25rem] font-normal leading-[1.04] tracking-[-0.03em] text-[#1B1D22]">
              Des interfaces conçues avec rigueur, pour inspirer une{" "}
              <span className="italic">
                confiance immédiate
              </span>.
            </h1>

            <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-[#1B1D22]/75 font-sans">
              Je conçois et développe des sites web sur mesure pour des dirigeants, cabinets et marques qui refusent les modèles préfabriqués. Un seul interlocuteur du premier croquis au déploiement final, avec une obsession pour la typographie, la vitesse et le résultat commercial.
            </p>

            {/* Boutons d'action affirmés sans flèches */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex min-h-[50px] items-center justify-center bg-[#1B1D22] px-8 py-3.5 text-xs font-mono text-white transition-colors hover:bg-[#3D5AFE]"
              >
                Discuter de votre projet
              </Link>

              <Link
                href="/realisations"
                className="inline-flex min-h-[50px] items-center justify-center border border-[#C9C4B8] bg-white px-8 py-3.5 text-xs font-mono text-[#1B1D22] transition-colors hover:border-[#1B1D22]"
              >
                Explorer les réalisations
              </Link>
            </div>

            {/* Note d'engagement de l'artisan */}
            <div className="mt-8 flex items-center gap-4 text-xs font-mono text-[#1B1D22]/50">
              <span>Code 100% propriétaire</span>
              <span>·</span>
              <span>Zéro abonnement captif</span>
              <span>·</span>
              <span>Livraison sous délais fermes</span>
            </div>
          </div>

          {/* Colonne droite : Composition Atelier — Le Créateur & La Preuve en Images */}
          <div className="flex flex-col gap-6">
            
            {/* Carte 1 : Carte d'identité de l'Artisan (Tirage d'art éditorial) */}
            <div className="border border-[#C9C4B8] bg-white p-5 sm:p-6">
              <div className="flex items-center gap-4 pb-4 border-b border-[#C9C4B8]">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-[#C9C4B8] bg-[#EAE6DD]">
                  <Image
                    src="/media/nourou-portrait.jpg"
                    alt="Portrait de Nourou Dine AMANDOU"
                    fill
                    sizes="56px"
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    priority
                  />
                </div>
                <div>
                  <h2 className="font-serif text-base font-normal text-[#1B1D22] leading-tight">
                    Nourou Dine AMANDOU
                  </h2>
                  <p className="text-xs font-mono text-[#1B1D22]/60 mt-0.5">
                    Designer d&apos;interface &amp; Ingénieur web
                  </p>
                </div>
              </div>

              <p className="mt-3.5 text-xs sm:text-sm text-[#1B1D22]/75 font-sans leading-relaxed italic">
                « Quand vous travaillez avec moi, vous échangez directement avec la personne qui pense chaque transition, affine la typographie et écrit le code. »
              </p>
            </div>

            {/* Carte 2 : Vignette asymétrique de projet réel (Asteria Properties) */}
            <Link
              href="/realisations/asteria"
              className="group block border border-[#C9C4B8] bg-white p-5 sm:p-6 transition-colors hover:border-[#1B1D22]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#C9C4B8] text-xs font-mono text-[#1B1D22]/60">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>Dernière étude publiée</span>
                </div>
                <span>Genève, Suisse</span>
              </div>

              <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden border border-[#C9C4B8] bg-[#EAE6DD]">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
                  alt="Aperçu de l'étude de cas Asteria Properties"
                  fill
                  priority
                  sizes="(min-width: 1024px) 550px, (min-width: 640px) 500px, 320px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>

              <div className="mt-4 flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-xl font-normal text-[#1B1D22] group-hover:text-[#3D5AFE] transition-colors">
                    Asteria Properties
                  </h3>
                  <span className="text-xs font-mono text-[#3D5AFE]">
                    Consulter l&apos;étude
                  </span>
                </div>
                <p className="text-xs text-[#1B1D22]/70 font-sans leading-relaxed">
                  Immobilier de prestige · Temps de chargement 0.7s · Demandes qualifiées +140%
                </p>
              </div>
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}
