export interface ProjectItem {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  duration: string;
  impact: string;
  desc: string;
  image: string;
  tags: string[];
  tools: string[];
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  features: string[];
}

export const allProjects: ProjectItem[] = [
  {
    slug: "asteria",
    title: "Asteria",
    client: "Asteria Properties",
    category: "Immobilier de prestige",
    year: "2024",
    duration: "4 semaines",
    impact: "+140% de demandes qualifiées",
    desc: "Refonte complète du site vitrine d'une agence immobilière haut de gamme avec présentation immersive des biens et formulaire de contact stratégique.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    tags: ["Site vitrine", "WordPress", "UI/UX Design"],
    tools: ["Figma", "WordPress", "Elementor", "Photoshop"],
    challenge:
      "L'agence disposait d'un site vieillissant qui ne reflétait pas le standing de ses villas et appartements exclusifs. Les visiteurs peinaient à trouver les critères essentiels et abandonnaient sans prendre contact.",
    solution:
      "Création d'une identité visuelle épurée, architecture de navigation orientée vers la découverte visuelle des biens, fiches propriétés ultra-lisibles et formulaire de pré-qualification des acheteurs.",
    results: [
      { metric: "+140%", label: "Demandes de visite qualifiées" },
      { metric: "2.4x", label: "Temps passé sur les fiches biens" },
      { metric: "< 1.2s", label: "Temps de chargement sur mobile" },
    ],
    testimonial: {
      quote:
        "Nourou a immédiatement saisi l'exigence de notre clientèle. Le site inspire une confiance instantanée et nos mandats exclusifs sont enfin valorisés à leur juste niveau.",
      author: "Marc de B.",
      role: "Directeur Associé · Asteria",
    },
    features: [
      "Filtres de recherche intuitifs par localisation, type et budget",
      "Galeries photos plein écran optimisées pour la 4K",
      "Formulaire d'estimation de bien avec qualification automatique",
      "Optimisation mobile irréprochable pour les consultations nomades",
    ],
  },
  {
    slug: "northlane",
    title: "Northlane",
    client: "Northlane Technologies",
    category: "Startup & B2B SaaS",
    year: "2024",
    duration: "3 semaines",
    impact: "Taux de conversion x2.2",
    desc: "Conception d'une landing page épurée pour le lancement d'une solution de gestion d'entreprise, optimisée pour la vitesse et la génération de démos.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    tags: ["Landing page", "Next.js", "Copywriting"],
    tools: ["Next.js", "Figma", "Tailwind CSS", "TypeScript"],
    challenge:
      "La proposition de valeur du logiciel était trop technique et complexe. Les décideurs B2B ne comprenaient pas en quoi la solution leur faisait gagner du temps et quittaient la page sans réserver de démo.",
    solution:
      "Refonte intégrale du copywriting pour se concentrer sur les bénéfices concrets pour les dirigeants, intégration de micro-animations explicatives et mise en place d'un tunnel de réservation de démo fluide.",
    results: [
      { metric: "x2.2", label: "Taux de conversion des démos" },
      { metric: "98/100", label: "Score Google PageSpeed" },
      { metric: "-45%", label: "Taux de rebond dès la première semaine" },
    ],
    testimonial: {
      quote:
        "La clarté du message a tout changé. Nos prospects arrivent désormais en démonstration en ayant déjà parfaitement compris la valeur de notre solution.",
      author: "Sébastien L.",
      role: "Fondateur & CEO · Northlane",
    },
    features: [
      "Copywriting orienté bénéfices clients & ROI",
      "Démonstrateur visuel interactif des fonctionnalités",
      "Intégration directe d'agenda Calendly / Cal.com",
      "Architecture Next.js statique pour un affichage instantané",
    ],
  },
  {
    slug: "maison-7",
    title: "Maison 7",
    client: "Maison 7 Studio",
    category: "Architecture & Intérieur",
    year: "2023",
    duration: "5 semaines",
    impact: "Image de marque premium & +85% de contacts",
    desc: "Mise en scène visuelle de réalisations architecturales avec galeries photos haute définition et navigation intuitive.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    tags: ["Portfolio", "Branding", "SEO Local"],
    tools: ["Illustrator", "WordPress", "Photoshop", "InDesign"],
    challenge:
      "Le studio manquait d'une vitrine capable de rendre hommage à la minutie de ses réalisations haut de gamme. Les photos étaient mal mises en valeur et le site n'attirait pas de chantiers privés d'envergure.",
    solution:
      "Design d'un écrin minimaliste mettant la photographie au premier plan, typographies raffinées, études de cas détaillées pour chaque chantier et optimisation pour le référencement local.",
    results: [
      { metric: "+85%", label: "Demandes de projets de rénovation" },
      { metric: "Top 3", label: "Position Google sur les mots-clés locaux" },
      { metric: "100%", label: "Autonomie pour publier de nouveaux chantiers" },
    ],
    testimonial: {
      quote:
        "Nos clients nous complimentent régulièrement sur le site. Il reflète exactement la rigueur et l'élégance que nous insufflons dans chaque espace.",
      author: "Camille R.",
      role: "Architecte d'Intérieur · Maison 7",
    },
    features: [
      "Présentation 'Avant / Après' interactive des rénovations",
      "Fiches chantiers détaillant matériaux, surface et démarche",
      "Espace presse et publication de dossiers d'architecture",
      "SEO local ciblé pour capter des projets à fort budget",
    ],
  },
  {
    slug: "luna-studio",
    title: "Luna Studio",
    client: "Collectif Luna",
    category: "Agence Créative & Média",
    year: "2023",
    duration: "3 semaines",
    impact: "Temps sur site +80%",
    desc: "Identité visuelle et site vitrine moderne reflétant l'audace et l'exigence esthétique d'un collectif de créatifs.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85",
    tags: ["Direction artistique", "Web design", "Motion"],
    tools: ["Figma", "Affinity", "Tailwind CSS", "Next.js"],
    challenge:
      "L'agence voulait rompre avec les templates standards d'agences et affirmer une présence mémorable, audacieuse mais parfaitement accessible et lisible.",
    solution:
      "Création d'une identité graphique sur-mesure, typographies audacieuses, micro-interactions soignées et présentation vivante des campagnes publicitaires et shootings.",
    results: [
      { metric: "+80%", label: "Temps moyen passé sur le site" },
      { metric: "x3", label: "Candidatures de talents créatifs" },
      { metric: "0 bug", label: "Compatibilité cross-browser et mobile" },
    ],
    testimonial: {
      quote:
        "Nourou a réussi l'équilibre parfait entre créativité osée et efficacité commerciale. Le portfolio claque tout simplement.",
      author: "Julien V.",
      role: "Directeur Créatif · Luna Studio",
    },
    features: [
      "Navigation fluide avec transitions de pages",
      "Lecteur vidéo intégré pour showreels et teasers",
      "Grille de projets modulable avec filtres par discipline",
      "Formulaire de brief créatif étape par étape",
    ],
  },
  {
    slug: "nova-commerce",
    title: "Nova Commerce",
    client: "Nova Boutique",
    category: "Catalogue & Vente",
    year: "2024",
    duration: "3 semaines",
    impact: "+210 commandes directes WhatsApp",
    desc: "Boutique en ligne avec catalogue optimisé pour mobile et commande directe sur WhatsApp en un clic.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
    tags: ["Catalogue", "WhatsApp API", "E-commerce"],
    tools: ["Figma", "WordPress", "WhatsApp Business", "Photoshop"],
    challenge:
      "La marque vendait exclusivement par messages privés Instagram, ce qui générait des pertes de temps considérables pour répondre aux questions de prix, de tailles et de stock.",
    solution:
      "Mise en place d'un catalogue produit ultra-rapide sur mobile, avec boutons 'Commander sur WhatsApp' préremplissant le message avec le nom du produit, la référence et le tarif.",
    results: [
      { metric: "+210", label: "Commandes confirmées dès le 1er mois" },
      { metric: "-70%", label: "De temps passé en échanges répétitifs" },
      { metric: "100%", label: "Consultable sans inscription" },
    ],
    testimonial: {
      quote:
        "C'est exactement ce qu'il nous fallait. Les clients voient tout le catalogue, choisissent et nous envoient leur commande prête sur WhatsApp. C'est un gain de temps magique.",
      author: "Mariam D.",
      role: "Fondatrice · Nova Boutique",
    },
    features: [
      "Catalogue par catégories avec recherche instantanée",
      "Bouton WhatsApp dynamique avec message pré-formaté",
      "Fiches produits détaillées avec zoom et guides des tailles",
      "Back-office simplifié pour ajouter des nouveautés en 2 minutes",
    ],
  },
  {
    slug: "leveil-co",
    title: "Léveil & Co",
    client: "Cabinet Léveil",
    category: "Conseil & Finance",
    year: "2023",
    duration: "4 semaines",
    impact: "Prise de RDV qualifiés x3",
    desc: "Site corporate pour un cabinet de conseil : clarté des offres, profils d'experts et prise de rendez-vous en ligne.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    tags: ["Site corporate", "Prise de RDV", "B2B"],
    tools: ["WordPress", "InDesign", "Figma", "Illustrator"],
    challenge:
      "Le cabinet souffrait d'un site trop institutionnel et austère qui n'expliquait pas clairement les différentes formules d'accompagnement et n'incitait pas à la prise de contact.",
    solution:
      "Architecture de persuasion claire, présentation des offres par profil client (PME, grands comptes, dirigeants), mise en avant des consultants et prise de RDV automatique.",
    results: [
      { metric: "x3", label: "Rendez-vous stratégiques réservés" },
      { metric: "+65%", label: "Téléchargements de plaquettes d'offres" },
      { metric: "100%", label: "Synchronisation avec l'agenda Google/Outlook" },
    ],
    testimonial: {
      quote:
        "Un travail d'une grande rigueur. La clarté du site a immédiatement élevé la perception de notre cabinet auprès des directions générales.",
      author: "Hervé L.",
      role: "Associé Gérant · Léveil & Co",
    },
    features: [
      "Packs d'accompagnement détaillés et transparents",
      "Module de réservation d'audit préliminaire de 30 min",
      "Section actualités & analyses économiques téléchargeables",
      "Conformité RGPD et sécurité renforcée",
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectItem | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getAllProjects(): ProjectItem[] {
  return allProjects;
}
