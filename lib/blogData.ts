export interface BlogSection {
  id: string;
  title: string;
  content: string[];
  subsections?: { title: string; text: string }[];
  quote?: string;
  callout?: {
    type: "tip" | "warning" | "info";
    title: string;
    text: string;
  };
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  isoDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  intro: string;
  tableOfContents: { id: string; title: string }[];
  sections: BlogSection[];
  keyTakeaways: string[];
  tags: string[];
  relatedSlugs: string[];
}

export const allArticles: BlogArticle[] = [
  {
    slug: "pourquoi-votre-site-ne-convertit-pas",
    title: "Pourquoi 80% des sites vitrines ne génèrent aucun client (et comment y remédier)",
    excerpt:
      "Avoir un joli site ne suffit plus. Découvrez les 5 erreurs fondamentales qui bloquent la conversion de vos visiteurs et les correctifs immédiats pour transformer vos visites en demandes réelles.",
    category: "Stratégie",
    date: "10 Septembre 2024",
    isoDate: "2024-09-10",
    readTime: "6 min de lecture",
    author: {
      name: "Nourou Dine AMANDOU",
      role: "Designer & Développeur Web Stratégique",
      avatar: "/media/nourou-portrait-transparent.png",
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
    intro:
      "Combien de prospects visitent votre site chaque semaine sans jamais remplir votre formulaire de contact, réserver un créneau ou vous écrire sur WhatsApp ? La majorité des entrepreneurs investissent dans un site sans comprendre qu'un site n'est pas une simple carte de visite numérique, mais un système d'acquisition et de persuasion.",
    tableOfContents: [
      { id: "probleme-clarte", title: "1. Le syndrome du message flou en 3 secondes" },
      { id: "offre-sans-preuve", title: "2. Une offre générique sans réassurance concrète" },
      { id: "chemins-conversion", title: "3. Trop d'options et aucun appel à l'action clair" },
      { id: "experience-mobile", title: "4. Une version mobile lente ou mal pensée" },
      { id: "plan-action", title: "5. Le plan d'action pour débloquer vos conversions" },
    ],
    sections: [
      {
        id: "probleme-clarte",
        title: "1. Le syndrome du message flou en 3 secondes",
        content: [
          "Lorsqu'un prospect atterrit sur votre page d'accueil, son cerveau prend une décision quasi-instantanée : 'Suis-je au bon endroit ? Cette personne comprend-elle mon problème ?'.",
          "Si votre titre principal ressemble à 'Bienvenue chez nous, l'excellence à votre service' ou 'Solutions innovantes pour votre futur', vous perdez immédiatement 60% de vos visiteurs. Ces formules creuses ne disent ni ce que vous faites, ni à qui vous vous adressez, ni quel bénéfice tangible vous apportez.",
        ],
        callout: {
          type: "tip",
          title: "La règle du test du café",
          text: "Un enfant de 10 ans ou une personne pressée devant la machine à café doit comprendre en lisant votre premier écran ce que vous vendez et pour qui.",
        },
      },
      {
        id: "offre-sans-preuve",
        title: "2. Une offre générique sans réassurance concrète",
        content: [
          "Sur Internet, la méfiance est le mode par défaut. Vos visiteurs ont déjà été déçus par des prestataires peu scrupuleux ou des promesses non tenues. Pourquoi vous croiraient-ils sur parole ?",
          "Un site qui convertit ne se contente pas de dire 'nous sommes professionnels'. Il le prouve à chaque étape avec des études de cas détaillées, des captures d'écran, des chiffres vérifiables et des témoignages authentiques mentionnant le nom, le rôle et le résultat obtenu par les clients.",
        ],
        quote: "Les gens n'achètent pas ce que vous faites, ils achètent la certitude que vous allez résoudre leur problème sans mauvaise surprise.",
      },
      {
        id: "chemins-conversion",
        title: "3. Trop d'options et aucun appel à l'action clair",
        content: [
          "Le paradoxe du choix de Barry Schwartz s'applique parfaitement au web design : plus vous offrez d'options simultanées à un visiteur, moins il a de chances de passer à l'action.",
          "Si votre menu propose 12 liens, que votre bas de page a 5 boutons d'actions contradictoires (newsletter, devis, chat, portfolio, réseaux sociaux), le prospect s'éparpille et quitte la page. Chaque page de votre site doit avoir un objectif principal unique et sans équivoque.",
        ],
        subsections: [
          {
            title: "Le bouton principal omniprésent",
            text: "Votre appel à l'action stratégique (ex: 'Réserver un appel' ou 'Demander un devis') doit être visible en haut à droite, au milieu de la page d'accueil et en bas de chaque page.",
          },
          {
            title: "Réduire les champs de formulaire",
            text: "Chaque champ supplémentaire dans un formulaire fait chuter le taux de soumission de 10 à 15%. Demandez le strict minimum : nom, contact, besoin.",
          },
        ],
      },
      {
        id: "experience-mobile",
        title: "4. Une version mobile lente ou mal pensée",
        content: [
          "Plus de 70% des premières consultations se font aujourd'hui sur smartphone. Pourtant, beaucoup de sites restent conçus d'abord pour des grands écrans d'ordinateurs et simplement 'compressés' pour mobile.",
          "Des textes trop petits, des boutons collés les uns aux autres où l'on clique par erreur, ou un temps de chargement supérieur à 3 secondes provoquent une fuite immédiate de vos prospects vers la concurrence.",
        ],
        callout: {
          type: "warning",
          title: "Impact du temps de chargement",
          text: "Google a mesuré qu'une seconde de latence supplémentaire sur mobile réduit la conversion de 20%. La performance technique est un levier direct de rentabilité.",
        },
      },
      {
        id: "plan-action",
        title: "5. Le plan d'action pour débloquer vos conversions",
        content: [
          "Pour inverser la tendance dès cette semaine, commencez par réécrire votre en-tête avec une proposition de valeur limpide. Ensuite, supprimez les informations superflues et concentrez votre parcours sur vos réalisations concrètes.",
          "Enfin, offrez un canal direct de contact comme WhatsApp ou un calendrier en ligne pour réduire le délai de prise en charge et engager la conversation pendant que le prospect est chaud.",
        ],
      },
    ],
    keyTakeaways: [
      "Clarifiez votre proposition de valeur en moins de 3 secondes sur l'écran d'accueil.",
      "Présentez des preuves tangibles plutôt que des déclarations d'intention vagues.",
      "Définissez un objectif de conversion prioritaire par page.",
      "Testez et optimisez votre expérience sur smartphone avant toute autre chose.",
      "Réduisez les étapes et les frictions pour entrer en contact avec vous.",
    ],
    tags: ["Conversion", "Copywriting", "UX Design", "Stratégie Web"],
    relatedSlugs: [
      "elements-indispensables-page-accueil-efficace",
      "identite-visuelle-coherente-et-memorable",
      "integrer-whatsapp-catalogue-produits",
    ],
  },
  {
    slug: "identite-visuelle-coherente-et-memorable",
    title: "Les fondations d’une identité visuelle cohérente et mémorable",
    excerpt:
      "Une méthode étape par étape pour accorder typographies, palettes de couleurs et imagerie autour d’un positionnement premium qui inspire confiance au premier coup d’œil.",
    category: "Design & Image",
    date: "28 Août 2024",
    isoDate: "2024-08-28",
    readTime: "5 min de lecture",
    author: {
      name: "Nourou Dine AMANDOU",
      role: "Designer & Développeur Web Stratégique",
      avatar: "/media/nourou-portrait-transparent.png",
    },
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85",
    intro:
      "Votre identité visuelle est le premier signal silencieux que perçoit votre client. Avant même d'avoir lu une seule phrase, il a déjà ressenti le degré de sérieux, de maturité et d'élégance de votre entreprise. Construire une image de marque cohérente ne s'improvise pas.",
    tableOfContents: [
      { id: "regle-trois-couleurs", title: "1. La règle des 3 couleurs et de la hiérarchie visuelle" },
      { id: "typographies-caractere", title: "2. Choisir des typographies qui racontent une histoire" },
      { id: "coherence-iconographie", title: "3. Photographie et iconographie sur mesure" },
      { id: "guide-style-system", title: "4. Pourquoi formaliser un mini-design system" },
    ],
    sections: [
      {
        id: "regle-trois-couleurs",
        title: "1. La règle des 3 couleurs et de la hiérarchie visuelle",
        content: [
          "L'erreur la plus fréquente consiste à multiplier les teintes vives sans ligne directrice. Le résultat crée une cacophonie visuelle qui distrait l'œil et décrédibilise l'offre.",
          "Une palette professionnelle s'organise selon la règle 60-30-10 : 60% d'une teinte dominante neutre (blanc pur, gris très doux, noir profond), 30% d'une couleur secondaire de structure, et seulement 10% d'une couleur d'accent vive réservée aux boutons d'action et aux éléments cruciaux.",
        ],
      },
      {
        id: "typographies-caractere",
        title: "2. Choisir des typographies qui racontent une histoire",
        content: [
          "Les polices de caractères véhiculent une émotion immédiate. Une typographie géométrique sans empattement évoque la modernité et l'innovation technique, tandis qu'une sérif raffinée inspire le luxe, le patrimoine ou la haute précision.",
          "Limitez-vous à deux familles complémentaires : une pour vos titres percutants, et une ultra-lisible pour vos paragraphes de lecture.",
        ],
      },
      {
        id: "coherence-iconographie",
        title: "3. Photographie et iconographie sur mesure",
        content: [
          "Rien ne détruit plus vite la confiance qu'une photo de stock générique avec des mannequins souriant artificiellement dans une salle de réunion aseptisée.",
          "Privilégiez de véritables photos de votre équipe, de vos locaux ou de vos réalisations. Si vous utilisez des banques d'images, appliquez un traitement colorimétrique uniforme pour préserver l'harmonie globale.",
        ],
      },
      {
        id: "guide-style-system",
        title: "4. Pourquoi formaliser un mini-design system",
        content: [
          "Avoir un logo ne fait pas une marque. Un design system définit les espacements récurrents, les arrondis de boutons, les ombres douces et les déclinaisons graphiques pour que votre site, vos devis PDF et vos réseaux sociaux partagent le même ADN.",
        ],
      },
    ],
    keyTakeaways: [
      "Appliquez la règle 60-30-10 pour vos couleurs afin d'éviter le désordre visuel.",
      "Ne dépassez jamais deux familles typographiques sur votre site.",
      "Bannissez les photos de stock génériques au profit d'images authentiques.",
      "Formalisez vos règles graphiques dans un guide de style réutilisable.",
    ],
    tags: ["Branding", "Identité Visuelle", "UI Design", "Design System"],
    relatedSlugs: [
      "pourquoi-votre-site-ne-convertit-pas",
      "elements-indispensables-page-accueil-efficace",
    ],
  },
  {
    slug: "elements-indispensables-page-accueil-efficace",
    title: "Les 6 éléments indispensables d’une page d’accueil efficace",
    excerpt:
      "Ce que vos visiteurs doivent obligatoirement comprendre en moins de 5 secondes pour poursuivre leur parcours en toute confiance et se diriger vers vos offres.",
    category: "Conversion",
    date: "14 Août 2024",
    isoDate: "2024-08-14",
    readTime: "5 min de lecture",
    author: {
      name: "Nourou Dine AMANDOU",
      role: "Designer & Développeur Web Stratégique",
      avatar: "/media/nourou-portrait-transparent.png",
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    intro:
      "La page d'accueil est la vitrine stratégique de votre entreprise. Elle ne doit pas tout dire, mais elle doit orienter efficacement le visiteur vers les informations qui feront pencher sa décision en votre faveur.",
    tableOfContents: [
      { id: "hero-accroche", title: "1. Le Hero Header limpide et mémorable" },
      { id: "benefices-concrets", title: "2. Les bénéfices clients plutôt que les fonctionnalités" },
      { id: "preuve-sociale", title: "3. La preuve sociale visible dès le premier défilement" },
      { id: "presentation-offres", title: "4. Une cartographie claire de vos services" },
      { id: "methode-transparente", title: "5. Votre méthode de travail rassurante" },
      { id: "appel-action-terminal", title: "6. Un call-to-action final engageant" },
    ],
    sections: [
      {
        id: "hero-accroche",
        title: "1. Le Hero Header limpide et mémorable",
        content: [
          "Le haut de page doit concentrer l'essence de votre valeur ajoutée : un titre puissant orienté résultat, un sous-titre explicatif et un appel à l'action direct, accompagnés d'un visuel crédibilisant.",
        ],
      },
      {
        id: "benefices-concrets",
        title: "2. Les bénéfices clients plutôt que les fonctionnalités",
        content: [
          "Votre prospect ne cherche pas à savoir quelles technologies vous utilisez, il cherche à savoir ce qu'il gagne : du temps, du chiffre d'affaires, de la sérénité ou une image plus statutaire.",
        ],
      },
      {
        id: "preuve-sociale",
        title: "3. La preuve sociale visible dès le premier défilement",
        content: [
          "Logos de clients partenaires, notes d'avis vérifiés ou statistiques d'impact : insérez ces gages de confiance le plus haut possible dans la page.",
        ],
      },
      {
        id: "presentation-offres",
        title: "4. Une cartographie claire de vos services",
        content: [
          "Structurez vos prestations sous forme de blocs lisibles avec des titres explicites et des aperçus des livrables pour que chacun s'auto-qualifie facilement.",
        ],
      },
      {
        id: "methode-transparente",
        title: "5. Votre méthode de travail rassurante",
        content: [
          "Expliquez en 3 ou 4 étapes simples comment se déroule une collaboration avec vous. La transparence sur le processus lève l'anxiété liée à l'inconnu.",
        ],
      },
      {
        id: "appel-action-terminal",
        title: "6. Un call-to-action final engageant",
        content: [
          "Ne laissez jamais une page d'accueil se terminer sur un simple copyright. Offrez une porte de sortie directe et valorisante pour initier l'échange.",
        ],
      },
    ],
    keyTakeaways: [
      "Ne cherchez pas à tout dire sur la page d'accueil : orientez.",
      "Parlez du problème de votre client avant d'énumérer vos compétences.",
      "Placez la preuve sociale sous les yeux du visiteur dès les premières secondes.",
      "Offrez toujours un appel à l'action clair avant le pied de page.",
    ],
    tags: ["Page d'accueil", "Conversion", "UX", "Ergonomie"],
    relatedSlugs: [
      "pourquoi-votre-site-ne-convertit-pas",
      "cahier-des-charges-site-web-guide-complet",
    ],
  },
  {
    slug: "preparer-un-site-visible-sur-google-seo",
    title: "Comment préparer un site pour être réellement visible sur Google",
    excerpt:
      "Les fondations éditoriales, sémantiques et techniques indispensables à poser dès la conception de votre site pour attirer du trafic qualifié et durable.",
    category: "Visibilité & SEO",
    date: "02 Août 2024",
    isoDate: "2024-08-02",
    readTime: "6 min de lecture",
    author: {
      name: "Nourou Dine AMANDOU",
      role: "Designer & Développeur Web Stratégique",
      avatar: "/media/nourou-portrait-transparent.png",
    },
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    intro:
      "Le référencement naturel (SEO) n'est pas une poudre magique que l'on saupoudre une fois le site terminé. C'est une discipline qui commence dès le choix de l'arborescence, la structure sémantique HTML et la vitesse d'exécution.",
    tableOfContents: [
      { id: "semantique-html5", title: "1. L'importance cruciale de la sémantique HTML5" },
      { id: "intention-recherche", title: "2. Comprendre l'intention de recherche de vos clients" },
      { id: "performances-core-vitals", title: "3. La vitesse et les Core Web Vitals" },
      { id: "maillage-interne", title: "4. Le maillage interne pour guider les robots" },
    ],
    sections: [
      {
        id: "semantique-html5",
        title: "1. L'importance cruciale de la sémantique HTML5",
        content: [
          "Les robots de Google n'ont pas d'yeux pour admirer un beau design : ils lisent le code source. Utiliser des balises sémantiques `<main>`, `<article>`, `<header>`, `<nav>` et respecter une hiérarchie stricte des titres (`h1`, `h2`, `h3`) leur permet de comprendre instantanément la valeur et le sujet de chaque contenu.",
        ],
      },
      {
        id: "intention-recherche",
        title: "2. Comprendre l'intention de recherche de vos clients",
        content: [
          "Vos prospects ne cherchent pas votre nom d'entreprise : ils cherchent une réponse à leur interrogation ou une solution à leur besoin géographique et sectoriel. Ciblez des expressions précises à forte valeur intentionnelle.",
        ],
      },
      {
        id: "performances-core-vitals",
        title: "3. La vitesse et les Core Web Vitals",
        content: [
          "Google pénalise activement les sites lents, lourds ou souffrant de décalages visuels au chargement. Une architecture moderne, des images compressées au format WebP/AVIF et un code épuré sont des prérequis non négociables.",
        ],
      },
      {
        id: "maillage-interne",
        title: "4. Le maillage interne pour guider les robots",
        content: [
          "Liez intelligemment vos pages entre elles : vos articles de blog doivent pointer vers vos études de cas et vos pages de services pour diffuser l'autorité de domaine et retenir vos visiteurs.",
        ],
      },
    ],
    keyTakeaways: [
      "La sémantique HTML5 est la grammaire universelle comprise par les moteurs de recherche.",
      "Un seul H1 logique et descriptif par page.",
      "Optimisez les images et le code pour garantir des Core Web Vitals au vert.",
      "Liez vos contenus entre eux de manière contextuelle et fluide.",
    ],
    tags: ["SEO", "Sémantique Web", "Core Web Vitals", "Google"],
    relatedSlugs: [
      "pourquoi-votre-site-ne-convertit-pas",
      "cahier-des-charges-site-web-guide-complet",
    ],
  },
  {
    slug: "integrer-whatsapp-catalogue-produits",
    title: "Pourquoi intégrer WhatsApp au cœur de votre catalogue produits",
    excerpt:
      "Comment réduire les frictions d'achat en permettant aux clients de commander ou demander des précisions directement sur messagerie instantanée en un clic.",
    category: "Outils & Vente",
    date: "19 Juillet 2024",
    isoDate: "2024-07-19",
    readTime: "4 min de lecture",
    author: {
      name: "Nourou Dine AMANDOU",
      role: "Designer & Développeur Web Stratégique",
      avatar: "/media/nourou-portrait-transparent.png",
    },
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    intro:
      "Pour beaucoup de commerces, d'artisans ou de marques en Afrique et en Europe, le panier d'achat e-commerce traditionnel avec 4 étapes et création de compte obligatoire représente un mur infranchissable. La solution ? La commande directe sur WhatsApp.",
    tableOfContents: [
      { id: "habitudes-consommation", title: "1. L'évolution des habitudes de consommation" },
      { id: "reduction-abandons", title: "2. Réduire le taux d'abandon de panier" },
      { id: "personnalisation-vente", title: "3. La personnalisation et la vente incitative" },
      { id: "mise-en-oeuvre", title: "4. Comment implémenter ce système efficacement" },
    ],
    sections: [
      {
        id: "habitudes-consommation",
        title: "1. L'évolution des habitudes de consommation",
        content: [
          "Vos clients passent plusieurs heures par jour sur WhatsApp. C'est leur canal de communication favori, rassurant et direct. Pouvoir cliquer sur un produit et envoyer un message pré-rempli avec la référence et le prix transforme radicalement l'expérience d'achat.",
        ],
      },
      {
        id: "reduction-abandons",
        title: "2. Réduire le taux d'abandon de panier",
        content: [
          "Finis les formulaires interminables d'adresse postale et les pannes de passerelle de paiement en ligne. La commande WhatsApp amorce immédiatement une relation humaine et permet de convenir des modalités de livraison en direct.",
        ],
      },
      {
        id: "personnalisation-vente",
        title: "3. La personnalisation et la vente incitative",
        content: [
          "Une fois en contact, vous pouvez conseiller votre acheteur, lui proposer des articles complémentaires et répondre à ses éventuelles hésitations en temps réel.",
        ],
      },
      {
        id: "mise-en-oeuvre",
        title: "4. Comment implémenter ce système efficacement",
        content: [
          "Un catalogue web moderne associé à l'API WhatsApp Click-to-Chat permet d'automatiser le message de demande tout en conservant une gestion de stock centralisée et claire.",
        ],
      },
    ],
    keyTakeaways: [
      "WhatsApp supprime les frictions de paiement et d'inscription fastidieuse.",
      "Le message pré-rempli avec photo et référence produit accélère le traitement.",
      "La conversation directe favorise l'upselling et la fidélisation client.",
    ],
    tags: ["WhatsApp Business", "E-commerce", "Conversion Mobile", "Vente"],
    relatedSlugs: [
      "pourquoi-votre-site-ne-convertit-pas",
      "elements-indispensables-page-accueil-efficace",
    ],
  },
  {
    slug: "cahier-des-charges-site-web-guide-complet",
    title: "Cahier des charges pour un site web : le guide complet pour bien démarrer",
    excerpt:
      "Les informations clés, contenus et objectifs à définir avant de contacter un développeur pour gagner du temps, sécuriser votre investissement et respecter vos délais.",
    category: "Méthode",
    date: "05 Juillet 2024",
    isoDate: "2024-07-05",
    readTime: "5 min de lecture",
    author: {
      name: "Nourou Dine AMANDOU",
      role: "Designer & Développeur Web Stratégique",
      avatar: "/media/nourou-portrait-transparent.png",
    },
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    intro:
      "Un projet web qui dérive en budget ou en délai est presque toujours la conséquence d'un manque de cadrage initial. Rédiger un cahier des charges clair n'exige pas de compétences techniques, mais une réflexion structurée sur vos objectifs d'affaires.",
    tableOfContents: [
      { id: "presentation-objectifs", title: "1. Présentation de votre activité et objectifs clés" },
      { id: "cible-parcours", title: "2. Identifier votre cible et son parcours idéal" },
      { id: "arborescence-contenus", title: "3. Définir l'arborescence et l'état des contenus" },
      { id: "contraintes-planning", title: "4. Contraintes techniques, budget et calendrier" },
    ],
    sections: [
      {
        id: "presentation-objectifs",
        title: "1. Présentation de votre activité et objectifs clés",
        content: [
          "Commencez par situer votre entreprise : son historique, ses valeurs, son positionnement prix et le problème spécifique que ce nouveau site doit résoudre.",
        ],
      },
      {
        id: "cible-parcours",
        title: "2. Identifier votre cible et son parcours idéal",
        content: [
          "Décrivez précisément vos clients types (personas) : quelles sont leurs attentes prioritaires et quel déclic doit les pousser à vous solliciter ?",
        ],
      },
      {
        id: "arborescence-contenus",
        title: "3. Définir l'arborescence et l'état des contenus",
        content: [
          "Listez les pages indispensables (Accueil, Services, Réalisations, À propos, Contact) et précisez qui se chargera de rédiger les textes et de fournir les photos.",
        ],
      },
      {
        id: "contraintes-planning",
        title: "4. Contraintes techniques, budget et calendrier",
        content: [
          "Indiquez vos échéances incontournables (lancement d'un produit, salon professionnel) et vos outils existants (CRM, logiciel de facturation) à synchroniser.",
        ],
      },
    ],
    keyTakeaways: [
      "Un bon cahier des charges prévient 90% des incompréhensions et surcoûts.",
      "Les contenus (textes et photos) doivent être anticipés dès le début.",
      "Soyez transparent sur vos objectifs de date et vos priorités d'affaires.",
    ],
    tags: ["Cahier des charges", "Gestion de projet", "Planification", "Méthodologie"],
    relatedSlugs: [
      "pourquoi-votre-site-ne-convertit-pas",
      "preparer-un-site-visible-sur-google-seo",
    ],
  },
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return allArticles.find((article) => article.slug === slug);
}

export function getAllArticles(): BlogArticle[] {
  return allArticles;
}

export function getFeaturedArticle(): BlogArticle {
  return allArticles[0];
}
