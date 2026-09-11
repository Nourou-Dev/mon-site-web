import Link from "next/link";

const PROCESS_STEPS = [
  {
    step: "01",
    phase: "Étape 1",
    title: "Immersion & Cadrage Stratégique",
    desc: "Nous analysons votre marché, vos concurrents et vos objectifs commerciaux. Nous définissons l'arborescence exacte et les messages clés pour que votre proposition de valeur soit limpide dès la première visite.",
    duration: "Semaine 1",
  },
  {
    step: "02",
    phase: "Étape 2",
    title: "Direction Artistique & Prototypage",
    desc: "Conception sur mesure des maquettes UI/UX sur Figma. Vous testez et validez le design interactif de chaque page (ordinateur et smartphone) avant toute ligne de code.",
    duration: "Semaine 2",
  },
  {
    step: "03",
    phase: "Étape 3",
    title: "Développement Next.js & Intégration",
    desc: "Développement haute performance en Next.js 14, TypeScript et Tailwind CSS. Code propriétaire, animations fluides, sécurité renforcée et score Google PageSpeed 99+ garanti.",
    duration: "Semaines 3-4",
  },
  {
    step: "04",
    phase: "Étape 4",
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
            <p className="text-xs font-mono text-[#1B1D22]/60">
              08 · Méthodologie d&apos;atelier &amp; Suivi en direct
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1B1D22] max-w-[660px]">
              Une méthode rigoureuse, en relation directe d&apos;artisan à commanditaire.
            </h2>
          </div>
          <p className="max-w-[400px] text-sm text-[#1B1D22]/70 leading-relaxed font-sans">
            De la première conversation jusqu&apos;à la mise en ligne, vous suivez chaque étape en toute transparence via votre espace client dédié, sans intermédiaire ni ticket anonyme.
          </p>
        </div>

        {/* Grille des 4 étapes */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.step}
              className="flex flex-col justify-between border border-[#C9C4B8] bg-white p-7 transition-colors hover:border-[#1B1D22]"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#C9C4B8] font-mono text-xs">
                  <span className="text-[#1B1D22] font-bold">{step.step}</span>
                  <span className="text-[#1B1D22]/50">{step.duration}</span>
                </div>

                <span className="mt-4 inline-block text-xs font-mono text-[#3D5AFE]">
                  {step.phase}
                </span>

                <h3 className="mt-2 font-serif text-lg font-normal text-[#1B1D22] leading-snug">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-[#1B1D22]/70 font-sans">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#C9C4B8] flex items-center gap-2 text-xs font-mono text-[#1B1D22]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
                <span>Validation d&apos;étape</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bannière mise en avant Espace Client */}
        <div className="mt-12 border border-[#C9C4B8] bg-[#1B1D22] p-8 sm:p-12 text-[#F6F4EF]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="text-xs font-mono text-[#3D5AFE]">
                Inclus avec chaque projet d&apos;atelier
              </span>
              <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-normal text-[#F6F4EF] tracking-tight">
                Votre Espace Client Privé &amp; Sécurisé
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80 max-w-[560px] font-sans">
                Accédez 24h/24 à votre portail dédié pour suivre l&apos;avancement de chaque jalon en direct, échanger sans délai, consulter vos maquettes Figma et récupérer l&apos;intégralité de vos codes sources.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch lg:items-center justify-end gap-3.5">
              <Link
                href="/app"
                className="inline-flex min-h-[48px] items-center justify-center bg-[#F6F4EF] px-7 py-3 text-xs font-mono text-[#1B1D22] hover:bg-[#3D5AFE] hover:text-white transition-colors text-center"
              >
                Aperçu Espace Client
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[48px] items-center justify-center border border-white/20 bg-white/5 px-7 py-3 text-xs font-mono text-white hover:bg-white/10 transition-colors text-center"
              >
                Lancer votre projet
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
