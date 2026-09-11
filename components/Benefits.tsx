"use client";

import { useState } from "react";
import { Award, Eye, ShieldCheck, Smartphone, Zap } from "lucide-react";

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
  const [hovered, setHovered] = useState(0);

  return (
    <section className="scroll-mt-[5.5rem] px-4 py-20 sm:px-6 sm:py-28 lg:px-10 lg:py-32 bg-[#F6F4EF] border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px]">
        {/* En-tête typographique de style magazine / éditorial */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end pb-12 border-b border-[#C9C4B8]">
          <div>
            <p className="text-xs font-mono text-[#1B1D22]/60">
              06 · Valeur ajoutée &amp; Résultats mesurables
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1B1D22] leading-[1.08]">
              Ce que vous gagnez avec un <span className="italic">site d&apos;auteur</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-sm sm:text-base leading-relaxed text-[#1B1D22]/70 font-sans">
              Un investissement stratégique mesurable qui valorise votre travail, rassure vos prospects et transforme durablement votre façon d’acquérir des clients.
            </p>
          </div>
        </div>

        {/* Lignes éditoriales architecturales (Zero card grid) */}
        <div className="mt-6 divide-y divide-[#C9C4B8]">
          {benefits.map((item, index) => {
            const isSelected = hovered === index;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHovered(index)}
                onClick={() => setHovered(index)}
                className={`group relative transition-colors py-8 sm:py-10 px-4 sm:px-8 cursor-pointer ${
                  isSelected
                    ? "bg-white border-x border-[#C9C4B8]"
                    : "hover:bg-white/50 border-x border-transparent"
                }`}
              >
                <div className="grid gap-6 lg:grid-cols-[2.2fr_3fr_1.8fr] lg:items-center">
                  
                  {/* Colonne 1 : Numéro + Titre */}
                  <div className="flex items-center gap-5 sm:gap-7">
                    <span className="font-mono text-sm sm:text-base font-normal text-[#1B1D22]/40">
                      {item.id}
                    </span>
                    <div>
                      <span className="inline-block text-xs font-mono text-[#3D5AFE] mb-1">
                        {item.pill}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-[#1B1D22] group-hover:text-[#3D5AFE] transition-colors leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Colonne 2 : Texte explicatif argumenté */}
                  <div className="pl-9 lg:pl-0">
                    <p className="text-sm sm:text-base leading-relaxed text-[#1B1D22]/70 font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* Colonne 3 : Résultat concret */}
                  <div className="pl-9 lg:pl-0 flex items-start lg:items-end justify-between">
                    <div className="inline-flex items-center gap-2.5 border border-[#C9C4B8] bg-[#F6F4EF] px-3.5 py-2 text-xs text-[#1B1D22]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE] shrink-0" />
                      <span className="text-xs font-mono">{item.result}</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Ruban horizontal d'impact en encre profonde */}
        <div className="mt-14 border border-[#C9C4B8] bg-[#1B1D22] text-[#F6F4EF] p-8 sm:p-12">
          <div className="grid gap-8 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
            <div className="sm:pr-8 flex flex-col justify-center">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F6F4EF]">
                100%
              </span>
              <span className="mt-2 text-sm font-medium text-[#F6F4EF]">
                Propriétaire de votre outil
              </span>
              <p className="mt-2 text-xs text-[#F6F4EF]/70 leading-relaxed font-sans">
                Aucun abonnement captif, vos contenus et votre domaine vous appartiennent totalement.
              </p>
            </div>

            <div className="pt-6 sm:pt-0 sm:px-8 flex flex-col justify-center">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F6F4EF]">
                24h/24
              </span>
              <span className="mt-2 text-sm font-medium text-[#F6F4EF]">
                Commercial infatigable
              </span>
              <p className="mt-2 text-xs text-[#F6F4EF]/70 leading-relaxed font-sans">
                Présente vos offres et capte les demandes même en dehors de vos heures de travail.
              </p>
            </div>

            <div className="pt-6 sm:pt-0 sm:pl-8 flex flex-col justify-center">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F6F4EF]">
                &lt; 1 sec
              </span>
              <span className="mt-2 text-sm font-medium text-[#F6F4EF]">
                Temps de chargement
              </span>
              <p className="mt-2 text-xs text-[#F6F4EF]/70 leading-relaxed font-sans">
                Une interface légère qui dissipe le doute et incite à la prise de contact sans friction.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
