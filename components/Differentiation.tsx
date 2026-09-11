"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  MousePointerClick,
  Layers,
  Zap,
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
    <section id="approche" className="scroll-mt-[5.5rem] px-4 py-20 sm:px-6 sm:py-28 lg:px-10 lg:py-32 bg-[#fbf9f5] border-b border-[#171717]/8">
      <div className="mx-auto max-w-[1360px]">
        {/* En-tête éditorial architectural */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-12 border-b border-[#171717]/10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              [ 05 / MÉTHODE &amp; ARCHITECTURE COMMERCIALE ]
            </span>
            <h2 className="mt-4 max-w-[680px] font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#171717]">
              Un site pensé comme un <span className="italic font-serif underline decoration-[#171717]/20 decoration-2 underline-offset-8">levier de conversion</span>, pas comme un simple décor.
            </h2>
          </div>
          <p className="max-w-[420px] text-sm sm:text-base leading-relaxed text-[#4b5563]">
            Je ne me limite pas à choisir des polices et des couleurs. Je construis une véritable mécanique de conviction taillée sur mesure pour votre marché.
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
                    className={`group relative flex items-center justify-between rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 border bg-white ${
                      isActive
                        ? "border-[#171717] shadow-lg shadow-black/5 ring-1 ring-[#171717] translate-x-1 sm:translate-x-2"
                        : "border-[#171717]/8 hover:border-[#171717]/20 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-xs font-bold transition-colors ${
                          isActive ? "text-[#171717]" : "text-[#9ca3af] group-hover:text-[#171717]"
                        }`}
                      >
                        {pillar.number}
                      </span>
                      <div>
                        <h3 className="font-display font-bold text-lg tracking-tight text-[#171717]">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-[#6b7280]">
                          {pillar.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`hidden sm:inline-block text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded-full transition-colors ${
                          isActive
                            ? "bg-[#171717] text-white"
                            : "bg-[#f4f6f8] text-[#6b7280] group-hover:text-[#171717]"
                        }`}
                      >
                        {pillar.tag}
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isActive
                            ? "text-[#171717] translate-x-1"
                            : "text-[#9ca3af] group-hover:text-[#171717] group-hover:translate-x-0.5"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Micro-guide de navigation */}
            <div className="mt-4 flex items-center justify-between px-2 text-xs text-[#6b7280]">
              <span className="flex items-center gap-1.5 font-medium">
                <MousePointerClick className="h-4 w-4 text-[#171717]" />
                Cliquez pour explorer chaque pilier
              </span>
              <span className="font-mono text-[11px] uppercase">
                {active + 1} / {pillars.length}
              </span>
            </div>
          </div>

          {/* Volet Droit : Grand Théâtre Visuel Immersif */}
          {(() => {
            const isRightBlue = false;
            return (
              <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 sm:p-10 lg:p-12 shadow-2xl transition-all duration-500 border border-[#171717]/12 bg-[#171717] text-white">
            {/* Numéro filigrane monumental */}
            <span className="pointer-events-none absolute right-6 top-4 font-display text-[clamp(6rem,12vw,10rem)] font-black leading-none select-none text-white/[0.04]">
              {current.number}
            </span>

            <div className="relative z-10">
              {/* Badge & Contrôles */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border border-white/20 bg-white/10 text-white">
                    {current.tag}
                  </span>
                </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setActive((prev) => (prev > 0 ? prev - 1 : pillars.length - 1))}
                        aria-label="Pilier précédent"
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                          isRightBlue
                            ? "bg-white/15 text-white hover:bg-white/25"
                            : "bg-[#f4f6f8] text-[#171717] hover:bg-[#eaeaea]"
                        }`}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setActive((prev) => (prev < pillars.length - 1 ? prev + 1 : 0))}
                        aria-label="Pilier suivant"
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                          isRightBlue
                            ? "bg-white/15 text-white hover:bg-white/25"
                            : "bg-[#f4f6f8] text-[#171717] hover:bg-[#eaeaea]"
                        }`}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Titre & Description détaillée */}
                  <div className="mt-8">
                    <span
                      className={`font-mono text-xs uppercase tracking-widest transition-colors ${
                        isRightBlue ? "text-white/70" : "text-[#171717]/50"
                      }`}
                    >
                      Pilier {current.number} sur 05
                    </span>
                    <h3
                      className={`mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight transition-colors ${
                        isRightBlue ? "text-white" : "text-[#171717]"
                      }`}
                    >
                      {current.title}
                    </h3>
                    <p
                      className={`mt-4 text-base sm:text-lg leading-relaxed max-w-[540px] transition-colors ${
                        isRightBlue ? "text-white/90" : "text-[#4b4b4b]"
                      }`}
                    >
                      {current.description}
                    </p>
                  </div>

                  {/* Aperçu interactif dynamique selon le pilier */}
                  <div
                    className={`mt-8 rounded-2xl border p-5 sm:p-6 backdrop-blur-md transition-colors ${
                      isRightBlue
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-[#171717]/10 bg-[#f8f9fa] text-[#171717]"
                    }`}
                  >
                    {current.previewType === "strategy" && (
                      <div className="space-y-3 text-sm">
                        <div
                          className={`flex items-center justify-between text-xs uppercase tracking-wider ${
                            isRightBlue ? "text-white/70" : "text-[#171717]/60"
                          }`}
                        >
                          <span>Analyse Préparatoire</span>
                          <span className={isRightBlue ? "text-white font-bold" : "text-[#0060c3] font-bold"}>
                            100% Cadré
                          </span>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-3">
                          <div
                            className={`rounded-xl p-3 border ${
                              isRightBlue ? "bg-white/10 border-white/15 text-white" : "bg-white border-[#171717]/8 text-[#171717]"
                            }`}
                          >
                            <span className={`text-[0.7rem] block ${isRightBlue ? "text-white/60" : "text-[#171717]/50"}`}>
                              Étape 1
                            </span>
                            <span className="font-bold text-xs">Cible définie</span>
                          </div>
                          <div
                            className={`rounded-xl p-3 border ${
                              isRightBlue ? "bg-white/10 border-white/15 text-white" : "bg-white border-[#171717]/8 text-[#171717]"
                            }`}
                          >
                            <span className={`text-[0.7rem] block ${isRightBlue ? "text-white/60" : "text-[#171717]/50"}`}>
                              Étape 2
                            </span>
                            <span className="font-bold text-xs">Offre packagée</span>
                          </div>
                          <div
                            className={`rounded-xl p-3 border ${
                              isRightBlue ? "bg-white/10 border-white/15 text-white" : "bg-white border-[#171717]/8 text-[#171717]"
                            }`}
                          >
                            <span className={`text-[0.7rem] block ${isRightBlue ? "text-white/60" : "text-[#171717]/50"}`}>
                              Étape 3
                            </span>
                            <span className="font-bold text-xs">Objectif chiffré</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {current.previewType === "message" && (
                      <div className="space-y-2.5 text-xs sm:text-sm">
                        <div
                          className={`flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg border ${
                            isRightBlue
                              ? "bg-red-500/20 text-red-200 border-red-400/30"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          <span className={`font-mono font-bold shrink-0 ${isRightBlue ? "text-red-300" : "text-red-500"}`}>
                            AVANT :
                          </span>
                          <span>« Nous proposons des prestations digitales innovantes 360° »</span>
                        </div>
                        <div
                          className={`flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-lg border font-medium ${
                            isRightBlue
                              ? "bg-emerald-500/25 text-emerald-100 border-emerald-400/40"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200"
                          }`}
                        >
                          <span className={`font-mono font-bold shrink-0 ${isRightBlue ? "text-emerald-300" : "text-emerald-600"}`}>
                            APRÈS :
                          </span>
                          <span>« Des sites web qui font choisir votre marque et convertissent vos visiteurs »</span>
                        </div>
                      </div>
                    )}

                    {current.previewType === "ux" && (
                      <div className="space-y-3">
                        <div
                          className={`flex items-center justify-between text-xs ${
                            isRightBlue ? "text-white/70" : "text-[#171717]/60"
                          }`}
                        >
                          <span>Parcours utilisateur optimisé</span>
                          <span className={isRightBlue ? "text-white font-bold" : "text-[#0060c3] font-bold"}>
                            0 friction
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                          <span
                            className={`rounded-lg px-3 py-1.5 border ${
                              isRightBlue ? "bg-white/15 text-white border-white/15" : "bg-white text-[#171717] border-[#171717]/8"
                            }`}
                          >
                            Arrivée
                          </span>
                          <span className={isRightBlue ? "text-white/80" : "text-[#0060c3]"}>➔</span>
                          <span
                            className={`rounded-lg px-3 py-1.5 border ${
                              isRightBlue ? "bg-white/15 text-white border-white/15" : "bg-white text-[#171717] border-[#171717]/8"
                            }`}
                          >
                            Compréhension immédiate
                          </span>
                          <span className={isRightBlue ? "text-white/80" : "text-[#0060c3]"}>➔</span>
                          <span
                            className={`rounded-lg px-3 py-1.5 font-bold ${
                              isRightBlue ? "bg-white text-[#0060c3]" : "bg-[#0060c3] text-white"
                            }`}
                          >
                            Prise de contact
                          </span>
                        </div>
                      </div>
                    )}

                    {current.previewType === "conversion" && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span
                            className={`text-xs uppercase tracking-wider block ${
                              isRightBlue ? "text-white/60" : "text-[#171717]/50"
                            }`}
                          >
                            Impact sur le passage à l'action
                          </span>
                          <span className="text-2xl font-black">+68% de réponses qualifiées</span>
                        </div>
                        <div
                          className={`flex items-center gap-2 text-xs ${
                            isRightBlue ? "text-white/85" : "text-[#4b4b4b]"
                          }`}
                        >
                          <CheckCircle2
                            className={`h-4 w-4 ${isRightBlue ? "text-white" : "text-[#0060c3]"}`}
                          />
                          <span>Appels à l'action stratégiques</span>
                        </div>
                      </div>
                    )}

                    {current.previewType === "branding" && (
                      <div className="flex items-center justify-between">
                        <div>
                          <span
                            className={`text-xs uppercase tracking-wider block ${
                              isRightBlue ? "text-white/60" : "text-[#171717]/50"
                            }`}
                          >
                            Statut &amp; Perception
                          </span>
                          <span className="text-lg font-bold">Crédibilité &amp; Élégance sur mesure</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="h-6 w-6 rounded-full bg-white border border-black/10" />
                          <span className="h-6 w-6 rounded-full bg-[#0060c3] border border-white/20" />
                          <span className="h-6 w-6 rounded-full bg-[#171717] border border-white/20" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pied de carte avec CTA */}
                <div
                  className={`relative z-10 mt-8 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isRightBlue ? "border-white/20" : "border-[#171717]/10"
                  }`}
                >
                  <p
                    className={`max-w-[210px] text-xs sm:text-sm leading-snug ${
                      isRightBlue ? "text-white/85" : "text-[#4b4b4b]"
                    }`}
                  >
                    Vous voulez appliquer cette méthode <span className="block">à votre marque ?</span>
                  </p>
                  <Link
                    href="/contact"
                    className={`inline-flex shrink-0 whitespace-nowrap items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 text-center ${
                      isRightBlue
                        ? "bg-white text-[#0060c3] hover:bg-[#f5f9ff] hover:-translate-y-0.5"
                        : "bg-[#0060c3] text-white hover:bg-[#0050a5] hover:-translate-y-0.5 shadow-lg shadow-[#0060c3]/25"
                    }`}
                  >
                    <span>Discutons de votre projet</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   ANCIEN DESIGN (GRILLE DE CARTES) - CONSERVÉ EN COMMENTAIRE COMME DEMANDÉ
   =========================================================================

export function DifferentiationOldCardGrid() {
  return (
    <section id="approche" className="scroll-mt-[5.5rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 bg-[#f5f1ed]">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[700px]">
            <span className="inline-flex max-w-full flex-wrap items-center rounded-full border border-[#171717]/10 bg-white/90 px-3.5 py-1.5 text-center text-[0.65rem] font-medium uppercase leading-snug tracking-[0.12em] text-[#171717] shadow-sm sm:text-[0.7rem] sm:tracking-[0.18em]">
              Mon approche &amp; Vision
            </span>
            <h2 className="mt-4 font-black tracking-[-0.07em] text-[#171717] text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
              Un site pensé comme un outil commercial
            </h2>
          </div>
          <p className="max-w-[480px] text-base sm:text-lg leading-relaxed text-[#4b4b4b]">
            Je ne me limite pas à choisir des couleurs, des images et des animations. Je travaille sur les véritables leviers qui transforment votre présence web en moteur de croissance.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isFullWidth = idx === 4;
            return (
              <div
                key={pillar.title}
                className={`group flex flex-col justify-between rounded-[2rem] border border-[#171717]/8 bg-white p-6 sm:p-8 shadow-[0_12px_30px_rgba(23,23,23,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(23,23,23,0.08)] ${
                  isFullWidth ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#171717]/40">
                      Pilier {pillar.number}
                    </span>
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl border ${pillar.accent}`}>
                      <Icon className="h-5 w-5" strokeWidth={2.2} />
                    </div>
                  </div>

                  <h3 className="mt-6 text-xl sm:text-2xl font-black tracking-[-0.05em] text-[#171717]">
                    {pillar.title}
                  </h3>

                  <p className="mt-3.5 text-sm sm:text-[0.95rem] leading-relaxed text-[#4b4b4b]">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#171717]/5 flex items-center gap-2 text-xs font-semibold text-[#171717]/60 group-hover:text-[#0060c3] transition-colors">
                  <span>Conçu pour convaincre</span>
                </div>
              </div>
            );
          })}

          <div className="flex flex-col justify-between rounded-[2rem] border border-[#171717]/10 bg-[#171717] p-6 sm:p-8 text-white shadow-xl">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#0060c3]">
                Prêt à commencer ?
              </span>
              <h3 className="mt-5 text-xl sm:text-2xl font-black tracking-[-0.05em] text-white">
                Construisons un site à la hauteur de votre valeur
              </h3>
              <p className="mt-3.5 text-sm sm:text-[0.95rem] leading-relaxed text-white/70">
                Chaque projet commence par une écoute attentive pour aligner votre site sur vos objectifs réels de vente.
              </p>
            </div>

            <div className="mt-6 pt-4">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#171717] transition-transform hover:-translate-y-0.5 active:scale-95 text-center shadow-sm"
              >
                <span>Discutons de votre projet</span>
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
========================================================================= */
