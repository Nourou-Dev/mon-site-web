import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section className="relative w-full bg-[#fbf9f5] py-20 sm:py-28 lg:py-32 border-b border-[#171717]/8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#171717]/10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              [ 01 / PHILOSOPHIE &amp; CONSTAT ]
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#171717] max-w-[680px]">
              Votre site actuel reflète-t-il la qualité réelle de votre travail ?
            </h2>
          </div>
          <p className="max-w-[400px] text-sm sm:text-base leading-relaxed text-[#4b5563]">
            Un prospect juge la crédibilité de votre entreprise en moins de trois secondes. Une vitrine générique ou vieillissante vous fait perdre des contrats avant même le premier contact.
          </p>
        </div>

        {/* Grille 3 colonnes éditoriales */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          
          {/* Colonne 1 : Le problème ordinaire */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#171717]/8 bg-white/70 p-6 sm:p-8 backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#171717]/8">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
                  01. Le Piège des Templates
                </span>
                <span className="text-xs font-mono text-[#9ca3af]">[ Défaut ]</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-[#171717]">
                L&apos;illusion du « tout-fait »
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4b5563]">
                Les thèmes préfabriqués et générateurs automatiques se ressemblent tous. Ils sont lourds, truffés de code inutile, lents sur smartphone et incapables d&apos;exprimer la véritable personnalité de votre marque.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-[#374151]">
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Temps de chargement supérieur à 3 secondes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Mise en page générique sans impact</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Visiteurs confus qui quittent la page</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-[#171717]/6 text-[11px] font-mono text-[#6b7280]">
              Conséquence : Faible conversion et dévalorisation.
            </div>
          </div>

          {/* Colonne 2 : La méthode artisanale */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#171717]/12 bg-[#171717] p-6 sm:p-8 text-white shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/15">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  02. L&apos;Approche Sur Mesure
                </span>
                <span className="text-xs font-mono text-white/40">[ Ma Méthode ]</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-white">
                Direction artistique &amp; ingénierie
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Chaque écran est conçu à partir d&apos;une feuille blanche. Une typographie de caractère, des parcours fluides et un code Next.js ultra-optimisé pour charger instantanément sur tous les réseaux.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-white/90">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Architecture sur mesure sans dépendances lourdes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Score Google PageSpeed 99+ garanti</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Messages clairs orientés vers la prise de contact</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-white/15 text-[11px] font-mono text-white/60">
              Résultat : Une image de marque qui impose le respect.
            </div>
          </div>

          {/* Colonne 3 : L'impact mesurable */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#171717]/8 bg-white/70 p-6 sm:p-8 backdrop-blur-sm">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#171717]/8">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0060c3]">
                  03. La Valeur Ajoutée
                </span>
                <span className="text-xs font-mono text-[#9ca3af]">[ Impact ]</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-[#171717]">
                Un investissement rentable
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#4b4b4b]">
                Votre site devient un commercial infatigable qui travaille pour vous 24h/24 : il qualifie vos prospects, répond à leurs doutes et facilite le passage à l&apos;action sans friction.
              </p>
              <ul className="mt-6 space-y-2.5 text-xs text-[#374151]">
                <li className="flex items-center gap-2">
                  <span className="text-[#0060c3] font-bold">→</span>
                  <span>Clients rassurés dès les premières secondes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#0060c3] font-bold">→</span>
                  <span>Demandes de devis plus qualifiées</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#0060c3] font-bold">→</span>
                  <span>Propriété totale sans redevance mensuelle</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-[#171717]/6">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#171717] hover:text-[#0060c3] transition-colors"
              >
                <span>Découvrir les prestations</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
