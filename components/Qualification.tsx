import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, XCircle, Target } from "lucide-react";

const forYou = [
  "Vous lancez une nouvelle activité et souhaitez démarrer avec crédibilité",
  "Vous voulez professionnaliser et moderniser votre image de marque",
  "Votre site actuel ne génère pas suffisamment de demandes ou de ventes",
  "Vous souhaitez présenter vos produits en ligne de manière claire",
  "Vous voulez une landing page percutante pour une offre précise",
  "Vous avez besoin d’un site parfaitement fluide et optimisé sur smartphone",
  "Vous souhaitez centraliser toutes vos informations au même endroit",
  "Vous voulez attirer des clients réguliers au-delà des réseaux sociaux",
];

const notForYou = [
  "Vous cherchez uniquement le tarif le plus bas au détriment de la qualité",
  "Vous ne souhaitez pas participer un minimum à la réflexion stratégique",
  "Vous voulez copier exactement le site d’une autre marque sans identité propre",
  "Vous n’avez pas encore défini l’offre ou l'activité que vous voulez présenter",
];

export default function Qualification() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 bg-white">
      <div className="mx-auto max-w-[1280px]">
        {/* En-tête */}
        <div className="text-center max-w-[840px] mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
            <Target className="h-3.5 w-3.5 text-[#0060c3]" />
            Qualification &amp; Alignement
          </span>
          <h2 className="mt-4 font-black tracking-[-0.07em] text-[#171717] text-[clamp(2rem,4vw,3.6rem)] leading-[1.04]">
            Est-ce que ce service est fait pour vous ?
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#4b4b4b]">
            Un bon site commence par une bonne stratégie. Plus votre offre et votre cible sont claires, plus le résultat sera pertinent et performant.
          </p>
        </div>

        {/* Grille comparative 2 colonnes */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 items-stretch">
          {/* Colonne positive */}
          <div className="flex flex-col justify-between rounded-[2rem] border border-[#171717]/10 bg-white p-6 sm:p-9 shadow-[0_18px_35px_rgba(23,23,23,0.04)]">
            <div>
              <div className="flex items-center justify-between gap-3 pb-6 border-b border-[#171717]/8">
                <div>
                  <span className="inline-flex items-center rounded-full bg-[#eef5fc] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#0060c3]">
                    Idéal pour vous
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-black tracking-[-0.05em] text-[#171717]">
                    Ce service est fait pour vous si…
                  </h3>
                </div>
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef5fc] text-[#0060c3]">
                  <CheckCircle2 className="h-6 w-6" strokeWidth={2.2} />
                </div>
              </div>

              <ul className="mt-6 space-y-3.5">
                {forYou.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0060c3]" strokeWidth={2.2} />
                    <span className="text-sm sm:text-[0.95rem] leading-relaxed text-[#171717]/90 font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-[#171717]/8 flex items-center justify-between text-xs font-semibold text-[#171717]/60">
              <span>8 critères validés</span>
              <span className="text-[#0060c3]">Partenariat idéal</span>
            </div>
          </div>

          {/* Colonne filtre / exclusion */}
          <div className="flex flex-col justify-between rounded-[2rem] border border-[#171717]/10 bg-[#f8f9fa] p-6 sm:p-9">
            <div>
              <div className="flex items-center justify-between gap-3 pb-6 border-b border-[#171717]/8">
                <div>
                  <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-[#171717]/70">
                    Transparence
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-black tracking-[-0.05em] text-[#171717]">
                    Ce n’est probablement pas adapté si…
                  </h3>
                </div>
                <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-[#171717]/10 text-[#171717]/60">
                  <XCircle className="h-6 w-6" strokeWidth={2} />
                </div>
              </div>

              <ul className="mt-6 space-y-4">
                {notForYou.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#171717]/40" strokeWidth={2} />
                    <span className="text-sm sm:text-[0.95rem] leading-relaxed text-[#4b4b4b]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-[#171717]/8 bg-white/70 p-4 text-xs sm:text-sm text-[#4b4b4b] leading-relaxed">
                💡 <strong>Pourquoi cette franchise ?</strong> Pour vous garantir un retour sur investissement optimal. Un site internet produit ses meilleurs effets lorsque le porteur de projet est prêt à construire une vraie proposition de valeur.
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-[#171717]/8 flex items-center justify-between text-xs font-semibold text-[#171717]/50">
              <span>Filtre d&apos;efficacité</span>
              <span>Qualité garantie</span>
            </div>
          </div>
        </div>

        {/* Bannière de transition & CTA */}
        <div className="mt-10 rounded-[2rem] border border-[#0060c3]/20 bg-[#0060c3] p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(0,96,195,0.28)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg sm:text-xl font-black tracking-tight text-white">
              Vous vous reconnaissez dans cette approche ?
            </h4>
            <p className="mt-1 text-sm text-white/90">
              Discutons de vos objectifs et vérifions ensemble la faisabilité de votre projet.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#0060c3] transition-all hover:bg-[#f5f9ff] hover:-translate-y-0.5 active:scale-95 shadow-md text-center"
          >
            <span>Vérifier la faisabilité de mon projet</span>
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
