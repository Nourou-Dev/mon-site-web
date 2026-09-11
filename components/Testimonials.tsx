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
    <section id="avis" className="relative w-full bg-[#fbf9f5] py-20 sm:py-28 lg:py-32 border-b border-[#171717]/8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#171717]/10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              [ 07 / TÉMOIGNAGES &amp; RETOURS D&apos;EXPÉRIENCE ]
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#171717] max-w-[640px]">
              La confiance ne se décrète pas. Elle se mesure aux résultats.
            </h2>
          </div>
          <p className="max-w-[360px] text-sm text-[#4b5563] leading-relaxed">
            Retours authentiques de dirigeants et professionnels qui ont choisi une approche sur mesure pour leur présence en ligne.
          </p>
        </div>

        {/* Témoignage vedette (Grand format éditorial) */}
        <div className="mt-12 rounded-3xl border border-[#171717]/10 bg-white p-8 sm:p-12 lg:p-14 shadow-sm">
          <div className="flex items-center gap-1 text-amber-500 mb-6" aria-label="Note de 5 sur 5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-medium leading-snug text-[#171717] tracking-tight">
            &ldquo;{REAL_TESTIMONIALS[0].quote}&rdquo;
          </blockquote>

          <div className="mt-8 pt-6 border-t border-[#171717]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-display text-lg font-bold text-[#171717]">
                {REAL_TESTIMONIALS[0].author}
              </p>
              <p className="text-xs sm:text-sm text-[#6b7280]">
                {REAL_TESTIMONIALS[0].role} · <span className="font-semibold text-[#171717]">{REAL_TESTIMONIALS[0].company}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="rounded-full bg-emerald-50 border border-emerald-500/20 px-3 py-1 font-bold text-emerald-700">
                {REAL_TESTIMONIALS[0].impact}
              </span>
              <span className="text-[#9ca3af]">
                [ {REAL_TESTIMONIALS[0].year} ]
              </span>
            </div>
          </div>
        </div>

        {/* 2 Témoignages secondaires en grille */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {REAL_TESTIMONIALS.slice(1).map((t) => (
            <div
              key={t.author}
              className="flex flex-col justify-between rounded-3xl border border-[#171717]/8 bg-white/70 p-7 sm:p-8 backdrop-blur-sm shadow-sm"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4" aria-label="Note de 5 sur 5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-[#374151] italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#171717]/8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-[#171717]">{t.author}</p>
                  <p className="text-xs text-[#6b7280]">{t.role}, {t.company}</p>
                </div>
                <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-500/20">
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
