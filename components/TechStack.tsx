"use client";

import { useState } from "react";
import { CheckCircle2, Terminal, Code2, Database, Layout, ShieldCheck } from "lucide-react";

/* =========================================================================
   LOGOS VECTORIELS OFFICIELS (HAUTE DÉFINITION)
   ========================================================================= */

function NextJsLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 180" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="90" cy="90" r="90" fill="#000000" />
      <path
        d="M149.5 153.5L78.2 61.2H61V118.8H73.3V78.2L137.8 161.4C141.9 159 145.8 156.4 149.5 153.5Z"
        fill="#FFFFFF"
      />
      <rect x="107" y="61.2" width="12.3" height="57.6" fill="#FFFFFF" />
    </svg>
  );
}

function TypeScriptLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="24" fill="#3178C6" />
      <path
        d="M102.5 83.2C98.4 83.2 95.2 81.6 93 78.4C90.8 75.2 89.6 70.8 89.6 65.2V63.9H99.4V65.6C99.4 68.6 100 70.8 101.1 72.3C102.2 73.8 103.8 74.5 106 74.5C108 74.5 109.5 73.9 110.5 72.7C111.5 71.5 112 69.8 112 67.7C112 65.7 111.4 64.1 110.2 62.9C109 61.7 106.8 60.5 103.6 59.3C99.3 57.7 96.1 56 94 54.2C91.9 52.4 90.8 49.6 90.8 45.8C90.8 41.5 92.2 38 95.1 35.5C98 33 102 31.7 107.1 31.7C112.2 31.7 116.1 33.1 118.8 35.8C121.5 38.5 122.9 42.4 123 47.5H113.2C113.2 44.5 112.5 42.6 111.3 41.6C110.1 40.6 108.6 40.1 106.7 40.1C104.9 40.1 103.5 40.6 102.6 41.6C101.7 42.6 101.2 44 101.2 45.8C101.2 47.6 101.8 49 103 50.1C104.2 51.2 106.5 52.4 109.9 53.7C114.2 55.4 117.4 57.3 119.5 59.4C121.6 61.5 122.7 64.3 122.7 67.9C122.7 72.4 121.2 76.1 118.2 78.9C115.2 81.8 110.8 83.2 102.5 83.2ZM53 96H42.7V41.7H25.3V32.7H70.4V41.7H53V96Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function PostgreSqlLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="24" fill="#336791" />
      <path
        d="M64 24C44 24 32 40 32 60C32 78 44 94 60 98V86C52 84 46 76 46 64C46 50 54 38 64 38C74 38 82 50 82 64C82 76 76 84 68 86V98C84 94 96 78 96 60C96 40 84 24 64 24Z"
        fill="#FFFFFF"
      />
      <circle cx="64" cy="64" r="8" fill="#FFFFFF" />
    </svg>
  );
}

function TailwindLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="24" fill="#0F172A" />
      <path
        d="M64 42c-12 0-19.5 6-22.5 18 4.5-6 9.8-8.2 15.8-6.8 3.5.9 6 3.4 8.7 6.2 4.5 4.6 9.7 10 21 10 12 0 19.5-6 22.5-18-4.5 6-9.8 8.2-15.8 6.8-3.5-.9-6-3.4-8.7-6.2-4.5-4.6-9.7-10-21-10zm-27 24c-12 0-19.5 6-22.5 18 4.5-6 9.8-8.2 15.8-6.8 3.5.9 6 3.4 8.7 6.2 4.5 4.6 9.7 10 21 10 12 0 19.5-6 22.5-18-4.5 6-9.8 8.2-15.8 6.8-3.5-.9-6-3.4-8.7-6.2-4.5-4.6-9.7-10-21-10z"
        fill="#38BDF8"
      />
    </svg>
  );
}

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

function ReactLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 128 128" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="128" height="128" rx="24" fill="#20232A" />
      <circle cx="64" cy="64" r="9" fill="#61DAFB" />
      <ellipse cx="64" cy="64" rx="38" ry="14" stroke="#61DAFB" strokeWidth="3" transform="rotate(30 64 64)" fill="none" />
      <ellipse cx="64" cy="64" rx="38" ry="14" stroke="#61DAFB" strokeWidth="3" transform="rotate(90 64 64)" fill="none" />
      <ellipse cx="64" cy="64" rx="38" ry="14" stroke="#61DAFB" strokeWidth="3" transform="rotate(150 64 64)" fill="none" />
    </svg>
  );
}

const TECH_DATA = [
  {
    name: "Next.js 14",
    category: "Architecture & Framework",
    role: "Moteur de rendu hybride & Edge CDN",
    benefit: "Pages instantanées, SEO optimisé nativement et architecture serverless ultra-scalable.",
    logo: NextJsLogo,
  },
  {
    name: "TypeScript",
    category: "Fiabilité & Code",
    role: "Typage statique strict & Zéro bug",
    benefit: "Code propre, maintenable et sécurisé sans mauvaises surprises au déploiement.",
    logo: TypeScriptLogo,
  },
  {
    name: "PostgreSQL & Prisma",
    category: "Base de Données",
    role: "Stockage relationnel & Intégrité",
    benefit: "Base de données cloud haute performance avec isolation stricte des comptes et données clients.",
    logo: PostgreSqlLogo,
  },
  {
    name: "TailwindCSS",
    category: "Styling & Responsive",
    role: "Design fluide & Ergonomie",
    benefit: "CSS ultra-léger sans surcoût de chargement, adaptable à toutes les tailles d'écrans.",
    logo: TailwindLogo,
  },
  {
    name: "Figma Professional",
    category: "Prototypage & UI/UX",
    role: "Maquettes interactives sur mesure",
    benefit: "Validation visuelle complète de chaque page avant tout développement.",
    logo: FigmaLogo,
  },
  {
    name: "React 18",
    category: "Composants & Logique",
    role: "Interactivité & État temps réel",
    benefit: "Composants modulaires et transitions fluides pour une expérience utilisateur moderne.",
    logo: ReactLogo,
  },
];

export default function TechStack() {
  return (
    <section id="outils" className="relative w-full bg-[#F6F4EF] py-20 sm:py-28 lg:py-32 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#C9C4B8]">
          <div>
            <span className="text-xs font-mono text-[#4B4D54]">
              09 / Ingénierie &amp; technologies éprouvées
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1B1D22] max-w-[640px]">
              Une stack moderne, robuste et pérenne.
            </h2>
          </div>
          <p className="max-w-[400px] text-sm text-[#4B4D54] leading-relaxed font-light">
            Pas d&apos;outils gadgets ni d&apos;artifice. Je sélectionne rigoureusement les technologies éprouvées pour assurer la rapidité et la longévité de votre investissement.
          </p>
        </div>

        {/* Grille 6 technologies solides */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_DATA.map((tech) => {
            const Logo = tech.logo;
            return (
              <div
                key={tech.name}
                className="flex flex-col justify-between rounded-2xl border border-[#C9C4B8] bg-white p-6 sm:p-8 shadow-2xs hover:border-[#1B1D22]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-[#C9C4B8]/40">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6F4EF] border border-[#C9C4B8]">
                      <Logo className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-mono text-[#4B4D54]">
                      {tech.category}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-medium text-[#1B1D22]">
                    {tech.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-[#3D5AFE]">
                    {tech.role}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#4B4D54] font-light">
                    {tech.benefit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
