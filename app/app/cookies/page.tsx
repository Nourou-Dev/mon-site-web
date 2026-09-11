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
  Filter,
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

export default function CookiesAnalyticsPage() {
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

  // Filtrer les logs affichés
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
      l.analytics ? "Oui" : "Non",
      l.experience ? "Oui" : "Non",
      `"${(l.userAgent || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `registre_cookies_rgpd_${selectedMonth}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const total = stats?.total || 1;
  const acceptedAll = stats?.acceptedAll || 0;
  const refusedAll = stats?.refusedAll || 0;
  const customized = stats?.customized || 0;

  const acceptPercent = Math.round((acceptedAll / total) * 100);
  const refusePercent = Math.round((refusedAll / total) * 100);
  const customPercent = Math.round((customized / total) * 100);

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-[#171717] sm:text-3xl">
              Registre &amp; Traçabilité des Cookies
            </h1>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
              Conformité RGPD
            </span>
          </div>
          <p className="mt-1 text-sm text-[#4b4b4b]">
            Enregistrement complet des choix des visiteurs : IP, date, mois, décision et catégories acceptées.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => fetchStats(selectedMonth)}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-[#171717]/15 bg-white px-4 py-2.5 text-xs font-bold text-[#171717] shadow-sm hover:bg-[#171717]/5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#0060c3] ${loading ? "animate-spin" : ""}`} />
            <span>Actualiser</span>
          </button>

          <button
            onClick={exportCSV}
            disabled={filteredLogs.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0060c3] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#0060c3]/20 hover:bg-[#0050a5] transition-all disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Exporter le Registre CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Indicateurs Clés */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">Décisions Totales</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0060c3]/10 text-[#0060c3]">
              <Cookie className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-[#171717]">{stats?.total || 0}</p>
          <p className="mt-1 text-xs text-[#4b4b4b]">Sur la période sélectionnée</p>
        </div>

        <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">Tout Accepté</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">{acceptedAll}</span>
            <span className="text-xs font-bold text-emerald-700">({acceptPercent}%)</span>
          </div>
          <p className="mt-1 text-xs text-[#4b4b4b]">Plein consentement analytique &amp; UX</p>
        </div>

        <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">Personnalisé</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Sliders className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-600">{customized}</span>
            <span className="text-xs font-bold text-blue-700">({customPercent}%)</span>
          </div>
          <p className="mt-1 text-xs text-[#4b4b4b]">Choix fin par catégorie</p>
        </div>

        <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">Tout Refusé</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <XCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-red-600">{refusedAll}</span>
            <span className="text-xs font-bold text-red-700">({refusePercent}%)</span>
          </div>
          <p className="mt-1 text-xs text-[#4b4b4b]">Uniquement cookies essentiels</p>
        </div>
      </div>

      {/* Barre d'outils : Filtre par Mois, Choix et Recherche par IP */}
      <div className="rounded-2xl border border-[#171717]/10 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {/* Sélecteur de Mois */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#0060c3]" />
              <label className="text-xs font-bold text-[#171717]">Mois :</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-3 py-2 text-xs font-bold text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none"
              >
                <option value="all">Tous les mois enregistrés</option>
                {stats?.availableMonths.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtre par Décision */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#4b4b4b]" />
              <label className="text-xs font-bold text-[#171717]">Décision :</label>
              <select
                value={choiceFilter}
                onChange={(e) => setChoiceFilter(e.target.value)}
                className="rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-3 py-2 text-xs font-bold text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none"
              >
                <option value="all">Toutes les décisions</option>
                <option value="accepted_all">Accepté (Tout)</option>
                <option value="refused_all">Refusé (Tout)</option>
                <option value="customized">Personnalisé</option>
              </select>
            </div>
          </div>

          {/* Champ Recherche par IP / User-Agent */}
          <div className="relative min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par IP ou Navigateur..."
              className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2 pl-9 pr-3 text-xs text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Tableau d'audit détaillé */}
      <div className="rounded-[2rem] border border-[#171717]/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#171717]">Registre Détaillé des Consentements</h2>
            <p className="text-xs text-[#4b4b4b]">
              {filteredLogs.length} décision{filteredLogs.length > 1 ? "s" : ""} affichée{filteredLogs.length > 1 ? "s" : ""}.
            </p>
          </div>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#4b4b4b]">
            Aucun enregistrement de consentement trouvé pour cette sélection.
          </div>
        ) : (
          <>
            {/* VUE MOBILE : Cartes logs RGPD fluides */}
            <div className="space-y-3 md:hidden">
              {filteredLogs.map((log) => {
                const d = new Date(log.timestamp);
                const formattedDate = isNaN(d.getTime())
                  ? log.timestamp
                  : d.toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                return (
                  <div
                    key={log.id}
                    className="rounded-2xl border border-[#171717]/10 bg-[#fbfbfb] p-4 shadow-sm space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md border border-slate-200">
                        <Globe className="h-3 w-3 text-[#0060c3]" />
                        {log.ip || "127.0.0.1"}
                      </span>
                      <span className="font-mono text-[11px] text-[#4b4b4b]">{formattedDate}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <div>
                        {log.choice === "accepted_all" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="h-3 w-3" />
                            Tout Accepté
                          </span>
                        )}
                        {log.choice === "refused_all" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-bold text-red-700 border border-red-200">
                            <XCircle className="h-3 w-3" />
                            Tout Refusé
                          </span>
                        )}
                        {log.choice === "customized" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200">
                            <Sliders className="h-3 w-3" />
                            Personnalisé
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-[#4b4b4b]">Pays :</span>
                        <strong className="text-[#171717]">{log.country || "Non déterminé"}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="rounded-xl bg-white p-2 border border-[#171717]/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-[#7b7b7b]">Analytiques</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            log.analytics ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {log.analytics ? "Oui" : "Non"}
                        </span>
                      </div>
                      <div className="rounded-xl bg-white p-2 border border-[#171717]/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-[#7b7b7b]">Expérience</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            log.experience ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {log.experience ? "Oui" : "Non"}
                        </span>
                      </div>
                    </div>

                    {log.userAgent && (
                      <p className="text-[10px] text-[#7b7b7b] truncate flex items-center gap-1 pt-0.5">
                        <Monitor className="h-3 w-3 shrink-0" />
                        <span className="truncate">{log.userAgent}</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* VUE TABLETTE & DESKTOP */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#171717]/10 bg-[#f8f9fa] text-[11px] font-bold uppercase tracking-wider text-[#4b4b4b]">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Date &amp; Heure</th>
                    <th className="px-4 py-3">Adresse IP</th>
                    <th className="px-4 py-3">Pays</th>
                    <th className="px-4 py-3">Choix</th>
                    <th className="px-4 py-3">Analytiques</th>
                    <th className="px-4 py-3">Expérience</th>
                    <th className="px-4 py-3 rounded-r-xl">Navigateur / User-Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171717]/5 font-medium text-[#171717]">
                  {filteredLogs.map((log) => {
                    const d = new Date(log.timestamp);
                    const formattedDate = isNaN(d.getTime())
                      ? log.timestamp
                      : d.toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        });

                    return (
                      <tr key={log.id} className="hover:bg-[#f8f9fa]/80 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-[11px] text-[#4b4b4b] whitespace-nowrap">
                          {formattedDate}
                        </td>

                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md border border-slate-200">
                            <Globe className="h-3 w-3 text-[#0060c3]" />
                            {log.ip || "127.0.0.1"}
                          </span>
                        </td>

                        <td className="px-4 py-3.5 text-[#4b4b4b]">
                          {log.country || "Non déterminé"}
                        </td>

                        <td className="px-4 py-3.5">
                          {log.choice === "accepted_all" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="h-3 w-3" />
                              Tout Accepté
                            </span>
                          )}
                          {log.choice === "refused_all" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-bold text-red-700 border border-red-200">
                              <XCircle className="h-3 w-3" />
                              Tout Refusé
                            </span>
                          )}
                          {log.choice === "customized" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200">
                              <Sliders className="h-3 w-3" />
                              Personnalisé
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              log.analytics ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {log.analytics ? "Oui" : "Non"}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              log.experience ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {log.experience ? "Oui" : "Non"}
                          </span>
                        </td>

                        <td className="px-4 py-3.5 text-[#4b4b4b] max-w-xs truncate" title={log.userAgent}>
                          <span className="flex items-center gap-1.5 truncate">
                            <Monitor className="h-3 w-3 shrink-0 text-[#7b7b7b]" />
                            <span className="truncate text-[11px]">{log.userAgent || "Navigateur inconnu"}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
