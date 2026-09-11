"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  FolderKanban,
  MessageSquare,
  Cookie,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import { ProjectRecord } from "@/lib/appStorage";
import { InquiryRecord } from "@/lib/storage";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client";
  company?: string;
}

export default function AppDashboardPage() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [cookieRate, setCookieRate] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // 1. Session utilisateur
        const authRes = await fetch("/api/app/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "me" }),
        });
        const authData = await authRes.json();
        if (authData.authenticated) {
          setUser(authData.user);
        }

        // 2. Projets
        const prjRes = await fetch("/api/app/projects");
        const prjData = await prjRes.json();
        if (prjData.success) {
          setProjects(prjData.projects);
        }

        // 3. Leads (Demandes & Newsletter) si admin
        const leadsRes = await fetch("/api/app/leads");
        const leadsData = await leadsRes.json();
        if (leadsData.success) {
          setInquiries(leadsData.inquiries || []);
          setSubscribersCount(leadsData.subscribers?.length || 0);
        }

        // 4. Statistiques Cookies
        const cookieRes = await fetch("/api/app/cookies");
        const cookieData = await cookieRes.json();
        if (cookieData.success && cookieData.stats) {
          setCookieRate(cookieData.stats.analyticsRate || 0);
        }
      } catch (err) {
        console.error("Erreur chargement dashboard:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#0060c3] border-t-transparent" />
      </div>
    );
  }

  const isAdmin = user?.role === "admin";
  const clientProject = projects.length > 0 ? projects[0] : null;

  return (
    <div className="space-y-8">
      {/* En-tête de bienvenue */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-[#171717] sm:text-3xl">
              Bonjour, {user?.name || "Bienvenue"}
            </h1>
            <span className="rounded-full bg-[#0060c3]/10 px-2.5 py-0.5 text-xs font-bold text-[#0060c3]">
              {isAdmin ? "Administrateur" : "Espace Client"}
            </span>
          </div>
          <p className="mt-1 text-sm text-[#4b4b4b]">
            {isAdmin
              ? "Vue d'ensemble de vos demandes de devis, clients, projets et statistiques."
              : `Suivi en temps réel de votre projet pour ${user?.company || "votre entreprise"}.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {isAdmin ? (
            <Link
              href="/app/projets"
              className="inline-flex items-center gap-2 rounded-full bg-[#0060c3] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0050a5] transition-colors"
            >
              <FolderKanban className="h-3.5 w-3.5" />
              <span>Gérer les Projets</span>
            </Link>
          ) : (
            <Link
              href="/app/messages"
              className="inline-flex items-center gap-2 rounded-full bg-[#0060c3] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0050a5] transition-colors"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Échanger avec Nourou</span>
            </Link>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* VUE CLIENT COLLABORATIVE                                */}
      {/* ======================================================== */}
      {!isAdmin && clientProject && (
        <div className="space-y-6">
          {/* Carte principale Avancement du Projet */}
          <div className="rounded-[2rem] border border-[#0060c3]/20 bg-gradient-to-br from-[#0060c3] to-[#004a99] p-6 text-white shadow-xl shadow-[#0060c3]/15 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  <Sparkles className="h-3 w-3" />
                  Projet en cours
                </span>
                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                  {clientProject.title}
                </h2>
                <p className="mt-1 text-sm text-white/90">
                  Catégorie : {clientProject.category} · Livraison cible : <strong>{clientProject.targetDate}</strong>
                </p>
              </div>

              <div className="flex flex-col items-start sm:items-end">
                <span className="text-3xl font-black sm:text-4xl">{clientProject.progress}%</span>
                <span className="text-xs font-medium text-white/80">Avancement global</span>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="mt-6">
              <div className="h-3.5 w-full overflow-hidden rounded-full bg-white/20 p-0.5">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500 shadow-sm"
                  style={{ width: `${clientProject.progress}%` }}
                />
              </div>
            </div>

            {/* Actions rapides projet client */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/20 pt-6">
              <Link
                href="/app/messages"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-[#0060c3] shadow-md hover:bg-white/90 transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>Ouvrir la messagerie dédiée</span>
              </Link>
              <Link
                href="/app/projets"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
              >
                <span>Détail des jalons &amp; livrables</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Jalons récents */}
          <div className="rounded-[2rem] border border-[#171717]/10 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-lg font-bold text-[#171717]">Feuille de route &amp; Prochains Jalons</h3>
            <div className="mt-5 space-y-3">
              {clientProject.milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className={`flex items-center justify-between rounded-xl p-4 border transition-colors ${
                    m.completed
                      ? "border-emerald-200 bg-emerald-50/60"
                      : idx === clientProject.milestones.findIndex((x) => !x.completed)
                      ? "border-[#0060c3]/30 bg-[#0060c3]/5"
                      : "border-[#171717]/10 bg-[#f8f9fa]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        m.completed
                          ? "bg-emerald-600 text-white"
                          : "bg-white border border-[#171717]/20 text-[#4b4b4b]"
                      }`}
                    >
                      {m.completed ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${m.completed ? "text-emerald-900" : "text-[#171717]"}`}>
                        {m.title}
                      </p>
                      <p className="text-xs text-[#4b4b4b]">Échéance : {m.targetDate}</p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      m.completed
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-white border border-[#171717]/15 text-[#4b4b4b]"
                    }`}
                  >
                    {m.completed ? "Validé ✓" : "En cours"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VUE ADMINISTRATEUR NOURou DINE AMANDOU                   */}
      {/* ======================================================== */}
      {isAdmin && (
        <>
          {/* Grille des 4 indicateurs clés (KPIs) */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* KPI 1 : Demandes de devis */}
            <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">
                  Demandes de Devis
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0060c3]/10 text-[#0060c3]">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#171717]">{inquiries.length}</span>
                <span className="text-xs font-semibold text-emerald-600">
                  {inquiries.filter((i) => i.status === "nouveau").length} nouvelles
                </span>
              </div>
              <Link
                href="/app/leads"
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0060c3] hover:underline"
              >
                <span>Consulter le CRM</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* KPI 2 : Abonnés Newsletter */}
            <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">
                  Abonnés Newsletter
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Mail className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#171717]">{subscribersCount}</span>
                <span className="text-xs font-semibold text-purple-600">100% qualifiés</span>
              </div>
              <Link
                href="/app/leads"
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0060c3] hover:underline"
              >
                <span>Exporter la liste</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* KPI 3 : Projets Actifs */}
            <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">
                  Projets Actifs
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <FolderKanban className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#171717]">{projects.length}</span>
                <span className="text-xs font-semibold text-amber-700">En production</span>
              </div>
              <Link
                href="/app/projets"
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0060c3] hover:underline"
              >
                <span>Suivre les jalons</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* KPI 4 : Consentement Cookies */}
            <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">
                  Consentement Cookies
                </span>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Cookie className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#171717]">{cookieRate}%</span>
                <span className="text-xs font-semibold text-emerald-600">Acceptés</span>
              </div>
              <Link
                href="/app/cookies"
                className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0060c3] hover:underline"
              >
                <span>Voir les métriques RGPD</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Grille principale : Dernières demandes & Projets récents */}
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Dernières demandes de devis */}
            <div className="rounded-[2rem] border border-[#171717]/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#171717]">Dernières Demandes de Devis</h2>
                  <p className="text-xs text-[#4b4b4b]">Prospects ayant soumis le formulaire de contact</p>
                </div>
                <Link
                  href="/app/leads"
                  className="rounded-full bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-bold text-[#171717] hover:bg-[#171717]/10 transition-colors"
                >
                  Tout voir ({inquiries.length})
                </Link>
              </div>

              <div className="mt-5 divide-y divide-[#171717]/5">
                {inquiries.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#4b4b4b]">
                    Aucune nouvelle demande pour le moment. Votre formulaire est opérationnel et prêt à recevoir les prochains prospects !
                  </div>
                ) : (
                  inquiries.slice(0, 5).map((inq) => (
                    <div key={inq.id} className="py-3.5 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#171717]">{inq.name}</span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                inq.status === "nouveau"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : inq.status === "en_cours"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-[#4b4b4b]">
                            {inq.projectType} · Budget : <span className="font-semibold">{inq.budget}</span>
                          </p>
                          <p className="mt-1 line-clamp-1 text-xs text-[#171717]/75">{inq.message}</p>
                        </div>

                        {inq.phone && (
                          <a
                            href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-[#25D366]/10 px-2.5 py-1 text-[11px] font-bold text-[#25D366] hover:bg-[#25D366]/20 transition-colors shrink-0"
                          >
                            <Phone className="h-3 w-3" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Vue rapide des Projets en cours */}
            <div className="rounded-[2rem] border border-[#171717]/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#171717]">Projets en Production</h2>
                  <p className="text-xs text-[#4b4b4b]">Suivi de l'avancement et échéances</p>
                </div>
                <Link
                  href="/app/projets"
                  className="rounded-full bg-[#f4f6f8] px-3.5 py-1.5 text-xs font-bold text-[#171717] hover:bg-[#171717]/10 transition-colors"
                >
                  Gérer
                </Link>
              </div>

              <div className="mt-5 space-y-4">
                {projects.map((p) => (
                  <div key={p.id} className="rounded-xl border border-[#171717]/10 p-4 bg-[#f8f9fa]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-[#171717]">{p.title}</p>
                        <p className="text-xs text-[#4b4b4b]">Client : {p.clientName}</p>
                      </div>
                      <span className="text-sm font-black text-[#0060c3]">{p.progress}%</span>
                    </div>

                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-[#0060c3]"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-[#4b4b4b]">
                      <span>Échéance : {p.targetDate}</span>
                      <Link href="/app/messages" className="font-semibold text-[#0060c3] hover:underline">
                        Messagerie →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
