import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";

import { allArticles } from "@/lib/blogData";

export default function BlogTeaser() {
  const teaserArticles = allArticles.slice(0, 4);

  return (
    <section className="bg-[#fbf9f5] px-4 py-16 sm:px-6 sm:py-24 lg:px-8 border-t border-[#171717]/10">
      <div className="mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-[#171717]/10 pb-10">
          <div>
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#737373]">
              <span className="text-[#171717] font-semibold">[ 10 / PUBLICATIONS ]</span>
              <span>—</span>
              <span>Carnet de bord &amp; Méthode</span>
            </div>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.03em] text-[#171717]">
              Analyses, guides et <span className="italic font-normal">retours d&apos;expérience</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-md text-sm sm:text-base text-[#4b4b4b] font-light leading-relaxed">
              Des réflexions transparentes sur le code, la conversion et la stratégie digitale pour éclairer vos prises de décision.
            </p>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-[#171717] bg-[#171717] px-6 py-3 text-xs font-mono uppercase tracking-wider text-white transition-all hover:bg-black hover:shadow-md"
            >
              <span>Tous les articles</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Grid Articles */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teaserArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#171717]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#171717]/30 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#ebe7df]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 backdrop-blur-sm border border-[#171717]/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#171717] shadow-xs">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-medium leading-snug tracking-tight text-[#171717] group-hover:text-[#0052a3] transition-colors">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-[#595959] line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[#171717]/8 pt-4 text-[11px] font-mono uppercase tracking-wider text-[#737373] group-hover:text-[#171717]">
                  <span>Lire l&apos;analyse</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
