"use client";

import { useEffect, useState } from "react";
import { Cookie, ShieldCheck, CheckCircle2, XCircle, Sliders, Calendar, Info, RefreshCw } from "lucide-react";
import { CookieConsentLog } from "@/lib/appStorage";

interface CookieStats {
  total: number;
  acceptedAll: number;
  refusedAll: number;
  customized: number;
  analyticsRate: number;
  recentLogs: CookieConsentLog[];
}

export default function CookiesAnalyticsPage() {
  const [stats, setStats] = useState<CookieStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/app/cookies");
      const data = await res.json();
      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#0060c3] border-t-transparent" />
      </div>
    );
  }

  const total = stats?.total || 1;
  const acceptedAll = stats?.acceptedAll || 0;
  const refusedAll = stats?.refusedAll || 0;
  const customized = stats?.customized || 0;

  const acceptPercent = Math.round((acceptedAll / total) * 100);
  const refusePercent = Math.round((refusedAll / total) * 100);
  const customPercent = Math.round((customized / total) * 100);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#171717]">Statistiques &amp; Consentement des Cookies</h1>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
              Conformité RGPD
            </span>
          </div>
          <p className="mt-1 text-sm text-[#4b4b4b]">
            Suivez les choix réels effectués par vos visiteurs via le modal de cookies sur votre site.
          </p>
        </div>

        <button
          onClick={fetchStats}
          className="inline-flex items-center gap-2 rounded-full border border-[#171717]/15 bg-white px-4 py-2 text-xs font-bold text-[#171717] shadow-sm hover:bg-[#171717]/5 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5 text-[#0060c3]" />
          <span>Actualiser</span>
        </button>
      </div>

      {/* 4 Indicateurs Clés */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">Décisions Enregistrées</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0060c3]/10 text-[#0060c3]">
              <Cookie className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-[#171717]">{stats?.total || 0}</p>
          <p className="mt-1 text-xs text-[#4b4b4b]">Visites interactives qualifiées</p>
        </div>

        <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">Tout Accepté</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-black text-emerald-700">{acceptPercent}%</p>
            <span className="text-xs text-[#4b4b4b]">({acceptedAll} visiteurs)</span>
          </div>
          <p className="mt-1 text-xs text-emerald-600 font-semibold">Autorise les mesures d'audience</p>
        </div>

        <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">Tout Refusé</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <XCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-black text-red-700">{refusePercent}%</p>
            <span className="text-xs text-[#4b4b4b]">({refusedAll} visiteurs)</span>
          </div>
          <p className="mt-1 text-xs text-red-600 font-semibold">Seulement les traceurs requis</p>
        </div>

        <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">Personnalisé</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Sliders className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-black text-blue-700">{customPercent}%</p>
            <span className="text-xs text-[#4b4b4b]">({customized} visiteurs)</span>
          </div>
          <p className="mt-1 text-xs text-blue-600 font-semibold">Choix fin par catégorie</p>
        </div>
      </div>

      {/* Barre de répartition visuelle */}
      <div className="rounded-[2rem] border border-[#171717]/10 bg-white p-6 shadow-sm">
        <h2 className="text-base font-bold text-[#171717]">Répartition Graphique des Consentements</h2>
        <div className="mt-4 h-5 w-full overflow-hidden rounded-full bg-gray-100 flex p-1 border border-[#171717]/5">
          <div
            style={{ width: `${acceptPercent}%` }}
            className="h-full rounded-l-full bg-emerald-500 transition-all duration-500"
            title={`Tout accepté: ${acceptPercent}%`}
          />
          <div
            style={{ width: `${customPercent}%` }}
            className="h-full bg-blue-500 transition-all duration-500"
            title={`Personnalisé: ${customPercent}%`}
          />
          <div
            style={{ width: `${refusePercent}%` }}
            className="h-full rounded-r-full bg-red-400 transition-all duration-500"
            title={`Refusé: ${refusePercent}%`}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-6 text-xs text-[#4b4b4b]">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
            <span>Tout accepté ({acceptPercent}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span>Personnalisé ({customPercent}%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <span>Refusé ({refusePercent}%)</span>
          </div>
        </div>
      </div>

      {/* Journal d'Audit & Historique Récent */}
      <div className="overflow-hidden rounded-[2rem] border border-[#171717]/10 bg-white shadow-sm">
        <div className="border-b border-[#171717]/10 bg-[#f8f9fa] px-6 py-4">
          <h3 className="text-sm font-bold text-[#171717]">Journal Anonymisé des Derniers Événements de Consentement</h3>
          <p className="text-xs text-[#4b4b4b]">Preuve de traçabilité conforme aux directives de la CNIL et du RGPD.</p>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#171717]/10 bg-white text-[11px] font-bold uppercase tracking-wider text-[#4b4b4b]">
            <tr>
              <th className="px-6 py-3.5">Date &amp; Heure</th>
              <th className="px-6 py-3.5">Choix Utilisateur</th>
              <th className="px-6 py-3.5">Mesure d'Audience</th>
              <th className="px-6 py-3.5">Préférences</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#171717]/10">
            {stats?.recentLogs && stats.recentLogs.length > 0 ? (
              stats.recentLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#f8f9fa]/50 transition-colors">
                  <td className="px-6 py-3.5 text-[#171717]">
                    {new Date(log.timestamp).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        log.choice === "accepted_all"
                          ? "bg-emerald-100 text-emerald-800"
                          : log.choice === "refused_all"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {log.choice === "accepted_all"
                        ? "Tout accepté"
                        : log.choice === "refused_all"
                        ? "Tout refusé"
                        : "Personnalisé"}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    {log.analytics ? (
                      <span className="text-emerald-700 font-bold">Autorisé ✓</span>
                    ) : (
                      <span className="text-gray-400">Bloqué ✗</span>
                    )}
                  </td>
                  <td className="px-6 py-3.5">
                    {log.experience ? (
                      <span className="text-emerald-700 font-bold">Autorisé ✓</span>
                    ) : (
                      <span className="text-gray-400">Bloqué ✗</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-8 text-center text-[#4b4b4b]">
                  Aucun événement de consentement enregistré pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
