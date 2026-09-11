import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FolderKanban } from "lucide-react";

import { allProjects } from "@/lib/projectsData";

export default function StatsBar() {
  const featuredProjects = allProjects.slice(0, 4);

  return (
    <section id="realisations" className="scroll-mt-[5.5rem] bg-[#ffffff] px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-white/20 bg-[#0054ab] p-5 text-white shadow-2xl sm:p-8 lg:p-10">
        <div className="mb-8 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
            <FolderKanban className="h-3.5 w-3.5 text-[#0060c3]" />
            Mes réalisations
          </span>
          <Link
            href="/realisations"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#0060c3] shadow-sm transition-all hover:bg-[#f5f9ff] hover:-translate-y-0.5"
          >
            Voir tous les projets
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[420px] font-black tracking-[-0.07em] text-white">
            Des projets pensés pour marquer les esprits
          </h2>

          <p className="max-w-[360px] text-[0.95rem] leading-relaxed text-white/95 sm:text-[1.05rem]">
            Un travail sérieux, clair et premium, pensé pour donner de la crédibilité à votre activité.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/realisations/${project.slug}`}
              className="group block"
            >
              <div className="relative h-64 overflow-hidden rounded-[1.8rem] bg-[#dfe7ed] shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:-translate-y-1">
                <div className="absolute left-4 top-4 z-10 flex gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 text-[0.65rem] font-bold text-[#171717] shadow-sm">
                    {project.category}
                  </span>
                </div>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0060c3] text-white shadow-lg transition-transform duration-300 group-hover:rotate-[-10deg]">
                  <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-1 pt-4">
                <h3 className="font-black leading-none tracking-[-0.05em] text-white group-hover:text-white/90">
                  {project.title}
                </h3>
                <span className="text-xs text-white/90 font-medium">
                  {project.year}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bouton visible uniquement sur mobile en bas des cartes */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/realisations"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#0060c3] shadow-md transition-transform active:scale-95 text-center"
          >
            Voir tous les projets
            <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    </section>
  );
}
