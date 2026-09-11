import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";

const solutionPoints = [
  "Inspirer une confiance immédiate dès les 5 premières secondes de visite",
  "Expliquer votre offre et vos points forts sans jargon ni ambiguïté",
  "Générer des prises de contact qualifiées (WhatsApp, formulaires, appels)",
  "Mettre en valeur vos réalisations et témoignages clients avec crédibilité",
  "Garantir une expérience mobile irréprochable sur tous les téléphones",
  "Garder la main totale sur vos contenus grâce à un outil pérenne",
];

export default function Solution() {
  return (
    <section id="solution" className="scroll-mt-[5.5rem] bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[2.5rem] bg-[#0060c3] text-white shadow-xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          {/* Colonne gauche */}
          <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                <TrendingUp className="h-3.5 w-3.5" />
                La solution
              </span>

              <h2 className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                Un site web pensé pour convaincre et faire grandir votre activité.
              </h2>

              <p className="mt-5 text-base leading-relaxed text-white/90">
                L&apos;objectif n&apos;est pas d&apos;ajouter un site de plus sur le web. L&apos;objectif est de concevoir un véritable levier commercial, taillé sur mesure pour votre entreprise et vos clients.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-[#0060c3] shadow-md transition-all hover:bg-[#f5f9ff] hover:-translate-y-0.5 active:scale-95"
              >
                <span>Démarrer un cadrage gratuit</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Colonne droite : Les engagements concrets */}
          <div className="bg-[#0050a5] p-7 sm:p-10 lg:p-14 lg:border-l lg:border-white/10 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-white/70">
              Ce que votre futur site vous apporte :
            </span>

            <ul className="mt-6 space-y-4">
              {solutionPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3.5 rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-colors hover:bg-white/15"
                >
                  <CheckCircle2 className="h-5 w-5 text-white shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-white leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}