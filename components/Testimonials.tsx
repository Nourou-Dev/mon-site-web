import { Quote, Star } from "lucide-react";

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
            <span className="text-xs font-mono text-[#4B4D54]">
              07 / Retours d&apos;expérience &amp; témoignages
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1B1D22] max-w-[640px]">
              La confiance ne se décrète pas. Elle se mesure aux résultats.
            </h2>
          </div>
          <p className="max-w-[360px] text-sm text-[#4B4D54] leading-relaxed font-light">
            Retours authentiques de dirigeants et professionnels qui ont choisi une approche sur mesure pour leur présence en ligne.
          </p>
        </div>

        {/* Témoignage vedette (Grand format éditorial) */}
        <div className="mt-12 rounded-2xl border border-[#C9C4B8] bg-white p-8 sm:p-12 lg:p-14 shadow-2xs">
          <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-light leading-snug text-[#1B1D22] tracking-tight">
            &ldquo;{REAL_TESTIMONIALS[0].quote}&rdquo;
          </blockquote>

          <div className="mt-8 pt-6 border-t border-[#C9C4B8]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-display text-lg font-medium text-[#1B1D22]">
                {REAL_TESTIMONIALS[0].author}
              </p>
              <p className="text-xs sm:text-sm text-[#4B4D54]">
                {REAL_TESTIMONIALS[0].role} · <span className="font-medium text-[#1B1D22]">{REAL_TESTIMONIALS[0].company}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="rounded-full bg-[#F6F4EF] border border-[#C9C4B8] px-3 py-1 font-mono text-xs text-[#1B1D22]">
                {REAL_TESTIMONIALS[0].impact}
              </span>
              <span className="text-[#4B4D54]">
                {REAL_TESTIMONIALS[0].year}
              </span>
            </div>
          </div>
        </div>

        {/* 2 Témoignages secondaires en grille */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {REAL_TESTIMONIALS.slice(1).map((t) => (
            <div
              key={t.author}
              className="flex flex-col justify-between rounded-2xl border border-[#C9C4B8] bg-white p-7 sm:p-8 shadow-2xs"
            >
              <div>
                <blockquote className="text-sm sm:text-base leading-relaxed text-[#4B4D54] font-light">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-5 border-t border-[#C9C4B8]/40 flex items-center justify-between">
                <div>
                  <p className="font-display text-base font-medium text-[#1B1D22]">
                    {t.author}
                  </p>
                  <p className="text-xs text-[#4B4D54]">
                    {t.role} · <span className="font-medium text-[#1B1D22]">{t.company}</span>
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
