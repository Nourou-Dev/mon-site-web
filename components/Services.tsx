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
    <section id="services" className="relative w-full bg-[#fbf9f5] py-20 sm:py-28 lg:py-32 border-b border-[#171717]/8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#171717]/10">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6b7280]">
              [ 04 / SERVICES &amp; EXPERTISE ]
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#171717] max-w-[680px]">
              Des prestations précises, conçues pour accélérer votre croissance.
            </h2>
          </div>
          <p className="max-w-[380px] text-sm text-[#4b5563] leading-relaxed">
            Pas de formules opaques ni de frais cachés. Chaque prestation répond à un objectif clair avec un tarif et un calendrier transparents.
          </p>
        </div>

        {/* Grille des services architecturale */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.num}
              className="flex flex-col justify-between rounded-3xl border border-[#171717]/10 bg-white p-7 sm:p-9 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#171717]/8 text-xs font-mono">
                  <span className="font-bold text-[#171717]">[ {service.num} ]</span>
                  <span className="uppercase text-[#6b7280]">{service.tag}</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
                    {service.delay}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171717]">
                  {service.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm font-medium text-[#0052a3]">
                  {service.subtitle}
                </p>

                <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#4b5563]">
                  {service.desc}
                </p>

                {/* Livrables inclus */}
                <div className="mt-6 pt-5 border-t border-[#171717]/8">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717] mb-3">
                    Inclus dans l&apos;accompagnement :
                  </p>
                  <ul className="space-y-2">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-[#374151]">
                        <Check className="h-3.5 w-3.5 text-emerald-600 mt-0.5 shrink-0" strokeWidth={2.5} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bouton d'action */}
              <div className="mt-8 pt-5 border-t border-[#171717]/8 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#2b2b2b] transition-all"
                >
                  <span>{service.cta}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-[11px] font-mono text-[#6b7280]">
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
