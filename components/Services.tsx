import Link from "next/link";
import { ArrowUpRight, Check, Code2, Globe, Layout, Layers, ShoppingBag, Sparkles } from "lucide-react";

const services = [
  {
    id: "vitrine",
    icon: Globe,
    title: "Sites vitrines sur-mesure",
    tagline: "Crédibilité immédiate & Image de marque premium",
    desc: "Un site conçu pour positionner votre entreprise au-dessus de vos concurrents, inspirer une confiance instantanée et transformer vos visiteurs en contacts qualifiés.",
    target: "PME, consultants, cabinets et entreprises de services",
    features: [
      "Design exclusif adapté à votre identité",
      "Structure persuasive pensée pour convertir",
      "Formulaire d'estimation & de pré-qualification",
      "Optimisation SEO local & vitesse de chargement",
    ],
    cta: "Créer un site vitrine",
  },
  {
    id: "landing",
    icon: Layout,
    title: "Landing pages de conversion",
    tagline: "Lancement d'offres & Génération de leads",
    desc: "Une page percutante et stratégique conçue pour focaliser l'attention sur votre offre, éliminer les hésitations et inciter à l'action immédiate.",
    target: "Startups, formateurs, lancements de produits & événements",
    features: [
      "Copywriting orienté bénéfices & ROI",
      "Intégration d'agenda Calendly / WhatsApp",
      "Tunnel de réservation ou capture d'e-mails",
      "A/B testing ready & score PageSpeed 95+",
    ],
    cta: "Lancer une landing page",
  },
  {
    id: "app",
    icon: Code2,
    title: "Applications web & Portails",
    tagline: "Espaces membres, SaaS & Tableaux de bord",
    desc: "Développement d'outils interactifs sur-mesure pour automatiser vos processus, fidéliser vos clients ou lancer votre produit numérique.",
    target: "Académies, plateformes B2B, entreprises en croissance",
    features: [
      "Authentification sécurisée & gestion des rôles",
      "Base de données relationnelle performante",
      "Tableau de bord de suivi & statistiques",
      "APIs & intégrations de passerelles de paiement",
    ],
    cta: "Développer mon application",
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: "Boutiques & Catalogues WhatsApp",
    tagline: "Vente directe sans friction sur mobile",
    desc: "Un catalogue rapide et séduisant permettant à vos clients de commander en 1 clic directement sur WhatsApp sans barrière d'inscription.",
    target: "Marques e-commerce, boutiques physiques & créateurs",
    features: [
      "Catalogue mobile ultra-rapide avec filtres",
      "Bouton 'Commander sur WhatsApp' pré-rempli",
      "Gestion simplifiée des stocks et prix",
      "Zéro commission prélevée sur vos ventes",
    ],
    cta: "Créer ma boutique WhatsApp",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-[5.5rem] bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        {/* En-tête de section */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0060c3]/20 bg-[#0060c3]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0060c3]">
            <Layers className="h-3.5 w-3.5" />
            Solutions sur-mesure
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-[#171717] sm:text-4xl lg:text-5xl">
            Ce que je conçois pour votre activité
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4b4b4b] sm:text-lg">
            Chaque projet est traité comme une pièce d&apos;artisanat : aucune solution générique, aucun template préfabriqué. Uniquement des outils conçus pour vos objectifs.
          </p>
        </div>

        {/* Grille des 4 solutions */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((srv) => {
            const Icon = srv.icon;

            return (
              <div
                key={srv.id}
                className="group flex flex-col justify-between rounded-3xl border border-[#171717]/10 bg-[#fbfcfd] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0060c3]/30 hover:bg-white hover:shadow-xl sm:p-7"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0060c3]/10 text-[#0060c3] transition-colors group-hover:bg-[#0060c3] group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-xl font-black tracking-tight text-[#171717]">
                    {srv.title}
                  </h3>

                  <p className="mt-1 text-xs font-bold text-[#0060c3]">
                    {srv.tagline}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-[#4b4b4b] sm:text-sm">
                    {srv.desc}
                  </p>

                  <div className="mt-5 border-t border-[#171717]/8 pt-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4b4b4b]">
                      Idéal pour :
                    </span>
                    <p className="text-xs font-semibold text-[#171717] mt-0.5">
                      {srv.target}
                    </p>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-[#4b4b4b]">
                    {srv.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-[#0060c3] shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-[#171717]/8">
                  <Link
                    href={`/contact?service=${srv.id}`}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white border border-[#171717]/12 px-4 py-2.5 text-xs font-bold text-[#171717] transition-all group-hover:bg-[#0060c3] group-hover:text-white group-hover:border-[#0060c3] shadow-sm"
                  >
                    <span>{srv.cta}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
