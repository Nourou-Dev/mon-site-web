"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Cookie,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Sliders,
  Calendar,
  RefreshCw,
  Download,
  Search,
  Globe,
  Monitor,
} from "lucide-react";
import { CookieConsentLog } from "@/lib/appStorage";

interface CookieStats {
  total: number;
  acceptedAll: number;
  refusedAll: number;
  customized: number;
  analyticsRate: number;
  availableMonths: string[];
  recentLogs: CookieConsentLog[];
}

export default function AdminCookiesAnalyticsPage() {
  const [stats, setStats] = useState<CookieStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [choiceFilter, setChoiceFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const fetchStats = async (month?: string) => {
    setLoading(true);
    try {
      const q = month && month !== "all" ? `?month=${month}` : "";
      const res = await fetch(`/api/app/cookies${q}`);
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
    fetchStats(selectedMonth);
  }, [selectedMonth]);

  const filteredLogs = useMemo(() => {
    if (!stats?.recentLogs) return [];
    return stats.recentLogs.filter((log) => {
      const matchChoice = choiceFilter === "all" || log.choice === choiceFilter;
      const s = search.toLowerCase();
      const matchSearch =
        !search ||
        (log.ip && log.ip.toLowerCase().includes(s)) ||
        (log.userAgent && log.userAgent.toLowerCase().includes(s)) ||
        (log.country && log.country.toLowerCase().includes(s));
      return matchChoice && matchSearch;
    });
  }, [stats?.recentLogs, choiceFilter, search]);

  const exportCSV = () => {
    if (!filteredLogs || filteredLogs.length === 0) return;
    const headers = ["ID", "Date", "Mois", "Adresse IP", "Pays", "Choix", "Analytiques", "Experience", "User-Agent"];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.timestamp,
      l.month || l.timestamp.slice(0, 7),
      l.ip || "127.0.0.1",
      l.country || "N/A",
      l.choice,
      l.analytics ? "OUI" : "NON",
      l.experience ? "OUI" : "NON",
      `"${(l.userAgent || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `consentements_cookies_${selectedMonth}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* En-tête Cookies */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#0f172a] lg:text-3xl">
              Statistiques &amp; Journaux de Cookies
            </h1>
            <span className="shrink-0 flex items-center gap-1 rounded-full bg-[#e0e7ff] px-2.5 py-0.5 text-xs font-bold text-[#312e81] border border-[#c7d2fe]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#4338ca]" />
              RGPD &amp; ePrivacy
            </span>
          </div>
          <p className="mt-1 text-sm text-[#475569]">
            Traçabilité des consentements : choix utilisateurs, adresses IP, pays et taux d&apos;acceptation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => fetchStats(selectedMonth)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs font-bold text-[#0f172a] shadow-sm hover:bg-[#f8fafc] hover:border-[#4338ca] transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#4338ca] ${loading ? "animate-spin" : ""}`} />
            <span>Actualiser</span>
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4338ca] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#4338ca]/25 hover:bg-[#3730a3] transition active:scale-95 shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Exporter CSV</span>
          </button>
        </div>
      </div>

      {/* Cartes Métriques Cookies */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#64748b]">Total Décisions</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e0e7ff] text-[#4338ca]">
              <Cookie className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-[#0f172a]">{stats?.total || 0}</p>
          <p className="mt-1 text-[11px] text-[#64748b]">Visiteurs ayant fait un choix</p>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Tout Accepté</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-emerald-800">{stats?.acceptedAll || 0}</p>
          <p className="mt-1 text-[11px] font-semibold text-emerald-800">
            {stats?.total ? Math.round(((stats.acceptedAll || 0) / stats.total) * 100) : 0}% du total
          </p>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">Tout Refusé</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-800">
              <XCircle className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-rose-800">{stats?.refusedAll || 0}</p>
          <p className="mt-1 text-[11px] font-semibold text-rose-800">
            {stats?.total ? Math.round(((stats.refusedAll || 0) / stats.total) * 100) : 0}% du total
          </p>
        </div>

        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4338ca]">Taux d&apos;Acceptation</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e0e7ff] text-[#4338ca]">
              <Sliders className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-black text-[#4338ca]">{stats?.analyticsRate || 0}%</p>
          <p className="mt-1 text-[11px] font-semibold text-[#4338ca]">Cookies analytiques autorisés</p>
        </div>
      </div>

      {/* Barre de Filtres par Mois et Choix */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Rechercher par IP, pays ou navigateur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] py-2.5 pl-9 pr-4 text-xs text-[#0f172a] focus:border-[#4338ca] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4338ca]/20"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <Calendar className="h-3.5 w-3.5 text-[#64748b]" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3 py-2 text-xs font-bold text-[#0f172a] focus:border-[#4338ca] focus:outline-none"
            >
              <option value="all">Tous les mois</option>
              {stats?.availableMonths?.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <select
              value={choiceFilter}
              onChange={(e) => setChoiceFilter(e.target.value)}
              className="rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3 py-2 text-xs font-bold text-[#0f172a] focus:border-[#4338ca] focus:outline-none"
            >
              <option value="all">Tous les choix</option>
              <option value="accepted_all">Accepté Tout</option>
              <option value="refused_all">Refusé Tout</option>
              <option value="customized">Personnalisé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des Journaux de Cookies */}
      <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-[#e2e8f0] bg-[#f8fafc] text-xs font-bold uppercase tracking-wider text-[#64748b]">
              <tr>
                <th scope="col" className="py-4 px-4 sm:px-6">Date &amp; Heure</th>
                <th scope="col" className="py-4 px-4 sm:px-6">Adresse IP &amp; Pays</th>
                <th scope="col" className="py-4 px-4 sm:px-6">Décision Utilisateur</th>
                <th scope="col" className="py-4 px-4 sm:px-6">Analytiques</th>
                <th scope="col" className="py-4 px-4 sm:px-6">Expérience</th>
                <th scope="col" className="py-4 px-4 sm:px-6">Navigateur / User-Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs font-semibold text-[#64748b]">
                    Chargement des journaux de consentement...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs font-semibold text-[#64748b]">
                    Aucun journal de consentement enregistré pour ce filtre.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 text-xs text-[#0f172a] font-mono">
                      {new Date(log.timestamp).toLocaleString("fr-FR")}
                    </td>

                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#0f172a]">
                        <Globe className="h-3 w-3 text-[#94a3b8]" />
                        <span>{log.ip || "127.0.0.1"}</span>
                        <span className="rounded bg-[#f1f5f9] px-1.5 py-0.5 text-[10px] font-normal text-[#475569]">
                          {log.country || "Bénin (BJ)"}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6">
                      {log.choice === "accepted_all" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Tout Accepté
                        </span>
                      ) : log.choice === "refused_all" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-700">
                          <XCircle className="h-3 w-3" />
                          Tout Refusé
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700">
                          <Sliders className="h-3 w-3" />
                          Personnalisé
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 sm:px-6">
                      <span className={`font-bold text-xs ${log.analytics ? "text-emerald-700" : "text-rose-700"}`}>
                        {log.analytics ? "Actif" : "Bloqué"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6">
                      <span className={`font-bold text-xs ${log.experience ? "text-emerald-700" : "text-rose-700"}`}>
                        {log.experience ? "Actif" : "Bloqué"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 sm:px-6 max-w-xs truncate text-[11px] text-[#64748b] font-mono" title={log.userAgent}>
                      {log.userAgent || "Navigateur standard"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
