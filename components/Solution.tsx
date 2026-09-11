import Link from "next/link";

const PILLARS = [
  {
    num: "01",
    title: "Direction artistique & UX",
    desc: "Création d'une identité graphique exclusive, lisible et harmonieuse. Chaque couleur, marge et police est choisie pour sublimer votre offre.",
  },
  {
    num: "02",
    title: "Ingénierie & performance",
    desc: "Développé avec Next.js 14, TypeScript et TailwindCSS. Temps de chargement ultrarapide sous 1 seconde, zéro lenteur, consommation minimale de bande passante.",
  },
  {
    num: "03",
    title: "Référencement naturel & SEO",
    desc: "Balisage Schema.org, sitemap automatisé, balises OpenGraph et structure sémantique pour séduire à la fois les moteurs et vos futurs clients.",
  },
  {
    num: "04",
    title: "Espace client & autonomie",
    desc: "Accès à votre espace privé pour suivre l'avancement en temps réel, échanger des messages et récupérer vos livrables. Vous êtes 100% propriétaire de vos fichiers.",
  },
];

export default function Solution() {
  return (
    <section id="solution" className="relative w-full bg-[#F6F4EF] py-20 sm:py-28 lg:py-32 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          
          {/* Côté gauche : Note d'engagement */}
          <div>
            <span className="text-xs font-mono text-[#4B4D54]">
              02 / Engagement de qualité
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1B1D22]">
              Chaque détail est pensé pour durer, sans compromis.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#4B4D54] font-light">
              Contrairement aux agences traditionnelles aux délais étirés ou aux bricolages d&apos;extensions instables, je vous livre un outil numérique net, rapide et autonome.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm font-normal text-[#1B1D22]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                <span>Interlocuteur unique et direct du début à la fin</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-normal text-[#1B1D22]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                <span>Délais de livraison fermes et respectés</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-normal text-[#1B1D22]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                <span>Transmission claire pour la prise en main</span>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#1B1D22] px-6 py-2.5 text-xs font-medium text-[#F6F4EF] shadow-xs hover:bg-[#3D5AFE] transition-all"
              >
                <span>Démarrer un projet</span>
              </Link>
            </div>
          </div>

          {/* Côté droit : Les 4 piliers d'excellence */}
          <div className="grid gap-4 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="flex flex-col justify-between rounded-2xl border border-[#C9C4B8] bg-white p-6 shadow-2xs hover:border-[#1B1D22]/40 transition-colors"
              >
                <div>
                  <span className="font-mono text-xs text-[#4B4D54]">
                    {pillar.num}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-medium text-[#1B1D22]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#4B4D54] font-light">
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