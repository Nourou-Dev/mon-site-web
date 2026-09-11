"use client";

import Link from "next/link";
import { ChevronRight, ShieldCheck, Cookie, Lock, Eye, CheckCircle2, Settings2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { site } from "@/lib/data";

export default function ConfidentialitePage() {
  const openCookieModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("nd_open_cookie_modal"));
    }
  };

  return (
    <>
      <Navbar />

      <main id="contenu" className="pt-[5.5rem] bg-white">
        {/* Fil d'Ariane sémantique */}
        <nav
          aria-label="Fil d'Ariane"
          className="mx-auto max-w-[1240px] px-4 py-4 sm:px-6 lg:px-8"
        >
          <ol className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#4b4b4b]">
            <li>
              <Link href="/" className="transition-colors hover:text-[#0060c3]">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-[#171717]/30" />
            </li>
            <li aria-current="page" className="font-semibold text-[#171717]">
              Politique de confidentialité
            </li>
          </ol>
        </nav>

        {/* En-tête */}
        <header className="relative overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-[1240px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-[#0060c3]" />
              Vie Privée &amp; Données
            </span>

            <h1 className="mx-auto mt-6 max-w-[850px] font-black tracking-[-0.07em] text-[#171717] text-3xl sm:text-4xl lg:text-5xl">
              Politique de Confidentialité &amp; Cookies
            </h1>

            <p className="mx-auto mt-4 max-w-[620px] text-sm sm:text-base leading-relaxed text-[#4b4b4b]">
              La protection de vos données personnelles et le respect de votre vie privée constituent un engagement fondamental dans chaque collaboration.
            </p>
          </div>
        </header>

        {/* Contenu structuré */}
        <article className="mx-auto max-w-[920px] px-4 pb-16 sm:px-6 lg:px-8 space-y-8 text-sm sm:text-base leading-relaxed text-[#4b4b4b]">
          {/* Section 1 : Introduction */}
          <section className="rounded-[1.8rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-9 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#171717]">
              1. Engagement de confidentialité
            </h2>
            <p className="mt-4">
              La présente politique de confidentialité a pour objectif de vous informer en toute transparence sur la manière dont <strong className="text-[#171717]">Nourou Dine AMANDOU</strong> collecte, utilise, protège et conserve vos données à caractère personnel lorsque vous naviguez sur ce site ou utilisez les formulaires de contact.
            </p>
            <p className="mt-3">
              Aucune donnée collectée n&apos;est vendue, louée ou cédée à des fins commerciales ou publicitaires à des entreprises tierces.
            </p>
          </section>

          {/* Section 2 : Responsable du traitement */}
          <section className="rounded-[1.8rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-9 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#171717]">
              2. Responsable du traitement des données
            </h2>
            <div className="mt-4 rounded-xl border border-[#171717]/6 bg-white p-4">
              <p className="font-bold text-[#171717]">Nourou Dine AMANDOU</p>
              <p className="mt-1 text-xs text-[#4b4b4b]">Graphiste &amp; Web Designer freelance</p>
              <p className="mt-2 text-xs">
                Courriel de contact pour toute question relative à vos données :{" "}
                <a href={`mailto:${site.email}`} className="font-bold text-[#0060c3] hover:underline">
                  {site.email}
                </a>
              </p>
            </div>
          </section>

          {/* Section 3 : Données collectées et finalités */}
          <section className="rounded-[1.8rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-9 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#171717]">
              3. Données personnelles collectées &amp; Finalités
            </h2>
            <p className="mt-4">
              Nous limitons la collecte aux informations strictement nécessaires à la bonne exécution des demandes et prestations :
            </p>

            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 rounded-xl border border-[#171717]/6 bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0060c3]" />
                <div>
                  <strong className="text-[#171717] block">Formulaire de contact et devis</strong>
                  <span className="text-xs text-[#4b4b4b]">
                    Nom complet, adresse e-mail, numéro de téléphone / WhatsApp, type de projet et description des besoins. Ces données servent exclusivement à étudier la faisabilité technique de votre projet et à formuler une proposition sur mesure.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-xl border border-[#171717]/6 bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0060c3]" />
                <div>
                  <strong className="text-[#171717] block">Inscription à la newsletter stratégique</strong>
                  <span className="text-xs text-[#4b4b4b]">
                    Adresse e-mail transmise volontairement pour recevoir les guides, retours d&apos;expérience et conseils webdesign. Possibilité de désinscription instantanée via un lien dédié dans chaque e-mail.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3 rounded-xl border border-[#171717]/6 bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0060c3]" />
                <div>
                  <strong className="text-[#171717] block">Cookies de mesure d’audience et techniques</strong>
                  <span className="text-xs text-[#4b4b4b]">
                    Données anonymisées (pages consultées, type de terminal, durée de consultation) utilisées pour fluidifier les parcours utilisateurs et repérer d&apos;éventuels ralentissements.
                  </span>
                </div>
              </li>
            </ul>
          </section>

          {/* Section 4 : Gestion des cookies avec module interactif */}
          <section className="rounded-[1.8rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-9 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#171717]">
                  4. Gestion des cookies &amp; Traceurs
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#4b4b4b]">
                  Vous gardez le contrôle total sur vos préférences de cookies à tout moment.
                </p>
              </div>

              <button
                type="button"
                onClick={openCookieModal}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0060c3] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-[#0060c3]/20 hover:bg-[#0050a5] transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <Settings2 className="h-3.5 w-3.5" />
                <span>Modifier mes choix de cookies</span>
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[#171717]/6 bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171717]">
                  <Lock className="h-3.5 w-3.5 text-[#0060c3]" />
                  <span>Essentiels</span>
                </div>
                <p className="mt-2 text-xs text-[#4b4b4b]">
                  Actifs par défaut. Assurent la navigation, la mémorisation de votre choix de cookies et la sécurité des requêtes.
                </p>
              </div>

              <div className="rounded-xl border border-[#171717]/6 bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171717]">
                  <Eye className="h-3.5 w-3.5 text-[#0060c3]" />
                  <span>Statistiques</span>
                </div>
                <p className="mt-2 text-xs text-[#4b4b4b]">
                  Optionnels. Permettent de mesurer anonymement la fréquentation pour améliorer les guides et articles.
                </p>
              </div>

              <div className="rounded-xl border border-[#171717]/6 bg-white p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171717]">
                  <Cookie className="h-3.5 w-3.5 text-[#0060c3]" />
                  <span>Personnalisation</span>
                </div>
                <p className="mt-2 text-xs text-[#4b4b4b]">
                  Optionnels. Retiennent vos filtres de navigation sur les projets pour une expérience plus fluide.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 : Durée de conservation */}
          <section className="rounded-[1.8rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-9 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#171717]">
              5. Durée de conservation des données
            </h2>
            <p className="mt-4">
              Les données de contact sont conservées pendant une durée maximale de 3 ans à compter du dernier contact émanant du prospect. En cas de contractualisation d&apos;une prestation web, les données de facturation sont conservées conformément aux obligations légales comptables (10 ans).
            </p>
            <p className="mt-3">
              Le consentement lié aux cookies est mémorisé pour une durée de 12 mois. Au terme de cette période, votre accord vous sera à nouveau demandé.
            </p>
          </section>

          {/* Section 6 : Vos droits */}
          <section className="rounded-[1.8rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-9 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#171717]">
              6. Exercice de vos droits
            </h2>
            <p className="mt-4">
              Conformément à la réglementation sur la protection des données personnelles, vous disposez des droits suivants :
            </p>
            <ul className="mt-3 list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li><strong className="text-[#171717]">Droit d&apos;accès</strong> aux informations vous concernant ;</li>
              <li><strong className="text-[#171717]">Droit de rectification</strong> des données inexactes ou incomplètes ;</li>
              <li><strong className="text-[#171717]">Droit à l&apos;effacement</strong> (droit à l&apos;oubli) de vos coordonnées ;</li>
              <li><strong className="text-[#171717]">Droit d&apos;opposition</strong> au traitement de vos données pour motifs légitimes.</li>
            </ul>
            <p className="mt-4 text-xs">
              Pour exercer l&apos;un de ces droits, envoyez simplement votre demande accompagnée d&apos;un justificatif d&apos;identité par courriel à :{" "}
              <a href={`mailto:${site.email}`} className="font-bold text-[#0060c3] hover:underline">
                {site.email}
              </a>. Nous vous répondrons sous 48 heures ouvrées.
            </p>
          </section>
        </article>

        <FinalCTA />
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
