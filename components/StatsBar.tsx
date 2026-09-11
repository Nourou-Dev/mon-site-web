import Image from "next/image";
import Link from "next/link";
import { allProjects } from "@/lib/projectsData";

export default function StatsBar() {
  const asteria = allProjects.find((p) => p.slug === "asteria") || allProjects[0];
  const northlane = allProjects.find((p) => p.slug === "northlane") || allProjects[1];
  const maison7 = allProjects.find((p) => p.slug === "maison-7") || allProjects[2];

  return (
    <section id="realisations" className="relative w-full bg-[#F6F4EF] py-20 sm:py-28 lg:py-32 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section sobre */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#C9C4B8]">
          <div>
            <span className="text-xs font-mono text-[#4B4D54]">
              03 / Études de cas sélectionnées
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1B1D22] max-w-[640px]">
              Chaque projet possède son propre système visuel.
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="max-w-[360px] text-sm text-[#4B4D54] leading-relaxed md:text-right font-light">
              Conçus pour répondre à des objectifs d&apos;autorité, de clarté commerciale et de conversion mesurable.
            </p>
            <Link
              href="/realisations"
              className="text-xs font-medium text-[#3D5AFE] hover:underline"
            >
              Consulter l&apos;ensemble du portfolio
            </Link>
          </div>
        </div>

        {/* Étude 1 : Format Panoramique Horizontal (Asteria) */}
        <div className="mt-14">
          <Link
            href={`/realisations/${asteria.slug}`}
            className="group block overflow-hidden rounded-2xl border border-[#C9C4B8] bg-white transition-all hover:border-[#1B1D22]/40"
          >
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div className="relative aspect-[16/10] lg:aspect-[16/11] w-full overflow-hidden bg-[#EBE7DF]">
                <Image
                  src={asteria.image}
                  alt={`Aperçu du projet ${asteria.title}`}
                  fill
                  sizes="(min-width: 1024px) 700px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-10 lg:p-12">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#4B4D54]">
                    <span>Projet 01</span>
                    <span>{asteria.category} · {asteria.year}</span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl sm:text-3xl font-light text-[#1B1D22] group-hover:text-[#3D5AFE] transition-colors">
                    {asteria.client}
                  </h3>

                  <p className="mt-4 text-sm text-[#4B4D54] leading-relaxed font-light">
                    {asteria.desc}
                  </p>

                  <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-[#C9C4B8]/40">
                    {asteria.results.map((r) => (
                      <div key={r.label}>
                        <span className="block font-display text-xl sm:text-2xl font-light text-[#1B1D22]">
                          {r.metric}
                        </span>
                        <span className="mt-1 block text-[11px] text-[#4B4D54] leading-tight">
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#3D5AFE]">
                    Consulter la fiche complète
                  </span>
                  <span className="text-xs font-mono text-[#4B4D54]">
                    Genève &amp; Côte d&apos;Azur
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Études 2 & 3 : Mises en page différenciées et asymétriques */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          
          {/* Étude 2 : Northlane (Traitement Encre Profonde & Ingénierie) */}
          <Link
            href={`/realisations/${northlane.slug}`}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1B1D22] bg-[#1B1D22] p-6 sm:p-10 text-[#F6F4EF] transition-all hover:border-[#3D5AFE]"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#F6F4EF]/70">
                <span>Projet 02</span>
                <span>{northlane.category}</span>
              </div>

              <h3 className="mt-4 font-display text-2xl sm:text-3xl font-light text-[#F6F4EF] group-hover:text-[#3D5AFE] transition-colors">
                {northlane.client}
              </h3>

              <p className="mt-3 text-sm text-[#F6F4EF]/80 leading-relaxed font-light">
                {northlane.desc}
              </p>

              <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl bg-black/40 border border-white/10">
                <Image
                  src={northlane.image}
                  alt={`Aperçu de ${northlane.title}`}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-102"
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {northlane.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-white/15 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-[#F6F4EF]/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="font-mono text-[#F6F4EF]">
                Impact : {northlane.impact}
              </span>
              <span className="text-[#3D5AFE] font-medium">
                Voir l&apos;étude
              </span>
            </div>
          </Link>

          {/* Étude 3 : Maison 7 (Traitement Galerie & Architecture d'Intérieur) */}
          <Link
            href={`/realisations/${maison7.slug}`}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#C9C4B8] bg-white p-6 sm:p-10 transition-all hover:border-[#1B1D22]/40"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#4B4D54]">
                <span>Projet 03</span>
                <span>{maison7.category}</span>
              </div>

              <h3 className="mt-4 font-display text-2xl sm:text-3xl font-light text-[#1B1D22] group-hover:text-[#3D5AFE] transition-colors">
                {maison7.client}
              </h3>

              <p className="mt-3 text-sm text-[#4B4D54] leading-relaxed font-light">
                {maison7.desc}
              </p>

              <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#EBE7DF]">
                <Image
                  src={maison7.image}
                  alt={`Aperçu de ${maison7.title}`}
                  fill
                  sizes="(min-width: 1024px) 500px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
              </div>

              {maison7.testimonial && (
                <div className="mt-6 rounded-xl border border-[#C9C4B8]/50 bg-[#F6F4EF] p-4 text-xs italic text-[#4B4D54]">
                  « {maison7.testimonial.quote} »
                  <div className="mt-2 text-[11px] not-italic font-mono text-[#1B1D22]">
                    {maison7.testimonial.author}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t border-[#C9C4B8]/40 flex items-center justify-between text-xs">
              <span className="font-mono text-[#4B4D54]">
                {maison7.impact}
              </span>
              <span className="text-[#3D5AFE] font-medium">
                Voir l&apos;étude
              </span>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
