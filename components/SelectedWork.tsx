import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, ExternalLink, FolderKanban, Sparkles, Star } from "lucide-react";
import { allProjects } from "@/lib/projectsData";

export default function SelectedWork() {
  // Sélection des 3 projets majeurs
  const featured = allProjects.slice(0, 3);

  return (
    <section id="projets" className="scroll-mt-[5.5rem] bg-[#fbfcfd] border-y border-[#171717]/8 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-[1280px]">
        {/* En-tête éditorial de la vitrine */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-10 border-b border-[#171717]/10">
          <div className="max-w-[620px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
              <FolderKanban className="h-3.5 w-3.5 text-[#0060c3]" />
              Projets sélectionnés
            </span>
            <h2 className="mt-4 font-black tracking-[-0.06em] text-[#0e1217] text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.06]">
              Des créations sur-mesure.{" "}
              <span className="block text-[#0060c3] italic font-serif">Des résultats prouvés.</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#52525b]">
              Chaque réalisation démontre une alliance exacte entre identité de marque singulière, vitesse d’affichage et conversion commerciale.
            </p>
            <Link
              href="/realisations"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#171717]/15 bg-white px-5 py-3 text-xs font-bold text-[#171717] transition-all hover:bg-[#f4f6f8] hover:border-[#171717]/30"
            >
              <span>Tout voir ({allProjects.length})</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#0060c3]" />
            </Link>
          </div>
        </div>

        {/* Grille des 3 réalisations majeures */}
        <div className="mt-12 space-y-12 sm:space-y-16">
          {featured.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={project.slug}
                className="group relative overflow-hidden rounded-[2.5rem] border border-[#171717]/10 bg-white p-6 sm:p-8 lg:p-10 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#0060c3]/30"
              >
                <div className={`grid gap-8 lg:grid-cols-12 lg:items-center ${isReversed ? "lg:grid-flow-dense" : ""}`}>
                  
                  {/* Colonne visuelle du projet (7 colonnes) */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:col-start-6" : ""}`}>
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#171717]/10 bg-[#f4f6f8]">
                      {/* Barre de fenêtre style navigateur pour ancrer le réalisme */}
                      <div className="flex items-center justify-between border-b border-[#171717]/10 bg-white/90 px-4 py-2.5 backdrop-blur-sm">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                        </div>
                        <span className="text-[11px] font-mono text-[#71717a] truncate max-w-[200px]">
                          https://{project.slug}.com
                        </span>
                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      </div>

                      <Image
                        src={project.image}
                        alt={`Aperçu du projet ${project.title} réalisé par Nourou Dine`}
                        fill
                        sizes="(min-width: 1024px) 680px, 100vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />

                      {/* Badge d'impact posé sur l'image */}
                      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 rounded-xl border border-white/20 bg-black/75 px-3.5 py-1.5 backdrop-blur-md">
                        <span className="text-xs font-bold text-white">
                          ⚡ {project.impact}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Colonne narrative & métriques (5 colonnes) */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:col-start-1" : ""}`}>
                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-[#71717a]">
                      <span>{project.category}</span>
                      <span>·</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-[#0e1217]">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#52525b]">
                      {project.desc}
                    </p>

                    {/* Métriques d'impact business */}
                    <div className="mt-6 grid grid-cols-2 gap-3 border-y border-[#171717]/8 py-4">
                      {project.results.slice(0, 2).map((res, i) => (
                        <div key={i}>
                          <span className="block text-xl font-black text-[#0060c3]">
                            {res.metric}
                          </span>
                          <span className="block text-[11px] font-medium text-[#71717a] mt-0.5">
                            {res.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tags technologiques */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-[#171717]/8 bg-[#f4f6f8] px-2.5 py-1 text-[11px] font-bold text-[#171717]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Témoignage client réel */}
                    {project.testimonial && (
                      <blockquote className="mt-6 border-l-2 border-[#0060c3] pl-3.5 text-xs italic text-[#52525b]">
                        « {project.testimonial.quote} »
                        <footer className="mt-1 font-bold not-italic text-[#171717]">
                          — {project.testimonial.author}, {project.testimonial.role}
                        </footer>
                      </blockquote>
                    )}

                    {/* Lien d'exploration */}
                    <div className="mt-7 flex items-center gap-4">
                      <Link
                        href={`/realisations/${project.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#0e1217] px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#0060c3]"
                      >
                        <span>Étude de cas détaillée</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>

                      {project.preview_url && (
                        <a
                          href={project.preview_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#71717a] hover:text-[#0060c3] transition-colors"
                        >
                          <span>Visiter le site</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* Bannière de réassurance sous les projets */}
        <div className="mt-14 rounded-2xl border border-[#171717]/10 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-[#0e1217]">
              Vous avez un projet spécifique en tête ?
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-[#71717a]">
              Chaque architecture est pensée sur-mesure selon vos objectifs de vente et votre audience.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0060c3] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#0050a5] transition-all"
          >
            <span>Demander une étude de faisabilité</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
