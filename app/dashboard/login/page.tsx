"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Lock, Mail, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
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
          body: JSON.stringify({ action: "me", scope: "admin" }),
        });
        const data = await res.json();
        if (data.authenticated && data.user?.role === "admin") {
          window.location.replace("/dashboard");
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
        window.location.replace("/dashboard");
      }, 300);
    } catch (err: any) {
      setErrorMessage(err.message || "Erreur de connexion.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block text-2xl font-extrabold tracking-tight text-[#0f172a]">
          <span>Nourou Dine</span> <span className="text-[#4338ca]">AMANDOU</span>
        </Link>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c7d2fe] bg-[#e0e7ff] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#312e81]">
            <Shield className="h-3.5 w-3.5 text-[#4338ca]" />
            Portail Administrateur
          </span>
        </div>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-[#0f172a]">
          Connexion Espace Administrateur
        </h1>
        <p className="mt-1 text-xs text-[#475569]">
          Accès réservé exclusivement à Nourou Dine AMANDOU pour la gestion de la plateforme.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-[2rem] border border-[#e2e8f0] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] sm:p-8">
          {errorMessage && (
            <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleAdminAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0f172a]">
                Identifiant ou Email Administrateur
              </label>
              <div className="relative mt-1.5">
                <input
                  type="text"
                  required
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="contact@nouroudineamandou.com"
                  autoComplete="username"
                  className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 pl-10 text-xs font-medium text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#4338ca] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4338ca]/20"
                />
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#64748b]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0f172a]">
                Mot de passe Administrateur
              </label>
              <div className="relative mt-1.5">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-2.5 pl-10 text-xs font-medium text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#4338ca] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4338ca]/20"
                />
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#64748b]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#4338ca] py-3 text-xs font-bold text-white shadow-lg shadow-[#4338ca]/25 transition hover:bg-[#3730a3] active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Ouvrir mon tableau de bord</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-[#f1f5f9] pt-4">
            <Link href="/app/login" className="text-xs font-semibold text-[#64748b] hover:text-[#4338ca] transition">
              Vous êtes client ? Accéder à l&apos;Espace Client (/app)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
