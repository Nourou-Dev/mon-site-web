"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { faqItems, site } from "@/lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-[#171717]/5 bg-[#f3efe9] p-6 sm:p-8 lg:p-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="flex flex-col justify-center">
            <div className="mx-auto w-full max-w-[440px] lg:mx-0">
              <span className="inline-flex items-center rounded-full border border-[#171717]/10 bg-white/80 px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#171717] shadow-sm">
                Questions & réponses
              </span>

              <h2 className="mt-6 max-w-[380px] font-black tracking-[-0.07em] text-[#171717]">
                Des réponses claires pour des décisions plus sûres
                <span className="block"></span>
                <span className="block"></span>
              </h2>

              <p className="mt-5 max-w-[420px] text-[1.02rem] leading-7 text-[#4b4b4b]">
                Des réponses claires sur la création de site, la stratégie, les délais et la méthode de travail.
              </p>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[#171717]/8 bg-[#e9e2d8] p-5 sm:p-6">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#171717]/65">
                Encore une question ?
              </p>
              <p className="mt-3 max-w-[28ch] text-[1.02rem] leading-7 text-[#2f2f2f]">
                Besoin d’un éclairage plus précis
                <span className="block">sur votre projet ?</span>
              </p>
              <a
                href={`mailto:${site.email}`}
                className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Posez votre question
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3 lg:mx-auto lg:w-full lg:max-w-[620px]">
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;

              return (
                <div key={item.question} className="rounded-[1.5rem] border border-[#171717]/8 bg-white/80 shadow-[0_12px_28px_rgba(21,20,27,0.03)]">
                  <button
                    type="button"
                    onClick={() => toggleItem(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="text-[1.02rem] font-semibold leading-7 text-[#171717] sm:text-[1.1rem]">
                      {item.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border border-[#171717]/8 bg-[#f3efe9] text-[#171717] transition-all duration-300 ${
                        isOpen ? "rotate-180 bg-[#171717] text-white" : ""
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
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
                      <p className="px-5 pb-5 text-[0.96rem] leading-7 text-[#4b4b4b] sm:px-6">
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
