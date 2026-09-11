"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Mail,
  Phone,
  Download,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Calendar,
  AlertCircle,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { InquiryRecord, NewsletterRecord } from "@/lib/storage";

export default function AdminLeadsCRMPage() {
  const [tab, setTab] = useState<"inquiries" | "newsletter">("inquiries");
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterRecord[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/app/leads");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries || []);
        setSubscribers(data.subscribers || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/app/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus as any } : inq))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteInquiry = async (id: string, name: string) => {
    if (!window.confirm(`Supprimer définitivement la demande de devis de "${name}" ?`)) return;
    try {
      const res = await fetch(`/api/app/leads?id=${id}&type=inquiry`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert(data.error || "Erreur suppression.");
      }
    } catch {
      alert("Erreur réseau.");
    }
  };

  const handleDeleteSubscriber = async (id: string, email: string) => {
    if (!window.confirm(`Supprimer l'abonné "${email}" de la newsletter ?`)) return;
    try {
      const res = await fetch(`/api/app/leads?id=${id}&type=newsletter`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setSubscribers((prev) => prev.filter((s) => s.id !== id));
      } else {
        alert(data.error || "Erreur suppression.");
      }
    } catch {
      alert("Erreur réseau.");
    }
  };

  const exportInquiriesCSV = () => {
    const headers = ["ID", "Nom", "Email", "Telephone", "Type de Projet", "Budget", "Message", "Date", "Statut"];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.email}"`,
      `"${i.phone || ""}"`,
      `"${i.projectType || ""}"`,
      `"${i.budget || ""}"`,
      `"${i.message.replace(/"/g, '""').replace(/\n/g, " ")}"`,
      `"${i.createdAt}"`,
      `"${i.status}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `demandes_devis_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportNewsletterCSV = () => {
    const headers = ["ID", "Email", "Date Inscription", "Statut"];
    const rows = subscribers.map((s) => [s.id, `"${s.email}"`, `"${s.subscribedAt}"`, `"${s.status}"`]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `newsletter_abonnes_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.message.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* En-tête CRM */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#0f172a] lg:text-3xl">
              CRM &amp; Demandes de Devis
            </h1>
            <span className="shrink-0 rounded-full bg-[#e0e7ff] px-2.5 py-0.5 text-xs font-bold text-[#312e81] border border-[#c7d2fe]">
              {inquiries.length} Demande(s)
            </span>
          </div>
          <p className="mt-1 text-sm text-[#475569]">
            Centralisation des prospects qualifiés et de votre base de diffusion newsletter.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={loadData}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-xs font-bold text-[#0f172a] shadow-sm hover:bg-[#f8fafc] hover:border-[#4338ca] transition"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-[#4338ca] ${loading ? "animate-spin" : ""}`} />
            <span>Actualiser</span>
          </button>
          <button
            onClick={tab === "inquiries" ? exportInquiriesCSV : exportNewsletterCSV}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4338ca] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-[#4338ca]/25 hover:bg-[#3730a3] transition active:scale-95 shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Exporter CSV ({tab === "inquiries" ? inquiries.length : subscribers.length})</span>
          </button>
        </div>
      </div>

      {/* Onglets Indigo */}
      <div className="flex rounded-2xl bg-white p-1.5 border border-[#e2e8f0] w-fit shadow-sm">
        <button
          onClick={() => {
            setTab("inquiries");
            setSearch("");
          }}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            tab === "inquiries" ? "bg-[#4338ca] text-white shadow-sm" : "text-[#475569] hover:text-[#0f172a]"
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          <span>Demandes de Devis ({inquiries.length})</span>
        </button>

        <button
          onClick={() => {
            setTab("newsletter");
            setSearch("");
          }}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            tab === "newsletter" ? "bg-[#4338ca] text-white shadow-sm" : "text-[#475569] hover:text-[#0f172a]"
          }`}
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Abonnés Newsletter ({subscribers.length})</span>
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tab === "inquiries" ? "Rechercher par nom, email ou mot-clé..." : "Rechercher un email..."}
            className="w-full rounded-xl border border-[#cbd5e1] bg-white py-2.5 pl-9 pr-3 text-xs text-[#0f172a] focus:border-[#4338ca] focus:outline-none focus:ring-2 focus:ring-[#4338ca]/20"
          />
        </div>

        {tab === "inquiries" && (
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-[#64748b] text-[11px] font-semibold mr-1">Statut :</span>
            {["all", "nouveau", "en_cours", "traité"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-colors ${
                  statusFilter === st
                    ? "bg-[#4338ca] text-white shadow-sm"
                    : "bg-white border border-[#cbd5e1] text-[#475569] hover:bg-[#f8fafc]"
                }`}
              >
                {st === "all" ? "Tous" : st}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Contenu Tableau Devis */}
      {tab === "inquiries" ? (
        <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm min-w-0 max-w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-[#e2e8f0] bg-[#f8fafc] text-xs font-bold uppercase tracking-wider text-[#64748b]">
                <tr>
                  <th scope="col" className="py-4 px-4 sm:px-6">Contact</th>
                  <th scope="col" className="py-4 px-4 sm:px-6">Type &amp; Budget</th>
                  <th scope="col" className="py-4 px-4 sm:px-6">Message</th>
                  <th scope="col" className="py-4 px-4 sm:px-6">Date</th>
                  <th scope="col" className="py-4 px-4 sm:px-6">Statut</th>
                  <th scope="col" className="py-4 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs font-semibold text-[#64748b]">
                      Chargement des demandes...
                    </td>
                  </tr>
                ) : filteredInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs font-semibold text-[#64748b]">
                      Aucune demande trouvée.
                    </td>
                  </tr>
                ) : (
                  filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-[#f8fafc] transition-colors">
                      <td className="py-4 px-4 sm:px-6">
                        <p className="font-bold text-[#0f172a]">{inq.name}</p>
                        <p className="text-xs text-[#64748b]">{inq.email}</p>
                        {inq.phone && (
                          <p className="text-[11px] text-[#94a3b8] flex items-center gap-1 mt-0.5">
                            <Phone className="h-2.5 w-2.5" />
                            {inq.phone}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <span className="inline-block rounded-md bg-[#f1f5f9] px-2 py-0.5 text-[11px] font-semibold text-[#0f172a]">
                          {inq.projectType || "Projet Web"}
                        </span>
                        <p className="mt-1 text-xs font-bold text-[#4338ca]">{inq.budget || "À définir"}</p>
                      </td>
                      <td className="py-4 px-4 sm:px-6 max-w-xs">
                        <p className="line-clamp-2 text-xs text-[#475569]">{inq.message}</p>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-xs text-[#64748b]">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-[#94a3b8]" />
                          <span>{new Date(inq.createdAt).toLocaleDateString("fr-FR")}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          className={`rounded-lg border px-2 py-1 text-xs font-bold outline-none cursor-pointer ${
                            inq.status === "nouveau"
                              ? "border-amber-300 bg-amber-50 text-amber-800"
                              : inq.status === "en_cours"
                              ? "border-indigo-300 bg-indigo-50 text-indigo-800"
                              : "border-emerald-300 bg-emerald-50 text-emerald-800"
                          }`}
                        >
                          <option value="nouveau">Nouveau</option>
                          <option value="en_cours">En cours</option>
                          <option value="traité">Traité</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`mailto:${inq.email}?subject=Suite à votre demande de devis sur Nourou Dine AMANDOU`}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#cbd5e1] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0f172a] shadow-sm hover:bg-[#e0e7ff] hover:text-[#4338ca] transition"
                          >
                            <Mail className="h-3 w-3 text-[#4338ca]" />
                            <span>Répondre</span>
                          </a>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id, inq.name)}
                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-2 py-1.5 text-xs font-bold text-red-600 shadow-sm hover:bg-red-50 hover:border-red-300 transition"
                            title="Supprimer cette demande"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span className="hidden sm:inline">Supprimer</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Contenu Tableau Newsletter */
        <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm min-w-0 max-w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-[#e2e8f0] bg-[#f8fafc] text-xs font-bold uppercase tracking-wider text-[#64748b]">
                <tr>
                  <th scope="col" className="py-4 px-4 sm:px-6">Email de l&apos;Abonné</th>
                  <th scope="col" className="py-4 px-4 sm:px-6">Date d&apos;Inscription</th>
                  <th scope="col" className="py-4 px-4 sm:px-6">Statut</th>
                  <th scope="col" className="py-4 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-xs font-semibold text-[#64748b]">
                      Chargement des abonnés...
                    </td>
                  </tr>
                ) : filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-xs font-semibold text-[#64748b]">
                      Aucun abonné trouvé.
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((s) => (
                    <tr key={s.id} className="hover:bg-[#f8fafc] transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-semibold text-[#0f172a]">{s.email}</td>
                      <td className="py-4 px-4 sm:px-6 text-xs text-[#64748b]">
                        {new Date(s.subscribedAt).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Actif
                        </span>
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          onClick={() => handleDeleteSubscriber(s.id, s.email)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-2 py-1.5 text-xs font-bold text-red-600 shadow-sm hover:bg-red-50 hover:border-red-300 transition"
                          title="Supprimer cet abonné"
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="hidden sm:inline">Supprimer</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
