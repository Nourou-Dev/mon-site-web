import { EyeOff, FileQuestion, MessageSquareOff, TrendingDown, ArrowRight, CheckCircle2 } from "lucide-react";

const pains = [
  {
    icon: EyeOff,
    title: "Zéro visibilité sur l'avancement",
    desc: "Vous confiez votre acompte et votre projet... puis plus de nouvelles pendant des semaines. Impossible de savoir si le travail avance ou s'il est au point mort.",
  },
  {
    icon: MessageSquareOff,
    title: "Échanges éparpillés et chaotiques",
    desc: "Les maquettes, textes et retours de corrections se dispersent entre messages vocaux WhatsApp, pièces jointes d'e-mails et notes éparses sans historique clair.",
  },
  {
    icon: FileQuestion,
    title: "Aucun cadre ni engagement de délais",
    desc: "Pas de contrat formalisé, pas de calendrier de livraison par jalons. Les semaines défilent, les délais glissent et votre lancement commercial est retardé.",
  },
];

export default function ProblemSolution() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-[1240px] rounded-[2.5rem] border border-[#171717]/10 bg-[#fbfcfd] p-6 shadow-sm sm:p-10 lg:p-14">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Colonne gauche : Le problème franc et sans détour */}
          <div>
            <span className="inline-block rounded-full bg-[#171717] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Le constat
            </span>

            <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-black tracking-[-0.05em] text-[#171717] leading-[1.18]">
              Travailler avec un prestataire web ressemble trop souvent à un casse-tête.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#4b4b4b]">
              Vous avez besoin d&apos;un site professionnel pour développer votre chiffre d&apos;affaires, pas d&apos;une source d&apos;anxiété supplémentaire. Pourtant, la plupart des expériences déçoivent :
            </p>

            <div className="mt-8 space-y-6">
              {pains.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#171717]">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#4b4b4b]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite : Visualisation comparative tangible (Graphique & Bilan) */}
          <div className="flex flex-col justify-center">
            <div className="rounded-3xl border border-[#171717]/10 bg-white p-6 shadow-lg sm:p-8">
              <div className="flex items-center justify-between border-b border-[#171717]/8 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4b4b4b]">
                    Impact d&apos;un projet mal encadré
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-black text-red-600">-65%</span>
                    <span className="text-xs font-medium text-[#4b4b4b]">d&apos;efficacité &amp; opportunités perdues</span>
                  </div>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <TrendingDown className="h-5 w-5" />
                </div>
              </div>

              {/* Diagramme vectoriel réaliste d'évolution */}
              <div className="relative mt-6 aspect-[16/9] w-full">
                <svg viewBox="0 0 400 200" className="h-full w-full" fill="none" preserveAspectRatio="none">
                  {/* Lignes de repères */}
                  <line x1="20" y1="40" x2="380" y2="40" stroke="#f1f3f5" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="20" y1="90" x2="380" y2="90" stroke="#f1f3f5" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="20" y1="140" x2="380" y2="140" stroke="#f1f3f5" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Courbe rouge : Projet classique sans cadre */}
                  <path
                    d="M 30 50 Q 120 40, 180 110 T 360 170"
                    stroke="#dc2626"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Courbe bleue : Avec méthodologie et espace client */}
                  <path
                    d="M 30 160 Q 140 140, 240 70 T 360 30"
                    stroke="#0060c3"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Points d'ancrage */}
                  <circle cx="360" cy="170" r="4" fill="#dc2626" />
                  <circle cx="360" cy="30" r="5" fill="#0060c3" />
                </svg>

                <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-[#4b4b4b]">
                  <span>Lancement</span>
                  <span>Semaine 2</span>
                  <span>Semaine 4</span>
                  <span>Livraison</span>
                </div>
              </div>

              {/* Légende comparative */}
              <div className="mt-6 space-y-3 border-t border-[#171717]/8 pt-5">
                <div className="flex items-center gap-3 text-xs">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-600 shrink-0" />
                  <span className="font-semibold text-[#4b4b4b]">
                    <strong className="text-red-700 font-bold">Prestataire classique :</strong> retards, doutes, retours perdus et frustration.
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#0060c3] shrink-0" />
                  <span className="font-semibold text-[#171717]">
                    <strong className="text-[#0060c3] font-bold">Mon accompagnement :</strong> jalons clairs, espace client en direct et sérénité totale.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
