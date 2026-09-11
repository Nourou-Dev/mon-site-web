"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Plus,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Layers,
  Calendar,
  DollarSign,
  Edit2,
  X,
} from "lucide-react";
import { ProjectRecord, ProjectMilestone } from "@/lib/appStorage";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client";
  company?: string;
}

export default function ProjectsPage() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // New project form state
  const [newTitle, setNewTitle] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newCategory, setNewCategory] = useState("Site Vitrine Premium");
  const [newBudget, setNewBudget] = useState("350 000 FCFA");
  const [newTargetDate, setNewTargetDate] = useState("2026-10-15");

  const loadProjects = async () => {
    try {
      const authRes = await fetch("/api/app/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "me" }),
      });
      const authData = await authRes.json();
      if (authData.authenticated) setUser(authData.user);

      const res = await fetch("/api/app/projects");
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
        if (data.projects.length > 0 && !selectedProject) {
          setSelectedProject(data.projects[0]);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleToggleMilestone = async (projectId: string, milestoneId: string) => {
    if (!selectedProject || user?.role !== "admin") return;

    const updatedMilestones = selectedProject.milestones.map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );

    // Calcul automatique du pourcentage d'avancement
    const completedCount = updatedMilestones.filter((m) => m.completed).length;
    const progress = Math.round((completedCount / updatedMilestones.length) * 100);

    try {
      const res = await fetch("/api/app/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: projectId,
          milestones: updatedMilestones,
          progress,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedProject(data.project);
        setProjects((prev) => prev.map((p) => (p.id === projectId ? data.project : p)));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/app/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          clientName: newClientName,
          clientEmail: newClientEmail,
          category: newCategory,
          budget: newBudget,
          targetDate: newTargetDate,
          progress: 10,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProjects([data.project, ...projects]);
        setSelectedProject(data.project);
        setIsCreating(false);
        setNewTitle("");
        setNewClientName("");
        setNewClientEmail("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#0060c3] border-t-transparent" />
      </div>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#171717]">Projets &amp; Suivi de Livraison</h1>
          <p className="mt-1 text-sm text-[#4b4b4b]">
            {isAdmin
              ? "Pilotez les jalons, livrables et la progression de vos chantiers clients."
              : "Suivez en direct l'avancement et la validation de chaque étape de votre site."}
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#0060c3] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0050a5] transition-colors"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Nouveau Projet</span>
          </button>
        )}
      </div>

      {/* Modal Création Projet */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl border border-[#171717]/10">
            <div className="flex items-center justify-between border-b border-[#171717]/10 pb-4">
              <h2 className="text-lg font-bold text-[#171717]">Créer un Nouveau Projet Client</h2>
              <button onClick={() => setIsCreating(false)} className="rounded-lg p-1 text-[#4b4b4b] hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#171717]">Titre du projet *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="ex: Refonte Site E-commerce Maison 7"
                  className="mt-1 w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-3.5 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#0060c3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#171717]">Nom du client / Entreprise *</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="ex: Dr. Marc Dossou"
                    className="mt-1 w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-3.5 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#0060c3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#171717]">Email du client *</label>
                  <input
                    type="email"
                    required
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    placeholder="client@entreprise.com"
                    className="mt-1 w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-3.5 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#0060c3]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#171717]">Catégorie</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-3.5 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#0060c3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#171717]">Budget estimé</label>
                  <input
                    type="text"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-3.5 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#0060c3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717]">Date cible de livraison</label>
                <input
                  type="date"
                  value={newTargetDate}
                  onChange={(e) => setNewTargetDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-3.5 py-2 text-xs text-[#171717] focus:outline-none focus:border-[#0060c3]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="rounded-full px-4 py-2 text-xs font-semibold text-[#4b4b4b] hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#0060c3] px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#0050a5]"
                >
                  Enregistrer le projet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grille Projet : Liste à gauche, Détail & Jalons à droite */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.8fr]">
        {/* Liste des projets */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#4b4b4b]">
            Projets ({projects.length})
          </h2>

          <div className="space-y-3">
            {projects.map((p) => {
              const isSelected = selectedProject?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                    isSelected
                      ? "border-[#0060c3] bg-white shadow-md shadow-[#0060c3]/10"
                      : "border-[#171717]/10 bg-white hover:border-[#171717]/20 hover:bg-[#f8f9fa]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-sm text-[#171717]">{p.title}</h3>
                      <p className="text-xs text-[#4b4b4b] mt-0.5">Client : {p.clientName}</p>
                    </div>
                    <span className="text-sm font-black text-[#0060c3]">{p.progress}%</span>
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-[#0060c3]" style={{ width: `${p.progress}%` }} />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#4b4b4b]">
                    <span>Livraison : {p.targetDate}</span>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-[#0060c3] capitalize">
                      {p.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Détail du projet sélectionné */}
        {selectedProject ? (
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-[#171717]/10 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-[#171717]/10 pb-6">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0060c3]/10 px-2.5 py-0.5 text-xs font-bold text-[#0060c3]">
                    {selectedProject.category}
                  </span>
                  <h2 className="mt-2 text-xl font-black text-[#171717] sm:text-2xl">
                    {selectedProject.title}
                  </h2>
                  <p className="mt-1 text-xs text-[#4b4b4b]">
                    Client : <strong>{selectedProject.clientName}</strong> ({selectedProject.clientEmail}) · Échéance : <strong>{selectedProject.targetDate}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/app/messages?projectId=${selectedProject.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#0060c3] px-4 py-2 text-xs font-bold text-white hover:bg-[#0050a5] transition-colors"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Messagerie du Projet</span>
                  </Link>
                </div>
              </div>

              {/* Barre de progression avec métriques */}
              <div className="mt-6 rounded-2xl bg-[#f8f9fa] p-5 border border-[#171717]/5">
                <div className="flex items-center justify-between text-xs font-bold text-[#171717] mb-2">
                  <span>Progression globale des livrables</span>
                  <span className="text-[#0060c3] text-base font-black">{selectedProject.progress}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#0060c3] transition-all duration-300"
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl bg-white p-2.5 border border-[#171717]/5">
                    <p className="text-[10px] uppercase font-semibold text-[#4b4b4b]">Budget</p>
                    <p className="font-bold text-[#171717] mt-0.5">{selectedProject.budget || "Sur devis"}</p>
                  </div>
                  <div className="rounded-xl bg-white p-2.5 border border-[#171717]/5">
                    <p className="text-[10px] uppercase font-semibold text-[#4b4b4b]">Acompte réglé</p>
                    <p className="font-bold text-emerald-700 mt-0.5">{selectedProject.paidAmount || "0 FCFA"}</p>
                  </div>
                  <div className="rounded-xl bg-white p-2.5 border border-[#171717]/5">
                    <p className="text-[10px] uppercase font-semibold text-[#4b4b4b]">Démarrage</p>
                    <p className="font-bold text-[#171717] mt-0.5">{selectedProject.startDate}</p>
                  </div>
                </div>
              </div>

              {/* Jalons (Milestones) */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                    Feuille de Route &amp; Jalons de Validation
                  </h3>
                  {isAdmin && (
                    <span className="text-[11px] text-[#4b4b4b] italic">
                      (Cochez les jalons pour actualiser l'avancement)
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  {selectedProject.milestones.map((m, index) => (
                    <div
                      key={m.id}
                      onClick={() => isAdmin && handleToggleMilestone(selectedProject.id, m.id)}
                      className={`flex items-center justify-between rounded-xl p-4 border transition-all ${
                        isAdmin ? "cursor-pointer hover:border-[#0060c3]" : ""
                      } ${
                        m.completed
                          ? "border-emerald-200 bg-emerald-50/50"
                          : "border-[#171717]/10 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                            m.completed
                              ? "bg-emerald-600 text-white"
                              : "border border-gray-300 bg-gray-50 text-gray-400"
                          }`}
                        >
                          {m.completed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${m.completed ? "text-emerald-950" : "text-[#171717]"}`}>
                            {m.title}
                          </p>
                          <p className="text-xs text-[#4b4b4b]">Échéance : {m.targetDate}</p>
                        </div>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          m.completed
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {m.completed ? "Validé ✓" : "En cours"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Livrables & Liens Utiles */}
              {selectedProject.deliverables && selectedProject.deliverables.length > 0 && (
                <div className="mt-8 border-t border-[#171717]/10 pt-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#171717] mb-3">
                    Livrables &amp; Accès Rapides
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedProject.deliverables.map((d, i) => (
                      <a
                        key={i}
                        href={d.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-[#171717]/10 bg-[#f8f9fa] px-3.5 py-2 text-xs font-bold text-[#171717] hover:bg-[#0060c3] hover:text-white transition-colors"
                      >
                        <span>{d.title}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-[2rem] border border-[#171717]/10 bg-white p-12 text-center text-xs text-[#4b4b4b]">
            Sélectionnez un projet pour voir les détails.
          </div>
        )}
      </div>
    </div>
  );
}
