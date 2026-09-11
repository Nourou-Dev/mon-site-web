"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminPortalPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
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
          window.location.replace("/app");
        }
      } catch {}
    }
    checkCurrentSession();
  }, []);

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/app/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "admin_login",
          login: login.trim(),
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Accès administrateur refusé. Identifiants incorrects.");
      }

      setSuccessMessage("Connexion réussie. Redirection vers votre tableau de bord...");
      setTimeout(() => {
        window.location.replace("/app");
      }, 300);
    } catch (err: any) {
      setErrorMessage(err.message || "Erreur de connexion.");
      setLoading(false);
    }
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
          Connexion Administrateur
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Veuillez renseigner vos identifiants pour accéder à votre tableau de bord.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-[2rem] border border-slate-800 bg-[#161b22] p-6 shadow-2xl sm:p-8">
          {errorMessage && (
            <div role="alert" aria-live="polite" className="mb-5 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-950/50 p-3 text-xs font-semibold text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div role="status" aria-live="polite" className="mb-5 flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/50 p-3 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleAdminAuth} className="space-y-4">
            <div>
              <label htmlFor="admin-login" className="block text-xs font-bold text-slate-300">
                Adresse E-mail ou Identifiant Admin *
              </label>
              <div className="relative mt-1">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="admin-login"
                  type="text"
                  required
                  autoComplete="username"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="contact@nouroudineamandou.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-xs font-bold text-slate-300">
                Mot de passe Administrateur *
              </label>
              <div className="relative mt-1">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="admin-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-sky-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-400 active:scale-95 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              <Lock className="h-4 w-4" />
              <span>{loading ? "Vérification en cours..." : "Se connecter"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
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
