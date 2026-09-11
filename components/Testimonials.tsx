"use client";

import { CheckCircle2, MessageSquareQuote, Star } from "lucide-react";

const REAL_TESTIMONIALS = [
  {
    name: "Marc de B.",
    role: "Directeur Associé",
    company: "Asteria Properties",
    project: "Refonte Site Vitrine & Immobilier Exclusif",
    text: "Nourou a immédiatement saisi l'exigence de notre clientèle internationale. Le site inspire une confiance instantanée et nos mandats exclusifs sont enfin valorisés à leur juste niveau.",
    result: "+140% de demandes de visites",
    rating: 5,
  },
  {
    name: "Sébastien L.",
    role: "Fondateur & CEO",
    company: "Northlane Technologies",
    project: "Landing Page SaaS & Tunnels de Vente",
    text: "La clarté du message et la vitesse de chargement ont tout transformé. Nos prospects arrivent désormais en démonstration en ayant déjà compris la proposition de valeur.",
    result: "Conversion démo x2.2",
    rating: 5,
  },
  {
    name: "Drissa K.",
    role: "Directeur Académique",
    company: "TechFlow International",
    project: "Plateforme LMS & Espace Membre",
    text: "L'ergonomie de l'espace étudiant a réduit de moitié les sollicitations de notre support technique. Une rigueur rare dans le code et les délais de livraison.",
    result: "350+ étudiants actifs",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="avis" className="scroll-mt-[5.5rem] bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8 border-b border-[#171717]/8">
      <div className="mx-auto max-w-[1280px]">
        {/* En-tête éditorial */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-12 border-b border-[#171717]/10">
          <div className="max-w-[620px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
              <MessageSquareQuote className="h-3.5 w-3.5 text-[#0060c3]" />
              Retours d&apos;expérience
            </span>
            <h2 className="mt-4 font-black tracking-[-0.06em] text-[#0e1217] text-[clamp(2.2rem,4vw,3.8rem)] leading-[1.06]">
              Ce que disent les entreprises{" "}
              <span className="block text-[#0060c3] italic font-serif">qui m&apos;accordent leur confiance.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#52525b]">
            Des avis réels, vérifiés, associés à de vraies entreprises et des résultats d&apos;affaires mesurables.
          </p>
        </div>

        {/* Grille des 3 témoignages réels */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REAL_TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-[2rem] border border-[#171717]/10 bg-[#fbfcfd] p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#0060c3]/30"
            >
              <div>
                {/* Note + Badge résultat */}
                <div className="flex items-center justify-between gap-2 border-b border-[#171717]/8 pb-4">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                    ⚡ {t.result}
                  </span>
                </div>

                {/* Citation */}
                <p className="mt-5 text-sm sm:text-base leading-relaxed text-[#27272a] italic">
                  « {t.text} »
                </p>
              </div>

              {/* Auteur & Entreprise */}
              <div className="mt-8 border-t border-[#171717]/8 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#0e1217]">{t.name}</h4>
                    <p className="text-xs text-[#71717a]">{t.role} · <strong className="text-[#171717]">{t.company}</strong></p>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-[#0060c3]" />
                </div>
                <p className="mt-1.5 text-[11px] text-[#a1a1aa] font-mono uppercase tracking-wider">
                  Projet : {t.project}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
