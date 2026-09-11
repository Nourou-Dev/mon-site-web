import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, BookOpen, ChevronRight, Calendar, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { allArticles, getFeaturedArticle } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Blog & Ressources Web — Nourou Dine AMANDOU",
  description:
    "Guides, conseils pratiques et retours d'expérience pour créer un site internet performant, convaincant et générateur de résultats.",
};

export default function BlogPage() {
  const featuredArticle = getFeaturedArticle();
  const gridArticles = allArticles.slice(1);

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
              Blog & Ressources
            </li>
          </ol>
        </nav>

        {/* En-tête du blog */}
        <header className="relative overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,96,195,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.03),transparent_20%)]" />

          <div className="relative mx-auto max-w-[1240px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
              <BookOpen className="h-3.5 w-3.5 text-[#0060c3]" />
              Ressources &amp; Guides
            </span>

            <h1 className="mx-auto mt-6 max-w-[850px] font-black tracking-[-0.07em] text-[#171717] text-3xl sm:text-4xl lg:text-5xl lg:leading-[1.12]">
              Conseils concrets pour réussir la présence en ligne de votre marque
            </h1>

            <p className="mx-auto mt-6 max-w-[620px] text-base leading-relaxed text-[#4b4b4b] sm:text-lg">
              Des guides pratiques sans détour pour vous aider à prendre les bonnes décisions stratégiques et techniques avant, pendant et après la mise en ligne.
            </p>
          </div>
        </header>

        {/* Article à la une - Cliquable vers /blog/[slug] */}
        <section aria-labelledby="titre-article-vedette" className="bg-white px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <span id="titre-article-vedette" className="sr-only">
              Article à la une
            </span>
            <Link
              href={`/blog/${featuredArticle.slug}`}
              className="group block overflow-hidden rounded-[2.2rem] border border-[#171717]/10 bg-white shadow-[0_20px_50px_rgba(21,20,27,0.05)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(21,20,27,0.12)] hover:-translate-y-1"
            >
              <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-[#171717] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white">
                        {featuredArticle.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-[#4b4b4b]">
                        <Clock className="h-3.5 w-3.5 text-[#0060c3]" />
                        {featuredArticle.readTime}
                      </span>
                      <time
                        dateTime={featuredArticle.isoDate}
                        className="inline-flex items-center gap-1 text-xs text-[#4b4b4b]"
                      >
                        <Calendar className="h-3.5 w-3.5 text-[#0060c3]" />
                        {featuredArticle.date}
                      </time>
                    </div>

                    <h2 className="mt-6 text-2xl sm:text-3xl lg:text-4xl font-black tracking-[-0.06em] text-[#171717] leading-tight group-hover:text-[#0060c3] transition-colors">
                      {featuredArticle.title}
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-[#4b4b4b] sm:text-lg">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-[#171717]/10 pt-6">
                    <span className="text-xs text-[#4b4b4b]">Guide complet et actionnable</span>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0060c3] group-hover:translate-x-1 transition-transform">
                      Lire le guide
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                <div className="relative min-h-[260px] lg:min-h-[400px] w-full overflow-hidden bg-[#e9e2d8]">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Grille de tous les articles - Cliquables vers /blog/[slug] */}
        <section aria-labelledby="titre-tous-articles" className="bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="mb-8 flex items-center justify-between">
              <h2 id="titre-tous-articles" className="text-2xl font-black tracking-[-0.05em] text-[#171717] sm:text-3xl">
                Toutes les publications
              </h2>
              <span className="text-xs font-semibold text-[#4b4b4b]">
                {allArticles.length} guides disponibles
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gridArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-[1.8rem] border border-[#171717]/8 bg-white shadow-[0_12px_28px_rgba(21,20,27,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(21,20,27,0.08)]"
                >
                  <article className="flex flex-1 flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#e9e2d8]">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#171717] shadow-sm backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 text-xs text-[#4b4b4b]">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-[#0060c3]" />
                          {article.readTime}
                        </span>
                        <span>•</span>
                        <time dateTime={article.isoDate}>{article.date}</time>
                      </div>

                      <h3 className="mt-3 text-xl font-black leading-snug tracking-[-0.05em] text-[#171717] group-hover:text-[#0060c3] transition-colors">
                        {article.title}
                      </h3>

                      <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4b4b4b] line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-[#171717]/8 pt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#171717]/60 transition-colors group-hover:text-[#0060c3]">
                        <span>Lire l’article</span>
                        <ArrowUpRight className="h-4 w-4 text-[#0060c3]" strokeWidth={2} />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

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
