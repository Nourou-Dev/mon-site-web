import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Differentiation from "@/components/Differentiation";
import ClientSpace from "@/components/ClientSpace";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { CheckCircle2, Zap, ShieldCheck, Clock, Layers, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Tarifs — Nourou Dine AMANDOU",
  description:
    "Création de sites vitrines, landing pages, catalogues produits et refontes web sur mesure. Des prestations orientées conversion et crédibilité.",
};

const inclusions = [
  {
    icon: Sparkles,
    title: "Design 100% sur mesure",
    desc: "Aucun template générique : une identité visuelle unique conçue pour marquer l'esprit de vos prospects.",
  },
  {
    icon: Zap,
    title: "Optimisation mobile & vitesse",
    desc: "Un temps de chargement éclair et une interface fluide sur tous les smartphones et tablettes.",
  },
  {
    icon: Layers,
    title: "Espace client en direct",
    desc: "Suivez chaque étape, validez les aperçus et échangez en direct tout au long du projet.",
  },
  {
    icon: ShieldCheck,
    title: "Bases SEO & Sécurité",
    desc: "Structure conforme aux recommandations de Google (balisage, SSL, accessibilité, indexation).",
  },
  {
    icon: Clock,
    title: "Délais respectés",
    desc: "Un calendrier clair dès le premier échange avec des jalons précis pour chaque livrable.",
  },
  {
    icon: CheckCircle2,
    title: "Formation de prise en main",
    desc: "Une vidéo personnalisée pour gérer et modifier vos contenus en totale autonomie.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main id="contenu" className="pt-[5.5rem]">
        {/* En-tête de la page Services */}
        <section className="relative overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(0,96,195,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.03),transparent_20%)]" />

          <div className="relative mx-auto max-w-[1240px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
              <Layers className="h-3.5 w-3.5 text-[#0060c3]" />
              Prestations &amp; Formules
            </span>

            <h1 className="mx-auto mt-6 max-w-[900px] font-black tracking-[-0.07em] text-[#171717]">
              Des solutions web conçues pour faire grandir votre activité
            </h1>

            <p className="mx-auto mt-6 max-w-[650px] text-base leading-relaxed text-[#4b4b4b] sm:text-lg">
              Chaque projet est pensé pour valoriser votre expertise, inspirer confiance dès le premier coup d'œil et transformer vos visiteurs en clients fidèles.
            </p>
          </div>
        </section>

        {/* Grille des services */}
        <Services />

        {/* Ce qui est inclus dans chaque prestation */}
        <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-10 lg:p-14">
            <div className="mx-auto max-w-xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-[#0060c3]" />
                Standards d&apos;excellence
              </span>
              <h2 className="mt-5 font-black tracking-[-0.06em] text-[#171717]">
                Inclus systématiquement dans chaque formule
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-[#4b4b4b] sm:text-base">
                Aucun compromis sur la qualité : les bases techniques et stratégiques nécessaires pour garantir votre sérénité.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {inclusions.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-[1.4rem] border border-[#171717]/8 bg-white p-6 shadow-[0_10px_25px_rgba(21,20,27,0.02)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef5fc] text-[#0060c3]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-black tracking-[-0.04em] text-[#171717]">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4b4b4b]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Différenciation commerciale */}
        <Differentiation />

        {/* Le déroulement / méthode */}
        <ClientSpace />

        {/* Bénéfices concrets */}
        <Benefits />

        {/* FAQ prestations */}
        <FAQ />

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
