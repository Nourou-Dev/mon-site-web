import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircleMore, Rocket } from "lucide-react";
import { site } from "@/lib/data";

export default function FinalCTA() {
  return (
    <section id="contact" className="scroll-mt-[5.5rem] bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-[#171717]/8 bg-[#f8f9fa] p-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_1.1fr] lg:gap-10">
          <div className="relative flex min-h-0 items-center justify-center lg:min-h-[420px]">
            <div className="relative flex h-[220px] w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#171717] shadow-[0_30px_50px_rgba(17,17,17,0.12)] sm:h-[280px] lg:h-[320px]">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10" />
              <div className="absolute -bottom-20 -left-8 h-52 w-52 rounded-full border border-[#0060c3]/50" />

              <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-[#0060c3] text-white shadow-[0_0_0_18px_rgba(0,96,195,0.18)]">
                <MessageCircleMore className="h-14 w-14 sm:h-16 sm:w-16" strokeWidth={1.4} />
              </div>
            </div>
          </div>

          <div className="max-w-[520px]">
            <span className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
              <Rocket className="h-3.5 w-3.5 text-[#0060c3]" />
              Lancez-vous maintenant
            </span>

            <h2 className="max-w-[470px] font-black tracking-[-0.07em] text-[#171717]">
              Un site qui représente vraiment votre valeur.
            </h2>

            <div className="mt-5 sm:mt-6 text-[0.98rem] sm:text-[1.05rem] leading-relaxed sm:leading-[1.7] text-[#4b4b4b]">
              <p>
                Je vous aide à clarifier votre message, à améliorer votre présence en ligne et à créer une expérience web qui inspire confiance dès le premier instant.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#0060c3] px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-[#0060c3]/25 transition-all hover:bg-[#0050a5] hover:-translate-y-0.5 active:scale-95 text-center"
              >
                Discutons de votre projet
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
              <Link
                href="/realisations"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#171717]/15 bg-white px-6 py-3.5 text-sm sm:text-base font-semibold text-[#171717] transition-colors hover:border-[#171717]/30 text-center"
              >
                Voir mes réalisations
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
