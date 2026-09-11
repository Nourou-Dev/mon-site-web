import Link from "next/link";
import { ArrowUpRight, Check, Compass, ShoppingBag, Terminal, Sparkles } from "lucide-react";

const SERVICES_LIST = [
  {
    num: "01",
    tag: "Présence & Image",
    title: "Site Vitrine d'Exception",
    subtitle: "Pour asseoir votre autorité et séduire une clientèle exigeante.",
    desc: "Conception complète d'un site sur mesure : typographie distinctive, parcours utilisateur sans friction, optimisation mobile irréprochable et rédaction stratégique.",
    deliverables: [
      "Direction artistique exclusive sur Figma",
      "Développement Next.js 14 & Tailwind ultra-rapide",
      "Intégration d'un formulaire de contact qualifié",
      "Optimisation SEO technique complète",
      "Score Google PageSpeed 95-100 garanti",
    ],
    delay: "2 à 3 semaines",
    cta: "Créer un site vitrine",
  },
  {
    num: "02",
    tag: "Commerce & Vente",
    title: "Boutique E-Commerce",
    subtitle: "Pour transformer vos visiteurs en acheteurs fidèles.",
    desc: "Boutique en ligne moderne, rapide et optimisée pour la conversion. Gestion simplifiée des stocks, catalogue fluide, paiement sécurisé et commande directe WhatsApp.",
    deliverables: [
      "Catalogue produits interactif & filtres instantanés",
      "Paiement CB / Mobile Money sécurisé",
      "Intégration WhatsApp Business pour commandes",
      "Fiches produits optimisées pour l'achat mobile",
      "Panier d'achat sans friction d'inscription",
    ],
    delay: "3 à 4 semaines",
    cta: "Lancer mon e-commerce",
  },
  {
    num: "03",
    tag: "Outils & Métier",
    title: "Application Web & Espace Métier",
    subtitle: "Pour digitaliser vos processus et automatiser votre gestion.",
    desc: "Portails clients, tableaux de bord interactifs et outils de gestion sur mesure avec authentification sécurisée et base de données relationnelle en direct.",
    deliverables: [
      "Architecture full-stack PostgreSQL & Prisma ORM",
      "Authentification isolée Client & Administrateur",
      "Messagerie directe et gestion de documents",
      "Tableaux de bord analytiques interactifs",
      "API sécurisées et conformité RGPD",
    ],
    delay: "4 à 6 semaines",
    cta: "Développer une application",
  },
  {
    num: "04",
    tag: "Modernisation",
    title: "Refonte & Performance Extrême",
    subtitle: "Pour redonner vie à un site existant qui ne vend plus.",
    desc: "Audit approfondi de votre site actuel, refonte graphique complète, migration vers les technologies modernes et accélération drastique des temps de chargement.",
    deliverables: [
      "Audit ergonomique, SEO et performance",
      "Nouvelle identité visuelle moderne et épurée",
      "Migration de WordPress ou vieux frameworks vers Next.js",
      "Réduction du temps de chargement sous 1 seconde",
      "Préservation intégrale de votre référencement Google",
    ],
    delay: "2 à 3 semaines",
    cta: "Moderniser mon site",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative w-full bg-[#F6F4EF] py-20 sm:py-28 lg:py-32 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#C9C4B8]">
          <div>
            <span className="text-xs font-mono text-[#4B4D54]">
              04 / Savoir-faire &amp; prestations
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1B1D22] max-w-[680px]">
              Des prestations précises, conçues pour accélérer votre croissance.
            </h2>
          </div>
          <p className="max-w-[380px] text-sm text-[#4B4D54] leading-relaxed font-light">
            Pas de formules opaques ni de frais cachés. Chaque prestation répond à un objectif clair avec un tarif et un calendrier transparents.
          </p>
        </div>

        {/* Grille des services architecturale */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.num}
              className="flex flex-col justify-between rounded-2xl border border-[#C9C4B8] bg-white p-7 sm:p-9 shadow-2xs hover:border-[#1B1D22]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#C9C4B8]/50 text-xs font-mono">
                  <span className="text-[#1B1D22] font-semibold">{service.num}</span>
                  <span className="text-[#4B4D54]">{service.tag}</span>
                  <span className="text-[#1B1D22] bg-[#F6F4EF] border border-[#C9C4B8] px-2 py-0.5 rounded-full font-mono text-[11px]">
                    {service.delay}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl sm:text-3xl font-light tracking-tight text-[#1B1D22]">
                  {service.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-medium text-[#3D5AFE]">
                  {service.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#4B4D54] font-light">
                  {service.desc}
                </p>

                {/* Livrables inclus */}
                <div className="mt-6 pt-5 border-t border-[#C9C4B8]/40">
                  <p className="text-xs font-mono text-[#1B1D22] mb-3">
                    Inclus dans l&apos;accompagnement :
                  </p>
                  <ul className="space-y-2">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-[#4B4D54]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#3D5AFE] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bouton d'action sans flèche */}
              <div className="mt-8 pt-5 border-t border-[#C9C4B8]/40 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#1B1D22] px-6 py-2.5 text-xs font-medium text-[#F6F4EF] shadow-2xs hover:bg-[#3D5AFE] transition-all"
                >
                  <span>{service.cta}</span>
                </Link>
                <span className="text-xs font-mono text-[#4B4D54]">
                  Devis clair sous 24h
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
