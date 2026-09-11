"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  RotateCcw,
  Search,
  X,
} from "lucide-react";
import type { ProjectItem } from "@/lib/projectsData";

interface ProjectsExplorerProps {
  projects: ProjectItem[];
}

export default function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<Record<string, number>>({});

  // Récupérer toutes les catégories uniques
  const categories = useMemo(() => {
    const list = Array.from(new Set(projects.map((p) => p.category)));
    return ["Tous", ...list];
  }, [projects]);

  // Récupérer les technologies les plus populaires
  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => {
      p.tools.forEach((t) => techSet.add(t));
    });
    return Array.from(techSet);
  }, [projects]);

  // Calcul des compteurs par catégorie
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Tous: projects.length };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  // Filtrage combiné : Recherche texte + Catégorie + Technologie
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Filtre catégorie
      if (selectedCategory !== "Tous" && project.category !== selectedCategory) {
        return false;
      }

      // Filtre techno
      if (selectedTech && !project.tools.includes(selectedTech)) {
        return false;
      }

      // Filtre texte
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = project.title.toLowerCase().includes(query);
        const matchDesc = project.desc.toLowerCase().includes(query);
        const matchClient = project.client.toLowerCase().includes(query);
        const matchCategory = project.category.toLowerCase().includes(query);
        const matchTools = project.tools.some((t) => t.toLowerCase().includes(query));
        const matchTags = project.tags.some((t) => t.toLowerCase().includes(query));

        if (
          !matchTitle &&
          !matchDesc &&
          !matchClient &&
          !matchCategory &&
          !matchTools &&
          !matchTags
        ) {
          return false;
        }
      }

      return true;
    });
  }, [projects, selectedCategory, selectedTech, searchQuery]);

  const handleNextSlide = (slug: string, total: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSlideIndex((prev) => ({
      ...prev,
      [slug]: ((prev[slug] || 0) + 1) % total,
    }));
  };

  const handlePrevSlide = (slug: string, total: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveSlideIndex((prev) => ({
      ...prev,
      [slug]: ((prev[slug] || 0) - 1 + total) % total,
    }));
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Tous");
    setSelectedTech(null);
  };

  return (
    <div className="w-full">
      {/* Barre de recherche et contrôles interactifs */}
      <div className="mx-auto max-w-[1280px] space-y-6">
        {/* Champ de recherche direct avec icône & reset */}
        <div className="relative mx-auto max-w-2xl">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-[#0060c3]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Un projet, une techno (Next.js, WordPress, Figma…)"
              className="w-full rounded-2xl border border-[#171717]/12 bg-[#f8f9fa] py-3.5 pl-12 pr-11 text-sm font-medium text-[#171717] shadow-sm transition-all placeholder:text-[#4b4b4b]/70 focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0060c3]/10"
              aria-label="Rechercher dans les projets"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#171717]/8 text-[#171717] hover:bg-[#171717]/15 transition-colors"
                aria-label="Effacer la recherche"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Onglets des catégories avec compteurs réels */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[#0060c3] text-white shadow-md shadow-[#0060c3]/25 scale-[1.02]"
                    : "bg-[#f4f6f8] text-[#171717] border border-[#171717]/8 hover:bg-[#e9edf2] hover:border-[#171717]/15"
                }`}
              >
                <span>{cat === "Tous" ? "Tous les projets" : cat}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#171717]/8 text-[#171717]/80"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Nuage de technologies (Tech Stack Filter) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          <span className="text-xs font-semibold text-[#4b4b4b] mr-1 hidden sm:inline">
            Technos :
          </span>
          {allTechs.map((tech) => {
            const isTechActive = selectedTech === tech;
            return (
              <button
                key={tech}
                type="button"
                onClick={() => setSelectedTech(isTechActive ? null : tech)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  isTechActive
                    ? "bg-[#171717] text-white shadow-sm"
                    : "bg-[#f8f9fa] border border-[#171717]/10 text-[#4b4b4b] hover:border-[#0060c3]/50 hover:text-[#0060c3]"
                }`}
              >
                {tech}
                {isTechActive && " ✕"}
              </button>
            );
          })}
          {(selectedTech || searchQuery || selectedCategory !== "Tous") && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-[#0060c3] hover:underline ml-1"
            >
              <RotateCcw className="h-3 w-3" />
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Résumé du nombre de résultats */}
      <div className="mx-auto mt-8 flex max-w-[1280px] items-center justify-between border-b border-[#171717]/8 pb-4 text-xs font-semibold text-[#4b4b4b]">
        <span>
          Affichage de{" "}
          <strong className="text-[#171717] font-black">
            {filteredProjects.length}
          </strong>{" "}
          projet{filteredProjects.length > 1 ? "s" : ""}
          {selectedCategory !== "Tous" && (
            <span> dans « {selectedCategory} »</span>
          )}
          {selectedTech && <span> avec « {selectedTech} »</span>}
        </span>

        {(selectedCategory !== "Tous" || selectedTech || searchQuery) && (
          <button
            type="button"
            onClick={resetFilters}
            className="text-[#0060c3] hover:underline"
          >
            Afficher tout
          </button>
        )}
      </div>

      {/* Grille des cartes de projets */}
      <div className="mx-auto mt-8 max-w-[1280px]">
        {filteredProjects.length === 0 ? (
          /* État vide soigné */
          <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[#171717]/15 bg-[#fbfcfd] p-12 text-center sm:p-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0060c3]/10 text-[#0060c3]">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="mt-4 text-xl font-black text-[#171717]">
              Aucun projet trouvé
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#4b4b4b]">
              Aucune réalisation ne correspond à vos critères actuels. Essayez de
              réinitialiser vos filtres ou de modifier votre recherche.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0060c3] px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#0050a5]"
            >
              <RotateCcw className="h-4 w-4" />
              Réinitialiser tous les filtres
            </button>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => {
              const screenshots =
                project.screenshots && project.screenshots.length > 0
                  ? project.screenshots
                  : [project.image];
              const currentIndex = activeSlideIndex[project.slug] || 0;
              const currentImage = screenshots[currentIndex];
              const totalSlides = screenshots.length;

              return (
                <article
                  key={project.slug}
                  className="group flex flex-col overflow-hidden rounded-[1.8rem] border border-[#171717]/10 bg-white shadow-[0_10px_30px_rgba(21,20,27,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0060c3]/30 hover:shadow-[0_20px_45px_rgba(0,96,195,0.08)]"
                >
                  {/* Zone Visuelle & Carrousel */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#dfe7ed]">
                    {/* Badge Catégorie */}
                    <div className="absolute left-3.5 top-3.5 z-10">
                      <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#171717] shadow-sm backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Badge Année */}
                    <div className="absolute right-3.5 top-3.5 z-10">
                      <span className="rounded-full bg-[#171717]/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                        {project.year}
                      </span>
                    </div>

                    {/* Image principale */}
                    <Link
                      href={`/realisations/${project.slug}`}
                      className="relative block h-full w-full"
                    >
                      <Image
                        src={currentImage}
                        alt={`Aperçu du projet ${project.title}`}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </Link>

                    {/* Flèches du carrousel si multi-photos */}
                    {totalSlides > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => handlePrevSlide(project.slug, totalSlides, e)}
                          className="absolute left-2.5 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
                          aria-label="Photo précédente"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleNextSlide(project.slug, totalSlides, e)}
                          className="absolute right-2.5 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
                          aria-label="Photo suivante"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>

                        {/* Points de pagination (Dots) */}
                        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                          {screenshots.map((_, idx) => (
                            <span
                              key={idx}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                currentIndex === idx
                                  ? "w-5 bg-white shadow-sm"
                                  : "w-1.5 bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Contenu de la carte */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#4b4b4b]">
                        {project.client}
                      </span>
                      <span className="text-xs font-medium text-[#4b4b4b]/80">
                        {project.duration}
                      </span>
                    </div>

                    <Link href={`/realisations/${project.slug}`} className="mt-1.5 block">
                      <h3 className="text-xl font-black tracking-[-0.04em] text-[#171717] transition-colors group-hover:text-[#0060c3] sm:text-2xl">
                        {project.title}
                      </h3>
                    </Link>

                    {/* Impact chiffré */}
                    <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0060c3]">
                      <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>{project.impact}</span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-[#4b4b4b] line-clamp-2">
                      {project.desc}
                    </p>

                    {/* Technologies utilisées (chips) */}
                    <div className="mt-5 flex flex-wrap gap-1.5 pt-4 border-t border-[#171717]/8">
                      {project.tools.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md border border-[#171717]/8 bg-[#f4f6f8] px-2 py-0.5 text-[11px] font-semibold text-[#171717]/75"
                        >
                          {tool}
                        </span>
                      ))}
                      {project.tools.length > 4 && (
                        <span className="rounded-md border border-[#171717]/8 bg-[#f4f6f8] px-2 py-0.5 text-[11px] font-semibold text-[#171717]/50">
                          +{project.tools.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Double bouton d'action inspiré de Carlos Djanato */}
                    <div className="mt-6 flex items-center gap-2 pt-2">
                      {/* Bouton 1 : Voir les détails (Étude de cas) */}
                      <Link
                        href={`/realisations/${project.slug}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0060c3] px-3.5 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#0050a5] hover:shadow-md"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Voir les détails</span>
                      </Link>

                      {/* Bouton 2 : Voir le site en direct (si preview_url disponible) */}
                      {project.preview_url ? (
                        <a
                          href={project.preview_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#171717]/12 bg-white px-3.5 py-2.5 text-xs font-bold text-[#171717] transition-all hover:border-[#0060c3] hover:text-[#0060c3] hover:bg-[#f5f9ff]"
                          title="Visiter le site en ligne dans un nouvel onglet"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Voir le site</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
