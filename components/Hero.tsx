import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, MessageCircle, Sparkles, Star } from "lucide-react";
import { site } from "@/lib/data";

const stackItems = [
  { name: "Next.js", category: "Framework React" },
  { name: "TypeScript", category: "Langage typé" },
  { name: "Tailwind CSS", category: "Design system" },
  { name: "WordPress", category: "CMS sur mesure" },
  { name: "Figma", category: "UI/UX Design" },
  { name: "React", category: "Composants web" },
  { name: "PostgreSQL", category: "Base de données" },
  { name: "Prisma ORM", category: "Modélisation" },
];

export default function Hero() {
  const whatsappUrl = `${site.whatsapp}?text=${encodeURIComponent(
    "Bonjour Nourou, j'ai vu votre site et j'aimerais discuter d'un projet web..."
  )}`;

  return (
    <section id="accueil" className="w-full scroll-mt-[5.5rem] bg-white pt-24 sm:pt-28 pb-10 sm:pb-16">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        {/* Cadre principal du Hero inspiré de Carlos Djanato */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#171717]/10 bg-[#fbfcfd] p-6 shadow-[0_15px_45px_rgba(0,0,0,0.03)] sm:p-10 lg:p-14">
          {/* Lueur subtile en arrière-plan */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#0060c3]/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-[#0060c3]/5 blur-3xl" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Colonne gauche : Positionnement & Valeur */}
            <div>
              {/* Badge de statut réel */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#0060c3]/20 bg-[#0060c3]/5 px-4 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#0060c3]">
                  Disponible pour de nouveaux projets · Abomey-Calavi &amp; Remote
                </span>
              </div>

              {/* Titre principal fort & non-IA */}
              <h1 className="mt-6 text-3xl font-black tracking-[-0.05em] text-[#171717] sm:text-4xl lg:text-5xl lg:leading-[1.12]">
                Créateur de sites web &amp; d&apos;applications qui{" "}
                <span className="relative inline-block text-[#0060c3]">
                  convertissent
                  <span className="absolute -bottom-1 left-0 h-1 w-full bg-[#0060c3]/20 rounded-full" />
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#4b4b4b] sm:text-lg">
                Je conçois votre présence en ligne de A à Z avec un design soigné, du code propre et un{" "}
                <strong className="text-[#171717] font-bold">espace client dédié</strong> pour suivre l&apos;avancement, tester les maquettes et valider chaque étape en direct.
              </p>

              {/* Boutons d'action clairs & directs */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#0060c3] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-[#0060c3]/25 transition-all duration-200 hover:bg-[#0050a5] hover:-translate-y-0.5 active:scale-95 text-center"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Discuter sur WhatsApp</span>
                </a>

                <Link
                  href="/realisations"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#171717]/15 bg-white px-7 py-4 text-sm font-bold text-[#171717] transition-all hover:bg-[#f8f9fa] hover:border-[#171717]/30 hover:-translate-y-0.5 text-center"
                >
                  <span>Explorer les projets</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Métriques d'expérience réelles */}
              <div className="mt-10 grid grid-cols-3 gap-3 border-t border-[#171717]/8 pt-6">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#171717]">50+</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-[#4b4b4b]">
                    Projets livrés
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#171717]">4+ ans</span>
                    <span className="h-2 w-2 rounded-full bg-[#0060c3]" />
                  </div>
                  <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-[#4b4b4b]">
                    D&apos;expérience
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#0060c3]">92%</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0060c3]" />
                  </div>
                  <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-[#4b4b4b]">
                    Recommandation
                  </p>
                </div>
              </div>
            </div>

            {/* Colonne droite : Portrait & Carte Témoignage ancrée */}
            <div className="relative flex flex-col items-center">
              <div className="relative flex w-full justify-center">
                <Image
                  src="/media/nourou-portrait-transparent-2.png"
                  alt="Nourou Dine AMANDOU, créateur de sites web et applications"
                  width={680}
                  height={800}
                  priority
                  sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 300px"
                  className="relative z-10 h-[min(65vw,360px)] w-auto max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] sm:h-[400px] lg:h-[460px]"
                />
              </div>

              {/* Carte Témoignage réelle ancrée sur la photo (style Carlos Djanato) */}
              <div className="relative z-20 -mt-6 w-full max-w-md rounded-2xl border border-[#171717]/10 bg-white p-4 shadow-xl backdrop-blur-md sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0060c3]/10 font-black text-xs text-[#0060c3]">
                      AP
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#171717]">Asteria Properties</h3>
                      <p className="text-[10px] text-[#4b4b4b]">Immobilier de prestige</p>
                    </div>
                  </div>
                  <div className="flex text-[#f59e0b]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="mt-2.5 text-xs italic leading-relaxed text-[#4b4b4b]">
                  « Nourou a immédiatement compris notre exigence. Le site inspire une confiance instantanée et nos demandes qualifiées ont bondi de +140%. »
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bandeau de compétences & technologies maîtrisées (remplace les faux logos) */}
        <div className="mt-8 rounded-2xl border border-[#171717]/8 bg-[#f8f9fa] px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0060c3]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                Stack &amp; Technologies de pointe
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {stackItems.map((tech) => (
                <span
                  key={tech.name}
                  className="rounded-lg border border-[#171717]/8 bg-white px-3 py-1 text-xs font-bold text-[#171717] shadow-sm"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
