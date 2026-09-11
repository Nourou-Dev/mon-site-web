"use client";

import { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Zap,
  ShieldCheck,
  Palette,
  Code2,
  Wand2,
  Video,
} from "lucide-react";

/* =========================================================================
   LOGOS VECTORIELS OFFICIELS (SVG HAUTE DÉFINITION)
   ========================================================================= */

function FigmaLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 57" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
    </svg>
  );
}

function WordPressLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="64" cy="64" r="64" fill="#21759B" />
      <path
        d="M10.8 64c0 23.6 15.3 43.6 36.7 50.7L18.4 35.8c-4.8 8.4-7.6 18-7.6 28.2zm85.7-2.6c0-6.1-2.2-10.4-4.1-13.7-2.5-4.1-4.9-7.6-4.9-11.7 0-4.6 3.5-8.9 8.4-8.9.2 0 .5 0 .7.1-8.9-8.2-20.7-13.2-33.6-13.2-17.5 0-33 9.3-41.6 23.3 1.2 0 2.3.1 3.2.1 5.3 0 13.5-.7 13.5-.7 2.7-.2 3.1 3.8.3 4.1 0 0-2.8.3-5.8.5l18.5 55.1 11.1-33.4-7.9-21.7c-2.7-.2-5.3-.5-5.3-.5-2.7-.2-2.4-4.2.3-4.1 0 0 8.4.7 13.3.7 5.3 0 13.5-.7 13.5-.7 2.7-.2 3.1 3.8.3 4.1 0 0-2.8.3-5.8.5l18.3 54.4 5.1-17.1c2.2-7.3 3.9-12.6 3.9-16.9zm-49.9 8.3L30.5 116c10.4 3.1 21.6 3.2 32.2.3L46.6 69.7zm49.9 22.8c.8-2.6 1.6-5.7 1.6-9.1 0-5.8-1.1-12.3-4.4-20.5l-18.4 53.4c17.5-6.3 30.6-21.9 31.8-40.8z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function NextJsLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="90" cy="90" r="90" fill="#000000" />
      <path
        d="M149.5 153.5L78.2 61.2H61V118.8H73.3V78.2L137.8 161.4C141.9 159 145.8 156.4 149.5 153.5Z"
        fill="url(#next-grad)"
      />
      <rect x="107" y="61.2" width="12.3" height="57.6" fill="#FFFFFF" />
      <defs>
        <linearGradient id="next-grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AngularLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 250 250" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <polygon fill="#DD0031" points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2" />
      <polygon fill="#C3002F" points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30" />
      <path
        d="M125 52.1L66.8 182.6H88.5L100.2 153.4H149.6L161.3 182.6H183L125 52.1ZM142 135.4H108L125 93L142 135.4Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function IllustratorLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#261300" stroke="#FF9A00" strokeWidth="2.5" />
      <path
        d="M26.8 44.5L25.3 39.2H18.7L17.2 44.5H12L19.2 19.5H24.8L32 44.5H26.8ZM22 26.8L19.8 35.2H24.2L22 26.8ZM37.5 22.8C36.1 22.8 35 23.9 35 25.3C35 26.7 36.1 27.8 37.5 27.8C38.9 27.8 40 26.7 40 25.3C40 23.9 38.9 22.8 37.5 22.8ZM35.2 44.5H39.8V30.2H35.2V44.5Z"
        fill="#FF9A00"
      />
    </svg>
  );
}

function PhotoshopLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#001E36" stroke="#31A8FF" strokeWidth="2.5" />
      <path
        d="M17.5 44.5V19.5H26.8C29.6 19.5 31.8 20.3 33.3 21.8C34.7 23.3 35.5 25.2 35.5 27.6C35.5 30 34.7 32 33.2 33.5C31.7 35 29.5 35.8 26.6 35.8H22.3V44.5H17.5ZM22.3 31.6H26.2C27.8 31.6 28.9 31.2 29.8 30.4C30.6 29.6 31 28.6 31 27.5C31 26.3 30.6 25.4 29.8 24.6C29 23.9 27.8 23.5 26.2 23.5H22.3V31.6ZM37 40.8C37.8 42.2 39 43.3 40.6 44C42.2 44.7 44 45.1 46 45.1C47.8 45.1 49.3 44.8 50.5 44.2C51.7 43.6 52.3 42.7 52.3 41.5C52.3 40.5 51.8 39.7 50.8 39.1C49.8 38.5 48.2 38 46.1 37.5L44.2 37C41.8 36.4 39.9 35.5 38.6 34.3C37.3 33.1 36.6 31.5 36.6 29.5C36.6 27.6 37.4 26 39 24.8C40.6 23.6 42.7 23 45.3 23C47.2 23 48.9 23.4 50.4 24.2C51.9 25 53 26 53.6 27.3L49.5 29.6C48.7 28.2 47.3 27.4 45.3 27.4C44 27.4 42.9 27.7 42.1 28.3C41.3 28.9 40.9 29.6 40.9 30.4C40.9 31.2 41.3 31.8 42.1 32.3C42.9 32.8 44.2 33.3 46 33.8L47.9 34.3C50.6 35 52.7 36 54.1 37.3C55.5 38.6 56.2 40.2 56.2 42.2C56.2 44.3 55.4 46 53.7 47.3C52 48.6 49.6 49.2 46.5 49.2C44.1 49.2 42 48.7 40.2 47.7C38.4 46.7 37.1 45.3 36.2 43.5L40.2 41.2L37 40.8Z"
        fill="#31A8FF"
      />
    </svg>
  );
}

function InDesignLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="14" fill="#2B0017" stroke="#FF3366" strokeWidth="2.5" />
      <path
        d="M21 18.8C19.6 18.8 18.5 19.9 18.5 21.3C18.5 22.7 19.6 23.8 21 23.8C22.4 23.8 23.5 22.7 23.5 21.3C23.5 19.9 22.4 18.8 21 18.8ZM18.7 40.5H23.3V26.2H18.7V40.5ZM43 15.5V27.5C41.9 26.4 40.4 25.8 38.6 25.8C35.9 25.8 33.7 26.9 32 29.1C30.3 31.3 29.5 34.2 29.5 37.7C29.5 41.2 30.3 44.1 32 46.3C33.7 48.5 35.9 49.6 38.6 49.6C40.4 49.6 41.9 49 43 47.9V49.2H47.6V15.5H43ZM38.6 45.5C36.9 45.5 35.6 44.7 34.6 43.1C33.6 41.5 33.1 39.6 33.1 37.7C33.1 35.8 33.6 33.9 34.6 32.3C35.6 30.7 36.9 29.9 38.6 29.9C40.3 29.9 41.6 30.7 42.6 32.3C43.6 33.9 44.1 35.8 44.1 37.7C44.1 39.6 43.6 41.5 42.6 43.1C41.6 44.7 40.3 45.5 38.6 45.5Z"
        fill="#FF3366"
      />
    </svg>
  );
}

function AffinityLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aff-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B4D8" />
          <stop offset="50%" stopColor="#1B75BB" />
          <stop offset="100%" stopColor="#2E3192" />
        </linearGradient>
        <linearGradient id="aff-grad-tri" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF7A00" />
          <stop offset="60%" stopColor="#F5222D" />
          <stop offset="100%" stopColor="#722ED1" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="#171717" />
      <path d="M50 16L85 76H68L50 44L32 76H15L50 16Z" fill="url(#aff-grad-blue)" />
      <path d="M50 44L63 67H37L50 44Z" fill="url(#aff-grad-tri)" />
      <path d="M46 54L54 54L50 46Z" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

function CapCutLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="22" fill="#000000" />
      <path d="M22 34L48 20V45L31 54L22 34Z" fill="#FFFFFF" />
      <path d="M78 66L52 80V55L69 46L78 66Z" fill="#FFFFFF" />
      <path d="M48 45L78 28V39L57 51L48 45Z" fill="#00E5FF" />
      <path d="M52 55L22 72V61L43 49L52 55Z" fill="#FF1744" />
    </svg>
  );
}

function AiTechLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ai-hub-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0060C3" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="22" fill="url(#ai-hub-grad)" />
      <path
        d="M50 18C50 35.6 35.6 50 18 50C35.6 50 50 64.4 50 82C50 64.4 64.4 50 82 50C64.4 50 50 35.6 50 18Z"
        fill="#FFFFFF"
      />
      <circle cx="75" cy="25" r="4.5" fill="#FFFFFF" opacity="0.9" />
      <circle cx="25" cy="75" r="3.5" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

/* =========================================================================
   DONNÉES COMPLÈTES DES OUTILS & LOGICIELS
   ========================================================================= */

interface ToolItem {
  id: string;
  name: string;
  category: "design" | "web" | "print" | "video-ai";
  categoryLabel: string;
  role: string;
  benefit: string;
  badge: string;
  logo: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const toolsData: ToolItem[] = [
  {
    id: "figma",
    name: "Figma",
    category: "design",
    categoryLabel: "UI/UX & Prototypage",
    role: "Conception d'interfaces & maquettes",
    benefit: "Prototypage interactif fidèle au pixel près, validé avec vous avant d'écrire la moindre ligne de code.",
    badge: "Pixel-perfect",
    logo: FigmaLogo,
    accentColor: "#A259FF",
  },
  {
    id: "wordpress",
    name: "WordPress",
    category: "web",
    categoryLabel: "CMS & Vitrines",
    role: "Création de sites administrables & Elementor",
    benefit: "Plateforme robuste vous garantissant une autonomie totale pour mettre à jour vos contenus sans développeur.",
    badge: "Autonomie 100%",
    logo: WordPressLogo,
    accentColor: "#21759B",
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "web",
    categoryLabel: "Framework Moderne",
    role: "Architecture web haute performance (React)",
    benefit: "Vitesse de chargement fulgurante, sécurité maximale et optimisation SEO de niveau international.",
    badge: "Score 100/100",
    logo: NextJsLogo,
    accentColor: "#000000",
  },
  {
    id: "angular",
    name: "Angular",
    category: "web",
    categoryLabel: "Framework Moderne",
    role: "Applications web & interfaces métier",
    benefit: "Structure de code évolutive et éprouvée pour des plateformes dynamiques, portails et outils complexes.",
    badge: "Scalabilité Pro",
    logo: AngularLogo,
    accentColor: "#DD0031",
  },
  {
    id: "illustrator",
    name: "Illustrator",
    category: "design",
    categoryLabel: "Vectoriel & Identité",
    role: "Création de logos & chartes graphiques",
    benefit: "Des visuels vectoriels nets et agrandissables à l'infini, du smartphone aux panneaux publicitaires 4x3.",
    badge: "Résolution infinie",
    logo: IllustratorLogo,
    accentColor: "#FF9A00",
  },
  {
    id: "photoshop",
    name: "Photoshop",
    category: "design",
    categoryLabel: "Retouche & Image",
    role: "Traitement photographique & mockups",
    benefit: "Sublimation de vos visuels, détourages précis et ambiances photographiques professionnelles cohérentes.",
    badge: "Finition Studio",
    logo: PhotoshopLogo,
    accentColor: "#31A8FF",
  },
  {
    id: "indesign",
    name: "InDesign",
    category: "print",
    categoryLabel: "Mise en page & Print",
    role: "Catalogues, brochures & documents pros",
    benefit: "Mise en page éditoriale rigoureuse, typographies soignées et fichiers prêts pour l'imprimeur haute def.",
    badge: "Prêt à imprimer",
    logo: InDesignLogo,
    accentColor: "#FF3366",
  },
  {
    id: "affinity",
    name: "Affinity",
    category: "print",
    categoryLabel: "Suite Graphique",
    role: "Designer & Photo de haute précision",
    benefit: "Alternative professionnelle ultra-rapide pour des déclinaisons graphiques véloces et une production fluide.",
    badge: "Précision PAO",
    logo: AffinityLogo,
    accentColor: "#1B75BB",
  },
  {
    id: "capcut",
    name: "CapCut",
    category: "video-ai",
    categoryLabel: "Vidéo & Motion",
    role: "Montage vidéo & formats courts (Reels, TikTok)",
    benefit: "Contenus dynamiques captivants pour dynamiser vos landing pages et multiplier l'engagement sur les réseaux.",
    badge: "Motion & Impact",
    logo: CapCutLogo,
    accentColor: "#00E5FF",
  },
  {
    id: "ai-tech",
    name: "Intelligence Artificielle",
    category: "video-ai",
    categoryLabel: "IA & Génération",
    role: "Accélération de recherche, code & visuels",
    benefit: "Intégration d'outils Gen-AI de pointe pour démultiplier la productivité, explorer des concepts et prototyper 3x plus vite.",
    badge: "Productivité x3",
    logo: AiTechLogo,
    accentColor: "#8B5CF6",
  },
];

const categories = [
  { id: "all", label: "Tous les outils", count: toolsData.length },
  { id: "design", label: "Design & UI/UX", count: toolsData.filter((t) => t.category === "design").length },
  { id: "web", label: "Développement Web", count: toolsData.filter((t) => t.category === "web").length },
  { id: "print", label: "Édition & Print", count: toolsData.filter((t) => t.category === "print").length },
  { id: "video-ai", label: "Vidéo & IA", count: toolsData.filter((t) => t.category === "video-ai").length },
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredTools =
    activeCategory === "all"
      ? toolsData
      : toolsData.filter((tool) => tool.category === activeCategory);

  return (
    <section id="outils" className="scroll-mt-[5.5rem] bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        {/* Conteneur principal à fond neutre moderne #f8f9fa */}
        <div className="rounded-[2.5rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-10 lg:p-14 shadow-sm">

          {/* En-tête de section immersif */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-[#171717]/8">
            <div className="max-w-[640px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
                <Cpu className="h-3.5 w-3.5 text-[#0060c3]" />
                Écosystème &amp; Logiciels
              </span>
              <h2 className="mt-4 font-black tracking-[-0.07em] text-[#171717] text-[clamp(2rem,4vw,3.6rem)] leading-[1.04]">
                Une maîtrise technique &amp; créative{" "}
                <span className="text-[#0060c3] italic font-serif block sm:inline">de haut niveau</span>
              </h2>
            </div>
            <p className="max-w-[440px] text-base sm:text-lg leading-relaxed text-[#4b4b4b]">
              Du premier croquis vectoriel à l’architecture web haute performance, je mobilise les meilleurs outils de l’industrie pour donner vie à votre vision sans compromis.
            </p>
          </div>

          {/* Sélecteur de filtres en capsules interactives */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 ${isActive
                    ? "bg-[#0060c3] text-white shadow-md shadow-[#0060c3]/25 -translate-y-0.5"
                    : "bg-white text-[#171717]/75 border border-[#171717]/10 hover:border-[#0060c3]/40 hover:text-[#171717]"
                    }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.68rem] font-bold ${isActive ? "bg-white/20 text-white" : "bg-[#f0f2f5] text-[#171717]/60"
                      }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grille modulaire des outils (Tool Cards) */}
          <div className="mt-8 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {filteredTools.map((tool) => {
              const LogoComponent = tool.logo;
              return (
                <article
                  key={tool.id}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#171717]/8 bg-white p-5 sm:p-6 shadow-[0_10px_25px_rgba(23,23,23,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0060c3]/40 hover:shadow-[0_20px_40px_rgba(0,96,195,0.12)]"
                >
                  <div>
                    {/* En-tête : Logo & Badge de catégorie */}
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#171717]/6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f8f9fa] border border-[#171717]/8 shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <LogoComponent className="h-8 w-8" />
                      </div>
                      <span className="text-[0.68rem] font-bold uppercase tracking-wider text-[#171717]/60 bg-[#f4f6f8] px-2.5 py-1 rounded-full">
                        {tool.categoryLabel}
                      </span>
                    </div>

                    {/* Titre & Rôle */}
                    <div className="mt-4">
                      <h3 className="text-lg sm:text-xl font-black tracking-tight text-[#171717] group-hover:text-[#0060c3] transition-colors">
                        {tool.name}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-[#0060c3]">
                        {tool.role}
                      </p>
                    </div>

                    {/* Explication du bénéfice concret pour le client */}
                    <p className="mt-3 text-xs sm:text-[0.82rem] leading-relaxed text-[#4b4b4b]">
                      {tool.benefit}
                    </p>
                  </div>

                  {/* Pastille de force / atout */}
                  <div className="mt-5 pt-3 border-t border-[#171717]/6 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-[#171717]/70">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#0060c3]" />
                      {tool.badge}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[#0060c3]/30 group-hover:bg-[#0060c3] transition-colors" />
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bandeau inférieur : Les 3 garanties d'une stack moderne */}
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#171717]/6 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef5fc] text-[#0060c3]">
                <Palette className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#171717]">Fidélité au pixel près</h4>
                <p className="mt-1 text-xs text-[#4b4b4b] leading-relaxed">
                  De la maquette vectorielle au site en ligne, aucun écart : le résultat est rigoureusement conforme.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#171717]/6 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef5fc] text-[#0060c3]">
                <Zap className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#171717]">Vitesse &amp; SEO solide</h4>
                <p className="mt-1 text-xs text-[#4b4b4b] leading-relaxed">
                  Des frameworks modernes taillés pour charger en un éclair et séduire les algorithmes de Google.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#171717]/6 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef5fc] text-[#0060c3]">
                <ShieldCheck className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[#171717]">Autonomie &amp; Pérennité</h4>
                <p className="mt-1 text-xs text-[#4b4b4b] leading-relaxed">
                  Vous conservez 100% de la propriété de vos fichiers sources, maquettes et codes sans dépendance.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
