"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  FileCheck,
  FileText,
  Layers,
  MessageSquare,
  Monitor,
  Shield,
  Smartphone,
  Sparkles,
} from "lucide-react";

const tickerEvents = [
  { text: "Progression mise à jour : 85%", time: "Il y a 10 min", color: "bg-emerald-500" },
  { text: "Maquette page d'accueil validée", time: "Il y a 1h", color: "bg-[#0060c3]" },
  { text: "Aperçu mobile interactif disponible", time: "Il y a 3h", color: "bg-indigo-500" },
  { text: "Contrat signé électroniquement", time: "Hier", color: "bg-emerald-500" },
  { text: "Cadrage stratégique complété", time: "Il y a 2j", color: "bg-amber-500" },
];

const features = [
  {
    id: "tracking",
    title: "Suivi en temps réel",
    subtitle: "Zéro mystère sur l'avancement",
    desc: "Suivez chaque étape de conception, du premier wireframe jusqu'à la mise en production. Vous savez exactement ce qui est fait et ce qui arrive.",
    icon: Clock,
  },
  {
    id: "preview",
    title: "Aperçu en direct",
    subtitle: "Testez votre site avant tout le monde",
    desc: "Visualisez les maquettes et le site fonctionnel sur ordinateur, tablette et mobile directement depuis votre navigateur avant validation.",
    icon: Monitor,
  },
  {
    id: "contract",
    title: "Contrat & Signature en ligne",
    subtitle: "Un cadre juridique clair et rassurant",
    desc: "Devis détaillé, engagements de calendrier et signature électronique sécurisée pour démarrer sans paperasse ni perte de temps.",
    icon: FileCheck,
  },
  {
    id: "tickets",
    title: "Demandes de retours en 1 clic",
    subtitle: "Fini les remarques éparpillées",
    desc: "Signalez un ajustement ou une correction directement sur la maquette concernée. Chaque retour est consigné et validé sans risque d'oubli.",
    icon: MessageSquare,
  },
];

export default function ClientSpace() {
  const [activeTab, setActiveTab] = useState<string>("tracking");

  return (
    <section id="espace-client" className="scroll-mt-[5.5rem] bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        {/* En-tête de section */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0060c3]/20 bg-[#0060c3]/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#0060c3]">
            <Sparkles className="h-3.5 w-3.5" />
            Votre sérénité absolue
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-[-0.05em] text-[#171717] sm:text-4xl lg:text-5xl">
            Découvrez votre <span className="text-[#0060c3]">espace client dédié</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#4b4b4b] sm:text-lg">
            Un portail privé développé sur-mesure pour vous offrir une transparence totale, un suivi fluide et une expérience sans équivalent sur le marché.
          </p>
        </div>

        {/* Studio interactif de l'Espace Client */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-center">
          {/* Liste des fonctionnalités interactives (onglets) */}
          <div className="space-y-3">
            {features.map((feat) => {
              const Icon = feat.icon;
              const isActive = activeTab === feat.id;

              return (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => setActiveTab(feat.id)}
                  className={`flex w-full items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
                    isActive
                      ? "border-[#0060c3] bg-[#0060c3]/5 shadow-md shadow-[#0060c3]/10 scale-[1.01]"
                      : "border-[#171717]/8 bg-[#fbfcfd] hover:border-[#171717]/20 hover:bg-white"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isActive ? "bg-[#0060c3] text-white" : "bg-[#171717]/5 text-[#171717]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#171717]">{feat.title}</h3>
                      {isActive && (
                        <span className="rounded-full bg-[#0060c3] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                          Actif
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-[#0060c3] mt-0.5">{feat.subtitle}</p>
                    <p className="mt-2 text-xs leading-relaxed text-[#4b4b4b] sm:text-sm">
                      {feat.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Démonstration tactile du Dashboard (Interface Réelle) */}
          <div className="relative overflow-hidden rounded-3xl border border-[#171717]/10 bg-white p-6 shadow-2xl sm:p-8">
            {/* Barre de fenêtre macOS */}
            <div className="flex items-center justify-between border-b border-[#171717]/8 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-2 rounded-md bg-[#f4f6f8] px-3 py-1 font-mono text-[11px] font-medium text-[#4b4b4b]">
                  app.nouroudineamandou.com
                </span>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Connecté
              </span>
            </div>

            {/* Contenu de la maquette selon l'onglet actif */}
            <div className="mt-6 min-h-[340px]">
              {activeTab === "tracking" && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#f8f9fa] border border-[#171717]/8 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">
                          Projet : Refonte Vitrine &amp; Tunnel
                        </span>
                        <h4 className="text-lg font-black text-[#171717] mt-0.5">Avancement global</h4>
                      </div>
                      <span className="text-2xl font-black text-[#0060c3]">85%</span>
                    </div>
                    {/* Barre de progression */}
                    <div className="mt-3 h-2.5 w-full rounded-full bg-[#171717]/10 overflow-hidden">
                      <div className="h-full bg-[#0060c3] rounded-full transition-all duration-500 w-[85%]" />
                    </div>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b] pt-2">
                    Dernières activités en direct :
                  </p>
                  <div className="space-y-2.5">
                    {tickerEvents.map((evt, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-xl border border-[#171717]/6 bg-white p-3 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`h-2.5 w-2.5 rounded-full ${evt.color}`} />
                          <span className="text-xs font-medium text-[#171717]">{evt.text}</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#4b4b4b]">{evt.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "preview" && (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <div className="flex gap-4 mb-6">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#0060c3] bg-[#0060c3]/10 px-3 py-1.5 text-xs font-bold text-[#0060c3]">
                      <Monitor className="h-4 w-4" /> Version Ordinateur
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#171717]/10 bg-[#f8f9fa] px-3 py-1.5 text-xs font-semibold text-[#4b4b4b]">
                      <Smartphone className="h-4 w-4" /> Version Mobile
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] w-full rounded-2xl border border-[#171717]/10 bg-[#f4f6f8] p-4 flex flex-col justify-between shadow-inner">
                    <div className="flex items-center justify-between border-b border-[#171717]/8 pb-2">
                      <div className="h-3 w-20 rounded bg-[#171717]/20" />
                      <div className="flex gap-1.5">
                        <div className="h-2 w-8 rounded bg-[#171717]/20" />
                        <div className="h-2 w-8 rounded bg-[#171717]/20" />
                      </div>
                    </div>
                    <div className="py-8">
                      <div className="mx-auto h-4 w-3/4 rounded bg-[#0060c3]/40" />
                      <div className="mx-auto mt-2 h-3 w-1/2 rounded bg-[#171717]/15" />
                      <div className="mx-auto mt-4 h-7 w-28 rounded-full bg-[#0060c3]" />
                    </div>
                    <div className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Site responsive vérifié sur 8 résolutions d&apos;écrans
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "contract" && (
                <div className="space-y-4 p-2">
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold">
                        <FileCheck className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-emerald-900">Contrat de prestation validé</h4>
                        <p className="text-xs text-emerald-700">Horodatage sécurisé conforme et archivé</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#171717]/8 bg-[#f8f9fa] p-4 text-xs space-y-2 text-[#4b4b4b]">
                    <div className="flex justify-between py-1 border-b border-[#171717]/6">
                      <span>Délai d&apos;exécution garanti</span>
                      <strong className="text-[#171717]">3 semaines</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#171717]/6">
                      <span>Modalités de règlement</span>
                      <strong className="text-[#171717]">Acompte 40% / Solde à la mise en ligne</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Garantie de maintenance</span>
                      <strong className="text-[#171717]">30 jours offerts post-livraison</strong>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "tickets" && (
                <div className="space-y-3 p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">
                      Tickets de révision :
                    </span>
                    <span className="text-xs font-bold text-emerald-600">3 traités / 3</span>
                  </div>

                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-[#171717] block">Ajustement du texte d&apos;accroche</strong>
                      <span className="text-[#4b4b4b]">Modifié et validé dans la version V2.1</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-3 flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-[#171717] block">Remplacement des photos du catalogue</strong>
                      <span className="text-[#4b4b4b]">3 photos HD intégrées et optimisées WebP</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bouton d'accès direct à l'espace client */}
            <div className="mt-6 pt-4 border-t border-[#171717]/8 flex items-center justify-between">
              <span className="text-xs text-[#4b4b4b] font-medium">
                Déjà client ? Accédez à votre tableau de bord
              </span>
              <Link
                href="/app"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0060c3] hover:underline"
              >
                <span>Connexion Espace Client</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
