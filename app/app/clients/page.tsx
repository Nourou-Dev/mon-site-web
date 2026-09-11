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

  const loadAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/app/users");
      const data = await res.json();
      if (data.success && data.users) {
        setAccounts(data.users);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
  }, []);

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-[#171717] sm:text-3xl">
              Comptes Clients &amp; Identifiants
            </h1>
            <span className="rounded-full bg-[#0060c3]/10 px-2.5 py-0.5 text-xs font-bold text-[#0060c3] border border-[#0060c3]/20">
              Espace Administrateur
            </span>
          </div>
          <p className="mt-1 text-sm text-[#4b4b4b]">
            Répertoire complet des utilisateurs inscrits sur votre portail client et métadonnées de connexion.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={loadAccounts}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-[#171717]/15 bg-white px-4 py-2.5 text-xs font-bold text-[#171717] shadow-sm hover:bg-[#171717]/5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#0060c3] ${loading ? "animate-spin" : ""}`} />
            <span>Actualiser</span>
          </button>

          <button
            onClick={exportCSV}
            disabled={filteredAccounts.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0060c3] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#0060c3]/20 hover:bg-[#0050a5] transition-all disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Exporter la liste CSV</span>
          </button>
        </div>
      </div>

      {/* 3 Cartes Statistiques */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">Total Comptes Créés</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0060c3]/10 text-[#0060c3]">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-[#171717]">{accounts.length}</p>
          <p className="mt-1 text-xs text-[#4b4b4b]">Enregistrés dans la base de données</p>
        </div>

        <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">Clients Inscrits</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-emerald-600">{totalClients}</p>
          <p className="mt-1 text-xs text-[#4b4b4b]">Accès à leur espace projet actif</p>
        </div>

        <div className="rounded-2xl border border-[#171717]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4b4b4b]">Sécurité &amp; Rôles</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Shield className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-purple-600">1 Admin</p>
          <p className="mt-1 text-xs text-[#4b4b4b]">Nourou Dine AMANDOU (Propriétaire)</p>
        </div>
      </div>

      {/* Barre de Recherche et Filtres */}
      <div className="rounded-2xl border border-[#171717]/10 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7b7b7b]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom, email de login, société ou téléphone..."
              className="w-full rounded-xl border border-[#171717]/15 bg-[#f8f9fa] py-2 pl-9 pr-3 text-xs text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-[#171717]">Filtrer par rôle :</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-[#171717]/15 bg-[#f8f9fa] px-3 py-2 text-xs font-bold text-[#171717] focus:border-[#0060c3] focus:bg-white focus:outline-none"
            >
              <option value="all">Tous les rôles</option>
              <option value="client">Clients uniquement</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des Comptes Clients */}
      <div className="rounded-[2rem] border border-[#171717]/10 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#171717]">Liste des Comptes Enregistrés</h2>
            <p className="text-xs text-[#4b4b4b]">
              {filteredAccounts.length} compte{filteredAccounts.length > 1 ? "s" : ""} trouvé{filteredAccounts.length > 1 ? "s" : ""}.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-4 border-[#0060c3] border-t-transparent" />
          </div>
        ) : filteredAccounts.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#4b4b4b]">
            Aucun compte ne correspond à votre recherche.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#171717]/10 bg-[#f8f9fa] text-[11px] font-bold uppercase tracking-wider text-[#4b4b4b]">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Client / Nom</th>
                  <th className="px-4 py-3">Email (Identifiant Login)</th>
                  <th className="px-4 py-3">Entreprise / Marque</th>
                  <th className="px-4 py-3">Téléphone / WhatsApp</th>
                  <th className="px-4 py-3">Rôle</th>
                  <th className="px-4 py-3">Date de création</th>
                  <th className="px-4 py-3 text-right rounded-r-xl">Actions directes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#171717]/5 font-medium text-[#171717]">
                {filteredAccounts.map((account) => {
                  const d = new Date(account.createdAt);
                  const formattedDate = isNaN(d.getTime())
                    ? account.createdAt
                    : d.toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      });

                  const cleanPhone = account.phone ? account.phone.replace(/[^0-9]/g, "") : "";

                  return (
                    <tr key={account.id} className="hover:bg-[#f8f9fa]/80 transition-colors">
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                              account.role === "admin" ? "bg-[#0060c3]" : "bg-slate-700"
                            }`}
                          >
                            {account.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-[#171717]">{account.name}</p>
                            <p className="text-[10px] text-[#4b4b4b] font-mono">{account.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="font-mono text-xs font-semibold text-[#171717] bg-[#f8f9fa] px-2 py-1 rounded border border-[#171717]/10">
                          {account.email}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap text-[#4b4b4b]">
                        <div className="flex items-center gap-1.5">
                          <Building className="h-3.5 w-3.5 text-[#7b7b7b]" />
                          <span>{account.company || "Non renseigné"}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {account.phone ? (
                          <span className="text-xs font-semibold text-[#171717]">{account.phone}</span>
                        ) : (
                          <span className="text-xs text-[#7b7b7b] italic">Aucun numéro</span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {account.role === "admin" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                            <Shield className="h-3 w-3" />
                            Administrateur
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200">
                            <UserCheck className="h-3 w-3" />
                            Client
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap text-[#4b4b4b] font-mono text-[11px]">
                        {formattedDate}
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`mailto:${account.email}`}
                            title="Envoyer un e-mail"
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#171717]/10 bg-white text-[#4b4b4b] hover:bg-[#0060c3] hover:text-white hover:border-[#0060c3] transition-colors"
                          >
                            <Mail className="h-3.5 w-3.5" />
                          </a>

                          {cleanPhone && (
                            <a
                              href={`https://wa.me/${cleanPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Ouvrir la discussion WhatsApp"
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-colors"
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
