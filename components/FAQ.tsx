"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { faqItems, site } from "@/lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="relative w-full bg-[#fbf9f5] py-20 sm:py-28 lg:py-32 border-b border-[#171717]/8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          
          {/* Côté gauche : Titre & Contact direct */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#6b7280]">
                [ 11 / FOIRE AUX QUESTIONS ]
              </span>
              <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#171717]">
                Des réponses précises pour décider en toute sérénité.
              </h2>
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#4b5563]">
                Les questions les plus fréquentes sur ma méthode, les délais, les technologies et la propriété de votre site.
              </p>
            </div>

            <div className="mt-10 rounded-3xl border border-[#171717]/8 bg-white p-6 sm:p-8 shadow-sm">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#6b7280]">
                Une question spécifique ?
              </span>
              <p className="mt-2 text-sm text-[#171717] font-medium leading-relaxed">
                Vous avez un projet particulier ou des besoins techniques précis ? Échangeons directement.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#171717] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#2b2b2b] transition-all"
              >
                <span>Poser ma question</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Côté droit : Accordéon FAQ raffiné */}
          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;

              return (
                <div
                  key={item.question}
                  className="rounded-2xl border border-[#171717]/8 bg-white shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-start justify-between gap-4 p-5 sm:p-6 text-left"
                  >
                    <span className="font-display font-bold text-base sm:text-lg tracking-tight text-[#171717]">
                      {item.question}
                    </span>
                    <span
                      className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#171717]/10 bg-[#fbf9f5] text-[#171717] transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-[#171717] text-white" : ""
                      }`}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-label={item.question}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 sm:px-6 text-xs sm:text-sm leading-relaxed text-[#4b5563]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
