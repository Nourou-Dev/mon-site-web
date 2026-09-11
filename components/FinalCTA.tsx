import { ArrowRight, MessageCircleMore } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="contact" className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] border border-[#171717]/5 bg-[#f3efe9] px-6 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_1.1fr] lg:gap-10">
          <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[360px] lg:min-h-[420px]">
            <div className="relative flex h-[240px] w-full max-w-[360px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#171717] shadow-[0_30px_50px_rgba(17,17,17,0.12)] sm:h-[280px] lg:h-[320px]">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10" />
              <div className="absolute -bottom-20 -left-8 h-52 w-52 rounded-full border border-[#d76b45]/50" />

              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#f0b08f] text-[#171717] shadow-[0_0_0_18px_rgba(240,176,143,0.12)]">
                <MessageCircleMore className="h-16 w-16" strokeWidth={1.4} />
              </div>
            </div>
          </div>

          <div className="max-w-[520px]">
            <span className="mb-6 inline-flex items-center rounded-full border border-[#171717]/10 bg-white/80 px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#171717] shadow-sm">
              Lance toi maintenant
            </span>

            <h2 className="max-w-[470px] font-black tracking-[-0.07em] text-[#171717]">
              Un site qui représente vraiment votre valeur.
            </h2>

            <div className="mt-6 text-[1.05rem] leading-[1.7] text-[#4b4b4b]">
              <p>
                Je vous aide à clarifier votre message, à améliorer votre présence en ligne et à créer une expérience web qui inspire confiance dès le premier instant.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#171717] px-8 py-3 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Discutons de votre projet
                <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-[#171717]/15 bg-white px-6 py-3 text-base font-semibold text-[#171717]"
              >
                Voir mes réalisations
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
