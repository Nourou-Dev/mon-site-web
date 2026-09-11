import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Scale, ShieldCheck, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Mentions Légales — Nourou Dine AMANDOU",
  description:
    "Informations légales, hébergement et conditions d'utilisation du site officiel de Nourou Dine AMANDOU, Graphiste & Web Designer indépendant.",
};

export default function MentionsLegalesPage() {
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
              Mentions légales
            </li>
          </ol>
        </nav>

        {/* En-tête */}
        <header className="relative overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-[1240px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#171717]/10 bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#171717] shadow-sm">
              <Scale className="h-3.5 w-3.5 text-[#0060c3]" />
              Cadre Juridique
            </span>

            <h1 className="mx-auto mt-6 max-w-[800px] font-black tracking-[-0.07em] text-[#171717] text-3xl sm:text-4xl lg:text-5xl">
              Mentions Légales
            </h1>

            <p className="mx-auto mt-4 max-w-[620px] text-sm sm:text-base leading-relaxed text-[#4b4b4b]">
              Conformément aux dispositions légales en vigueur, vous trouverez ci-dessous les informations relatives à l&apos;éditeur et à l&apos;hébergement de ce site internet.
            </p>
          </div>
        </header>

        {/* Contenu textuel structuré */}
        <article className="mx-auto max-w-[920px] px-4 pb-16 sm:px-6 lg:px-8 space-y-8 text-sm sm:text-base leading-relaxed text-[#4b4b4b]">
          {/* Section 1 : Éditeur du site */}
          <section className="rounded-[1.8rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-9 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#171717]">
              1. Éditeur du site
            </h2>
            <p className="mt-4">
              Le site internet <strong className="text-[#171717]">nouroudineamandou.com</strong> est édité et géré par :
            </p>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
              <div className="rounded-xl border border-[#171717]/6 bg-white p-4">
                <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#171717]/60">
                  Responsable éditorial &amp; Créateur
                </dt>
                <dd className="mt-1 font-bold text-[#171717]">Nourou Dine AMANDOU</dd>
                <dd className="text-xs text-[#4b4b4b]">Graphiste &amp; Web Designer indépendant</dd>
              </div>

              <div className="rounded-xl border border-[#171717]/6 bg-white p-4">
                <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#171717]/60">
                  Localisation géographique
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 font-bold text-[#171717]">
                  <MapPin className="h-4 w-4 text-[#0060c3]" />
                  Abomey-Calavi, Bénin
                </dd>
              </div>

              <div className="rounded-xl border border-[#171717]/6 bg-white p-4">
                <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#171717]/60">
                  Contact direct par e-mail
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="font-bold text-[#0060c3] hover:underline"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>

              <div className="rounded-xl border border-[#171717]/6 bg-white p-4">
                <dt className="text-xs font-bold uppercase tracking-[0.1em] text-[#171717]/60">
                  Contact téléphonique &amp; WhatsApp
                </dt>
                <dd className="mt-1">
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#0060c3] hover:underline"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          {/* Section 2 : Hébergement */}
          <section className="rounded-[1.8rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-9 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#171717]">
              2. Hébergement du site
            </h2>
            <p className="mt-4">
              Ce site web est hébergé sur une infrastructure cloud moderne et haute disponibilité opérée par :
            </p>
            <div className="mt-4 rounded-xl border border-[#171717]/6 bg-white p-4 text-sm">
              <p className="font-bold text-[#171717]">Vercel Inc.</p>
              <p className="mt-1 text-xs text-[#4b4b4b]">
                440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
              </p>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#0060c3] hover:underline"
              >
                Site officiel de l&apos;hébergeur
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <p className="mt-4 text-xs text-[#4b4b4b]">
              L&apos;ensemble des données transférées bénéficie d&apos;un chiffrement SSL/TLS de bout en bout garantissant la confidentialité et l&apos;intégrité des échanges.
            </p>
          </section>

          {/* Section 3 : Propriété intellectuelle */}
          <section className="rounded-[1.8rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-9 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#171717]">
              3. Propriété intellectuelle et droits d&apos;auteur
            </h2>
            <p className="mt-4">
              L&apos;ensemble des éléments composant ce site (notamment la structure générale, l&apos;architecture ergonomique, la charte graphique, les textes descriptifs, les études de cas, les images, les logos, les maquettes et réalisations présentées) est la propriété exclusive de <strong className="text-[#171717]">Nourou Dine AMANDOU</strong>, sauf mention contraire expresse relative aux marques et réalisations clientes citées à titre de référence.
            </p>
            <p className="mt-3">
              Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est strictement interdite sans l&apos;autorisation écrite préalable de l&apos;auteur.
            </p>
          </section>

          {/* Section 4 : Données personnelles et cookies */}
          <section className="rounded-[1.8rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-9 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#171717]">
              4. Protection des données et respect de la vie privée
            </h2>
            <p className="mt-4">
              Les données personnelles transmises via le formulaire de contact ou les cookies sont traitées avec la plus grande rigueur et ne sont en aucun cas commercialisées à des tiers.
            </p>
            <p className="mt-3">
              Pour découvrir l&apos;ensemble de vos droits (accès, rectification, effacement) et gérer précisément vos consentements de traçage, veuillez vous référer à notre{" "}
              <Link
                href="/confidentialite"
                className="font-bold text-[#0060c3] underline underline-offset-2 hover:text-[#0050a5]"
              >
                Politique de Confidentialité &amp; Cookies
              </Link>.
            </p>
          </section>

          {/* Section 5 : Responsabilité */}
          <section className="rounded-[1.8rem] border border-[#171717]/8 bg-[#f8f9fa] p-6 sm:p-9 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black tracking-[-0.04em] text-[#171717]">
              5. Limitation de responsabilité
            </h2>
            <p className="mt-4">
              Nourou Dine AMANDOU s&apos;efforce d&apos;assurer au mieux de ses possibilités l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, il ne peut garantir l&apos;absence d&apos;erreurs ou d&apos;omissions ponctuelles. L&apos;internaute est invité à vérifier l&apos;exactitude des informations auprès de l&apos;éditeur lors de leurs échanges contractuels directs.
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
