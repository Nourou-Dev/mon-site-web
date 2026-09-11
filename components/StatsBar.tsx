import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { allProjects } from "@/lib/projectsData";

export default function StatsBar() {
  const featuredProjects = allProjects.slice(0, 4);

  return (
    <section id="realisations" className="relative w-full bg-[#fbf9f5] py-20 sm:py-28 lg:py-32 border-b border-[#171717]/8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#171717]/10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              [ 03 / ÉTUDES DE CAS &amp; RÉALISATIONS ]
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#171717] max-w-[640px]">
              Des réalisations pensées pour marquer les esprits et convaincre.
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="max-w-[360px] text-sm text-[#4b5563] leading-relaxed md:text-right">
              Chaque réalisation est pensée sur mesure pour inspirer confiance et répondre à des objectifs commerciaux précis.
            </p>
            <Link
              href="/realisations"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#171717] hover:text-[#0052a3] transition-colors"
            >
              <span>Voir tout le portfolio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Grille des projets façon monographie */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/realisations/${project.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[#171717]/10 bg-white p-5 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image d'aperçu */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#ebe7de]">
                <Image
                  src={project.image}
                  alt={`Aperçu du projet ${project.title}`}
                  fill
                  sizes="(min-width: 1024px) 600px, (min-width: 640px) 500px, 350px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="rounded-full border border-black/10 bg-white/95 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#171717] shadow-sm backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#171717] shadow-md transition-transform duration-300 group-hover:bg-[#171717] group-hover:text-white group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>

              {/* Fiche descriptive sous l'image */}
              <div className="mt-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#6b7280]">
                    <span>0{index + 1} / {project.client}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-[#171717] group-hover:text-[#0052a3] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#4b5563] leading-relaxed line-clamp-2">
                    {project.desc}
                  </p>
                </div>

                {/* Métrique d'impact concrète */}
                <div className="mt-5 pt-4 border-t border-[#171717]/8 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    {project.impact}
                  </span>
                  <span className="text-xs font-semibold text-[#171717] group-hover:underline">
                    Lire l&apos;étude →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
