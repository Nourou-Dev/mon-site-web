import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen } from "lucide-react";

import { allArticles } from "@/lib/blogData";

export default function BlogTeaser() {
  const teaserArticles = allArticles.slice(0, 4);

  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-8 lg:p-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
              <BookOpen className="h-3.5 w-3.5 text-[#0060c3]" />
              Derniers articles
            </span>
            <h2 className="mt-5 max-w-[540px] font-black tracking-[-0.07em] text-[#171717]">
              Des conseils utiles
            </h2>
            <h2 className="font-black tracking-[-0.07em] text-[#171717]">
              pour mieux décider
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="max-w-[340px] text-base leading-7 text-[#4b4b4b]">
              Guides et retours d&apos;expérience pour faire les bons choix avant de lancer un projet web.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[#171717]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#171717] transition-all hover:bg-[#0060c3] hover:border-[#0060c3] hover:text-white hover:-translate-y-0.5"
            >
              Tous les articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teaserArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex min-h-0 flex-col overflow-hidden rounded-[1.5rem] border border-[#171717]/8 bg-white shadow-[0_12px_28px_rgba(21,20,27,0.04)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[1.15/1] overflow-hidden bg-[#e9e2d8]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#171717] shadow-sm">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[1.35rem] font-black leading-[1.08] tracking-[-0.05em] text-[#171717] group-hover:text-[#0060c3] transition-colors">
                  {article.title}
                </h3>
                <p className="mt-4 flex-1 text-[0.9rem] leading-6 text-[#4b4b4b] line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[#171717]/8 pt-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#171717]/55 group-hover:text-[#0060c3]">
                  Lire l’article
                  <ArrowUpRight className="h-4 w-4 text-[#0060c3]" strokeWidth={2} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
