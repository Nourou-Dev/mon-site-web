import {
  Check,
  TrendingUp,
} from "lucide-react";

const solutionPoints = [
  "présenter votre activité avec clarté ;",
  "valoriser vos produits et services ;",
  "inspirer confiance dès les premières secondes ;",
  "vous différencier de vos concurrents ;",
  "générer des demandes de devis ou de rendez-vous ;",
  "recevoir des commandes directement via WhatsApp ;",
  "améliorer votre visibilité sur Google ;",
  "disposer d’un outil de communication que vous contrôlez.",
];

export default function Solution() {
  return (
    <section id="solution" className="scroll-mt-[5.5rem] bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] bg-[#0060c3] text-white shadow-[0_25px_60px_rgba(0,96,195,0.25)] border border-[#0060c3]/30">
        <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
          <div className="relative flex min-h-0 flex-col justify-between overflow-hidden p-5 sm:p-8 lg:min-h-[540px] lg:p-12">
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
                <TrendingUp className="h-3.5 w-3.5 text-[#0060c3]" />
                Transformez votre site en véritable atout
              </span>

              <h2 className="mt-6 sm:mt-8 max-w-[460px] font-black tracking-[-0.07em] text-white">
                Un site web conçu pour attirer, convaincre et faire agir
              </h2>
            </div>

            <p className="relative mt-8 sm:mt-10 max-w-[430px] text-[0.98rem] sm:text-[1.02rem] leading-relaxed sm:leading-7 text-white/85">
              Je vous accompagne dans la création d’une présence en ligne professionnelle, cohérente et orientée vers vos objectifs.
            </p>
          </div>

          <div className="bg-[#0054ab] p-5 sm:p-8 lg:p-12 lg:border-l lg:border-white/10">
            <div className="flex flex-col gap-2 border-b border-white/20 pb-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <p className="max-w-[22rem] text-[0.65rem] font-semibold uppercase leading-snug tracking-[0.12em] text-white/70 sm:text-[0.7rem] sm:tracking-[0.18em]">
                Votre futur site pourra vous aider à
              </p>
              <span className="shrink-0 text-3xl font-black tracking-[-0.08em] text-white">08</span>
            </div>

            <ul className="mt-2">
              {solutionPoints.map((point, index) => (
                <li
                  key={point}
                  className="group flex items-start gap-3 sm:gap-4 border-b border-white/15 py-3.5 sm:py-4 transition-colors hover:border-white"
                >
                  <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#0060c3] shadow-sm">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
                  </span>
                  <span className="flex-1 text-[0.92rem] sm:text-[0.98rem] leading-relaxed sm:leading-7 text-white/95">{point}</span>
                  <span className="pt-1 text-[0.68rem] font-semibold text-white/50">
                    0{index + 1}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-l-2 border-white pl-5">
              <p className="max-w-[480px] text-[0.98rem] sm:text-[1.02rem] leading-relaxed sm:leading-7 text-white/90">
                L’objectif n’est pas de créer un site de plus. L’objectif est de créer un site utile au développement de votre activité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}