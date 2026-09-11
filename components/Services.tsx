import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";

const cards = [
  {
    level: "Site vitrine",
    title: "Site vitrine",
    text: "Présentez votre activité, vos services et votre expertise avec un site professionnel qui inspire confiance et transforme vos visiteurs en prospects.",
    palette: "bg-[#f8f9fa]",
    visual: "portrait",
    cta: "Créer un site vitrine",
  },
  {
    level: "Landing page",
    title: "Landing page",
    text: "Lancez une offre, une formation ou un événement avec une page stratégique conçue pour attirer l’attention et encourager vos visiteurs à agir.",
    palette: "bg-[#f8f9fa]",
    visual: "ai",
    cta: "Créer ma landing page",
  },
  {
    level: "Catalogue produits",
    title: "Catalogue",
    text: "Présentez vos produits dans un catalogue clair et professionnel, avec des fiches détaillées et un contact direct pour recevoir les commandes.",
    palette: "bg-[#f8f9fa]",
    visual: "notebook",
    cta: "Présenter mes produits",
  },
  {
    level: "Refonte de site web",
    title: "Refonte de site",
    text: "Modernisez votre site, une nouvelle structure, un design plus convaincant et expérience adaptée aux attentes de vos visiteurs et clients.",
    palette: "bg-[#f8f9fa]",
    visual: "laptop",
    cta: "Repenser mon site",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-[5.5rem] bg-white px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-8 sm:mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
            <Layers className="h-3.5 w-3.5 text-[#0060c3]" />
            Ce que je peux créer pour vous
          </span>
          <h2 className="mx-auto mt-4 sm:mt-5 max-w-[750px] text-[clamp(1.75rem,3.8vw,3.6rem)] font-black leading-[1.04] tracking-[-0.06em] text-[#171717]">
            Des solutions web pensées pour convaincre, vendre et faire grandir votre activité.
          </h2>
        </div>

        <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex min-h-0 flex-col rounded-[2rem] border border-[#171717]/10 bg-[#f8f9fa] p-5 shadow-[0_12px_28px_rgba(21,20,27,0.03)] sm:min-h-[480px] lg:min-h-[520px] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(21,20,27,0.07)]"
            >
              <h3 className="mt-2 font-black tracking-[-0.06em] text-[#171717] leading-[1] text-[1.45rem] sm:text-[1.65rem] lg:text-[1.75rem] break-words">
                {card.title}
              </h3>

              <p className="mt-3.5 text-[0.92rem] sm:text-[0.98rem] leading-relaxed text-[#171717]/80">
                {card.text}
              </p>

              <div className="mt-5 sm:mt-6 flex-1">
                {card.visual === "portrait" && <PortraitVisual />}
                {card.visual === "ai" && <AiVisual />}
                {card.visual === "notebook" && <NotebookVisual />}
                {card.visual === "laptop" && <LaptopVisual />}
              </div>

              <Link
                href="/contact"
                className="mt-5 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#171717]/15 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#171717] shadow-sm transition-all duration-200 hover:bg-[#0060c3] hover:text-white hover:border-[#0060c3] hover:-translate-y-0.5 active:scale-95 text-center"
              >
                <span>{card.cta}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2.5} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortraitVisual() {
  return (
    <div className="relative h-[190px] overflow-hidden rounded-[1.4rem] border border-[#171717]/15 bg-[#d9d9d9] sm:h-[220px] lg:h-[250px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-[size:22px_22px] opacity-70" />
      <div className="absolute inset-x-0 top-0 bottom-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.75),transparent_30%)]" />
      <div className="absolute left-1/2 top-1/2 h-[150px] w-[110px] -translate-x-1/2 -translate-y-1/2 rounded-[55%_45%_48%_52%/60%_38%_62%_40%] bg-[linear-gradient(135deg,#8f8f8f,#f3f3f3_45%,#0b0b0b_46%,#d9d9d9_100%)] shadow-[inset_0_0_0_5px_rgba(0,0,0,0.05)]" />
      <div className="absolute left-1/2 top-[28%] h-8 w-20 -translate-x-1/2 rounded-full border-[7px] border-[#0d0d0d] bg-transparent" />
      <div className="absolute left-1/2 top-[44%] h-14 w-10 -translate-x-1/2 rounded-full border-[5px] border-[#0d0d0d]" />
      <div className="absolute left-[34%] top-[52%] h-14 w-6 rounded-full bg-[#0d0d0d] rotate-12" />
      <div className="absolute right-[34%] top-[52%] h-14 w-6 rounded-full bg-[#0d0d0d] -rotate-12" />
      <div className="absolute left-1/2 top-[62%] h-16 w-24 -translate-x-1/2 rounded-[40%_40%_55%_55%/70%] bg-[#3b3b3b]" />
      <div className="absolute left-1/2 top-[68%] h-22 w-22 -translate-x-1/2 rounded-full border border-[#171717]/20" />
      <div className="absolute left-1/2 top-[70%] h-3 w-3 -translate-x-1/2 rounded-full bg-[#f0c531]" />
      <div className="absolute left-[18%] top-[70%] h-3 w-3 rounded-full bg-[#f0c531]" />
      <div className="absolute right-[18%] top-[70%] h-3 w-3 rounded-full bg-[#f0c531]" />
    </div>
  );
}

function AiVisual() {
  return (
    <div className="relative h-[190px] overflow-hidden rounded-[1.4rem] border border-[#171717]/15 bg-[#f5d4b6] sm:h-[220px] lg:h-[250px]">
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[30px] bg-[#d86c33]" />
      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-[26px] bg-[#ab5221]" />
      <div className="absolute left-1/2 top-1/2 h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 rounded-[24px] bg-[#f6e5d9] opacity-90" />
      <div className="absolute left-[22%] top-[28%] h-3 w-3 rounded-full bg-[#171717]/20" />
      <div className="absolute right-[22%] top-[32%] h-3 w-3 rounded-full bg-[#171717]/20" />
      <div className="absolute left-1/2 top-[52%] h-14 w-14 -translate-x-1/2 rotate-[18deg] rounded-[18px] border-2 border-[#fff5ef]/60" />
      <span className="absolute left-1/2 top-[52%] -translate-x-1/2 text-[4.4rem] font-black tracking-[-0.08em] text-[#fff5ef]">Ai</span>
      <div className="absolute left-1/2 top-[18%] h-24 w-24 -translate-x-1/2 rounded-full border-2 border-[#171717]/30" />
    </div>
  );
}

function NotebookVisual() {
  return (
    <div className="relative h-[190px] overflow-hidden rounded-[1.4rem] border border-[#171717]/15 bg-[#d7d2ef] sm:h-[220px] lg:h-[250px]">
      <div className="absolute inset-x-0 bottom-0 h-[64%] bg-[linear-gradient(90deg,#f0e7ff_0%,#d3c0f5_100%)]" />
      <div className="absolute left-[18%] top-[18%] h-[58%] w-[52%] rounded-[1.2rem] bg-[#f4f0ff] shadow-[0_14px_18px_rgba(0,0,0,0.08)]" />
      <div className="absolute right-[16%] bottom-[18%] h-[48%] w-[42%] rounded-[1rem] bg-[#eae5ff] shadow-[0_12px_16px_rgba(0,0,0,0.06)]" />
      <div className="absolute left-[25%] top-[30%] h-[18%] w-[38%] rounded-full border-[3px] border-[#171717]/20" />
      <div className="absolute right-[26%] bottom-[32%] h-[12%] w-[24%] rounded-full border-[3px] border-[#171717]/20" />
      <div className="absolute left-[52%] top-[24%] h-[36%] w-[2px] rotate-[28deg] bg-[#171717]/20" />
      <div className="absolute left-[45%] top-[38%] h-[2px] w-[34%] rotate-[26deg] bg-[#171717]/20" />
      <div className="absolute left-[40%] bottom-[16%] h-[16%] w-[8%] rounded-full border-[3px] border-[#171717]/30" />
      <div className="absolute left-[52%] bottom-[22%] h-[18%] w-[18%] rounded-full border-[3px] border-[#171717]/30" />
      <div className="absolute left-[36%] top-[14%] h-[22%] w-[12%] rounded-full bg-[#f0d08a] opacity-70" />
    </div>
  );
}

function LaptopVisual() {
  return (
    <div className="relative h-[190px] overflow-hidden rounded-[1.4rem] border border-[#171717]/15 bg-[#bfd6bb] sm:h-[220px] lg:h-[250px]">
      <div className="absolute left-1/2 top-[16%] h-[52%] w-[72%] -translate-x-1/2 rounded-[1.2rem] border border-[#171717]/20 bg-[#d9b18c] shadow-[0_12px_20px_rgba(0,0,0,0.12)]" />
      <div className="absolute left-1/2 top-[16%] h-[52%] w-[66%] -translate-x-1/2 rounded-[0.9rem] bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.75),transparent_25%),linear-gradient(135deg,#f2b29b,#8d2a22)]" />
      <div className="absolute left-[20%] top-[18%] h-[18%] w-[18%] rounded-full bg-[#171717]/20" />
      <div className="absolute left-1/2 top-[16%] h-[28%] w-[2px] -translate-x-1/2 bg-[#171717]/20" />
      <div className="absolute left-1/2 top-[38%] h-[20%] w-[55%] -translate-x-1/2 rounded-full bg-[#171717]/15" />
      <div className="absolute left-1/2 top-[70%] h-[16%] w-[80%] -translate-x-1/2 rounded-t-[1.6rem] bg-[#2a2a2a]" />
      <div className="absolute left-1/2 top-[78%] h-[8%] w-[66%] -translate-x-1/2 rounded-full bg-[#171717]/90" />
      <div className="absolute left-[24%] top-[64%] h-[10%] w-[10%] rounded-full bg-[#d68a2a]/80" />
    </div>
  );
}
