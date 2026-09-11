const REAL_TESTIMONIALS = [
  {
    quote:
      "Nourou a immédiatement saisi les enjeux de notre établissement. La refonte de notre site web et du catalogue interactif a fluidifié la prise de rendez-vous pour nos patients et modernisé l'image de notre clinique. Les délais ont été respectés au jour près.",
    author: "Dr. Marc Dossou",
    role: "Directeur Médical",
    company: "Clinique Santé Plus",
    project: "Refonte Vitrine & Portail Patients",
    year: "2026",
    impact: "+45% de demandes directes",
  },
  {
    quote:
      "Nourou a su traduire notre exigence en une identité visuelle claire, élégante et immédiatement compréhensible. Le site inspire une confiance instantanée auprès de nos acquéreurs et nos mandats sont enfin valorisés à leur juste niveau.",
    author: "Marc de B.",
    role: "Directeur Associé",
    company: "Asteria Properties",
    project: "Plateforme Immobilière Haut de Gamme",
    year: "2025",
    impact: "+140% de visites qualifiées",
  },
  {
    quote:
      "Le plus appréciable avec Nourou, c'est la rigueur technique et la vision business. Chaque choix typographique, chaque interaction a été pensé pour convertir. Nous avons rentabilisé l'investissement dès les premières semaines.",
    author: "Samuel K.",
    role: "Fondateur & Dirigeant",
    company: "Northlane Studio",
    project: "Application Web & Identité Digitale",
    year: "2025",
    impact: "Temps de chargement < 0.8s",
  },
];

export default function Testimonials() {
  return (
    <section id="avis" className="relative w-full bg-[#F6F4EF] py-20 sm:py-28 lg:py-32 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#C9C4B8]">
          <div>
            <p className="text-xs font-mono text-[#1B1D22]/60">
              07 · Témoignages d&apos;artisan &amp; Retours de commanditaires
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1B1D22] max-w-[660px]">
              La confiance ne se décrète pas. Elle se mesure aux résultats réels.
            </h2>
          </div>
          <p className="max-w-[380px] text-sm text-[#1B1D22]/70 leading-relaxed font-sans">
            Retours authentiques de dirigeants et fondateurs qui ont choisi une collaboration directe et sur mesure pour leur présence en ligne.
          </p>
        </div>

        {/* Témoignage vedette (Grand format éditorial / Monographie) */}
        <div className="mt-12 border border-[#C9C4B8] bg-white p-8 sm:p-12 lg:p-16">
          <div className="text-xs font-mono text-[#3D5AFE] mb-6 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE]" />
            <span>Étude de cas Santé &amp; Prise de rendez-vous · Cotonou</span>
          </div>

          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug text-[#1B1D22] tracking-tight">
            &ldquo;{REAL_TESTIMONIALS[0].quote}&rdquo;
          </blockquote>

          <div className="mt-10 pt-8 border-t border-[#C9C4B8] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="font-serif text-xl font-normal text-[#1B1D22]">
                {REAL_TESTIMONIALS[0].author}
              </p>
              <p className="text-xs sm:text-sm text-[#1B1D22]/60 font-sans mt-0.5">
                {REAL_TESTIMONIALS[0].role} · <span className="text-[#1B1D22] font-medium">{REAL_TESTIMONIALS[0].company}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs">
              <span className="border border-[#C9C4B8] bg-[#F6F4EF] px-3.5 py-1.5 text-[#1B1D22]">
                {REAL_TESTIMONIALS[0].impact}
              </span>
              <span className="text-[#1B1D22]/40">
                {REAL_TESTIMONIALS[0].year}
              </span>
            </div>
          </div>
        </div>

        {/* 2 Témoignages secondaires en grille */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {REAL_TESTIMONIALS.slice(1).map((t) => (
            <div
              key={t.author}
              className="flex flex-col justify-between border border-[#C9C4B8] bg-white p-8 sm:p-10"
            >
              <div>
                <span className="text-xs font-mono text-[#1B1D22]/50 block mb-4">
                  {t.project} · {t.year}
                </span>
                <blockquote className="font-serif text-lg sm:text-xl font-normal leading-relaxed text-[#1B1D22]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-[#C9C4B8] flex items-center justify-between">
                <div>
                  <p className="font-serif text-base font-normal text-[#1B1D22]">
                    {t.author}
                  </p>
                  <p className="text-xs text-[#1B1D22]/60 font-sans">
                    {t.role} · <span className="text-[#1B1D22] font-medium">{t.company}</span>
                  </p>
                </div>
                <span className="text-xs font-mono text-[#3D5AFE]">
                  {t.impact}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
