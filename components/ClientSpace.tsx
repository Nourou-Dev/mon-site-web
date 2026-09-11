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
    <section id="process" className="relative w-full bg-[#fbf9f5] py-20 sm:py-28 lg:py-32 border-b border-[#171717]/8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#171717]/10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              [ 08 / PROCESSUS DE COLLABORATION ]
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#171717] max-w-[640px]">
              Une méthode rigoureuse, sans mauvaise surprise.
            </h2>
          </div>
          <p className="max-w-[380px] text-sm text-[#4b5563] leading-relaxed">
            De la première discussion jusqu&apos;à la mise en ligne, vous suivez chaque étape en toute transparence via votre espace client dédié.
          </p>
        </div>

        {/* Grille des 4 étapes */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="flex flex-col justify-between rounded-3xl border border-[#171717]/10 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#171717]/8 font-mono text-xs">
                  <span className="font-bold text-[#171717]">[ {step.step} ]</span>
                  <span className="text-[#6b7280]">{step.duration}</span>
                </div>

                <span className="mt-4 inline-block text-[10px] font-mono uppercase font-semibold text-[#0052a3]">
                  {step.phase}
                </span>

                <h3 className="mt-1 font-display text-lg font-bold text-[#171717] leading-snug">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-[#4b5563]">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#171717]/6 flex items-center gap-1.5 text-[11px] font-mono text-emerald-700">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>Validation conjointe</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bannière mise en avant Espace Client */}
        <div className="mt-12 rounded-3xl border border-[#171717]/12 bg-[#171717] p-8 sm:p-12 text-white shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
                Inclus avec chaque projet
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Votre Espace Client Privé &amp; Sécurisé
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80 max-w-[560px]">
                Accédez 24h/24 à votre portail dédié pour suivre l&apos;avancement de chaque jalon en direct, échanger par messagerie sécurisée, consulter vos livrables Figma et récupérer vos codes sources.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch lg:items-center justify-end gap-4">
              <Link
                href="/app"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#171717] shadow-md transition-all hover:bg-[#f5f5f5] active:scale-95 text-center"
              >
                <span>Aperçu Espace Client</span>
                <ArrowUpRight className="h-4 w-4 text-[#171717]" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/20 active:scale-95 text-center"
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
