import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const PILLARS = [
  {
    num: "01",
    title: "Direction Artistique & UX",
    desc: "Création d'une identité graphique exclusive, lisible et harmonieuse. Chaque couleur, marge et police est choisie pour sublimer votre offre.",
  },
  {
    num: "02",
    title: "Ingénierie & Performance",
    desc: "Développé avec Next.js 14, TypeScript et TailwindCSS. Temps de chargement ultrarapide sous 1 seconde, zéro lenteur, consommation minimale de bande passante.",
  },
  {
    num: "03",
    title: "Référencement Naturel & SEO",
    desc: "Balisage Schema.org, sitemap automatisé, balises OpenGraph et structure sémantique parfaite pour séduire à la fois Google et vos futurs clients.",
  },
  {
    num: "04",
    title: "Espace Client & Autonomie",
    desc: "Accès à votre espace privé pour suivre l'avancement en temps réel, échanger des messages et récupérer vos livrables. Vous êtes 100% propriétaire de vos fichiers.",
  },
];

export default function Solution() {
  return (
    <section id="solution" className="relative w-full bg-[#fbf9f5] py-20 sm:py-28 lg:py-32 border-b border-[#171717]/8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          
          {/* Côté gauche : Note d'engagement */}
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              [ 02 / ENGAGEMENT QUALITÉ ]
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#171717]">
              Chaque détail est pensé pour durer, sans compromis.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#4b5563]">
              Contrairement aux agences traditionnelles aux délais interminables ou aux freelances qui empilent des extensions WordPress instables, je vous livre un produit fini propre, robuste et totalement indépendant.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#171717]">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Interlocuteur unique et direct du début à la fin</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#171717]">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Délais de livraison fermes et respectés</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[#171717]">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Formation vidéo personnalisée pour la prise en main</span>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#2b2b2b] transition-all"
              >
                <span>Démarrer un projet ensemble</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Côté droit : Les 4 piliers d'excellence */}
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="flex flex-col justify-between rounded-2xl border border-[#171717]/8 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#6b7280]">
                    [ {pillar.num} ]
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-[#171717]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#4b5563]">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}