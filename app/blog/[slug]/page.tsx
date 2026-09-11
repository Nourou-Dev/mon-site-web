import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Info,
  Lightbulb,
  Share2,
  Sparkles,
  Tag,
  AlertTriangle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { allArticles, getArticleBySlug } from "@/lib/blogData";

interface BlogPostPageProps {
  params: { slug: string } | Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: "Article introuvable — Nourou Dine AMANDOU",
    };
  }

  return {
    title: `${article.title} — Blog Nourou Dine AMANDOU`,
    description: article.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await Promise.resolve(params);
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = article.relatedSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => a !== undefined)
    .slice(0, 3);

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
                href="/blog"
                className="transition-colors hover:text-[#0060c3]"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-[#171717]/30" />
            </li>
            <li
              aria-current="page"
              className="max-w-[260px] truncate font-semibold text-[#171717] sm:max-w-[400px]"
            >
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Corps principal de l'article */}
        <article className="mx-auto max-w-[1240px] px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
          {/* En-tête de l'article */}
          <header className="mx-auto max-w-[860px] text-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
                <Tag className="h-3.5 w-3.5 text-[#0060c3]" />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-[#4b4b4b]">
                <Clock className="h-3.5 w-3.5 text-[#0060c3]" />
                {article.readTime}
              </span>
              <span className="text-xs text-[#171717]/20">•</span>
              <time
                dateTime={article.isoDate}
                className="inline-flex items-center gap-1 text-xs text-[#4b4b4b]"
              >
                <Calendar className="h-3.5 w-3.5 text-[#0060c3]" />
                {article.date}
              </time>
            </div>

            <h1 className="mt-6 text-3xl font-black tracking-[-0.06em] text-[#171717] sm:text-4xl lg:text-5xl lg:leading-[1.12]">
              {article.title}
            </h1>

            <p className="mt-6 text-base leading-relaxed text-[#4b4b4b] sm:text-lg">
              {article.excerpt}
            </p>

            {/* Auteur */}
            <div className="mt-8 flex items-center justify-center gap-3 border-y border-[#171717]/8 py-4">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#171717]/10 bg-[#0060c3]/10">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#171717]">
                  {article.author.name}
                </p>
                <p className="text-xs text-[#4b4b4b]">{article.author.role}</p>
              </div>
            </div>
          </header>

          {/* Image de couverture avec figure/figcaption */}
          <figure className="mx-auto mt-10 max-w-[1020px] overflow-hidden rounded-[2rem] border border-[#171717]/10 shadow-[0_15px_40px_rgba(21,20,27,0.06)]">
            <div className="relative aspect-[16/9] w-full bg-[#dfe7ed]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(min-width: 1200px) 1020px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="bg-[#f8f9fa] px-6 py-3 text-center text-xs text-[#4b4b4b]">
              Illustration stratégique : {article.title}
            </figcaption>
          </figure>

          {/* Disposition avec Sommaire et Contenu */}
          <div className="mx-auto mt-12 grid max-w-[1020px] gap-12 lg:grid-cols-[280px_1fr]">
            {/* Sidebar avec Sommaire et Auteur */}
            <aside
              aria-label="Informations complémentaires et sommaire"
              className="hidden lg:block"
            >
              <div className="sticky top-28 space-y-6">
                {/* Sommaire */}
                <div className="rounded-2xl border border-[#171717]/8 bg-[#f8f9fa] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#171717]">
                    Au sommaire
                  </p>
                  <nav aria-label="Sommaire de l'article" className="mt-4">
                    <ol className="space-y-2.5 text-xs text-[#4b4b4b]">
                      {article.tableOfContents.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="block transition-colors hover:text-[#0060c3]"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>

                {/* Encadré d'expertise */}
                <div className="rounded-2xl border border-[#0060c3]/20 bg-[#0060c3]/5 p-5 text-xs">
                  <div className="flex items-center gap-2 font-bold text-[#0060c3]">
                    <Sparkles className="h-4 w-4" />
                    <span>Besoin d&apos;un regard expert ?</span>
                  </div>
                  <p className="mt-2 text-[#4b4b4b] leading-relaxed">
                    Je passe en revue votre site actuel ou vos maquettes et vous
                    propose un diagnostic précis sans engagement.
                  </p>
                  <Link
                    href="/#contact"
                    className="mt-4 inline-flex items-center gap-1.5 font-bold text-[#0060c3] hover:underline"
                  >
                    Demander un diagnostic
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Contenu principal de l'article */}
            <div className="min-w-0 max-w-none">
              {/* Introduction */}
              <div className="rounded-2xl border-l-4 border-[#0060c3] bg-[#f8f9fa] p-6 text-base font-medium leading-relaxed text-[#171717] sm:text-lg">
                {article.intro}
              </div>

              {/* Résumé des points clés */}
              <aside
                aria-label="Points essentiels de l'article"
                className="mt-8 rounded-2xl border border-[#171717]/10 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-[#0060c3]">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>En résumé : ce qu&apos;il faut retenir</span>
                </div>
                <ul className="mt-4 space-y-2.5 text-sm text-[#4b4b4b]">
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0060c3]" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </aside>

              {/* Sections rédigées */}
              <div className="mt-10 space-y-12">
                {article.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 space-y-4"
                  >
                    <h2 className="text-2xl font-black tracking-[-0.05em] text-[#171717] sm:text-3xl">
                      {section.title}
                    </h2>

                    {section.content.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-base leading-relaxed text-[#4b4b4b] sm:text-[1.05rem]"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {/* Citation stylisée */}
                    {section.quote && (
                      <blockquote className="my-6 border-l-4 border-[#0060c3] pl-5 py-2 text-lg italic font-medium text-[#171717] bg-[#f8f9fa] rounded-r-xl">
                        « {section.quote} »
                      </blockquote>
                    )}

                    {/* Callout box */}
                    {section.callout && (
                      <div
                        className={`my-6 rounded-2xl border p-5 ${
                          section.callout.type === "warning"
                            ? "border-amber-500/20 bg-amber-500/5 text-[#171717]"
                            : "border-[#0060c3]/20 bg-[#0060c3]/5 text-[#171717]"
                        }`}
                      >
                        <div className="flex items-center gap-2 text-sm font-bold">
                          {section.callout.type === "warning" ? (
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                          ) : (
                            <Lightbulb className="h-4 w-4 text-[#0060c3]" />
                          )}
                          <span>{section.callout.title}</span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[#4b4b4b]">
                          {section.callout.text}
                        </p>
                      </div>
                    )}

                    {/* Sous-sections */}
                    {section.subsections && (
                      <div className="mt-6 space-y-4 pt-2">
                        {section.subsections.map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            className="rounded-xl border border-[#171717]/8 bg-[#f8f9fa] p-4 sm:p-5"
                          >
                            <h3 className="text-base font-bold text-[#171717]">
                              {sub.title}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-[#4b4b4b]">
                              {sub.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Étiquettes / Tags */}
              <footer className="mt-12 border-t border-[#171717]/10 pt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#171717]/60">
                    <Tag className="h-3.5 w-3.5" />
                    Thématiques :
                  </span>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#f8f9fa] border border-[#171717]/8 px-3 py-1 text-xs font-semibold text-[#171717]/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Signature auteur */}
                <div className="mt-8 rounded-2xl border border-[#171717]/10 bg-[#f8f9fa] p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#0060c3] bg-white">
                      <Image
                        src={article.author.avatar}
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0060c3]">
                        Rédigé par
                      </p>
                      <h4 className="mt-1 text-lg font-black text-[#171717]">
                        {article.author.name}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#4b4b4b]">
                        J&apos;aide les entreprises et entrepreneurs à bâtir des
                        sites vitrines et des plateformes web qui inspirent une
                        confiance immédiate et génèrent des résultats réels.
                      </p>
                      <div className="mt-4">
                        <Link
                          href="/#contact"
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#0060c3] hover:underline"
                        >
                          Échanger sur votre projet
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </article>

        {/* Section Articles Recommandés / Suivants */}
        {relatedArticles.length > 0 && (
          <section
            aria-labelledby="titre-articles-lies"
            className="border-t border-[#171717]/8 bg-[#f8f9fa] px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
          >
            <div className="mx-auto max-w-[1240px]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
                    <BookOpen className="h-3.5 w-3.5 text-[#0060c3]" />
                    Poursuivre votre lecture
                  </span>
                  <h2
                    id="titre-articles-lies"
                    className="mt-2 text-2xl font-black tracking-[-0.05em] text-[#171717] sm:text-3xl"
                  >
                    Ces articles pourraient aussi vous intéresser
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0060c3] hover:underline"
                >
                  Tous les guides
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group flex flex-col overflow-hidden rounded-[1.8rem] border border-[#171717]/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#dfe7ed]">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
                        {rel.category}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-2 text-xs text-[#4b4b4b]">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{rel.readTime}</span>
                      </div>

                      <h3 className="mt-3 text-lg font-black leading-snug tracking-[-0.04em] text-[#171717] group-hover:text-[#0060c3] transition-colors">
                        {rel.title}
                      </h3>

                      <p className="mt-2 flex-1 text-xs leading-relaxed text-[#4b4b4b] line-clamp-3">
                        {rel.excerpt}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-[#171717]/8 pt-3 text-xs font-bold uppercase tracking-[0.14em] text-[#0060c3]">
                        Lire l&apos;article
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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
