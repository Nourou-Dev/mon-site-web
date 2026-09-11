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
  screenshots?: string[];
  preview_url?: string;
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
    category: "Sites vitrines",
    year: "2024",
    duration: "4 semaines",
    impact: "+140% de demandes qualifiées",
    desc: "Refonte complète du site vitrine d'une agence immobilière haut de gamme avec présentation immersive des biens et formulaire de contact stratégique.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    screenshots: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=85",
    ],
    preview_url: "https://asteria-properties.ch",
    tags: ["Site vitrine", "WordPress", "UI/UX Design"],
    tools: ["Figma", "WordPress", "Elementor", "Photoshop", "SEO"],
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
    category: "Applications & SaaS",
    year: "2024",
    duration: "3 semaines",
    impact: "Taux de conversion x2.2",
    desc: "Conception d'une landing page et web application épurée pour le lancement d'un SaaS B2B, optimisée pour la conversion et la réservation de démos.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    screenshots: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    ],
    preview_url: "https://northlane.tech",
    tags: ["Landing page", "Next.js", "TypeScript"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
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
    slug: "techflow-academy",
    title: "TechFlow Academy",
    client: "TechFlow International",
    category: "Applications & SaaS",
    year: "2024",
    duration: "6 semaines",
    impact: "+350 apprenants inscrits",
    desc: "Plateforme d'apprentissage en ligne (LMS) pour former les professionnels aux métiers du numérique avec espace membre interactif et suivi de progression.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
    screenshots: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=85",
    ],
    preview_url: "https://techflow-academy.com",
    tags: ["Application web", "LMS", "E-learning"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Figma"],
    challenge:
      "La structure devait gérer des centaines d'étudiants avec des vidéos sécurisées, des quiz automatisés et une délivrance instantanée d'attestations.",
    solution:
      "Conception d'une application Next.js ultra-rapide connectée à une base de données relationnelle, avec tableau de bord étudiant réactif et passerelle de paiement automatisée.",
    results: [
      { metric: "350+", label: "Inscrits dès la session pilote" },
      { metric: "99.8%", label: "Uptime de la plateforme" },
      { metric: "< 0.8s", label: "Temps de chargement des cours" },
    ],
    testimonial: {
      quote:
        "L'ergonomie de l'espace étudiant a réduit de moitié les sollicitations de notre support. Les apprenants adorent la fluidité du parcours.",
      author: "Drissa K.",
      role: "Responsable Pédagogique · TechFlow",
    },
    features: [
      "Espace membre sécurisé avec authentification moderne",
      "Lecteur vidéo fluide avec reprise automatique de lecture",
      "Système de quiz interactifs avec notation instantanée",
      "Génération automatique d'attestations PDF personnalisées",
    ],
  },
  {
    slug: "maison-7",
    title: "Maison 7",
    client: "Maison 7 Studio",
    category: "Portfolios & Agences",
    year: "2023",
    duration: "5 semaines",
    impact: "+85% de demandes de projets",
    desc: "Mise en scène visuelle de réalisations architecturales haut de gamme avec galeries photos haute définition et navigation immersive.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    screenshots: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    ],
    preview_url: "https://maison7-studio.fr",
    tags: ["Portfolio", "Branding", "SEO Local"],
    tools: ["WordPress", "Illustrator", "Photoshop", "SEO"],
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
    slug: "orion-logistique",
    title: "Orion Logistique",
    client: "Groupe Orion Transport",
    category: "Applications & SaaS",
    year: "2024",
    duration: "5 semaines",
    impact: "-60% d'appels au standard",
    desc: "Portail de suivi d'expéditions et de cotations de fret en temps réel avec interface client intuitive et tableau de bord dispatchers.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
    screenshots: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=85",
    ],
    preview_url: "https://orion-logistics.net",
    tags: ["Application web", "Logistique", "API"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Figma"],
    challenge:
      "Les clients appelaient quotidiennement pour connaître le statut de leurs conteneurs, saturant le standard et le service client.",
    solution:
      "Création d'un module de tracking par numéro de connaissement (B/L) et d'un simulateur de devis de fret instantané.",
    results: [
      { metric: "-60%", label: "Appels répétitifs au standard" },
      { metric: "24/7", label: "Disponibilité du tracking en temps réel" },
      { metric: "+40%", label: "Demandes de cotation en ligne" },
    ],
    testimonial: {
      quote:
        "Un outil indispensable à notre croissance. Nos partenaires apprécient l'autonomie totale pour suivre leurs cargaisons sans attendre.",
      author: "Armand T.",
      role: "Directeur des Opérations · Orion",
    },
    features: [
      "Recherche instantanée de conteneurs et expéditions",
      "Simulateur de coût de transport maritime et aérien",
      "Notifications automatiques d'étapes d'acheminement",
      "Tableau de bord d'administration pour les gestionnaires",
    ],
  },
  {
    slug: "luna-studio",
    title: "Luna Studio",
    client: "Collectif Luna",
    category: "Portfolios & Agences",
    year: "2023",
    duration: "3 semaines",
    impact: "Temps sur site +80%",
    desc: "Identité visuelle et site portfolio interactif reflétant l'audace et l'exigence esthétique d'un collectif créatif et média.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85",
    screenshots: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=85",
    ],
    preview_url: "https://luna-studio.agency",
    tags: ["Portfolio", "Direction artistique", "Motion"],
    tools: ["Next.js", "Tailwind CSS", "Figma", "Motion"],
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
      "Navigation fluide avec transitions soignées",
      "Lecteur multimédia intégré pour showreels et teasers",
      "Grille de projets modulable avec filtres interactifs",
      "Formulaire de brief créatif étape par étape",
    ],
  },
  {
    slug: "nova-commerce",
    title: "Nova Commerce",
    client: "Nova Boutique",
    category: "E-commerce & WhatsApp",
    year: "2024",
    duration: "3 semaines",
    impact: "+210 commandes WhatsApp",
    desc: "Boutique en ligne avec catalogue optimisé pour mobile et commande directe sur WhatsApp en un clic.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
    screenshots: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85",
    ],
    preview_url: "https://nova-boutique.store",
    tags: ["E-commerce", "Catalogue", "WhatsApp API"],
    tools: ["WordPress", "WhatsApp API", "Figma", "Photoshop"],
    challenge:
      "La marque vendait exclusivement par messages privés Instagram, ce qui générait des pertes de temps considérables pour répondre aux questions de prix, de tailles et de stock.",
    solution:
      "Mise en place d'un catalogue produit ultra-rapide sur mobile, avec boutons 'Commander sur WhatsApp' préremplissant le message avec le nom du produit, la référence et le tarif.",
    results: [
      { metric: "+210", label: "Commandes confirmées dès le 1er mois" },
      { metric: "-70%", label: "De temps passé en échanges répétitifs" },
      { metric: "100%", label: "Consultable sans inscription préalable" },
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
    category: "Sites vitrines",
    year: "2023",
    duration: "4 semaines",
    impact: "Prise de RDV qualifiés x3",
    desc: "Site corporate pour un cabinet de conseil : clarté des offres, profils d'experts et prise de rendez-vous en ligne.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
    ],
    preview_url: "https://leveil-conseil.com",
    tags: ["Site corporate", "Prise de RDV", "B2B"],
    tools: ["WordPress", "Figma", "InDesign", "SEO"],
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
