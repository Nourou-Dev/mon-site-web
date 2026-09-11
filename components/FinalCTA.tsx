import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { site } from "@/lib/data";

export default function FinalCTA() {
  const whatsappUrl = `${site.whatsapp}?text=${encodeURIComponent(
    "Bonjour Nourou, j'aimerais discuter d'un projet de création ou refonte de site web..."
  )}`;

  return (
    <section id="contact" className="scroll-mt-[5.5rem] bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[2.5rem] bg-[#0060c3] p-8 text-white shadow-2xl sm:p-12 lg:p-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Votre projet commence ici
          </span>

          <h2 className="mt-6 text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Prêt à donner à votre marque la présence qu&apos;elle mérite ?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Discutons ensemble de vos besoins, de vos délais et de votre vision. Je vous réponds sous 24h avec une proposition claire, sans engagement.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#0060c3] shadow-lg transition-all hover:bg-[#f5f9ff] hover:-translate-y-0.5 active:scale-95 text-center"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Discuter sur WhatsApp</span>
            </a>

            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5 active:scale-95 text-center"
            >
              <span>Demander un devis en ligne</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Garanties rassurantes */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-white/15 pt-6 text-xs font-medium text-white/90">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-white" />
              Réponse garantie sous 24h
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-white" />
              Devis détaillé &amp; transparent
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-white" />
              Accès immédiat à votre espace client
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
