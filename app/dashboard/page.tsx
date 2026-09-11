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
  Shield,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { ProjectRecord } from "@/lib/appStorage";
import { InquiryRecord } from "@/lib/storage";

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [clientAccountsCount, setClientAccountsCount] = useState(0);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [cookieRate, setCookieRate] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [prjRes, leadsRes, cookieRes, usersRes] = await Promise.all([
          fetch("/api/app/projects"),
          fetch("/api/app/leads"),
          fetch("/api/app/cookies"),
          fetch("/api/app/users"),
        ]);

        const [prjData, leadsData, cookieData, usersData] = await Promise.all([
          prjRes.json(),
          leadsRes.json(),
          cookieRes.json(),
          usersRes.json(),
        ]);

        if (prjData.success) {
          setProjects(prjData.projects || []);
        }

        if (leadsData.success) {
          setInquiries(leadsData.inquiries || []);
          setSubscribersCount(leadsData.subscribers?.length || 0);
        }

        if (cookieData.success && cookieData.stats) {
          setCookieRate(cookieData.stats.analyticsRate || 0);
        }

        if (usersData.success && Array.isArray(usersData.users)) {
          const clientsOnly = usersData.users.filter((u: any) => u.role === "client");
          setClientAccountsCount(clientsOnly.length);
        }
      } catch (err) {
        console.error("Erreur chargement dashboard admin:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4338ca] border-t-transparent" />
      </div>
    );
  }

  const pendingInquiries = inquiries.filter((i) => i.status === "nouveau").length;
  const inProgressProjects = projects.filter((p) => p.status !== "en_ligne").length;

  return (
    <div className="space-y-8">
      {/* En-tête Administrateur */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#0f172a] lg:text-3xl">
              Tableau de Bord Administrateur
            </h1>
            <span className="shrink-0 rounded-full bg-[#e0e7ff] px-2.5 py-0.5 text-xs font-bold text-[#312e81] border border-[#c7d2fe]">
              Console Direction
            </span>
          </div>
          <p className="mt-1 text-sm text-[#475569]">
            Pilotage global : suivi des comptes clients, demandes CRM, roadmaps et consentements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/dashboard/projets"
            className="inline-flex items-center gap-2 rounded-xl bg-[#4338ca] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#4338ca]/25 hover:bg-[#3730a3] transition active:scale-95"
          >
            <FolderKanban className="h-4 w-4" />
            <span>Gérer les Projets</span>
          </Link>
          <Link
            href="/dashboard/messages"
            className="inline-flex items-center gap-2 rounded-xl border border-[#cbd5e1] bg-white px-4 py-2.5 text-xs font-bold text-[#0f172a] shadow-sm hover:bg-[#f8fafc] hover:border-[#4338ca] transition active:scale-95"
          >
            <MessageSquare className="h-4 w-4 text-[#4338ca]" />
            <span>Messagerie en Direct</span>
          </Link>
        </div>
      </div>

      {/* Cartes KPI Principales (Thème Deep Royal Indigo) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 : Comptes Clients */}
        <Link
          href="/dashboard/clients"
          className="group rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm transition hover:border-[#4338ca] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e0e7ff] text-[#4338ca]">
              <UserCheck className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-[#94a3b8] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#4338ca]" />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#64748b]">Comptes Clients</p>
          <p className="mt-1 text-2xl font-black text-[#0f172a]">{clientAccountsCount}</p>
          <p className="mt-1 text-[11px] font-medium text-emerald-700">Accès sécurisés créés</p>
        </Link>

        {/* KPI 2 : Projets Actifs */}
        <Link
          href="/dashboard/projets"
          className="group rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm transition hover:border-[#4338ca] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
              <FolderKanban className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-[#94a3b8] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple-700" />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#64748b]">Projets en cours</p>
          <p className="mt-1 text-2xl font-black text-[#0f172a]">{inProgressProjects}</p>
          <p className="mt-1 text-[11px] font-medium text-purple-700">{projects.length} projet(s) au total</p>
        </Link>

        {/* KPI 3 : Demandes Devis & CRM */}
        <Link
          href="/dashboard/leads"
          className="group rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm transition hover:border-[#4338ca] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <Users className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-[#94a3b8] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-700" />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#64748b]">Demandes &amp; Devis</p>
          <p className="mt-1 text-2xl font-black text-[#0f172a]">{inquiries.length}</p>
          <p className="mt-1 text-[11px] font-medium text-amber-700">
            {pendingInquiries} nouvelle(s) demande(s)
          </p>
        </Link>

        {/* KPI 4 : Taux d'Acceptation Cookies */}
        <Link
          href="/dashboard/cookies"
          className="group rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-sm transition hover:border-[#4338ca] hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Cookie className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-[#94a3b8] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-700" />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#64748b]">Taux Analytics Cookies</p>
          <p className="mt-1 text-2xl font-black text-[#0f172a]">{cookieRate}%</p>
          <p className="mt-1 text-[11px] font-medium text-emerald-700">Conforme RGPD &amp; ePrivacy</p>
        </Link>
      </div>

      {/* Section Projets Récent & Demandes CRM */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Projets Clients Actifs (7 cols) */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm lg:col-span-7">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
            <div>
              <h2 className="text-base font-black text-[#0f172a]">Projets en cours de réalisation</h2>
              <p className="text-xs text-[#475569]">Suivi de la progression et des livrables de chaque client.</p>
            </div>
            <Link
              href="/dashboard/projets"
              className="text-xs font-bold text-[#4338ca] hover:underline"
            >
              Voir tout
            </Link>
          </div>

          <div className="mt-5 divide-y divide-[#f1f5f9]">
            {projects.length === 0 ? (
              <p className="py-6 text-center text-xs text-[#64748b]">Aucun projet enregistré.</p>
            ) : (
              projects.slice(0, 4).map((proj) => (
                <div key={proj.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-[#0f172a]">{proj.title}</h3>
                      <p className="text-xs text-[#475569]">Client : {proj.clientName}</p>
                    </div>
                    <span className="rounded-full bg-[#e0e7ff] px-2.5 py-0.5 text-xs font-bold text-[#312e81]">
                      {proj.progress}%
                    </span>
                  </div>

                  {/* Barre de progression Indigo */}
                  <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-[#f1f5f9]">
                    <div
                      className="h-full rounded-full bg-[#4338ca] transition-all"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#64748b]">
                    <span>Échéance : {new Date(proj.targetDate).toLocaleDateString("fr-FR")}</span>
                    <Link
                      href={`/dashboard/messages?projectId=${proj.id}`}
                      className="inline-flex items-center gap-1 font-bold text-[#4338ca] hover:underline"
                    >
                      <MessageSquare className="h-3 w-3" />
                      Échanger
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Dernières Demandes CRM (5 cols) */}
        <div className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm lg:col-span-5">
          <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
            <div>
              <h2 className="text-base font-black text-[#0f172a]">Dernières Demandes de Devis</h2>
              <p className="text-xs text-[#475569]">Leads générés via le site public.</p>
            </div>
            <Link
              href="/dashboard/leads"
              className="text-xs font-bold text-[#4338ca] hover:underline"
            >
              Consulter
            </Link>
          </div>

          <div className="mt-5 space-y-3">
            {inquiries.length === 0 ? (
              <p className="py-6 text-center text-xs text-[#64748b]">Aucune demande pour le moment.</p>
            ) : (
              inquiries.slice(0, 4).map((inq) => (
                <div
                  key={inq.id}
                  className="rounded-xl border border-[#f1f5f9] bg-[#f8fafc] p-3.5 transition hover:border-[#c7d2fe]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#0f172a]">{inq.name}</p>
                      <p className="text-[11px] text-[#64748b]">{inq.email}</p>
                    </div>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                      {inq.budget || "Budget flexible"}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs text-[#475569]">{inq.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
