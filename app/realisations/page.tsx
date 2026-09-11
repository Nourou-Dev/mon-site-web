import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ChevronRight, FolderKanban } from "lucide-react";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { allProjects } from "@/lib/projectsData";

export const metadata: Metadata = {
  title: "Réalisations & Portfolio — Nourou Dine AMANDOU",
  description:
    "Explorez notre portfolio de sites vitrines, e-commerce et applications web sur mesure. Des résultats concrets pour nos clients.",
};

export default function RealisationsPage() {
  return (
    <>
      <Navbar />
      <main id="contenu" className="pt-[5.5rem] bg-white">
        {/* Fil d'Ariane sémantique */}
        <nav
          aria-label="Fil d'Ariane"
          className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 lg:px-8"
        >
          <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#4b4b4b]">
            <li>
              <Link href="/" className="transition-colors hover:text-[#0060c3]">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-[#171717]/30" />
            </li>
            <li aria-current="page" className="font-semibold text-[#171717]">
              Réalisations & Portfolio
            </li>
          </ol>
        </nav>

        {/* En-tête de la page Réalisations */}
        <header className="relative overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,96,195,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.03),transparent_20%)]" />

          <div className="relative mx-auto max-w-[1240px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
              <FolderKanban className="h-3.5 w-3.5 text-[#0060c3]" />
              Portfolio &amp; Réalisations
            </span>

            <h1 className="mx-auto mt-6 max-w-[850px] font-black tracking-[-0.07em] text-[#171717] text-3xl sm:text-4xl lg:text-5xl lg:leading-[1.12]">
              Des projets pensés pour marquer les esprits et convertir
            </h1>

            <p className="mx-auto mt-6 max-w-[620px] text-base leading-relaxed text-[#4b4b4b] sm:text-lg">
              Découvrez une sélection de réalisations récentes conçues pour aider des entreprises exigeantes à consolider leur crédibilité et multiplier leurs résultats.
            </p>
          </div>
        </header>

        {/* Grille complète des réalisations - Toutes cliquables */}
        <section aria-labelledby="titre-tous-projets" className="bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-8 flex items-center justify-between">
              <h2 id="titre-tous-projets" className="text-2xl font-black tracking-[-0.05em] text-[#171717] sm:text-3xl">
                Toutes les études de cas
              </h2>
              <span className="text-xs font-semibold text-[#4b4b4b]">
                {allProjects.length} projets récents
              </span>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {allProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/realisations/${project.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[2rem] border border-[#171717]/10 bg-white shadow-[0_15px_35px_rgba(21,20,27,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(21,20,27,0.1)]"
                >
                  <article className="flex flex-1 flex-col">
                    <div className="relative h-64 w-full overflow-hidden bg-[#dfe7ed] sm:h-72">
                      <div className="absolute left-4 top-4 z-10 flex gap-2">
                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#171717] shadow-sm backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>

                      <span className="absolute right-4 top-4 z-10 rounded-full bg-[#171717]/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                        {project.year}
                      </span>

                      <Image
                        src={project.image}
                        alt={`Aperçu du projet ${project.title}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      <div className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#0060c3] text-white shadow-lg transition-transform duration-300 group-hover:rotate-[-10deg]">
                        <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black tracking-[-0.05em] text-[#171717] group-hover:text-[#0060c3] transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#0060c3]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>{project.impact}</span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-[#4b4b4b] line-clamp-3">
                        {project.desc}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[#171717]/8">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[#f8f9fa] border border-[#171717]/6 px-3 py-1 text-[11px] font-semibold text-[#171717]/75"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between pt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0060c3]">
                        <span>Découvrir l&apos;étude de cas</span>
                        <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <Testimonials />

        {/* Newsletter lead capture */}
        <Newsletter />

        {/* CTA final */}
        <FinalCTA />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
