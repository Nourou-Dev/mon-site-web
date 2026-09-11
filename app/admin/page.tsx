"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Lock, KeyRound, ArrowRight, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

export default function AdminPortalPage() {
  const [login, setLogin] = useState("contact@nouroudineamandou.com");
  const [password, setPassword] = useState("admin123!");
  const [secretKey, setSecretKey] = useState("");
  const [activeTab, setActiveTab] = useState<"credentials" | "key">("credentials");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Vérifier si déjà connecté en tant qu'admin
  useEffect(() => {
    async function checkCurrentSession() {
      try {
        const res = await fetch("/api/app/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "me" }),
        });
        const data = await res.json();
        if (data.authenticated && data.user?.role === "admin") {
          window.location.href = "/app";
        }
      } catch {}
    }
    checkCurrentSession();
  }, []);

  const handleAdminAuth = async (payload: any) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/app/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "admin_login",
          ...payload,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Accès administrateur refusé.");
      }

      setSuccessMessage("Connexion réussie. Redirection vers votre tableau de bord...");
      setTimeout(() => {
        window.location.href = "/app";
      }, 500);
    } catch (err: any) {
      setErrorMessage(err.message || "Erreur de connexion.");
      setLoading(false);
    }
  };

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAdminAuth({ login, password });
  };

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAdminAuth({ secretKey });
  };

  const handleDirectAdminLogin = () => {
    handleAdminAuth({ directAdmin: true });
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#0d1117] px-4 py-12 sm:px-6 lg:px-8 text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block text-2xl font-extrabold tracking-tight text-white">
          <span>Nourou Dine</span> <span className="text-[#38bdf8]">AMANDOU</span>
        </Link>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-400">
            <Shield className="h-3.5 w-3.5" />
            Portail Administrateur Réservé
          </span>
        </div>
        <h1 className="mt-4 text-2xl font-black tracking-tight text-white">
          Accès Tableau de Bord &amp; CRM
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Gestion des demandes de devis, clients, cookies RGPD et projets en cours.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-[2rem] border border-slate-800 bg-[#161b22] p-6 shadow-2xl sm:p-8">
          {/* Bouton d'accès immédiat 1-clic pour Nourou */}
          <div className="mb-6 rounded-2xl border border-sky-500/30 bg-sky-950/40 p-4 text-center">
            <p className="text-xs font-medium text-sky-200">
              Connexion instantanée propriétaire du site :
            </p>
            <button
              type="button"
              onClick={handleDirectAdminLogin}
              disabled={loading}
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-400 active:scale-95 disabled:opacity-70"
            >
              <Sparkles className="h-4 w-4" />
              <span>{loading ? "Connexion en cours..." : "Entrer en tant qu'Administrateur"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#161b22] px-3 font-semibold uppercase tracking-wider text-slate-500">
                Ou avec vos identifiants
              </span>
            </div>
          </div>

          {/* Onglets Identifiants vs Clé secrète */}
          <div className="mb-6 flex rounded-xl bg-slate-900 p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab("credentials");
                setErrorMessage(null);
              }}
              className={`flex-1 rounded-lg py-2 transition-all ${
                activeTab === "credentials"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Email &amp; Mot de passe
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("key");
                setErrorMessage(null);
              }}
              className={`flex-1 rounded-lg py-2 transition-all ${
                activeTab === "key"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Clé Secrète Maître
            </button>
          </div>

          {errorMessage && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-950/50 p-3 text-xs font-semibold text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/50 p-3 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {activeTab === "credentials" ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300">Identifiant ou Email Admin</label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    required
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="contact@nouroudineamandou.com ou admin"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 px-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300">Mot de passe Administrateur</label>
                <div className="relative mt-1">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin123!"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 px-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 py-3 text-sm font-bold text-sky-400 hover:bg-sky-500/20 active:scale-95 disabled:opacity-70 transition-all"
              >
                <Lock className="h-4 w-4" />
                <span>{loading ? "Vérification..." : "Se connecter en Admin"}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleKeySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300">
                  Clé Secrète (ADMIN_SECRET_KEY)
                </label>
                <div className="relative mt-1">
                  <input
                    type="password"
                    required
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    placeholder="Collez votre clé secrète Vercel"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2.5 px-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none font-mono"
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Entrez la valeur configurée dans vos variables d&apos;environnement sur Vercel.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 py-3 text-sm font-bold text-sky-400 hover:bg-sky-500/20 active:scale-95 disabled:opacity-70 transition-all"
              >
                <KeyRound className="h-4 w-4" />
                <span>{loading ? "Vérification..." : "Valider la Clé Secrète"}</span>
              </button>
            </form>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            ← Retourner sur le site vitrine
          </Link>
          <Link href="/app/login" className="hover:text-sky-400 transition-colors">
            Accès Espace Client →
          </Link>
        </div>
      </div>
    </div>
  );
}
