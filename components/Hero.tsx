import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, CheckCircle2, Code2, Cpu, Eye, MessageCircle, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";
import { site } from "@/lib/data";

const keyMetrics = [
  { label: "Temps de chargement moyen", value: "< 0.8s", detail: "Optimisé Google Core Web Vitals" },
  { label: "Code propriétaire", value: "100%", detail: "Zéro thème préfabriqué, zéro dette" },
  { label: "Portail client dédié", value: "Temps réel", detail: "Suivi des sprints, previews & contrats" },
  { label: "Réactivité garantie", value: "< 2h", detail: "Échanges directs via WhatsApp & Dashboard" },
];

const coreBadges = [
  "Next.js 15",
  "TypeScript",
  "Tailwind CSS",
  "React",
  "PostgreSQL",
  "Figma",
  "Architecture API",
];

export default function Hero() {
  const whatsappUrl = `${site.whatsapp}?text=${encodeURIComponent(
    "Bonjour Nourou, je souhaite échanger avec vous sur la création / refonte d'un site web..."
  )}`;

  return (
    <section id="accueil" className="relative w-full scroll-mt-[5.5rem] bg-white pt-24 sm:pt-28 pb-12 sm:pb-20">
      {/* Filet architectural supérieur avec métadonnées géographiques & techniques */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#171717]/10 pb-4 text-[11px] font-mono uppercase tracking-[0.14em] text-[#71717a]">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[#171717]">Disponible · Nouveaux projets T1 2026</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>6.4474° N, 2.3557° E (Abomey-Calavi)</span>
            <span className="text-[#171717]/20">/</span>
            <span>Remote Worldwide</span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[#0060c3]">
            <span>Nourou Dine AMANDOU</span>
            <span className="rounded bg-[#0060c3]/10 px-1.5 py-0.5 text-[10px]">STUDIO</span>
          </div>
        </div>

        {/* Cœur du Hero : Asymétrie éditoriale pure & humaine */}
        <div className="mt-8 sm:mt-12 grid gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
          
          {/* Bloc texte principal */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0060c3]/20 bg-[#0060c3]/5 px-3.5 py-1.5 text-xs font-bold text-[#0060c3]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Conception web sur-mesure &amp; Architecture digitale</span>
            </div>

            <h1 className="mt-6 font-black tracking-[-0.055em] text-[#0e1217] text-[clamp(2.4rem,4.8vw,4.5rem)] leading-[1.05]">
              L’exigence du sur-mesure.{" "}
              <span className="block text-[#0060c3] italic font-serif">
                L’efficacité du code propre.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#3f3f46]">
              Je conçois des sites web et des applications haute performance pour les entrepreneurs et entreprises qui refusent les templates préfabriqués, les promesses vagues et les lenteurs d’agences.
            </p>

            {/* Actions directes */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0060c3] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#0060c3]/25 transition-all duration-200 hover:bg-[#0050a5] hover:-translate-y-0.5 active:scale-95"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Lancer votre projet sur WhatsApp</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <Link
                href="#projets"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#171717]/15 bg-white px-7 py-4 text-sm font-bold text-[#171717] transition-all hover:bg-[#f8f9fa] hover:border-[#171717]/30 hover:-translate-y-0.5"
              >
                <span>Voir les réalisations</span>
                <ArrowDown className="h-4 w-4 text-[#71717a]" />
              </Link>
            </div>

            {/* Fiche de spécifications techniques & garanties réelles */}
            <div className="mt-12 rounded-2xl border border-[#171717]/10 bg-[#fbfcfd] p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#171717]/8 pb-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717]">
                  Standards de livraison · Zéro compromis
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Vérifié
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6">
                {keyMetrics.map((metric, idx) => (
                  <div key={idx} className="border-l-2 border-[#0060c3] pl-3">
                    <span className="block text-xl sm:text-2xl font-black text-[#0e1217]">
                      {metric.value}
                    </span>
                    <span className="block text-xs font-bold text-[#171717]">
                      {metric.label}
                    </span>
                    <span className="block text-[11px] text-[#71717a] mt-0.5">
                      {metric.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite : Portrait d'artisan & Vignette de projet réel */}
          <div className="relative flex flex-col items-center">
            {/* Cadre de présentation du créateur */}
            <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-[#171717]/10 bg-[#f4f6f8] p-4 shadow-lg sm:p-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#171717]/10 text-xs font-mono text-[#71717a]">
                <span>NOUROU_DINE_PORTRAIT.RAW</span>
                <span className="rounded bg-[#0060c3] px-2 py-0.5 font-bold text-white text-[10px]">
                  ARCHITECTE
                </span>
              </div>

              <div className="relative mt-4 flex items-end justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-[#e2e8f0] to-[#cbd5e1] pt-6">
                <Image
                  src="/media/nourou-portrait-transparent-2.png"
                  alt="Nourou Dine AMANDOU, développeur web et architecte d'applications"
                  width={680}
                  height={800}
                  priority
                  sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 300px"
                  className="relative z-10 h-[340px] sm:h-[400px] w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]"
                />
              </div>

              {/* Métadonnées réelles au pied du portrait */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#171717]">Nourou Dine AMANDOU</span>
                  <span className="text-[#71717a]">4+ ans d&apos;expérience</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {coreBadges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-md border border-[#171717]/10 bg-white px-2 py-0.5 text-[10px] font-bold text-[#171717]"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Badge de réassurance live sur le portail client */}
            <div className="relative z-20 -mt-6 w-full max-w-sm rounded-2xl border border-[#171717]/10 bg-white p-4 shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0060c3] text-white">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#171717]">Accès direct à votre espace client</h3>
                  <p className="text-[11px] text-[#71717a]">
                    Testez vos maquettes, suivez les tickets et validez chaque sprint en direct.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
