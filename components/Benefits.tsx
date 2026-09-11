"use client";

import { useState } from "react";
import { Award, Eye, ShieldCheck, Smartphone, Zap, ArrowUpRight, Check, Sparkles } from "lucide-react";

const benefits = [
  {
    id: "01",
    title: "Plus de crédibilité",
    pill: "Confiance immédiate",
    description:
      "Un site clair et soigné rassure instantanément vos prospects. Il efface le doute sur votre sérieux et renforce immédiatement la perception de la qualité de vos produits ou services.",
    result: "Perception professionnelle instantanée dès les 5 premières secondes.",
    icon: ShieldCheck,
  },
  {
    id: "02",
    title: "Plus de clarté",
    pill: "Compréhension rapide",
    description:
      "Vos visiteurs comprennent rapidement qui vous êtes, votre valeur ajoutée unique et la démarche exacte pour faire appel à vous. Fini les questions redondantes et les devis mal ciblés.",
    result: "Parcours limpide qui guide le prospect directement vers votre offre.",
    icon: Eye,
  },
  {
    id: "03",
    title: "Plus de contrôle",
    pill: "Indépendance digitale",
    description:
      "Vous ne dépendez plus des algorithmes capricieux d’Instagram, Facebook ou WhatsApp. Vous possédez un espace professionnel autonome, pérenne et sous votre contrôle total.",
    result: "100% propriétaire de vos données, de vos contenus et de votre audience.",
    icon: Smartphone,
  },
  {
    id: "04",
    title: "Plus d’opportunités",
    pill: "Disponible 24/7",
    description:
      "Votre site travaille pour vous à toute heure du jour et de la nuit, même lorsque vous dormez ou travaillez sur vos chantiers. Il capte les prospects qualifiés au moment exact où ils cherchent une solution.",
    result: "Commercial infatigable prêt à recevoir les demandes en continu.",
    icon: Zap,
  },
  {
    id: "05",
    title: "Une meilleure image",
    pill: "Prestige de marque",
    description:
      "Votre présence en ligne reflète enfin l’ambition, l'exigence et le niveau réel d'excellence de votre travail. Vous n'avez plus honte de donner l'adresse de votre site web.",
    result: "Cohérence totale entre la qualité de votre prestation et votre image.",
    icon: Award,
  },
];

export default function Benefits() {
  const [hovered, setHovered] = useState<number | null>(0);

  return (
    <section className="scroll-mt-[5.5rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 bg-white border-y border-[#171717]/6">
      <div className="mx-auto max-w-[1280px]">
        {/* En-tête typographique de style magazine / éditorial */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end pb-12 border-b border-[#171717]/10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#0060c3]" />
              Bénéfices concrets
            </span>
            <h2 className="mt-4 font-black tracking-[-0.07em] text-[#171717] text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[1.02]">
              Ce que vous gagnez avec un <span className="text-[#0060c3] italic font-serif">site professionnel</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-base sm:text-lg leading-relaxed text-[#4b4b4b]">
              Un investissement stratégique mesurable qui valorise votre travail, rassure vos prospects et transforme durablement votre façon d’acquérir des clients.
            </p>
          </div>
        </div>

        {/* Lignes éditoriales audacieuses (Zero card grid) */}
        <div className="mt-4 divide-y divide-[#171717]/10">
          {benefits.map((item, index) => {
            const isSelected = hovered === index;
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHovered(index)}
                onClick={() => setHovered(index)}
                className={`group relative transition-all duration-300 py-8 sm:py-10 px-4 sm:px-8 cursor-pointer rounded-2xl ${
                  isSelected
                    ? "bg-[#f8f9fa] shadow-[0_10px_30px_rgba(23,23,23,0.04)]"
                    : "hover:bg-[#f8f9fa]/60"
                }`}
              >
                <div className="grid gap-6 lg:grid-cols-[2.2fr_3fr_1.8fr] lg:items-center">
                  
                  {/* Colonne 1 : Numéro + Titre monumental */}
                  <div className="flex items-center gap-5 sm:gap-7">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#0060c3]">
                      {item.id}.
                    </span>
                    <div>
                      <span className="inline-block text-[0.65rem] sm:text-xs font-bold uppercase tracking-wider text-[#171717]/60 mb-1">
                        {item.pill}
                      </span>
                      <h3 className="font-black text-2xl sm:text-3xl lg:text-[2.2rem] tracking-tight text-[#171717] group-hover:text-[#0060c3] transition-colors leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Colonne 2 : Texte explicatif argumenté */}
                  <div className="pl-9 lg:pl-0">
                    <p className="text-sm sm:text-base leading-relaxed text-[#4b4b4b]">
                      {item.description}
                    </p>
                  </div>

                  {/* Colonne 3 : Résultat concret / Badge de preuve */}
                  <div className="pl-9 lg:pl-0 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-xl bg-white border border-[#171717]/8 px-3.5 py-2 shadow-sm text-xs font-semibold text-[#171717]">
                      <Check className="h-3.5 w-3.5 text-[#0060c3] shrink-0" strokeWidth={3} />
                      <span className="text-[0.82rem]">{item.result}</span>
                    </div>

                    <div className="hidden lg:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#171717]/40 group-hover:text-[#0060c3] transition-colors">
                      <span>Impact garanti</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Ruban horizontal d'impact (Garantie de sérénité) */}
        <div className="mt-14 rounded-3xl bg-[#0060c3] text-white p-7 sm:p-10 shadow-[0_25px_60px_rgba(0,96,195,0.3)] border border-white/20">
          <div className="grid gap-8 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
            <div className="sm:pr-6 flex flex-col justify-center">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                100%
              </span>
              <span className="mt-2 text-sm font-bold text-white">
                Propriétaire de votre outil
              </span>
              <p className="mt-1 text-xs text-white/95 leading-relaxed">
                Aucun abonnement captif, vos contenus et votre domaine vous appartiennent totalement.
              </p>
            </div>

            <div className="pt-6 sm:pt-0 sm:px-6 flex flex-col justify-center">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                24h/24
              </span>
              <span className="mt-2 text-sm font-bold text-white">
                Commercial infatigable
              </span>
              <p className="mt-1 text-xs text-white/95 leading-relaxed">
                Présente vos offres et capte les demandes même en dehors de vos heures de travail.
              </p>
            </div>

            <div className="pt-6 sm:pt-0 sm:pl-6 flex flex-col justify-center">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                &lt; 3 sec
              </span>
              <span className="mt-2 text-sm font-bold text-white">
                Temps pour convaincre
              </span>
              <p className="mt-1 text-xs text-white/95 leading-relaxed">
                Une interface optimisée qui dissipe le doute et incite à la prise de contact sans délai.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   ANCIEN DESIGN (GRILLE DE CARTES) - CONSERVÉ EN COMMENTAIRE COMME DEMANDÉ
   =========================================================================

export function BenefitsOldCardGrid() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 bg-white">
      <div className="mx-auto max-w-[1280px]">
        <div className="text-center max-w-[800px] mx-auto">
          <span className="inline-flex max-w-full flex-wrap items-center justify-center rounded-full border border-[#171717]/10 bg-[#f5f1ed] px-3.5 py-1.5 text-center text-[0.65rem] font-medium uppercase leading-snug tracking-[0.12em] text-[#171717] shadow-sm sm:text-[0.7rem] sm:tracking-[0.18em]">
            Bénéfices concrets
          </span>
          <h2 className="mt-4 font-black tracking-[-0.07em] text-[#171717] text-[clamp(2rem,4vw,3.6rem)] leading-[1.04]">
            Ce que vous gagnez avec un site professionnel
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#4b4b4b]">
            Un investissement stratégique qui valorise votre travail, rassure vos prospects et transforme durablement votre façon d’acquérir des clients.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            const isWide = index === 4;
            return (
              <div
                key={item.title}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#171717]/8 bg-[#f5f1ed] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-[#f3efe9] hover:shadow-[0_18px_35px_rgba(23,23,23,0.06)] ${
                  isWide ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-full border border-[#171717]/10 bg-white/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#0060c3]">
                      {item.pill}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-[#171717]/10 text-[#171717] shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-[#0060c3]" strokeWidth={2} />
                    </div>
                  </div>

                  <h3 className="mt-6 text-xl sm:text-2xl font-black tracking-[-0.05em] text-[#171717]">
                    {item.title}
                  </h3>

                  <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#4b4b4b]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-[#171717]/40">
                  <span>Impact direct</span>
                  <div className="h-[1px] flex-1 bg-[#171717]/10" />
                </div>
              </div>
            );
          })}

          <div className="flex flex-col justify-between rounded-[2rem] border border-[#0060c3]/20 bg-[#eef5fc] p-6 sm:p-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0060c3]">
                Résultat attendu
              </span>
              <h3 className="mt-4 text-xl sm:text-2xl font-black tracking-[-0.05em] text-[#171717]">
                Un outil commercial qui travaille pour vous
              </h3>
              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#4b4b4b]">
                Fini les opportunités perdues à cause d’un site hésitant ou invisible. Chaque détail est aligné sur votre rentabilité.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#0060c3]/15 flex items-center justify-between text-xs font-bold text-[#0060c3]">
              <span>Qualité &amp; Rentabilité</span>
              <span>100% sur-mesure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
========================================================================= */
