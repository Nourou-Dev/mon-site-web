import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  Sparkles,
  Wrench,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { allProjects, getProjectBySlug } from "@/lib/projectsData";

interface ProjectPageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Projet introuvable — Nourou Dine AMANDOU",
    };
  }

  return {
    title: `${project.title} — Étude de cas | Nourou Dine AMANDOU`,
    description: project.desc,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Trouve les projets précédent et suivant pour la navigation
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <>
      <Navbar />

      <main id="contenu" className="pt-[5.5rem] bg-white">
        {/* Fil d'Ariane sémantique */}
        <nav
          aria-label="Fil d'Ariane"
          className="mx-auto max-w-[1240px] px-4 py-4 sm:px-6 lg:px-8"
        >
          <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#4b4b4b]">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-[#0060c3]"
              >
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-[#171717]/30" />
            </li>
            <li>
              <Link
                href="/realisations"
                className="transition-colors hover:text-[#0060c3]"
              >
                Réalisations
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-[#171717]/30" />
            </li>
            <li
              aria-current="page"
              className="font-semibold text-[#171717]"
            >
              {project.title}
            </li>
          </ol>
        </nav>

        {/* Étude de cas principale */}
        <article className="mx-auto max-w-[1240px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          {/* En-tête de l'étude de cas */}
          <header className="mx-auto max-w-[920px] text-center">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
                <Briefcase className="h-3.5 w-3.5 text-[#0060c3]" />
                {project.category}
              </span>
              <span className="rounded-full bg-[#f8f9fa] border border-[#171717]/8 px-3 py-1 text-xs font-semibold text-[#171717]">
                Client : {project.client}
              </span>
              <span className="rounded-full bg-[#f8f9fa] border border-[#171717]/8 px-3 py-1 text-xs font-semibold text-[#171717]">
                {project.year}
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-black tracking-[-0.06em] text-[#171717] sm:text-4xl lg:text-6xl lg:leading-[1.08]">
              {project.title}
            </h1>

            <p className="mt-6 text-base leading-relaxed text-[#4b4b4b] sm:text-xl sm:leading-relaxed">
              {project.desc}
            </p>

            {/* Fiche technique / Métadonnées sémantiques en <dl> */}
            <div className="mt-10 rounded-2xl border border-[#171717]/10 bg-[#f8f9fa] p-5 sm:p-7">
              <dl className="grid grid-cols-2 gap-4 text-left sm:grid-cols-4">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4b4b4b]">
                    Client
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-[#171717]">
                    {project.client}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4b4b4b]">
                    Durée
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-[#171717]">
                    {project.duration}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4b4b4b]">
                    Année
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-[#171717]">
                    {project.year}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#4b4b4b]">
                    Impact principal
                  </dt>
                  <dd className="mt-1 text-sm font-black text-[#0060c3]">
                    {project.impact}
                  </dd>
                </div>
              </dl>
            </div>
          </header>

          {/* Image principale / Vitrine avec <figure> */}
          <figure className="mx-auto mt-10 max-w-[1100px] overflow-hidden rounded-[2.2rem] border border-[#171717]/10 shadow-[0_20px_50px_rgba(21,20,27,0.06)]">
            <div className="relative aspect-[16/9] w-full bg-[#dfe7ed]">
              <Image
                src={project.image}
                alt={`Aperçu de la réalisation ${project.title}`}
                fill
                priority
                sizes="(min-width: 1280px) 1100px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="bg-[#f8f9fa] px-6 py-3.5 text-center text-xs font-medium text-[#4b4b4b]">
              Conception et réalisation pour {project.client} — {project.category}
            </figcaption>
          </figure>

          {/* Section Résultats chiffrés */}
          <section
            aria-labelledby="titre-resultats"
            className="mx-auto mt-14 max-w-[1100px]"
          >
            <div className="rounded-[2rem] border border-[#0060c3]/20 bg-[#0060c3] p-8 sm:p-10 text-white shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-white/80">
                <Sparkles className="h-4 w-4 text-white" />
                <span>Mesures concrètes & Performance</span>
              </div>
              <h2
                id="titre-resultats"
                className="mt-3 text-2xl sm:text-3xl font-black tracking-[-0.05em] text-white"
              >
                L&apos;impact mesurable de cette collaboration
              </h2>

              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {project.results.map((res, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm"
                  >
                    <p className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                      {res.metric}
                    </p>
                    <p className="mt-2 text-xs sm:text-sm font-medium text-white/85">
                      {res.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Défi et Solution en 2 colonnes */}
          <div className="mx-auto mt-14 grid max-w-[1100px] gap-8 lg:grid-cols-2">
            {/* Le Défi */}
            <section
              id="le-defi"
              aria-labelledby="titre-defi"
              className="rounded-[2rem] border border-[#171717]/8 bg-[#f8f9fa] p-8 sm:p-10"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-600">
                <Layers className="h-4 w-4" />
                <span>Contexte & Problématique</span>
              </div>
              <h2
                id="titre-defi"
                className="mt-4 text-2xl font-black tracking-[-0.05em] text-[#171717]"
              >
                Le défi initial
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4b4b4b]">
                {project.challenge}
              </p>
            </section>

            {/* La Solution */}
            <section
              id="la-solution"
              aria-labelledby="titre-solution"
              className="rounded-[2rem] border border-[#171717]/8 bg-[#f8f9fa] p-8 sm:p-10"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0060c3]">
                <CheckCircle2 className="h-4 w-4" />
                <span>Stratégie & Déploiement</span>
              </div>
              <h2
                id="titre-solution"
                className="mt-4 text-2xl font-black tracking-[-0.05em] text-[#171717]"
              >
                La réponse apportée
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#4b4b4b]">
                {project.solution}
              </p>
            </section>
          </div>

          {/* Fonctionnalités clés développées */}
          <section
            id="fonctionnalites"
            aria-labelledby="titre-features"
            className="mx-auto mt-14 max-w-[1100px] rounded-[2rem] border border-[#171717]/8 bg-white p-8 sm:p-10 shadow-sm"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#0060c3]" />
              Livrables &amp; Modules
            </span>
            <h2
              id="titre-features"
              className="mt-2 text-2xl sm:text-3xl font-black tracking-[-0.05em] text-[#171717]"
            >
              Fonctionnalités clés développées sur mesure
            </h2>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {project.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-[#171717]/6 bg-[#f8f9fa] p-4 text-sm font-medium text-[#171717]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0060c3]" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Témoignage client (si présent) */}
          {project.testimonial && (
            <section
              aria-label="Témoignage du client"
              className="mx-auto mt-14 max-w-[1100px]"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-[#171717]/10 bg-[#f8f9fa] p-8 sm:p-12">
                <blockquote className="text-lg sm:text-2xl font-bold leading-relaxed text-[#171717]">
                  « {project.testimonial.quote} »
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#0060c3] text-white flex items-center justify-center font-bold text-sm">
                    {project.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-sm text-[#171717] block">
                      {project.testimonial.author}
                    </cite>
                    <span className="text-xs text-[#4b4b4b]">
                      {project.testimonial.role}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Outils & Technologies mobilisées */}
          <section
            aria-labelledby="titre-technologies"
            className="mx-auto mt-14 max-w-[1100px] rounded-[2rem] border border-[#171717]/8 bg-[#f8f9fa] p-8"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#171717]/60">
              <Wrench className="h-3.5 w-3.5" />
              <span>Sous le capot</span>
            </div>
            <h2
              id="titre-technologies"
              className="mt-2 text-xl font-black tracking-[-0.04em] text-[#171717]"
            >
              Outils & technologies mobilisés pour ce projet
            </h2>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-[#171717]/10 bg-white px-4 py-2 text-xs font-bold text-[#171717] shadow-sm"
                >
                  {tool}
                </span>
              ))}
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#0060c3]/10 px-4 py-2 text-xs font-bold text-[#0060c3]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Navigation entre réalisations */}
          <nav
            aria-label="Navigation entre réalisations"
            className="mx-auto mt-14 max-w-[1100px] border-t border-[#171717]/10 pt-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href={`/realisations/${prevProject.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-[#171717]/8 bg-[#f8f9fa] px-6 py-4 transition-all hover:bg-white hover:border-[#171717]/20 w-full sm:w-auto"
              >
                <ArrowLeft className="h-4 w-4 text-[#0060c3] transition-transform group-hover:-translate-x-1" />
                <div className="text-left">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#4b4b4b]">
                    Projet précédent
                  </span>
                  <span className="font-bold text-sm text-[#171717]">
                    {prevProject.title}
                  </span>
                </div>
              </Link>

              <Link
                href="/realisations"
                className="rounded-full border border-[#171717]/15 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-[#171717] transition-all hover:bg-[#171717] hover:text-white"
              >
                Voir toutes les réalisations
              </Link>

              <Link
                href={`/realisations/${nextProject.slug}`}
                className="group flex items-center justify-between sm:justify-start gap-3 rounded-2xl border border-[#171717]/8 bg-[#f8f9fa] px-6 py-4 transition-all hover:bg-white hover:border-[#171717]/20 w-full sm:w-auto"
              >
                <div className="text-left sm:text-right">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#4b4b4b]">
                    Projet suivant
                  </span>
                  <span className="font-bold text-sm text-[#171717]">
                    {nextProject.title}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#0060c3] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </nav>
        </article>

        {/* CTA final */}
        <FinalCTA />
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
