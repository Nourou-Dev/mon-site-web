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
  ArrowDown,
  Sparkles,
  PhoneCall,
  Clock,
  CheckCheck,
} from "lucide-react";
import { ProjectRecord, MessageRecord } from "@/lib/appStorage";

export default function AdminMessagesPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [mobileViewChat, setMobileViewChat] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isInitialLoadRef = useRef(true);

  // 1. Initialiser la liste des projets
  useEffect(() => {
    async function init() {
      try {
        const projRes = await fetch("/api/app/projects");
        const projData = await projRes.json();

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
        console.error("Erreur init messages admin:", err);
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
      if (data.success && Array.isArray(data.messages)) {
        setMessages((prev) => {
          if (
            prev.length === data.messages.length &&
            prev.every((m, idx) => m.id === data.messages[idx]?.id)
          ) {
            return prev;
          }
          return data.messages;
        });
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

    const interval = setInterval(() => {
      fetchCurrentMessages(true);
    }, 6000);

    return () => clearInterval(interval);
  }, [selectedProjectId]);

  useEffect(() => {
    isInitialLoadRef.current = true;
  }, [selectedProjectId]);

  useEffect(() => {
    if (isInitialLoadRef.current && messages.length > 0) {
      isInitialLoadRef.current = false;
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 60);
    }
  }, [messages]);

  const handleChatScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollBottom(!isNearBottom);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // 3. Envoyer un message en tant qu'administrateur
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
          senderId: "usr_admin_nourou",
          senderName: "Nourou Dine AMANDOU",
          senderRole: "admin",
        }),
      });

      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [...prev, data.message]);
        setContent("");

        setTimeout(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
              top: chatContainerRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 80);
      } else {
        alert(data.error || "Erreur lors de l'envoi du message");
      }
    } catch (err) {
      console.error("Erreur envoi message admin:", err);
      alert("Erreur réseau lors de l'envoi du message.");
    } finally {
      setSending(false);
    }
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#4338ca] border-t-transparent" />
          <p className="text-sm font-semibold text-[#4b4b4b]">Chargement du fil de discussion client...</p>
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
              Messagerie &amp; Échanges Clients
            </h1>
            <span className="shrink-0 flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Canal Chiffré Admin
            </span>
          </div>
          <p className="mt-1 text-sm text-[#4b4b4b]">
            Communiquez directement avec vos clients par projet et gardez un historique complet des échanges.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => fetchCurrentMessages(false)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#171717]/10 bg-white px-3.5 py-2 text-xs font-semibold text-[#171717] shadow-sm transition hover:bg-[#f8f9fa] disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-[#4338ca]" : ""}`} />
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
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef2ff] text-[#4338ca]">
            <FolderKanban className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-[#171717]">Aucun projet actif</h3>
          <p className="mx-auto mt-1.5 max-w-md text-sm text-[#4b4b4b]">
            Créez un projet client pour initier le premier canal de discussion.
          </p>
          <Link
            href="/dashboard/projets"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4338ca] px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#3730a3]"
          >
            Aller aux projets
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#171717]/10 bg-white shadow-sm lg:grid-cols-12 min-h-[440px] sm:min-h-[520px] h-[calc(100dvh-13rem)] max-h-[820px] min-w-0 max-w-full">
          {/* COLONNE GAUCHE : Projets */}
          <div
            className={`border-b border-[#171717]/10 bg-[#fafafa] p-4 lg:col-span-4 lg:border-b-0 lg:border-r h-full min-h-0 flex flex-col ${
              mobileViewChat ? "hidden" : "flex"
            }`}
          >
            <div className="mb-3 flex items-center justify-between px-1 shrink-0">
              <span className="text-xs font-black uppercase tracking-wider text-[#4b4b4b]">
                Fils Clients ({projects.length})
              </span>
              <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-[#4338ca] border border-[#c7d2fe]">
                Supervision
              </span>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto chat-scrollbar space-y-2 pr-1">
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
                        ? "border-[#4338ca] bg-white shadow-md ring-1 ring-[#4338ca]/20"
                        : "border-transparent bg-white/70 hover:border-[#171717]/10 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        className={`text-sm font-bold leading-tight ${
                          isSelected ? "text-[#4338ca]" : "text-[#171717] group-hover:text-[#4338ca]"
                        }`}
                      >
                        {proj.title}
                      </h4>
                      <span className="shrink-0 text-xs font-black text-[#4338ca]">
                        {proj.progress}%
                      </span>
                    </div>

                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[#4b4b4b]">
                      <User className="h-3 w-3 text-[#7b7b7b]" />
                      <span className="truncate font-medium">{proj.clientName}</span>
                    </div>

                    <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-[#e5e5e5]">
                      <div
                        className="h-full rounded-full bg-[#4338ca] transition-all"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLONNE DROITE : Discussion */}
          <div
            className={`flex flex-col lg:col-span-8 h-full min-h-0 overflow-hidden relative ${
              !mobileViewChat ? "hidden lg:flex" : "flex"
            }`}
          >
            {/* Header du Chat */}
            {selectedProject ? (
              <div className="shrink-0 flex items-center justify-between border-b border-[#171717]/10 bg-white px-4 sm:px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileViewChat(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl p-2 text-[#4b4b4b] hover:bg-[#f8f9fa] active:scale-95 transition-all lg:hidden"
                    title="Retour aux projets"
                    aria-label="Retourner à la liste des projets"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef2ff] font-bold text-[#4338ca]">
                    {selectedProject.title.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#171717]">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-[#4b4b4b]">
                      Client : <span className="font-semibold text-[#171717]">{selectedProject.clientName}</span> ({selectedProject.clientEmail})
                    </p>
                  </div>
                </div>

                <Link
                  href={`/dashboard/projets`}
                  className="inline-flex items-center gap-1 rounded-xl border border-[#171717]/10 px-3 py-1.5 text-xs font-semibold text-[#171717] hover:bg-[#f8f9fa]"
                >
                  <FolderKanban className="h-3.5 w-3.5 text-[#4338ca]" />
                  <span className="hidden sm:inline">Chantier</span>
                </Link>
              </div>
            ) : null}

            {/* Corps des messages */}
            <div
              ref={chatContainerRef}
              onScroll={handleChatScroll}
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain chat-scrollbar bg-[#fdfdfd] p-4 sm:p-5 space-y-4 select-text"
            >
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef2ff] text-[#4338ca]">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-[#171717]">
                    Aucun message sur ce fil
                  </h4>
                  <p className="mt-1 max-w-sm text-xs text-[#4b4b4b]">
                    Envoyez un premier message au client pour l&apos;informer du démarrage ou partager le lien de preview.
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isNourouAdmin =
                    msg.senderRole === "admin" || msg.senderName.toLowerCase().includes("nourou");

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isNourouAdmin ? "items-end" : "items-start"}`}
                    >
                      <div className="mb-1 flex items-center gap-1.5 px-1 text-[11px] text-[#7b7b7b]">
                        <span className="font-bold text-[#171717]">
                          {isNourouAdmin ? "Nourou Dine AMANDOU (Vous)" : msg.senderName}
                        </span>
                        {isNourouAdmin ? (
                          <span className="inline-flex items-center gap-0.5 rounded-full bg-[#eef2ff] px-1.5 py-0.2 text-[10px] font-bold text-[#312e81]">
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

                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[75%] ${
                          isNourouAdmin
                            ? "bg-[#4338ca] text-white rounded-br-none shadow-md shadow-[#4338ca]/20"
                            : "bg-white border border-[#171717]/10 text-[#171717] rounded-bl-none shadow-sm"
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      </div>

                      <div className="mt-0.5 flex items-center gap-1 px-1 text-[10px] text-[#9b9b9b]">
                        <CheckCheck className={`h-3 w-3 ${isNourouAdmin ? "text-[#4338ca]" : "text-emerald-500"}`} />
                        <span>{isNourouAdmin ? "Envoyé au client" : "Reçu du client"}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bouton de rediffusion en bas */}
            {showScrollBottom && (
              <button
                type="button"
                onClick={scrollToBottom}
                className="absolute bottom-28 right-5 z-30 inline-flex items-center gap-1.5 rounded-full bg-[#4338ca] px-3.5 py-2 text-xs font-bold text-white shadow-xl shadow-[#4338ca]/30 transition-all hover:bg-[#3730a3] hover:scale-105 active:scale-95"
                title="Descendre aux derniers messages"
              >
                <ArrowDown className="h-3.5 w-3.5" />
                <span>Derniers messages</span>
              </button>
            )}

            {/* Réponses rapides Administrateur */}
            <div className="shrink-0 border-t border-[#171717]/5 bg-[#fbfbfb] px-4 py-2">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#7b7b7b]">
                  <Sparkles className="h-3 w-3 text-[#4338ca]" />
                  Réponses types :
                </span>
                {[
                  "Bonjour, le jalon en cours vient d'être validé en production !",
                  "Pouvez-vous vérifier le lien de preview et me confirmer votre accord ?",
                  "Merci pour votre retour, nous avançons selon le calendrier.",
                  "La mise en ligne définitive est programmée pour cette semaine.",
                ].map((quickText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setContent(quickText)}
                    className="shrink-0 rounded-full border border-[#171717]/10 bg-white px-2.5 py-1 text-[11px] font-medium text-[#4b4b4b] hover:border-[#4338ca] hover:text-[#4338ca] transition"
                  >
                    {quickText}
                  </button>
                ))}
              </div>
            </div>

            {/* Formulaire d'envoi */}
            <form
              onSubmit={handleSendMessage}
              className="shrink-0 border-t border-[#171717]/10 bg-white p-3 sm:p-4"
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
                  placeholder="Écrivez votre message au client... (Entrée pour envoyer)"
                  className="flex-1 resize-none rounded-xl border border-[#171717]/15 bg-[#f8f9fa] p-3 text-xs sm:text-sm text-[#171717] placeholder:text-[#9b9b9b] focus:border-[#4338ca] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4338ca]/20"
                />

                <button
                  type="submit"
                  disabled={sending || !content.trim()}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4338ca] text-white shadow-md transition hover:bg-[#3730a3] disabled:opacity-50 active:scale-95"
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
