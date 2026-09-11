import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    category: "Stratégie",
    title: "Pourquoi votre site ne convertit pas assez de visiteurs",
    excerpt: "Les signaux qui empêchent vos visiteurs de comprendre votre valeur et de passer à l’action.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "Design",
    title: "Les bases d’une identité visuelle cohérente",
    excerpt: "Une méthode simple pour aligner couleurs, typographies et contenus autour d’une même impression.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "Conversion",
    title: "Les éléments indispensables d’une page d’accueil",
    excerpt: "Ce que vos visiteurs doivent comprendre en quelques secondes pour continuer leur parcours.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "Visibilité",
    title: "Comment préparer un site plus visible sur Google",
    excerpt: "Les fondations éditoriales et techniques à poser avant de chercher à mieux vous positionner.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
  },
];

export default function BlogTeaser() {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-[#171717]/5 bg-[#f3efe9] p-6 sm:p-8 lg:p-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full border border-[#171717]/10 bg-white/80 px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#171717] shadow-sm">
              Derniers articles
            </span>
            <h2 className="mt-5 max-w-[540px] font-black tracking-[-0.07em] text-[#171717]">
              Des conseils utiles
            </h2>
            <h2 className="font-black tracking-[-0.07em] text-[#171717]">
              pour mieux décider
            </h2>
          </div>
          <p className="max-w-[420px] text-base leading-7 text-[#4b4b4b]">
            Guides et retours d&apos;expérience pour faire les bons choix techniques avant de lancer un projet web.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group flex min-h-[430px] flex-col overflow-hidden rounded-[1.5rem] border border-[#171717]/8 bg-white shadow-[0_12px_28px_rgba(21,20,27,0.04)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[1.15/1] overflow-hidden bg-[#e9e2d8]">
                <Image
                  src={article.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-[#171717] shadow-sm">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[1.35rem] font-black leading-[1.08] tracking-[-0.05em] text-[#171717]">
                  {article.title}
                </h3>
                <p className="mt-4 flex-1 text-[0.9rem] leading-6 text-[#4b4b4b]">
                  {article.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-[#171717]/8 pt-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#171717]/55">
                  Lire l’article
                  <ArrowUpRight className="h-4 w-4 text-[#d76b45]" strokeWidth={2} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
