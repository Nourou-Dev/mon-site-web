import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section className="relative w-full bg-[#F6F4EF] py-20 sm:py-28 lg:py-32 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#C9C4B8]">
          <div>
            <span className="text-xs font-mono text-[#4B4D54]">
              01 / Constat &amp; démarche
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1B1D22] max-w-[680px]">
              Votre site actuel reflète-t-il la qualité réelle de votre travail ?
            </h2>
          </div>
          <p className="max-w-[400px] text-sm sm:text-base leading-relaxed text-[#4B4D54] font-light">
            Un prospect évalue la crédibilité d&apos;une marque dès les premières secondes. Une vitrine générique ou lente décourage l&apos;attention avant même la prise de contact.
          </p>
        </div>

        {/* Grille 3 colonnes éditoriales */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          
          {/* Colonne 1 : Le problème ordinaire */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#C9C4B8] bg-white p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#C9C4B8]/60">
                <span className="text-xs font-mono text-[#4B4D54]">
                  Le modèle préfabriqué
                </span>
                <span className="text-xs font-mono text-[#4B4D54]">Défaut</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-[#1B1D22]">
                L&apos;illusion du tout-fait
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4B4D54] font-light">
                Les thèmes préfabriqués et générateurs automatiques se ressemblent tous. Lourds, encombrés de dépendances et lents sur mobile, ils peinent à exprimer un parti pris singulier.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-[#4B4D54]">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9C4B8]" />
                  <span>Temps de chargement supérieur à 3 secondes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9C4B8]" />
                  <span>Mise en page générique sans hiérarchie</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9C4B8]" />
                  <span>Taux de rebond élevé sur mobile</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-[#C9C4B8]/40 text-xs font-mono text-[#4B4D54]">
              Conséquence : Faible conversion et perception dégradée.
            </div>
          </div>

          {/* Colonne 2 : La méthode artisanale */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#1B1D22] bg-[#1B1D22] p-6 sm:p-8 text-[#F6F4EF]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <span className="text-xs font-mono text-[#F6F4EF]/80">
                  L&apos;approche d&apos;auteur
                </span>
                <span className="text-xs font-mono text-[#3D5AFE]">Sur mesure</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-[#F6F4EF]">
                Direction artistique &amp; ingénierie
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#F6F4EF]/80 font-light">
                Chaque projet démarre d&apos;une feuille blanche. Une typographie de caractère, des parcours sans friction et une architecture Next.js légère pour un chargement instantané.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-[#F6F4EF]/90">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>Système visuel unique sans dépendances inutiles</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>Performance Google 99+ mesurable</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>Architecture orientée vers la prise de contact</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-white/15 text-xs font-mono text-[#F6F4EF]/60">
              Résultat : Une image forte et une autorité immédiate.
            </div>
          </div>

          {/* Colonne 3 : L'impact mesurable */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#C9C4B8] bg-white p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#C9C4B8]/60">
                <span className="text-xs font-mono text-[#4B4D54]">
                  Le retour sur investissement
                </span>
                <span className="text-xs font-mono text-[#3D5AFE]">Impact</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-[#1B1D22]">
                Un actif pérenne
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4B4D54] font-light">
                Votre présence en ligne travaille en continu : elle répond aux hésitations de vos prospects, valorise votre standing et accélère la signature de vos devis.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-[#4B4D54]">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>Visiteurs rassurés dès la première page</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>Demandes de contact plus qualifiées</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                  <span>Propriété totale sans abonnement plateforme</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-[#C9C4B8]/40">
              <Link
                href="/services"
                className="text-xs font-medium text-[#3D5AFE] hover:underline"
              >
                Consulter les offres et services
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
