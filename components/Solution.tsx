import {
  Check,
  Sparkles,
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
    <section id="solution" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[2rem] bg-[#171717] text-white">
        <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
          <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden p-6 sm:min-h-[500px] sm:p-10 lg:min-h-[560px] lg:p-12">
            {/* <div className="absolute -right-20 top-20 h-64 w-64 rounded-full border border-white/10" /> */}
            {/* <div className="absolute -right-8 top-32 h-40 w-40 rounded-full border border-[#d76b45]/60" /> */}

            <div className="relative">
          <span className="inline-flex items-center rounded-full border border-[#FFFFFF]/10 bg-white px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#171717] shadow-sm">
            Transformez votre site en véritable atout
          </span>

              <h2 className="mt-8 max-w-[420px] font-black tracking-[-0.07em] text-white">
                Un site web conçu
              </h2>
              <h2 className=" font-black tracking-[-0.07em] text-white">
                pour attirer, convaincre
              </h2>
              <h2 className=" font-black tracking-[-0.07em] text-white">
                et faire agir
              </h2>
            </div>

            <p className="relative mt-10 max-w-[430px] text-[1.02rem] leading-7 text-white/70">
              Je vous accompagne dans la création d’une présence en ligne professionnelle, cohérente et orientée vers vos objectifs.
            </p>
          </div>

          <div className="bg-[#171717] p-6 text-white sm:p-10 lg:p-12">
            <div className="flex items-center justify-between border-b border-white/15 pb-5">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/55">
                Votre futur site pourra vous aider à
              </p>
              <span className="text-3xl font-black tracking-[-0.08em] text-[#FFFFFF]">08</span>
            </div>

            <ul className="mt-2">
              {solutionPoints.map((point, index) => (
                <li
                  key={point}
                  className="group flex items-start gap-4 border-b border-white/15 py-4 transition-colors hover:border-[#FFFFFF]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFFFFF] text-[#171717]">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                  <span className="flex-1 text-[0.98rem] leading-7 text-white/80">{point}</span>
                  <span className="pt-1 text-[0.68rem] font-semibold text-white/35">
                    0{index + 1}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-l-2 border-[#FFFFFF] pl-5">
              <p className="max-w-[480px] text-[1.02rem] leading-7 text-white/75">
                L’objectif n’est pas de créer un site de plus. L’objectif est de créer un site utile au développement de votre activité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}