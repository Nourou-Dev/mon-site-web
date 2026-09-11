"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  MessageSquare,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { ProjectRecord } from "@/lib/appStorage";

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
      } catch (err) {
        console.error("Erreur chargement dashboard client:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  useEffect(() => {
    if (user?.role === "admin") {
      window.location.replace("/dashboard");
    }
  }, [user]);

  if (loading || user?.role === "admin") {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#0060c3] border-t-transparent" />
      </div>
    );
  }

  const clientProject = projects.length > 0 ? projects[0] : null;

  return (
    <div className="space-y-8">
      {/* En-tête de bienvenue client */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#171717] lg:text-3xl">
              Bonjour, {user?.name || "Bienvenue"}
            </h1>
            <span className="shrink-0 rounded-full bg-[#0060c3]/10 px-2.5 py-0.5 text-xs font-bold text-[#0060c3]">
              Espace Client
            </span>
          </div>
          <p className="mt-1 text-sm text-[#4b4b4b]">
            Suivi en temps réel de votre projet pour {user?.company || "votre entreprise"}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/app/messages"
            className="inline-flex items-center gap-2 rounded-full bg-[#0060c3] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0050a5] transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Échanger avec Nourou</span>
          </Link>
        </div>
      </div>

      {/* ======================================================== */}
      {/* VUE CLIENT COLLABORATIVE                                */}
      {/* ======================================================== */}
      {clientProject ? (
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
      ) : (
        /* État initial pour un client dont le projet est en cours d'initialisation */
        <div className="rounded-[2rem] border border-[#171717]/10 bg-white p-8 sm:p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0060c3]/10 text-[#0060c3]">
            <FolderKanban className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-[#171717]">Bienvenue dans votre Espace Client</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#4b4b4b]">
            Votre projet est en cours de configuration par Nourou Dine AMANDOU. Vous pourrez suivre ici chaque jalon et avancement de votre site web.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/app/messages"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0060c3] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#0050a5] transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Envoyer un message à Nourou</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
