import {
  MessageCircleMore,
  BriefcaseBusiness,
  LayoutTemplate,
  Palette,
  Rocket,
  CheckCircle2,
} from "lucide-react";

const processCards = [
  {
    step: "1",
    title: "Échange initial",
    text: "Nous discutons de votre activité, de vos objectifs, de votre audience et des difficultés que vous rencontrez actuellement.",
    icon: MessageCircleMore,
    tone: "bg-[#f7f3f0] border-[#171717]/10",
    iconTone: "border-[#171717]/15 text-[#171717]",
  },
  {
    step: "2",
    title: "Clarification de l’offre",
    text: "Nous définissons les messages importants, les services à présenter et les actions attendues de vos visiteurs.",
    icon: BriefcaseBusiness,
    tone: "bg-[#f1f4ff] border-[#c3d0ff]",
    iconTone: "border-[#c3d0ff] text-[#5366de]",
  },
  {
    step: "3",
    title: "Structure du site",
    text: "Je construis l’architecture des pages et le parcours que vos visiteurs devront suivre.",
    icon: LayoutTemplate,
    tone: "bg-[#f8f0df] border-[#e7d5a9]",
    iconTone: "border-[#e7d5a9] text-[#8c6c1c]",
  },
  {
    step: "4",
    title: "Conception et intégration",
    text: "Je crée le design et développe votre site avec WordPress et Elementor, en accord avec votre identité visuelle.",
    icon: Palette,
    tone: "bg-[#edf6ef] border-[#b9d8b8]",
    iconTone: "border-[#b9d8b8] text-[#3d7a47]",
  },
  {
    step: "5",
    title: "Optimisation",
    text: "Je vérifie la version mobile, la clarté des contenus, les boutons, les formulaires et les éléments essentiels à la conversion.",
    icon: Rocket,
    tone: "bg-[#f9ece7] border-[#edc1ad]",
    iconTone: "border-[#edc1ad] text-[#d76b45]",
  },
  {
    step: "6",
    title: "Mise en ligne",
    text: "Après votre validation, votre site est publié et\nprêt à soutenir votre communication.",
    icon: CheckCircle2,
    tone: "bg-[#e7f3ea] border-[#b7d7c1]",
    iconTone: "border-[#b7d7c1] text-[#2f6f4a]",
    fullWidth: true,
  },
];

export default function ClientSpace() {
  return (
    <section id="process" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-[#171717]/5 bg-[#f7f4f2] p-6 shadow-[0_8px_25px_rgba(17,17,17,0.02)] sm:p-8 lg:p-12">
        <div className="flex justify-center">
          <span className="inline-flex items-center rounded-full border border-[#171717]/10 bg-white/80 px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#171717] shadow-sm">
            Processus de création
          </span>
        </div>

        <h2 className="mt-6 text-center font-black tracking-[-0.07em] text-[#171717]">
          Comment se déroule votre projet ?
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {processCards.map(({ step, title, text, icon: Icon, tone, iconTone, fullWidth }, index) => {
            const isFullWidth = fullWidth || index === 5;
            const isPairRow = index === 3 || index === 4;

            return (
              <article
                key={title}
                className={`flex min-h-[220px] flex-col rounded-[1.6rem] border border-[#171717]/8 bg-white p-5 shadow-[0_12px_28px_rgba(21,20,27,0.03)] ${
                  isFullWidth ? "md:col-span-2 lg:col-span-12" : isPairRow ? "lg:col-span-6" : "lg:col-span-4"
                }`}
              >
                <div className="flex items-center justify-between pb-4">
                  <span className="text-[1.5rem] font-black uppercase tracking-[0.16em] text-[#171717]/70">
                    {step}
                  </span>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full border border-[#171717]/10 bg-[#f5f1ed] ${iconTone}`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </div>
                </div>

                <div className="mt-1 flex-1">
                  <h3 className="font-black tracking-[-0.05em] text-[#171717]">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-[60ch] text-[0.96rem] leading-7 text-[#4b4b4b] whitespace-pre-line">
                    {text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
