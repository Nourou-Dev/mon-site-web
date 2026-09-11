"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  Mail,
  Phone,
  Building,
  Calendar,
  Search,
  Download,
  RefreshCw,
  Shield,
  MessageCircle,
  ExternalLink,
  Lock,
  UserPlus,
  Copy,
  Check,
  FolderKanban,
  X,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

interface AppAccount {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client";
  company: string;
  phone: string;
  createdAt: string;
}

export default function AdminClientsPage() {
  const [accounts, setAccounts] = useState<AppAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [copiedEmailId, setCopiedEmailId] = useState<string | null>(null);

  // Modal d'ajout de client
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("client2026!");
  const [addingClient, setAddingClient] = useState(false);
  const [modalMessage, setModalMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleCopyEmail = (id: string, email: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmailId(id);
      setTimeout(() => setCopiedEmailId(null), 2000);
    }
  };

  const loadAccounts = async () => {
    setLoading(true);
    try {
      // 1. Récupérer les comptes depuis l'API serveur
      const res = await fetch("/api/app/users");
      const data = await res.json();
      let serverUsers: AppAccount[] = [];

      if (data.success && Array.isArray(data.users)) {
        serverUsers = data.users;
      }

      // 2. Récupérer les comptes mis en cache localement lors des inscriptions
      let localClients: AppAccount[] = [];
      try {
        const rawLocal = localStorage.getItem("nd_registered_clients");
        if (rawLocal) {
          localClients = JSON.parse(rawLocal);
        }
      } catch {}

      // 3. Détecter les clients présents localement mais absents du serveur
      const missingOnServer = localClients.filter(
        (loc) => !serverUsers.some((srv) => srv.email.toLowerCase() === loc.email.toLowerCase())
      );

      // Si des clients manquent sur le serveur, les synchroniser automatiquement
      if (missingOnServer.length > 0) {
        try {
          const syncRes = await fetch("/api/app/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "sync", clients: missingOnServer }),
          });
          const syncData = await syncRes.json();
          if (syncData.success && Array.isArray(syncData.users)) {
            serverUsers = syncData.users;
          }
        } catch (syncErr) {
          console.warn("Sync err:", syncErr);
        }
      }

      // Fusionner pour garantir que rien n'est perdu
      const mergedMap = new Map<string, AppAccount>();
      for (const u of serverUsers) {
        mergedMap.set(u.email.toLowerCase(), u);
      }
      for (const loc of localClients) {
        if (!mergedMap.has(loc.email.toLowerCase())) {
          mergedMap.set(loc.email.toLowerCase(), loc);
        }
      }

      const mergedList = Array.from(mergedMap.values());
      setAccounts(mergedList);

      // Mettre à jour le cache local
      try {
        const clientsOnly = mergedList.filter((a) => a.role === "client");
        localStorage.setItem("nd_registered_clients", JSON.stringify(clientsOnly));
      } catch {}
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingClient(true);
    setModalMessage(null);

    try {
      const res = await fetch("/api/app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          client: {
            name: newName.trim(),
            email: newEmail.trim().toLowerCase(),
            company: newCompany.trim(),
            phone: newPhone.trim(),
            password: newPassword,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Erreur lors de la création du client.");
      }

      setModalMessage({
        type: "success",
        text: `Compte client pour "${newName}" créé avec succès ! Le projet dédié a été initialisé.`,
      });

      // Mettre en cache local
      try {
        const rawLocal = localStorage.getItem("nd_registered_clients");
        const existing: AppAccount[] = rawLocal ? JSON.parse(rawLocal) : [];
        if (!existing.some((c) => c.email.toLowerCase() === data.user.email.toLowerCase())) {
          existing.push(data.user);
          localStorage.setItem("nd_registered_clients", JSON.stringify(existing));
        }
      } catch {}

      // Recharger la liste
      setTimeout(() => {
        loadAccounts();
        setShowAddModal(false);
        setNewName("");
        setNewEmail("");
        setNewCompany("");
        setNewPhone("");
        setNewPassword("client2026!");
        setModalMessage(null);
      }, 1200);
    } catch (err: any) {
      setModalMessage({ type: "error", text: err.message || "Erreur création client." });
    } finally {
      setAddingClient(false);
    }
  };

  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      const matchRole = roleFilter === "all" || acc.role === roleFilter;
      const s = search.toLowerCase();
      const matchSearch =
        !search ||
        acc.name.toLowerCase().includes(s) ||
        acc.email.toLowerCase().includes(s) ||
        acc.company.toLowerCase().includes(s) ||
        acc.phone.toLowerCase().includes(s);
      return matchRole && matchSearch;
    });
  }, [accounts, roleFilter, search]);

  const exportCSV = () => {
    if (filteredAccounts.length === 0) return;
    const headers = ["ID", "Nom", "Email de Login", "Entreprise", "Telephone", "Role", "Date Inscription"];
    const rows = filteredAccounts.map((a) => [
      a.id,
      `"${a.name.replace(/"/g, '""')}"`,
      a.email,
      `"${a.company.replace(/"/g, '""')}"`,
      `"${a.phone}"`,
      a.role,
      a.createdAt,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `comptes_clients_nouroudine_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalClients = accounts.filter((a) => a.role === "client").length;

  return (
    <div className="space-y-8">
      {/* En-tête de la page */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#0f172a] lg:text-3xl">
              Comptes Clients &amp; Identifiants
            </h1>
            <span className="shrink-0 rounded-full bg-[#e0e7ff] px-2.5 py-0.5 text-xs font-bold text-[#312e81] border border-[#c7d2fe]">
              {totalClients} Client(s)
            </span>
          </div>
          <p className="mt-1 text-sm text-[#475569]">
            Répertoire sécurisé des comptes créés pour l&apos;Espace Client (/app).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4338ca] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#4338ca]/25 hover:bg-[#3730a3] transition active:scale-95"
          >
            <UserPlus className="h-4 w-4" />
            <span>Nouveau Client</span>
          </button>
          <button
            onClick={loadAccounts}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs font-bold text-[#0f172a] shadow-sm hover:bg-[#f8fafc] hover:border-[#4338ca] transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#4338ca] ${loading ? "animate-spin" : ""}`} />
            <span>Actualiser</span>
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs font-bold text-[#0f172a] shadow-sm hover:bg-[#f8fafc] hover:border-[#4338ca] transition"
          >
            <Download className="h-3.5 w-3.5 text-[#4338ca]" />
            <span>Exporter CSV</span>
          </button>
        </div>
      </div>

      {/* Barre de Recherche et Filtres */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#e2e8f0] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Rechercher par nom, email de login, entreprise, téléphone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#4338ca] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4338ca]/20"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-[#64748b]">Rôle :</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3 py-2 text-xs font-semibold text-[#0f172a] focus:border-[#4338ca] focus:bg-white focus:outline-none"
          >
            <option value="all">Tous ({accounts.length})</option>
            <option value="client">Clients uniquement ({totalClients})</option>
            <option value="admin">Administrateur (1)</option>
          </select>
        </div>
      </div>

      {/* Tableau des Comptes */}
      <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-[#e2e8f0] bg-[#f8fafc] text-xs font-bold uppercase tracking-wider text-[#64748b]">
              <tr>
                <th scope="col" className="py-4 px-4 sm:px-6">Utilisateur &amp; Entreprise</th>
                <th scope="col" className="py-4 px-4 sm:px-6">Identifiant (Email Login)</th>
                <th scope="col" className="py-4 px-4 sm:px-6">Rôle &amp; Statut</th>
                <th scope="col" className="py-4 px-4 sm:px-6">Date de Création</th>
                <th scope="col" className="py-4 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs font-semibold text-[#64748b]">
                    <div className="inline-flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-[#4338ca]" />
                      <span>Chargement des comptes clients...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs font-semibold text-[#64748b]">
                    Aucun compte ne correspond à vos critères de recherche.
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((acc) => {
                  const isAdmin = acc.role === "admin";
                  const isCopied = copiedEmailId === acc.id;

                  return (
                    <tr key={acc.id} className="hover:bg-[#f8fafc] transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black text-xs ${
                              isAdmin
                                ? "bg-[#4338ca] text-white"
                                : "bg-[#e0e7ff] text-[#4338ca]"
                            }`}
                          >
                            {acc.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-[#0f172a]">{acc.name}</p>
                            <p className="text-xs text-[#64748b]">{acc.company || "Particulier / Indépendant"}</p>
                            {acc.phone && (
                              <p className="text-[11px] text-[#94a3b8] flex items-center gap-1 mt-0.5">
                                <Phone className="h-2.5 w-2.5" />
                                {acc.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#0f172a] font-mono text-xs select-all">
                            {acc.email}
                          </span>
                          <button
                            onClick={() => handleCopyEmail(acc.id, acc.email)}
                            title="Copier l'email"
                            className="text-[#94a3b8] hover:text-[#4338ca] transition p-1"
                          >
                            {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </td>

                      <td className="py-4 px-4 sm:px-6">
                        {isAdmin ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#e0e7ff] px-2.5 py-1 text-xs font-bold text-[#312e81] border border-[#c7d2fe]">
                            <Shield className="h-3 w-3 text-[#4338ca]" />
                            Administrateur
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                            <Check className="h-3 w-3 text-emerald-600" />
                            Client Actif
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-xs text-[#64748b]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-[#94a3b8]" />
                          <span>
                            {new Date(acc.createdAt).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        {!isAdmin && (
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/dashboard/messages`}
                              className="inline-flex items-center gap-1 rounded-lg border border-[#cbd5e1] bg-white px-2.5 py-1.5 text-xs font-bold text-[#4338ca] shadow-sm hover:bg-[#e0e7ff] transition"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Discuter</span>
                            </Link>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Création de Client */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e0e7ff] text-[#4338ca]">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0f172a]">Créer un Compte Client</h3>
                  <p className="text-xs text-[#64748b]">Génère un accès sécurisé pour votre client sur /app</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-xl p-1.5 text-[#64748b] hover:bg-[#f1f5f9]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {modalMessage && (
              <div
                className={`mt-4 flex items-center gap-2 rounded-xl p-3 text-xs font-semibold ${
                  modalMessage.type === "success"
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {modalMessage.type === "success" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                )}
                <span>{modalMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleCreateClient} className="mt-5 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#0f172a]">Nom complet du client *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex : Sarah Lawson"
                  className="mt-1 w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] p-2.5 text-xs text-[#0f172a] focus:border-[#4338ca] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4338ca]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a]">Adresse email (identifiant de login) *</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="sarah.lawson@entreprise.com"
                  className="mt-1 w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] p-2.5 text-xs text-[#0f172a] focus:border-[#4338ca] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4338ca]/20"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#0f172a]">Entreprise / Projet</label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="Ex : Lawson Consulting"
                    className="mt-1 w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] p-2.5 text-xs text-[#0f172a] focus:border-[#4338ca] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0f172a]">Numéro de Téléphone</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+229 01 00 00 00"
                    className="mt-1 w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] p-2.5 text-xs text-[#0f172a] focus:border-[#4338ca] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0f172a]">Mot de passe provisoire</label>
                <input
                  type="text"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] p-2.5 text-xs text-[#0f172a] font-mono focus:border-[#4338ca] focus:bg-white focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-[#64748b]">
                  Le client pourra modifier ce mot de passe à tout moment dans ses paramètres.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-end gap-2 border-t border-[#f1f5f9] pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-[#cbd5e1] px-4 py-2 text-xs font-semibold text-[#475569] hover:bg-[#f8fafc]"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={addingClient}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4338ca] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#3730a3] disabled:opacity-50 transition"
                >
                  {addingClient ? "Création en cours..." : "Créer le client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
