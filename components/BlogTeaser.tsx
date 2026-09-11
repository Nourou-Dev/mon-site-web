import Image from "next/image";
import Link from "next/link";
import { allArticles } from "@/lib/blogData";

export default function BlogTeaser() {
  const teaserArticles = allArticles.slice(0, 4);

  return (
    <section className="bg-[#F6F4EF] px-4 py-20 sm:px-6 sm:py-28 lg:px-10 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px]">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-[#C9C4B8] pb-10">
          <div>
            <p className="text-xs font-mono text-[#1B1D22]/60">
              Carnet d&apos;atelier · Méthode &amp; Retours d&apos;expérience
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1B1D22]">
              Analyses, guides et <span className="italic">retours d&apos;expérience</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <p className="max-w-md text-sm text-[#1B1D22]/70 leading-relaxed font-sans">
              Des réflexions transparentes sur le code, la conversion et la direction artistique pour éclairer vos décisions.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center bg-[#1B1D22] px-6 py-3 text-xs font-mono text-white transition-colors hover:bg-[#3D5AFE] shrink-0"
            >
              Tous les articles
            </Link>
          </div>
        </div>

        {/* Grid Articles - Architectural Layout */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teaserArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col border border-[#C9C4B8] bg-white transition-colors hover:border-[#1B1D22]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE6DD] border-b border-[#C9C4B8]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 bg-[#F6F4EF] border border-[#C9C4B8] px-2.5 py-1 text-[10px] font-mono text-[#1B1D22]">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl font-normal leading-snug tracking-tight text-[#1B1D22] group-hover:text-[#3D5AFE] transition-colors">
                  {article.title}
                </h3>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-[#1B1D22]/70 line-clamp-3 font-sans">
                  {article.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[#C9C4B8] pt-4 text-xs font-mono text-[#1B1D22]/60 group-hover:text-[#3D5AFE] transition-colors">
                  <span>Lire l&apos;analyse</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
