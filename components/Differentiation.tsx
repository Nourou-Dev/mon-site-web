"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Compass,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  MousePointerClick,
} from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "La stratégie",
    subtitle: "Définition du cap et de l'offre",
    description:
      "Avant de concevoir votre site, nous clarifions votre cible, votre offre, votre positionnement et l’action concrète que vous voulez obtenir de vos visiteurs. Rien n'est laissé au hasard.",
    icon: Target,
    tag: "Fondation business",
    previewType: "strategy",
  },
  {
    number: "02",
    title: "Le message",
    subtitle: "Clarté et proposition de valeur",
    description:
      "Vos visiteurs doivent comprendre en quelques secondes qui vous aidez, ce que vous proposez et pourquoi ils devraient vous choisir plutôt qu'un autre. Un discours limpide, sans jargon.",
    icon: MessageSquare,
    tag: "Copywriting percutant",
    previewType: "message",
  },
  {
    number: "03",
    title: "L’expérience utilisateur",
    subtitle: "Parcours fluide et intuitif",
    description:
      "Chaque élément, section et menu est placé stratégiquement pour faciliter la navigation, éliminer les hésitations et conduire naturellement le visiteur vers la prise de contact.",
    icon: Compass,
    tag: "Ergonomie & Navigation",
    previewType: "ux",
  },
  {
    number: "04",
    title: "La conversion",
    subtitle: "Mécaniques de passage à l'action",
    description:
      "Les textes, boutons d'action, preuves sociales et réassurances sont méthodiquement organisés pour réduire les freins psychologiques et multiplier les opportunités d'affaires.",
    icon: TrendingUp,
    tag: "Génération de leads",
    previewType: "conversion",
  },
  {
    number: "05",
    title: "La cohérence de marque",
    subtitle: "Perception haut de gamme",
    description:
      "Votre site doit ressembler à votre entreprise, valoriser votre univers et transmettre le niveau exact d'excellence et de sérieux que vous offrez au quotidien.",
    icon: Sparkles,
    tag: "Identité & Crédibilité",
    previewType: "branding",
  },
];

export default function Differentiation() {
  const [active, setActive] = useState(0);
  const current = pillars[active];
  const Icon = current.icon;

  return (
    <section id="approche" className="scroll-mt-[5.5rem] px-4 py-20 sm:px-6 sm:py-28 lg:px-10 lg:py-32 bg-[#F6F4EF] border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px]">
        {/* En-tête éditorial architectural */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-12 border-b border-[#C9C4B8]">
          <div>
            <p className="text-xs font-mono text-[#1B1D22]/60">
              05 · Méthode &amp; Architecture commerciale
            </p>
            <h2 className="mt-4 max-w-[680px] font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1B1D22]">
              Un site pensé comme un <span className="italic">levier de conversion</span>, pas comme un simple décor.
            </h2>
          </div>
          <p className="max-w-[420px] text-sm sm:text-base leading-relaxed text-[#1B1D22]/70 font-sans">
            Je ne me limite pas à choisir des polices et des couleurs. Je conçois une mécanique de conviction taillée sur mesure pour votre marché.
          </p>
        </div>

        {/* Studio interactif à 2 volets */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.25fr] items-stretch">

          {/* Volet Gauche : Sélecteur de Piliers façon Studio */}
          <div className="flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-2.5">
              {pillars.map((pillar, idx) => {
                const isActive = active === idx;
                return (
                  <button
                    key={pillar.title}
                    type="button"
                    onClick={() => setActive(idx)}
                    className={`group relative flex items-center justify-between p-5 text-left transition-all border bg-white ${
                      isActive
                        ? "border-[#1B1D22] ring-1 ring-[#1B1D22] translate-x-1 sm:translate-x-2"
                        : "border-[#C9C4B8] hover:border-[#1B1D22]/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-xs font-bold transition-colors ${
                          isActive ? "text-[#3D5AFE]" : "text-[#1B1D22]/40 group-hover:text-[#1B1D22]"
                        }`}
                      >
                        {pillar.number}
                      </span>
                      <div>
                        <h3 className="font-serif text-lg font-normal text-[#1B1D22]">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#1B1D22]/60 font-sans">
                          {pillar.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`hidden sm:inline-block text-[10px] font-mono px-2.5 py-1 transition-colors border ${
                          isActive
                            ? "bg-[#1B1D22] text-white border-[#1B1D22]"
                            : "bg-[#F6F4EF] text-[#1B1D22]/70 border-[#C9C4B8] group-hover:text-[#1B1D22]"
                        }`}
                      >
                        {pillar.tag}
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isActive
                            ? "text-[#1B1D22] translate-x-1"
                            : "text-[#1B1D22]/40 group-hover:text-[#1B1D22]"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Micro-guide de navigation */}
            <div className="mt-4 flex items-center justify-between px-2 text-xs text-[#1B1D22]/60 font-mono">
              <span className="flex items-center gap-2">
                <MousePointerClick className="h-3.5 w-3.5 text-[#1B1D22]" />
                Cliquez pour explorer chaque pilier
              </span>
              <span>
                {active + 1} / {pillars.length}
              </span>
            </div>
          </div>

          {/* Volet Droit : Grand Théâtre Visuel Immersif */}
          <div className="relative flex flex-col justify-between border border-[#C9C4B8] p-8 sm:p-12 lg:p-14 bg-[#1B1D22] text-white overflow-hidden">
            {/* Numéro filigrane monumental */}
            <span className="pointer-events-none absolute right-6 top-4 font-serif text-[clamp(6rem,12vw,10rem)] font-normal leading-none select-none text-white/[0.04]">
              {current.number}
            </span>

            <div className="relative z-10">
              {/* Badge & Contrôles */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center border border-white/20 bg-white/10 text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <span className="px-3 py-1 text-xs font-mono border border-white/20 bg-white/5 text-white/90">
                    {current.tag}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActive((prev) => (prev > 0 ? prev - 1 : pillars.length - 1))}
                    aria-label="Pilier précédent"
                    className="flex h-9 w-9 items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive((prev) => (prev < pillars.length - 1 ? prev + 1 : 0))}
                    aria-label="Pilier suivant"
                    className="flex h-9 w-9 items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Titre & Description détaillée */}
              <div className="mt-8">
                <span className="font-mono text-xs text-white/60">
                  Pilier {current.number} sur 05
                </span>
                <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-white">
                  {current.title}
                </h3>
                <p className="mt-4 text-base sm:text-lg leading-relaxed max-w-[540px] text-white/80 font-sans">
                  {current.description}
                </p>
              </div>

              {/* Aperçu interactif dynamique selon le pilier */}
              <div className="mt-8 border border-white/15 bg-white/5 p-6 text-white">
                {current.previewType === "strategy" && (
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between text-xs font-mono text-white/70">
                      <span>Analyse Préparatoire</span>
                      <span className="text-[#3D5AFE] font-bold">100% Cadré</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      <div className="p-3 border border-white/15 bg-white/5">
                        <span className="text-[0.7rem] block text-white/60 font-mono">Étape 1</span>
                        <span className="font-bold text-xs">Cible définie</span>
                      </div>
                      <div className="p-3 border border-white/15 bg-white/5">
                        <span className="text-[0.7rem] block text-white/60 font-mono">Étape 2</span>
                        <span className="font-bold text-xs">Offre packagée</span>
                      </div>
                      <div className="p-3 border border-white/15 bg-white/5">
                        <span className="text-[0.7rem] block text-white/60 font-mono">Étape 3</span>
                        <span className="font-bold text-xs">Objectif chiffré</span>
                      </div>
                    </div>
                  </div>
                )}

                {current.previewType === "message" && (
                  <div className="space-y-2.5 text-xs sm:text-sm font-sans">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 px-3 py-2 border border-red-400/30 bg-red-500/10 text-red-200">
                      <span className="font-mono font-bold shrink-0 text-red-300">AVANT :</span>
                      <span>« Nous proposons des prestations digitales innovantes 360° »</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 px-3 py-2 border border-emerald-400/30 bg-emerald-500/15 text-emerald-100 font-medium">
                      <span className="font-mono font-bold shrink-0 text-emerald-300">APRÈS :</span>
                      <span>« Des sites web qui font choisir votre marque et convertissent vos visiteurs »</span>
                    </div>
                  </div>
                )}

                {current.previewType === "ux" && (
                  <div className="space-y-3 font-sans">
                    <div className="flex items-center justify-between text-xs font-mono text-white/70">
                      <span>Parcours utilisateur optimisé</span>
                      <span className="text-[#3D5AFE] font-bold">0 friction</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-3 py-1.5 border border-white/20 bg-white/10 text-white">
                        Arrivée
                      </span>
                      <span className="text-[#3D5AFE]">·</span>
                      <span className="px-3 py-1.5 border border-white/20 bg-white/10 text-white">
                        Compréhension immédiate
                      </span>
                      <span className="text-[#3D5AFE]">·</span>
                      <span className="px-3 py-1.5 bg-[#3D5AFE] text-white font-bold">
                        Prise de contact
                      </span>
                    </div>
                  </div>
                )}

                {current.previewType === "conversion" && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
                    <div>
                      <span className="text-xs font-mono text-white/60 block">
                        Impact sur le passage à l'action
                      </span>
                      <span className="text-2xl font-serif text-white">+68% de réponses qualifiées</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-[#3D5AFE]" />
                      <span>Appels à l'action stratégiques</span>
                    </div>
                  </div>
                )}

                {current.previewType === "branding" && (
                  <div className="flex items-center justify-between font-sans">
                    <div>
                      <span className="text-xs font-mono text-white/60 block">
                        Statut &amp; Perception
                      </span>
                      <span className="text-lg font-serif">Crédibilité &amp; Élégance sur mesure</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="h-6 w-6 bg-white border border-white/20" />
                      <span className="h-6 w-6 bg-[#3D5AFE] border border-white/20" />
                      <span className="h-6 w-6 bg-[#1B1D22] border border-white/20" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pied de carte avec CTA */}
            <div className="relative z-10 mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="max-w-[240px] text-xs sm:text-sm text-white/80 font-sans leading-snug">
                Vous voulez appliquer cette méthode à votre marque ?
              </p>
              <Link
                href="/contact"
                className="inline-flex shrink-0 whitespace-nowrap items-center justify-center bg-[#3D5AFE] text-white hover:bg-[#2A45E2] px-7 py-3 text-xs font-mono transition-colors"
              >
                Discuter de votre projet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
