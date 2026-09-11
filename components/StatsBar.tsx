import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Asteria",
    category: "Immobilier",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    href: "/projets/asteria",
  },
  {
    title: "Northlane",
    category: "Startup",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    href: "/projets/northlane",
  },
  {
    title: "Maison 7",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    href: "/projets/maison-7",
  },
  {
    title: "Luna Studio",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85",
    href: "/projets/luna-studio",
  },
  {
    title: "Nova Commerce",
    category: "E-commerce",
    image: "/media/nourou-portrait-transparent.png",
    href: "/projets/nova-commerce",
  },
  {
    title: "Léveil & Co",
    category: "Cabinet",
    image: "/media/nourou-portrait-transparent.png",
    href: "/projets/leveil-co",
  },
];

export default function StatsBar() {
  return (
    <section id="realisations" className="bg-[#171717] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-white/10 bg-[#171717] p-6 text-white sm:p-8 lg:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#171717] shadow-sm">
            Mes réalisations
          </span>
          <a
            href="#realisations"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold text-[#171717] transition-transform hover:-translate-y-0.5"
          >
            Voir tous les projets
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </a>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[380px] font-black tracking-[-0.07em] text-white">
            Des projets pensés pour marquer les esprits
            <span className="block"></span>
          </h2>

          <p className="max-w-[360px] text-base leading-[1.5] text-white/70 sm:text-[1.1rem]">
            Un travail sérieux, clair et premium, pensé pour donner de la crédibilité à votre activité.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.slice(0, 4).map(({ title, category, image, href }) => (
            <a
              key={title}
              href={href}
              className="group block"
            >
              <div className="relative h-64 overflow-hidden rounded-[1.8rem] bg-[#dfe7ed] shadow-[0_12px_24px_rgba(17,17,17,0.06)] transition-transform duration-300 group-hover:-translate-y-1">
                <div className="absolute left-4 top-4 z-10 flex gap-2">

                  <span className="rounded-full bg-white px-3 py-1.5 text-[0.65rem] font-semibold text-[#171717] shadow-sm">
                    {category}
                  </span>
                </div>
                  <Image
                    src={image}
                    alt={title}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#171717] text-white shadow-lg transition-transform duration-300 group-hover:rotate-[-10deg]">
                  <ArrowUpRight className="h-5 w-5" strokeWidth={1.8} />
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-1 pt-4">
                <h3 className="font-black leading-none tracking-[-0.05em] text-[#171717]">
                  {title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
