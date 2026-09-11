import Link from "next/link";
import { ArrowUpRight, MessageSquare, PhoneCall } from "lucide-react";
import { site } from "@/lib/data";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative w-full bg-[#fbf9f5] py-20 sm:py-28 lg:py-32 border-b border-[#171717]/8">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        <div className="rounded-3xl border border-[#171717]/12 bg-[#171717] p-8 sm:p-14 lg:p-20 text-white shadow-2xl relative overflow-hidden">
          {/* Lignes graphiques subtiles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-[760px]">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400">
              [ DISPONIBLE POUR DE NOUVEAUX PROJETS ]
            </span>

            <h2 className="mt-4 font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.06]">
              Votre projet mérite mieux qu&apos;un template générique.
            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/80 max-w-[580px]">
              Parlons concrètement de vos ambitions, de votre calendrier et de vos contraintes. Recevez un diagnostic stratégique et une proposition chiffrée sous 24h.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#171717] shadow-xl hover:bg-[#f5f5f5] transition-all hover:-translate-y-0.5 active:scale-95 text-center"
              >
                <span>Démarrer votre projet</span>
                <ArrowUpRight className="h-4 w-4 text-[#171717]" strokeWidth={2.5} />
              </Link>

              <a
                href="https://wa.me/2290159364445"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-all text-center"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Discussion directe WhatsApp</span>
              </a>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-white/60 font-mono">
              <div>• Diagnostic initial gratuit</div>
              <div>• Délais fermes garantis</div>
              <div>• Propriété totale du code</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
