"use client";

import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { faqItems, site } from "@/lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="relative w-full bg-[#F6F4EF] py-20 sm:py-28 lg:py-32 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          
          {/* Côté gauche : Titre & Contact direct */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono text-[#1B1D22]/60">
                Questions fréquentes &amp; Cadrage
              </p>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1B1D22]">
                Des réponses précises pour décider en toute sérénité.
              </h2>
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#1B1D22]/70 font-sans">
                Les questions les plus fréquentes sur ma méthode, les délais, les technologies et la propriété intégrale de votre code.
              </p>
            </div>

            <div className="mt-10 border border-[#C9C4B8] bg-white p-6 sm:p-8">
              <span className="text-xs font-mono text-[#1B1D22]/60">
                Une question spécifique ?
              </span>
              <p className="mt-2 text-sm text-[#1B1D22] font-medium leading-relaxed font-sans">
                Vous avez un projet particulier ou des besoins techniques précis ? Échangeons directement sans intermédiaire.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-6 inline-flex items-center justify-center bg-[#1B1D22] px-6 py-3 text-xs font-mono text-white transition-colors hover:bg-[#3D5AFE]"
              >
                Poser ma question
              </a>
            </div>
          </div>

          {/* Côté droit : Accordéon architectural avec fines lignes de séparation */}
          <div className="border-t border-[#C9C4B8]">
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;

              return (
                <div
                  key={item.question}
                  className="border-b border-[#C9C4B8] transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-start justify-between gap-4 py-6 text-left"
                  >
                    <span className="font-serif text-lg sm:text-xl font-normal tracking-tight text-[#1B1D22]">
                      {item.question}
                    </span>
                    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[#1B1D22]/70">
                      {isOpen ? (
                        <Minus className="h-4 w-4" strokeWidth={1.5} />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={1.5} />
                      )}
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
                      <p className="pb-6 text-sm leading-relaxed text-[#1B1D22]/75 font-sans">
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
