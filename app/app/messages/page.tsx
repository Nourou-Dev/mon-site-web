"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Send,
  User,
  ShieldCheck,
  RefreshCw,
  FolderKanban,
  ArrowLeft,
  Sparkles,
  PhoneCall,
  Clock,
  CheckCheck,
  Shield,
} from "lucide-react";
import { ProjectRecord, MessageRecord } from "@/lib/appStorage";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "client";
  company?: string;
}

export default function MessagesPage() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [mobileViewChat, setMobileViewChat] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Charger la session utilisateur et la liste des projets
  useEffect(() => {
    async function init() {
      try {
        const [authRes, projRes] = await Promise.all([
          fetch("/api/app/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "me" }),
          }),
          fetch("/api/app/projects"),
        ]);

        const authData = await authRes.json();
        const projData = await projRes.json();

        if (authData.authenticated && authData.user) {
          setUser(authData.user);
        }

        if (projData.success && projData.projects) {
          setProjects(projData.projects);
          if (projData.projects.length > 0) {
            const urlParams = new URLSearchParams(window.location.search);
            const queryProjectId = urlParams.get("projectId");
            const initialId =
              queryProjectId && projData.projects.some((p: ProjectRecord) => p.id === queryProjectId)
                ? queryProjectId
                : projData.projects[0].id;

            setSelectedProjectId(initialId);
          }
        }
      } catch (err) {
        console.error("Erreur init messages:", err);
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  // 2. Charger les messages du projet sélectionné
  const fetchCurrentMessages = async (silent = false) => {
    if (!selectedProjectId) return;
    if (!silent) setRefreshing(true);

    try {
      const res = await fetch(`/api/app/messages?projectId=${selectedProjectId}`);
      const data = await res.json();
      if (data.success && data.messages) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error("Erreur chargement messages:", err);
    } finally {
      if (!silent) setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!selectedProjectId) return;
    fetchCurrentMessages(false);

    // Polling automatique toutes les 6 secondes pour le temps réel
    const interval = setInterval(() => {
      fetchCurrentMessages(true);
    }, 6000);

    return () => clearInterval(interval);
  }, [selectedProjectId]);

  // Scroll automatique en bas lors de la réception de messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3. Envoyer un message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!content.trim() || !selectedProjectId || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/app/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: selectedProjectId,
          content: content.trim(),
          senderId: user?.id,
          senderName: user?.name,
          senderRole: user?.role,
        }),
      });

      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [...prev, data.message]);
        setContent("");
      } else {
        alert(data.error || "Erreur lors de l'envoi du message");
      }
    } catch (err) {
      console.error("Erreur envoi message:", err);
      alert("Erreur réseau lors de l'envoi du message.");
    } finally {
      setSending(false);
    }
  };

  const handleQuickTemplate = (text: string) => {
    setContent(text);
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const isAdmin = user?.role === "admin";

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0060c3] border-t-transparent" />
          <p className="text-sm font-semibold text-[#4b4b4b]">Chargement du fil de discussion sécurisé...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#171717] lg:text-3xl">
              Messagerie en Direct
            </h1>
            <span className="shrink-0 flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Canal Chiffré
            </span>
          </div>
          <p className="mt-1 text-sm text-[#4b4b4b]">
            Échanges directs et sécurisés entre Nourou Dine AMANDOU et le client pour chaque projet.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => fetchCurrentMessages(false)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#171717]/10 bg-white px-3.5 py-2 text-xs font-semibold text-[#171717] shadow-sm transition hover:bg-[#f8f9fa] disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-[#0060c3]" : ""}`} />
            Actualiser
          </button>
          <a
            href="https://wa.me/2290161380798"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            WhatsApp
          </a>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-3xl border border-[#171717]/10 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0060c3]/10 text-[#0060c3]">
            <FolderKanban className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-[#171717]">Aucun projet actif pour le moment</h3>
          <p className="mx-auto mt-1.5 max-w-md text-sm text-[#4b4b4b]">
            Dès qu&apos;un projet est initié, son canal de messagerie dédié s&apos;affichera automatiquement ici.
          </p>
          <Link
            href="/app/projets"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0060c3] px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#004ca3]"
          >
            Consulter les projets
          </Link>
        </div>
      ) : (
        /* Conteneur principal de Messagerie : Sidebar Projets + Chat */
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#171717]/10 bg-white shadow-sm lg:grid-cols-12 min-h-[500px] h-[calc(100dvh-13rem)] max-h-[820px] min-w-0 max-w-full">
          {/* COLONNE GAUCHE : Sélecteur de projets */}
          <div
            className={`border-b border-[#171717]/10 bg-[#fafafa] p-4 lg:col-span-4 lg:border-b-0 lg:border-r lg:block ${
              mobileViewChat ? "hidden" : "block"
            }`}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <span className="text-xs font-black uppercase tracking-wider text-[#4b4b4b]">
                Projets ({projects.length})
              </span>
              <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-[#0060c3] border border-[#171717]/5">
                {isAdmin ? "Vue Admin" : "Vos Projets"}
              </span>
            </div>

            <div className="space-y-2 overflow-y-auto max-h-[calc(100dvh-18rem)] lg:max-h-[680px] pr-1">
              {projects.map((proj) => {
                const isSelected = proj.id === selectedProjectId;
                return (
                  <button
                    key={proj.id}
                    onClick={() => {
                      setSelectedProjectId(proj.id);
                      setMobileViewChat(true);
                    }}
                    className={`group w-full rounded-2xl p-3.5 text-left transition-all border ${
                      isSelected
                        ? "border-[#0060c3] bg-white shadow-md"
                        : "border-transparent bg-white/70 hover:border-[#171717]/10 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`text-sm font-bold leading-tight ${
                          isSelected ? "text-[#0060c3]" : "text-[#171717] group-hover:text-[#0060c3]"
                        }`}
                      >
                        {proj.title}
                      </h4>
                      <span className="shrink-0 text-xs font-black text-[#0060c3]">
                        {proj.progress}%
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#4b4b4b]">
                      <User className="h-3 w-3 text-[#7b7b7b]" />
                      <span className="truncate">{proj.clientName}</span>
                    </div>

                    {/* Barre de progression miniature */}
                    <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#e5e5e5]">
                      <div
                        className="h-full rounded-full bg-[#0060c3] transition-all"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLONNE DROITE : Zone de Chat */}
          <div
            className={`flex flex-col lg:col-span-8 ${
              !mobileViewChat ? "hidden lg:flex" : "flex"
            }`}
          >
            {/* Header du Chat */}
            {selectedProject ? (
              <div className="flex items-center justify-between border-b border-[#171717]/10 bg-white px-4 sm:px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileViewChat(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl p-2 text-[#4b4b4b] hover:bg-[#f8f9fa] active:scale-95 transition-all lg:hidden"
                    title="Retour aux projets"
                    aria-label="Retourner à la liste des projets"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0060c3]/10 font-bold text-[#0060c3]">
                    {selectedProject.title.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#171717]">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-[#4b4b4b]">
                      Client : <span className="font-semibold text-[#171717]">{selectedProject.clientName}</span> • Avancement :{" "}
                      <span className="font-semibold text-[#0060c3]">{selectedProject.progress}%</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/app/projets`}
                    className="inline-flex items-center gap-1 rounded-xl border border-[#171717]/10 px-3 py-1.5 text-xs font-semibold text-[#171717] hover:bg-[#f8f9fa]"
                  >
                    <FolderKanban className="h-3.5 w-3.5 text-[#0060c3]" />
                    <span className="hidden sm:inline">Roadmap</span>
                  </Link>
                </div>
              </div>
            ) : null}

            {/* Corps des messages avec distinction claire droite / gauche */}
            <div className="flex-1 overflow-y-auto bg-[#fdfdfd] p-4 sm:p-5 space-y-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0060c3]/10 text-[#0060c3]">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#171717]">
                    Aucun message sur ce projet
                  </h4>
                  <p className="mt-1 max-w-sm text-xs text-[#4b4b4b]">
                    Posez vos questions ou partagez vos remarques. Nourou Dine AMANDOU vous répondra directement ici.
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  // RÈGLE CLAIRE D'ALIGNEMENT :
                  // Si l'utilisateur est Admin (Nourou Dine AMANDOU), ses messages (admin) sont À DROITE (items-end)
                  // et les messages du Client sont À GAUCHE (items-start).
                  // Si l'utilisateur est Client, ses messages (client) sont À DROITE et ceux de Nourou Dine À GAUCHE.
                  const isMyMessage = isAdmin
                    ? msg.senderRole === "admin" || msg.senderName.toLowerCase().includes("nourou")
                    : msg.senderRole === "client" && msg.senderId === user?.id;

                  const isNourouDine = msg.senderRole === "admin" || msg.senderName.toLowerCase().includes("nourou");

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"}`}
                    >
                      {/* En-tête / Auteur du message */}
                      <div className="mb-1 flex items-center gap-1.5 px-1 text-[11px] text-[#7b7b7b]">
                        <span className="font-bold text-[#171717]">
                          {isNourouDine ? "Nourou Dine AMANDOU" : msg.senderName}
                        </span>
                        {isNourouDine ? (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-[#0060c3]/10 px-1.5 py-0.2 text-[10px] font-bold text-[#0060c3]">
                            <ShieldCheck className="h-2.5 w-2.5" />
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-gray-100 px-1.5 py-0.2 text-[10px] font-medium text-gray-700">
                            Client
                          </span>
                        )}
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <Clock className="h-2.5 w-2.5" />
                          {new Date(msg.createdAt).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {/* Bulle de message : Droite (Bleu vibrant pour vos messages) vs Gauche (Blanc épuré) */}
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[75%] ${
                          isMyMessage
                            ? "bg-[#0060c3] text-white rounded-br-none shadow-md shadow-[#0060c3]/20"
                            : "bg-white border border-[#171717]/10 text-[#171717] rounded-bl-none shadow-sm"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      </div>

                      <div className="mt-0.5 flex items-center gap-1 px-1 text-[10px] text-[#9b9b9b]">
                        <CheckCheck className={`h-3 w-3 ${isMyMessage ? "text-[#0060c3]" : "text-emerald-500"}`} />
                        <span>{isMyMessage ? "Envoyé" : "Reçu"}</span>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions de réponses rapides */}
            <div className="border-t border-[#171717]/5 bg-[#fbfbfb] px-4 py-2">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#7b7b7b]">
                  <Sparkles className="h-3 w-3 text-[#0060c3]" />
                  Réponses rapides :
                </span>
                {[
                  "Bonjour, où en est le jalon en cours ?",
                  "La maquette Figma est validée !",
                  "Merci pour ce retour rapide.",
                  "Pouvez-vous vérifier le lien de preview ?",
                ].map((quickText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleQuickTemplate(quickText)}
                    className="shrink-0 rounded-full border border-[#171717]/10 bg-white px-2.5 py-1 text-[11px] font-medium text-[#4b4b4b] hover:border-[#0060c3] hover:text-[#0060c3] transition"
                  >
                    {quickText}
                  </button>
                ))}
              </div>
            </div>

            {/* Formulaire d'envoi */}
            <form
              onSubmit={handleSendMessage}
              className="border-t border-[#171717]/10 bg-white p-4"
            >
              <div className="flex items-center gap-2">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  rows={2}
                  placeholder={`Écrivez en tant que ${user?.name || (isAdmin ? "Nourou Dine AMANDOU" : "Client")}... (Entrée pour envoyer)`}
                  className="flex-1 resize-none rounded-xl border border-[#171717]/15 bg-[#f8f9fa] p-3 text-xs sm:text-sm text-[#171717] placeholder:text-[#9b9b9b] focus:border-[#0060c3] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060c3]/20"
                />

                <button
                  type="submit"
                  disabled={sending || !content.trim()}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0060c3] text-white shadow-md transition hover:bg-[#004ca3] disabled:opacity-50"
                  title="Envoyer"
                >
                  {sending ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
