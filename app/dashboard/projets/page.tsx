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
  Calendar,
  DollarSign,
  User,
  X,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { ProjectRecord, ProjectMilestone } from "@/lib/appStorage";

export default function AdminProjectsPage() {
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
      const res = await fetch("/api/app/projects");
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
        if (data.projects.length > 0 && !selectedProject) {
          setSelectedProject(data.projects[0]);
        }
      }
    } catch (e) {
      console.error("Erreur chargement projets admin:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleToggleMilestone = async (projectId: string, milestoneId: string) => {
    if (!selectedProject) return;

    const updatedMilestones = selectedProject.milestones.map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );

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
      if (data.success && data.project) {
        setSelectedProject(data.project);
        setProjects((prev) => prev.map((p) => (p.id === projectId ? data.project : p)));
      }
    } catch (e) {
      console.error("Erreur mise à jour jalon:", e);
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
      if (data.success && data.project) {
        setProjects([data.project, ...projects]);
        setSelectedProject(data.project);
        setIsCreating(false);
        setNewTitle("");
        setNewClientName("");
        setNewClientEmail("");
      }
    } catch (e) {
      console.error("Erreur création projet:", e);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4338ca] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#171717] lg:text-3xl">
              Gestion des Projets Clients
            </h1>
            <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-[#eef2ff] px-2.5 py-0.5 text-xs font-bold text-[#312e81] border border-[#c7d2fe]">
              <FolderKanban className="h-3 w-3" />
              Chantiers Actifs ({projects.length})
            </span>
          </div>
          <p className="mt-1 text-sm text-[#4b4b4b]">
            Supervisez les échéances, ajustez les jalons en temps réel et validez les livrables de vos clients.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#4338ca] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#3730a3] transition-all shrink-0 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span>Créer un nouveau projet</span>
        </button>
      </div>

      {/* Modal Création Projet */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#171717]/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef2ff] text-[#4338ca]">
                  <FolderKanban className="h-5 w-5" />
                </div>
                <h3 className="text-base font-extrabold text-[#171717]">Nouveau Chantier Client</h3>
              </div>
              <button
                onClick={() => setIsCreating(false)}
                className="rounded-lg p-1.5 text-[#4b4b4b] hover:bg-gray-100 transition"
              >
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
                  placeholder="ex: Refonte Site E-commerce & Branding"
                  className="mt-1 w-full rounded-xl border border-[#171717]/15 p-2.5 text-xs sm:text-sm focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/20 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#171717]">Nom du client *</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="ex: Jean Dupont"
                    className="mt-1 w-full rounded-xl border border-[#171717]/15 p-2.5 text-xs sm:text-sm focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/20 focus:outline-none"
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
                    className="mt-1 w-full rounded-xl border border-[#171717]/15 p-2.5 text-xs sm:text-sm focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#171717]">Budget</label>
                  <input
                    type="text"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    placeholder="ex: 450 000 FCFA"
                    className="mt-1 w-full rounded-xl border border-[#171717]/15 p-2.5 text-xs sm:text-sm focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#171717]">Date de livraison cible</label>
                  <input
                    type="date"
                    value={newTargetDate}
                    onChange={(e) => setNewTargetDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#171717]/15 p-2.5 text-xs sm:text-sm focus:border-[#4338ca] focus:ring-2 focus:ring-[#4338ca]/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-[#171717]/10 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="rounded-xl px-4 py-2 text-xs font-bold text-[#4b4b4b] hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#4338ca] px-5 py-2 text-xs font-bold text-white hover:bg-[#3730a3] shadow-md"
                >
                  Créer le chantier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grille : Liste des projets + Détails */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Colonne Gauche : Liste des Projets */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">
            Sélectionnez un projet ({projects.length})
          </h2>

          {projects.length === 0 && (
            <div className="rounded-2xl border border-dashed border-[#171717]/20 bg-white p-8 text-center text-xs text-[#4b4b4b]">
              Aucun projet pour le moment. Créez votre premier chantier client ci-dessus.
            </div>
          )}

          <div className="space-y-2.5">
            {projects.map((proj) => {
              const isSelected = selectedProject?.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                    isSelected
                      ? "border-[#4338ca] bg-white shadow-md shadow-[#4338ca]/10 ring-1 ring-[#4338ca]/20"
                      : "border-[#171717]/10 bg-white/70 hover:bg-white hover:border-[#171717]/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={`text-sm font-bold ${isSelected ? "text-[#4338ca]" : "text-[#171717]"}`}>
                      {proj.title}
                    </h3>
                    <span className="shrink-0 text-xs font-black text-[#4338ca]">{proj.progress}%</span>
                  </div>

                  <p className="mt-1 text-xs text-[#4b4b4b] truncate">
                    Client : <strong className="text-[#171717]">{proj.clientName}</strong>
                  </p>

                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-[#4338ca] transition-all duration-300"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#4b4b4b]">
                    <span>{proj.category}</span>
                    <span className="font-semibold text-[#171717]">{proj.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Colonne Droite : Détail du projet sélectionné */}
        <div className="lg:col-span-2 min-w-0">
          {selectedProject ? (
            <div className="rounded-2xl sm:rounded-3xl border border-[#171717]/10 bg-white p-5 sm:p-7 shadow-sm min-w-0">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-[#171717]/10 pb-6 min-w-0">
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#eef2ff] px-2.5 py-0.5 text-xs font-bold text-[#312e81] border border-[#c7d2fe]">
                    {selectedProject.category}
                  </span>
                  <h2 className="mt-2 text-xl font-black text-[#171717] sm:text-2xl">
                    {selectedProject.title}
                  </h2>
                  <p className="mt-1 text-xs text-[#4b4b4b]">
                    Client : <strong>{selectedProject.clientName}</strong> ({selectedProject.clientEmail}) · Échéance :{" "}
                    <strong>{selectedProject.targetDate}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/dashboard/messages?projectId=${selectedProject.id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#4338ca] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#3730a3] transition-all shadow-sm whitespace-nowrap shrink-0 active:scale-95"
                  >
                    <MessageSquare className="h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap">Messagerie du projet</span>
                  </Link>
                </div>
              </div>

              {/* Barre de progression avec métriques */}
              <div className="mt-6 rounded-2xl bg-[#f8f9fa] p-5 border border-[#171717]/5">
                <div className="flex items-center justify-between text-xs font-bold text-[#171717] mb-2">
                  <span>Progression globale des livrables</span>
                  <span className="text-[#4338ca] text-base font-black">{selectedProject.progress}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-[#4338ca] transition-all duration-300"
                    style={{ width: `${selectedProject.progress}%` }}
                  />
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="rounded-xl bg-white p-3 border border-[#171717]/5 shadow-xs">
                    <p className="text-[10px] uppercase font-bold text-[#7b7b7b]">Budget Total</p>
                    <p className="font-extrabold text-[#171717] mt-1 truncate">
                      {selectedProject.budget || "Sur devis"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-3 border border-[#171717]/5 shadow-xs">
                    <p className="text-[10px] uppercase font-bold text-[#7b7b7b]">Acompte réglé</p>
                    <p className="font-extrabold text-emerald-700 mt-1 truncate">
                      {selectedProject.paidAmount || "0 FCFA"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-3 border border-[#171717]/5 shadow-xs">
                    <p className="text-[10px] uppercase font-bold text-[#7b7b7b]">Date de début</p>
                    <p className="font-extrabold text-[#171717] mt-1 truncate">{selectedProject.startDate}</p>
                  </div>
                </div>
              </div>

              {/* Jalons (Milestones) */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                      Feuille de Route &amp; Jalons de Validation
                    </h3>
                    <p className="text-xs text-[#4b4b4b]">
                      Cliquez sur un jalon pour le marquer comme validé ou en cours.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selectedProject.milestones.map((m, index) => (
                    <div
                      key={m.id}
                      onClick={() => handleToggleMilestone(selectedProject.id, m.id)}
                      className={`flex items-center justify-between rounded-xl p-4 border transition-all cursor-pointer select-none ${
                        m.completed
                          ? "border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50"
                          : "border-[#171717]/10 bg-white hover:border-[#4338ca] hover:bg-[#f8f9fa]"
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
                          <p
                            className={`text-sm font-bold ${
                              m.completed ? "text-emerald-950" : "text-[#171717]"
                            }`}
                          >
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
                        className="inline-flex items-center gap-2 rounded-xl border border-[#171717]/10 bg-[#f8f9fa] px-3.5 py-2 text-xs font-bold text-[#171717] hover:bg-[#4338ca] hover:text-white transition-colors"
                      >
                        <span>{d.title}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#171717]/10 bg-white p-12 text-center text-xs text-[#4b4b4b]">
              Sélectionnez un projet pour voir les détails.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
