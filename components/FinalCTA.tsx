import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative w-full bg-[#F6F4EF] py-20 sm:py-28 lg:py-32 border-b border-[#C9C4B8]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        
        <div className="border border-[#C9C4B8] bg-[#1B1D22] p-8 sm:p-14 lg:p-20 text-white relative overflow-hidden">
          
          <div className="relative z-10 max-w-[780px]">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#FF6B3D]" />
              <span className="text-xs font-mono text-white/70">
                Disponibilité immédiate pour nouveaux projets
              </span>
            </div>

            <h2 className="mt-6 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08]">
              Votre projet mérite mieux qu&apos;un template générique.
            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/80 max-w-[580px] font-sans">
              Parlons concrètement de vos ambitions, de votre calendrier et de vos contraintes. Recevez un diagnostic stratégique et une proposition chiffrée sous 24h.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center bg-[#F6F4EF] px-8 py-4 text-xs font-mono text-[#1B1D22] hover:bg-[#3D5AFE] hover:text-white transition-colors text-center"
              >
                Démarrer votre projet
              </Link>

              <a
                href="https://wa.me/2290159364445"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 border border-white/20 bg-white/5 px-7 py-3.5 text-xs font-mono text-white hover:bg-white/10 transition-colors text-center"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Discussion directe WhatsApp</span>
              </a>
            </div>

            <div className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center gap-8 text-xs text-white/60 font-mono">
              <div>Diagnostic initial gratuit</div>
              <div>·</div>
              <div>Délais fermes garantis</div>
              <div>·</div>
              <div>Propriété totale du code</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
