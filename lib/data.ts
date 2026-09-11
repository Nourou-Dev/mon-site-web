// Toutes les données du site sont centralisées ici.
// Pour transformer ce site vitrine en web app (espace client, back-office…),
// ce fichier peut être remplacé par des appels API / une base de données
// sans toucher aux composants.

export const site = {
  name: "Nourou Dine AMANDOU",
  brand: "Nourou Webdesign",
  brandSuffix: "",
  tagline: "Développeur web freelance basé à Abomey-Calavi",
  phone: "+229 01 00 00 00 00",
  email: "contact@nouroudineamandou.com",
  whatsapp: "https://wa.me/22900000000",
};

export const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Process", href: "#process" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
];

export const heroStats = [
  { value: "4 ans", label: "d'expérience" },
  { value: "50+", label: "projets livrés" },
  { value: "92%", label: "clients qui recommandent" },
];

export const problems = [
  {
    title: "Zéro visibilité sur le projet",
    text: "Vous confiez votre site et n'avez plus aucune nouvelle avant la livraison, dans le meilleur des cas.",
  },
  {
    title: "Échanges éparpillés",
    text: "Les demandes se perdent entre WhatsApp, e-mails et messages vocaux, sans historique clair.",
  },
  {
    title: "Délais qui glissent",
    text: "Sans jalons ni échéances écrites, le calendrier réel finit toujours par s'étirer.",
  },
];

export const solutionFeatures = [
  {
    id: "dashboard",
    title: "Un espace client dédié",
    text: "Suivez l'avancement, les tâches et les échanges depuis un tableau de bord unique, mis à jour en temps réel.",
  },
  {
    id: "preview",
    title: "Aperçu en direct",
    text: "Visualisez chaque évolution du site sur ordinateur, tablette et mobile avant même la mise en ligne.",
  },
  {
    id: "contract",
    title: "Contrat et signature en ligne",
    text: "Devis, contrat et signature électronique sécurisée pour démarrer le projet sans perte de temps.",
  },
  {
    id: "feedback",
    title: "Retours instantanés",
    text: "Un canal de discussion direct sur chaque écran pour ajuster rapidement et sans malentendu.",
  },
];

export const services = [
  {
    title: "Sites vitrines",
    text: "Un site rapide, clair et pensé pour convertir vos visiteurs en clients.",
    priceFrom: "à partir de 150 000 FCFA",
  },
  {
    title: "E-commerce",
    text: "Boutique en ligne complète : catalogue, paiement, livraison et suivi des commandes.",
    priceFrom: "à partir de 350 000 FCFA",
  },
  {
    title: "Applications web",
    text: "Outils métier sur mesure : espaces clients, réservation, gestion interne.",
    priceFrom: "sur devis",
  },
  {
    title: "Refonte & maintenance",
    text: "Modernisation d'un site existant, correctifs et évolutions au fil du temps.",
    priceFrom: "à partir de 75 000 FCFA",
  },
];

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
];

export const testimonials = [
  {
    name: "Aline B.",
    role: "Fondatrice, boutique en ligne",
    quote:
      "Livré dans les temps, avec un suivi clair à chaque étape. Je savais toujours où en était mon projet.",
  },
  {
    name: "Steve K.",
    role: "Gérant, cabinet de conseil",
    quote:
      "L'espace client a changé la donne : plus besoin de relancer pour avoir des nouvelles, tout est visible en direct.",
  },
  {
    name: "Noémie D.",
    role: "Responsable marketing",
    quote:
      "Un vrai partenaire technique, force de proposition et à l'écoute des contraintes de budget.",
  },
];

export const faqItems = [
  {
    question: "Combien coûte la création d'un site web ?",
    answer:
      "Cela dépend de la nature du projet : un site vitrine simple démarre autour de 150 000 FCFA, une boutique en ligne ou une application sur mesure fait l'objet d'un devis détaillé après un premier échange gratuit.",
  },
  {
    question: "Combien de temps faut-il pour créer un site ?",
    answer:
      "Comptez en général 2 à 4 semaines pour un site vitrine et 6 à 10 semaines pour un projet plus complexe (e-commerce, application), selon les allers-retours de validation.",
  },
  {
    question: "Comment se déroule le suivi du projet ?",
    answer:
      "Chaque client dispose d'un espace dédié pour suivre l'avancement, valider les aperçus et échanger directement, en plus d'un point d'étape régulier.",
  },
  {
    question: "Proposez-vous la maintenance après la mise en ligne ?",
    answer:
      "Oui, plusieurs formules de maintenance existent : mises à jour de sécurité, petites évolutions mensuelles, ou intervention ponctuelle à la demande.",
  },
  {
    question: "Est-ce que je peux participer aux décisions du projet ?",
    answer:
      "Oui. Chaque étape est présentée clairement afin que vous puissiez donner votre avis, valider les choix importants et garder une vision précise de l'avancement.",
  },
  {
    question: "Quels contenus dois-je fournir pour mon site ?",
    answer:
      "Vous pouvez fournir vos textes, photos, logo et informations métier. Je vous accompagne pour structurer les contenus et identifier ce qui manque afin de rendre le site clair et convaincant.",
  },
];
