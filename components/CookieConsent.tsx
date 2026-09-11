"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, Check, X, Settings2, ChevronDown, ChevronUp } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
}

const COOKIE_STORAGE_KEY = "nd_cookie_consent_v1";

function setBrowserCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
}

function deleteBrowserCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
}

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    preferences: true,
  });

  useEffect(() => {
    // Vérifier si un consentement existe déjà
    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!stored) {
        // Déclencher l'affichage du modal après un bref délai ergonomique
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 600);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
      }
    } catch {
      setIsOpen(true);
    }

    // Écouter l'événement global pour rouvrir le modal (ex: depuis la page confidentialité)
    const handleOpenModal = () => {
      setShowCustomize(true);
      setIsOpen(true);
    };

    window.addEventListener("nd_open_cookie_modal", handleOpenModal);
    return () => window.removeEventListener("nd_open_cookie_modal", handleOpenModal);
  }, []);

  const applyPreferences = (prefs: CookiePreferences, choice: "accepted_all" | "refused_all" | "customized" = "customized") => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
      setBrowserCookie("nd_cookie_consent", JSON.stringify(prefs));

      if (prefs.analytics) {
        setBrowserCookie("nd_analytics_allowed", "true");
      } else {
        deleteBrowserCookie("nd_analytics_allowed");
      }

      if (prefs.preferences) {
        setBrowserCookie("nd_prefs_allowed", "true");
      } else {
        deleteBrowserCookie("nd_prefs_allowed");
      }

      // Envoi de l'événement anonymisé pour le tableau de bord administrateur
      fetch("/api/app/cookies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          choice,
          analytics: prefs.analytics,
          experience: prefs.preferences,
        }),
      }).catch(() => {});
    } catch (e) {
      console.error("Erreur enregistrement cookies:", e);
    }
    setIsOpen(false);
    setShowCustomize(false);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      preferences: true,
    };
    setPreferences(allAccepted);
    applyPreferences(allAccepted, "accepted_all");
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      preferences: false,
    };
    setPreferences(onlyNecessary);
    applyPreferences(onlyNecessary, "refused_all");
  };

  const handleSaveCustom = () => {
    applyPreferences(preferences, "customized");
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[60] w-[calc(100vw-2rem)] sm:w-[350px] max-w-[360px] animate-rise"
    >
      <div className="relative flex flex-col rounded-2xl border border-[#171717]/12 bg-white p-5 shadow-[0_16px_40px_rgba(23,23,23,0.16)] transition-all">
        {/* En-tête */}
        <div className="flex items-center justify-between gap-2 border-b border-[#171717]/8 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0060c3]/10 text-[#0060c3]">
              <Cookie className="h-4 w-4" />
            </div>
            <h2 id="cookie-title" className="text-sm font-bold tracking-tight text-[#171717]">
              Gestion des cookies
            </h2>
          </div>
          <button
            type="button"
            onClick={handleRejectAll}
            aria-label="Fermer et refuser les cookies optionnels"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#171717]/70 hover:bg-[#f4f6f8] hover:text-[#171717] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Corps */}
        {!showCustomize ? (
          <>
            <div className="py-3 text-xs text-[#374151] leading-relaxed">
              <p>
                Ce site utilise des cookies essentiels pour son bon fonctionnement et, avec votre accord, des cookies de mesure d’audience et d’expérience.
              </p>
              <p className="mt-1.5 text-[11px] text-[#4b5563]">
                Vous pouvez tout accepter, refuser ou personnaliser vos choix. Voir la{" "}
                <Link
                  href="/confidentialite"
                  onClick={() => setIsOpen(false)}
                  className="font-semibold text-[#0060c3] underline underline-offset-2 hover:text-[#0050a5]"
                >
                  Politique de Confidentialité
                </Link>.
              </p>
            </div>

            {/* Boutons d'action compacts */}
            <div className="border-t border-[#171717]/8 pt-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full rounded-xl bg-[#0060c3] py-3 px-4 text-xs font-bold text-white hover:bg-[#0050a5] shadow-sm shadow-[#0060c3]/25 transition-all hover:-translate-y-0.5 text-center min-h-[44px]"
              >
                Tout accepter
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="rounded-xl border border-[#171717]/15 bg-white py-2.5 px-2.5 text-xs font-semibold text-[#171717] hover:bg-[#f4f6f8] transition-colors text-center truncate min-h-[40px]"
                >
                  Refuser
                </button>
                <button
                  type="button"
                  onClick={() => setShowCustomize(true)}
                  className="rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2.5 px-2.5 text-xs font-semibold text-[#171717] hover:bg-white hover:text-[#0060c3] hover:border-[#0060c3]/30 transition-colors text-center inline-flex items-center justify-center gap-1 truncate min-h-[40px]"
                >
                  <Settings2 className="h-3.5 w-3.5" />
                  <span>Personnaliser</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Panneau de personnalisation */}
            <div className="max-h-[260px] overflow-y-auto space-y-2.5 py-3 pr-1 text-xs">
              {/* Essentiels */}
              <div className="flex items-start justify-between gap-2 rounded-xl bg-[#f8f9fa] p-2.5 border border-[#171717]/6">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-[#171717]">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-[11px]">Strictement nécessaires</span>
                  </div>
                  <p className="mt-0.5 text-[#4b4b4b] text-[10px] leading-relaxed">
                    Indispensables au fonctionnement et à la sécurité du site.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#0060c3]/10 px-2 py-0.5 text-[9px] font-bold text-[#0060c3]">
                  Actif
                </span>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-2 rounded-xl bg-[#f8f9fa] p-2.5 border border-[#171717]/6">
                <div>
                  <p className="font-bold text-[#171717] text-[11px]">Mesure d’audience</p>
                  <p className="mt-0.5 text-[#4b4b4b] text-[10px] leading-relaxed">
                    Statistiques anonymes de consultation des pages.
                  </p>
                </div>
                <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    aria-label="Autoriser les cookies de mesure d'audience"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="h-5 w-9 rounded-full bg-[#171717]/20 peer-checked:bg-[#0060c3] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>

              {/* Préférences */}
              <div className="flex items-start justify-between gap-2 rounded-xl bg-[#f8f9fa] p-2.5 border border-[#171717]/6">
                <div>
                  <p className="font-bold text-[#171717] text-[11px]">Expérience &amp; Confort</p>
                  <p className="mt-0.5 text-[#4b4b4b] text-[10px] leading-relaxed">
                    Mémorisation des filtres et choix ergonomiques.
                  </p>
                </div>
                <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    aria-label="Autoriser les cookies d'expérience et confort"
                    checked={preferences.preferences}
                    onChange={(e) =>
                      setPreferences({ ...preferences, preferences: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="h-5 w-9 rounded-full bg-[#171717]/20 peer-checked:bg-[#0060c3] transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            </div>

            {/* Actions personnalisation */}
            <div className="border-t border-[#171717]/8 pt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setShowCustomize(false)}
                className="text-xs font-semibold text-[#4b4b4b] hover:text-[#171717] underline py-1"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="rounded-xl bg-[#0060c3] py-2 px-3.5 text-xs font-bold text-white hover:bg-[#0050a5] shadow-sm transition-all"
              >
                Enregistrer mes choix
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
