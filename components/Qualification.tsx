import Link from "next/link";
import { ArrowUpRight, Check, X } from "lucide-react";

const FOR_YOU = [
  "Vous êtes un dirigeant, cabinet ou marque qui exige une image impeccable.",
  "Vous comprenez que la crédibilité numérique influence directement le montant de vos devis.",
  "Votre site actuel ne reflète plus l'excellence ou la modernité de vos services.",
  "Vous voulez un interlocuteur direct, réactif et force de proposition.",
  "Vous désirez être 100% propriétaire de votre solution, sans abonnement captif.",
];

const NOT_FOR_YOU = [
  "Vous cherchez uniquement le prix le plus bas au détriment de la qualité et du suivi.",
  "Vous souhaitez copier à l'identique un concurrent sans construire votre propre identité.",
  "Vous n'avez pas de temps à accorder aux séances clés de validation et d'orientation.",
  "Vous cherchez un simple exécutant sans conseil stratégique sur vos parcours de vente.",
];

export default function Qualification() {
  return (
    <section className="relative w-full bg-[#fbf9f5] py-20 sm:py-28 lg:py-32 border-b border-[#171717]/8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#171717]/10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              [ 10 / ALIGNEMENT &amp; EXIGENCE ]
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#171717] max-w-[640px]">
              Sommes-nous faits pour collaborer ensemble ?
            </h2>
          </div>
          <p className="max-w-[380px] text-sm text-[#4b5563] leading-relaxed">
            La qualité d&apos;un projet dépend d&apos;une vision partagée. Pour garantir un investissement rentable, voici notre cadre de collaboration.
          </p>
        </div>

        {/* Grille comparative 2 colonnes architecturales */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 items-stretch">
          
          {/* Colonne 1 : Projet aligné */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#171717]/10 bg-white p-7 sm:p-10 shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#171717]/8">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Alignement parfait
                </span>
                <span className="text-xs font-mono text-[#9ca3af]">[ Idéal ]</span>
              </div>

              <h3 className="mt-6 font-display text-xl sm:text-2xl font-bold text-[#171717]">
                Ce service est taillé pour vous si :
              </h3>

              <ul className="mt-6 space-y-3.5">
                {FOR_YOU.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-[#374151]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mt-0.5">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-[#171717]/8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#2b2b2b] transition-all"
              >
                <span>Démarrer un projet</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Colonne 2 : Non aligné */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#171717]/8 bg-white/60 p-7 sm:p-10 backdrop-blur-sm shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#171717]/8">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-500/20">
                  Cadre non adapté
                </span>
                <span className="text-xs font-mono text-[#9ca3af]">[ Déconseillé ]</span>
              </div>

              <h3 className="mt-6 font-display text-xl sm:text-2xl font-bold text-[#171717]">
                Nous ne serons pas le bon choix si :
              </h3>

              <ul className="mt-6 space-y-3.5">
                {NOT_FOR_YOU.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-[#4b5563]">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600 mt-0.5">
                      <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-[#171717]/8 text-xs text-[#6b7280]">
              Mon engagement est de vous apporter une valeur supérieure. Si ce n&apos;est pas le cas, je préfère vous orienter vers une autre solution en toute honnêteté.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
