"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Mail,
  Phone,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { InquiryRecord, NewsletterRecord } from "@/lib/storage";

export default function LeadsCRMPage() {
  const [tab, setTab] = useState<"inquiries" | "newsletter">("inquiries");
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterRecord[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
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

  // Export CSV
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#171717]">CRM &amp; Acquisition de Prospects</h1>
          <p className="mt-1 text-sm text-[#4b4b4b]">
            Centralisation des demandes de devis et de votre liste de diffusion newsletter.
          </p>
        </div>

        <button
          onClick={tab === "inquiries" ? exportInquiriesCSV : exportNewsletterCSV}
          className="inline-flex items-center gap-2 rounded-full border border-[#171717]/15 bg-white px-4 py-2 text-xs font-bold text-[#171717] shadow-sm hover:bg-[#171717]/5 transition-colors"
        >
          <Download className="h-3.5 w-3.5 text-[#0060c3]" />
          <span>Exporter en CSV ({tab === "inquiries" ? inquiries.length : subscribers.length})</span>
        </button>
      </div>

      {/* Onglets */}
      <div className="flex rounded-2xl bg-white p-1.5 border border-[#171717]/10 w-fit">
        <button
          onClick={() => {
            setTab("inquiries");
            setSearch("");
          }}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
            tab === "inquiries" ? "bg-[#0060c3] text-white shadow-sm" : "text-[#4b4b4b] hover:text-[#171717]"
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
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors ${
            tab === "newsletter" ? "bg-[#0060c3] text-white shadow-sm" : "text-[#4b4b4b] hover:text-[#171717]"
          }`}
        >
          <Mail className="h-3.5 w-3.5" />
          <span>Abonnés Newsletter ({subscribers.length})</span>
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4b4b4b]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={tab === "inquiries" ? "Rechercher par nom, email ou mot-clé..." : "Rechercher un email..."}
            className="w-full rounded-xl border border-[#171717]/15 bg-white py-2 pl-9 pr-3 text-xs text-[#171717] focus:border-[#0060c3] focus:outline-none"
          />
        </div>

        {tab === "inquiries" && (
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            <span className="text-[#4b4b4b] text-[11px] font-semibold mr-1">Statut :</span>
            {["all", "nouveau", "en_cours", "traité"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-colors ${
                  statusFilter === st ? "bg-[#171717] text-white" : "bg-white border border-[#171717]/10 text-[#4b4b4b] hover:bg-[#171717]/5"
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
        <div className="overflow-hidden rounded-[2rem] border border-[#171717]/10 bg-white shadow-sm">
          <div className="divide-y divide-[#171717]/10">
            {filteredInquiries.length === 0 ? (
              <div className="p-12 text-center text-xs text-[#4b4b4b]">
                Aucune demande ne correspond à vos critères de recherche.
              </div>
            ) : (
              filteredInquiries.map((inq) => (
                <div key={inq.id} className="p-6 transition-colors hover:bg-[#f8f9fa]/60">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-base font-black text-[#171717]">{inq.name}</h3>
                        <span className="text-xs text-[#4b4b4b]">·</span>
                        <a href={`mailto:${inq.email}`} className="text-xs font-semibold text-[#0060c3] hover:underline">
                          {inq.email}
                        </a>
                        {inq.phone && (
                          <>
                            <span className="text-xs text-[#4b4b4b]">·</span>
                            <span className="text-xs font-medium text-[#4b4b4b]">{inq.phone}</span>
                          </>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-md bg-[#0060c3]/10 px-2 py-0.5 font-bold text-[#0060c3]">
                          {inq.projectType}
                        </span>
                        <span className="rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 font-bold text-amber-800">
                          Budget : {inq.budget}
                        </span>
                        <span className="text-[11px] text-[#4b4b4b] flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(inq.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <p className="mt-3 rounded-xl bg-[#f4f6f8] p-4 text-xs leading-relaxed text-[#171717]">
                        {inq.message}
                      </p>
                    </div>

                    <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 shrink-0 pt-2 lg:pt-0">
                      {/* Sélecteur de statut */}
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-bold transition-colors focus:outline-none ${
                          inq.status === "nouveau"
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : inq.status === "en_cours"
                            ? "border-amber-300 bg-amber-50 text-amber-800"
                            : "border-gray-200 bg-gray-50 text-gray-700"
                        }`}
                      >
                        <option value="nouveau">Nouveau</option>
                        <option value="en_cours">En cours</option>
                        <option value="traité">Traité</option>
                      </select>

                      {/* Action WhatsApp direct */}
                      {inq.phone && (
                        <a
                          href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Bonjour ${inq.name}, je fais suite à votre demande de devis sur mon site concernant votre projet (${inq.projectType}).`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#20ba59] transition-transform active:scale-95"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Contenu Tableau Newsletter */
        <div className="overflow-hidden rounded-[2rem] border border-[#171717]/10 bg-white shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#171717]/10 bg-[#f8f9fa] text-[11px] font-bold uppercase tracking-wider text-[#4b4b4b]">
              <tr>
                <th className="px-6 py-4">Adresse E-mail</th>
                <th className="px-6 py-4">Date d'Inscription</th>
                <th className="px-6 py-4">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171717]/10">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-[#4b4b4b]">
                    Aucun abonné pour le moment.
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-[#f8f9fa]/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#171717]">{sub.email}</td>
                    <td className="px-6 py-4 text-[#4b4b4b]">
                      {new Date(sub.subscribedAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                        Actif
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
