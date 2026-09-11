import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  FolderKanban,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectsExplorer from "@/components/ProjectsExplorer";
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

        {/* Explorateur interactif de projets avec recherche, filtres par catégorie et technos */}
        <section aria-label="Explorateur de projets" className="bg-white px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          <ProjectsExplorer projects={allProjects} />
        </section>

        {/* Bannière de conversion inspirée de Carlos Djanato */}
        <section className="bg-white px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-[#171717]/10 bg-[#0060c3] p-8 text-white shadow-xl sm:p-12 lg:p-14">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Votre projet mérite le meilleur
              </span>
              <h2 className="mt-5 text-2xl font-black tracking-[-0.05em] text-white sm:text-3xl lg:text-4xl">
                Un projet similaire en tête ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
                Parlons de vos objectifs, de votre cible et voyons comment concevoir une présence en ligne sur mesure qui marque les esprits et déclenche des prises de contact.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href={`https://wa.me/2290161380798?text=${encodeURIComponent("Bonjour Nourou, j'ai parcouru vos réalisations et j'aimerais échanger sur mon projet...")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#0060c3] shadow-md transition-all hover:bg-[#f5f9ff] hover:-translate-y-0.5 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" />
                  Discuter sur WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5 active:scale-95"
                >
                  Demander un cadrage gratuit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
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
