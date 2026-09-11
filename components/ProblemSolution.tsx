import Link from "next/link";

export default function ProblemSolution() {
  return (
    <section className="relative w-full bg-[#F6F4EF] py-20 sm:py-28 lg:py-32 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#C9C4B8]">
          <div>
            <p className="text-xs font-mono text-[#1B1D22]/60">
              01 · Constat &amp; Démarche d&apos;atelier
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1B1D22] max-w-[700px]">
              Votre site actuel reflète-t-il le niveau d&apos;excellence de votre travail ?
            </h2>
          </div>
          <p className="max-w-[420px] text-sm sm:text-base leading-relaxed text-[#1B1D22]/70 font-sans">
            Un prospect évalue la crédibilité d&apos;une marque dès les 5 premières secondes. Une vitrine générique ou lente décourage l&apos;attention avant même que vous n&apos;ayez pu présenter votre offre.
          </p>
        </div>

        {/* Grille 3 colonnes architecturales */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          
          {/* Colonne 1 : Le problème ordinaire */}
          <div className="flex flex-col justify-between border border-[#C9C4B8] bg-white p-7 sm:p-9">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#C9C4B8]">
                <span className="text-xs font-mono text-[#1B1D22]/60">
                  Le piège du préfabriqué
                </span>
                <span className="text-xs font-mono text-[#1B1D22]/40">Standard</span>
              </div>
              <h3 className="mt-6 font-serif text-2xl font-normal text-[#1B1D22]">
                L&apos;illusion du tout-fait
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#1B1D22]/70 font-sans">
                Les thèmes préfabriqués et générateurs automatiques se ressemblent tous. Surchargés de code superflu, lents sur smartphone, ils noient votre singularité dans la masse.
              </p>
              <ul className="mt-6 space-y-3 text-xs font-mono text-[#1B1D22]/60">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1B1D22]/30" />
                  <span>Temps de chargement supérieur à 3 secondes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1B1D22]/30" />
                  <span>Mise en page générique interchangeable</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1B1D22]/30" />
                  <span>Perte d&apos;attention et devis sous-évalués</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-[#C9C4B8] text-xs font-mono text-[#1B1D22]/50">
              Conséquence : Faible conversion et statut amoindri.
            </div>
          </div>

          {/* Colonne 2 : La méthode artisanale (accent encre) */}
          <div className="flex flex-col justify-between border border-[#1B1D22] bg-[#1B1D22] p-7 sm:p-9 text-[#F6F4EF]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <span className="text-xs font-mono text-white/70">
                  L&apos;approche d&apos;auteur
                </span>
                <span className="text-xs font-mono text-[#3D5AFE]">Fait main</span>
              </div>
              <h3 className="mt-6 font-serif text-2xl font-normal text-white">
                Direction artistique &amp; code pur
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80 font-sans">
                Chaque projet démarre d&apos;une page blanche. Une typographie de caractère choisie pour vous, une structure éditoriale claire et un code Next.js ultra-rapide taillé pour durer.
              </p>
              <ul className="mt-6 space-y-3 text-xs font-mono text-white/80">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>Système visuel exclusif à votre marque</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>Score PageSpeed 99+ mesurable</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>Parcours pensé pour inspirer confiance</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-white/15 text-xs font-mono text-white/60">
              Résultat : Une image irréprochable et un statut fort.
            </div>
          </div>

          {/* Colonne 3 : L'impact mesurable */}
          <div className="flex flex-col justify-between border border-[#C9C4B8] bg-white p-7 sm:p-9">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#C9C4B8]">
                <span className="text-xs font-mono text-[#1B1D22]/60">
                  La rentabilité de l&apos;actif
                </span>
                <span className="text-xs font-mono text-[#3D5AFE]">Pérennité</span>
              </div>
              <h3 className="mt-6 font-serif text-2xl font-normal text-[#1B1D22]">
                Un outil qui vous appartient
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#1B1D22]/70 font-sans">
                Votre site travaille 24h/24 : il répond aux hésitations de vos prospects, valorise vos honoraires et accélère la prise de décision de vos interlocuteurs les plus exigeants.
              </p>
              <ul className="mt-6 space-y-3 text-xs font-mono text-[#1B1D22]/60">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>Visiteurs rassurés dès les premières secondes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>Demandes de contact plus ciblées</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>0 abonnement captif, liberté totale</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-[#C9C4B8]">
              <Link
                href="/services"
                className="text-xs font-mono text-[#3D5AFE] hover:underline"
              >
                Consulter les 4 offres d&apos;atelier
              </Link>
            </div>
          </div>

        </div>

        {/* Note d'atelier incarnée (Inspiration Dribbble & Behance Editorial) */}
        <div className="mt-12 border border-[#C9C4B8] bg-[#F6F4EF] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-[#1B1D22]/60 block mb-2">
              Note d&apos;artisan · Philosophie de travail
            </span>
            <p className="font-serif text-base sm:text-lg text-[#1B1D22] italic leading-relaxed">
              « Dans un écosystème saturé de templates uniformes et de pages générées en série, le soin du détail et la précision typographique sont les seuls leviers qui vous distinguent instantanément. »
            </p>
          </div>
          <div className="shrink-0 font-mono text-xs text-[#1B1D22]/60 border-t md:border-t-0 md:border-l border-[#C9C4B8] pt-4 md:pt-0 md:pl-6">
            <p className="font-medium text-[#1B1D22]">Nourou Dine AMANDOU</p>
            <p className="text-[#1B1D22]/50 mt-0.5">Direction artistique &amp; Code</p>
          </div>
        </div>

      </div>
    </section>
  );
}
