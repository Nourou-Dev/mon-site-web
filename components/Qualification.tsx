import Link from "next/link";
import { Check, X } from "lucide-react";

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
    <section className="relative w-full bg-[#F6F4EF] py-20 sm:py-28 lg:py-32 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#C9C4B8]">
          <div className="max-w-[720px]">
            <p className="text-xs font-mono text-[#1B1D22]/60">
              Alignement &amp; Exigence
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1B1D22]">
              Sommes-nous faits pour collaborer ensemble ?
            </h2>
          </div>
          <p className="max-w-[380px] text-sm text-[#1B1D22]/70 leading-relaxed font-sans">
            La qualité d&apos;un projet dépend d&apos;une vision partagée. Pour garantir un investissement rentable, voici notre cadre de collaboration.
          </p>
        </div>

        {/* Grille comparative 2 colonnes architecturales */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2 items-stretch">
          
          {/* Colonne 1 : Projet aligné */}
          <div className="flex flex-col justify-between border border-[#C9C4B8] bg-white p-8 sm:p-12">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#C9C4B8]">
                <span className="text-xs font-mono font-medium text-[#3D5AFE]">
                  Alignement mutuel
                </span>
                <span className="text-xs font-mono text-[#1B1D22]/40">Critères idéaux</span>
              </div>

              <h3 className="mt-6 font-serif text-2xl sm:text-3xl font-normal text-[#1B1D22]">
                Ce service est taillé pour vous si :
              </h3>

              <ul className="mt-6 space-y-4">
                {FOR_YOU.map((item) => (
                  <li key={item} className="flex items-start gap-3.5 text-sm text-[#1B1D22]/80 leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3D5AFE]/10 text-[#3D5AFE] mt-0.5">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-[#C9C4B8]">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#1B1D22] px-7 py-3.5 text-xs font-mono text-white transition-colors hover:bg-[#3D5AFE]"
              >
                Démarrer un projet
              </Link>
            </div>
          </div>

          {/* Colonne 2 : Non aligné */}
          <div className="flex flex-col justify-between border border-[#C9C4B8] bg-[#F6F4EF] p-8 sm:p-12">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#C9C4B8]">
                <span className="text-xs font-mono font-medium text-[#1B1D22]/60">
                  Cadre non adapté
                </span>
                <span className="text-xs font-mono text-[#1B1D22]/40">Déconseillé</span>
              </div>

              <h3 className="mt-6 font-serif text-2xl sm:text-3xl font-normal text-[#1B1D22]">
                Nous ne serons pas le bon choix si :
              </h3>

              <ul className="mt-6 space-y-4">
                {NOT_FOR_YOU.map((item) => (
                  <li key={item} className="flex items-start gap-3.5 text-sm text-[#1B1D22]/70 leading-relaxed">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1B1D22]/5 text-[#1B1D22]/50 mt-0.5">
                      <X className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-[#C9C4B8] text-xs font-sans text-[#1B1D22]/60 leading-relaxed">
              Mon engagement est de vous apporter une valeur supérieure mesurable. Si ce n&apos;est pas le cas, je préfère vous orienter vers une autre solution en toute honnêteté.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
