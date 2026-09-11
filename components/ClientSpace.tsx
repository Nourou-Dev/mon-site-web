import Link from "next/link";
import { ArrowUpRight, Check, ShieldCheck, Clock, MessageSquare, FileCode } from "lucide-react";

const PROCESS_STEPS = [
  {
    step: "01",
    phase: "Phase 1",
    title: "Immersion & Cadrage Stratégique",
    desc: "Nous analysons votre marché, vos concurrents, vos cibles et vos objectifs commerciaux. Nous définissons l'arborescence exacte et les messages clés pour que votre proposition de valeur soit comprise instantanément.",
    duration: "Semaine 1",
  },
  {
    step: "02",
    phase: "Phase 2",
    title: "Direction Artistique & Prototypage",
    desc: "Conception sur mesure des maquettes UI/UX sur Figma. Vous testez et validez le design interactif de chaque page (ordinateur et smartphone) avant toute ligne de code.",
    duration: "Semaine 2",
  },
  {
    step: "03",
    phase: "Phase 3",
    title: "Développement Next.js & Intégration",
    desc: "Développement haute performance en Next.js 14, TypeScript et TailwindCSS. Code propriétaire, animations fluides, sécurité renforcée et score Google PageSpeed 99+ garanti.",
    duration: "Semaines 3-4",
  },
  {
    step: "04",
    phase: "Phase 4",
    title: "Lancement, Recette & Autonomie",
    desc: "Mise en ligne sur votre nom de domaine avec certificat SSL A+. Formation personnalisée en vidéo et livraison de tous les accès : vous êtes 100% propriétaire sans abonnement captif.",
    duration: "Semaine 4-5",
  },
];

export default function ClientSpace() {
  return (
    <section id="process" className="relative w-full bg-[#F6F4EF] py-20 sm:py-28 lg:py-32 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#C9C4B8]">
          <div>
            <span className="text-xs font-mono text-[#4B4D54]">
              08 / Processus de collaboration &amp; suivi
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1B1D22] max-w-[640px]">
              Une méthode rigoureuse, sans mauvaise surprise.
            </h2>
          </div>
          <p className="max-w-[380px] text-sm text-[#4B4D54] leading-relaxed font-light">
            De la première discussion jusqu&apos;à la mise en ligne, vous suivez chaque étape en toute transparence via votre espace client dédié.
          </p>
        </div>

        {/* Grille des 4 étapes */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="flex flex-col justify-between rounded-2xl border border-[#C9C4B8] bg-white p-7 shadow-2xs hover:border-[#1B1D22]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#C9C4B8]/40 font-mono text-xs">
                  <span className="text-[#1B1D22] font-medium">{step.step}</span>
                  <span className="text-[#4B4D54]">{step.duration}</span>
                </div>

                <span className="mt-4 inline-block text-xs font-mono text-[#3D5AFE]">
                  {step.phase}
                </span>

                <h3 className="mt-1 font-display text-lg font-medium text-[#1B1D22] leading-snug">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-[#4B4D54] font-light">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#C9C4B8]/40 flex items-center gap-2 text-xs font-mono text-[#1B1D22]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                <span>Validation conjointe</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bannière mise en avant Espace Client */}
        <div className="mt-12 rounded-2xl border border-[#1B1D22] bg-[#1B1D22] p-8 sm:p-12 text-[#F6F4EF]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="text-xs font-mono text-[#3D5AFE]">
                Inclus avec chaque projet
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-light text-[#F6F4EF] tracking-tight">
                Votre Espace Client Privé &amp; Sécurisé
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#F6F4EF]/80 max-w-[560px] font-light">
                Accédez 24h/24 à votre portail dédié pour suivre l&apos;avancement de chaque jalon en direct, échanger par messagerie sécurisée, consulter vos livrables Figma et récupérer vos codes sources.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch lg:items-center justify-end gap-3.5">
              <Link
                href="/app"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs font-medium text-[#1B1D22] shadow-2xs hover:bg-[#F6F4EF] transition-all text-center"
              >
                <span>Aperçu Espace Client</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-xs font-medium text-white hover:bg-white/20 transition-all text-center"
              >
                <span>Lancer votre projet</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
